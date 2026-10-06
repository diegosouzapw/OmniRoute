import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-models-dev-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");

const modulePath = path.join(process.cwd(), "src/lib/modelsDevSync.ts");
const originalFetch = globalThis.fetch;
const originalEnv = { ...process.env };
const loadedModules = new Set();

const MOCK_MODELS_DEV_DATA = {
  openai: {
    id: "openai",
    models: {
      "gpt-4o": {
        id: "gpt-4o",
        name: "GPT-4o",
        family: "gpt-4",
        attachment: true,
        reasoning: false,
        tool_call: true,
        structured_output: true,
        temperature: true,
        knowledge: "2024-10",
        release_date: "2024-05-13",
        last_updated: "2024-10-01",
        open_weights: false,
        cost: {
          input: 2.5,
          output: 10,
          cache_read: 1.25,
          cache_write: 2.5,
        },
        limit: {
          context: 128000,
          input: 128000,
          output: 16384,
        },
        modalities: {
          input: ["text", "image"],
          output: ["text"],
        },
      },
    },
  },
  anthropic: {
    id: "anthropic",
    models: {
      "claude-sonnet-4-20250514": {
        id: "claude-sonnet-4-20250514",
        name: "Claude Sonnet 4",
        tool_call: true,
        reasoning: false,
        attachment: true,
        structured_output: true,
        temperature: true,
        release_date: "2025-05-14",
        last_updated: "2025-05-14",
        open_weights: false,
        cost: {
          input: 3,
          output: 15,
          cache_read: 0.3,
        },
        limit: {
          context: 200000,
          output: 64000,
        },
        modalities: {
          input: ["text", "image"],
          output: ["text"],
        },
      },
    },
  },
};

async function importFresh(label) {
  const mod = await import(
    `${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}-${Math.random()}`
  );
  loadedModules.add(mod);
  return mod;
}

function restoreEnv() {
  for (const key of Object.keys(process.env)) {
    if (!(key in originalEnv)) delete process.env[key];
  }
  Object.assign(process.env, originalEnv);
  process.env.DATA_DIR = TEST_DATA_DIR;
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitFor(predicate, timeoutMs = 200) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const value = predicate();
    if (value) return value;
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return null;
}

function mockFetchWith(body, status = 200, statusText = "OK") {
  globalThis.fetch = async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), {
      status,
      statusText,
      headers: { "content-type": "application/json" },
    });
}

test.beforeEach(async () => {
  resetStorage();
});

