import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");
const { validateOpenAICompatibleProvider } =
  await import("../../src/lib/providers/validation/openaiFormat.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("validateProviderApiKey rejects missing provider or API key", async () => {
  const result = await validateProviderApiKey({ provider: "", apiKey: "" });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider and API key required");
  assert.equal(result.unsupported, false);
});

test("validateProviderApiKey returns unsupported for unknown providers", async () => {
  const result = await validateProviderApiKey({
    provider: "definitely-unknown-provider",
    apiKey: "sk-test",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider validation not supported");
  assert.equal(result.unsupported, true);
});

test("openai-compatible validation reports missing base URL", async () => {
  const result = await validateProviderApiKey({
    provider: "openai-compatible-missing-base",
    apiKey: "sk-test",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /No base URL configured/i);
});

test("openai-compatible validation treats /models 402 as valid credentials", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "Payment required" }), { status: 402 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-models-402",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "models_endpoint");
  assert.equal(result.statusCode, 402);
  assert.match(result.warning, /402|quota/i);
  assert.deepEqual(calls, ["https://api.example.com/v1/models"]);
});

test("openai-compatible validation treats representative-model chat 402 as valid credentials", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "Not Found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ error: "Add credits to continue" }), { status: 402 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-chat-402",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "paid-upstream-model",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "chat_completions");
  assert.equal(result.statusCode, 402);
  assert.match(result.warning, /paid-upstream-model/);
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/chat/completions",
  ]);
});

test("openai-compatible validation accepts rate-limited /models responses", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), headers: init.headers || {} });
    return new Response(JSON.stringify({ error: "rate limited" }), { status: 429 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-rate-limit",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "models_endpoint");
  assert.match(result.warning, /Rate limited/i);
  assert.deepEqual(
    calls.map((call) => call.url),
    ["https://api.example.com/v1/models"]
  );
  assert.equal(calls[0].headers.Authorization, "Bearer sk-test");
});

test("openai-compatible validation retries transient /models failures before succeeding", async () => {
  let attempts = 0;

  globalThis.fetch = async (url, init = {}) => {
    attempts += 1;
    assert.equal(String(url), "https://api.example.com/v1/models");
    assert.equal(init.headers.Authorization, "Bearer sk-test");

    if (attempts === 1) {
      throw new Error("temporary network issue");
    }

    return new Response(JSON.stringify({ data: [{ id: "demo-model" }] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-retry",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "models_endpoint");
  assert.equal(attempts, 2);
});

test("openai-compatible validation detects chat-template reasoning backends from /models", async () => {
  for (const backend of ["vllm", "sglang", "llamacpp"]) {
    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          object: "list",
          data: [
            { id: "model-a", object: "model", owned_by: backend },
            { id: "model-b", object: "model", owned_by: backend.toUpperCase() },
          ],
        }),
        { status: 200 }
      );

    const result = await validateProviderApiKey({
      provider: `openai-compatible-${backend}`,
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });

    assert.equal(result.valid, true);
    assert.deepEqual(
      {
        mode: result.detectedReasoningControl?.mode,
        modelBackends: result.detectedReasoningControl?.modelBackends,
        source: result.detectedReasoningControl?.source,
        detectorVersion: result.detectedReasoningControl?.detectorVersion,
      },
      {
        mode: "chat-template",
        modelBackends: { "model-a": backend, "model-b": backend },
        source: "models.data.effective_owned_by",
        detectorVersion: 2,
      }
    );
    assert.match(result.detectedReasoningControl?.observedAt ?? "", /^\d{4}-\d{2}-\d{2}T/);
  }
});

test("openai-compatible validation records exact model evidence through transparent wrappers", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "list",
        data: [
          {
            id: "Case/Sensitive-Model",
            owned_by: "openai",
            openai: {
              owned_by: "openai",
              openai: { owned_by: "VLLM" },
            },
          },
          { id: "direct-model", owned_by: "sglang" },
          { id: "__proto__", owned_by: "llamacpp" },
          { id: "conflicting-model", owned_by: "vllm" },
          { id: "conflicting-model", owned_by: "sglang" },
          { id: "partially-known-model", owned_by: "vllm" },
          { id: "partially-known-model", owned_by: "vendor-gateway" },
          { id: "manual-alias", owned_by: "openai", openai: { id: "manual-alias" } },
          { id: "unknown-model", owned_by: "vendor-gateway" },
        ],
      }),
      { status: 200 }
    );

  const result = await validateProviderApiKey({
    provider: "openai-compatible-transparent-wrapper",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.deepEqual(
    result.detectedReasoningControl?.modelBackends,
    Object.fromEntries([
      ["Case/Sensitive-Model", "vllm"],
      ["direct-model", "sglang"],
      ["__proto__", "llamacpp"],
    ])
  );
  assert.equal(
    Object.hasOwn(result.detectedReasoningControl?.modelBackends ?? {}, "conflicting-model"),
    false
  );
  assert.equal(
    Object.hasOwn(result.detectedReasoningControl?.modelBackends ?? {}, "partially-known-model"),
    false
  );
  assert.equal(result.detectedReasoningControl?.backend, undefined);
  assert.equal(result.detectedReasoningControl?.detectorVersion, 2);
});

