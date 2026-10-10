import {
  FACTORY_DOCS_MODELS_URL,
  resolveFactoryModelContract,
} from "@omniroute/open-sse/config/factory.ts";
import {
  FACTORY_MODELS,
  factoryPremiumMultiplierFor,
} from "@omniroute/open-sse/config/factoryModels.ts";
import type { RegistryModel } from "@omniroute/open-sse/config/providers/shared.ts";
import { SAFE_OUTBOUND_FETCH_PRESETS, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";

export const DISCOVERED_MODEL_LIMITS = {
  claude: { contextLength: 200_000, maxOutputTokens: 64_000 },
  "openai-responses": { contextLength: 400_000, maxOutputTokens: 128_000 },
  openai: { contextLength: 200_000, maxOutputTokens: 32_000 },
  gemini: { contextLength: 1_000_000, maxOutputTokens: 65_536 },
} as const;

export interface FactoryModelDocsEntry {
  id: string;
  displayName: string;
  multiplier?: number;
  reasoning?: string;
}

export interface FactoryDiscoveredModel extends RegistryModel {
  displayName?: string;
  multiplier?: number;
}

export const DISCOVERED_FACTORY_MULTIPLIERS: Record<string, number> = {};

export function getDiscoveredFactoryMultiplier(modelId: string): number | undefined {
  return DISCOVERED_FACTORY_MULTIPLIERS[modelId] ?? factoryPremiumMultiplierFor(modelId);
}

function stripDocsMarkup(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\\(.)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function parseMultiplier(cell: string | undefined): number | undefined {
  if (!cell) return undefined;
  const match = cell.trim().match(/([\d.]+)(?:[\s*×xX]|$)/);
  if (match && match[1]) {
    const parsed = parseFloat(match[1]);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
  }
  return undefined;
}

function formatFactoryModelName(displayName: string, quotaTier: "standard" | "core"): string {
  const trimmed = displayName.trim();
  if (trimmed.endsWith("(Factory)") || trimmed.endsWith("(Factory Core)")) {
    return trimmed;
  }
  return quotaTier === "core" ? `${trimmed} (Factory Core)` : `${trimmed} (Factory)`;
}

export function parseFactoryModelDocsEntries(markdown: string): FactoryModelDocsEntry[] {
  const entries: FactoryModelDocsEntry[] = [];
  const seenIds = new Set<string>();

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine.trim();
    if (!line.startsWith("|")) {
      continue;
    }

    const cells = line.split("|").map((cell) => cell.trim());
    if (cells.length < 4) {
      continue;
    }

    if (cells.some((c) => /^:?-+:?$/.test(c))) {
      continue;
    }

    let id: string | null = null;
    let nameCell: string = cells[1] ?? "";
    let multCell: string | undefined = cells[3];
    let reasoningCell: string | undefined = cells[4];

    const cell2Match = (cells[2] ?? "").match(/`([^`]+)`/);
    if (cell2Match && cell2Match[1]) {
      const candidateId = cell2Match[1].trim();
      if (candidateId && resolveFactoryModelContract(candidateId)) {
        id = candidateId;
      }
    }

    if (!id) {
      for (let i = 1; i < cells.length; i++) {
        const match = (cells[i] ?? "").match(/`([^`]+)`/);
        if (match && match[1]) {
          const candidateId = match[1].trim();
          if (candidateId && resolveFactoryModelContract(candidateId)) {
            id = candidateId;
            nameCell = i > 1 ? (cells[i - 1] ?? cells[1] ?? "") : (cells[i + 1] ?? "");
            multCell = cells[i + 1];
            reasoningCell = cells[i + 2];
            break;
          }
        }
      }
    }

    if (!id) {
      continue;
    }

    if (seenIds.has(id)) {
      continue;
    }
    seenIds.add(id);

    const rawName = stripDocsMarkup(nameCell)
      .replace(/[\s*†‡§\\^]+$/u, "")
      .trim();
    const displayName = rawName.length > 0 ? rawName : id;
    const multiplier = parseMultiplier(multCell);
    const reasoning = reasoningCell ? stripDocsMarkup(reasoningCell) : undefined;

    entries.push({
      id,
      displayName,
      multiplier,
      reasoning,
    });
  }

  return entries;
}

