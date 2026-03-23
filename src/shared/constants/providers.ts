// Provider definitions

// Free Providers
export const FREE_PROVIDERS = {
  iflow: { id: "iflow", alias: "if", name: "iFlow AI", icon: "water_drop", color: "#6366F1" },
  qwen: { id: "qwen", alias: "qw", name: "Qwen Code", icon: "psychology", color: "#10B981" },
  "gemini-cli": {
    id: "gemini-cli",
    alias: "gc",
    name: "Gemini CLI",
    icon: "terminal",
    color: "#4285F4",
    deprecated: true,
    deprecationReason:
      "Google restricts third-party OAuth usage for Gemini CLI (Mar 2026). Pro models require paid plans. Use 'gemini' (API key) provider instead.",
  },
  kiro: { id: "kiro", alias: "kr", name: "Kiro AI", icon: "psychology_alt", color: "#FF6B35" },
};

// OAuth Providers
export const OAUTH_PROVIDERS = {
  claude: { id: "claude", alias: "cc", name: "Claude Code", icon: "smart_toy", color: "#D97757" },
  antigravity: {
    id: "antigravity",
    alias: "ag",
    name: "Antigravity",
    icon: "rocket_launch",
    color: "#F59E0B",
  },
  codex: { id: "codex", alias: "cx", name: "OpenAI Codex", icon: "code", color: "#3B82F6" },
  github: { id: "github", alias: "gh", name: "GitHub Copilot", icon: "code", color: "#333333" },
  cursor: { id: "cursor", alias: "cu", name: "Cursor IDE", icon: "edit_note", color: "#00D4AA" },
  "kimi-coding": {
    id: "kimi-coding",
    alias: "kmc",
    name: "Kimi Coding",
    icon: "psychology",
    color: "#1E40AF",
    textIcon: "KC",
  },
  kilocode: {
    id: "kilocode",
    alias: "kc",
    name: "Kilo Code",
    icon: "code",
    color: "#FF6B35",
    textIcon: "KC",
  },
  cline: {
    id: "cline",
    alias: "cl",
    name: "Cline",
    icon: "smart_toy",
    color: "#5B9BD5",
    textIcon: "CL",
  },
};

