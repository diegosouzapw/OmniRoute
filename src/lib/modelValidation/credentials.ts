import { isDeepStrictEqual } from "node:util";
import { resolveProviderNodeForConnection } from "../db/providers";
import { isCompatibleProviderConnectionId } from "../../shared/utils/compatibleProviderId";
import { ModelValidationError } from "./http";

type RecordValue = Record<string, unknown>;
interface CredentialSnapshotFields {
  apiKey?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
  providerSpecificData?: unknown;
}
function object(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
}

async function freshProviderData(provider: string, value: unknown) {
  const data = object(value);
  if (!isCompatibleProviderConnectionId(provider) || data.baseUrl) return data;
  const node = await resolveProviderNodeForConnection(provider);
  if (!node?.baseUrl) return data;
  // Same hydration contract as compatibleNodeBaseUrl, but this read is deliberately uncached.
  return {
    ...data,
    prefix: data.prefix ?? node.prefix,
    apiType: data.apiType ?? node.apiType,
    baseUrl: node.baseUrl,
    nodeName: data.nodeName ?? node.name,
    ...(node.chatPath && !data.chatPath ? { chatPath: node.chatPath } : {}),
    ...(node.modelsPath && !data.modelsPath ? { modelsPath: node.modelsPath } : {}),
    ...(node.customHeaders && !data.customHeaders ? { customHeaders: node.customHeaders } : {}),
  };
}

/** A fresh DB fingerprint alone cannot attest a previously cached selection's metadata. */
export async function assertSelectedCredentialsCurrent(
  provider: string,
  selected: CredentialSnapshotFields,
  stored: CredentialSnapshotFields
) {
  const expected = await freshProviderData(provider, stored.providerSpecificData);
  const sameSecrets = (["apiKey", "accessToken", "refreshToken"] as const).every(
    (key) => (selected[key] ?? null) === (stored[key] ?? null)
  );
  if (!sameSecrets || !isDeepStrictEqual(object(selected.providerSpecificData), expected)) {
    throw new ModelValidationError(
      409,
      "VALIDATION_CONFIG_CHANGED",
      "Selected credentials or configuration changed during validation"
    );
  }
}
