/**
 * LLMLingua-2 worker-thread backend (production path).
 *
 * Real MobileBERT/BERT ONNX inference via `@atjsh/llmlingua-2` running in a
 * `worker_threads.Worker` (`./onnxWorker.ts`). The backend stays STRICTLY
 * fail-open: any failure to resolve deps, spawn the worker, load the model, or
 * classify tokens returns the ORIGINAL text unchanged — never throws to the caller.
 *
 * ## Fail-open paths
 *  1. Optional-deps gate: if any of `@atjsh/llmlingua-2`, `@huggingface/transformers`,
 *     `@tensorflow/tfjs`, `js-tiktoken` does not resolve, return `text` immediately —
 *     NO worker spawn. This is the default in CI / most installs (deps are OPTIONAL).
 *  2. Per-call timeout: first call for a model gets `FIRST_CALL_TIMEOUT_MS` (one-time
 *     model load); warm calls get `LLMLINGUA_WORKER_TIMEOUT_MS`. On timeout → original
 *     text (the worker keeps loading and will warm for the next call).
 *  3. Worker error/exit → resolve all pending with their original text + respawn next.
 *
 * ## Serialization
 *  ONNX/tfjs are not reentrant — calls are queued FIFO and only one message is
 *  in-flight at a time (the next is posted after the previous reply or its timeout).
 *
 * ## Idle eviction
 *  After `LLMLINGUA_WORKER_IDLE_MS` with no calls, the worker is terminated and the
 *  singleton reset (next call respawns). The idle timer is `unref`'d so it never keeps
 *  the process alive.
 *
 * Code blocks NEVER reach this backend — the engine (index.ts) tombstones preserved
 * constructs first; this backend sees prose-only segments.
 *
 * VPS validation (Hard Rule #18): the real model is exercised behind RUN_LLMLINGUA_INT.
 */

import { Worker } from "node:worker_threads";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

import {
  LLMLINGUA_WORKER_TIMEOUT_MS,
  LLMLINGUA_WORKER_IDLE_MS,
} from "./constants.ts";
import { resolveLlmlinguaModel } from "./modelStore.ts";
import type { LlmlinguaBackend } from "./index.ts";

/** One-time model-load budget on the first call for a given model (tinybert ~2s, bert-base ~27s). */
const FIRST_CALL_TIMEOUT_MS = 60000;

/** The four optional peer deps the real backend needs. */
const REQUIRED_DEPS = [
  "@atjsh/llmlingua-2",
  "@huggingface/transformers",
  "@tensorflow/tfjs",
  "js-tiktoken",
] as const;

// ─── optional-deps gate (memoized) ──────────────────────────────────────────────

let _depsAvailable: boolean | null = null;

/** Lazily (and once) check whether all four optional deps resolve. */
function depsAvailable(): boolean {
  if (_depsAvailable !== null) return _depsAvailable;
  try {
    const require = createRequire(import.meta.url);
    for (const dep of REQUIRED_DEPS) {
      require.resolve(dep);
    }
    _depsAvailable = true;
  } catch {
    _depsAvailable = false;
  }
  return _depsAvailable;
}

// ─── worker reply / queue plumbing ──────────────────────────────────────────────

interface WorkerReply {
  id: number;
  ok: boolean;
  text: string;
}

interface PendingEntry {
  resolve: (s: string) => void;
  timer: NodeJS.Timeout;
  /** Stored so error/exit/reset handlers can fail-open with the ORIGINAL text. */
  originalText: string;
  /** Resolved model id — used to mark the model warm ONLY on a genuine success. */
  modelKey: string;
}

interface QueueItem {
  text: string;
  opts: Parameters<LlmlinguaBackend>[1];
  resolve: (s: string) => void;
}

let worker: Worker | null = null;
let nextId = 1;
const pending = new Map<number, PendingEntry>();
const queue: QueueItem[] = [];
let busy = false;
/** Model keys (resolved `id`) that have completed at least one successful load. */
const warmedModels = new Set<string>();
let idleTimer: NodeJS.Timeout | null = null;

/**
 * Resolve the worker entry file across dev and prod.
 *
 * Dev: `onnxWorker.ts` sits next to this file and runs via the tsx loader.
 *
 * Prod: this module is collapsed into a `.next` chunk and the worker is esbuild'd to
 * `<appRoot>/open-sse/services/compression/engines/llmlingua/onnxWorker.js`
 * (scripts/build/prepublish.ts) + kept by the pack-artifact allowlist. The process
 * `cwd` is NOT the app root (pm2 starts it from `/root`), so cwd-relative resolution
 * is unreliable — we instead WALK UP from this module's location (`import.meta.url`,
 * which in the standalone bundle is a real `<appRoot>/.next/...` path) until we find
 * an ancestor that actually contains the worker at its known relative path. cwd
 * candidates remain as a last-resort fallback. First existing candidate wins; a `.ts`
 * choice gets the tsx loader, a `.js` choice runs natively.
 */
