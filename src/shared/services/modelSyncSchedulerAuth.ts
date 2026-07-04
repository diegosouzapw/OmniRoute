import { randomUUID } from "node:crypto";
import { getRuntimePorts } from "@/lib/runtime/ports";

const MODEL_SYNC_INTERNAL_AUTH_HEADER = "x-model-sync-internal-auth";
const { dashboardPort } = getRuntimePorts();

const INTERNAL_BASE_URL =
  process.env.BASE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  `http://127.0.0.1:${dashboardPort}`;

/**
 * Trusted origin for server-internal self-fetches (model sync, auto-discovery).
 */
export function getModelSyncInternalBaseUrl(): string {
  return INTERNAL_BASE_URL;
}

const globalState = globalThis as typeof globalThis & {
  __omnirouteModelSyncInternalAuthToken?: string;
};

let internalAuthToken: string | null = null;

function getInternalAuthToken(): string {
  if (!internalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken || randomUUID();
    globalState.__omnirouteModelSyncInternalAuthToken = internalAuthToken;
  }
  return internalAuthToken;
}

export function getModelSyncInternalAuthHeaderName(): string {
  return MODEL_SYNC_INTERNAL_AUTH_HEADER;
}

export function buildModelSyncInternalHeaders(): Record<string, string> {
  return { [MODEL_SYNC_INTERNAL_AUTH_HEADER]: getInternalAuthToken() };
}

export function isModelSyncInternalRequest(request: { headers: Headers }): boolean {
  if (!internalAuthToken && globalState.__omnirouteModelSyncInternalAuthToken) {
    internalAuthToken = globalState.__omnirouteModelSyncInternalAuthToken;
  }
  const headerToken = request.headers.get(MODEL_SYNC_INTERNAL_AUTH_HEADER);
  return Boolean(headerToken && internalAuthToken && headerToken === internalAuthToken);
}
