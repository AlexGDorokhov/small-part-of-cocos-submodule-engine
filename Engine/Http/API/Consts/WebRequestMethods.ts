export namespace WebRequestMethods {
    export const Http = {
        Get: "GET",
        Connect: "CONNECT",
        Head: "HEAD",
        Put: "PUT",
        Post: "POST",
        MkCol: "MKCOL",
    } as const;
}

export type WebRequestHttpMethod = typeof WebRequestMethods.Http[keyof typeof WebRequestMethods.Http];
