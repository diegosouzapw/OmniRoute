/**
 * TDD for risk-gate mask/restore round-trip.
 * Run: node --import tsx/esm --test tests/unit/compression/riskGateStep.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { applyRiskMask, restoreRiskBlocks } from "../../../open-sse/services/compression/riskGate/riskGateStep.ts";

const PEM = "-----BEGIN PRIVATE KEY-----\nMIIBVQbody\n-----END PRIVATE KEY-----";

describe("applyRiskMask / restoreRiskBlocks", () => {
  it("masks risky spans in message content and round-trips byte-identically", () => {
    const body = { messages: [{ role: "user", content: `here is a key:\n${PEM}\nthanks` }] };
    const { maskedBody, blocks, stats } = applyRiskMask(body, { enabled: true });
    const maskedText = (maskedBody.messages as Array<{ content: string }>)[0].content;
    assert.ok(!maskedText.includes("BEGIN PRIVATE KEY"), "secret removed from masked body");
    assert.ok(maskedText.includes("OMNI_CAVEMAN"), "uses SENTINEL placeholder family");
    assert.equal(stats.spansProtected, 1);
    assert.equal(stats.categories.private_key, 1);

    const restored = restoreRiskBlocks(maskedBody, blocks);
    assert.equal((restored.messages as Array<{ content: string }>)[0].content, body.messages[0].content);
  });

  it("is a no-op when nothing risky is present", () => {
    const body = { messages: [{ role: "user", content: "just normal prose, nothing to see" }] };
    const { maskedBody, blocks, stats } = applyRiskMask(body, { enabled: true });
    assert.equal(blocks.length, 0);
    assert.equal(stats.spansProtected, 0);
    assert.deepEqual(maskedBody, body);
  });

  it("masks text parts inside array (multimodal) content", () => {
    const body = {
      messages: [{ role: "user", content: [{ type: "text", text: `key:\n${PEM}` }, { type: "image_url", image_url: { url: "x" } }] }],
    };
    const { maskedBody, blocks } = applyRiskMask(body, { enabled: true });
    const part = (maskedBody.messages as Array<{ content: Array<{ type: string; text?: string }> }>)[0].content[0];
    assert.ok(!part.text!.includes("BEGIN PRIVATE KEY"));
    const restored = restoreRiskBlocks(maskedBody, blocks);
    assert.equal(
      (restored.messages as Array<{ content: Array<{ text?: string }> }>)[0].content[0].text,
      `key:\n${PEM}`
    );
  });
});
