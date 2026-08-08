// #8989 — Perplexity-web catalog models post mode:"search" which the backend
// downgrades to CONCISE and answers with status:"FAILED" / "Error in processing query."
// Every catalog model AND the thinking branch must use "copilot".
//
// Run: node --import tsx/esm --test tests/unit/8989-perplexity-catalog-mode-repro.test.ts

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-8989-repro-"));

const { MODEL_MAP, THINKING_MAP } = await import(
  "../../open-sse/executors/perplexity-web/protocol.ts"
);

// ── Guard: MODEL_MAP must use "copilot" ────────────────────────────────────
// The backend downgrades "search" to CONCISE, drops model_preference and ends
// the stream with status:"FAILED" ("Error in processing query.").

test("MODEL_MAP catalog entries must post mode 'copilot' (#8989)", () => {
  const offenders = Object.entries(MODEL_MAP)
    .filter(([, [mode]]) => mode !== "copilot")
    .map(([model, [mode]]) => `${model}=${mode}`);

  assert.deepEqual(
    offenders,
    [],
    `Catalog models using wrong mode: ${offenders.join(", ")}`
  );
});

test("MODEL_MAP/THINKING_MAP: pplx-opus resolves to Claude Opus 5 (#8989)", () => {
  assert.deepEqual(MODEL_MAP["pplx-opus"], ["copilot", "claude50opus"]);
  assert.equal(THINKING_MAP["pplx-opus"], "claude50opusthinking");
});
