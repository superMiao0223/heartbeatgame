import { _decorator, Component, Label, EditBox, find, director } from 'cc';
const { ccclass, property } = _decorator;

import { GameData } from './start_game';

@ccclass('result')
export class result extends Component {
    start() {
        console.log('result场景初始化:', GameData);

        const yournameNode = find('Canvas/yourname');
        const hisnameNode = find('Canvas/hisname');
        const hepaiNumNode = find('Canvas/hepai/hepai_num');
        const yournameAttrNode = find('Canvas/yourname/yourname_attr');
        const hisnameAttrNode = find('Canvas/hisname/hisname_sttr');
        const hitResNode = find('Canvas/hit_res');

        console.log('节点查找结果:', {
            yournameNode: yournameNode ? '找到' : '未找到',
            hisnameNode: hisnameNode ? '找到' : '未找到',
            hepaiNumNode: hepaiNumNode ? '找到' : '未找到',
            yournameAttrNode: yournameAttrNode ? '找到' : '未找到',
            hisnameAttrNode: hisnameAttrNode ? '找到' : '未找到',
            hitResNode: hitResNode ? '找到' : '未找到'
        });

        if (yournameNode) {
            const lbl = yournameNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.yourName;
            }
        }

        if (hisnameNode) {
            const lbl = hisnameNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.hisName;
            }
        }

        if (hepaiNumNode) {
            const lbl = hepaiNumNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.score + '%';
            } else {
                const eb = hepaiNumNode.getComponent(EditBox);
                if (eb) {
                    eb.string = GameData.score + '%';
                }
            }
        }

        if (yournameAttrNode) {
            const lbl = yournameAttrNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.yourWuxing;
            }
        }

        if (hisnameAttrNode) {
            const lbl = hisnameAttrNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.hisWuxing;
            }
        }

        if (hitResNode) {
            hitResNode.active = true;
            const lbl = hitResNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.suggestion;
            }
        }
    }

    onClickTryAgain() {
        director.loadScene('main');
    }
}