/**
 * Provider catalog data — extracted from providers.ts (god-file decomposition).
 * Pure data literal; re-exported by the providers.ts barrel. No behavior change.
 */
export const WEB_COOKIE_PROVIDERS = {
  "chatgpt-web": {
    id: "chatgpt-web",
    alias: "cgpt-web",
    name: "ChatGPT Web (Plus/Pro)",
    icon: "auto_awesome",
    color: "#10A37F",
    textIcon: "CG",
    website: "https://chatgpt.com",
    authHint: "Paste your __Secure-next-auth.session-token cookie value from chatgpt.com",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "grok-web": {
    id: "grok-web",
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
    alias: "gweb",
    name: "Gemini Web (Free)",
    icon: "auto_awesome",
    color: "#4285F4",
    textIcon: "GWeb",
    website: "https://gemini.google.com",
    authHint:
      "Paste your __Secure-1PSID cookie value from gemini.google.com. Optionally add __Secure-1PSIDTS separated by semicolon.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "perplexity-web": {
    id: "perplexity-web",
    alias: "pplx-web",
    name: "Perplexity Web (Pro/Max)",
    icon: "search",
    color: "#20808D",
    textIcon: "PW",
    website: "https://www.perplexity.ai",
    authHint: "Paste your __Secure-next-auth.session-token cookie value from perplexity.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "blackbox-web": {
    id: "blackbox-web",
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
  },
  "muse-spark-web": {
    id: "muse-spark-web",
    alias: "ms-web",
    name: "Muse Spark Web (Meta AI)",
    icon: "auto_awesome",
    color: "#0866FF",
    textIcon: "MS",
    website: "https://www.meta.ai",
    hasFree: true,
    freeNote: "Free with login — Meta AI platform with Llama models.",
    authHint: "Paste your ecto_1_sess value or full cookie header from meta.ai",
  },
  "claude-web": {
    id: "claude-web",
    alias: "cw",
    name: "Claude Web",
    icon: "auto_awesome",
    color: "#D97757",
    textIcon: "CW",
    website: "https://claude.ai",
    authHint: "Paste your session cookie from claude.ai",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "deepseek-web": {
    id: "deepseek-web",
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
  },
  "copilot-web": {
    id: "copilot-web",
    alias: "copilot",
    name: "Microsoft Copilot Web",
    icon: "auto_awesome",
    color: "#0078D4",
    textIcon: "CP",
    website: "https://copilot.microsoft.com",
    authHint:
      "Paste your access_token from copilot.microsoft.com (or export a .har file from DevTools while logged in)",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "copilot-m365-web": {
    id: "copilot-m365-web",
    alias: "m365copilot",
    name: "Microsoft 365 Copilot (BizChat)",
    icon: "business_center",
    color: "#0078D4",
    textIcon: "M365",
    website: "https://m365.cloud.microsoft/chat",
    authHint:
      "Sign in at m365.cloud.microsoft/chat, then open DevTools → Network → filter 'WS' → click the Chathub WebSocket connection. Copy both the access_token query parameter AND the account-specific Chathub path segment from its request URL (wss://…/Chathub/<path>?…&access_token=…). It is NOT an Authorization: Bearer header on an XHR/Fetch request. The token is short-lived; this is an unofficial integration.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "t3-web": {
    id: "t3-web",
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
  },
  "inner-ai": {
    id: "inner-ai",
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
  },
  "adapta-web": {
    id: "adapta-web",
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
  },
  lmarena: {
    id: "lmarena",
    alias: "lma",
    name: "LMArena (Free)",
    icon: "auto_awesome",
    color: "#FF6B6B",
    textIcon: "LMA",
    website: "https://lmarena.ai",
    hasFree: true,
    freeNote:
      "Free model comparison platform — 40+ models (GPT, Claude, Gemini, Llama). No subscription required.",
    authHint:
      "Paste the full Cookie header from lmarena.ai (DevTools → Network → request → Cookie). The session is now split across arena-auth-prod-v1.0, .1, … — copy the whole header. Optional — works with free tier for basic comparisons.",
    riskNoticeVariant: "webCookie",
  },
  "yuanbao-web": {
    id: "yuanbao-web",
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
  huggingchat: {
    id: "huggingchat",
    // "hc" belongs to the hackclub provider; huggingchat uses its own id as alias.
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
    alias: "v0",
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
    // Primary "kimi" provider keeps the short alias; web variant uses its own id.
    alias: "kimi-web",
    name: "Kimi Web (Moonshot AI)",
    icon: "auto_awesome",
    color: "#2563EB",
    textIcon: "KW",
    website: "https://www.kimi.com",
    authHint:
      "Paste your Cookie header from www.kimi.com (must contain kimi-auth=...). Find it via DevTools → Network → request → Cookie.",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "doubao-web": {
    id: "doubao-web",
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
  "qwen-web": {
    id: "qwen-web",
    // Primary "qwen" provider keeps the short alias; web variant uses its own id.
    alias: "qwen-web",
    name: "Qwen Web (Free)",
    icon: "auto_awesome",
    color: "#10B981",
    textIcon: "QW",
    website: "https://chat.qwen.ai",
    hasFree: true,
    freeNote: "Free — Qwen models via chat.qwen.ai with login token. No subscription required.",
    authHint:
      "Open chat.qwen.ai, log in, then open DevTools → Application → Local Storage → " +
      'copy the "token" value (or use tongyi_sso_ticket cookie as Bearer token).',
  },
  "gemini-business": {
    id: "gemini-business",
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
