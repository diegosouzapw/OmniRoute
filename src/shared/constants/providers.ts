/**
 * Service kind — declarative tag for what a provider can do beyond basic LLM chat.
 * Affects UI filtering and playground routing; does not influence request routing.
 */
export type ServiceKind =
  | "llm"
  | "embedding"
  | "image"
  | "imageToText"
  | "tts"
  | "stt"
  | "webSearch"
  | "webFetch"
  | "video"
  | "music";

export type RiskNoticeVariant = "oauth" | "webCookie" | "deprecated" | "embedded-service";

export interface ProviderRiskNoticeFields {
  subscriptionRisk?: boolean;
  riskNoticeVariant?: RiskNoticeVariant;
  isEmbeddedService?: boolean;
}

export const FREE_PROVIDERS = {};

// No-auth Providers
export const NOAUTH_PROVIDERS = {
  opencode: {
    id: "opencode",
    alias: "oc",
    name: "OpenCode Free",
    icon: "terminal",
    color: "#E87040",
    textIcon: "OC",
    website: "https://opencode.ai",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    authHint: "No API key required — uses OpenCode's public free endpoint.",
    freeNote:
      "No API key required — public OpenCode endpoint with Kimi, GLM, Qwen, MiMo, MiniMax models.",
    notice: {
      text: "OpenCode Free uses the public OpenCode endpoint (https://opencode.ai/zen/v1). No signup or API key needed. Rate limits apply.",
    },
  },
  "duckduckgo-web": {
    id: "duckduckgo-web",
    alias: "ddgw",
    name: "DuckDuckGo AI Chat",
    icon: "auto_awesome",
    color: "#DE5833",
    textIcon: "DDG",
    website: "https://duckduckgo.com/duckchat",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote: "Free — anonymous access to multiple AI models via DuckDuckGo.",
    authHint: "No credentials required — DuckDuckGo AI Chat is anonymous and free.",
  },
  theoldllm: {
    id: "theoldllm",
    alias: "tllm",
    name: "The Old LLM (Free)",
    icon: "auto_awesome",
    color: "#8B5CF6",
    textIcon: "TL",
    website: "https://theoldllm.vercel.app",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote:
      "Free — GPT-5.4, Claude 4.6 Opus/Sonnet/Haiku, + more. No API key — tokens auto-generated via browser.",
    authHint:
      "No credentials required. The executor auto-generates access tokens via an embedded Playwright browser instance.",
  },
  chipotle: {
    id: "chipotle",
    alias: "pepper",
    name: "Chipotle Pepper AI (Free)",
    icon: "restaurant",
    color: "#C41230",
    textIcon: "🌯",
    website: "https://amelia.chipotle.com",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote:
      "Free — Chipotle's Pepper AI (IPsoft Amelia). Anonymous sessions, no API key. Rate-limited.",
    authHint:
      "No credentials required. Uses Chipotle's public support chatbot via reverse-engineered SockJS/STOMP protocol.",
  },
  "veoaifree-web": {
    id: "veoaifree-web",
    alias: "veo-free",
    name: "Veo AI Free",
    icon: "videocam",
    color: "#8B5CF6",
    textIcon: "VF",
    website: "https://veoaifree.com",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["video"],
    freeNote: "Free video generation — VEO 3.1, Seedance. 6 requests/hour.",
    authHint: "No auth required. Rate limited to 6 requests/hour per IP.",
  },
  mimocode: {
    id: "mimocode",
    alias: "mcode",
    name: "MiMoCode (Free)",
    icon: "devices",
    color: "#FF6B35",
    textIcon: "MC",
    website: "https://mimo.mi.com",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote:
      "Free — Xiaomi MiMo models via bootstrap JWT auth. No API key required. Supports streaming.",
    authHint:
      "No API key required. The executor auto-generates JWT tokens via device fingerprint bootstrap.",
    notice: {
      text: "MiMoCode uses Xiaomi's public free AI endpoint with bootstrap-based JWT authentication. No signup needed. Rate limits apply.",
    },
  },
};

export const FREE_APIKEY_PROVIDER_IDS = new Set([
  "qoder",
  "mimocode",
  "opencode",
  // codebuddy-cn is OAuth-primary but the Tencent gateway also accepts a direct
  // API key (Authorization: Bearer). Admit it through the same managed-provider
  // gate so POST /api/providers accepts the dual-auth shape.
  "codebuddy-cn",
]);

export function supportsApiKeyOnFreeProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && FREE_APIKEY_PROVIDER_IDS.has(providerId);
}

