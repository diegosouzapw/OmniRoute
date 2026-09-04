/**
 * ChatPlayground Models Service
 *
 * Provides dynamic model discovery from app.chatplayground.ai/api/models,
 * fallback catalog definitions, endpoint routing, and model ID resolution.
 */

export type ChatPlaygroundEndpoint = "azure" | "lmsys" | "perplexity";

export interface ChatPlaygroundModel {
  id: string;
  name: string;
  modelName: string;
  endpoint: ChatPlaygroundEndpoint;
  active: boolean;
  creditWeight: number;
  premiumOnly: boolean;
  contextLength?: number;
}

export const CHATPLAYGROUND_API_BASE = "https://app.chatplayground.ai/api";
export const CHATPLAYGROUND_MODELS_URL = `${CHATPLAYGROUND_API_BASE}/models`;
export const CHATPLAYGROUND_USER_URL = `${CHATPLAYGROUND_API_BASE}/user`;

export const CHATPLAYGROUND_DEFAULT_CONTEXT = 128_000;

export const CHATPLAYGROUND_FALLBACK_MODELS: ChatPlaygroundModel[] = [
  // Azure Endpoint Models
  {
    id: "gpt-5.6-sol",
    name: "GPT 5.6 Sol",
    modelName: "gpt-5.6-sol",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gpt-5.6-terra",
    name: "GPT 5.6 Terra",
    modelName: "gpt-5.6-terra",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gpt-5.6-luna",
    name: "GPT 5.6 Luna",
    modelName: "gpt-5.6-luna",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gpt-5.5",
    name: "GPT 5.5",
    modelName: "gpt-5.5",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gpt-5.5-pro",
    name: "GPT 5.5 Pro",
    modelName: "gpt-5.5-pro",
    endpoint: "azure",
    active: true,
    creditWeight: 2.0,
    premiumOnly: true,
    contextLength: 128_000,
  },
  {
    id: "gpt-4.5",
    name: "GPT 4.5",
    modelName: "gpt-4.5",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    modelName: "gpt-4o",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "claude-sonnet-5",
    name: "Claude Sonnet 5",
    modelName: "claude-sonnet-5",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 200_000,
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6",
    modelName: "claude-sonnet-4-6",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 200_000,
  },
  {
    id: "claude-opus-4-8",
    name: "Claude Opus 4.8",
    modelName: "claude-opus-4-8",
    endpoint: "azure",
    active: true,
    creditWeight: 2.0,
    premiumOnly: true,
    contextLength: 200_000,
  },
  {
    id: "claude-opus-4-6",
    name: "Claude Opus 4.6",
    modelName: "claude-opus-4-6",
    endpoint: "azure",
    active: true,
    creditWeight: 2.0,
    premiumOnly: true,
    contextLength: 200_000,
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    modelName: "claude-haiku-4-5",
    endpoint: "azure",
    active: true,
    creditWeight: 0.5,
    premiumOnly: false,
    contextLength: 200_000,
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    modelName: "deepseek-v4-pro",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    modelName: "deepseek-v4-flash",
    endpoint: "azure",
    active: true,
    creditWeight: 0.5,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "mistral-large-3",
    name: "Mistral Large 3",
    modelName: "mistral-large-3",
    endpoint: "azure",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash",
    modelName: "gemini-3-flash",
    endpoint: "azure",
    active: true,
    creditWeight: 0.5,
    premiumOnly: false,
    contextLength: 1_000_000,
  },
  {
    id: "gemini-3-pro",
    name: "Gemini 3 Pro",
    modelName: "gemini-3-pro",
    endpoint: "azure",
    active: true,
    creditWeight: 1.5,
    premiumOnly: true,
    contextLength: 1_000_000,
  },

  // LMSYS Endpoint Models
  {
    id: "kimi-k3",
    name: "Kimi K3",
    modelName: "kimi-k3",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "kimi-k2.6",
    name: "Kimi K2.6",
    modelName: "kimi-k2.6",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "llama-4-scout",
    name: "Llama 4 Scout",
    modelName: "llama-4-scout",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    modelName: "llama-3.3-70b",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "command-a",
    name: "Command A",
    modelName: "command-a",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "qwen3.8-max",
    name: "Qwen 3.8 Max",
    modelName: "qwen3.8-max",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "qwen3.7-plus",
    name: "Qwen 3.7 Plus",
    modelName: "qwen3.7-plus",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "grok-4.5",
    name: "Grok 4.5",
    modelName: "grok-4.5",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.5,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "grok-4",
    name: "Grok 4",
    modelName: "grok-4",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "minimax-m3",
    name: "MiniMax M3",
    modelName: "minimax-m3",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "glm-5",
    name: "GLM 5",
    modelName: "glm-5",
    endpoint: "lmsys",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },

  // Perplexity Endpoint Models
  {
    id: "perplexity-sonar-pro",
    name: "Sonar Pro",
    modelName: "sonar-pro",
    endpoint: "perplexity",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "sonar",
    name: "Sonar",
    modelName: "sonar",
    endpoint: "perplexity",
    active: true,
    creditWeight: 0.5,
    premiumOnly: false,
    contextLength: 128_000,
  },
  {
    id: "sonar-pro",
    name: "Sonar Pro",
    modelName: "sonar-pro",
    endpoint: "perplexity",
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: 128_000,
  },
];

