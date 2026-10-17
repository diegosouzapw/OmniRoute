/**
 * Outbound-body serialization parity + work-removal guard.
 *
 * BaseExecutor used to `JSON.stringify(transformedBody)` unconditionally and then,
 * when fingerprinting applied, immediately replace that string with
 * `applyFingerprint(...).bodyString` — the first serialization was pure discarded
 * work on every fingerprint-enabled request (large-context bodies pay a full
 * multi-MB stringify for nothing). This test pins:
 *
 * 1. **Parity** — the request on the wire still went through the selected
 *    serialization path: fingerprint key order + UA on the fingerprint path,
 *    plain stringify on the ordinary path, fallback stringify when cli-compat is
 *    on for a provider with no fingerprint entry. Content assertions are
 *    parse-based (JSON.parse of the wire body), so escaping round-trips are
 *    checked literally instead of by substring-matching escaped output.
 * 2. **Work removal** — the body is serialized exactly once per dispatch. The
 *    marker-count assertion is the red/green guard: 2 before the fix, 1 after.
 *
 * The counting marker must be JSON-safe (no quotes/backslashes/control chars):
 * JSON.stringify escapes those, so the raw marker would never appear in output.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { CLI_FINGERPRINTS } from "../../open-sse/config/cliFingerprints.ts";

const MARKER = "parity-marker-3f9a1c-ζ-🙂";
// Escaping stress content — asserted by JSON.parse round-trip, never by substring.
const NASTY = 'has "quotes", back\\slash, new\nline\ttab, 中文 and 👨‍👩‍👧‍👦';

class PassthroughExecutor extends BaseExecutor {
  constructor(provider: string) {
    // A URL that can never be fetched for real; tests stub globalThis.fetch.
    super(provider, { baseUrls: ["https://parity.example.test/v1/x"] });
  }
  // Never trigger the refresh branch in execute().
  needsRefresh() {
    return false;
  }
  async transformRequest(_model: string, body: Record<string, unknown>) {
    return { ...body };
  }
}

async function executeCapturing(
  provider: string,
  body: Record<string, unknown>,
  credentials: Record<string, unknown>,
  countMarkerStringifies: { count: number }
): Promise<{ captured: { body: string; headers: Record<string, string> }; wireParsed: unknown }> {
  const originalFetch = globalThis.fetch;
  const originalStringify = JSON.stringify;
  let wireBody = "";

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    wireBody = String(init.body);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  JSON.stringify = ((...args: Parameters<typeof JSON.stringify>) => {
    const out = originalStringify.apply(JSON, args);
    if (typeof out === "string" && out.includes(MARKER)) countMarkerStringifies.count += 1;
    return out;
  }) as typeof JSON.stringify;

  try {
    await new PassthroughExecutor(provider).execute({
      model: "some-model",
      body,
      stream: false,
      credentials: credentials as never,
    });
    assert.ok(wireBody, "fetch must have been called with a body");
    return {
      captured: { body: wireBody, headers: {} },
      wireParsed: JSON.parse(wireBody),
    };
  } finally {
    globalThis.fetch = originalFetch;
    JSON.stringify = originalStringify;
  }
}

function markerBody(): Record<string, unknown> {
  return {
    model: "some-model",
    stream: false,
    max_tokens: 16,
    messages: [{ role: "user", content: `hello ${MARKER}` }],
    tools: [{ name: "lookup", description: `find ${MARKER}`, input_schema: { type: "object" } }],
  };
}

function parsedMessageText(parsed: unknown): string {
  const messages = (parsed as { messages: Array<{ content: unknown }> }).messages;
  return String(messages[0].content);
}

test("fingerprint path (claude OAuth): body serialized exactly once, fingerprint order + UA applied", async () => {
  const counter = { count: 0 };
  const { wireParsed } = await executeCapturing(
    "claude",
    markerBody(),
    {
      accessToken: "sk-ant-oat-parity-token",
    },
    counter
  );

  // The claude OAuth pipeline injects system/metadata and cloaks tool names, so
  // parity is pinned by invariants, not by re-deriving the whole emulated body:
  const parsed = wireParsed as Record<string, unknown>;
  assert.equal(parsedMessageText(parsed), `hello ${MARKER}`);

  const order = CLI_FINGERPRINTS["claude-code-compatible"].bodyFieldOrder ?? [];
  const expectedPrefix = order.filter((key: string) => key in parsed);
  const actualKeys = Object.keys(parsed);
  assert.deepEqual(
    actualKeys.slice(0, expectedPrefix.length),
    expectedPrefix,
    "wire body keys must carry the fingerprint field order"
  );

  // Work removal: one body serialization per dispatch, not two.
  assert.equal(
    counter.count,
    1,
    `expected exactly 1 marker-bearing serialization of the request body, got ${counter.count} (redundant pre-fingerprint stringify back?)`
  );
});

test("non-fingerprint path: body serialized exactly once, bytes match plain stringify", async () => {
  const counter = { count: 0 };
  const body = markerBody();
  const originalFetch = globalThis.fetch;
  const originalStringify = JSON.stringify;
  let wireBody = "";
  globalThis.fetch = async (_u: string | URL | Request, init: RequestInit = {}) => {
    wireBody = String(init.body);
    return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
  };
  JSON.stringify = ((...args: Parameters<typeof JSON.stringify>) => {
    const out = originalStringify.apply(JSON, args);
    if (typeof out === "string" && out.includes(MARKER)) counter.count += 1;
    return out;
  }) as typeof JSON.stringify;
  try {
    await new PassthroughExecutor("openai").execute({
      model: "some-model",
      body,
      stream: false,
      credentials: { apiKey: "sk-parity" } as never,
    });
  } finally {
    globalThis.fetch = originalFetch;
    JSON.stringify = originalStringify;
  }

  // Parity: no fingerprint for this provider/credentials → plain serialization.
  assert.ok(wireBody, "fetch must have been called with a body");
  assert.equal(wireBody, JSON.stringify(body));
  assert.equal(counter.count, 1, `expected exactly 1, got ${counter.count}`);
});

test("cli-compat enabled for a provider without a fingerprint entry falls back to one serialization", async () => {
  const originalAll = process.env.CLI_COMPAT_ALL;
  process.env.CLI_COMPAT_ALL = "1";
  try {
    const counter = { count: 0 };
    const body = markerBody();
    const { wireParsed } = await executeCapturing("openai", body, { apiKey: "sk-parity" }, counter);

    // No fingerprint entry for this provider → fallback is plain serialization
    // of the (transformed) body; the eager pre-check stringify must be gone.
    assert.equal(parsedMessageText(wireParsed), `hello ${MARKER}`);
    assert.equal(counter.count, 1, `expected 1, got ${counter.count}`);
  } finally {
    if (originalAll === undefined) delete process.env.CLI_COMPAT_ALL;
    else process.env.CLI_COMPAT_ALL = originalAll;
  }
});

test("escaped / non-ASCII content survives the fingerprint path intact", async () => {
  const counter = { count: 0 };
  const body = markerBody();
  // NASTY stresses escaping; MARKER keeps the count reliable.
  (body.messages as Array<{ role: string; content: string }>)[0].content =
    `hello ${MARKER} ${NASTY}`;
  (body.tools as Array<{ name: string; description: string }>)[0].description =
    `find ${MARKER} ${NASTY}`;

  const { wireParsed } = await executeCapturing(
    "claude",
    body,
    {
      accessToken: "sk-ant-oat-parity-token",
    },
    counter
  );

  const parsed = wireParsed as Record<string, unknown>;
  assert.equal(parsedMessageText(parsed), `hello ${MARKER} ${NASTY}`);
  const tool = (parsed.tools as Array<{ description?: unknown }>)[0];
  assert.equal(tool.description, `find ${MARKER} ${NASTY}`);
  assert.equal(counter.count, 1);
});
