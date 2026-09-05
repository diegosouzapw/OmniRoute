import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-fal-images-"));

const originalDnsLookup = dns.promises.lookup;
(dns.promises as { lookup: unknown }).lookup = (async (
  _hostname: string,
  options?: { all?: boolean }
) => {
  const record = { address: "203.0.113.1", family: 4 };
  return options?.all ? [record] : record;
}) as typeof dns.promises.lookup;
process.on("exit", () => {
  (dns.promises as { lookup: unknown }).lookup = originalDnsLookup;
});

const { handleImageGeneration } = await import("../../../open-sse/handlers/imageGeneration.ts");

test("handleImageGeneration returns Fal images as base64 when response_format is omitted", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://fal.run/fal-ai/flux-2-flex") {
      return new Response(
        JSON.stringify({ images: [{ url: "https://cdn.example.com/fal-flex.png" }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (stringUrl === "https://cdn.example.com/fal-flex.png") {
      return new Response(new Uint8Array([8, 9, 10]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "fal-ai/fal-ai/flux-2-flex", prompt: "red apple" },
      credentials: { apiKey: "fal-key" },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, "CAkK");
    assert.equal(result.data.data[0].url, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
