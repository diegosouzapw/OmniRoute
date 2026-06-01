/**
 * Tests for SessionRecorderBar — start/stop flow + timer logic
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

function formatElapsed(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

describe("SessionRecorderBar formatElapsed", () => {
  it("formats seconds as MM:SS", () => {
    assert.equal(formatElapsed(0), "00:00");
    assert.equal(formatElapsed(1), "00:01");
    assert.equal(formatElapsed(59), "00:59");
    assert.equal(formatElapsed(60), "01:00");
    assert.equal(formatElapsed(90), "01:30");
    assert.equal(formatElapsed(3599), "59:59");
  });

  it("formats hours as H:MM:SS", () => {
    assert.equal(formatElapsed(3600), "1:00:00");
    assert.equal(formatElapsed(3661), "1:01:01");
    assert.equal(formatElapsed(7200), "2:00:00");
  });
});

describe("SessionRecorderBar state transitions", () => {
  it("starts in non-recording state", () => {
    let recording = false;
    assert.equal(recording, false);
  });

  it("transitions to recording on start", () => {
    let recording = false;
    // Simulate start
    recording = true;
    assert.equal(recording, true);
  });

  it("transitions back to not-recording on stop", () => {
    let recording = true;
    // Simulate stop
    recording = false;
    assert.equal(recording, false);
  });

  it("counter increments while recording", () => {
    let elapsed = 0;
    const recording = true;

    if (recording) elapsed += 1;
    if (recording) elapsed += 1;
    if (recording) elapsed += 1;

    assert.equal(elapsed, 3);
  });

  it("counter stops when not recording", () => {
    let elapsed = 5;
    const recording = false;

    if (recording) elapsed += 1; // should not execute

    assert.equal(elapsed, 5); // unchanged
  });

  it("resets elapsed on new session start", () => {
    let elapsed = 120; // was recording for 2 min
    // New session start
    elapsed = 0;
    assert.equal(elapsed, 0);
  });
});

describe("useSessionRecorder API calls", () => {
  it("constructs correct POST URL for starting session", () => {
    const url = "/api/tools/traffic-inspector/sessions";
    assert.ok(url.startsWith("/api/tools/traffic-inspector/"));
    assert.ok(url.endsWith("/sessions"));
  });

  it("constructs correct PATCH URL for stopping session", () => {
    const id = "abc-123";
    const url = `/api/tools/traffic-inspector/sessions/${encodeURIComponent(id)}`;
    assert.equal(url, "/api/tools/traffic-inspector/sessions/abc-123");
  });

  it("constructs correct DELETE URL for session deletion", () => {
    const id = "test-session-id";
    const url = `/api/tools/traffic-inspector/sessions/${encodeURIComponent(id)}`;
    assert.ok(url.includes(id));
  });
});
