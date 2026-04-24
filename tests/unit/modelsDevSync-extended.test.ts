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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

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
  assert.equal(modelsDev.getModelContextLimit("openai", "gpt-4o"), 128000);
  assert.equal(modelsDev.getModelContextLimit("openai", "missing"), null);

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

  const syncedAt = await waitFor(() => modelsDev.getSyncStatus().lastSync, 300);
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
  await waitFor(() => enabled.getSyncStatus().lastSync, 300);
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
