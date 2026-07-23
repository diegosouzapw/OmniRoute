/**
 * Integration coverage for delegated Context Editing (backlog item N1): proves
 * the end-to-end wiring through `BaseExecutor.execute()` — the `contextEditing`
 * flag threaded from handleChatCore reaches the Claude pre-serialization
 * chokepoint and lands `context_management.clear_tool_uses` in the OUTBOUND
 * request body. Mirrors the fetch-capture pattern in executor-default-base.test.ts.
 *
 * The pure edit-builder is unit-tested separately
 * (tests/unit/compression/context-editing.test.ts); these assert it is actually
 * invoked, Claude-only, and composes with the fingerprint path's clear_thinking.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { CLEAR_TOOL_USES_STRATEGY } from "../../open-sse/config/contextEditing.ts";

const CLEAR_THINKING_STRATEGY = "clear_thinking_20251015";

function mockFetchCapture() {
  const bodies: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(init.body ?? "{}")));
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  return { bodies, restore: () => void (globalThis.fetch = original) };
}

function toolUseEdits(body: Record<string, unknown> | undefined) {
  const cm = body?.context_management as { edits?: Array<{ type?: string }> } | undefined;
  return (cm?.edits ?? []).filter((e) => e?.type === CLEAR_TOOL_USES_STRATEGY);
}

test("#5312: generic Claude OAuth clients do not get implicit adaptive thinking", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { accessToken: "sk-ant-oat-generic-client-token" },
      clientHeaders: {
        "user-agent": "Cursor/1.0",
      },
      contextEditing: { enabled: false },
    });
  } finally {
    restore();
  }

  assert.equal(bodies[0]?.thinking, undefined);
  assert.equal(bodies[0]?.output_config, undefined);
  assert.equal(bodies[0]?.context_management, undefined);
});

test("#5312: generic Claude OAuth clients can opt in to adaptive thinking", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { accessToken: "sk-ant-oat-generic-client-token" },
      clientHeaders: {
        "user-agent": "Cursor/1.0",
        "x-omniroute-thinking": "adaptive",
      },
      contextEditing: { enabled: false },
    });
  } finally {
    restore();
  }

  assert.deepEqual(bodies[0]?.thinking, { type: "adaptive" });
  assert.deepEqual(bodies[0]?.context_management, {
    edits: [{ type: CLEAR_THINKING_STRATEGY, keep: "all" }],
  });
});

test("Context Editing: enabled → genuine claude request gets clear_tool_uses with defaults", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }

  const edits = toolUseEdits(bodies[0]);
  assert.equal(edits.length, 1, "clear_tool_uses edit must be present in the outbound body");
  assert.deepEqual((edits[0] as Record<string, unknown>).trigger, {
    type: "input_tokens",
    value: 100000,
  });
  assert.deepEqual((edits[0] as Record<string, unknown>).keep, {
    type: "tool_uses",
    value: 3,
  });
});

test("Context Editing: disabled → no clear_tool_uses edit on the outbound body", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key" },
      contextEditing: { enabled: false },
    });
  } finally {
    restore();
  }

  assert.equal(toolUseEdits(bodies[0]).length, 0);
});

test("Context Editing: composes with the fingerprint path's clear_thinking (thinking first)", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    // apiKey + Claude Code CLI client headers trigger the fingerprint block,
    // which sets context_management.edits = [clear_thinking]. Our injection must
    // append clear_tool_uses AFTER it (Anthropic requires clear_thinking first).
    await new DefaultExecutor("claude").execute({
      model: "claude-opus-4-7",
      body: {
        model: "claude-opus-4-7",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "claude-key", providerSpecificData: { ccSessionId: "s1" } },
      clientHeaders: {
        "x-app": "cli",
        "user-agent": "claude-cli/2.1.116 (external, cli)",
      },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }

  const cm = bodies[0]?.context_management as { edits?: Array<{ type?: string }> } | undefined;
  const edits = cm?.edits ?? [];
  const thinkingIdx = edits.findIndex((e) => e.type === CLEAR_THINKING_STRATEGY);
  const toolIdx = edits.findIndex((e) => e.type === CLEAR_TOOL_USES_STRATEGY);
  assert.ok(thinkingIdx >= 0, "clear_thinking should be present on the CLI path");
  assert.ok(toolIdx >= 0, "clear_tool_uses should be appended");
  assert.ok(thinkingIdx < toolIdx, "clear_thinking must precede clear_tool_uses");
});

test("Context Editing: non-Claude provider never receives context_management even when enabled", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("openai").execute({
      model: "gpt-4.1",
      body: {
        model: "gpt-4.1",
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      stream: false,
      credentials: { apiKey: "sk-openai" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }

  assert.equal(bodies[0]?.context_management, undefined);
});
