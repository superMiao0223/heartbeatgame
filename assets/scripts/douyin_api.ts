export interface KeyboardInputData {
    value: string;
}

export class DouyinAPI {
    private static instance: DouyinAPI;
    private keyboardInputHandler: ((data: KeyboardInputData) => void) | null = null;
    private keyboardCompleteHandler: ((data: KeyboardInputData) => void) | null = null;
    private keyboardConfirmHandler: ((data: KeyboardInputData) => void) | null = null;

    public static getInstance(): DouyinAPI {
        if (!DouyinAPI.instance) {
            DouyinAPI.instance = new DouyinAPI();
        }
        return DouyinAPI.instance;
    }

    public initKeyboardListeners() {
        const tt = (window as any).tt;
        if (!tt) {
            console.log('当前环境不支持抖音 API');
            return;
        }

        this.keyboardInputHandler = (data: KeyboardInputData) => {
            console.log('键盘输入:', data.value);
        };

        this.keyboardCompleteHandler = (data: KeyboardInputData) => {
            console.log('键盘收起:', data.value);
        };

        this.keyboardConfirmHandler = (data: KeyboardInputData) => {
            console.log('键盘确认:', data.value);
        };

        if (tt.onKeyboardInput) {
            tt.onKeyboardInput(this.keyboardInputHandler);
            console.log('已注册键盘输入监听');
        }

        if (tt.onKeyboardComplete) {
            tt.onKeyboardComplete(this.keyboardCompleteHandler);
            console.log('已注册键盘收起监听');
        }

        if (tt.onKeyboardConfirm) {
            tt.onKeyboardConfirm(this.keyboardConfirmHandler);
            console.log('已注册键盘确认监听');
        }
    }

    public setKeyboardInputHandler(handler: (data: KeyboardInputData) => void) {
        this.keyboardInputHandler = handler;
        const tt = (window as any).tt;
        if (tt && tt.onKeyboardInput) {
            tt.onKeyboardInput(handler);
        }
    }

    public setKeyboardCompleteHandler(handler: (data: KeyboardInputData) => void) {
        this.keyboardCompleteHandler = handler;
        const tt = (window as any).tt;
        if (tt && tt.onKeyboardComplete) {
            tt.onKeyboardComplete(handler);
        }
    }

    public setKeyboardConfirmHandler(handler: (data: KeyboardInputData) => void) {
        this.keyboardConfirmHandler = handler;
        const tt = (window as any).tt;
        if (tt && tt.onKeyboardConfirm) {
            tt.onKeyboardConfirm(handler);
        }
    }

    public removeKeyboardListeners() {
        const tt = (window as any).tt;
        if (!tt) return;

        if (tt.offKeyboardInput && this.keyboardInputHandler) {
            tt.offKeyboardInput(this.keyboardInputHandler);
            console.log('已移除键盘输入监听');
        }

        if (tt.offKeyboardComplete && this.keyboardCompleteHandler) {
            tt.offKeyboardComplete(this.keyboardCompleteHandler);
            console.log('已移除键盘收起监听');
        }

        if (tt.offKeyboardConfirm && this.keyboardConfirmHandler) {
            tt.offKeyboardConfirm(this.keyboardConfirmHandler);
            console.log('已移除键盘确认监听');
        }

        this.keyboardInputHandler = null;
        this.keyboardCompleteHandler = null;
        this.keyboardConfirmHandler = null;
    }

    public navigateToSideBar(): Promise<boolean> {
        return new Promise((resolve) => {
            const tt = (window as any).tt;
            if (!tt || !tt.navigateToScene) {
                console.log('当前环境不支持 tt.navigateToScene API');
                resolve(false);
                return;
            }

            tt.navigateToScene({
                scene: '021036',
                success: () => {
                    console.log('跳转侧边栏成功');
                    resolve(true);
                },
                fail: (err: any) => {
                    console.error('跳转侧边栏失败:', err);
                    resolve(false);
                }
            });
        });
    }

    public checkFromSideBar(): boolean {
        const tt = (window as any).tt;
        if (!tt || !tt.getLaunchOptionsSync) {
            return false;
        }

        try {
            const options = tt.getLaunchOptionsSync();
            const scene = options.scene || options.query?.scene;
            const sideBarScenes = ['021036', '021012', '101036'];
            
            if (sideBarScenes.includes(String(scene))) {
                console.log('从侧边栏进入游戏, scene:', scene);
                return true;
            }
        } catch (e) {
            console.error('获取启动参数失败:', e);
        }

        return false;
    }

    public showRevisitGuide(): Promise<boolean> {
        return new Promise((resolve) => {
            const tt = (window as any).tt;
            if (!tt || !tt.showRevisitGuide) {
                console.log('当前环境不支持 tt.showRevisitGuide API');
                resolve(false);
                return;
            }

            tt.showRevisitGuide({
                success: () => {
                    console.log('复访引导弹窗显示成功');
                    resolve(true);
                },
                fail: (err: any) => {
                    console.error('复访引导弹窗显示失败:', err);
                    resolve(false);
                }
            });
        });
    }

    public showKeyboard(options: {
        maxLength: number;
        defaultValue?: string;
        multiple?: boolean;
        confirmHold?: boolean;
        confirmType?: 'search' | 'done' | 'next' | 'go' | 'send';
    }): Promise<boolean> {
        return new Promise((resolve) => {
            const tt = (window as any).tt;
            if (!tt || !tt.showKeyboard) {
                console.log('当前环境不支持 tt.showKeyboard API');
                resolve(false);
                return;
            }

            tt.showKeyboard({
                maxLength: options.maxLength,
                defaultValue: options.defaultValue || '',
                multiple: options.multiple || false,
                confirmHold: options.confirmHold || false,
                confirmType: options.confirmType || 'done',
                success: () => {
                    console.log('键盘显示成功');
                    resolve(true);
                },
                fail: (err: any) => {
                    console.error('键盘显示失败:', err);
                    resolve(false);
                }
            });
        });
    }

    public hideKeyboard(): void {
        const tt = (window as any).tt;
        if (tt && tt.hideKeyboard) {
            tt.hideKeyboard();
            console.log('键盘已隐藏');
        }
    }
}
