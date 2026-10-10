/**
 * Source guards for the round-robin extract (PR-1).
 * handleRoundRobinCombo must live in roundRobinCombo.ts and resolveTargetTokenLimit
 * in targetTokenLimit.ts — neither in the combo.ts import sandwich.
 */
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const comboSrc = readFileSync(join(root, "open-sse/services/combo.ts"), "utf8");
const rrPath = join(root, "open-sse/services/combo/roundRobinCombo.ts");

describe("round-robin extract guards", () => {
  it("defines handleRoundRobinCombo in roundRobinCombo.ts, not combo.ts", () => {
    assert.equal(existsSync(rrPath), true, "roundRobinCombo.ts must exist");
    const rr = readFileSync(rrPath, "utf8");
    assert.match(rr, /export async function handleRoundRobinCombo/);
    assert.equal(
      /^(export )?async function handleRoundRobinCombo/m.test(comboSrc),
      false,
      "combo.ts must not define handleRoundRobinCombo after the lift"
    );
  });

  it("moved resolveTargetTokenLimit out of the import sandwich", () => {
    // #14585 lifted it into its own module to keep roundRobinCombo.ts under the
    // file-size ceiling; round-robin must consume that single implementation.
    const rr = readFileSync(rrPath, "utf8");
    const tokenLimitSrc = readFileSync(
      join(root, "open-sse/services/combo/targetTokenLimit.ts"),
      "utf8"
    );
    assert.match(tokenLimitSrc, /export async function resolveTargetTokenLimit/);
    assert.match(rr, /import \{ resolveTargetTokenLimit \} from "\.\/targetTokenLimit\.ts"/);
    assert.equal(
      rr.includes("function resolveTargetTokenLimit"),
      false,
      "roundRobinCombo.ts must not keep a second copy of resolveTargetTokenLimit"
    );
    assert.equal(
      comboSrc.includes("function resolveTargetTokenLimit"),
      false,
      "combo.ts must not keep resolveTargetTokenLimit between import blocks"
    );
  });

  it("clears rrLoopSafetyTimer in a finally on the extracted file", () => {
    const rr = readFileSync(rrPath, "utf8");
    assert.match(rr, /rrLoopSafetyTimer = setTimeout\(/);
    assert.match(rr, /finally\s*\{[^}]*clearTimeout\(rrLoopSafetyTimer\)/s);
  });

  it("calls releaseStickyPinOnFailure (injection: deleting the call goes red)", () => {
    const rr = readFileSync(rrPath, "utf8");
    assert.match(
      rr,
      /releaseStickyPinOnFailure\(/,
      "#6692 quality/exhaustion path must still release the sticky pin"
    );
  });

  it("counts an abandoned first model as a fallback (injection: re-adding the guard goes red)", () => {
    // t_f348e188: `if (offset > 0) fallbackCount++` conflated "not the first
    // target" with "is a fallback", so the first fallback (primary -> secondary)
    // was never counted and totalFallbacks stayed 0 for every 2-target combo.
    // Every abandoned target counts, whatever its offset/index.
    const rr = readFileSync(rrPath, "utf8");
    assert.equal(
      /if\s*\(\s*offset\s*>\s*0\s*\)\s*fallbackCount\+\+/.test(rr),
      false,
      "roundRobinCombo.ts must not reintroduce the offset > 0 fallback guard"
    );
    assert.ok(rr.includes("fallbackCount++"), "round-robin must still count fallbacks");
    const attemptSrc = readFileSync(
      join(root, "open-sse/services/combo/executeTargetAttempt.ts"),
      "utf8"
    );
    assert.equal(
      /if\s*\(\s*i\s*>\s*0\s*\)\s*state\.fallbackCount\+\+/.test(attemptSrc),
      false,
      "executeTargetAttempt.ts must not reintroduce the i > 0 fallback guard"
    );
  });
});
