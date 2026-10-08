/**
 * NoTrack web-cookie catalog entry — kept out of web-cookie.ts so the
 * hub does not grow past the release tip when this provider lands.
 */
export const NOTRACK_WEB_COOKIE_ENTRY = {
  "notrack-web": {
    id: "notrack-web",
    serviceKinds: ["llm"],
    alias: "ntw",
    name: "NoTrack Web (Free)",
    icon: "auto_awesome",
    color: "#0EA5E9",
    textIcon: "NT",
    website: "https://notrack.ai",
    hasFree: true,
    freeNote:
      "Free consumer chat session on notrack.ai — Direct chat with the notrack C assistant. No subscription required; rate limits apply.",
    authHint:
      "Log in to notrack.ai, then paste the full Cookie header (DevTools → Network → any /api request → Request Headers → Cookie). It must contain uid, si_usr_id, and si_ses_id.",
    riskNoticeVariant: "webCookie",
    toolCalling: "emulated",
  },
} as const;
