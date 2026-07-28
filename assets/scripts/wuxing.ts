export type WuxingType = '金' | '木' | '水' | '火' | '土';

const JinRadicals = ['钅', '刂', '刀', '力', '辛', '酉', '石', '金', '锋', '锐', '铭', '针', '钱', '钟', '铃', '钢', '铁', '铜', '银', '锡', '铅', '铂', '钻', '钩', '铲', '锄', '锯', '钉', '铛', '锭', '键', '锁', '锈', '镜', '锅', '链', '销', '钧', '钰', '锦', '镇', '铎', '锟', '锵', '镛', '镞', '镖', '镗', '镟', '镝', '镢', '镚', '镙', '镘', '镪', '镦', '镏', '镒', '镓', '镔', '铄', '铸', '锻', '炼', '焊', '铄', '铣', '锉', '锃', '锴', '锶', '锼', '锾', '锿', '镂', '镯', '镕', '镔', '镕', '镳', '镘', '镪', '镦', '镏', '镒', '镓', '镔', '镕', '镚', '镛', '镞', '镖', '镗', '镘', '镪', '镦', '镏', '镒', '镓', '镔'];

const MuRadicals = ['木', '艹', '禾', '竹', '米', '耒', '豆', '果', '木', '林', '森', '树', '松', '柏', '柳', '杨', '槐', '樟', '桂', '桃', '李', '梅', '梨', '柿', '栗', '枣', '杏', '桔', '橙', '柚', '樱', '桐', '梧', '杉', '楠', '枫', '榕', '槿', '栅', '栏', '桌', '椅', '柜', '架', '板', '栋', '梁', '柱', '枝', '叶', '根', '茎', '花', '草', '菊', '兰', '莲', '葵', '芳', '芬', '芸', '芹', '芝', '茜', '萍', '莉', '蓉', '桦', '榛', '槁', '槊', '榕', '檠', '檫', '檬', '櫂', '櫚', '櫻', '櫟', '櫻', '欅', '欄', '欒', '欖', '欗', '欘', '欙', '欚', '欛', '欜', '欝', '欞', '欟', '歺', '歾', '殳', '殲', '殸', '殹', '殻', '殼', '殽', '殾', '殿', '毀', '毀', '毐', '毑', '毚', '氀', '氁', '氂', '氃', '氄', '氅', '氆', '氇', '氈', '氉', '氊', '氋', '氌', '氍', '氎', '氐', '民', '氒', '気', '氜', '氝', '氞', '氟', '氠', '氡', '氡', '氥', '氦', '氮', '氧', '氨', '氬', '氭', '氱', '氲', '氲', '氤', '氲'];

