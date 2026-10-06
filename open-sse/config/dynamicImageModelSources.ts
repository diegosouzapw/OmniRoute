/**
 * Registry indirection for image providers whose model list is discovered at runtime (#10692).
 *
 * `IMAGE_PROVIDERS` is reachable from `"use client"` dashboard pages — they read its KEYS to
 * decide which providers support which media kind (see `mediaServiceKinds.ts`). A provider entry
 * that imports its live-catalog service directly therefore drags that service, and everything it
 * imports, into the browser graph. For AI Horde that meant
 * `aihordeImageCatalog → safeOutboundFetch → proxyFetch → featureFlags → db/core → sqljsAdapter`,
 * so the build tried to bundle `fs`/`net`/`tls` for the browser and failed.
 *
 * A dynamic `import()` does not help: the bundler still has to make the module browser-loadable.
 * The dependency has to be inverted instead — the registry entry knows only this pure module, and
 * the server-only service registers itself when it is imported (which every server path that needs
 * live models already does).
 *
 * With no source registered the getter yields `[]`, which is exactly what the live catalog
 * returned before it had polled — so the client keeps seeing the provider without its models,
 * unchanged.
 */

export interface DynamicImageModelEntry {
  id: string;
  name: string;
  inputModalities: string[];
}

type DynamicImageModelSource = () => DynamicImageModelEntry[];

const sources = new Map<string, DynamicImageModelSource>();

/** Called by a server-only catalog service at import time. Last registration wins. */
export function registerDynamicImageModelSource(
  providerId: string,
  source: DynamicImageModelSource
): void {
  sources.set(providerId, source);
}

/** Models discovered for `providerId`, or `[]` when no server-side source is loaded. */
export function getDynamicImageModels(providerId: string): DynamicImageModelEntry[] {
  const source = sources.get(providerId);
  if (!source) return [];
  return source();
}

/** Test seam — drops every registration. */
export function resetDynamicImageModelSources(): void {
  sources.clear();
}
