/**
 * Shared combo (model combo) handling with fallback support
 * Supports: priority, weighted, round-robin, random, least-used, cost-optimized,
 * reset-aware, reset-window, strict-random, auto, fill-first, p2c, lkgp,
 * context-optimized, and context-relay strategies
 */

import {
  checkFallbackError,
  classifyErrorText,
  formatRetryAfter,
  getRuntimeProviderProfile,
  recordProviderFailure,
  isProviderFailureCode,
  isProviderExhaustedReason,
  type ProviderProfile,
} from "../accountFallback.ts";

import { FETCH_TIMEOUT_MS, RateLimitReason } from "../../config/constants.ts";

import { clamp01 } from "../../utils/number.ts";

import {
  classifyWithConfig,
  DEFAULT_INTENT_CONFIG,
  type IntentClassifierConfig,
} from "../intentClassifier.ts";

import {
  getResolvedModelCapabilities,
  supportsReasoning,
  supportsToolCalling,
} from "../modelCapabilities.ts";

import { estimateTokens } from "../contextManager.ts";

import { getSessionConnection } from "../sessionManager.ts";

import { getProviderModels } from "../../config/providerModels.ts";

import {
  resolveResilienceSettings,
  type ResilienceSettings,
} from "../../../src/lib/resilience/settings";

import { isRecord, toTextContent, toStringArray } from "./utils.ts";
import { RequestCompatibilityRequirements, ResolvedComboTarget, ComboLogger, ComboLike } from "./types.ts";
import { DEFAULT_MODEL_P95_MS } from "./constants.ts";



function getPositiveTokenCount(value: unknown): number {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.ceil(count) : 0;
}



function requestRequiresTools(body: Record<string, unknown>): boolean {
  if (Array.isArray(body.tools) && body.tools.length > 0) return true;
  if (Array.isArray(body.functions) && body.functions.length > 0) return true;
  return false;
}



function requestRequiresStructuredOutput(body: Record<string, unknown>): boolean {
  const responseFormat = isRecord(body.response_format) ? body.response_format : null;
  const type = typeof responseFormat?.type === "string" ? responseFormat.type : null;
  return type === "json_object" || type === "json_schema";
}



function estimateRequestInputTokens(body: Record<string, unknown>): number {
  const estimatePayload: Record<string, unknown> = {};
  for (const key of ["messages", "input", "tools", "functions", "response_format"]) {
    if (body[key] !== undefined) estimatePayload[key] = body[key];
  }
  return Object.keys(estimatePayload).length > 0 ? estimateTokens(estimatePayload) : 0;
}



function valueContainsImagePart(value: unknown, depth = 0): boolean {
  if (depth > 8 || value === null || value === undefined) return false;
  if (typeof value === "string") return value.startsWith("data:image/");
  if (Array.isArray(value)) return value.some((entry) => valueContainsImagePart(entry, depth + 1));
  if (!isRecord(value)) return false;

  const type = typeof value.type === "string" ? value.type.toLowerCase() : null;
  if (type === "image" || type === "image_url" || type === "input_image") return true;
  if ("image_url" in value || "input_image" in value) return true;

  const source = isRecord(value.source) ? value.source : null;
  const mediaType = typeof source?.media_type === "string" ? source.media_type.toLowerCase() : "";
  if (mediaType.startsWith("image/")) return true;

  return Object.values(value).some((entry) => valueContainsImagePart(entry, depth + 1));
}



function deriveRequestCompatibilityRequirements(
  body: Record<string, unknown>
): RequestCompatibilityRequirements {
  const estimatedInputTokens = estimateRequestInputTokens(body);
  const requestedOutputTokens = Math.max(
    getPositiveTokenCount(body.max_tokens),
    getPositiveTokenCount(body.max_completion_tokens)
  );
  return {
    requiresTools: requestRequiresTools(body),
    requiresVision: valueContainsImagePart(body.messages) || valueContainsImagePart(body.input),
    requiresStructuredOutput: requestRequiresStructuredOutput(body),
    estimatedInputTokens,
    requestedOutputTokens,
    requiredContextTokens: estimatedInputTokens + requestedOutputTokens,
  };
}



function getTargetCompatibilityFailures(
  target: ResolvedComboTarget,
  requirements: RequestCompatibilityRequirements
): string[] {
  const capabilities = getResolvedModelCapabilities(target.modelStr);
  const failures: string[] = [];

  if (
    requirements.requiresTools &&
    (capabilities.supportsTools === false || !capabilities.toolCalling)
  ) {
    failures.push("tools");
  }

  if (requirements.requiresVision && capabilities.supportsVision === false) {
    failures.push("vision");
  }

  if (requirements.requiresStructuredOutput && capabilities.structuredOutput === false) {
    failures.push("structured_output");
  }

  if (
    requirements.requestedOutputTokens > 0 &&
    Number.isFinite(capabilities.maxOutputTokens) &&
    capabilities.maxOutputTokens < requirements.requestedOutputTokens
  ) {
    failures.push("output_tokens");
  }

  const contextLimit = capabilities.maxInputTokens ?? capabilities.contextWindow ?? null;
  if (
    requirements.requiredContextTokens > 0 &&
    contextLimit !== null &&
    contextLimit !== undefined &&
    contextLimit < requirements.requiredContextTokens
  ) {
    failures.push("context_window");
  }

  return failures;
}



