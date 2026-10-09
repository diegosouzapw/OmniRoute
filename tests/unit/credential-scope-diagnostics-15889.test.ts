import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

if (typeof mock.module !== "function") {
  test("#15889 all 14 scenarios execute under the standard unit runner", (t) => {
    const env = { ...process.env };
    delete env.NODE_TEST_CONTEXT;
    const child = spawnSync(
      process.execPath,
      [
        "--experimental-test-module-mocks",
        "--import",
        "tsx/esm",
        "--import",
        "./open-sse/utils/setupPolyfill.ts",
        "--import",
        "./tests/_setup/isolateDataDir.ts",
        "--test",
        "--test-reporter=tap",
        "--test-force-exit",
        fileURLToPath(import.meta.url),
      ],
      {
        cwd: fileURLToPath(new URL("../../", import.meta.url)),
        env,
        encoding: "utf8",
        timeout: 300_000,
        maxBuffer: 8 * 1024 * 1024,
      }
    );
    assert.equal(child.status, 0, `${child.error || ""}\n${child.stdout}\n${child.stderr}`);
    assert.match(child.stdout, /# tests 14\b/);
    assert.match(child.stdout, /# pass 14\b/);
    assert.match(child.stdout, /# skipped 0\b/);
    t.diagnostic("Child isolation executed 14 tests: 14 PASS, 0 FAIL, 0 SKIP.");
  });
} else {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15889-"));
  process.env.DATA_DIR = dataDir;
  process.env.API_KEY_SECRET = "synthetic-15889-secret";
  process.env.REQUIRE_API_KEY = "false";
  process.env.DASHBOARD_PASSWORD = "";
  process.env.INITIAL_PASSWORD = "";
  delete process.env.JWT_SECRET;
  const logs: Array<{ message: string; data?: unknown }> = [];
  const capture = (_tag: string, message: string, data?: unknown) => {
    logs.push({ message, data });
  };
  mock.module("../../src/sse/utils/logger.ts", {
    namedExports: {
      debug: capture,
      info: capture,
      warn: capture,
      error: capture,
      request: capture,
    },
  });
  // Neutral-provider pause fixture: exercise the real selection branches without
  // introducing/re-enabling a provider that another session is removing.
  let paused = false;
  const pause = await import("../../open-sse/services/opencodeFreeTierSkip.ts");
  mock.module("../../open-sse/services/opencodeFreeTierSkip.ts", {
    namedExports: {
      ...pause,
      isOpencodeFreeTierSkipped: () => paused,
      getOpencodeFreeTierSkipRemainingMs: () => (paused ? 60_000 : null),
    },
  });
  const core = await import("../../src/lib/db/core.ts");
  const providers = await import("../../src/lib/db/providers.ts");
  const settings = await import("../../src/lib/db/settings.ts");
  const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
  const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");

  async function responseMessage(credentials: unknown) {
    const response = handleNoCredentials(credentials, null, "kilocode", "test-model", null, null);
    assert.equal(response.status, 403);
    return (await response.json()).error.message as string;
  }
  function hasReason(reason: string) {
    return logs.some((entry) => JSON.stringify(entry).includes(`"reason":"${reason}"`));
  }
  test.before(async () => {
    await providers.createProviderConnection({
      provider: "kilocode",
      authType: "apikey",
      apiKey: "private-test-credential-15889",
      isActive: true,
      testStatus: "active",
    });
  });
  test.beforeEach(async () => {
    logs.length = 0;
    paused = false;
    await settings.updateSettings({ noAuthFallbackDisabledProviders: [] });
  });
  test.after(() => {
    core.resetDbInstance();
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  for (const [source, pattern] of [
    ["api_key_allowlist", /API key.*allowlist/i],
    ["api_key_quota", /API key.*quota/i],
    ["combo_pin", /combo.*pin/i],
    ["routing_allowlist", /routing.*allowlist/i],
  ] as const) {
    test(`#15889 blocked pool carries ${source} into the 403`, async () => {
      const options = { connectionRestrictionSources: [source] };
      const result = await getProviderCredentials(
        "kilocode",
        null,
        ["not-the-account"],
        "test-model",
        options
      );
      assert.ok(result && "blockedByKeyPolicy" in result && result.blockedByKeyPolicy);
      assert.ok("connectionRestrictionSources" in result);
      assert.deepEqual(result.connectionRestrictionSources, [source]);
      const message = await responseMessage(result);
      assert.match(message, pattern);
      if (!source.startsWith("api_key")) assert.doesNotMatch(message, /API key/i);
      assert.ok(hasReason("allowlist"), "synthetic fallback must explain the refusal");
    });
  }

  test("#15889 missing provenance does not invent an API key", async () => {
    const result = await getProviderCredentials("kilocode", null, ["unrelated"], "test-model");
    const message = await responseMessage(result);
    assert.doesNotMatch(message, /API key/i);
    assert.match(message, /connection.*policy|routing.*restriction/i);
  });

  for (const allowed of [null, [], ["noauth"]]) {
    test(`#15889 explicit noauth pin retains synthetic access for ${JSON.stringify(allowed)}`, async () => {
      const result = await getProviderCredentials("kilocode", null, allowed, "test-model", {
        forcedConnectionId: "noauth",
      });
      assert.ok(result && "connectionId" in result);
      assert.equal(result.connectionId, "noauth");
    });
  }

  test("#15889 excluded noauth remains denied and logs its reason", async () => {
    const result = await getProviderCredentials("duckduckgo-web", "noauth", null, "test-model");
    assert.equal(result, null);
    assert.ok(hasReason("excluded"));
  });
  test("#15889 disabled anonymous fallback remains denied and logs its reason", async () => {
    await settings.updateSettings({ noAuthFallbackDisabledProviders: ["kilocode"] });
    const result = await getProviderCredentials("kilocode", null, null, "test-model", {
      forcedConnectionId: "noauth",
    });
    assert.equal(result, null);
    assert.ok(hasReason("disabled"));
  });
  test("#15889 a gateway pause remains a null refusal and logs its reason", async () => {
    paused = true;
    const result = await getProviderCredentials("kilocode", null, null, "test-model", {
      forcedConnectionId: "noauth",
    });
    assert.equal(result, null);
    assert.ok(hasReason("paused"));
  });
  test("#15889 a true noauth pause retains the retryable 429 envelope", async () => {
    paused = true;
    const result = await getProviderCredentials("duckduckgo-web", null, null, "test-model");
    assert.ok(result && "allRateLimited" in result && result.allRateLimited);
    assert.equal(result.lastErrorCode, 429);
    assert.ok(hasReason("paused"));
  });
  test("#15889 diagnostic includes a bounded safe allowlist and no credentials", async () => {
    const { connectionRestrictionDiagnostics } =
      await import("../../src/sse/services/credentialSelectionDiagnostics.ts");
    const legacySingleId = connectionRestrictionDiagnostics("legacy-single-connection");
    assert.equal(legacySingleId.allowedConnectionsCount, 1);
    assert.equal(legacySingleId.allowedConnectionRefs?.length, 1);
    assert.match(legacySingleId.allowedConnectionRefs![0], /^hmac-sha256:[0-9a-f]{12}$/);
    assert.doesNotMatch(JSON.stringify(legacySingleId), /legacy-single-connection/);
    const privateId = "private-selection-input-15889\nAuthorization: Bearer never-log-me";
    const result = await getProviderCredentials("kilocode", null, [privateId], "test-model", {
      ...{},
      connectionRestrictionSources: ["combo_pin"],
    });
    assert.ok(result && "blockedByKeyPolicy" in result && result.blockedByKeyPolicy);
    const serialized = JSON.stringify(logs);
    assert.match(serialized, /allowedConnectionRefs/);
    assert.match(serialized, /hmac-sha256:/);
    assert.doesNotMatch(
      serialized,
      /never-log-me|private-test-credential-15889|synthetic-15889-secret/
    );
  });

  test("#15889 real keyless combo preflight identifies its restriction as a combo pin", async () => {
    const combos = await import("../../src/lib/db/combos.ts");
    const { handleChat } = await import("../../src/sse/handlers/chat.ts");
    await combos.createCombo({
      name: "restricted-combo-15889",
      strategy: "priority",
      models: [
        {
          kind: "model",
          providerId: "kilocode",
          model: "kilocode/openrouter/free",
          connectionId: "noauth",
          allowedConnectionIds: ["not-the-account"],
        },
      ],
    });
    const fetchMock = mock.method(globalThis, "fetch", async () => {
      throw new Error("fixture must not dispatch upstream");
    });
    try {
      const response = await handleChat(
        new Request("http://localhost/v1/chat/completions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            model: "restricted-combo-15889",
            messages: [{ role: "user", content: "hello" }],
            stream: false,
          }),
        })
      );
      assert.ok(response.status >= 400);
      assert.equal(fetchMock.mock.callCount(), 0);
      assert.ok(
        logs.some((entry) => JSON.stringify(entry.data ?? {}).includes('"combo_pin"')),
        "the real caller must transport combo provenance"
      );
    } finally {
      fetchMock.mock.restore();
    }
  });
}
