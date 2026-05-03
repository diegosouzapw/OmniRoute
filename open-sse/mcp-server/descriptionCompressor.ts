import { applyRulesToText } from "../services/compression/caveman.ts";
import { getRulesForContext } from "../services/compression/cavemanRules.ts";
import {
  extractPreservedBlocks,
  restorePreservedBlocks,
} from "../services/compression/preservation.ts";

export interface DescriptionCompressionResult {
  compressed: string;
  before: number;
  after: number;
  changed: boolean;
}

export interface DescriptionCompressionOptions {
  enabled?: boolean;
}

export interface McpDescriptionCompressionStats {
  descriptionsCompressed: number;
  charsBefore: number;
  charsAfter: number;
  charsSaved: number;
  estimatedTokensSaved: number;
}

const descriptionCompressionStats: McpDescriptionCompressionStats = {
  descriptionsCompressed: 0,
  charsBefore: 0,
  charsAfter: 0,
  charsSaved: 0,
  estimatedTokensSaved: 0,
};

const persistedDescriptionCompressionStats: McpDescriptionCompressionStats = {
  descriptionsCompressed: 0,
  charsBefore: 0,
  charsAfter: 0,
  charsSaved: 0,
  estimatedTokensSaved: 0,
};

const MCP_LIST_CONTAINER_KEYS = new Set(["tools", "prompts", "resources", "resourceTemplates"]);
const MCP_METADATA_DESCRIPTION_FIELDS = ["description"];

function isDisabledEnvValue(value: string | undefined): boolean {
  return !!value && ["0", "false", "off", "no"].includes(value.trim().toLowerCase());
}

export function isMcpDescriptionCompressionEnabled(
  options: DescriptionCompressionOptions = {}
): boolean {
  if (isDisabledEnvValue(process.env.OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS)) return false;
  if (isDisabledEnvValue(process.env.OMNIROUTE_MCP_DESCRIPTION_COMPRESSION)) return false;
  return options.enabled !== false;
}

export function compressMcpDescription(description: string): DescriptionCompressionResult {
  if (!description) {
    return { compressed: description, before: 0, after: 0, changed: false };
  }

  const { text, blocks } = extractPreservedBlocks(description);
  const rules = getRulesForContext("all", "full");
  const applied = applyRulesToText(text, rules).text;
  const normalized = applied
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/(^|[.!?]\s+)([a-z])/g, (_match, prefix: string, char: string) => {
      return `${prefix}${char.toUpperCase()}`;
    })
    .trim();
  const compressed = restorePreservedBlocks(normalized, blocks);

  return {
    compressed,
    before: description.length,
    after: compressed.length,
    changed: compressed !== description,
  };
}

export function maybeCompressMcpDescription(
  description: string,
  options: DescriptionCompressionOptions = {}
): string {
  if (!isMcpDescriptionCompressionEnabled(options)) return description;
  const result = compressMcpDescription(description);
  if (result.changed && result.after < result.before) {
    descriptionCompressionStats.descriptionsCompressed += 1;
    descriptionCompressionStats.charsBefore += result.before;
    descriptionCompressionStats.charsAfter += result.after;
    descriptionCompressionStats.charsSaved += result.before - result.after;
    descriptionCompressionStats.estimatedTokensSaved += Math.ceil(
      (result.before - result.after) / 4
    );
    return result.compressed;
  }
  return description;
}

export function compressDescriptionsInPlace(
  value: unknown,
  fieldNames: string[] = ["description"],
  options: DescriptionCompressionOptions = {}
): void {
  if (!value || typeof value !== "object") return;
  const fields = new Set(fieldNames);
  if (Array.isArray(value)) {
    for (const item of value) compressDescriptionsInPlace(item, fieldNames, options);
    return;
  }

  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (fields.has(key) && typeof nested === "string") {
      (value as Record<string, unknown>)[key] = maybeCompressMcpDescription(nested, options);
    } else if (nested && typeof nested === "object") {
      compressDescriptionsInPlace(nested, fieldNames, options);
    }
  }
}

function clonePlainMetadata<T>(value: T): T {
  if (!value || typeof value !== "object") return value;
  return JSON.parse(JSON.stringify(value)) as T;
}

