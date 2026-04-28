import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const imageOnlyProviders = {
  "fal-ai": {
    url: "https://api.fal.ai/v1/models?limit=1",
    header: "Authorization",
    value: "Key fal-ai-key",
  },
  "stability-ai": {
    url: "https://api.stability.ai/v1/user/account",
    header: "Authorization",
    value: "Bearer stability-ai-key",
  },
  "black-forest-labs": {
    url: "https://api.bfl.ai/v1/credits",
    header: "x-key",
    value: "black-forest-labs-key",
  },
  recraft: {
    url: "https://external.api.recraft.ai/v1/users/me",
    header: "Authorization",
    value: "Bearer recraft-key",
  },
  topaz: {
    url: "https://api.topazlabs.com/account/v1/credits/balance",
    header: "X-API-Key",
    value: "topaz-key",
  },
};

const expectedValidationError = (status: number) =>
  status === 429 ? "Validation rate limited (429)" : `Validation failed: ${status}`;

for (const [provider, config] of Object.entries(imageOnlyProviders)) {
  test(`${provider} API key validator returns valid on 200`, async () => {
    let fetchCalled = false;
    globalThis.fetch = async (url, init = {}) => {
      fetchCalled = true;
      assert.equal(String(url), config.url);
      assert.equal((init.headers as Record<string, string>)[config.header], config.value);
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    };

    const result = await validateProviderApiKey({ provider, apiKey: `${provider}-key` });

    assert.equal(result.valid, true, `${provider} should validate a 200 response`);
    assert.equal(result.error, null, `${provider} should not return an error for 200`);
    assert.equal(fetchCalled, true, `${provider} should call its validation endpoint`);
  });
}

for (const provider of Object.keys(imageOnlyProviders)) {
  for (const status of [401, 403]) {
    test(`${provider} API key validator returns invalid on ${status}`, async () => {
      let fetchCalled = false;
      globalThis.fetch = async () => {
        fetchCalled = true;
        return new Response(JSON.stringify({ error: "unauthorized" }), { status });
      };

      const result = await validateProviderApiKey({ provider, apiKey: `${provider}-key` });

      assert.equal(result.valid, false, `${provider} should reject ${status}`);
      assert.equal(result.error, "Invalid API key", `${provider} should surface auth failure`);
      assert.equal(fetchCalled, true, `${provider} should call its validation endpoint`);
    });
  }

  for (const status of [400, 404, 429]) {
    test(`${provider} API key validator returns validation failed on ${status}`, async () => {
      let fetchCalled = false;
      globalThis.fetch = async () => {
        fetchCalled = true;
        return new Response(JSON.stringify({ error: "validation failed" }), { status });
      };

      const result = await validateProviderApiKey({ provider, apiKey: `${provider}-key` });

      assert.equal(result.valid, false, `${provider} should reject ${status}`);
      assert.equal(
        result.error,
        expectedValidationError(status),
        `${provider} should surface validation failure`
      );
      assert.equal(fetchCalled, true, `${provider} should call its validation endpoint`);
    });
  }
}

test("NanoBanana API key validator returns valid on 200", async () => {
  let fetchCalled = false;
  globalThis.fetch = async (url, init = {}) => {
    fetchCalled = true;
    assert.match(String(url), /nanobanana/i);
    assert.equal((init.headers as Record<string, string>).Authorization, "Bearer nb-key");
    return new Response(JSON.stringify({ taskId: "task-1" }), { status: 200 });
  };

  const result = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.equal(fetchCalled, true);
});

for (const status of [401, 403]) {
  test(`NanoBanana API key validator returns invalid on ${status}`, async () => {
    let fetchCalled = false;
    globalThis.fetch = async (url) => {
      fetchCalled = true;
      assert.match(String(url), /nanobanana/i);
      return new Response(JSON.stringify({ error: "unauthorized" }), { status });
    };

    const result = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });

    assert.equal(result.valid, false, `NanoBanana should reject ${status}`);
    assert.equal(result.error, "Invalid API key");
    assert.equal(fetchCalled, true);
  });
}

for (const status of [400, 404, 429]) {
  test(`NanoBanana API key validator returns validation failed on ${status}`, async () => {
    let fetchCalled = false;
    globalThis.fetch = async (url) => {
      fetchCalled = true;
      assert.match(String(url), /nanobanana/i);
      return new Response(JSON.stringify({ error: "validation failed" }), { status });
    };

    const result = await validateProviderApiKey({ provider: "nanobanana", apiKey: "nb-key" });

    assert.equal(result.valid, false, `NanoBanana should reject ${status}`);
    assert.equal(result.error, expectedValidationError(status));
    assert.equal(fetchCalled, true);
  });
}
