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

const { handleFalAIImageEdit } =
  await import("../../../open-sse/handlers/imageGeneration/providers/fal.ts");

test("handleFalAIImageEdit forwards multiple references to the Fal edit endpoint", async () => {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === "https://fal.run/fal-ai/flux-2-flex/edit") {
      captured = {
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return new Response(JSON.stringify({ images: [{ url: "data:image/png;base64,CAkK" }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleFalAIImageEdit({
      model: "fal-ai/flux-2-flex",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://fal.run" },
      body: { prompt: "make the dog match the reference" },
      images: [
        { bytes: Buffer.from([1, 2, 3]), mime: "image/png" },
        { bytes: Buffer.from([4, 5, 6]), mime: "image/jpeg" },
      ],
      credentials: { apiKey: "fal-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(captured.headers.Authorization, "Key fal-key");
    assert.deepEqual(captured.body.image_urls, [
      "data:image/png;base64,AQID",
      "data:image/jpeg;base64,BAUG",
    ]);
    assert.equal(captured.body.prompt, "make the dog match the reference");
    assert.equal(result.data.data[0].b64_json, "CAkK");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
