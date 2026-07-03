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

type MediaPartOptions = {
  dataPrefix: string;
  mediaPrefix: string;
  typeNames: Set<string>;
  keyNames: string[];
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

function recordHasMediaMarker(value: Record<string, unknown>, options: MediaPartOptions): boolean {
  const type = typeof value.type === "string" ? value.type.toLowerCase() : null;
  if (type !== null && options.typeNames.has(type)) return true;
  return options.keyNames.some((key) => key in value);
}

function recordHasSourceMediaType(
  value: Record<string, unknown>,
  options: MediaPartOptions
): boolean {
  const source = isRecord(value.source) ? value.source : null;
  const mediaType = typeof source?.media_type === "string" ? source.media_type.toLowerCase() : "";
  return mediaType.startsWith(options.mediaPrefix);
}

function valueContainsMediaPart(value: unknown, options: MediaPartOptions, depth = 0): boolean {
  if (depth > 8 || value === null || value === undefined) return false;
  if (typeof value === "string") return value.startsWith(options.dataPrefix);
  if (Array.isArray(value)) {
    return value.some((entry) => valueContainsMediaPart(entry, options, depth + 1));
  }
  if (!isRecord(value)) return false;
  if (recordHasMediaMarker(value, options)) return true;
  if (recordHasSourceMediaType(value, options)) return true;
  return Object.values(value).some((entry) => valueContainsMediaPart(entry, options, depth + 1));
}

const IMAGE_PART_OPTIONS: MediaPartOptions = {
  dataPrefix: "data:image/",
  mediaPrefix: "image/",
  typeNames: new Set(["image", "image_url", "input_image"]),
  keyNames: ["image_url", "input_image"],
};

const AUDIO_PART_OPTIONS: MediaPartOptions = {
  dataPrefix: "data:audio/",
  mediaPrefix: "audio/",
  typeNames: new Set(["audio", "input_audio", "audio_url"]),
  keyNames: ["audio_url", "input_audio", "audio"],
};

function valueContainsImagePart(value: unknown): boolean {
  return valueContainsMediaPart(value, IMAGE_PART_OPTIONS);
}

function valueContainsAudioPart(value: unknown): boolean {
  return valueContainsMediaPart(value, AUDIO_PART_OPTIONS);
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

function pushCapabilityFailures(
  failures: string[],
  capabilities: ReturnType<typeof getResolvedModelCapabilities>,
  requirements: RequestCompatibilityRequirements
): void {
  if (requirements.requiresVision && capabilities.supportsVision !== true) failures.push("vision");
  if (requirements.requiresStructuredOutput && capabilities.structuredOutput === false) {
    failures.push("structured_output");
  }
}

function pushAudioFailures(
  failures: string[],
  capabilities: ReturnType<typeof getResolvedModelCapabilities>,
  requirements: RequestCompatibilityRequirements
): void {
  if (requirements.requiresAudioInput && !targetSupportsAudioInput(capabilities)) {
    failures.push("audio_input");
  }
  if (requirements.requiresAudioOutput && !targetSupportsAudioOutput(capabilities)) {
    failures.push("audio_output");
  }
}

function pushTokenFailures(
  failures: string[],
  capabilities: ReturnType<typeof getResolvedModelCapabilities>,
  requirements: RequestCompatibilityRequirements
): void {
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
  pushCapabilityFailures(failures, capabilities, requirements);
  pushAudioFailures(failures, capabilities, requirements);
  pushTokenFailures(failures, capabilities, requirements);

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
