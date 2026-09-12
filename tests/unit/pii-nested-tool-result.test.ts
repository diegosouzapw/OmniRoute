import test from "node:test";
import assert from "node:assert/strict";

process.env.PII_REDACTION_ENABLED = "true";

import { PIIMaskerGuardrail } from "../../src/lib/guardrails/piiMasker";
import type { GuardrailContext } from "../../src/lib/guardrails/base";

const SSN = "123-45-6789";
const CONTEXT = {} as GuardrailContext;

const guardrail = new PIIMaskerGuardrail();

async function mask(payload: unknown) {
  const result = await guardrail.preCall(payload, CONTEXT);
  const out = (result as { modifiedPayload?: unknown }).modifiedPayload ?? payload;
  return {
    out,
    serialised: JSON.stringify(out),
    meta: result.meta as Record<string, unknown> | null,
  };
}

const userTurn = (content: unknown) => ({ messages: [{ role: "user", content }] });

test.describe("PII masking reaches nested content blocks", () => {
  // The defect. A tool_result carries its payload as an array of parts, which
  // is what every agentic client sends back after running a tool. The masker
  // only descended into a `content` that was a string, so it walked past this.
  test("a tool_result's array content is masked", async () => {
    const { serialised } = await mask(
      userTurn([
        { type: "text", text: `visible ${SSN}` },
        {
          type: "tool_result",
          tool_use_id: "toolu_1",
          content: [{ type: "text", text: `tool output ${SSN}` }],
        },
      ])
    );

    assert.ok(!serialised.includes(SSN), `SSN survived: ${serialised}`);
    assert.equal(serialised.match(/\[SSN_REDACTED\]/g)?.length, 2);
  });

  test("the sibling block being masked is not enough on its own", async () => {
    // Pins what the bug looked like from outside: the payload came back
    // `modified: true` with a redaction in it, so nothing downstream could tell
    // that a second copy of the same SSN had gone out untouched.
    const { out } = await mask(
      userTurn([
        { type: "text", text: `visible ${SSN}` },
        { type: "tool_result", content: [{ type: "text", text: `tool output ${SSN}` }] },
      ])
    );

    const blocks = (
      out as { messages: { content: { text?: string; content?: { text: string }[] }[] }[] }
    ).messages[0].content;
    assert.equal(blocks[0].text, "visible [SSN_REDACTED]");
    assert.equal(blocks[1].content?.[0].text, "tool output [SSN_REDACTED]");
  });

  test("nesting deeper than one tool_result is still reached", async () => {
    const { serialised } = await mask(
      userTurn([
        {
          type: "tool_result",
          content: [{ type: "tool_result", content: [{ type: "text", text: `deep ${SSN}` }] }],
        },
      ])
    );

    assert.ok(!serialised.includes(SSN), `SSN survived: ${serialised}`);
  });

  // The branch this change replaces, so it cannot be lost silently.
  test("a string content on a block is still masked", async () => {
    const { serialised } = await mask(
      userTurn([{ type: "tool_result", tool_use_id: "toolu_1", content: `tool output ${SSN}` }])
    );

    assert.ok(!serialised.includes(SSN), `SSN survived: ${serialised}`);
  });

  test("a payload with nothing to mask is passed through unchanged", async () => {
    const payload = userTurn([
      { type: "tool_result", content: [{ type: "text", text: "no personal data here" }] },
    ]);

    const result = await guardrail.preCall(payload, CONTEXT);

    assert.equal((result as { modifiedPayload?: unknown }).modifiedPayload, undefined);
  });

  test("the nested detection is counted, not just redacted", async () => {
    const { meta } = await mask(
      userTurn([{ type: "tool_result", content: [{ type: "text", text: `tool output ${SSN}` }] }])
    );

    assert.equal(meta?.redacted, true);
    assert.equal(meta?.detections, 1);
  });
});
