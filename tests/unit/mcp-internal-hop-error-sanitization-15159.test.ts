// #15159 S-02 — the MCP internal hop embedded the RAW upstream response body in
// the message of the error it throws.
//
//   open-sse/mcp-server/internalFetch.ts:63-64
//     const errorText = await response.text()…
//     throw new Error(`OmniRoute API error [${response.status}]: ${errorText}`)
//
// #15233 (M-05/G-11) deleted the two private `apiFetch` copies and routed every
// tool catch through `toSafeMcpErrorMessage`, so nothing is leaking to an MCP
// client *today*. But the guarantee is distributed across ~16 call sites: each one
// must remember to sanitize, and the hop itself offers no defence. One new call
// site that interpolates `err.message` directly re-opens the leak on the whole MCP
// surface — which is exactly the class of regression G-03 was fixed for elsewhere.
//
// The fix sanitizes at the source, so safety stops depending on the callers.
//
// These assertions read the THROWN error's own message. That is the property
// being fixed: a future caller that trusts `err.message` must still not be able to
// read a credential or an internal path out of it.
import { test } from "node:test";
import assert from "node:assert/strict";

import { omniRouteFetch } from "../../open-sse/mcp-server/internalFetch.ts";

/** Runs the real hop against a mocked fetch returning `body` with `status`. */
async function hopErrorMessage(body: string, status = 500): Promise<string> {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => new Response(body, { status })) as unknown as typeof fetch;
  try {
    await omniRouteFetch("/api/v1/models");
    assert.fail("omniRouteFetch must throw on a non-ok response");
  } catch (err) {
    assert.ok(err instanceof Error, "the hop must throw an Error");
    return err.message;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

// A body carrying everything the sanitizer is meant to strip: a stack frame, an
// internal absolute path, an API key and a JWT.
const HOSTILE_BODY = JSON.stringify({
  error: "upstream failure at /srv/app/dist/client.js:44:12 — api_key=sk-live-SECRET123",
  trace:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dBjftJeZ4CVPmB92K27uhbUJU1p1r_wW1gFWFOEjXk",
});

// ─── RED: the thrown message must not carry upstream secrets ───────────────

test("S-02: the internal hop does not embed a raw upstream body in the thrown error", async () => {
  const message = await hopErrorMessage(HOSTILE_BODY, 502);

  assert.ok(
    !message.includes("sk-live-SECRET123"),
    `an API key from the upstream body reached the thrown error message: ${message}`
  );
  assert.ok(
    !message.includes("/srv/app/dist/client.js"),
    `an internal source path from the upstream body reached the thrown error message: ${message}`
  );
  assert.ok(
    !message.includes("eyJhbGciOiJIUzI1NiJ9"),
    `a JWT from the upstream body reached the thrown error message: ${message}`
  );
  assert.ok(
    !/\bat\s+\S+\s+\(/.test(message),
    `a stack frame reached the thrown error message: ${message}`
  );
});

// ─── The status must survive — sanitizing must not destroy the diagnostic ──
// A fix that redacted everything into an opaque string would pass the test above
// while making the hop useless for debugging. The status code is the one part of
// the message that is generated here, not upstream, so it must be preserved.

test("S-02: the HTTP status is preserved so the error stays diagnosable", async () => {
  const message = await hopErrorMessage(HOSTILE_BODY, 502);
  assert.match(
    message,
    /502/,
    `the status code must remain in the message for diagnostics: ${message}`
  );
});

// ─── Non-sensitive upstream prose must survive sanitization ───────────────
// Counterweight to the two cases above: the sanitizer must not degenerate into
// blanking every upstream message.

test("S-02: a non-sensitive upstream error message survives sanitization", async () => {
  const message = await hopErrorMessage(JSON.stringify({ error: "Model not found" }), 404);
  assert.match(message, /Model not found/, `benign upstream prose was destroyed: ${message}`);
  assert.match(message, /404/);
});

// ─── The pre-existing "Unknown error" fallback must still work ─────────────
// response.text() itself can reject (an aborted or already-consumed body). The
// hop must degrade to a message rather than throwing a different error.

test("S-02: an unreadable response body degrades to a placeholder", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => ({
    ok: false,
    status: 500,
    text: async () => {
      throw new Error("body stream already consumed");
    },
  })) as unknown as typeof fetch;
  try {
    await omniRouteFetch("/api/v1/models");
    assert.fail("omniRouteFetch must throw on a non-ok response");
  } catch (err) {
    assert.ok(err instanceof Error);
    assert.match(err.message, /500/, `the status must survive a failed body read: ${err.message}`);
    assert.ok(
      !err.message.includes("body stream already consumed"),
      `the body-read failure leaked into the client-facing message: ${err.message}`
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
