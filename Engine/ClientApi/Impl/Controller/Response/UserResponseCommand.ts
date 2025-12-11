import {RawDataKey} from "db://assets/Scripts/Project/Http/API/Consts/RawDataKey";
import {LoadingProgressState} from "db://assets/sm-ccengine-app/Engine/LoadingProgress/API/Consts/LoadingProgressState";
import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {
    LoadingProgressNotice
} from "db://assets/sm-ccengine-app/Engine/LoadingProgress/API/Notices/LoadingProgressNotice";
import {RawUserDataNotice} from "db://assets/sm-ccengine-app/Engine/Users/Api/Notices/RawUserDataNotice";
import {LoadingNoticeKey} from "db://assets/sm-ccengine-app/Engine/LoadingProgress/API/Notices/Keys/LoadingNoticeKey";
import {PlayerProxy} from "db://assets/sm-ccengine-app/Engine/Users/Impl/Model/PlayerProxy";
import {PlayerNoticeKey} from "db://assets/sm-ccengine-app/Engine/Users/Api/Notices/Keys/PlayerNoticeKey";

export class UserResponseCommand extends SimpleCommand implements ICommand {

    public execute(notice: INotification): void {

        if (notice.body instanceof HttpResponse) {

            const response = notice.body as HttpResponse;

            const error = response.Error;

            if (!error?.code) {
                let body = response.Body;

                if (body) {
                    if (body.hasOwnProperty(RawDataKey.user)) {
                        body = body[RawDataKey.user] as Record<string, unknown>;
                    }

                    const playerProxy = this.facade.getProxy(PlayerProxy)!;
                    const playerData = playerProxy.getData();

                    this.facade.sendNotice(PlayerNoticeKey.ParsePlayer, new RawUserDataNotice(body, playerData));

                    playerProxy.setData(playerData);

                } else {
                    Log.error("Response is null");
                }
            } else {
                Log.warn(error.toString());
            }

            this.facade.sendNotice(LoadingNoticeKey.SetLoadingProgress, new LoadingProgressNotice({
                Progress: LoadingProgressState.UserAuthorized,
                ProgressLimit: LoadingProgressState.Ready
            }));

            this.facade.sendNotice(PlayerNoticeKey.UpdatePlayer, false);
        } else {
            Log.error(`[UserAuthResponseCommand] Response error - notice type is not HttpResponse. notice is:`);
            console.error(notice);
        }

        // this.sendNotice(UINoticeKey.InitializeUI);
    }

}

