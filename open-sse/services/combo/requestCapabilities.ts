import { estimateTokens } from "../contextManager.ts";
import { getResolvedModelCapabilities } from "../modelCapabilities.ts";
import { isRecord } from "./comboData.ts";
import type { ComboLogger, ResolvedComboTarget } from "./types.ts";

type RequestCompatibilityRequirements = {
  requiresTools: boolean;
  requiresVision: boolean;
  requiresAudioInput: boolean;
  requiresAudioOutput: boolean;
  requiresStructuredOutput: boolean;
  estimatedInputTokens: number;
  requestedOutputTokens: number;
  requiredContextTokens: number;
};

type RejectedTarget = {
  target: ResolvedComboTarget;
  reasons: string[];
};

export type RequestCompatibilityEvaluation = {
  requirements: RequestCompatibilityRequirements;
  compatibleTargets: ResolvedComboTarget[];
  rejectedTargets: RejectedTarget[];
  needsFiltering: boolean;
  requestRejected: boolean;
  rejectionReason: string | null;
};

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

function requestRequiresAudioOutput(body: Record<string, unknown>): boolean {
  return Array.isArray(body.modalities) && body.modalities.some((entry) => entry === "audio");
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

function valueContainsAudioPart(value: unknown, depth = 0): boolean {
  if (depth > 8 || value === null || value === undefined) return false;
  if (typeof value === "string") return value.startsWith("data:audio/");
  if (Array.isArray(value)) return value.some((entry) => valueContainsAudioPart(entry, depth + 1));
  if (!isRecord(value)) return false;

  const type = typeof value.type === "string" ? value.type.toLowerCase() : null;
  if (type === "audio" || type === "input_audio" || type === "audio_url") return true;
  if ("audio_url" in value || "input_audio" in value || "audio" in value) return true;

  const source = isRecord(value.source) ? value.source : null;
  const mediaType = typeof source?.media_type === "string" ? source.media_type.toLowerCase() : "";
  if (mediaType.startsWith("audio/")) return true;

  return Object.values(value).some((entry) => valueContainsAudioPart(entry, depth + 1));
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
    requiresAudioInput: valueContainsAudioPart(body.messages) || valueContainsAudioPart(body.input),
    requiresAudioOutput: requestRequiresAudioOutput(body),
    requiresStructuredOutput: requestRequiresStructuredOutput(body),
    estimatedInputTokens,
    requestedOutputTokens,
    requiredContextTokens: estimatedInputTokens + requestedOutputTokens,
  };
}

function exceedsKnownOutputLimit(
  requestedOutputTokens: number,
  maxOutputTokens: number | null
): boolean {
  if (requestedOutputTokens <= 0 || maxOutputTokens === null) return false;
  return maxOutputTokens < requestedOutputTokens;
}

function targetSupportsAudioInput(
  capabilities: ReturnType<typeof getResolvedModelCapabilities>
): boolean {
  return capabilities.modalitiesInput.includes("audio");
}