// In-memory cache for dynamically fetched models
let cachedDynamicModels: ChatPlaygroundModel[] | null = null;
let dynamicModelsExpiresAt = 0;
const DYNAMIC_MODELS_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Strip client/routing prefixes like `chatplayground/`, `cpl/`, `cpl.`, `cp.` from model IDs.
 */
export function stripChatPlaygroundPrefix(model: string): string {
  let cleaned = (model || "").trim();
  let changed = true;

  while (changed) {
    changed = false;
    for (const prefix of ["chatplayground/", "cpl/", "cpl.", "cp.", "cpl:", "cp:"]) {
      if (cleaned.toLowerCase().startsWith(prefix)) {
        cleaned = cleaned.slice(prefix.length);
        changed = true;
      }
    }
  }

  return cleaned;
}

/**
 * Determine the upstream ChatPlayground endpoint for a model.
 */
export function resolveChatPlaygroundEndpoint(
  modelInfo:
    | {
        endpoint?: string;
        provider?: string;
        botId?: string;
        modelName?: string;
      }
    | string
): ChatPlaygroundEndpoint {
  let endpoint = "";
  let provider = "";
  let botId = "";

  if (typeof modelInfo === "object" && modelInfo !== null) {
    endpoint = (modelInfo.endpoint || "").toLowerCase().trim();
    provider = (modelInfo.provider || "").toLowerCase().trim();
    botId = (modelInfo.botId || modelInfo.modelName || "").toLowerCase().trim();
  } else if (typeof modelInfo === "string") {
    botId = modelInfo.toLowerCase().trim();
  }

  if (endpoint === "azure" || endpoint === "lmsys" || endpoint === "perplexity") {
    return endpoint;
  }

  if (provider === "perplexity" || botId.includes("sonar") || botId.includes("perplexity")) {
    return "perplexity";
  }

  const lmsysProviders = [
    "lmsys",
    "together",
    "anyscale",
    "groq",
    "meta",
    "mistral",
    "qwen",
    "deepseek",
  ];
  if (lmsysProviders.some((p) => provider.includes(p))) {
    return "lmsys";
  }

  const lmsysKeywords = ["llama", "qwen", "grok", "glm", "minimax", "command", "kimi"];
  if (lmsysKeywords.some((k) => botId.includes(k))) {
    return "lmsys";
  }

  return "azure";
}

/**
 * Fetch dynamic models from app.chatplayground.ai/api/models.
 * Returns cached list if valid, or falls back to static catalog on failure.
 */
