/**
 * open-sse/services/accountFallback/antiAvalanche.ts
 *
 * Payload-aware cascading failover protection (Anti-Avalanche Guard).
 *
 * Prevents domino exhaustion across multiple credentials when an upstream
 * rate limit (HTTP 429) or payload rejection (HTTP 413 / context overflow) is
 * triggered by the payload size, prompt token volume, or TPM/burst limits
 * rather than transient per-key exhaustion.
 *
 * When a request fails with 429 and:
 *  1. Upstream explicitly indicates token rate / TPM exhaustion (e.g. Gemini
 *     generate_content_free_tier_input_token_count, or OpenAI/Anthropic TPM limit), OR
 *  2. The payload is abnormally large (e.g. > 50,000 tokens) and exceeds the
 *     allowed retry threshold (at most 1 retry for 50k-100k, 0 retries for >= 100k),
 *
 * the guard suppresses cascading fallback across the remaining active credentials
 * in the pool. This prevents 1 oversized request from knocking down all N keys
 * and triggering escalated 1800s model lockouts on healthy accounts.
 */

import { classifyGeminiQuotaMetricFromText, isTpmExhausted } from "../geminiRateLimitTracker.ts";
import { isContextOverflow400 } from "../combo/comboPredicates.ts";

export const DEFAULT_AVALANCHE_TOKEN_THRESHOLD = 50_000;
export const MASSIVE_PAYLOAD_TOKEN_THRESHOLD = 100_000;
export const DEFAULT_AVALANCHE_MAX_RETRIES = 1;
export const DEFAULT_AVALANCHE_BURST_COOLDOWN_MS = 60_000;

const EXPLICIT_TPM_PATTERNS = [
  /free_tier_input_token_count/i,
  /\bgenerate_content_.*_token_count\b/i,
  /\b(?:tpm|tokens?\s*per\s*minute)\b/i,
  /\btoken\s*rate\s*limit\b/i,
  /\binput\s*tokens?\s*exceed(?:ed)?\b/i,
  /\brate_limit_exceeded.*tokens?\b/i,
  /\bexceeded.*token.*quota\b/i,
  /\btoken_count\b/i,
  /\btoken\s*limit\s*reached\b/i,
];

export type AvalancheFailureReason =
  | "explicit_tpm_limit"
  | "oversized_payload_rate_limit"
  | "payload_too_large"
  | "context_length_exceeded";

export interface AvalancheEvaluationContext {
  status: number;
  errorText: string | null | undefined;
  provider?: string | null;
  model?: string | null;
  promptTokens?: number | null;
  fallbackAttemptCount?: number;
  settings?: Record<string, unknown> | null;
}

export interface AvalancheRiskResult {
  isAvalancheRisk: boolean;
  reason?: AvalancheFailureReason;
  shouldSuppressFallback: boolean;
  suggestedCooldownMs: number;
  promptTokens: number;
  explanation?: string;
}

export interface AvalancheSettings {
  enabled: boolean;
  tokenThreshold: number;
  massiveThreshold: number;
  maxRetries: number;
  burstCooldownMs: number;
}

export function resolveAvalancheSettings(
  settings?: Record<string, unknown> | null
): AvalancheSettings {
  const envEnabled = process.env.OMNIROUTE_AVALANCHE_PROTECTION_ENABLED;
  const enabled =
    envEnabled === "false" || envEnabled === "0"
      ? false
      : typeof settings?.avalancheProtectionEnabled === "boolean"
        ? settings.avalancheProtectionEnabled
        : true;

  const parsedThreshold = Number(
    process.env.OMNIROUTE_AVALANCHE_TOKEN_THRESHOLD ||
      settings?.avalancheTokenThreshold ||
      DEFAULT_AVALANCHE_TOKEN_THRESHOLD
  );
  const tokenThreshold =
    Number.isFinite(parsedThreshold) && parsedThreshold > 0
      ? parsedThreshold
      : DEFAULT_AVALANCHE_TOKEN_THRESHOLD;

  const parsedMaxRetries = Number(
    process.env.OMNIROUTE_AVALANCHE_MAX_RETRIES ||
      settings?.avalancheMaxRetries ||
      DEFAULT_AVALANCHE_MAX_RETRIES
  );
  const maxRetries =
    Number.isFinite(parsedMaxRetries) && parsedMaxRetries >= 0
      ? parsedMaxRetries
      : DEFAULT_AVALANCHE_MAX_RETRIES;

  const parsedCooldown = Number(
    process.env.OMNIROUTE_AVALANCHE_BURST_COOLDOWN_MS ||
      settings?.avalancheBurstCooldownMs ||
      DEFAULT_AVALANCHE_BURST_COOLDOWN_MS
  );
  const burstCooldownMs =
    Number.isFinite(parsedCooldown) && parsedCooldown > 0
      ? parsedCooldown
      : DEFAULT_AVALANCHE_BURST_COOLDOWN_MS;

  return {
    enabled,
    tokenThreshold,
    massiveThreshold: MASSIVE_PAYLOAD_TOKEN_THRESHOLD,
    maxRetries,
    burstCooldownMs,
  };
}

