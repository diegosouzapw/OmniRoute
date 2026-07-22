/**
 * POST /api/v1/council — AI Council SSE endpoint.
 *
 * Behavioral tests for the route's deterministic guard branches (Content-Type,
 * JSON parse, request-schema validation) and the SSE happy-path plumbing with a
 * mocked per-model dispatcher. The multi-round debate loop itself is covered by
 * tests/unit/services/debate.test.ts (the route reuses collectPanel /
 * extractPanelText / appendUserTurn / buildDebate* from those modules); here we
 * assert the route wraps that loop in a correct SSE envelope and never leaks raw
 * error internals (Hard Rule #12).
 *
 * REQUIRE_API_KEY defaults to "false" (src/shared/constants/featureFlagDefinitions.ts),
 * so unauthenticated requests reach body validation — no auth mocking needed for
 * the guard-branch tests.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-council-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "council-route-test-secret";

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/v1/council/route.ts");

const originalFetch = globalThis.fetch;

function jsonRequest(body: unknown, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost:20128/api/v1/council", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

/**
 * Drain an SSE ReadableStream to completion, returning every parsed `data:` event.
 * Used for the auto-panel path where the request is valid (200) and the response is
 * a live SSE stream; with fetch mocked to reject, the panel fan-out fails fast so
 * the stream closes quickly and deterministically.
 */
async function drainSse(res: Response): Promise<Array<Record<string, unknown>>> {
  const events: Array<Record<string, unknown>> = [];
  const reader = (res.body as ReadableStream<Uint8Array>).getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") continue;
      try {
        events.push(JSON.parse(data) as Record<string, unknown>);
      } catch {
        // non-JSON line — skip
      }
    }
  }
  return events;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("OPTIONS: returns CORS preflight headers", async () => {
  const res = await route.OPTIONS();
  assert.equal(res.status, 204);
  assert.ok(res.headers.get("Access-Control-Allow-Methods")?.includes("POST"));
});

test("POST: non-JSON Content-Type → 415", async () => {
  const res = await route.POST(
    new Request("http://localhost:20128/api/v1/council", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "not json",
    })
  );
  assert.equal(res.status, 415);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /Content-Type/i);
});

test("POST: malformed JSON body → 400", async () => {
  const res = await route.POST(jsonRequest("{ this is not valid json"));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /JSON/i);
});

test("POST: omitted models[] → 200 auto-panel mode (uses connected models)", async () => {
  // models[] is optional. When omitted, the council derives its panel from every
  // connected provider (resolveAutoPanel). With fetch rejected, the panel fan-out
  // fails fast; we assert the request is accepted (200 SSE) rather than rejected,
  // and the stream terminates with a done/error event (never hangs).
  globalThis.fetch = (async () => {
    throw new Error("network disabled in test");
  }) as typeof fetch;

  const res = await route.POST(jsonRequest({ messages: [{ role: "user", content: "hi" }] }));
  assert.equal(res.status, 200);
  assert.match(res.headers.get("Content-Type") ?? "", /text\/event-stream/);

  const events = await drainSse(res);
  // Auto-panel resolved (no-auth free providers are always present), so the run
  // reaches at least a round_start; and it must terminate with a done event.
  assert.ok(events.some((e) => e.type === "done"), "stream must emit a terminal done event");
});

test("POST: empty models[] → 200 auto-panel mode", async () => {
  globalThis.fetch = (async () => {
    throw new Error("network disabled in test");
  }) as typeof fetch;

  const res = await route.POST(
    jsonRequest({ models: [], messages: [{ role: "user", content: "hi" }] })
  );
  assert.equal(res.status, 200);
  const events = await drainSse(res);
  assert.ok(events.some((e) => e.type === "done"), "stream must emit a terminal done event");
});

test("POST: missing messages[] → 400", async () => {
  const res = await route.POST(jsonRequest({ models: ["p/a", "p/b"] }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /messages/i);
});

test("POST: oversized panel (>40 models) → 400", async () => {
  const models = Array.from({ length: 41 }, (_, i) => `p/m${i}`);
  const res = await route.POST(
    jsonRequest({ models, messages: [{ role: "user", content: "hi" }] })
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  assert.match(body.error.message, /Invalid council request/i);
});

test("POST: schema-error responses never leak a stack trace (Hard Rule #12)", async () => {
  const res = await route.POST(jsonRequest({ models: [], messages: [] }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error: { message: string } };
  // No file-path / stack-frame markers in the sanitized error body.
  assert.ok(!body.error.message.includes("at /"));
  assert.ok(!body.error.message.includes(".ts:"));
});
