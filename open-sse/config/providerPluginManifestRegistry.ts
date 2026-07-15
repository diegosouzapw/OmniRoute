import { REGISTRY } from "./providers/index.ts";
import {
  generateProviderPluginManifestFromRegistry,
  type ProviderPluginManifestEntry,
  type ProviderPluginManifest,
} from "./providerPluginManifest.ts";

let manifestCache: ProviderPluginManifest | null = null;
let providerIndex = new Map<string, ProviderPluginManifestEntry>();
let modelIndex = new Map<string, ProviderPluginManifestEntry>();

function ensureManifestCache(): ProviderPluginManifest {
  if (manifestCache) {
    return manifestCache;
  }

  const manifest = generateProviderPluginManifestFromRegistry(REGISTRY);
  manifestCache = manifest;

  providerIndex = new Map<string, ProviderPluginManifestEntry>();
  modelIndex = new Map<string, ProviderPluginManifestEntry>();

  for (const entry of manifest.providers) {
    providerIndex.set(entry.id, entry);
    if (entry.alias) {
      providerIndex.set(entry.alias, entry);
    }
    for (const model of entry.models) {
      if (!modelIndex.has(model.id)) {
        modelIndex.set(model.id, entry);
      }
    }
  }

  return manifest;
}

export function generateProviderPluginManifest() {
  return ensureManifestCache();
}

export function getProviderPluginManifestEntry(provider: string) {
  ensureManifestCache();
  return providerIndex.get(provider) ?? null;
}

export function getProviderPluginManifestEntryForModel(
  model: string | undefined,
): ProviderPluginManifestEntry | null {
  if (!model) return null;

  ensureManifestCache();

  const providerPrefix = model.includes("/") ? model.split("/", 1)[0] : "";
  if (providerPrefix) {
    const prefixed = getProviderPluginManifestEntry(providerPrefix);
    if (prefixed) return prefixed;
  }

  return modelIndex.get(model) ?? null;
}
