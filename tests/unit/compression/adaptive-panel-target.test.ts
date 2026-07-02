import { test } from "node:test";
import assert from "node:assert/strict";
import { formatAdaptiveTarget } from "../../../src/app/(dashboard)/dashboard/context/settings/adaptiveTargetLabel.ts";

test("formatAdaptiveTarget shows policy + computed target for reserve-output", () => {
  const label = formatAdaptiveTarget(
    { mode: "floor", policy: "reserve-output", outputReserve: 4096, safetyMargin: 1024, pct: 0.85, absoluteBudget: 0 },
    200000
  );
  assert.match(label, /reserve-output/);
  // 200000 − 4096 − 1024 = 194880; tolerate any digit-group separator (locale-dependent toLocaleString).
  assert.match(label, /194[.,\s ]?880|194880/);
});

test("formatAdaptiveTarget shows off when disabled", () => {
  const label = formatAdaptiveTarget(
    { mode: "off", policy: "reserve-output", outputReserve: 4096, safetyMargin: 1024, pct: 0.85, absoluteBudget: 0 },
    200000
  );
  assert.match(label, /off|disabled/i);
});

test("formatAdaptiveTarget reflects percentage policy target", () => {
  const label = formatAdaptiveTarget(
    { mode: "floor", policy: "percentage", outputReserve: 4096, safetyMargin: 1024, pct: 0.7, absoluteBudget: 0 },
    200000
  );
  assert.match(label, /percentage/);
  // 200000 × 0.7 = 140000
  assert.match(label, /140[.,\s ]?000|140000/);
});
