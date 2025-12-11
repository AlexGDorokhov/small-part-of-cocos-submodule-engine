import {ICommand, SimpleCommand} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import { BadRequestProxy } from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/BadRequestProxy";
import {PendingRequestProxy} from "db://assets/sm-ccengine-app/Engine/Http/Impl/Model/PendingRequestProxy";

export class RetryBadRequestCommand extends SimpleCommand implements ICommand {
    public execute(): void {
        const badRequestProxy = this.facade.getProxy(BadRequestProxy)!;
        if (!badRequestProxy.IsEmpty())
        {
            this.facade.getProxy(PendingRequestProxy)!.RetryRequest(badRequestProxy.Peek());
        }
    }
}
