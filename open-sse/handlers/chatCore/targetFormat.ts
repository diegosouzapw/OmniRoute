/**
 * chatCore wire target-format resolver (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure resolution of the provider alias + the upstream target format used to translate the request.
 * The inbound API shape does not determine the outbound protocol: the model registry target format,
 * per-model custom override (#2905), and provider configuration take precedence. This lets a
 * Responses-shaped client request be translated to a Chat Completions-compatible upstream while
 * preserving native Responses providers configured with an OpenAI Responses target.
 * Returns both `alias` (reused by the handler when stripping the `alias/` prefix off the upstream
 * model id) and `targetFormat`.
 */

import { PROVIDER_ID_TO_ALIAS, getModelTargetFormat } from "../../config/providerModels.ts";
import { getTargetFormat } from "../../services/provider.ts";

export function resolveChatCoreTargetFormat(opts: {
  provider: string;
  resolvedModel: string;
  apiFormat: string | undefined;
  customModelTargetFormat: string | undefined;
  providerSpecificData: unknown;
}) {
  const { provider, resolvedModel, customModelTargetFormat, providerSpecificData } = opts;
  const alias = PROVIDER_ID_TO_ALIAS[provider] || provider;
  const modelTargetFormat = getModelTargetFormat(alias, resolvedModel);
  const targetFormat =
    modelTargetFormat || customModelTargetFormat || getTargetFormat(provider, providerSpecificData);
  return { alias, targetFormat };
}

export type ChatCoreTargetFormat = ReturnType<typeof resolveChatCoreTargetFormat>;