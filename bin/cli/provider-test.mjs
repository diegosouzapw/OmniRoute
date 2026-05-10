const DEFAULT_TIMEOUT_MS = 15000;

const PROVIDER_TEST_CONFIGS = {
  openai: {
    format: "openai",
    baseUrl: "https://api.openai.com/v1",
    model: "gpt-4o-mini",
  },
  openrouter: {
    format: "openai",
    baseUrl: "https://openrouter.ai/api/v1",
    model: "openai/gpt-4o-mini",
  },
  groq: {
    format: "openai",
    baseUrl: "https://api.groq.com/openai/v1",
    model: "llama-3.1-8b-instant",
  },
  mistral: {
    format: "openai",
    baseUrl: "https://api.mistral.ai/v1",
    model: "mistral-small-latest",
  },
  anthropic: {
    format: "anthropic",
    baseUrl: "https://api.anthropic.com/v1",
    model: "claude-3-5-haiku-latest",
  },
  google: {
    format: "google",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta",
    model: "gemini-1.5-flash",
  },
};

function joinUrl(baseUrl, suffix) {
  return `${baseUrl.replace(/\/+$/, "")}/${suffix.replace(/^\/+/, "")}`;
}

function providerEnvName(provider, suffix) {
  const normalizedProvider = String(provider || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "_");
  return `OMNIROUTE_PROVIDER_TEST_${normalizedProvider}_${suffix}`;
}

function resolveTestModel(input, config) {
  const providerOverride = process.env[providerEnvName(input.provider, "MODEL")];
  return (
    input.defaultModel ||
    providerOverride ||
    process.env.OMNIROUTE_PROVIDER_TEST_MODEL ||
    config.model
  );
}

function resolveProviderConfig(input) {
  const config = PROVIDER_TEST_CONFIGS[input.provider];
  if (!config) return null;

  return {
    ...config,
    baseUrl: input.baseUrl || config.baseUrl,
    model: resolveTestModel(input, config),
  };
}

async function fetchWithTimeout(url, init = {}, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

function classifyResponse(response) {
  if (response.ok) return { valid: true, error: null, statusCode: response.status };
  if (response.status === 401 || response.status === 403) {
    return { valid: false, error: "Invalid API key", statusCode: response.status };
  }
  if (response.status >= 500) {
    return {
      valid: false,
      error: `Provider unavailable (${response.status})`,
      statusCode: response.status,
    };
  }

  return { valid: true, error: null, statusCode: response.status };
}

async function testOpenAILikeProvider(input, config) {
  const headers = {
    Authorization: `Bearer ${input.apiKey}`,
    "Content-Type": "application/json",
  };

  const modelsRes = await fetchWithTimeout(joinUrl(config.baseUrl, "/models"), {
    method: "GET",
    headers,
  });

  if (modelsRes.ok || modelsRes.status === 401 || modelsRes.status === 403) {
    return classifyResponse(modelsRes);
  }

  const chatRes = await fetchWithTimeout(joinUrl(config.baseUrl, "/chat/completions"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    }),
  });

  return classifyResponse(chatRes);
}

async function testAnthropicProvider(input, config) {
  const response = await fetchWithTimeout(joinUrl(config.baseUrl, "/messages"), {
    method: "POST",
    headers: {
      "x-api-key": input.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    }),
  });

  return classifyResponse(response);
}

async function testGoogleProvider(input, config) {
  const url = new URL(joinUrl(config.baseUrl, "/models"));
  url.searchParams.set("key", input.apiKey);

  const response = await fetchWithTimeout(url.toString(), {
    method: "GET",
  });

  return classifyResponse(response);
}

export async function testProviderApiKey(input) {
  if (!input.apiKey) {
    return { valid: false, error: "Missing API key", statusCode: null };
  }

  const config = resolveProviderConfig(input);
  if (!config) {
    return { valid: false, error: "Provider test not supported", unsupported: true };
  }

  try {
    if (config.format === "openai") {
      return await testOpenAILikeProvider(input, config);
    }
    if (config.format === "anthropic") {
      return await testAnthropicProvider(input, config);
    }
    if (config.format === "google") {
      return await testGoogleProvider(input, config);
    }

    return { valid: false, error: "Provider test not supported", unsupported: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { valid: false, error: message || "Provider test failed", statusCode: null };
  }
}
