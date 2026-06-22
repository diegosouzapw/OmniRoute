/**
 * LLMLingua-2 entry point for the `ultra` mode (Phase 4, Sub-project B).
 *
 * A THIN wrapper over the existing worker backend (`./worker.ts`) — no new ONNX
 * integration. It adds exactly what the `ultra` two-tier resolver needs:
 *   - `slmAvailable()` — cached, NON-BLOCKING probe (reuses the worker's memoized
 *     optional-deps gate). It NEVER loads a model; an actual load happens lazily
 *     inside the worker under its first-call timeout.
 *   - `runLlmlinguaUltra(text, opts)` — compress ONE prose string. Throws when the
 *     backend fail-opens to the original text (no-op), so the ultra resolver can
 *     fall through to the Tier-A heuristic and record "heuristic-fallback".
 *   - `prewarmLlmlinguaUltra()` — best-effort warm call (errors swallowed).
 *
 * The structure-preservation split (code/math/URLs never reach the model) is done
 * by the CALLER (`ultra.ts`), exactly as the heuristic path already does — this
 * entry only sees prose.
 */

import { workerBackend, depsAvailable } from "./worker.ts";
import { DEFAULT_LLMLINGUA_MODEL } from "./constants.ts";

/** Cached probe result. null = not probed yet. */
let _slmAvailable: boolean | null = null;

// ─── test-only injectable hooks ─────────────────────────────────────────────
interface UltraSlmTestHooks {
  available?: boolean;
  run?: (text: string, opts?: UltraSlmOptions) => Promise<string>;
}
let _testHooks: UltraSlmTestHooks | null = null;

/** Test-only: override availability + the per-prose run, to avoid loading a real model. */
export function __setUltraSlmTestHooks(hooks: UltraSlmTestHooks): void {
  _testHooks = hooks;
}

/**
 * Cheap, cached, non-blocking probe: are the optional SLM deps installed?
 * Reuses the worker's memoized `depsAvailable()` (a filesystem manifest check),
 * so it never spawns a worker or loads a model.
 */
export function slmAvailable(): boolean {
  if (_testHooks && typeof _testHooks.available === "boolean") return _testHooks.available;
  if (_slmAvailable !== null) return _slmAvailable;
  _slmAvailable = depsAvailable();
  return _slmAvailable;
}

/** Options the ultra SLM tier threads to the worker backend. */
export interface UltraSlmOptions {
  model?: string;
  compressionRate?: number;
  modelPath?: string;
}

/**
 * Compress ONE prose string via the SLM worker backend.
 *
 * The worker backend is strictly fail-open: on missing deps / spawn error /
 * model-load or inference error / per-call timeout it returns the ORIGINAL text.
 * We treat a returned no-op (output not shorter than input) as a FAILURE and
 * throw, so the ultra resolver falls back to Tier-A and records the fallback.
 */
export async function runLlmlinguaUltra(text: string, opts?: UltraSlmOptions): Promise<string> {
  if (_testHooks?.run) {
    const out = await _testHooks.run(text, opts);
    if (typeof out !== "string" || out.length >= text.length) {
      throw new Error("llmlingua-ultra: backend produced no gain");
    }
    return out;
  }
  const out = await workerBackend(text, {
    model: opts?.model,
    compressionRate: opts?.compressionRate,
    modelPath: opts?.modelPath,
  });
  if (typeof out !== "string" || out.length >= text.length) {
    // Fail-open / no-op from the worker → let the caller fall back to heuristic.
    throw new Error("llmlingua-ultra: backend produced no gain");
  }
  return out;
}

/**
 * Best-effort pre-warm: ask the worker to load the model once on a short prose
 * sample. NEVER throws — any failure is swallowed (the lazy first-call path still
 * applies on the next real request). Returns true if a warm call was attempted.
 */
export async function prewarmLlmlinguaUltra(opts?: UltraSlmOptions): Promise<boolean> {
  if (!slmAvailable()) return false;
  try {
    // A small but non-trivial sample so the worker triggers a real model load.
    await workerBackend(
      "The quick brown fox jumps over the lazy dog while the sun sets behind the hills.",
      { model: opts?.model ?? DEFAULT_LLMLINGUA_MODEL, compressionRate: opts?.compressionRate }
    );
  } catch {
    // swallow — pre-warm is best-effort
  }
  return true;
}

/** Test-only: reset the cached probe + injected hooks. */
export function __resetUltraEntryForTests(): void {
  _slmAvailable = null;
  _testHooks = null;
}
