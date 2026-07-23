/**
 * TDD regression — auto combos must never advertise `limit.context: 0`.
 *
 * opencode's overflow guard (packages/opencode/src/session/overflow.ts)
 * short-circuits when `model.limit.context === 0`:
 *
 *   if (input.model.limit.context === 0) return false  // never overflow
 *
 * so a zero context silently DISABLES opencode's smart auto-compaction for
 * auto combos. The session then grows unbounded until OmniRoute's
 * server-side purifyHistory() destructively drops old messages — the
 * "coding agent keeps forgetting things" bug.
 *
 * Fix under test: mapAutoComboToStaticEntry consumes the context_length /
 * max_output_tokens now served by GET /api/combos/auto, and falls back to a
 * safe positive default (128000 / 8192) for older servers that do not send
 * the fields yet.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { mapAutoComboToStaticEntry } from "../src/index.ts";
import type { OmniRouteRawAutoCombo } from "../src/index.ts";

test("uses server-provided context_length and max_output_tokens", () => {
  const raw = {
    id: "auto/coding",
    name: "Auto Coding",
    variant: "coding",
    candidateCount: 5,
    context_length: 1048576,
    max_output_tokens: 65536,
  } as OmniRouteRawAutoCombo;

  const entry = mapAutoComboToStaticEntry(raw);
  assert.equal(entry.limit?.context, 1048576);
  assert.equal(entry.limit?.output, 65536);
});

test("falls back to a safe positive default when the server omits limits (old servers)", () => {
  const raw = {
    id: "auto",
    name: "Auto",
    candidateCount: 3,
  } as OmniRouteRawAutoCombo;

  const entry = mapAutoComboToStaticEntry(raw);
  assert.ok(
    typeof entry.limit?.context === "number" && entry.limit.context > 0,
    `context must be a positive number (never 0 — zero disables opencode auto-compaction), got ${entry.limit?.context}`
  );
  assert.ok(
    typeof entry.limit?.output === "number" && entry.limit.output > 0,
    `output must be a positive number, got ${entry.limit?.output}`
  );
});

test("ignores non-positive server values and keeps the safe fallback", () => {
  const raw = {
    id: "auto/fast",
    name: "Auto Fast",
    variant: "fast",
    candidateCount: 2,
    context_length: 0,
    max_output_tokens: -1,
  } as OmniRouteRawAutoCombo;

  const entry = mapAutoComboToStaticEntry(raw);
  assert.ok(
    typeof entry.limit?.context === "number" && entry.limit.context > 0,
    "zero/negative server values must not propagate"
  );
  assert.ok(typeof entry.limit?.output === "number" && entry.limit.output > 0);
});
