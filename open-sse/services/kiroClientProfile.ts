import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import { platform, release } from "node:os";

type JsonRecord = Record<string, unknown>;

export const KIRO_IDE_VERSION = "1.0.203";
export const KIRO_SDK_VERSION = "1.0.0";

const nodeRequire = createRequire(import.meta.url);
let nativeMachineIdSync: (() => string) | null = null;
try {
  const module = nodeRequire("node-machine-id") as {
    machineIdSync?: () => string;
    default?: { machineIdSync?: () => string };
  };
  nativeMachineIdSync = module.machineIdSync || module.default?.machineIdSync || null;
} catch {
  nativeMachineIdSync = null;
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function kiroMachineId(providerSpecificData: unknown, accessToken: string): string {
  const data = asRecord(providerSpecificData);
  try {
    const native = nonEmptyString(nativeMachineIdSync?.());
    if (native && /^[a-f0-9]{64}$/i.test(native)) return native.toLowerCase();
  } catch {
    // Fall through to a deterministic connection-derived id.
  }

  const persisted = nonEmptyString(data.kiroMachineId) || nonEmptyString(data.machineId);
  if (persisted && /^[a-f0-9]{64}$/i.test(persisted)) return persisted.toLowerCase();

  const seed =
    persisted ||
    nonEmptyString(data.clientId) ||
    nonEmptyString(data.profileArn) ||
    accessToken ||
    "kiro-anonymous";
  return createHash("sha256").update(seed).digest("hex");
}

export function buildKiroClientHeaders(
  providerSpecificData: unknown,
  accessToken: string,
  service: "runtime" | "control-plane"
): Record<string, string> {
  const machineId = kiroMachineId(providerSpecificData, accessToken);
  const customUserAgent = `KiroIDE-${KIRO_IDE_VERSION}-${machineId}`;
  const serviceId = service === "runtime" ? "kiroruntime" : "kirocontrolplanebearer";
  const nodeVersion = process.versions?.node || process.version?.replace(/^v/, "") || "unknown";
  const userAgent =
    `aws-sdk-js/${KIRO_SDK_VERSION} ua/2.1 ` +
    `os/${platform()}#${release()} lang/js md/nodejs#${nodeVersion} ` +
    `api/${serviceId}#${KIRO_SDK_VERSION} m/N,E ${customUserAgent}`;

  return {
    "User-Agent": userAgent,
    "X-Amz-User-Agent": `aws-sdk-js/${KIRO_SDK_VERSION} ${customUserAgent}`,
    "x-amzn-codewhisperer-optout": "true",
    ...(service === "runtime" ? { "x-amzn-kiro-agent-mode": "vibe" } : {}),
  };
}
