/**
 * LLMLingua model store — thin path/config resolver.
 *
 * transformers.js owns the actual model download (from the HuggingFace Hub into
 * its `cacheDir`). This module only resolves the cache directory, maps config
 * model ids to registry entries, and configures a transformers.js `env` object
 * for either Hub download (default) or a local modelPath override.
 *
 * Deliberately does NOT import the native `@huggingface/transformers` dep — it
 * accepts a minimal structural `env` so the heavy runtime stays out of this path.
 */

import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import {
  DEFAULT_LLMLINGUA_MODEL,
  LLMLINGUA_MODELS,
  type LlmlinguaModelEntry,
} from "./constants.ts";

/** A minimal structural type for the transformers.js `env` object (avoids importing the native dep here). */
export interface TransformersEnvLike {
  cacheDir?: string;
  localModelPath?: string;
  allowRemoteModels?: boolean;
  [key: string]: unknown;
}

/** Base data dir. Mirrors rtk's getDataDir() at engines/rtk/filterLoader.ts. */
function getDataDir(): string {
  return process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
}

/** Resolve (and ensure) the model cache dir: `${DATA_DIR}/models/llmlingua`. Mirrors rtk's getDataDir(). */
export function getLlmlinguaModelCacheDir(): string {
  const dir = path.join(getDataDir(), "models", "llmlingua");
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // Ignore mkdir errors — fail-open philosophy: transformers.js will surface a
    // clearer error if the dir is genuinely unusable, and callers fail-open anyway.
  }
  return dir;
}

/** Resolve a config model id to its registry entry; falls back to the default for unknown/empty ids. */
export function resolveLlmlinguaModel(modelId: string | undefined | null): LlmlinguaModelEntry {
  if (typeof modelId === "string" && modelId.length > 0 && LLMLINGUA_MODELS[modelId]) {
    return LLMLINGUA_MODELS[modelId];
  }
  return LLMLINGUA_MODELS[DEFAULT_LLMLINGUA_MODEL];
}

/** Configure a transformers.js `env` for either Hub download (default) or a local modelPath override. */
export function configureTransformersEnv(
  env: TransformersEnvLike,
  opts: { modelPath?: string }
): void {
  env.cacheDir = getLlmlinguaModelCacheDir();
  if (typeof opts.modelPath === "string" && opts.modelPath.length > 0) {
    env.localModelPath = opts.modelPath;
    env.allowRemoteModels = false;
  } else {
    env.allowRemoteModels = true;
  }
}
