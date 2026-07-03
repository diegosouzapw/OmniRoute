import type {
  ProviderPluginManifest,
  ProviderPluginManifestEntry,
} from "./providerPluginManifest.ts";

export const PROVIDER_PLUGIN_MANIFEST_PATH = "/api/v1/provider-plugin-manifest";
export const PROVIDER_PLUGIN_MANIFEST_ENV = "OMNIROUTE_PROVIDER_MANIFEST_URL";

export interface ProviderPluginManifestClientOptions {
  baseUrl?: string | null;
  manifestUrl?: string | null;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal | null;
}

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function resolveProviderPluginManifestUrl(
  options: Pick<ProviderPluginManifestClientOptions, "baseUrl" | "manifestUrl"> = {},
): string {
  const explicitUrl = options.manifestUrl?.trim();
  if (explicitUrl) return explicitUrl;

  const envUrl = process.env[PROVIDER_PLUGIN_MANIFEST_ENV]?.trim();
  if (envUrl) return envUrl;

  const baseUrl = options.baseUrl?.trim();
  if (baseUrl) {
    return `${trimTrailingSlash(baseUrl)}${PROVIDER_PLUGIN_MANIFEST_PATH}`;
  }

  const host = process.env.HOST || "127.0.0.1";
  const port = process.env.PORT || process.env.DASHBOARD_PORT || process.env.API_PORT || "20128";
  const protocol = process.env.OMNIROUTE_PUBLIC_PROTOCOL || "http";
  return `${protocol}://${host}:${port}${PROVIDER_PLUGIN_MANIFEST_PATH}`;
}

export async function fetchProviderPluginManifest(
  options: ProviderPluginManifestClientOptions = {},
): Promise<ProviderPluginManifest> {
  const fetcher = options.fetchImpl ?? fetch;
  const url = resolveProviderPluginManifestUrl(options);
  const response = await fetcher(url, {
    headers: { Accept: "application/json" },
    signal: options.signal ?? undefined,
  });

  if (!response.ok) {
    throw new Error(`Provider plugin manifest request failed: HTTP ${response.status}`);
  }

  const manifest = (await response.json()) as ProviderPluginManifest;
  if (manifest.schemaVersion !== 1 || !Array.isArray(manifest.providers)) {
    throw new Error("Provider plugin manifest response is not schemaVersion 1");
  }

  return manifest;
}

export function getProviderPluginManifestEntryForModelFromManifest(
  manifest: ProviderPluginManifest,
  model: string | undefined,
): ProviderPluginManifestEntry | null {
  if (!model) return null;

  const providerPrefix = model.includes("/") ? model.split("/", 1)[0] : "";
  if (providerPrefix) {
    const prefixed = manifest.providers.find(
      (provider) => provider.id === providerPrefix || provider.alias === providerPrefix,
    );
    if (prefixed) return prefixed;
  }

  return manifest.providers.find((provider) =>
    provider.models.some((candidate) => candidate.id === model),
  ) ?? null;
}

export async function fetchProviderPluginManifestEntryForModel(
  model: string | undefined,
  options: ProviderPluginManifestClientOptions = {},
): Promise<ProviderPluginManifestEntry | null> {
  const manifest = await fetchProviderPluginManifest(options);
  return getProviderPluginManifestEntryForModelFromManifest(manifest, model);
}
