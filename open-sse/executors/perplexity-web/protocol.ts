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
  "workflow_widgets",
  "navigation_results",
  "background_agents",
];
// Perplexity's live SSE terminator (not OpenAI's `data: [DONE]`). Using the wrong
// EOF symbol can truncate or hang the Firefox-TLS stream tailer before answer
// chunks land — which surfaces as "Provider returned empty content".
export const PPLX_STREAM_EOF_SYMBOL = "event: end_of_stream";
// Firefox 148 — must match the `firefox_148` TLS profile used by perplexityTlsClient.
// A mismatched UA vs TLS fingerprint is itself a Cloudflare bot signal (issue #2459).
export const PPLX_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0";

// mode / model_preference pairs. Live www.perplexity.ai still posts mode:"copilot"
// for the default turbo path; search mode is used for the curated catalog models.
export const MODEL_MAP: Record<string, [string, string]> = {
  // pplx-auto/pplx-sonar use "copilot" mode (was "search", which for pplx-sonar
  // maps to "experimental" — that model no longer streams answer-text blocks
  // for many sessions → empty content, issue #6955). The live web client uses
  // mode:"copilot" + model_preference:"turbo" for the default turbo path.
  "pplx-auto": ["copilot", "pplx_pro"],
  "pplx-sonar": ["copilot", "turbo"],
  "pplx-gpt-5.6-terra": ["search", "gpt56_terra"],
  "pplx-gpt-5.6-sol": ["search", "gpt56_sol"],
  "pplx-gemini": ["search", "gemini31pro_high"],
  "pplx-sonnet": ["search", "claude50sonnet"],
  "pplx-opus": ["search", "claude48opus"],
  "pplx-glm": ["search", "glm_5_2"],
  "pplx-kimi": ["search", "kimik26instant"],
  "pplx-grok-4.5": ["search", "grok45low"],
  "pplx-nemotron": ["search", "nv_nemotron_3_ultra"],
};

export const THINKING_MAP: Record<string, string> = {
  "pplx-gpt-5.6-terra": "gpt56_terra_thinking",
  "pplx-gpt-5.6-sol": "gpt56_sol_thinking",
  "pplx-sonnet": "claude50sonnetthinking",
  "pplx-opus": "claude48opusthinking",
  "pplx-kimi": "kimik26thinking",
  "pplx-grok-4.5": "grok45medium",
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

export interface PplxUpsellInformation {
  name?: string;
  upsell_type?: string;
  title?: string;
  description?: string;
  cta?: string;
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
  upsell_information?: PplxUpsellInformation;
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
    supports_tool_approval_modal: true,
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
  /** Structured error code for quota / rate-limit surfaces (e.g. quota_exhausted). */
  errorCode?: string;
  /**
   * Suggested client/account cooldown in seconds when the stream failed due to
   * advanced-model weekly quota (or similar). Downstream marks the connection
   * rate_limited_until and VibeProxy limit badges parse this + "reset after Xs".
   */
  resetSeconds?: number;
  done?: boolean;
}

/** Default cooldown when Perplexity reports advanced-model weekly quota exhaustion
 * without an explicit reset clock (weekly window is account-side). Long enough that
 * rotation skips the account instead of hammering it every few seconds. */
export const PPLX_ADVANCED_QUOTA_DEFAULT_RESET_SECONDS = 6 * 60 * 60;

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
      const value = (patch.value ?? {}) as { chunks?: unknown; answer?: unknown };
      if (Array.isArray(value.chunks)) {
        acc.chunks = value.chunks.map((c) => String(c));
      } else if (typeof value.answer === "string" && value.answer.length > 0) {
        // Some COMPLETED/replace frames only materialize `answer` (no chunks).
        acc.chunks = [value.answer];
      } else {
        acc.chunks = [];
      }
      continue;
    }
    const chunkMatch = /^\/chunks\/(\d+)$/.exec(path);
    if (chunkMatch && typeof patch.value === "string") {
      const idx = Number.parseInt(chunkMatch[1], 10);
      acc.chunks[idx] = patch.value;
    }
  }
}

/**
 * Extract the assistant answer from the COMPLETED frame's `text` step-blob.
 *
 * Live shape (Jul 2026 browser capture):
 *   text: '[{"step_type":"FINAL","content":{"answer":"{\\"answer\\":\\"Hi…\\",\\"chunks\\":[…]}"}}]'
 *
 * The nested `content.answer` is often a *double-encoded* JSON string. Used as a
 * safety net when diff_block / markdown_block frames were missed (truncated TLS
 * stream, FINAL-only delivery, etc.) so we don't return empty content.
 */
