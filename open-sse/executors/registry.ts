import type { BaseExecutor } from "./base.ts";

// R0.3 — ExecutorRegistry: runtime registry for provider executors, mirroring
// open-sse/translator/registry.ts. Built-ins register at module load from
// executors/index.ts; getExecutor() resolves through this map instead of a
// hard-coded object literal. This is the seam the v4 plan (M1.6
// host.registerProvider) extends — today the surface is internal-only.
//
// The alias → executor mapping is characterized by
// tests/unit/executor-map-golden.test.ts (tests/snapshots/executors/): any
// change to keys, classes or instance sharing shows up as a golden diff.

const registry = new Map<string, BaseExecutor>();

/**
 * Register an executor under an alias. Aliases are unique: registering the
 * same alias twice throws, preserving the guarantee the old object literal
 * gave at compile time (duplicate keys were impossible).
 */
export function registerExecutor(alias: string, executor: BaseExecutor): void {
  if (registry.has(alias)) {
    throw new Error(`executor alias already registered: "${alias}"`);
  }
  registry.set(alias, executor);
}

export function getRegisteredExecutor(alias: string): BaseExecutor | undefined {
  return registry.get(alias);
}

// ── #11220: lazy registration ───────────────────────────────────────────────
// Aliases may register a deferred loader instead of an instance. The alias and
// its registration ORDER are declared eagerly — hasRegisteredExecutor() and
// listExecutorAliases() stay synchronous and the golden snapshot keeps its
// shape — while the class import + construction happen on first use. A
// completed load caches into `registry`, so later resolution is identical to a
// static registration.
const lazyLoaders = new Map<string, () => Promise<BaseExecutor>>();
const lazyInFlight = new Map<string, Promise<BaseExecutor>>();

export function registerLazyExecutor(alias: string, load: () => Promise<BaseExecutor>): void {
  if (registry.has(alias) || lazyLoaders.has(alias)) {
    throw new Error(`executor alias already registered: "${alias}"`);
  }
  lazyLoaders.set(alias, load);
}

export function loadRegisteredExecutor(alias: string): Promise<BaseExecutor> | undefined {
  const cached = registry.get(alias);
  if (cached) return Promise.resolve(cached);
  const load = lazyLoaders.get(alias);
  if (!load) return undefined;
  let inFlight = lazyInFlight.get(alias);
  if (!inFlight) {
    inFlight = load().then((executor) => {
      registerExecutor(alias, executor);
      lazyLoaders.delete(alias);
      lazyInFlight.delete(alias);
      return executor;
    });
    lazyInFlight.set(alias, inFlight);
  }
  return inFlight;
}

export function hasRegisteredExecutor(alias: string): boolean {
  return registry.has(alias) || lazyLoaders.has(alias);
}

/** All registered aliases — static and lazy — in registration order. */
export function listExecutorAliases(): string[] {
  return [...registry.keys(), ...lazyLoaders.keys()];
}
