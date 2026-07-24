// #8347: CLIProxyAPI-style upstreams gate a richer catalog behind a `client_version` query
// param on the model-list request (mirroring `discovery/codex.ts::buildCodexModelsUrl`).
// This is a per-connection, default-OFF opt-in — appending an unexpected query param to
// every generic OpenAI-compatible upstream's model-list call is the stated regression
// vector, so this MUST default to false and MUST never be applied to inference URLs.

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export type DiscoveryClientVersionOptions = {
  discoveryClientVersionEnabled?: boolean;
  discoveryClientVersion?: string;
};

/**
 * Reads the opt-in flag + optional version string off a connection's
 * `providerSpecificData`. Default is OFF: absent, falsy, or malformed data never enables
 * the query param.
 */
export function getDiscoveryClientVersionOptions(
  providerSpecificData: unknown
): DiscoveryClientVersionOptions {
  const record = asRecord(providerSpecificData);
  const enabled = record.discoveryClientVersionEnabled === true;
  const version =
    typeof record.discoveryClientVersion === "string" && record.discoveryClientVersion.trim()
      ? record.discoveryClientVersion.trim()
      : undefined;
  return { discoveryClientVersionEnabled: enabled, discoveryClientVersion: version };
}

/**
 * Appends `client_version` to a model-LIST URL only, and only when the connection has
 * explicitly opted in. Never call this for an inference/chat-completions URL. Returns the
 * URL unchanged (byte-identical) when the opt-in is absent or off, so unrelated generic
 * OpenAI-compatible upstreams see no behavior change.
 */
export function buildProviderModelsUrl(
  modelsUrl: string,
  options: DiscoveryClientVersionOptions | undefined
): string {
  if (!options?.discoveryClientVersionEnabled || !options.discoveryClientVersion) {
    return modelsUrl;
  }
  try {
    const url = new URL(modelsUrl);
    url.searchParams.set("client_version", options.discoveryClientVersion);
    return url.toString();
  } catch {
    // Malformed base URL — fall back to the untouched string rather than throwing;
    // the caller's own fetch will surface the real error.
    return modelsUrl;
  }
}
