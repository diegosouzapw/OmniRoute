import { getModelTargetFormat } from "@omniroute/open-sse/config/providerModels.ts";
import { getTargetFormat } from "@omniroute/open-sse/services/provider.ts";

export type ModelConfigRoutingMetadata = {
  apiFormat: string | undefined;
  targetFormat: string | undefined;
  unsupportedParams: string[] | undefined;
};

export type ProviderModelRoutingMetadata = Partial<ModelConfigRoutingMetadata>;

export function readModelConfigRoutingMetadata(modelInfo: unknown): ModelConfigRoutingMetadata {
  if (!modelInfo || typeof modelInfo !== "object") {
    return { apiFormat: undefined, targetFormat: undefined, unsupportedParams: undefined };
  }

  const record = modelInfo as {
    apiFormat?: unknown;
    targetFormat?: unknown;
    unsupportedParams?: unknown;
  };
  const apiFormat = typeof record.apiFormat === "string" ? record.apiFormat : undefined;
  const targetFormat = typeof record.targetFormat === "string" ? record.targetFormat : undefined;
  const unsupportedParams = Array.isArray(record.unsupportedParams)
    ? record.unsupportedParams.filter(
        (entry): entry is string => typeof entry === "string" && entry.trim().length > 0
      )
    : undefined;

  return { apiFormat, targetFormat, unsupportedParams };
}

export function resolveModelConfigTargetFormat(
  providerAlias: string,
  provider: string,
  model: string,
  metadata: ModelConfigRoutingMetadata
): string {
  if (metadata.apiFormat === "responses") return "openai-responses";
  return (
    metadata.targetFormat || getModelTargetFormat(providerAlias, model) || getTargetFormat(provider)
  );
}

export function buildChatCoreModelInfo(opts: {
  provider: string;
  model: string;
  extendedContext: unknown;
  apiFormat: unknown;
  targetFormat: unknown;
  unsupportedParams: unknown;
}) {
  return {
    provider: opts.provider,
    model: opts.model,
    extendedContext: opts.extendedContext,
    apiFormat: opts.apiFormat,
    targetFormat: opts.targetFormat,
    unsupportedParams: opts.unsupportedParams,
  };
}

export function buildResolvedModelRouting(opts: {
  provider: string;
  model: string;
  sourceFormat: string;
  extendedContext: unknown;
  providerAlias: string;
  modelInfo: unknown;
}) {
  const metadata = readModelConfigRoutingMetadata(opts.modelInfo);
  return {
    provider: opts.provider,
    model: opts.model,
    sourceFormat: opts.sourceFormat,
    targetFormat: resolveModelConfigTargetFormat(
      opts.providerAlias,
      opts.provider,
      opts.model,
      metadata
    ),
    extendedContext: opts.extendedContext,
    apiFormat: metadata.apiFormat,
    modelConfigTargetFormat: metadata.targetFormat,
    unsupportedParams: metadata.unsupportedParams,
  };
}

export async function resolveExecutionModelRoutingMetadata(opts: {
  provider: string;
  model: string;
  resolvedProvider: string;
  resolvedModel: string;
  resolvedMetadata: ProviderModelRoutingMetadata;
  loadProviderModelMeta: (
    providerId: string,
    modelId: string
  ) => Promise<ProviderModelRoutingMetadata>;
}): Promise<ProviderModelRoutingMetadata> {
  if (opts.provider === opts.resolvedProvider && opts.model === opts.resolvedModel) {
    return opts.resolvedMetadata;
  }
  return opts.loadProviderModelMeta(opts.provider, opts.model);
}
