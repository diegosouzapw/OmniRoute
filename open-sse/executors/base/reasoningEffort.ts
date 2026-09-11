// Provider-aware reasoning_effort sanitation (xhigh/max normalization + reject strip).
// Extracted verbatim from base.ts. Deps are config/services only (no host import → no cycle).
import { PROVIDER_CLAUDE } from "../../services/systemTransforms.ts";
import { isClaudeCodeCompatible } from "../../services/provider.ts";
import {
  supportsClaudeMaxEffort,
  supportsXHighEffort,
  getProviderModel,
  getProviderModels,
} from "../../config/providerModels.ts";
import {
  getLearnedReasoningEffort,
  clampToLearned,
  REASONING_EFFORT_ORDER,
} from "../../services/learnedReasoningEffortCaps.ts";

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
const NVIDIA_GLM_52_PATTERN = /z-ai\/glm-5\.2\b/i;

/**
 * Model families whose top reasoning tier in their native API or upstream gateways
 * is `max` (rather than `xhigh`):
 *   - GLM 5.1+ / 6.0+ (Z.AI / Zhipu GLM-5.1, GLM-5.2, GLM-5.3, GLM-5.3-flash, GLM-5.4, GLM-6...)
 *   - DeepSeek V4+ (Flash, Pro, Flash-Vision, ...)
 *   - Moonshot Kimi K3+ (Kimi K3, K4...)
 */
export const MAX_TIER_REASONING_MODEL_PATTERN =
  /(?:^|\/|\b)(?:glm-(?:5\.[1-9]|5\.\d+|[6-9]|\d{2,})|deepseek-v(?:[4-9]|\d{2,})|kimi-k(?:[3-9]|\d{2,}))/i;

export const O1_O3_REASONING_MODELS_PATTERN = /(?:^|\/|\b)(?:o1-mini|o1|o3-mini|o3-pro|o3)(?:$|-)/i;
export const O1_PREVIEW_PATTERN = /(?:^|\/|\b)o1-preview(?:$|-)/i;
export const MUSE_SPARK_PATTERN = /(?:^|\/|\b)muse-spark/i;
export const MINIMAX_REASONING_PATTERN = /(?:^|\/|\b)minimax(?:-m3|-m2)/i;
export const GROK_45_PATTERN = /(?:^|\/|\b)grok-4\.5/i;
export const GROK_46_PATTERN = /(?:^|\/|\b)grok-4\.6/i;
export const GLM_53_FAMILY_PATTERN = /(?:^|\/|\b)glm-5\.3(?:$|-)/i;
export const GLM_52_FAMILY_PATTERN = /(?:^|\/|\b)glm-5\.2(?:$|-)/i;

export function isCommandCodeProvider(provider: string): boolean {
  return (
    provider === "command-code" ||
    provider === "cmd" ||
    provider === "command_code"
  );
}

export function isOllamaCloudProvider(provider: string): boolean {
  return (
    provider === "ollama-cloud" ||
    provider === "ollamacloud" ||
    provider === "ollama_cloud"
  );
}

export function isOpencodeGoProvider(provider: string): boolean {
  return (
    provider === "opencode-go" ||
    provider === "opencode-zen" ||
    provider === "opencode" ||
    provider === "opencode_go"
  );
}

type ReasoningSanitizeLog = {
  info?: (tag: string, msg: string) => void;
};

function isNvidiaGlm52(provider: string, model: string | undefined): boolean {
  return provider === "nvidia" && NVIDIA_GLM_52_PATTERN.test(model || "");
}

type NvidiaGlm52EffortInfo = {
  reasoning: Record<string, unknown> | null;
  effortStr: string;
};

/** Pulls a normalized (lowercased) effort string out of top-level or nested `reasoning.effort`. */
function extractNvidiaGlm52Effort(b: Record<string, unknown>): NvidiaGlm52EffortInfo | null {
  const reasoning =
    b.reasoning && typeof b.reasoning === "object" && !Array.isArray(b.reasoning)
      ? (b.reasoning as Record<string, unknown>)
      : null;
  const effort = b.reasoning_effort ?? reasoning?.effort;
  if (effort === undefined) return null;

  const effortStr = typeof effort === "string" ? effort.toLowerCase() : "";
  if (!effortStr) return null;

  return { reasoning, effortStr };
}

