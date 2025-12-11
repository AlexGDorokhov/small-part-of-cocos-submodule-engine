import { Node, resources, Prefab, assetManager } from "cc";
import {EDITOR, PREVIEW} from "cc/env";
import {ICommand, IMediator, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {AssetConfigBase} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/AssetConfigBase";
import {IExtension} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src/patterns/facade/Facade";
import {AssetGroupConfigBase} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/AssetGroupConfigBase";
import {UIWindowExtension} from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";
import {UIWindowConfigBase} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import {Environment} from "db://assets/sm-ccengine-app/Engine/Helpers/Environment";
import {AssetUtils} from "db://assets/sm-ccengine-app/Utils/AssetUtils";

export class RegisterUIWindowCommand extends SimpleCommand implements ICommand  {
    async execute(notification: INotification) {
        
        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;
            const config = notice.config as UIWindowConfigBase<UIWindowExtension<IMediator>>;
            const asset = config.asset as AssetConfigBase;

            try {
                let windowUI: any = null;

                windowUI = await AssetUtils.loadBundledPrefabAsync(asset.fileName, asset.name);

                let extension: IExtension;
                const container = notice.container;

                if (!container) {
                    extension = new config.extensionType(config, windowUI);
                } else {
                    extension = new config.extensionType(config, windowUI, container);
                }

                this.facade.installExtension(config.extensionType, extension, config.mediatorType);

            } catch (err) {
                Log.error(`RegisterUIWindowCommand::execute - Can't instantiate the Window with the name "${asset.name}": ${err}`);
            }            
        } else {
            Log.error('RegisterUIWindowCommand::execute - Invalid notification body: not a UIWindowNotice');
            return;
        }

    }


}
