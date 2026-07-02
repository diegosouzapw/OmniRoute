import { REGISTRY } from "./providers/index.ts";
import {
  generateProviderPluginManifestFromRegistry,
  getProviderPluginManifestEntryFromRegistry,
} from "./providerPluginManifest.ts";

export function generateProviderPluginManifest() {
  return generateProviderPluginManifestFromRegistry(REGISTRY);
}

export function getProviderPluginManifestEntry(provider: string) {
  return getProviderPluginManifestEntryFromRegistry(REGISTRY, provider);
}
