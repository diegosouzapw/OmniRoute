/**
 * TDD for F4.2 + F4.3 — Context Editing relay coverage + 400-fallback.
 *
 * F4.3: extend the delegated-context-editing gate beyond genuine `claude` to
 *       Claude-Code-compatible relays (`anthropic-compatible-cc-*`), which advertise
 *       Claude Code compatibility and so are the relays most likely to accept the
 *       `context_management` beta. Genuine `claude-web` (a browser relay with a
 *       different request shape) and generic `anthropic-compatible-*` stay excluded.
 *
 * F4.2: if any Claude-compatible upstream returns 400 rejecting context_management,
 *       strip the param and retry once so the request degrades gracefully.
 *
 * Mirrors the fetch-capture pattern in context-editing-executor-injection.test.ts.
 *
 * Run: node --import tsx/esm --test tests/unit/context-editing-relays.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { CLEAR_TOOL_USES_STRATEGY } from "../../open-sse/config/contextEditing.ts";

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

/** First call returns `status` with `errorText`; subsequent calls return 200 OK. */
function mockFetchErrorThenOk(status: number, errorText: string) {
  const bodies: Array<Record<string, unknown>> = [];
  const original = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = (async (_url: unknown, init: { body?: unknown } = {}) => {
    bodies.push(JSON.parse(String(init.body ?? "{}")));
    calls += 1;
    if (calls === 1) {
      return new Response(errorText, {
        status,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof globalThis.fetch;
  return { bodies, callCount: () => calls, restore: () => void (globalThis.fetch = original) };
}

function toolUseEdits(body: Record<string, unknown> | undefined) {
  const cm = body?.context_management as { edits?: Array<{ type?: string }> } | undefined;
  return (cm?.edits ?? []).filter((e) => e?.type === CLEAR_TOOL_USES_STRATEGY);
}

const baseBody = {
  model: "claude-opus-4-8",
  messages: [{ role: "user", content: "hi" }],
  max_tokens: 1,
};

// ── F4.3: relay gate coverage ───────────────────────────────────────────────

test("F4.3: anthropic-compatible-cc-* relay → clear_tool_uses lands in the body", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("anthropic-compatible-cc-myrelay").execute({
      model: "claude-opus-4-8",
      body: { ...baseBody },
      stream: false,
      credentials: { apiKey: "relay-key", baseUrl: "https://relay.example/v1" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }
  assert.equal(
    toolUseEdits(bodies[0]).length,
    1,
    "cc-* relay must receive the delegated clear_tool_uses edit"
  );
});

test("F4.3: generic anthropic-compatible-* (non-cc) relay → NO context_management", async () => {
  const { bodies, restore } = mockFetchCapture();
  try {
    await new DefaultExecutor("anthropic-compatible-plainrelay").execute({
      model: "claude-opus-4-8",
      body: { ...baseBody },
      stream: false,
      credentials: { apiKey: "relay-key", baseUrl: "https://relay.example/v1" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }
  assert.equal(
    bodies[0]?.context_management,
    undefined,
    "generic anthropic-compatible relay must NOT receive context_management (uncertain beta support)"
  );
});

// ── F4.2: 400-fallback ──────────────────────────────────────────────────────

test("F4.2: upstream 400 rejecting context_management → strips it and retries once", async () => {
  const { bodies, callCount, restore } = mockFetchErrorThenOk(
    400,
    JSON.stringify({ type: "error", error: { message: "context_management is not supported" } })
  );
  try {
    await new DefaultExecutor("anthropic-compatible-cc-myrelay").execute({
      model: "claude-opus-4-8",
      body: { ...baseBody },
      stream: false,
      credentials: { apiKey: "relay-key", baseUrl: "https://relay.example/v1" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }
  assert.equal(callCount(), 2, "must retry exactly once after the context_management 400");
  assert.equal(toolUseEdits(bodies[0]).length, 1, "first attempt carried context_management");
  assert.equal(
    bodies[1]?.context_management,
    undefined,
    "retry must drop context_management entirely"
  );
});

test("F4.2: an UNRELATED 400 does NOT strip context_management or retry", async () => {
  const { bodies, callCount, restore } = mockFetchErrorThenOk(
    400,
    JSON.stringify({ type: "error", error: { message: "max_tokens: must be >= 1" } })
  );
  try {
    await new DefaultExecutor("anthropic-compatible-cc-myrelay").execute({
      model: "claude-opus-4-8",
      body: { ...baseBody },
      stream: false,
      credentials: { apiKey: "relay-key", baseUrl: "https://relay.example/v1" },
      contextEditing: { enabled: true },
    });
  } finally {
    restore();
  }
  assert.equal(callCount(), 1, "an unrelated 400 must not trigger the context-editing retry");
  assert.equal(toolUseEdits(bodies[0]).length, 1, "the single attempt still carried the edit");
});