// OAuth Providers
export const OAUTH_PROVIDERS = {
  qoder: {
    id: "qoder",
    alias: "if",
    name: "Qoder AI",
    icon: "water_drop",
    color: "#6366F1",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    hasFree: true,
  },
  qwen: {
    id: "qwen",
    alias: "qw",
    name: "Qwen Code",
    icon: "psychology",
    color: "#10B981",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    deprecated: true,
    deprecationReason:
      "Qwen OAuth free tier was discontinued on 2026-04-15. Use 'bailian-coding-plan', 'alibaba', 'alibaba-cn', or 'openrouter' provider with API key instead.",
  },
  "gemini-cli": {
    id: "gemini-cli",
    alias: "gemini-cli",
    name: "Gemini CLI",
    icon: "terminal",
    color: "#4285F4",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    hasFree: true,
    authHint:
      "Uses Gemini CLI OAuth / Cloud Code credentials. Pro models require an eligible Google account or paid plan.",
  },
  agy: {
    id: "agy",
    alias: "agy",
    name: "Antigravity CLI",
    icon: "terminal",
    color: "#F59E0B",
    textIcon: "AGY",
    website: "https://antigravity.google",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    hasFree: true,
    authHint:
      "Import your Antigravity CLI (`agy`) login (paste/upload its token file), auto-detect a local CLI login, or sign in with Google. Shares the Antigravity backend (incl. Claude models).",
  },
  kiro: {
    id: "kiro",
    alias: "kr",
    name: "Kiro AI",
    icon: "psychology_alt",
    color: "#FF6B35",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    hasFree: true,
    freeNote:
      "Free tier: 50 credits/month (~25K–100K tokens). ⚠️ Kiro ToS prohibits third-party proxy/harness use.",
  },
  "amazon-q": {
    id: "amazon-q",
    alias: "aq",
    name: "Amazon Q",
    icon: "cloud",
    color: "#FF9900",
    textIcon: "AQ",
    website: "https://aws.amazon.com/q/developer/",
    hasFree: true,
    authHint:
      "Uses the same AWS Builder ID or imported refresh-token flow as Kiro, but keeps Amazon Q connections separate.",
  },
  claude: {
    id: "claude",
    alias: "cc",
    name: "Claude Code",
    icon: "smart_toy",
    color: "#D97757",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  antigravity: {
    id: "antigravity",
    alias: undefined,
    name: "Antigravity",
    icon: "rocket_launch",
    color: "#F59E0B",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  codex: {
    id: "codex",
    alias: "cx",
    name: "OpenAI Codex",
    icon: "code",
    color: "#3B82F6",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  github: { id: "github", alias: "gh", name: "GitHub Copilot", icon: "code", color: "#333333" },
  "gitlab-duo": {
    id: "gitlab-duo",
    alias: "gitlab-duo",
    name: "GitLab Duo",
    icon: "hub",
    color: "#FC6D26",
    textIcon: "GL",
    website: "https://docs.gitlab.com/user/duo_agent_platform/code_suggestions/",
    authHint:
      "OAuth application with ai_features + read_user scopes. Configure GITLAB_DUO_OAUTH_CLIENT_ID and optionally GITLAB_DUO_OAUTH_CLIENT_SECRET on this OmniRoute instance.",
  },
  cursor: {
    id: "cursor",
    alias: "cu",
    name: "Cursor IDE",
    icon: "edit_note",
    color: "#00D4AA",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  zed: {
    id: "zed",
    alias: "zd",
    name: "Zed IDE",
    icon: "code",
    color: "#084CCF",
    textIcon: "ZD",
    website: "https://zed.dev",
    authHint:
      "Zed stores LLM provider credentials (OpenAI, Anthropic, Google, Mistral, xAI) in the OS keychain. Use the Import button below to discover and import them automatically.",
  },
  trae: {
    id: "trae",
    alias: "tr",
    name: "Trae",
    icon: "edit_square",
    color: "#FF7849",
    textIcon: "TR",
    website: "https://trae.ai",
    authHint:
      "Trae is an AI-native IDE by ByteDance (SOLO remote agent). Authorize via trae.ai in the popup, or sign in at solo.trae.ai and paste the Cloud-IDE-JWT (sent as 'Authorization: Cloud-IDE-JWT <token>', ~14-day lifetime) as the access token; web_id/biz_user_id/user_unique_id/scope/tenant/region propagate via providerSpecificData. No headless refresh for pasted tokens — re-paste on expiry.",
  },
  "kimi-coding": {
    id: "kimi-coding",
    alias: "kmc",
    name: "Kimi Coding",
    icon: "psychology",
    color: "#1E40AF",
    textIcon: "KC",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  kilocode: {
    id: "kilocode",
    alias: "kc",
    name: "Kilo Code",
    icon: "code",
    color: "#FF6B35",
    textIcon: "KC",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  cline: {
    id: "cline",
    alias: "cl",
    name: "Cline",
    icon: "smart_toy",
    color: "#5B9BD5",
    textIcon: "CL",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
  },
  windsurf: {
    id: "windsurf",
    alias: "ws",
    name: "Windsurf (Devin CLI)",
    icon: "air",
    color: "#00C5A0",
    textIcon: "WS",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    authHint:
      'In the Windsurf / VS Code IDE, open the command palette and run `Windsurf: Provide Auth Token` (or click the Jupyter "Get Windsurf Authentication Token" button), then copy the shown token and paste it here. Note: opening windsurf.com/show-auth-token directly only renders a "Redirecting" page — the IDE must initiate the flow (it adds a `?state=...` param) for the token to appear.',
    website: "https://windsurf.com",
  },
  "devin-cli": {
    id: "devin-cli",
    alias: "dv",
    name: "Devin CLI (Official)",
    icon: "terminal",
    color: "#6366F1",
    textIcon: "DV",
    authHint:
      "Requires the Devin CLI binary. Run `devin auth login` to authenticate, or provide your WINDSURF_API_KEY. Install: https://cli.devin.ai",
    website: "https://cli.devin.ai",
  },
  "codebuddy-cn": {
    id: "codebuddy-cn",
    alias: "cbcn",
    name: "CodeBuddy CN",
    icon: "smart_toy",
    color: "#006EFF",
    textIcon: "CB",
    website: "https://copilot.tencent.com",
    subscriptionRisk: true,
    riskNoticeVariant: "oauth",
    authHint:
      "Tencent CodeBuddy CN (copilot.tencent.com). Sign in via the official CLI device-code flow, or paste a direct API key (sent as Authorization: Bearer). Catalog: GLM / Kimi / MiniMax / DeepSeek / Hunyuan.",
  },
};

// Web / Cookie Providers
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
    authHint: "Paste your abra_sess value or full cookie header from meta.ai",
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
      "Paste your hf-chat cookie value from huggingface.co/chat (DevTools → Application → Cookies → hf-chat). Optional — works without auth for basic use.",
    riskNoticeVariant: "webCookie",
  },
  phind: {
    id: "phind",
    alias: "ph",
    name: "Phind (Free)",
    icon: "auto_awesome",
    color: "#000000",
    textIcon: "PH",
    website: "https://www.phind.com",
    hasFree: false,
    freeNote: "Discontinued 2026 — phind.com shut down (2026-01); no free tier.",
    authHint:
      "Paste your session cookie from phind.com (DevTools → Application → Cookies). Optional — works with free tier.",
    subscriptionRisk: true,
    riskNoticeVariant: "deprecated",
    deprecated: true,
    deprecationReason:
      "Phind shut down its API (2026-01); the /api/chat endpoint no longer serves (sweep 2026-06-19).",
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
    website: "https://kimi.moonshot.cn",
    authHint: "Paste your session cookie from kimi.moonshot.cn (DevTools → Application → Cookies)",
    subscriptionRisk: true,
    riskNoticeVariant: "webCookie",
  },
  "doubao-web": {
    id: "doubao-web",
    alias: "db",
    name: "Doubao Web (ByteDance)",
    icon: "auto_awesome",
    color: "#3B82F6",
    textIcon: "DW",
    website: "https://www.doubao.com",
    authHint: "Paste your session cookie from doubao.com (DevTools → Application → Cookies)",
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
};

// API Key Providers
export { APIKEY_PROVIDERS } from "./providers/apiKeyProviders";

// Sub-categories within APIKEY_PROVIDERS (used by dashboard and catalog views).
export const IMAGE_ONLY_PROVIDER_IDS = new Set([
  "nanobanana",
  "fal-ai",
  "stability-ai",
  "black-forest-labs",
  "recraft",
  "topaz",
]);

export const AGGREGATOR_PROVIDER_IDS = new Set([
  "openrouter",
  "synthetic",
  "kilo-gateway",
  "aimlapi",
  "novita",
  "piapi",
  "getgoapi",
  "laozhang",
  "vercel-ai-gateway",
  "agentrouter",
  "glhf",
  "cablyai",
  "thebai",
  "fenayai",
  "empower",
  "poe",
  "chutes",
  "hackclub",
]);

export const ENTERPRISE_CLOUD_PROVIDER_IDS = new Set([
  "azure-openai",
  "azure-ai",
  "bedrock",
  "watsonx",
  "oci",
  "sap",
  "vertex",
  "vertex-partner",
  "databricks",
  "datarobot",
  "clarifai",
  "snowflake",
  "heroku",
  "modal",
]);

export const VIDEO_PROVIDER_IDS = new Set([
  "runwayml",
  "veoaifree-web",
  "pollinations",
  "minimax",
  "together",
  "replicate",
  "haiper",
  "leonardo",
]);

// IDE Providers: editors with built-in AI subscription (separate section in UI).
// These providers live in OAUTH_PROVIDERS but render under "IDE Providers"
// instead of "OAuth Providers" to avoid visual duplication.
export const IDE_PROVIDER_IDS = new Set(["cursor", "zed", "trae"]);

export const EMBEDDING_RERANK_PROVIDER_IDS = new Set(["voyage-ai", "jina-ai"]);

// Local / Self-Hosted Providers
export const LOCAL_PROVIDERS = {
  "lm-studio": {
    id: "lm-studio",
    alias: "lmstudio",
    name: "LM Studio",
    icon: "server",
    color: "#4A148C",
    textIcon: "LM",
    website: "https://lmstudio.ai",
    authHint:
      "API key optional. Configure the local LM Studio OpenAI-compatible base URL (default: http://localhost:1234/v1).",
    localDefault: "http://localhost:1234/v1",
    passthroughModels: true,
  },
  vllm: {
    id: "vllm",
    alias: "vllm",
    name: "vLLM",
    icon: "memory",
    color: "#0F766E",
    textIcon: "VL",
    website: "https://github.com/vllm-project/vllm",
    authHint:
      "API key optional. Configure the local vLLM OpenAI-compatible base URL (default: http://localhost:8000/v1).",
    localDefault: "http://localhost:8000/v1",
    passthroughModels: true,
  },
  lemonade: {
    id: "lemonade",
    alias: "lemonade",
    name: "Lemonade Server",
    icon: "bolt",
    color: "#F59E0B",
    textIcon: "LM",
    website: "https://lemonade-server.ai",
    authHint:
      "API key optional. Configure the local Lemonade OpenAI-compatible base URL (default: http://localhost:13305/api/v1).",
    localDefault: "http://localhost:13305/api/v1",
    passthroughModels: true,
  },
  llamafile: {
    id: "llamafile",
    alias: "llamafile",
    name: "Llamafile",
    icon: "article",
    color: "#EA580C",
    textIcon: "LF",
    website: "https://github.com/Mozilla-Ocho/llamafile",
    authHint:
      "API key optional. Configure the local Llamafile OpenAI-compatible base URL (default: http://127.0.0.1:8080/v1).",
    localDefault: "http://127.0.0.1:8080/v1",
    passthroughModels: true,
  },
  "llama-cpp": {
    id: "llama-cpp",
    alias: "llamacpp",
    name: "llama.cpp",
    icon: "memory",
    color: "#795548",
    textIcon: "LC",
    website: "https://github.com/ggml-org/llama.cpp",
    authHint:
      "API key optional (use any value, e.g. sk-no-key-required). Configure the llama-server OpenAI-compatible base URL (default: http://127.0.0.1:8080/v1). Note: if Llamafile is also installed, both default to port 8080 — run only one at a time or override the port.",
    localDefault: "http://127.0.0.1:8080/v1",
    passthroughModels: true,
  },
  triton: {
    id: "triton",
    alias: "triton",
    name: "NVIDIA Triton",
    icon: "developer_board",
    color: "#76B900",
    textIcon: "TR",
    website: "https://developer.nvidia.com/triton-inference-server",
    authHint:
      "API key optional. Configure the Triton OpenAI-compatible base URL (default: http://localhost:8000/v1).",
    localDefault: "http://localhost:8000/v1",
    passthroughModels: true,
  },
  "docker-model-runner": {
    id: "docker-model-runner",
    alias: "dmr",
    name: "Docker Model Runner",
    icon: "inventory_2",
    color: "#2496ED",
    textIcon: "DM",
    website: "https://docs.docker.com/ai/model-runner/",
    authHint:
      "API key optional. Configure the local Docker Model Runner OpenAI-compatible base URL (default: http://localhost:12434/v1).",
    localDefault: "http://localhost:12434/v1",
    passthroughModels: true,
  },
  xinference: {
    id: "xinference",
    alias: "xinference",
    name: "XInference",
    icon: "hub",
    color: "#DC2626",
    textIcon: "XI",
    website: "https://inference.readthedocs.io",
    authHint:
      "API key optional. Configure the local XInference OpenAI-compatible base URL (default: http://localhost:9997/v1).",
    localDefault: "http://localhost:9997/v1",
    passthroughModels: true,
  },
  oobabooga: {
    id: "oobabooga",
    alias: "ooba",
    name: "oobabooga",
    icon: "dns",
    color: "#8B5CF6",
    textIcon: "OO",
    website: "https://github.com/oobabooga/text-generation-webui",
    authHint:
      "API key optional. Configure the local oobabooga OpenAI-compatible base URL (default: http://localhost:5000/v1).",
    localDefault: "http://localhost:5000/v1",
    passthroughModels: true,
  },
  sdwebui: {
    id: "sdwebui",
    alias: "sdwebui",
    name: "SD WebUI",
    icon: "brush",
    color: "#FF7043",
    textIcon: "SD",
    website: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    hasFree: true,
    authHint:
      "No API key required. Configure the local WebUI base URL (default: http://localhost:7860).",
    localDefault: "http://localhost:7860",
  },
  comfyui: {
    id: "comfyui",
    alias: "comfyui",
    name: "ComfyUI",
    icon: "account_tree",
    color: "#4CAF50",
    textIcon: "CF",
    website: "https://github.com/comfyanonymous/ComfyUI",
    hasFree: true,
    authHint:
      "No API key required. Configure the local ComfyUI base URL (default: http://localhost:8188).",
    localDefault: "http://localhost:8188",
  },
};

// Search Providers
export const SEARCH_PROVIDERS = {
  "perplexity-search": {
    id: "perplexity-search",
    alias: "pplx-search",
    name: "Perplexity Search",
    icon: "search",
    color: "#20808D",
    textIcon: "PS",
    website: "https://docs.perplexity.ai/guides/search-quickstart",
    authHint: "Same API key as Perplexity (pplx-...)",
  },
  "serper-search": {
    id: "serper-search",
    alias: "serper-search",
    name: "Serper Search",
    icon: "search",
    color: "#4285F4",
    textIcon: "SP",
    website: "https://serper.dev",
    hasFree: true,
    authHint: "API key from serper.dev dashboard",
    serviceKinds: ["webSearch"],
  },
  "brave-search": {
    id: "brave-search",
    alias: "brave-search",
    name: "Brave Search",
    icon: "travel_explore",
    color: "#FB542B",
    textIcon: "BR",
    website: "https://brave.com/search/api",
    hasFree: true,
    authHint: "Subscription token from Brave Search API dashboard",
  },
  "exa-search": {
    id: "exa-search",
    alias: "exa-search",
    name: "Exa Search",
    icon: "neurology",
    color: "#1E40AF",
    textIcon: "EX",
    website: "https://exa.ai",
    hasFree: true,
    authHint: "API key from dashboard.exa.ai",
    serviceKinds: ["webSearch", "webFetch"],
  },
  "tavily-search": {
    id: "tavily-search",
    alias: "tavily-search",
    name: "Tavily Search",
    icon: "manage_search",
    color: "#5B4FDB",
    textIcon: "TV",
    website: "https://tavily.com",
    hasFree: true,
    authHint: "API key from app.tavily.com (format: tvly-...)",
    serviceKinds: ["webSearch", "webFetch"],
  },
  "google-pse-search": {
    id: "google-pse-search",
    alias: "google-pse",
    name: "Google Programmable Search",
    icon: "travel_explore",
    color: "#4285F4",
    textIcon: "GP",
    website: "https://developers.google.com/custom-search/v1/overview",
    authHint: "Requires a Google API key and your Programmable Search Engine ID (cx)",
  },
  "linkup-search": {
    id: "linkup-search",
    alias: "linkup",
    name: "Linkup Search",
    icon: "public",
    color: "#0F766E",
    textIcon: "LU",
    website: "https://docs.linkup.so",
    authHint: "Bearer API key from the Linkup dashboard",
  },
  "searchapi-search": {
    id: "searchapi-search",
    alias: "searchapi",
    name: "SearchAPI",
    icon: "manage_search",
    color: "#2563EB",
    textIcon: "SA",
    website: "https://www.searchapi.io/docs",
    authHint: "API key from SearchAPI (query param or Bearer auth)",
  },
  "youcom-search": {
    id: "youcom-search",
    alias: "youcom-search",
    name: "You.com Search",
    icon: "travel_explore",
    color: "#2563EB",
    textIcon: "YOU",
    website: "https://you.com/docs/search/overview",
    authHint: "X-API-Key from the You.com platform dashboard",
  },
  "searxng-search": {
    id: "searxng-search",
    alias: "searxng",
    name: "SearXNG Search",
    icon: "search",
    color: "#1A237E",
    textIcon: "SX",
    website: "https://docs.searxng.org",
    hasFree: true,
    authHint:
      "API key is optional. Set your SearXNG base URL. Some instances may require a bearer token for access.",
  },
  "ollama-search": {
    id: "ollama-search",
    alias: "ollama-search",
    name: "Ollama Search",
    icon: "search",
    color: "#58A6FF",
    textIcon: "OS",
    website: "https://ollama.com/settings/api-keys",
    authHint: "Same API key as Ollama Cloud (from ollama.com/settings/api-keys)",
  },
};

// Audio Only Providers
export const AUDIO_ONLY_PROVIDERS = {
  deepgram: {
    id: "deepgram",
    alias: "dg",
    name: "Deepgram",
    icon: "mic",
    color: "#13EF93",
    textIcon: "DG",
    website: "https://deepgram.com",
  },
  assemblyai: {
    id: "assemblyai",
    alias: "aai",
    name: "AssemblyAI",
    icon: "record_voice_over",
    color: "#0062FF",
    textIcon: "AA",
    website: "https://assemblyai.com",
  },
  elevenlabs: {
    id: "elevenlabs",
    alias: "el",
    name: "ElevenLabs",
    icon: "record_voice_over",
    color: "#6C47FF",
    textIcon: "EL",
    website: "https://elevenlabs.io",
  },
  cartesia: {
    id: "cartesia",
    alias: "cartesia",
    name: "Cartesia",
    icon: "spatial_audio",
    color: "#FF4F8B",
    textIcon: "CA",
    website: "https://cartesia.ai",
  },
  playht: {
    id: "playht",
    alias: "playht",
    name: "PlayHT",
    icon: "play_circle",
    color: "#00B4D8",
    textIcon: "PH",
    website: "https://play.ht",
  },
  inworld: {
    id: "inworld",
    alias: "inworld",
    name: "Inworld",
    icon: "voice_chat",
    color: "#7B2EF2",
    textIcon: "IW",
    website: "https://inworld.ai",
  },
  "aws-polly": {
    id: "aws-polly",
    alias: "polly",
    name: "AWS Polly",
    icon: "record_voice_over",
    color: "#FF9900",
    textIcon: "PL",
    website: "https://aws.amazon.com/polly/",
    authHint:
      "Use AWS Secret Access Key as API key; set providerSpecificData.accessKeyId and optional region.",
  },
};

export const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";
export const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";
export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";

export function isOpenAICompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(OPENAI_COMPATIBLE_PREFIX);
}

export function isAnthropicCompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
}

export const UPSTREAM_PROXY_PROVIDERS = {
  cliproxyapi: {
    id: "cliproxyapi",
    alias: "cpa",
    name: "CLIProxyAPI",
    icon: "proxy",
    color: "#6366F1",
    textIcon: "CPA",
    website: "https://github.com/router-for-me/CLIProxyAPI",
    defaultPort: 8317,
    healthEndpoint: "/v1/models",
    managementPrefix: "/v0/management",
    configDir: "~/.cli-proxy-api",
    binaryName: "cli-proxy-api",
    githubRepo: "router-for-me/CLIProxyAPI",
  },
  "9router": {
    id: "9router",
    alias: "nr",
    name: "9router",
    icon: "router",
    color: "#0EA5E9",
    textIcon: "9R",
    website: "https://www.npmjs.com/package/9router",
    defaultPort: 20130,
    healthEndpoint: "/api/health",
    npmPackage: "9router",
    embedded: true,
    isEmbeddedService: true,
    riskNoticeVariant: "embedded-service" as const,
  },
};

export const CLOUD_AGENT_PROVIDERS = {
  jules: {
    id: "jules",
    alias: "jules",
    name: "Google Jules",
    icon: "engineering",
    color: "#4285F4",
    textIcon: "JL",
    website: "https://jules.google",
    authHint: "Jules API key for creating and managing cloud coding tasks.",
  },
  devin: {
    id: "devin",
    alias: "devin",
    name: "Devin",
    icon: "smart_toy",
    color: "#111827",
    textIcon: "DV",
    website: "https://devin.ai",
    authHint: "Devin API key for cloud agent sessions.",
  },
  "codex-cloud": {
    id: "codex-cloud",
    alias: "codex-cloud",
    name: "Codex Cloud",
    icon: "cloud",
    color: "#10A37F",
    textIcon: "CC",
    website: "https://openai.com/codex",
    authHint: "OpenAI API key with Codex Cloud task access.",
  },
};

export function isClaudeCodeCompatibleProvider(providerId: unknown): providerId is string {
  return typeof providerId === "string" && providerId.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX);
}

export function isLocalProvider(providerId: unknown): boolean {
  return (
    typeof providerId === "string" &&
    Object.prototype.hasOwnProperty.call(LOCAL_PROVIDERS, providerId)
  );
}

export const SELF_HOSTED_CHAT_PROVIDER_IDS = new Set([
  "lm-studio",
  "vllm",
  "lemonade",
  "llamafile",
  "llama-cpp",
  "triton",
  "docker-model-runner",
  "xinference",
  "oobabooga",
]);

export function isSelfHostedChatProvider(providerId: unknown): boolean {
  return typeof providerId === "string" && SELF_HOSTED_CHAT_PROVIDER_IDS.has(providerId);
}

export function providerAllowsOptionalApiKey(providerId: unknown): boolean {
  return (
    // ponytail: any noAuth provider auto-qualifies — no per-provider maintenance
    (typeof providerId === "string" && providerId in NOAUTH_PROVIDERS) ||
    providerId === "searxng-search" ||
    providerId === "pollinations" ||
    providerId === "copilot-web" ||
    providerId === "hackclub" ||
    providerId === "huggingchat" ||
    providerId === "gitlawb" ||
    providerId === "gitlawb-gmi" ||
    isLocalProvider(providerId) ||
    isSelfHostedChatProvider(providerId) ||
    isOpenAICompatibleProvider(providerId) ||
    isAnthropicCompatibleProvider(providerId)
  );
}

/**
 * Providers explicitly excluded from bulk API key add — auth is heterogeneous,
 * OAuth-based, multi-field, or requires manual setup per connection.
 */
const BULK_API_KEY_EXCLUDED = new Set([
  "vertex",
  "vertex-partner",
  "ollama-local",
  "grok-web",
  "perplexity-web",
  "blackbox-web",
  "muse-spark-web",
  "deepseek-web",
  "inner-ai",
  "qoder",
  "google-pse-search",
  "command-code",
  "azure",
  "cloudflare-ai",
]);

export function supportsBulkApiKey(providerId: unknown): boolean {
  if (typeof providerId !== "string" || !providerId) return false;
  if (BULK_API_KEY_EXCLUDED.has(providerId)) return false;
  if (isLocalProvider(providerId)) return false;
  if (isSelfHostedChatProvider(providerId)) return false;
  if (isClaudeCodeCompatibleProvider(providerId)) return false;
  return true;
}

// ── System Providers (virtual, not user-connectable) ──────────────────────────
export const SYSTEM_PROVIDERS = {
  auto: {
    id: "auto",
    alias: "auto",
    name: "Auto (Zero-Config)",
    icon: "auto_awesome",
    color: "#6366F1",
    textIcon: "Auto",
    systemOnly: true,
    description: "Zero-config auto-routing with LKGP across all connected providers",
  },
};

const _PROVIDER_SECTIONS = [
  NOAUTH_PROVIDERS,
  OAUTH_PROVIDERS,
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
] as const;

let _aiProviders: Record<string, any> | null = null;

function getOrCreateAiProviders(): Record<string, any> {
  if (!_aiProviders) {
    _aiProviders = {};
    for (const section of _PROVIDER_SECTIONS) {
      Object.assign(_aiProviders, section);
    }
  }
  return _aiProviders;
}

let _ALIAS_TO_ID: Record<string, string> | null = null;

function getOrCreateAliasToId(): Record<string, string> {
  if (!_ALIAS_TO_ID) {
    _ALIAS_TO_ID = {};
    for (const section of _PROVIDER_SECTIONS) {
      for (const p of Object.values(section)) {
        if ((p as any).alias) _ALIAS_TO_ID[(p as any).alias] = (p as any).id;
      }
    }
  }
  return _ALIAS_TO_ID;
}

let _ID_TO_ALIAS: Record<string, string> | null = null;

function getOrCreateIdToAlias(): Record<string, string> {
  if (!_ID_TO_ALIAS) {
    _ID_TO_ALIAS = {};
    for (const section of _PROVIDER_SECTIONS) {
      for (const p of Object.values(section)) {
        _ID_TO_ALIAS[(p as any).id] = (p as any).alias || (p as any).id;
      }
    }
  }
  return _ID_TO_ALIAS;
}

export function getProviderById(id: string) {
  return (
    (NOAUTH_PROVIDERS as Record<string, any>)[id] ??
    (OAUTH_PROVIDERS as Record<string, any>)[id] ??
    (APIKEY_PROVIDERS as Record<string, any>)[id] ??
    (WEB_COOKIE_PROVIDERS as Record<string, any>)[id] ??
    (LOCAL_PROVIDERS as Record<string, any>)[id] ??
    (SEARCH_PROVIDERS as Record<string, any>)[id] ??
    (AUDIO_ONLY_PROVIDERS as Record<string, any>)[id] ??
    (UPSTREAM_PROXY_PROVIDERS as Record<string, any>)[id] ??
    (CLOUD_AGENT_PROVIDERS as Record<string, any>)[id] ??
    (SYSTEM_PROVIDERS as Record<string, any>)[id] ??
    undefined
  );
}

export const AI_PROVIDERS = new Proxy({} as Record<string, any>, {
  get(_, key) {
    if (key === "then") return undefined;
    return typeof key === "string" ? getOrCreateAiProviders()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateAiProviders());
  },
  has(_, key) {
    return key in getOrCreateAiProviders();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateAiProviders();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

export type AiProviderId =
  | keyof typeof NOAUTH_PROVIDERS
  | keyof typeof OAUTH_PROVIDERS
  | keyof typeof APIKEY_PROVIDERS
  | keyof typeof WEB_COOKIE_PROVIDERS
  | keyof typeof LOCAL_PROVIDERS
  | keyof typeof SEARCH_PROVIDERS
  | keyof typeof AUDIO_ONLY_PROVIDERS
  | keyof typeof UPSTREAM_PROXY_PROVIDERS
  | keyof typeof CLOUD_AGENT_PROVIDERS
  | keyof typeof SYSTEM_PROVIDERS;

export type AiProviderDefinition =
  | (typeof NOAUTH_PROVIDERS)[keyof typeof NOAUTH_PROVIDERS]
  | (typeof OAUTH_PROVIDERS)[keyof typeof OAUTH_PROVIDERS]
  | (typeof APIKEY_PROVIDERS)[keyof typeof APIKEY_PROVIDERS]
  | (typeof WEB_COOKIE_PROVIDERS)[keyof typeof WEB_COOKIE_PROVIDERS]
  | (typeof LOCAL_PROVIDERS)[keyof typeof LOCAL_PROVIDERS]
  | (typeof SEARCH_PROVIDERS)[keyof typeof SEARCH_PROVIDERS]
  | (typeof AUDIO_ONLY_PROVIDERS)[keyof typeof AUDIO_ONLY_PROVIDERS]
  | (typeof UPSTREAM_PROXY_PROVIDERS)[keyof typeof UPSTREAM_PROXY_PROVIDERS]
  | (typeof CLOUD_AGENT_PROVIDERS)[keyof typeof CLOUD_AGENT_PROVIDERS]
  | (typeof SYSTEM_PROVIDERS)[keyof typeof SYSTEM_PROVIDERS];

// Auth methods
export const AUTH_METHODS = {
  oauth: { id: "oauth", name: "OAuth", icon: "lock" },
  apikey: { id: "apikey", name: "API Key", icon: "key" },
};

export function getProviderByAlias(alias: string): AiProviderDefinition | null {
  for (const section of _PROVIDER_SECTIONS) {
    for (const provider of Object.values(section)) {
      if (provider.alias === alias || provider.id === alias) {
        return provider as AiProviderDefinition;
      }
    }
  }
  return null;
}

// Helper: Get provider ID from alias
export function resolveProviderId(aliasOrId: string): string {
  const provider = getProviderByAlias(aliasOrId);
  return provider?.id || aliasOrId;
}

export function getProviderAlias(providerId: string): string {
  const provider = getProviderById(providerId);
  return provider?.alias || providerId;
}

export const ALIAS_TO_ID = new Proxy({} as Record<string, string>, {
  get(_, key) {
    return typeof key === "string" ? getOrCreateAliasToId()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateAliasToId());
  },
  has(_, key) {
    return key in getOrCreateAliasToId();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateAliasToId();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

export const ID_TO_ALIAS = new Proxy({} as Record<string, string>, {
  get(_, key) {
    return typeof key === "string" ? getOrCreateIdToAlias()[key] : undefined;
  },
  ownKeys() {
    return Reflect.ownKeys(getOrCreateIdToAlias());
  },
  has(_, key) {
    return key in getOrCreateIdToAlias();
  },
  getOwnPropertyDescriptor(_, key) {
    const obj = getOrCreateIdToAlias();
    if (typeof key === "string" && key in obj) {
      return { configurable: true, enumerable: true, value: obj[key] };
    }
    return undefined;
  },
});

// Providers that support usage/quota API
export const USAGE_SUPPORTED_PROVIDERS = [
  "antigravity",
  "agy",
  "gemini-cli",
  "kiro",
  "amazon-q",
  "github",
  "codex",
  "claude",
  "cursor",
  "kimi-coding",
  "kimi-coding-apikey",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "nanogpt",
  "deepseek",
  "xiaomi-mimo",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
];

// ── Zod validation at module load (Phase 7.2) ──
import { validateProviders } from "../validation/providerSchema";

validateProviders(NOAUTH_PROVIDERS, "NOAUTH_PROVIDERS");
validateProviders(OAUTH_PROVIDERS, "OAUTH_PROVIDERS");
validateProviders(APIKEY_PROVIDERS, "APIKEY_PROVIDERS");
validateProviders(WEB_COOKIE_PROVIDERS, "WEB_COOKIE_PROVIDERS");
validateProviders(LOCAL_PROVIDERS, "LOCAL_PROVIDERS");
validateProviders(SEARCH_PROVIDERS, "SEARCH_PROVIDERS");
validateProviders(AUDIO_ONLY_PROVIDERS, "AUDIO_ONLY_PROVIDERS");
validateProviders(UPSTREAM_PROXY_PROVIDERS, "UPSTREAM_PROXY_PROVIDERS");
validateProviders(CLOUD_AGENT_PROVIDERS, "CLOUD_AGENT_PROVIDERS");
