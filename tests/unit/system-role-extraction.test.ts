import test from "node:test";
import assert from "node:assert/strict";
import { extractSystemRoleMessages } from "../../open-sse/handlers/chatCore.ts";

test("extractSystemRoleMessages moves role=system to top-level system", () => {
  const payload = {
    messages: [
      { role: "system", content: "Memory context: foo" },
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.deepEqual(payload.system, [{ type: "text", text: "Memory context: foo" }]);
});

test("extractSystemRoleMessages merges with existing top-level system string", () => {
  const payload = {
    system: "You are Claude.",
    messages: [
      { role: "system", content: "Memory context: bar" },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [
    { type: "text", text: "You are Claude." },
    { type: "text", text: "Memory context: bar" },
  ]);
});

test("extractSystemRoleMessages merges with existing top-level system array", () => {
  const payload = {
    system: [{ type: "text", text: "Existing system" }],
    messages: [
      { role: "system", content: "Memory context: baz" },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [
    { type: "text", text: "Existing system" },
    { type: "text", text: "Memory context: baz" },
  ]);
});

test("extractSystemRoleMessages does nothing when no system role messages", () => {
  const payload = {
    messages: [
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.system, undefined);
});

test("extractSystemRoleMessages handles non-array messages gracefully", () => {
  const payload = { messages: "not-an-array" };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages, "not-an-array");
});

test("extractSystemRoleMessages handles empty messages array", () => {
  const payload = { messages: [] };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 0);
});

test("extractSystemRoleMessages handles case-insensitive role System", () => {
  const payload = {
    messages: [
      { role: "System", content: "Memory context: caps" },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [{ type: "text", text: "Memory context: caps" }]);
});

test("extractSystemRoleMessages drops empty text content from system messages", () => {
  const payload = {
    messages: [
      { role: "system", content: "" },
      { role: "system", content: "valid" },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [{ type: "text", text: "valid" }]);
});

test("extractSystemRoleMessages handles system messages with array content", () => {
  const payload = {
    messages: [
      {
        role: "system",
        content: [
          { type: "text", text: "Block 1" },
          { type: "text", text: "Block 2" },
        ],
      },
      { role: "user", content: "hello" },
    ],
  };
  extractSystemRoleMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.system, [
    { type: "text", text: "Block 1" },
    { type: "text", text: "Block 2" },
  ]);
});