export function docsEntryToModel(
  entry: FactoryModelDocsEntry,
  curatedModels: readonly RegistryModel[] = FACTORY_MODELS
): FactoryDiscoveredModel | null {
  const contract = resolveFactoryModelContract(entry.id);
  if (!contract) return null;

  if (entry.multiplier !== undefined) {
    DISCOVERED_FACTORY_MULTIPLIERS[entry.id] = entry.multiplier;
  }

  const existing = curatedModels.find((m) => m.id === entry.id);
  if (existing) {
    const multiplier = entry.multiplier ?? factoryPremiumMultiplierFor(existing.id);
    if (multiplier !== undefined) {
      DISCOVERED_FACTORY_MULTIPLIERS[existing.id] = multiplier;
    }
    return {
      ...existing,
      displayName: entry.displayName,
      ...(multiplier !== undefined ? { multiplier } : {}),
    };
  }

  const name = formatFactoryModelName(entry.displayName, contract.quotaTier);
  const commonEfforts = ["minimal", "low", "medium", "high", "xhigh", "max"] as const;

  switch (contract.targetFormat) {
    case "claude": {
      return {
        id: entry.id,
        name,
        displayName: entry.displayName,
        toolCalling: true,
        supportsReasoning: true,
        supportedThinkingEfforts: commonEfforts,
        ...(contract.upstreamProvider === "anthropic" ? { supportsVision: true } : {}),
        contextLength: DISCOVERED_MODEL_LIMITS.claude.contextLength,
        maxOutputTokens: DISCOVERED_MODEL_LIMITS.claude.maxOutputTokens,
        targetFormat: "claude",
        ...(entry.multiplier !== undefined ? { multiplier: entry.multiplier } : {}),
      };
    }
    case "openai-responses": {
      return {
        id: entry.id,
        name,
        displayName: entry.displayName,
        toolCalling: true,
        supportsReasoning: true,
        supportedThinkingEfforts: commonEfforts,
        supportsVision: true,
        contextLength: DISCOVERED_MODEL_LIMITS["openai-responses"].contextLength,
        maxOutputTokens: DISCOVERED_MODEL_LIMITS["openai-responses"].maxOutputTokens,
        targetFormat: "openai-responses",
        ...(entry.multiplier !== undefined ? { multiplier: entry.multiplier } : {}),
      };
    }
    case "openai": {
      return {
        id: entry.id,
        name,
        displayName: entry.displayName,
        toolCalling: true,
        supportsReasoning: true,
        supportedThinkingEfforts: commonEfforts,
        contextLength: DISCOVERED_MODEL_LIMITS.openai.contextLength,
        maxOutputTokens: DISCOVERED_MODEL_LIMITS.openai.maxOutputTokens,
        targetFormat: "openai",
        interleavedField: "reasoning_content",
        ...(entry.multiplier !== undefined ? { multiplier: entry.multiplier } : {}),
      };
    }
    case "gemini": {
      return {
        id: entry.id,
        name,
        displayName: entry.displayName,
        toolCalling: true,
        supportsReasoning: true,
        supportedThinkingEfforts: commonEfforts,
        supportsVision: true,
        contextLength: DISCOVERED_MODEL_LIMITS.gemini.contextLength,
        maxOutputTokens: DISCOVERED_MODEL_LIMITS.gemini.maxOutputTokens,
        targetFormat: "gemini",
        ...(entry.multiplier !== undefined ? { multiplier: entry.multiplier } : {}),
      };
    }
    default:
      return null;
  }
}

export function parseFactoryModelDocs(markdown: string): RegistryModel[] {
  const entries = parseFactoryModelDocsEntries(markdown);
  const models: RegistryModel[] = [];

  for (const entry of entries) {
    const model = docsEntryToModel(entry, FACTORY_MODELS);
    if (model) {
      models.push(model);
    }
  }

  return models;
}

export function mergeFactoryDocsModels(
  curated: readonly RegistryModel[] = FACTORY_MODELS,
  docsModels: readonly RegistryModel[] = []
): RegistryModel[] {
  const merged: RegistryModel[] = [...curated];
  const seenIds = new Set<string>(curated.map((m) => m.id));

  for (const docModel of docsModels) {
    if (seenIds.has(docModel.id)) {
      continue;
    }
    merged.push(docModel);
    seenIds.add(docModel.id);
  }

  return merged;
}

export const mergeDocsModels = mergeFactoryDocsModels;

export async function discoverFactoryModels(
  fetchImpl: typeof fetch = ((url: string | URL, init?: RequestInit) =>
    safeOutboundFetch(url, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery,
      guard: "public-only",
      ...init,
    })) as typeof fetch
): Promise<RegistryModel[]> {
  const timeoutMs = SAFE_OUTBOUND_FETCH_PRESETS.modelsDiscovery.timeoutMs ?? 10_000;
  let response: Response;
  try {
    response = await fetchImpl(FACTORY_DOCS_MODELS_URL, {
      method: "GET",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        Accept: "text/markdown,text/plain;q=0.9,*/*;q=0.1",
      },
    });
  } catch (error) {
    throw new Error(
      `factory: model docs fetch failed: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }

  if (!response.ok) {
    throw new Error(`factory: model docs fetch failed: HTTP ${response.status}`);
  }

  const markdown = await response.text();
  const docsModels = parseFactoryModelDocs(markdown);
  if (docsModels.length === 0) {
    throw new Error("factory: model docs parsed to zero supported entries — docs format changed?");
  }

  return mergeFactoryDocsModels(FACTORY_MODELS, docsModels);
}
