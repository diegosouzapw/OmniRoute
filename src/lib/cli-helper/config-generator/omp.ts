import { dump } from "js-yaml";
import { fetchOmniRouteCatalog } from "./opencode";

/**
 * Normalize an OmniRoute base URL to the `/v1` surface OMP talks to.
 * Trailing slashes are trimmed; `/v1` is appended when absent.
 */
export function ensureV1BaseUrl(baseUrl: string): string {
  const clean = String(baseUrl || "").replace(/\/+$/, "");
  return clean.endsWith("/v1") ? clean : `${clean}/v1`;
}

export interface GenerateOmpOptions {
  baseUrl: string;
  /** Optional explicit model subset — a single OmniRoute model id. */
  model?: string;
  /** Used only to read the live catalog when a model subset is requested. */
  apiKey?: string;
}

/**
 * Map a live catalog entry to an OMP `models[]` override entry. Copies
 * `contextWindow` from the catalog's context fields and `maxTokens` from
 * `max_output_tokens` ONLY (an input-token budget is not an output cap) —
 * fields absent from the catalog are omitted, never invented. Pure + testable.
 */
export function catalogModelToOmpEntry(
  id: string,
  hit?: {
    context_length?: number;
    max_context_window_tokens?: number;
    max_output_tokens?: number;
    max_input_tokens?: number;
  }
): Record<string, unknown> {
  const entry: Record<string, unknown> = { id, input: ["text"] };
  if (!hit) return entry;
  const contextWindow = [hit.context_length, hit.max_context_window_tokens].find(
    (c) => typeof c === "number" && Number.isFinite(c) && c > 0
  );
  const maxTokens = hit.max_output_tokens;
  if (contextWindow) entry.contextWindow = contextWindow;
  if (typeof maxTokens === "number" && Number.isFinite(maxTokens) && maxTokens > 0) {
    entry.maxTokens = maxTokens;
  }
  return entry;
}

/**
 * Generate the `providers.omniroute` document for Oh My Pi's
 * `~/.omp/agent/models.yml`.
 *
 * The provider block is discovery-based: OMP itself pulls the model list and
 * context windows from `<baseUrl>/models` (`discovery.type:
 * openai-models-list`), so no model catalog is written into the file by
 * default and nothing is invented. The API key is referenced by env-var NAME
 * (`OMNIROUTE_API_KEY`) — the literal secret is never emitted.
 *
 * When `options.model` requests an explicit subset, a `models` array with that
 * single entry is emitted, copying `contextWindow` / `maxTokens` from the live
 * catalog when present. The catalog fetch failure throws — the caller must not
 * write limits the provider did not report.
 */
export async function generateOmpConfig(options: GenerateOmpOptions): Promise<string> {
  const baseURL = ensureV1BaseUrl(options.baseUrl);
  const provider: Record<string, unknown> = {
    baseUrl: baseURL,
    api: "openai-completions",
    apiKey: "OMNIROUTE_API_KEY",
    authHeader: true,
    discovery: { type: "openai-models-list" },
  };

  const requested = typeof options.model === "string" ? options.model.trim() : "";
  if (requested) {
    const id = requested.replace(/^omniroute\//, "");
    const catalog = await fetchOmniRouteCatalog(baseURL, options.apiKey ?? "");
    provider.models = [catalogModelToOmpEntry(id, catalog.byId.get(id))];
  }

  return dump({ providers: { omniroute: provider } }, { lineWidth: -1 });
}
