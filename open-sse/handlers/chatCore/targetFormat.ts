/**
 * chatCore wire target-format resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure resolution of the provider alias + the upstream target format used to translate the request:
 * apiFormat==="responses" forces OpenAI Responses; otherwise the model's registry target format, then
 * the per-model custom override (#2905), then the provider default. Returns both `alias` (reused by
 * the handler when stripping the `alias/` prefix off the upstream model id) and `targetFormat`.
 * Side-effect-free; byte-identical to the previous inline block. Sits alongside the other
 * request-setup resolvers (resolveChatCoreRequestSetup / resolveChatCoreRequestFormat).
 */

import { PROVIDER_ID_TO_ALIAS, getModelTargetFormat } from "../../config/providerModels.ts";
import { getTargetFormat } from "../../services/provider.ts";
import { FORMATS } from "../../translator/formats.ts";

export function resolveChatCoreTargetFormat(opts: {
  provider: string;
  resolvedModel: string;
  apiFormat: string | undefined;
  customModelTargetFormat: string | undefined;
  providerSpecificData: unknown;
}) {
  const { provider, resolvedModel, apiFormat, customModelTargetFormat, providerSpecificData } =
    opts;
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat =
    apiFormat === "responses"
      ? FORMATS.OPENAI_RESPONSES
      : modelTargetFormat ||
        customModelTargetFormat ||
        getTargetFormat(provider, providerSpecificData);
  return { alias, targetFormat };
}

export type ChatCoreTargetFormat = ReturnType<typeof resolveChatCoreTargetFormat>;