function targetSupportsAudioOutput(
  capabilities: ReturnType<typeof getResolvedModelCapabilities>
): boolean {
  return capabilities.modalitiesOutput.includes("audio");
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

  // For image requests, only route to a target whose vision support is
  // confirmed. Unknown capability is treated as incompatible so the request
  // never falls through to a text-only model.
  if (requirements.requiresVision && capabilities.supportsVision !== true) {
    failures.push("vision");
  }

  if (requirements.requiresAudioInput && !targetSupportsAudioInput(capabilities)) {
    failures.push("audio_input");
  }

  if (requirements.requiresAudioOutput && !targetSupportsAudioOutput(capabilities)) {
    failures.push("audio_output");
  }

  if (requirements.requiresStructuredOutput && capabilities.structuredOutput === false) {
    failures.push("structured_output");
  }

  if (exceedsKnownOutputLimit(requirements.requestedOutputTokens, capabilities.maxOutputTokens)) {
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

function describeRequirement(requirements: RequestCompatibilityRequirements): string[] {
  const parts: string[] = [];
  if (requirements.requiresVision) parts.push("image input");
  if (requirements.requiresAudioInput) parts.push("audio input");
  if (requirements.requiresAudioOutput) parts.push("audio output");
  if (requirements.requiresTools) parts.push("tool calling");
  if (requirements.requiresStructuredOutput) parts.push("structured output");
  if (requirements.requestedOutputTokens > 0) {
    parts.push(`requested output tokens (${requirements.requestedOutputTokens})`);
  }
  if (requirements.requiredContextTokens > 0) {
    parts.push(`context window (${requirements.requiredContextTokens})`);
  }
  return parts;
}

function joinWithAnd(parts: string[]): string {
  if (parts.length <= 1) return parts[0] || "";
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

export function buildRequestCompatibilityRejectionReason(
  requirements: RequestCompatibilityRequirements
): string {
  const parts = describeRequirement(requirements);
  if (parts.length === 0) {
    return "No configured provider in this combo supports the request.";
  }
  return `No configured provider in this combo supports ${joinWithAnd(parts)}.`;
}

export function evaluateTargetsByRequestCompatibility(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>
): RequestCompatibilityEvaluation {
  const requirements = deriveRequestCompatibilityRequirements(body);
  if (targets.length === 0) {
    return {
      requirements,
      compatibleTargets: [],
      rejectedTargets: [],
      needsFiltering:
        requirements.requiresTools ||
        requirements.requiresVision ||
        requirements.requiresAudioInput ||
        requirements.requiresAudioOutput ||
        requirements.requiresStructuredOutput ||
        requirements.requiredContextTokens > 0,
      requestRejected: false,
      rejectionReason: null,
    };
  }
  const needsFiltering =
    requirements.requiresTools ||
    requirements.requiresVision ||
    requirements.requiresAudioInput ||
    requirements.requiresAudioOutput ||
    requirements.requiresStructuredOutput ||
    requirements.requiredContextTokens > 0;

  if (!needsFiltering) {
    return {
      requirements,
      compatibleTargets: targets,
      rejectedTargets: [],
      needsFiltering: false,
      requestRejected: false,
      rejectionReason: null,
    };
  }

  const rejectedTargets: RejectedTarget[] = [];
  const compatibleTargets = targets.filter((target) => {
    const reasons = getTargetCompatibilityFailures(target, requirements);
    if (reasons.length === 0) return true;
    rejectedTargets.push({ target, reasons });
    return false;
  });

  return {
    requirements,
    compatibleTargets,
    rejectedTargets,
    needsFiltering: true,
    requestRejected: compatibleTargets.length === 0,
    rejectionReason:
      compatibleTargets.length === 0
        ? buildRequestCompatibilityRejectionReason(requirements)
        : null,
  };
}

export function filterTargetsByRequestCompatibility(
  targets: ResolvedComboTarget[],
  body: Record<string, unknown>,
  log: ComboLogger,
  label = "Context-aware fallback"
): ResolvedComboTarget[] {
  if (targets.length === 0) return targets;

  const evaluation = evaluateTargetsByRequestCompatibility(targets, body);
  if (!evaluation.needsFiltering) return targets;

  const { compatibleTargets, rejectedTargets } = evaluation;
  if (compatibleTargets.length === targets.length) return targets;
  if (compatibleTargets.length === 0) {
    log.warn(
      "COMBO",
      `${label}: all ${targets.length} targets were filtered by request requirements; preserving strategy order`
    );
    log.debug?.(
      "COMBO",
      `${label}: rejected targets ${rejectedTargets
        .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
        .join(", ")}`
    );
    return targets;
  }

  log.info(
    "COMBO",
    `${label}: kept ${compatibleTargets.length}/${targets.length} targets for request requirements`
  );
  log.debug?.(
    "COMBO",
    `${label}: rejected targets ${rejectedTargets
      .map((entry) => `${entry.target.modelStr}(${entry.reasons.join("+")})`)
      .join(", ")}`
  );
  return compatibleTargets;
}
