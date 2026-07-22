/**
 * Regression tests for #7645 — CLIProxyAPI fallback/passthrough legs reused
 * the failed native provider's own credential as the Authorization header
 * sent to CLIProxyAPI, which requires its own dedicated `api-keys:`
 * credential and rejects any other token with 401 — a permanent no-op for
 * every provider configured with `mode: "fallback"` or `mode: "cliproxyapi"`.
 *
 * All tests exercise REAL production functions end-to-end:
 *   - updateSettings / getSettings (src/lib/db/settings.ts)
 *   - upsertUpstreamProxyConfig (src/lib/db/upstreamProxy.ts)
 *   - resolveExecutorWithProxy (open-sse/handlers/chatCore/executorProxy.ts)
 *   - CliproxyapiExecutor.execute (open-sse/executors/cliproxyapi.ts)
 * `globalThis.fetch` is stubbed only to capture the outbound wire headers,
 * distinguishing the native-provider host from the CLIProxyAPI host
 * (127.0.0.1:8317).
 */

import { describe, it, before, after, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-7645-cpa-cred-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { resolveExecutorWithProxy } = await import(
  "../../open-sse/handlers/chatCore/executorProxy.ts"
);
const { clearUpstreamProxyConfigCache } = await import(
  "../../open-sse/handlers/chatCore/comboContextCache.ts"
);
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

const NATIVE_KEY = "sk-native-provider-key-cliproxyapi-must-not-see";
const DEDICATED_KEY = "cpa-dedicated-key-configured-by-operator";

before(async () => {
  await coreDb.ensureDbInitialized();
});

afterEach(async () => {
  clearUpstreamProxyConfigCache();
  const { dbCache } = await import("../../src/lib/db/readCache.ts");
  dbCache?.invalidate?.("settings");
});

after(() => {
  coreDb.resetDbInstance();
  if (fs.existsSync(testDataDir)) fs.rmSync(testDataDir, { recursive: true, force: true });
});

type ExecuteInput = {
  model: string;
  body: unknown;
  stream: boolean;
  credentials: unknown;
};

type ExecutorLike = { execute: (input: ExecuteInput) => Promise<unknown> };

/**
 * Stubs fetch so calls to CLIProxyAPI's host (127.0.0.1:8317) are captured
 * (headers + succeed with 200), while calls to any other host throw a
 * simulated native-provider network failure — driving the "fallback" retry
 * leg for real.
 */
async function withCapturedCliproxyapiRequest(
  fn: () => Promise<unknown>
): Promise<{ headers: Record<string, string>; called: boolean }> {
  let capturedHeaders: Record<string, string> | null = null;
  const originalFetch = globalThis.fetch;
  // @ts-expect-error test stub
  globalThis.fetch = async (url: string, init: RequestInit) => {
    if (String(url).includes("8317")) {
      capturedHeaders = init.headers as Record<string, string>;
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error("simulated native provider network failure");
  };
  try {
    await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { headers: capturedHeaders ?? {}, called: capturedHeaders !== null };
}

describe("#7645 — settingsSchemas has a dedicated cliproxyapi_api_key field", () => {
  it("updateSettingsSchema accepts cliproxyapi_api_key", () => {
    const shape = (updateSettingsSchema as unknown as { shape: Record<string, unknown> }).shape;
    assert.equal(
      Object.prototype.hasOwnProperty.call(shape, "cliproxyapi_api_key"),
      true,
      "settingsSchemas.ts must define a dedicated cliproxyapi_api_key field"
    );
  });
});

describe("#7645 — CLIProxyAPI fallback leg authenticates with the dedicated key", () => {
  it("uses the dedicated cliproxyapi_api_key, not the failed native provider's own credential", async () => {
    await settingsDb.updateSettings({ cliproxyapi_api_key: DEDICATED_KEY });
    await upstreamProxyDb.upsertUpstreamProxyConfig({
      providerId: "openai-7645-fallback",
      mode: "fallback",
      enabled: true,
    });

    const executor = await resolveExecutorWithProxy("openai-7645-fallback", undefined, null);

    const { headers, called } = await withCapturedCliproxyapiRequest(() =>
      (executor as ExecutorLike).execute({
        model: "gpt-4",
        body: { model: "gpt-4", messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: NATIVE_KEY },
      })
    );

    assert.equal(called, true, "the CLIProxyAPI retry leg must have been invoked");
    assert.equal(
      headers.Authorization,
      `Bearer ${DEDICATED_KEY}`,
      "CLIProxyAPI fallback leg must authenticate with the dedicated key"
    );
    assert.notEqual(
      headers.Authorization,
      `Bearer ${NATIVE_KEY}`,
      "CLIProxyAPI fallback leg must not reuse the failed native provider's own credential"
    );
  });

  it("direct cliproxyapi passthrough mode also uses the dedicated key", async () => {
    await settingsDb.updateSettings({ cliproxyapi_api_key: DEDICATED_KEY });
    await upstreamProxyDb.upsertUpstreamProxyConfig({
      providerId: "anthropic-7645-passthrough",
      mode: "cliproxyapi",
      enabled: true,
    });

    const executor = await resolveExecutorWithProxy("anthropic-7645-passthrough", undefined, null);

    const { headers, called } = await withCapturedCliproxyapiRequest(() =>
      (executor as ExecutorLike).execute({
        model: "claude-3-opus",
        body: { model: "claude-3-opus", messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: NATIVE_KEY },
      })
    );

    assert.equal(called, true, "the CLIProxyAPI passthrough leg must have been invoked");
    assert.equal(
      headers.Authorization,
      `Bearer ${DEDICATED_KEY}`,
      "CLIProxyAPI passthrough mode must authenticate with the dedicated key"
    );
  });

  it("falls back to the connection's own credential when no dedicated key is configured (no regression)", async () => {
    await settingsDb.updateSettings({ cliproxyapi_api_key: "" });
    await upstreamProxyDb.upsertUpstreamProxyConfig({
      providerId: "anthropic-7645-no-dedicated-key",
      mode: "cliproxyapi",
      enabled: true,
    });

    const executor = await resolveExecutorWithProxy(
      "anthropic-7645-no-dedicated-key",
      undefined,
      null
    );

    const { headers, called } = await withCapturedCliproxyapiRequest(() =>
      (executor as ExecutorLike).execute({
        model: "claude-3-opus",
        body: { model: "claude-3-opus", messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: { apiKey: NATIVE_KEY },
      })
    );

    assert.equal(called, true);
    assert.equal(
      headers.Authorization,
      `Bearer ${NATIVE_KEY}`,
      "with no dedicated key configured, the pre-existing (workaround) behavior must be preserved"
    );
  });
});
