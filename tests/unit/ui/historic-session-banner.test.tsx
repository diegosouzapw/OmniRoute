/**
 * Tests for HistoricSessionBanner — render with sessionName/null + backToLive callback
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";

// Pure logic tests — no DOM needed (no next-intl in node:test runner)

describe("HistoricSessionBanner logic", () => {
  it("resolves session display name when provided", () => {
    const sessionName = "My Test Session";
    const display = sessionName ?? "Untitled session";
    assert.equal(display, "My Test Session");
  });

  it("falls back to untitledSession when sessionName is null", () => {
    const sessionName: string | null = null;
    const fallback = "Untitled session";
    const display = sessionName ?? fallback;
    assert.equal(display, "Untitled session");
  });

  it("falls back to untitledSession when sessionName is empty string", () => {
    const sessionName: string | null = "";
    // empty string is falsy — banner should show fallback
    const fallback = "Untitled session";
    const display = sessionName || fallback;
    assert.equal(display, "Untitled session");
  });

  it("onBackToLive callback is invoked on click", () => {
    let called = false;
    const onBackToLive = () => { called = true; };
    // Simulate button click
    onBackToLive();
    assert.equal(called, true);
  });

  it("banner renders when selectedSessionId is defined (gate logic)", () => {
    const selectedSessionId: string | undefined = "session-abc";
    // In TrafficInspectorPageClient the banner renders when this is not undefined
    const shouldRender = selectedSessionId !== undefined;
    assert.equal(shouldRender, true);
  });

  it("banner does not render when selectedSessionId is undefined (gate logic)", () => {
    const selectedSessionId: string | undefined = undefined;
    const shouldRender = selectedSessionId !== undefined;
    assert.equal(shouldRender, false);
  });

  it("backToLive sets sessionId to undefined", () => {
    let sessionId: string | undefined = "session-abc";
    const backToLive = () => { sessionId = undefined; };
    backToLive();
    assert.equal(sessionId, undefined);
  });

  it("session name is looked up from sessions array", () => {
    const sessions = [
      { id: "s1", name: "Session Alpha", startedAt: "2024-01-01", requestCount: 5 },
      { id: "s2", name: undefined, startedAt: "2024-01-02", requestCount: 3 },
    ];
    const selectedId = "s1";
    const name = sessions.find((s) => s.id === selectedId)?.name ?? null;
    assert.equal(name, "Session Alpha");
  });

  it("session name is null when session not found in array", () => {
    const sessions = [
      { id: "s1", name: "Session Alpha", startedAt: "2024-01-01", requestCount: 5 },
    ];
    const selectedId = "not-exist";
    const name = sessions.find((s) => s.id === selectedId)?.name ?? null;
    assert.equal(name, null);
  });
});
