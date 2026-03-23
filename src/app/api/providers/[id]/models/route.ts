import { NextResponse } from "next/server";
import { getProviderConnectionById } from "@/models";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { PROVIDER_MODELS } from "@/shared/constants/models";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function getProviderBaseUrl(providerSpecificData: unknown): string | null {
  const data = asRecord(providerSpecificData);
  const baseUrl = data.baseUrl;
  return typeof baseUrl === "string" && baseUrl.trim().length > 0 ? baseUrl : null;
}

type ProviderModelsConfigEntry = {
  url: string;
  method: "GET" | "POST";
  headers: Record<string, string>;
  authHeader?: string;
  authPrefix?: string;
  authQuery?: string;
  body?: unknown;
  parseResponse: (data: any) => any;
};

const KIMI_CODING_MODELS_CONFIG: ProviderModelsConfigEntry = {
  url: "https://api.kimi.com/coding/v1/models",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  authHeader: "x-api-key",
  parseResponse: (data) => data.data || data.models || [],
};

// Providers that return hardcoded models (no remote /models API)
const STATIC_MODEL_PROVIDERS: Record<string, () => Array<{ id: string; name: string }>> = {
  deepgram: () => [
    { id: "nova-3", name: "Nova 3 (Transcription)" },
    { id: "nova-2", name: "Nova 2 (Transcription)" },
    { id: "whisper-large", name: "Whisper Large (Transcription)" },
    { id: "aura-asteria-en", name: "Aura Asteria EN (TTS)" },
    { id: "aura-luna-en", name: "Aura Luna EN (TTS)" },
    { id: "aura-stella-en", name: "Aura Stella EN (TTS)" },
  ],
  assemblyai: () => [
    { id: "universal-3-pro", name: "Universal 3 Pro (Transcription)" },
    { id: "universal-2", name: "Universal 2 (Transcription)" },
  ],
  nanobanana: () => [
    { id: "nanobanana-flash", name: "NanoBanana Flash (Gemini 2.5 Flash)" },
    { id: "nanobanana-pro", name: "NanoBanana Pro (Gemini 3 Pro)" },
  ],
  perplexity: () => [
    { id: "sonar", name: "Sonar (Fast Search)" },
    { id: "sonar-pro", name: "Sonar Pro (Advanced Search)" },
    { id: "sonar-reasoning", name: "Sonar Reasoning (CoT + Search)" },
    { id: "sonar-reasoning-pro", name: "Sonar Reasoning Pro (Advanced CoT + Search)" },
    { id: "sonar-deep-research", name: "Sonar Deep Research (Expert Analysis)" },
  ],
  "bailian-coding-plan": () => [
    { id: "qwen3.5-plus", name: "Qwen3.5 Plus" },
    { id: "qwen3-max-2026-01-23", name: "Qwen3 Max (2026-01-23)" },
    { id: "qwen3-coder-next", name: "Qwen3 Coder Next" },
    { id: "qwen3-coder-plus", name: "Qwen3 Coder Plus" },
    { id: "MiniMax-M2.5", name: "MiniMax M2.5" },
    { id: "glm-5", name: "GLM 5" },
    { id: "glm-4.7", name: "GLM 4.7" },
    { id: "kimi-k2.5", name: "Kimi K2.5" },
  ],
};

/**
 * Get static models for a provider (if available).
 * Exported for testing purposes.
 * @param provider - Provider ID
 * @returns Array of models or undefined if provider doesn't use static models
 */
export function getStaticModelsForProvider(
  provider: string
): Array<{ id: string; name: string }> | undefined {
  const staticModelsFn = STATIC_MODEL_PROVIDERS[provider];
  return staticModelsFn ? staticModelsFn() : undefined;
}