test.afterEach(async () => {
  for (const mod of loadedModules) {
    if (typeof (mod as any).stopPeriodicSync === "function") {
      (mod as any).stopPeriodicSync();
    }
  }
  loadedModules.clear();
  globalThis.fetch = originalFetch;
  restoreEnv();
  core.resetDbInstance();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.describe("modelsDevSync-extended", { concurrency: 1 }, async () => {
  test("fetchModelsDev caches successful responses and rejects invalid JSON or non-ok responses", async () => {
    const modelsDev = await importFresh("fetch-cache");
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response(JSON.stringify(MOCK_MODELS_DEV_DATA), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    };

    const first = await modelsDev.fetchModelsDev();
    const second = await modelsDev.fetchModelsDev();

    assert.strictEqual(first, second);
    assert.equal(calls, 1);

    const invalid = await importFresh("fetch-invalid-json");
    mockFetchWith("not-json");
    await assert.rejects(() => invalid.fetchModelsDev(), /invalid JSON/);

    const nonOk = await importFresh("fetch-non-ok");
    mockFetchWith({ error: "boom" }, 503, "Service Unavailable");
    await assert.rejects(() => nonOk.fetchModelsDev(), /models\.dev fetch failed \[503\]/);
  });

  test("modelsDev interval falls back to the default when env values are invalid or non-positive", async () => {
    process.env.MODELS_DEV_SYNC_INTERVAL = "0";
    const zeroInterval = await importFresh("interval-zero");
    zeroInterval.startPeriodicSync();
    assert.equal(zeroInterval.getSyncStatus().intervalMs, 86400 * 1000);
    zeroInterval.stopPeriodicSync();

    process.env.MODELS_DEV_SYNC_INTERVAL = "not-a-number";
    const invalidInterval = await importFresh("interval-invalid");
    invalidInterval.startPeriodicSync();
    assert.equal(invalidInterval.getSyncStatus().intervalMs, 86400 * 1000);
    invalidInterval.stopPeriodicSync();
  });

  test("transform helpers skip incomplete pricing entries and preserve partial capability defaults", async () => {
    const modelsDev = await importFresh("transform-edge-cases");
    const raw = {
      sparse: {
        id: "sparse",
        models: {
          "missing-cost": {
            id: "missing-cost",
            name: "Missing Cost",
          },
          "missing-input": {
            id: "missing-input",
            name: "Missing Input",
            cost: { output: 4.2 },
          },
          complete: {
            id: "complete",
            name: "Complete",
            cost: { input: 1.5 },
            interleaved: { field: "" },
          },
        },
      },
      nomodels: {
        id: "nomodels",
      },
    };

    const pricing = modelsDev.transformModelsDevToPricing(raw);
    assert.deepEqual(pricing.sparse, {
      complete: {
        input: 1.5,
        output: 0,
      },
    });
    assert.equal(pricing.nomodels, undefined);

    const capabilities = modelsDev.transformModelsDevToCapabilities(raw);
    assert.equal(capabilities.sparse.complete.tool_call, null);
    assert.equal(capabilities.sparse.complete.reasoning, null);
    assert.equal(capabilities.sparse.complete.attachment, null);
    assert.equal(capabilities.sparse.complete.structured_output, null);
    assert.equal(capabilities.sparse.complete.temperature, null);
    assert.equal(capabilities.sparse.complete.modalities_input, "[]");
    assert.equal(capabilities.sparse.complete.modalities_output, "[]");
    assert.equal(capabilities.sparse.complete.limit_context, null);
    assert.equal(capabilities.sparse.complete.limit_input, null);
    assert.equal(capabilities.sparse.complete.limit_output, null);
    assert.equal(capabilities.sparse.complete.interleaved_field, null);
    assert.equal(capabilities.nomodels, undefined);
  });

  test("modelsDev pricing helpers persist records, skip corrupted rows, and clear the namespace", async () => {
    const modelsDev = await importFresh("pricing-storage");
    const pricing = modelsDev.transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);

    modelsDev.saveModelsDevPricing(pricing);
    const saved = modelsDev.getModelsDevPricing();
    assert.equal(saved.openai["gpt-4o"].input, 2.5);
    assert.equal(saved.cx["gpt-4o"].cache_creation, 2.5);

    const db = core.getDbInstance();
    db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      "models_dev_pricing",
      "corrupted",
      "{oops"
    );

    const withCorruption = modelsDev.getModelsDevPricing();
    assert.equal(withCorruption.corrupted, undefined);

    modelsDev.clearModelsDevPricing();
    assert.deepEqual(modelsDev.getModelsDevPricing(), {});
  });

  test("getModelsDevPricing memoizes until save/clear (#9685)", async () => {
    const modelsDev = await importFresh("pricing-memo");
    const pricing = modelsDev.transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);
    modelsDev.saveModelsDevPricing(pricing);

    const first = modelsDev.getModelsDevPricing();
    const second = modelsDev.getModelsDevPricing();
    assert.equal(first, second, "repeated reads must return the same memoized object");

    // Mutating DB under the cache must not be visible until invalidation.
    const db = core.getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = 'models_dev_pricing'").run();
    assert.equal(
      modelsDev.getModelsDevPricing(),
      first,
      "raw SQL without save/clear must not bypass the memo"
    );

    modelsDev.clearModelsDevPricing();
    assert.deepEqual(modelsDev.getModelsDevPricing(), {});

    modelsDev.saveModelsDevPricing(pricing);
    const afterSave = modelsDev.getModelsDevPricing();
    assert.notEqual(afterSave, first, "save must invalidate the memo");
    assert.equal(afterSave.openai["gpt-4o"].input, 2.5);

    // Copilot review: DB reset must invalidate the memo so import/restore doesn't serve stale pricing.
    const beforeReset = modelsDev.getModelsDevPricing();
    core.resetDbInstance();
    const afterReset = modelsDev.getModelsDevPricing();
    assert.notEqual(
      afterReset,
      beforeReset,
      "resetDbInstance must invalidate the memo (Copilot #10055)"
    );
    // Data is still on disk after resetDbInstance(), but the cache was cleared and re-read from fresh DB.
    assert.equal(afterReset.openai["gpt-4o"].input, 2.5, "DB reset re-reads from fresh connection");
  });

  test("modelsDev capabilities helpers create the table, persist rows, filter by provider/model, and expose context limits", async () => {
    const modelsDev = await importFresh("capabilities-storage");
    const capabilities = modelsDev.transformModelsDevToCapabilities(MOCK_MODELS_DEV_DATA);

    modelsDev.ensureCapabilitiesTable();
    modelsDev.saveModelsDevCapabilities(capabilities);

    const allCaps = modelsDev.getSyncedCapabilities();
    const openaiOnly = modelsDev.getSyncedCapabilities("openai", "gpt-4o");

    assert.equal(allCaps.openai["gpt-4o"].tool_call, true);
    assert.equal(allCaps.anthropic["claude-sonnet-4-20250514"].attachment, true);
    assert.deepEqual(Object.keys(openaiOnly), ["openai"]);
    assert.equal(openaiOnly.openai["gpt-4o"].limit_context, 128000);
    assert.equal("getModelContextLimit" in modelsDev, false);

    modelsDev.clearModelsDevCapabilities();
    assert.deepEqual(modelsDev.getSyncedCapabilities(), {});
  });

  test("modelsDev capability helpers coerce false/null values and ignore malformed rows", async () => {
    const modelsDev = await importFresh("capabilities-malformed");
    const db = core.getDbInstance();
    const originalPrepare = db.prepare.bind(db);
    db.prepare = (sql) => {
      if (String(sql).includes("SELECT * FROM model_capabilities")) {
        return {
          all: () => [
            123,
            { provider: null, model_id: "missing-provider" },
            {
              provider: "openai",
              model_id: "coerced-model",
              tool_call: 0,
              reasoning: null,
              attachment: 0,
              structured_output: 0,
              temperature: 0,
              modalities_input: null,
              modalities_output: 42,
              knowledge_cutoff: 77,
              release_date: 88,
              last_updated: 99,
              status: 123,
              family: 456,
              open_weights: null,
              limit_context: "bad",
              limit_input: 4096,
              limit_output: "nope",
              interleaved_field: 321,
            },
          ],
        };
      }
      return originalPrepare(sql);
    };

    try {
      const openai = modelsDev.getSyncedCapabilities("openai");
      assert.deepEqual(openai.openai["coerced-model"], {
        tool_call: false,
        reasoning: null,
        attachment: false,
        structured_output: false,
        temperature: false,
        modalities_input: "[]",
        modalities_output: "[]",
        knowledge_cutoff: null,
        release_date: null,
        last_updated: null,
        status: null,
        family: null,
        open_weights: null,
        limit_context: null,
        limit_input: 4096,
        limit_output: null,
        interleaved_field: null,
      });

      const all = modelsDev.getSyncedCapabilities();
      assert.equal(all["7"], undefined);
      assert.equal(all.openai["missing-provider"], undefined);
    } finally {
      db.prepare = originalPrepare;
    }
  });

  test("modelsDev pricing helpers ignore malformed sqlite rows without crashing", async () => {
    const modelsDev = await importFresh("pricing-malformed");
    const db = core.getDbInstance();
    const originalPrepare = db.prepare.bind(db);
    db.prepare = (sql) => {
      if (String(sql).includes("SELECT key, value FROM key_value")) {
        return {
          all: () => [
            123,
            { key: 123, value: JSON.stringify({ ignored: true }) },
            { key: "missing-value", value: 456 },
            { key: "broken", value: "{oops" },
            { key: "openai", value: JSON.stringify({ "gpt-4o": { input: 2.5, output: 10 } }) },
          ],
        };
      }
      return originalPrepare(sql);
    };

    try {
      assert.deepEqual(modelsDev.getModelsDevPricing(), {
        openai: {
          "gpt-4o": {
            input: 2.5,
            output: 10,
          },
        },
      });
    } finally {
      db.prepare = originalPrepare;
    }
  });

  test("saveModelsDevCapabilities round-trips false and null booleans", async () => {
    const modelsDev = await importFresh("capabilities-roundtrip-falsey");
    modelsDev.saveModelsDevCapabilities({
      openai: {
        "gpt-falsey": {
          tool_call: false,
          reasoning: null,
          attachment: false,
          structured_output: false,
          temperature: null,
          modalities_input: "[]",
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: false,
          limit_context: null,
          limit_input: null,
          limit_output: 1024,
          interleaved_field: null,
        },
      },
    });

    assert.deepEqual(modelsDev.getSyncedCapabilities("openai", "gpt-falsey"), {
      openai: {
        "gpt-falsey": {
          tool_call: false,
          reasoning: null,
          attachment: false,
          structured_output: false,
          temperature: null,
          modalities_input: "[]",
          modalities_output: '["text"]',
          knowledge_cutoff: null,
          release_date: null,
          last_updated: null,
          status: null,
          family: null,
          open_weights: false,
          limit_context: null,
          limit_input: null,
          limit_output: 1024,
          interleaved_field: null,
        },
      },
    });
  });

  test("syncModelsDev supports dry-run mode, persistence, capability toggles, and failure reporting", async () => {
    const modelsDev = await importFresh("sync-main");
    mockFetchWith(MOCK_MODELS_DEV_DATA);

    const dryRun = await modelsDev.syncModelsDev({ dryRun: true, syncCapabilities: false });
    assert.equal(dryRun.success, true);
    assert.equal(dryRun.dryRun, true);
    assert.equal(dryRun.capabilityCount, 0);
    assert.ok(dryRun.data.pricing.openai["gpt-4o"]);
    assert.deepEqual(modelsDev.getModelsDevPricing(), {});

    const persisted = await modelsDev.syncModelsDev();
    assert.equal(persisted.success, true);
    assert.equal(persisted.dryRun, false);
    assert.ok(persisted.modelCount > 0);
    assert.ok(modelsDev.getModelsDevPricing().anthropic["claude-sonnet-4-20250514"]);
    assert.ok(modelsDev.getSyncedCapabilities().openai["gpt-4o"]);
    assert.ok(modelsDev.getSyncStatus().lastSync);
    assert.ok(modelsDev.getSyncStatus().lastSyncModelCount > 0);

    const failing = await importFresh("sync-failure");
    globalThis.fetch = async () => {
      throw new Error("network down");
    };
    const failed = await failing.syncModelsDev();
    assert.equal(failed.success, false);
    assert.match(failed.error, /network down/);
  });

  test("syncModelsDev string failures are normalized into an error payload", async () => {
    const modelsDev = await importFresh("sync-string-error");
    globalThis.fetch = async () => {
      throw "hard fail";
    };

    const failed = await modelsDev.syncModelsDev({ dryRun: true });
    assert.equal(failed.success, false);
    assert.equal(failed.error, "hard fail");
    assert.equal(failed.dryRun, true);
  });

  test("syncModelsDev honors abort signals during retry backoff", async () => {
    const modelsDev = await importFresh("sync-abort");
    const warnings = [];
    const originalWarn = console.warn;
    console.warn = (...args) => warnings.push(args.map((arg) => String(arg)).join(" "));
    globalThis.fetch = async () => {
      throw new Error("network down");
    };

    try {
      const controller = new AbortController();
      const pending = modelsDev.syncModelsDev({ signal: controller.signal, maxRetries: 3 });
      const warned = await waitFor(() => warnings.length > 0, 100);
      assert.ok(warned, "expected the first retry warning before aborting");

      controller.abort();
      const aborted = await pending;
      assert.equal(aborted.success, false);
      assert.equal(aborted.error, "aborted");
      assert.equal(warnings.length, 1);
    } finally {
      console.warn = originalWarn;
    }
  });

  test("startPeriodicSync, stopPeriodicSync, getSyncStatus, and initModelsDevSync honor settings and avoid duplicate timers", async () => {
    const modelsDev = await importFresh("periodic-sync");
    mockFetchWith(MOCK_MODELS_DEV_DATA);

    modelsDev.startPeriodicSync(25);
    const started = modelsDev.getSyncStatus();
    assert.equal(started.enabled, true);
    assert.equal(started.intervalMs, 25);

    modelsDev.startPeriodicSync(99);
    assert.equal(modelsDev.getSyncStatus().intervalMs, 25);

    const syncedAt = await waitFor(() => modelsDev.getSyncStatus().lastSync, 2000);
    assert.ok(syncedAt, "expected initial periodic sync to complete");
    assert.ok(modelsDev.getSyncStatus().nextSync);

    modelsDev.stopPeriodicSync();
    const stopped = modelsDev.getSyncStatus();
    assert.equal(stopped.enabled, false);
    assert.equal(stopped.nextSync, null);

    await settingsDb.updateSettings({
      modelsDevSyncEnabled: false,
      modelsDevSyncInterval: 15,
    });
    const disabled = await importFresh("init-disabled");
    await disabled.initModelsDevSync();
    assert.equal(disabled.getSyncStatus().enabled, false);

    await settingsDb.updateSettings({
      modelsDevSyncEnabled: true,
      modelsDevSyncInterval: 15,
    });
    const enabled = await importFresh("init-enabled");
    mockFetchWith(MOCK_MODELS_DEV_DATA);
    await enabled.initModelsDevSync();
    assert.equal(enabled.getSyncStatus().enabled, true);
    assert.equal(enabled.getSyncStatus().intervalMs, 15);
    await waitFor(() => enabled.getSyncStatus().lastSync, 2000);
  });

  test("stopPeriodicSync aborts the in-flight initial sync", async () => {
    const modelsDev = await importFresh("periodic-stop-abort");
    let aborted = false;

    globalThis.fetch = async (_url, init) =>
      await new Promise((_resolve, reject) => {
        const signal = init?.signal;
        const onAbort = () => {
          aborted = true;
          const error = new Error("aborted");
          error.name = "AbortError";
          reject(error);
        };

        signal?.addEventListener("abort", onAbort, { once: true });
      });

    modelsDev.startPeriodicSync(25);
    await waitFor(() => modelsDev.getSyncStatus().enabled, 50);
    modelsDev.stopPeriodicSync();

    const stopped = await waitFor(() => aborted, 200);
    assert.equal(stopped, true);
    assert.equal(modelsDev.getSyncStatus().enabled, false);
    assert.equal(modelsDev.getSyncStatus().lastSync, null);
  });
});