export function isExplicitTokenRateLimitError(
  status: number,
  errorText: string | null | undefined,
  provider?: string | null,
  model?: string | null
): boolean {
  if (status !== 429) return false;
  const text = String(errorText || "");

  if (provider === "gemini") {
    if (classifyGeminiQuotaMetricFromText(text) === "tpm") return true;
    if (model && isTpmExhausted(model)) return true;
  }

  return EXPLICIT_TPM_PATTERNS.some((pattern) => pattern.test(text));
}

export function evaluateAvalancheRisk(ctx: AvalancheEvaluationContext): AvalancheRiskResult {
  const settings = resolveAvalancheSettings(ctx.settings);
  const promptTokens =
    typeof ctx.promptTokens === "number" && ctx.promptTokens >= 0 ? ctx.promptTokens : 0;
  const attempt =
    typeof ctx.fallbackAttemptCount === "number" && ctx.fallbackAttemptCount >= 0
      ? ctx.fallbackAttemptCount
      : 0;
  const provider = ctx.provider || "unknown";
  const model = ctx.model || "unknown";

  if (!settings.enabled) {
    return {
      isAvalancheRisk: false,
      shouldSuppressFallback: false,
      suggestedCooldownMs: 0,
      promptTokens,
    };
  }

  // 1. HTTP 413: Payload Too Large
  if (ctx.status === 413) {
    return {
      isAvalancheRisk: true,
      reason: "payload_too_large",
      shouldSuppressFallback: true,
      suggestedCooldownMs: settings.burstCooldownMs,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Request rejected with HTTP 413 (Payload Too Large) for ${provider}/${model}. Cascading fallback suppressed.`,
    };
  }

  // 2. HTTP 400: Context length / overflow
  if (ctx.status === 400 && isContextOverflow400(ctx.errorText)) {
    return {
      isAvalancheRisk: true,
      reason: "context_length_exceeded",
      shouldSuppressFallback: true,
      suggestedCooldownMs: 0,
      promptTokens,
      explanation: `[OmniRoute Anti-Avalanche] Context length exceeded for ${provider}/${model}. Cascading fallback across same-model accounts suppressed.`,
    };
  }

  // 3. HTTP 429: Rate limited
  if (ctx.status === 429) {
    // 3a. Explicit TPM / Token Limit in error body or metric
    if (isExplicitTokenRateLimitError(ctx.status, ctx.errorText, ctx.provider, ctx.model)) {
      return {
        isAvalancheRisk: true,
        reason: "explicit_tpm_limit",
        shouldSuppressFallback: true,
        suggestedCooldownMs: settings.burstCooldownMs,
        promptTokens,
        explanation: `[OmniRoute Anti-Avalanche] Token rate limit (TPM/token count) hit for ${provider}/${model}. Cascading fallback suppressed across remaining keys to protect pool.`,
      };
    }

    // 3b. Massive payload (>= 100k tokens)
    if (promptTokens >= settings.massiveThreshold) {
      return {
        isAvalancheRisk: true,
        reason: "oversized_payload_rate_limit",
        shouldSuppressFallback: true,
        suggestedCooldownMs: settings.burstCooldownMs,
        promptTokens,
        explanation: `[OmniRoute Anti-Avalanche] Massive payload (~${promptTokens} tokens) hit rate limit on ${provider}/${model}. Cascading fallback suppressed to prevent key exhaustion.`,
      };
    }

    // 3c. Oversized payload (>= 50k tokens) with bounded retry limit
    if (promptTokens >= settings.tokenThreshold) {
      const shouldSuppress = attempt >= settings.maxRetries;
      return {
        isAvalancheRisk: true,
        reason: "oversized_payload_rate_limit",
        shouldSuppressFallback: shouldSuppress,
        suggestedCooldownMs: settings.burstCooldownMs,
        promptTokens,
        explanation: shouldSuppress
          ? `[OmniRoute Anti-Avalanche] Large payload (~${promptTokens} tokens) hit rate limit on ${provider}/${model} across ${attempt + 1} attempt(s). Cascading fallback suppressed.`
          : undefined,
      };
    }
  }

  return {
    isAvalancheRisk: false,
    shouldSuppressFallback: false,
    suggestedCooldownMs: 0,
    promptTokens,
  };
}

export function formatAntiAvalancheMessage(
  provider: string,
  model: string,
  promptTokens: number,
  reason: string,
  originalError?: string
): string {
  const base = `[OmniRoute Anti-Avalanche] Request to ${provider}/${model} (~${promptTokens.toLocaleString()} tokens) triggered a payload-induced rate limit (${reason}). Cascading fallback across remaining credentials was suppressed to preserve pool availability.`;
  const suggestion =
    provider === "gemini"
      ? ` Tip: Large context requests (>50k tokens) with deep agent history should be routed to 'agy/*' (Antigravity OAuth) which has higher burst token limits, or wait 60s for the TPM sliding window to reset.`
      : ` Tip: Consider reducing context size or waiting for rate limit window to clear.`;
  const upstream = originalError ? ` Upstream error: ${originalError}` : "";
  return `${base}${suggestion}${upstream}`;
}
