export const UINoticeKey = {
    // Scenes
    DetermineScreenType: 'UINoticeKey::DetermineScreenType',
    ChangeScreenType: 'UINoticeKey::ChangeScreenType',
    UpdateScene: 'UINoticeKey::UpdateScene',
    ShowScene: 'UINoticeKey::ShowScene',
    ShowSceneAfterInterstitialAd: 'UINoticeKey::ShowSceneAfterInterstitialAd',
    HideScene: 'UINoticeKey::HideScene',
    SceneShown: 'UINoticeKey::SceneShown',
    SceneHidden: 'UINoticeKey::SceneHidden',

    // Common UI
    InitializeUI: 'UINoticeKey::InitializeUI',
    InitializeConsole: 'UINoticeKey::InitializeConsole',
    UpdateGlobalViewport: 'UINoticeKey::UpdateGlobalViewport',

    // UI Window State
    SetWindowState: 'UINoticeKey::SetWindowState',
    RemoveWindowState: 'UINoticeKey::RemoveWindowState',

    // System Message
    ShowSystemMessage: 'UINoticeKey::ShowSystemMessage',
    PushSystemMessage: 'UINoticeKey::PushSystemMessage',

    // Screens
    ShowShadedScreen: 'UINoticeKey::ShowShadedScreen',
    ShowPendingScreen: 'UINoticeKey::ShowPendingScreen',
    ShowSplashScreen: 'UINoticeKey::ShowSplashScreen',
    HideShadedScreen: 'UINoticeKey::HideShadedScreen',
    HidePendingScreen: 'UINoticeKey::HidePendingScreen',
    HideSplashScreen: 'UINoticeKey::HideSplashScreen',
    ShowPendingScreen2: 'UINoticeKey::ShowPendingScreen2',
    HidePendingScreen2: 'UINoticeKey::HidePendingScreen2',

    // UI Windows
    RegisterUIWindow: 'UINoticeKey::RegisterUIWindow',
    ShowUIWindow: 'UINoticeKey::ShowUIWindow',
    HideUIWindow: 'UINoticeKey::HideUIWindow',
    ShowHideUIWindows: 'UINoticeKey::ShowHideUIWindows',
    UIWindowHidden: 'UINoticeKey::UIWindowHidden',
    UIWindowShown: 'UINoticeKey::UIWindowShown',
    UIWindowNavigatePrevious: 'UINoticeKey::UIWindowNavigatePrevious',
    UIWindowNavigateNext: 'UINoticeKey::UIWindowNavigateNext',

    // Popups
    StartPopups: 'UINoticeKey::StartPopups',
    StopPopups: 'UINoticeKey::StopPopups',
    ShowFirstPopup: 'UINoticeKey::ShowFirstPopup',
    HideAllPopups: 'UINoticeKey::HideAllPopups',
    ShowPopup: 'UINoticeKey::ShowPopup',
    PushPopup: 'UINoticeKey::PushPopup',
    PopupHidden: 'UINoticeKey::PopupHidden',
    PopupShown: 'UINoticeKey::PopupShown',
    ShowPopupAtTab: 'UINoticeKey::ShowPopupAtTab',
    PushPopupAtTab: 'UINoticeKey::PushPopupAtTab',
    OpenTab: 'UINoticeKey::OpenTab',

    // Video Command
    NeedCheckVideoReady: 'UINoticeKey::NeedCheckVideoReady',
} as const;

export type UINoticeKey = typeof UINoticeKey[keyof typeof UINoticeKey];
