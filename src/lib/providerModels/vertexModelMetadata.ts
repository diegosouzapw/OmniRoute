const VERTEX_DOCS_BASE = "https://docs.cloud.google.com/gemini-enterprise-agent-platform/models";
const VERTEX_DOCS_PARSER_VERSION = "vertex-docs-v1";
const FRESH_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const STALE_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_CONCURRENT_FETCHES = 6;

export type VertexMetadataField = "contextWindow" | "inputTokenLimit" | "outputTokenLimit";

export interface VertexDocsMetadataProvenance {
  source: "google-cloud-docs";
  sourceUrl: string;
  fetchedAt: string;
  lastModified?: string;
  parserVersion: typeof VERTEX_DOCS_PARSER_VERSION;
  confidence: "verified";
  fields: VertexMetadataField[];
}

export interface VertexModelMetadataProvenance {
  vertexDocs: VertexDocsMetadataProvenance;
}

export interface VertexModelMetadata {
  contextWindow?: number;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  metadataProvenance?: VertexModelMetadataProvenance;
}

export interface VertexMetadataModel {
  id: string;
  name?: string;
  contextWindow?: number;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  metadataProvenance?: VertexModelMetadataProvenance;
}

export type VertexMetadataFetch = (url: string, init: RequestInit) => Promise<Response>;

interface ParsedDocsMetadata {
  contextWindow?: number;
  inputTokenLimit?: number;
  outputTokenLimit?: number;
}

interface CachedDocsPage {
  fetchedAtMs: number;
  rows: string[][];
  sourceUrl: string;
  lastModified?: string;
}

const docsCache = new Map<string, CachedDocsPage>();
const docsInflight = new Map<string, Promise<CachedDocsPage | null>>();

function terminalModelId(modelId: string): string {
  const segments = modelId.trim().split("/");
  return segments[segments.length - 1] || modelId.trim();
}

function docsSlug(value: string): string {
  return value.toLowerCase().replace(/[._]/g, "-");
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}

/** Resolve official Google Cloud documentation candidates without using user-controlled hosts. */
export function resolveVertexModelDocsUrls(modelId: string): string[] {
  const normalized = modelId.trim().toLowerCase();
  const bareId = terminalModelId(normalized);
  const slug = docsSlug(bareId);

  if (/^gemini-/.test(bareId)) {
    return [`${VERTEX_DOCS_BASE}/gemini/${slug.replace(/^gemini-/, "")}?hl=en`];
  }

  if (/^claude-/.test(bareId)) {
    return [`${VERTEX_DOCS_BASE}/partner-models/claude/${slug.replace(/^claude-/, "")}?hl=en`];
  }

  if (/^mistral-/.test(bareId)) {
    return [`${VERTEX_DOCS_BASE}/partner-models/mistral/${slug}?hl=en`];
  }

  if (normalized.startsWith("xai/") && /^grok-/.test(bareId)) {
    const familySlug = slug.replace(/-(?:non-)?reasoning$/, "");
    return [`${VERTEX_DOCS_BASE}/partner-models/grok/${familySlug}?hl=en`];
  }

  const namespaceSeparator = normalized.indexOf("/");
  if (namespaceSeparator > 0) {
    const publisher = docsSlug(normalized.slice(0, namespaceSeparator));
    const withoutMaasSuffix = slug.replace(/-maas$/, "");
    return unique([
      `${VERTEX_DOCS_BASE}/maas/${publisher}/${slug}?hl=en`,
      `${VERTEX_DOCS_BASE}/maas/${publisher}/${withoutMaasSuffix}?hl=en`,
    ]);
  }

  return [];
}

