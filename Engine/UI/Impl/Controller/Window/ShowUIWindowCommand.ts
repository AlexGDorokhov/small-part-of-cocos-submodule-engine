import {ICommand, INotification, Notification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {UINoticeKey} from "db://assets/sm-ccengine-app/Engine/UI/API/Enums/UINoticeKey";
import {AssetConfigBase} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/AssetConfigBase";
import {AssetGroupConfigBase} from "db://assets/sm-ccengine-app/Engine/Assets/Impl/Configs/AssetGroupConfigBase";

export class ShowUIWindowCommand  extends SimpleCommand implements ICommand  {
    public execute(notification: INotification): void {
        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;
            const config = notice.config;

            if (!this.facade.hasExtension(config.extensionType, config.mediatorType)) {
                
                const assetConfig = config.asset as AssetConfigBase;
                const assetGroupConfig = config.asset as AssetGroupConfigBase;
                
                this.facade.sendNotice(UINoticeKey.RegisterUIWindow, notice);

                //const assetsProvider = this.getProxy<IAssetsProviderService>();
                //const wrappedNotice = new Notification(UINoticeKey.RegisterUIWindow, notice);

                //if (assetConfig) {
                //    assetsProvider?.request(assetConfig, wrappedNotice, true, true);
                //} else if (assetGroupConfig) {
                //    assetsProvider?.request(assetGroupConfig, wrappedNotice, true, true);
                //} else {
                //    Log.error("The AssetConfig is null or doesn't inherit from INamedAssetConfig");
                //    return;
                //}

                //if (notice.navigationGroup) {
                //    const navProxy = this.getProxy<UINavigationProxy>();
                //    navProxy.registerNavigationElement(UINoticeKey.ShowUIWindow, notice);
                //}

            } else {
                if (notice.hideIfShown) {
                    this.facade.sendNotice(UINoticeKey.HideUIWindow, new UIWindowNotice(config));
                } else {
                    Log.warn("The UIWindow is already shown");
                }
            }
        } else {
            Log.error('ShowUIWindowCommand::execute - Invalid notification body: not a UIWindowNotice');
            return;
        }

    }

}
