import test from "node:test";
import assert from "node:assert/strict";
import {
  hoistLeadingSystemMessages,
  relocateDirectiveOnlyMessages,
} from "../../open-sse/services/claudeCodeConstraints.ts";
import { shouldUseMidConversationSystem } from "../../open-sse/executors/claudeIdentity.ts";

// #10547: Anthropic rejects ANY role:"system" message at messages[0] — the
// initial-system-prompt position — even with text content, not just the
// empty-directive shape #10457 covered. The mid-conversation-system passthrough
// (provider `claude`, Opus with beta) keeps system-role messages inside
// messages[], but OmniRoute itself unshifts a textual leading system onto the
// front of the array: applyOutputStyles() injects
// "[OmniRoute Output Styles]..." as `{ role:"system", content:string }`, and
// that happens the moment a request carries tools (skill invocation, attached
// documents) which flips on shouldUseMidConversationSystem(). Upstream's
// hoistLeadingSystemMessages + relocateDirectiveOnlyMessages (wired via
// finalizeClaudeBodyConstraints in open-sse/executors/base.ts) cover both
// shapes; the regression guard below applies them in that same order.

function normalizeLeadingSystemMessages(payload: Record<string, unknown>): void {
  hoistLeadingSystemMessages(payload);
  relocateDirectiveOnlyMessages(payload);
}

test("shouldUseMidConversationSystem matches claude/claude-opus-5 despite the provider prefix", () => {
  // matchesModelPrefix uses .includes(), so the routing prefix does not
  // disable the mid-conversation beta — the failure path really is active
  // for claude/claude-opus-5.
  assert.equal(
    shouldUseMidConversationSystem(
      { system: [{ type: "text", text: "s" }], tools: [{ name: "Bash" }] },
      "claude/claude-opus-5"
    ),
    true
  );
});

test("hoists a leading textual system past the first real turn into top-level system", () => {
  const payload = {
    system: [{ type: "text", text: "x-anthropic-billing-header: cc_version=2.1.205.ca0;" }],
    messages: [
      {
        role: "system",
        content: "[OmniRoute Output Styles]\nRespond concise. Drop filler.",
      },
      { role: "user", content: "hello" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "x-anthropic-billing-header: cc_version=2.1.205.ca0;" },
    { type: "text", text: "[OmniRoute Output Styles]\nRespond concise. Drop filler." },
  ]);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].role, "user");
});

test("keeps genuine mid-conversation system blocks after the first real turn", () => {
  const payload = {
    system: [{ type: "text", text: "billing" }],
    messages: [
      { role: "system", content: "[OmniRoute Output Styles]\nConcise." },
      { role: "user", content: "Use the skill" },
      { role: "system", content: "Available agent types for the Agent tool:" },
      { role: "assistant", content: "ok" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  // Leading textual system hoisted, real turn now first, mid block untouched.
  assert.equal(payload.messages.length, 3);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.equal(payload.messages[1].content, "Available agent types for the Agent tool:");
  assert.equal(payload.messages[2].role, "assistant");
});

test("relocates directive-only leading messages and hoists textual ones in one pass", () => {
  const payload = {
    messages: [
      { role: "system", content: "leading text" },
      { role: "system", content: [], output_config: { effort: "high" } },
      { role: "system", content: [] },
      { role: "user", content: "hello" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.system, [{ type: "text", text: "leading text" }]);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.deepEqual(payload.messages[1].output_config, { effort: "high" });
});

test("drops plain empty leading systems without any output_config", () => {
  const payload = {
    messages: [
      { role: "system", content: [] },
      { role: "user", content: "hello" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.system, undefined);
});

test("folds output_config to top level when no real turn exists", () => {
  const payload = {
    messages: [
      { role: "system", content: "lead" },
      { role: "system", content: [], output_config: { effort: "xhigh" } },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.system, [{ type: "text", text: "lead" }]);
  assert.equal(payload.messages.length, 0);
  assert.deepEqual(payload.output_config, { effort: "xhigh" });
});

test("does not clobber an existing top-level output_config", () => {
  const payload = {
    output_config: { effort: "low" },
    messages: [{ role: "system", content: "lead" }],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.output_config, { effort: "low" });
});

test("hoists text blocks into top-level system with the block carried as-is", () => {
  // The hoist itself preserves the block (including any cache_control marker);
  // the prompt-cache boundary relocation is handled separately by
  // relocateHoistedCacheBoundary in the extract paths (chatCore/claudeSystemRole.ts,
  // chatCore/claudeUpstreamMessages.ts).
  const payload = {
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "hoisted block", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: "hello" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.system, [
    { type: "text", text: "hoisted block", cache_control: { type: "ephemeral" } },
  ]);
  assert.equal(payload.messages.length, 1);
  assert.equal(payload.messages[0].role, "user");
});

test("is a no-op when the first message is not a system role", () => {
  const payload = {
    messages: [
      { role: "user", content: "hello" },
      { role: "system", content: "mid" },
    ],
  };
  normalizeLeadingSystemMessages(payload);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0].role, "user");
  assert.equal(payload.messages[1].role, "system");
  assert.equal(payload.system, undefined);
});

test("walks past null entries to find the insertion anchor", () => {
  const payload = {
    messages: [{ role: "system", content: "lead" }, null, { role: "user", content: "hello" }],
  };
  normalizeLeadingSystemMessages(payload);
  assert.deepEqual(payload.system, [{ type: "text", text: "lead" }]);
  assert.equal(payload.messages.length, 2);
  assert.equal(payload.messages[0], null);
  assert.equal(payload.messages[1].role, "user");
});

test("does not throw on a non-array or empty messages field", () => {
  const a = { messages: "nope" };
  assert.doesNotThrow(() => normalizeLeadingSystemMessages(a));
  assert.equal(a.messages, "nope");
  const b = { messages: [] };
  assert.doesNotThrow(() => normalizeLeadingSystemMessages(b));
  assert.equal(b.messages.length, 0);
});
