// Strip request params a given provider/model rejects upstream (e.g. HTTP 400).
// Config-driven: add a rule here instead of scattering `delete body.x` across
// executors. Port from 9router#7ae9fff6 (fixes upstream #1748).
//
// Rule semantics:
//   - `provider` (optional) limits the rule to a single provider id.
//   - `match` is a RegExp tested against the model id OR a predicate (model -> boolean).
//   - `drop` is the list of param keys to remove when the rule fires.
//
// A param is removed only when it is present (!== undefined). The helper never
// introduces new keys and never throws on null/undefined bodies — call sites
// can chain it without extra guards.

import { getParamFilterConfig } from "@/lib/db/paramFilters";

type StripRule = {
  provider?: string;
  match: RegExp | ((model: string) => boolean);
  drop: string[];
};

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
];

function matches(rule: StripRule, model: string): boolean {
  return typeof rule.match === "function" ? rule.match(model) : rule.match.test(model);
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
    for (const key of rule.drop) {
      if (rec[key] !== undefined) delete rec[key];
    }
  }

  // Phase 2: Config-driven rules from DB
  applyConfigFilters(provider, model, rec, snapshot);

  return body;
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

  // 1. Provider-level denylist
  for (const key of config.block) {
    delete body[key];
  }

  // 2. Provider-level allowlist — restore from snapshot if key existed in original
  //    Runs BEFORE model-level operations so model settings can override provider.
  if (config.allow.length > 0) {
    for (const key of config.allow) {
      if (key in snapshot) {
        body[key] = snapshot[key];
      }
    }
  }

  // 3. Model-level denylist — overrides provider-level allowlist
  const modelCfg = config.models?.[model ?? ""];
  if (modelCfg?.block) {
    for (const key of modelCfg.block) {
      delete body[key];
    }
  }

  // 4. Model-level allowlist — final pass, most specific wins
  if (modelCfg?.allow) {
    for (const key of modelCfg.allow) {
      if (key in snapshot) {
        body[key] = snapshot[key];
      }
    }
  }
}

// Exported for unit tests only — do not import from production code.
export const __STRIP_RULES_FOR_TEST: ReadonlyArray<StripRule> = STRIP_RULES;