/** Builds `chat_template_kwargs.enable_thinking`, or null when the existing kwargs shape is unusable. */
function buildNvidiaGlm52TemplateKwargs(
  rawTemplateKwargs: unknown,
  effortStr: string
): Record<string, unknown> | null {
  if (
    rawTemplateKwargs !== undefined &&
    (!rawTemplateKwargs ||
      typeof rawTemplateKwargs !== "object" ||
      Array.isArray(rawTemplateKwargs))
  ) {
    return null;
  }

  const templateKwargs = {
    ...((rawTemplateKwargs as Record<string, unknown> | undefined) ?? {}),
  };
  if (!Object.prototype.hasOwnProperty.call(templateKwargs, "enable_thinking")) {
    templateKwargs.enable_thinking = effortStr !== "none";
  }
  return templateKwargs;
}

/** Returns a copy of `b` with `reasoning_effort`/`reasoning.effort` replaced by `templateKwargs`. */
function withNvidiaGlm52TemplateKwargs(
  b: Record<string, unknown>,
  templateKwargs: Record<string, unknown>,
  reasoning: Record<string, unknown> | null
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...b, chat_template_kwargs: templateKwargs };
  delete next.reasoning_effort;
  if (reasoning) {
    const nextReasoning = { ...reasoning };
    delete nextReasoning.effort;
    if (Object.keys(nextReasoning).length === 0) delete next.reasoning;
    else next.reasoning = nextReasoning;
  }
  return next;
}

/**
 * Map OmniRoute's reasoning-effort inputs onto the binary thinking switch exposed by
 * NVIDIA's hosted GLM-5.2 chat template. This runs before DefaultExecutor's unsupported
 * parameter stripping so a nested `reasoning.effort` is not discarded first, and is also
 * reused by the final provider sanitizer for non-default execution paths.
 */
export function mapNvidiaGlm52ReasoningParams(
  body: unknown,
  provider: string,
  model: string | undefined,
  log?: ReasoningSanitizeLog | null
): unknown {
  if (!isNvidiaGlm52(provider, model)) return body;
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  const b = body as Record<string, unknown>;
  const info = extractNvidiaGlm52Effort(b);
  if (!info) return body;

  const templateKwargs = buildNvidiaGlm52TemplateKwargs(b.chat_template_kwargs, info.effortStr);
  if (!templateKwargs) return body;

  const next = withNvidiaGlm52TemplateKwargs(b, templateKwargs, info.reasoning);
  log?.info?.(
    "REASONING_SANITIZE",
    `nvidia/${model || ""}: mapped reasoning effort to enable_thinking`
  );
  return next;
}

export function supportsMaxEffortForProvider(provider: string, model: string): boolean {
  const resolvedModelId = getProviderModel(provider, model)?.id || model;

  const isClaude =
    (provider === PROVIDER_CLAUDE || isClaudeCodeCompatible(provider)) &&
    supportsClaudeMaxEffort(resolvedModelId);
  const isOpencodeGo = isOpencodeGoProvider(provider);
  const isOllamaCloud = isOllamaCloudProvider(provider);
  const isMoonshotK3 = /^kimi-k3(?:$|-)/i.test(resolvedModelId);
  const isCommandCode = isCommandCodeProvider(provider);
  const isMaxTierModel =
    MAX_TIER_REASONING_MODEL_PATTERN.test(resolvedModelId) ||
    MAX_TIER_REASONING_MODEL_PATTERN.test(model);
  return (
    isClaude ||
    isOpencodeGo ||
    isOllamaCloud ||
    isMoonshotK3 ||
    isCommandCode ||
    isMaxTierModel
  );
}

