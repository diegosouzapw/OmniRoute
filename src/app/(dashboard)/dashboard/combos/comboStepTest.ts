import { resolveProviderAlias } from "@omniroute/open-sse/services/providerAlias.ts";
import { parseQualifiedModel } from "@/lib/combos/builderDraft";
import { extractErrorText } from "../models/catalogTestResponses";

// Per-step "Test" in the combo create/edit modal: probes one step through
// POST /api/models/test. Results live in a small module store keyed by the probed target
// (not the row index), so they survive reorder and follow the step when rows move.

export interface ComboStepTestTarget {
  providerId: string;
  modelId: string;
  connectionId?: string;
}

export interface ComboStepTestResult {
  state: "ok" | "error";
  latencyMs: number | null;
  error: string | null;
}

export type ComboStepTestSnapshot = ComboStepTestResult | { state: "running" };

type ProbeResponse = { status: number; json: () => Promise<unknown> };
type ProbeFetch = (
  url: string,
  init: { method: string; headers: Record<string, string>; body: string }
) => Promise<ProbeResponse>;

const MAX_ERROR_LENGTH = 240;
const MAX_STORED_RESULTS = 200;

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/** The probe body for a combo step, or null when the step is not a single model. */
export function resolveComboStepTestTarget(entry: unknown): ComboStepTestTarget | null {
  if (typeof entry !== "string" && (typeof entry !== "object" || entry === null)) return null;
  const step = typeof entry === "string" ? { model: entry } : (entry as Record<string, unknown>);
  if (step.kind === "combo-ref" || step.kind === "provider-wildcard") return null;

  const parsed = parseQualifiedModel(step.model);
  if (!parsed) return null;
  const providerId = nonEmptyString(step.providerId) || resolveProviderAlias(parsed.providerId);
  if (!providerId) return null;
  // The probe treats a modelId containing "/" as already qualified, so send the full model.
  const modelId = parsed.modelId.includes("/") ? String(step.model).trim() : parsed.modelId;
  const connectionId = nonEmptyString(step.connectionId);
  return connectionId ? { providerId, modelId, connectionId } : { providerId, modelId };
}

export function getComboStepTestKey(target: ComboStepTestTarget): string {
  return `${target.providerId}/${target.modelId}|${target.connectionId ?? ""}`;
}

/** Maps the probe reply to a result whose error is always a short string. */
export function mapComboStepTestResponse(httpStatus: number, body: unknown): ComboStepTestResult {
  const record =
    typeof body === "object" && body !== null && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : {};
  const latencyMs =
    typeof record.latencyMs === "number" && Number.isFinite(record.latencyMs)
      ? record.latencyMs
      : null;
  if (httpStatus >= 200 && httpStatus < 300 && record.status === "ok") {
    return { state: "ok", latencyMs, error: null };
  }
  const error = extractErrorText(record.error) || `Model test failed (HTTP ${httpStatus})`;
  return { state: "error", latencyMs, error: error.slice(0, MAX_ERROR_LENGTH) };
}

export function describeComboStepTestResult(result: ComboStepTestResult): string {
  return result.state === "ok" ? `${result.latencyMs ?? "?"}ms` : result.error || "";
}

const snapshots = new Map<string, ComboStepTestSnapshot>();
const listeners = new Set<() => void>();

function setSnapshot(key: string, snapshot: ComboStepTestSnapshot) {
  snapshots.delete(key);
  snapshots.set(key, snapshot);
  if (snapshots.size > MAX_STORED_RESULTS) {
    const oldest = snapshots.keys().next().value;
    if (oldest !== undefined) snapshots.delete(oldest);
  }
  for (const listener of listeners) listener();
}

export function subscribeComboStepTests(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getComboStepTestSnapshot(key: string): ComboStepTestSnapshot | undefined {
  return snapshots.get(key);
}

export function resetComboStepTests() {
  snapshots.clear();
  for (const listener of listeners) listener();
}

/** Runs one probe; a second call for the same target while it is running is ignored. */
export async function runComboStepTest(
  target: ComboStepTestTarget,
  fetchImpl: ProbeFetch = (url, init) => fetch(url, init)
): Promise<void> {
  const key = getComboStepTestKey(target);
  if (snapshots.get(key)?.state === "running") return;
  setSnapshot(key, { state: "running" });
  let result: ComboStepTestResult;
  try {
    const res = await fetchImpl("/api/models/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(target),
    });
    const body = await res.json().catch(() => null);
    result = mapComboStepTestResponse(res.status, body);
  } catch {
    result = { state: "error", latencyMs: null, error: "Network error" };
  }
  setSnapshot(key, result);
}