export function extractAnswerFromFinalText(text: string | undefined | null): string | null {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  // Plain non-JSON text (legacy non-schematized path).
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return trimmed;
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    const steps = Array.isArray(parsed) ? parsed : [parsed];
    for (const step of steps) {
      if (!step || typeof step !== "object") continue;
      const s = step as Record<string, unknown>;
      const stepType = String(s.step_type || s.stepType || "");
      if (stepType && stepType !== "FINAL") continue;

      const content = s.content as Record<string, unknown> | string | undefined;
      let rawAnswer: unknown =
        typeof content === "string"
          ? content
          : content && typeof content === "object"
            ? (content as Record<string, unknown>).answer
            : undefined;
      if (rawAnswer == null && typeof s.answer === "string") rawAnswer = s.answer;
      if (rawAnswer == null) continue;

      if (typeof rawAnswer === "string") {
        const inner = rawAnswer.trim();
        if (!inner) continue;
        // Double-encoded JSON blob: {"answer":"…","chunks":[…],"structured_answer":[…]}
        if (inner.startsWith("{") || inner.startsWith("[")) {
          try {
            const obj = JSON.parse(inner) as Record<string, unknown>;
            if (typeof obj.answer === "string" && obj.answer.trim()) return obj.answer;
            if (Array.isArray(obj.chunks) && obj.chunks.length > 0) {
              return obj.chunks.map((c) => String(c)).join("");
            }
            if (Array.isArray(obj.structured_answer)) {
              const joined = (obj.structured_answer as Array<Record<string, unknown>>)
                .map((b) => (typeof b?.text === "string" ? b.text : ""))
                .join("");
              if (joined.trim()) return joined;
            }
          } catch {
            // Fall through — treat as plain markdown.
          }
        }
        return inner;
      }
    }
  } catch {
    return null;
  }
  return null;
}

/** Pick the longest reconstructed answer across dual ask_text / ask_text_N_markdown tracks. */
export function longestMarkdownAnswer(
  mdState: Map<string, MarkdownAccumulator>,
  preferredUsage: string | null
): { usage: string | null; answer: string } {
  let bestUsage: string | null = preferredUsage;
  let bestAnswer = preferredUsage ? (mdState.get(preferredUsage)?.chunks ?? []).join("") : "";

  for (const [usage, acc] of mdState) {
    const joined = (acc.chunks ?? []).join("");
    if (joined.length > bestAnswer.length) {
      bestAnswer = joined;
      bestUsage = usage;
    }
  }
  return { usage: bestUsage, answer: bestAnswer };
}

/** Extract goal descriptions from a materialized or diff-patched plan block. */
function extractPlanGoalDescriptions(block: PplxBlock): string[] {
  const out: string[] = [];
  if (block.plan_block?.goals) {
    for (const goal of block.plan_block.goals) {
      const desc = goal.description ?? "";
      if (desc) out.push(desc);
    }
  }
  // Live multi-step streams send plan as RFC-6902 diff patches, not plan_block.
  const patches = block.diff_block?.patches;
  if (Array.isArray(patches)) {
    for (const patch of patches) {
      const value = patch.value as { goals?: Array<{ description?: string }> } | undefined;
      if (value && Array.isArray(value.goals)) {
        for (const goal of value.goals) {
          const desc = goal.description ?? "";
          if (desc) out.push(desc);
        }
      }
    }
  }
  return out;
}

export interface PplxQuotaError {
  message: string;
  errorCode: string;
  resetSeconds: number;
}

