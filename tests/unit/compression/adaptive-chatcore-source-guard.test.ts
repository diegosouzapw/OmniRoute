import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const chatCore = readFileSync(
  fileURLToPath(new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url)),
  "utf8"
);

test("chatCore threads modelContextLimit + requestMaxTokens into selectCompressionPlan", () => {
  // the adaptive options object literal must reference both inputs
  assert.match(chatCore, /modelContextLimit:/);
  assert.match(chatCore, /requestMaxTokens:/);
});

test("chatCore emits the adaptive telemetry block via onAdaptive", () => {
  assert.match(chatCore, /onAdaptive/);
  assert.match(chatCore, /adaptiveTelemetry/);
});
