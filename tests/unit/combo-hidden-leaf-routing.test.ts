import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-combo-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat, resolveShadowTargets } = await import("../../open-sse/services/combo.ts");
const core = await import("../../src/lib/db/core.ts");
const contextHandoffsDb = await import("../../src/lib/db/contextHandoffs.ts");
const modelsDb = await import("../../src/lib/db/models.ts");

const noop = (..._args: unknown[]) => {};
const log = { info: noop, warn: noop, error: noop, debug: noop };

function okResponse(): Response {
  return Response.json({ choices: [{ message: { content: "ok" } }] });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("handleComboChat never routes hidden leaves in priority, weighted, or round-robin combos", async () => {
  modelsDb.mergeModelCompatOverride("openai", "hidden-combo-leaf", { isHidden: true });

  for (const strategy of ["priority", "weighted", "round-robin"] as const) {
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo: {
        name: `hidden-${strategy}`,
        strategy,
        models: [
          { model: "openai/hidden-combo-leaf", weight: 100 },
          { model: "openai/visible-combo-leaf", weight: 1 },
        ],
        config: { maxRetries: 0, concurrencyPerModel: 1, queueTimeoutMs: 1000 },
      },
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: null,
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["openai/visible-combo-leaf"]);
  }
});

test("handleComboChat preserves explicit providers for custom slashful model ids", async () => {
  modelsDb.mergeModelCompatOverride("nvidia", "vendor/model-x", { isHidden: true });
  const calls: string[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "structured-custom-slashful",
      strategy: "priority",
      models: [
        { model: "vendor/model-x", providerId: "nvidia" },
        { model: "openai/visible-sibling", providerId: "openai" },
      ],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/visible-sibling"]);
});

test("handleComboChat filters hidden leaves through nested flatten and execute modes", async () => {
  modelsDb.mergeModelCompatOverride("openai", "hidden-nested-leaf", { isHidden: true });
  const child = {
    name: "hidden-leaf-child",
    strategy: "priority",
    models: ["openai/hidden-nested-leaf", "openai/visible-nested-leaf"],
  };

  for (const nestedComboMode of ["flatten", "execute"] as const) {
    const calls: string[] = [];
    const parent = {
      name: `hidden-leaf-parent-${nestedComboMode}`,
      strategy: "priority",
      models: [{ kind: "combo-ref", comboName: child.name }],
      config: { nestedComboMode, maxRetries: 0 },
    };
    const result = await handleComboChat({
      body: {},
      combo: parent,
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: [parent, child],
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["openai/visible-nested-leaf"]);
  }
});

test("handleComboChat auto pipeline never dispatches hidden combo leaves", async () => {
  modelsDb.mergeModelCompatOverride("openai", "o3", { isHidden: true });
  const calls: string[] = [];
  const result = await handleComboChat({
    body: {
      messages: [
        {
          role: "user",
          content:
            "Analyze this complex distributed systems failure and produce a rigorous implementation plan with explicit tradeoffs, invariants, edge cases, and verification steps for every stage.",
        },
      ],
    },
    combo: {
      name: "auto/smart",
      strategy: "auto",
      models: ["openai/o3", "openai/gpt-4o-mini"],
      config: {
        pipeline_enabled: true,
        skip_pipeline_for_tokens_under: 0,
        max_reflection_loops: 0,
      },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.ok(calls.length > 0);
  assert.deepEqual(new Set(calls), new Set(["openai/gpt-4o-mini"]));
});

test("handleComboChat drops a context-cache pin when the pinned model becomes hidden", async () => {
  const sessionId = "hidden-pin-session";
  const comboName = "hidden-pin-combo";
  modelsDb.mergeModelCompatOverride("openai", "hidden-pinned-leaf", { isHidden: true });
  contextHandoffsDb.recordSessionModelUsage(
    sessionId,
    comboName,
    "openai/hidden-pinned-leaf",
    "openai"
  );
  const calls: string[] = [];

  const result = await handleComboChat({
    body: { messages: [{ role: "user", content: "continue" }] },
    combo: {
      name: comboName,
      strategy: "priority",
      models: ["openai/hidden-pinned-leaf", "openai/visible-pinned-leaf"],
      context_cache_protection: true,
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: { sessionId },
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/visible-pinned-leaf"]);
});

test("resolveShadowTargets excludes hidden leaves before applying the target limit", () => {
  modelsDb.mergeModelCompatOverride("openai", "hidden-shadow-leaf", { isHidden: true });
  const targets = resolveShadowTargets(
    { name: "hidden-shadow-combo", models: [] },
    {
      shadowRouting: {
        enabled: true,
        targets: ["openai/hidden-shadow-leaf", "openai/visible-shadow-leaf"],
        sampleRate: 1,
        maxTargets: 1,
      },
    },
    null
  );

  assert.deepEqual(
    targets.map((target) => target.modelStr),
    ["openai/visible-shadow-leaf"]
  );
});

test("handleComboChat canonicalizes provider and model aliases before filtering hidden leaves", async () => {
  modelsDb.mergeModelCompatOverride("github", "claude-opus-4-5-20251101", { isHidden: true });
  const calls: string[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "hidden-alias-leaf",
      strategy: "priority",
      models: ["gh/claude-4.5-opus", "openai/visible-alias-sibling"],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/visible-alias-sibling"]);
});

test("handleComboChat preserves an explicit provider for slashful model ids", async () => {
  modelsDb.mergeModelCompatOverride("nvidia", "openai/gpt-oss-120b", { isHidden: true });
  const calls: string[] = [];

  const result = await handleComboChat({
    body: {},
    combo: {
      name: "hidden-structured-leaf",
      strategy: "priority",
      models: [
        { model: "openai/gpt-oss-120b", providerId: "nvidia" },
        { model: "openai/visible-structured-sibling", providerId: "openai" },
      ],
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse();
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    relayOptions: null,
    allCombos: null,
  });

  assert.equal(result.ok, true);
  assert.deepEqual(calls, ["openai/visible-structured-sibling"]);
});

test("handleComboChat reuses one hidden-model snapshot through nested execute mode", async () => {
  modelsDb.mergeModelCompatOverride("openai", "hidden-snapshot-leaf", { isHidden: true });
  const child = {
    name: "hidden-snapshot-child",
    strategy: "priority",
    models: ["openai/hidden-snapshot-leaf", "openai/visible-snapshot-leaf"],
    config: { nestedComboMode: "execute", maxRetries: 0 },
  };
  const parent = {
    name: "hidden-snapshot-parent",
    strategy: "priority",
    models: [{ kind: "combo-ref", comboName: child.name }],
    config: { nestedComboMode: "execute", maxRetries: 0 },
  };
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  let hiddenSnapshotReads = 0;
  db.prepare = (sql: string) => {
    if (sql.includes("namespace IN ('modelCompatOverrides', 'customModels')")) {
      hiddenSnapshotReads += 1;
    }
    return originalPrepare(sql);
  };

  try {
    const calls: string[] = [];
    const result = await handleComboChat({
      body: {},
      combo: parent,
      handleSingleModel: async (_body: unknown, modelStr: string) => {
        calls.push(modelStr);
        return okResponse();
      },
      isModelAvailable: async () => true,
      log,
      settings: null,
      relayOptions: null,
      allCombos: [parent, child],
    });

    assert.equal(result.ok, true);
    assert.deepEqual(calls, ["openai/visible-snapshot-leaf"]);
    assert.equal(hiddenSnapshotReads, 1);
  } finally {
    db.prepare = originalPrepare;
  }
});
