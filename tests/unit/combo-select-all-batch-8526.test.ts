// Regression guard for #8526 (combo Browse Catalog "Select all"/"Unselect
// all"). This is the BLOCKING copy — tests/unit/*.test.ts is collected by
// `npm run test:unit` (node:test), unlike tests/unit/ui/*.test.tsx which is
// only collected by the advisory `test:vitest:ui`
// (see CONTRIBUTING.md "Both test runners must pass").
//
// It exercises the exact functions `ComboFormModal::handleAddModels` /
// `handleDeselectModels` (src/app/(dashboard)/dashboard/combos/page.tsx)
// delegate to — not a hand-maintained mirror of the batching logic — so a
// broken extraction fails this suite, not just an advisory one.
import test from "node:test";
import assert from "node:assert/strict";

const builderDraft = await import("../../src/lib/combos/builderDraft.ts");

test("computeBatchAddModelSteps adds every candidate against a growing list in one pass", () => {
  const { next, addedAny } = builderDraft.computeBatchAddModelSteps(
    [],
    [
      { value: "openai/gpt-4o" },
      { value: "openai/gpt-4o-mini" },
      { value: "anthropic/claude-3-5-sonnet" },
    ],
    []
  );
  assert.equal(addedAny, true);
  assert.deepEqual(
    next.map((m) => m.model),
    ["openai/gpt-4o", "openai/gpt-4o-mini", "anthropic/claude-3-5-sonnet"]
  );
});

test("computeBatchAddModelSteps skips exact provider/model/account duplicates", () => {
  const existing = [{ model: "openai/gpt-4o", providerId: "openai", weight: 0 }];
  const { next, addedAny } = builderDraft.computeBatchAddModelSteps(
    existing,
    [{ value: "openai/gpt-4o", providerId: "openai" }, { value: "openai/gpt-4o-mini" }],
    []
  );
  assert.equal(addedAny, true);
  assert.deepEqual(
    next.map((m) => m.model),
    ["openai/gpt-4o", "openai/gpt-4o-mini"]
  );
});

test("computeBatchAddModelSteps resolves providerId via builderProviders alias/prefix", () => {
  const builderProviders = [{ providerId: "openai", alias: "oa", prefix: "gpt" }];
  const { next } = builderDraft.computeBatchAddModelSteps(
    [],
    [{ value: "gpt/gpt-4o", providerId: "gpt" }],
    builderProviders
  );
  assert.equal(next[0].providerId, "openai");
});

test("computeBatchAddModelSteps ignores empty/missing values and is a no-op with nothing selected", () => {
  const { next, addedAny } = builderDraft.computeBatchAddModelSteps(
    [],
    [{ value: "" }, {}, { value: "openai/gpt-4o" }],
    []
  );
  assert.equal(addedAny, true);
  // No matching entry in builderProviders, so providerId falls back to the
  // provider prefix parsed out of the qualified model string.
  assert.deepEqual(next, [{ model: "openai/gpt-4o", providerId: "openai", weight: 0 }]);

  const existing = [{ model: "openai/gpt-4o", weight: 0 }];
  const noop = builderDraft.computeBatchAddModelSteps(existing, [], []);
  assert.equal(noop.addedAny, false);
  assert.equal(noop.next, existing);
});

test("computeBatchDeselectModelSteps removes every matching qualified model in one pass", () => {
  const models = [
    { model: "openai/gpt-4o", weight: 0 },
    { model: "openai/gpt-4o-mini", weight: 0 },
    { model: "anthropic/claude-3-5-sonnet", weight: 0 },
  ];
  const next = builderDraft.computeBatchDeselectModelSteps(models, [
    { value: "openai/gpt-4o" },
    { value: "openai/gpt-4o-mini" },
  ]);
  assert.deepEqual(next, [{ model: "anthropic/claude-3-5-sonnet", weight: 0 }]);
});

test("computeBatchDeselectModelSteps accepts raw string identifiers", () => {
  const models = [
    { model: "openai/gpt-4o", weight: 0 },
    { model: "openai/gpt-4o-mini", weight: 0 },
  ];
  const next = builderDraft.computeBatchDeselectModelSteps(models, ["openai/gpt-4o"]);
  assert.deepEqual(next, [{ model: "openai/gpt-4o-mini", weight: 0 }]);
});

test("computeBatchDeselectModelSteps is a no-op (same reference) when there is nothing to remove", () => {
  const models = [{ model: "openai/gpt-4o", weight: 0 }];
  assert.equal(builderDraft.computeBatchDeselectModelSteps(models, []), models);
  assert.equal(builderDraft.computeBatchDeselectModelSteps(models, [{ value: "" }]), models);
});
