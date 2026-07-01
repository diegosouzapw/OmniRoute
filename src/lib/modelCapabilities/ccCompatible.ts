import { getProviderModels } from "@omniroute/open-sse/config/providerModels.ts";

export const CLAUDE_CODE_COMPATIBLE_PREFIX = "anthropic-compatible-cc-";
export const CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER = "cc-compatible";

export function isClaudeCodeCompatibleProvider(provider: string | null): boolean {
  return (
    provider === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER ||
    Boolean(provider?.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX))
  );
}

export function resolveClaudeCodeCompatibleCatalogModel(
  provider: string | null,
  model: string | null
): { provider: string | null; model: string | null } {
  if (!provider || !model || !model.includes("/")) return { provider, model };

  const [routePrefix, ...rest] = model.split("/");
  const routedModel = rest.join("/").trim();
  if (!routePrefix || !routedModel) return { provider, model };

  if (provider === CLAUDE_CODE_COMPATIBLE_AGGREGATE_PROVIDER) {
    return { provider: `${CLAUDE_CODE_COMPATIBLE_PREFIX}${routePrefix}`, model: routedModel };
  }

  if (
    provider.startsWith(CLAUDE_CODE_COMPATIBLE_PREFIX) &&
    provider.slice(CLAUDE_CODE_COMPATIBLE_PREFIX.length) === routePrefix
  ) {
    return { provider, model: routedModel };
  }

  return { provider, model };
}

export function getClaudeCodeCompatibleRoutedModelId(
  provider: string | null,
  model: string | null
): string | null {
  if (!provider || !model || !model.includes("/") || !isClaudeCodeCompatibleProvider(provider)) {
    return null;
  }
  const routedModel = model.split("/").slice(1).join("/");
  if (!routedModel) return null;
  return getProviderModels(provider).some((entry) => entry.id === routedModel) ? routedModel : null;
}
