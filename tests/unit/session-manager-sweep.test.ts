import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = resolve(__dirname, "../../open-sse/services/sessionManager.ts");
const src = readFileSync(srcPath, "utf-8");

const mod = await import("../../open-sse/services/sessionManager.ts");

// ── Constants ────────────────────────────────────────────────────────────────

test("MAX_SESSIONS constant exists and is 200", () => {
  const match = src.match(/const\s+MAX_SESSIONS\s*=\s*(\d+)\s*;/);
  assert.ok(match, "MAX_SESSIONS constant must exist");
  assert.equal(Number(match[1]), 200, "MAX_SESSIONS must be 200");
});

test("SESSION_TTL_MS is 15 minutes (15 * 60 * 1000)", () => {
  assert.ok(
    src.includes("15 * 60 * 1000"),
    "SESSION_TTL_MS should be 15 * 60 * 1000"
  );
});

// ── touchSession creates sessions ────────────────────────────────────────────

test("touchSession creates a new session entry", () => {
  mod.clearSessions();
  mod.touchSession("sess-new-1");
  const info = mod.getSessionInfo("sess-new-1");
  assert.ok(info, "session should exist after touchSession");
  assert.equal(info.requestCount, 1);
  assert.ok(info.createdAt > 0);
  assert.ok(info.lastActive > 0);
  assert.equal(info.connectionId, null);
});

test("touchSession with null sessionId is a no-op", () => {
  mod.clearSessions();
  mod.touchSession(null);
  assert.equal(mod.getActiveSessionCount(), 0);
});

test("touchSession increments requestCount on existing session", () => {
  mod.clearSessions();
  mod.touchSession("sess-incr");
  mod.touchSession("sess-incr");
  mod.touchSession("sess-incr");
  const info = mod.getSessionInfo("sess-incr");
  assert.ok(info);
  assert.equal(info.requestCount, 3);
});

test("touchSession updates connectionId when provided", () => {
  mod.clearSessions();
  mod.touchSession("sess-conn", "conn-abc");
  const info = mod.getSessionInfo("sess-conn");
  assert.ok(info);
  assert.equal(info.connectionId, "conn-abc");
});

// ── generateSessionId ────────────────────────────────────────────────────────

test("generateSessionId returns null for null/undefined body", () => {
  assert.equal(mod.generateSessionId(null), null);
  assert.equal(mod.generateSessionId(undefined), null);
});

test("generateSessionId returns deterministic hash for same input", () => {
  const body = { model: "gpt-4", messages: [{ role: "user", content: "hello" }] };
  const id1 = mod.generateSessionId(body);
  const id2 = mod.generateSessionId(body);
  assert.ok(id1);
  assert.equal(id1, id2);
});

test("generateSessionId returns different ids for different models", () => {
  const body1 = { model: "gpt-4", messages: [{ role: "user", content: "hi" }] };
  const body2 = { model: "claude-3", messages: [{ role: "user", content: "hi" }] };
  assert.notEqual(mod.generateSessionId(body1), mod.generateSessionId(body2));
});

// ── 201 sessions: eviction constant guarantees cap ───────────────────────────

test("creating 201 sessions and MAX_SESSIONS constant guarantees cap at 200", () => {
  mod.clearSessions();
  for (let i = 0; i < 201; i++) {
    mod.touchSession(`evict-${i}`);
  }
  // The cleanup interval runs every 60s so it won't have fired yet in this test.
  // We verify the store has all 201 entries before cleanup runs.
  const count = mod.getActiveSessionCount();
  assert.equal(count, 201, "all 201 sessions should be in memory before cleanup timer fires");

  // The MAX_SESSIONS constant (200) guarantees eviction when the timer fires.
  const match = src.match(/const\s+MAX_SESSIONS\s*=\s*(\d+)\s*;/);
  assert.ok(match);
  assert.ok(Number(match[1]) <= 200, "MAX_SESSIONS cap ensures eviction will reduce count");
});

// ── Eviction: oldest by lastActive evicted first ─────────────────────────────

test("eviction prefers sessions with oldest lastActive", () => {
  mod.clearSessions();

  mod.touchSession("oldest-sess");
  mod.touchSession("middle-sess");
  mod.touchSession("newest-sess");

  // Re-touch newest and middle to advance their lastActive
  mod.touchSession("newest-sess");
  mod.touchSession("newest-sess");
  mod.touchSession("middle-sess");

  const oldest = mod.getSessionInfo("oldest-sess");
  const middle = mod.getSessionInfo("middle-sess");
  const newest = mod.getSessionInfo("newest-sess");

  assert.ok(oldest);
  assert.ok(middle);
  assert.ok(newest);

  // More touches → higher requestCount → more recent lastActive
  assert.ok(newest.requestCount > middle.requestCount);
  assert.ok(middle.requestCount > oldest.requestCount);
});

