/**
 * Characterization for comboAttemptLoop.ts (#11804 finally + gates/attempt wiring).
 * Plan Task 4. RED until that module exists.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

test("dispatchWithCooldownRetry clears activeLoopSafetyTimer in finally", async () => {
  const src = readFileSync(
    resolve(here, "../../../open-sse/services/combo/comboAttemptLoop.ts"),
    "utf8"
  );
  assert.match(src, /finally\s*\{[^}]*clearTimeout\(activeLoopSafetyTimer\)/s);
  assert.match(src, /activeLoopSafetyTimer = loopSafetyTimer/);
});

test("dispatchWithCooldownRetry calls evaluateGates then executeAttempt, not inline executeTarget", async () => {
  const src = readFileSync(
    resolve(here, "../../../open-sse/services/combo/comboAttemptLoop.ts"),
    "utf8"
  );
  assert.match(src, /extra\.evaluateGates/);
  assert.match(src, /extra\.executeAttempt/);
  // Thin wrapper may keep the local name; the old inline retry/gate body must not.
  assert.doesNotMatch(src, /getCircuitBreaker\(provider\)/);
  assert.doesNotMatch(src, /for \(let retry = 0; retry <= deps\.maxRetries/);
});

test("attempt budget lives on state.globalAttempts, not extra.globalAttempts box", async () => {
  const loopSrc = readFileSync(
    resolve(here, "../../../open-sse/services/combo/comboAttemptLoop.ts"),
    "utf8"
  );
  const comboSrc = readFileSync(resolve(here, "../../../open-sse/services/combo.ts"), "utf8");
  const attemptSrc = readFileSync(
    resolve(here, "../../../open-sse/services/combo/executeTargetAttempt.ts"),
    "utf8"
  );
  assert.match(attemptSrc, /state\.globalAttempts\+\+/);
  assert.doesNotMatch(loopSrc, /globalAttempts:\s*\{\s*current:\s*number\s*\}/);
  assert.doesNotMatch(comboSrc, /globalAttempts:\s*\{\s*current:\s*0\s*\}/);
});

test("handleComboChatInner does not leave unused delay locals or unused failureTracker import", async () => {
  const comboSrc = readFileSync(resolve(here, "../../../open-sse/services/combo.ts"), "utf8");
  const inner = comboSrc.slice(
    comboSrc.indexOf("async function handleComboChatInner"),
    comboSrc.indexOf("async function handleRoundRobinCombo")
  );
  assert.doesNotMatch(inner, /const retryDelayMs = resolveDelayMs/);
  assert.doesNotMatch(inner, /const fallbackDelayMs = resolveDelayMs/);
  assert.doesNotMatch(comboSrc, /clearComboFailureTracking/);
});

test("hedge delay does not declare unused timeoutResolve", async () => {
  const loopSrc = readFileSync(
    resolve(here, "../../../open-sse/services/combo/comboAttemptLoop.ts"),
    "utf8"
  );
  assert.doesNotMatch(loopSrc, /let timeoutResolve/);
});
