import { REGISTRY } from "./providers/index.ts";
import {
  generateProviderPluginManifestFromRegistry,
  getProviderPluginManifestEntryFromRegistry,
  type ProviderPluginManifestEntry,
} from "./providerPluginManifest.ts";

export function generateProviderPluginManifest() {
  return generateProviderPluginManifestFromRegistry(REGISTRY);
}

export function getProviderPluginManifestEntry(provider: string) {
  return getProviderPluginManifestEntryFromRegistry(REGISTRY, provider);
}

export function getProviderPluginManifestEntryForModel(
  model: string | undefined,
): ProviderPluginManifestEntry | null {
  if (!model) return null;

  const providerPrefix = model.includes("/") ? model.split("/", 1)[0] : "";
  if (providerPrefix) {
    const prefixed = getProviderPluginManifestEntry(providerPrefix);
    if (prefixed) return prefixed;
  }

  const manifest = generateProviderPluginManifest();
  return manifest.providers.find((provider) =>
    provider.models.some((candidate) => candidate.id === model),
  ) ?? null;
}
