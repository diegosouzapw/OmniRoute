/**
 * Provider catalog data — extracted from providers.ts (god-file decomposition).
 * Pure data literal; re-exported by the providers.ts barrel. No behavior change.
 */
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
    // #7286: tools[] is prompt-emulated via webTools.ts (parseToolCallsFromText).
    toolCalling: "emulated",
  },
  "felo-web": {
    id: "felo-web",
    alias: "felo",
    name: "Felo",
    icon: "travel_explore",
    color: "#5B7FFF",
    textIcon: "FL",
    website: "https://felo.ai",
    noAuth: true,
    hasFree: true,
    serviceKinds: ["llm"],
    freeNote: "Free — anonymous access to Felo's chat/search-agent aggregator. No API key.",
    authHint: "No credentials required — Felo is a free, no-signup chat/search aggregator.",
    notice: {
      text: "Felo uses a reverse-engineered public endpoint (no official API). No signup or API key needed. Behavior may change without notice if Felo updates its frontend.",
    },
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
};

// Provider-level proxy controls are exposed only for transports whose complete
// upstream path runs through OmniRoute's proxy-aware global fetch. Providers
// with browser, WebSocket, direct dispatcher, media, or local CLI paths stay
// hidden until those paths can guarantee the configured provider proxy.
export const NOAUTH_PROVIDER_PROXY_SUPPORTED = new Set(["opencode", "theoldllm"]);

export function supportsNoAuthProviderProxy(providerId: string): boolean {
  return NOAUTH_PROVIDER_PROXY_SUPPORTED.has(providerId);
}
