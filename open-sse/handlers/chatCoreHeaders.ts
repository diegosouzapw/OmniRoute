/**
 * Phase 4 (partial) — Build upstream headers for the provider request.
 *
 * Merges model-specific upstream headers, connection custom user-agent,
 * and Claude Fast Mode opt-in header.
 */

import { getModelUpstreamExtraHeaders } from "@/lib/localDb";
import { shouldRequestClaudeFastMode, CPA_FORCE_FAST_MODE_HEADER } from "@/lib/providers/claudeFastMode";
import { resolveModelAlias } from "../services/modelDeprecation.ts";

type BuildUpstreamHeadersInput = {
  modelToCall: string;
  effectiveModel: string;
  provider: string | null;
  model: string | null;
  resolvedModel: string;
  sourceFormat: string;
  connectionCustomUserAgent: string;
  settings: Record<string, unknown> | undefined;
};

export function buildUpstreamHeadersForExecute(
  input: BuildUpstreamHeadersInput
): Record<string, string> {
  const {
    modelToCall,
    effectiveModel,
    provider,
    model,
    resolvedModel,
    sourceFormat,
    connectionCustomUserAgent,
    settings,
  } = input;

  const upstreamHeaders =
    modelToCall === effectiveModel
      ? {
          ...getModelUpstreamExtraHeaders(provider || "", model || "", sourceFormat),
          ...getModelUpstreamExtraHeaders(provider || "", resolvedModel || "", sourceFormat),
        }
      : (() => {
          const r = resolveModelAlias(modelToCall);
          return {
            ...getModelUpstreamExtraHeaders(provider || "", modelToCall || "", sourceFormat),
            ...getModelUpstreamExtraHeaders(provider || "", r || "", sourceFormat),
          };
        })();

  if (connectionCustomUserAgent) {
    upstreamHeaders["User-Agent"] = connectionCustomUserAgent;
    if ("user-agent" in upstreamHeaders) {
      upstreamHeaders["user-agent"] = connectionCustomUserAgent;
    }
  }

  // Claude Fast Mode opt-in
  if (
    provider === "claude" &&
    typeof settings !== "undefined" &&
    shouldRequestClaudeFastMode(settings, modelToCall)
  ) {
    upstreamHeaders[CPA_FORCE_FAST_MODE_HEADER] = "1";
  }

  return upstreamHeaders;
}
