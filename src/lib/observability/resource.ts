/**
 * resource.ts — Resource describes the entity producing telemetry.
 *
 * Conforms to the OpenTelemetry Resource semantic conventions. The default
 * resource identifies OmniRoute with a service.name, version, deployment env,
 * and host metadata. `merge()` is additive — incoming attributes override
 * earlier ones (later wins), and the order is preserved for stable JSON output.
 *
 * Immutable: every operation returns a new Resource instance.
 */

import type { AttributeValue, Resource } from "./spanTypes";

const SEMCONV_SERVICE_NAME = "service.name";
const SEMCONV_SERVICE_VERSION = "service.version";
const SEMCONV_SERVICE_NAMESPACE = "service.namespace";
const SEMCONVS_DEPLOYMENT_ENV = "deployment.environment";
const SEMCONV_HOST_NAME = "host.name";
const SEMCONV_HOST_ARCH = "host.arch";
const SEMCONV_PROCESS_PID = "process.pid";
const SEMCONV_PROCESS_RUNTIME = "process.runtime.name";
const SEMCONV_PROCESS_RUNTIME_VERSION = "process.runtime.version";

/** Read a value from `process.env` with a default fallback. */
function readEnv(key: string, fallback: string): string {
  const raw = process.env[key];
  if (typeof raw !== "string" || raw.length === 0) return fallback;
  return raw;
}

/** Try to read OS hostname, fall back to a sanitized env var. */
function detectHostname(): string {
  try {
    const os = require("node:os") as typeof import("node:os");
    return os.hostname();
  } catch {
    return readEnv("HOSTNAME", "unknown");
  }
}

/** Read process.arch and normalize. */
function detectArch(): string {
  return process.arch || "unknown";
}

/** Detect Node.js runtime version (mirrors process.runtime.version). */
function detectNodeVersion(): string {
  return process.version || "unknown";
}

/**
 * Build the default OmniRoute resource. Values are derived from environment and
 * process metadata so the same code can run on dev, CI, and production without
 * re-configuration.
 */
export function createDefaultResource(overrides: Record<string, AttributeValue> = {}): Resource {
  const attributes: Record<string, AttributeValue> = {
    [SEMCONV_SERVICE_NAME]: readEnv("OMNIROUTE_SERVICE_NAME", "omniroute"),
    [SEMCONV_SERVICE_VERSION]: readEnv("OMNIROUTE_SERVICE_VERSION", "0.0.0"),
    [SEMCONV_SERVICE_NAMESPACE]: readEnv("OMNIROUTE_SERVICE_NAMESPACE", "omniroute"),
    [SEMCONVS_DEPLOYMENT_ENV]: readEnv("OMNIROUTE_DEPLOYMENT_ENV", "development"),
    [SEMCONV_HOST_NAME]: detectHostname(),
    [SEMCONV_HOST_ARCH]: detectArch(),
    [SEMCONV_PROCESS_PID]: process.pid ?? 0,
    [SEMCONV_PROCESS_RUNTIME]: "nodejs",
    [SEMCONV_PROCESS_RUNTIME_VERSION]: detectNodeVersion(),
  };

  // Apply user overrides (later wins, including service.name).
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined || value === null) continue;
    attributes[key] = value;
  }

  return new ResourceImpl(attributes);
}

class ResourceImpl implements Resource {
  readonly attributes: Readonly<Record<string, AttributeValue>>;

  constructor(attributes: Record<string, AttributeValue>) {
    this.attributes = Object.freeze({ ...attributes });
  }

  merge(extra: Resource): Resource {
    if (!extra || typeof extra !== "object") return this;
    const merged: Record<string, AttributeValue> = { ...this.attributes };
    for (const [key, value] of Object.entries(extra.attributes)) {
      if (value === undefined || value === null) continue;
      merged[key] = value;
    }
    return new ResourceImpl(merged);
  }

  getString(key: string, fallback = ""): string {
    const v = this.attributes[key];
    if (typeof v === "string") return v;
    if (typeof v === "number" || typeof v === "boolean") return String(v);
    return fallback;
  }
}

/**
 * Exported helper used by exporters to flatten a Resource into a stable JSON
 * shape (deterministic key ordering matters for OTLP/JSON encoding).
 */
export function serializeResource(resource: Resource): Record<string, AttributeValue> {
  const out: Record<string, AttributeValue> = {};
  const keys = Object.keys(resource.attributes).sort();
  for (const key of keys) {
    out[key] = resource.attributes[key];
  }
  return out;
}

/** Re-export of the Resource type for callers who only want the surface. */
export type { Resource } from "./spanTypes";