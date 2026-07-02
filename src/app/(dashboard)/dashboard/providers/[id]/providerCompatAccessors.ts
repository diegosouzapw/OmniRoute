import type { ProviderModelCompatConfig } from "@/shared/types/modelConfig";

type ProtocolCompat = NonNullable<ProviderModelCompatConfig["compatByProtocol"]>[keyof NonNullable<
  ProviderModelCompatConfig["compatByProtocol"]
>];

type CompatAccessorRow = {
  compat?: ProviderModelCompatConfig;
  compatByProtocol?: ProviderModelCompatConfig["compatByProtocol"];
  upstreamHeaders?: Record<string, string>;
  normalizeToolCallId?: boolean;
  preserveOpenAIDeveloperRole?: boolean;
};

function protocolMap(
  map: ProviderModelCompatConfig["compatByProtocol"]
): Record<string, ProtocolCompat | undefined> | undefined {
  return map as Record<string, ProtocolCompat | undefined> | undefined;
}

export function getProtoSlice(
  c: CompatAccessorRow | undefined,
  o: CompatAccessorRow | undefined,
  protocol: string
): ProtocolCompat | undefined {
  return (
    protocolMap(c?.compat?.compatByProtocol)?.[protocol] ??
    protocolMap(c?.compatByProtocol)?.[protocol] ??
    protocolMap(o?.compat?.compatByProtocol)?.[protocol] ??
    protocolMap(o?.compatByProtocol)?.[protocol]
  );
}

export function readCompatUpstreamHeaders(
  row: CompatAccessorRow | undefined
): Record<string, string> | undefined {
  return row?.compat?.upstreamHeaders ?? row?.upstreamHeaders;
}

export function readCompatNormalize(row: CompatAccessorRow | undefined): boolean | undefined {
  if (!row) return undefined;
  if (Object.prototype.hasOwnProperty.call(row.compat || {}, "normalizeToolCallId")) {
    return Boolean(row.compat?.normalizeToolCallId);
  }
  if (Object.prototype.hasOwnProperty.call(row, "normalizeToolCallId")) {
    return Boolean(row.normalizeToolCallId);
  }
  return undefined;
}

export function readCompatPreserveDeveloper(
  row: CompatAccessorRow | undefined
): boolean | undefined {
  if (!row) return undefined;
  if (Object.prototype.hasOwnProperty.call(row.compat || {}, "preserveOpenAIDeveloperRole")) {
    return Boolean(row.compat?.preserveOpenAIDeveloperRole);
  }
  if (Object.prototype.hasOwnProperty.call(row, "preserveOpenAIDeveloperRole")) {
    return Boolean(row.preserveOpenAIDeveloperRole);
  }
  return undefined;
}
