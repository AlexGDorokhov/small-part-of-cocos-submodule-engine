import {ApiData} from "db://assets/sm-ccengine-app/Engine/ClientApi/API/Model/Data/ApiData";

export abstract class ApiConfigBase {

    private readonly _requestParams: string[];

    protected constructor(
        public readonly Name: string,
        public readonly Api: ApiData,
        requestParams: string[] | undefined,
        public readonly RequestMethod: string,
        public readonly IsSilent: boolean = false,
        public readonly IsJson: boolean = false,
        public readonly IsCritical: boolean = false
    ) {
        this._requestParams = requestParams ?? [];
        this.RequestNoticeKey = `${Name}Request`;
        this.ResponseNoticeKey = `${Name}Response`;
    }

    public readonly RequestNoticeKey: string;
    public readonly ResponseNoticeKey: string;

    public get RequestParams(): string[] {
        return [...this._requestParams];
    }

    public toString(): string {
        return this.Name;
    }
}
