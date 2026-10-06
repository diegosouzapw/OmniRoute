import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { logToolCall } from "./audit.ts";
import { radarCatalogInput, radarCatalogOutput } from "./schemas/radarCatalog.ts";
import type { McpToolExtraLike } from "./scopeEnforcement.ts";
import type { TextToolResult } from "./toolResult.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

type JsonRecord = Record<string, unknown>;

type ScopeEnforcer = (
  toolName: string,
  handler: (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>,
  toolScopes?: readonly string[]
) => (args: unknown, extra?: McpToolExtraLike) => Promise<TextToolResult>;

export interface McpRadarCatalogArgs {
  provider?: string;
  familyId?: string;
  enabledOnly?: boolean;
}

interface McpRadarCatalogDeps {
  fetchJson?: (path: string) => Promise<unknown>;
}

function record(value: unknown): JsonRecord {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function number(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : 0;
}

function nullableNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function normalizeMeta(
  value: unknown
): { version: string; tier: string; fetchedAt: string } | null {
  const meta = record(value);
  if (
    typeof meta.version !== "string" ||
    typeof meta.tier !== "string" ||
    typeof meta.fetchedAt !== "string"
  ) {
    return null;
  }
  return { version: meta.version, tier: meta.tier, fetchedAt: meta.fetchedAt };
}

function normalizeEntry(value: unknown) {
  const entry = record(value);
  const provider = text(entry.provider).trim();
  const modelId = text(entry.modelId).trim();
  if (!provider || !modelId) return null;

  const capabilities = record(entry.capabilities);
  const limits = record(entry.limits);
  const origin =
    entry.origin === "radar" || entry.origin === "local" ? entry.origin : ("baseline" as const);
  return {
    provider,
    modelId,
    displayName: text(entry.displayName, modelId),
    familyId: typeof entry.familyId === "string" ? entry.familyId : null,
    quota: {
      monthlyTokens: number(entry.monthlyTokens),
      creditTokens: number(entry.creditTokens),
      freeType: text(entry.freeType, "unknown"),
      limits:
        Object.keys(limits).length > 0
          ? {
              rpm: nullableNumber(limits.rpm),
              rpd: nullableNumber(limits.rpd),
              tpm: nullableNumber(limits.tpm),
              tpd: nullableNumber(limits.tpd),
            }
          : null,
    },
    capabilities:
      Object.keys(capabilities).length > 0
        ? {
            tools: capabilities.tools === true,
            vision: capabilities.vision === true,
            thinking: capabilities.thinking === true,
          }
        : null,
    enabled: entry.enabled !== false,
    origin,
    disabledBy: entry.disabledBy === "radar" ? ("radar" as const) : null,
  };
}

function compareEntries(
  left: NonNullable<ReturnType<typeof normalizeEntry>>,
  right: NonNullable<ReturnType<typeof normalizeEntry>>
): number {
  return left.provider.localeCompare(right.provider) || left.modelId.localeCompare(right.modelId);
}

/** Read and project the local Radar catalog without exposing setup or secret-bearing state. */
export async function getMcpRadarCatalog(
  args: McpRadarCatalogArgs,
  deps: McpRadarCatalogDeps = {}
) {
  const fetchJson =
    deps.fetchJson ??
    ((path: string) => import("./server.ts").then((module) => module.omniRouteFetch(path)));
  const raw = record(await fetchJson("/api/radar/catalog"));
  const providerFilter = args.provider?.trim().toLowerCase();
  const familyFilter = args.familyId?.trim().toLowerCase();
  const enabledOnly = args.enabledOnly !== false;
  const entries = Array.isArray(raw.entries) ? raw.entries : [];
  const models = entries
    .map(normalizeEntry)
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null)
    .filter((entry) => !enabledOnly || entry.enabled)
    .filter((entry) => !providerFilter || entry.provider.toLowerCase() === providerFilter)
    .filter((entry) => !familyFilter || entry.familyId?.toLowerCase() === familyFilter)
    .sort(compareEntries);

  return { meta: normalizeMeta(raw.meta), models };
}

async function handleRadarCatalog(args: {
  provider?: string;
  familyId?: string;
  enabledOnly: boolean;
}): Promise<TextToolResult> {
  const start = Date.now();
  try {
    const result = radarCatalogOutput.parse(await getMcpRadarCatalog(args));
    await logToolCall(
      "omniroute_radar_catalog",
      args,
      { modelCount: result.models.length },
      Date.now() - start,
      true
    );
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (error) {
    const message = sanitizeErrorMessage(error) || "Failed to read Radar catalog";
    await logToolCall("omniroute_radar_catalog", args, null, Date.now() - start, false, message);
    return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
  }
}

export function registerRadarCatalogTool(
  server: McpServer,
  withScopeEnforcement: ScopeEnforcer
): void {
  server.registerTool(
    "omniroute_radar_catalog",
    {
      description: "Reads the local signed Radar catalog with optional provider and family filters",
      inputSchema: radarCatalogInput,
    },
    withScopeEnforcement("omniroute_radar_catalog", (args) =>
      handleRadarCatalog(radarCatalogInput.parse(args))
    )
  );
}