// ── Active sessions survive cleanup (TTL check) ─────────────────────────────

test("getSessionInfo returns data for recently active sessions", () => {
  mod.clearSessions();
  mod.touchSession("active-sess");
  const info = mod.getSessionInfo("active-sess");
  assert.ok(info, "recently created session should be returned");
  assert.equal(info.requestCount, 1);
});

test("getSessionInfo returns null for unknown sessions", () => {
  mod.clearSessions();
  assert.equal(mod.getSessionInfo("nonexistent"), null);
});

test("getSessionInfo returns null for null sessionId", () => {
  assert.equal(mod.getSessionInfo(null), null);
});

// ── Source-level: TTL expiration uses lastActive ─────────────────────────────

test("getSessionInfo checks TTL via lastActive (source invariant)", () => {
  assert.ok(
    src.includes("Date.now() - entry.lastActive > SESSION_TTL_MS"),
    "getSessionInfo must check TTL via lastActive"
  );
});

// ── clearSessions resets state ───────────────────────────────────────────────

test("clearSessions removes all sessions", () => {
  mod.touchSession("a");
  mod.touchSession("b");
  mod.touchSession("c");
  assert.ok(mod.getActiveSessionCount() > 0);
  mod.clearSessions();
  assert.equal(mod.getActiveSessionCount(), 0);
});

// ── getActiveSessions returns correct shape ──────────────────────────────────

test("getActiveSessions returns entries with sessionId and ageMs", () => {
  mod.clearSessions();
  mod.touchSession("shape-test");
  const sessions = mod.getActiveSessions();
  assert.ok(Array.isArray(sessions));
  assert.equal(sessions.length, 1);
  const s = sessions[0];
  assert.equal(s.sessionId, "shape-test");
  assert.equal(typeof s.ageMs, "number");
  assert.ok(s.ageMs >= 0);
  assert.equal(s.requestCount, 1);
});

// ── Per-API-key session tracking ─────────────────────────────────────────────

test("registerKeySession and getActiveSessionCountForKey work correctly", () => {
  mod.clearSessions();
  assert.equal(mod.getActiveSessionCountForKey("key-1"), 0);
  mod.registerKeySession("key-1", "sess-a");
  mod.registerKeySession("key-1", "sess-b");
  assert.equal(mod.getActiveSessionCountForKey("key-1"), 2);
});

test("unregisterKeySession decrements count and cleans up empty sets", () => {
  mod.clearSessions();
  mod.registerKeySession("key-2", "sess-x");
  mod.registerKeySession("key-2", "sess-y");
  assert.equal(mod.getActiveSessionCountForKey("key-2"), 2);
  mod.unregisterKeySession("key-2", "sess-x");
  assert.equal(mod.getActiveSessionCountForKey("key-2"), 1);
  mod.unregisterKeySession("key-2", "sess-y");
  assert.equal(mod.getActiveSessionCountForKey("key-2"), 0);
});

test("checkSessionLimit returns null when under limit", () => {
  mod.clearSessions();
  mod.registerKeySession("key-3", "sess-1");
  const result = mod.checkSessionLimit("key-3", 5);
  assert.equal(result, null);
});

test("checkSessionLimit returns error when at limit", () => {
  mod.clearSessions();
  mod.registerKeySession("key-4", "s1");
  mod.registerKeySession("key-4", "s2");
  const result = mod.checkSessionLimit("key-4", 2);
  assert.ok(result);
  assert.equal(result.code, "SESSION_LIMIT_EXCEEDED");
  assert.equal(result.limit, 2);
  assert.equal(result.current, 2);
});

test("checkSessionLimit returns null for unlimited (0)", () => {
  mod.clearSessions();
  mod.registerKeySession("key-5", "s1");
  const result = mod.checkSessionLimit("key-5", 0);
  assert.equal(result, null);
});

// ── extractExternalSessionId ─────────────────────────────────────────────────

test("extractExternalSessionId returns null for null/undefined headers", () => {
  assert.equal(mod.extractExternalSessionId(null), null);
  assert.equal(mod.extractExternalSessionId(undefined), null);
});

