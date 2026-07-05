// Regression guard for the escalated mesh-bot report: a user generated an
// image via the ChatGPT Web provider; the image WAS produced upstream but
// OmniRoute returned `502 "ChatGPT Web completed without returning image
// markdown"` — i.e. the silent-drop path where an image_asset_pointer existed
// but resolution failed, and the handler reported it as "no image made".
//
// The fix distinguishes "image generated but not retrievable" (executor sets
// x_image_resolution_failed) from "no image at all", so the 502 is accurate
// and actionable instead of misleading.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-cgptweb-silentdrop-"));

const { detectImageResolutionFailure } = await import("../../open-sse/executors/chatgpt-web.ts");
const { handleChatGptWebImageGeneration } = await import(
  "../../open-sse/handlers/imageGeneration/providers/chatgptWeb.ts"
);

function fakeExecutor(jsonBody: object, status = 200) {
  return {
    execute: async () => ({
      response: new Response(JSON.stringify(jsonBody), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
    }),
  };
}

const baseArgs = {
  model: "gpt-4o",
  provider: "chatgpt-web",
  body: { prompt: "a kitten" },
  credentials: { apiKey: "sess-cookie" },
  log: null,
  signal: null,
  clientHeaders: {},
};

test("detectImageResolutionFailure: true only when a pointer existed but none resolved", () => {
  assert.equal(detectImageResolutionFailure(1, 0), true);
  assert.equal(detectImageResolutionFailure(2, 0), true);
  assert.equal(detectImageResolutionFailure(0, 0), false); // no image at all
  assert.equal(detectImageResolutionFailure(1, 1), false); // resolved fine
});

test("handler surfaces a specific 502 when the image was generated but not retrievable", async () => {
  const res = await handleChatGptWebImageGeneration({
    ...baseArgs,
    executorFactory: () =>
      fakeExecutor({
        choices: [{ message: { role: "assistant", content: "Here's your image:" } }],
        x_image_resolution_failed: true,
      }),
  });
  assert.equal(res.success, false);
  assert.equal(res.status, 502);
  // must NOT be the misleading "completed without returning image markdown"
  assert.ok(
    !/completed without returning image markdown/i.test(res.error),
    `expected specific retrieval error, got: ${res.error}`
  );
  // must clearly say the image was generated but could not be retrieved
  assert.match(res.error, /could not (be )?retriev|generated an image but/i);
});

test("handler keeps the generic 502 when no image was generated at all", async () => {
  const res = await handleChatGptWebImageGeneration({
    ...baseArgs,
    executorFactory: () =>
      fakeExecutor({
        choices: [{ message: { role: "assistant", content: "I can't create that." } }],
      }),
  });
  assert.equal(res.success, false);
  assert.equal(res.status, 502);
  assert.match(res.error, /completed without returning image markdown/i);
});

test("handler returns success when the executor produced image markdown", async () => {
  const url = "/v1/chatgpt-web/image/abcdef0123456789";
  const res = await handleChatGptWebImageGeneration({
    ...baseArgs,
    executorFactory: () =>
      fakeExecutor({
        choices: [{ message: { role: "assistant", content: `Here you go:\n\n![image](${url})` } }],
      }),
  });
  assert.equal(res.success, true);
  assert.equal(res.data.data.length, 1);
  assert.equal(res.data.data[0].url, url);
});
