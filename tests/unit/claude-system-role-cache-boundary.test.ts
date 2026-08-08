// tests/unit/claude-system-role-cache-boundary.test.ts
// Regression coverage for #9436.
// Hoisting a marked system/developer block must not remove the effective cache boundary from
// messages[]. Covers both hoisting implementations plus the native Claude path.
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractSystemRoleMessages } from "../../open-sse/handlers/chatCore/claudeSystemRole.ts";
import {
  extractSystemMessagesToBody,
  normalizeClaudeUpstreamMessages,
} from "../../open-sse/handlers/chatCore/claudeUpstreamMessages.ts";

/** Breakpoint layout in the same terms the incident telemetry reports it: sys=N, msg=N. */
function layout(payload: Record<string, unknown>): { sys: number; msg: number } {
  const marked = (blocks: unknown): number =>
    Array.isArray(blocks)
      ? blocks.filter(
          (b) => b !== null && typeof b === "object" && (b as Record<string, unknown>).cache_control != null
        ).length
      : 0;
  const messages = (Array.isArray(payload.messages) ? payload.messages : []) as Array<{
    content?: unknown;
  }>;
  return {
    sys: marked(payload.system),
    msg: messages.reduce((n, m) => n + marked(m.content), 0),
  };
}

/**
 * A Claude Code shaped turn: a cached system prompt, an accumulated mid-conversation system note,
 * and the second breakpoint the client advances each round. `markerOn` selects where that second
 * breakpoint sits — on the system note (the reported defect) or on the newest tool_result (what the
 * healthy calls in the incident window show).
 */
function claudeCodeTurn(markerOn: "systemNote" | "toolResult"): Record<string, unknown> {
  const note: Record<string, unknown> = { type: "text", text: "mid-conversation system note" };
  const toolResult: Record<string, unknown> = {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content: "ok",
  };
  (markerOn === "systemNote" ? note : toolResult).cache_control = { type: "ephemeral" };

  return {
    system: [{ type: "text", text: "base system prompt", cache_control: { type: "ephemeral" } }],
    messages: [
      { role: "user", content: [{ type: "text", text: "turn 1" }] },
      { role: "assistant", content: [{ type: "text", text: "reply 1" }] },
      { role: "system", content: [note] },
      { role: "user", content: [toolResult] },
    ],
  };
}

test("#9436 hoisting a marked system note keeps a cache boundary inside messages", () => {
  const payload = claudeCodeTurn("systemNote");
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });

  extractSystemRoleMessages(payload);

  // Before the fix this was { sys: 2, msg: 0 } — the production signature behind 99.4 % of all
  // uncached input tokens in the incident window.
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});

test("#9436 the boundary lands before the hoisted note, never after it", () => {
  const payload = claudeCodeTurn("systemNote");
  extractSystemRoleMessages(payload);

  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.equal(messages.length, 3);
  // The assistant reply directly preceded the system note — same cut point in the reordered prefix.
  assert.deepEqual(messages[1].content[0].cache_control, { type: "ephemeral" });
  // Moving it onto the newer tool_result would cache content the client never marked.
  assert.equal(messages[2].content[0].cache_control, undefined);
});

test("#9436 the marker does not ride along into the system array", () => {
  const payload = claudeCodeTurn("systemNote");
  extractSystemRoleMessages(payload);

  const system = payload.system as Array<Record<string, unknown>>;
  assert.equal(system.length, 2); // merged, not dropped — #7293
  assert.equal(system[1].text, "mid-conversation system note");
  assert.equal(system[1].cache_control, undefined);
});

test("hoisting still lifts system/developer content out of messages (#7293)", () => {
  const payload = claudeCodeTurn("toolResult");
  extractSystemRoleMessages(payload);

  const messages = payload.messages as Array<{ role: string }>;
  assert.ok(!messages.some((m) => m.role === "system"));
  assert.equal((payload.system as unknown[]).length, 2);
});

test("a healthy cache-boundary layout remains unchanged", () => {
  const payload = claudeCodeTurn("toolResult");
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });

  extractSystemRoleMessages(payload);

  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.deepEqual(messages[2].content[0].cache_control, { type: "ephemeral" }); // still the tool_result
  assert.equal(messages[1].content[0].cache_control, undefined); // no marker added
});

