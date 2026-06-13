// Regression for the "Test all models" status-icon bug:
// individual ▶ test turns each model's icon green/red (onTestModel sets
// modelTestStatus), but "Test all models" only showed a toast and left every
// icon blank — the user could not tell which model passed or failed.
//
// Both handleTestAll implementations (ProviderDetailPageClient + PassthroughModelsSection)
// now route each model's result through evaluateTestAllEntry() and apply the returned
// status to modelTestStatus. This pure helper captures the status + auto-hide decision
// so it is testable in the gating node suite (matches the #3610 helper-extraction idiom).
import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateTestAllEntry } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

test("ok entry maps to status 'ok' and is never hidden", () => {
  assert.deepEqual(evaluateTestAllEntry({ status: "ok" }, true), {
    status: "ok",
    shouldHide: false,
  });
  assert.deepEqual(evaluateTestAllEntry({ status: "ok" }, false), {
    status: "ok",
    shouldHide: false,
  });
});

test("failed entry maps to status 'error' and hides only when autoHide is on", () => {
  assert.deepEqual(evaluateTestAllEntry({ status: "error" }, true), {
    status: "error",
    shouldHide: true,
  });
  assert.deepEqual(evaluateTestAllEntry({ status: "error" }, false), {
    status: "error",
    shouldHide: false,
  });
});

test("rate-limited / timeout failures show 'error' and ARE auto-hidden (hide every failure)", () => {
  assert.deepEqual(evaluateTestAllEntry({ status: "error", rateLimited: true }, true), {
    status: "error",
    shouldHide: true,
  });
  assert.deepEqual(evaluateTestAllEntry({ status: "error", isTimeout: true }, true), {
    status: "error",
    shouldHide: true,
  });
  // ...but only when the toggle is on
  assert.deepEqual(evaluateTestAllEntry({ status: "error", rateLimited: true }, false), {
    status: "error",
    shouldHide: false,
  });
});

test("missing / null / empty entry is treated as a failure", () => {
  for (const entry of [undefined, null, {}]) {
    const out = evaluateTestAllEntry(entry, true);
    assert.equal(out.status, "error", `entry=${JSON.stringify(entry)} → error`);
    assert.equal(out.shouldHide, true);
  }
});