export function filterTargetsByRequestCompatibility(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  log: ComboLogger,
  label = "Context-aware fallback"
): ResolvedComboTarget[] {
  if (targets.length === 0) return targets;
  const requirements = deriveRequestCompatibilityRequirements(body);
  const needsFiltering =
    requirements.requiresTools ||
    requirements.requiresVision ||
    requirements.requiresStructuredOutput ||
    requirements.requiredContextTokens > 0;
  if (!needsFiltering) return targets;

  const rejected: Array<{ target: ResolvedComboTarget; reasons: string[] }> = [];
  const compatible = targets.filter((target) => {
    const reasons = getTargetCompatibilityFailures(target, requirements);
    if (reasons.length === 0) return true;
    rejected.push({ target, reasons });
    return false;
  });

  if (compatible.length === targets.length) return targets;
  if (compatible.length === 0) {
    log.warn(
      "COMBO",
      `${label}: all ${targets.length} targets were filtered by request requirements; preserving strategy order`
    );
    log.debug?.(
      "COMBO",
      `${label}: rejected targets ${rejected
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );
    return targets;
  }

  log.info(
    "COMBO",
    `${label}: kept ${compatible.length}/${targets.length} targets for request requirements`
  );
  log.debug?.(
    "COMBO",
    `${label}: rejected targets ${rejected
      .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
      .join(", ")}`
  );
  return compatible;
}



export function extractPromptForIntent(body: Record<string, unknown> | null | undefined): string {
  if (!body || typeof body !== "object") return "";

  const fromMessages = Array.isArray(body.messages)
    ? [...body.messages].reverse().find((m) => isRecord(m) && m.role === "user")
    : null;
  if (isRecord(fromMessages)) return toTextContent(fromMessages.content);

  if (typeof body.input === "string") return body.input;
  if (Array.isArray(body.input)) {
    const text = body.input
      .map((item) => {
        if (!isRecord(item)) return "";
        if (typeof item.content === "string") return item.content;
        if (typeof item.text === "string") return item.text;
        return "";
      })
      .filter(Boolean)
      .join("\n");
    if (text) return text;
  }

  if (typeof body.prompt === "string") return body.prompt;
  return "";
}



export function mapIntentToTaskType(intent: string): "coding" | "analysis" | "default" {
  switch (intent) {
    case "code":
      return "coding";
    case "reasoning":
      return "analysis";
    case "simple":
      return "default";
    case "medium":
    default:
      return "default";
  }
}



export function calculateTargetContextAffinity(
  target: ResolvedComboTarget,
  sessionId: string | null | undefined
): number {
  const sessionConnectionId = getSessionConnection(sessionId || null);
  if (!sessionConnectionId) return 0.5;
  if (target.connectionId === sessionConnectionId) return 1;
  if (!target.connectionId) return 0.5;
  return 0.1;
}



export function getIntentConfig(
  settings: Record<string, unknown> | null | undefined,
  combo: ComboLike
): IntentClassifierConfig {
  const resolvedSettings = settings || {};
  const comboAutoConfig = combo?.autoConfig || {};
  const comboConfigAuto = isRecord(combo?.config?.auto) ? combo.config.auto : {};
  const comboIntentConfig =
    (isRecord(comboAutoConfig.intentConfig) && comboAutoConfig.intentConfig) ||
    (isRecord(comboConfigAuto.intentConfig) && comboConfigAuto.intentConfig) ||
    (isRecord(combo?.config?.intentConfig) && combo.config.intentConfig) ||
    {};

  return {
    ...DEFAULT_INTENT_CONFIG,
    ...comboIntentConfig,
    ...(typeof resolvedSettings.intentDetectionEnabled === "boolean"
      ? { enabled: resolvedSettings.intentDetectionEnabled }
      : {}),
    ...(Number.isFinite(Number(resolvedSettings.intentSimpleMaxWords))
      ? { simpleMaxWords: Number(resolvedSettings.intentSimpleMaxWords) }
      : {}),
    ...(toStringArray(resolvedSettings.intentExtraCodeKeywords).length > 0
      ? { extraCodeKeywords: toStringArray(resolvedSettings.intentExtraCodeKeywords) }
      : {}),
    ...(toStringArray(resolvedSettings.intentExtraReasoningKeywords).length > 0
      ? { extraReasoningKeywords: toStringArray(resolvedSettings.intentExtraReasoningKeywords) }
      : {}),
    ...(toStringArray(resolvedSettings.intentExtraSimpleKeywords).length > 0
      ? { extraSimpleKeywords: toStringArray(resolvedSettings.intentExtraSimpleKeywords) }
      : {}),
  };
}



export function getBootstrapLatencyMs(modelId: string): number {
  const normalized = String(modelId || "").toLowerCase();
  return DEFAULT_MODEL_P95_MS[normalized] ?? 1500;
}

