/**
 * TokenExtractionConfig — Login & cookie extraction configs for web-cookie providers
 *
 * Each config describes how to:
 *   1. Open a browser window/navigate to the provider's login page
 *   2. Detect successful login (URL change + token presence)
 *   3. Extract session cookies / tokens from the browser context
 *
 * Used by InAppLoginService (Electron BrowserWindow path) and
 * the Playwright-based login flow (dashboard API).
 */

// ─── Types ──────────────────────────────────────────────────────────────────

/** Describes where to extract credential data from after login */
export type TokenSource =
  | { type: "cookie"; name: string; domain?: string }
  | { type: "localStorage"; key: string }
  | { type: "sessionStorage"; key: string }
  | { type: "header"; name: string };

export interface PollingConfig {
  /** Milliseconds between extraction polls (default 1000) */
  pollInterval: number;
  /** Total timeout in ms (default 300000 = 5 min) */
  timeout: number;
  /** Minimum time in ms before first extraction attempt (default 5000) */
  minLoginTime: number;
}

export interface TokenExtractionConfig {
  /** Matches the executor's provider ID (e.g. "claude-web", "gemini-web") */
  providerId: string;
  /** Human-readable name shown in dashboard UI */
  displayName: string;
  /** The URL to navigate to for login */
  loginUrl: string;
  /** The provider's home page URL (for cookie domain binding) */
  homeUrl: string;
  /** Optional regex. If current URL matches → login is likely complete */
  successUrlPattern?: RegExp;
  /** Sources to extract credentials from after login */
  tokenSources: TokenSource[];
  /** Polling behaviour */
  pollingConfig: PollingConfig;
  /** Short instructions shown to the user in the login modal */
  instructions: string;
  /** Optional: cookie domain override for cookie injection */
  cookieDomain?: string;
}

// ─── Defaults ───────────────────────────────────────────────────────────────

const DEFAULT_POLLING: PollingConfig = {
  pollInterval: 1000,
  timeout: 300_000,
  minLoginTime: 5000,
};

const QUICK_POLLING: PollingConfig = {
  pollInterval: 800,
  timeout: 120_000,
  minLoginTime: 3000,
};

// ─── Helper ──────────────────────────────────────────────────────────────────

function config(
  providerId: string,
  displayName: string,
  loginUrl: string,
  homeUrl: string,
  tokenSources: TokenSource[],
  instructions: string,
  opts?: {
    successUrlPattern?: RegExp;
    pollingConfig?: Partial<PollingConfig>;
    cookieDomain?: string;
  }
): TokenExtractionConfig {
  return {
    providerId,
    displayName,
    loginUrl,
    homeUrl,
    tokenSources,
    instructions,
    pollingConfig: { ...DEFAULT_POLLING, ...opts?.pollingConfig },
    successUrlPattern: opts?.successUrlPattern,
    cookieDomain: opts?.cookieDomain,
  };
}

// ─── Configuration Map ──────────────────────────────────────────────────────

