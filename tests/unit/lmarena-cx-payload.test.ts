/**
 * Arena (lmarena) `cx` client-interaction telemetry + session-probe regression tests.
 *
 * Two independent defects are pinned here:
 *
 *  1. `create-evaluation` always carries a `cx` telemetry blob
 *     (`CLIENT_INTERACTION_FIELD`), which the executor previously never sent.
 *     `open-sse/executors/lmarena/clientInteraction.ts` re-implements the upstream
 *     packer; the frozen vectors below were captured from the live arena.ai bundle,
 *     so any drift in the PRNG, layout, bit-packing or base64url step fails here.
 *  2. The dashboard cookie check probed `${baseUrl}/models` — a path that 404s on
 *     arena.ai — so a live session was reported as `valid: false`. It now reads the
 *     session-scoped `/api/me/pulse`.
 *
 * Run: node --import tsx/esm --test tests/unit/lmarena-cx-payload.test.ts
 */

import { describe, it, test } from "node:test";
import assert from "node:assert/strict";
import { LMArenaExecutor } from "../../open-sse/executors/lmarena.ts";
import {
  ARENA_CLIENT_INTERACTION_BLOB_CHARS,
  ARENA_CLIENT_INTERACTION_FIELD,
  ARENA_CLIENT_INTERACTION_NONCE,
  ARENA_CLIENT_INTERACTION_VERSION,
  buildProgrammaticClientInteraction,
  encodeClientInteraction,
  encodeProgrammaticCx,
} from "../../open-sse/executors/lmarena/clientInteraction.ts";

// Import BEFORE mocking global.fetch — open-sse/utils/proxyFetch.ts overwrites
// globalThis.fetch as a module-load side effect, so a mock installed before the
// import gets clobbered (same pattern as arena-cookie-validation-redirect-7542).
const { validateWebCookieProvider } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;
test.after(() => {
  globalThis.fetch = originalFetch;
});

type TransformResult = { cx: string; recaptchaV3Token: string | null };

function transform(body: unknown, credentials?: unknown): TransformResult {
  const executor = new LMArenaExecutor();
  return (
    executor as unknown as {
      transformRequest: (b: unknown, m: string, c?: unknown) => TransformResult;
    }
  ).transformRequest(body, "gpt-4", credentials);
}

/** The browser-side field name recovered from the live bundle. */
const CLIENT_INTERACTION_FIELD = "cx";

/**
 * Ground truth captured from the live arena.ai `encodeClientInteraction`
 * (bundle module 198742) for the programmatic interaction with no DOM.
 */
const REAL_BUNDLE_VECTORS: Array<{
  name: string;
  override: Record<string, unknown>;
  nonce: number;
  expected: string;
}> = [
  {
    name: "nonce 5853 (deployment salt)",
    override: {},
    nonce: 5853,
    expected: "Ahbd4XIDxKpTIU7vpGSu",
  },
  { name: "nonce 0", override: {}, nonce: 0, expected: "AgAAfCqDvpq1eIsMIX3f" },
  { name: "nonce 65535", override: {}, nonce: 65535, expected: "Av__tBJUOhlfEwWDHun3" },
  {
    name: "nonce 1 with every field non-default",
    override: {
      submitKind: "button",
      submitTrusted: true,
      charsTyped: 37,
      pressBucket: "lt50",
      pressureBucket: "half",
      movesBeforeClick: "4to15",
      maxCoalesced: "gt4",
      heartbeatGapBucket: "ge60s",
      visibilityChangesBucket: "gt3",
      focusVisContradiction: true,
      docOwnProps: ["visibilityState", "hasFocus"],
      coarsePointer: true,
      integrity: 4660,
      visitTag: 12345,
      minuteTag: 54321,
    },
    nonce: 1,
    expected: "AgAB-l02e9h74nIcsCI3",
  },
  {
    name: "nonce 4660 with partial fields",
    override: {
      docOwnProps: ["hidden"],
      coarsePointer: true,
      insertMulti: 9,
      pasteCount: 3,
      pasteWithoutModifier: true,
      composition: true,
      otherInputTypes: 5,
      untrustedUiEvents: 7,
      visitTag: 65535,
      minuteTag: 1,
    },
    nonce: 4660,
    expected: "AhI0__2_kFqUgEHMR5Qn",
  },
];

