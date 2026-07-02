import test from "node:test";
import assert from "node:assert/strict";

import {
  promoteModelToFront,
  comboStepModelId,
  promoteSuccessfulComboModel,
} from "@/lib/combos/autoPromote";

function makeCombo() {
  return {
    id: "combo-1",
    name: "my-combo",
    models: [
      { kind: "model", model: "a/1", weight: 1 },
      { kind: "model", model: "b/2", weight: 1 },
    ],
  };
}

test("comboStepModelId extracts model id from ComboStep object", () => {
  assert.equal(comboStepModelId({ kind: "model", model: "openai/gpt-4o" }), "openai/gpt-4o");
});

test("comboStepModelId extracts model id from bare string", () => {
  assert.equal(comboStepModelId("anthropic/claude-3"), "anthropic/claude-3");
});

test("comboStepModelId returns null for empty/invalid entries", () => {
  assert.equal(comboStepModelId(""), null);
  assert.equal(comboStepModelId("   "), null);
  assert.equal(comboStepModelId({ kind: "combo-ref", comboName: "x" }), null);
  assert.equal(comboStepModelId(null), null);
  assert.equal(comboStepModelId(42), null);
});

test("promoteModelToFront moves the winning ComboStep to position #1", () => {
  const models = [
    { kind: "model", model: "a/1", weight: 1 },
    { kind: "model", model: "b/2", weight: 1 },
    { kind: "model", model: "c/3", weight: 1 },
  ];
  const result = promoteModelToFront(models, "b/2");
  assert.deepEqual(result, [
    { kind: "model", model: "b/2", weight: 1 },
    { kind: "model", model: "a/1", weight: 1 },
    { kind: "model", model: "c/3", weight: 1 },
  ]);
});

test("promoteModelToFront preserves order of the remaining models", () => {
  const result = promoteModelToFront(["a", "b", "c", "d"], "d");
  assert.deepEqual(result, ["d", "a", "b", "c"]);
});

test("promoteModelToFront does not mutate the input array or entries", () => {
  const step = { kind: "model", model: "b/2", weight: 1 };
  const models = [{ kind: "model", model: "a/1", weight: 1 }, step];
  const snapshot = JSON.parse(JSON.stringify(models));
  promoteModelToFront(models, "b/2");
  assert.deepEqual(models, snapshot);
  assert.equal(models[1], step); // same reference, untouched
});

test("promoteModelToFront returns null when winner is already first", () => {
  assert.equal(promoteModelToFront(["a", "b", "c"], "a"), null);
});

test("promoteModelToFront returns null when winner is absent from the combo", () => {
  assert.equal(promoteModelToFront(["a", "b"], "z"), null);
});

test("promoteModelToFront returns null for empty / missing inputs", () => {
  assert.equal(promoteModelToFront([], "a"), null);
  assert.equal(promoteModelToFront(null, "a"), null);
  assert.equal(promoteModelToFront(undefined, "a"), null);
  assert.equal(promoteModelToFront(["a", "b"], ""), null);
  assert.equal(promoteModelToFront(["a", "b"], null), null);
});

test("promoteSuccessfulComboModel persists the reordered combo when flag is on", async () => {
  const calls: Array<{ id: string; data: { models: unknown[] } }> = [];
  const ok = await promoteSuccessfulComboModel(
    makeCombo(),
    "b/2",
    { comboAutoPromoteEnabled: true },
    {
      updateCombo: async (id, data) => {
        calls.push({ id, data });
        return data;
      },
    }
  );
  assert.equal(ok, true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].id, "combo-1");
  assert.deepEqual(
    (calls[0].data.models as Array<{ model: string }>).map((m) => m.model),
    ["b/2", "a/1"]
  );
});

test("promoteSuccessfulComboModel is a no-op when the flag is off", async () => {
  let called = false;
  const ok = await promoteSuccessfulComboModel(
    makeCombo(),
    "b/2",
    { comboAutoPromoteEnabled: false },
    {
      updateCombo: async (id, data) => {
        called = true;
        return data;
      },
    }
  );
  assert.equal(ok, false);
  assert.equal(called, false);
});

test("promoteSuccessfulComboModel is a no-op when the winner is already first", async () => {
  let called = false;
  const ok = await promoteSuccessfulComboModel(
    makeCombo(),
    "a/1",
    { comboAutoPromoteEnabled: true },
    {
      updateCombo: async (id, data) => {
        called = true;
        return data;
      },
    }
  );
  assert.equal(ok, false);
  assert.equal(called, false);
});

test("promoteSuccessfulComboModel swallows DB errors and never throws", async () => {
  let warned = "";
  const ok = await promoteSuccessfulComboModel(
    makeCombo(),
    "b/2",
    { comboAutoPromoteEnabled: true },
    {
      updateCombo: async () => {
        throw new Error("db is down");
      },
      warn: (_tag, msg) => {
        warned = msg;
      },
    }
  );
  assert.equal(ok, false);
  assert.match(warned, /Failed to promote/);
});
