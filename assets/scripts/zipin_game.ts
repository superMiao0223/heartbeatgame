import { _decorator, Component, Label, EditBox, find, Node, director } from 'cc';
const { ccclass, property } = _decorator;

import { ZipingModel, BaZiChart, MarriageResult } from './ziping_model';

export const ZipinData = {
    maleName: '',
    femaleName: '',
    maleDate: '',
    femaleDate: '',
    maleBaZi: '' as string,
    femaleBaZi: '' as string,
    result: null as MarriageResult | null
};

@ccclass('zipin_game')
export class zipin_game extends Component {
    onLoad() {
    }

    async onClickStart() {
        const maleNameNode = find('Canvas/male_name_label/male_name_input');
        const femaleNameNode = find('Canvas/female_name_label/female_name_input');
        const maleDateNode = find('Canvas/male_date_label/male_date_input');
        const femaleDateNode = find('Canvas/female_date_label/female_date_input');

        console.log('节点查找结果:', {
            maleNameNode: !!maleNameNode,
            femaleNameNode: !!femaleNameNode,
            maleDateNode: !!maleDateNode,
            femaleDateNode: !!femaleDateNode
        });

        let maleName = '';
        let femaleName = '';
        let maleDate = '';
        let femaleDate = '';

        if (maleNameNode) {
            const eb = maleNameNode.getComponent(EditBox);
            if (eb) maleName = (eb.string || '').trim();
        }
        if (femaleNameNode) {
            const eb = femaleNameNode.getComponent(EditBox);
            if (eb) femaleName = (eb.string || '').trim();
        }
        if (maleDateNode) {
            const eb = maleDateNode.getComponent(EditBox);
            if (eb) maleDate = (eb.string || '').trim();
        }
        if (femaleDateNode) {
            const eb = femaleDateNode.getComponent(EditBox);
            if (eb) femaleDate = (eb.string || '').trim();
        }

        console.log('输入值:', {
            maleName,
            femaleName,
            maleDate,
            femaleDate
        });

        const errors: string[] = [];

        if (!maleName) errors.push('男方姓名未填写');
        else if (!this.isChinese(maleName)) errors.push('男方姓名不是中文');
        else if (maleName.length > 6) errors.push('男方姓名超过6字');

        if (!femaleName) errors.push('女方姓名未填写');
        else if (!this.isChinese(femaleName)) errors.push('女方姓名不是中文');
        else if (femaleName.length > 6) errors.push('女方姓名超过6字');

        if (!maleDate) errors.push('男方生日未填写');
        else if (!this.isValidDate(maleDate)) errors.push('男方生日格式错误(' + maleDate + ')');

        if (!femaleDate) errors.push('女方生日未填写');
        else if (!this.isValidDate(femaleDate)) errors.push('女方生日格式错误(' + femaleDate + ')');

        console.log('验证结果:', errors);

        if (errors.length > 0) {
            let msg = errors.join('\n');
            alert(msg);
            return;
        }

        const maleDateObj = this.parseDate(maleDate);
        const femaleDateObj = this.parseDate(femaleDate);

        if (!maleDateObj || !femaleDateObj) {
            alert('日期格式错误，请输入 YYYY-MM-DD 或 YYYYMMDD 格式');
            return;
        }

        const maleChart = ZipingModel.generateBaZiFromDate(maleDateObj, 'male');
        const femaleChart = ZipingModel.generateBaZiFromDate(femaleDateObj, 'female');

        const result = ZipingModel.analyzeMarriage(maleChart, femaleChart);

        ZipinData.maleName = maleName;
        ZipinData.femaleName = femaleName;
        ZipinData.maleDate = maleDate;
        ZipinData.femaleDate = femaleDate;
        ZipinData.maleBaZi = ZipingModel.formatBaZi(maleChart);
        ZipinData.femaleBaZi = ZipingModel.formatBaZi(femaleChart);
        ZipinData.result = result;

        console.log('合婚结果:', ZipinData);

        director.loadScene('zipin_result');
    }

    onClickBack() {
        director.loadScene('main');
    }

    isChinese(str: string): boolean {
        return /^[\u4e00-\u9fa5]+$/.test(str);
    }

    isValidDate(dateStr: string): boolean {
        const regexWithDash = /^\d{4}-\d{2}-\d{2}$/;
        const regexWithoutDash = /^\d{8}$/;

        let year: number, month: number, day: number;

        if (regexWithDash.test(dateStr)) {
            const parts = dateStr.split('-');
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10);
            day = parseInt(parts[2], 10);
        } else if (regexWithoutDash.test(dateStr)) {
            year = parseInt(dateStr.substring(0, 4), 10);
            month = parseInt(dateStr.substring(4, 6), 10);
            day = parseInt(dateStr.substring(6, 8), 10);
        } else {
            return false;
        }

        const date = new Date(year, month - 1, day);
        return date instanceof Date && !isNaN(date.getTime()) &&
            date.getFullYear() === year &&
            date.getMonth() === month - 1 &&
            date.getDate() === day;
    }

    parseDate(dateStr: string): Date | null {
        const regexWithDash = /^\d{4}-\d{2}-\d{2}$/;
        const regexWithoutDash = /^\d{8}$/;

        let year: number, month: number, day: number;

        if (regexWithDash.test(dateStr)) {
            const parts = dateStr.split('-');
            year = parseInt(parts[0], 10);
            month = parseInt(parts[1], 10) - 1;
            day = parseInt(parts[2], 10);
        } else if (regexWithoutDash.test(dateStr)) {
            year = parseInt(dateStr.substring(0, 4), 10);
            month = parseInt(dateStr.substring(4, 6), 10) - 1;
            day = parseInt(dateStr.substring(6, 8), 10);
        } else {
            return null;
        }

        const date = new Date(year, month, day);
        return date instanceof Date && !isNaN(date.getTime()) ? date : null;
    }
}