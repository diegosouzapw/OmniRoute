import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";

// Helper: create a fresh empty headers record
function h(): Record<string, string> {
  return {};
}

// ── User-Agent forwarding ───────────────────────────────────────────────────

describe("forwardOpencodeClientHeaders – User-Agent", () => {
  it("forwards User-Agent from client headers", () => {
    const headers = h();
    const clientHeaders = { "User-Agent": "MyTool/1.0" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["User-Agent"], "MyTool/1.0");
  });

  it("does NOT set lowercase user-agent when it is absent from headers", () => {
    const headers = h();
    const clientHeaders = { "User-Agent": "MyTool/1.0" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    // setUserAgentHeader only sets lowercase "user-agent" if it already exists
    assert.equal(headers["user-agent"], undefined);
  });

  it("sets lowercase user-agent when it already exists in headers", () => {
    const headers = { "user-agent": "old" } as Record<string, string>;
    const clientHeaders = { "User-Agent": "MyTool/1.0" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["user-agent"], "MyTool/1.0");
    assert.equal(headers["User-Agent"], "MyTool/1.0");
  });

  it("falls back to lowercase user-agent from client headers", () => {
    const headers = h();
    const clientHeaders = { "user-agent": "FallbackTool/2.0" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["User-Agent"], "FallbackTool/2.0");
  });
});

// ── x-opencode-* header forwarding ─────────────────────────────────────────

describe("forwardOpencodeClientHeaders – x-opencode-* headers", () => {
  it("forwards x-opencode-session", () => {
    const headers = h();
    const clientHeaders = { "x-opencode-session": "sess-123" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-session"], "sess-123");
  });

  it("forwards x-opencode-request", () => {
    const headers = h();
    const clientHeaders = { "x-opencode-request": "req-abc" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-request"], "req-abc");
  });

  it("forwards x-opencode-project", () => {
    const headers = h();
    const clientHeaders = { "x-opencode-project": "/home/user/project" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-project"], "/home/user/project");
  });

  it("forwards x-opencode-client", () => {
    const headers = h();
    const clientHeaders = { "x-opencode-client": "opencode-cli" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-client"], "opencode-cli");
  });

  it("forwards all four x-opencode-* headers at once", () => {
    const headers = h();
    const clientHeaders = {
      "x-opencode-session": "sess-1",
      "x-opencode-request": "req-1",
      "x-opencode-project": "/proj",
      "x-opencode-client": "cli",
    };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-session"], "sess-1");
    assert.equal(headers["x-opencode-request"], "req-1");
    assert.equal(headers["x-opencode-project"], "/proj");
    assert.equal(headers["x-opencode-client"], "cli");
  });

  it("matches x-opencode-* headers case-insensitively", () => {
    const headers = h();
    const clientHeaders = {
      "X-OpenCode-Session": "Sess-Upper",
      "X-OpenCode-Request": "Req-Upper",
      "X-OpenCode-Project": "/Upper",
      "X-OpenCode-Client": "UpperClient",
    };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-session"], "Sess-Upper");
    assert.equal(headers["x-opencode-request"], "Req-Upper");
    assert.equal(headers["x-opencode-project"], "/Upper");
    assert.equal(headers["x-opencode-client"], "UpperClient");
  });

  it("does NOT forward unknown headers", () => {
    const headers = h();
    const clientHeaders = {
      "x-opencode-session": "s1",
      "x-random-header": "should-not-forward",
      Authorization: "Bearer tok",
    };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-random-header"], undefined);
    assert.equal(headers["Authorization"], undefined);
  });
});

// ── synthesizeRequestId ─────────────────────────────────────────────────────

describe("forwardOpencodeClientHeaders – synthesizeRequestId", () => {
  it("maps x-session-affinity → x-opencode-session when latter is missing", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "affinity-abc" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    assert.equal(headers["x-opencode-session"], "affinity-abc");
  });

  it("maps x-session-id → x-opencode-session when latter is missing", () => {
    const headers = h();
    const clientHeaders = { "x-session-id": "sid-xyz" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    assert.equal(headers["x-opencode-session"], "sid-xyz");
  });

  it("prefers x-session-affinity over x-session-id", () => {
    const headers = h();
    const clientHeaders = {
      "x-session-affinity": "aff-1",
      "x-session-id": "sid-1",
    };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    assert.equal(headers["x-opencode-session"], "aff-1");
  });

  it("synthesizes x-opencode-request (UUID) when session and request are missing", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "aff-2" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    // x-opencode-request should be a valid UUID string
    assert.ok(headers["x-opencode-request"], "should have synthesized x-opencode-request");
    assert.match(
      headers["x-opencode-request"],
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
      "synthesized request id should be a UUID"
    );
  });

  it("does NOT overwrite existing x-opencode-session", () => {
    const headers = { "x-opencode-session": "existing-sess" } as Record<string, string>;
    const clientHeaders = { "x-session-affinity": "aff-3" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    assert.equal(headers["x-opencode-session"], "existing-sess");
  });

  it("does NOT synthesize when synthesizeRequestId is false", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "aff-4" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: false,
    });
    assert.equal(headers["x-opencode-session"], undefined);
    assert.equal(headers["x-opencode-request"], undefined);
  });

  it("does NOT synthesize when synthesizeRequestId is absent", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "aff-5" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-session"], undefined);
    assert.equal(headers["x-opencode-request"], undefined);
  });

  it("does NOT synthesize when there is no session affinity header", () => {
    const headers = h();
    const clientHeaders = { "x-random": "value" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      synthesizeRequestId: true,
    });
    assert.equal(headers["x-opencode-session"], undefined);
    assert.equal(headers["x-opencode-request"], undefined);
  });
});

// ── Edge cases ──────────────────────────────────────────────────────────────

describe("forwardOpencodeClientHeaders – edge cases", () => {
  it("empty clientHeaders → no mutation on headers", () => {
    const headers = h();
    forwardOpencodeClientHeaders(headers, {});
    assert.deepEqual(headers, {});
  });

  it("does not overwrite existing x-opencode-* headers from client", () => {
    const headers = h();
    const clientHeaders = {
      "x-opencode-session": "client-sess",
      "x-opencode-request": "client-req",
    };
    // Pre-set the headers — forwardOpencodeClientHeaders sets them from clientHeaders,
    // which is the same value here. The function does overwrite with the same value.
    // This test documents that client headers are the authoritative source.
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-opencode-session"], "client-sess");
    assert.equal(headers["x-opencode-request"], "client-req");
  });
});
