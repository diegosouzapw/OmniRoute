/**
 * chatCore per-model upstream extra-header builder (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure builder extracted from handleChatCore: assembles the per-model upstream extra headers for an
 * execute() call. Merges the configured per-model headers (for the resolved model and its alias),
 * applies a connection's custom User-Agent override, and opts into Claude Fast Mode (CPA bridge
 * header) when enabled in settings for the canonical `claude` provider and a supported model.
 * Side-effect-free; behaviour is byte-identical to the previous inline closure.
 */

import { getModelUpstreamExtraHeaders } from "@/lib/db/models";
import { resolveModelAlias } from "../../services/modelDeprecation.ts";
import {
  CPA_FORCE_FAST_MODE_HEADER,
  shouldRequestClaudeFastMode,
} from "@/lib/providers/claudeFastMode";

export function buildUpstreamHeadersForExecute(opts: {
  modelToCall: string;
  effectiveModel: string;
  provider: string | null | undefined;
  model: string | null | undefined;
  resolvedModel: string;
  sourceFormat: string;
  connectionCustomUserAgent: string;
  settings: unknown;
}): Record<string, string> {
  const {
    modelToCall,
    effectiveModel,
    provider,
    model,
    resolvedModel,
    sourceFormat,
    connectionCustomUserAgent,
    settings,
  } = opts;

  const upstreamHeaders: Record<string, string> =
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

  // Claude Fast Mode opt-in. When enabled in Settings > AI AND the target provider is the canonical
  // Anthropic `claude` provider (Claude Code-compatible CPA bridges are excluded since they select
  // their own entrypoint) AND the model id matches the configured list, signal to a paired
  // CLIProxyAPI build to rewrite the cc_entrypoint so the request reaches Anthropic Fast Mode.
  if (
    provider === "claude" &&
    typeof settings !== "undefined" &&
    shouldRequestClaudeFastMode(settings, modelToCall)
  ) {
    upstreamHeaders[CPA_FORCE_FAST_MODE_HEADER] = "1";
  }

  return upstreamHeaders;
}