describe("arena client interaction — wire format", () => {
  it("names the field `cx`", () => {
    assert.equal(ARENA_CLIENT_INTERACTION_FIELD, CLIENT_INTERACTION_FIELD);
    assert.equal(ARENA_CLIENT_INTERACTION_VERSION, 2);
    assert.equal(ARENA_CLIENT_INTERACTION_BLOB_CHARS, 20);
  });

  it("reproduces the upstream packer byte-for-byte", () => {
    for (const vector of REAL_BUNDLE_VECTORS) {
      const interaction = { ...buildProgrammaticClientInteraction(), ...vector.override };
      const got = encodeClientInteraction(interaction, vector.nonce);
      assert.equal(got, vector.expected, `vector "${vector.name}" diverged from the real bundle`);
      assert.equal(got.length, ARENA_CLIENT_INTERACTION_BLOB_CHARS);
    }
  });

  it("defaults to the nonce the browser derives, for a stable blob", () => {
    assert.equal(ARENA_CLIENT_INTERACTION_NONCE, 5853);
    assert.equal(encodeProgrammaticCx(), REAL_BUNDLE_VECTORS[0].expected);
  });

  it("round-trips the nonce through the blob header", () => {
    const cx = encodeProgrammaticCx();
    // Byte 0 is the version, bytes 1-2 the big-endian nonce; 5853 = 0x16dd.
    assert.deepEqual(Array.from(atobUrl(cx)).slice(0, 3), [2, 0x16, 0xdd]);
  });
});

describe("arena client interaction — request payload", () => {
  it("always attaches cx to the create-evaluation body", () => {
    const body = transform({ messages: [{ role: "user", content: "hi" }] });
    assert.equal(body.cx, REAL_BUNDLE_VECTORS[0].expected);
  });

  it("attaches cx even with no credentials at all", () => {
    const body = transform({ messages: [] });
    assert.equal(typeof body.cx, "string");
    assert.ok(body.cx.length > 0);
  });

  it("prefers an operator-supplied cx over the synthesised blob", () => {
    const captured = "ReplayedCxBlob12345";
    assert.equal(
      transform({ messages: [] }, { providerSpecificData: { cx: captured } }).cx,
      captured
    );
    assert.equal(transform({ messages: [] }, { cx: captured }).cx, captured);
    assert.equal(transform({ messages: [], cx: captured }).cx, captured);
  });

  it("ignores a blank operator-supplied cx", () => {
    const body = transform({ messages: [] }, { providerSpecificData: { cx: "   " } });
    assert.equal(body.cx, REAL_BUNDLE_VECTORS[0].expected);
  });
});

describe("arena cookie validation — session probe", () => {
  it("probes the session-scoped /api/me/pulse endpoint", async () => {
    const calls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      calls.push(typeof input === "string" ? input : input.toString());
      return new Response(JSON.stringify({ id: "u_1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }) as typeof fetch;

    const result = await validateWebCookieProvider({
      provider: "lmarena",
      apiKey: "arena-auth-prod-v1.0=abc123",
      providerSpecificData: {},
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0], "https://arena.ai/api/me/pulse");
    assert.equal(result.valid, true, "a live session must not be reported as invalid");
    assert.equal(result.unsupported, false);
  });

  it("never probes the 404-shaped `${baseUrl}/models` path", async () => {
    const calls: string[] = [];
    globalThis.fetch = (async (input: RequestInfo | URL) => {
      calls.push(typeof input === "string" ? input : input.toString());
      return new Response(null, { status: 404 });
    }) as typeof fetch;

    await validateWebCookieProvider({ provider: "lmarena", apiKey: "x=1" });

    assert.deepEqual(
      calls.filter((url) => url.includes("/create-evaluation/models")),
      [],
      "regression: /nextjs-api/stream/create-evaluation/models always 404s upstream"
    );
  });
});

/** Minimal base64url decoder (the packer emits no padding and uses `-_`). */
function atobUrl(value: string): Uint8Array {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const bytes: number[] = [];
  let acc = 0;
  let bits = 0;
  for (const char of value) {
    const index = alphabet.indexOf(char);
    assert.ok(index >= 0, `unexpected base64url char ${char}`);
    acc = (acc << 6) | index;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((acc >>> bits) & 0xff);
    }
  }
  return Uint8Array.from(bytes);
}
