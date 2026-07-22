import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";

export type WebSessionCredentialRequirement =
  | {
      kind: "cookie" | "token";
      credentialName: string;
      placeholder: string;
      acceptsFullCookieHeader: boolean;
      storageKeys: readonly string[];
      /**
       * #5465 — Optional i18n key for a provider-specific credential hint that
       * REPLACES the generic "Required cookie: {credential}…" copy. Use when the
       * generic template is confusing (e.g. t3.chat needs a localStorage value
       * AND the Cookie header, so the one-line cookie hint reads circular).
       */
      hintKey?: string;
      hintFallback?: string;
    }
  | {
      kind: "none";
      credentialName: "";
      placeholder: "";
      acceptsFullCookieHeader: false;
      storageKeys: readonly [];
    };

export const WEB_SESSION_CREDENTIAL_REQUIREMENTS = {
  "zenmux-free": {
    kind: "cookie",
    credentialName: "Cookie header (full)",
    placeholder: "paste the full Cookie header from zenmux.ai",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie"],
  },
  "chatgpt-web": {
    kind: "cookie",
    credentialName: "__Secure-next-auth.session-token",
    placeholder: "__Secure-next-auth.session-token=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionToken", "session-token", "__Secure-next-auth.session-token"],
  },
  "grok-web": {
    kind: "cookie",
    credentialName: "sso + sso-rw",
    placeholder: "sso=...; sso-rw=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sso", "sso-rw"],
    // #7567 — grok.com's cf_clearance cookie is pinned to IP + User-Agent + TLS
    // fingerprint of the browser that earned it, so pasting it from a different
    // machine/IP causes a 403 that is actually correct Cloudflare behavior. Point
    // users at the Custom User-Agent field under Advanced Settings + same IP/proxy,
    // instead of the generic (and here misleading) single-cookie hint.
    hintKey: "grokWebCookieHint",
    hintFallback:
      "grok.com's cf_clearance cookie is pinned to the IP, User-Agent, and TLS fingerprint of the browser where you copied it — pasting it from a different machine/IP causes a 403. Paste sso and sso-rw here, then open Advanced Settings and fill Custom User-Agent with the EXACT User-Agent string of that same browser, and use the same IP/proxy for this connection.",
  },
  "gemini-web": {
    kind: "cookie",
    credentialName: "__Secure-1PSID (optional: __Secure-1PSIDTS)",
    placeholder: "__Secure-1PSID=...; __Secure-1PSIDTS=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "__Secure-1PSID", "__Secure-1PSIDTS"],
  },
  "notion-web": {
    kind: "cookie",
    credentialName: "token_v2 (optional: space_id, notion_browser_id)",
    placeholder: "token_v2=...; space_id=...; notion_browser_id=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "token_v2", "space_id", "notion_browser_id"],
  },
  "gemini-business": {
    kind: "cookie",
    credentialName: "__Secure-1PSID (optional: __Secure-1PSIDTS)",
    placeholder: "__Secure-1PSID=...; __Secure-1PSIDTS=... (from business.gemini.google)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "__Secure-1PSID", "__Secure-1PSIDTS"],
  },
  "perplexity-web": {
    kind: "cookie",
    credentialName: "__Secure-next-auth.session-token",
    placeholder: "__Secure-next-auth.session-token=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionToken", "session-token", "__Secure-next-auth.session-token"],
  },
  hyperagent: {
    kind: "cookie",
    credentialName: "Session Cookie",
    placeholder: "Paste full Cookie header from hyperagent.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionCookie", "authCookie"],
  },
  "blackbox-web": {
    kind: "cookie",
    credentialName: "__Secure-authjs.session-token",
    placeholder: "__Secure-authjs.session-token=...; other=value",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionToken", "__Secure-authjs.session-token"],
  },
  "muse-spark-web": {
    kind: "cookie",
    credentialName: "abra_sess",
    placeholder: "abra_sess=...; other=value",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "abra_sess"],
  },
  "hailuo-web": {
    kind: "token",
    credentialName: "_token",
    placeholder: '_token=... (hailuo.ai → DevTools → Local Storage → "_token")',
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "_token"],
  },
  "claude-web": {
    kind: "cookie",
    credentialName: "sessionKey",
    placeholder: "sessionKey=... or full Cookie header from claude.ai",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionKey"],
  },
  "deepseek-web": {
    kind: "token",
    credentialName: "userToken",
    placeholder: "userToken=... or paste raw userToken",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "userToken"],
  },
  "copilot-web": {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token=... or a DevTools HAR export",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "access_token", "accessToken"],
  },
  "microsoft-designer-web": {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token=... (Authorization: Bearer header from the DallE.ashx request)",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "access_token", "accessToken"],
  },
  "copilot-m365-web": {
    kind: "token",
    credentialName: "access_token + chathubPath",
    placeholder: "access_token=...; chathubPath=redacted",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "access_token", "accessToken", "chathubPath", "userTenant"],
  },
  "t3-web": {
    kind: "cookie",
    credentialName: "convex-session-id + Cookie header",
    placeholder: "convex-session-id=abc123...; Cookie: ...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "convex-session-id", "convexSessionId"],
    // #5465 — the generic cookie hint reads circular for t3.chat (needs a
    // localStorage value AND the Cookie header); use the step-by-step DevTools
    // copy that already ships translated in every locale.
    hintKey: "t3ChatWebCookieHint",
  },
  "adapta-web": {
    kind: "cookie",
    credentialName: "__client",
    placeholder: "__client=... or full Cookie header from agent.adapta.one",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "__client"],
  },
  "inner-ai": {
    kind: "cookie",
    credentialName: "token + email",
    placeholder: "token_value user@example.com",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "cookie", "email"],
  },
  huggingchat: {
    kind: "cookie",
    credentialName: "full Cookie header (hf-chat + token)",
    placeholder:
      "hf-chat=...; token=...; aws-waf-token=... (full Cookie header from huggingface.co)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "hf-chat"],
  },
  "yuanbao-web": {
    kind: "cookie",
    credentialName: "full Cookie header (hy_user + hy_token)",
    placeholder: "hy_user=...; hy_token=... (full Cookie header from yuanbao.tencent.com)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "hy_user", "hy_token"],
  },
  "poe-web": {
    kind: "cookie",
    credentialName: "p-b",
    placeholder: "p-b=... or full Cookie header from poe.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "p-b"],
  },
  "venice-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from venice.ai",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "session"],
  },
  "v0-vercel-web": {
    kind: "cookie",
    credentialName: "__vercel_session",
    placeholder: "__vercel_session=... or full Cookie header from v0.dev",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "__vercel_session"],
  },
  "kimi-web": {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token from www.kimi.com localStorage",
    acceptsFullCookieHeader: true,
    storageKeys: ["token", "access_token", "accessToken", "cookie", "kimi-auth"],
  },
  "doubao-web": {
    kind: "cookie",
    credentialName: "full Cookie header (sessionid + ttwid + s_v_web_id)",
    placeholder:
      "sessionid=...; ttwid=...; s_v_web_id=... (or fp=verify_... fallback from www.dola.com)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "sessionid", "ttwid", "s_v_web_id", "fp"],
  },
  "qwen-web": {
    kind: "cookie",
    credentialName: "full Cookie header (must include cna, ssxmod_itna, token)",
    placeholder:
      "cna=...; token=...; ssxmod_itna=...; ssxmod_itna2=... (full Cookie header from chat.qwen.ai)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "token", "ssxmod_itna", "ssxmod_itna2", "cna", "tongyi_sso_ticket"],
  },
  "duckduckgo-web": {
    kind: "cookie",
    credentialName: "duckai",
    placeholder: "duckai=... or full Cookie header from duckduckgo.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "duckai"],
  },
  "t3-chat-web": {
    kind: "token",
    credentialName: "token",
    placeholder: "Paste your T3 Chat token from t3.chat (Local Storage → token)",
    acceptsFullCookieHeader: false,
    storageKeys: ["token"],
  },
  "chatglm-web": {
    kind: "cookie",
    credentialName: "chatglm_session",
    placeholder: "chatglm_session=... or full Cookie header from chatglm.cn",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "chatglm_session"],
  },
  "xiaomimimo-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from aistudio.xiaomimimo.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "session"],
  },
  "manus-web": {
    kind: "cookie",
    credentialName: "manus_session",
    placeholder: "manus_session=... or full Cookie header from manus.im",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "manus_session"],
  },
  "zai-web": {
    kind: "cookie",
    credentialName: "token",
    placeholder: "token=... or full Cookie header from chat.z.ai",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "token"],
  },
  lmarena: {
    kind: "cookie",
    // arena.ai's auth cookie is `arena-auth-prod-v1` (the legacy hint said `session`,
    // which never matched the real cookie name and confused users). #3810
    //
    // #4271: LMArena migrated to Supabase SSR chunked cookies — the single
    // `arena-auth-prod-v1` cookie is now empty and the session is split across
    // `arena-auth-prod-v1.0`, `arena-auth-prod-v1.1`, … Users must paste the FULL
    // Cookie header so the executor can reconstruct the single cookie from chunks.
    credentialName: "full Cookie header (arena-auth-prod-v1.0 + arena-auth-prod-v1.1)",
    placeholder:
      "arena-auth-prod-v1.0=...; arena-auth-prod-v1.1=...; other=value (full Cookie header from arena.ai)",
    acceptsFullCookieHeader: true,
    storageKeys: [
      "cookie",
      "arena-auth-prod-v1",
      "arena-auth-prod-v1.0",
      "arena-auth-prod-v1.1",
      "session",
    ],
    hintKey: "lmarenaWebCookieHint",
    hintFallback:
      "Open arena.ai, sign in, then copy the full Cookie header from a Network request. Include arena-auth-prod-v1.0 and arena-auth-prod-v1.1 (and further chunks if present), preferably with cf_clearance. Do not paste only the empty arena-auth-prod-v1 cookie. Optional: providerSpecificData.recaptchaV3Token if create-evaluation still returns 403.",
  },
  "promptql": {
    kind: "token",
    credentialName: "Bearer JWT (optional: projectId, session Cookie)",
    placeholder: "eyJ...  (Authorization Bearer from prompt.ql.app)",
    acceptsFullCookieHeader: false,
    storageKeys: ["token", "jwt", "apiKey", "projectId", "project_id", "cookie"],
  },
  "adobe-firefly": {
    // Prefer IMS access_token JWT (Bearer). Cookie from firefly.adobe.com alone
    // only mints a guest IMS token. Kind stays "cookie" for multi-account UX;
    // resolveAdobeAccessToken auto-detects JWT vs cookie and rejects guests.
    kind: "cookie",
    credentialName: "IMS access_token JWT (recommended) or multi-domain Cookie",
    placeholder:
      "Paste eyJ… JWT from Authorization: Bearer on firefly-3p generate request (not page Cookie alone)",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "token", "access_token", "accessToken"],
  },
} satisfies Record<keyof typeof WEB_COOKIE_PROVIDERS, WebSessionCredentialRequirement>;

