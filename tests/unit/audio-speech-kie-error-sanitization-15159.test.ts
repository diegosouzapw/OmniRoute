import assert from "node:assert/strict";
import { test } from "node:test";

import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";

// Regression guard for audit #15159 / Hard Rule #12 — Wave 1.4 (the E-02 defect,
// one file over).
//
// open-sse/handlers/audioSpeech.ts:579-590 built its Kie createTask failure body
// by hand:
//
//   return Response.json({ error: { message: getKieErrorMessage(err, "Kie audio
//   createTask failed"), code: status } }, { status, headers: { ...CORS_HEADERS } })
//
// with no sanitizer. `getKieErrorMessage` (open-sse/utils/kieTask.ts:119-129)
// returns `error.message` raw on all three branches, and the SOURCE is raw:
// open-sse/executors/kie.ts:57-61 throws `new Error(await res.text())` — the
// entire upstream body.
//
// This is byte-for-byte the defect E-02 fixed in audioTranscription.ts:629 via
// the SAME executor, in commit 566c203381 (#15388) — that PR sanitized
// transcription but never reached the speech handler one file over.
//
// This drives the real path with a mocked fetch, so the assertion is about what a
// client actually receives.

const HOSTILE_UPSTREAM_BODY = [
  "upstream rejected the task",
  "    at Object.createTask (/srv/app/node_modules/kie/dist/index.js:44:11)",
  "    at async handleKieAudioSpeech (/home/deploy/omniroute/open-sse/handlers/audioSpeech.ts:574:7)",
  "api_key=sk-live-KIE-SPEECH-SECRET-7b1e4c",
].join("\n");

const KIE_PROVIDER = {
  id: "kie",
  format: "kie-audio",
  baseUrl: "https://api.kie.ai/",
  authType: "bearer",
};

async function runKieSpeechFailure(
  upstreamBody: string,
  upstreamStatus = 502
): Promise<{ status: number; body: Record<string, unknown>; headers: Headers }> {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(upstreamBody, {
      status: upstreamStatus,
      headers: { "Content-Type": "text/plain" },
    })) as typeof globalThis.fetch;

  try {
    const response = await handleAudioSpeech({
      body: { model: "kie/kie-tts", input: "hello", voice: "alloy" },
      credentials: { apiKey: "test-key" },
      resolvedProvider: KIE_PROVIDER as never,
      resolvedModel: "kie/kie-tts",
    });

    const raw = await response.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      body = { _unparsed: raw };
    }
    return { status: response.status, body, headers: response.headers };
  } finally {
    globalThis.fetch = original;
  }
}

function messageOf(body: Record<string, unknown>): string {
  const error = body?.error as { message?: unknown } | undefined;
  return typeof error?.message === "string" ? error.message : "";
}

test("Wave 1.4: the Kie speech createTask failure body does not leak a stack frame", async () => {
  const { body } = await runKieSpeechFailure(HOSTILE_UPSTREAM_BODY);
  const message = messageOf(body);

  assert.ok(message.length > 0, "expected an error message in the body");
  assert.ok(
    !message.includes("at /srv/app") && !message.includes("    at "),
    `stack frame leaked into the client body: ${JSON.stringify(message)}`
  );
  assert.ok(
    !message.includes("audioSpeech.ts:574"),
    "internal source path leaked into the client body"
  );
});

test("Wave 1.4: the Kie speech createTask failure body does not leak an upstream credential", async () => {
  const { body } = await runKieSpeechFailure(HOSTILE_UPSTREAM_BODY);
  const message = messageOf(body);

  assert.ok(
    !message.includes("sk-live-KIE-SPEECH-SECRET-7b1e4c"),
    `credential leaked into the client body: ${JSON.stringify(message)}`
  );
  assert.ok(
    !/api_key\s*=/i.test(message),
    `credential label leaked into the client body: ${JSON.stringify(message)}`
  );
});

test("Wave 1.4: the Kie speech failure keeps the upstream status and canonical error shape", async () => {
  const { status, body } = await runKieSpeechFailure(HOSTILE_UPSTREAM_BODY, 502);

  assert.equal(status, 502, "upstream status must be preserved for the client");

  const error = body?.error as { message?: unknown; type?: unknown } | undefined;
  assert.ok(error, "body must carry an `error` object");
  assert.equal(typeof error?.message, "string");
  // buildErrorBody's envelope always carries a bounded `type`. The hand-rolled
  // version had none, so this also pins that we moved onto the sanctioned builder.
  assert.ok(
    typeof error?.type === "string" && error.type.length > 0,
    `expected a canonical error.type, got ${JSON.stringify(error?.type)}`
  );
});

test("Wave 1.4: the Kie speech failure still carries CORS headers on the POST response", async () => {
  // The regression risk of a bare swap to `errorResponse`: the hand-rolled
  // Response.json attached `{ ...CORS_HEADERS }`, so if the fix drops them the
  // browser preflight breaks. E-02's PR in audioTranscription.ts hit exactly this
  // and merged the headers back explicitly.
  //
  // Note what these headers ARE: `Access-Control-Allow-Origin` is set by the
  // Next.js middleware (src/server/cors/origins.ts), not by this module, so the
  // assertion targets the methods/headers list that CORS_HEADERS actually
  // carries. Asserting Allow-Origin here would fail for a reason unrelated to
  // this defect.
  const { headers } = await runKieSpeechFailure(HOSTILE_UPSTREAM_BODY);

  assert.ok(
    headers.get("Access-Control-Allow-Methods"),
    "the POST error response must carry Access-Control-Allow-Methods"
  );
  assert.ok(
    headers.get("Access-Control-Allow-Headers"),
    "the POST error response must carry Access-Control-Allow-Headers"
  );
});

test("Wave 1.4: the sanitized Kie speech message still tells the operator what failed", async () => {
  // A sanitizer that redacts everything is a black hole, not a fix.
  const { body } = await runKieSpeechFailure(HOSTILE_UPSTREAM_BODY);

  assert.match(messageOf(body), /upstream rejected the task/i);
});
