import type { CompressionEngine, EngineRegistryEntry, EngineValidationResult } from "./types.ts";

const ENGINES = new Map<string, EngineRegistryEntry>();

function assertValidEngine(engine: CompressionEngine): void {
  if (
    !engine?.id ||
    typeof engine.apply !== "function" ||
    typeof engine.compress !== "function" ||
    typeof engine.getConfigSchema !== "function" ||
    typeof engine.validateConfig !== "function"
  ) {
    throw new Error("Invalid compression engine registration");
  }
}

export function registerEngine(
  engine: CompressionEngine,
  defaultConfig: Record<string, unknown> = {}
): void {
  assertValidEngine(engine);
  const validation = engine.validateConfig(defaultConfig);
  if (!validation.valid) {
    throw new Error(`Invalid default config for ${engine.id}: ${validation.errors.join("; ")}`);
  }
  ENGINES.set(engine.id, {
    engine,
    enabled: true,
    config: { ...defaultConfig },
  });
}

export function registerCompressionEngine(engine: CompressionEngine): void {
  registerEngine(engine);
}

export function unregisterCompressionEngine(id: string): boolean {
  return ENGINES.delete(id);
}

export function getEngine(id: string): CompressionEngine | null {
  return ENGINES.get(id)?.engine ?? null;
}

export function getCompressionEngine(id: string): CompressionEngine | null {
  return getEngine(id);
}

export function getEngineEntry(id: string): EngineRegistryEntry | null {
  return ENGINES.get(id) ?? null;
}

export function listEngines(): EngineRegistryEntry[] {
  return Array.from(ENGINES.values());
}

export function listCompressionEngines(): CompressionEngine[] {
  return listEngines().map((entry) => entry.engine);
}

export function listEnabledEngines(): EngineRegistryEntry[] {
  return listEngines().filter((entry) => entry.enabled);
}

export function setEngineEnabled(id: string, enabled: boolean): boolean {
  const entry = ENGINES.get(id);
  if (!entry) return false;
  entry.enabled = enabled;
  return true;
}

export function updateEngineConfig(
  id: string,
  config: Record<string, unknown>
): EngineValidationResult {
  const entry = ENGINES.get(id);
  if (!entry) return { valid: false, errors: [`Unknown compression engine: ${id}`] };
  const nextConfig = { ...entry.config, ...config };
  const validation = entry.engine.validateConfig(nextConfig);
  if (!validation.valid) return validation;
  entry.config = nextConfig;
  return { valid: true, errors: [] };
}

export function clearCompressionEngineRegistry(): void {
  ENGINES.clear();
}
