import { _decorator, Component, Label, EditBox, find, director } from 'cc';
const { ccclass, property } = _decorator;

import { GameData } from './start_game';

@ccclass('result')
export class result extends Component {
    start() {
        console.log('result场景初始化:', GameData);

        const yournameNode = find('Canvas/yourname');
        const hisnameNode = find('Canvas/hisname');
        const hepaiNumNode = find('Canvas/hepai_num');
        const yournameStrNode = find('Canvas/yourname_sttr');
        const hisnameStrNode = find('Canvas/hisname_sttr');
        const hitResNode = find('Canvas/hit_res');

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

        if (yournameStrNode) {
            const lbl = yournameStrNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.yourWuxing;
            }
        }

        if (hisnameStrNode) {
            const lbl = hisnameStrNode.getComponent(Label);
            if (lbl) {
                lbl.string = GameData.hisWuxing;
            }
        }

        if (hitResNode) {
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
