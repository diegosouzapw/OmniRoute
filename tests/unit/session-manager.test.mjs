import test from "node:test";
import assert from "node:assert/strict";

const {
  generateSessionId,
  touchSession,
  getSessionInfo,
  getSessionConnection,
  getActiveSessionCount,
  getActiveSessions,
  clearSessions,
} = await import("../../open-sse/services/sessionManager.js");

// Reset between tests
test.beforeEach(() => clearSessions());

// ─── Session ID Generation ──────────────────────────────────────────────────

test("generateSessionId: produces stable ID for same request", () => {
  const body = {
    model: "claude-sonnet-4-20250514",
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "hello" },
    ],
  };
  const id1 = generateSessionId(body);
  const id2 = generateSessionId(body);
  assert.equal(id1, id2);
  assert.equal(id1.length, 16);
});

test("generateSessionId: different model = different ID", () => {
  const body1 = { model: "claude-sonnet-4-20250514", messages: [{ role: "user", content: "hi" }] };
  const body2 = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  assert.notEqual(generateSessionId(body1), generateSessionId(body2));
});

test("generateSessionId: different system prompt = different ID", () => {
  const body1 = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "system", content: "A" }, { role: "user", content: "hi" }],
  };
  const body2 = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "system", content: "B" }, { role: "user", content: "hi" }],
  };
  assert.notEqual(generateSessionId(body1), generateSessionId(body2));
});

test("generateSessionId: tools contribute to fingerprint", () => {
  const body1 = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: "search" }],
  };
  const body2 = {
    model: "claude-sonnet-4-20250514",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: "different" }],
  };
  assert.notEqual(generateSessionId(body1), generateSessionId(body2));
});

test("generateSessionId: same tools in different order = same ID", () => {
  const body1 = {
    model: "m1",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: "a" }, { name: "b" }],
  };
  const body2 = {
    model: "m1",
    messages: [{ role: "user", content: "hi" }],
    tools: [{ name: "b" }, { name: "a" }],
  };
  assert.equal(generateSessionId(body1), generateSessionId(body2));
});

test("generateSessionId: Claude body.system format", () => {
  const body = {
    model: "claude-sonnet-4-20250514",
    system: "You are helpful.",
    messages: [{ role: "user", content: "hi" }],
  };
  const id = generateSessionId(body);
  assert.ok(id);
  assert.equal(id.length, 16);
});

test("generateSessionId: empty body returns null", () => {
  assert.equal(generateSessionId({}), null);
});

test("generateSessionId: provider option changes ID", () => {
  const body = { model: "m1", messages: [{ role: "user", content: "hi" }] };
  const id1 = generateSessionId(body, { provider: "claude" });
  const id2 = generateSessionId(body, { provider: "openai" });
  assert.notEqual(id1, id2);
});

// ─── Session Tracking ───────────────────────────────────────────────────────

test("touchSession + getSessionInfo: creates and updates session", () => {
  touchSession("abc123", "conn1");
  const info = getSessionInfo("abc123");
  assert.ok(info);
  assert.equal(info.requestCount, 1);
  assert.equal(info.connectionId, "conn1");

  touchSession("abc123");
  const updated = getSessionInfo("abc123");
  assert.equal(updated.requestCount, 2);
});

test("getSessionConnection: returns bound connection", () => {
  touchSession("sess1", "conn-x");
  assert.equal(getSessionConnection("sess1"), "conn-x");
});

test("getSessionConnection: null for unknown session", () => {
  assert.equal(getSessionConnection("nonexistent"), null);
});

test("getActiveSessionCount: tracks count", () => {
  assert.equal(getActiveSessionCount(), 0);
  touchSession("s1");
  touchSession("s2");
  assert.equal(getActiveSessionCount(), 2);
});

test("getActiveSessions: returns session list", () => {
  touchSession("s1", "c1");
  touchSession("s2", "c2");
  const all = getActiveSessions();
  assert.equal(all.length, 2);
  assert.ok(all[0].sessionId);
  assert.ok(all[0].ageMs >= 0);
});

test("clearSessions: empties store", () => {
  touchSession("s1");
  clearSessions();
  assert.equal(getActiveSessionCount(), 0);
});

test("touchSession with null sessionId: no-op", () => {
  touchSession(null);
  assert.equal(getActiveSessionCount(), 0);
});