// API Key Providers
export const APIKEY_PROVIDERS = {
  openrouter: {
    id: "openrouter",
    alias: "openrouter",
    name: "OpenRouter",
    icon: "router",
    color: "#F97316",
    textIcon: "OR",
    passthroughModels: true,
    website: "https://openrouter.ai",
  },
  glm: {
    id: "glm",
    alias: "glm",
    name: "GLM Coding",
    icon: "code",
    color: "#2563EB",
    textIcon: "GL",
    website: "https://open.bigmodel.cn",
  },
  "bailian-coding-plan": {
    id: "bailian-coding-plan",
    alias: "bcp",
    name: "Alibaba Coding Plan",
    icon: "code",
    color: "#FF6A00",
    textIcon: "BCP",
    website: "https://www.alibabacloud.com/help/en/model-studio/coding-plan",
  },
  kimi: {
    id: "kimi",
    alias: "kimi",
    name: "Kimi",
    icon: "psychology",
    color: "#1E3A8A",
    textIcon: "KM",
    website: "https://kimi.moonshot.cn",
  },
  "kimi-coding-apikey": {
    id: "kimi-coding-apikey",
    alias: "kmca",
    name: "Kimi Coding (API Key)",
    icon: "psychology",
    color: "#1E40AF",
    textIcon: "KC",
    website: "https://kimi.com",
  },
  minimax: {
    id: "minimax",
    alias: "minimax",
    name: "Minimax Coding",
    icon: "memory",
    color: "#7C3AED",
    textIcon: "MM",
    website: "https://www.minimaxi.com",
  },
  "minimax-cn": {
    id: "minimax-cn",
    alias: "minimax-cn",
    name: "Minimax (China)",
    icon: "memory",
    color: "#DC2626",
    textIcon: "MC",
    website: "https://www.minimaxi.com",
  },
  alicode: {
    id: "alicode",
    alias: "alicode",
    name: "Alibaba",
    icon: "cloud",
    color: "#FF6A00",
    textIcon: "ALi",
    website: "https://bailian.console.aliyun.com",
  },
  "alicode-intl": {
    id: "alicode-intl",
    alias: "alicode-intl",
    name: "Alibaba Intl",
    icon: "cloud",
    color: "#FF6A00",
    textIcon: "ALi",
    website: "https://modelstudio.console.alibabacloud.com",
  },
  openai: {
    id: "openai",
    alias: "openai",
    name: "OpenAI",
    icon: "auto_awesome",
    color: "#10A37F",
    textIcon: "OA",
    website: "https://platform.openai.com",
  },
  anthropic: {
    id: "anthropic",
    alias: "anthropic",
    name: "Anthropic",
    icon: "smart_toy",
    color: "#D97757",
    textIcon: "AN",
    website: "https://console.anthropic.com",
  },
  gemini: {
    id: "gemini",
    alias: "gemini",
    name: "Gemini (Google AI Studio)",
    icon: "diamond",
    color: "#4285F4",
    textIcon: "GE",
    website: "https://ai.google.dev",
    hasFree: true,
    freeNote:
      "Free forever: 1,500 req/day for Gemini 2.5 Flash — no credit card, get key at aistudio.google.com",
  },
  deepseek: {
    id: "deepseek",
    alias: "ds",
    name: "DeepSeek",
    icon: "bolt",
    color: "#4D6BFE",
    textIcon: "DS",
    website: "https://deepseek.com",
  },
  groq: {
    id: "groq",
    alias: "groq",
    name: "Groq",
    icon: "speed",
    color: "#F55036",
    textIcon: "GQ",
    website: "https://groq.com",
    hasFree: true,
    freeNote: "Free tier: 30 RPM / 14.4K RPD — no credit card",
  },
  blackbox: {
    id: "blackbox",
    alias: "bb",
    name: "Blackbox AI",
    icon: "view_in_ar",
    color: "#1A1A2E",
    textIcon: "BB",
    website: "https://blackbox.ai",
  },
  xai: {
    id: "xai",
    alias: "xai",
    name: "xAI (Grok)",
    icon: "auto_awesome",
    color: "#1DA1F2",
    textIcon: "XA",
    website: "https://x.ai",
  },
  mistral: {
    id: "mistral",
    alias: "mistral",
    name: "Mistral",
    icon: "air",
    color: "#FF7000",
    textIcon: "MI",
    website: "https://mistral.ai",
  },
  perplexity: {
    id: "perplexity",
    alias: "pplx",
    name: "Perplexity",
    icon: "search",
    color: "#20808D",
    textIcon: "PP",
    website: "https://www.perplexity.ai",
  },
  together: {
    id: "together",
    alias: "together",
    name: "Together AI",
    icon: "group_work",
    color: "#0F6FFF",
    textIcon: "TG",
    website: "https://www.together.ai",
    hasFree: true,
    freeNote:
      "$25 signup credits + 3 permanently free models: Llama 3.3 70B, Vision, DeepSeek-R1 distill",
  },
  fireworks: {
    id: "fireworks",
    alias: "fireworks",
    name: "Fireworks AI",
    icon: "local_fire_department",
    color: "#7B2EF2",
    textIcon: "FW",
    website: "https://fireworks.ai",
  },
  cerebras: {
    id: "cerebras",
    alias: "cerebras",
    name: "Cerebras",
    icon: "memory",
    color: "#FF4F00",
    textIcon: "CB",
    website: "https://inference.cerebras.ai",
    hasFree: true,
    freeNote: "Free: 1M tokens/day, 60K TPM — world's fastest inference",
  },
  cohere: {
    id: "cohere",
    alias: "cohere",
    name: "Cohere",
    icon: "hub",
    color: "#39594D",
    textIcon: "CO",
    website: "https://cohere.com",
  },
  nvidia: {
    id: "nvidia",
    alias: "nvidia",
    name: "NVIDIA NIM",
    icon: "developer_board",
    color: "#76B900",
    textIcon: "NV",
    website: "https://build.nvidia.com",
    hasFree: true,
    freeNote: "Free dev access: ~40 RPM, 70+ models (Kimi K2.5, GLM 4.7, DeepSeek V3.2...)",
  },
  nebius: {
    id: "nebius",
    alias: "nebius",
    name: "Nebius AI",
    icon: "cloud",
    color: "#6C5CE7",
    textIcon: "NB",
    website: "https://nebius.com",
  },
  siliconflow: {
    id: "siliconflow",
    alias: "siliconflow",
    name: "SiliconFlow",
    icon: "cloud_queue",
    color: "#5B6EF5",
    textIcon: "SF",
    website: "https://cloud.siliconflow.com",
  },
  hyperbolic: {
    id: "hyperbolic",
    alias: "hyp",
    name: "Hyperbolic",
    icon: "bolt",
    color: "#00D4FF",
    textIcon: "HY",
    website: "https://hyperbolic.xyz",
  },
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
  nanobanana: {
    id: "nanobanana",
    alias: "nb",
    name: "NanoBanana",
    icon: "image",
    color: "#FFD700",
    textIcon: "NB",
    website: "https://nanobananaapi.ai",
  },
  "ollama-cloud": {
    id: "ollama-cloud",
    alias: "ollamacloud",
    name: "Ollama Cloud",
    icon: "cloud",
    color: "#58A6FF",
    textIcon: "OC",
    website: "https://ollama.com/settings/api-keys",
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
  sdwebui: {
    id: "sdwebui",
    alias: "sdwebui",
    name: "SD WebUI",
    icon: "brush",
    color: "#FF7043",
    textIcon: "SD",
    website: "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
  },
  comfyui: {
    id: "comfyui",
    alias: "comfyui",
    name: "ComfyUI",
    icon: "account_tree",
    color: "#4CAF50",
    textIcon: "CF",
    website: "https://github.com/comfyanonymous/ComfyUI",
  },
  huggingface: {
    id: "huggingface",
    alias: "hf",
    name: "HuggingFace",
    icon: "face",
    color: "#FFD21E",
    textIcon: "HF",
    website: "https://huggingface.co",
    hasFree: true,
    freeNote: "Free Inference API for thousands of models (Whisper, VITS, SDXL…)",
  },
  synthetic: {
    id: "synthetic",
    alias: "synthetic",
    name: "Synthetic",
    icon: "verified_user",
    color: "#6366F1",
    textIcon: "SY",
    website: "https://synthetic.new",
    passthroughModels: true,
  },
  "kilo-gateway": {
    id: "kilo-gateway",
    alias: "kg",
    name: "Kilo Gateway",
    icon: "hub",
    color: "#617A91",
    textIcon: "KG",
    website: "https://kilo.ai",
    passthroughModels: true,
  },
  vertex: {
    id: "vertex",
    alias: "vertex",
    name: "Vertex AI",
    icon: "cloud",
    color: "#4285F4",
    textIcon: "VA",
    website: "https://cloud.google.com/vertex-ai",
    authHint: "Provide Service Account JSON or OAuth access_token",
  },
  zai: {
    id: "zai",
    alias: "zai",
    name: "Z.AI (GLM-5)",
    icon: "psychology",
    color: "#2563EB",
    textIcon: "ZA",
    website: "https://open.bigmodel.cn",
    apiHint: "API key from https://open.bigmodel.cn/usercenter/apikeys",
  },
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
    authHint: "API key from serper.dev dashboard",
  },
  "brave-search": {
    id: "brave-search",
    alias: "brave-search",
    name: "Brave Search",
    icon: "travel_explore",
    color: "#FB542B",
    textIcon: "BR",
    website: "https://brave.com/search/api",
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
    authHint: "API key from dashboard.exa.ai",
  },
  "tavily-search": {
    id: "tavily-search",
    alias: "tavily-search",
    name: "Tavily Search",
    icon: "manage_search",
    color: "#5B4FDB",
    textIcon: "TV",
    website: "https://tavily.com",
    authHint: "API key from app.tavily.com (format: tvly-...)",
  },
  "opencode-zen": {
    id: "opencode-zen",
    alias: "opencode-zen",
    name: "OpenCode Zen",
    icon: "opencode",
    color: "#6366f1",
    website: "https://opencode.ai/zen",
  },
  "opencode-go": {
    id: "opencode-go",
    alias: "opencode-go",
    name: "OpenCode Go",
    icon: "opencode",
    color: "#6366f1",
    website: "https://opencode.ai/zen/go",
  },
  alibaba: {
    id: "alibaba",
    alias: "ali",
    name: "Alibaba Cloud (DashScope)",
    icon: "cloud_queue",
    color: "#FF6600",
    textIcon: "AL",
    website: "https://dashscope-intl.aliyuncs.com",
    hasFree: false,
  },
  longcat: {
    id: "longcat",
    alias: "lc",
    name: "LongCat AI",
    icon: "auto_awesome",
    color: "#FF6B9D",
    textIcon: "LC",
    website: "https://longcat.chat",
    hasFree: true,
    freeNote:
      "50M tokens/day (Flash-Lite) + 500K/day (Chat/Thinking) — 100% free while public beta",
  },
  pollinations: {
    id: "pollinations",
    alias: "pol",
    name: "Pollinations AI",
    icon: "local_florist",
    color: "#4CAF50",
    textIcon: "PO",
    website: "https://pollinations.ai",
    hasFree: true,
    freeNote:
      "No API key needed — access GPT-5, Claude, Gemini, DeepSeek V3, Llama 4 free (1 req/15s)",
  },
  "cloudflare-ai": {
    id: "cloudflare-ai",
    alias: "cf",
    name: "Cloudflare Workers AI",
    icon: "cloud",
    color: "#F48120",
    textIcon: "CF",
    website: "https://developers.cloudflare.com/workers-ai/",
    hasFree: true,
    freeNote:
      "Free 10K Neurons/day: ~150 LLM responses or 500s Whisper audio — edge inference globally",
    authHint: "Requires API Token AND Account ID (found at dash.cloudflare.com)",
  },
  scaleway: {
    id: "scaleway",
    alias: "scw",
    name: "Scaleway AI",
    icon: "cloud",
    color: "#4F0599",
    textIcon: "SCW",
    website: "https://www.scaleway.com/en/ai/generative-apis/",
    hasFree: true,
    freeNote: "1M free tokens for new accounts — EU/GDPR compliant (Paris), Qwen3 235B & Llama 70B",
  },
  aimlapi: {
    id: "aimlapi",
    alias: "aiml",
    name: "AI/ML API",
    icon: "hub",
    color: "#6366F1",
    textIcon: "AI",
    website: "https://aimlapi.com",
    hasFree: true,
    freeNote:
      "$0.025/day free credits — 200+ models (GPT-4o, Claude, Gemini, Llama) via single endpoint",
    passthroughModels: true,
  },
};

