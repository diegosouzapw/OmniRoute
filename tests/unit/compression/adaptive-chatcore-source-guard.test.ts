import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../../../open-sse/${rel}`, import.meta.url)), "utf8");
const chatCore = read("handlers/chatCore.ts");
// #15641 moved the plan selection out of chatCore into resolveCompressionPlanWithJev()
// (services/compression/jevPlan.ts); the adaptive inputs and telemetry must survive the move.
const jevPlan = read("services/compression/jevPlan.ts");

test("chatCore delegates plan selection to resolveCompressionPlanWithJev", () => {
  assert.match(chatCore, /resolveCompressionPlanWithJev\(/);
  assert.match(jevPlan, /selectCompressionPlan\(/);
});

test("compression plan selection threads modelContextLimit + requestMaxTokens into selectCompressionPlan", () => {
  // the adaptive options object literal must reference both inputs
  assert.match(jevPlan, /modelContextLimit[,:]/);
  assert.match(jevPlan, /requestMaxTokens[,:]/);
  assert.match(jevPlan, /getTokenLimit\(/);
  assert.match(jevPlan, /max_tokens/);
});

test("chatCore emits the adaptive telemetry block via onAdaptive", () => {
  assert.match(jevPlan, /onAdaptive/);
  assert.match(chatCore, /adaptiveTelemetry/);
});
