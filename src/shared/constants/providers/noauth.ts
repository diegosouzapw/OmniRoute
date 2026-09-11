/**
 * Provider catalog data — extracted from providers.ts (god-file decomposition).
 * Pure data literal; re-exported by the providers.ts barrel. No behavior change.
 */
export const NOAUTH_PROVIDERS = {
  "devin-cli-agentic": {
    id: "devin-cli-agentic",
    alias: "dva",
    name: "Devin CLI Agentic Bridge",
    icon: "terminal",
    color: "#635BFF",
    textIcon: "DV",
    website: "https://docs.devin.ai/work-with-devin/devin-cli",
    noAuth: true,
    hasFree: false,
    serviceKinds: ["llm"],
    isLocalCli: true,
    toolCalling: "emulated",
    authHint: "Authentication is owned by the official Devin CLI in its isolated bridge volume.",
    notice: {
      text: "This provider accepts only the official Devin CLI over local ACP stdio and never falls back to another provider.",
    },
  },
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
    // #7286: tools[] is prompt-emulated via webTools.ts (parseToolCallsFromText).
    toolCalling: "emulated",
  },
  "cloudflare-playground": {
    id: "cloudflare-playground",
    alias: "cfp",
    name: "Cloudflare AI Playground",
    icon: "cloud",
    color: "#F38020",
    textIcon: "CF",
    website: "https://playground.ai.cloudflare.com",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote:
      "Free — Cloudflare's AI Playground: GLM 5.2, Kimi K2.7 Code, DeepSeek V4 Pro, gpt-oss-120B and 16 more. No account, no API key.",
    authHint:
      "No credentials required — anonymous browser sessions over a reverse-engineered cf_agent WebSocket protocol (Playwright transport).",
    notice: {
      text: "Cloudflare AI Playground uses a reverse-engineered anonymous WebSocket protocol (no official API). Requires Playwright with a Chromium browser on first request. Rate limits apply per IP (error 3021).",
    },
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
  auggie: {
    id: "auggie",
    alias: "aug",
    name: "Augment (Auggie CLI)",
    icon: "terminal",
    color: "#7C3AED",
    textIcon: "AU",
    website: "https://augmentcode.com",
    noAuth: true,
    hasFree: false,
    serviceKinds: ["llm"],
    isLocalCli: true,
    freeNote:
      "Local passthrough — runs the Augment CLI (`auggie`) on this machine. Auth is handled by `auggie login`, not OmniRoute.",
    authHint:
      "No API key stored by OmniRoute. Install the Auggie CLI and run `auggie login` on this machine, then OmniRoute spawns it locally for each request.",
    notice: {
      text: "Augment (Auggie CLI) requires the `auggie` binary installed and authenticated locally (`auggie login`). OmniRoute spawns it as a subprocess and never sees or stores your Augment credentials.",
    },
  },
  zcode: {
    id: "zcode",
    alias: "zc",
    name: "ZCode (GLM Coding Plan)",
    icon: "terminal",
    color: "#3B82F6",
    textIcon: "ZC",
    website: "https://zcode.z.ai",
    noAuth: true,
    hasFree: false,
    serviceKinds: ["llm"],
    isLocalCli: true,
    authHint:
      "No API key stored by OmniRoute. The local ZCode app-server uses the existing builtin:zai-coding-plan login.",
    notice: {
      text: "ZCode runs locally through its native app-server. OmniRoute never receives or stores the Z.ai credential.",
    },
  },
  "codex-app-server": {
    id: "codex-app-server",
    alias: "cxa",
    name: "OpenAI Codex (App-Server)",
    icon: "code",
    color: "#10A37F",
    textIcon: "CA",
    website: "https://developers.openai.com/codex/cli",
    noAuth: true,
    hasFree: false,
    serviceKinds: ["llm"],
    isLocalCli: true,
    // No subscriptionRisk / riskNoticeVariant: unlike the `codex` provider (which
    // replays your ChatGPT/OpenAI session token to the API), this transport drives
    // the Codex CLI's own `codex app-server` over JSON-RPC/WebSocket. The CLI owns
    // and self-refreshes its OAuth (~/.codex/auth.json) exactly like an interactive
    // `codex` session — OmniRoute never replays a token to the API — so the
    // "official session not authorized for proxy use" caveat does not apply.
    authHint:
      "No token stored by OmniRoute. The Codex CLI app-server manages its own ChatGPT sign-in (~/.codex/auth.json, auto-refreshed). Use \u201cSign in with ChatGPT\u201d if the CLI is not yet authenticated.",
    notice: {
      text: "OpenAI Codex (App-Server) drives the Codex CLI's local app-server (JSON-RPC over WebSocket). The CLI self-manages its OpenAI OAuth, so OmniRoute never sees or replays your token. Requires the codex CLI reachable at the configured app-server URL; sign in via the CLI or the dashboard \u201cSign in with ChatGPT\u201d action.",
    },
  },
  uncloseai: {
    id: "uncloseai",
    alias: "unc",
    name: "UncloseAI",
    icon: "auto_awesome",
    color: "#8B5CF6",
    textIcon: "UN",
    website: "https://uncloseai.com",
    noAuth: true,
    hasFree: true,
    passthroughModels: true,
    serviceKinds: ["llm"],
    authHint:
      "No auth required. API accepts any non-empty string as key for identification. If older built-in models return 404, use Available Models → Import from /models or Auto-Sync; verified live model: solidrust/Hermes-3-Llama-3.1-8B-AWQ.",
    freeNote: "Free forever — no signup, no credit card. OpenAI-compatible endpoints.",
    notice: {
      text: "UncloseAI needs no API key. API accepts any non-empty string as key for identification. If older built-in models return 404, use Available Models → Import from /models or Auto-Sync.",
    },
  },
  aihorde: {
    id: "aihorde",
    alias: "horde",
    name: "AI Horde",
    icon: "diversity_3",
    color: "#8B5CF6",
    textIcon: "AH",
    website: "https://aihorde.net",
    noAuth: true,
    hasFree: true,
    passthroughModels: true,
    serviceKinds: ["llm"],
    authHint:
      "No API key required — uses AI Horde's documented anonymous key. Adding a free aihorde.net key is optional and only buys higher queue priority (kudos).",
    freeNote:
      "Crowdsourced inference from volunteer GPUs. Throughput is a shared queue, not a quota: there is no RPM/RPD cap, but waits grow when the network is busy.",
    notice: {
      text: "AI Horde routes to volunteer-run workers, so chat and image jobs can take minutes and tool calling is unavailable. Chat models come from the live oai.aihorde.net catalog. Image models are listed only while Horde reports at least one worker. An optional aihorde.net API key raises queue priority (kudos).",
    },
  },
};

// Provider-level proxy controls are exposed only for transports whose complete
// upstream path runs through OmniRoute's proxy-aware global fetch. Providers
// with browser, WebSocket, direct dispatcher, media, or local CLI paths stay
// hidden until those paths can guarantee the configured provider proxy.
export const NOAUTH_PROVIDER_PROXY_SUPPORTED = new Set(["opencode"]);

export function supportsNoAuthProviderProxy(providerId: string): boolean {
  return NOAUTH_PROVIDER_PROXY_SUPPORTED.has(providerId);
}
