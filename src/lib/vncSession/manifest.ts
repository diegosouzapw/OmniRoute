/**
 * vncSession manifest — declarative config for the persistent noVNC-Chrome
 * login sessions feature.
 *
 * When a web-cookie (or web-token) provider is "logged into" via the OmniRoute
 * URL, we auto-start a persistent-profile Chromium container (noVNC) pointed at
 * that provider's real site. The user logs in through the VNC UI; cookies are
 * harvested back into `provider_connections`. See service.ts / proxy.ts.
 *
 * This file is intentionally dependency-free and safe to import from anywhere
 * (including the dist bootstrap) — no Node/Docker imports here.
 */

export interface VncProviderEntry {
  /** Provider id as it appears in provider_connections.provider. */
  id: string;
  /** Human label for the VNC landing page. */
  name: string;
  /** URL the browser container opens on launch (the login page). */
  url: string;
  /** Cookie name(s) we harvest back into providerSpecificData. Leave empty for
   *  "harvest the whole cookie jar" (e.g. Qwen/Grok where the canonical subset
   *  is unknown). */
  cookieNames: string[];
  /** Whether the credential is stored as a `token` (deepseek-web, copilot-*) vs
   *  a `cookie` blob. Drives how harvested values are written back. */
  kind: "cookie" | "token";
}

/**
 * Map of every web-session provider OmniRoute knows about to the public site
 * the browser container should open. Mirrors WEB_COOKIE_PROVIDERS[].website and
 * WEB_SESSION_CREDENTIAL_REQUIREMENTS[].storageKeys from the app catalog so the
 * VNC session lands on the right login page and harvests the right cookie.
 *
 * Adding a provider here is all that's needed for it to gain VNC-login support
 * (no other code change) — the service iterates this map.
 */
export const VNC_PROVIDER_MANIFEST: Record<string, VncProviderEntry> = {
  "chatgpt-web": {
    id: "chatgpt-web",
    name: "ChatGPT Web",
    url: "https://chatgpt.com",
    cookieNames: ["__Secure-next-auth.session-token"],
    kind: "cookie",
  },
  "grok-web": {
    id: "grok-web",
    name: "Grok Web",
    url: "https://grok.com",
    cookieNames: [],
    kind: "cookie",
  },
  "gemini-web": {
    id: "gemini-web",
    name: "Gemini Web",
    url: "https://gemini.google.com",
    cookieNames: ["__Secure-1PSID", "__Secure-1PSIDTS"],
    kind: "cookie",
  },
  "gemini-business": {
    id: "gemini-business",
    name: "Gemini Business",
    url: "https://business.gemini.google",
    cookieNames: ["__Secure-1PSID", "__Secure-1PSIDTS"],
    kind: "cookie",
  },
  "perplexity-web": {
    id: "perplexity-web",
    name: "Perplexity Web",
    url: "https://www.perplexity.ai",
    cookieNames: ["__Secure-next-auth.session-token"],
    kind: "cookie",
  },
  "blackbox-web": {
    id: "blackbox-web",
    name: "Blackbox Web",
    url: "https://app.blackbox.ai",
    cookieNames: ["__Secure-authjs.session-token"],
    kind: "cookie",
  },
  "muse-spark-web": {
    id: "muse-spark-web",
    name: "Muse Spark Web",
    url: "https://www.meta.ai",
    cookieNames: ["ecto_1_sess"],
    kind: "cookie",
  },
  "claude-web": {
    id: "claude-web",
    name: "Claude Web",
    url: "https://claude.ai",
    cookieNames: ["sessionKey"],
    kind: "cookie",
  },
  "deepseek-web": {
    id: "deepseek-web",
    name: "DeepSeek Web",
    url: "https://chat.deepseek.com",
    cookieNames: ["userToken"],
    kind: "token",
  },
  "copilot-web": {
    id: "copilot-web",
    name: "Copilot Web",
    url: "https://copilot.microsoft.com",
    cookieNames: ["access_token"],
    kind: "token",
  },
  "copilot-m365-web": {
    id: "copilot-m365-web",
    name: "Copilot M365 Web",
    url: "https://m365.cloud.microsoft/chat",
    cookieNames: ["access_token"],
    kind: "token",
  },
  "t3-web": {
    id: "t3-web",
    name: "t3.chat",
    url: "https://t3.chat",
    cookieNames: ["convex-session-id"],
    kind: "cookie",
  },
  "adapta-web": {
    id: "adapta-web",
    name: "Adapta Web",
    url: "https://agent.adapta.one",
    cookieNames: ["__client"],
    kind: "cookie",
  },
  "inner-ai": {
    id: "inner-ai",
    name: "Inner.ai",
    url: "https://app.innerai.com",
    cookieNames: ["token"],
    kind: "cookie",
  },
  huggingchat: {
    id: "huggingchat",
    name: "HuggingChat",
    url: "https://huggingface.co/chat",
    cookieNames: ["hf-chat"],
    kind: "cookie",
  },
  "yuanbao-web": {
    id: "yuanbao-web",
    name: "Tencent Yuanbao",
    url: "https://yuanbao.tencent.com",
    cookieNames: ["hy_user", "hy_token"],
    kind: "cookie",
  },
  "poe-web": {
    id: "poe-web",
    name: "Poe Web",
    url: "https://poe.com",
    cookieNames: ["p-b"],
    kind: "cookie",
  },
  "venice-web": {
    id: "venice-web",
    name: "Venice Web",
    url: "https://venice.ai",
    cookieNames: ["session"],
    kind: "cookie",
  },
  "v0-vercel-web": {
    id: "v0-vercel-web",
    name: "v0 Vercel Web",
    url: "https://v0.dev",
    cookieNames: ["__vercel_session"],
    kind: "cookie",
  },
  "kimi-web": {
    id: "kimi-web",
    name: "Kimi Web",
    url: "https://www.kimi.com",
    cookieNames: ["kimi-auth"],
    kind: "cookie",
  },
  "doubao-web": {
    id: "doubao-web",
    name: "Dola Web",
    url: "https://www.dola.com",
    cookieNames: ["sessionid", "ttwid", "s_v_web_id"],
    kind: "cookie",
  },
  "qwen-web": {
    id: "qwen-web",
    name: "Qwen Web",
    url: "https://chat.qwen.ai",
    cookieNames: [],
    kind: "cookie",
  },
  "zenmux-free": {
    id: "zenmux-free",
    name: "ZenMux Free",
    url: "https://zenmux.ai",
    cookieNames: [],
    kind: "cookie",
  },
  "zai-web": {
    id: "zai-web",
    name: "Z.ai Web",
    url: "https://chat.z.ai",
    cookieNames: ["token"],
    kind: "cookie",
  },
  lmarena: {
    id: "lmarena",
    name: "Arena",
    url: "https://arena.ai",
    cookieNames: [],
    kind: "cookie",
  },
};

