// Pure Perplexity wire protocol: consts, types, SSE parsing, request/query building,
// content extraction. Extracted verbatim from perplexity-web.ts. No host state/fetch/auth.
import { randomUUID } from "crypto";

export const PPLX_SSE_ENDPOINT = "https://www.perplexity.ai/rest/sse/perplexity_ask";
// Perplexity's current request schema version (sent in params.version). Perplexity rejects
// stale versions with HTTP 400 — keep this in lockstep with the website's payload.
export const PPLX_API_VERSION = "2.18";
// Block use-cases the current web client advertises. The schematized API (use_schematized_api)
// validates the request shape, so this must be present (mirrors the browser request body).
export const PPLX_SUPPORTED_BLOCK_USE_CASES = [
  "answer_modes",
  "media_items",
  "knowledge_cards",
  "inline_entity_cards",
  "place_widgets",
  "finance_widgets",
  "sports_widgets",
  "news_widgets",
  "shopping_widgets",
  "jobs_widgets",
  "search_result_widgets",
  "inline_images",
  "inline_assets",
  "placeholder_cards",
  "diff_blocks",
  "inline_knowledge_cards",
  "entity_group_v2",
  "refinement_filters",
  "canvas_mode",
  "maps_preview",
  "answer_tabs",
  "price_comparison_widgets",
  "preserve_latex",
  "generic_onboarding_widgets",
  "in_context_suggestions",
  "pending_followups",
  "inline_claims",
  "unified_assets",
  "workflow_steps",
  "background_agents",
];
// Firefox 148 — must match the `firefox_148` TLS profile used by perplexityTlsClient.
// A mismatched UA vs TLS fingerprint is itself a Cloudflare bot signal (issue #2459).
export const PPLX_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0";

export const MODEL_MAP: Record<string, [string, string]> = {
  "pplx-auto": ["search", "pplx_pro"],
  "pplx-sonar": ["search", "experimental"],
  "pplx-gpt-5.4": ["search", "gpt54"],
  "pplx-gpt": ["search", "gpt55"],
  "pplx-gemini": ["search", "gemini31pro_high"],
  "pplx-sonnet": ["search", "claude50sonnet"],
  "pplx-opus": ["search", "claude48opus"],
  "pplx-glm": ["search", "glm_5_2"],
  "pplx-kimi": ["search", "kimik26instant"],
  "pplx-nemotron": ["search", "nv_nemotron_3_ultra"],
};

export const THINKING_MAP: Record<string, string> = {
  "pplx-gpt-5.4": "gpt54_thinking",
  "pplx-gpt": "gpt55_thinking",
  "pplx-sonnet": "claude50sonnetthinking",
  "pplx-opus": "claude48opusthinking",
  "pplx-kimi": "kimik26thinking",
};

export const CITATION_RE = /\[\d+\]/g;
export const GROK_TAG_RE = /<grok:[^>]*>.*?<\/grok:[^>]*>/gs;
export const GROK_SELF_RE = /<grok:[^>]*\/>/g;
export const XML_DECL_RE = /<[?]xml[^?]*[?]>/g;
export const RESPONSE_TAG_RE = /<\/?response\b[^>]*>/gi;
export const MULTI_SPACE = / {2,}/g;
export const MULTI_NL = /\n{3,}/g;

// ─── Helpers ────────────────────────────────────────────────────────────────

export function cleanResponse(text: string, strip = true): string {
  let t = text;
  t = t.replace(XML_DECL_RE, "");
  t = t.replace(CITATION_RE, "");
  t = t.replace(GROK_TAG_RE, "");
  t = t.replace(GROK_SELF_RE, "");
  t = t.replace(RESPONSE_TAG_RE, "");
  if (strip) {
    t = t.replace(MULTI_SPACE, " ");
    t = t.replace(MULTI_NL, "\n\n");
    t = t.trim();
  }
  return t;
}

// ─── SSE types ──────────────────────────────────────────────────────────────

export interface PplxDiffPatch {
  op?: string;
  path?: string;
  value?: unknown;
}