function formatUpsellError(upsell: PplxUpsellInformation | undefined): PplxQuotaError | null {
  if (!upsell) return null;
  const name = String(upsell.name || "");
  // advanced_models_quota_low = weekly advanced-model (Opus/Sonnet/GPT/…) budget
  // exhausted. Browser still often downgrades to turbo; when no answer text is
  // produced we must surface this instead of a silent "empty content" 502.
  if (
    name === "advanced_models_quota_low" ||
    name.includes("quota") ||
    String(upsell.upsell_type || "")
      .toUpperCase()
      .includes("UPGRADE")
  ) {
    const title = (upsell.title || "").trim();
    const desc = (upsell.description || "").trim();
    const detail = [title, desc].filter(Boolean).join(" — ");
    const base = detail
      ? `Perplexity advanced model quota exhausted: ${detail}`
      : "Perplexity advanced model quota exhausted for this account this week. Use pplx-auto/pplx-sonar, wait for the weekly reset, or upgrade (Perplexity Max).";
    const resetSeconds = PPLX_ADVANCED_QUOTA_DEFAULT_RESET_SECONDS;
    // Append human "reset after …" so VibeProxy's existing message parsers
    // (and accountFallback.formatRetryAfter consumers) pick up the cooldown.
    const h = Math.floor(resetSeconds / 3600);
    const m = Math.floor((resetSeconds % 3600) / 60);
    const s = resetSeconds % 60;
    const parts: string[] = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return {
      message: `${base} (reset after ${parts.join(" ")})`,
      errorCode: "quota_exhausted",
      resetSeconds,
    };
  }
  return null;
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
  let lastEventText: string | undefined;
  let lastUpsell: PplxUpsellInformation | undefined;

  for await (const event of readPplxSseEvents(eventStream, signal)) {
    if (event.error_code || event.error_message) {
      yield {
        error: event.error_message || `Perplexity error: ${event.error_code}`,
        done: true,
      };
      return;
    }

    if (event.backend_uuid) backendUuid = event.backend_uuid;
    if (event.text) lastEventText = event.text;
    if (event.upsell_information) lastUpsell = event.upsell_information;

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

      // Thinking: plan goals (materialized plan_block OR live multi-step diff_block)
      if (usage === "plan") {
        for (const desc of extractPlanGoalDescriptions(block)) {
          if (desc && !seenThinking.has(desc)) {
            seenThinking.add(desc);
            yield { thinking: desc, backendUuid: backendUuid ?? undefined };
          }
        }
      }

      // Content: answer-text blocks (schematized diff frames OR materialized
      // markdown_block on the final COMPLETED frame).
      if (!isAnswerTextUsage(usage)) continue;
      // Only apply markdown patches when the diff targets markdown_block (or field
      // is absent on older frames). Ignore answer_tabs/plan/etc. diffs that share
      // the same event but different field names.
      if (
        block.diff_block &&
        block.diff_block.field &&
        block.diff_block.field !== "markdown_block"
      ) {
        continue;
      }
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

    // Emit at most one content delta per event from the longest reconstructed
    // answer track (ask_text and ask_text_0_markdown often stream in parallel).
    const { answer: currentAnswer } = longestMarkdownAnswer(mdState, primaryUsage);
    if (currentAnswer.length > seenLen) {
      const delta = currentAnswer.slice(seenLen);
      fullAnswer = currentAnswer;
      seenLen = currentAnswer.length;
      yield { delta, answer: fullAnswer, backendUuid: backendUuid ?? undefined };
    }

    // Legacy fallback: a plain non-JSON `text` field with no structured blocks.
    // The schematized API's `text` field is a JSON step-blob (not user-facing),
    // so only use it when there are no answer-text blocks at all.
    if (!primaryUsage && mdState.size === 0 && blocks.length === 0 && event.text) {
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
    if (event.status === "COMPLETED") {
      // Safety net: if diff/markdown tracks stayed empty, pull the answer from
      // the COMPLETED frame's double-encoded FINAL step blob.
      if (!fullAnswer.trim()) {
        const fromText = extractAnswerFromFinalText(event.text || lastEventText);
        if (fromText && fromText.trim()) {
          const delta = fromText.slice(seenLen);
          fullAnswer = fromText;
          seenLen = fromText.length;
          if (delta) {
            yield { delta, answer: fullAnswer, backendUuid: backendUuid ?? undefined };
          }
        }
      }
      break;
    }
  }

  // End-of-stream without a COMPLETED frame still try the last text blob.
  if (!fullAnswer.trim() && lastEventText) {
    const fromText = extractAnswerFromFinalText(lastEventText);
    if (fromText && fromText.trim()) {
      fullAnswer = fromText;
    }
  }

  // No answer materialized through any recovery path — if the stream surfaced
  // an advanced-model quota upsell, report it clearly instead of a silent
  // empty-content response so callers can cooldown/rotate the account.
  if (!fullAnswer.trim()) {
    const upsellErr = formatUpsellError(lastUpsell);
    if (upsellErr) {
      yield {
        error: upsellErr.message,
        errorCode: upsellErr.errorCode,
        resetSeconds: upsellErr.resetSeconds,
        done: true,
        backendUuid: backendUuid ?? undefined,
      };
      return;
    }
  }

  yield { delta: "", answer: fullAnswer, backendUuid: backendUuid ?? undefined, done: true };
}

// ─── OpenAI SSE format ──────────────────────────────────────────────────────

export function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}
