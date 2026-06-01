import test from "node:test";
import assert from "node:assert";
import {
  resolveUniversalHandoffConfig,
  buildUniversalHandoffSystemMessage,
  injectUniversalHandoffBody,
  type HandoffPayload,
} from "../../open-sse/services/contextHandoff.ts";

// ── resolveUniversalHandoffConfig ────────────────────────────────────────────

test("resolveUniversalHandoffConfig returns disabled defaults when no config", () => {
  const r = resolveUniversalHandoffConfig(null, null);
  assert.strictEqual(r.enabled, true);
  assert.strictEqual(r.trigger, "on-switch");
  assert.strictEqual(r.ttlMinutes, 300);
  assert.strictEqual(r.maxMessagesForSummary, 30);
  assert.strictEqual(r.preserveSystemPrompt, true);
});

test("applies combo-level config over defaults", () => {
  const r = resolveUniversalHandoffConfig(
    { enabled: true, trigger: "always", ttlMinutes: 60 } as any,
    null
  );
  assert.strictEqual(r.enabled, true);
  assert.strictEqual(r.trigger, "always");
  assert.strictEqual(r.ttlMinutes, 60);
});

test("applies global-level config when combo not set", () => {
  const r = resolveUniversalHandoffConfig(null, {
    enabled: true,
    maxMessagesForSummary: 15,
  } as any);
  assert.strictEqual(r.enabled, true);
  assert.strictEqual(r.maxMessagesForSummary, 15);
});

test("gives combo priority over global", () => {
  const r = resolveUniversalHandoffConfig({ enabled: true } as any, { enabled: false } as any);
  assert.strictEqual(r.enabled, true);
});

test("invalid trigger defaults to on-switch", () => {
  const r = resolveUniversalHandoffConfig({ trigger: "bogus" } as any, null);
  assert.strictEqual(r.trigger, "on-switch");
});

test("on-error trigger is preserved", () => {
  const r = resolveUniversalHandoffConfig({ trigger: "on-error" } as any, null);
  assert.strictEqual(r.trigger, "on-error");
});

test("clamps ttlMinutes to range [1, 10080]", () => {
  const low = resolveUniversalHandoffConfig({ ttlMinutes: 0 } as any, null);
  assert.strictEqual(low.ttlMinutes, 1);
  const high = resolveUniversalHandoffConfig({ ttlMinutes: 99999 } as any, null);
  assert.strictEqual(high.ttlMinutes, 10080);
});

test("clamps maxMessagesForSummary to range [5, 100]", () => {
  const low = resolveUniversalHandoffConfig({ maxMessagesForSummary: 1 } as any, null);
  assert.strictEqual(low.maxMessagesForSummary, 5);
  const high = resolveUniversalHandoffConfig({ maxMessagesForSummary: 999 } as any, null);
  assert.strictEqual(high.maxMessagesForSummary, 100);
});

test("providerAllowlist is resolved from combo config", () => {
  const r = resolveUniversalHandoffConfig(
    { providerAllowlist: ["anthropic", "openai"] } as any,
    null
  );
  assert.deepStrictEqual(r.providerAllowlist, ["anthropic", "openai"]);
});

// ── buildUniversalHandoffSystemMessage ──────────────────────────────────────

const PREV = "claude-sonnet-4-20250514";
const CURR = "gpt-4o-2025-05-14";
const REASON = "Model routing: claude-sonnet-4 → gpt-4o";

function makePayload(overrides?: Partial<HandoffPayload>): HandoffPayload {
  return {
    id: "test-id",
    sessionId: "ses_123",
    comboName: "master",
    fromAccount: "acc1",
    summary: "We discussed the architecture and decided to use SQLite.",
    keyDecisions: ["Use SQLite for persistence"],
    taskProgress: "Design phase complete",
    activeEntities: ["database.ts"],
    messageCount: 15,
    model: CURR,
    lastModel: PREV,
    warningThresholdPct: 0.85,
    generatedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
    ...overrides,
  };
}

test("buildUniversalHandoffSystemMessage basic when payload null", () => {
  const msg = buildUniversalHandoffSystemMessage(PREV, CURR, REASON, null);
  assert.ok(msg.includes("<context_handoff>"));
  assert.ok(msg.includes("<transfer_reason>"));
  assert.ok(msg.includes("<previous_model>"));
  assert.ok(msg.includes("<current_model>"));
});

