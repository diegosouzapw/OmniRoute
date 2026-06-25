/**
 * src/lib/observability/resource.ts
 *
 * Detects "who is running" — the Resource is the static descriptor of the
 * entity producing telemetry (host, process, service, version). OTel
 * convention is one Resource per process, attached to every exported span
 * and metric. We follow that.
 *
 * Detection order (first non-empty wins, merges are additive):
 *   1. OTEL_RESOURCE_ATTRIBUTES — standard env var, comma-sep key=value pairs.
 *      Semantics: https://opentelemetry.io/docs/specs/environment/variables/#general-sdk-configuration
 *   2. Service-specific overrides:
 *        OTEL_SERVICE_NAME              → service.name
 *        OTEL_SERVICE_VERSION           → service.version
 *        OMNIROUTE_SERVICE_NAMESPACE    → service.namespace (defaults "omniroute")
 *        OMNIROUTE_SERVICE_INSTANCE_ID  → service.instance.id (defaults <hostname>-<pid>)
 *   3. Process / host attributes auto-detected from `os`, `process`, `globalThis`.
 *
 * The detector is pure-functional (no side effects beyond reading env); the
 * `getResource()` helper caches the result in a module-level singleton so
 * every exporter in the process sees the same attributes.
 */

// Cache holder is a plain object so we can mutate it for test isolation. We
// avoid a `let` module-level binding because that would force every consumer
// to import a mutable singleton (testability hazard). The indirection lets
// `resetResourceCache()` actually clear the value.
const RESOURCE_CACHE: { current: Resource | null } = { current: null };

export interface Resource {
  /** Stable attribute bag — insertion order preserved for deterministic export. */
  attributes: Record<string, string>;
  /** Source label for diagnostics — which env var(s) populated each attribute. */
  sources: Record<string, "env" | "process" | "default">;
}

/** Reset the module cache. Tests call this to exercise different env scenarios. */
export function resetResourceCache(): void {
  RESOURCE_CACHE.current = null;
}

/**
 * Detect the current process resource. Safe to call multiple times — the first
 * call captures env, subsequent calls return the same cached object.
 */
export function getResource(): Resource {
  if (RESOURCE_CACHE.current) return RESOURCE_CACHE.current;
  RESOURCE_CACHE.current = detectResource();
  return RESOURCE_CACHE.current;
}

/** Internal — build the resource from env + process introspection. */
function detectResource(): Resource {
  const attributes: Record<string, string> = {};
  const sources: Record<string, "env" | "process" | "default"> = {};

  // 1. OTEL_RESOURCE_ATTRIBUTES — k1=v1,k2=v2, ...
  const otelAttrs = process.env.OTEL_RESOURCE_ATTRIBUTES;
  if (otelAttrs) {
    for (const pair of otelAttrs.split(",")) {
      const eq = pair.indexOf("=");
      if (eq <= 0) continue;
      const key = pair.slice(0, eq).trim();
      const value = pair.slice(eq + 1).trim();
      if (!key || !value) continue;
      // OTel forbids \n / = / , in attribute keys/values; sanitise defensively.
      if (/[\n\r=,]/.test(key) || /[\n\r,]/.test(value)) continue;
      attributes[key] = value;
      sources[key] = "env";
    }
  }

  // 2. Service-specific overrides — only set if not already populated.
  setIfMissing(attributes, sources, "service.name", process.env.OTEL_SERVICE_NAME, "env");
  setIfMissing(
    attributes,
    sources,
    "service.namespace",
    process.env.OMNIROUTE_SERVICE_NAMESPACE ?? "omniroute",
    process.env.OMNIROUTE_SERVICE_NAMESPACE ? "env" : "default"
  );
  setIfMissing(attributes, sources, "service.version", process.env.OTEL_SERVICE_VERSION, "env");
  setIfMissing(
    attributes,
    sources,
    "service.instance.id",
    process.env.OMNIROUTE_SERVICE_INSTANCE_ID,
    process.env.OMNIROUTE_SERVICE_INSTANCE_ID ? "env" : "process"
  );

  // 3. Process / host auto-detection — only when not already set.
  if (!attributes["process.pid"]) {
    try {
      attributes["process.pid"] = String(process.pid);
      sources["process.pid"] = "process";
    } catch {
      // Edge runtime — no process.pid.
    }
  }
  if (!attributes["process.runtime.name"]) {
    try {
      attributes["process.runtime.name"] = process.release?.name ?? "node";
      attributes["process.runtime.version"] = process.version;
      sources["process.runtime.name"] = "process";
      sources["process.runtime.version"] = "process";
    } catch {
      attributes["process.runtime.name"] = "unknown";
      sources["process.runtime.name"] = "default";
    }
  }
  if (!attributes["host.name"]) {
    try {
      // os is unavailable in Edge; guard with require-style try/catch.
      // We use a dynamic lookup so this module stays portable.
      const host = (globalThis as { os?: { hostname?: () => string } }).os?.hostname?.();
      if (host) {
        attributes["host.name"] = host;
        sources["host.name"] = "process";
      }
    } catch {
      // ignore
    }
  }
  if (!attributes["host.arch"]) {
    try {
      const arch = process.arch;
      if (arch) {
        attributes["host.arch"] = arch;
        sources["host.arch"] = "process";
      }
    } catch {
      // ignore
    }
  }

  return { attributes, sources };
}

function setIfMissing(
  attributes: Record<string, string>,
  sources: Record<string, "env" | "process" | "default">,
  key: string,
  value: string | undefined,
  source: "env" | "process" | "default"
): void {
  if (attributes[key] !== undefined) return;
  if (value === undefined || value === "") return;
  attributes[key] = value;
  sources[key] = source;
}

/** Merge two resource attribute bags, with `override` winning ties. */
export function mergeResources(a: Resource, b: Resource): Resource {
  const attributes: Record<string, string> = { ...a.attributes, ...b.attributes };
  const sources: Record<string, "env" | "process" | "default"> = {
    ...a.sources,
    ...b.sources,
  };
  return { attributes, sources };
}

/** Build a Resource from a literal attribute object — useful for tests + dynamic overrides. */
export function resourceFromAttributes(
  attrs: Record<string, string>,
  source: "env" | "process" | "default" = "env"
): Resource {
  const sources: Record<string, "env" | "process" | "default"> = {};
  for (const k of Object.keys(attrs)) sources[k] = source;
  return { attributes: { ...attrs }, sources };
}

/** Format a Resource for the OTLP/HTTP JSON wire format (string-keyed string map). */
export function resourceToOtlp(resource: Resource): { attributes: Array<{ key: string; value: { stringValue: string } }> } {
  return {
    attributes: Object.entries(resource.attributes).map(([key, value]) => ({
      key,
      value: { stringValue: value },
    })),
  };
}

/** Format a Resource for Prometheus textfile-style output (`key="value"`). */
export function resourceToPromLabels(resource: Resource): Record<string, string> {
  // Prometheus label values cannot contain `"` or `\n`. Replace defensively.
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(resource.attributes)) {
    out[k] = v.replace(/[",\n\\]/g, "_");
  }
  return out;
}