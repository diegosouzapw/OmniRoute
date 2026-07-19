// Strip request params a given provider/model rejects upstream (e.g. HTTP 400).
// Config-driven: add a rule here instead of scattering `delete body.x` across
// executors. Port from 9router#7ae9fff6 (fixes upstream #1748).
//
// Rule semantics:
//   - `provider` (optional) limits the rule to a single provider id.
//   - `match` is a RegExp tested against the model id OR a predicate (model -> boolean).
//   - `drop` is the list of param keys to remove when the rule fires.
//   - `clampToModelMaxOutput` clamps max_tokens/max_completion_tokens/max_output_tokens
//     down to the model's catalog `maxOutputTokens` ceiling, when one is set.
//   - `maxOutputCap` clamps the same keys down to a fixed endpoint-imposed ceiling
//     (independent of the model's own advertised ceiling). When both are present on
//     the same rule, the lower of the two wins.
//
// A param is removed only when it is present (!== undefined). The helper never
// introduces new keys and never throws on null/undefined bodies — call sites
// can chain it without extra guards.

import { getParamFilterConfig, ModelParamFilter, ProviderParamFilter } from "@/lib/db/paramFilters";
import { getProviderModel } from "../config/providerModels.ts";

type StripRule = {
  provider?: string;
  match: RegExp | ((model: string) => boolean);
  drop?: string[];
  clampToModelMaxOutput?: boolean;
  maxOutputCap?: number;
};

const MAX_OUTPUT_TOKEN_KEYS = ["max_tokens", "max_completion_tokens", "max_output_tokens"] as const;

const STRIP_RULES: StripRule[] = [
  // claude-opus-4 series: temperature is deprecated (Anthropic returns 400). #1748
  { match: /claude-opus-4/i, drop: ["temperature"] },
  // GitHub Copilot gpt-5.4: temperature unsupported.
  { provider: "github", match: /gpt-5\.4/i, drop: ["temperature"] },
  // GitHub Copilot Claude (except opus/sonnet 4.6): thinking + reasoning_effort rejected. #713
  {
    provider: "github",
    match: (m: string) => /claude/i.test(m) && !/claude.*(opus|sonnet).*4\.6/i.test(m),
    drop: ["thinking", "reasoning_effort"],
  },
  // NVIDIA NIM z-ai/glm-5.2: OpenAI-compatible wrapper rejects BOTH the `reasoning`
  // body field (#6102) and the Claude-style `thinking` field. A Claude-format
  // client (e.g. Claude Code) routed here leaves a `thinking:{type:"adaptive"}`
  // that the wrapper 400s on — same class already handled for minimax-m2.7 below.
  // 9router#2023.
  { provider: "nvidia", match: /z-ai\/glm-5\.2\b/i, drop: ["reasoning", "thinking"] },
  // NVIDIA NIM minimaxai/minimax-m2.7: NVIDIA's OpenAI-compatible wrapper
  // (format:"openai") does not accept the Claude-style `thinking` body field
  // and returns 400 "Unsupported parameter(s): thinking". Upstream #2268.
  { provider: "nvidia", match: /minimax-m2\.7/i, drop: ["thinking"] },
  // NVIDIA NIM: OpenAI-compatible wrapper 400s on `prompt_cache_key` (Codex CLI
  // injects it natively for its own prompt caching). NIM has no documented
  // support for this field (providerSupportsCaching already treats nvidia as
  // non-cache-capable) — safe to drop provider-wide, not model-specific. #7617.
  { provider: "nvidia", match: /.*/, drop: ["prompt_cache_key"] },
  // VolcEngine Ark caps the Kimi coding-plan endpoint at max_tokens <= 32768
  // server-side ("integer above maximum value, expected a value <= 32768"),
  // independent of the model's own catalog ceiling. Confirmed against two
  // independent live-endpoint reports hitting the same Ark endpoint for both
  // kimi-k2.5 and kimi-k2.7-code (NousResearch/hermes-agent#51773,
  // MoonshotAI/kimi-cli#1124), and by upstream decolua/9router#2460. Scoped to
  // OmniRoute's actual volcengine Kimi id (not a broad /kimi/i regex) so it
  // never clamps an unrelated future Kimi listing whose Ark cap may differ.
  { provider: "volcengine", match: /^kimi-k2-5-260127$/, maxOutputCap: 32768, clampToModelMaxOutput: true },
  // #7364: Z.AI's glm-4.6v vision endpoint enforces a 32768 max_tokens ceiling
  // server-side and 400s when a client sends a larger explicit max_tokens (e.g. a
  // client defaulting to 65536). Scoped to both wire paths that can reach this
  // model: "zai" (DefaultExecutor, Claude format by default — glm-4.6v is only
  // reachable there as a custom model attached to the connection, so it is NOT in
  // PROVIDER_MODELS["zai"] and clampToModelMaxOutput would find no catalog ceiling
  // to clamp against, hence the fixed maxOutputCap) and "glm" (GlmExecutor, OpenAI
  // format — glm-4.6v IS in the registry catalog there, `GLM_SHARED_MODELS` in
  // glmProvider.ts, maxOutputTokens: 32768, so clampToModelMaxOutput suffices).
  { provider: "zai", match: /^glm-4\.6v$/i, maxOutputCap: 32768 },
  { provider: "glm", match: /^glm-4\.6v$/i, clampToModelMaxOutput: true },
];