export interface PplxBlock {
  intended_usage?: string;
  markdown_block?: {
    answer?: string;
    chunks?: string[];
    progress?: string;
    chunk_starting_offset?: number;
  };
  // Schematized API (use_schematized_api) streams block updates as RFC-6902
  // JSON-patch diffs against a target field (e.g. markdown_block) instead of
  // sending the whole block each frame. `field` names the block being patched.
  diff_block?: {
    field?: string;
    patches?: PplxDiffPatch[];
  };
  web_result_block?: {
    web_results?: Array<{ url?: string; name?: string; snippet?: string }>;
  };
  plan_block?: {
    steps?: Array<{
      step_type?: string;
      search_web_content?: { queries?: Array<{ query?: string }> };
      read_results_content?: { urls?: string[] };
    }>;
    goals?: Array<{ description?: string }>;
  };
}

export interface PplxStreamEvent {
  status?: string;
  final?: boolean;
  text?: string;
  blocks?: PplxBlock[];
  backend_uuid?: string;
  web_results?: Array<{ url?: string; name?: string }>;
  error_code?: string;
  error_message?: string;
  display_model?: string;
}

// ─── SSE parsing ────────────────────────────────────────────────────────────

export async function* readPplxSseEvents(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<PplxStreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];

  function flush(): PplxStreamEvent | null | "done" {
    if (dataLines.length === 0) return null;
    const payload = dataLines.join("\n");
    dataLines = [];
    const trimmed = payload.trim();
    if (!trimmed || trimmed === "[DONE]") return "done";
    try {
      return JSON.parse(trimmed) as PplxStreamEvent;
    } catch {
      return null;
    }
  }

  try {
    while (true) {
      if (signal?.aborted) return;
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const idx = buffer.indexOf("\n");
        if (idx < 0) break;
        const rawLine = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;

        if (line === "") {
          const parsed = flush();
          if (parsed === "done") return;
          if (parsed) yield parsed;
          continue;
        }
        if (line.startsWith("data:")) {
          dataLines.push(line.slice(5).trimStart());
        }
        if (line === "event: end_of_stream") {
          return;
        }
      }
    }

    buffer += decoder.decode();
    if (buffer.trim().startsWith("data:")) {
      dataLines.push(buffer.trim().slice(5).trimStart());
    }
    const tail = flush();
    if (tail && tail !== "done") yield tail;
  } finally {
    reader.releaseLock();
  }
}

// ─── OpenAI → Perplexity translation ────────────────────────────────────────

export interface ParsedMessages {
  systemMsg: string;
  history: Array<{ role: string; content: string }>;
  currentMsg: string;
}

export function parseOpenAIMessages(messages: Array<Record<string, unknown>>): ParsedMessages {
  let systemMsg = "";
  const history: Array<{ role: string; content: string }> = [];

  for (const msg of messages) {
    let role = String(msg.role || "user");
    if (role === "developer") role = "system";

    let content = "";
    if (typeof msg.content === "string") {
      content = msg.content;
    } else if (Array.isArray(msg.content)) {
      content = (msg.content as Array<Record<string, unknown>>)
        .filter((c) => c.type === "text")
        .map((c) => String(c.text || ""))
        .join(" ");
    }
    if (!content.trim()) continue;

    if (role === "system") {
      systemMsg += content + "\n";
    } else if (role === "user" || role === "assistant") {
      history.push({ role, content });
    }
  }

  let currentMsg = "";
  if (history.length > 0 && history[history.length - 1].role === "user") {
    currentMsg = history.pop()!.content;
  }

  return { systemMsg, history, currentMsg };
}

