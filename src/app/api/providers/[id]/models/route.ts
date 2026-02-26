import { NextResponse } from "next/server";
import { getProviderConnectionById } from "@/models";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";

// Providers that return hardcoded models (no remote /models API)
const STATIC_MODEL_PROVIDERS = {
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
};

// Provider models endpoints configuration
const PROVIDER_MODELS_CONFIG = {
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
    parseResponse: (data) => data.models || [],
  },
  "gemini-cli": {
    url: "https://generativelanguage.googleapis.com/v1beta/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "Authorization",
    authPrefix: "Bearer ",
    parseResponse: (data) => data.models || [],
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
    url: "https://api.kimi.com/coding/v1/models",
    method: "GET",
    headers: { "Content-Type": "application/json" },
    authHeader: "x-api-key",
    parseResponse: (data) => data.data || data.models || [],
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

    if (isOpenAICompatibleProvider(connection.provider)) {
      const baseUrl = connection.providerSpecificData?.baseUrl;
      if (!baseUrl) {
        return NextResponse.json(
          { error: "No base URL configured for OpenAI compatible provider" },
          { status: 400 }
        );
      }

      let modelsUrl = baseUrl.replace(/\/$/, "");
      if (modelsUrl.endsWith("/chat/completions")) {
        modelsUrl = modelsUrl.slice(0, -17) + "/models";
      } else if (modelsUrl.endsWith("/completions")) {
        modelsUrl = modelsUrl.slice(0, -12) + "/models";
      } else {
        modelsUrl = `${modelsUrl}/models`;
      }

      const response = await fetch(modelsUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${connection.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Error fetching models from ${connection.provider}:`, errorText);
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return NextResponse.json({
        provider: connection.provider,
        connectionId: connection.id,
        models,
      });
    }

    if (isAnthropicCompatibleProvider(connection.provider)) {
      let baseUrl = connection.providerSpecificData?.baseUrl;
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
          "x-api-key": connection.apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${connection.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Error fetching models from ${connection.provider}:`, errorText);
        return NextResponse.json(
          { error: `Failed to fetch models: ${response.status}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      const models = data.data || data.models || [];

      return NextResponse.json({
        provider: connection.provider,
        connectionId: connection.id,
        models,
      });
    }

    // Static model providers (no remote /models API)
    const staticModelsFn = STATIC_MODEL_PROVIDERS[connection.provider];
    if (staticModelsFn) {
      return NextResponse.json({
        provider: connection.provider,
        connectionId: connection.id,
        models: staticModelsFn(),
      });
    }

    const config = PROVIDER_MODELS_CONFIG[connection.provider];
    if (!config) {
      return NextResponse.json(
        { error: `Provider ${connection.provider} does not support models listing` },
        { status: 400 }
      );
    }

    // Get auth token
    const token = connection.accessToken || connection.apiKey;
    if (!token) {
      return NextResponse.json({ error: "No valid token found" }, { status: 401 });
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
      console.log(`Error fetching models from ${connection.provider}:`, errorText);
      return NextResponse.json(
        { error: `Failed to fetch models: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const models = config.parseResponse(data);

    return NextResponse.json({
      provider: connection.provider,
      connectionId: connection.id,
      models,
    });
  } catch (error) {
    console.log("Error fetching provider models:", error);
    return NextResponse.json({ error: "Failed to fetch models" }, { status: 500 });
  }
}