function resolveWorkerFile(): { workerFile: string; execArgv: string[] } {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const rel = path.join(
    "open-sse",
    "services",
    "compression",
    "engines",
    "llmlingua",
    "onnxWorker.js"
  );

  // 1. Dev: sibling source/compiled file next to this module.
  const devTs = path.join(moduleDir, "onnxWorker.ts");
  if (fs.existsSync(devTs)) return { workerFile: devTs, execArgv: ["--import", "tsx/esm"] };
  const devJs = path.join(moduleDir, "onnxWorker.js");
  if (fs.existsSync(devJs)) return { workerFile: devJs, execArgv: [] };

  // 2. Prod: walk up from the bundled module location, then cwd, looking for the
  //    esbuild'd worker at <root>/open-sse/.../onnxWorker.js.
  const roots: string[] = [];
  let dir = moduleDir;
  for (let i = 0; i < 12; i++) {
    roots.push(dir);
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  roots.push(process.cwd(), path.join(process.cwd(), "app"));
  for (const root of roots) {
    const candidate = path.join(root, rel);
    if (fs.existsSync(candidate)) return { workerFile: candidate, execArgv: [] };
  }

  // 3. Nothing found — return the sibling .js path; the spawn will fail-open.
  return { workerFile: devJs, execArgv: [] };
}

/** Reset the idle eviction timer; terminates the worker after the idle window. */
function bumpIdleTimer(): void {
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    resetWorker();
  }, LLMLINGUA_WORKER_IDLE_MS);
  // Never keep the process alive just for idle eviction.
  if (typeof idleTimer.unref === "function") idleTimer.unref();
}

/** Tear down the worker + all runtime state (fail-open any pending). Next call respawns. */
function resetWorker(): void {
  const w = worker;
  worker = null;
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
  // Fail-open every in-flight call with its ORIGINAL text.
  for (const [, entry] of pending) {
    clearTimeout(entry.timer);
    entry.resolve(entry.originalText);
  }
  pending.clear();
  busy = false;
  warmedModels.clear();
  if (w) {
    try {
      void w.terminate();
    } catch {
      // ignore terminate errors
    }
  }
}

/** Spawn the singleton worker and wire its message/error/exit handlers. */
function ensureWorker(): Worker {
  if (worker) return worker;

  const { workerFile, execArgv } = resolveWorkerFile();
  const w = new Worker(workerFile, { execArgv });

  w.on("message", (reply: WorkerReply) => {
    const entry = pending.get(reply.id);
    if (entry) {
      clearTimeout(entry.timer);
      pending.delete(reply.id);
      // Only a genuine success warms the model so later calls use the short timeout.
      // A timeout/error/fail-open MUST NOT warm it (else a still-loading model would
      // be starved of its one-time load budget on the next call).
      if (reply.ok) warmedModels.add(entry.modelKey);
      // ok:false already carries the ORIGINAL text → resolving with it IS fail-open.
      entry.resolve(reply.text);
    }
    busy = false;
    pump();
  });

  const failOpenAndRespawn = () => {
    // Resolve every pending entry fail-open, then drop the worker so the next call respawns.
    failAllPending();
    if (worker === w) worker = null;
    busy = false;
  };

  w.on("error", failOpenAndRespawn);
  w.on("exit", failOpenAndRespawn);

  worker = w;
  return w;
}

/** Resolve all pending entries with their stored fail-open value (original text). */
function failAllPending(): void {
  for (const [id, entry] of pending) {
    clearTimeout(entry.timer);
    pending.delete(id);
    entry.resolve(entry.originalText);
  }
}

/** Post the next queued item to the worker (one in-flight at a time). */
function pump(): void {
  if (busy) return;
  const item = queue.shift();
  if (!item) return;

  busy = true;
  bumpIdleTimer();

  let w: Worker;
  try {
    w = ensureWorker();
  } catch {
    // Spawn failed → fail-open this item and continue draining the queue.
    busy = false;
    item.resolve(item.text);
    pump();
    return;
  }

  const id = nextId++;
  const modelKey = resolveLlmlinguaModel(item.opts?.model).id;
  const warm = warmedModels.has(modelKey);
  const timeoutMs = warm ? LLMLINGUA_WORKER_TIMEOUT_MS : FIRST_CALL_TIMEOUT_MS;

  const timer = setTimeout(() => {
    // Timeout → fail-open with the ORIGINAL text; drop the pending entry but keep the
    // worker (it may still be loading the model and will warm for the next call).
    const entry = pending.get(id);
    if (entry) {
      pending.delete(id);
      entry.resolve(item.text);
    }
    busy = false;
    pump();
  }, timeoutMs);
  if (typeof timer.unref === "function") timer.unref();

  pending.set(id, {
    // Warming is decided by the reply handler (success only) — not here, so a
    // timeout/error fail-open never marks the model warm.
    resolve: item.resolve,
    timer,
    originalText: item.text,
    modelKey,
  });

  try {
    w.postMessage({
      id,
      text: item.text,
      model: item.opts?.model,
      compressionRate: item.opts?.compressionRate,
      modelPath: item.opts?.modelPath,
    });
  } catch {
    // postMessage failed → fail-open this item and respawn.
    clearTimeout(timer);
    pending.delete(id);
    item.resolve(item.text);
    if (worker === w) worker = null;
    busy = false;
    pump();
  }
}

// ─── public backend ─────────────────────────────────────────────────────────────

/**
 * Production worker backend. Two-arg `LlmlinguaBackend` (text, opts).
 *
 * Returns the compressed prose on success; the ORIGINAL `text` on any failure
 * (missing deps, spawn error, model-load/inference error, timeout). NEVER throws.
 */
export const workerBackend: LlmlinguaBackend = async (text, opts) => {
  // Fail-open WITHOUT spawning when the optional deps are not installed (the common case).
  if (!depsAvailable()) {
    return text;
  }

  return new Promise<string>((resolve) => {
    queue.push({ text, opts, resolve });
    pump();
  });
};

// ─── test-only reset ────────────────────────────────────────────────────────────

/**
 * Internal: terminate the worker (if any) and reset all module state so the
 * process can exit cleanly after tests. Not part of the public contract.
 */
export function __resetLlmlinguaWorkerForTests(): void {
  // Drain the queue fail-open so no callers hang.
  while (queue.length) {
    const item = queue.shift()!;
    item.resolve(item.text);
  }
  resetWorker();
  _depsAvailable = null;
  nextId = 1;
}
