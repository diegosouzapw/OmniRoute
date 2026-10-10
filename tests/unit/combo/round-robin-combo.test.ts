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

  it("counts a first-model failover in a round-robin combo (behavioural)", async () => {
    // t_f348e188: `if (offset > 0) fallbackCount++` conflated "not the first
    // target" with "is a fallback", so a round-robin combo whose FIRST model
    // failed and whose second one served recorded zero fallbacks. This drives
    // the real dispatcher rather than grepping the source, so re-adding the
    // guard turns it red on the observable metric, not on a regex.
    const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
    const { getComboMetrics } = await import("../../../open-sse/services/comboMetrics.ts");
    const comboName = `rr-fallback-count-${Date.now()}`;
    const combo = {
      name: comboName,
      strategy: "round-robin",
      config: { maxRetries: 0 },
      models: [
        {
          kind: "model",
          provider: "codex",
          providerId: "codex",
          model: "m-a",
          connectionId: "conn-A",
          id: `${comboName}-0`,
        },
        {
          kind: "model",
          provider: "glm-cn",
          providerId: "glm-cn",
          model: "m-b",
          connectionId: "conn-B",
          id: `${comboName}-1`,
        },
      ],
    };
    let calls = 0;
    const response = await handleComboChat({
      body: {
        model: comboName,
        messages: [{ role: "user", content: "hello" }],
        stream: false,
      },
      combo,
      allCombos: [combo],
      isModelAvailable: async () => true,
      relayOptions: undefined,
      signal: undefined,
      settings: {},
      log: { info() {}, warn() {}, debug() {}, error() {} },
      handleSingleModel: async () => {
        calls += 1;
        if (calls === 1) {
          return new Response("upstream exploded", { status: 500 });
        }
        return Response.json({
          choices: [{ message: { role: "assistant", content: "served" } }],
        });
      },
    });
    assert.equal(calls, 2, "the second model must have been tried");
    assert.equal(response.status, 200, "the second model serves the request");
    const metrics = getComboMetrics(comboName);
    assert.equal(metrics?.totalFallbacks, 1, "the abandoned first model is one fallback");
  });
});
