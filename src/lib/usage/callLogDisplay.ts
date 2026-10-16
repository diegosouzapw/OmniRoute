function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function applyNodePrefix(
  requestedModel: string | null,
  provider: string | null,
  nodePrefix: string | null
): string | null {
  if (!requestedModel || !provider || !nodePrefix) return requestedModel;
  if (requestedModel.startsWith(provider + "/")) {
    return nodePrefix + "/" + requestedModel.slice(provider.length + 1);
  }
  return requestedModel;
}

export function resolveProviderDisplay(
  provider: string | null,
  nodeName: string | null,
  nodePrefix: string | null
): string | null {
  const rawProvider = toStringOrNull(provider);
  if (!rawProvider) return null;

  const name = toStringOrNull(nodeName)?.trim();
  if (name) return name;

  const prefix = toStringOrNull(nodePrefix)?.trim();
  if (prefix) return prefix;

  return null;
}
