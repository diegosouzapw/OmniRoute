import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/services/sessionManager.ts");

describe("sessionManager", () => {
  afterEach(() => {
    mod.clearSessions();
  });

  describe("generateSessionId", () => {
    it("returns null for null body", () => {
      assert.equal(mod.generateSessionId(null), null);
    });

    it("returns null for undefined body", () => {
      assert.equal(mod.generateSessionId(undefined), null);
    });

    it("returns null for body with no identifying fields", () => {
      assert.equal(mod.generateSessionId({}), null);
    });

    it("returns a hex string for body with model", () => {
      const id = mod.generateSessionId({ model: "gpt-4", messages: [{ role: "user", content: "hi" }] });
      assert.notEqual(id, null);
      assert.match(id!, /^[a-f0-9]+$/);
    });

    it("returns consistent id for same input", () => {
      const body = { model: "gpt-4", messages: [{ role: "user", content: "hello" }] };
      const id1 = mod.generateSessionId(body);
      const id2 = mod.generateSessionId(body);
      assert.equal(id1, id2);
    });

    it("includes provider in fingerprint", () => {
      const body = { model: "gpt-4", messages: [] };
      const id1 = mod.generateSessionId(body, { provider: "openai" });
      const id2 = mod.generateSessionId(body, { provider: "anthropic" });
      assert.notEqual(id1, id2);
    });
  });

  describe("touchSession / getSessionInfo", () => {
    it("creates a new session", () => {
      mod.touchSession("sess-1", "conn-1");
      const info = mod.getSessionInfo("sess-1");
      assert.notEqual(info, null);
      assert.equal(info!.requestCount, 1);
      assert.equal(info!.connectionId, "conn-1");
    });

    it("increments request count on existing session", () => {
      mod.touchSession("sess-2");
      mod.touchSession("sess-2");
      mod.touchSession("sess-2");
      const info = mod.getSessionInfo("sess-2");
      assert.equal(info!.requestCount, 3);
    });

    it("returns null for null sessionId", () => {
      assert.equal(mod.getSessionInfo(null), null);
    });

    it("returns null for nonexistent session", () => {
      assert.equal(mod.getSessionInfo("nonexistent"), null);
    });

    it("ignores null sessionId on touch", () => {
      mod.touchSession(null);
      assert.equal(mod.getActiveSessionCount(), 0);
    });
  });

  describe("getSessionConnection", () => {
    it("returns connection for existing session", () => {
      mod.touchSession("sess-3", "conn-3");
      assert.equal(mod.getSessionConnection("sess-3"), "conn-3");
    });

    it("returns null for nonexistent session", () => {
      assert.equal(mod.getSessionConnection("nonexistent"), null);
    });
  });

  describe("getActiveSessionCount / getActiveSessions", () => {
    it("tracks session count", () => {
      mod.touchSession("a");
      mod.touchSession("b");
      assert.equal(mod.getActiveSessionCount(), 2);
    });

    it("getActiveSessions returns array with session info", () => {
      mod.touchSession("x", "conn-x");
      const sessions = mod.getActiveSessions();
      assert.ok(sessions.length >= 1);
      const found = sessions.find((s) => s.sessionId === "x");
      assert.notEqual(found, undefined);
      assert.equal(found!.connectionId, "conn-x");
      assert.equal(typeof found!.ageMs, "number");
    });
  });

  describe("clearSessions", () => {
    it("removes all sessions", () => {
      mod.touchSession("a");
      mod.touchSession("b");
      mod.clearSessions();
      assert.equal(mod.getActiveSessionCount(), 0);
    });
  });

  describe("key session registration", () => {
    it("registerKeySession / isSessionRegisteredForKey", () => {
      mod.registerKeySession("key-1", "sess-1");
      assert.equal(mod.isSessionRegisteredForKey("key-1", "sess-1"), true);
      assert.equal(mod.isSessionRegisteredForKey("key-1", "sess-2"), false);
    });

    it("unregisterKeySession removes registration", () => {
      mod.registerKeySession("key-2", "sess-2");
      mod.unregisterKeySession("key-2", "sess-2");
      assert.equal(mod.isSessionRegisteredForKey("key-2", "sess-2"), false);
    });

    it("getActiveSessionCountForKey returns count", () => {
      mod.registerKeySession("key-3", "s1");
      mod.registerKeySession("key-3", "s2");
      assert.equal(mod.getActiveSessionCountForKey("key-3"), 2);
    });

    it("getAllActiveSessionCountsByKey returns record", () => {
      mod.registerKeySession("k1", "s1");
      const counts = mod.getAllActiveSessionCountsByKey();
      assert.ok(typeof counts === "object");
    });
  });
});
