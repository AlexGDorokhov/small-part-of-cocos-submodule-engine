import { _decorator, Node, Widget, instantiate, Vec2, Vec3, UIRenderer, Layers, director } from "cc";
import {IMediator, Mediator} from "db://assets/sm-ccengine-app/Engine/lib/puremvc/src";
import {BaseUIBehaviour} from "db://assets/sm-ccengine-app/Engine/UI/Impl/View/Behaviours/BaseUIBehaviour";
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";
import {SceneLayerConfig} from "db://assets/sm-ccengine-app/Engine/UI/Impl/Config/SceneLayerConfig";

export class BaseUIMediator extends Mediator<BaseUIBehaviour> {

    
    public constructor() {
        super('BaseUIMediator');
    }
    
    public override onRegister(): void {
        super.onRegister();

        const gameNode = this.findNode("UIBase");
        
        if (gameNode) {
            this.viewComponent = gameNode.getComponent(BaseUIBehaviour)!;

            if (!this.viewComponent.activated) {
                this.viewComponent.onFirstClick = this.onFirstClick.bind(this);
            } else {
                this.onFirstClick();
            }

            const container = this.findNode("UIManagerContainer");
            if (!container) {
                Log.error("UIManagerContainer not found");
                return;
            }

            const configs = SceneLayerConfig.getList().sort((a, b) => a.id - b.id);
            this.createSceneLayers(container, configs);
        } else {
            Log.error("Can't find UIBase node on stage");
        }
    }

    public override onRemove(): void {

        if (this.viewComponent) {
            this.viewComponent.onFirstClick = null;
        }

        super.onRemove();
    }

    private onFirstClick(): void {
        Log.info('First click!');
        //this.getProxy<ApplicationOptionsProxy>()?.setApplicationAsActivated(true);
        //this.sendNotice(AudioNoticeKey.TryValidate); // MUSIC START
        //this.sendNotice(AudioNoticeKey.SetHTMLAudioVolume);
    }

    private createSceneLayers(container: Node, configs: SceneLayerConfig[]): void {
        for (const config of configs) {
            const layer = new Node(config.name);
            layer.layer = Layers.nameToLayer("UI");
            container.addChild(layer);

            const widget = layer.addComponent(Widget);
            widget.isAlignLeft = true;
            widget.isAlignRight = true;
            widget.isAlignTop = true;
            widget.isAlignBottom = true;
            widget.left = 0;
            widget.right = 0;
            widget.top = 0;
            widget.bottom = 0;

            //layer.setAnchorPoint(new Vec2(0.5, 0.5));

            if (config.name === "PrimaryOver") {
                layer.active = false;
            }

            config.uiContainer = layer;
        }
    }
    private findNode(name: string, root?: Node): Node | null {
        const startNode = root ?? director.getScene();
        if (!startNode) return null;

        if (startNode.name === name) {
            return startNode;
        }

        for (const child of startNode.children) {
            const found = this.findNode(name, child);
            if (found) return found;
        }

        return null;
    }
    
}