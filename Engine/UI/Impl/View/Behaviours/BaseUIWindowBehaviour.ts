import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseUIWindowBehaviour')
export class BaseUIWindowBehaviour extends Component {

    public onShownAction?: () => void;
    public onHiddenAction?: () => void;
    public closeAction?: () => void;

    private _isShown: boolean = false;
    private _isHidden: boolean = false;

    protected onLoad() {
        
    }

    public tryShow(): void {
        if (!this._isShown) {
            this._isShown = true;
            this.show();
        } else {
            console.warn(`The Node with name "${this.node.name}" has been already shown`);
        }
    }

    public tryShowWithDelay(delayInSeconds: number): void {
        this.scheduleOnce(() => this.tryShow(), delayInSeconds);
    }

    public tryHide(): void {
        if (!this._isHidden) {
            this._isHidden = true;
            this.hide();
        } else {
            console.warn(`The Node with name "${this.node.name}" has been already hidden`);
        }
    }

    protected show(): void {
        this.node.active = true;
    }
    
    protected start() {
        console.log(`UI element ${this.constructor.name} attached and running`);
        this.onShownAction?.();
    }

    protected hide(): void {
        this.node.active = false;
        this.onHiddenAction?.();
    }

    protected onDestroy(): void {
        this.closeAction = () => {};
        this.onShownAction = () => {};
        this.onHiddenAction = () => {};

        this._isShown = false;
        this._isHidden = false;
    }
}
