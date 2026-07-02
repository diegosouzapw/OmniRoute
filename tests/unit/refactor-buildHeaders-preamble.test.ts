import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";

/**
 * TestExecutor exposes protected buildHeadersPreamble and resolveEffectiveKey.
 */
class TestExecutor extends BaseExecutor {
  constructor(config = {}) {
    super("test-provider", {
      baseUrls: ["https://default.example/v1/chat/completions"],
      headers: { "X-Provider-Header": "from-config" },
      ...config,
    });
  }

  publicBuildHeadersPreamble(
    credentials: ProviderCredentials,
    stream: boolean
  ): { headers: Record<string, string>; effectiveKey: string } {
    return this.buildHeadersPreamble(credentials, stream);
  }

  publicResolveEffectiveKey(credentials: ProviderCredentials): string {
    return this.resolveEffectiveKey(credentials);
  }

  async transformRequest(model: string, body: unknown, stream: boolean) {
    return body;
  }
}

// ---------------------------------------------------------------------------
// resolveEffectiveKey tests
// ---------------------------------------------------------------------------

test("resolveEffectiveKey: returns apiKey when no extraApiKeys present", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveEffectiveKey({
    apiKey: "sk-primary-123",
  });
  assert.equal(result, "sk-primary-123");
});

test("resolveEffectiveKey: returns apiKey when extraApiKeys is empty", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveEffectiveKey({
    apiKey: "sk-primary-123",
    providerSpecificData: { extraApiKeys: [] },
  });
  assert.equal(result, "sk-primary-123");
});

test("resolveEffectiveKey: returns apiKey when no connectionId", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveEffectiveKey({
    apiKey: "sk-primary-123",
    providerSpecificData: { extraApiKeys: ["sk-extra-1", "sk-extra-2"] },
  });
  assert.equal(result, "sk-primary-123");
});

test("resolveEffectiveKey: returns accessToken when apiKey is undefined", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveEffectiveKey({
    accessToken: "tok-abc",
  });
  assert.equal(result, undefined);
});

// ---------------------------------------------------------------------------
// buildHeadersPreamble tests
// ---------------------------------------------------------------------------

test("buildHeadersPreamble: includes Content-Type application/json", () => {
  const executor = new TestExecutor();
  const { headers } = executor.publicBuildHeadersPreamble({ apiKey: "key-1" }, true);
  assert.equal(headers["Content-Type"], "application/json");
});

test("buildHeadersPreamble: merges config.headers into result", () => {
  const executor = new TestExecutor({
    headers: { "X-Custom-Header": "custom-value" },
  });
  const { headers } = executor.publicBuildHeadersPreamble({ apiKey: "key-1" }, true);
  assert.equal(headers["X-Custom-Header"], "custom-value");
});

test("buildHeadersPreamble: returns effectiveKey from resolveEffectiveKey", () => {
  const executor = new TestExecutor();
  const { effectiveKey } = executor.publicBuildHeadersPreamble({ apiKey: "sk-abc-123" }, true);
  assert.equal(effectiveKey, "sk-abc-123");
});

test("buildHeadersPreamble: sets User-Agent from provider env var override", () => {
  const envKey = "TEST_PROVIDER_USER_AGENT";
  process.env[envKey] = "custom-agent/1.0";
  try {
    const executor = new TestExecutor({ id: "test-provider" });
    const { headers } = executor.publicBuildHeadersPreamble({ apiKey: "key-1" }, true);
    assert.equal(headers["User-Agent"], "custom-agent/1.0");
  } finally {
    delete process.env[envKey];
  }
});

test("buildHeadersPreamble: does not set User-Agent when env var is empty", () => {
  const envKey = "TEST_PROVIDER_USER_AGENT";
  const saved = process.env[envKey];
  delete process.env[envKey];
  try {
    const executor = new TestExecutor({ id: "test-provider" });
    const { headers } = executor.publicBuildHeadersPreamble({ apiKey: "key-1" }, true);
    assert.equal(headers["User-Agent"], undefined);
  } finally {
    if (saved !== undefined) process.env[envKey] = saved;
  }
});
