/**
 * OmniRoute canonical multimodal embedding items ({ type, source }) against llama.cpp.
 *
 * llama-server started with `--embedding --mmproj …` embeds images, audio and video when
 * each `input` element is `{ content: [part] }` with the `/v1/chat/completions` content
 * parts (`image_url`, `input_audio`, `input_video`). Before this, a llama-cpp connection
 * rejected every canonical media item ("does not advertise structured embedding input
 * support") because its passthrough model list is empty.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-embeddings-llama-cpp-mm-"));

const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { prepareLlamaCppEmbeddingInput } =
  await import("../../open-sse/handlers/embeddingStructuredInput.ts");
const { EMBEDDING_PROVIDERS, getEmbeddingModelModalities } =
  await import("../../open-sse/config/embeddingRegistry.ts");

const noFetch = async () => {
  throw new Error("unexpected media fetch");
};

test("translates canonical items into llama-server content parts, one vector per item", async () => {
  const out = await prepareLlamaCppEmbeddingInput(
    [
      "task: search result | query: a cat",
      { type: "text", text: "title: none | text: a cat on a sofa" },
      { type: "image", source: { type: "base64", data: "aW1n", media_type: "image/jpeg" } },
      { type: "audio", source: { type: "base64", data: "d2F2", media_type: "audio/wav" } },
      { type: "video", source: { type: "base64", data: "bXA0", media_type: "video/mp4" } },
    ],
    noFetch
  );
  assert.deepEqual(out, [
    "task: search result | query: a cat",
    "title: none | text: a cat on a sofa",
    { content: [{ type: "image_url", image_url: { url: "data:image/jpeg;base64,aW1n" } }] },
    { content: [{ type: "input_audio", input_audio: { data: "d2F2", format: "wav" } }] },
    { content: [{ type: "input_video", input_video: { url: "data:video/mp4;base64,bXA0" } }] },
  ]);
});

test("fetches URL sources itself and rejects audio formats llama.cpp cannot decode", async () => {
  const fetched: string[] = [];
  const out = await prepareLlamaCppEmbeddingInput(
    [{ type: "image", source: { type: "url", url: "https://example.com/cat.png" } }],
    async (url) => {
      fetched.push(url);
      return { buffer: Buffer.from("png"), contentType: "image/png" };
    }
  );
  assert.deepEqual(fetched, ["https://example.com/cat.png"]);
  assert.deepEqual(out, [
    { content: [{ type: "image_url", image_url: { url: "data:image/png;base64,cG5n" } }] },
  ]);

  await assert.rejects(
    prepareLlamaCppEmbeddingInput(
      [{ type: "audio", source: { type: "base64", data: "b2dn", media_type: "audio/ogg" } }],
      noFetch
    ),
    /wav, mp3 or flac/
  );
});

test("llama-cpp passthrough models advertise image/audio/video but not document", () => {
  const llama = EMBEDDING_PROVIDERS["llama-cpp"];
  assert.deepEqual(getEmbeddingModelModalities(llama, "any-local-model.gguf"), [
    "text",
    "image",
    "audio",
    "video",
  ]);
});

test("handleEmbedding sends translated media to the connection's llama-server URL", async () => {
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
    calls.push({ url: String(url), body: JSON.parse(String(init?.body)) });
    return new Response(
      JSON.stringify({
        object: "list",
        data: [
          { object: "embedding", embedding: [0.1, 0.2], index: 0 },
          { object: "embedding", embedding: [0.3, 0.4], index: 1 },
        ],
        usage: { prompt_tokens: 90, total_tokens: 90 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleEmbedding({
      body: {
        model: "llama-cpp/embeddinggemma-2-F16.gguf",
        input: [
          { type: "text", text: "a cat" },
          { type: "image", source: { type: "base64", data: "aW1n", media_type: "image/jpeg" } },
        ],
      },
      credentials: { providerSpecificData: { baseUrl: "http://embeddinggemma:8080/v1" } },
      log: null,
    });
    assert.equal(result.success, true, JSON.stringify(result));
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "http://embeddinggemma:8080/v1/embeddings");
    assert.deepEqual(calls[0].body.input, [
      "a cat",
      { content: [{ type: "image_url", image_url: { url: "data:image/jpeg;base64,aW1n" } }] },
    ]);

    const doc = await handleEmbedding({
      body: {
        model: "llama-cpp/embeddinggemma-2-F16.gguf",
        input: [
          {
            type: "document",
            source: { type: "base64", data: "cGRm", media_type: "application/pdf" },
          },
        ],
      },
      credentials: { providerSpecificData: { baseUrl: "http://embeddinggemma:8080/v1" } },
      log: null,
    });
    assert.equal(doc.success, false);
    assert.equal(doc.status, 400);
    assert.match(doc.error, /does not support document/i);
    assert.equal(calls.length, 1, "document input must be rejected before any upstream call");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("createEmbeddingResponse keeps llama.cpp multimodal support on the synced-model route", async () => {
  const core = await import("../../src/lib/db/core.ts");
  const providersDb = await import("../../src/lib/db/providers.ts");
  const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");

  const connection = await providersDb.createProviderConnection({
    provider: "llama-cpp",
    authType: "apikey",
    name: "embeddinggemma",
    apiKey: "unused",
    isActive: true,
    providerSpecificData: { baseUrl: "http://embeddinggemma:8080/v1" },
  });
  // The shape model sync persists for a llama-server that advertises embeddings.
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
    )
    .run(
      `llama-cpp:${connection.id}`,
      JSON.stringify([
        {
          id: "/models/embeddinggemma-2-F16.gguf",
          name: "/models/embeddinggemma-2-F16.gguf",
          source: "imported",
          supportedEndpoints: ["embeddings"],
        },
      ])
    );

  const originalFetch = globalThis.fetch;
  const bodies: Array<Record<string, unknown>> = [];
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    bodies.push(JSON.parse(String(init?.body)));
    return new Response(
      JSON.stringify({
        object: "list",
        data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
        usage: { prompt_tokens: 80, total_tokens: 80 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const res = await createEmbeddingResponse({
      model: "llama-cpp//models/embeddinggemma-2-F16.gguf",
      input: [{ type: "image", source: { type: "base64", data: "aW1n", media_type: "image/png" } }],
    });
    assert.equal(res.status, 200, await res.clone().text());
    assert.deepEqual(bodies[0].input, [
      { content: [{ type: "image_url", image_url: { url: "data:image/png;base64,aW1n" } }] },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    core.resetDbInstance();
  }
});
