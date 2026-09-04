import assert from "node:assert/strict";
import { test } from "node:test";

import {
  hoistLeadingTextSystemMessages,
  relocateDirectiveOnlyMessages,
} from "../../open-sse/handlers/chatCore/claudeSystemRole.ts";

// Reproduction of the production 400 (2026-09-03/04): Output Styles injects a
// text system message at messages[0]; on the mid-conversation-system passthrough
// Anthropic rejects it ("use the top-level 'system' parameter for the initial
// system prompt").
test("hoistLeadingTextSystemMessages moves a text system messages[0] into top-level system", () => {
  const payload: Record<string, unknown> = {
    system: [{ type: "text", text: "You are Claude." }],
    output_config: { effort: "medium" },
    messages: [
      { role: "system", content: "[OmniRoute Output Styles]\nRespond terse." },
      { role: "user", content: "Reply exactly: MIDCONV_TOPLEVEL_OK" },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "You are Claude." },
    { type: "text", text: "[OmniRoute Output Styles]\nRespond terse." },
  ]);
  assert.equal((payload.messages as Array<{ role: string }>)[0].role, "user");
  assert.equal((payload.messages as unknown[]).length, 1);
});

test("hoistLeadingTextSystemMessages converts a string top-level system and keeps mid-conversation system turns", () => {
  const payload: Record<string, unknown> = {
    system: "base",
    messages: [
      { role: "system", content: [{ type: "text", text: "style" }] },
      { role: "user", content: "hello" },
      { role: "system", content: "mid-conversation context" },
      { role: "assistant", content: "hi" },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "base" },
    { type: "text", text: "style" },
  ]);
  const roles = (payload.messages as Array<{ role: string }>).map((m) => m.role);
  assert.deepEqual(roles, ["user", "system", "assistant"]);
});

test("hoistLeadingTextSystemMessages leaves directive-only messages for relocateDirectiveOnlyMessages", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: "style" },
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.deepEqual(payload.system, [{ type: "text", text: "style" }]);
  relocateDirectiveOnlyMessages(payload);
  const msgs = payload.messages as Array<Record<string, unknown>>;
  assert.equal(msgs[0].role, "user");
  assert.equal(msgs[1].role, "system");
  assert.deepEqual(msgs[1].output_config, { effort: "high" });
  assert.equal(msgs[2].role, "assistant");
});

test("hoistLeadingTextSystemMessages is a no-op for a normal user first message", () => {
  const payload: Record<string, unknown> = {
    system: "base",
    messages: [{ role: "user", content: "hello" }],
  };
  hoistLeadingTextSystemMessages(payload);
  assert.equal(payload.system, "base");
  assert.equal((payload.messages as unknown[]).length, 1);
});