// Provider models endpoints configuration
const PROVIDER_MODELS_CONFIG: Record<string, ProviderModelsConfigEntry> = {
  claude: {
    url: "https://api.anthropic.com/v1/models",
    method: "GET",
    headers: {
      "Anthropic-Version": "2023-06-01",
      "Content-Type": "application/json",
    },
    authHeader: "x-api-key",
    parseResponse: (data) => data.data || [],
  },
  gemini: {
    url: "https://generativelanguage.googleapis.com/v1beta/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authQuery: "key", // Use query param for API key
    parseResponse: (data) =>
      (data.models || []).map((m) => ({
        ...m,
        id: (m.name || m.id || "").replace(/^models\//, ""),
        name: m.displayName || (m.name || "").replace(/^models\//, ""),
      })),
  },
  "gemini-cli": {
    url: "https://generativelanguage.googleapis.com/v1beta/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) =>
      (data.models || []).map((m) => ({
        ...m,
        id: (m.name || m.id || "").replace(/^models\//, ""),
        name: m.displayName || (m.name || "").replace(/^models\//, ""),
      })),
  },
  qwen: {
    url: "https://portal.qwen.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  antigravity: {
    url: "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:models",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    body: {},
    parseResponse: (data) => data.models || [],
  },
  openai: {
    url: "https://api.openai.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  openrouter: {
    url: "https://openrouter.ai/api/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  kimi: {
    url: "https://api.moonshot.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || [],
  },
  "kimi-coding": {
    ...KIMI_CODING_MODELS_CONFIG,
  },
  "kimi-coding-apikey": {
    ...KIMI_CODING_MODELS_CONFIG,
  },
  anthropic: {
    url: "https://api.anthropic.com/v1/models",
    method: "GET",
    headers: {
      "Anthropic-Version": "2023-06-01",
      "Content-Type": "application/json",
    },
    authHeader: "x-api-key",
    parseResponse: (data) => data.data || [],
  },
  deepseek: {
    url: "https://api.deepseek.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  groq: {
    url: "https://api.groq.com/openai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  blackbox: {
    url: "https://api.blackbox.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  xai: {
    url: "https://api.x.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  mistral: {
    url: "https://api.mistral.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },

  together: {
    url: "https://api.together.xyz/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  fireworks: {
    url: "https://api.fireworks.ai/inference/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  cerebras: {
    url: "https://api.cerebras.ai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  cohere: {
    url: "https://api.cohere.com/v2/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  nvidia: {
    url: "https://integrate.api.nvidia.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  nebius: {
    url: "https://api.tokenfactory.nebius.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  kilocode: {
    url: "https://api.kilo.ai/api/openrouter/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "ollama-cloud": {
    url: "https://api.ollama.com/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.models || data.data || [],
  },
  synthetic: {
    url: "https://api.synthetic.new/openai/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
  "kilo-gateway": {
    url: "https://api.kilo.ai/api/gateway/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.data || data.models || [],
  },
};

/**
 * GET /api/providers/[id]/models - Get models list from provider
 */
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const connection = await getProviderConnectionById(id);

    if (!connection) {
      return NextResponse.json({ error: "Connection not found" }, { status: 404 });
    }

    const provider =
      typeof connection.provider === "string" && connection.provider.trim().length > 0
        ? connection.provider
        : null;
    if (!provider) {
      return NextResponse.json({ error: "Invalid connection provider" }, { status: 400 });
    }

    const connectionId = typeof connection.id === "string" ? connection.id : id;
    const apiKey = typeof connection.apiKey === "string" ? connection.apiKey : "";
    const accessToken = typeof connection.accessToken === "string" ? connection.accessToken : "";

    if (isOpenAICompatibleProvider(provider)) {
      const baseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (!baseUrl) {
        return NextResponse.json(
          { error: "No base URL configured for OpenAI compatible provider" },
          { status: 400 }
        );
      }

      let base = baseUrl.replace(/\/$/, "");
      if (base.endsWith("/chat/completions")) {
        base = base.slice(0, -17);
      } else if (base.endsWith("/completions")) {
        base = base.slice(0, -12);
      } else if (base.endsWith("/v1")) {
        base = base.slice(0, -3);
      }

      // T39: Try multiple endpoint formats
      const endpoints = [
        `${base}/v1/models`,
        `${base}/models`,
        `${baseUrl.replace(/\/$/, "")}/models`, // Original fallback
      ];

      // Remove duplicates
      const uniqueEndpoints = [...new Set(endpoints)];
      let models = null;
      let lastErrorStatus = null;

      for (const modelsUrl of uniqueEndpoints) {
        try {
          const response = await fetch(modelsUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            signal: AbortSignal.timeout(5000), // Quick timeout for fallbacks
          });

          if (response.ok) {
            const data = await response.json();
            models = data.data || data.models || [];
            break; // Success!
          }

          if (response.status === 401 || response.status === 403) {
            lastErrorStatus = response.status;
            throw new Error("auth_failed");
          }
        } catch (err: any) {
          if (err.message === "auth_failed") break; // Don't try other endpoints if auth failed
        }
      }

      // If all endpoints failed (but not because of auth), fallback to local catalog
      if (!models) {
        if (lastErrorStatus === 401 || lastErrorStatus === 403) {
          return NextResponse.json(
            { error: `Auth failed: ${lastErrorStatus}` },
            { status: lastErrorStatus }
          );
        }

        console.warn(`[models] All endpoints failed for ${provider}, using local catalog`);
        const localModels = PROVIDER_MODELS[provider] || [];
        models = localModels.map((m: any) => ({
          id: m.id,
          name: m.name || m.id,
          owned_by: provider,
        }));
      }

      // Track source for MCP tool T39 requirement
      const source =
        models === null || (models && models.length > 0 && models[0].owned_by === provider)
          ? "local_catalog"
          : "api";

      return NextResponse.json({
        provider,
        connectionId,
        models,
        source,
        ...(source === "local_catalog"
          ? { warning: "API unavailable — using cached catalog" }
          : {}),
      });
    }

    if (isAnthropicCompatibleProvider(provider)) {
      let baseUrl = getProviderBaseUrl(connection.providerSpecificData);
      if (!baseUrl) {
        return NextResponse.json(
          { error: "No base URL configured for Anthropic compatible provider" },
          { status: 400 }
        );
      }

      baseUrl = baseUrl.replace(/\/$/, "");
      if (baseUrl.endsWith("/messages")) {
        baseUrl = baseUrl.slice(0, -9);
      }

      const url = `${baseUrl}/models`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Error fetching models from ${provider}:`, errorText);
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return NextResponse.json({
        provider,
        connectionId,
        models,
      });
    }

    // Static model providers (no remote /models API)
    const staticModelsFn =
      provider in STATIC_MODEL_PROVIDERS
        ? STATIC_MODEL_PROVIDERS[provider as keyof typeof STATIC_MODEL_PROVIDERS]
        : undefined;
    if (staticModelsFn) {
      return NextResponse.json({
        provider,
        connectionId,
        models: staticModelsFn(),
      });
    }

    const config =
      provider in PROVIDER_MODELS_CONFIG
        ? PROVIDER_MODELS_CONFIG[provider as keyof typeof PROVIDER_MODELS_CONFIG]
        : undefined;
    if (!config) {
      return NextResponse.json(
        { error: `Provider ${provider} does not support models listing` },
        { status: 400 }
      );
    }

    // Get auth token
    const token = accessToken || apiKey;
    if (!token) {
      return NextResponse.json(
        {
          error:
            "No API key configured for this provider. Please add an API key in the provider settings.",
        },
        { status: 400 }
      );
    }

    // Build request URL
    let url = config.url;
    if (config.authQuery) {
      url += `?${config.authQuery}=${token}`;
    }

    // Build headers
    const headers = { ...config.headers };
    if (config.authHeader && !config.authQuery) {
      headers[config.authHeader] = (config.authPrefix || "") + token;
    }

    // Make request
    const fetchOptions: any = {
      method: config.method,
      headers,
    };

    if (config.body && config.method === "POST") {
      fetchOptions.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error fetching models from ${provider}:`, errorText);
      return NextResponse.json(
        { error: `Failed to fetch models: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const models = config.parseResponse(data);

    return NextResponse.json({
      provider,
      connectionId,
      models,
    });
  } catch (error) {
    console.log("Error fetching provider models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}