// MODELS_DEV_SYNC_ENABLED was named in this module's header comment for a long
// time without ever being read, so the only real switch was a row in the
// database. A container rebuilt from a fresh volume therefore came up with the
// sync off no matter what the deployment intended.

test("MODELS_DEV_SYNC_ENABLED=true starts the sync even with the setting off", async () => {
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  await settingsDb.updateSettings({
    modelsDevSyncEnabled: false,
    modelsDevSyncInterval: 15,
  });

  process.env.MODELS_DEV_SYNC_ENABLED = "true";
  const modelsDev = await importFresh("init-env-on");
  mockFetchWith(MOCK_MODELS_DEV_DATA);
  try {
    await modelsDev.initModelsDevSync();
    assert.equal(modelsDev.getSyncStatus().enabled, true);
    // `enabled` alone would also be true for a sync that started and then
    // never fetched anything, so pin the fetch actually having run. Assert
    // the result, not just await it -- waitFor returns null on timeout, and
    // an unasserted timeout is indistinguishable from success.
    assert.ok(
      await waitFor(() => modelsDev.getSyncStatus().lastSync !== null),
      "expected the initial sync to complete and set lastSync"
    );
  } finally {
    modelsDev.stopPeriodicSync();
    if (previous === undefined) delete process.env.MODELS_DEV_SYNC_ENABLED;
    else process.env.MODELS_DEV_SYNC_ENABLED = previous;
  }
});

