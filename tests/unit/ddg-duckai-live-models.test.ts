import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import {
  extractFreeDuckDuckGoModelIds,
  pickDuckDuckGoModel,
  normalizeDuckDuckGoModel,
} from "../../open-sse/executors/duckduckgo-web/models.ts";

// Structural guard (challenge-split precedent): keeps this suite runnable without
// the full executor dependency graph while still pinning the endpoint wiring.
const EXECUTOR_SOURCE = readFileSync(
  fileURLToPath(new URL("../../open-sse/executors/duckduckgo-web.ts", import.meta.url)),
  "utf8"
);

// Live lineup per GET /duckchat/v1/models (2026-08-26).
const LIVE_IDS = new Set([
  "gpt-5.4",
  "gpt-5.6-luna",
  "gpt-5.4-mini",
  "claude-sonnet-4-6",
  "claude-haiku-4-5",
  "claude-opus-4-8",
  "mistral-small-2603",
  "tinfoil/gpt-oss-120b",
  "tinfoil/gemma4-31b",
]);

test("live validation: current wire ids pass through untouched", () => {
  for (const id of ["gpt-5.4-mini", "gpt-5.6-luna", "claude-haiku-4-5"]) {
    assert.equal(pickDuckDuckGoModel(id, LIVE_IDS), id);
  }
});

test("live catalog: only models with free access are routable", () => {
  assert.deepEqual(
    extractFreeDuckDuckGoModelIds({
      models: [
        { id: "gpt-5.6-luna", accessTier: ["free", "pro"] },
        { id: "gpt-5.4", accessTier: ["internal", "pro"] },
        { id: "claude-haiku-4-5", accessTier: ["free"] },
        { id: "missing-tier" },
      ],
    }),
    new Set(["gpt-5.6-luna", "claude-haiku-4-5"])
  );
});

test("live validation: retired ids resolve through aliases when still live elsewhere", () => {
  assert.equal(pickDuckDuckGoModel("gpt-5.4-nano", LIVE_IDS), "gpt-5.4-mini");
  assert.equal(pickDuckDuckGoModel("gpt-4o-mini", LIVE_IDS), "gpt-5.4-mini");
  assert.equal(pickDuckDuckGoModel("gpt-oss-120b", LIVE_IDS), "tinfoil/gpt-oss-120b");
});

test("live validation: fully unknown id falls back to the default free model", () => {
  assert.equal(pickDuckDuckGoModel("totally-made-up-model", LIVE_IDS), "gpt-5.4-mini");
});

test("live validation: unavailable live list degrades to passthrough (no silent rewrite)", () => {
  assert.equal(pickDuckDuckGoModel("gpt-5.4-mini", null), "gpt-5.4-mini");
  assert.equal(pickDuckDuckGoModel("some-new-upstream-id", new Set()), "some-new-upstream-id");
});

test("live validation: normalize keeps prefix-strip + alias order stable", () => {
  assert.equal(normalizeDuckDuckGoModel(undefined), "gpt-5.4-mini");
  assert.equal(normalizeDuckDuckGoModel("duckduckgo-web/gpt-5.6-luna"), "gpt-5.6-luna");
});

test("no-raw-hash guard: solver failure must not fall back to the unsolved challenge", () => {
  // Regression: acquireAuthHeaders' catch used to `return headers;`, forwarding the
  // RAW x-vqd-hash-1 challenge upstream — a guaranteed 418 ERR_CHALLENGE whose wasted
  // call still counted toward the IP rate limit (spurious 429s). The fixed source
  // retries via acquireVqdHeaders instead; pin its absence structurally.
  assert.doesNotMatch(EXECUTOR_SOURCE, /catch \(error\) \{\s*void error;\s*return headers;/);
  assert.match(EXECUTOR_SOURCE, /acquireAuthHeaders/);
});

test("models endpoint: token-free /models shares the executor host", () => {
  assert.match(EXECUTOR_SOURCE, /export const MODELS_URL = `\$\{DUCKDUCKGO_BASE\}\/duckchat\/v1\/models`;/);
  assert.match(EXECUTOR_SOURCE, /export const DUCKDUCKGO_BASE = "https:\/\/duck\.ai";/);
});
