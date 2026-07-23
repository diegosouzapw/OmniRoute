/**
 * Static Potion embedding (D7) — potion-base-8M via lookup + WordPiece minimal.
 *
 * Downloads model files once to <DATA_DIR>/embeddings/potion-base-8M/.
 * No WASM, no @huggingface/tokenizers dependency.
 * Singleton: matrix + vocab cached in module memory after first load.
 */

import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import type { EmbeddingResult, EmbeddingError } from "./types";

const MODEL_ID = "minishlab/potion-base-8M";
const MODEL_NAME = "potion-base-8M";
const HF_BASE =
  process.env.HF_HUB_ENDPOINT || "https://huggingface.co";

function getModelDir(): string {
  const staticCacheDir = process.env.MEMORY_STATIC_CACHE_DIR;
  if (staticCacheDir) return path.join(staticCacheDir, MODEL_NAME);
  const dataDir = process.env.DATA_DIR ?? path.join(os.homedir(), ".omniroute");
  return path.join(dataDir, "embeddings", MODEL_NAME);
}

export interface PotionModel {
  vocab: Record<string, number>;       // token → index
  matrix: Float32Array;                // flat row-major [vocab_size × dim]
  dim: number;
  vocabSize: number;
  unkIdx: number;
}

// Singleton state
let _model: PotionModel | null = null;
let _loading: Promise<PotionModel> | null = null;

/** For testing: inject a mock model, bypassing download. */
export function _injectModel(model: PotionModel | null): void {
  _model = model;
  _loading = null;
}

