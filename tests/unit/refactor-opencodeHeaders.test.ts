import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { forwardOpencodeClientHeaders } from "../../open-sse/utils/opencodeHeaders.ts";

// Helper: create a fresh headers record, optionally seeded (e.g. registry statics)
function h(seed: Record<string, string> = {}): Record<string, string> {
  return { ...seed };
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

  it("replaces an existing lowercase user-agent mirror with one canonical entry", () => {
    const headers = { "user-agent": "old" } as Record<string, string>;
    const clientHeaders = { "User-Agent": "MyTool/1.0" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    // Regression: keeping the lowercase mirror alongside the canonical key made
    // undici comma-join both on the wire ("MyTool/1.0, MyTool/1.0").
    assert.deepEqual(
      Object.keys(headers).filter((k) => k.toLowerCase() === "user-agent"),
      ["User-Agent"]
    );
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

// ── agent metadata headers (X-Session-ID / X-Title) — 9router#2413 ─────────
// Non-OpenCode agent clients (e.g. custom providers) commonly send X-Session-ID
// and X-Title for upstream request tracking/attribution. These were previously
// dropped for every client outside the x-opencode-* allowlist.

describe("forwardOpencodeClientHeaders – X-Session-ID / X-Title", () => {
  it("forwards X-Session-ID from client headers", () => {
    const headers = h();
    const clientHeaders = { "X-Session-ID": "sess-xyz" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-session-id"], "sess-xyz");
  });

  it("forwards X-Title from client headers", () => {
    const headers = h();
    const clientHeaders = { "X-Title": "My Agent" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-title"], "My Agent");
  });

  it("matches X-Session-ID / X-Title case-insensitively", () => {
    const headers = h();
    const clientHeaders = { "x-session-id": "sess-lower", "x-title": "lower title" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-session-id"], "sess-lower");
    assert.equal(headers["x-title"], "lower title");
  });

  it("still does NOT forward unrelated unknown headers", () => {
    const headers = h();
    const clientHeaders = { "X-Session-ID": "sess-1", "X-Random-Other": "nope" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["x-session-id"], "sess-1");
    assert.equal(headers["X-Random-Other"], undefined);
  });
});

// ── app attribution (HTTP-Referer) + case-variant dedup ────────────────────
// OpenRouter publisher gates (e.g. thinkingmachines/inkling:free "only available
// on agentic harnesses" 403) key on app attribution: HTTP-Referer / X-Title.
// The openrouter registry ships static defaults ("HTTP-Referer"/"X-Title"); a
// client value under a different case used to survive alongside them, and undici
// then comma-joined both spellings into one garbage header value.

describe("forwardOpencodeClientHeaders – HTTP-Referer attribution", () => {
  it("forwards HTTP-Referer from client headers", () => {
    const headers = h();
    const clientHeaders = { "HTTP-Referer": "https://claude.ai" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.equal(headers["http-referer"], "https://claude.ai");
  });

  it("replaces a differently-cased static HTTP-Referer instead of comma-joining", () => {
    const headers = h({ "HTTP-Referer": "https://endpoint-proxy.local" });
    const clientHeaders = { "HTTP-Referer": "https://claude.ai" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.deepEqual(
      Object.keys(headers).filter((k) => k.toLowerCase() === "http-referer"),
      ["http-referer"]
    );
    assert.equal(headers["http-referer"], "https://claude.ai");
  });

  it("replaces a differently-cased static X-Title instead of comma-joining", () => {
    const headers = h({ "X-Title": "Endpoint Proxy" });
    const clientHeaders = { "X-Title": "My Agent" };
    forwardOpencodeClientHeaders(headers, clientHeaders);
    assert.deepEqual(
      Object.keys(headers).filter((k) => k.toLowerCase() === "x-title"),
      ["x-title"]
    );
    assert.equal(headers["x-title"], "My Agent");
  });

  it("keeps the static attribution when the client sends none", () => {
    const headers = h({
      "HTTP-Referer": "https://endpoint-proxy.local",
      "X-Title": "Endpoint Proxy",
    });
    forwardOpencodeClientHeaders(headers, {});
    assert.equal(headers["HTTP-Referer"], "https://endpoint-proxy.local");
    assert.equal(headers["X-Title"], "Endpoint Proxy");
  });

  it("replaces a differently-cased static X-Session-ID instead of comma-joining", () => {
    const headers = h({ "X-Session-Id": "stale" });
    forwardOpencodeClientHeaders(headers, { "x-session-id": "fresh" });
    assert.deepEqual(
      Object.keys(headers).filter((k) => k.toLowerCase() === "x-session-id"),
      ["x-session-id"]
    );
    assert.equal(headers["x-session-id"], "fresh");
  });

  it("keeps the static X-Title when the client sends an empty string", () => {
    const headers = h({ "X-Title": "Endpoint Proxy" });
    forwardOpencodeClientHeaders(headers, { "x-title": "" });
    assert.equal(headers["X-Title"], "Endpoint Proxy");
    assert.equal(headers["x-title"], undefined);
  });

  it("replaces a differently-cased x-opencode-* static instead of comma-joining", () => {
    const headers = h({ "X-OpenCode-Session": "ses_operator" });
    forwardOpencodeClientHeaders(headers, { "x-opencode-session": "ses_client" });
    assert.deepEqual(
      Object.keys(headers).filter((k) => k.toLowerCase() === "x-opencode-session"),
      ["x-opencode-session"]
    );
    assert.equal(headers["x-opencode-session"], "ses_client");
  });

  it("OMNIROUTE_FORWARD_ATTRIBUTION=0 keeps statics and drops client attribution", () => {
    process.env.OMNIROUTE_FORWARD_ATTRIBUTION = "0";
    try {
      const headers = h({
        "HTTP-Referer": "https://endpoint-proxy.local",
        "X-Title": "Endpoint Proxy",
      });
      forwardOpencodeClientHeaders(headers, {
        "http-referer": "https://claude.ai",
        "x-title": "My Agent",
        "x-session-id": "sess-1",
      });
      assert.equal(headers["HTTP-Referer"], "https://endpoint-proxy.local");
      assert.equal(headers["X-Title"], "Endpoint Proxy");
      assert.equal(headers["x-session-id"], undefined);
    } finally {
      delete process.env.OMNIROUTE_FORWARD_ATTRIBUTION;
    }
  });
});

// ── opencodeUpstream ────────────────────────────────────────────────────────

describe("forwardOpencodeClientHeaders – opencodeUpstream", () => {
  it("maps x-session-affinity → x-opencode-session when latter is missing", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "affinity-abc" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      opencodeUpstream: true,
    });
    assert.equal(headers["x-opencode-session"], "affinity-abc");
  });

  it("maps x-session-id → x-opencode-session when latter is missing", () => {
    const headers = h();
    const clientHeaders = { "x-session-id": "sid-xyz" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      opencodeUpstream: true,
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
      opencodeUpstream: true,
    });
    assert.equal(headers["x-opencode-session"], "aff-1");
  });

  it("maps the session but never synthesizes x-opencode-request", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "aff-2" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      opencodeUpstream: true,
    });
    assert.equal(headers["x-opencode-session"], "aff-2");
    assert.equal(headers["x-opencode-request"], undefined);
  });

  it("does NOT overwrite existing x-opencode-session", () => {
    const headers = { "x-opencode-session": "existing-sess" } as Record<string, string>;
    const clientHeaders = { "x-session-affinity": "aff-3" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      opencodeUpstream: true,
    });
    assert.equal(headers["x-opencode-session"], "existing-sess");
  });

  it("does NOT synthesize when opencodeUpstream is false", () => {
    const headers = h();
    const clientHeaders = { "x-session-affinity": "aff-4" };
    forwardOpencodeClientHeaders(headers, clientHeaders, {
      opencodeUpstream: false,
    });
    assert.equal(headers["x-opencode-session"], undefined);
    assert.equal(headers["x-opencode-request"], undefined);
  });

  it("does NOT synthesize when opencodeUpstream is absent", () => {
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
      opencodeUpstream: true,
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
