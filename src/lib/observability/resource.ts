/**
 * Resource attributes (PR-005).
 *
 * Every span + log line carries a `Resource` describing the service that
 * produced it. The resource is computed once at boot from env vars
 * (`OTEL_SERVICE_NAME`, `OTEL_RESOURCE_ATTRIBUTES`, `DEPLOYMENT_ENVIRONMENT`)
 * and frozen — subsequent calls return the same object.
 *
 * @see https://opentelemetry.io/docs/specs/semconv/resource/
 */

import type { AttributeValue } from "./spanTypes";

/** Semantic conventions for resource attributes. */
const SEMANTIC_RESOURCE_KEYS = {
  SERVICE_NAME: "service.name",
  SERVICE_VERSION: "service.version",
  SERVICE_NAMESPACE: "service.namespace",
  SERVICE_INSTANCE_ID: "service.instance.id",
  DEPLOYMENT_ENVIRONMENT: "deployment.environment",
  HOST_NAME: "host.name",
  PROCESS_PID: "process.pid",
  PROCESS_RUNTIME_NAME: "process.runtime.name",
  PROCESS_RUNTIME_VERSION: "process.runtime.version",
  TELEMETRY_SDK_NAME: "telemetry.sdk.name",
  TELEMETRY_SDK_VERSION: "telemetry.sdk.version",
  TELEMETRY_SDK_LANGUAGE: "telemetry.sdk.language",
} as const;

export type SemanticResourceKey =
  (typeof SEMANTIC_RESOURCE_KEYS)[keyof typeof SEMANTIC_RESOURCE_KEYS];

/** Detected runtime environment. Used for the `deployment.environment` attr. */
export type DetectedEnvironment =
  | "production"
  | "staging"
  | "development"
  | "test"
  | "ci"
  | "electron"
  | "unknown";

/**
 * Read the deployment environment from the conventional env vars. Order of
 * precedence:
 *   1. `DEPLOYMENT_ENVIRONMENT` (set by Docker compose, k8s, Helm)
 *   2. `NODE_ENV` mapped to development/production/test
 *   3. CI markers (`CI=true`) → "ci"
 *   4. Electron marker (`OMNIROUTE_ELECTRON=1`) → "electron"
 *   5. `unknown`
 */
export function detectEnvironment(): DetectedEnvironment {
  const explicit = process.env.DEPLOYMENT_ENVIRONMENT?.trim().toLowerCase();
  if (explicit) {
    if (["prod", "production"].includes(explicit)) return "production";
    if (["stage", "staging"].includes(explicit)) return "staging";
    if (["dev", "development"].includes(explicit)) return "development";
    if (["test", "testing"].includes(explicit)) return "test";
    if (["ci"].includes(explicit)) return "ci";
    if (["electron"].includes(explicit)) return "electron";
    return "unknown";
  }

  const nodeEnv = process.env.NODE_ENV?.trim().toLowerCase();
  if (nodeEnv === "production") return "production";
  if (nodeEnv === "development") return "development";
  if (nodeEnv === "test") return "test";

  if (process.env.CI?.trim() === "true") return "ci";
  if (process.env.OMNIROUTE_ELECTRON?.trim() === "1") return "electron";

  return "unknown";
}

/**
 * Parse the `OTEL_RESOURCE_ATTRIBUTES` env var (comma-separated `key=value`
 * pairs, matching the OTel SDK spec). Returns an empty record if unset.
 */
export function parseResourceAttributes(raw: string | undefined | null): Record<string, AttributeValue> {
  if (!raw) return {};
  const out: Record<string, AttributeValue> = {};
  for (const pair of raw.split(",")) {
    const trimmed = pair.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue; // skip malformed (no `=` or empty key)
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!key) continue;
    // OTLP requires string values for resource attrs; coerce here.
    out[key] = value;
  }
  return out;
}

/**
 * Read the running package version. We avoid importing `package.json` directly
 * because Turbopack sometimes inlines it before env-vars are resolved,
 * breaking version reads during dev. Try `npm_package_version` first
 * (set by `npm run` scripts), then fall back to a literal.
 */
function readPackageVersion(): string {
  return (
    process.env.npm_package_version?.trim() ||
    process.env.OMNIROUTE_VERSION?.trim() ||
    "0.0.0-dev"
  );
}

/** Cached service resource. Recompute on first access only. */
let cachedResource: Record<string, AttributeValue> | null = null;

/**
 * Return the service resource. Builds it once on first call from env vars and
 * caches the result. Tests can call {@link resetServiceResourceForTests} to
 * force a rebuild.
 */
export function serviceResource(): Record<string, AttributeValue> {
  if (cachedResource) return cachedResource;

  const envAttrs = parseResourceAttributes(process.env.OTEL_RESOURCE_ATTRIBUTES);
  const detected = detectEnvironment();
  const serviceName =
    process.env.OTEL_SERVICE_NAME?.trim() ||
    process.env.OMNIROUTE_SERVICE_NAME?.trim() ||
    "omniroute";

  const resource: Record<string, AttributeValue> = {
    [SEMANTIC_RESOURCE_KEYS.TELEMETRY_SDK_NAME]: "omniroute-otel",
    [SEMANTIC_RESOURCE_KEYS.TELEMETRY_SDK_LANGUAGE]: "typescript",
    [SEMANTIC_RESOURCE_KEYS.TELEMETRY_SDK_VERSION]: readPackageVersion(),
    [SEMANTIC_RESOURCE_KEYS.SERVICE_NAME]: serviceName,
    [SEMANTIC_RESOURCE_KEYS.SERVICE_VERSION]: readPackageVersion(),
    [SEMANTIC_RESOURCE_KEYS.DEPLOYMENT_ENVIRONMENT]: detected,
    [SEMANTIC_RESOURCE_KEYS.PROCESS_RUNTIME_NAME]:
      typeof (globalThis as { Bun?: unknown }).Bun !== "undefined"
        ? "bun"
        : typeof (globalThis as { Deno?: unknown }).Deno !== "undefined"
          ? "deno"
          : "nodejs",
    [SEMANTIC_RESOURCE_KEYS.PROCESS_RUNTIME_VERSION]:
      process.versions?.node?.trim() || "unknown",
    [SEMANTIC_RESOURCE_KEYS.PROCESS_PID]: process.pid,
  };

  // Optional: hostname (skip in Electron + dev for privacy/portability).
  if (detected !== "electron" && process.env.OMNIROUTE_DISABLE_HOSTNAME !== "1") {
    try {
      const { hostname } = require("os") as typeof import("os");
      const host = hostname();
      if (host) resource[SEMANTIC_RESOURCE_KEYS.HOST_NAME] = host;
    } catch {
      // best-effort: os module not available (Edge runtime, Bun, etc.)
    }
  }

  // Merge env-provided attrs last so they can override defaults.
  for (const [k, v] of Object.entries(envAttrs)) {
    resource[k] = v;
  }

  cachedResource = resource;
  return resource;
}

/** Test-only escape hatch. Never call from production code. */
export function resetServiceResourceForTests(): void {
  cachedResource = null;
}
