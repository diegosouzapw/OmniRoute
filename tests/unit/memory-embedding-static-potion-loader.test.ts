import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  embedStatic,
  getOrLoadModel,
  _injectModel,
} from "../../src/lib/memory/embedding/staticPotion";
import type { EmbeddingResult } from "../../src/lib/memory/embedding/types";
import { invalidate as invalidateCache } from "../../src/lib/memory/embedding/cache";

// The model repo on Hugging Face (minishlab/potion-base-8M) ships config.json,
// model.safetensors, modules.json, special_tokens_map.json, tokenizer.json,
// tokenizer_config.json and vocab.txt. It does NOT ship vocab.json (HTTP 404).
// The stubbed fetch below serves four of those names (config.json,
// model.safetensors, tokenizer.json, vocab.txt) with small made-up contents and
// answers every other name, vocab.json included, with a 404. The loader is
// therefore exercised without network access.

// Same token order as the real vocab, cut down: [UNK] sits at id 1, not 0.
const TOKENS = ["[PAD]", "[UNK]", "[CLS]", "[SEP]", "[MASK]", "hello", "world", "##s"];
const DIM = 4;
// Row i of the matrix is [i, 0, 0, 0] so a pooled vector identifies the ids used.
const ROWS = TOKENS.map((_, i) => [i, 0, 0, 0]);

function buildSafetensors(rows: number[][]): Buffer {
  const dim = rows[0].length;
  const header = Buffer.from(
    JSON.stringify({
      embeddings: {
        dtype: "F32",
        shape: [rows.length, dim],
        data_offsets: [0, rows.length * dim * 4],
      },
    }),
    "utf8"
  );
  const len = Buffer.alloc(8);
  len.writeBigUInt64LE(BigInt(header.length));
  const data = Buffer.alloc(rows.length * dim * 4);
  rows.flat().forEach((v, i) => data.writeFloatLE(v, i * 4));
  return Buffer.concat([len, header, data]);
}

function buildTokenizerJson(tokens: string[]): string {
  return JSON.stringify({
    version: "1.0",
    model: {
      type: "WordPiece",
      unk_token: "[UNK]",
      vocab: Object.fromEntries(tokens.map((t, i) => [t, i])),
    },
  });
}

const HF_FILES: Record<string, Buffer> = {
  "config.json": Buffer.from("{}"),
  "model.safetensors": buildSafetensors(ROWS),
  "tokenizer.json": Buffer.from(buildTokenizerJson(TOKENS)),
  "vocab.txt": Buffer.from(TOKENS.join("\n") + "\n"),
};

