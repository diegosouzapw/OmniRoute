// #15159 S-05 — the MCP HTTP transport's JSON-RPC error builder had no sanitizer.
//
//   open-sse/mcp-server/httpTransport.ts:155-167
//     function errorResponse(message, code, status = 400) {
//       return new Response(JSON.stringify({ jsonrpc: "2.0", error: { code, message }, id: null }), …)
//     }
//
// This is NOT the canonical `errorResponse` from open-sse/utils/error.ts — it is a
// local JSON-RPC envelope builder, and it interpolated `message` with no
// sanitization. Both current call sites pass static literals, so nothing leaks
// today; it is the same latent-builder class as E-03. The problem is that the
// next caller that forwards an `err.message` reintroduces S-02's leak on the
// JSON-RPC surface, and this builder is where that would land.
//
// The fix wraps the message in `sanitizeErrorMessage` while keeping the JSON-RPC
// 2.0 envelope shape (code + message + id) that MCP clients parse.
//
// `errorResponse` is module-private, so these tests drive it through the real
// `handleMcpStreamableHTTP` transport rather than asserting on a copy of it —
// a test that rebuilds the envelope proves nothing about the production builder.
import { test } from "node:test";
import assert from "node:assert/strict";

import { handleMcpStreamableHTTP } from "../../open-sse/mcp-server/httpTransport.ts";

/** Parses a JSON-RPC error response body, failing loudly if it is not one. */
async function jsonRpcError(response: Response): Promise<{ code: number; message: string }> {
  // 400 when the header is absent, 404 when it is present but unknown — both are
  // transport-level denials routed through the same builder, so the assertion is on
  // the envelope rather than on one call site's status code.
  assert.ok(
    response.status === 400 || response.status === 404,
    `expected a transport-level 400/404 denial, got ${response.status}`
  );
  const body = (await response.json()) as {
    jsonrpc?: string;
    id?: unknown;
    error?: { code?: number; message?: string };
  };
  assert.equal(body.jsonrpc, "2.0", "the JSON-RPC 2.0 envelope must be preserved");
  assert.equal(body.id, null, "the id field must be preserved");
  assert.ok(body.error, "the response must carry a JSON-RPC error object");
  return { code: body.error!.code ?? 0, message: body.error!.message ?? "" };
}

/**
 * Drives the real transport with a request whose body triggers the builder, then
 * returns the parsed JSON-RPC error.
 *
 * A missing Mcp-Session-Id is the path that reaches errorResponse() today; the
 * hostile text is injected through the header so a future caller forwarding a
 * header-derived value is covered by the same assertion.
 */
async function denialForSessionHeader(sessionIdHeader: string | null): Promise<{
  code: number;
  message: string;
}> {
  const headers: Record<string, string> = { "content-type": "application/json" };
  if (sessionIdHeader !== null) headers["mcp-session-id"] = sessionIdHeader;

  const response = await handleMcpStreamableHTTP(
    new Request("http://localhost/api/mcp/stream", {
      method: "POST",
      headers,
      body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/list" }),
    })
  );
  return jsonRpcError(response);
}

// A session id carrying the values the sanitizer must strip.
const HOSTILE_SESSION_ID =
  "leak at /srv/app/dist/index.js:44:12 api_key=sk-live-SECRET123 Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig";

// ─── CHARACTERIZATION, not RED: today's callers are already safe ──────────
// This case passes on the BASE commit and is deliberately labelled as such. The
// builder does not interpolate the session id — both call sites pass static
// literals — so a hostile header is discarded before it reaches the envelope. That
// is the evidence for calling S-05 latent rather than live.
//
// It is kept as a regression guard because it is exactly the property that would
// break the moment a caller starts forwarding a value. It is NOT the test that
// demonstrates the defect; the source guard below is.

test("S-05 characterization: a hostile session header never reaches the error message", async () => {
  const { message } = await denialForSessionHeader(HOSTILE_SESSION_ID);

  assert.ok(
    !message.includes("sk-live-SECRET123"),
    `an api_key reached the JSON-RPC error message: ${message}`
  );
  assert.ok(
    !message.includes("/srv/app/dist/index.js"),
    `an internal source path reached the JSON-RPC error message: ${message}`
  );
  assert.ok(
    !message.includes("eyJhbGciOiJIUzI1NiJ9"),
    `a JWT reached the JSON-RPC error message: ${message}`
  );
  assert.ok(
    !/\bat\s+\S+\s+\(/.test(message),
    `a stack frame reached the JSON-RPC error message: ${message}`
  );
});

// ─── The envelope must survive sanitization ───────────────────────────────
// Sanitizing must not break the JSON-RPC contract: an MCP client parses
// `error.code` and `error.message`, and `id` must stay null for a transport-level
// error (there is no request id to correlate).

test("S-05: the JSON-RPC envelope shape is preserved", async () => {
  const { code, message } = await denialForSessionHeader(HOSTILE_SESSION_ID);

  assert.equal(typeof code, "number", "error.code must remain a JSON-RPC numeric code");
  assert.notEqual(code, 0, "error.code must be a real code, not a defaulted zero");
  assert.ok(message.length > 0, "the error must still carry a message");
});

// ─── A benign literal must survive — the fix must not blank the transport ──
// The two current call sites pass helpful static text. Redacting everything would
// make the transport undiagnosable and would look like the sanitizer simply
// working, when it would actually be destroying operator-facing detail.

test("S-05: a benign static message survives sanitization", async () => {
  const { message } = await denialForSessionHeader(null);

  assert.match(
    message,
    /Mcp-Session-Id/i,
    `the transport's own diagnostic must survive sanitization: ${message}`
  );
});

// ─── RED: the BUILDER is the defect ────────────────────────────────────────
// This is the case that fails on the base commit. errorResponse is module-private,
// so the behavioural cases above can only cover the two paths that reach it today —
// and both pass literals, which is why they cannot demonstrate the defect. The
// missing sanitizer is a property of the builder, so it is asserted on the builder.
//
// It matters because the next caller that forwards an `err.message` lands here, and
// this builder would put it on the wire unredacted.

test("S-05: the JSON-RPC errorResponse builder sanitizes its message", async () => {
  const fs = await import("node:fs");
  const source = fs.readFileSync(
    new URL("../../open-sse/mcp-server/httpTransport.ts", import.meta.url),
    "utf8"
  );

  const start = source.indexOf("function errorResponse(");
  assert.notEqual(start, -1, "the local JSON-RPC errorResponse builder must still exist");
  const body = source.slice(start, start + 700);

  assert.match(
    body,
    /sanitizeErrorMessage\s*\(/,
    "the builder must route its message through sanitizeErrorMessage"
  );
  assert.match(body, /jsonrpc:\s*"2\.0"/, "the JSON-RPC 2.0 envelope must be preserved");
});
