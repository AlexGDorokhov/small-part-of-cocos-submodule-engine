import { IMediator } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import { Extension } from "db://assets/sm-ccengine-app/Engine/Extension";
import { UIWindowConfigBase } from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import { js, Node } from 'cc';

export class UIWindowExtension<TMediator extends IMediator> extends Extension {

    protected _config: UIWindowConfigBase<any>;
    protected _window: Node;
    protected _container?: Node;

    constructor(
        config: UIWindowConfigBase<any>,
        windowUI: Node,
        container?: Node
    ) {
        super();
        this._config = config;
        this._window = windowUI;
        this._container = container;
    }

    protected extend(): void {
        super.extend();
        
        this.bindCommands();
        this.addMediator();
    }

    protected cleanUp(): void {
        const cccName = js.getClassName(this._config.mediatorType.prototype);
        const mediatorName = cccName && cccName.length > 0 ? cccName : this._config.mediatorType.name;
        this.removeMediator(mediatorName);
        
        this.unbindCommands();

        this._config = null!;
        this._window = null!;
        this._container = null!;

        super.cleanUp();
    }

    protected addMediator(): void {
        let mediator: IMediator;

        if (this._container) {
            mediator = new (this._config.mediatorType)(this._config, this._window, this._container);
        } else {
            mediator = new (this._config.mediatorType)(this._config, this._window);
        }

        this.facade!.registerMediator(mediator);
    }

    protected bindCommands(): void {
        
    }

    protected unbindCommands(): void {
        
    }

    private removeUIMediator(): void {
        this.removeMediatorByType(this._config.mediatorType);
    }

    protected removeMediatorByType(mediatorClass: Function): void {
        const className = js.getClassName(mediatorClass);
        const name = className && className.length > 0 ? className : mediatorClass.name;
        this.facade!.removeMediator(name);
    }
}
