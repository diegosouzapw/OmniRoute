import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Isolated DATA_DIR so this test never touches the real ~/.omniroute DB
// (handleImageGeneration's call-log path opens the shared DB singleton).
process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-anon-8085-"));

// #8085 — Pollinations image-generation requests with NO configured API key
// (the common free/keyless case) must reuse the same anonymous fingerprint
// session-pool fallback that PollinationsExecutor.execute() already applies
// to the chat path (open-sse/executors/pollinations.ts:52-71). Without it,
// the outbound request to gen.pollinations.ai carries no Authorization AND
// no browser fingerprint, so Pollinations legitimately rejects it with a
// real upstream 401 — even though the caller supplied a perfectly valid
// OmniRoute API key.
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test("#8085 keyless Pollinations image request includes anonymous fingerprint headers (User-Agent) instead of going out bare", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers || {},
    };

    return new Response(
      JSON.stringify({ created: 123, data: [{ url: "https://cdn.example.com/image.png" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "pollinations/flux",
        prompt: "a cat",
      },
      // No apiKey/accessToken — the common keyless/free Pollinations case.
      credentials: {},
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(captured, "fetch should have been called");
    assert.equal(captured.url, "https://gen.pollinations.ai/v1/images/generations");

    // No key was supplied, so no Authorization header is expected — but the
    // anonymous fallback must inject fingerprint headers (mirroring the chat
    // executor's isAnonymous branch) so the upstream doesn't see a bare,
    // headerless request and reject it with a real 401.
    assert.equal(captured.headers.Authorization, undefined);
    assert.ok(
      captured.headers["User-Agent"],
      "expected anonymous session-pool fingerprint headers (User-Agent) on the outbound Pollinations image request"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