export async function fetchChatPlaygroundModels(
  authHeaders?: Record<string, string>,
  timeoutMs = 15_000
): Promise<ChatPlaygroundModel[]> {
  const now = Date.now();
  if (cachedDynamicModels && now < dynamicModelsExpiresAt) {
    return cachedDynamicModels;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(CHATPLAYGROUND_MODELS_URL, {
      method: "GET",
      headers: authHeaders || {
        accept: "*/*",
        origin: "https://web.chatplayground.ai",
        referer: "https://web.chatplayground.ai/",
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      return cachedDynamicModels || CHATPLAYGROUND_FALLBACK_MODELS;
    }

    const rawList = (await res.json()) as Array<Record<string, unknown>>;
    if (!Array.isArray(rawList)) {
      return cachedDynamicModels || CHATPLAYGROUND_FALLBACK_MODELS;
    }

    const discovered: ChatPlaygroundModel[] = [];
    const seen = new Set<string>();

    for (const item of rawList) {
      const botId = typeof item.botId === "string" ? item.botId.trim() : "";
      if (!botId || seen.has(botId)) continue;

      // Only chat models
      if (item.group && item.group !== "chat") continue;

      seen.add(botId);
      const modelName = (typeof item.modelName === "string" && item.modelName.trim()) || botId;
      const displayName =
        (typeof item.displayName === "string" && item.displayName.trim()) || modelName;
      const endpoint = resolveChatPlaygroundEndpoint({
        endpoint: typeof item.endpoint === "string" ? item.endpoint : undefined,
        provider: typeof item.provider === "string" ? item.provider : undefined,
        botId,
      });

      let creditWeight = 1.0;
      if (typeof item.creditWeight === "number") {
        creditWeight = item.creditWeight;
      } else if (typeof item.creditWeight === "string") {
        const parsed = parseFloat(item.creditWeight);
        if (!isNaN(parsed)) creditWeight = parsed;
      }

      discovered.push({
        id: botId,
        name: displayName,
        modelName,
        endpoint,
        active: Boolean(item.active ?? true),
        creditWeight,
        premiumOnly: Boolean(item.premiumOnly),
        contextLength: CHATPLAYGROUND_DEFAULT_CONTEXT,
      });
    }

    if (discovered.length > 0) {
      cachedDynamicModels = discovered;
      dynamicModelsExpiresAt = now + DYNAMIC_MODELS_TTL_MS;
      return discovered;
    }
  } catch {
    // Return cached or fallback catalog on fetch error
  } finally {
    clearTimeout(timeoutId);
  }

  return cachedDynamicModels || CHATPLAYGROUND_FALLBACK_MODELS;
}

/**
 * Resolve client model string to a ChatPlayground model definition.
 */
export function resolveChatPlaygroundModel(
  requestedModel: string,
  catalog: ChatPlaygroundModel[] = cachedDynamicModels || CHATPLAYGROUND_FALLBACK_MODELS
): ChatPlaygroundModel | null {
  const stripped = stripChatPlaygroundPrefix(requestedModel).toLowerCase();
  if (!stripped) return null;

  // 1. Direct ID match
  const byId = catalog.find((m) => m.id.toLowerCase() === stripped);
  if (byId) return byId;

  // 2. Direct modelName match
  const byModelName = catalog.find((m) => m.modelName.toLowerCase() === stripped);
  if (byModelName) return byModelName;

  // 3. Direct displayName match
  const byName = catalog.find((m) => m.name.toLowerCase() === stripped);
  if (byName) return byName;

  // 4. Suffix match (e.g. "openai/gpt-4o" -> "gpt-4o")
  if (stripped.includes("/")) {
    const afterSlash = stripped.split("/").pop()!;
    const match = resolveChatPlaygroundModel(afterSlash, catalog);
    if (match) return match;
  }

  // 5. Dynamic fallback model synthesis if not found in catalog
  const inferredEndpoint = resolveChatPlaygroundEndpoint(stripped);
  return {
    id: stripped,
    name: stripped,
    modelName: inferredEndpoint === "perplexity" && stripped.startsWith("perplexity-")
      ? stripped.replace(/^perplexity-/, "")
      : stripped,
    endpoint: inferredEndpoint,
    active: true,
    creditWeight: 1.0,
    premiumOnly: false,
    contextLength: CHATPLAYGROUND_DEFAULT_CONTEXT,
  };
}

/** Clear dynamic models cache (useful in tests). */
export function clearChatPlaygroundModelsCache(): void {
  cachedDynamicModels = null;
  dynamicModelsExpiresAt = 0;
}
