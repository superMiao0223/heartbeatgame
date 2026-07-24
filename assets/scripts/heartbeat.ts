import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('heartbeat')
export class heartbeat extends Component {
    start() {
        console.log('hello world')
        console.log('test')
    }

    update(deltaTime: number) {

    }
}


