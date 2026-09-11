import { test } from "node:test";
import assert from "node:assert/strict";
import { buildQuery } from "../../open-sse/executors/perplexity-web/protocol.ts";

test("PR #3: buildQuery preserves system contract on follow-up requests", () => {
  const parsed = {
    systemMsg: "You are an expert coder. <tool>contract</tool>",
    history: [],
    currentMsg: "How do I reverse a string in JS?"
  };

  // Turn 1: followUpUuid is null
  const turn1Raw = buildQuery(parsed, null);
  const turn1Obj = JSON.parse(turn1Raw);
  assert.ok(turn1Obj.instructions !== undefined, "Turn 1 JSON should contain instructions");
  assert.equal(turn1Obj.instructions[0], "You are an expert coder. <tool>contract</tool>");

  // Turn 2: follow-up request
  const parsedTurn2 = {
    systemMsg: "You are an expert coder. <tool>contract</tool>",
    history: [{ role: "user", content: "How do I reverse a string in JS?" }, { role: "assistant", content: "Use .reverse()" }],
    currentMsg: "What about Python?"
  };
  const turn2Output = buildQuery(parsedTurn2, "abc-123");

  // Since we append systemMsg to currentMsg for follow-ups (Approach B)
  assert.ok(turn2Output.includes("<tool>contract</tool>"), "Follow-up query should preserve the tool contract");
  assert.ok(turn2Output.includes("What about Python?"), "Follow-up query should include the current message");
});
