export type HeavenlyStem = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type EarthlyBranch = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';
export type WuxingType = '金' | '木' | '水' | '火' | '土';
export type Gender = 'male' | 'female';

export interface BaZiPillar {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
}

export interface BaZiChart {
    year: BaZiPillar;
    month: BaZiPillar;
    day: BaZiPillar;
    hour: BaZiPillar;
}

export interface MarriageResult {
    score: number;
    level: string;
    details: string[];
    suggestions: string[];
    dayMatch: DayMatchResult;
    elementAnalysis: ElementAnalysis;
}

export interface DayMatchResult {
    stemRelation: string;
    branchRelation: string;
    score: number;
    description: string;
}

export interface ElementAnalysis {
    maleElements: Record<WuxingType, number>;
    femaleElements: Record<WuxingType, number>;
    complementarity: string;
    balanceScore: number;
}

const StemWuxing: Record<HeavenlyStem, WuxingType> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
};

const BranchWuxing: Record<EarthlyBranch, WuxingType> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

const StemCombination: Record<HeavenlyStem, HeavenlyStem> = {
    '甲': '己', '己': '甲',
    '乙': '庚', '庚': '乙',
    '丙': '辛', '辛': '丙',
    '丁': '壬', '壬': '丁',
    '戊': '癸', '癸': '戊'
};

const BranchCombination: Record<EarthlyBranch, EarthlyBranch> = {
    '子': '丑', '丑': '子',
    '寅': '亥', '亥': '寅',
    '卯': '戌', '戌': '卯',
    '辰': '酉', '酉': '辰',
    '巳': '申', '申': '巳',
    '午': '未', '未': '午'
};

const BranchClash: Record<EarthlyBranch, EarthlyBranch> = {
    '子': '午', '午': '子',
    '丑': '未', '未': '丑',
    '寅': '申', '申': '寅',
    '卯': '酉', '酉': '卯',
    '辰': '戌', '戌': '辰',
    '巳': '亥', '亥': '巳'
};

const BranchHarm: Record<EarthlyBranch, EarthlyBranch> = {
    '子': '未', '未': '子',
    '丑': '午', '午': '丑',
    '寅': '巳', '巳': '寅',
    '卯': '辰', '辰': '卯',
    '申': '亥', '亥': '申',
    '酉': '戌', '戌': '酉'
};

const StemCombinationNames: Record<string, string> = {
    '甲己': '中正之合', '己甲': '中正之合',
    '乙庚': '仁义之合', '庚乙': '仁义之合',
    '丙辛': '威权之合', '辛丙': '威权之合',
    '丁壬': '淫匿之合', '壬丁': '淫匿之合',
    '戊癸': '无情之合', '癸戊': '无情之合'
};

const BranchCombinationNames: Record<string, string> = {
    '子丑': '土合', '丑子': '土合',
    '寅亥': '木合', '亥寅': '木合',
    '卯戌': '火合', '戌卯': '火合',
    '辰酉': '金合', '酉辰': '金合',
    '巳申': '水合', '申巳': '水合',
    '午未': '土合', '未午': '土合'
};

const WuxingShengke: Record<WuxingType, { sheng: WuxingType; ke: WuxingType }> = {
    '金': { sheng: '水', ke: '木' },
    '木': { sheng: '火', ke: '土' },
    '水': { sheng: '木', ke: '火' },
    '火': { sheng: '土', ke: '金' },
    '土': { sheng: '金', ke: '水' }
};

const HiddenStems: Record<EarthlyBranch, HeavenlyStem[]> = {
    '子': ['癸'],
    '丑': ['己', '辛', '癸'],
    '寅': ['甲', '丙', '戊'],
    '卯': ['乙'],
    '辰': ['戊', '乙', '癸'],
    '巳': ['丙', '庚', '戊'],
    '午': ['丁', '己'],
    '未': ['己', '丁', '乙'],
    '申': ['庚', '壬', '戊'],
    '酉': ['辛'],
    '戌': ['戊', '辛', '丁'],
    '亥': ['壬', '甲']
};

export class ZipingModel {
    static generateBaZiFromDate(date: Date, gender: Gender): BaZiChart {
        const year = this.getYearPillar(date);
        const month = this.getMonthPillar(date);
        const day = this.getDayPillar(date);
        const hour = this.getHourPillar(date);
        
        return { year, month, day, hour };
    }

