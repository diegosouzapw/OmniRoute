/**
 * Request/response shape adapters for OpenAI-compatible rerank provider nodes.
 *
 * `POST /v1/rerank` speaks the Cohere shape to clients (`{model, query, documents, top_n,
 * return_documents}` → `{results: [{index, relevance_score, document?}]}`). Most local
 * servers (vLLM, llama.cpp, Infinity behind its OpenAI facade, oMLX) speak that shape
 * too, but two popular self-hosted rerankers do not:
 *
 *  - Hugging Face **text-embeddings-inference (TEI)** mounts `POST /rerank` (no `/v1`),
 *    requires the candidate list as `texts` (not `documents`), takes `return_text`
 *    instead of `return_documents`, and answers with a bare array
 *    `[{index, score, text?}]` — no `results` envelope, `score` not `relevance_score`.
 *  - **Infinity** in native mode likewise mounts `/rerank`, accepts `documents`, and
 *    returns `{results: [{index, relevance_score, document?}]}` — Cohere-shaped, but a
 *    few thin gateways in front of it (and of TEI) emit `score` instead of
 *    `relevance_score`.
 *
 * The route already fell back from `<base>/v1/rerank` to `<base>/rerank` on 404 "for
 * Infinity / TEI", but it kept sending `documents` and returned the upstream body verbatim,
 * so the TEI fallback could never have worked (HTTP 422: missing field `texts`) and a
 * `score`-only response left the memory engine — which reads `relevance_score` — with
 * undefined scores. These two pure helpers close that gap:
 *
 *  - {@link buildLocalRerankRequestBody} sends both spellings (`documents` + `texts`,
 *    `return_documents` + `return_text`). Every server named above ignores the fields it
 *    does not know (TEI's request struct is not `deny_unknown_fields`; the OpenAI-shaped
 *    servers tolerate extras), so one body serves all of them.
 *  - {@link normalizeLocalRerankResponse} folds any of the observed response shapes into
 *    the Cohere envelope, backfilling `relevance_score` from `score`, sorting by score,
 *    honouring `top_n`, and attaching `document.text` when the caller asked for documents
 *    and the upstream did not echo them.
 */

import { toNumberOrNull } from "@/shared/utils/numeric";

export interface LocalRerankRequestInput {
  model: string;
  query: string;
  documents: unknown[];
  top_n?: number | null;
  return_documents?: boolean | null;
}

export interface CohereRerankResult {
  index: number;
  relevance_score: number;
  document?: { text: string } | Record<string, unknown>;
}

export interface CohereRerankResponse {
  results: CohereRerankResult[];
  [extra: string]: unknown;
}

/** Cohere allows documents to be strings or `{text}` objects; every local server wants strings. */
export function documentText(doc: unknown): string {
  if (typeof doc === "string") return doc;
  if (doc && typeof doc === "object") {
    const text = (doc as { text?: unknown }).text;
    if (typeof text === "string") return text;
  }
  return doc === null || doc === undefined ? "" : String(doc);
}

/**
 * Build the upstream request body for a local rerank node. Includes both the
 * Cohere/OpenAI spelling (`documents`, `return_documents`) and the TEI spelling
 * (`texts`, `return_text`) so the same body works against every known local server.
 */
export function buildLocalRerankRequestBody(input: LocalRerankRequestInput) {
  const texts = input.documents.map(documentText);
  const topN = input.top_n || input.documents.length;
  // Cohere default: documents are only echoed back when the caller asks for them.
  const returnDocuments = input.return_documents === true;
  return {
    model: input.model,
    query: input.query,
    documents: input.documents,
    top_n: topN,
    return_documents: returnDocuments,
    // TEI spelling
    texts,
    return_text: returnDocuments,
  };
}

interface RawResult {
  index?: unknown;
  relevance_score?: unknown;
  score?: unknown;
  text?: unknown;
  document?: unknown;
}

function pickResultsArray(data: unknown): { list: RawResult[]; envelope: Record<string, unknown> } {
  if (Array.isArray(data)) {
    return { list: data as RawResult[], envelope: {} };
  }
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["results", "data"]) {
      if (Array.isArray(obj[key])) {
        const { [key]: _list, ...rest } = obj;
        return { list: obj[key] as RawResult[], envelope: rest };
      }
    }
    // An object with no recognisable results list: keep its fields, report no results.
    return { list: [], envelope: obj };
  }
  return { list: [], envelope: {} };
}

function resolveResultDocument(raw: RawResult, fallback: unknown): Record<string, unknown> {
  if (raw.document && typeof raw.document === "object") {
    return raw.document as Record<string, unknown>;
  }
  if (typeof raw.document === "string") return { text: raw.document };
  if (typeof raw.text === "string") return { text: raw.text };
  return { text: documentText(fallback) };
}

/** One raw entry → Cohere result, or `null` when its index or score is unusable. */
function toCohereResult(
  raw: RawResult,
  documents: unknown[],
  returnDocuments: boolean
): CohereRerankResult | null {
  if (!raw || typeof raw !== "object") return null;
  const index = toNumberOrNull(raw.index);
  if (index === null || !Number.isInteger(index) || index < 0 || index >= documents.length) {
    return null;
  }
  const score = toNumberOrNull(raw.relevance_score) ?? toNumberOrNull(raw.score);
  if (score === null) return null;

  const result: CohereRerankResult = { index, relevance_score: score };
  if (returnDocuments) result.document = resolveResultDocument(raw, documents[index]);
  return result;
}

/**
 * Normalize a local rerank node's response into the Cohere envelope.
 *
 * Accepts: `{results: [...]}` (Cohere / Infinity / vLLM / llama.cpp), `{data: [...]}`
 * (Voyage-style), or a bare `[...]` (TEI). Each entry may carry `relevance_score` or
 * `score`, and optionally `document` (`{text}` or string) or `text` (TEI).
 *
 * Entries without a usable integer `index` in range, or without a numeric score, are
 * dropped rather than passed through malformed. Results are sorted by score descending
 * (TEI already does; Cohere clients expect it) and capped at `top_n`. Top-level fields
 * other than the results array (`model`, `usage`, `id`, …) are preserved.
 */
export function normalizeLocalRerankResponse(
  data: unknown,
  documents: unknown[],
  options: { top_n?: number | null; return_documents?: boolean | null } = {}
): CohereRerankResponse {
  const { list, envelope } = pickResultsArray(data);
  const returnDocuments = options.return_documents === true;
  const results: CohereRerankResult[] = [];

  for (const raw of list) {
    const result = toCohereResult(raw, documents, returnDocuments);
    if (result) results.push(result);
  }

  results.sort((a, b) => b.relevance_score - a.relevance_score);

  const topN = options.top_n && options.top_n > 0 ? options.top_n : results.length;
  return { ...envelope, results: results.slice(0, topN) };
}
