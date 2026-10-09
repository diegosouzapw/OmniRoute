// #15159 S-03 — the MCP internal hop's caller identity is AMBIENT.
//
// `internalFetch.ts` builds its Authorization header by layering:
//
//   1. OMNIROUTE_API_KEY  (the server's own key — read per call since #15468)
//   2. forwarded caller headers from the AsyncLocalStorage context
//   3. caller-supplied options.headers
//   4. the internal service-auth token
//
// The ordering is correct — forwarded caller identity wins over the env key
// (#5819, pinned by httpAuthContext.test.ts). The remaining defect is that steps 1
// and 2 are read from ambient state with no way to distinguish the two cases that
// matter:
//
//   * stdio transport: there is NO per-caller identity. The env key is the correct
//     and intended credential.
//   * HTTP/SSE transport: a caller was authenticated by requireManagementAuth, and
//     the hop should carry THAT caller's identity. If the context is absent or
//     carries nothing forwardable, falling back to the server's own env key means a
//     remote caller silently executes as the server key — exactly the privilege
//     substitution S-03 describes.
//
// So the env key must be a STIO-ONLY fallback: legitimate where no caller exists,
// and never a silent substitute for a missing HTTP caller identity.
//
// The fix makes the hop's credential source explicit — inside an HTTP auth context
// the env key is not consulted at all — instead of inferred from which header
// happened to be populated.
import { test } from "node:test";
import assert from "node:assert/strict";

import { omniRouteFetch } from "../../open-sse/mcp-server/internalFetch.ts";
import { withMcpHttpAuthContext } from "../../open-sse/mcp-server/httpAuthContext.ts";

type Captured = { url: string; headers: Record<string, string> };

/** Runs the real hop with a mocked fetch and returns the headers it sent. */
async function captureHeaders(
  run: () => Promise<unknown>,
  envKey = "server-env-key"
): Promise<Captured> {
  const originalFetch = globalThis.fetch;
  const originalEnv = process.env.OMNIROUTE_API_KEY;
  process.env.OMNIROUTE_API_KEY = envKey;
  let captured: Captured | null = null;
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    captured = { url, headers: (init.headers as Record<string, string>) ?? {} };
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as unknown as typeof fetch;
  try {
    await run();
    assert.ok(captured, "the hop must have called fetch");
    return captured as unknown as Captured;
  } finally {
    globalThis.fetch = originalFetch;
    if (originalEnv === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = originalEnv;
  }
}

// ─── RED: an HTTP caller with nothing forwardable must NOT become the server ──
// This is the defect. Inside an HTTP auth context the hop must never substitute the
// server's own env key for the caller's identity.

test("S-03: inside an HTTP auth context with no forwardable identity, the env key is not used", async () => {
  // A context with no authorization / cookie / x-api-key — i.e. the HTTP scope is
  // active but nothing was forwarded. The hop must not fall back to the server key.
  const request = new Request("http://localhost/api/mcp/stream");

  const { headers } = await captureHeaders(() =>
    withMcpHttpAuthContext(request, () => omniRouteFetch("/api/combos"))
  );

  assert.notEqual(
    headers.Authorization,
    "Bearer server-env-key",
    "an HTTP caller must never silently execute as the server's OMNIROUTE_API_KEY"
  );
});

// ─── Counterweight: the caller's identity still wins (must not regress) ─────

test("S-03: a forwarded HTTP caller identity is still sent", async () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { Authorization: "Bearer caller-key" },
  });

  const { headers } = await captureHeaders(() =>
    withMcpHttpAuthContext(request, () => omniRouteFetch("/api/combos"))
  );

  assert.equal(headers.Authorization, "Bearer caller-key");
});

// ─── Counterweight: stdio keeps the env key — it is the intended credential ──
// stdio has no per-caller identity, so the env fallback must survive. Failing this
// would mean the fix broke the primary transport.

test("S-03: stdio (no HTTP context) still uses the env key", async () => {
  const { headers } = await captureHeaders(() => omniRouteFetch("/api/combos"));

  assert.equal(
    headers.Authorization,
    "Bearer server-env-key",
    "stdio has no caller identity — the env key is the correct credential there"
  );
});

// ─── Counterweight: no env key and no caller means no Authorization header ──
// The hop must not fabricate one.

test("S-03: with neither an env key nor a caller identity, no Authorization is sent", async () => {
  const originalFetch = globalThis.fetch;
  const originalEnv = process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_API_KEY;
  let headers: Record<string, string> = {};
  globalThis.fetch = (async (_url: string, init: RequestInit) => {
    headers = (init.headers as Record<string, string>) ?? {};
    return new Response("{}", { status: 200 });
  }) as unknown as typeof fetch;
  try {
    await omniRouteFetch("/api/combos");
    assert.equal(
      headers.Authorization,
      undefined,
      "the hop must not fabricate an Authorization header"
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalEnv === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = originalEnv;
  }
});
