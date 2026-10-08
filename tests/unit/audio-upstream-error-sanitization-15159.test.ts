// Regression guard for audit #15159 — the audio upstream-error passthrough.
//
// TWO byte-identical-in-spirit helpers echo a raw upstream body straight into
// `error.message`:
//
//   open-sse/utils/audioResponse.ts:32        — 18 call sites (audioSpeech ×13,
//                                               awsPollyTts, fishAudioTts, geminiTts)
//   open-sse/handlers/audioTranscription.ts:39 — 17 call sites, re-exported and
//                                               imported by openrouterTranscription.ts
//
// Both take `await res.text()` from a provider fetch and hand it to the client. The
// repo already states the rule these violate:
// `open-sse/utils/upstreamErrorResponse.ts:39-41` — *"Non-JSON is an opaque upstream
// body. Do not echo even sanitized fragments: provider HTML/plaintext can contain
// credentials or implementation details outside the patterns the canonical sanitizer
// knows about."* — and `moderations.ts` / `ocr.ts` already use its sanctioned
// `buildSanitizedUpstreamErrorResponse`. The audio surface never adopted it.
//
// The catalog did not report this. It is the largest remaining Hard Rule #12 surface.
import assert from "node:assert/strict";
import { test } from "node:test";

import { upstreamErrorResponse as fromAudioUtils } from "../../open-sse/utils/audioResponse.ts";
import { upstreamErrorResponse as fromTranscription } from "../../open-sse/handlers/audioTranscription.ts";

/** A hostile upstream body: a stack frame, an absolute path and a credential. */
const HOSTILE_JSON = JSON.stringify({
  err_msg:
    "upstream rejected the request\n    at Object.post (/srv/app/node_modules/groq/dist/index.js:88:15)\napi_key=sk-live-AUDIO-SECRET-4242",
  detail: { message: "token Bearer ghp_AUDIOLEAK9999 expired for /home/deploy/.config/key.pem" },
});

const HOSTILE_HTML =
  "<html><body><pre>Error: connect ECONNREFUSED 10.0.0.5:443\n  at /srv/app/node_modules/undici/index.js:1:1\napi_key=sk-live-HTML-SECRET-7777</pre></body></html>";

function res(status = 502) {
  return new Response("upstream failed", { status });
}

async function assertSanitized(upstreamBody: string, status: number, label: string): Promise<void> {
  for (const [where, fn] of [
    ["utils/audioResponse", fromAudioUtils],
    ["handlers/audioTranscription", fromTranscription],
  ] as const) {
    const response = fn(res(status), upstreamBody);
    assert.equal(response.status, status, `${label}: ${where} lost the upstream status`);

    const raw = await response.text();
    assert.ok(
      !raw.includes("sk-live-AUDIO-SECRET-4242"),
      `${label}: ${where} leaked a credential — ${raw.slice(0, 200)}`
    );
    assert.ok(
      !raw.includes("ghp_AUDIOLEAK9999"),
      `${label}: ${where} leaked a token — ${raw.slice(0, 200)}`
    );
    assert.ok(
      !raw.includes("/srv/app/node_modules"),
      `${label}: ${where} leaked an absolute server path — ${raw.slice(0, 200)}`
    );
    assert.ok(
      !raw.includes("    at "),
      `${label}: ${where} leaked a stack frame — ${raw.slice(0, 200)}`
    );

    // The body must still be a parseable error envelope — a sanitizer that returns
    // garbage would break every audio client's error handling, which is the failure
    // mode that makes "just redact it all" the wrong fix.
    const parsed = JSON.parse(raw) as { error?: { message?: unknown } };
    assert.ok(parsed.error, `${label}: ${where} lost the error envelope`);
    assert.equal(typeof parsed.error?.message, "string");
    assert.ok((parsed.error?.message as string).length > 0, `${label}: empty message`);
  }
}

test("audio upstream errors: a hostile JSON body is sanitized on both helpers", async () => {
  await assertSanitized(HOSTILE_JSON, 502, "json");
});

test("audio upstream errors: an opaque HTML body is not echoed on either helper", async () => {
  // The documented rule: HTML/plaintext must NOT be echoed even sanitized, because the
  // canonical sanitizer's patterns do not cover provider error pages. Use the canonical
  // envelope with a fixed fallback instead.
  await assertSanitized(HOSTILE_HTML, 502, "html");
});

test("audio upstream errors: CORS headers survive sanitization", async () => {
  // Regression risk from E-02: the canonical builders do not emit CORS, and these routes
  // set it only on the OPTIONS preflight. Dropping it breaks browser clients.
  for (const [where, fn] of [
    ["utils/audioResponse", fromAudioUtils],
    ["handlers/audioTranscription", fromTranscription],
  ] as const) {
    const response = fn(res(401), JSON.stringify({ error: "bad key" }));
    assert.ok(
      response.headers.get("access-control-allow-methods"),
      `${where}: lost Access-Control-Allow-Methods`
    );
    assert.ok(
      response.headers.get("access-control-allow-headers"),
      `${where}: lost Access-Control-Allow-Headers`
    );
  }
});

test("audio upstream errors: the non-sensitive reason still reaches the operator", async () => {
  // Without this the fix could degenerate into a constant string and every audio failure
  // would become undiagnosable.
  const response = fromAudioUtils(
    res(429),
    JSON.stringify({ error: { message: "Rate limit exceeded for this organization" } })
  );
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /rate limit/i);
});

test("audio upstream errors: an empty body still yields a usable message", async () => {
  for (const [where, fn] of [
    ["utils/audioResponse", fromAudioUtils],
    ["handlers/audioTranscription", fromTranscription],
  ] as const) {
    const response = fn(res(503), "");
    const body = (await response.json()) as { error?: { message?: string } };
    assert.ok(
      typeof body.error?.message === "string" && body.error.message.length > 0,
      `${where}: empty upstream body produced no message`
    );
  }
});

test("audio upstream errors: both call sites share ONE implementation", () => {
  // Two copies of the same helper is how this drifted in the first place. If the
  // transcription module keeps its own definition, the next fix has to be made twice and
  // one copy will be missed.
  assert.equal(
    fromTranscription,
    fromAudioUtils,
    "audioTranscription.ts must re-export the shared helper, not redefine it"
  );
});
