import { AI_PROVIDERS } from "@/shared/constants/providers";

type MediaModelConfig = { id: string; name: string };
type MediaProviderConfig = { id: string; models: MediaModelConfig[] };

export type ProviderModelGroup = {
  id: string;
  name: string;
  models: { id: string; name: string }[];
};

const PROVIDER_METADATA = AI_PROVIDERS as Record<string, { name?: string }>;

/**
 * Sort dropdown labels without changing registry insertion order, which can
 * affect bare-model routing precedence.
 */
export function toProviderModels(
  registry: Record<string, MediaProviderConfig>
): ProviderModelGroup[] {
  return Object.entries(registry)
    .map(([providerId, config]) => ({
      id: providerId,
      name: PROVIDER_METADATA[providerId]?.name || config.id || providerId,
      models: config.models.map((model) => ({
        id: model.id.startsWith(`${providerId}/`) ? model.id : `${providerId}/${model.id}`,
        name: model.name,
      })),
    }))
    .sort((left, right) => {
      const byName = left.name.localeCompare(right.name, "en", {
        sensitivity: "base",
        numeric: true,
      });
      return byName || left.id.localeCompare(right.id, "en");
    });
}