async function downloadFile(url: string, dest: string): Promise<void> {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Failed to download ${url}: HTTP ${resp.status}`);
  }
  const buf = await resp.arrayBuffer();
  await fs.writeFile(dest, Buffer.from(buf));
}

async function ensureFile(filePath: string, url: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    await downloadFile(url, filePath);
  }
}

/**
 * Parse safetensors format to extract the first float32 tensor.
 * Header format: 8-byte little-endian uint64 = header_len, then JSON header,
 * then raw tensor bytes.
 */
function parseSafetensors(buf: Buffer): { matrix: Float32Array; shape: number[] } {
  // Read 8-byte header size (little-endian)
  const headerLen = Number(buf.readBigUInt64LE(0));
  const headerJson = buf.slice(8, 8 + headerLen).toString("utf8");
  const header = JSON.parse(headerJson) as Record<
    string,
    { dtype?: string; shape?: number[]; data_offsets?: [number, number] }
  >;

  // Find the first float32 tensor (ignore __metadata__)
  for (const [key, meta] of Object.entries(header)) {
    if (key === "__metadata__") continue;
    if (!meta.dtype || !meta.shape || !meta.data_offsets) continue;
    const dtype = meta.dtype.toLowerCase();
    if (dtype !== "f32" && dtype !== "float32") continue;

    const [startOffset, endOffset] = meta.data_offsets;
    const dataStart = 8 + headerLen + startOffset;
    const dataEnd = 8 + headerLen + endOffset;
    const dataSlice = buf.slice(dataStart, dataEnd);

    const floatCount = (dataEnd - dataStart) / 4;
    const arr = new Float32Array(floatCount);
    for (let i = 0; i < floatCount; i++) {
      arr[i] = dataSlice.readFloatLE(i * 4);
    }
    return { matrix: arr, shape: meta.shape };
  }
  throw new Error("No float32 tensor found in safetensors file");
}

async function loadModel(): Promise<PotionModel> {
  const modelDir = getModelDir();
  await fs.mkdir(modelDir, { recursive: true });

  const hfBase = `${HF_BASE}/${MODEL_ID}/resolve/main`;

  const vocabPath = path.join(modelDir, "vocab.json");
  const modelPath = path.join(modelDir, "model.safetensors");
  const tokenizerPath = path.join(modelDir, "tokenizer.json");

  await Promise.all([
    ensureFile(vocabPath, `${hfBase}/vocab.json`),
    ensureFile(modelPath, `${hfBase}/model.safetensors`),
    ensureFile(tokenizerPath, `${hfBase}/tokenizer.json`),
  ]);

  // Load vocab
  const vocabRaw = await fs.readFile(vocabPath, "utf8");
  const vocab = JSON.parse(vocabRaw) as Record<string, number>;

  // Load matrix from safetensors
  const modelBuf = await fs.readFile(modelPath);
  const { matrix, shape } = parseSafetensors(modelBuf);

  if (shape.length < 2) {
    throw new Error(`Unexpected safetensors shape: ${JSON.stringify(shape)}`);
  }
  const vocabSize = shape[0];
  const dim = shape[1];

  const unkIdx = vocab["[UNK]"] ?? 0;

  return { vocab, matrix, dim, vocabSize, unkIdx };
}

export function getOrLoadModel(): Promise<PotionModel> {
  if (_model) return Promise.resolve(_model);
  if (_loading) return _loading;
  _loading = loadModel().then((m) => {
    _model = m;
    _loading = null;
    return m;
  });
  return _loading;
}

/**
 * Minimal WordPiece tokenizer.
 * 1. Split text by whitespace.
 * 2. For each word, try full match in vocab.
 * 3. If not found, greedily split into ##sub-tokens.
 * 4. Any unresolved piece becomes [UNK].
 */
export function tokenizeWordPiece(text: string, vocab: Record<string, number>): number[] {
  const words = text.trim().toLowerCase().split(/\s+/);
  const tokenIds: number[] = [];
  const unkId = vocab["[UNK]"] ?? 0;

  for (const word of words) {
    if (!word) continue;
    if (vocab[word] !== undefined) {
      tokenIds.push(vocab[word]);
      continue;
    }

    // WordPiece greedy sub-tokenization
    const subTokens: number[] = [];
    let remaining = word;
    let failed = false;

    while (remaining.length > 0) {
      let found = false;
      for (let end = remaining.length; end > 0; end--) {
        const candidate = subTokens.length === 0 ? remaining.slice(0, end) : `##${remaining.slice(0, end)}`;
        if (vocab[candidate] !== undefined) {
          subTokens.push(vocab[candidate]);
          remaining = remaining.slice(end);
          found = true;
          break;
        }
      }
      if (!found) {
        failed = true;
        break;
      }
    }

    if (failed || subTokens.length === 0) {
      tokenIds.push(unkId);
    } else {
      for (const id of subTokens) tokenIds.push(id);
    }
  }

  return tokenIds;
}

/**
 * Mean pooling over token vectors.
 */
export function meanPool(tokenIds: number[], matrix: Float32Array, dim: number, vocabSize: number, unkIdx: number): Float32Array {
  const result = new Float32Array(dim);
  let validCount = 0;

  for (const id of tokenIds) {
    const safeId = id >= 0 && id < vocabSize ? id : unkIdx;
    const offset = safeId * dim;
    for (let d = 0; d < dim; d++) {
      result[d] += matrix[offset + d];
    }
    validCount++;
  }

  if (validCount > 0) {
    for (let d = 0; d < dim; d++) {
      result[d] /= validCount;
    }
  }

  return result;
}

export async function embedStatic(text: string): Promise<EmbeddingResult | EmbeddingError> {
  const t0 = Date.now();
  let model: PotionModel;
  try {
    model = await getOrLoadModel();
  } catch (err: unknown) {
    return {
      source: "static",
      model: MODEL_NAME,
      reason: "model_load_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    };
  }

  try {
    const tokenIds = tokenizeWordPiece(text, model.vocab);
    const vector = meanPool(tokenIds, model.matrix, model.dim, model.vocabSize, model.unkIdx);
    return {
      vector,
      source: "static",
      model: MODEL_NAME,
      dimensions: model.dim,
      latencyMs: Date.now() - t0,
      cached: false,
    };
  } catch (err: unknown) {
    return {
      source: "static",
      model: MODEL_NAME,
      reason: "request_failed",
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    };
  }
}
