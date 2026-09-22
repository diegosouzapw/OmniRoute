/** TypeSafe System One model registry. */

export interface SystemOneModel {
  id: string;
  name: string;
}

export interface SystemOneProvider {
  id: string;
  baseUrl: string;
  models: SystemOneModel[];
}

export const SYSTEMONE_PROVIDERS: Record<string, SystemOneProvider> = {
  typesafe: {
    id: "typesafe",
    baseUrl: "https://api.typesafe.ai/v1/systemone",
    models: [
      { id: "jev-latest", name: "Jev (latest stable)" },
      { id: "jev-preview", name: "Jev (preview)" },
    ],
  },
};

export function getSystemOneProvider(providerId: string): SystemOneProvider | null {
  return SYSTEMONE_PROVIDERS[providerId] ?? null;
}

export function getAllSystemOneModels(): Array<SystemOneModel & { provider: string }> {
  return Object.values(SYSTEMONE_PROVIDERS).flatMap((provider) =>
    provider.models.map((model) => ({
      ...model,
      id: `${provider.id}/${model.id}`,
      provider: provider.id,
    }))
  );
}
