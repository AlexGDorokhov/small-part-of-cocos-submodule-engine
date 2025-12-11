import { Node, instantiate, Constructor } from 'cc';

import {BaseUIWindowBehaviour} from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/Behaviours/BaseUIWindowBehaviour";
import {UIWindowConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {UIWindowExtension} from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";
import {IMediator, INotification, Mediator} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {NoticeTracking} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/NoticeTracking";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";

export abstract class BaseUIWindowMediator<TBehaviour extends BaseUIWindowBehaviour> extends Mediator<TBehaviour> {
    protected _isShownWhenRegister: boolean = false;

    protected container: Node | null = null;
    protected behaviour: TBehaviour | null = null;
    
    protected _config: UIWindowConfigBase<UIWindowExtension<IMediator>> | null = null;
    protected get config(): UIWindowConfigBase<UIWindowExtension<IMediator>> | null {
        return this._config;
    }
    protected set config(value: UIWindowConfigBase<UIWindowExtension<IMediator>> | null) {
        this._config = value;
    }
    
    protected viewNode: Node | null = null;

    protected behaviourClass: Constructor<TBehaviour>;
    protected wasInitialized = false;


    protected _listNotificationInterests: string[] = [];

    public override listNotificationInterests(): string[] {
        return this._listNotificationInterests;
    }

    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
        container?: Node | null,
        isShownWhenRegister: boolean = false,
    ) {
        super();
        this.behaviourClass = behaviourClass;

        this.initialize(config, window, container ?? null, isShownWhenRegister);
        this.addToListNotificationInterests();
    }
    
    protected addToListNotificationInterests() {
        this._listNotificationInterests.push(UINoticeKey.HideUIWindow);
    }

    protected initialize(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        container: Node | null = null,
        isShownWhenRegister = false,
    ) {
        if (this.wasInitialized) {
            return;
        }
        this.wasInitialized = true;

        if (!config) {
            throw new Error("The Config of UI window cannot be null");
        }

        this.container = container ?? config.layer?.uiContainer ?? null;
        this.config = config;

        if (!this.container) {
            throw new Error(`The Container of UI window with name "${this.config.asset.name}" has not been found`);
        }

        if (!window) {
            throw new Error(`The Node (window) of UI window with name "${this.config.asset.name}" is null`);
        }

        this.viewNode = instantiate(window);
        this.container.addChild(this.viewNode);

        this.behaviour = this.viewNode.getComponent<TBehaviour>(this.behaviourClass);

        if (!this.behaviour) {
            this.viewNode.removeFromParent();
            this.viewNode.destroy();
            this.viewNode = null;
            throw new Error(`The Behaviour with type "${this.behaviourClass.name}" has not been found in the Node with name "${this.config.asset.name}"`);
        } else {
            this._isShownWhenRegister = isShownWhenRegister;
        }
        
    }
    
    public sendNotice(key: string, body?: any): void {
        NoticeTracking.explore(key, body);
        this.sendNotification(key, body);
    }

    public override handleNotification(notification: INotification): void {
        switch (notification.name) {
            case UINoticeKey.HideUIWindow:
                this.onHideWindow(notification);
                break;
        }
    }


    public onRegister(): void {
        
        if (!this.behaviour) return;

        this.behaviour.onShownAction = this.onShown.bind(this);
        this.behaviour.onHiddenAction = this.onHidden.bind(this);
        this.behaviour.closeAction = this.close.bind(this);

        if (this._isShownWhenRegister) {
            this.show();
        }
    }

    public onRemove(): void {

	if (this.behaviour) {
            this.behaviour.onShownAction = undefined;
            this.behaviour.onHiddenAction = undefined;
            this.behaviour.closeAction = undefined;
        }

        this.behaviour = null;
        this.container = null;
        this.config = null;
        this._isShownWhenRegister = false;

        if (this.viewNode) {
            this.viewNode.removeFromParent();
            this.viewNode.destroy();
            this.viewNode = null;
        }
    }

    private onHideWindow(notification: INotification) {
        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;
            if (this.config && this.config === notice.config) {
                this.behaviour?.tryHide();
            }
        }
    }

    protected show() {
        this.behaviour?.tryShow();
    }

    protected hide() {
        this.sendNotice(UINoticeKey.HideUIWindow, new UIWindowNotice(this.config!));
    }

    protected onShown() {
        this.sendNotice(UINoticeKey.UIWindowShown, new UIWindowNotice(this.config!));
    }

    protected onHidden() {
        this.sendNotice(UINoticeKey.UIWindowHidden, new UIWindowNotice(this.config!));
    }

    protected close() {
        const soundClick = this.config?.soundClick;
        if (soundClick && this.behaviour?.soundManager) {
            this.behaviour.soundManager.play(soundClick);
        }
        this.hide();
    }

}
