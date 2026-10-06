/**
 * Layer A capability filter — shared, provider-agnostic module.
 *
 * Validates that a provider+model can satisfy the request's capability
 * requirements (tools, vision, structured output, context window) BEFORE
 * dispatch to the executor. Returns an early 400 if not, rather than
 * letting the request fail downstream or produce garbage (e.g. a text-only
 * model receiving image_url content and answering "image not provided").
 *
 * The logic mirrors what `filterTargetsByRequestCompatibility` in
 * comboStructure.ts already does for combo-routed requests, but this
 * module lives at the router layer (Layer A) so it also protects direct
 * single-provider requests (`model:"openai/gpt-4o-mini"` without a combo).
 *
 * #5696
 */

import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { evaluateContextLimit } from "@omniroute/open-sse/services/combo/contextOverrideGate";
import { isRecord } from "@omniroute/open-sse/services/combo/comboData";
import {
  hasEstimableContent,
  providerSupportsEmulatedToolCalling,
} from "@omniroute/open-sse/services/combo/comboStructure";
import { estimateTokens } from "@omniroute/open-sse/services/contextManager";

// ── Types ─────────────────────────────────────────────────────────────────

export type CapabilityFailure = "tools" | "vision" | "structured_output" | "context_window";

export interface RequestCapabilityRequirements {
  requiresTools: boolean;
  requiresVision: boolean;
  requiresStructuredOutput: boolean;
  requiredContextTokens: number;
  toolCount: number;
}

export interface CapabilityFilterResult {
  compatible: boolean;
  failures: CapabilityFailure[];
  terminalReason?: string;
}

// ── Pure helpers (mirror the unexported helpers in comboStructure.ts) ──────

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
    if (hasEstimableContent(body[key])) estimatePayload[key] = body[key];
  }
  return Object.keys(estimatePayload).length > 0 ? estimateTokens(estimatePayload) : 0;
}

function getPositiveTokenCount(value: unknown): number {
  const count = Number(value);
  return Number.isFinite(count) && count > 0 ? Math.ceil(count) : 0;
}

function isMediaTypeImage(value: Record<string, unknown>): boolean {
  const source = isRecord(value.source) ? value.source : null;
  const mediaType = typeof source?.media_type === "string" ? source.media_type.toLowerCase() : "";
  return mediaType.startsWith("image/");
}

function valueContainsImagePart(value: unknown, depth = 0): boolean {
  if (depth > 8 || value === null || value === undefined) return false;
  if (typeof value === "string") return value.startsWith("data:image/");
  if (Array.isArray(value)) return value.some((entry) => valueContainsImagePart(entry, depth + 1));
  if (!isRecord(value)) return false;

  if (valueContainsImageType(value)) return true;
  if (isMediaTypeImage(value)) return true;

  return Object.values(value).some((entry) => valueContainsImagePart(entry, depth + 1));
}

function isContextOverflow(
  capabilities: { maxInputTokens: number | null; contextWindow: number | null },
  requirements: { requiredContextTokens: number }
): boolean {
  return (
    evaluateContextLimit(
      { maxInputTokens: capabilities.maxInputTokens, contextWindow: capabilities.contextWindow },
      {
        estimatedInputTokens: requirements.requiredContextTokens,
        requiredContextTokens: requirements.requiredContextTokens,
      }
    ) === false
  );
}

function valueContainsImageType(value: Record<string, unknown>): boolean {
  const type = typeof value.type === "string" ? value.type.toLowerCase() : null;
  if (type === "image" || type === "image_url" || type === "input_image") return true;
  if ("image_url" in value || "input_image" in value) return true;
  return false;
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Derive capability requirements from a request body.
 * Mirrors `deriveRequestCompatibilityRequirements` in comboStructure.ts.
 */
export function deriveRequestCapabilityRequirements(
  body: Record<string, unknown>
): RequestCapabilityRequirements {
  const estimatedInputTokens = estimateRequestInputTokens(body);
  const requestedOutputTokens = Math.max(
    getPositiveTokenCount(body.max_tokens),
    getPositiveTokenCount(body.max_completion_tokens)
  );
  return {
    requiresTools: requestRequiresTools(body),
    requiresVision: valueContainsImagePart(body.messages) || valueContainsImagePart(body.input),
    requiresStructuredOutput: requestRequiresStructuredOutput(body),
    requiredContextTokens: estimatedInputTokens + requestedOutputTokens,
    toolCount: Array.isArray(body.tools) ? body.tools.length : 0,
  };
}

/**
 * Build a human-readable error message for a capability mismatch.
 * Mirrors the i18n keys: capabilityFilter.visionMismatch / toolsMismatch / etc.
 */
export function buildCapabilityMismatchMessage(
  terminalReason: string,
  provider: string | null,
  model: string | null
): string {
  const msgs: Record<string, string> = {
    vision: `Provider '${provider}' does not support vision for this image request`,
    tools: `Provider '${provider}' does not support tool calling`,
    structured_output: `Provider '${provider}' does not support structured output`,
    context_window: `Request exceeds the context window for ${provider}/${model}`,
  };
  return (
    msgs[terminalReason] || `Provider '${provider}' does not support the required capabilities`
  );
}

/**
 * Check whether a model's capabilities satisfy the request requirements.
 *
 * @param capabilities - Resolved model capabilities (from getResolvedModelCapabilities)
 * @param requirements - Request capability requirements
 * @param provider - Provider id or alias (needed for emulated-tool-calling bypass)
 * @returns CapabilityFilterResult with compatibility verdict and failure details
 */
function collectCapabilityFailures(
  capabilities: Record<string, unknown>,
  requirements: RequestCapabilityRequirements,
  provider?: string | null
): CapabilityFailure[] {
  const failures: CapabilityFailure[] = [];
  const caps = capabilities as {
    supportsTools: boolean | null;
    toolCalling: boolean;
    supportsVision: boolean | null;
    structuredOutput: boolean | null;
    contextWindow: number | null;
    maxInputTokens: number | null;
    maxOutputTokens: number | null;
  };

  if (
    requirements.requiresTools &&
    (caps.supportsTools === false || !caps.toolCalling) &&
    !providerSupportsEmulatedToolCalling(provider)
  ) {
    failures.push("tools");
  }
  if (requirements.requiresVision && caps.supportsVision !== true) {
    failures.push("vision");
  }
  if (requirements.requiresStructuredOutput && caps.structuredOutput === false) {
    failures.push("structured_output");
  }
  if (requirements.requiredContextTokens > 0 && isContextOverflow(caps, requirements)) {
    failures.push("context_window");
  }
  return failures;
}

function primaryFailure(failures: CapabilityFailure[]): CapabilityFailure {
  if (failures.includes("vision")) return "vision";
  if (failures.includes("tools")) return "tools";
  if (failures.includes("structured_output")) return "structured_output";
  return "context_window";
}

export function checkRequestCapabilityFit(
  capabilities: {
    supportsTools: boolean | null;
    toolCalling: boolean;
    supportsVision: boolean | null;
    structuredOutput: boolean | null;
    contextWindow: number | null;
    maxInputTokens: number | null;
    maxOutputTokens: number | null;
  },
  requirements: RequestCapabilityRequirements,
  provider?: string | null
): CapabilityFilterResult {
  const failures = collectCapabilityFailures(
    capabilities as Record<string, unknown>,
    requirements,
    provider
  );
  if (failures.length === 0) {
    return { compatible: true, failures: [] };
  }
  return { compatible: false, failures, terminalReason: primaryFailure(failures) };
}
