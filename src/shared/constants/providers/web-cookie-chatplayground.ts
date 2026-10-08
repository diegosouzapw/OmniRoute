/**
 * ChatPlayground web-cookie catalog entry — kept out of web-cookie.ts so the
 * hub does not grow past the release tip when this provider lands.
 */
export const CHATPLAYGROUND_WEB_COOKIE_ENTRY = {
  chatplayground: {
    id: "chatplayground",
    serviceKinds: ["llm"],
    alias: "cpl",
    name: "ChatPlayground",
    icon: "auto_awesome",
    color: "#7C3AED",
    textIcon: "CP",
    website: "https://web.chatplayground.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "emulated",
    authHint:
      "Paste your Clerk session token or full cookie export containing __client and __session from web.chatplayground.ai. OmniRoute auto-mints fresh short-lived Clerk session JWTs.",
  },
} as const;
