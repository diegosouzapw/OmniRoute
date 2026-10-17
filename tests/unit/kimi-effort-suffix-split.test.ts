import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DB-backed pieces (/models enrichment) need an isolated DATA_DIR + a released handle
// (PII learning #3). Set it BEFORE importing any db-touching module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-kimi-suffix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { extractReasoningIntent } = await import("../../src/lib/reasoningRouting/policy.ts");

test("kimi effort-suffixed ids split into the base model + request effort", () => {
  const intent = extractReasoningIntent("kimi-coding/kimi-k3-high", {});
  assert.equal(intent.model, "kimi-coding/kimi-k3");
  assert.equal(intent.effort, "high");
});

test("bare and kmc-prefixed kimi suffixed ids split too", () => {
  const kmc = extractReasoningIntent("kmc/kimi-k3-high", {});
  assert.equal(kmc.model, "kmc/kimi-k3");
  assert.equal(kmc.effort, "high");

  const bare = extractReasoningIntent("k3-high", {});
  assert.equal(bare.model, "k3");
  assert.equal(bare.effort, "high");

  const k27 = extractReasoningIntent("kimi-coding/kimi-k2.7-high", {});
  assert.equal(k27.model, "kimi-coding/kimi-k2.7");
  assert.equal(k27.effort, "high");
});

test("kimi effort vocabulary stays conservative: no xhigh/max/ultra splitting", () => {
  for (const id of [
    "kimi-coding/kimi-k3-xhigh",
    "kimi-coding/kimi-k3-max",
    "kimi-coding/kimi-k3-ultra",
  ]) {
    const intent = extractReasoningIntent(id, {});
    assert.equal(intent.model, id);
    assert.equal(intent.effort, null);
  }
});

test("real kimi wire ids pass through unsplit", () => {
  for (const id of [
    "kimi-coding/k3",
    "kimi-coding/kimi-k2.7",
    "kimi-coding/kimi-k2.7-code",
    "kimi-coding/k3-256k",
    "kimi-coding/kimi-for-coding",
    "kimi-coding/kimi-for-coding-highspeed",
  ]) {
    const intent = extractReasoningIntent(id, {});
    assert.equal(intent.model, id);
    assert.equal(intent.effort, null);
  }
});

test("explicit request effort still wins over the suffix", () => {
  const intent = extractReasoningIntent("kimi-coding/kimi-k3-high", {
    reasoning_effort: "low",
  });
  assert.equal(intent.model, "kimi-coding/kimi-k3");
  assert.equal(intent.effort, "low");
});
