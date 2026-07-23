export type ServerLifecyclePhase = "starting" | "ready" | "stopping";

declare global {
  var __omnirouteServerLifecycle: ServerLifecyclePhase | undefined;
}

export function getServerLifecyclePhase(): ServerLifecyclePhase {
  return globalThis.__omnirouteServerLifecycle ?? "starting";
}

export function markServerStarting(): void {
  globalThis.__omnirouteServerLifecycle = "starting";
}

export function markServerReady(): void {
  if (getServerLifecyclePhase() !== "stopping") {
    globalThis.__omnirouteServerLifecycle = "ready";
  }
}

export function markServerStopping(): void {
  globalThis.__omnirouteServerLifecycle = "stopping";
}
