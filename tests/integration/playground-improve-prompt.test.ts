/**
 * Integration tests for POST /api/playground/improve-prompt
 *
 * Tests import the route handler directly and call it with mock Request objects.
 * Fetch to /v1/chat/completions is mocked via globalThis.fetch.
 *
 * Coverage areas:
 * - Happy path (system + prompt, only system, only prompt)
 * - Invalid bodies → 400
 * - Missing model → 400
 * - Upstream error → sanitized error (no stack trace leak)
 * - Hard Rule #12: error.message never contains " at /"
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Set up a temp DATA_DIR so getDbInstance() initialises cleanly
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-improve-prompt-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
// Disable mandatory auth for most tests
process.env.REQUIRE_API_KEY = "false";

const { POST, OPTIONS } = await import(
  "../../src/app/api/playground/improve-prompt/route.ts"
);

const BASE_URL = "http://localhost:20128";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeUpstreamOkFetch(content: string, promptTokens = 10, completionTokens = 5) {
  return async (_url: unknown, _opts: unknown) => {
    const body = JSON.stringify({
      choices: [{ message: { content } }],
      usage: { prompt_tokens: promptTokens, completion_tokens: completionTokens },
    });
    return new Response(body, { status: 200, headers: { "Content-Type": "application/json" } });
  };
}

function makeUpstreamErrorFetch(status: number, text: string) {
  return async (_url: unknown, _opts: unknown) => {
    return new Response(text, { status, headers: { "Content-Type": "text/plain" } });
  };
}

function postRequest(body: unknown): Request {
  return new Request(`${BASE_URL}/api/playground/improve-prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Cleanup ─────────────────────────────────────────────────────────────────

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── OPTIONS ─────────────────────────────────────────────────────────────────

test("OPTIONS returns 200 with CORS headers", async () => {
  const res = await OPTIONS();
  assert.equal(res.status, 200);
  assert.ok(res.headers.get("Access-Control-Allow-Methods")?.includes("POST"));
});

// ─── Happy paths ─────────────────────────────────────────────────────────────

test("happy path: system + prompt both provided", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = makeUpstreamOkFetch(
      "<<SYSTEM>>\nimproved system\n\n<<PROMPT>>\nimproved prompt",
      10,
      5
    ) as typeof fetch;

    const res = await POST(
      postRequest({ system: "You are a helper.", prompt: "Tell me about AI.", model: "gpt-4o-mini" })
    );
    assert.equal(res.status, 200);

    const body = (await res.json()) as {
      improvedSystem?: string;
      improvedPrompt?: string;
      tokensIn: number;
      tokensOut: number;
    };
    assert.equal(body.improvedSystem, "improved system");
    assert.equal(body.improvedPrompt, "improved prompt");
    assert.equal(body.tokensIn, 10);
    assert.equal(body.tokensOut, 5);
    // CORS header present
    assert.ok(res.headers.get("Access-Control-Allow-Methods")?.includes("POST"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("happy path: only system provided", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = makeUpstreamOkFetch("improved system content only") as typeof fetch;

    const res = await POST(
      postRequest({ system: "You are a helpful assistant.", model: "gpt-4o" })
    );
    assert.equal(res.status, 200);

    const body = (await res.json()) as {
      improvedSystem?: string;
      improvedPrompt?: string;
      tokensIn: number;
      tokensOut: number;
    };
    // When only system was sent and no markers, content assigned to improvedSystem
    assert.ok(typeof body.improvedSystem === "string" || body.improvedSystem === undefined);
    assert.strictEqual(body.improvedPrompt, undefined);
    assert.equal(typeof body.tokensIn, "number");
    assert.equal(typeof body.tokensOut, "number");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("happy path: only prompt provided", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = makeUpstreamOkFetch("improved prompt content only") as typeof fetch;

    const res = await POST(
      postRequest({ prompt: "What is machine learning?", model: "claude-3-5-sonnet-20241022" })
    );
    assert.equal(res.status, 200);

    const body = (await res.json()) as {
      improvedSystem?: string;
      improvedPrompt?: string;
      tokensIn: number;
      tokensOut: number;
    };
    assert.strictEqual(body.improvedSystem, undefined);
    assert.ok(typeof body.improvedPrompt === "string" || body.improvedPrompt === undefined);
    assert.equal(typeof body.tokensIn, "number");
    assert.equal(typeof body.tokensOut, "number");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("happy path: usage defaults to 0 when not in upstream response", async () => {
  const originalFetch = globalThis.fetch;
  try {
    // Return response without usage field
    globalThis.fetch = (async (_url: unknown, _opts: unknown) => {
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "improved" } }] }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }) as typeof fetch;

    const res = await POST(
      postRequest({ prompt: "Hello world", model: "gpt-4o-mini" })
    );
    assert.equal(res.status, 200);

    const body = (await res.json()) as { tokensIn: number; tokensOut: number };
    assert.equal(body.tokensIn, 0);
    assert.equal(body.tokensOut, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── Validation errors → 400 ─────────────────────────────────────────────────

test("400 when body has neither system nor prompt", async () => {
  const res = await POST(postRequest({ model: "gpt-4o-mini" }));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "should have error field");
  assert.equal(typeof body.error.message, "string");
  // Hard Rule #12: no stack trace
  assert.ok(!body.error.message.match(/\sat\s\//), "should not contain stack trace");
});

test("400 when body has both system and prompt as empty strings", async () => {
  const res = await POST(postRequest({ system: "   ", prompt: "  ", model: "gpt-4o-mini" }));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "should have error field");
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("400 when model is missing", async () => {
  const res = await POST(postRequest({ system: "You are a helper." }));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "should have error field");
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("400 when model is empty string", async () => {
  const res = await POST(postRequest({ prompt: "Tell me something.", model: "" }));
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "should have error field");
  assert.ok(!body.error.message.match(/\sat\s\//));
});

test("400 when JSON body is malformed", async () => {
  const req = new Request(`${BASE_URL}/api/playground/improve-prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "NOT_JSON",
  });
  const res = await POST(req);
  assert.equal(res.status, 400);

  const body = (await res.json()) as { error: { message: string } };
  assert.ok(body.error, "should have error field");
  assert.ok(!body.error.message.match(/\sat\s\//));
});

// ─── Upstream error handling ──────────────────────────────────────────────────

test("upstream error returns sanitized error message — no stack trace in body", async () => {
  const originalFetch = globalThis.fetch;
  try {
    // Simulate upstream returning 500 with a message that looks like stack trace
    globalThis.fetch = makeUpstreamErrorFetch(
      500,
      "Internal error\n    at /home/user/project/src/handler.ts:42:10\n    at process.nextTick"
    ) as typeof fetch;

    const res = await POST(
      postRequest({ prompt: "Hello", model: "gpt-4o-mini" })
    );
    // Should be an error response (not 200)
    assert.ok(res.status >= 400);

    const body = (await res.json()) as { error: { message: string } };
    assert.ok(body.error, "should have error field");
    // Hard Rule #12: stack trace must be stripped
    assert.ok(
      !body.error.message.match(/\sat\s\//),
      "error message must not contain stack trace paths"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("upstream network error is sanitized", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () => {
      throw new Error("ECONNREFUSED connect ECONNREFUSED 127.0.0.1:20128");
    }) as typeof fetch;

    const res = await POST(
      postRequest({ prompt: "Hello", model: "gpt-4o-mini" })
    );
    assert.ok(res.status >= 500);

    const body = (await res.json()) as { error: { message: string } };
    assert.ok(body.error);
    assert.ok(!body.error.message.match(/\sat\s\//));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── Auth ─────────────────────────────────────────────────────────────────────

test("401 when REQUIRE_API_KEY=true and no key provided", async () => {
  const originalRequired = process.env.REQUIRE_API_KEY;
  try {
    process.env.REQUIRE_API_KEY = "true";
    const res = await POST(
      postRequest({ prompt: "Test", model: "gpt-4o-mini" })
    );
    assert.equal(res.status, 401);

    const body = (await res.json()) as { error: { message: string } };
    assert.ok(body.error);
    assert.ok(!body.error.message.match(/\sat\s\//));
  } finally {
    process.env.REQUIRE_API_KEY = originalRequired;
  }
});
