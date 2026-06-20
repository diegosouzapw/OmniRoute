import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";

export type WebSessionCredentialRequirement =
  | {
      kind: "cookie" | "token";
      credentialName: string;
      placeholder: string;
      acceptsFullCookieHeader: boolean;
      storageKeys: readonly string[];
    }
  | {
      kind: "none";
      credentialName: "";
      placeholder: "";
      acceptsFullCookieHeader: false;
      storageKeys: readonly [];
    };

export const WEB_SESSION_CREDENTIAL_REQUIREMENTS = {
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
  },
  "gemini-web": {
    kind: "cookie",
    credentialName: "__Secure-1PSID (optional: __Secure-1PSIDTS)",
    placeholder: "__Secure-1PSID=...; __Secure-1PSIDTS=...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "__Secure-1PSID", "__Secure-1PSIDTS"],
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
  "t3-web": {
    kind: "cookie",
    credentialName: "convex-session-id + Cookie header",
    placeholder: "convex-session-id=abc123...; Cookie: ...",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "convex-session-id", "convexSessionId"],
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
    credentialName: "hf-chat",
    placeholder: "hf-chat=... or full Cookie header from huggingface.co",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "hf-chat"],
  },
  phind: {
    kind: "cookie",
    credentialName: "phind_session",
    placeholder: "phind_session=... or full Cookie header from phind.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "phind_session"],
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
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from kimi.moonshot.cn",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "session"],
  },
  "doubao-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from doubao.com",
    acceptsFullCookieHeader: true,
    storageKeys: ["cookie", "session"],
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
  lmarena: {
    kind: "cookie",
    // lmarena.ai's auth cookie is `arena-auth-prod-v1` (the legacy hint said `session`,
    // which never matched the real cookie name and confused users). #3810
    //
    // #4271: LMArena migrated to Supabase SSR chunked cookies — the single
    // `arena-auth-prod-v1` cookie is now empty and the session is split across
    // `arena-auth-prod-v1.0`, `arena-auth-prod-v1.1`, … Users must paste the FULL
    // Cookie header so the executor can reconstruct the single cookie from chunks.
    credentialName: "arena-auth-prod-v1",
    placeholder: "Paste the full Cookie header from lmarena.ai (the session is now split across arena-auth-prod-v1.0, .1, …)",
    acceptsFullCookieHeader: true,
    storageKeys: [
      "cookie",
      "arena-auth-prod-v1",
      "arena-auth-prod-v1.0",
      "arena-auth-prod-v1.1",
      "session",
    ],
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
