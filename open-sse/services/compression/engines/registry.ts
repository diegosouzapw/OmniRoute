import type { CompressionEngine } from "./types.ts";

const ENGINES = new Map<string, CompressionEngine>();

export function registerCompressionEngine(engine: CompressionEngine): void {
  if (!engine?.id || typeof engine.apply !== "function") {
    throw new Error("Invalid compression engine registration");
  }
  ENGINES.set(engine.id, engine);
}

export function unregisterCompressionEngine(id: string): boolean {
  return ENGINES.delete(id);
}

export function getCompressionEngine(id: string): CompressionEngine | null {
  return ENGINES.get(id) ?? null;
}

export function listCompressionEngines(): CompressionEngine[] {
  return Array.from(ENGINES.values());
}

export function clearCompressionEngineRegistry(): void {
  ENGINES.clear();
}
