import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-state-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_OLLAMA_HOST = process.env.OMNIROUTE_OLLAMA_HOST;

process.env.DATA_DIR = TEST_DATA_DIR;
// Point ollama at a closed port so the /api/ps probe fails fast and the test
// never depends on a live ollama.
process.env.OMNIROUTE_OLLAMA_HOST = "http://127.0.0.1:1";

const core = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");
const callLogs = await import("../../../src/lib/usage/callLogs.ts");
const comboMetrics = await import("../../../open-sse/services/comboMetrics.ts");
const comboAdaptation = await import("../../../src/lib/db/comboAdaptation.ts");
const contextHandoffs = await import("../../../src/lib/db/contextHandoffs.ts");
const comboState = await import("../../../src/lib/usage/comboState.ts");
const { normalizeComboStep } = await import("../../../src/lib/combos/steps.ts");

async function resetStorage() {
  comboMetrics.resetAllComboMetrics();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedStateCombo() {
  const comboInput = {
    name: "combo-state-test",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "ollama-local",
        model: "ollama-local/llama3.1:latest",
        label: "Llama 3.1",
      },
      {
        kind: "model",
        providerId: "ollama-local",
        model: "ollama-local/qwen2.5vl:7b",
        label: "Qwen2.5 VL",
      },
    ],
  };
  const combo = await combosDb.createCombo(comboInput);
  const llamaStep = normalizeComboStep(comboInput.models[0], {
    comboName: comboInput.name,
    index: 0,
  });
  const timestamp = new Date(Date.now() - 60_000).toISOString();

  await callLogs.saveCallLog({
    id: "combo-state-log-1",
    timestamp,
    method: "POST",
    path: "/v1/chat/completions",
    status: 200,
    model: "ollama-local/llama3.1:latest",
    requestedModel: comboInput.name,
    provider: "ollama-local",
    duration: 4599,
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    comboName: comboInput.name,
    comboStepId: llamaStep.id,
    comboExecutionKey: llamaStep.id,
  });

  // Two sessions pinned to llama3.1 → context-cache pinning.
  contextHandoffs.recordSessionModelUsage(
    "sess-a",
    comboInput.name,
    "ollama-local/llama3.1:latest",
    "ollama-local"
  );
  contextHandoffs.recordSessionModelUsage(
    "sess-b",
    comboInput.name,
    "ollama-local/llama3.1:latest",
    "ollama-local"
  );

  // Three consecutive infra failures on qwen2.5vl → 5-minute cooldown + learned drop.
  for (let i = 0; i < 3; i += 1) {
    comboAdaptation.recordComboAdaptationOutcome(comboInput.name, "ollama-local/qwen2.5vl:7b", {
      success: false,
      latencyMs: 500,
    });
  }

  return { combo, comboInput };
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_OLLAMA_HOST === undefined) delete process.env.OMNIROUTE_OLLAMA_HOST;
  else process.env.OMNIROUTE_OLLAMA_HOST = ORIGINAL_OLLAMA_HOST;
});

test("combo state surfaces pinning, cooldown, capability, and events", async () => {
  const { comboInput } = await seedStateCombo();

  const response = await comboState.buildComboStateResponse({
    range: "24h",
    comboName: comboInput.name,
  });

  assert.equal(response.combos.length, 1);
  assert.equal(response.ollamaReachable, false);

  const combo = response.combos[0];
  assert.equal(combo.comboName, "combo-state-test");
  assert.equal(combo.strategy, "priority");
  assert.equal(combo.overview.activeSessions, 2);
  assert.equal(combo.overview.pinnedModel, "ollama-local/llama3.1:latest");
  assert.equal(combo.overview.pinnedSessions, 2);
  assert.equal(combo.overview.totalRequests, 1);
  assert.equal(combo.overview.totalTargets, 2);

  // Pinned → selection method pinned, next fallback is first non-cooldown target.
  assert.equal(combo.selection.method, "pinned");
  assert.equal(combo.selection.pinnedModel, "ollama-local/llama3.1:latest");
  assert.equal(combo.selection.nextFallback, "ollama-local/llama3.1:latest");
  assert.ok(combo.selection.notes.length >= 1);

  const llama = combo.targets.find((target) => target.model.includes("llama3.1"));
  const qwen = combo.targets.find((target) => target.model.includes("qwen2.5vl"));
  assert.ok(llama);
  assert.ok(qwen);

  assert.equal(llama.state, "pinned");
  assert.equal(llama.pinnedSessions, 2);
  assert.equal(llama.warm, false);
  assert.equal(llama.requests, 1);
  assert.equal(llama.successRate, 1);
  assert.equal(llama.lastStatus, "ok");
  assert.equal(llama.capability?.toolCalling, true);
  assert.equal(llama.capability?.contextLength, 98304);

  assert.equal(qwen.state, "cooldown");
  assert.ok(qwen.cooldownRemainingMs !== null && qwen.cooldownRemainingMs > 0);
  assert.ok(qwen.cooldownUntil !== null);
  assert.equal(qwen.consecutiveFailures, 3);
  assert.ok(qwen.learnedScore !== null && qwen.learnedScore < 0.5);
  assert.equal(qwen.capability?.toolCalling, false);
  assert.equal(qwen.capability?.supportsVision, true);
  assert.equal(qwen.capability?.contextLength, 131072);
  assert.ok(qwen.stateReason.includes("cooldown"));

  // Events pulled from call_logs.
  assert.equal(combo.events.length, 1);
  assert.equal(combo.events[0].model, "ollama-local/llama3.1:latest");
  assert.equal(combo.events[0].ok, true);
  assert.equal(combo.events[0].status, 200);
  assert.equal(combo.events[0].durationMs, 4599);
});

test("combo state falls back to priority method when no pins exist", async () => {
  const comboInput = {
    name: "combo-state-nopin",
    strategy: "priority",
    models: [
      {
        kind: "model",
        providerId: "ollama-local",
        model: "ollama-local/mistral-nemo:latest",
        label: "Mistral Nemo",
      },
    ],
  };
  await combosDb.createCombo(comboInput);

  const response = await comboState.buildComboStateResponse({
    range: "24h",
    comboName: comboInput.name,
  });

  assert.equal(response.combos.length, 1);
  const combo = response.combos[0];
  assert.equal(combo.selection.method, "priority");
  assert.equal(combo.selection.pinnedModel, null);
  assert.equal(combo.overview.activeSessions, 0);
  assert.equal(combo.targets[0].state, "idle");
  assert.equal(combo.targets[0].capability?.toolCalling, true);
  assert.equal(combo.targets[0].capability?.contextLength, 65536);
});

test("combo state returns empty when name is unknown", async () => {
  const response = await comboState.buildComboStateResponse({
    range: "24h",
    comboName: "does-not-exist",
  });
  assert.equal(response.combos.length, 0);
});