describe("memory-embedding-static-potion loader against the repo file names", () => {
  const realFetch = globalThis.fetch;
  const prevCacheDir = process.env.MEMORY_STATIC_CACHE_DIR;
  let cacheDir = "";
  let requested: string[] = [];

  beforeEach(async () => {
    invalidateCache();
    _injectModel(null);
    requested = [];
    cacheDir = await fs.mkdtemp(path.join(os.tmpdir(), "potion-loader-"));
    process.env.MEMORY_STATIC_CACHE_DIR = cacheDir;
    globalThis.fetch = (async (input: string | URL | Request) => {
      const url = String(input);
      requested.push(url);
      const body = HF_FILES[url.split("/").pop() ?? ""];
      if (!body) return new Response("Entry not found", { status: 404 });
      return new Response(new Uint8Array(body), { status: 200 });
    }) as typeof fetch;
  });

  afterEach(async () => {
    globalThis.fetch = realFetch;
    if (prevCacheDir === undefined) delete process.env.MEMORY_STATIC_CACHE_DIR;
    else process.env.MEMORY_STATIC_CACHE_DIR = prevCacheDir;
    _injectModel(null);
    await fs.rm(cacheDir, { recursive: true, force: true });
  });

  it("loads the model on a fresh cache dir without asking for vocab.json", async () => {
    const model = await getOrLoadModel();
    assert.equal(
      requested.some((u) => u.endsWith("/vocab.json")),
      false,
      `the repo has no vocab.json, but the loader requested: ${requested.join(", ")}`
    );
    assert.equal(model.vocab["[UNK]"], 1);
    assert.equal(model.vocab["hello"], 5);
    assert.equal(model.unkIdx, 1);
  });

  it("builds a vocab as large as the embedding matrix has rows", async () => {
    const model = await getOrLoadModel();
    assert.equal(model.vocabSize, TOKENS.length);
    assert.equal(model.dim, DIM);
    assert.equal(Object.keys(model.vocab).length, model.vocabSize);
    assert.equal(model.matrix.length, model.vocabSize * model.dim);
  });

  it("embeds text through the downloaded vocab and matrix", async () => {
    const result = (await embedStatic("hello world")) as EmbeddingResult;
    assert.ok("vector" in result, `expected a vector, got ${JSON.stringify(result)}`);
    // hello = id 5, world = id 6, mean of rows [5,0,0,0] and [6,0,0,0]
    assert.deepEqual(Array.from(result.vector), [5.5, 0, 0, 0]);
  });

  it("maps an unknown word to the [UNK] row, id 1", async () => {
    const result = (await embedStatic("zzz")) as EmbeddingResult;
    assert.deepEqual(Array.from(result.vector), [1, 0, 0, 0]);
  });

  it("reuses a cache dir that already holds the downloaded files", async () => {
    await getOrLoadModel();
    _injectModel(null);
    requested = [];
    const model = await getOrLoadModel();
    assert.deepEqual(requested, []);
    assert.equal(model.vocab["world"], 6);
  });

  it("recovers from a corrupt existing tokenizer cache on the next request (#16444)", async () => {
    const modelDir = path.join(cacheDir, "potion-base-8M");
    await fs.mkdir(modelDir, { recursive: true });
    await fs.writeFile(path.join(modelDir, "tokenizer.json"), "{broken json");

    const first = await embedStatic("hello");
    assert.ok(!("vector" in first));
    assert.equal(first.reason, "model_load_failed");
    await assert.rejects(fs.access(path.join(modelDir, "tokenizer.json")));

    const second = await embedStatic("hello");
    assert.ok("vector" in second, JSON.stringify(second));
    assert.deepEqual(Array.from(second.vector), [5, 0, 0, 0]);
    assert.equal(requested.filter((url) => url.endsWith("/tokenizer.json")).length, 1);
    assert.deepEqual((await fs.readdir(modelDir)).sort(), ["model.safetensors", "tokenizer.json"]);
  });

  it("recovers from a truncated safetensors cache without restarting (#16444)", async () => {
    const modelDir = path.join(cacheDir, "potion-base-8M");
    await fs.mkdir(modelDir, { recursive: true });
    await fs.writeFile(path.join(modelDir, "model.safetensors"), Buffer.alloc(4));

    const first = await embedStatic("hello");
    assert.ok(!("vector" in first));
    assert.equal(first.reason, "model_load_failed");
    await assert.rejects(fs.access(path.join(modelDir, "model.safetensors")));

    const second = await embedStatic("hello");
    assert.ok("vector" in second, JSON.stringify(second));
    assert.deepEqual(Array.from(second.vector), [5, 0, 0, 0]);
    assert.equal(requested.filter((url) => url.endsWith("/model.safetensors")).length, 1);
  });

  it("rejects forged tensor offsets and retries a valid weight file (#16444)", async () => {
    const modelDir = path.join(cacheDir, "potion-base-8M");
    await fs.mkdir(modelDir, { recursive: true });
    // Small file claiming an enormous tensor range must never allocate based
    // on its unchecked offsets or keep the corrupt bytes in the cache.
    const bad = Buffer.from(HF_FILES["model.safetensors"]);
    const headerLength = Number(bad.readBigUInt64LE(0));
    const header = JSON.parse(bad.subarray(8, 8 + headerLength).toString("utf8"));
    header.embeddings.data_offsets = [0, 1000000000];
    const headerBytes = Buffer.from(JSON.stringify(header));
    const headerSize = Buffer.alloc(8);
    headerSize.writeBigUInt64LE(BigInt(headerBytes.length));
    await fs.writeFile(
      path.join(modelDir, "model.safetensors"),
      Buffer.concat([headerSize, headerBytes, Buffer.alloc(16)])
    );

    const first = await embedStatic("hello");
    assert.ok(!("vector" in first));
    assert.equal(first.reason, "model_load_failed");
    assert.match(first.message, /tensor shape or offsets/);
    await assert.rejects(fs.access(path.join(modelDir, "model.safetensors")));

    const retry = await embedStatic("hello");
    assert.ok("vector" in retry, JSON.stringify(retry));
    assert.deepEqual(Array.from(retry.vector), [5, 0, 0, 0]);
  });

  it("retries a transient model download failure without restarting (#16444)", async () => {
    // Make only the tokenizer download fail; avoid a racing weights write
    // from the parallel Promise.all download affecting this retry test.
    const modelDir = path.join(cacheDir, "potion-base-8M");
    await fs.mkdir(modelDir, { recursive: true });
    await fs.writeFile(path.join(modelDir, "model.safetensors"), HF_FILES["model.safetensors"]);
    const firstFetch = globalThis.fetch;
    let tokenizerRequests = 0;
    globalThis.fetch = (async (input: string | URL | Request) => {
      if (String(input).endsWith("/tokenizer.json") && ++tokenizerRequests === 1) {
        return new Response("Temporarily unavailable", { status: 503 });
      }
      return firstFetch(input);
    }) as typeof fetch;

    const first = await embedStatic("hello");
    assert.equal("vector" in first, false);
    if ("vector" in first) assert.fail("initial download should have failed");
    assert.equal(first.reason, "model_load_failed");

    // Without a reset/restart this previously re-awaited a cached rejected Promise.
    const second = await embedStatic("hello");
    assert.ok("vector" in second, JSON.stringify(second));
    assert.deepEqual(Array.from(second.vector), [5, 0, 0, 0]);
    assert.equal(tokenizerRequests, 2, "a fresh load must retry the missing tokenizer");
  });

  it("deduplicates concurrent failed loads and permits a later retry (#16444)", async () => {
    // Make only the tokenizer download fail; avoid a racing weights write
    // from the parallel Promise.all download affecting this retry test.
    const modelDir = path.join(cacheDir, "potion-base-8M");
    await fs.mkdir(modelDir, { recursive: true });
    await fs.writeFile(path.join(modelDir, "model.safetensors"), HF_FILES["model.safetensors"]);
    const firstFetch = globalThis.fetch;
    let tokenizerRequests = 0;
    globalThis.fetch = (async (input: string | URL | Request) => {
      if (String(input).endsWith("/tokenizer.json") && ++tokenizerRequests === 1) {
        return new Response("Temporarily unavailable", { status: 503 });
      }
      return firstFetch(input);
    }) as typeof fetch;

    const firstWave = await Promise.allSettled([getOrLoadModel(), getOrLoadModel()]);
    assert.deepEqual(
      firstWave.map((entry) => entry.status),
      ["rejected", "rejected"]
    );
    assert.equal(tokenizerRequests, 1, "concurrent callers must share one first load");

    const model = await getOrLoadModel();
    assert.equal(model.vocab["hello"], 5);
    assert.equal(tokenizerRequests, 2);
    const cached = await getOrLoadModel();
    assert.equal(cached, model, "after successful retry the loaded model stays cached");
  });

  const NOT_A_WORDPIECE_VOCAB: Array<[string, unknown]> = [
    ["no model.vocab at all", { model: { type: "Unigram" } }],
    [
      "a Unigram-style vocab array of [token, score] pairs",
      {
        model: {
          type: "Unigram",
          vocab: [
            ["[UNK]", 0],
            ["hello", -1.5],
          ],
        },
      },
    ],
  ];

  for (const [label, tokenizerJson] of NOT_A_WORDPIECE_VOCAB) {
    it(`reports model_load_failed when tokenizer.json has ${label}`, async () => {
      HF_FILES["tokenizer.json"] = Buffer.from(JSON.stringify(tokenizerJson));
      try {
        const result = await embedStatic("hello");
        assert.ok(!("vector" in result));
        assert.equal(result.reason, "model_load_failed");
        assert.match(result.message, /model\.vocab/);
      } finally {
        HF_FILES["tokenizer.json"] = Buffer.from(buildTokenizerJson(TOKENS));
      }
    });
  }
});
