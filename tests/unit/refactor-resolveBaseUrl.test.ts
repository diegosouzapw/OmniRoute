import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import type { ProviderCredentials } from "../../open-sse/executors/base.ts";

/**
 * TestExecutor exposes protected resolveBaseUrl for unit testing.
 */
class TestExecutor extends BaseExecutor {
  constructor(config = {}) {
    super("test-provider", {
      baseUrls: ["https://default.example/v1/chat/completions"],
      ...config,
    });
  }

  /** Public wrapper for the protected method. */
  publicResolveBaseUrl(credentials: ProviderCredentials | null, fallback?: string): string {
    return this.resolveBaseUrl(credentials, fallback);
  }

  async transformRequest(model: string, body: unknown, stream: boolean) {
    return body;
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test("resolveBaseUrl: returns credentials.providerSpecificData.baseUrl when set", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveBaseUrl({
    apiKey: "key-1",
    providerSpecificData: { baseUrl: "https://custom.example/v1/chat/completions" },
  });
  assert.equal(result, "https://custom.example/v1/chat/completions");
});

test("resolveBaseUrl: returns fallback when credentials have no baseUrl", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveBaseUrl(
    { apiKey: "key-1" },
    "https://fallback.example/v1/chat/completions"
  );
  assert.equal(result, "https://fallback.example/v1/chat/completions");
});

test("resolveBaseUrl: returns config.baseUrl when no credentials and no fallback", () => {
  const executor = new TestExecutor({
    baseUrl: "https://config.example/v1/chat/completions",
  });
  const result = executor.publicResolveBaseUrl(null);
  assert.equal(result, "https://config.example/v1/chat/completions");
});

test("resolveBaseUrl: returns empty string when nothing is configured", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveBaseUrl(null);
  assert.equal(result, "");
});

test("resolveBaseUrl: credentials.baseUrl takes precedence over fallback", () => {
  const executor = new TestExecutor();
  const result = executor.publicResolveBaseUrl(
    {
      apiKey: "key-1",
      providerSpecificData: { baseUrl: "https://cred.example/v1" },
    },
    "https://fallback.example/v1"
  );
  assert.equal(result, "https://cred.example/v1");
});

test("resolveBaseUrl: credentials.baseUrl takes precedence over config.baseUrl", () => {
  const executor = new TestExecutor({
    baseUrl: "https://config.example/v1",
  });
  const result = executor.publicResolveBaseUrl({
    apiKey: "key-1",
    providerSpecificData: { baseUrl: "https://cred.example/v1" },
  });
  assert.equal(result, "https://cred.example/v1");
});

test("resolveBaseUrl: fallback takes precedence over config.baseUrl", () => {
  const executor = new TestExecutor({
    baseUrl: "https://config.example/v1",
  });
  const result = executor.publicResolveBaseUrl({ apiKey: "key-1" }, "https://fallback.example/v1");
  assert.equal(result, "https://fallback.example/v1");
});
