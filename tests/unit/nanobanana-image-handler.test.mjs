import test from "node:test";
import assert from "node:assert/strict";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";

test("handleImageGeneration(nanobanana): async submit+poll returns URL payload", async () => {
  const originalFetch = globalThis.fetch;
  let pollCount = 0;

  globalThis.fetch = async (url, options = {}) => {
    const u = String(url);

    if (u.includes("/generate-pro")) {
      const body = JSON.parse(options.body);
      assert.equal(body.prompt, "galaxy test");
      assert.equal(body.aspectRatio, "1:1");
      assert.equal(body.resolution, "2K");

      return new Response(
        JSON.stringify({ code: 200, msg: "success", data: { taskId: "task-handler-1" } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (u.includes("/record-info")) {
      pollCount += 1;
      if (pollCount < 2) {
        return new Response(
          JSON.stringify({ code: 200, msg: "success", data: { successFlag: 0 } }),
          {
            status: 200,
            headers: { "content-type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          code: 200,
          msg: "success",
          data: {
            successFlag: 1,
            response: { resultImageUrl: "https://cdn.example.com/handler-result.jpg" },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${u}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-pro",
        prompt: "galaxy test",
        size: "1024x1280",
        poll_interval_ms: 1,
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 1);
    assert.equal(result.data.data[0].url, "https://cdn.example.com/handler-result.jpg");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(nanobanana): response_format=b64_json converts URL to b64", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    const u = String(url);

    if (u.includes("/generate")) {
      return new Response(
        JSON.stringify({ code: 200, msg: "success", data: { taskId: "task-handler-2" } }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (u.includes("/record-info")) {
      return new Response(
        JSON.stringify({
          code: 200,
          msg: "success",
          data: {
            successFlag: 1,
            response: { resultImageUrl: "https://cdn.example.com/handler-result-2.jpg" },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (u.includes("handler-result-2.jpg")) {
      return new Response(new Uint8Array([0x89, 0x50, 0x4e, 0x47]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${u}`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nanobanana/nanobanana-flash",
        prompt: "galaxy test",
        response_format: "b64_json",
      },
      credentials: { apiKey: "test-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 1);
    assert.equal(result.data.data[0].b64_json, "iVBORw==");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