function matches(rule: StripRule, model: string): boolean {
  return typeof rule.match === "function" ? rule.match(model) : rule.match.test(model);
}

/**
 * When a rule requests it, clamp the max-output-token family of params down to
 * the lowest applicable ceiling: the model's own catalog `maxOutputTokens`
 * (`clampToModelMaxOutput`) and/or a fixed endpoint cap (`maxOutputCap`). Only
 * clamps keys that are present and numeric; never introduces a new key.
 */
function applyMaxOutputClamp(
  rule: StripRule,
  provider: string | null | undefined,
  model: string,
  body: Record<string, unknown>
): void {
  if (!rule.clampToModelMaxOutput && !Number.isFinite(rule.maxOutputCap)) return;

  const candidates: number[] = [];
  if (rule.clampToModelMaxOutput) {
    const modelCeiling = getProviderModel(provider ?? "", model)?.maxOutputTokens;
    if (Number.isFinite(modelCeiling) && (modelCeiling as number) > 0) {
      candidates.push(modelCeiling as number);
    }
  }
  if (Number.isFinite(rule.maxOutputCap) && (rule.maxOutputCap as number) > 0) {
    candidates.push(rule.maxOutputCap as number);
  }
  if (candidates.length === 0) return;

  const ceiling = Math.min(...candidates);
  for (const key of MAX_OUTPUT_TOKEN_KEYS) {
    const value = body[key];
    if (typeof value === "number" && Number.isFinite(value) && value > ceiling) {
      body[key] = ceiling;
    }
  }
}

/**
 * Remove unsupported params from `body` in place. Returns the same reference
 * (or `body` unchanged when it is not a plain object / model is empty).
 */
export function stripUnsupportedParams<T>(
  provider: string | null | undefined,
  model: string | null | undefined,
  body: T
): T {
  if (!model || !body || typeof body !== "object") return body;
  const rec = body as unknown as Record<string, unknown>;
  // Snapshot the original body before any mutations so the allowlist can
  // restore params that were stripped by hardcoded or config-driven denylist.
  const snapshot = { ...rec };

  // Phase 1: Hardcoded rules (unchanged)
  for (const rule of STRIP_RULES) {
    if (rule.provider && rule.provider !== provider) continue;
    if (!matches(rule, model)) continue;
    for (const key of rule.drop ?? []) {
      if (rec[key] !== undefined) delete rec[key];
    }
    applyMaxOutputClamp(rule, provider, model, rec);
  }

  // Phase 2: Config-driven rules from DB
  applyConfigFilters(provider, model, rec, snapshot);

  return body;
}

/**
 * Restore keys from `snapshot` into `body` for every key listed in `allow`,
 * but only when the key was present in the original request. Shared by the
 * provider-level and model-level allowlist passes below.
 */
function restoreAllowedKeys(
  body: Record<string, unknown>,
  snapshot: Record<string, unknown>,
  allow: readonly string[]
): void {
  for (const key of allow) {
    if (key in snapshot) {
      body[key] = snapshot[key];
    }
  }
}

/**
 * Apply the provider-level denylist, then restore the provider-level
 * allowlist from `snapshot`. Runs BEFORE model-level operations so
 * model-level settings can override provider-level ones.
 */
function applyProviderLevelFilters(
  body: Record<string, unknown>,
  snapshot: Record<string, unknown>,
  config: ProviderParamFilter
): void {
  for (const key of config.block) {
    delete body[key];
  }
  if (config.allow.length > 0) {
    restoreAllowedKeys(body, snapshot, config.allow);
  }
}

/**
 * Apply the model-level denylist (overrides the provider-level allowlist),
 * then restore the model-level allowlist from `snapshot` (final pass, most
 * specific wins).
 */
function applyModelLevelFilters(
  body: Record<string, unknown>,
  snapshot: Record<string, unknown>,
  modelCfg: ModelParamFilter | undefined
): void {
  if (modelCfg?.block) {
    for (const key of modelCfg.block) {
      delete body[key];
    }
  }
  if (modelCfg?.allow) {
    restoreAllowedKeys(body, snapshot, modelCfg.allow);
  }
}

/**
 * Apply config-driven denylist + allowlist rules from the DB-backed
 * ProviderParamFilter store. Order of operations:
 *   1. Provider-level denylist
 *   2. Model-level denylist
 *   3. Provider-level allowlist (restores from snapshot)
 *   4. Model-level allowlist (restores from snapshot)
 *
 * The allowlist only restores keys that were present in the original request
 * (the snapshot). It never introduces new params the client didn't send.
 */
export function applyConfigFilters(
  provider: string | null | undefined,
  model: string | null | undefined,
  body: Record<string, unknown>,
  snapshot: Record<string, unknown>
): void {
  if (!provider || !body) return;
  const config = getParamFilterConfig(provider);
  if (!config) return;

  applyProviderLevelFilters(body, snapshot, config);

  const modelCfg = config.models?.[model ?? ""];
  applyModelLevelFilters(body, snapshot, modelCfg);
}

// Exported for unit tests only — do not import from production code.
export const __STRIP_RULES_FOR_TEST: ReadonlyArray<StripRule> = STRIP_RULES;
