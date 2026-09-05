/**
 * Source guards for the round-robin extract (PR-1).
 * handleRoundRobinCombo + resolveTargetTokenLimit must live in
 * roundRobinCombo.ts, not in the combo.ts import sandwich.
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
    const rr = readFileSync(rrPath, "utf8");
    assert.match(rr, /function resolveTargetTokenLimit/);
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
});
