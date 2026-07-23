import { test } from "node:test";
import assert from "node:assert/strict";

import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

// #6485 — a stacked pipeline step naming an engine which is not registered used to
// silently `continue`, so the caller had no signal that a configured step was a no-op.
// The fix records a `validationErrors` entry for each unknown engine while still
// fail-open (the request is not aborted). These tests pin that contract.
//
// Note: the unknown-engine path is only reachable via OBJECT steps ({ engine: "…" }).
// Bare-string steps are coerced to the "caveman" fallback by normalizePipelineStep,
// so they can never name an unknown engine.

const body = {
  messages: [
    { role: "user", content: "hello ".repeat(200) },
    { role: "assistant", content: "world ".repeat(200) },
  ],
};

test("unknown compression engine surfaces a validationErrors entry (sync)", () => {
  const result = applyStackedCompression(body, [{ engine: "definitely-not-a-real-engine" }]);
  const errors = result.stats?.validationErrors ?? [];
  assert.ok(
    errors.some((e) => e.includes("definitely-not-a-real-engine")),
    `expected a validationErrors entry naming the unknown engine, got: ${JSON.stringify(errors)}`
  );
});

test("known + unknown mixed pipeline reports only the unknown engine (sync)", () => {
  const result = applyStackedCompression(body, [
    { engine: "session-dedup" },
    { engine: "ghost-engine" },
  ]);
  const errors = result.stats?.validationErrors ?? [];
  assert.ok(
    errors.some((e) => e.includes("ghost-engine")),
    `expected the unknown engine to be reported, got: ${JSON.stringify(errors)}`
  );
  assert.ok(
    !errors.some((e) => e.includes("session-dedup")),
    "a real engine must not be reported as unknown"
  );
});
