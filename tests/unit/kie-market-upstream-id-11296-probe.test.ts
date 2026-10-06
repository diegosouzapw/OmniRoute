import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-kie-11296-probe-"));

const { handleImageGeneration } = await import(
  "../../open-sse/handlers/imageGeneration.ts"
);

interface CapturedCreate {
  url: string;
  body: Record<string, unknown>;
}

async function captureCreateTaskModel(publicModel: string): Promise<string> {
  const originalFetch = globalThis.fetch;
  let captured: CapturedCreate | undefined;

  globalThis.fetch = (async (url: unknown, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "https://api.kie.ai/api/v1/jobs/createTask") {
      captured = {
        url: stringUrl,
        body: JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>,
      };
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-probe-task-1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/jobs/recordInfo")) {
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            state: "success",
            resultJson: JSON.stringify({ resultUrls: ["https://example.com/kie-probe.png"] }),
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof globalThis.fetch;

  try {
    await handleImageGeneration({
      body: { model: publicModel, prompt: "probe prompt", size: "1024x1024", n: 1 },
      credentials: { apiKey: "test-kie-key" },
      log: null,
    });
    assert.ok(captured, "expected a createTask request to be captured");
    return String(captured.body.model);
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("#11296: GPT Image 2 T2I sends KIE's real upstream id (no namespace prefix)", async () => {
  const sentModel = await captureCreateTaskModel("kie/gpt/gpt-image-2-text-to-image");
  assert.equal(sentModel, "gpt-image-2-text-to-image");
});

test("#11296: GPT Image 2 I2I sends KIE's real upstream id (no namespace prefix)", async () => {
  const sentModel = await captureCreateTaskModel("kie/gpt/gpt-image-2-image-to-image");
  assert.equal(sentModel, "gpt-image-2-image-to-image");
});

test("#11296: GPT Image 1.5 T2I sends KIE's real 'gpt-image/' namespace", async () => {
  const sentModel = await captureCreateTaskModel("kie/gpt/gpt-image-1.5-text-to-image");
  assert.equal(sentModel, "gpt-image/1.5-text-to-image");
});

test("#11296: Seedream 5.0 Lite T2I sends KIE's real id without the '.0'", async () => {
  const sentModel = await captureCreateTaskModel("kie/seedream/5.0-lite-text-to-image");
  assert.equal(sentModel, "seedream/5-lite-text-to-image");
});

test("#11296: Flux 2 Pro T2I sends KIE's real 'flux-2/' namespace (dash, not slash)", async () => {
  const sentModel = await captureCreateTaskModel("kie/flux/2-pro-text-to-image");
  assert.equal(sentModel, "flux-2/pro-text-to-image");
});
