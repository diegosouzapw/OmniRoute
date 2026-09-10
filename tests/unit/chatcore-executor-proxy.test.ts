// tests/unit/chatcore-executor-proxy.test.ts
// Characterization of resolveExecutorWithProxy — the upstream-proxy executor resolver extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Exercises the REAL config path through a
// temp DB: disabled/native → the provider's own executor; cliproxyapi → the passthrough executor;
// fallback → a distinct wrapper that owns its own execute(). The wrapper's retry behaviour is not
// invoked here (it would hit the network); the existing cliproxyapi-fallback-wiring.test.ts covers
// the surrounding wiring.
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-executor-proxy-test-"));
process.env.DATA_DIR = testDataDir;

// Dynamic imports AFTER DATA_DIR is set so core.ts picks up the temp path.
const coreDb = await import("../../src/lib/db/core.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { resolveExecutorWithProxy } =
  await import("../../open-sse/handlers/chatCore/executorProxy.ts");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { clearUpstreamProxyConfigCache } =
  await import("../../open-sse/handlers/chatCore/comboContextCache.ts");

before(async () => {
  await coreDb.ensureDbInitialized();
});

beforeEach(() => {
  clearUpstreamProxyConfigCache();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("no config (disabled by default) returns the provider's own executor", async () => {
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.equal(exec, await getExecutor("openai"));
});

test("mode 'native' returns the provider's own executor", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "native",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.equal(exec, await getExecutor("openai"));
});

test("mode 'cliproxyapi' returns the CLIProxyAPI passthrough executor", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "anthropic",
    mode: "cliproxyapi",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("anthropic");
  const exec = await resolveExecutorWithProxy("anthropic");
  assert.equal(exec, await getExecutor("cliproxyapi"));
});

test("mode 'fallback' returns a distinct wrapper owning its own execute()", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.notEqual(exec, await getExecutor("openai"));
  assert.notEqual(exec, await getExecutor("cliproxyapi"));
  assert.equal(typeof exec.execute, "function");
});

// === Per-connection routing override (#6339) ===
// The resolved connection's providerSpecificData.cliproxyapiMode === "claude-native"
// opts THIS connection into the CLIProxyAPI executor regardless of the provider-level
// upstream_proxy_config mode. Precedence: connection override > provider mode > default.

test("connection override 'claude-native' selects CLIProxyAPI even when provider mode is native", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "native",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai", undefined, {
    cliproxyapiMode: "claude-native",
  });
  assert.equal(exec, await getExecutor("cliproxyapi"));
});

test("connection override 'claude-native' selects CLIProxyAPI even with no provider config (default)", async () => {
  clearUpstreamProxyConfigCache("anthropic");
  const exec = await resolveExecutorWithProxy("anthropic", undefined, {
    cliproxyapiMode: "claude-native",
  });
  assert.equal(exec, await getExecutor("cliproxyapi"));
});

test("no connection override + provider mode native → native executor (unchanged)", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "native",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai", undefined, {
    someOtherField: "x",
  });
  assert.equal(exec, await getExecutor("openai"));
});

test("connection override absent (undefined providerSpecificData) preserves default behaviour", async () => {
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.equal(exec, await getExecutor("openai"));
});

test("connection override wins over provider mode 'fallback'", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai", undefined, {
    cliproxyapiMode: "claude-native",
  });
  // Connection override short-circuits to the passthrough executor, not the fallback wrapper.
  assert.equal(exec, await getExecutor("cliproxyapi"));
});

test("connection proxy overrides cannot bypass Microsoft Designer retirement", async () => {
  for (const providerId of ["microsoft-designer-web", "  MSDESIGNER\t"]) {
    for (const providerSpecificData of [
      { cliproxyapiMode: "claude-native" },
      { darioMode: "claude-native" },
    ]) {
      await assert.rejects(
        () => resolveExecutorWithProxy(providerId, undefined, providerSpecificData),
        (error: unknown) => {
          assert.ok(error instanceof Error);
          assert.equal((error as Error & { status?: number }).status, 410);
          assert.equal(error.message, "Provider has been retired from OmniRoute runtime.");
          return true;
        }
      );
    }
  }
});

test("retired Felo ids cannot bypass the tombstone through a connection proxy", async () => {
  for (const providerId of ["felo-web", "felo", " FeLo-Web ", "\tFELO\n"]) {
    await assert.rejects(
      resolveExecutorWithProxy(providerId, undefined, {
        cliproxyapiMode: "claude-native",
      }),
      (error: unknown) => {
        const typed = error as Error & { code?: string; status?: number };
        assert.equal(typed.code, "PROVIDER_RETIRED");
        assert.equal(typed.status, 410);
        assert.match(typed.message, /retired/i);
        return true;
      }
    );
  }

  const openAi = await resolveExecutorWithProxy("openai", undefined, {
    cliproxyapiMode: "claude-native",
  });
  assert.equal(openAi, await getExecutor("cliproxyapi"));
});

test("retired Qwen Web ids cannot bypass the tombstone through a connection proxy", async () => {
  for (const providerId of ["qwen-web", "qw", " QwEn-WeB ", "\tQW\n"]) {
    await assert.rejects(
      resolveExecutorWithProxy(providerId, undefined, {
        cliproxyapiMode: "claude-native",
      }),
      (error: unknown) => {
        const typed = error as Error & { code?: string; status?: number };
        assert.equal(typed.code, "PROVIDER_RETIRED");
        assert.equal(typed.status, 410);
        assert.match(typed.message, /retired/i);
        return true;
      }
    );
  }

  const qwenCloud = await resolveExecutorWithProxy("qwen-cloud", undefined, {
    cliproxyapiMode: "claude-native",
  });
  assert.equal(qwenCloud, await getExecutor("cliproxyapi"));
});

test("retired common ChatGPT Web alias cannot bypass retirement through proxy overrides", async () => {
  for (const providerId of ["cgpt-web"]) {
    await assert.rejects(
      () =>
        resolveExecutorWithProxy(providerId, undefined, {
          cliproxyapiMode: "claude-native",
        }),
      (error: unknown) => {
        const typed = error as Error & { code?: string; status?: number };
        assert.equal(typed.code, "PROVIDER_RETIRED");
        assert.equal(typed.status, 410);
        return true;
      }
    );
  }
});