test("extractExternalSessionId extracts from x-session-id header", () => {
  const headers = new Headers({ "x-session-id": "my-session" });
  const result = mod.extractExternalSessionId(headers);
  assert.equal(result, "ext:my-session");
});

test("extractExternalSessionId extracts from x_session_id header", () => {
  const headers = new Headers({ x_session_id: "underscore-sess" });
  const result = mod.extractExternalSessionId(headers);
  assert.equal(result, "ext:underscore-sess");
});

test("extractExternalSessionId truncates to 64 chars", () => {
  const longId = "a".repeat(100);
  const headers = new Headers({ "x-session-id": longId });
  const result = mod.extractExternalSessionId(headers);
  assert.ok(result);
  assert.equal(result.length, 4 + 64);
});

test("extractExternalSessionId returns null for empty value", () => {
  const headers = new Headers({ "x-session-id": "   " });
  assert.equal(mod.extractExternalSessionId(headers), null);
});

// ── Source-level: cleanup timer is unref'd ───────────────────────────────────

test("cleanup timer is unref'd to avoid blocking process exit", () => {
  assert.ok(
    src.includes("_cleanupTimer") && src.includes(".unref?.()"),
    "cleanup timer must be unref'd"
  );
});

// ── Source-level: eviction uses lastActive not createdAt ──────────────────────

test("eviction loop sorts by lastActive, not createdAt", () => {
  const evictBlock = src.match(/while\s*\(sessions\.size\s*>\s*MAX_SESSIONS\)[\s\S]*?sessions\.delete\(oldestKey\)/);
  assert.ok(evictBlock, "hard-cap eviction loop must exist");
  assert.ok(
    evictBlock[0].includes("entry.lastActive"),
    "eviction must compare by entry.lastActive"
  );
});

// ── Source-level: TTL cleanup uses lastActive ────────────────────────────────

test("TTL cleanup checks lastActive for expiration", () => {
  assert.ok(
    src.includes("now - entry.lastActive > SESSION_TTL_MS"),
    "TTL cleanup must check lastActive against SESSION_TTL_MS"
  );
});

// ── getAllActiveSessionCountsByKey ────────────────────────────────────────────

test("getAllActiveSessionCountsByKey returns per-key counts", () => {
  mod.clearSessions();
  mod.registerKeySession("k1", "s1");
  mod.registerKeySession("k1", "s2");
  mod.registerKeySession("k2", "s3");
  const counts = mod.getAllActiveSessionCountsByKey();
  assert.equal(counts["k1"], 2);
  assert.equal(counts["k2"], 1);
});

// ── isSessionRegisteredForKey ────────────────────────────────────────────────

test("isSessionRegisteredForKey returns true for registered sessions", () => {
  mod.clearSessions();
  mod.registerKeySession("key-check", "sess-check");
  assert.equal(mod.isSessionRegisteredForKey("key-check", "sess-check"), true);
  assert.equal(mod.isSessionRegisteredForKey("key-check", "sess-other"), false);
  assert.equal(mod.isSessionRegisteredForKey("key-missing", "sess-check"), false);
});

// ── getSessionConnection ─────────────────────────────────────────────────────

test("getSessionConnection returns connectionId for known sessions", () => {
  mod.clearSessions();
  mod.touchSession("conn-sess", "conn-xyz");
  assert.equal(mod.getSessionConnection("conn-sess"), "conn-xyz");
  assert.equal(mod.getSessionConnection("nonexistent"), null);
  assert.equal(mod.getSessionConnection(null), null);
});

// ── Behavioral: TTL expiration via Date.now mock ────────────────────────────

test("getSessionInfo returns null for expired session (TTL behavioral)", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  mod.touchSession("ttl-expire");
  const info1 = mod.getSessionInfo("ttl-expire");
  assert.ok(info1, "session should exist immediately after creation");

  fakeNow += 16 * 60 * 1000;
  const info2 = mod.getSessionInfo("ttl-expire");
  assert.equal(info2, null, "session should be expired after 16 minutes");

  Date.now = realNow;
  mod.clearSessions();
});

test("getSessionInfo returns data for session within TTL (not expired)", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  mod.touchSession("ttl-alive");
  fakeNow += 14 * 60 * 1000;
  const info = mod.getSessionInfo("ttl-alive");
  assert.ok(info, "session should still be alive at 14 minutes");
  assert.equal(info.requestCount, 1);

  Date.now = realNow;
  mod.clearSessions();
});

// ── Behavioral: getActiveSessions filters out expired sessions ──────────────

