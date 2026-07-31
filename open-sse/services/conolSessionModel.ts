/**
 * Conol session model/effort configuration.
 *
 * `POST /api/sessions` ignores `agentModel`/`agentEffort` in its body — a freshly
 * created session always starts on the account default and Conol reports the
 * downgrade via `modelDowngraded` / `effectiveModel`. The web client therefore
 * configures the session out-of-band against `POST /api/sessions/{id}/model`,
 * which accepts three distinct payload shapes (verified 2026-07-30):
 *
 *   1. `{"modelPreset":"pro","hasImageHistory":false}`  — picker preset
 *   2. `{"agentModel":"claude-fable-5","agentEffort":null}` — pin an explicit model
 *   3. `{"agentEffort":"xhigh"}`                        — pin the effort
 *
 * Shape 2 resets `agentEffort` to `null`, so the effort call must always follow
 * the model call. All three return `{"ok":true}`.
 */
import {
  clampConolEffort,
  conolEffortsForModel,
  type ConolEffort,
  type ConolModel,
} from "./conolModels.ts";

export const CONOL_ORIGIN = "https://conol.ai";

/** Preset the web client sends on every new session before pinning a model. */
export const CONOL_DEFAULT_MODEL_PRESET = "pro";

export type ConolModelPresetId = "flash" | "moderate" | "pro" | "ultra";

const KNOWN_PRESETS = new Set<ConolModelPresetId>(["flash", "moderate", "pro", "ultra"]);

export function isConolModelPreset(value: string): value is ConolModelPresetId {
  return KNOWN_PRESETS.has(value as ConolModelPresetId);
}

export interface ConolSessionModelPlan {
  /** Preset priming call, sent once per session. */
  preset: { modelPreset: string; hasImageHistory: boolean };
  /** Explicit model pin. Always clears effort so the effort call can apply cleanly. */
  model: { agentModel: string; agentEffort: null };
  /** Effort pin, omitted when the model exposes no effort ladder. */
  effort: { agentEffort: ConolEffort } | null;
}

export interface BuildConolSessionModelPlanOptions {
  model: string;
  effort: ConolEffort;
  hasImageHistory: boolean;
  /** Discovery catalog, when available, so effort ladders stay accurate. */
  catalog?: readonly ConolModel[];
  /** Overrides the default `pro` priming preset. */
  modelPreset?: string;
}

/**
 * Build the ordered preset → model → effort payloads for a session.
 * Effort is clamped onto the ladder the target model actually advertises, so a
 * default of `xhigh` degrades to `high` on models such as `claude-sonnet-5`.
 */
export function buildConolSessionModelPlan(
  options: BuildConolSessionModelPlanOptions
): ConolSessionModelPlan {
  const supported = conolEffortsForModel(options.model, options.catalog);
  const effort = clampConolEffort(options.effort, supported);
  return {
    preset: {
      modelPreset: options.modelPreset || CONOL_DEFAULT_MODEL_PRESET,
      hasImageHistory: options.hasImageHistory,
    },
    model: { agentModel: options.model, agentEffort: null },
    effort: effort ? { agentEffort: effort } : null,
  };
}

export function conolSessionModelUrl(sessionId: string): string {
  return `${CONOL_ORIGIN}/api/sessions/${encodeURIComponent(sessionId)}/model`;
}

export interface ApplyConolSessionModelOptions {
  sessionId: string;
  plan: ConolSessionModelPlan;
  /** Skip the preset priming call when the session was already primed. */
  skipPreset?: boolean;
  buildHeaders: (sessionId: string) => Record<string, string>;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal | null;
  onWarning?: (message: string) => void;
}

export interface AppliedConolSessionModel {
  presetApplied: boolean;
  modelApplied: boolean;
  effortApplied: ConolEffort | null;
}

async function postSessionModel(
  url: string,
  body: unknown,
  options: ApplyConolSessionModelOptions
): Promise<boolean> {
  const response = await (options.fetchImpl ?? fetch)(url, {
    method: "POST",
    headers: { ...options.buildHeaders(options.sessionId), "content-type": "application/json" },
    body: JSON.stringify(body),
    signal: options.signal ?? undefined,
  });
  // Drain so the socket can be reused; the payload is only `{"ok":true}`.
  await response.body?.cancel().catch(() => undefined);
  if (!response.ok) {
    options.onWarning?.(
      `Conol session model update failed (HTTP ${response.status}) for ${JSON.stringify(body)}`
    );
    return false;
  }
  return true;
}

/**
 * Apply preset → model → effort in order. Ordering is load-bearing: the model
 * call nulls the effort, so applying effort first would silently drop it.
 * Failures are reported but non-fatal — the turn still runs on Conol's default.
 */
export async function applyConolSessionModel(
  options: ApplyConolSessionModelOptions
): Promise<AppliedConolSessionModel> {
  const url = conolSessionModelUrl(options.sessionId);
  const applied: AppliedConolSessionModel = {
    presetApplied: false,
    modelApplied: false,
    effortApplied: null,
  };

  if (!options.skipPreset) {
    applied.presetApplied = await postSessionModel(url, options.plan.preset, options);
  }

  applied.modelApplied = await postSessionModel(url, options.plan.model, options);

  // Only pin effort if the model pin landed; otherwise the session is on an
  // unknown model whose effort ladder we cannot reason about.
  if (applied.modelApplied && options.plan.effort) {
    const ok = await postSessionModel(url, options.plan.effort, options);
    if (ok) applied.effortApplied = options.plan.effort.agentEffort;
  }

  return applied;
}
