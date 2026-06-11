




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
};

