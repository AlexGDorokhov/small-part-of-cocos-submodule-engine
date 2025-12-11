import { Node } from 'cc';
import {Log} from "db://assets/sm-ccengine-app/Engine/Utils/Impl/Log";

export class SceneLayerConfig {
    private static _index = 0;
    private static _list: SceneLayerConfig[] = [];

    private _uiContainer: Node | null = null;

    public readonly name: string;
    public readonly id: number;
    public readonly useSafeArea: boolean;

    private constructor(name: string, id: number, useSafeArea: boolean) {
        this.name = name;
        this.id = id;
        this.useSafeArea = useSafeArea;
    }

    public static readonly Underlaying = SceneLayerConfig.create("Underlaying", false);
    public static readonly Background = SceneLayerConfig.create("Background", false);
    public static readonly BackgroundOver = SceneLayerConfig.create("BackgroundOver", false);
    public static readonly Primary = SceneLayerConfig.create("Primary", true);
    public static readonly Primary1 = SceneLayerConfig.create("Primary1", true);
    public static readonly Primary2 = SceneLayerConfig.create("Primary2", true);
    public static readonly PrimaryOver = SceneLayerConfig.create("PrimaryOver", true);
    public static readonly AnimationsPrimary = SceneLayerConfig.create("AnimationsPrimary", true);
    public static readonly Popups = SceneLayerConfig.create("Popups", false);
    public static readonly PopupsOver = SceneLayerConfig.create("PopupsOver", false);
    public static readonly ModalPopups = SceneLayerConfig.create("ModalPopups", false);
    public static readonly ModalPopupsOver = SceneLayerConfig.create("ModalPopupsOver", false);
    public static readonly AnimationsPopups = SceneLayerConfig.create("AnimationsPopups", false);
    public static readonly Overall = SceneLayerConfig.create("Overall", false);

    public static getList(): SceneLayerConfig[] {
        return [...SceneLayerConfig._list];
    }

    public static reset(): void {
        for (const config of SceneLayerConfig._list) {
            if (config._uiContainer) {
                config._uiContainer.destroy();
                config._uiContainer = null;
            }
        }
    }

    public get uiContainer(): Node | null {
        return this._uiContainer;
    }

    public set uiContainer(value: Node | null) {
        if (!this._uiContainer) {
            this._uiContainer = value;
        } else {
            Log.error(
                `A container for layer "${this.name}" has already been assigned.`
            );
        }
    }

    private static create(name: string, useSafeArea: boolean): SceneLayerConfig {
        const config = new SceneLayerConfig(name, SceneLayerConfig._index++, useSafeArea);
        SceneLayerConfig._list.push(config);
        return config;
    }
    
}