    static getYearPillar(date: Date): BaZiPillar {
        const year = date.getFullYear();
        const ganIndex = (year - 4) % 10;
        const zhiIndex = (year - 4) % 12;
        
        const stems: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const branches: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        return { stem: stems[ganIndex], branch: branches[zhiIndex] };
    }

    static getMonthPillar(date: Date): BaZiPillar {
        const yearStem = this.getYearPillar(date).stem;
        const month = date.getMonth() + 1;
        
        const stemMap: Record<HeavenlyStem, HeavenlyStem[]> = {
            '甲': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '乙': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '丙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '丁': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '戊': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '己': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '庚': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '辛': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '壬': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙']
        };
        
        const branches: EarthlyBranch[] = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];
        
        return { stem: stemMap[yearStem][month - 1], branch: branches[month - 1] };
    }

    static getDayPillar(date: Date): BaZiPillar {
        const baseDate = new Date('1900-01-01');
        const diffTime = date.getTime() - baseDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        const stems: HeavenlyStem[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const branches: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        const startStemIndex = 0;
        const startBranchIndex = 6;
        
        const stemIndex = (startStemIndex + diffDays) % 10;
        const branchIndex = (startBranchIndex + diffDays) % 12;
        
        return { stem: stems[stemIndex], branch: branches[branchIndex] };
    }

    static getHourPillar(date: Date): BaZiPillar {
        const dayStem = this.getDayPillar(date).stem;
        const hour = date.getHours();
        
        const branchIndex = Math.floor(hour / 2);
        const branches: EarthlyBranch[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        const stemMap: Record<HeavenlyStem, HeavenlyStem[]> = {
            '甲': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '乙': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
            '丙': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '丁': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
            '戊': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '己': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
            '庚': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
            '壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
            '癸': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
        };
        
        return { stem: stemMap[dayStem][branchIndex], branch: branches[branchIndex] };
    }

    static analyzeMarriage(maleChart: BaZiChart, femaleChart: BaZiChart): MarriageResult {
        const details: string[] = [];
        const suggestions: string[] = [];
        
        const dayMatch = this.analyzeDayPillar(maleChart.day, femaleChart.day);
        details.push(`日柱匹配：${dayMatch.description}`);
        
        const yearMatch = this.analyzeYearPillar(maleChart.year, femaleChart.year);
        details.push(`年柱匹配：${yearMatch}`);
        
        const monthMatch = this.analyzeMonthPillar(maleChart.month, femaleChart.month);
        details.push(`月柱匹配：${monthMatch}`);
        
        const elementAnalysis = this.analyzeElements(maleChart, femaleChart);
        details.push(`五行分析：${elementAnalysis.complementarity}`);
        
        const stemInteractions = this.analyzeStemInteractions(maleChart, femaleChart);
        details.push(...stemInteractions);
        
        const branchInteractions = this.analyzeBranchInteractions(maleChart, femaleChart);
        details.push(...branchInteractions);
        
        let totalScore = dayMatch.score + elementAnalysis.balanceScore;
        totalScore += this.getYearBonus(yearMatch);
        totalScore += this.getMonthBonus(monthMatch);
        
        totalScore = Math.max(0, Math.min(100, totalScore));
        
        const level = this.getMatchLevel(totalScore);
        
        suggestions.push(...this.generateSuggestions(totalScore, dayMatch, elementAnalysis));
        
        return {
            score: totalScore,
            level,
            details,
            suggestions,
            dayMatch,
            elementAnalysis
        };
    }

    static analyzeDayPillar(maleDay: BaZiPillar, femaleDay: BaZiPillar): DayMatchResult {
        const stemRelation = this.getStemRelation(maleDay.stem, femaleDay.stem);
        const branchRelation = this.getBranchRelation(maleDay.branch, femaleDay.branch);
        
        let score = 50;
        let description = '';
        
        if (stemRelation === '合' && branchRelation === '合') {
            score = 95;
            description = `天地鸳鸯合！日干${StemCombinationNames[maleDay.stem + femaleDay.stem]}，日支${BranchCombinationNames[maleDay.branch + femaleDay.branch]}，夫妻恩爱，白头偕老之象`;
        } else if (stemRelation === '合') {
            score = 80;
            description = `日干五合（${StemCombinationNames[maleDay.stem + femaleDay.stem]}），夫妻默契度高，沟通顺畅`;
        } else if (branchRelation === '合') {
            score = 75;
            description = `日支六合（${BranchCombinationNames[maleDay.branch + femaleDay.branch]}），夫妻宫相合，婚姻根基稳固`;
        } else if (stemRelation === '生') {
            score = 70;
            description = `日干相生，一方愿意付出，感情基础良好`;
        } else if (branchRelation === '生') {
            score = 65;
            description = `日支相生，家庭氛围和睦，互相滋养`;
        } else if (stemRelation === '冲') {
            score = 25;
            description = `日干相冲，性格差异大，易有争吵`;
        } else if (branchRelation === '冲') {
            score = 20;
            description = `日支相冲（夫妻宫相冲），婚姻根基不稳，需谨慎`;
        } else if (stemRelation === '克') {
            score = 35;
            description = `日干相克，易有矛盾，需要互相包容`;
        } else if (branchRelation === '害') {
            score = 30;
            description = `日支相害，婚姻易有暗伤，需多加注意`;
        } else if (branchRelation === '刑') {
            score = 25;
            description = `日支相刑，婚姻易有内耗，需用心经营`;
        } else {
            score = 55;
            description = `日干日支关系一般，需靠后天磨合经营`;
        }
        
        return { stemRelation, branchRelation, score, description };
    }

    static getStemRelation(stem1: HeavenlyStem, stem2: HeavenlyStem): string {
        if (StemCombination[stem1] === stem2) return '合';
        
        const w1 = StemWuxing[stem1];
        const w2 = StemWuxing[stem2];
        
        if (WuxingShengke[w1].sheng === w2) return '生';
        if (WuxingShengke[w1].ke === w2) return '克';
        
        return '平';
    }

    static getBranchRelation(branch1: EarthlyBranch, branch2: EarthlyBranch): string {
        if (BranchCombination[branch1] === branch2) return '合';
        if (BranchClash[branch1] === branch2) return '冲';
        if (BranchHarm[branch1] === branch2) return '害';
        
        const w1 = BranchWuxing[branch1];
        const w2 = BranchWuxing[branch2];
        
        if (WuxingShengke[w1].sheng === w2) return '生';
        if (WuxingShengke[w1].ke === w2) return '克';
        
        const punishGroups = [
            ['寅', '巳', '申'],
            ['丑', '未', '戌'],
            ['子', '卯']
        ];
        
        for (const group of punishGroups) {
            if (group.includes(branch1) && group.includes(branch2)) return '刑';
        }
        
        return '平';
    }

    static analyzeYearPillar(maleYear: BaZiPillar, femaleYear: BaZiPillar): string {
        const stemRelation = this.getStemRelation(maleYear.stem, femaleYear.stem);
        const branchRelation = this.getBranchRelation(maleYear.branch, femaleYear.branch);
        
        if (stemRelation === '合' && branchRelation === '合') {
            return `年柱天合地合，双方家族气场契合，长辈缘佳`;
        } else if (branchRelation === '冲') {
            return `年支相冲，双方家庭观念可能不合，需注意沟通`;
        } else if (branchRelation === '合') {
            return `年支相合，双方家族缘分深厚，易得到长辈支持`;
        } else if (branchRelation === '害') {
            return `年支相害，双方家庭易有暗耗，需多包容`;
        } else {
            return `年柱关系一般，家庭影响不大`;
        }
    }

    static analyzeMonthPillar(maleMonth: BaZiPillar, femaleMonth: BaZiPillar): string {
        const stemRelation = this.getStemRelation(maleMonth.stem, femaleMonth.stem);
        const branchRelation = this.getBranchRelation(maleMonth.branch, femaleMonth.branch);
        
        if (branchRelation === '合') {
            return `月支相合，双方性格底色相近，生活习惯匹配`;
        } else if (branchRelation === '冲') {
            return `月支相冲，双方价值观差异较大，需磨合`;
        } else if (stemRelation === '合') {
            return `月干相合，双方沟通顺畅，精神层面契合`;
        } else {
            return `月柱关系一般，性格需互相适应`;
        }
    }

    static analyzeElements(maleChart: BaZiChart, femaleChart: BaZiChart): ElementAnalysis {
        const maleElements: Record<WuxingType, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
        const femaleElements: Record<WuxingType, number> = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };
        
        this.countElements(maleChart, maleElements);
        this.countElements(femaleChart, femaleElements);
        
        let balanceScore = 50;
        let complementarity = '';
        
        const maleMax = this.getMaxElement(maleElements);
        const femaleMax = this.getMaxElement(femaleElements);
        const maleMin = this.getMinElement(maleElements);
        const femaleMin = this.getMinElement(femaleElements);
        
        if (WuxingShengke[maleMax.element].ke === femaleMax.element) {
            balanceScore -= 15;
            complementarity = `男方主${maleMax.element}，女方主${femaleMax.element}，${maleMax.element}克${femaleMax.element}，需注意克制`;
        } else if (WuxingShengke[femaleMax.element].ke === maleMax.element) {
            balanceScore -= 10;
            complementarity = `女方主${femaleMax.element}，男方主${maleMax.element}，${femaleMax.element}克${maleMax.element}，女方较强势`;
        } else if (WuxingShengke[maleMax.element].sheng === femaleMax.element) {
            balanceScore += 15;
            complementarity = `男方主${maleMax.element}生女方主${femaleMax.element}，男方愿意付出，感情和谐`;
        } else if (WuxingShengke[femaleMax.element].sheng === maleMax.element) {
            balanceScore += 10;
            complementarity = `女方主${femaleMax.element}生男方主${maleMax.element}，女方体贴温柔，互相滋养`;
        } else {
            if (maleMax.element === femaleMax.element) {
                balanceScore -= 10;
                complementarity = `双方均主${maleMax.element}，性格相似，易有竞争，需互相谦让`;
            } else {
                balanceScore += 5;
                complementarity = `双方主属性不同，性格互补，易形成良好搭配`;
            }
        }
        
        if (femaleMax.element === maleMin.element) {
            balanceScore += 10;
            complementarity += '，女方恰好弥补男方所缺';
        }
        if (maleMax.element === femaleMin.element) {
            balanceScore += 10;
            complementarity += '，男方恰好弥补女方所缺';
        }
        
        return { maleElements, femaleElements, complementarity, balanceScore: Math.max(0, Math.min(100, balanceScore)) };
    }

    static countElements(chart: BaZiChart, counts: Record<WuxingType, number>): void {
        const pillars = [chart.year, chart.month, chart.day, chart.hour];
        
        for (const pillar of pillars) {
            counts[StemWuxing[pillar.stem]]++;
            counts[BranchWuxing[pillar.branch]]++;
            
            for (const hidden of HiddenStems[pillar.branch]) {
                counts[StemWuxing[hidden]] += 0.5;
            }
        }
    }

    static getMaxElement(counts: Record<WuxingType, number>): { element: WuxingType; count: number } {
        let maxElement: WuxingType = '金';
        let maxCount = 0;
        
        for (const [element, count] of Object.entries(counts)) {
            if (count > maxCount) {
                maxCount = count;
                maxElement = element as WuxingType;
            }
        }
        
        return { element: maxElement, count: maxCount };
    }

    static getMinElement(counts: Record<WuxingType, number>): { element: WuxingType; count: number } {
        let minElement: WuxingType = '金';
        let minCount = Infinity;
        
        for (const [element, count] of Object.entries(counts)) {
            if (count < minCount) {
                minCount = count;
                minElement = element as WuxingType;
            }
        }
        
        return { element: minElement, count: minCount };
    }

    static analyzeStemInteractions(maleChart: BaZiChart, femaleChart: BaZiChart): string[] {
        const interactions: string[] = [];
        const maleStems = [maleChart.year.stem, maleChart.month.stem, maleChart.day.stem, maleChart.hour.stem];
        const femaleStems = [femaleChart.year.stem, femaleChart.month.stem, femaleChart.day.stem, femaleChart.hour.stem];
        
        let matchCount = 0;
        
        for (const mStem of maleStems) {
            for (const fStem of femaleStems) {
                if (StemCombination[mStem] === fStem) {
                    matchCount++;
                }
            }
        }
        
        if (matchCount >= 2) {
            interactions.push(`天干合${matchCount}组，双方多方面契合，缘分深厚`);
        } else if (matchCount === 1) {
            interactions.push(`天干合1组，双方有一定默契`);
        }
        
        return interactions;
    }

    static analyzeBranchInteractions(maleChart: BaZiChart, femaleChart: BaZiChart): string[] {
        const interactions: string[] = [];
        const maleBranches = [maleChart.year.branch, maleChart.month.branch, maleChart.day.branch, maleChart.hour.branch];
        const femaleBranches = [femaleChart.year.branch, femaleChart.month.branch, femaleChart.day.branch, femaleChart.hour.branch];
        
        let clashCount = 0;
        
        for (const mBranch of maleBranches) {
            for (const fBranch of femaleBranches) {
                if (BranchClash[mBranch] === fBranch) {
                    clashCount++;
                }
            }
        }
        
        if (clashCount >= 2) {
            interactions.push(`地支冲${clashCount}组，双方需多加磨合，避免冲突`);
        } else if (clashCount === 1) {
            interactions.push(`地支冲1组，需注意某些方面的差异`);
        }
        
        return interactions;
    }

    static getYearBonus(yearMatch: string): number {
        if (yearMatch.includes('天合地合')) return 10;
        if (yearMatch.includes('相合')) return 5;
        if (yearMatch.includes('相冲')) return -10;
        if (yearMatch.includes('相害')) return -5;
        return 0;
    }

    static getMonthBonus(monthMatch: string): number {
        if (monthMatch.includes('相合')) return 8;
        if (monthMatch.includes('相冲')) return -8;
        return 0;
    }

    static getMatchLevel(score: number): string {
        if (score >= 90) return '上上婚';
        if (score >= 80) return '上婚';
        if (score >= 70) return '中婚';
        if (score >= 60) return '中下婚';
        return '下婚';
    }

    static generateSuggestions(score: number, dayMatch: DayMatchResult, elementAnalysis: ElementAnalysis): string[] {
        const suggestions: string[] = [];
        
        if (score >= 80) {
            suggestions.push('恭喜！你们是天作之合，缘分深厚，好好珍惜这份感情');
            suggestions.push('双方性格互补，互相欣赏，婚姻基础稳固');
        } else if (score >= 70) {
            suggestions.push('你们的缘分不错，虽有小波折，但只要用心经营就能幸福');
            suggestions.push('建议多沟通交流，互相理解包容');
        } else if (score >= 60) {
            suggestions.push('你们的关系需要双方共同努力，多包容对方的缺点');
            suggestions.push('注意避免冲动争吵，学会换位思考');
        } else {
            suggestions.push('你们的性格差异较大，需要更多的磨合和理解');
            suggestions.push('建议多了解对方，找到共同兴趣，建立默契');
        }
        
        if (dayMatch.stemRelation === '合' || dayMatch.branchRelation === '合') {
            suggestions.push('日柱相合是婚姻幸福的重要保障，珍惜这份默契');
        }
        
        if (elementAnalysis.balanceScore < 40) {
            suggestions.push('五行方面需注意平衡，建议通过生活方式调整');
        }
        
        return suggestions;
    }

    static formatBaZi(chart: BaZiChart): string {
        return `${chart.year.stem}${chart.year.branch} ${chart.month.stem}${chart.month.branch} ${chart.day.stem}${chart.day.branch} ${chart.hour.stem}${chart.hour.branch}`;
    }

    static getZodiac(branch: EarthlyBranch): string {
        const zodiacMap: Record<EarthlyBranch, string> = {
            '子': '鼠', '丑': '牛', '寅': '虎', '卯': '兔',
            '辰': '龙', '巳': '蛇', '午': '马', '未': '羊',
            '申': '猴', '酉': '鸡', '戌': '狗', '亥': '猪'
        };
        return zodiacMap[branch];
    }

    static getElementDesc(element: WuxingType): string {
        const descMap: Record<WuxingType, string> = {
            '金': '金主义气、果断、刚强',
            '木': '木主仁慈、善良、进取',
            '水': '水主智慧、灵活、包容',
            '火': '火主热情、开朗、礼仪',
            '土': '土主诚信、稳重、厚道'
        };
        return descMap[element];
    }
}