/** A turn whose re-anchor target is already marked, so the two TTLs decide the outcome. */
function occupiedTarget(targetTtl: string, hoistedTtl: string): Record<string, unknown> {
  return {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "turn 1", cache_control: { type: "ephemeral", ttl: targetTtl } },
        ],
      },
      {
        role: "system",
        content: [
          { type: "text", text: "note", cache_control: { type: "ephemeral", ttl: hoistedTtl } },
        ],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };
}

/** Reads back both markers of an `occupiedTarget` payload after hoisting. */
function markers(payload: Record<string, unknown>): { target: unknown; hoisted: unknown } {
  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  const system = payload.system as Array<Record<string, unknown>>;
  return { target: messages[0].content[0].cache_control, hoisted: system[0].cache_control };
}

test("occupied 1h target, hoisted 5m marker: only the target marker survives", () => {
  // Keeping both would leave a 5m breakpoint in system[] ahead of the 1h one in messages[];
  // Anthropic requires the longer TTL first.
  const payload = occupiedTarget("1h", "5m");
  extractSystemRoleMessages(payload);

  assert.deepEqual(markers(payload).target, { type: "ephemeral", ttl: "1h" });
  assert.equal(markers(payload).hoisted, undefined);
  assert.deepEqual(layout(payload), { sys: 0, msg: 1 });
});

