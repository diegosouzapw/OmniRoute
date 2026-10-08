import assert from "node:assert/strict";
import { test } from "node:test";

import { handleAudioTranscription } from "../../open-sse/handlers/audioTranscription.ts";

// Regression guard for audit #15159 / Hard Rule #12 — E-02.
//
// `open-sse/handlers/audioTranscription.ts:645-656` built its Kie createTask
// failure body with a bare `Response.json({ error: { message: err.message } })`
// and no sanitizer. The caught error is whatever `kieExecutor.createTask` threw,
// which is the RAW upstream response body (open-sse/executors/kie.ts:57-61 does
// `throw Object.assign(new Error(await res.text()), { status })`).
//
// The contradiction that made this worth fixing rather than "closing as latent":
// the SAME file already imports the canonical `errorResponse` (line 26) and the
// polling function 40 lines below (`:694`) already routes through it. So the file
// knows the correct pattern and simply did not use it on this branch. The gate
// could not see it either — importing `utils/error` made `check:error-helper`
// trust the entire file (that blind spot is G-03, fixed in #15376).
//
// This drives the real path with a mocked fetch so the assertion is about what a
// client actually receives, not about a helper in isolation.

const HOSTILE_UPSTREAM_BODY = [
  "upstream rejected the task",
  "    at Object.createTask (/srv/app/node_modules/kie/dist/index.js:44:11)",
  "    at async handleKieAudioTranscription (/home/deploy/omniroute/open-sse/handlers/audioTranscription.ts:629:9)",
  "api_key=sk-live-KIE-SECRET-9f3a2b",
].join("\n");

const KIE_PROVIDER = {
  id: "kie",
  format: "kie-audio",
  baseUrl: "https://api.kie.ai/",
  authType: "bearer",
};

function buildFormData() {
  const formData = new FormData();
  formData.set("model", "kie/kie-whisper");
  formData.set("file", new Blob([new Uint8Array([1, 2, 3])], { type: "audio/wav" }), "clip.wav");
  return formData;
}

async function runKieCreateTaskFailure(
  upstreamBody: string,
  upstreamStatus = 502
): Promise<{ status: number; body: Record<string, unknown> }> {
  const original = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(upstreamBody, {
      status: upstreamStatus,
      headers: { "Content-Type": "text/plain" },
    })) as typeof globalThis.fetch;

  try {
    const response = await handleAudioTranscription({
      formData: buildFormData(),
      credentials: { apiKey: "test-key" },
      resolvedProvider: KIE_PROVIDER as never,
      resolvedModel: "kie/kie-whisper",
    });

    const raw = await response.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      body = { _unparsed: raw };
    }
    return { status: response.status, body };
  } finally {
    globalThis.fetch = original;
  }
}

function messageOf(body: Record<string, unknown>): string {
  const error = body?.error as { message?: unknown } | undefined;
  return typeof error?.message === "string" ? error.message : "";
}

test("E-02: the Kie createTask failure body does not leak a stack frame", async () => {
  const { body } = await runKieCreateTaskFailure(HOSTILE_UPSTREAM_BODY);
  const message = messageOf(body);

  assert.ok(message.length > 0, "expected an error message in the body");
  assert.ok(
    !message.includes("at /srv/app") && !message.includes("    at "),
    `stack frame leaked into the client body: ${JSON.stringify(message)}`
  );
  assert.ok(
    !message.includes("audioTranscription.ts:629"),
    "internal source path leaked into the client body"
  );
});

test("E-02: the Kie createTask failure body does not leak an upstream credential", async () => {
  const { body } = await runKieCreateTaskFailure(HOSTILE_UPSTREAM_BODY);
  const message = messageOf(body);

  assert.ok(
    !message.includes("sk-live-KIE-SECRET-9f3a2b"),
    `credential leaked into the client body: ${JSON.stringify(message)}`
  );
  assert.ok(
    !/api_key\s*=/i.test(message),
    `credential label leaked into the client body: ${JSON.stringify(message)}`
  );
});

test("E-02: the failure body keeps the upstream status and the canonical error shape", async () => {
  const { status, body } = await runKieCreateTaskFailure(HOSTILE_UPSTREAM_BODY, 502);

  assert.equal(status, 502, "upstream status must be preserved for the client");

  const error = body?.error as { message?: unknown; type?: unknown } | undefined;
  assert.ok(error, "body must carry an `error` object");
  // buildErrorBody's envelope: `error.message` is always a string, and `type` is
  // one of its bounded identifiers. The hand-rolled version had no `type` at all,
  // so this also pins that we moved onto the sanctioned builder.
  assert.equal(typeof error?.message, "string");
  assert.ok(
    typeof error?.type === "string" && error.type.length > 0,
    `expected a canonical error.type, got ${JSON.stringify(error?.type)}`
  );
});

test("E-02: the sanitized message still tells the operator what failed", async () => {
  // A sanitizer that redacts everything is not a fix, it is a black hole. The
  // non-sensitive prose must survive so the 502 remains diagnosable.
  const { body } = await runKieCreateTaskFailure(HOSTILE_UPSTREAM_BODY);
  const message = messageOf(body);

  assert.match(message, /upstream rejected the task/i);
});