export function buildPplxRequestBody(
  query: string,
  dslQuery: string,
  mode: string,
  modelPref: string,
  followUpUuid: string | null,
  requestId: string
): Record<string, unknown> {
  const tz = typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";

  // Mirrors the current www.perplexity.ai/rest/sse/perplexity_ask request body. Perplexity's
  // schematized API validates this shape; an outdated version or missing required fields → HTTP 400.
  const params: Record<string, unknown> = {
    attachments: [],
    language: "en-US",
    timezone: tz,
    search_focus: "internet",
    sources: ["web"],
    frontend_uuid: requestId,
    mode,
    model_preference: modelPref,
    is_related_query: false,
    is_sponsored: false,
    frontend_context_uuid: crypto.randomUUID(),
    prompt_source: "user",
    query_source: "home",
    is_incognito: true,
    local_search_enabled: false,
    use_schematized_api: true,
    send_back_text_in_streaming_api: false,
    supported_block_use_cases: PPLX_SUPPORTED_BLOCK_USE_CASES,
    client_coordinates: null,
    mentions: [],
    dsl_query: dslQuery && dslQuery.trim() ? dslQuery : query,
    skip_search_enabled: true,
    is_nav_suggestions_disabled: false,
    source: "default",
    always_search_override: false,
    override_no_search: false,
    client_search_results_cache_key: requestId,
    should_ask_for_mcp_tool_confirmation: true,
    browser_agent_allow_once_from_toggle: false,
    force_enable_browser_agent: false,
    supported_features: ["browser_agent_permission_banner_v1.1"],
    extended_context: false,
    version: PPLX_API_VERSION,
    rum_session_id: crypto.randomUUID(),
  };

  // Only present on follow-ups (matches the browser, which omits it for a fresh query).
  if (followUpUuid) {
    params.last_backend_uuid = followUpUuid;
  }

  return {
    query_str: query,
    params,
  };
}

export function buildQuery(parsed: ParsedMessages, followUpUuid: string | null): string {
  if (followUpUuid) return parsed.currentMsg;

  const obj: Record<string, unknown> = {};
  if (parsed.systemMsg.trim()) {
    obj.instructions = [
      parsed.systemMsg.trim(),
      "You have built-in web search. Answer questions directly using search results.",
    ];
  }
  if (parsed.history.length > 0) {
    obj.history = parsed.history;
  }
  if (parsed.currentMsg) {
    obj.query = parsed.currentMsg;
  } else if (parsed.history.length === 0) {
    obj.query = "";
  }
  const json = JSON.stringify(obj);
  return json.length > 96000 ? json.slice(-96000) : json;
}

// ─── Content extraction ─────────────────────────────────────────────────────

export interface ContentChunk {
  delta?: string;
  answer?: string;
  backendUuid?: string;
  thinking?: string;
  error?: string;
  done?: boolean;
}

// The schematized API delivers the answer text in blocks whose `intended_usage`
// is either the aggregate `ask_text` or per-segment `ask_text_<n>_markdown`
// (older builds used names merely containing "markdown"). All converge on the
// same answer, so we lock onto a single primary usage to avoid double-counting.
export function isAnswerTextUsage(usage: string): boolean {
  return (
    usage === "ask_text" || /^ask_text_\d+_markdown$/.test(usage) || usage.includes("markdown")
  );
}

// Reconstructed state for one answer-text block, built up from diff patches
// (streaming) or a materialized markdown_block (final COMPLETED frame).
export interface MarkdownAccumulator {
  chunks: string[];
}

// Apply a markdown_block diff_block patch set. Perplexity sends an initial
// `{op:"replace", path:"", value:{chunks:[...]}}` then incremental
// `{op:"add", path:"/chunks/<n>", value:"..."}` frames. We only need the
// chunks array; joining it yields the cumulative answer text.
export function applyMarkdownDiff(acc: MarkdownAccumulator, patches: PplxDiffPatch[]): void {
  for (const patch of patches) {
    const path = patch.path ?? "";
    if (path === "") {
      const value = (patch.value ?? {}) as { chunks?: unknown };
      acc.chunks = Array.isArray(value.chunks) ? value.chunks.map((c) => String(c)) : [];
      continue;
    }
    const chunkMatch = /^\/chunks\/(\d+)$/.exec(path);
    if (chunkMatch && typeof patch.value === "string") {
      const idx = Number.parseInt(chunkMatch[1], 10);
      acc.chunks[idx] = patch.value;
    }
  }
}

