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
    match: (m: string) =>
      /claude/i.test(m) && !/claude.*(opus|sonnet).*4\.6/i.test(m),
    drop: ["thinking", "reasoning_effort"],
  },
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
  for (const rule of STRIP_RULES) {
    if (rule.provider && rule.provider !== provider) continue;
    if (!matches(rule, model)) continue;
    for (const key of rule.drop) {
      if (rec[key] !== undefined) delete rec[key];
    }
  }
  return body;
}

// Exported for unit tests only — do not import from production code.
export const __STRIP_RULES_FOR_TEST: ReadonlyArray<StripRule> = STRIP_RULES;
