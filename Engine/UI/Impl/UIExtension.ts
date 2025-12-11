import {Extension} from "db://assets/sm-ccengine-app/Engine/Extension";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import SetWindowStateCommand from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/States/SetWindowStateCommand";
import RemoveWindowStateCommand
    from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/States/RemoveWindowStateCommand";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {
    RegisterUIWindowCommand
} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Window/RegisterUIWindowCommand";
import {HideUIWindowCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Window/HideUIWindowCommand";
import {ShowUIWindowCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Window/ShowUIWindowCommand";
import {BaseUIMediator} from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/BaseUIMediator";
import {UIWindowShownCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Window/UIWindowShownCommand";
import {
    UIWindowHiddenCommand
} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Window/UIWindowHiddenCommand";
import {PopupConfig} from "db://assets/Scripts/Project/UI/Impl/Configs/PopupConfig";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {PopupConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/PopupConfigBase";
import {PopupProxy} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Model/PopupProxy";
import {StartPopupsCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/StartPopupsCommand";
import {StopPopupsCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/StopPopupsCommand";
import {
    ShowFirstPopupCommand
} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/ShowFirstPopupCommand";
import {ShowPopupCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/ShowPopupCommand";
import {PushPopupCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/PushPopupCommand";
import {HideAllPopupsCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/HideAllPopupsCommand";
import {PopupHiddenCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/PopupHiddenCommand";
import {HidePopupCommand} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Controller/Popups/HidePopupCommand";

export class UIExtension extends Extension {
    
    private registeredMediators: string[] = []; 
    
    protected override extend(): void {
        super.extend();

        this.bindCommands();
        this.addProxies();
        this.addMediators();
    }

    protected override cleanUp(): void {
        this.unbindCommands();
        this.removeProxies();
        this.removeMediators();

        super.cleanUp();
    }

    protected bindCommands(): void {
        //this.bindCommand(UINoticeKey.SetWindowState, SetWindowStateCommand);
        //this.bindCommand(UINoticeKey.SetWindowState, RemoveWindowStateCommand);

        this.bindCommand(UINoticeKey.RegisterUIWindow, RegisterUIWindowCommand);
        this.bindCommand(UINoticeKey.ShowUIWindow, ShowUIWindowCommand);
        this.bindCommand(UINoticeKey.HideUIWindow, HideUIWindowCommand);
        this.bindCommand(UINoticeKey.UIWindowShown, UIWindowShownCommand);
        this.bindCommand(UINoticeKey.UIWindowHidden, UIWindowHiddenCommand);
        
        this.bindCommand(UINoticeKey.StartPopups, StartPopupsCommand);
        this.bindCommand(UINoticeKey.StopPopups, StopPopupsCommand);
        this.bindCommand(UINoticeKey.ShowFirstPopup, ShowFirstPopupCommand);
        this.bindCommand(UINoticeKey.ShowPopup, ShowPopupCommand);
        this.bindCommand(UINoticeKey.PushPopup, PushPopupCommand);
        this.bindCommand(UINoticeKey.HideAllPopups, HideAllPopupsCommand);
        this.bindCommand(UINoticeKey.PopupHidden, PopupHiddenCommand);
        this.bindCommand(UINoticeKey.HideUIWindow, HidePopupCommand);

    }

    protected addProxies(): void {
        //this.addProxy<UINavigationProxy>();
        //this.addProxy<UIStateProxy>();
        //this.addProxy<SceneProxy>();

        this.addProxy(PopupProxy);
    }

    protected addMediators(): void {
        let mediator = new BaseUIMediator();
        this.registeredMediators.push(mediator.name)
        this.addMediator(mediator);
    }

    protected unbindCommands(): void {
        //this.unbindCommand(UINoticeKey.SetWindowState, SetWindowStateCommand);
        //this.unbindCommand(UINoticeKey.RemoveWindowState, RemoveWindowStateCommand);

        this.unbindCommand(UINoticeKey.RegisterUIWindow, RegisterUIWindowCommand);
        this.unbindCommand(UINoticeKey.ShowUIWindow, ShowUIWindowCommand);
        this.unbindCommand(UINoticeKey.HideUIWindow, HideUIWindowCommand);
        this.unbindCommand(UINoticeKey.UIWindowShown, UIWindowShownCommand);
        this.unbindCommand(UINoticeKey.UIWindowHidden, UIWindowHiddenCommand);

        this.unbindCommand(UINoticeKey.StartPopups, StartPopupsCommand);
        this.unbindCommand(UINoticeKey.StopPopups, StopPopupsCommand);
        this.unbindCommand(UINoticeKey.ShowFirstPopup, ShowFirstPopupCommand);
        this.unbindCommand(UINoticeKey.ShowPopup, ShowPopupCommand);
        this.unbindCommand(UINoticeKey.PushPopup, PushPopupCommand);
        this.unbindCommand(UINoticeKey.HideAllPopups, HideAllPopupsCommand);
        this.unbindCommand(UINoticeKey.PopupHidden, PopupHiddenCommand);
        this.unbindCommand(UINoticeKey.HideUIWindow, HidePopupCommand);

    }

    protected removeProxies(): void {
        //this.removeProxy<UINavigationProxy>();
        //this.removeProxy<UIStateProxy>();
        //this.removeProxy<SceneProxy>();

        this.removeProxy(PopupProxy);
    }

    protected removeMediators(): void {
        for (let i = 0; i < this.registeredMediators.length; i++) {
            this.removeMediator(this.registeredMediators[i]);    
        }
        this.registeredMediators = [];
    }
    
}
