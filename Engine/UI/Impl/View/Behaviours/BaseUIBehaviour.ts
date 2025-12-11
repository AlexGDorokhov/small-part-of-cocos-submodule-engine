import { _decorator, Component, Node, UITransform, Color, Sprite, SpriteComponent, Camera, tween, input, Input, EventMouse } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BaseUIBehaviour')
export class BaseUIBehaviour extends Component {

    public static StaticUICamera: Camera | null = null;

    @property(SpriteComponent)
    private splashScreen!: SpriteComponent;

    @property(Camera)
    private uiCamera!: Camera;

    private _activated: boolean = false;
    public get activated(): boolean {
        return this._activated;
    }

    public OnFirstClick: (() => void) | null = null;

    start() {
        this.checkForFirstClick();
        BaseUIBehaviour.StaticUICamera = this.uiCamera;
    }

    showSplashScreen() {
        this.splashScreen.node.setSiblingIndex(this.splashScreen.node.parent!.children.length - 1);
        this.splashScreen.node.active = true;

        const color = this.splashScreen.color.clone();
        color.a = 255;
        this.splashScreen.color = color;
    }

    hideSplashScreen(force: boolean) {
        if (force) {
            this.splashScreen.node.active = false;
        } else {
            tween(this.splashScreen)
                .to(1, { color: new Color(this.splashScreen.color.r, this.splashScreen.color.g, this.splashScreen.color.b, 0) })
                .call(() => {
                    this.splashScreen.node.active = false;
                })
                .start();
        }
    }

    private checkForFirstClick() {
        return new Promise<void>((resolve) => {
            const onMouseDown = (event: EventMouse) => {
                input.off(Input.EventType.MOUSE_DOWN, onMouseDown);
                this._activated = true;
                if (this.OnFirstClick) {
                    this.OnFirstClick();
                    this.OnFirstClick = null;
                }
                resolve();
            };
            input.on(Input.EventType.MOUSE_DOWN, onMouseDown);
        });
    }
    
    onDestroy() {
        this.splashScreen = null!;
        this._activated = false;
    }
}
