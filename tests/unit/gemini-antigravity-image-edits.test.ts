import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-gemini-edits-"));

const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options && options.all ? [record] : record;
}) as typeof dns.promises.lookup;
process.on("exit", () => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
});

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

interface CapturedGeminiImageRequest {
  url: string;
  headers?: HeadersInit;
  body: {
    model?: string;
    project?: string;
    request?: {
      contents?: Array<{
        parts?: Array<{
          text?: string;
          inlineData?: { mimeType?: string; data?: string };
        }>;
      }>;
    };
  };
}

test("handleImageGeneration forwards inlineData parts for Antigravity Gemini image edits with Buffer", async () => {
  const originalFetch = globalThis.fetch;
  let captured: CapturedGeminiImageRequest | undefined;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        response: {
          candidates: [
            {
              content: {
                parts: [
                  {
                    thoughtSignature: "signature",
                    inlineData: { mimeType: "image/png", data: "YmFzZTY0LWdlbWluaS1lZGl0" },
                  },
                ],
              },
            },
          ],
          modelVersion: "gemini-3.1-flash-image",
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const imageBuffer = Buffer.from("fake-png-binary-data");
    const result = await handleImageGeneration({
      body: {
        model: "antigravity/gemini-3.1-flash-image-preview",
        prompt: "add a sunset in the background",
        imageBytes: imageBuffer,
        imageMime: "image/png",
      },
      credentials: { accessToken: "ag-token", projectId: "project-123" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.body.model, "gemini-3.1-flash-image");
    assert.equal(captured.body.project, "project-123");

    const parts = captured.body.request.contents[0].parts;
    assert.equal(parts.length, 2);
    assert.equal(parts[0].inlineData.mimeType, "image/png");
    assert.equal(parts[0].inlineData.data, imageBuffer.toString("base64"));
    assert.equal(parts[1].text, "add a sunset in the background");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration forwards inlineData parts for Antigravity Gemini image edits with data URI", async () => {
  const originalFetch = globalThis.fetch;
  let captured: CapturedGeminiImageRequest | undefined;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        response: {
          candidates: [
            {
              content: {
                parts: [
                  {
                    inlineData: { mimeType: "image/jpeg", data: "YmFzZTY0LWpzb24=" },
                  },
                ],
              },
            },
          ],
          modelVersion: "gemini-3.1-flash-image",
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const dataUri = "data:image/jpeg;base64,dGVzdC1qcGVnLWRhdGE=";
    const result = await handleImageGeneration({
      body: {
        model: "antigravity/gemini-3.1-flash-image-preview",
        prompt: "remove person from background",
        image_url: dataUri,
      },
      credentials: { accessToken: "ag-token", projectId: "project-123" },
      log: null,
    });

    assert.equal(result.success, true);
    const parts = captured.body.request.contents[0].parts;
    assert.equal(parts.length, 2);
    assert.equal(parts[0].inlineData.mimeType, "image/jpeg");
    assert.equal(parts[0].inlineData.data, "dGVzdC1qcGVnLWRhdGE=");
    assert.equal(parts[1].text, "remove person from background");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