const RAW_CONFIGS: TokenExtractionConfig[] = [
  // ── Claude Web ────────────────────────────────────────────
  config(
    "claude-web",
    "Claude Web",
    "https://claude.ai/login",
    "https://claude.ai",
    [{ type: "cookie", name: "sessionKey", domain: ".claude.ai" }],
    "Log in to your Claude account at claude.ai. After login, the session cookie will be extracted automatically."
  ),

  // ── ChatGPT Web ───────────────────────────────────────────
  config(
    "chatgpt-web",
    "ChatGPT Web",
    "https://chatgpt.com/auth/login",
    "https://chatgpt.com",
    [{ type: "cookie", name: "__Secure-next-auth.session-token", domain: ".chatgpt.com" }],
    "Log in to ChatGPT. The __Secure-next-auth.session-token cookie will be extracted after login."
  ),

  // ── Gemini Web ────────────────────────────────────────────
  config(
    "gemini-web",
    "Gemini Web",
    "https://gemini.google.com/app",
    "https://gemini.google.com",
    [
      { type: "cookie", name: "__Secure-1PSID", domain: ".google.com" },
      { type: "cookie", name: "__Secure-1PSIDTS", domain: ".google.com" },
    ],
    "Log in to your Google account at gemini.google.com. Both __Secure-1PSID and __Secure-1PSIDTS cookies will be extracted.",
    { cookieDomain: ".google.com" }
  ),

  // ── Grok Web ──────────────────────────────────────────────
  config(
    "grok-web",
    "Grok Web",
    "https://grok.com/login",
    "https://grok.com",
    [{ type: "cookie", name: "sso", domain: ".grok.com" }],
    "Log in to your xAI account at grok.com. The sso session cookie will be extracted."
  ),

  // ── Perplexity Web ────────────────────────────────────────
  config(
    "perplexity-web",
    "Perplexity Web",
    "https://www.perplexity.ai/login",
    "https://www.perplexity.ai",
    [{ type: "cookie", name: "__Secure-next-auth.session-token", domain: ".perplexity.ai" }],
    "Log in to Perplexity. The __Secure-next-auth.session-token cookie will be extracted.",
    { cookieDomain: ".perplexity.ai" }
  ),

  // ── DeepSeek Web ──────────────────────────────────────────
  config(
    "deepseek-web",
    "DeepSeek Web",
    "https://chat.deepseek.com/sign_in",
    "https://chat.deepseek.com",
    [
      { type: "cookie", name: "user-token", domain: ".deepseek.com" },
      { type: "localStorage", key: "userToken" },
    ],
    "Log in to DeepSeek at chat.deepseek.com. The user-token cookie will be extracted.",
    { cookieDomain: ".deepseek.com" }
  ),

  // ── Qwen Web ──────────────────────────────────────────────
  // The v2 API sits behind Alibaba's "baxia" WAF, which needs the full browser
  // cookie jar (cna + ssxmod_itna/itna2 + token), not just the bearer token.
  // Capture the WAF cookies alongside the localStorage token (#3288).
  config(
    "qwen-web",
    "Qwen Web (Tongyi)",
    "https://chat.qwen.ai/",
    "https://chat.qwen.ai",
    [
      { type: "localStorage", key: "token" },
      { type: "cookie", name: "token", domain: ".chat.qwen.ai" },
      { type: "cookie", name: "cna", domain: ".chat.qwen.ai" },
      { type: "cookie", name: "ssxmod_itna", domain: ".chat.qwen.ai" },
      { type: "cookie", name: "ssxmod_itna2", domain: ".chat.qwen.ai" },
      { type: "cookie", name: "XSRF_TOKEN", domain: ".chat.qwen.ai" },
    ],
    "Log in to Qwen at chat.qwen.ai using your Alibaba account. The session token and the " +
      "Alibaba WAF cookies (cna, ssxmod_itna) will be extracted — all are required by the v2 API.",
    { cookieDomain: ".chat.qwen.ai" }
  ),

  // ── Kimi Web ──────────────────────────────────────────────
  config(
    "kimi-web",
    "Kimi (Moonshot)",
    "https://www.kimi.com/",
    "https://www.kimi.com",
    [{ type: "cookie", name: "kimi-auth", domain: ".kimi.com" }],
    "Log in to Kimi at www.kimi.com (international). The kimi-auth JWT cookie will be extracted.",
    { cookieDomain: ".kimi.com" }
  ),

  // ── Blackbox Web ──────────────────────────────────────────
  config(
    "blackbox-web",
    "Blackbox AI",
    "https://app.blackbox.ai/login",
    "https://app.blackbox.ai",
    [
      { type: "cookie", name: "connect.sid", domain: ".blackbox.ai" },
      { type: "localStorage", key: "token" },
    ],
    "Log in to Blackbox AI at app.blackbox.ai using Google/GitHub. The session cookie will be extracted.",
    { cookieDomain: ".blackbox.ai" }
  ),

  // ── Poe Web ───────────────────────────────────────────────
  config(
    "poe-web",
    "Poe (Quora)",
    "https://poe.com/login",
    "https://poe.com",
    [{ type: "cookie", name: "p-b", domain: ".poe.com" }],
    "Log in to Poe at poe.com. The session cookie will be extracted.",
    { cookieDomain: ".poe.com" }
  ),

  // ── Copilot Web ───────────────────────────────────────────
  config(
    "copilot-web",
    "Microsoft Copilot",
    "https://copilot.microsoft.com/",
    "https://copilot.microsoft.com",
    [{ type: "cookie", name: "RPSCAuth", domain: ".microsoft.com" }],
    "Log in with your Microsoft account at copilot.microsoft.com. The session auth cookie will be extracted.",
    { cookieDomain: ".microsoft.com" }
  ),

  // ── DuckDuckGo Web ────────────────────────────────────────
  config(
    "duckduckgo-web",
    "DuckDuckGo AI Chat",
    "https://duckduckgo.com/?q=DuckDuckGo+AI+Chat&ia=chat&duckai=1",
    "https://duckduckgo.com",
    [{ type: "cookie", name: "duckai", domain: ".duckduckgo.com" }],
    "Open DuckDuckGo AI Chat. Some models may require a free account. The duckai cookie will be extracted.",
    {
      cookieDomain: ".duckduckgo.com",
      pollingConfig: QUICK_POLLING,
    }
  ),

  // ── Dola Web ──────────────────────────────────────────────
  config(
    "doubao-web",
    "Dola (ByteDance)",
    "https://www.dola.com/",
    "https://www.dola.com",
    [
      { type: "cookie", name: "sessionid", domain: ".dola.com" },
      { type: "cookie", name: "ttwid", domain: ".dola.com" },
      { type: "cookie", name: "s_v_web_id", domain: ".dola.com" },
    ],
    "Log in to Dola at www.dola.com with your ByteDance account. sessionid, ttwid, and s_v_web_id will be extracted.",
    { cookieDomain: ".dola.com" }
  ),

  // ── T3 Chat Web ───────────────────────────────────────────
  config(
    "t3-chat-web",
    "T3 Chat",
    "https://t3.chat/login",
    "https://t3.chat",
    [{ type: "localStorage", key: "token" }],
    "Log in to T3 Chat at t3.chat using Google/GitHub. The token from localStorage will be extracted.",
    { pollingConfig: QUICK_POLLING }
  ),

  // ── Venice Web ────────────────────────────────────────────
  config(
    "venice-web",
    "Venice AI",
    "https://venice.ai/login",
    "https://venice.ai",
    [
      { type: "cookie", name: "venice_session", domain: ".venice.ai" },
      { type: "localStorage", key: "token" },
    ],
    "Log in to Venice AI at venice.ai. The session cookie will be extracted.",
    { cookieDomain: ".venice.ai" }
  ),

  // ── v0 Dev Web ────────────────────────────────────────────
  config(
    "v0-vercel-web",
    "v0 by Vercel",
    "https://v0.dev/login",
    "https://v0.dev",
    [{ type: "cookie", name: "__Secure-next-auth.session-token", domain: ".v0.dev" }],
    "Log in to v0.dev with your Vercel/Google/GitHub account. The session cookie will be extracted.",
    { cookieDomain: ".v0.dev" }
  ),

  // ── Muse / Spark Web ──────────────────────────────────────
  config(
    "muse-spark-web",
    "Meta AI (Muse)",
    "https://www.meta.ai/",
    "https://www.meta.ai",
    [{ type: "cookie", name: "session", domain: ".meta.ai" }],
    "Log in to Meta AI at meta.ai with your Facebook/Instagram account. The session cookie will be extracted.",
    { cookieDomain: ".meta.ai" }
  ),

  // ── Adapta Web ────────────────────────────────────────────
  config(
    "adapta-web",
    "Adapta AI",
    "https://agent.adapta.one/login",
    "https://agent.adapta.one",
    [{ type: "cookie", name: "__session", domain: ".adapta.one" }],
    "Log in to Adapta at agent.adapta.one. The session token will be extracted.",
    { cookieDomain: ".adapta.one" }
  ),

  // ── VeoAI Free Web ────────────────────────────────────────
  config(
    "veoaifree-web",
    "VeoAI Free",
    "https://veoaifree.com/",
    "https://veoaifree.com",
    [{ type: "cookie", name: "wordpress_logged_in", domain: ".veoaifree.com" }],
    "Log in to VeoAI Free at veoaifree.com. The WordPress session cookie will be extracted.",
    {
      cookieDomain: ".veoaifree.com",
      pollingConfig: QUICK_POLLING,
    }
  ),

  // ── Missing Provider: ChatGLM (Zhipu) ──────────────────────
  config(
    "chatglm-web",
    "ChatGLM (Zhipu AI)",
    "https://chatglm.cn/",
    "https://chatglm.cn",
    [
      { type: "cookie", name: "chatglm_session", domain: ".chatglm.cn" },
      { type: "localStorage", key: "token" },
    ],
    "Log in to ChatGLM at chatglm.cn with your phone number. The session token will be extracted.",
    { cookieDomain: ".chatglm.cn" }
  ),

  // ── Missing Provider: Xiaomi MiMo ──────────────────────────
  config(
    "xiaomimimo-web",
    "Xiaomi MiMo AI Studio",
    "https://aistudio.xiaomimimo.com/login",
    "https://aistudio.xiaomimimo.com",
    [
      { type: "cookie", name: "session", domain: ".xiaomimimo.com" },
      { type: "localStorage", key: "access_token" },
    ],
    "Log in to Xiaomi MiMo AI Studio at aistudio.xiaomimimo.com. The session token will be extracted.",
    { cookieDomain: ".xiaomimimo.com" }
  ),

  // ── Missing Provider: Manus ────────────────────────────────
  config(
    "manus-web",
    "Manus AI",
    "https://manus.im/login",
    "https://manus.im",
    [
      { type: "cookie", name: "manus_session", domain: ".manus.im" },
      { type: "localStorage", key: "auth_token" },
    ],
    "Log in to Manus at manus.im. The session cookie will be extracted.",
    { cookieDomain: ".manus.im" }
  ),

  // ── Z.ai Web (#4056) ────────────────────────────────────────
  config(
    "zai-web",
    "Z.ai Web (Free)",
    "https://chat.z.ai/",
    "https://chat.z.ai",
    [{ type: "cookie", name: "token", domain: ".z.ai" }],
    "Log in to Z.ai at chat.z.ai. The session token will be extracted.",
    { cookieDomain: ".z.ai" }
  ),
];

// ─── Registry ───────────────────────────────────────────────────────────────

const CONFIG_MAP = new Map<string, TokenExtractionConfig>();

for (const cfg of RAW_CONFIGS) {
  CONFIG_MAP.set(cfg.providerId, cfg);
}

/** Get extraction config for a specific provider */
export function getExtractionConfig(providerId: string): TokenExtractionConfig | undefined {
  return CONFIG_MAP.get(providerId);
}

/** List all registered extraction configs */
export function listExtractionConfigs(): TokenExtractionConfig[] {
  return [...RAW_CONFIGS];
}

/** The shared config map — used by LoginManager and InAppLoginService */
export const TOKEN_EXTRACTION_CONFIGS = CONFIG_MAP;
