/**
 * GHSA-qv45-56jc-4wmj — two copies of one redaction rule, and only one got the
 * `sk-` pattern.
 *
 * `upstreamErrorPassthrough.ts`'s CREDENTIAL_LEAK_RE matches `\bsk-[…]{8,}` and
 * REFUSES verbatim passthrough when an upstream 4xx echoes a key — correctly
 * treating it as a leak. The body then falls through to `buildErrorBody` →
 * `sanitizeErrorMessage` → `redactSensitiveErrorText`, which had no `sk-`
 * pattern at all. So the layer that recognized the credential handed it to a
 * layer that did not, and OpenAI-style `Incorrect API key provided: sk-proj-…`
 * bodies were returned to the caller verbatim.
 *
 * The passthrough file's own comment says it "mirrors the vocabulary of
 * redactSensitiveErrorText" — the mirror had diverged. This suite pins both
 * directions so it cannot diverge again.
 *
 * Run with:
 *   node --import tsx/esm --test tests/unit/error-sanitizer-sk-key-qv45.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { redactSensitiveErrorText, sanitizeErrorMessage } from "../../open-sse/utils/error.ts";

const LEAKY_BODIES = [
  "Incorrect API key provided: sk-proj-AbCdEfGhIjKlMnOpQrStUv. You can find your API key at …",
  "401 Unauthorized: sk-ant-api03-abcdefghijklmnopqrstuvwxyz-1234567890",
  "invalid key sk_live_51H8xKzAbCdEfGhIjKlMn",
  "Bad credentials for AIzaSyA1B2C3D4E5F6G7H8I9J0KaLbMcNdOeP",
  "token rejected: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U",
];

describe("redactSensitiveErrorText — raw credential patterns (GHSA-qv45-56jc-4wmj)", () => {
  for (const body of LEAKY_BODIES) {
    it(`redacts the raw credential in: ${body.slice(0, 42)}…`, () => {
      const out = redactSensitiveErrorText(body);
      assert.ok(!/\bsk[-_][A-Za-z0-9._-]{8,}/.test(out), `sk- survived: ${out}`);
      assert.ok(!/\bAIza[A-Za-z0-9_-]{20,}/.test(out), `Google key survived: ${out}`);
      assert.ok(!/\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\./.test(out), `JWT survived: ${out}`);
      assert.ok(out.includes("[REDACTED"), `nothing was redacted: ${out}`);
    });
  }

  it("redacts through sanitizeErrorMessage, the path buildErrorBody actually uses", () => {
    const out = sanitizeErrorMessage("Incorrect API key provided: sk-proj-AbCdEfGhIjKlMnOpQr.");
    assert.ok(!out.includes("sk-proj-AbCdEfGhIjKlMnOpQr"), out);
  });

  it("keeps the pre-existing redactions working", () => {
    assert.match(redactSensitiveErrorText("401: Bearer abc123def456"), /Bearer \[REDACTED\]/);
    assert.match(
      redactSensitiveErrorText('{"api_key":"secret-value","detail":"bad"}'),
      /\[REDACTED\]/
    );
    assert.match(
      redactSensitiveErrorText("data:image/png;base64,AAAABBBBCCCC"),
      /\[REDACTED_DATA_URL\]/
    );
  });

  it("does not maul ordinary error prose that merely contains 'sk'", () => {
    for (const benign of [
      "Model gpt-5 is not available on this plan",
      "risk score too high",
      "task sk failed", // short, no credential shape
      "Rate limit reached for requests",
    ]) {
      assert.equal(redactSensitiveErrorText(benign), benign);
    }
  });
});

describe("the two redaction layers stay in step", () => {
  it("every credential shape the passthrough layer refuses is also redacted here", async () => {
    // If passthrough REFUSES a body as leaky, the fallback sanitizer is the only
    // thing standing between that body and the caller. Anything the first layer
    // calls a credential, the second must scrub.
    const { shouldPassthroughUpstreamError } =
      await import("../../open-sse/utils/upstreamErrorPassthrough.ts");
    for (const body of LEAKY_BODIES) {
      const payload = { error: { message: body } };
      const relayedVerbatim = shouldPassthroughUpstreamError(401, payload);
      if (relayedVerbatim) continue; // not classified as a leak — nothing to assert
      const scrubbed = redactSensitiveErrorText(body);
      assert.notEqual(
        scrubbed,
        body,
        `passthrough refused this body as leaky but the sanitizer left it untouched: ${body}`
      );
    }
  });
});
