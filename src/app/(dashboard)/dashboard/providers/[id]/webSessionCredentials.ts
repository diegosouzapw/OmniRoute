import { WEB_COOKIE_PROVIDERS } from "@/shared/constants/providers";

export type WebSessionCredentialRequirement =
  | {
      kind: "cookie" | "token";
      credentialName: string;
      placeholder: string;
      acceptsFullCookieHeader: boolean;
    }
  | {
      kind: "none";
      credentialName: "";
      placeholder: "";
      acceptsFullCookieHeader: false;
    };

export const WEB_SESSION_CREDENTIAL_REQUIREMENTS = {
  "chatgpt-web": {
    kind: "cookie",
    credentialName: "__Secure-next-auth.session-token",
    placeholder: "__Secure-next-auth.session-token=...",
    acceptsFullCookieHeader: true,
  },
  "grok-web": {
    // Grok needs BOTH the sso and sso-rw cookies (#3180) — the hint previously named
    // only `sso`, which read as "paste just sso" and produced anti-bot 403s.
    kind: "cookie",
    credentialName: "sso + sso-rw",
    placeholder: "sso=...; sso-rw=...",
    acceptsFullCookieHeader: true,
  },
  "gemini-web": {
    kind: "cookie",
    credentialName: "__Secure-1PSID (optional: __Secure-1PSIDTS)",
    placeholder: "__Secure-1PSID=...; __Secure-1PSIDTS=...",
    acceptsFullCookieHeader: true,
  },
  "perplexity-web": {
    kind: "cookie",
    credentialName: "__Secure-next-auth.session-token",
    placeholder: "__Secure-next-auth.session-token=...",
    acceptsFullCookieHeader: true,
  },
  "blackbox-web": {
    kind: "cookie",
    credentialName: "__Secure-authjs.session-token",
    placeholder: "__Secure-authjs.session-token=...; other=value",
    acceptsFullCookieHeader: true,
  },
  "muse-spark-web": {
    kind: "cookie",
    credentialName: "abra_sess",
    placeholder: "abra_sess=...; other=value",
    acceptsFullCookieHeader: true,
  },
  "claude-web": {
    kind: "cookie",
    credentialName: "sessionKey",
    placeholder: "sessionKey=... or full Cookie header from claude.ai",
    acceptsFullCookieHeader: true,
  },
  "deepseek-web": {
    kind: "token",
    credentialName: "userToken",
    placeholder: "userToken=... or paste raw userToken",
    acceptsFullCookieHeader: false,
  },
  "copilot-web": {
    kind: "token",
    credentialName: "access_token",
    placeholder: "access_token=... or a DevTools HAR export",
    acceptsFullCookieHeader: false,
  },
  "t3-web": {
    kind: "cookie",
    credentialName: "convex-session-id + Cookie header",
    placeholder: "convex-session-id=abc123...; Cookie: ...",
    acceptsFullCookieHeader: true,
  },
  "adapta-web": {
    kind: "cookie",
    credentialName: "__client",
    placeholder: "__client=... or full Cookie header from agent.adapta.one",
    acceptsFullCookieHeader: true,
  },
  "inner-ai": {
    kind: "cookie",
    credentialName: "token + email",
    placeholder: "token_value user@example.com",
    acceptsFullCookieHeader: false,
  },
  huggingchat: {
    kind: "cookie",
    credentialName: "hf-chat",
    placeholder: "hf-chat=... or full Cookie header from huggingface.co",
    acceptsFullCookieHeader: true,
  },
  phind: {
    kind: "cookie",
    credentialName: "phind_session",
    placeholder: "phind_session=... or full Cookie header from phind.com",
    acceptsFullCookieHeader: true,
  },
  "poe-web": {
    kind: "cookie",
    credentialName: "p-b",
    placeholder: "p-b=... or full Cookie header from poe.com",
    acceptsFullCookieHeader: true,
  },
  "venice-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from venice.ai",
    acceptsFullCookieHeader: true,
  },
  "v0-vercel-web": {
    kind: "cookie",
    credentialName: "__vercel_session",
    placeholder: "__vercel_session=... or full Cookie header from v0.dev",
    acceptsFullCookieHeader: true,
  },
  "kimi-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from kimi.moonshot.cn",
    acceptsFullCookieHeader: true,
  },
  "doubao-web": {
    kind: "cookie",
    credentialName: "session",
    placeholder: "session=... or full Cookie header from doubao.com",
    acceptsFullCookieHeader: true,
  },
  "qwen-web": {
    kind: "token",
    credentialName: "token",
    placeholder: "Paste your Qwen token from chat.qwen.ai (Local Storage → token)",
    acceptsFullCookieHeader: false,
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
