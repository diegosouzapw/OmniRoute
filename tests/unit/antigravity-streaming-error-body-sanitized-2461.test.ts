import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  clearAntigravityVersionCaches,
  seedAntigravityIdeVersionCache,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

async function executeWithBody(
  stream: boolean,
  responseBody: BodyInit
): Promise<{ bodyText: string; upstreamDiagnostic: Record<string, unknown> | undefined }> {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityIdeVersionCache("2026.04.17-test");
  seedAntigravityCliVersionCache("2026.04.17-test");

  globalThis.fetch = async () =>
    new Response(responseBody, {
      status: 403,
      statusText: "Forbidden provider detail",
      headers: { "Content-Type": "application/json" },
    });

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });

    assert.equal(result.response.status, 403);
    return {
      bodyText: await result.response.text(),
      upstreamDiagnostic: result.upstreamDiagnostic,
    };
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityVersionCaches();
  }
}

// Ports decolua/9router#2461: non-ok Antigravity responses must be routed through
// the same generic JSON envelope in streaming and non-streaming paths. Provider
// bytes and provider-derived diagnostics must not become client-visible.
test("AntigravityExecutor.execute sanitizes streaming and non-streaming error bodies", async () => {
  const binaryBody = new Uint8Array([0x1f, 0x8b, 0x08, 0x00, 0x02, 0xff, 0x52, 0x41, 0x4e]);
  const sensitiveBody = JSON.stringify({
    error: {
      code: 403,
      status: "PERMISSION_DENIED",
      reason: "POLICY_REJECTED",
      message: "Rejected prompt-secret with Bearer credential-secret",
      details: [{ toolArguments: "tool-secret" }],
    },
  });

  // Sequential, not Promise.all: the helper swaps `globalThis.fetch` for the duration of one
  // execution, so concurrent cases would hand each other the wrong upstream body.
  const streamingBinary = await executeWithBody(true, binaryBody);
  const nonStreamingBinary = await executeWithBody(false, binaryBody);
  const streamingJson = await executeWithBody(true, sensitiveBody);
  const nonStreamingJson = await executeWithBody(false, sensitiveBody);

  // Raw provider BYTES must never reach the client (the original #2461 bug): a non-UTF8 body
  // yields the clean templated envelope in both paths.
  for (const { bodyText } of [streamingBinary, nonStreamingBinary]) {
    assert.doesNotMatch(bodyText, /\x1f\x8b/);
    assert.deepEqual(JSON.parse(bodyText), {
      error: {
        message: "Antigravity upstream error (403): Forbidden provider detail",
        type: "permission_error",
        code: "permission_denied",
      },
    });
  }

  // #13591 (release/v3.8.52) surfaces the real upstream message to the client, so the JSON case
  // carries it; streaming and non-streaming must agree. What stays private is the RETAINED
  // diagnostic asserted below, which is the allowlisted projection only.
  const [streamingEnvelope, nonStreamingEnvelope] = [streamingJson, nonStreamingJson].map(
    ({ bodyText }) => JSON.parse(bodyText) as { error: { message: string; type: string } }
  );
  assert.deepEqual(streamingEnvelope, nonStreamingEnvelope);
  assert.match(streamingEnvelope.error.message, /^Antigravity upstream error \(403\): /);
  assert.equal(streamingEnvelope.error.type, "permission_error");

  // #3229: the executor also hands chatCore an internal-only classification. It is a projection,
  // not a sanitizer — non-JSON bodies yield status only, and a JSON body contributes nothing
  // beyond its allowlisted scalars, so provider prose and nested details cannot ride along.
  for (const { upstreamDiagnostic } of [streamingBinary, nonStreamingBinary]) {
    assert.deepEqual(upstreamDiagnostic, { httpStatus: 403 });
  }
  for (const { upstreamDiagnostic } of [streamingJson, nonStreamingJson]) {
    assert.deepEqual(upstreamDiagnostic, {
      httpStatus: 403,
      providerCode: 403,
      providerStatus: "PERMISSION_DENIED",
      providerReason: "POLICY_REJECTED",
      validationCategory: "policy_rejection",
    });
    assert.doesNotMatch(
      JSON.stringify(upstreamDiagnostic),
      /prompt-secret|credential-secret|tool-secret|Bearer|details/
    );
  }
});