const ShuiRadicals = ['水', '氵', '雨', '冫', '衤', '舟', '鱼', '水', '海', '河', '湖', '江', '泉', '溪', '波', '涛', '浪', '洋', '深', '清', '池', '潭', '泽', '汉', '沛', '涌', '流', '洪', '汛', '汤', '温', '湾', '港', '滨', '洲', '滩', '渔', '润', '涵', '淑', '淇', '淋', '湄', '淞', '洁', '淳', '湘', '淼', '瀚', '瀞', '灏', '沣', '汶', '泗', '泊', '洱', '涪', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞', '浐', '灞'];

const HuoRadicals = ['火', '灬', '亻', '忄', '心', '赤', '光', '火', '炎', '焱', '焰', '烟', '烽', '炳', '炜', '烁', '焕', '灿', '煜', '煌', '熠', '熔', '煅', '烧', '烤', '炖', '炮', '炉', '灶', '灯', '烛', '炬', '炭', '煤', '电', '光', '明', '晴', '晶', '旭', '晨', '晖', '晔', '晟', '昱', '昭', '景', '暖', '熙', '煦', '炀', '煊', '熳', '焜', '焘', '焐', '焓', '焕', '炜', '焯', '焱', '煐', '煣', '煥', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩', '煩'];

const TuRadicals = ['土', '山', '石', '田', '王', '玉', '土', '地', '山', '岩', '石', '砂', '砾', '坡', '坪', '坝', '城', '墙', '堡', '塔', '坛', '垒', '圣', '坤', '均', '坚', '坦', '坪', '坤', '城', '培', '基', '堂', '域', '坊', '堆', '垠', '址', '埔', '埂', '埃', '壤', '垄', '墟', '墅', '塞', '均', '坚', '坤', '城', '培', '基', '堂', '域', '坊', '堆', '王', '玉', '皇', '帝', '圣', '国', '土', '田', '由', '戊', '己', '辰', '戌', '丑', '未', '中', '黄', '甘', '田', '由', '土', '地', '山', '岩', '石', '砂', '砾', '坡', '坪', '坝', '城', '墙', '堡', '塔', '坛', '垒', '圣', '坤', '均', '坚', '坦', '坪', '坤', '城', '培', '基', '堂', '域', '坊', '堆'];

const JinChars = new Set(['金', '银', '铜', '铁', '钢', '铂', '钱', '铃', '锋', '铭', '钦', '钧', '钰', '锆', '铧', '铎', '鑫', '锦', '镇', '锐', '镰', '针', '钊', '钗', '钏', '铮', '铖', '铉', '铙', '铌', '钹', '钿', '铄', '铸', '键', '锵', '铰', '铲', '锭', '镕', '镳', '镞', '镖', '镗', '镘', '镪', '镦', '镏', '镒', '镓', '镔', '镚', '镛', '镢', '镝', '镟', '镙', '辛', '酉', '庚', '利', '刀', '刂', '力', '功', '动', '劳', '势', '勤', '助', '劲', '勇', '勉', '励', '努', '切', '划', '创', '别', '删', '判', '剂', '刻', '刚', '则', '制', '刺', '削', '剑', '副', '割', '剥', '剧', '前', '到', '锋', '锐', '铭', '针', '钱', '钟', '铃', '钢', '铁', '铜', '银', '锡', '铅', '铂', '钻', '钩', '铲', '锄', '锯', '钉', '铛', '锭', '键', '锁', '锈', '镜', '锅', '链', '销']);

const MuChars = new Set(['木', '林', '森', '树', '松', '柏', '柳', '杨', '槐', '樟', '桂', '桃', '李', '梅', '竹', '禾', '米', '梁', '栋', '柱', '枝', '叶', '根', '茎', '花', '草', '菊', '兰', '莲', '葵', '芳', '芬', '芸', '芹', '芝', '茜', '萍', '莉', '蓉', '桦', '樱', '桐', '梧', '杉', '楠', '枫', '榕', '槿', '栅', '栏', '桌', '椅', '柜', '架', '板', '甲', '乙', '寅', '卯', '东', '春', '青', '苍', '茂', '苗', '芽', '萌', '萃', '芬', '芳', '芸', '芹', '芝', '茜', '萍', '莉', '蓉', '桦', '樱', '桐', '梧', '杉', '楠', '枫', '榕', '槿', '栅', '栏']);

const ShuiChars = new Set(['水', '海', '河', '湖', '江', '泉', '溪', '波', '涛', '浪', '洋', '深', '清', '池', '潭', '泽', '汉', '沛', '涌', '流', '洪', '汛', '汤', '温', '湾', '港', '滨', '洲', '滩', '渔', '润', '涵', '淑', '淇', '淋', '湄', '淞', '洁', '淳', '湘', '淼', '瀚', '灏', '沣', '汶', '泗', '泊', '洱', '涪', '壬', '癸', '子', '亥', '北', '冬', '黑', '玄', '冷', '冰', '冻', '凉', '寒', '凝', '泪', '汗', '洗', '浴', '洒', '浇', '灌', '滴', '泡', '漫', '溢', '漂', '浮', '沉', '潜', '泳', '渡', '游', '涉', '沐', '浴', '洁', '清', '润', '涵']);

const HuoChars = new Set(['火', '炎', '焱', '焰', '烟', '烽', '炳', '炜', '烁', '焕', '灿', '煜', '煌', '熠', '熔', '煅', '烧', '烤', '炖', '炮', '炉', '灶', '灯', '烛', '炬', '炭', '煤', '电', '光', '明', '晴', '晶', '旭', '晨', '晖', '晔', '晟', '昱', '昭', '景', '暖', '熙', '煦', '炀', '煊', '熳', '焜', '丙', '丁', '巳', '午', '南', '夏', '红', '赤', '丹', '紫', '热', '燥', '烈', '烫', '炎', '烨', '焕', '煜', '煌', '炫', '灿', '炳', '炜', '烁', '烽', '烟', '焰']);

const TuChars = new Set(['土', '地', '山', '岩', '石', '砂', '砾', '坡', '坪', '坝', '城', '墙', '堡', '塔', '坛', '垒', '圣', '坤', '均', '坚', '坦', '坪', '坤', '城', '培', '基', '堂', '域', '坊', '堆', '垠', '址', '埔', '埂', '埃', '壤', '垄', '墟', '墅', '塞', '王', '玉', '皇', '帝', '圣', '国', '土', '田', '由', '戊', '己', '辰', '戌', '丑', '未', '中', '黄', '甘', '田', '由']);

const WuxingUnicodeRanges: Record<WuxingType, Array<[number, number]>> = {
    '金': [[0x91D1, 0x91D1], [0x92C4, 0x92C8], [0x9322, 0x9325], [0x9488, 0x948B], [0x951A, 0x9521], [0x9546, 0x954B], [0x95C7, 0x95CC], [0x96D5, 0x96DD], [0x92F6, 0x9302], [0x94B1, 0x94B8], [0x952F, 0x9533], [0x955C, 0x9561], [0x9593, 0x9598], [0x961B, 0x9620], [0x96B6, 0x96BE], [0x9322, 0x9325], [0x9488, 0x948B], [0x951A, 0x9521], [0x9546, 0x954B], [0x95C7, 0x95CC], [0x96D5, 0x96DD]],
    '木': [[0x6728, 0x6728], [0x6797, 0x679A], [0x6811, 0x6814], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3], [0x67CF, 0x67D3]],
    '水': [[0x6C34, 0x6C34], [0x6D77, 0x6D7A], [0x6CB3, 0x6CB6], [0x6E56, 0x6E59], [0x6C5F, 0x6C62], [0x6CC9, 0x6CCD], [0x6EAA, 0x6EAE], [0x6CE2, 0x6CE5], [0x6D9B, 0x6D9E], [0x6D6A, 0x6D6D], [0x6D0B, 0x6D0E], [0x6DF1, 0x6DF4], [0x6E05, 0x6E08], [0x6C60, 0x6C63], [0x6F6D, 0x6F6E], [0x6CFD, 0x6CFE], [0x6C49, 0x6C4C], [0x6C9B, 0x6C9E], [0x6D8C, 0x6D91], [0x6D41, 0x6D44]],
    '火': [[0x706B, 0x706B], [0x7089, 0x708C], [0x7131, 0x7134], [0x7136, 0x7139], [0x70DF, 0x70E2], [0x70BD, 0x70C0], [0x70B3, 0x70B6], [0x70C9, 0x70CC], [0x70E6, 0x70E9], [0x711A, 0x711D], [0x714C, 0x714F], [0x7156, 0x7159], [0x7164, 0x7167], [0x7170, 0x7173], [0x7176, 0x7179], [0x718A, 0x718D], [0x7194, 0x7197], [0x71A8, 0x71AB], [0x71B8, 0x71BB], [0x71C3, 0x71C6]],
    '土': [[0x571F, 0x571F], [0x5730, 0x5733], [0x5C71, 0x5C74], [0x5CA9, 0x5CAC], [0x77F3, 0x77F6], [0x7802, 0x7805], [0x7832, 0x7835], [0x5761, 0x5764], [0x576A, 0x576D], [0x57CE, 0x57D1], [0x5899, 0x589C], [0x5A0A, 0x5A0D], [0x5854, 0x5857], [0x5706, 0x5709], [0x5792, 0x5795], [0x5723, 0x5726], [0x5764, 0x5767], [0x5747, 0x574A], [0x575A, 0x575D], [0x5766, 0x5769]]
};

const ShengKe = {
    '金': { sheng: '水', ke: '木' },
    '木': { sheng: '火', ke: '土' },
    '水': { sheng: '木', ke: '火' },
    '火': { sheng: '土', ke: '金' },
    '土': { sheng: '金', ke: '水' }
};

function isInUnicodeRange(char: string, ranges: Array<[number, number]>): boolean {
    const code = char.charCodeAt(0);
    for (const [start, end] of ranges) {
        if (code >= start && code <= end) {
            return true;
        }
    }
    return false;
}

function hasRadical(char: string, radicals: string[]): boolean {
    return radicals.some(radical => char.includes(radical));
}

function getPinyinFirstChar(char: string): string | null {
    const pinyinMap: Record<string, string> = {
        '黄': 'huang', '刘': 'liu', '陈': 'chen', '杨': 'yang', '赵': 'zhao', '周': 'zhou', '吴': 'wu', '徐': 'xu', '孙': 'sun',
        '马': 'ma', '朱': 'zhu', '胡': 'hu', '林': 'lin', '郭': 'guo', '何': 'he', '罗': 'luo', '高': 'gao', '梁': 'liang', '谢': 'xie',
        '宋': 'song', '唐': 'tang', '许': 'xu', '韩': 'han', '冯': 'feng', '邓': 'deng', '曹': 'cao', '彭': 'peng', '曾': 'zeng', '肖': 'xiao',
        '田': 'tian', '董': 'dong', '袁': 'yuan', '潘': 'pan', '于': 'yu', '蒋': 'jiang', '蔡': 'cai', '余': 'yu', '杜': 'du', '叶': 'ye',
        '程': 'cheng', '苏': 'su', '魏': 'wei', '吕': 'lv', '丁': 'ding', '任': 'ren', '沈': 'shen', '姚': 'yao', '卢': 'lu', '姜': 'jiang',
        '崔': 'cui', '钟': 'zhong', '谭': 'tan', '陆': 'lu', '汪': 'wang', '范': 'fan', '廖': 'liao', '石': 'shi', '金': 'jin', '韦': 'wei',
        '贾': 'jia', '夏': 'xia', '傅': 'fu', '方': 'fang', '邹': 'zou', '熊': 'xiong', '孟': 'meng', '秦': 'qin', '白': 'bai', '江': 'jiang',
        '阎': 'yan', '薛': 'xue', '尹': 'yin', '段': 'duan', '雷': 'lei', '侯': 'hou', '龙': 'long', '史': 'shi', '陶': 'tao', '黎': 'li',
        '贺': 'he', '顾': 'gu', '毛': 'mao', '郝': 'hao', '邵': 'shao', '万': 'wan', '钱': 'qian', '严': 'yan', '覃': 'tan', '武': 'wu',
        '戴': 'dai', '莫': 'mo', '孔': 'kong', '向': 'xiang', '汤': 'tang', '常': 'chang', '温': 'wen', '康': 'kang', '施': 'shi', '文': 'wen',
        '牛': 'niu', '樊': 'fan', '葛': 'ge', '彭': 'peng', '颜': 'yan', '倪': 'ni', '庞': 'pang', '邢': 'xing', '俞': 'yu', '翟': 'zhai',
        '焦': 'jiao', '柳': 'liu', '殷': 'yin', '炎': 'yan', '炳': 'bing', '炜': 'wei', '烁': 'shuo', '焕': 'huan', '灿': 'can', '煜': 'yu',
        '煌': 'huang', '熠': 'yi', '熔': 'rong', '煅': 'duan', '烧': 'shao', '烤': 'kao', '炖': 'dun', '炮': 'pao', '炉': 'lu', '灶': 'zao',
        '灯': 'deng', '烛': 'zhu', '炬': 'ju', '炭': 'tan', '煤': 'mei', '电': 'dian', '光': 'guang', '明': 'ming', '晴': 'qing', '晶': 'jing',
        '旭': 'xu', '晨': 'chen', '晖': 'hui', '晔': 'ye', '晟': 'sheng', '昱': 'yu', '昭': 'zhao', '景': 'jing', '暖': 'nuan', '熙': 'xi',
        '煦': 'xu', '炀': 'yang', '煊': 'xuan', '熳': 'man', '焜': 'kun', '土': 'tu', '地': 'di', '山': 'shan', '岩': 'yan', '石': 'shi',
        '砂': 'sha', '砾': 'li', '坡': 'po', '坪': 'ping', '坝': 'ba', '城': 'cheng', '墙': 'qiang', '堡': 'bao', '塔': 'ta', '坛': 'tan',
        '垒': 'lei', '圣': 'sheng', '坤': 'kun', '均': 'jun', '坚': 'jian', '坦': 'tan', '培': 'pei', '基': 'ji', '堂': 'tang', '域': 'yu',
        '坊': 'fang', '堆': 'dui', '垠': 'yin', '址': 'zhi', '埔': 'pu', '埂': 'geng', '埃': 'ai', '壤': 'rang', '垄': 'long', '墟': 'xu',
        '墅': 'shu', '塞': 'sai', '王': 'wang', '玉': 'yu', '皇': 'huang', '帝': 'di', '国': 'guo', '田': 'tian', '由': 'you', '木': 'mu',
        '林': 'lin', '森': 'sen', '树': 'shu', '松': 'song', '柏': 'bai', '柳': 'liu', '槐': 'huai', '樟': 'zhang', '桂': 'gui', '桃': 'tao',
        '李': 'li', '梅': 'mei', '竹': 'zhu', '禾': 'he', '米': 'mi', '梁': 'liang', '栋': 'dong', '柱': 'zhu', '枝': 'zhi', '叶': 'ye',
        '根': 'gen', '茎': 'jing', '花': 'hua', '草': 'cao', '菊': 'ju', '兰': 'lan', '莲': 'lian', '葵': 'kui', '芳': 'fang', '芬': 'fen',
        '芸': 'yun', '芹': 'qin', '芝': 'zhi', '茜': 'qian', '萍': 'ping', '莉': 'li', '蓉': 'rong', '桦': 'hua', '樱': 'ying', '桐': 'tong',
        '梧': 'wu', '杉': 'shan', '楠': 'nan', '枫': 'feng', '榕': 'rong', '槿': 'jin', '栅': 'zha', '栏': 'lan', '水': 'shui', '海': 'hai',
        '河': 'he', '湖': 'hu', '江': 'jiang', '泉': 'quan', '溪': 'xi', '波': 'bo', '涛': 'tao', '浪': 'lang', '洋': 'yang', '深': 'shen',
        '清': 'qing', '池': 'chi', '潭': 'tan', '泽': 'ze', '汉': 'han', '沛': 'pei', '涌': 'yong', '流': 'liu', '洪': 'hong', '汛': 'xun',
        '温': 'wen', '湾': 'wan', '港': 'gang', '滨': 'bin', '洲': 'zhou', '滩': 'tan', '渔': 'yu', '润': 'run', '涵': 'han', '淑': 'shu',
        '淇': 'qi', '淋': 'lin', '湄': 'mei', '淞': 'song', '洁': 'jie', '淳': 'chun', '湘': 'xiang', '淼': 'miao', '瀚': 'han', '灏': 'hao',
        '沣': 'feng', '汶': 'wen', '泗': 'si', '泊': 'bo', '洱': 'er', '涪': 'fu', '银': 'yin', '铜': 'tong', '铁': 'tie', '钢': 'gang',
        '铂': 'bo', '铃': 'ling', '锋': 'feng', '铭': 'ming', '钦': 'qin', '钧': 'jun', '钰': 'yu', '锆': 'gao', '铧': 'hua', '铎': 'duo',
        '鑫': 'xin', '锦': 'jin', '镇': 'zhen', '锐': 'rui', '镰': 'lian', '针': 'zhen', '钊': 'zhao', '钗': 'chai', '钏': 'chuan', '铮': 'zheng',
        '铖': 'cheng', '铉': 'xuan', '铙': 'nao', '铌': 'ni', '钹': 'bo', '钿': 'dian', '铄': 'shuo', '铸': 'zhu', '键': 'jian', '锵': 'qiang',
        '铰': 'jiao', '铲': 'chan', '锭': 'ding', '镕': 'rong', '镳': 'biao', '镞': 'zu', '镖': 'biao', '镗': 'tang', '镘': 'man', '镪': 'qiang',
        '镦': 'dun', '镏': 'liu', '镒': 'yi', '镓': 'jia', '镔': 'bin', '镚': 'beng', '镛': 'yong', '镢': 'jue', '镝': 'di', '镟': 'xuan', '镙': 'luo',
        '刘': 'liu', '陈': 'chen', '杨': 'yang', '赵': 'zhao', '黄': 'huang', '周': 'zhou', '吴': 'wu', '徐': 'xu', '孙': 'sun', '马': 'ma', '朱': 'zhu',
        '胡': 'hu', '林': 'lin', '郭': 'guo', '何': 'he', '罗': 'luo', '高': 'gao', '梁': 'liang', '谢': 'xie', '宋': 'song', '唐': 'tang', '许': 'xu',
        '韩': 'han', '冯': 'feng', '邓': 'deng', '曹': 'cao', '彭': 'peng', '曾': 'zeng', '肖': 'xiao', '田': 'tian', '董': 'dong', '袁': 'yuan',
        '潘': 'pan', '于': 'yu', '蒋': 'jiang', '蔡': 'cai', '余': 'yu', '杜': 'du', '叶': 'ye', '程': 'cheng', '苏': 'su', '魏': 'wei', '吕': 'lv',
        '丁': 'ding', '任': 'ren', '沈': 'shen', '姚': 'yao', '卢': 'lu', '姜': 'jiang', '崔': 'cui', '钟': 'zhong', '谭': 'tan', '陆': 'lu',
        '汪': 'wang', '范': 'fan', '廖': 'liao', '石': 'shi', '金': 'jin', '韦': 'wei', '贾': 'jia', '夏': 'xia', '傅': 'fu', '方': 'fang',
        '邹': 'zou', '熊': 'xiong', '孟': 'meng', '秦': 'qin', '白': 'bai', '江': 'jiang', '阎': 'yan', '薛': 'xue', '尹': 'yin', '段': 'duan',
        '雷': 'lei', '侯': 'hou', '龙': 'long', '史': 'shi', '陶': 'tao', '黎': 'li', '贺': 'he', '顾': 'gu', '毛': 'mao', '郝': 'hao',
        '邵': 'shao', '万': 'wan', '钱': 'qian', '严': 'yan', '覃': 'tan', '武': 'wu', '戴': 'dai', '莫': 'mo', '孔': 'kong', '向': 'xiang',
        '汤': 'tang', '常': 'chang', '温': 'wen', '康': 'kang', '施': 'shi', '文': 'wen', '牛': 'niu', '樊': 'fan', '葛': 'ge', '彭': 'peng',
        '颜': 'yan', '倪': 'ni', '庞': 'pang', '邢': 'xing', '俞': 'yu', '翟': 'zhai', '焦': 'jiao', '柳': 'liu', '殷': 'yin'
    };
    const pinyin = pinyinMap[char];
    return pinyin ? pinyin.charAt(0).toLowerCase() : null;
}

export function getCharWuxing(char: string): WuxingType {
    if (char.length !== 1) return '土';

    if (JinChars.has(char)) return '金';
    if (MuChars.has(char)) return '木';
    if (ShuiChars.has(char)) return '水';
    if (HuoChars.has(char)) return '火';
    if (TuChars.has(char)) return '土';

    if (hasRadical(char, JinRadicals)) return '金';
    if (hasRadical(char, MuRadicals)) return '木';
    if (hasRadical(char, ShuiRadicals)) return '水';
    if (hasRadical(char, HuoRadicals)) return '火';
    if (hasRadical(char, TuRadicals)) return '土';

    if (isInUnicodeRange(char, WuxingUnicodeRanges['金'])) return '金';
    if (isInUnicodeRange(char, WuxingUnicodeRanges['木'])) return '木';
    if (isInUnicodeRange(char, WuxingUnicodeRanges['水'])) return '水';
    if (isInUnicodeRange(char, WuxingUnicodeRanges['火'])) return '火';
    if (isInUnicodeRange(char, WuxingUnicodeRanges['土'])) return '土';

    const firstChar = getPinyinFirstChar(char);
    if (firstChar) {
        if (['b', 'p', 'm', 'f', 'j', 'q', 'x'].includes(firstChar)) return '木';
        if (['d', 't', 'n', 'l', 'g', 'k', 'h', 'r', 'y', 'w'].includes(firstChar)) return '火';
        if (['z', 'c', 's', 'a', 'o', 'e', 'i', 'u', 'v'].includes(firstChar)) return '金';
        if (['zh', 'ch', 'sh'].includes(firstChar)) return '水';
    }

    const code = char.charCodeAt(0);
    if (code >= 0x4E00 && code <= 0x9FA5) {
        const region = Math.floor((code - 0x4E00) / 94);
        if (region >= 0 && region <= 17) return '木';
        if (region >= 18 && region <= 35) return '火';
        if (region >= 36 && region <= 53) return '土';
        if (region >= 54 && region <= 71) return '金';
        if (region >= 72 && region <= 89) return '水';
    }

    return '土';
}

export function getNameWuxing(name: string): WuxingType[] {
    const result: WuxingType[] = [];
    for (let i = 0; i < name.length; i++) {
        result.push(getCharWuxing(name[i]));
    }
    return result;
}

export function calculateScore(yourName: string, hisName: string): { score: number; details: string[]; suggestion: string; suggestionImage: string } {
    const yourWuxing = getNameWuxing(yourName);
    const hisWuxing = getNameWuxing(hisName);

    console.log(`名字五行: ${yourName}=${yourWuxing}, ${hisName}=${hisWuxing}`);

    let shengCount = 0;
    let keCount = 0;
    let neutralCount = 0;
    const details: string[] = [];

    for (let i = 0; i < yourWuxing.length; i++) {
        const me = yourWuxing[i];
        for (let j = 0; j < hisWuxing.length; j++) {
            const ta = hisWuxing[j];
            if (ShengKe[ta].sheng === me) {
                shengCount++;
                details.push(`${ta}生${me}`);
            } else if (ShengKe[ta].ke === me) {
                keCount++;
                details.push(`${ta}克${me}`);
            } else {
                neutralCount++;
            }
        }
    }

    console.log(`逐个判断结果(我的字 vs 他的字):`);
    for (let i = 0; i < yourWuxing.length; i++) {
        const me = yourWuxing[i];
        for (let j = 0; j < hisWuxing.length; j++) {
            const ta = hisWuxing[j];
            let relation = '无';
            if (ShengKe[ta].sheng === me) relation = '生';
            else if (ShengKe[ta].ke === me) relation = '克';
            console.log(`  ${me} vs ${ta}: ${relation}`);
        }
    }

    const totalCombinations = yourWuxing.length * hisWuxing.length;
    console.log(`生克统计: 他生我=${shengCount}, 他克我=${keCount}, 不生不克=${neutralCount}, 总组合=${totalCombinations}`);

    let baseScore = 0;
    let shengBonus = 0;
    let kePenalty = 0;
    let neutralBonus = neutralCount * 10;

    if (shengCount === totalCombinations) {
        shengBonus = 100;
    } else if (shengCount >= 2) {
        shengBonus = 80;
    } else if (shengCount === 1) {
        shengBonus = 30;
    }

    if (keCount === totalCombinations) {
        kePenalty = 100;
    } else if (keCount >= 2) {
        kePenalty = 50;
    } else if (keCount === 1) {
        kePenalty = 20;
    }

    let finalScore = baseScore + shengBonus - kePenalty + neutralBonus;

    if (finalScore < 0) finalScore = 0;
    if (finalScore > 100) finalScore = 100;

    console.log(`得分计算: 基础分=${baseScore}, 生${shengCount}次加成=${shengBonus}, 克${keCount}次扣减=${kePenalty}, 不生不克${neutralCount}次加成=${neutralBonus}, 最终=${finalScore}`);

    const suggestionResult = getSuggestion(finalScore);

    return {
        score: finalScore,
        details: details,
        suggestion: suggestionResult.text,
        suggestionImage: suggestionResult.image
    };
}

function getSuggestion(score: number): { text: string; image: string } {
    const lowTexts = [
        '彼此的风格差异较大，相处容易产生观点碰撞，多多包容会收获不一样的新鲜感',
        '双方偏好与思路区别明显，日常互动容易出现想法分歧，耐心沟通更重要',
        '两个人的喜好、思维节奏存在不小差距，不妨试着接纳对方不一样的角度'
    ];
    const lowImages = ['imgs/30.png', 'imgs/50.png'];

    const midTexts = [
        '你们的相处碰撞感不同关键词相遇，衍生不一样的互动画面',
        '两个人在一起会形成独特的互动风格',
        '彼此风格不同，适合互相包容、新鲜互动'
    ];
    const midImages = ['imgs/65.png', 'imgs/80.png'];

    const highTexts = [
        '相处中互相扶持的一面，大于想法分歧带来的摩擦，多沟通便能收获更好的相处体验',
        '互相成全的暖意，多于观点碰撞带来的小矛盾',
        '双向给予的暖意，远胜过想法差异产生的隔阂'
    ];
    const highImages = ['imgs/90.png', 'imgs/100.png'];

    let texts: string[];
    let images: string[];

    if (score < 50) {
        texts = lowTexts;
        images = lowImages;
    } else if (score < 80) {
        texts = midTexts;
        images = midImages;
    } else {
        texts = highTexts;
        images = highImages;
    }

    const randomTextIndex = Math.floor(Math.random() * texts.length);
    const randomImageIndex = Math.floor(Math.random() * images.length);

    return {
        text: texts[randomTextIndex],
        image: images[randomImageIndex]
    };
}