/**
 * Ollama Local RAM Manager — ensures only one model stays loaded in VRAM at a time.
 *
 * Context: on a 24GB Mac, loading a 7B model (~5GB) + a 14B model (~9GB) simultaneously
 * exhausts unified memory and causes severe swapping. Ollama keeps a model resident after
 * a request completes (default keep_alive = 5 minutes). To free RAM before loading the next
 * model, we issue POST /api/generate with keep_alive:0 for the previously-loaded model.
 *
 * Strategy (per combo, default `memory-first`):
 *   1. Track the last model that was dispatched (in-memory, per combo).
 *   2. `memory-first`: unload the previous model BEFORE dispatching the new one
 *      (minimal VRAM footprint — best for 16–24GB boxes).
 *   3. `availability-first`: dispatch the new model WITHOUT unloading the previous one
 *      first, and only unload the previous model after the new request SUCCEEDS.
 *      No unload→load→502 dead-air: if the new model fails, the previous one is still
 *      resident and can serve the next request immediately. Better for big-memory
 *      servers / agent workloads where a single 502 is undesirable.
 *   4. Fire-and-forget the unload (no await) — the new request will naturally load the new model.
 *   5. Override keep_alive on each request to 0 so the model unloads immediately after responding,
 *      keeping RAM free for the next combo target or external workload.
 */

import { sanitizeErrorMessage } from "../utils/error.ts";

const OLLAMA_HOST = process.env.OMNIROUTE_OLLAMA_HOST?.trim() || "http://localhost:11434";
const OLLAMA_UNLOAD_TIMEOUT_MS = 3_000;

export type OllamaUnloadStrategy = "memory-first" | "availability-first";

function stripProviderPrefix(modelStr: string): string {
  if (!modelStr) return modelStr;
  const slash = modelStr.lastIndexOf("/");
  return slash >= 0 ? modelStr.slice(slash + 1) : modelStr;
}

// Track the last model dispatched per "owner" key (combo name or "global").
const lastDispatchedModel = new Map<string, string>();

// Track which models we've recently asked ollama to unload (dedup within 60s).
const recentUnloads = new Map<string, number>();
const UNLOAD_DEDUP_MS = 60_000;

function getOllamaBaseUrl(provider: string): string | null {
  if (provider !== "ollama-local") return null;
  return OLLAMA_HOST.replace(/\/+$/, "");
}

export function trackOllamaModelDispatch(ownerKey: string, model: string, provider: string): void {
  if (provider !== "ollama-local") return;
  lastDispatchedModel.set(ownerKey, model);
}

export function getLastDispatchedOllamaModel(ownerKey: string): string | null {
  return lastDispatchedModel.get(ownerKey) ?? null;
}

/**
 * Unload a specific ollama model from VRAM by sending keep_alive:0.
 * Fire-and-forget — errors are logged but never throw.
 */
export async function unloadOllamaModel(
  model: string,
  provider: string,
  log?: { info?: (cat: string, msg: string) => void; warn?: (cat: string, msg: string) => void }
): Promise<void> {
  const base = getOllamaBaseUrl(provider);
  if (!base || !model) return;

  const rawModel = stripProviderPrefix(model);
  const dedupKey = `${base}:${rawModel}`;
  const now = Date.now();
  const lastSeen = recentUnloads.get(dedupKey);
  if (lastSeen && now - lastSeen < UNLOAD_DEDUP_MS) return;
  recentUnloads.set(dedupKey, now);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), OLLAMA_UNLOAD_TIMEOUT_MS);
    const res = await fetch(`${base}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: rawModel, keep_alive: 0 }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      log?.warn?.("OLLAMA", `Unload ${rawModel} returned ${res.status}`);
      return;
    }
    log?.info?.("OLLAMA", `Unloaded model ${rawModel} from VRAM (keep_alive=0)`);
  } catch (error) {
    if ((error as Error)?.name === "AbortError") return;
    log?.warn?.("OLLAMA", `Unload ${rawModel} failed: ${sanitizeErrorMessage(error)}`);
  }
}

/**
 * Pre-attempt hook: called before dispatching a new ollama model.
 * Under `memory-first` (default): if the previous model (per combo) is different,
 * unload it first to free VRAM. Under `availability-first`: do nothing — the new
 * model loads alongside the previous one, and the previous is unloaded only after
 * the new request succeeds (see settleOllamaModelAfterSuccess).
 */
export async function maybeUnloadPreviousOllamaModel(
  ownerKey: string,
  newModel: string,
  provider: string,
  log?: { info?: (cat: string, msg: string) => void; warn?: (cat: string, msg: string) => void },
  strategy: OllamaUnloadStrategy = "memory-first"
): Promise<void> {
  if (provider !== "ollama-local") return;
  if (strategy !== "memory-first") return;
  const previous = getLastDispatchedOllamaModel(ownerKey);
  if (!previous || previous === newModel) return;
  await unloadOllamaModel(previous, "ollama-local", log);
}

/**
 * Post-success hook: called after an ollama model request SUCCEEDS.
 * Under `availability-first`: the previous model was left resident while the new
 * one loaded (so a failure never leaves the pool cold). Now that the new model has
 * proven itself, unload the previous one to reclaim VRAM. Under `memory-first` this
 * is a no-op — the previous model was already unloaded pre-dispatch.
 */
export async function settleOllamaModelAfterSuccess(
  ownerKey: string,
  succeededModel: string,
  provider: string,
  log?: { info?: (cat: string, msg: string) => void; warn?: (cat: string, msg: string) => void },
  strategy: OllamaUnloadStrategy = "memory-first"
): Promise<void> {
  if (provider !== "ollama-local") return;
  if (strategy !== "availability-first") return;
  const previous = getLastDispatchedOllamaModel(ownerKey);
  if (!previous || previous === succeededModel) return;
  await unloadOllamaModel(previous, "ollama-local", log);
}

// Periodic cleanup of the unload dedup map to prevent unbounded growth.
const MAX_UNLOAD_ENTRIES = 500;
if ((recentUnloads as Map<string, number>).size > MAX_UNLOAD_ENTRIES) {
  for (const key of Array.from(recentUnloads.keys()).slice(0, MAX_UNLOAD_ENTRIES / 2)) {
    recentUnloads.delete(key);
  }
}