test("buildUniversalHandoffSystemMessage basic when payload summary empty", () => {
  const msg = buildUniversalHandoffSystemMessage(PREV, CURR, REASON, makePayload({ summary: "" }));
  assert.ok(msg.includes("continuar sin perder el hilo"));
});

test("buildUniversalHandoffSystemMessage full XML with valid payload", () => {
  const msg = buildUniversalHandoffSystemMessage(PREV, CURR, REASON, makePayload());
  assert.ok(msg.includes("<session_summary>"));
  assert.ok(msg.includes("SQLite"));
  assert.ok(msg.includes("<key_decisions>"));
  assert.ok(msg.includes("<task_progress>"));
  assert.ok(msg.includes("<active_context>"));
  assert.ok(msg.includes("database.ts"));
  assert.ok(msg.includes("<messages_processed>15"));
  assert.ok(msg.includes("Continue seamlessly"));
});

test("buildUniversalHandoffSystemMessage escapes XML special chars", () => {
  const msg = buildUniversalHandoffSystemMessage(
    "m<a>",
    "m<b>",
    'r "t" & x',
    makePayload({
      summary: '<s> & "q"',
      keyDecisions: ['d & "<>"'],
      activeEntities: ["e<test>"],
    })
  );
  assert.ok(msg.includes("m&lt;a&gt;"));
  assert.ok(msg.includes("m&lt;b&gt;"));
  assert.ok(msg.includes("&amp;"));
  assert.ok(msg.includes("&lt;s&gt;"));
  assert.ok(msg.includes("&quot;q&quot;"));
  assert.ok(msg.includes("e&lt;test&gt;"));
});

test("buildUniversalHandoffSystemMessage includes reason", () => {
  const msg = buildUniversalHandoffSystemMessage(PREV, CURR, REASON, null);
  assert.ok(msg.includes(REASON));
});

// ── injectUniversalHandoffBody ──────────────────────────────────────────────

test("injectUniversalHandoffBody prepends system handoff to messages", () => {
  const body = {
    model: CURR,
    messages: [
      { role: "user", content: "Hello" },
      { role: "assistant", content: "Hi" },
    ],
  };
  const r = injectUniversalHandoffBody(body, PREV, CURR, REASON, null);
  assert.strictEqual(r.messages.length, 3);
  assert.strictEqual(r.messages[0].role, "system");
  assert.ok((r.messages[0].content as string).includes("<context_handoff>"));
  assert.strictEqual(r.messages[1], body.messages[0]);
  assert.strictEqual(r.messages[2], body.messages[1]);
});

test("injectUniversalHandoffBody preserves original system message", () => {
  const body = {
    model: CURR,
    messages: [
      { role: "system", content: "Be helpful" },
      { role: "user", content: "Hello" },
    ],
  };
  const r = injectUniversalHandoffBody(body, PREV, CURR, REASON, null);
  assert.strictEqual(r.messages.length, 3);
  assert.strictEqual(r.messages[1].role, "system");
  assert.strictEqual(r.messages[1].content, "Be helpful");
});

test("injectUniversalHandoffBody Responses API with instructions", () => {
  const body = { input: "Hi", instructions: "Be nice" };
  const r = injectUniversalHandoffBody(body, PREV, CURR, REASON, null);
  const instr = String(r.instructions ?? (r as any).instructions ?? "");
  assert.ok(instr.includes("<context_handoff>"));
  assert.ok(instr.includes("Be nice"));
});

test("injectUniversalHandoffBody Responses API without instructions", () => {
  const body = { input: "Hi", messages: [] as any[] };
  const r = injectUniversalHandoffBody(body, PREV, CURR, REASON, null);
  // Responses API with no instructions sets handoff as instructions and strips empty messages
  assert.ok(typeof r.instructions === "string" || typeof (r as any).instructions === "string");
  const instr = String(r.instructions || (r as any).instructions || "");
  assert.ok(instr.includes("<context_handoff>"));
  // messages should be stripped (empty array removed)
  assert.ok(!Array.isArray((r as any).messages));
});

test("injectUniversalHandoffBody includes payload content", () => {
  const body = {
    model: CURR,
    messages: [{ role: "user", content: "Continue" }],
  };
  const r = injectUniversalHandoffBody(body, PREV, CURR, REASON, makePayload());
  const c = r.messages[0].content as string;
  assert.ok(c.includes("SQLite"));
  assert.ok(c.includes("database.ts"));
});
