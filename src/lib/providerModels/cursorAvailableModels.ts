/**
 * Fetch Cursor Available Models via HTTP (no cursor-agent binary required).
 * Uses Connect-RPC JSON against api2.cursor.sh AiService/AvailableModels.
 */

import { CURSOR_CONFIG } from "@/lib/oauth/constants/oauth";
import { CursorService } from "@/lib/oauth/services/cursor";
import {
  humanizeCursorModelId,
  type CursorAgentModelEntry,
} from "@/lib/providerModels/cursorAgent";
import { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";
import { getConsistentMachineId } from "@/shared/utils/machineId";

export { ensureCursorAutoCatalogEntry } from "@/lib/providerModels/cursorAutoCatalog";

export type FetchCursorAvailableModelsOptions = {
  accessToken: string;
  machineId?: string | null;
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function pickModelId(entry: Record<string, unknown>): string | null {
  for (const key of ["name", "modelId", "model_id", "id", "slug"]) {
    const v = entry[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

function pickModelName(entry: Record<string, unknown>, id: string): string {
  for (const key of ["displayName", "display_name", "title", "label"]) {
    const v = entry[key];
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return humanizeCursorModelId(id);
}

function collectArrays(record: Record<string, unknown>, keys: string[]): unknown[] {
  return keys.flatMap((key) => (Array.isArray(record[key]) ? record[key] : []));
}

function collectModelCandidates(payload: unknown): unknown[] {
  const root = asRecord(payload) ?? {};
  const candidates = collectArrays(root, [
    "models",
    "availableModels",
    "available_models",
    "model",
  ]);
  const nestedModels = asRecord(root.models);
  if (nestedModels) candidates.push(...collectArrays(nestedModels, ["models", "items", "list"]));
  if (Array.isArray(payload)) candidates.push(...payload);
  return candidates;
}

function isUnavailableModel(entry: Record<string, unknown>): boolean {
  return (
    entry.disabled === true ||
    entry.isDisabled === true ||
    entry.usable === false ||
    entry.isUsable === false
  );
}

function normalizeModelCandidate(item: unknown): CursorAgentModelEntry | null {
  if (typeof item === "string") {
    const id = item.trim();
    return id ? { id, name: humanizeCursorModelId(id), owned_by: "cursor" } : null;
  }

  const entry = asRecord(item);
  if (!entry || isUnavailableModel(entry)) return null;
  const id = pickModelId(entry);
  return id ? { id, name: pickModelName(entry, id), owned_by: "cursor" } : null;
}

/**
 * Normalize AvailableModels JSON (Connect JSON or protobuf-json) into catalog rows.
 * Exported for unit tests.
 *
 * Always ensures catalog id `auto` is present (Cursor often returns wire id `default`
 * only). OmniRoute clients request `cu/auto`; resolveRequestedModel maps it to `default`.
 */
export function normalizeCursorAvailableModelsPayload(payload: unknown): CursorAgentModelEntry[] {
  const seen = new Set<string>();
  const out: CursorAgentModelEntry[] = [];
  for (const item of collectModelCandidates(payload)) {
    const model = normalizeModelCandidate(item);
    if (!model || seen.has(model.id)) continue;
    seen.add(model.id);
    out.push(model);
  }

  return ensureCursorAutoCatalogEntry(out);
}

export async function fetchCursorAvailableModels(
  options: FetchCursorAvailableModelsOptions
): Promise<CursorAgentModelEntry[]> {
  const { accessToken, signal } = options;
  if (!accessToken) throw new Error("Cursor access token is required for AvailableModels");

  const machineId = options.machineId || (await getConsistentMachineId());
  const cursorService = new CursorService();
  const headers = {
    ...cursorService.buildHeaders(accessToken, machineId),
    // Prefer Connect JSON so we can parse without a protobuf schema
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const url = `${CURSOR_CONFIG.apiEndpoint}${CURSOR_CONFIG.modelsEndpoint}`;
  const fetchImpl = options.fetchImpl || fetch;
  const response = await fetchImpl(url, {
    method: "POST",
    headers,
    body: "{}",
    signal,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `Cursor AvailableModels failed: ${response.status}${text ? ` ${text.slice(0, 200)}` : ""}`
    );
  }

  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("proto") || contentType.includes("protobuf")) {
    throw new Error(
      "Cursor AvailableModels returned protobuf; JSON catalog unavailable for this client version"
    );
  }

  const payload = await response.json();
  const models = normalizeCursorAvailableModelsPayload(payload);
  if (models.length === 0) {
    throw new Error("Cursor AvailableModels returned no models");
  }
  return models;
}
