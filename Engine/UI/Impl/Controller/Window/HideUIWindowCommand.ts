import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {UIWindowNotice} from "db://assets/sm-ccengine-app/Engine/UI/API/Notices/UIWindowNotice";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";

export class HideUIWindowCommand extends SimpleCommand implements ICommand  {
    
    execute(notification: INotification) {

        if (notification.body instanceof UIWindowNotice) {
            const notice = notification.body;        
            const config = notice.config;

            //const assetConfig = config.asset as AssetConfigBase;
            //const assetGroupConfig = config.asset as AssetGroupConfigBase;
            //const assetsProvider = this.getProxy<IAssetsProviderService>();

            //const wrappedNotice = new Notice(UINoticeKey.RegisterUIWindow, new UIWindowNotice(config));

            //if (assetConfig) {
            //    assetsProvider?.cancelSendingNoticeIfPending(assetConfig, wrappedNotice);
            //} else if (assetGroupConfig) {
            //    assetsProvider?.cancelSendingNoticeIfPending(assetGroupConfig, wrappedNotice);
            //} else {
            //    Log.error("The asset is null or doesn't inherit from INamedAssetConfig");
            //    return;
            //}

            //if (notice.navigationGroup) {
            //    const navProxy = this.getProxy<UINavigationProxy>();
            //   navProxy.registerNavigationElement(UINoticeKey.HideUIWindow, notice);
            //}
        } else {
            Log.error('HideUIWindowCommand::execute - Invalid notification body: not a UIWindowNotice');
            return;
        }
            
    }

}