export const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";
export const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";

export function isOpenAICompatibleProvider(providerId) {
  return typeof providerId === "string" && providerId.startsWith(OPENAI_COMPATIBLE_PREFIX);
}

export function isAnthropicCompatibleProvider(providerId) {
  return typeof providerId === "string" && providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
}

// All providers (combined)
export const AI_PROVIDERS = { ...FREE_PROVIDERS, ...OAUTH_PROVIDERS, ...APIKEY_PROVIDERS };

// Auth methods
export const AUTH_METHODS = {
  oauth: { id: "oauth", name: "OAuth", icon: "lock" },
  apikey: { id: "apikey", name: "API Key", icon: "key" },
};

// Helper: Get provider by alias
export function getProviderByAlias(alias) {
  for (const provider of Object.values(AI_PROVIDERS)) {
    if (provider.alias === alias || provider.id === alias) {
      return provider;
    }
  }
  return null;
}

// Helper: Get provider ID from alias
export function resolveProviderId(aliasOrId) {
  const provider = getProviderByAlias(aliasOrId);
  return provider?.id || aliasOrId;
}

// Helper: Get alias from provider ID
export function getProviderAlias(providerId) {
  const provider = AI_PROVIDERS[providerId];
  return provider?.alias || providerId;
}

// Alias to ID mapping (for quick lookup)
export const ALIAS_TO_ID = Object.values(AI_PROVIDERS).reduce((acc, p) => {
  acc[p.alias] = p.id;
  return acc;
}, {});

// ID to Alias mapping
export const ID_TO_ALIAS = Object.values(AI_PROVIDERS).reduce((acc, p) => {
  acc[p.id] = p.alias;
  return acc;
}, {});

// Providers that support usage/quota API
export const USAGE_SUPPORTED_PROVIDERS = [
  "antigravity",
  "kiro",
  "github",
  "codex",
  "claude",
  "kimi-coding",
];

// ── Zod validation at module load (Phase 7.2) ──
import { validateProviders } from "../validation/providerSchema";

validateProviders(FREE_PROVIDERS, "FREE_PROVIDERS");
validateProviders(OAUTH_PROVIDERS, "OAUTH_PROVIDERS");
validateProviders(APIKEY_PROVIDERS, "APIKEY_PROVIDERS");