export function getVncProvider(id: string | null | undefined): VncProviderEntry | null {
  if (!id) return null;
  return VNC_PROVIDER_MANIFEST[id] ?? null;
}

export function isVncProvider(id: string | null | undefined): boolean {
  return !!getVncProvider(id);
}

// ── Runtime configuration ────────────────────────────────────────────────────

export const VNC_CONFIG = {
  /** Base host port for the noVNC web UI. Session N binds 6080+2N (vnc) and
   *  6081+2N (cdp). */
  vncBasePort: 6080,
  /**
   * Container image providing a persistent-profile browser + noVNC web UI.
   *
   * Default is the upstream jlesage/firefox image: Firefox's remote-debugging
   * port binds 0.0.0.0 out of the box (unlike Chrome ≥130, which forces
   * 127.0.0.1 and would need an in-container TCP bridge), so cookie harvest over
   * the DevTools Protocol works with a plain published port. Override with
   * OMNIROUTE_VNC_IMAGE to use a Chromium-based image + bridge if preferred.
   */
  image: process.env.OMNIROUTE_VNC_IMAGE || "jlesage/firefox:latest",
  /** noVNC web UI port inside the container (jlesage/firefox → 5800). */
  containerVncPort: Number(process.env.OMNIROUTE_VNC_CONTAINER_VNC_PORT || 5800),
  /** Remote-debugging (CDP) port inside the container. */
  containerCdpPort: Number(process.env.OMNIROUTE_VNC_CONTAINER_CDP_PORT || 9222),
  /** Persistent profile mount point inside the container. */
  containerProfileDir: process.env.OMNIROUTE_VNC_CONTAINER_PROFILE_DIR || "/config",
  /** Idle timeout (ms) with no websocket viewer + no cookie read → auto-stop. */
  idleTimeoutMs: Number(process.env.OMNIROUTE_VNC_IDLE_MS || 10 * 60 * 1000),
  /** Hard cap on a session lifetime even with activity (ms). 0 = no cap. */
  maxSessionMs: Number(process.env.OMNIROUTE_VNC_MAX_MS || 0),
  /** Where the persistent browser user profile is stored on the host. */
  profileDir:
    process.env.OMNIROUTE_VNC_PROFILE_DIR ||
    (process.env.HOME || "/home/caps") + "/.omniroute/vnc-profiles",
  /** Host docker socket (default rootless/root path). */
  dockerSocket: process.env.DOCKER_HOST || "unix:///var/run/docker.sock",
  /** Max concurrent VNC sessions. */
  maxSessions: Number(process.env.OMNIROUTE_VNC_MAX_SESSIONS || 12),
} as const;

export const VNC_ROUTE_PREFIX = "/api/vnc-session";
