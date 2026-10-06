/**
 * chatCore wire target-format resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure resolution of the provider alias + the upstream target format used to translate the request.
 * Model/custom overrides win first. A declared connection-level alternate protocol wins next. A
 * Responses-shaped inbound request otherwise keeps the Responses wire format, except for custom
 * OpenAI-compatible connections explicitly configured for Chat.
 * AgentRouter may inherit the inbound protocol when no explicit connection override exists.
 * Returns both `alias` (reused by the handler when stripping the `alias/` prefix off the upstream
 * model id) and `targetFormat`.
 */

import { PROVIDER_ID_TO_ALIAS, getModelTargetFormat } from "../../config/providerModels.ts";
import { getRegistryEntry } from "../../config/providerRegistry.ts";
import { resolveAlternateFormat } from "../../config/providers/alternateFormats.ts";
import { getTargetFormat } from "../../services/provider.ts";
import { FORMATS } from "../../translator/formats.ts";

export function resolveChatCoreTargetFormat(opts: {
  provider: string;
  resolvedModel: string;
  apiFormat: string | undefined;
  sourceFormat?: string;
  customModelTargetFormat: string | undefined;
  providerSpecificData: unknown;
  nativeXaiResponsesPassthrough?: boolean;
  nativeOpenAICompatibleResponsesPassthrough?: boolean;
}) {
  const {
    provider,
    resolvedModel,
    apiFormat,
    sourceFormat,
    customModelTargetFormat,
    providerSpecificData,
    nativeXaiResponsesPassthrough = false,
    nativeOpenAICompatibleResponsesPassthrough = false,
  } = opts;
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const explicitConnectionTargetFormat = (
    providerSpecificData as { targetFormat?: unknown } | null | undefined
  )?.targetFormat;
  const inferredAgentRouterTargetFormat =
    provider === "agentrouter" &&
    !(typeof explicitConnectionTargetFormat === "string" && explicitConnectionTargetFormat) &&
    (sourceFormat === FORMATS.OPENAI_RESPONSES ||
      sourceFormat === FORMATS.OPENAI ||
      sourceFormat === FORMATS.CLAUDE)
      ? sourceFormat
      : undefined;
  const providerTargetFormat = getTargetFormat(provider, providerSpecificData);
  const declaredConnectionAlternate = resolveAlternateFormat(
    getRegistryEntry(provider),
    providerSpecificData
  );
  const customOpenAICompatible = provider.startsWith("openai-compatible-");
  // #8994: model-level targetFormat overrides (from registry or custom-model DB override)
  // take precedence over apiFormat="responses" — otherwise Vertex Claude models with
  // targetFormat="claude" get wrongly routed to OpenAI Responses format.
  // #9161: a custom OpenAI-compatible Chat connection must likewise keep its configured
  // outbound protocol when a Responses-shaped client (for example Codex) calls /responses.
  // Registry-declared connection alternates are equally explicit: a DeepSeek connection set to
  // Anthropic must stay on /anthropic/v1/messages even when the caller speaks Responses.
  let targetFormat =
    modelTargetFormat ||
    customModelTargetFormat ||
    declaredConnectionAlternate?.format ||
    (apiFormat === "responses" && !customOpenAICompatible
      ? FORMATS.OPENAI_RESPONSES
      : inferredAgentRouterTargetFormat || providerTargetFormat);
  if (nativeXaiResponsesPassthrough || nativeOpenAICompatibleResponsesPassthrough) {
    targetFormat = FORMATS.OPENAI_RESPONSES;
  }
  return { alias, targetFormat };
}

export type ChatCoreTargetFormat = ReturnType<typeof resolveChatCoreTargetFormat>;
