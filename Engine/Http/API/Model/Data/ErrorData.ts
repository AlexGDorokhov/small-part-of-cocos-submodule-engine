import {SymbolUtil} from "db://assets/sm-ccengine-app/Utils/SymbolUtil";

export class ErrorData {

    // CAUTION! Don't modify field names!
    public responseName: string = "";
    public code: string = "";
    public message: string = "";
    public customMessage: string = "";

    public toString(): string {
        const list: string[] = [];

        if (this.code && this.code.length > 0) {
            list.push(`code:${this.code}`);
        }

        if (this.responseName && this.responseName.length > 0) {
            list.push(`responseName:${this.responseName}`);
        }

        if (this.message && this.message.length > 0) {
            list.push(`message:${this.message}`);
        }

        if (this.customMessage && this.customMessage.length > 0) {
            list.push(`customMessage:${this.customMessage}`);
        }

        return `{${list.join(SymbolUtil.CommaAndSpace)}}`;
    }
}
