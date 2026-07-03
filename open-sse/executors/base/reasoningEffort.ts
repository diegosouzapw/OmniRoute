// Provider-aware reasoning_effort sanitation (xhigh/max normalization + reject strip).
// Extracted verbatim from base.ts. Deps are config/services only (no host import → no cycle).
import { PROVIDER_CLAUDE } from "../../services/systemTransforms.ts";
import { isClaudeCodeCompatible } from "../../services/provider.ts";
import { supportsClaudeMaxEffort, supportsXHighEffort } from "../../config/providerModels.ts";

/**
 * Sanitize reasoning_effort for providers that don't accept all values.
 *
 * The claude→openai translator may emit reasoning_effort=max/xhigh when the
 * client sends output_config.effort=max on a Claude-shape request. Combined with
 * runtime alias remapping (e.g. claude-opus-4-6 → mimo/mimo-v2.5-pro), this
 * routes xhigh to OpenAI-shape providers that don't accept the value:
 *
 *   xiaomi-mimo : low|medium|high only — 400 literal_error on xhigh
 *   mistral     : devstral models reject reasoning_effort entirely
 *   github      : claude/haiku/oswe models reject reasoning_effort entirely
 *
 * Each rejection burns a combo fallback attempt before reaching a working
 * provider. Apply provider-aware sanitation here (after transformRequest, so
 * reintroductions by per-provider transforms are also caught) before fetch.
 * xhigh support is opt-out: pass through unchanged unless the registry marks
 * a model as unsupported. Literal max support is provider-specific and
 * intentionally separate: some upstreams accept max even when they do not
 * accept xhigh. For OpenAI-shape providers, max normalizes to xhigh by default
 * and falls back to high only for explicit xhigh opt-outs.
 */
export const MISTRAL_NO_REASONING_EFFORT_PATTERN = /devstral/i;
// GitHub Copilot Claude routing is granular (upstream port: decolua/9router#791):
//   ✅ Pass through — Claude Opus 4.6, Claude Sonnet 4.6. Copilot routes both to
//      Anthropic's chat/completions surface, which honors reasoning_effort and
//      emits visible reasoning tokens (verified upstream: 3× token increase
//      between low/medium/high).
//   ❌ Strip — Claude Haiku 4.5 and Claude Opus 4.7 (rejected upstream by
//      Copilot's Claude backend), older Claude variants, all `haiku`-named
//      models, and the `oswe-*` family (Raptor) which still rejects
//      reasoning_effort.
// Order matters: the opt-in check must run BEFORE the broad Claude/haiku/oswe strip.
export const GITHUB_REASONING_EFFORT_OPT_IN_PATTERN = /claude[-_.]?(?:opus|sonnet)[-_.]?4[-_.]6/i;
export const GITHUB_NO_REASONING_EFFORT_PATTERN = /(claude|haiku|oswe)/i;

export function supportsMaxEffortForProvider(provider: string, model: string): boolean {
  const isClaude =
    (provider === PROVIDER_CLAUDE || isClaudeCodeCompatible(provider)) &&
    supportsClaudeMaxEffort(model);
  // opencode-go proxies DeepSeek with the native DeepSeek API contract, which
  // accepts {high, max} literally. Without this opt-in, max would be
  // normalized to xhigh (the OmniRoute-internal top tier) and rejected by the
  // upstream. Scoped to opencode-go deliberately: OpenRouter's DeepSeek path
  // (pi#4055) is the documented inverse and expects xhigh, not max.
  // Ollama Cloud also accepts literal max (for example GLM 5.2 supports
  // low|medium|high|max|none) and rejects xhigh.
  const isOpencodeGoDeepSeek =
    provider === "opencode-go" && model.toLowerCase().includes("deepseek");
  const isOllamaCloud = provider === "ollama-cloud";
  return isClaude || isOpencodeGoDeepSeek || isOllamaCloud;
}

