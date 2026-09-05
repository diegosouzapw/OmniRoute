import test from "node:test";
import assert from "node:assert/strict";
import {
  extractSystemRoleMessages,
  relocateDirectiveOnlyMessages,
} from "../../../open-sse/handlers/chatCore.ts";

// Claude Code 2.1.154+ clients send directives as system-role messages with an
// empty content array and a message-level output_config. Anthropic rejects the
// directive-only form when it lands at messages[0] (the initial system prompt
// position) while accepting it at any other position. Upstream error text:
//   messages.0: use the top-level 'system' parameter for the initial system
//   prompt; the directive-only form (content: [] with output_config) is
//   accepted at any position
// Measured in production: 122x 400 in one hour on the offical-claude combo.

test("relocateDirectiveOnlyMessages moves a directive-only messages[0] past the first real turn", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.deepEqual(payload.messages[1].output_config, { effort: "high" });
  assert.equal(payload.messages[2].role, "assistant");
});

test("relocateDirectiveOnlyMessages skips consecutive system messages to find the real turn", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: "mid-conversation context" },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0].role, "system");
  assert.equal(payload.messages[0].content, "mid-conversation context");
  assert.equal(payload.messages[1].role, "user");
  assert.equal(payload.messages[2].role, "system");
  assert.deepEqual(payload.messages[2].output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages drops an empty system message without output_config at messages[0]", () => {
  const payload = {
    messages: [
      { role: "system", content: [] },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].role, "user");
});

test("relocateDirectiveOnlyMessages folds output_config to top level when no real turn exists", () => {
  const payload = {
    messages: [{ role: "system", content: [], output_config: { effort: "xhigh" } }],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 0);
  assert.deepEqual(payload.output_config, { effort: "xhigh" });
});

test("relocateDirectiveOnlyMessages keeps an existing top-level output_config untouched", () => {
  const payload = {
    output_config: { effort: "low" },
    messages: [{ role: "system", content: [], output_config: { effort: "xhigh" } }],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 0);
  assert.deepEqual(payload.output_config, { effort: "low" });
});

test("relocateDirectiveOnlyMessages is a no-op for a normal user first message", () => {
  const payload = {
    messages: [
      { role: "user", content: "hello" },
      { role: "system", content: [], output_config: { effort: "high" } },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.equal(payload.messages[1].content.length, 0);
  assert.deepEqual(payload.messages[1].output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages relocates a directive after an empty system message", () => {
  const payload = {
    messages: [
      { role: "system", content: [] },
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.deepEqual(payload.messages[1].output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages relocates consecutive directives in order", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: [], output_config: { effort: "low" } },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.deepEqual(payload.messages[1].output_config, { effort: "high" });
  assert.equal(payload.messages[2].role, "system");
  assert.deepEqual(payload.messages[2].output_config, { effort: "low" });
});

test("relocateDirectiveOnlyMessages walks past a text system message to find the anchor", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: "real system prompt" },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0].content, "real system prompt");
  assert.equal(payload.messages[1].role, "user");
  assert.equal(payload.messages[2].role, "system");
  assert.deepEqual(payload.messages[2].output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages is a no-op for a system message with text content", () => {
  const payload = {
    messages: [
      { role: "system", content: "real system prompt" },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].content, "real system prompt");
});

test("relocateDirectiveOnlyMessages handles a non-array messages field", () => {
  const payload = { messages: "not-an-array" };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages, "not-an-array");
});

test("relocateDirectiveOnlyMessages handles an empty messages array", () => {
  const payload = { messages: [] };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 0);
});

test("relocateDirectiveOnlyMessages handles developer-role directives too", () => {
  const payload = {
    messages: [
      { role: "developer", content: [], output_config: { format: { type: "json_schema" } } },
      { role: "user", content: "hello" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "developer");
  assert.deepEqual(payload.messages[1].output_config, {
    format: { type: "json_schema" },
  });
});

test("extractSystemRoleMessages preserves the output_config of directive-only messages", () => {
  const payload = {
    messages: [
      { role: "system", content: "Memory context: foo" },
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].role, "user");
  assert.deepEqual(payload.system, [{ type: "text", text: "Memory context: foo" }]);
  assert.deepEqual(payload.output_config, { effort: "high" });
});

test("extractSystemRoleMessages keeps an existing top-level output_config", () => {
  const payload = {
    output_config: { effort: "low" },
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.output_config, { effort: "low" });
});

test("extractSystemRoleMessages folds output_config even when the message also has text", () => {
  const payload = {
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "Text + directive" }],
        output_config: { effort: "high" },
      },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [{ type: "text", text: "Text + directive" }]);
  assert.deepEqual(payload.output_config, { effort: "high" });
});

test("extractSystemRoleMessages keeps the first directive output_config among several", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: [], output_config: { effort: "low" } },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.output_config, { effort: "high" });
});

test("extractSystemRoleMessages folds output_config for string-content messages too", () => {
  const payload = {
    messages: [
      { role: "system", content: "String content", output_config: { effort: "high" } },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [{ type: "text", text: "String content" }]);
  assert.deepEqual(payload.output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages does not throw on a null first message", () => {
  const payload = {
    messages: [null, { role: "user", content: "hello" }],
  };
  assert.doesNotThrow(() => relocateDirectiveOnlyMessages(payload));
  assert.equal(payload.messages.length, 2);
});

test("relocateDirectiveOnlyMessages does not throw on a null anchor candidate", () => {
  const payload = {
    messages: [
      { role: "system", content: [], output_config: { effort: "high" } },
      null,
      { role: "user", content: "hello" },
    ],
  };
  assert.doesNotThrow(() => relocateDirectiveOnlyMessages(payload));
  // The null entry stays where it was; the directive lands after the real turn.
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0], null);
  assert.equal(payload.messages[1].role, "user");
  assert.equal(payload.messages[2].role, "system");
  assert.deepEqual(payload.messages[2].output_config, { effort: "high" });
});

test("relocateDirectiveOnlyMessages drops plain empties but keeps text system messages with no real turn", () => {
  const payload = {
    messages: [
      { role: "system", content: [] },
      { role: "system", content: "keep me" },
    ],
  };
  relocateDirectiveOnlyMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].content, "keep me");
  assert.equal(payload.output_config, undefined);
});