test("occupied 5m target, hoisted 1h marker: both markers survive", () => {
  const payload = occupiedTarget("5m", "1h");
  extractSystemRoleMessages(payload);

  assert.deepEqual(markers(payload).target, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(markers(payload).hoisted, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});

test("occupied target, both markers 5m: both survive", () => {
  const payload = occupiedTarget("5m", "5m");
  extractSystemRoleMessages(payload);

  assert.deepEqual(markers(payload).target, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(markers(payload).hoisted, { type: "ephemeral", ttl: "5m" });
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});

test("occupied target, both markers 1h: both survive", () => {
  const payload = occupiedTarget("1h", "1h");
  extractSystemRoleMessages(payload);

  assert.deepEqual(markers(payload).target, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(markers(payload).hoisted, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});

test("two consecutive marked system messages compete for the same target", () => {
  // No message between them, so both would re-anchor onto the same block. The first takes it;
  // the second keeps its marker rather than overwriting the first.
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "text", text: "turn 1" }] },
      {
        role: "system",
        content: [{ type: "text", text: "note a", cache_control: { type: "ephemeral", ttl: "5m" } }],
      },
      {
        role: "system",
        content: [{ type: "text", text: "note b", cache_control: { type: "ephemeral", ttl: "1h" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  const system = payload.system as Array<Record<string, unknown>>;
  assert.deepEqual(messages[0].content[0].cache_control, { type: "ephemeral", ttl: "5m" });
  assert.equal(system[0].cache_control, undefined); // note a — moved
  assert.deepEqual(system[1].cache_control, { type: "ephemeral", ttl: "1h" }); // note b — kept
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 }); // two in, two out
});

test("several marked system messages keep one boundary each, without adding any", () => {
  // The `sys=3,msg=0` shape from the incident window: more than one hoisted block carries a marker.
  const payload: Record<string, unknown> = {
    system: [{ type: "text", text: "base", cache_control: { type: "ephemeral" } }],
    messages: [
      { role: "user", content: [{ type: "text", text: "turn 1" }] },
      {
        role: "system",
        content: [{ type: "text", text: "note a", cache_control: { type: "ephemeral" } }],
      },
      { role: "assistant", content: [{ type: "text", text: "reply 1" }] },
      {
        role: "system",
        content: [{ type: "text", text: "note b", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  const after = layout(payload);
  assert.equal(after.sys, 1); // only the client's own system prompt keeps its marker
  assert.equal(after.msg, 2); // one boundary per hoisted note, each at its own position
  // Anthropic caps a request at four breakpoints, so relocation must never inflate the count.
  assert.equal(after.sys + after.msg, 3);
});

test("with no usable preceding message the marker stays on the hoisted block", () => {
  // A shorter cached prefix is acceptable; a longer one would cache content the client did not
  // mark. Nothing precedes the note here, so system[] is the same cut point.
  const payload: Record<string, unknown> = {
    messages: [
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 1" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  assert.deepEqual(layout(payload), { sys: 1, msg: 0 });
  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.equal(messages[0].content[0].cache_control, undefined);
});

test("#9436 also holds for the second hoisting implementation", () => {
  // extractSystemMessagesToBody is a near-duplicate of extractSystemRoleMessages; a fix that
  // touches only one of them leaves the other path broken.
  const payload = claudeCodeTurn("systemNote");
  extractSystemMessagesToBody(payload);
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});

test("the second hoisting implementation resolves an occupied target identically", () => {
  const dropped = occupiedTarget("1h", "5m");
  extractSystemMessagesToBody(dropped);
  assert.equal(markers(dropped).hoisted, undefined);
  assert.deepEqual(layout(dropped), { sys: 0, msg: 1 });

  const kept = occupiedTarget("5m", "1h");
  extractSystemMessagesToBody(kept);
  assert.deepEqual(markers(kept).hoisted, { type: "ephemeral", ttl: "1h" });
  assert.deepEqual(layout(kept), { sys: 1, msg: 1 });
});

test("a thinking block is never chosen as the boundary", () => {
  const payload: Record<string, unknown> = {
    messages: [
      {
        role: "assistant",
        content: [
          { type: "text", text: "reply 1" },
          { type: "thinking", thinking: "…", signature: "sig" },
        ],
      },
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.deepEqual(messages[0].content[0].cache_control, { type: "ephemeral" }); // the text block
  assert.equal(messages[0].content[1].cache_control, undefined); // the thinking block
  assert.deepEqual(layout(payload), { sys: 0, msg: 1 });
});

test("with only thinking and empty text before it the marker stays on the hoisted block", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "text", text: "" }] },
      { role: "assistant", content: [{ type: "thinking", thinking: "…", signature: "sig" }] },
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  assert.deepEqual(layout(payload), { sys: 1, msg: 0 });
  assert.deepEqual((payload.system as Array<Record<string, unknown>>)[0].cache_control, {
    type: "ephemeral",
  });
});

test("a tool_result whose array yields no text is skipped as a target", () => {
  // Normalisation keeps only the non-empty text parts of a tool_result array, so this block is
  // dropped entirely — anchoring the boundary on it would lose the marker again.
  const payload: Record<string, unknown> = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "toolu_1",
            content: [
              { type: "image", source: { type: "base64", media_type: "image/png", data: "iVBOR" } },
              { type: "text", text: "" },
            ],
          },
        ],
      },
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  extractSystemRoleMessages(payload);

  assert.deepEqual(layout(payload), { sys: 1, msg: 0 });
  assert.deepEqual((payload.system as Array<Record<string, unknown>>)[0].cache_control, {
    type: "ephemeral",
  });
});

test("a marker relocated onto a tool_result survives its collapse into text", () => {
  const payload: Record<string, unknown> = {
    messages: [
      { role: "user", content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "ok" }] },
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
      { role: "user", content: [{ type: "text", text: "turn 2" }] },
    ],
  };

  // Without preserveToolResultBlocks the tool_result is rewritten into a plain text block.
  normalizeClaudeUpstreamMessages(payload);

  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.equal(messages[0].content[0].type, "text");
  assert.match(messages[0].content[0].text as string, /^\[Tool Result: toolu_1\]/);
  assert.deepEqual(messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(layout(payload), { sys: 0, msg: 1 });
});

test("a marker relocated onto an inlined document survives its conversion to text", () => {
  const payload: Record<string, unknown> = {
    messages: [
      {
        role: "user",
        content: [
          { type: "document", name: "notes.txt", document: {}, content: "document body" },
        ],
      },
      {
        role: "system",
        content: [{ type: "text", text: "note", cache_control: { type: "ephemeral" } }],
      },
    ],
  };

  normalizeClaudeUpstreamMessages(payload);

  const messages = payload.messages as Array<{ content: Array<Record<string, unknown>> }>;
  assert.equal(messages[0].content[0].type, "text");
  assert.match(messages[0].content[0].text as string, /^\[notes\.txt\]\ndocument body$/);
  assert.deepEqual(messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(layout(payload), { sys: 0, msg: 1 });
});

test("#9436 holds on the native Claude path through normalizeClaudeUpstreamMessages", () => {
  // Path proof: the hoist is not confined to the semantic-passthrough branch — the function the
  // native Claude passthrough calls routes through extractSystemRoleMessages.
  const payload = claudeCodeTurn("systemNote");
  normalizeClaudeUpstreamMessages(payload, { preserveToolResultBlocks: true });

  const messages = payload.messages as Array<{ role: string }>;
  assert.ok(!messages.some((m) => m.role === "system"));
  assert.deepEqual(layout(payload), { sys: 1, msg: 1 });
});
