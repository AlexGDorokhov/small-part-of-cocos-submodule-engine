import {Extension} from "db://assets/sm-ccengine-app/Engine/Extension";
import {HttpNoticeKey} from "db://assets/Scripts/Project/Http/API/Notices/Keys/HttpNoticeKey";
import {BadRequestProxy} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/BadRequestProxy";
import {PendingRequestProxy} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/PendingRequestProxy";
import {WebRequestProviderFetch} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/Providers/WebRequestProviderFetch";
import {ServiceReceivedCommand} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Controller/ServiceReceivedCommand";
import {ClearBadRequestsCommand} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Controller/ClearBadRequestsCommand";
import {
    HttpServiceReceivedCommand
} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Controller/HttpServiceReceivedCommand";
import {RetryBadRequestCommand} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Controller/RetryBadRequestCommand";


export abstract class HttpExtension extends Extension {

    protected extend(): void {
        super.extend();

        this.addProxies();
        this.bindCommands();
    }

    protected cleanUp(): void {
        this.removeProxies();
        this.unbindCommands();

        super.cleanUp();
    }

    protected addProxies(): void {
        this.addProxyInstance(new PendingRequestProxy(new WebRequestProviderFetch()));
        this.addProxy(BadRequestProxy);
    }

    protected bindCommands(): void {
        this.bindCommand(HttpNoticeKey.RetryBadRequest, RetryBadRequestCommand);
        this.bindCommand(HttpNoticeKey.ClearBadRequests, ClearBadRequestsCommand);
        this.bindCommand(HttpNoticeKey.ServiceReceivedNoticeKey, ServiceReceivedCommand);
        this.bindCommand(HttpNoticeKey.HttpServiceReceivedNoticeKey, HttpServiceReceivedCommand);
    }

    protected removeProxies(): void {
        this.removeProxy(PendingRequestProxy);
        this.removeProxy(BadRequestProxy);
    }

    protected unbindCommands(): void {
        this.unbindCommand(HttpNoticeKey.RetryBadRequest, RetryBadRequestCommand);
        this.unbindCommand(HttpNoticeKey.ClearBadRequests, ClearBadRequestsCommand);
        this.unbindCommand(HttpNoticeKey.ServiceReceivedNoticeKey, ServiceReceivedCommand);
        this.unbindCommand(HttpNoticeKey.HttpServiceReceivedNoticeKey, HttpServiceReceivedCommand);
    }

}
