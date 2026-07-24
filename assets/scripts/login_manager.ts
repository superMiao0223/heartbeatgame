export interface LoginResult {
    success: boolean;
    openid?: string;
    unionid?: string;
    sessionKey?: string;
    error?: string;
}

export interface UserInfo {
    openid: string;
    unionid?: string;
    nickname?: string;
    avatar?: string;
}

const MOCK_USER_DATA: UserInfo = {
    openid: 'mock_openid_123456789',
    unionid: 'mock_unionid_987654321',
    nickname: '测试用户',
    avatar: 'https://example.com/avatar.png'
};

const MOCK_CODE = 'mock_auth_code_abc123';

export class LoginManager {
    private static instance: LoginManager;
    private loginState: 'idle' | 'logging' | 'logged' = 'idle';
    private userInfo: UserInfo | null = null;
    private useMock = true;

    public static getInstance(): LoginManager {
        if (!LoginManager.instance) {
            LoginManager.instance = new LoginManager();
        }
        return LoginManager.instance;
    }

    public setMockMode(useMock: boolean): void {
        this.useMock = useMock;
    }

    public async login(): Promise<LoginResult> {
        if (this.loginState === 'logging') {
            return new Promise((resolve) => {
                const check = setInterval(() => {
                    if (this.loginState !== 'logging') {
                        clearInterval(check);
                        if (this.userInfo) {
                            resolve({
                                success: true,
                                openid: this.userInfo.openid,
                                unionid: this.userInfo.unionid
                            });
                        } else {
                            resolve({ success: false, error: '登录失败' });
                        }
                    }
                }, 100);
            });
        }

        if (this.loginState === 'logged') {
            return {
                success: true,
                openid: this.userInfo!.openid,
                unionid: this.userInfo!.unionid
            };
        }

        this.loginState = 'logging';

        if (this.useMock) {
            return this.mockLogin();
        }

        return new Promise((resolve) => {
            const tt = (window as any).tt;
            if (!tt || !tt.login) {
                console.log('当前环境不支持抖音登录 API，切换到模拟模式');
                this.loginState = 'idle';
                return this.mockLogin();
            }

            tt.login({
                success: (res: { code: string }) => {
                    console.log('抖音登录成功, code:', res.code);
                    this.handleLoginSuccess(res.code);
                    resolve({
                        success: true,
                        openid: this.userInfo?.openid || '',
                        unionid: this.userInfo?.unionid
                    });
                },
                fail: (err: any) => {
                    console.error('抖音登录失败:', err);
                    this.loginState = 'idle';
                    resolve({ success: false, error: err.errMsg || '登录失败' });
                },
                complete: () => {
                    if (this.loginState === 'logging') {
                        this.loginState = 'idle';
                    }
                }
            });
        });
    }

    private async mockLogin(): Promise<LoginResult> {
        console.log('=== 使用模拟数据进行登录测试 ===');
        
        await this.delay(800);
        console.log('模拟调用 tt.login()...');
        
        await this.delay(500);
        console.log('模拟获取临时登录凭证 code:', MOCK_CODE);
        
        await this.delay(600);
        console.log('模拟发送 code 到服务器...');
        
        await this.delay(800);
        console.log('模拟服务器返回用户信息:', MOCK_USER_DATA);
        
        this.userInfo = { ...MOCK_USER_DATA };
        this.loginState = 'logged';
        
        console.log('=== 模拟登录完成 ===');
        
        return {
            success: true,
            openid: MOCK_USER_DATA.openid,
            unionid: MOCK_USER_DATA.unionid
        };
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private handleLoginSuccess(code: string) {
        this.sendCodeToServer(code);
    }

    private sendCodeToServer(code: string) {
        console.log('发送 code 到服务器:', code);
        const tt = (window as any).tt;
        if (!tt || !tt.request) {
            console.log('当前环境不支持网络请求 API');
            return;
        }

        tt.request({
            url: 'https://your-server.com/api/login/code2session',
            method: 'POST',
            data: {
                code: code
            },
            header: {
                'Content-Type': 'application/json'
            },
            success: (res: any) => {
                console.log('服务器返回:', res.data);
                if (res.data && res.data.openid) {
                    this.userInfo = {
                        openid: res.data.openid,
                        unionid: res.data.unionid,
                        nickname: res.data.nickname,
                        avatar: res.data.avatar
                    };
                    this.loginState = 'logged';
                    console.log('用户登录成功:', this.userInfo);
                }
            },
            fail: (err: any) => {
                console.error('请求服务器失败:', err);
            }
        });
    }

    public getUserInfo(): UserInfo | null {
        return this.userInfo;
    }

    public isLoggedIn(): boolean {
        return this.loginState === 'logged';
    }

    public logout(): void {
        this.loginState = 'idle';
        this.userInfo = null;
        console.log('用户已退出登录');
    }
}
