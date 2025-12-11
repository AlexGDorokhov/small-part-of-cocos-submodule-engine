import { Node, instantiate, Constructor } from 'cc';
import { BaseUIWindowMediator } from './BaseUIWindowMediator';
import { UIWindowBehaviour } from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/Behaviours/UIWindowBehaviour";
import { UIWindowConfigBase } from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/UIWindowConfigBase";
import { UIWindowExtension } from "db://assets/sm-ccengine-app/Engine/UI/Impl/UIWindowExtension";
import { IMediator } from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";

export abstract class UIWindowMediator<TBehaviour extends UIWindowBehaviour> extends BaseUIWindowMediator<TBehaviour> {

    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
    );
    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
        container: Node,
    );
    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
        isShownWhenRegister: boolean,
    );
    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
        container: Node,
        isShownWhenRegister: boolean,
    );
    protected constructor(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        behaviourClass: Constructor<TBehaviour>,
        containerOrIsShown?: Node | boolean,
        maybeIsShown?: boolean
    ) {
        let container: Node | undefined;
        let isShownWhenRegister = false;

        if (containerOrIsShown instanceof Node) {
            container = containerOrIsShown;
            isShownWhenRegister = maybeIsShown ?? false;
        } else {
            container = undefined;
            isShownWhenRegister = containerOrIsShown ?? false;
        }

        super(config, window, behaviourClass, container, isShownWhenRegister);
    }

    protected override initialize(
        config: UIWindowConfigBase<UIWindowExtension<IMediator>>,
        window: Node,
        container: Node | null = null,
        isShownWhenRegister = false
    ): void {
        super.initialize(config, window, container, isShownWhenRegister);
    }
}
