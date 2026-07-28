import { _decorator, Component, Label, find, director } from 'cc';
const { ccclass, property } = _decorator;

import { ZipinData } from './zipin_game';

@ccclass('zipin_result')
export class zipin_result extends Component {
    start() {
        console.log('zipin_result场景初始化:', ZipinData);

        if (!ZipinData.result) {
            console.error('合婚结果为空');
            return;
        }

        this.initUI();
    }

    initUI() {
        const result = ZipinData.result!;

        this.setText('Canvas/male_name', ZipinData.maleName);
        this.setText('Canvas/female_name', ZipinData.femaleName);
        this.setText('Canvas/male_date', ZipinData.maleDate);
        this.setText('Canvas/female_date', ZipinData.femaleDate);
        this.setText('Canvas/male_bazi', ZipinData.maleBaZi);
        this.setText('Canvas/female_bazi', ZipinData.femaleBaZi);

        this.setText('Canvas/score_num', result.score + '%');
        this.setText('Canvas/match_level', result.level);

        const dayDesc = `${result.dayMatch.stemRelation}，${result.dayMatch.branchRelation}。${result.dayMatch.description}`;
        this.setText('Canvas/day_desc', dayDesc);

        this.initDetails();
        this.initSuggestions();
    }

    setText(path: string, text: string) {
        const node = find(path);
        if (!node) return;

        const lbl = node.getComponent(Label);
        if (lbl) {
            lbl.string = text;
        }
    }

    initDetails() {
        const result = ZipinData.result!;
        const detailsContainer = find('Canvas/details');
        
        if (!detailsContainer) return;

        const children = detailsContainer.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const lbl = child.getComponent(Label);
            
            if (i < result.details.length) {
                child.active = true;
                if (lbl) {
                    lbl.string = result.details[i];
                }
            } else {
                child.active = false;
            }
        }
    }

    initSuggestions() {
        const result = ZipinData.result!;
        const suggestionsContainer = find('Canvas/suggestions');
        
        if (!suggestionsContainer) return;

        const children = suggestionsContainer.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const lbl = child.getComponent(Label);
            
            if (i < result.suggestions.length) {
                child.active = true;
                if (lbl) {
                    lbl.string = result.suggestions[i];
                }
            } else {
                child.active = false;
            }
        }
    }

    onClickTryAgain() {
        director.loadScene('zipin');
    }

    onClickBack() {
        director.loadScene('main');
    }
}