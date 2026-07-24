export interface AdResult {
    success: boolean;
    isEnded: boolean;
    error?: string;
}

export class AdManager {
    private static instance: AdManager;
    private videoAd: any = null;
    private adUnitId = 'your_ad_unit_id';
    private useMock = false;

    public static getInstance(): AdManager {
        if (!AdManager.instance) {
            AdManager.instance = new AdManager();
        }
        return AdManager.instance;
    }

    public setMockMode(useMock: boolean): void {
        this.useMock = useMock;
    }

    public setAdUnitId(id: string): void {
        this.adUnitId = id;
    }

    public async showRewardedVideo(): Promise<AdResult> {
        if (this.useMock) {
            return this.mockShowAd();
        }

        return new Promise((resolve) => {
            const tt = (window as any).tt;
            if (!tt || !tt.createRewardedVideoAd) {
                console.log('当前环境不支持抖音激励视频广告 API');
                resolve({ success: false, isEnded: false, error: '不支持广告 API' });
                return;
            }

            if (!this.videoAd) {
                this.videoAd = tt.createRewardedVideoAd({
                    adUnitId: this.adUnitId
                });
            }

            this.videoAd.onClose = (res: { isEnded: boolean }) => {
                console.log('激励视频广告关闭:', res);
                if (res.isEnded) {
                    resolve({ success: true, isEnded: true });
                } else {
                    resolve({ success: false, isEnded: false, error: '用户未完整观看广告' });
                }
            };

            this.videoAd.onError = (err: { errCode: number; errMsg: string }) => {
                console.error('激励视频广告错误:', err);
                resolve({ success: false, isEnded: false, error: err.errMsg || '广告加载失败' });
            };

            this.videoAd.show()
                .then(() => {
                    console.log('激励视频广告展示成功');
                })
                .catch((err: any) => {
                    console.error('激励视频广告展示失败:', err);
                    resolve({ success: false, isEnded: false, error: err.errMsg || '广告展示失败' });
                });
        });
    }

    private async mockShowAd(): Promise<AdResult> {
        console.log('=== 使用模拟数据测试激励视频广告 ===');

        await this.delay(600);
        console.log('模拟创建激励视频广告实例...');

        await this.delay(400);
        console.log('模拟加载广告素材...');

        await this.delay(500);
        console.log('模拟广告加载成功...');

        await this.delay(800);
        console.log('模拟广告展示成功，正在播放...');

        await this.delay(3000);
        console.log('模拟广告播放完成...');

        await this.delay(300);
        console.log('=== 模拟广告关闭，用户完整观看 ===');

        return { success: true, isEnded: true };
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public destroy(): void {
        if (this.videoAd) {
            if (this.videoAd.destroy) {
                this.videoAd.destroy();
            }
            this.videoAd = null;
        }
    }
}
