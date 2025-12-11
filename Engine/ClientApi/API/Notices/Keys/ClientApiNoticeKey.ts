export const ClientApiNoticeKey = {
    DataReceivedAndParsed: "ClientApiNoticeKey::DataReceivedAndParsed",
    PlayerAuthorized: "ClientApiNoticeKey::PlayerAuthorized",
    CustomRequest: "ClientApiNoticeKey::CustomRequest",
} as const;

export type ClientApiNoticeKey = typeof ClientApiNoticeKey[keyof typeof ClientApiNoticeKey];