// ── Effort carrier helpers (#7044) ──────────────────────────────────────────
// OmniRoute carries the requested effort on up to three shapes:
//   1. top-level `reasoning_effort`        — OpenAI / OmniRoute-internal
//   2. `reasoning.effort`                  — OpenAI Responses shape
//   3. `output_config.effort`              — Anthropic Messages native (Claude Code / Claude passthrough)
// Carrier (3) was previously invisible to this sanitizer, so a native Claude request
// carrying `output_config.effort: "xhigh"` reached providers that don't accept xhigh
// (e.g. claude-sonnet-4-6, supportsXHighEffort=false) unchanged → HTTP 400 (#7044).
interface EffortCarriers {
  reasoning: Record<string, unknown> | null;
  outputConfig: Record<string, unknown> | null;
  hasTopLevelReasoningEffort: boolean;
  hasReasoningEffort: boolean;
  hasOutputConfigEffort: boolean;
  effort: unknown;
}

function readEffortCarriers(b: Record<string, unknown>): EffortCarriers {
  const reasoning =
    b.reasoning && typeof b.reasoning === "object" && !Array.isArray(b.reasoning)
      ? (b.reasoning as Record<string, unknown>)
      : null;
  const outputConfig =
    b.output_config && typeof b.output_config === "object" && !Array.isArray(b.output_config)
      ? (b.output_config as Record<string, unknown>)
      : null;
  const hasTopLevelReasoningEffort = Object.prototype.hasOwnProperty.call(b, "reasoning_effort");
  const hasReasoningEffort = !!(
    reasoning && Object.prototype.hasOwnProperty.call(reasoning, "effort")
  );
  const hasOutputConfigEffort = !!(
    outputConfig && Object.prototype.hasOwnProperty.call(outputConfig, "effort")
  );
  const effort = b.reasoning_effort ?? reasoning?.effort ?? outputConfig?.effort;
  return {
    reasoning,
    outputConfig,
    hasTopLevelReasoningEffort,
    hasReasoningEffort,
    hasOutputConfigEffort,
    effort,
  };
}

/** Write a normalized effort value back to every carrier that was present. */
function writeEffortValue(
  b: Record<string, unknown>,
  value: string,
  c: EffortCarriers
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...b };
  if (c.hasTopLevelReasoningEffort) next.reasoning_effort = value;
  if (c.hasReasoningEffort && c.reasoning) next.reasoning = { ...c.reasoning, effort: value };
  if (c.hasOutputConfigEffort && c.outputConfig)
    next.output_config = { ...c.outputConfig, effort: value };
  return next;
}

/** Strip the effort field from every carrier that was present. */
function stripEffortValue(b: Record<string, unknown>, c: EffortCarriers): Record<string, unknown> {
  const next: Record<string, unknown> = { ...b };
  if (c.hasTopLevelReasoningEffort) delete next.reasoning_effort;
  if (c.hasReasoningEffort && c.reasoning) {
    const r: Record<string, unknown> = { ...c.reasoning };
    delete r.effort;
    if (Object.keys(r).length === 0) delete next.reasoning;
    else next.reasoning = r;
  }
  if (c.hasOutputConfigEffort && c.outputConfig) {
    const oc: Record<string, unknown> = { ...c.outputConfig };
    delete oc.effort;
    if (Object.keys(oc).length === 0) delete next.output_config;
    else next.output_config = oc;
  }
  return next;
}

