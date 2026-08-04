/**
 * Regression for #4435 (port: quota fetch for kimi-coding-apikey).
 *
 * The hidden legacy `kimi-coding-apikey` connection authenticates against Kimi's
 * /usages endpoint with an `x-api-key` header (the same key used for
 * /messages), while the OAuth `kimi-coding` connection keeps the
 * Bearer + X-Msh-* device-header shape. These tests pin that header
 * selection by routing through the exported `getUsageForProvider` switch
 * with a stubbed global fetch (no DB side effects on the kimi path).
 *
 * Also guards the wiring gap caught in review: `kimi-coding-apikey` must be
 * registered in USAGE_SUPPORTED_PROVIDERS (dashboard gate) and
 * USAGE_FETCHER_PROVIDERS (auto-routing preflight), otherwise the feature
 * is unreachable end-to-end.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";

import { getUsageForProvider, USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";

const KIMI_USAGE_URL = "https://api.kimi.com/coding/v1/usages";
const realFetch = globalThis.fetch;
let captured: Array<{ url: string; headers: Record<string, string> }> = [];

before(() => {
  globalThis.fetch = (async (url: unknown, init: { headers?: Record<string, string> } = {}) => {
    captured.push({ url: String(url), headers: { ...(init.headers ?? {}) } });
    return {
      ok: true,
      status: 200,
      text: async () => JSON.stringify({ usage: { limit: "100", used: "10", remaining: "90" } }),
    } as unknown as Response;
  }) as typeof fetch;
});

after(() => {
  globalThis.fetch = realFetch;
});

test("kimi-coding-apikey authenticates with x-api-key (not Bearer)", async () => {
  captured = [];
  await getUsageForProvider({
    id: "c-apikey",
    provider: "kimi-coding-apikey",
    apiKey: "sk-test-123",
  } as Parameters<typeof getUsageForProvider>[0]);

  const call = captured.find((c) => c.url === KIMI_USAGE_URL);
  assert.ok(call, "kimi /usages endpoint should be called for kimi-coding-apikey");
  assert.equal(call.headers["x-api-key"], "sk-test-123");
  assert.equal(call.headers["Authorization"], undefined);
});

test("kimi-coding (OAuth) keeps Bearer + device headers (not x-api-key)", async () => {
  captured = [];
  await getUsageForProvider({
    id: "c-oauth",
    provider: "kimi-coding",
    accessToken: "tok-abc",
    providerSpecificData: {
      deviceId: "123456781234123412341234567890ab",
      deviceName: "test-host",
      deviceModel: "test-model",
      osVersion: "test-os",
    },
  } as Parameters<typeof getUsageForProvider>[0]);

  const call = captured.find((c) => c.url === KIMI_USAGE_URL);
  assert.ok(call, "kimi /usages endpoint should be called for kimi-coding");
  assert.equal(call.headers["Authorization"], "Bearer tok-abc");
  assert.equal(call.headers["X-Msh-Platform"], "kimi_code_cli");
  assert.equal(call.headers["X-Msh-Version"], "0.26.0");
  assert.equal(call.headers["X-Msh-Device-Id"], "12345678-1234-1234-1234-1234567890ab");
  assert.equal(call.headers["User-Agent"], "kimi-code-cli/0.26.0");
  assert.equal(call.headers["x-api-key"], undefined);
});

test("kimi-coding accepts API-key connections under the primary provider id", async () => {
  captured = [];
  await getUsageForProvider({
    id: "c-primary-apikey",
    provider: "kimi-coding",
    apiKey: "sk-primary-test-123",
  } as Parameters<typeof getUsageForProvider>[0]);

  const call = captured.find((c) => c.url === KIMI_USAGE_URL);
  assert.ok(call, "kimi /usages endpoint should be called for the primary provider id");
  assert.equal(call.headers["x-api-key"], "sk-primary-test-123");
  assert.equal(call.headers["Authorization"], undefined);
});

test("kimi-coding-apikey is wired into both usage source-of-truth lists", () => {
  assert.ok(
    USAGE_SUPPORTED_PROVIDERS.includes("kimi-coding-apikey"),
    "must be in USAGE_SUPPORTED_PROVIDERS (else the dashboard gate returns 400)"
  );
  assert.ok(
    (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("kimi-coding-apikey"),
    "must be in USAGE_FETCHER_PROVIDERS (else auto-routing preflight never registers a fetcher)"
  );
});
