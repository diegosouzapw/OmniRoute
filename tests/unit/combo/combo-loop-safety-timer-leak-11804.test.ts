/**
 * #11804 — the combo loop-safety timer must be cleared on EVERY exit path.
 *
 * `dispatchWithCooldownRetry` (open-sse/services/combo.ts) arms a
 * `setTimeout(..., loopSafetyMs)` — 10 minutes by default — once per `setTry`
 * iteration, so a combo that never produces a terminal response still answers
 * the client with a 504 instead of hanging forever.
 *
 * Before this fix the only `clearTimeout` lived inside the `if (anySuccess)`
 * branch (the code comment said so verbatim: "clear the safety timer on the
 * happy path"). Every error exit — all_targets_skipped, all_accounts_inactive,
 * the aggregated-status return, the final fallback, the global-timeout branch —
 * returned the response to the client and left a 600s timer pending, its
 * closure retaining `orderedTargets` and the exhausted provider/connection
 * sets. Field evidence on the issue: a client received 502 immediately and the
 * "Combo loop safety timeout ... force-terminating" line was logged exactly
 * 600s later, long after the request was gone.
 *
 * This is a source-level guard rather than a runtime one: driving a real combo
 * through each terminal branch needs the full provider/credential/DB stack, and
 * the invariant we actually care about ("no exit path may skip the clear") is a
 * structural property of the function. The guard fails if someone reintroduces
 * a happy-path-only clear or drops the finally.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const comboSrc = readFileSync(resolve(here, "../../../open-sse/services/combo.ts"), "utf8");

test("#11804: the loop-safety timer is released in a finally, not only on success", () => {
  assert.match(
    comboSrc,
    /finally\s*\{[^}]*clearTimeout\(activeLoopSafetyTimer\)/s,
    "dispatchWithCooldownRetry must clear the loop-safety timer in a finally block so every " +
      "exit path (including future ones) releases it"
  );
});

test("#11804: the timer handle is reachable from the function-scope cleanup", () => {
  // The timer is created inside the `for (setTry...)` loop; the cleanup lives at
  // function scope. If the handle is not published to that outer binding, the
  // finally silently clears nothing.
  assert.match(
    comboSrc,
    /activeLoopSafetyTimer = loopSafetyTimer/,
    "the per-iteration timer must be published to the function-scope handle"
  );
  const declIdx = comboSrc.indexOf("let activeLoopSafetyTimer");
  const loopIdx = comboSrc.indexOf("for (let setTry = 0");
  assert.ok(declIdx > 0, "function-scope timer handle must be declared");
  assert.ok(
    declIdx < loopIdx,
    "the handle must be declared OUTSIDE the setTry loop, otherwise each iteration " +
      "gets a fresh binding and the previous iteration's timer leaks"
  );
});

test("#11804: the safety timeout itself is preserved (fix must not disarm the 504)", () => {
  // Guard against 'fixing' the leak by simply never arming the timer.
  assert.match(
    comboSrc,
    /loopSafetyTimer = setTimeout\(/,
    "the loop-safety timer must still be armed — the 504 backstop is the reason it exists"
  );
  assert.match(
    comboSrc,
    /Combo loop safety timeout/,
    "the force-termination path must still exist"
  );
});
