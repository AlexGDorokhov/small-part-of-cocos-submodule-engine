import { Node, instantiate, Constructor } from 'cc';
import { UIWindowBehaviour } from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/Behaviours/UIWindowBehaviour";
import { UIWindowConfigBase } from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import { UIWindowExtension } from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";
import { IMediator } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {UIWindowMediator} from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/UIWindowMediator";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";

export abstract class UIPopupMediator<TBehaviour extends UIWindowBehaviour> extends UIWindowMediator<TBehaviour> {


    protected override get config(): PopupConfigBase<UIWindowExtension<IMediator>> {
        return this._config as PopupConfigBase<UIWindowExtension<IMediator>>;
    }

    protected override set config(value: PopupConfigBase<UIWindowExtension<IMediator>> | null) {
        this._config = value;
    }
    
    protected override onShown(): void {
        this.sendNotice(UINoticeKey.PopupShown, this.config);
    }

    protected override onHidden(): void {
        this.sendNotice(UINoticeKey.PopupHidden, this.config);
    }
    
}