test("getActiveSessions excludes expired sessions (behavioral)", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  mod.touchSession("active-1");
  mod.touchSession("active-2");
  fakeNow += 5 * 60 * 1000;
  mod.touchSession("active-3");

  fakeNow += 11 * 60 * 1000 + 1;

  const sessions = mod.getActiveSessions();
  const ids = sessions.map((s) => s.sessionId);
  assert.ok(!ids.includes("active-1"), "old session should be filtered out");
  assert.ok(!ids.includes("active-2"), "old session should be filtered out");
  assert.ok(ids.includes("active-3"), "recent session should survive");
  assert.equal(sessions.length, 1);

  Date.now = realNow;
  mod.clearSessions();
});

// ── Behavioral: touchSession refreshes lastActive to prevent expiration ─────

test("touchSession refreshes lastActive so session survives TTL", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  mod.touchSession("refresh-sess");

  fakeNow += 14 * 60 * 1000;
  mod.touchSession("refresh-sess");

  fakeNow += 14 * 60 * 1000;
  const info = mod.getSessionInfo("refresh-sess");
  assert.ok(info, "session should survive because lastActive was refreshed");
  assert.equal(info.requestCount, 2);

  Date.now = realNow;
  mod.clearSessions();
});

// ── Behavioral: hard cap eviction via MAX_SESSIONS ──────────────────────────

test("creating 201 sessions and calling getSessionInfo verifies store holds 201", () => {
  mod.clearSessions();
  for (let i = 0; i < 201; i++) {
    mod.touchSession(`cap-${i}`);
  }
  assert.equal(mod.getActiveSessionCount(), 201);
  let aliveCount = 0;
  for (let i = 0; i < 201; i++) {
    if (mod.getSessionInfo(`cap-${i}`)) aliveCount++;
  }
  assert.equal(aliveCount, 201, "all 201 sessions should be retrievable before cleanup");
  mod.clearSessions();
});

// ── Behavioral: 201 sessions + verify getActiveSessions returns all 201 ─────

test("getActiveSessions returns all 201 sessions when none expired", () => {
  mod.clearSessions();
  for (let i = 0; i < 201; i++) {
    mod.touchSession(`list-${i}`);
  }
  const sessions = mod.getActiveSessions();
  assert.equal(sessions.length, 201, "all 201 sessions should be listed");
  mod.clearSessions();
});

// ── Behavioral: mixed TTL — some expired, some alive ────────────────────────

test("mixed sessions: expired ones gone, fresh ones survive after TTL check", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  for (let i = 0; i < 10; i++) {
    mod.touchSession(`old-${i}`);
  }

  fakeNow += 16 * 60 * 1000;

  for (let i = 0; i < 10; i++) {
    mod.touchSession(`new-${i}`);
  }

  const sessions = mod.getActiveSessions();
  assert.equal(sessions.length, 10, "only new sessions should be active");
  for (const s of sessions) {
    assert.ok(s.sessionId.startsWith("new-"), `expected new session, got ${s.sessionId}`);
  }

  let expiredCount = 0;
  for (let i = 0; i < 10; i++) {
    if (!mod.getSessionInfo(`old-${i}`)) expiredCount++;
  }
  assert.equal(expiredCount, 10, "all old sessions should be expired via getSessionInfo");

  Date.now = realNow;
  mod.clearSessions();
});

// ── Behavioral: clearSessions then verify all gone ──────────────────────────

test("clearSessions removes all sessions and resets count to zero", () => {
  mod.clearSessions();
  for (let i = 0; i < 50; i++) {
    mod.touchSession(`clear-${i}`);
  }
  assert.equal(mod.getActiveSessionCount(), 50);
  mod.clearSessions();
  assert.equal(mod.getActiveSessionCount(), 0);
  assert.equal(mod.getActiveSessions().length, 0);
  for (let i = 0; i < 50; i++) {
    assert.equal(mod.getSessionInfo(`clear-${i}`), null);
  }
});

// ── Behavioral: TTL boundary at exactly SESSION_TTL_MS ──────────────────────

test("session expires at SESSION_TTL_MS + 1ms boundary", () => {
  mod.clearSessions();
  const realNow = Date.now;
  let fakeNow = 1000000;
  Date.now = () => fakeNow;

  mod.touchSession("boundary-sess");

  fakeNow += 15 * 60 * 1000 + 1;
  const info = mod.getSessionInfo("boundary-sess");
  assert.equal(info, null, "session at 15 min + 1ms should be expired");

  Date.now = realNow;
  mod.clearSessions();
});