export function getWebSessionCredentialRequirement(
  providerId: unknown
): WebSessionCredentialRequirement | null {
  if (typeof providerId !== "string") return null;
  return (
    WEB_SESSION_CREDENTIAL_REQUIREMENTS[
      providerId as keyof typeof WEB_SESSION_CREDENTIAL_REQUIREMENTS
    ] ?? null
  );
}

export function requiresWebSessionCredential(providerId: unknown): boolean {
  const requirement = getWebSessionCredentialRequirement(providerId);
  return !!requirement && requirement.kind !== "none";
}

function hasNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function hasUsableWebSessionCredential(
  providerId: unknown,
  providerSpecificData: unknown
): boolean {
  const requirement = getWebSessionCredentialRequirement(providerId);
  if (!requirement || requirement.kind === "none") return false;
  if (!providerSpecificData || typeof providerSpecificData !== "object") return false;

  const data = providerSpecificData as Record<string, unknown>;
  return requirement.storageKeys.some((key) => hasNonEmptyString(data[key]));
}

/**
 * Resolve the value that a web-session import must store in the connection's
 * `apiKey` column.
 *
 * `token`-kind providers (deepseek-web, copilot-web, copilot-m365-web,
 * t3-chat-web, …) are authenticated from `apiKey`: both the connection
 * validator (`validateDeepSeekWebProvider({ apiKey })`) and the executor
 * (`extractUserToken` → `credentials.apiKey`) read the token there — never from
 * `providerSpecificData`. The bulk web-session import used to leave `apiKey`
 * null and stash the token only in `providerSpecificData`, so imported token-kind
 * connections were never recognized. Return the credential for token-kind so the
 * import stores it where those readers look.
 *
 * `cookie`-kind providers keep `apiKey` null — their executors read the full
 * cookie from `providerSpecificData.cookie`.
 */
export function resolveWebSessionImportApiKey(
  requirement: WebSessionCredentialRequirement | null,
  credential: string
): string | null {
  if (!requirement || requirement.kind !== "token") return null;
  const trimmed = typeof credential === "string" ? credential.trim() : "";
  return trimmed.length > 0 ? trimmed : null;
}