for (const responseBody of [
  { object: "list", data: [] },
  { object: "list", data: [{ id: "model-a" }] },
  { object: "list", data: [{ id: "model-a", owned_by: "unknown-engine" }] },
] as const) {
  test(`openai-compatible validation abstains for unproven /models ownership: ${JSON.stringify(responseBody)}`, async () => {
    globalThis.fetch = async () => new Response(JSON.stringify(responseBody), { status: 200 });

    const result = await validateProviderApiKey({
      provider: "openai-compatible-unproven-owner",
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    });

    assert.equal(result.valid, true);
    assert.equal(result.detectedReasoningControl, null);
  });
}

test("openai-compatible validation abstains when a successful /models body is malformed", async () => {
  globalThis.fetch = async () => new Response("not-json", { status: 200 });

  const result = await validateProviderApiKey({
    provider: "openai-compatible-malformed-models",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.detectedReasoningControl, null);
});

test("openai-compatible validation keeps a 200 valid when its detection body read fails", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(
      new ReadableStream({
        pull(controller) {
          controller.error(new Error("models body failed"));
        },
      }),
      { status: 200 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-models-read-error",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "must-not-trigger-chat-fallback",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.detectedReasoningControl, null);
  assert.equal(calls, 1, "a successful /models response must not trigger a completion probe");
});

test("openai-compatible detection bounds a 200 response body that never closes", async () => {
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response(new ReadableStream({ start() {} }), { status: 200 });
  };

  const startedAt = Date.now();
  const result = await validateOpenAICompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
    reasoningControlDetectionTimeoutMs: 20,
  });

  assert.equal(result.valid, true);
  assert.equal(result.detectedReasoningControl, null);
  assert.equal(calls, 1);
  assert.ok(Date.now() - startedAt < 500, "body-read deadline should finish promptly");
});

test("openai-compatible validation keeps credentials valid when /models exceeds the detection cap", async () => {
  globalThis.fetch = async () => new Response("x".repeat(2 * 1024 * 1024 + 1), { status: 200 });

  const result = await validateProviderApiKey({
    provider: "openai-compatible-oversized-models",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.detectedReasoningControl, null);
});

test("openai-compatible validation abstains when /models exceeds the detection row cap", async () => {
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        object: "list",
        data: Array.from({ length: 10_001 }, (_, index) => ({
          id: `model-${index}`,
          owned_by: "vllm",
        })),
      }),
      { status: 200 }
    );

  const result = await validateProviderApiKey({
    provider: "openai-compatible-too-many-models",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.detectedReasoningControl, null);
});

test("openai-compatible validation forwards custom User-Agent", async () => {
  const calls = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), headers: init.headers || {} });
    return new Response(JSON.stringify({ error: "rate limited" }), { status: 429 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-custom-ua",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      customUserAgent: "MyRouteTester/1.0",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.example.com/v1/models");
  assert.equal(calls[0].headers["User-Agent"], "MyRouteTester/1.0");
});

test("openai-compatible validation treats chat 400 as authenticated fallback", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      return new Response(JSON.stringify({ error: "server error" }), { status: 500 });
    }

    return new Response(JSON.stringify({ error: "bad model" }), { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-fallback-chat",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "custom-model",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "inference_available");
  assert.match(result.warning, /Model ID may be invalid/i);
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/chat/completions",
  ]);
});

