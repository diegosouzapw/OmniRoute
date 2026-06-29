/**
 * toolStackMaturity.ts — Provider model maturity registry (#3932).
 *
 * Operators picking a model from a 200+ row catalog have no way to know
 * which provider+model pairs are well-tested vs. experimental. The
 * `X-ToolStack-Maturity` response header exposes this on every request so
 * a dashboard can plot "how often did we shed requests on a beta model
 * under load" without a separate query.
 *
 * Maturity levels:
 *   - "stable"        — GA for at least 30 days, no open P0/P1 issues
 *   - "beta"          — released but flagged as beta by the upstream or
 *                       our own infra; latency is acceptable but correctness
 *                       may regress
 *   - "experimental"  — pre-GA or open P0 issue; operators should expect
 *                       failures and high latency
 *   - "unmaintained"  — last successful refresh > 14 days, or model has
 *                       been deprecated by the upstream
 *
 * The registry is intentionally static. New entries land in
 * docs/adr/0033-toolstack-maturity.md. Operators can override an entry
 * at runtime via env var:
 *   OMNIROUTE_MATURITY_<PROVIDER>_<MODEL> = <level>
 * (uppercase, dashes collapsed to underscores). The env override is
 * checked first, so an operator can force "unmaintained" on a model
 * that the registry missed.
 */

export type MaturityLevel = "stable" | "beta" | "experimental" | "unmaintained";

const VALID_LEVELS: ReadonlySet<MaturityLevel> = new Set([
  "stable",
  "beta",
  "experimental",
  "unmaintained",
]);

/**
 * Default maturity registry. Conservative defaults: everything we ship
 * out of the box is at least "beta" until proven. Operators promote
 * models to "stable" as they accumulate runtime data.
 *
 * Format: "provider/model" → maturity.
 */
const REGISTRY: Record<string, MaturityLevel> = {
  // Stable: production traffic for > 30 days, no P0/P1 issues open.
  "openai/gpt-4o": "stable",
  "openai/gpt-4o-mini": "stable",
  "openai/gpt-4.1": "stable",
  "openai/gpt-4.1-mini": "stable",
  "openai/o3": "stable",
  "openai/o3-mini": "stable",
  "openai/o4-mini": "stable",
  "anthropic/claude-sonnet-4-5": "stable",
  "anthropic/claude-opus-4-1": "stable",
  "anthropic/claude-3-5-sonnet": "stable",
  "anthropic/claude-3-5-haiku": "stable",
  "gemini/gemini-2.5-pro": "stable",
  "gemini/gemini-2.5-flash": "stable",
  "gemini/gemini-2.0-flash": "stable",
  "groq/llama-3.3-70b-versatile": "stable",
  "groq/llama-3.1-8b-instant": "stable",

  // Beta: released but flagged. Operators can opt in.
  "openai/gpt-5": "beta",
  "openai/gpt-5-mini": "beta",
  "openai/gpt-5-codex": "beta",
  "anthropic/claude-sonnet-4-5-thinking": "beta",
  "codex/gpt-5-codex": "beta",

  // Experimental: pre-GA. Correctness can regress without notice.
  "openai/o3-pro": "experimental",
  "anthropic/claude-opus-4-2": "experimental",
  "gemini/gemini-3-pro": "experimental",

  // Unmaintained: deprecated by upstream or no recent traffic.
  "openai/gpt-4-turbo": "unmaintained",
  "openai/gpt-3.5-turbo": "unmaintained",
  "anthropic/claude-3-opus": "unmaintained",
  "gemini/gemini-1.5-pro": "unmaintained",
  "gemini/gemini-1.5-flash": "unmaintained",
};

/**
 * Resolve the maturity level for a provider+model pair. Lookup order:
 *   1. Env var override: OMNIROUTE_MATURITY_<PROVIDER>_<MODEL>
 *   2. Static registry.
 *   3. Default: "experimental" (unknown = assume the worst, not the best).
 *
 * The function never throws. Unknown / malformed values fall through to
 * the registry, then to the default.
 */
export function resolveMaturity(
  provider: string,
  model: string,
  env: NodeJS.ProcessEnv = process.env
): MaturityLevel {
  if (typeof provider === "string" && typeof model === "string") {
    // Env override path: collapse dashes so the env var name is portable
    // (e.g. "gpt-4.1" → "GPT_4_1", "claude-3-5-sonnet" → "CLAUDE_3_5_SONNET").
    const key = `${provider.toUpperCase()}_${model.toUpperCase()}`.replace(
      /[^A-Z0-9_]/g,
      "_"
    );
    const override = env[`OMNIROUTE_MATURITY_${key}`];
    if (typeof override === "string" && VALID_LEVELS.has(override as MaturityLevel)) {
      return override as MaturityLevel;
    }
    const fromRegistry = REGISTRY[`${provider}/${model}`];
    if (fromRegistry) return fromRegistry;
  }
  return "experimental";
}

/**
 * Build the value for the `X-ToolStack-Maturity` response header. Format:
 *   `<provider>=<model>:<level>`
 * Always safe to call; returns "unknown" when both inputs are empty.
 */
export function formatMaturityHeader(
  provider: string,
  model: string,
  env: NodeJS.ProcessEnv = process.env
): string {
  if (!provider || !model) return "unknown";
  const level = resolveMaturity(provider, model, env);
  return `${provider}=${model}:${level}`;
}

/** Test-only helper to clear the in-process registry for unit tests. */
export function _resolveMaturityForTest(
  provider: string,
  model: string
): MaturityLevel {
  return resolveMaturity(provider, model, {});
}
