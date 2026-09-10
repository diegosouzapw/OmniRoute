/**
 * Provider catalog data — extracted from providers.ts (god-file decomposition).
 * Pure data literal; re-exported by the providers.ts barrel. No behavior change.
 */
export const WEB_COOKIE_PROVIDERS = {
  "chatgpt-web": {
    id: "chatgpt-web",
    serviceKinds: ["llm"],
    name: "ChatGPT Web (Clean Room)",
    icon: "auto_awesome",
    color: "#10A37F",
    textIcon: "CG",
    website: "https://chatgpt.com",
    authHint:
      "Paste Playwright-compatible storage-state JSON exported from a logged-in chatgpt.com browser context. Cookie headers and individual token values are not accepted.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "none",
  },
  "chatgpt-web-codex": {
    id: "chatgpt-web-codex",
    serviceKinds: ["llm"],
    alias: "cgpt-codex",
    name: "ChatGPT Web (Codex)",
    icon: "terminal",
    color: "#10A37F",
    textIcon: "CC",
    website: "https://chatgpt.com",
    authHint:
      "Paste the full ChatGPT Cookie header. OmniRoute verifies it in an isolated headless browser profile.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "native",
  },
  "grok-web": {
    id: "grok-web",
    serviceKinds: ["llm"],
    alias: "gw",
    name: "Grok Web (Subscription)",
    icon: "auto_awesome",
    color: "#1DA1F2",
    textIcon: "GW",
    website: "https://grok.com",
    authHint:
      "Paste the full grok.com cookie line from DevTools → Application → Cookies. Include both `sso` and `sso-rw` (e.g. `sso=...; sso-rw=...`) — Grok's anti-bot rejects `sso` on its own.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "gemini-web": {
    id: "gemini-web",
    serviceKinds: ["llm"],
    alias: "gweb",
    name: "Gemini Web (Free)",
    icon: "auto_awesome",
    color: "#4285F4",
    textIcon: "GWeb",
    website: "https://gemini.google.com",
    authHint:
      "Paste the full cookie header, the __Secure-1PSID value, or the JSON export containing cookies from gemini.google.com. Include __Secure-1PSIDTS and __Secure-1PSIDCC when available.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    // #7286 Level 2: tools[] is prompt-emulated via webTools.ts (parseToolCallsFromText).
    toolCalling: "emulated",
  },
  "perplexity-web": {
    id: "perplexity-web",
    serviceKinds: ["llm"],
    alias: "pplx-web",
    name: "Perplexity Web (Pro/Max)",
    icon: "search",
    color: "#20808D",
    textIcon: "PW",
    website: "https://www.perplexity.ai",
    authHint: "Paste your __Secure-next-auth.session-token cookie value from perplexity.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "emulated",
  },
  "blackbox-web": {
    id: "blackbox-web",
    serviceKinds: ["llm"],
    alias: "bb-web",
    name: "Blackbox Web (Subscription)",
    icon: "view_in_ar",
    color: "#1A1A2E",
    textIcon: "BW",
    website: "https://app.blackbox.ai",
    authHint:
      "Paste your __Secure-authjs.session-token value or full cookie header from app.blackbox.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "emulated",
  },
  "muse-spark-web": {
    id: "muse-spark-web",
    serviceKinds: ["llm"],
    alias: "ms-web",
    name: "Muse Spark Web (Meta AI)",
    icon: "auto_awesome",
    color: "#0866FF",
    textIcon: "MS",
    website: "https://www.meta.ai",
    hasFree: true,
    freeNote: "Free with login — Meta AI platform with Llama models.",
    authHint:
      "Paste your ecto_1_sess cookie AND the ecto1:... WS auth token from meta.ai. " +
      "Capture the ecto1: token in DevTools → Network → WS → the clippy request's Authorization query param. " +
      "Example: ecto_1_sess=4240a308...NVDg0; ecto1:ABCD...",
    toolCalling: "emulated",
  },
  "claude-web": {
    id: "claude-web",
    serviceKinds: ["llm"],
    alias: "cw",
    name: "Claude Web",
    icon: "auto_awesome",
    color: "#D97757",
    textIcon: "CW",
    website: "https://claude.ai",
    authHint: "Paste your session cookie from claude.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    // #7286 Level 3 (deferred): still silently drops tools[] — getDefaultTools()
    // is a fixed Claude.ai backend contract; needs an emulate-vs-native decision.
    toolCalling: "none",
  },
  "deepseek-web": {
    id: "deepseek-web",
    serviceKinds: ["llm"],
    alias: "ds-web",
    name: "DeepSeek Web",
    icon: "auto_awesome",
    color: "#4D6BFE",
    textIcon: "DS",
    website: "https://chat.deepseek.com",
    authHint:
      "Paste your userToken from chat.deepseek.com — DevTools → Application → Local Storage → userToken",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    toolCalling: "emulated",
  },
  "copilot-web": {
    id: "copilot-web",
    serviceKinds: ["llm"],
    alias: "copilot",
    name: "Microsoft Copilot Web",
    icon: "auto_awesome",
    color: "#0078D4",
    textIcon: "CP",
    website: "https://copilot.microsoft.com",
    authHint:
      "Paste the access_token from an authenticated copilot.microsoft.com request (DevTools → Network → Authorization), or export a HAR while logged in",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "copilot-m365-web": {
    id: "copilot-m365-web",
    serviceKinds: ["llm"],
    alias: "m365copilot",
    name: "Microsoft 365 Copilot (BizChat)",
    icon: "business_center",
    color: "#0078D4",
    textIcon: "M365",
    website: "https://m365.cloud.microsoft/chat",
    authHint:
      "Sign in at m365.cloud.microsoft/chat, then open DevTools → Network → filter 'WS' → click the Chathub WebSocket connection. Copy both the access_token query parameter AND the account-specific Chathub path segment from its request URL (wss://…/Chathub/<path>?…&access_token=…). It is NOT an Authorization: Bearer header on an XHR/Fetch request. The token is short-lived; this is an unofficial integration. Optional: store a refresh_token in providerSpecificData.refreshToken (any Microsoft device-code/refresh flow for the substrate.office.com/sydney scopes) and OmniRoute pre-flight-refreshes the access token itself — otherwise re-capture after every ~75 min expiry.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "t3-web": {
    id: "t3-web",
    serviceKinds: ["llm"],
    alias: "t3chat",
    name: "t3.chat (Pro/Free)",
    icon: "auto_awesome",
    color: "#7C3AED",
    textIcon: "T3",
    website: "https://t3.chat",
    hasFree: true,
    freeNote: "Free tier gives limited model access. Pro ($8/month) unlocks 50+ models.",
    authHint:
      "Open t3.chat in your browser, log in, then open DevTools → Application → Local Storage → https://t3.chat. " +
      "Copy the value of 'convex-session-id'. Also open DevTools → Network, copy the Cookie header from any request. " +
      "Paste both values here. See provider setup docs for a step-by-step guide.",
    toolCalling: "emulated",
  },
  "inner-ai": {
    id: "inner-ai",
    serviceKinds: ["llm"],
    alias: "in-ai",
    name: "Inner.ai (Subscription)",
    icon: "auto_awesome",
    color: "#1A56DB",
    textIcon: "IA",
    website: "https://app.innerai.com",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Paste your token cookie and email separated by a space: open DevTools → Application → Cookies → .innerai.com, copy the token value, then append a space and your Inner.ai login email. Example: eyJhbG... user@example.com",
    toolCalling: "emulated",
  },
  "adapta-web": {
    id: "adapta-web",
    serviceKinds: ["llm"],
    alias: "adp-web",
    name: "Adapta.org (Adapta One Web)",
    icon: "auto_awesome",
    color: "#6E3AD3",
    textIcon: "AW",
    website: "https://agent.adapta.one",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Paste your __client cookie value from .clerk.agent.adapta.one (DevTools → Application → Cookies)",
    toolCalling: "emulated",
  },
  lmarena: {
    // Wire id stays `lmarena` for DB/combo/model-prefix back-compat.
    // Product rebranded LMArena → Arena (arena.ai) in Jan 2026.
    id: "lmarena",
    serviceKinds: ["llm"],
    alias: "lma",
    name: "Arena (Free)",
    icon: "auto_awesome",
    color: "#FF6B6B",
    textIcon: "AR",
    website: "https://arena.ai",
    hasFree: true,
    freeNote:
      "Free model comparison platform (formerly LMArena) at arena.ai — Direct-chat catalog of chat models (GPT, Claude, Gemini, Llama, …). No subscription required.",
    authHint:
      "Paste the full Cookie header from arena.ai (DevTools → Network → request → Cookie). Include arena-auth-prod-v1.0/.1… and cf_clearance/__cf_bm when present. OmniRoute uses Chrome TLS impersonation; if Arena still 403s, set providerSpecificData.recaptchaV3Token from a live browser session.",
    riskNoticeVariant: "webCookie",
  },
  "yuanbao-web": {
    id: "yuanbao-web",
    serviceKinds: ["llm"],
    alias: "ybw",
    name: "Tencent Yuanbao (Free)",
    icon: "auto_awesome",
    color: "#0052D9",
    textIcon: "YB",
    website: "https://yuanbao.tencent.com",
    hasFree: true,
    freeNote:
      "Free consumer web session — DeepSeek V3/R1 and Hunyuan / Hunyuan-T1, optional web search. No subscription required. Rate limits apply.",
    authHint:
      "Log in to yuanbao.tencent.com, then paste the full Cookie header (DevTools → Network → any /api request → Request Headers → Cookie). It must contain hy_user and hy_token.",
    riskNoticeVariant: "webCookie",
  },
  "tencent-aistudio-web": {
    id: "tencent-aistudio-web",
    serviceKinds: ["llm"],
    alias: "tasw",
    name: "Tencent AI Studio (Free)",
    icon: "auto_awesome",
    color: "#0052D9",
    textIcon: "TAS",
    website: "https://aistudio.tencent.ai",
    hasFree: true,
    freeNote:
      "Free web session on Tencent AI Studio (aistudio.tencent.ai) — Direct chat with Hunyuan models (hy3-g, HunyuanDefault, Hunyuan3D). Cookie authentication.",
    authHint:
      "Log in to aistudio.tencent.ai, open DevTools -> Network, copy any request Cookie header containing session tokens.",
    riskNoticeVariant: "webCookie",
  },
  huggingchat: {
    id: "huggingchat",
    serviceKinds: ["llm"],
    // huggingchat is addressed by its own id as alias (stable routing; the
    // historical "hc" alias collided with another provider and was retired).
    alias: "huggingchat",
    name: "HuggingChat (Free)",
    icon: "auto_awesome",
    color: "#FFD21E",
    textIcon: "HC",
    website: "https://huggingface.co/chat",
    hasFree: true,
    freeNote: "Free LLM chat — no subscription required. Rate limits apply.",
    authHint:
      "Paste the full Cookie header from huggingface.co/chat (DevTools → Network → /chat/conversation → Request Headers → Cookie). It should include hf-chat and may also include token / aws-waf-token.",
    riskNoticeVariant: "webCookie",
  },
  "poe-web": {
    id: "poe-web",
    serviceKinds: ["llm"],
    alias: "poe",
    name: "Poe Web (Subscription)",
    icon: "auto_awesome",
    color: "#6C3AED",
    textIcon: "PW",
    website: "https://poe.com",
    authHint: "Paste your p-b cookie value from poe.com (DevTools → Application → Cookies → p-b)",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "venice-web": {
    id: "venice-web",
    serviceKinds: ["llm"],
    alias: "ven",
    name: "Venice Web (Privacy)",
    icon: "auto_awesome",
    color: "#22C55E",
    textIcon: "VW",
    website: "https://venice.ai",
    authHint: "Paste your session cookie from venice.ai (DevTools → Application → Cookies)",
    riskNoticeVariant: "webCookie",
  },
  "v0-vercel-web": {
    id: "v0-vercel-web",
    serviceKinds: ["llm"],
    // #6343: was "v0", colliding with the unrelated "v0-vercel" API-key provider's
    // alias. Aliases resolve 1:1 to a provider id, so the dashboard's model-string
    // routing always picked v0-vercel, silently hiding this provider's own
    // credentials. Follows the established secondary-web-variant convention (see
    // kimi-web / huggingchat in tests/unit/provider-alias-uniqueness.test.ts):
    // the web/secondary variant uses its own id as alias instead of a short prefix.
    alias: "v0-vercel-web",
    name: "v0 Vercel Web (Code Gen)",
    icon: "auto_awesome",
    color: "#000000",
    textIcon: "V0",
    website: "https://v0.dev",
    authHint: "Paste your session cookie from v0.dev (DevTools → Application → Cookies)",
    riskNoticeVariant: "webCookie",
  },
  "kimi-web": {
    id: "kimi-web",
    serviceKinds: ["llm"],
    // Legacy "kimi" API provider keeps the short alias; web variant uses its own id.
    alias: "kimi-web",
    name: "Kimi Web",
    icon: "auto_awesome",
    color: "#2563EB",
    textIcon: "KW",
    website: "https://www.kimi.ai",
    authHint:
      "Paste access_token from www.kimi.ai DevTools → Application → Local Storage. A legacy kimi-auth cookie is also accepted.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "doubao-web": {
    id: "doubao-web",
    serviceKinds: ["llm"],
    alias: "db",
    name: "Dola Web (ByteDance)",
    icon: "auto_awesome",
    color: "#3B82F6",
    textIcon: "DA",
    website: "https://www.dola.com",
    authHint:
      "Paste the full Cookie header from www.dola.com. It should include sessionid, ttwid, and s_v_web_id. If s_v_web_id is unavailable, fp=verify_... from a chat/completion request URL can be used as a fallback.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "gemini-business": {
    id: "gemini-business",
    serviceKinds: ["llm"],
    alias: "gembiz",
    name: "Gemini Business (Enterprise)",
    icon: "business_center",
    color: "#4285F4",
    textIcon: "GB",
    website: "https://business.gemini.google",
    hasFree: true,
    freeNote:
      "Free for Google Workspace enterprise accounts — enterprise Gemini models (Pro, Flash, image, video) via direct StreamGenerate HTTP API. No subscription required, just enterprise SSO.",
    authHint:
      "From your enterprise account: open business.gemini.google/home/cid/{your-cid}, then copy __Secure-1PSID and __Secure-1PSIDTS cookies from DevTools → Application → Cookies. Paste as a cookie header below.",
  },
  "zenmux-free": {
    id: "zenmux-free",
    serviceKinds: ["llm"],
    alias: "zmf",
    name: "ZenMux Free (Web)",
    icon: "bolt",
    color: "#667eea",
    textIcon: "ZF",
    website: "https://zenmux.ai",
    hasFree: true,
    freeNote:
      "Free tier (5 Flows/5h, 38.64 Flows/week) — DeepSeek V3.2, GLM 4.7 Flash Free and more. No subscription required.",
    authHint:
      "Login at zenmux.ai, then export all cookies using EditThisCookie or Cookie-Editor and paste the full Cookie header string here. Refresh every ~30 days.",
  },
  "tinycms-web": {
    id: "tinycms-web",
    serviceKinds: ["llm"],
    alias: "tcw",
    name: "TinyCMS Web (Free/Sub)",
    icon: "layers",
    color: "#ED8936",
    textIcon: "TC",
    website: "https://site.tinycms.xyz",
    hasFree: true,
    freeNote:
      "Free tier has access to GPT 5.4, Gemini 3.5, and Grok 4.20 models. No login required. Subscription grants 300 requests/day for advanced models.",
    authHint:
      "Go to site.tinycms.xyz, open DevTools → Application → Local Storage, copy the value of 'app-config-uuid' (starts with 'R'), and paste it here.",
  },
  "zai-web": {
    id: "zai-web",
    serviceKinds: ["llm"],
    alias: "zw",
    name: "Z.ai Web",
    icon: "auto_awesome",
    color: "#2563EB",
    textIcon: "ZW",
    website: "https://chat.z.ai",
    hasFree: true,
    freeNote:
      "Consumer web session for the four models currently visible in chat.z.ai. Distinct from the API-key zai/glm providers.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      'Copy the "token" value from chat.z.ai → DevTools → Application → Local Storage. Do not copy cookies; OmniRoute handles the per-request CAPTCHA through its browser transport.',
  },
  promptql: {
    id: "promptql",
    serviceKinds: ["llm"],
    alias: "pql",
    name: "PromptQL (Unofficial/Experimental)",
    icon: "auto_awesome",
    color: "#5B21B6",
    textIcon: "PQL",
    website: "https://prompt.ql.app",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Paste the Bearer JWT from prompt.ql.app DevTools → Network → graphql → Authorization (token only). Optional projectId + session Cookie for refresh.",
  },
  "notion-web": {
    id: "notion-web",
    serviceKinds: ["llm"],
    alias: "nw",
    name: "Notion AI Web (Unofficial/Experimental)",
    icon: "auto_awesome",
    color: "#000000",
    textIcon: "NW",
    website: "https://www.notion.so",
    // #6758: Notion has no public inference API (see closed request #3272) — this
    // reverse-engineers the same undocumented internal endpoint two independent
    // open-source projects already use. Undocumented endpoints can change without
    // notice; label clearly so operators understand the risk before pasting a
    // session cookie of an account they already pay for.
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Paste only the token_v2 cookie VALUE from app.notion.com (DevTools → Application → Cookies → token_v2). " +
      "Do not paste token_v2= or the full Cookie header. Workspace is auto-detected; space_id / notion_user_id are optional.",
  },
  "adobe-firefly": {
    id: "adobe-firefly",
    serviceKinds: [],
    alias: "firefly",
    name: "Adobe Firefly (Image/Video)",
    icon: "auto_awesome",
    color: "#EB1000",
    textIcon: "FF",
    website: "https://firefly.adobe.com",
    authHint:
      "RECOMMENDED: firefly.adobe.com signed-in → F12 → Network → click firefly-3p.ff.adobe.io (generate-async or models/discovery) → Request Headers → Authorization → copy the token AFTER 'Bearer ' (starts with eyJ…). Cookie-only from firefly.adobe.com mints a GUEST token → 401/403; only multi-domain IMS cookies (adobelogin.com) or that Bearer JWT work. Unofficial/experimental media + Limits.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  hyperagent: {
    id: "hyperagent",
    serviceKinds: ["llm"],
    alias: "ha",
    name: "HyperAgent (Unofficial/Experimental)",
    icon: "auto_awesome",
    color: "#6C5CE7",
    textIcon: "HA",
    website: "https://hyperagent.com",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Paste the full Cookie header from hyperagent.com (DevTools → Network → any request → Request Headers → Cookie). Session cookies power chat + billing usage.",
  },
  "conol-web": {
    id: "conol-web",
    serviceKinds: ["llm"],
    alias: "cnl",
    name: "Conol (Unofficial/Experimental)",
    icon: "auto_awesome",
    color: "#F6C945",
    textIcon: "CO",
    website: "https://conol.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
    authHint:
      "Use browser sign-in, or paste the full Cookie header from conol.ai. The __Secure-better-auth.session_token cookie is required.",
  },
  maxai: {
    id: "maxai",
    serviceKinds: ["llm"],
    alias: "mx",
    name: "MaxAI",
    icon: "auto_awesome",
    color: "#6D28D9",
    textIcon: "MX",
    website: "https://www.maxai.co",
    // No subscriptionRisk / riskNoticeVariant / notice: MaxAI is TOKEN-authenticated
    // (a bearer access token + a long-lived refresh token that OmniRoute refreshes
    // browserlessly), NOT a fragile browser-cookie session, so the "webCookie"
    // caveat ("may invalidate at any time, log in again, not for unattended use")
    // and the "oauth" caveat ("official session not authorized for proxy use") are
    // both inaccurate — MaxAI is a purpose-built aggregator whose token IS meant for
    // API use. Treated like codex-app-server: no risk banner and no notice; the
    // authHint carries the only guidance a connecting operator needs.
    toolCalling: "emulated",
    authHint:
      "Sign in once (email code or browser) to mint a MaxAI access token. OmniRoute signs each request, routes it through residential egress, and refreshes the token browserlessly, so a connection stays valid for about a year without re-login.",
  },
  uc: {
    id: "uc",
    serviceKinds: ["llm"],
    alias: "ucn",
    name: "UC (uncensored.com)",
    icon: "auto_awesome",
    color: "#111827",
    textIcon: "UC",
    website: "https://uncensored.com",
    // No subscriptionRisk / riskNoticeVariant / notice: UC is TOKEN-authenticated
    // — a durable Clerk credential from which OmniRoute mints a fresh short-lived
    // session token per request, browserlessly. It is not a fragile browser-cookie
    // session, so the "webCookie" caveat is inaccurate. The un-metered subscription
    // session renews automatically within its window; only the periodic re-login
    // (email code) needs an operator, and the authHint covers that.
    toolCalling: "emulated",
    authHint:
      "Sign in once with an email code to bootstrap a UC (uncensored.com) subscription session. OmniRoute mints a fresh short-lived token per request browserlessly, so the connection renews on its own; you only re-run the email login about once a month when the subscription session rolls over.",
  },
};

/** Resolved public site for a web-session provider (href + display host). */
export interface WebProviderHostLink {
  /** Full URL to open in a new tab (the provider's own `website`, or the origin
   * derived from a registry baseUrl fallback). */
  url: string;
  /** Display host, e.g. `chatgpt.com` — used for the "Open ‹host› →" label. */
  host: string;
}

/**
 * Resolve the public website + display host for a web-session provider so the
 * "Add session cookie" modal can render a prominent "Open ‹host› →" link.
 *
 * Primary source: `WEB_COOKIE_PROVIDERS[providerId].website`. When an entry has
 * no `website` (or the provider is not in the catalog but the caller knows it is
 * a web-session provider), the caller may pass its registry `baseUrl` as a
 * fallback — only the origin is kept from it.
 *
 * Pure and React-free (unit-testable). Web-ness gating is the caller's
 * responsibility: with no `fallbackBaseUrl`, a provider absent from
 * `WEB_COOKIE_PROVIDERS` resolves to `null`.
 */
export function resolveWebProviderHost(
  providerId: string | null | undefined,
  fallbackBaseUrl?: string | null
): WebProviderHostLink | null {
  if (!providerId) return null;
  const entry = (WEB_COOKIE_PROVIDERS as Record<string, { website?: string }>)[providerId];
  const website = entry?.website?.trim();
  const fallback = fallbackBaseUrl?.trim();
  const source = website || fallback;
  if (!source) return null;
  try {
    const parsed = new URL(source);
    // Keep the website URL verbatim (it may point at a specific path like
    // `/chat`); for a registry baseUrl fallback, keep only the origin.
    return { url: website ? source : parsed.origin, host: parsed.host };
  } catch {
    return null;
  }
}
