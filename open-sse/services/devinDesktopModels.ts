/**
 * Devin Desktop live model discovery: POST GetCliModelConfigs with the same Metadata the
 * GetUserJwt preflight sends, then decode the per-account model configs from the protobuf
 * reply. The payload is undocumented and untrusted, so the decoder is bounded and throws on
 * anything malformed; the route catches that and serves the curated static catalog.
 *
 * Config message fields (from the Devin CLI): 1 = display name, 4 = disabled flag (≠ 0 →
 * skip), 5 = image input, 18 = context window, 22 = model id.
 */

import { randomUUID } from "node:crypto";
import { gunzipSync } from "node:zlib";

import {
  DEVIN_DESKTOP_BASE_URL,
  encodeDevinDesktopAuthRequest,
} from "../executors/devin-desktop.ts";

// Re-exported so `src/app` routes reach the curated catalog through this service boundary.
export { DEVIN_MODEL_CATALOG } from "../config/providers/registry/devin/catalog.ts";

export const DEVIN_DESKTOP_MODEL_CONFIG_URL = `${DEVIN_DESKTOP_BASE_URL}/exa.api_server_pb.ApiServerService/GetCliModelConfigs`;

const DISCOVERY_TIMEOUT_MS = 5_000;
const MAX_DISCOVERY_PAYLOAD_BYTES = 16 * 1024 * 1024;
const MAX_VARINT_BYTES = 10;
const DEFAULT_CONTEXT_WINDOW = 200_000;
const DEFAULT_MAX_OUTPUT_TOKENS = 64_000;

export interface DevinDesktopDiscoveredModel {
  id: string;
  name: string;
  contextLength: number;
  maxOutputTokens: number;
  supportsVision?: true;
}

type ProtoField = { number: number; wire: number; value: bigint | Uint8Array };

const TEXT_DECODER = new TextDecoder();

function readVarint(buffer: Uint8Array, start: number): { value: bigint; offset: number } {
  let value = 0n;
  let shift = 0n;
  let offset = start;
  while (offset < buffer.length) {
    if (offset - start >= MAX_VARINT_BYTES) throw new Error("Invalid protobuf varint");
    const byte = buffer[offset++];
    value |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) return { value, offset };
    shift += 7n;
  }
  throw new Error("Truncated protobuf varint");
}

function decodeFields(buffer: Uint8Array): ProtoField[] {
  const fields: ProtoField[] = [];
  let offset = 0;
  while (offset < buffer.length) {
    const key = readVarint(buffer, offset);
    offset = key.offset;
    const number = Number(key.value >> 3n);
    const wire = Number(key.value & 7n);
    if (wire === 0) {
      const value = readVarint(buffer, offset);
      offset = value.offset;
      fields.push({ number, wire, value: value.value });
    } else if (wire === 2) {
      const length = readVarint(buffer, offset);
      const end = length.offset + Number(length.value);
      if (length.value > BigInt(buffer.length) || end > buffer.length) {
        throw new Error("Invalid protobuf length");
      }
      fields.push({ number, wire, value: buffer.subarray(length.offset, end) });
      offset = end;
    } else if (wire === 1 || wire === 5) {
      offset += wire === 1 ? 8 : 4;
      if (offset > buffer.length) throw new Error("Truncated protobuf fixed field");
    } else {
      throw new Error(`Unsupported protobuf wire type ${wire}`);
    }
  }
  return fields;
}

function fieldText(field: ProtoField | undefined): string {
  return field && field.value instanceof Uint8Array ? TEXT_DECODER.decode(field.value).trim() : "";
}

function fieldNumber(field: ProtoField | undefined): number {
  return field && typeof field.value === "bigint" ? Number(field.value) : 0;
}

function normalizeConfigs(configs: Uint8Array[]): DevinDesktopDiscoveredModel[] {
  const models = new Map<string, DevinDesktopDiscoveredModel>();
  for (const config of configs) {
    const values = new Map(decodeFields(config).map((field) => [field.number, field]));
    const id = fieldText(values.get(22));
    if (!id || fieldNumber(values.get(4)) !== 0) continue;
    const contextLength = fieldNumber(values.get(18)) || DEFAULT_CONTEXT_WINDOW;
    models.set(id, {
      id,
      name: fieldText(values.get(1)) || id,
      contextLength,
      maxOutputTokens: Math.min(contextLength, DEFAULT_MAX_OUTPUT_TOKENS),
      ...(fieldNumber(values.get(5)) ? { supportsVision: true as const } : {}),
    });
  }
  return [...models.values()];
}

function decodeConfigList(bytes: Uint8Array): DevinDesktopDiscoveredModel[] {
  const configs = decodeFields(bytes)
    .filter((field) => field.number === 1 && field.wire === 2)
    .map((field) => field.value as Uint8Array);
  return normalizeConfigs(configs);
}

/** Decode a GetCliModelConfigs reply (plain or gzip-compressed). Throws when malformed. */
export function decodeDiscoveredDevinModels(payload: Uint8Array): DevinDesktopDiscoveredModel[] {
  const bytes = Uint8Array.from(payload);
  const isGzip = bytes.length >= 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;
  if (!isGzip) return decodeConfigList(bytes);
  return decodeConfigList(gunzipSync(bytes, { maxOutputLength: MAX_DISCOVERY_PAYLOAD_BYTES }));
}

export interface DevinDesktopDiscoveryOptions {
  signal?: AbortSignal | null;
  /** Injectable fetch (the route passes a proxy/guard-wrapped safeOutboundFetch). */
  fetchImpl?: typeof fetch;
}

/**
 * Fetch the account's enabled Devin models. Throws a status-only Error on failure so no
 * upstream body (which may echo credentials) reaches a response or log line.
 */
export async function discoverDevinDesktopModels(
  token: string,
  { signal, fetchImpl = fetch }: DevinDesktopDiscoveryOptions = {}
): Promise<DevinDesktopDiscoveredModel[]> {
  const timeout = AbortSignal.timeout(DISCOVERY_TIMEOUT_MS);
  const requestSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;
  const body = encodeDevinDesktopAuthRequest({ apiKey: token, sessionId: randomUUID() });
  const response = await fetchImpl(DEVIN_DESKTOP_MODEL_CONFIG_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/proto",
      Accept: "*/*",
      "Connect-Protocol-Version": "1",
    },
    body: body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength) as ArrayBuffer,
    signal: requestSignal,
  });
  if (!response.ok) {
    void response.body?.cancel().catch(() => {});
    throw new Error(`Devin model discovery returned HTTP ${response.status}`);
  }
  const declared = Number(response.headers.get("content-length") || 0);
  if (declared > MAX_DISCOVERY_PAYLOAD_BYTES) {
    void response.body?.cancel().catch(() => {});
    throw new Error("Devin model discovery payload is too large");
  }
  const payload = new Uint8Array(await response.arrayBuffer());
  if (payload.byteLength > MAX_DISCOVERY_PAYLOAD_BYTES) {
    throw new Error("Devin model discovery payload is too large");
  }
  return decodeDiscoveredDevinModels(payload);
}
