import test from "node:test";
import assert from "node:assert/strict";
import {
  pickDefaultModel,
  resolveModelFilterKey,
} from "../../src/app/(dashboard)/dashboard/playground/components/modelSelection.ts";

// Regression guards for #3731 (dup #3009): the Playground model selector was unusable
// for custom OpenAI-compatible providers.

test("resolveModelFilterKey: built-in provider filters by its id", () => {
  assert.equal(resolveModelFilterKey("openai", undefined, false), "openai");
  assert.equal(resolveModelFilterKey("anthropic", undefined, false), "anthropic");
});

test("resolveModelFilterKey: compatible provider WITH a resolved prefix filters by the prefix", () => {
  assert.equal(resolveModelFilterKey("openai-compatible-abc123", "myco", true), "myco");
});

test("resolveModelFilterKey: compatible provider WITHOUT a prefix shows the full catalog (#3731)", () => {
  // Defect A: the old logic returned the raw connection id, which matches nothing in the
  // catalog and emptied the selector. It must return undefined (full catalog) instead.
  const key = resolveModelFilterKey("openai-compatible-abc123", undefined, true);
  assert.equal(key, undefined);
  assert.notEqual(key, "openai-compatible-abc123");
});

test("resolveModelFilterKey: empty provider yields undefined", () => {
  assert.equal(resolveModelFilterKey("", undefined, false), undefined);
});

test("pickDefaultModel: empty list selects nothing", () => {
  assert.equal(pickDefaultModel("", []), null);
  assert.equal(pickDefaultModel("gpt-4o", []), null);
});

test("pickDefaultModel: empty current model auto-selects the first model (#3731)", () => {
  // Defect B: provider change reset the model to "" and nothing picked a default, so the
  // chat failed with "Set a model". The first available model must be auto-selected.
  assert.equal(pickDefaultModel("", ["myco/gpt-4o", "myco/gpt-4o-mini"]), "myco/gpt-4o");
  assert.equal(pickDefaultModel(undefined, ["a", "b"]), "a");
});

test("pickDefaultModel: a current model not in the list is replaced by the first", () => {
  assert.equal(pickDefaultModel("stale/model", ["a", "b"]), "a");
});

test("pickDefaultModel: a valid current model is kept (no redundant update)", () => {
  assert.equal(pickDefaultModel("b", ["a", "b"]), null);
});
