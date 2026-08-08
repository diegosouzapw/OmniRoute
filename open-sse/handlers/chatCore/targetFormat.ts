/**
 * chatCore wire target-format resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure resolution of the provider alias + the upstream target format used to translate the request:
 * apiFormat==="responses" forces OpenAI Responses; otherwise the model's registry target format, then
 * the per-model custom override (#2905), then AgentRouter's matching inbound protocol when the
 * connection has no explicit override, then the provider default. Returns both `alias` (reused by
 * the handler when stripping the `alias/` prefix off the upstream model id) and `targetFormat`.
 * Side-effect-free; sits alongside the other request-setup resolvers
 * (resolveChatCoreRequestSetup / resolveChatCoreRequestFormat).
 */

import { PROVIDER_ID_TO_ALIAS, getModelTargetFormat } from "../../config/providerModels.ts";
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
}) {
  const {
    provider,
    resolvedModel,
    apiFormat,
    sourceFormat,
    customModelTargetFormat,
    providerSpecificData,
    nativeXaiResponsesPassthrough = false,
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
  // #8994: model-level targetFormat overrides (from registry or custom-model DB override)
  // take precedence over apiFormat="responses" — otherwise Vertex Claude models with
  // targetFormat="claude" get wrongly routed to OpenAI Responses format.
  let targetFormat =
    modelTargetFormat ||
    customModelTargetFormat ||
    (apiFormat === "responses"
      ? FORMATS.OPENAI_RESPONSES
      : inferredAgentRouterTargetFormat || getTargetFormat(provider, providerSpecificData));
  if (nativeXaiResponsesPassthrough) targetFormat = FORMATS.OPENAI_RESPONSES;
  return { alias, targetFormat };
}

export type ChatCoreTargetFormat = ReturnType<typeof resolveChatCoreTargetFormat>;