export async function* extractContent(
  eventStream: ReadableStream<Uint8Array>,
  signal?: AbortSignal | null
): AsyncGenerator<ContentChunk> {
  let fullAnswer = "";
  let backendUuid: string | null = null;
  let seenLen = 0;
  const seenThinking = new Set<string>();
  // Per-usage reconstructed answer-text blocks + the locked primary usage.
  const mdState = new Map<string, MarkdownAccumulator>();
  let primaryUsage: string | null = null;

  for await (const event of readPplxSseEvents(eventStream, signal)) {
    if (event.error_code || event.error_message) {
      yield {
        error: event.error_message || `Perplexity error: ${event.error_code}`,
        done: true,
      };
      return;
    }

    if (event.backend_uuid) backendUuid = event.backend_uuid;

    const blocks = event.blocks ?? [];
    for (const block of blocks) {
      const usage = block.intended_usage ?? "";

      // Thinking: search steps
      if (usage === "pro_search_steps" && block.plan_block?.steps) {
        for (const step of block.plan_block.steps) {
          if (step.step_type === "SEARCH_WEB") {
            for (const q of step.search_web_content?.queries ?? []) {
              const qr = q.query ?? "";
              if (qr && !seenThinking.has(qr)) {
                seenThinking.add(qr);
                yield { thinking: `Searching: ${qr}`, backendUuid: backendUuid ?? undefined };
              }
            }
          } else if (step.step_type === "READ_RESULTS") {
            for (const u of (step.read_results_content?.urls ?? []).slice(0, 3)) {
              if (u && !seenThinking.has(u)) {
                seenThinking.add(u);
                yield { thinking: `Reading: ${u}`, backendUuid: backendUuid ?? undefined };
              }
            }
          }
        }
      }

      // Thinking: plan goals
      if (usage === "plan" && block.plan_block?.goals) {
        for (const goal of block.plan_block.goals) {
          const desc = goal.description ?? "";
          if (desc && !seenThinking.has(desc)) {
            seenThinking.add(desc);
            yield { thinking: desc, backendUuid: backendUuid ?? undefined };
          }
        }
      }

      // Content: answer-text blocks (schematized diff frames OR materialized
      // markdown_block on the final COMPLETED frame).
      if (!isAnswerTextUsage(usage)) continue;
      let acc = mdState.get(usage);
      if (!acc) {
        acc = { chunks: [] };
        mdState.set(usage, acc);
      }

      if (block.diff_block && Array.isArray(block.diff_block.patches)) {
        applyMarkdownDiff(acc, block.diff_block.patches);
      } else if (block.markdown_block) {
        const mb = block.markdown_block;
        if (Array.isArray(mb.chunks) && mb.chunks.length > 0) {
          acc.chunks = mb.chunks.map((c) => String(c));
        } else if (typeof mb.answer === "string" && mb.answer.length > 0) {
          acc.chunks = [mb.answer];
        }
      }

      // Prefer the aggregate `ask_text` block; otherwise lock the first seen.
      if (usage === "ask_text") {
        primaryUsage = "ask_text";
      } else if (!primaryUsage) {
        primaryUsage = usage;
      }
    }

    // Emit at most one content delta per event, from the locked primary usage.
    if (primaryUsage) {
      const currentAnswer = (mdState.get(primaryUsage)?.chunks ?? []).join("");
      if (currentAnswer.length > seenLen) {
        const delta = currentAnswer.slice(seenLen);
        fullAnswer = currentAnswer;
        seenLen = currentAnswer.length;
        yield { delta, answer: fullAnswer, backendUuid: backendUuid ?? undefined };
      }
    }

    // Legacy fallback: a plain non-JSON `text` field with no structured blocks.
    // The schematized API's `text` field is a JSON step-blob (not user-facing),
    // so only use it when there are no answer-text blocks at all.
    if (!primaryUsage && blocks.length === 0 && event.text) {
      const t = event.text.trim();
      const looksLikeJson = t.startsWith("{") || t.startsWith("[");
      if (!looksLikeJson && t.length > seenLen) {
        const delta = t.slice(seenLen);
        fullAnswer = t;
        seenLen = t.length;
        yield { delta, answer: fullAnswer, backendUuid: backendUuid ?? undefined };
      }
    }

    // Only stop on the terminal COMPLETED frame. A `final:true` flag can appear
    // on a still-PENDING frame BEFORE the COMPLETED frame that materializes the
    // full markdown_block — breaking on `final` there drops the answer.
    if (event.status === "COMPLETED") break;
  }

  yield { delta: "", answer: fullAnswer, backendUuid: backendUuid ?? undefined, done: true };
}

// ─── OpenAI SSE format ──────────────────────────────────────────────────────

export function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}