test("the stored setting still starts the sync with no env var present", async () => {
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  delete process.env.MODELS_DEV_SYNC_ENABLED;
  await settingsDb.updateSettings({
    modelsDevSyncEnabled: true,
    modelsDevSyncInterval: 15,
  });

  const modelsDev = await importFresh("init-setting-only");
  mockFetchWith(MOCK_MODELS_DEV_DATA);
  try {
    // Without this the test would still pass if the variable were set to
    // "true", crediting the setting for what the env var did.
    assert.equal(process.env.MODELS_DEV_SYNC_ENABLED, undefined);
    await modelsDev.initModelsDevSync();
    assert.equal(modelsDev.getSyncStatus().enabled, true);
    assert.ok(
      await waitFor(() => modelsDev.getSyncStatus().lastSync !== null),
      "expected the initial sync to complete and set lastSync"
    );
  } finally {
    modelsDev.stopPeriodicSync();
    if (previous !== undefined) process.env.MODELS_DEV_SYNC_ENABLED = previous;
  }
});

test("the usual truthy spellings all start the sync, and nothing else does", async () => {
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  await settingsDb.updateSettings({
    modelsDevSyncEnabled: false,
    modelsDevSyncInterval: 15,
  });

  // A compose file or unit file is as likely to carry "1" as "true", so all
  // four spellings work, in any casing and with stray whitespace. Everything
  // else leaves the sync off rather than guessing at intent.
  const cases: Array<[string, boolean]> = [
    ["true", true],
    ["TRUE", true],
    ["True", true],
    ["  true  ", true],
    ["1", true],
    ["yes", true],
    ["on", true],
    ["ON", true],
    ["false", false],
    ["0", false],
    ["no", false],
    ["off", false],
    ["", false],
    ["truthy", false],
  ];

  try {
    for (const [index, [value, expected]] of cases.entries()) {
      process.env.MODELS_DEV_SYNC_ENABLED = value;
      // The label becomes a cache-busting URL suffix, so it has to stay
      // URL-safe; the values themselves carry quotes and whitespace.
      const modelsDev = await importFresh(`init-env-case-${index}`);
      if (expected) mockFetchWith(MOCK_MODELS_DEV_DATA);
      await modelsDev.initModelsDevSync();
      assert.equal(
        modelsDev.getSyncStatus().enabled,
        expected,
        `MODELS_DEV_SYNC_ENABLED=${JSON.stringify(value)} should ${expected ? "" : "not "}enable the sync`
      );
      if (expected) {
        // `enabled` alone would also be true for a sync that started and
        // then never fetched anything; pin the fetch actually having run
        // for each truthy spelling, not just the first one.
        assert.ok(
          await waitFor(() => modelsDev.getSyncStatus().lastSync !== null, 2000),
          `MODELS_DEV_SYNC_ENABLED=${JSON.stringify(value)} should have completed a sync`
        );
      }
      modelsDev.stopPeriodicSync();
    }
  } finally {
    if (previous === undefined) delete process.env.MODELS_DEV_SYNC_ENABLED;
    else process.env.MODELS_DEV_SYNC_ENABLED = previous;
  }
});

