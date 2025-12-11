import {ICommand, INotification, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {HttpResponse} from "db://assets/sm-ccengine-app/Engine/Http/API/Model/Data/HttpResponse";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {ApiCustomName} from "db://assets/Scripts/Project/Http/API/Consts/ApiCustomName";

export class ApiCustomResponseCommand  extends SimpleCommand implements ICommand {
    public execute(notice: INotification): void {

        console.log('ZZZ CUSTOM RESP');
        console.log(notice);

        if (notice.body instanceof HttpResponse) {

            const response = notice.body as HttpResponse;
            const error = response.Error;

            if (!error?.code) {
                const body = response.Body;

                if (body) {
                    switch (response.Api!.Api.CustomName) {

                        case ApiCustomName.UserUnitsList:
                            //sendNotice(<notice name>, response);
                            break;
                    }

                } else {
                    if (response.Api!.Api.CustomName === ApiCustomName.ApiPing) {
                        //const pingProxy = getProxy(PingProxy);
                        //const pingValue = Date.now() - pingProxy.PingStartTime;
                        //pingProxy.AddPing(pingValue / 1000);
                    } else {
                        Log.error("[ApiCustomResponseCommand] Response is null");
                    }
                }
            } else {
                Log.warn(error.toString());
            }
        } else {
            Log.error(`[ApiCustomResponseCommand] Response error - notice type is not HttpResponse. notice is:`);
            console.error(notice);
        }
    }
}
