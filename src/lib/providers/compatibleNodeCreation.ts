import { isDeepStrictEqual } from "node:util";

type ProviderData = Record<string, unknown>;

function identityValue(key: string, value: unknown): unknown {
  if (key !== "baseUrl" || typeof value !== "string") return value;
  const trimmed = value.trim();
  const separator = trimmed.search(/[?#]/);
  const pathname = separator < 0 ? trimmed : trimmed.slice(0, separator);
  const suffix = separator < 0 ? "" : trimmed.slice(separator);
  return pathname.replace(/\/+$/, "") + suffix;
}

/** Validate a bare-type fallback before binding its credential to a node. */
export function hydrateCompatibleNodeCreation(
  provider: string,
  node: ProviderData,
  incoming: ProviderData | null,
  includeApiType: boolean
) {
  const nodeFields: ProviderData = {
    prefix: node.prefix,
    ...(includeApiType ? { apiType: node.apiType } : {}),
    baseUrl: node.baseUrl,
    nodeName: node.name,
    ...(node.chatPath ? { chatPath: node.chatPath } : {}),
    ...(node.modelsPath ? { modelsPath: node.modelsPath } : {}),
    ...(node.customHeaders ? { customHeaders: node.customHeaders } : {}),
  };
  const supplied = incoming ?? {};
  const conflict =
    provider === node.id
      ? undefined
      : Object.keys(nodeFields).find(
          (key) =>
            Object.hasOwn(supplied, key) &&
            !isDeepStrictEqual(
              identityValue(key, supplied[key]),
              identityValue(key, nodeFields[key])
            )
        );

  return {
    data: { ...supplied, ...nodeFields },
    error: conflict
      ? `providerSpecificData.${conflict} conflicts with the resolved provider node. Use its concrete node id or matching node settings.`
      : null,
  };
}
