import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { LoginManager } from './login_manager';
import { GameData } from './start_game';
import { DouyinAPI } from './douyin_api';

@ccclass('heartbeat')
export class heartbeat extends Component {
    start() {
        console.log('hello world')
        console.log('test')
        this.initLogin();
        this.initDouyinAPI();
    }

    private async initLogin() {
        try {
            console.log('开始初始化抖音登录...');
            const result = await LoginManager.getInstance().login();

            if (result.success) {
                console.log('抖音登录成功:', result);
                const userInfo = LoginManager.getInstance().getUserInfo();
                if (userInfo) {
                    console.log('用户信息:', userInfo);
                    GameData.loggedIn = true;
                    GameData.openid = userInfo.openid;
                    GameData.unionid = userInfo.unionid || '';
                    GameData.nickname = userInfo.nickname || '';
                    GameData.avatar = userInfo.avatar || '';
                    console.log('登录信息已保存到 GameData');
                }
            } else {
                console.log('抖音登录失败:', result.error);
            }
        } catch (error) {
            console.error('登录过程发生异常:', error);
        }
    }

    private initDouyinAPI() {
        console.log('开始初始化抖音 API...');
        
        const douyinAPI = DouyinAPI.getInstance();
        
        douyinAPI.initKeyboardListeners();
        
        const isFromSideBar = douyinAPI.checkFromSideBar();
        if (isFromSideBar) {
            console.log('用户从侧边栏进入游戏，可以发放奖励');
        }
        
        douyinAPI.setKeyboardConfirmHandler((data) => {
            console.log('键盘确认输入:', data.value);
        });
        
        console.log('抖音 API 初始化完成');
    }

    onDestroy() {
        console.log('组件销毁，移除键盘监听');
        DouyinAPI.getInstance().removeKeyboardListeners();
    }

    update(deltaTime: number) {

    }
}