test("openai-compatible validation returns actionable connection failure when probes fail", async () => {
  globalThis.fetch = async () => {
    throw new Error("socket hang up");
  };

  const result = await validateProviderApiKey({
    provider: "openai-compatible-network-error",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1",
      validationModelId: "custom-model",
    },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Connection failed while testing /chat/completions");
});

test("anthropic-compatible validation requires a base URL", async () => {
  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-no-base",
    apiKey: "sk-test",
    providerSpecificData: {},
  });

  assert.equal(result.valid, false);
  assert.match(result.error, /No base URL configured/i);
});

test("anthropic-compatible validation rejects invalid keys (auth-fail on both /models and /messages)", async () => {
  // After the 584cf66a port, /models alone is not authoritative — many compatible
  // proxies 401/403 on /models even with a valid key. To prove the key is bad we
  // require an auth-shaped failure on POST /v1/messages too.
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "forbidden" }), { status: 403 });
  };

  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-bad-key",
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: "https://api.example.com/v1/messages" },
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/messages",
  ]);
});

test("anthropic-compatible validation falls back to /messages and treats 400 as auth success", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    if (String(url).endsWith("/models")) {
      throw new Error("models endpoint unavailable");
    }

    return new Response(JSON.stringify({ error: "bad request" }), { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "anthropic-compatible-fallback",
    apiKey: "sk-test",
    providerSpecificData: {
      baseUrl: "https://api.example.com/v1/messages",
      validationModelId: "claude-custom",
    },
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.deepEqual(calls, [
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/models",
    "https://api.example.com/v1/messages",
  ]);
});

test("registry openai-like providers report unsupported validation endpoints on 404 chat probes", async () => {
  const calls = [];
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  };

  const result = await validateProviderApiKey({
    provider: "openai",
    apiKey: "sk-test",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Provider validation endpoint not supported");
  assert.deepEqual(calls, [
    "https://api.openai.com/v1/models",
    "https://api.openai.com/v1/chat/completions",
  ]);
});

test("gemini validation rejects invalid API keys (401)", async () => {
  const calls = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), headers: init?.headers });
    return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /generativelanguage\.googleapis\.com/);
  assert.equal(calls[0].headers["x-goog-api-key"], "bad-key");
});

test("gemini validation rejects invalid API keys (400 with API_KEY_INVALID)", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          code: 400,
          message: "API key not valid. Please pass a valid API key.",
          status: "INVALID_ARGUMENT",
          details: [{ reason: "API_KEY_INVALID" }],
        },
      }),
      { status: 400 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("gemini validation rejects expired API keys (400 with API_KEY_EXPIRED)", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          code: 400,
          message: "API key expired.",
          status: "INVALID_ARGUMENT",
          details: [{ reason: "API_KEY_EXPIRED" }],
        },
      }),
      { status: 400 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "expired-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("gemini validation rejects invalid keys via PERMISSION_DENIED status", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          code: 400,
          message: "Request had insufficient authentication scopes.",
          status: "PERMISSION_DENIED",
          details: [],
        },
      }),
      { status: 400 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("gemini validation accepts valid API key (200)", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        models: [
          { name: "models/gemini-2.5-flash", supportedGenerationMethods: ["generateContent"] },
        ],
      }),
      { status: 200 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "valid-key",
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test("gemini validation treats 400 with unknown body as invalid key", async () => {
  globalThis.fetch = async () => {
    return new Response("not json", { status: 400 });
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});

test("gemini validation treats 429 rate limit as valid key", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          code: 429,
          message: "You exceeded your current quota.",
          status: "RESOURCE_EXHAUSTED",
        },
      }),
      { status: 429 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "valid-but-rate-limited-key",
  });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
});

test("gemini validation rejects invalid keys via UNAUTHENTICATED status", async () => {
  globalThis.fetch = async () => {
    return new Response(
      JSON.stringify({
        error: {
          code: 401,
          message: "Request is missing valid authentication credentials.",
          status: "UNAUTHENTICATED",
          details: [],
        },
      }),
      { status: 401 }
    );
  };

  const result = await validateProviderApiKey({
    provider: "gemini",
    apiKey: "bad-key",
  });

  assert.equal(result.valid, false);
  assert.equal(result.error, "Invalid API key");
});
