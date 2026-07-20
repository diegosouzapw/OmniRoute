import test from "node:test";
import assert from "node:assert/strict";

const catalog =
  await import("../../src/app/(dashboard)/dashboard/providers/components/onboarding/providerOnboardingCatalog.ts");
const api =
  await import("../../src/app/(dashboard)/dashboard/providers/components/onboarding/providerOnboardingApi.ts");

test("provider onboarding catalog exposes API-key and OAuth providers for the wizard", () => {
  const apiKeyOptions = catalog.getWizardApiKeyProviderOptions();
  const oauthOptions = catalog.getWizardOAuthProviderOptions();

  assert.ok(apiKeyOptions.some((option) => option.id === "openai"));
  assert.ok(apiKeyOptions.some((option) => option.id === "openrouter"));
  assert.ok(!apiKeyOptions.some((option) => option.id === "kiro"));
  assert.ok(!apiKeyOptions.some((option) => option.id === "amazon-q"));
  assert.ok(oauthOptions.some((option) => option.id === "claude"));
  assert.ok(oauthOptions.some((option) => option.id === "kiro"));
  assert.ok(oauthOptions.some((option) => option.id === "amazon-q"));
  assert.ok(oauthOptions.some((option) => option.id === "cursor"));
  assert.ok(!oauthOptions.some((option) => option.id === "zed"));
  assert.ok(!oauthOptions.some((option) => option.id === "windsurf"));
  assert.ok(!oauthOptions.some((option) => option.id === "devin-cli"));
  assert.ok(!oauthOptions.some((option) => option.id === "qoder"));

  assert.ok(apiKeyOptions.every((option) => option.authKind === "apikey"));
  assert.ok(oauthOptions.every((option) => option.authKind === "oauth"));
});

test("provider onboarding option filter matches id, name, alias, and description", () => {
  const options = [
    {
      id: "openrouter",
      name: "OpenRouter",
      icon: "router",
      alias: "or",
      description: "multi-model routing gateway",
      authKind: "apikey",
      apiKeyOptional: false,
      deprecated: false,
    },
    {
      id: "claude",
      name: "Claude Code",
      icon: "smart_toy",
      alias: "cc",
      description: "OAuth coding provider",
      authKind: "oauth",
      apiKeyOptional: false,
      deprecated: false,
    },
  ];

  assert.deepEqual(
    catalog.filterWizardProviderOptions(options, "router").map((option) => option.id),
    ["openrouter"]
  );
  assert.deepEqual(
    catalog.filterWizardProviderOptions(options, "coding").map((option) => option.id),
    ["claude"]
  );
  assert.equal(catalog.filterWizardProviderOptions(options, "   ").length, 2);
});

test("provider onboarding builds providerSpecificData without empty fields", () => {
  assert.deepEqual(
    catalog.buildProviderSpecificData({
      baseUrl: " https://gateway.example/v1 ",
      region: "",
      cx: " cx-123 ",
      customUserAgent: "   ",
    }),
    {
      baseUrl: "https://gateway.example/v1",
      cx: "cx-123",
    }
  );
  assert.equal(catalog.buildProviderSpecificData({}), null);
});