function compressMcpListContainersInPlace(
  value: unknown,
  options: DescriptionCompressionOptions = {}
): void {
  if (!value || typeof value !== "object") return;
  if (Array.isArray(value)) {
    for (const item of value) compressMcpListContainersInPlace(item, options);
    return;
  }

  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    if (MCP_LIST_CONTAINER_KEYS.has(key) && Array.isArray(nested)) {
      compressDescriptionsInPlace(nested, MCP_METADATA_DESCRIPTION_FIELDS, options);
    } else if (nested && typeof nested === "object") {
      compressMcpListContainersInPlace(nested, options);
    }
  }
}

export function compressMcpListMetadata<T>(
  value: T,
  options: DescriptionCompressionOptions = {}
): T {
  if (!isMcpDescriptionCompressionEnabled(options)) return value;
  const clone = clonePlainMetadata(value);
  compressMcpListContainersInPlace(clone, options);
  return clone;
}

export function compressMcpRegistryMetadata<T extends Record<string, unknown>>(
  metadata: T,
  options: DescriptionCompressionOptions = {}
): T {
  if (!isMcpDescriptionCompressionEnabled(options)) return metadata;
  const clone: Record<string, unknown> = { ...metadata };
  if (typeof clone.description === "string") {
    clone.description = maybeCompressMcpDescription(clone.description, options);
  }
  return clone as T;
}

export function getMcpDescriptionCompressionStats(): McpDescriptionCompressionStats {
  return { ...descriptionCompressionStats };
}

function getUnpersistedMcpDescriptionCompressionStats(): McpDescriptionCompressionStats {
  return {
    descriptionsCompressed:
      descriptionCompressionStats.descriptionsCompressed -
      persistedDescriptionCompressionStats.descriptionsCompressed,
    charsBefore:
      descriptionCompressionStats.charsBefore - persistedDescriptionCompressionStats.charsBefore,
    charsAfter:
      descriptionCompressionStats.charsAfter - persistedDescriptionCompressionStats.charsAfter,
    charsSaved:
      descriptionCompressionStats.charsSaved - persistedDescriptionCompressionStats.charsSaved,
    estimatedTokensSaved:
      descriptionCompressionStats.estimatedTokensSaved -
      persistedDescriptionCompressionStats.estimatedTokensSaved,
  };
}

export async function snapshotMcpDescriptionCompressionStats(): Promise<McpDescriptionCompressionStats> {
  const delta = getUnpersistedMcpDescriptionCompressionStats();
  if (
    delta.descriptionsCompressed <= 0 ||
    delta.charsSaved <= 0 ||
    delta.estimatedTokensSaved <= 0
  ) {
    return {
      descriptionsCompressed: 0,
      charsBefore: 0,
      charsAfter: 0,
      charsSaved: 0,
      estimatedTokensSaved: 0,
    };
  }

  const originalTokens = Math.max(delta.estimatedTokensSaved, Math.ceil(delta.charsBefore / 4));
  const compressedTokens = Math.max(0, originalTokens - delta.estimatedTokensSaved);
  const { insertCompressionAnalyticsRow } =
    await import("../../src/lib/db/compressionAnalytics.ts");
  insertCompressionAnalyticsRow({
    timestamp: new Date().toISOString(),
    mode: "mcp-description",
    engine: "mcp-description",
    original_tokens: originalTokens,
    compressed_tokens: compressedTokens,
    tokens_saved: delta.estimatedTokensSaved,
    mcp_description_tokens_saved: delta.estimatedTokensSaved,
  });

  persistedDescriptionCompressionStats.descriptionsCompressed =
    descriptionCompressionStats.descriptionsCompressed;
  persistedDescriptionCompressionStats.charsBefore = descriptionCompressionStats.charsBefore;
  persistedDescriptionCompressionStats.charsAfter = descriptionCompressionStats.charsAfter;
  persistedDescriptionCompressionStats.charsSaved = descriptionCompressionStats.charsSaved;
  persistedDescriptionCompressionStats.estimatedTokensSaved =
    descriptionCompressionStats.estimatedTokensSaved;

  return delta;
}

export function resetMcpDescriptionCompressionStats(): void {
  descriptionCompressionStats.descriptionsCompressed = 0;
  descriptionCompressionStats.charsBefore = 0;
  descriptionCompressionStats.charsAfter = 0;
  descriptionCompressionStats.charsSaved = 0;
  descriptionCompressionStats.estimatedTokensSaved = 0;
  persistedDescriptionCompressionStats.descriptionsCompressed = 0;
  persistedDescriptionCompressionStats.charsBefore = 0;
  persistedDescriptionCompressionStats.charsAfter = 0;
  persistedDescriptionCompressionStats.charsSaved = 0;
  persistedDescriptionCompressionStats.estimatedTokensSaved = 0;
}
