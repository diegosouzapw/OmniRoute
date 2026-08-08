/**
 * tests/integration/live-default-combo-workload.test.ts
 *
 * General breadth test against the REAL, currently-configured "default"
 * combo on the target instance — unlike live-gemini-workload.test.ts (which
 * provisions its own narrow 2-model Gemini-only combo), this targets every
 * provider/model step the operator actually has in "default" directly,
 * bypassing combo routing. One request per configured model: non-streaming
 * + streaming Chat Completions, and streaming Responses API. Skips (never
 * fails) any model whose provider connection isn't currently active, so one
 * unrelated provider outage doesn't block the rest of the run.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  skip,
  getDefaultComboModelTargets,
  filterActiveModelTargets,
  sendModelRequest,
} from "./liveDefaultComboShared.ts";

let modelNames: string[] = [];

test.before(async () => {
  if (skip) return;
  const targets = await getDefaultComboModelTargets();
  assert.ok(targets.length > 0, `"default" combo has no model steps — nothing to test`);

  const { active, skipped } = await filterActiveModelTargets(targets);
  if (skipped.length > 0) {
    console.log(`\n  [setup] skipping ${skipped.length} model(s) with inactive provider:`);
    for (const s of skipped) console.log(`    - ${s}`);
  }

  modelNames = active.map((t) => t.model);
  console.log(`\n  [setup] testing ${modelNames.length} model(s) from the live "default" combo`);
});

test(
  "[32] default combo: non-streaming chat completions across every configured model",
  { skip },
  async () => {
    const failures: string[] = [];
    for (const model of modelNames) {
      const r = await sendModelRequest(model, false, "chat");
      if (r.status !== 200 || r.contentLength === 0) {
        failures.push(
          `${model}: HTTP ${r.status}${r.error ? ` (${r.error})` : ""}, ${r.contentLength} chars`
        );
      }
    }
    if (failures.length > 0) {
      console.log(`\n  Non-streaming failures (${failures.length}/${modelNames.length}):`);
      for (const f of failures) console.log(`    ${f}`);
    }
    assert.equal(
      failures.length,
      0,
      `${failures.length}/${modelNames.length} models failed non-streaming chat`
    );
  }
);

test(
  "[33] default combo: streaming chat completions across every configured model",
  { skip },
  async () => {
    const failures: string[] = [];
    for (const model of modelNames) {
      const r = await sendModelRequest(model, true, "chat");
      if (r.status !== 200 || r.contentLength === 0) {
        failures.push(
          `${model}: HTTP ${r.status}${r.error ? ` (${r.error})` : ""}, ${r.contentLength} chars`
        );
      }
    }
    if (failures.length > 0) {
      console.log(`\n  Streaming failures (${failures.length}/${modelNames.length}):`);
      for (const f of failures) console.log(`    ${f}`);
    }
    assert.equal(
      failures.length,
      0,
      `${failures.length}/${modelNames.length} models failed streaming chat`
    );
  }
);

test(
  "[34] default combo: streaming responses API across every configured model",
  { skip },
  async () => {
    const failures: string[] = [];
    for (const model of modelNames) {
      const r = await sendModelRequest(model, true, "responses");
      if (r.status !== 200 || r.contentLength === 0) {
        failures.push(
          `${model}: HTTP ${r.status}${r.error ? ` (${r.error})` : ""}, ${r.contentLength} chars`
        );
      }
    }
    if (failures.length > 0) {
      console.log(`\n  Responses API failures (${failures.length}/${modelNames.length}):`);
      for (const f of failures) console.log(`    ${f}`);
    }
    assert.equal(
      failures.length,
      0,
      `${failures.length}/${modelNames.length} models failed streaming Responses API`
    );
  }
);
