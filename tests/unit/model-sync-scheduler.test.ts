import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const initCloudSync = await import("../../src/lib/initCloudSync.ts");

async function resetStorage() {
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function installTimerStubs() {
  const originalSetTimeout = globalThis.setTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const originalClearTimeout = globalThis.clearTimeout;
  const timeouts = [];
  const intervals = [];

  globalThis.setTimeout = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    timeouts.push(handle);
    return handle;
  };

  globalThis.setInterval = (fn, ms) => {
    const handle = {
      fn,
      ms,
      cleared: false,
      unrefCalled: false,
      unref() {
        this.unrefCalled = true;
        return this;
      },
    };
    intervals.push(handle);
    return handle;
  };

  globalThis.clearTimeout = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  globalThis.clearInterval = (handle) => {
    if (handle) {
      handle.cleared = true;
    }
  };

  return {
    timeouts,
    intervals,
    restore() {
      globalThis.setTimeout = originalSetTimeout;
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
      globalThis.clearTimeout = originalClearTimeout;
    },
  };
}

async function loadScheduler(label) {
  const modulePath = path.join(process.cwd(), "src/shared/services/modelSyncScheduler.ts");
  return import(`${pathToFileURL(modulePath).href}?case=${label}-${Date.now()}`);
}

test.beforeEach(async () => {
  delete process.env.MODEL_SYNC_INTERVAL_HOURS;
  await resetStorage();
});

test.after(async () => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("modelSyncScheduler: internal auth headers validate only for scheduler requests", async () => {
  const {
    buildModelSyncInternalHeaders,
    getModelSyncInternalAuthHeaderName,
    isModelSyncInternalRequest,
  } = await import("../../src/shared/services/modelSyncScheduler.ts");

  const internalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: buildModelSyncInternalHeaders(),
  });
  assert.equal(isModelSyncInternalRequest(internalRequest), true);

  const externalRequest = new Request("http://localhost/api/providers/test/sync-models", {
    method: "POST",
    headers: { [getModelSyncInternalAuthHeaderName()]: "invalid-token" },
  });
  assert.equal(isModelSyncInternalRequest(externalRequest), false);
});

test("initCloudSync: startup initialization also starts model sync scheduler", () => {
  const filePath = path.join(process.cwd(), "src/lib/initCloudSync.ts");
  const source = fs.readFileSync(filePath, "utf8");

  assert.match(source, /startModelSyncScheduler\s*\(/);
});

test("cloud sync bootstrap is wired to server startup, not app layout imports", () => {
  const layoutSource = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf8");
  const instrumentationSource = fs.readFileSync(
    path.join(process.cwd(), "src/instrumentation-node.ts"),
    "utf8"
  );

  assert.doesNotMatch(layoutSource, /initCloudSync/);
  assert.match(instrumentationSource, /ensureCloudSyncInitialized/);
});

test("initCloudSync skips auto initialization during build and test processes unless explicitly re-enabled", () => {
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization({ NEXT_PHASE: "phase-production-build" }, [
      "node",
    ]),
    true
  );
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization({ NODE_ENV: "test" }, ["node", "--test"]),
    true
  );
  assert.equal(
    initCloudSync.shouldSkipCloudSyncInitialization(
      {
        NODE_ENV: "test",
        OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS: "1",
      },
      ["node", "--test"]
    ),
    false
  );
});

test("proxy: internal model sync token is only allowed for provider model sync routes", () => {
  const filePath = path.join(process.cwd(), "src/proxy.ts");
  const source = fs.readFileSync(filePath, "utf8");

  assert.match(source, /isModelSyncInternalRequest/);
  assert.match(source, /sync-models\|models/);
});

test("modelSyncScheduler starts once, honors env interval and syncs only active autoSync connections", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Auto Sync 1",
    apiKey: "sk-auto-1",
    providerSpecificData: { autoSync: true },
  });
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Manual Sync",
    apiKey: "sk-manual",
    providerSpecificData: { autoSync: false },
  });
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "apikey",
    name: "Disabled Auto Sync",
    apiKey: "sk-auto-2",
    isActive: false,
    providerSpecificData: { autoSync: true },
  });

  process.env.MODEL_SYNC_INTERVAL_HOURS = "6";
  const timers = installTimerStubs();
  const fetchCalls = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, options) => {
    fetchCalls.push({ url, options });
    return new Response(JSON.stringify({ syncedModels: 4 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const scheduler = await loadScheduler("active-connections");

    scheduler.startModelSyncScheduler("http://127.0.0.1:7777", 1000);
    scheduler.startModelSyncScheduler("http://127.0.0.1:8888", 9999);

    assert.equal(timers.timeouts.length, 1);
    assert.equal(timers.timeouts[0].ms, 5000);
    assert.equal(timers.timeouts[0].unrefCalled, true);
    assert.equal(timers.intervals.length, 1);
    assert.equal(timers.intervals[0].ms, 6 * 60 * 60 * 1000);
    assert.equal(timers.intervals[0].unrefCalled, true);

    await timers.timeouts[0].fn();

    assert.equal(fetchCalls.length, 1);
    assert.match(fetchCalls[0].url, /\/api\/providers\/.*\/sync-models$/);
    assert.equal(fetchCalls[0].options.method, "POST");
    assert.equal(fetchCalls[0].options.headers["Content-Type"], "application/json");
    assert.equal(
      fetchCalls[0].options.headers[scheduler.getModelSyncInternalAuthHeaderName()],
      scheduler.buildModelSyncInternalHeaders()[scheduler.getModelSyncInternalAuthHeaderName()]
    );

    const lastRun = await scheduler.getLastModelSyncTime();
    assert.match(lastRun, /^\d{4}-\d{2}-\d{2}T/);

    scheduler.stopModelSyncScheduler();
    assert.equal(timers.intervals[0].cleared, true);
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
  }
});

test("modelSyncScheduler skips empty cycles and tolerates failing sync requests", async () => {
  const timers = installTimerStubs();
  const originalFetch = globalThis.fetch;
  const fetchCalls = [];

  globalThis.fetch = async (url) => {
    fetchCalls.push(url);
    return new Response(JSON.stringify({ error: "upstream unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const emptyScheduler = await loadScheduler("empty-cycle");
    emptyScheduler.startModelSyncScheduler("http://127.0.0.1:5555", 10_000);
    await timers.timeouts[0].fn();
    assert.equal(fetchCalls.length, 0);
    assert.equal(await emptyScheduler.getLastModelSyncTime(), null);
    emptyScheduler.stopModelSyncScheduler();

    timers.timeouts.length = 0;
    timers.intervals.length = 0;

    await providersDb.createProviderConnection({
      provider: "gemini",
      authType: "apikey",
      name: "Auto Sync Failure",
      apiKey: "sk-auto-failure",
      providerSpecificData: { autoSync: true },
    });

    const failingScheduler = await loadScheduler("failing-cycle");
    failingScheduler.startModelSyncScheduler("http://127.0.0.1:5555", 10_000);
    await timers.timeouts[0].fn();

    assert.equal(fetchCalls.length, 1);
    assert.match(await failingScheduler.getLastModelSyncTime(), /^\d{4}-\d{2}-\d{2}T/);

    failingScheduler.stopModelSyncScheduler();
  } finally {
    globalThis.fetch = originalFetch;
    timers.restore();
  }
});
