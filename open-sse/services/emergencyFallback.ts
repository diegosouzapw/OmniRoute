/**
 * Emergency Fallback — Budget Exhaustion Redirect
 *
 * When a request fails due to budget exhaustion (HTTP 402 or budget keywords
 * in the error body), optionally redirect to a free-tier model
 * (default provider/model: nvidia + openai/gpt-oss-120b at $0.00/M tokens).
 *
 * Inspired by ClawRouter: "gpt-oss-120b costs nothing and serves as
 * automatic fallback when wallet is empty."
 *
 * Operators can disable the redirect entirely with
 * `OMNIROUTE_EMERGENCY_FALLBACK=false` (or `0`). Default remains enabled.
 */

import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

export interface EmergencyFallbackConfig {
  enabled: boolean;
  provider: string;
  model: string;
  triggerOn402: boolean;
  triggerOnBudgetKeywords: boolean;
  budgetKeywords: string[];
  /** Skip fallback for tool requests (gpt-oss-120b may not support structured tool calling) */
  skipForToolRequests: boolean;
  maxOutputTokens: number;
}

export const EMERGENCY_FALLBACK_CONFIG: EmergencyFallbackConfig = {
  enabled: true,
  provider: "nvidia",
  model: "openai/gpt-oss-120b",
  triggerOn402: true,
  triggerOnBudgetKeywords: true,
  budgetKeywords: [
    "insufficient funds",
    "insufficient_funds",
    "budget exceeded",
    "budget_exceeded",
    "quota exceeded",
    "quota_exceeded",
    "billing",
    "payment required",
    "out of credits",
    "no credits",
    "credit limit",
    "spending limit",
    "saldo insuficiente",
    "limite de gastos",
    "cota excedida",
  ],
  skipForToolRequests: true,
  maxOutputTokens: 4096,
};

export interface FallbackDecision {
  shouldFallback: true;
  reason: string;
  provider: string;
  model: string;
  maxOutputTokens: number;
}

export interface NoFallbackDecision {
  shouldFallback: false;
  reason: string;
}

export type FallbackResult = FallbackDecision | NoFallbackDecision;

function isEmergencyFallbackRawEnvEnabled(): boolean {
  const raw = process.env.OMNIROUTE_EMERGENCY_FALLBACK;
  return raw !== "false" && raw !== "0";
}

export function isEmergencyFallbackEnvEnabled(): boolean {
  try {
    return isFeatureFlagEnabled("OMNIROUTE_EMERGENCY_FALLBACK");
  } catch {
    return isEmergencyFallbackRawEnvEnabled();
  }
}

export function shouldUseFallback(
  status: number,
  errorBody: string,
  requestHasTools: boolean,
  config: EmergencyFallbackConfig = EMERGENCY_FALLBACK_CONFIG
): FallbackResult {
  if (!config.enabled) return { shouldFallback: false, reason: "emergency fallback disabled" };
  if (!isEmergencyFallbackEnvEnabled()) {
    return {
      shouldFallback: false,
      reason: "emergency fallback disabled via OMNIROUTE_EMERGENCY_FALLBACK",
    };
  }
  if (config.skipForToolRequests && requestHasTools) {
    return { shouldFallback: false, reason: "skipped: request has tools" };
  }
  if (config.triggerOn402 && status === 402) {
    return {
      shouldFallback: true,
      reason: `HTTP 402 → emergency fallback to ${config.provider}/${config.model}`,
      provider: config.provider,
      model: config.model,
      maxOutputTokens: config.maxOutputTokens,
    };
  }
  if (config.triggerOnBudgetKeywords && errorBody) {
    const lowerBody = errorBody.toLowerCase();
    const matched = config.budgetKeywords.find((kw) => lowerBody.includes(kw.toLowerCase()));
    if (matched) {
      return {
        shouldFallback: true,
        reason: `Budget error detected ('${matched}') → emergency fallback to ${config.provider}/${config.model}`,
        provider: config.provider,
        model: config.model,
        maxOutputTokens: config.maxOutputTokens,
      };
    }
  }
  return { shouldFallback: false, reason: "no budget error detected" };
}

export function isFallbackDecision(result: FallbackResult): result is FallbackDecision {
  return result.shouldFallback === true;
}