test("MODELS_DEV_SYNC_ENABLED=false turns the sync off despite a stored setting of true", async () => {
  // The direction that costs an operator real time if it is wrong: they put
  // the variable in their compose file expecting a master switch, and the
  // sync keeps running because the dashboard toggle is still on. An explicit
  // env value decides in either direction; only an unset one defers.
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  await settingsDb.updateSettings({
    modelsDevSyncEnabled: true,
    modelsDevSyncInterval: 15,
  });

  process.env.MODELS_DEV_SYNC_ENABLED = "false";
  const modelsDev = await importFresh("init-env-false-setting-true");
  mockFetchWith(MOCK_MODELS_DEV_DATA);
  try {
    await modelsDev.initModelsDevSync();
    assert.equal(
      modelsDev.getSyncStatus().enabled,
      false,
      "MODELS_DEV_SYNC_ENABLED=false should disable the sync even with the setting on"
    );
    assert.equal(
      modelsDev.getSyncStatus().lastSync,
      null,
      "a disabled sync must not have fetched anything"
    );
  } finally {
    modelsDev.stopPeriodicSync();
    if (previous === undefined) delete process.env.MODELS_DEV_SYNC_ENABLED;
    else process.env.MODELS_DEV_SYNC_ENABLED = previous;
  }
});

