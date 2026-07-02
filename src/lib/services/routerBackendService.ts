import { getRouterBackend } from "@/domain/routing/routerBackends";
import type { RouterBackendDefinition, RouterBackendId } from "@/domain/routing/routerBackends";

export interface RouterBackendServiceMetadata {
  backend: RouterBackendDefinition;
  tool: string;
  port: number;
  healthPath: string;
}

function parsePort(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function getRouterBackendServiceMetadata(
  id: RouterBackendId,
  env: NodeJS.ProcessEnv = process.env
): RouterBackendServiceMetadata {
  const backend = getRouterBackend(id);
  if (!backend) {
    throw new Error(`Unknown router backend: ${id}`);
  }
  if (backend.lifecycle !== "supervised" || !backend.serviceName || !backend.defaultPort) {
    throw new Error(`Router backend is not a supervised service: ${id}`);
  }

  return {
    backend,
    tool: backend.serviceName,
    port: parsePort(backend.portEnv ? env[backend.portEnv] : undefined, backend.defaultPort),
    healthPath: backend.health.path ?? "/health",
  };
}

export function buildLoopbackUrl(port: number, path = ""): string {
  return `http://127.0.0.1:${port}${path}`;
}