test("provider onboarding API sends validate, create, and test requests with expected payloads", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    if (String(url) === "/api/providers/validate") {
      return Response.json({ valid: true });
    }
    if (String(url) === "/api/providers") {
      return Response.json(
        { connection: { id: "conn-1", provider: "openai", name: "OpenAI Primary" } },
        { status: 201 }
      );
    }
    if (String(url) === "/api/providers/conn-1/test") {
      return Response.json({ valid: true, latencyMs: 42 });
    }
    return Response.json({ error: "unexpected" }, { status: 500 });
  };

  try {
    await api.validateOnboardingApiKey({
      provider: "openai",
      apiKey: "sk-test",
      baseUrl: "https://api.example/v1",
    });
    const connection = await api.createOnboardingConnection({
      provider: "openai",
      name: "OpenAI Primary",
      apiKey: "sk-test",
      providerSpecificData: { baseUrl: "https://api.example/v1" },
    });
    const result = await api.testOnboardingConnection(connection.id);

    assert.equal(connection.id, "conn-1");
    assert.equal(result.valid, true);
    assert.equal(calls.length, 3);
    assert.equal(calls[0].url, "/api/providers/validate");
    assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
      provider: "openai",
      apiKey: "sk-test",
      baseUrl: "https://api.example/v1",
    });
    assert.equal(calls[1].url, "/api/providers");
    assert.deepEqual(JSON.parse(String(calls[1].init.body)), {
      provider: "openai",
      name: "OpenAI Primary",
      apiKey: "sk-test",
      priority: 1,
      testStatus: "unknown",
      providerSpecificData: { baseUrl: "https://api.example/v1" },
    });
    assert.equal(calls[2].url, "/api/providers/conn-1/test");
    assert.equal(calls[2].init.method, "POST");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding validation rejects HTTP 200 responses with valid false", async () => {
  const originalFetch = globalThis.fetch;
  let createCalled = false;
  globalThis.fetch = async (url) => {
    if (String(url) === "/api/providers/validate") {
      return Response.json({ valid: false, error: "Invalid API key" });
    }
    if (String(url) === "/api/providers") {
      createCalled = true;
      return Response.json({ connection: { id: "conn-1", provider: "openai" } });
    }
    return Response.json({ error: "unexpected" }, { status: 500 });
  };

  try {
    await assert.rejects(
      () => api.validateOnboardingApiKey({ provider: "openai", apiKey: "bad-key" }),
      /Invalid API key/
    );
    assert.equal(createCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#5692 onboarding validation treats unsupported providers as non-blocking (save proceeds)", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    if (String(url) === "/api/providers/validate") {
      // #5565/#5567: providers with no live validator (lmarena, piapi, …) return
      // HTTP 400 + { unsupported: true }. The wizard must NOT treat this as a hard
      // failure — otherwise the connection is never created (#5692).
      return Response.json(
        { error: "Provider validation not supported", unsupported: true },
        { status: 400 }
      );
    }
    return Response.json({ error: "unexpected" }, { status: 500 });
  };

  try {
    const data = await api.validateOnboardingApiKey({ provider: "lmarena", apiKey: "test-key" });
    assert.equal(data.unsupported, true);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding API ignores non-object error JSON", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json(null, { status: 500 });

  try {
    await assert.rejects(() => api.fetchOnboardingProviderNodes(), /Failed to load provider nodes/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding validates API payloads before sending requests", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return Response.json({ valid: true });
  };

  try {
    await assert.rejects(
      () =>
        api.validateOnboardingApiKey({
          provider: "openai",
          apiKey: "sk-test",
          baseUrl: "not-a-url",
        }),
      /Provider credentials are not valid/
    );
    await assert.rejects(
      () =>
        api.createOnboardingConnection({
          provider: "openai",
          name: "OpenAI Primary",
        }),
      /Provider connection data is invalid/
    );
    assert.equal(fetchCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding loads provider node feature flags through the API helper", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return Response.json({ ccCompatibleProviderEnabled: true });
  };

  try {
    const result = await api.fetchOnboardingProviderNodes();

    assert.deepEqual(result, { ccCompatibleProviderEnabled: true });
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "/api/provider-nodes");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding can create compatible connections without an API key", async () => {
  const calls = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });
    return Response.json(
      { connection: { id: "conn-custom", provider: "openai-compatible-local" } },
      { status: 201 }
    );
  };

  try {
    const connection = await api.createOnboardingConnection({
      provider: "openai-compatible-local",
      name: "Local Gateway",
    });

    assert.equal(connection.id, "conn-custom");
    assert.deepEqual(JSON.parse(String(calls[0].init.body)), {
      provider: "openai-compatible-local",
      name: "Local Gateway",
      priority: 1,
      testStatus: "unknown",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider onboarding API builds compatible provider node request bodies", () => {
  assert.deepEqual(
    api.buildCompatibleNodeRequest({
      mode: "openai",
      name: "Local Gateway",
      prefix: "local-gw",
      baseUrl: "https://gateway.example/v1",
      apiType: "responses",
      modelsPath: "/models",
    }),
    {
      name: "Local Gateway",
      prefix: "local-gw",
      baseUrl: "https://gateway.example/v1",
      type: "openai-compatible",
      chatPath: "",
      apiType: "responses",
      modelsPath: "/models",
    }
  );

  assert.deepEqual(
    api.buildCompatibleNodeRequest({
      mode: "cc",
      name: "CC Gateway",
      prefix: "cc-gw",
      baseUrl: "https://cc.example",
    }),
    {
      name: "CC Gateway",
      prefix: "cc-gw",
      baseUrl: "https://cc.example",
      type: "anthropic-compatible",
      chatPath: "/v1/messages?beta=true",
      compatMode: "cc",
    }
  );
});

test("provider onboarding validates compatible provider node request bodies", () => {
  assert.throws(
    () =>
      api.buildCompatibleNodeRequest({
        mode: "openai",
        name: "Local Gateway",
        prefix: "local-gw",
        baseUrl: "https://gateway.example/v1",
        chatPath: "chat/completions",
      }),
    /Compatible provider data is invalid/
  );
});
