import { _decorator, Component, Label, EditBox, find, director, Sprite, SpriteFrame, resources, Node, Vec3, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import { GameData } from './start_game';

@ccclass('result')
export class result extends Component {
    @property({ tooltip: '建议文字X轴位置' })
    suggestionTextX: number = -200;

    @property({ tooltip: '建议文字Y轴位置' })
    suggestionTextY: number = -150;

    @property({ tooltip: '建议文字最大宽度（超过自动换行）' })
    suggestionMaxWidth: number = 400;

    @property({ tooltip: '建议图片X轴位置' })
    suggestionImageX: number = 0;

    @property({ tooltip: '建议图片Y轴位置' })
    suggestionImageY: number = 20;

    @property({ tooltip: '建议图片缩放倍数' })
    suggestionImageScale: number = 2;

    start() {
        console.log('========== result start() 执行了 ==========');
        console.log('属性值:', {
            suggestionTextX: this.suggestionTextX,
            suggestionTextY: this.suggestionTextY,
            suggestionMaxWidth: this.suggestionMaxWidth,
            suggestionImageX: this.suggestionImageX,
            suggestionImageY: this.suggestionImageY,
            suggestionImageScale: this.suggestionImageScale
        });
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
            this.setupSuggestionLabel(hitResNode);
        }

        this.initSuggestionImage(hitResNode);
    }

    setupSuggestionLabel(hitResNode: Node) {
        const lbl = hitResNode.getComponent(Label);
        if (lbl) {
            lbl.string = GameData.suggestion;
            lbl.overflow = Label.Overflow.RESIZE_HEIGHT;
            lbl.enableWrapText = true;

            const uiTransform = hitResNode.getComponent(UITransform);
            if (uiTransform) {
                uiTransform.setContentSize(this.suggestionMaxWidth, uiTransform.contentSize.height);
            } else {
                const newUITransform = hitResNode.addComponent(UITransform);
                newUITransform.setContentSize(this.suggestionMaxWidth, 50);
            }

            console.log('设置建议文字位置:', {
                x: this.suggestionTextX,
                y: this.suggestionTextY,
                maxWidth: this.suggestionMaxWidth,
                文字内容: GameData.suggestion
            });

            hitResNode.setPosition(this.suggestionTextX, this.suggestionTextY, 0);
            console.log('设置后节点位置:', hitResNode.position);
        }
    }

    initSuggestionImage(hitResNode: Node | null) {
        const canvas = find('Canvas');
        if (!canvas) return;

        let imgNode = find('Canvas/suggestion_img');
        if (!imgNode) {
            imgNode = new Node('suggestion_img');
            canvas.addChild(imgNode);
            imgNode.addComponent(Sprite);
            imgNode.addComponent(UITransform);
            console.log('创建了新的 suggestion_img 节点');
        } else {
            console.log('找到已存在的 suggestion_img 节点');
        }

        console.log('设置图片属性:', {
            x: this.suggestionImageX,
            y: this.suggestionImageY,
            scale: this.suggestionImageScale
        });

        imgNode.setPosition(this.suggestionImageX, this.suggestionImageY, 0);
        imgNode.setScale(this.suggestionImageScale, this.suggestionImageScale, 1);
        console.log('设置后图片位置:', imgNode.position);
        console.log('设置后图片缩放:', imgNode.scale);

        // 关键：图片创建完成后，把文字节点放到最上层
        if (hitResNode) {
            const parent = hitResNode.parent;
            if (parent) {
                const index = parent.children.length - 1;
                hitResNode.setSiblingIndex(index);
            }
            console.log('文字节点已设为最上层 (siblingIndex:', hitResNode.getSiblingIndex ? hitResNode.getSiblingIndex() : 'N/A', ')');
        }

        if (GameData.suggestionImage) {
            const imagePath = GameData.suggestionImage.replace('.png', '');
            resources.load(imagePath + '/spriteFrame', SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.error('加载建议图片失败:', err);
                    return;
                }
                const sprite = imgNode!.getComponent(Sprite);
                if (sprite && spriteFrame) {
                    sprite.spriteFrame = spriteFrame;
                }
            });
        }
    }

    onClickTryAgain() {
        director.loadScene('main');
    }
}