function parsePositiveInteger(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const normalized = value.replace(/[\s,]/g, "");
  if (!/^\d+$/.test(normalized)) return undefined;
  const parsed = Number(normalized);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function extractLabeledNumber(text: string, label: RegExp): number | undefined {
  const match = text.match(new RegExp(`${label.source}\\s*:?\\s*([0-9][0-9,]*)`, "i"));
  return parsePositiveInteger(match?.[1]);
}

function modelIdAppearsInRow(rowText: string, modelId: string): boolean {
  const escaped = modelId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9._/-])${escaped}(?:$|[^a-z0-9._/-])`, "i").test(rowText);
}

function decodeHtmlEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);/gi, (entity, token: string) => {
    if (token.startsWith("#")) {
      const hexadecimal = token[1]?.toLowerCase() === "x";
      const parsed = Number.parseInt(token.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10);
      if (Number.isInteger(parsed) && parsed >= 0 && parsed <= 0x10ffff) {
        return String.fromCodePoint(parsed);
      }
      return entity;
    }
    return namedEntities[token.toLowerCase()] ?? entity;
  });
}

function htmlFragmentToText(fragment: string): string {
  return decodeHtmlEntities(
    fragment
      .replace(/<(?:script|style)\b[^>]*>[\s\S]*?<\/(?:script|style)\s*>/gi, " ")
      .replace(/<(?:br|hr)\b[^>]*\/?\s*>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Extract only the table cells needed for metadata matching. Google Cloud model pages are around
 * 400 KB each; constructing full JSDOM windows for the live catalog expanded those pages to
 * hundreds of megabytes. Keeping compact row text avoids both that transient heap spike and
 * retaining raw HTML in the 24-hour cache.
 */
function extractTableRows(html: string): string[][] {
  const rows: string[][] = [];
  const rowPattern = /<tr\b[^>]*>([\s\S]*?)<\/tr\s*>/gi;
  let rowMatch: RegExpExecArray | null;
  while ((rowMatch = rowPattern.exec(html))) {
    const cells: string[] = [];
    const cellPattern = /<(th|td)\b[^>]*>([\s\S]*?)<\/\1\s*>/gi;
    let cellMatch: RegExpExecArray | null;
    while ((cellMatch = cellPattern.exec(rowMatch[1]))) {
      cells.push(htmlFragmentToText(cellMatch[2]));
    }
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

function parseVertexModelDocsRows(
  rows: string[][],
  expectedModelId: string
): ParsedDocsMetadata | null {
  const bareId = terminalModelId(expectedModelId);
  const hasExactModelId = rows.some((cells) => {
    const label = cells[0]?.toLowerCase();
    const value = cells.slice(1).join(" ");
    return label === "model id" && modelIdAppearsInRow(value, bareId);
  });
  if (!hasExactModelId) return null;

  const parsed: ParsedDocsMetadata = {};
  for (const cells of rows) {
    const text = cells.join(" ");

    const contextWindow =
      extractLabeledNumber(text, /context window/i) ??
      extractLabeledNumber(text, /context length/i);
    const inputTokenLimit = extractLabeledNumber(text, /maximum input tokens/i);
    const outputTokenLimit = extractLabeledNumber(text, /maximum output tokens/i);
    if (parsed.contextWindow === undefined && contextWindow !== undefined) {
      parsed.contextWindow = contextWindow;
    }
    if (parsed.inputTokenLimit === undefined && inputTokenLimit !== undefined) {
      parsed.inputTokenLimit = inputTokenLimit;
    }
    if (parsed.outputTokenLimit === undefined && outputTokenLimit !== undefined) {
      parsed.outputTokenLimit = outputTokenLimit;
    }
  }

  return Object.keys(parsed).length > 0 ? parsed : null;
}

/**
 * Parse token metadata only when an official semantic "Model ID" row contains the exact live id.
 * This prevents a family, navigation, or similar-model page from lending limits to another model.
 */
export function parseVertexModelDocsHtml(
  html: string,
  expectedModelId: string
): ParsedDocsMetadata | null {
  return parseVertexModelDocsRows(extractTableRows(html), expectedModelId);
}

function getCachedPage(url: string, nowMs: number, maxAgeMs: number): CachedDocsPage | null {
  const cached = docsCache.get(url);
  return cached && nowMs - cached.fetchedAtMs <= maxAgeMs ? cached : null;
}

async function fetchDocsPage(options: {
  url: string;
  fetchImpl: VertexMetadataFetch;
  nowMs: number;
}): Promise<CachedDocsPage | null> {
  const { url, fetchImpl, nowMs } = options;
  const fresh = getCachedPage(url, nowMs, FRESH_CACHE_TTL_MS);
  if (fresh) return fresh;

  const existingInflight = docsInflight.get(url);
  if (existingInflight) return existingInflight;

  const request = (async () => {
    try {
      const response = await fetchImpl(url, {
        method: "GET",
        headers: { Accept: "text/html", "Accept-Language": "en" },
      });
      if (!response.ok) return getCachedPage(url, nowMs, STALE_CACHE_TTL_MS);

      const html = await response.text();
      const page: CachedDocsPage = {
        fetchedAtMs: nowMs,
        rows: extractTableRows(html),
        sourceUrl: url,
        ...(response.headers.get("last-modified")
          ? { lastModified: response.headers.get("last-modified")! }
          : {}),
      };
      docsCache.set(url, page);
      return page;
    } catch {
      return getCachedPage(url, nowMs, STALE_CACHE_TTL_MS);
    }
  })().finally(() => docsInflight.delete(url));

  docsInflight.set(url, request);
  return request;
}

function metadataFields(metadata: ParsedDocsMetadata): VertexMetadataField[] {
  return (["contextWindow", "inputTokenLimit", "outputTokenLimit"] as const).filter(
    (field) => typeof metadata[field] === "number"
  );
}

function readPersistedDocsMetadata(
  model: VertexMetadataModel | undefined,
  nowMs: number
): VertexModelMetadata | null {
  if (!model) return null;
  const provenance = model.metadataProvenance as VertexModelMetadataProvenance | undefined;
  const fetchedAtMs = Date.parse(provenance?.vertexDocs?.fetchedAt || "");
  if (!Number.isFinite(fetchedAtMs) || nowMs - fetchedAtMs > STALE_CACHE_TTL_MS) return null;
  const verifiedFields = new Set(provenance?.vertexDocs?.fields || []);

  const metadata: VertexModelMetadata = {
    ...(verifiedFields.has("contextWindow") && typeof model.contextWindow === "number"
      ? { contextWindow: model.contextWindow }
      : {}),
    ...(verifiedFields.has("inputTokenLimit") && typeof model.inputTokenLimit === "number"
      ? { inputTokenLimit: model.inputTokenLimit }
      : {}),
    ...(verifiedFields.has("outputTokenLimit") && typeof model.outputTokenLimit === "number"
      ? { outputTokenLimit: model.outputTokenLimit }
      : {}),
    metadataProvenance: provenance,
  };
  return metadataFields(metadata).length > 0 ? metadata : null;
}

async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T) => Promise<R>
): Promise<R[]> {
  const results = new Array<R>(values.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(concurrency, values.length) }, async () => {
    while (nextIndex < values.length) {
      const index = nextIndex++;
      results[index] = await mapper(values[index]);
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * Enrich live Vertex models from official Google Cloud documentation. Existing structured fields
 * win; docs fill only gaps. Failures return the live models unchanged (or verified stale values).
 */
export async function enrichVertexModelsWithMetadata<T extends VertexMetadataModel>(options: {
  models: T[];
  fetchImpl: VertexMetadataFetch;
  staleModels?: VertexMetadataModel[];
  now?: Date;
}): Promise<T[]> {
  const now = options.now || new Date();
  const nowMs = now.getTime();
  const staleById = new Map((options.staleModels || []).map((model) => [model.id, model]));

  return mapWithConcurrency(options.models, MAX_CONCURRENT_FETCHES, async (model) => {
    const expectedModelId = terminalModelId(model.id);
    let docsMetadata: ParsedDocsMetadata | null = null;
    let page: CachedDocsPage | null = null;

    for (const url of resolveVertexModelDocsUrls(model.id)) {
      page = await fetchDocsPage({
        url,
        fetchImpl: options.fetchImpl,
        nowMs,
      });
      docsMetadata = page ? parseVertexModelDocsRows(page.rows, expectedModelId) : null;
      if (docsMetadata) break;
    }

    const staleMetadata = readPersistedDocsMetadata(staleById.get(model.id), nowMs);
    const metadata: VertexModelMetadata | null = docsMetadata
      ? {
          ...docsMetadata,
          metadataProvenance: {
            vertexDocs: {
              source: "google-cloud-docs",
              sourceUrl: page!.sourceUrl,
              fetchedAt: new Date(page!.fetchedAtMs).toISOString(),
              ...(page!.lastModified ? { lastModified: page!.lastModified } : {}),
              parserVersion: VERTEX_DOCS_PARSER_VERSION,
              confidence: "verified",
              fields: metadataFields(docsMetadata),
            },
          },
        }
      : staleMetadata;
    if (!metadata) return model;

    return {
      ...metadata,
      ...model,
      metadataProvenance: metadata.metadataProvenance,
    } as T;
  });
}

/** Test seam for deterministic cache and stale-fallback assertions. */
export function clearVertexModelMetadataCache(): void {
  docsCache.clear();
  docsInflight.clear();
}
