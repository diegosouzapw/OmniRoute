/**
 * Client-side fetch helpers for the AgentBridge maintenance & diagnostics card.
 *
 * These drive backend routes that already shipped but had no UI:
 *   - GET  /api/tools/agent-bridge/diagnose  (#4093, Gap 12) — capture self-test
 *   - DELETE /api/tools/agent-bridge/cert    (#4084, Gap 9)  — untrust the root CA
 *   - POST /api/tools/agent-bridge/repair    (#4084, Gap 7)  — undo orphaned state
 *   - GET/POST /api/tools/agent-bridge/config (#4094, Gap 4) — portable config
 *
 * Kept DOM-free (the download/upload glue lives in the component) so the
 * request/response/error handling is unit-testable by stubbing global.fetch.
 * Types are imported type-only from the server modules so this client bundle
 * never pulls their DB dependencies.
 */
import type { DiagnosticReport } from "@/mitm/inspector/diagnostics";
import type { AgentBridgeConfig, ImportResult } from "@/lib/inspector/configPortability";

export interface DiagnoseResult extends DiagnosticReport {
  /** The port the diagnose route probed (echoed back for display). */
  port: number;
}

/** Extract the sanitized server error message, falling back to the status. */
async function errorMessage(res: Response): Promise<string> {
  const body = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
  return body?.error?.message ?? `HTTP ${res.status}`;
}

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(await errorMessage(res));
  return (await res.json()) as T;
}

/** Run the capture-pipeline self-test (server/cert/dns reachability). */
export function runDiagnose(): Promise<DiagnoseResult> {
  return requestJson<DiagnoseResult>("/api/tools/agent-bridge/diagnose");
}

/** Untrust + remove the MITM root CA from the OS store (explicit, idempotent). */
export function removeCaCert(): Promise<{ trusted: boolean }> {
  return requestJson<{ ok: boolean; trusted: boolean }>("/api/tools/agent-bridge/cert", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

/** Undo orphaned system state (DNS spoof, root CA, system proxy) after a crash. */
export function repairMitmState(): Promise<{ repaired: string[] }> {
  return requestJson<{ ok: boolean; repaired: string[] }>("/api/tools/agent-bridge/repair", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
}

/** Read the portable AgentBridge config blob (bypass + hosts + mappings). */
export function fetchAgentBridgeConfig(): Promise<AgentBridgeConfig> {
  return requestJson<AgentBridgeConfig>("/api/tools/agent-bridge/config");
}

/** Import a previously-exported config; returns how many of each were applied. */
export function importAgentBridgeConfig(config: AgentBridgeConfig): Promise<ImportResult> {
  return requestJson<{ ok: boolean } & ImportResult>("/api/tools/agent-bridge/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
}