export function sanitizeReasoningEffortForProvider(
  body: unknown,
  provider: string,
  model: string | undefined,
  log?: ReasoningSanitizeLog | null
): unknown {
  if (isNvidiaGlm52(provider, model)) {
    return mapNvidiaGlm52ReasoningParams(body, provider, model, log);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) return body;
  const b = body as Record<string, unknown>;
  const c = readEffortCarriers(b);
  if (c.effort === undefined) return body;
  const effortStr = typeof c.effort === "string" ? c.effort.toLowerCase() : "";
  const modelStr = model || "";

  // ── o1-preview: does not accept reasoning_effort parameter at all ─────────
  if (O1_PREVIEW_PATTERN.test(modelStr)) {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: removed unsupported reasoning_effort for o1-preview`
    );
    return stripEffortValue(b, c);
  }

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
    return stripEffortValue(b, c);
  }

  // ── GLM-5.3 and GLM-5.3-FLASH specific rules ──────────────────────────────
  // Supported options: max (default & recommended), high, low.
  // none/minimal/low → low; medium/high → high; xhigh/max → max.
  // In addition, GLM-5.3+ forces thinking; thinking.type="disabled" is rejected upstream.
  if (GLM_53_FAMILY_PATTERN.test(modelStr)) {
    let mappedGlm53 = "max";
    if (effortStr === "none" || effortStr === "minimal" || effortStr === "low") {
      mappedGlm53 = "low";
    } else if (effortStr === "medium" || effortStr === "high") {
      mappedGlm53 = "high";
    } else if (effortStr === "xhigh" || effortStr === "max" || effortStr === "ultra") {
      mappedGlm53 = "max";
    }
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: mapped reasoning_effort ${effortStr} → ${mappedGlm53} (GLM-5.3 contract)`
    );
    let updated = writeEffortValue(b, mappedGlm53, c);
    const thinkingObj = updated.thinking;
    if (
      thinkingObj &&
      typeof thinkingObj === "object" &&
      !Array.isArray(thinkingObj) &&
      (thinkingObj as Record<string, unknown>).type === "disabled"
    ) {
      updated = {
        ...updated,
        thinking: {
          ...(thinkingObj as Record<string, unknown>),
          type: "enabled",
        },
      };
    }
    return updated;
  }

  // ── GLM-5.2 specific rules ────────────────────────────────────────────────
  // none/minimal stop thinking (none); low/medium → high; xhigh/max → max; high → high.
  if (GLM_52_FAMILY_PATTERN.test(modelStr)) {
    let mappedGlm52 = "max";
    if (effortStr === "none" || effortStr === "minimal") {
      mappedGlm52 = "none";
    } else if (effortStr === "low" || effortStr === "medium") {
      mappedGlm52 = "high";
    } else if (effortStr === "xhigh" || effortStr === "max" || effortStr === "ultra") {
      mappedGlm52 = "max";
    } else if (effortStr === "high") {
      mappedGlm52 = "high";
    }
    if (mappedGlm52 !== effortStr) {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: mapped reasoning_effort ${effortStr} → ${mappedGlm52} (GLM-5.2 contract)`
      );
      return writeEffortValue(b, mappedGlm52, c);
    }
    return body;
  }

  // ── Muse Spark models (muse-spark-1.2, etc.) ─────────────────────────────
  // Accepts minimal|low|medium|high|xhigh. Rejects none (400) and max.
  // max/ultra → xhigh; none → minimal.
  if (MUSE_SPARK_PATTERN.test(modelStr)) {
    if (effortStr === "max" || effortStr === "ultra") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → xhigh (Muse Spark ceiling)`
      );
      return writeEffortValue(b, "xhigh", c);
    }
    if (effortStr === "none") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort none → minimal (Muse Spark floor)`
      );
      return writeEffortValue(b, "minimal", c);
    }
    return body;
  }

  // ── OpenAI o1 / o3-mini models ───────────────────────────────────────────
  // Accepts only low|medium|high. Clamp xhigh/max/ultra → high.
  if (O1_O3_REASONING_MODELS_PATTERN.test(modelStr)) {
    if (effortStr === "xhigh" || effortStr === "max" || effortStr === "ultra") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → high (o1/o3-mini ceiling)`
      );
      return writeEffortValue(b, "high", c);
    }
    return body;
  }

  // ── MiniMax models ───────────────────────────────────────────────────────
  // Accepts none|minimal|low|medium|high. Clamp xhigh/max/ultra → high.
  if (MINIMAX_REASONING_PATTERN.test(modelStr)) {
    if (effortStr === "xhigh" || effortStr === "max" || effortStr === "ultra") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → high (MiniMax ceiling)`
      );
      return writeEffortValue(b, "high", c);
    }
    return body;
  }

  // ── xAI Grok models ──────────────────────────────────────────────────────
  // Grok 4.6 accepts low|medium|high|xhigh (clamp max/ultra → xhigh).
  // Grok 4.5 accepts low|medium|high (clamp xhigh/max/ultra → high).
  if (GROK_46_PATTERN.test(modelStr)) {
    if (effortStr === "max" || effortStr === "ultra") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → xhigh (Grok 4.6 ceiling)`
      );
      return writeEffortValue(b, "xhigh", c);
    }
    return body;
  }
  if (GROK_45_PATTERN.test(modelStr)) {
    if (effortStr === "xhigh" || effortStr === "max" || effortStr === "ultra") {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → high (Grok 4.5 ceiling)`
      );
      return writeEffortValue(b, "high", c);
    }
    return body;
  }

  // `minimal` is a sub-`low` reasoning tier some catalogs advertise (e.g.
  // Muse Spark via models.dev) and the Codex provider accepts natively — but
  // Command Code rejects it outright:
  //   Validation error: Invalid option: expected one of
  //   "low"|"medium"|"high"|"xhigh"|"max" at "params.reasoning_effort"
  // Map it to the closest supported value (`low`) for command-code only;
  // other providers (codex etc.) keep their native `minimal` handling.
  if (isCommandCodeProvider(provider) && effortStr === "minimal") {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: mapped reasoning_effort minimal → low`
    );
    return writeEffortValue(b, "low", c);
  }

  // Providers and model families whose top reasoning tier is `max` natively
  // (or whose gateways expect `max` rather than OmniRoute's internal `xhigh`):
  //   - Command Code (`command-code` / `cmd`)
  //   - Ollama Cloud (`ollama-cloud` / `ollamacloud`)
  //   - OpenCode Go (`opencode-go` / `opencode-zen` / `opencode`)
  //   - GLM 5.1+ / 6.0+ (Z.AI / Zhipu GLM-5.1, GLM-5.2, GLM-5.3, GLM-5.4...)
  //   - DeepSeek V4+ (Flash, Pro, Vision, ...)
  //   - Kimi K3+ (Moonshot AI K3, K4, ...)
  // OpenRouter (pi#4055) is excluded because OpenRouter's normalized API expects xhigh.
  const isMaxTierTarget =
    provider !== "openrouter" &&
    (isCommandCodeProvider(provider) ||
      isOllamaCloudProvider(provider) ||
      isOpencodeGoProvider(provider) ||
      MAX_TIER_REASONING_MODEL_PATTERN.test(modelStr));

  if (isMaxTierTarget && effortStr === "xhigh") {
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: normalized reasoning_effort xhigh → max`
    );
    return writeEffortValue(b, "max", c);
  }

  // Native DeepSeek (api.deepseek.com) — V4 Pro and Flash use the native
  // {low, high, max} vocabulary, while other model ids retain the {high, max}
  // floor. OmniRoute's internal top tier xhigh maps to DeepSeek's literal max,
  // while compatibility-only medium maps to high. `none` is already the OpenAI
  // no-thinking carrier and passes through unchanged.
  if (provider === "deepseek") {
    const isV4 = modelStr.toLowerCase().startsWith("deepseek-v4-");
    const mapped =
      effortStr === "xhigh"
        ? "max"
        : effortStr === "medium" || (effortStr === "low" && !isV4)
          ? "high"
          : null;
    if (mapped && mapped !== effortStr) {
      log?.info?.(
        "REASONING_SANITIZE",
        `deepseek/${modelStr}: normalized reasoning_effort ${effortStr} → ${mapped}`
      );
      return writeEffortValue(b, mapped, c);
    }
    return body;
  }

  // Generic learned clamp (downgrade-only: greatest accepted <= demand).
  // Sits AFTER the per-provider early returns by design: deepseek/command-code/
  // ollama-cloud have deliberate static translations that take precedence; the
  // learned set governs every other provider and all effort values, before the
  // xhigh/max static fallbacks below.
  const learnedSet = getLearnedReasoningEffort(provider, modelStr);
  if (learnedSet && learnedSet.size > 0 && !learnedSet.has(effortStr)) {
    const clamped = clampToLearned(effortStr, learnedSet);
    if (clamped && clamped !== effortStr) {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: clamped reasoning_effort ${effortStr} → ${clamped} (learned)`
      );
      return writeEffortValue(b, clamped, c);
    }
  }

  // ── explicit per-model capability clamp ──────────────────────────────────
  // When the registry declares supportedThinkingEfforts for this exact model
  // and the requested effort falls outside that vocabulary, remap to the
  // nearest declared tier: the smallest ranked value ≥ the request, else the
  // highest declared (a request above the ceiling lands on the ceiling).
  const providerModelIdForClamp = modelStr.startsWith(`${provider}/`)
    ? modelStr.slice(provider.length + 1)
    : modelStr;
  const declaredEfforts = getProviderModels(provider).find(
    (entry) => entry.id === providerModelIdForClamp || entry.aliases?.includes(providerModelIdForClamp)
  )?.supportedThinkingEfforts;
  const declaredRanked = (
    Array.isArray(declaredEfforts) ? declaredEfforts : []
  )
    .map((tier) => ({ tier, rank: REASONING_EFFORT_ORDER.indexOf(tier) }))
    .filter((x) => x.rank >= 0)
    .sort((a, b) => a.rank - b.rank);
  if (declaredRanked.length > 0 && !declaredEfforts!.includes(effortStr)) {
    const requestedRank = REASONING_EFFORT_ORDER.indexOf(effortStr);
    const nearest =
      declaredRanked.find((x) => x.rank >= requestedRank) ??
      declaredRanked[declaredRanked.length - 1];
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: mapped reasoning_effort ${effortStr} → ${nearest.tier} (model accepts ${declaredEfforts!.join("/")})`
    );
    return writeEffortValue(b, nearest.tier, c);
  }

  const supportsXHigh = supportsXHighEffort(provider, modelStr);
  const supportsMax = supportsMaxEffortForProvider(provider, modelStr);

  // ── xhigh handling ──────────────────────────────────────────────────────
  // xhigh is OmniRoute-internal. Map it to the best effort the model accepts.
  if (effortStr === "xhigh") {
    if (supportsXHigh) return body; // model accepts xhigh natively
    if (supportsMax) {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: mapped reasoning_effort xhigh → max`
      );
      return writeEffortValue(b, "max", c);
    }
    // Model explicitly rejects xhigh — gracefully degrade to high (its highest standard tier)
    log?.info?.(
      "REASONING_SANITIZE",
      `${provider}/${modelStr}: downgraded reasoning_effort xhigh → high`
    );
    return writeEffortValue(b, "high", c);
  }

  // ── max handling ────────────────────────────────────────────────────────
  // NEW DEFAULT: pass max through unchanged. Most reasoning-capable APIs
  // accept max natively. Only degrade when we KNOW the model rejects it
  // (registry has supportsXHighEffort explicitly set to false AND it's not
  // in the supportsMax whitelist). Unknown models pass through — trust the
  // upstream, and if it 400s the user gets a clear signal. This prevents
  // new models from being unusable for weeks until they're whitelisted (#8057).
  if (effortStr === "max") {
    if (supportsMax) return body; // explicitly known to accept max

    // A model that explicitly advertises its accepted tiers is safe to normalize.
    // Keep the default pass-through for absent metadata: an unlisted model might
    // support literal `max`, and #8057 deliberately avoids blocking such models.
    const providerModelId = modelStr.startsWith(`${provider}/`)
      ? modelStr.slice(provider.length + 1)
      : modelStr;
    // Do not fall back to a globally registered model here. Identical ids can
    // have different upstream contracts across providers (for example, OpenCode
    // and SenseNova both expose deepseek-v4-flash with different max support).
    const explicitEfforts = getProviderModels(provider).find(
      (entry) => entry.id === providerModelId || entry.aliases?.includes(providerModelId)
    )?.supportedThinkingEfforts;
    const maxFallback =
      Array.isArray(explicitEfforts) && !explicitEfforts.includes("max")
        ? ["ultra", "xhigh", "high", "medium", "low"].find((tier) => explicitEfforts.includes(tier))
        : undefined;
    if (maxFallback) {
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: downgraded reasoning_effort max → ${maxFallback} (explicit model capability)`
      );
      return writeEffortValue(b, maxFallback, c);
    }

    if (!supportsXHigh) {
      // Model is explicitly flagged as rejecting xhigh (and not in supportsMax) —
      // it likely only accepts standard tiers. Degrade to its highest: high.
      log?.info?.(
        "REASONING_SANITIZE",
        `${provider}/${modelStr}: downgraded reasoning_effort max → high (model rejects max/xhigh)`
      );
      return writeEffortValue(b, "high", c);
    }
    return body;
  }

  return body;
}
