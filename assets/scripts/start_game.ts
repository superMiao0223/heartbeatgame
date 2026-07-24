import { _decorator, Component, Label, EditBox, Color, find, Node, UITransform, director } from 'cc';
const { ccclass, property } = _decorator;

export const GameData = {
    yourName: '',
    hisName: '',
    yourWuxing: '',
    hisWuxing: '',
    score: 0,
    suggestion: ''
};

import { calculateScore, getNameWuxing } from './wuxing';

@ccclass('start_game')
export class start_game extends Component {
    onLoad() {
        const matchingNode = find('Canvas/matching');
        if (matchingNode) {
            matchingNode.active = false;
        }
    }

    update(dt: number) {
        const matchingNode = find('Canvas/matching');
        if (!matchingNode || !matchingNode.active) return;

        const barNode = matchingNode.getChildByName('Bar');
        if (!barNode) return;

        const progressLabel = matchingNode.getComponent(Label);
        const percentageLabel = matchingNode.getChildByName('Percentage');
        const percentageLbl = percentageLabel ? percentageLabel.getComponent(Label) : null;

        const uiTransform = barNode.getComponent(UITransform);
        if (!uiTransform) return;

        const currentWidth = uiTransform.width;
        const maxWidth = 300;

        if (currentWidth < maxWidth) {
            const newWidth = Math.min(currentWidth + 2, maxWidth);
            uiTransform.setContentSize(newWidth, 15);

            const percentage = Math.floor((newWidth / maxWidth) * 100);

            if (progressLabel) {
                progressLabel.string = '正在匹配，请稍后 ' + percentage + '%';
            }
            if (percentageLbl) {
                percentageLbl.string = percentage + '%';
            }
        } else {
            director.loadScene('result');
        }
    }

    onClickStartGame() {
        const yourNameNode = find('Canvas/yourname_input');
        const hisNameNode = find('Canvas/hisname_input');

        let yourName = '';
        let hisName = '';

        if (yourNameNode) {
            const eb = yourNameNode.getComponent(EditBox);
            if (eb) yourName = (eb.string || '').trim();
        }
        if (hisNameNode) {
            const eb = hisNameNode.getComponent(EditBox);
            if (eb) hisName = (eb.string || '').trim();
        }

        const errors: string[] = [];

        if (!yourName) errors.push('你的名字');
        else if (!this.isChinese(yourName)) errors.push('你的名字');

        if (!hisName) errors.push('他的名字');
        else if (!this.isChinese(hisName)) errors.push('他的名字');

        if (errors.length > 0) {
            let msg = '';
            const hasEmpty = !yourName || !hisName;
            const hasInvalid = (yourName && !this.isChinese(yourName)) || (hisName && !this.isChinese(hisName));

            if (hasEmpty && hasInvalid) {
                msg = errors.join('、') + '未输入名字或包含非中文字符';
            } else if (hasEmpty) {
                msg = errors.join('、') + '未输入名字';
            } else {
                msg = errors.join('、') + '请输入中文名字';
            }

            alert(msg);

            if (!yourName || !this.isChinese(yourName)) {
                this.showInputError(yourNameNode, !yourName ? '未输入名字' : '请输入中文名字');
            }
            if (!hisName || !this.isChinese(hisName)) {
                this.showInputError(hisNameNode, !hisName ? '未输入名字' : '请输入中文名字');
            }

            return;
        }

        const yourWuxingArray = getNameWuxing(yourName);
        const hisWuxingArray = getNameWuxing(hisName);

        const result = calculateScore(yourName, hisName);

        GameData.yourName = yourName;
        GameData.hisName = hisName;
        GameData.yourWuxing = yourWuxingArray.join('。');
        GameData.hisWuxing = hisWuxingArray.join('。');
        GameData.score = result.score;
        GameData.suggestion = result.suggestion;

        console.log('计算结果:', GameData);

        this.hideAllUIAndShowMatching();
    }

    showInputError(node: Node, text: string) {
        if (!node) return;
        const eb = node.getComponent(EditBox);
        if (!eb) return;
        eb.string = '';
        const ph = node.getChildByName('PLACEHOLDER_LABEL');
        if (ph) {
            const lbl = ph.getComponent(Label);
            if (lbl) {
                lbl.string = text;
                lbl.color = new Color(255, 0, 0, 255);
            }
        }
    }

    hideAllUIAndShowMatching() {
        const canvas = find('Canvas');
        if (!canvas) return;

        const children = canvas.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (child.name !== 'matching' && child.name !== 'Camera') {
                child.active = false;
            }
        }

        const matchingNode = find('Canvas/matching');
        if (matchingNode) {
            matchingNode.active = true;

            const barNode = matchingNode.getChildByName('Bar');
            if (barNode) {
                const uiTransform = barNode.getComponent(UITransform);
                if (uiTransform) {
                    uiTransform.setContentSize(0, 15);
                }
            }
        }
    }

    isChinese(str: string): boolean {
        return /^[\u4e00-\u9fa5]+$/.test(str);
    }
}