export function sanitizeReasoningEffortForProvider(
  body: unknown,
  provider: string,
  model: string | undefined,
  log?: { info?: (tag: string, msg: string) => void } | null
): unknown {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const b = body as Record<string, unknown>;
  const reasoning =
    b.reasoning && typeof b.reasoning === "object" && !Array.isArray(b.reasoning)
      ? (b.reasoning as Record<string, unknown>)
      : null;
  const hasTopLevelReasoningEffort = Object.prototype.hasOwnProperty.call(b, "reasoning_effort");
  const effort = b.reasoning_effort ?? reasoning?.effort;
  if (effort === undefined) return body;
  const effortStr = typeof effort === "string" ? effort.toLowerCase() : "";
  const modelStr = model || "";

  const githubOptIn =
    provider === "github" && GITHUB_REASONING_EFFORT_OPT_IN_PATTERN.test(modelStr);
  const rejecting =
    (provider === "mistral" && MISTRAL_NO_REASONING_EFFORT_PATTERN.test(modelStr)) ||
    (provider === "github" && !githubOptIn && GITHUB_NO_REASONING_EFFORT_PATTERN.test(modelStr));
  if (rejecting) {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: removed unsupported reasoning_effort`
    );
    const next: Record<string, unknown> = { ...b };
    delete next.reasoning_effort;
    if (reasoning) {
      const r = { ...reasoning };
      delete r.effort;
      if (Object.keys(r).length === 0) delete next.reasoning;
      else next.reasoning = r;
    }
    return next;
  }

  // Native DeepSeek (api.deepseek.com) — V4 thinking mode accepts reasoning_effort
  // ONLY as {high, max} (its own top tier is literally "max"). OmniRoute's internal
  // scale is low|medium|high|xhigh where xhigh is the top, so map onto DeepSeek's
  // vocabulary: xhigh → max (top→top), low|medium → high (below the enum floor).
  // high/max pass through unchanged. Without this, the claude→openai translator's
  // xhigh (and max-normalized-to-xhigh below) reaches DeepSeek as an unknown value,
  // silently dropping the client's requested effort. This is the INVERSE of the
  // OpenRouter-DeepSeek path, whose normalized API expects xhigh, not max (pi#4055).
  if (provider === "deepseek") {
    const mapped =
      effortStr === "xhigh" ? "max" : effortStr === "low" || effortStr === "medium" ? "high" : null;
    if (mapped && mapped !== effortStr) {
      log?.info?.(
        "REASONING_SANITIZE",
        `deepseek/${modelStr}: normalized reasoning_effort ${effortStr} → ${mapped}`
      );
      const next: Record<string, unknown> = { ...b };
      if (hasTopLevelReasoningEffort) next.reasoning_effort = mapped;
      if (reasoning) next.reasoning = { ...reasoning, effort: mapped };
      return next;
    }
    return body;
  }

  const supportsXHigh = supportsXHighEffort(provider, modelStr);
  const shouldDowngradeXHigh = effortStr === "xhigh" && !supportsXHigh;
  const supportsXHighForMax = supportsXHigh;
  const supportsMax = supportsMaxEffortForProvider(provider, modelStr);
  const shouldNormalizeMaxToXHigh = effortStr === "max" && !supportsMax && supportsXHighForMax;
  const shouldDowngradeMax = effortStr === "max" && !supportsMax && !supportsXHighForMax;

  if (shouldNormalizeMaxToXHigh) {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: normalized reasoning_effort max → xhigh`
    );
    const next: Record<string, unknown> = { ...b };
    if (hasTopLevelReasoningEffort) {
      next.reasoning_effort = "xhigh";
    }
    if (reasoning) {
      next.reasoning = { ...reasoning, effort: "xhigh" };
    }
    return next;
  }

  if (shouldDowngradeXHigh || shouldDowngradeMax) {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: downgraded reasoning_effort ${effortStr} → high`
    );
    const next: Record<string, unknown> = { ...b };
    if (hasTopLevelReasoningEffort) {
      next.reasoning_effort = "high";
    }
    if (reasoning) {
      next.reasoning = { ...reasoning, effort: "high" };
    }
    return next;
  }

  return body;
}