test("an unset MODELS_DEV_SYNC_ENABLED still defers to a stored setting of true", async () => {
  // The counterpart: without this one, the test above would also pass if the
  // env var had simply become a hard off switch and the dashboard toggle had
  // stopped working entirely.
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  delete process.env.MODELS_DEV_SYNC_ENABLED;
  await settingsDb.updateSettings({
    modelsDevSyncEnabled: true,
    modelsDevSyncInterval: 15,
  });

  const modelsDev = await importFresh("init-env-unset-setting-true");
  mockFetchWith(MOCK_MODELS_DEV_DATA);
  try {
    await modelsDev.initModelsDevSync();
    assert.equal(
      modelsDev.getSyncStatus().enabled,
      true,
      "an unset env var should leave the stored setting in charge"
    );
    assert.ok(
      await waitFor(() => modelsDev.getSyncStatus().lastSync !== null),
      "expected the initial sync to complete and set lastSync"
    );
  } finally {
    modelsDev.stopPeriodicSync();
    if (previous === undefined) delete process.env.MODELS_DEV_SYNC_ENABLED;
    else process.env.MODELS_DEV_SYNC_ENABLED = previous;
  }
});

test("MODELS_DEV_SYNC_ENABLED=0 is a hard kill switch that wins over the setting", async () => {
  const previous = process.env.MODELS_DEV_SYNC_ENABLED;
  process.env.MODELS_DEV_SYNC_ENABLED = "0";
  try {
    const modelsDev = await importFresh("env-kill-switch-0");
    mockFetchWith(MOCK_MODELS_DEV_DATA);

    const pricing = modelsDev.transformModelsDevToPricing(MOCK_MODELS_DEV_DATA);
    modelsDev.saveModelsDevPricing(pricing);
    assert.deepEqual(
      modelsDev.getModelsDevPricing(),
      {},
      "kill switch skips the SQL/JSON pricing scan entirely"
    );

    await settingsDb.updateSettings({
      modelsDevSyncEnabled: true,
      modelsDevSyncInterval: 15,
    });
    await modelsDev.initModelsDevSync();
    assert.equal(
      modelsDev.getSyncStatus().enabled,
      false,
      "kill switch must prevent the periodic sync even when the setting is on"
    );

    assert.equal(modelsDev.readModelsDevSyncEnvFlag("0"), "false");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag("false"), "false");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag("off"), "false");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag("no"), "false");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag(""), "unset");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag("maybe"), "unset");
    assert.equal(modelsDev.readModelsDevSyncEnvFlag("1"), "true");
  } finally {
    if (previous === undefined) delete process.env.MODELS_DEV_SYNC_ENABLED;
    else process.env.MODELS_DEV_SYNC_ENABLED = previous;
    await settingsDb.updateSettings({
      modelsDevSyncEnabled: false,
      modelsDevSyncInterval: 15,
    });
  }
});
