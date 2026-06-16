/**
 * PerplexityWebExecutor — Perplexity Web Session Provider
 *
 * Routes requests through Perplexity's internal SSE API using a Pro/Max
 * subscription session cookie or JWT, translating between OpenAI chat
 * completions format and Perplexity's internal protocol.
 */

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import {
  tlsFetchPerplexity,
  isCloudflareChallenge,
  TlsClientUnavailableError,
  type TlsFetchResult,
} from "../services/perplexityTlsClient.ts";
import { prepareToolMessages, buildToolAwareResult } from "../translator/webTools.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

const PPLX_SSE_ENDPOINT = "https://www.perplexity.ai/rest/sse/perplexity_ask";
// Perplexity's current request schema version (sent in params.version). Perplexity rejects
// stale versions with HTTP 400 — keep this in lockstep with the website's payload.
const PPLX_API_VERSION = "2.18";
// Block use-cases the current web client advertises. The schematized API (use_schematized_api)
// validates the request shape, so this must be present (mirrors the browser request body).
const PPLX_SUPPORTED_BLOCK_USE_CASES = [
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
const PPLX_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0";

const MODEL_MAP: Record<string, [string, string]> = {
  "pplx-auto": ["concise", "pplx_pro"],
  "pplx-sonar": ["copilot", "experimental"],
  "pplx-gpt": ["copilot", "gpt54"],
  "pplx-gemini": ["copilot", "gemini31pro_high"],
  "pplx-sonnet": ["copilot", "claude46sonnet"],
  "pplx-opus": ["copilot", "claude46opus"],
  "pplx-nemotron": ["copilot", "nv_nemotron_3_super"],
};

const THINKING_MAP: Record<string, string> = {
  "pplx-gpt": "gpt54_thinking",
  "pplx-sonnet": "claude46sonnetthinking",
  "pplx-opus": "claude46opusthinking",
};

const CITATION_RE = /\[\d+\]/g;
const GROK_TAG_RE = /<grok:[^>]*>.*?<\/grok:[^>]*>/gs;
const GROK_SELF_RE = /<grok:[^>]*\/>/g;
const XML_DECL_RE = /<[?]xml[^?]*[?]>/g;
const RESPONSE_TAG_RE = /<\/?response\b[^>]*>/gi;
const MULTI_SPACE = / {2,}/g;
const MULTI_NL = /\n{3,}/g;

// ─── Session continuity ─────────────────────────────────────────────────────

const SESSION_MAX_AGE_MS = 3600_000;
const SESSION_MAX_ENTRIES = 200;

interface SessionEntry {
  backendUuid: string;
  ts: number;
}

const sessionCache = new Map<string, SessionEntry>();

function sessionKey(history: Array<{ role: string; content: string }>): string {
  const parts = history.map((h) => `${h.role}:${h.content}`).join("\n");
  let hash = 0x811c9dc5;
  for (let i = 0; i < parts.length; i++) {
    hash ^= parts.charCodeAt(i);
    hash = (hash * 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function sessionLookup(history: Array<{ role: string; content: string }>): string | null {
  if (history.length === 0) return null;
  const key = sessionKey(history);
  const entry = sessionCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > SESSION_MAX_AGE_MS) {
    sessionCache.delete(key);
    return null;
  }
  return entry.backendUuid;
}

function sessionStore(
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  responseText: string,
  backendUuid: string | null
): void {
  if (!backendUuid) return;
  const full = [
    ...history,
    { role: "user", content: currentMsg },
    { role: "assistant", content: responseText },
  ];
  const key = sessionKey(full);
  sessionCache.set(key, { backendUuid, ts: Date.now() });
  if (sessionCache.size > SESSION_MAX_ENTRIES) {
    let oldestKey: string | null = null;
    let oldestTs = Infinity;
    for (const [k, v] of sessionCache) {
      if (v.ts < oldestTs) {
        oldestTs = v.ts;
        oldestKey = k;
      }
    }
    if (oldestKey) sessionCache.delete(oldestKey);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function cleanResponse(text: string, strip = true): string {
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

interface PplxDiffPatch {
  op?: string;
  path?: string;
  value?: unknown;
}

interface PplxBlock {
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

interface PplxStreamEvent {
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

async function* readPplxSseEvents(
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

interface ParsedMessages {
  systemMsg: string;
  history: Array<{ role: string; content: string }>;
  currentMsg: string;
}

function parseOpenAIMessages(messages: Array<Record<string, unknown>>): ParsedMessages {
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

function buildPplxRequestBody(
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

function buildQuery(parsed: ParsedMessages, followUpUuid: string | null): string {
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

interface ContentChunk {
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
function isAnswerTextUsage(usage: string): boolean {
  return usage === "ask_text" || /^ask_text_\d+_markdown$/.test(usage) || usage.includes("markdown");
}

// Reconstructed state for one answer-text block, built up from diff patches
// (streaming) or a materialized markdown_block (final COMPLETED frame).
interface MarkdownAccumulator {
  chunks: string[];
}

// Apply a markdown_block diff_block patch set. Perplexity sends an initial
// `{op:"replace", path:"", value:{chunks:[...]}}` then incremental
// `{op:"add", path:"/chunks/<n>", value:"..."}` frames. We only need the
// chunks array; joining it yields the cumulative answer text.
function applyMarkdownDiff(acc: MarkdownAccumulator, patches: PplxDiffPatch[]): void {
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

async function* extractContent(
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

function sseChunk(data: unknown): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

function buildStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  signal?: AbortSignal | null
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream(
    {
      async start(controller) {
        try {
          // Initial role chunk
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: null,
                choices: [
                  { index: 0, delta: { role: "assistant" }, finish_reason: null, logprobs: null },
                ],
              })
            )
          );

          let fullAnswer = "";
          let respBackendUuid: string | null = null;

          for await (const chunk of extractContent(eventStream, signal)) {
            if (chunk.backendUuid) respBackendUuid = chunk.backendUuid;

            if (chunk.error) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: null,
                    choices: [
                      {
                        index: 0,
                        delta: { content: `[Error: ${chunk.error}]` },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
              break;
            }

            if (chunk.thinking) {
              controller.enqueue(
                encoder.encode(
                  sseChunk({
                    id: cid,
                    object: "chat.completion.chunk",
                    created,
                    model,
                    system_fingerprint: null,
                    choices: [
                      {
                        index: 0,
                        delta: { reasoning_content: chunk.thinking + "\n" },
                        finish_reason: null,
                        logprobs: null,
                      },
                    ],
                  })
                )
              );
              continue;
            }

            if (chunk.done) {
              fullAnswer = chunk.answer || fullAnswer;
              break;
            }

            let dt = chunk.delta || "";
            if (dt) {
              dt = cleanResponse(dt, false);
              if (dt) {
                controller.enqueue(
                  encoder.encode(
                    sseChunk({
                      id: cid,
                      object: "chat.completion.chunk",
                      created,
                      model,
                      system_fingerprint: null,
                      choices: [
                        { index: 0, delta: { content: dt }, finish_reason: null, logprobs: null },
                      ],
                    })
                  )
                );
              }
            }
            if (chunk.answer) fullAnswer = chunk.answer;
          }

          // Stop chunk
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: null,
                choices: [{ index: 0, delta: {}, finish_reason: "stop", logprobs: null }],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          sessionStore(history, currentMsg, cleanResponse(fullAnswer), respBackendUuid);
        } catch (err) {
          controller.enqueue(
            encoder.encode(
              sseChunk({
                id: cid,
                object: "chat.completion.chunk",
                created,
                model,
                system_fingerprint: null,
                choices: [
                  {
                    index: 0,
                    delta: {
                      content: `[Stream error: ${err instanceof Error ? err.message : String(err)}]`,
                    },
                    finish_reason: "stop",
                    logprobs: null,
                  },
                ],
              })
            )
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } finally {
          try { controller.close(); } catch {}
        }
      },
    },
    { highWaterMark: 16384 }
  );
}

async function buildNonStreamingResponse(
  eventStream: ReadableStream<Uint8Array>,
  model: string,
  cid: string,
  created: number,
  history: Array<{ role: string; content: string }>,
  currentMsg: string,
  signal?: AbortSignal | null
): Promise<Response> {
  let fullAnswer = "";
  let respBackendUuid: string | null = null;
  const thinkingParts: string[] = [];

  for await (const chunk of extractContent(eventStream, signal)) {
    if (chunk.backendUuid) respBackendUuid = chunk.backendUuid;
    if (chunk.error) {
      return new Response(
        JSON.stringify({
          error: { message: chunk.error, type: "upstream_error", code: "PPLX_ERROR" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    if (chunk.thinking) {
      thinkingParts.push(chunk.thinking);
      continue;
    }
    if (chunk.done) {
      fullAnswer = chunk.answer || fullAnswer;
      break;
    }
    if (chunk.answer) fullAnswer = chunk.answer;
  }

  fullAnswer = cleanResponse(fullAnswer);
  sessionStore(history, currentMsg, fullAnswer, respBackendUuid);

  const reasoningContent = thinkingParts.length > 0 ? thinkingParts.join("\n") : undefined;
  const msg: Record<string, unknown> = { role: "assistant", content: fullAnswer };
  if (reasoningContent) msg.reasoning_content = reasoningContent;

  const promptTokens = Math.ceil(currentMsg.length / 4);
  const completionTokens = Math.ceil(fullAnswer.length / 4);

  return new Response(
    JSON.stringify({
      id: cid,
      object: "chat.completion",
      created,
      model,
      system_fingerprint: null,
      choices: [{ index: 0, message: msg, finish_reason: "stop", logprobs: null }],
      usage: {
        prompt_tokens: promptTokens,
        completion_tokens: completionTokens,
        total_tokens: promptTokens + completionTokens,
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// ─── Executor ───────────────────────────────────────────────────────────────

export class PerplexityWebExecutor extends BaseExecutor {
  constructor() {
    super("perplexity-web", { id: "perplexity-web", baseUrl: PPLX_SSE_ENDPOINT });
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const bodyObj = (body || {}) as Record<string, unknown>;
    const rawMessages = bodyObj.messages as
      | Array<Record<string, unknown>>
      | undefined;
    if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Missing or empty messages array", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers: {}, transformedBody: body };
    }

    const { hasTools, requestedTools, effectiveMessages } = prepareToolMessages(bodyObj, rawMessages as Array<{ role: string; content: unknown }>);

    // Resolve thinking mode
    const thinking =
      bodyObj.thinking === true ||
      (bodyObj.reasoning_effort != null && bodyObj.reasoning_effort !== "none");

    let pplxMode: string;
    let modelPref: string;
    if (thinking && THINKING_MAP[model]) {
      pplxMode = "copilot";
      modelPref = THINKING_MAP[model];
      log?.info?.("PPLX-WEB", `Thinking mode → ${model} using ${modelPref}`);
    } else if (MODEL_MAP[model]) {
      [pplxMode, modelPref] = MODEL_MAP[model];
    } else {
      pplxMode = "copilot";
      modelPref = model;
      log?.info?.("PPLX-WEB", `Unmapped model ${model}, using as raw preference`);
    }

    // Parse messages and check session continuity
    const parsed = parseOpenAIMessages(effectiveMessages);
    const followUpUuid = sessionLookup(parsed.history);
    if (followUpUuid) {
      log?.info?.("PPLX-WEB", `Session continue: ${followUpUuid.slice(0, 12)}...`);
    }

    const query = buildQuery(parsed, followUpUuid);
    if (!query.trim()) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Empty query after processing", type: "invalid_request" },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers: {}, transformedBody: body };
    }

    // Build Perplexity request
    const requestId = crypto.randomUUID();
    const pplxBody = buildPplxRequestBody(query, parsed.currentMsg, pplxMode, modelPref, followUpUuid, requestId);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      Origin: "https://www.perplexity.ai",
      Referer: "https://www.perplexity.ai/",
      "User-Agent": PPLX_USER_AGENT,
      // Current app request headers (replaced the stale X-App-ApiVersion/X-App-ApiClient pair,
      // which the new endpoint no longer expects and which contributed to HTTP 400).
      "x-perplexity-request-endpoint": PPLX_SSE_ENDPOINT,
      "x-perplexity-request-reason": "ask-query-state-provider",
      "x-perplexity-request-try-number": "1",
      "x-request-id": requestId,
    };

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (credentials.apiKey) {
      headers["Cookie"] = `__Secure-next-auth.session-token=${credentials.apiKey}`;
    }

    log?.info?.(
      "PPLX-WEB",
      `Query to ${model} (pref=${modelPref}, mode=${pplxMode}), len=${query.length}`
    );

    // Fetch from Perplexity through the Firefox-fingerprinted TLS client.
    // Perplexity sits behind Cloudflare Enterprise which pins JA3/JA4 to a real
    // browser handshake; Node's fetch() is challenged with a 403 page from
    // VPS/datacenter IPs even with a valid cookie (issue #2459).
    let response: TlsFetchResult;
    try {
      response = await tlsFetchPerplexity(PPLX_SSE_ENDPOINT, {
        method: "POST",
        headers,
        body: JSON.stringify(pplxBody),
        signal: signal ?? null,
        stream: true,
        streamEofSymbol: "[DONE]",
      });
    } catch (err) {
      const isTlsUnavail = err instanceof TlsClientUnavailableError;
      log?.error?.("PPLX-WEB", `Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
      const errResp = new Response(
        JSON.stringify({
          error: {
            message: isTlsUnavail
              ? `Perplexity TLS client unavailable: ${sanitizeErrorMessage((err as Error).message)}`
              : `Perplexity connection failed: ${sanitizeErrorMessage(err instanceof Error ? err.message : String(err))}`,
            type: "upstream_error",
          },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    if (response.status !== 200 || (!response.body && !response.text)) {
      const status = response.status;
      let errMsg = `Perplexity returned HTTP ${status}`;
      if (status === 401 || status === 403) {
        if (isCloudflareChallenge(response.text)) {
          errMsg =
            "Cloudflare blocked the request — Perplexity's edge rejected this server's TLS fingerprint " +
            "(common on VPS/datacenter IPs). Ensure tls-client-node is installed with its native binary, " +
            "or route perplexity-web through a residential proxy.";
          log?.error?.("PPLX-WEB", "Cloudflare challenge detected — TLS bypass failed");
        } else {
          errMsg =
            "Perplexity auth failed — session cookie may be expired. Re-paste your __Secure-next-auth.session-token.";
        }
      } else if (status === 429) {
        errMsg = "Perplexity rate limited. Wait a moment and retry.";
      }
      log?.warn?.("PPLX-WEB", errMsg);
      const errResp = new Response(
        JSON.stringify({
          error: { message: errMsg, type: "upstream_error", code: `HTTP_${status}` },
        }),
        { status, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    if (!response.body) {
      const errResp = new Response(
        JSON.stringify({
          error: { message: "Perplexity returned empty response body", type: "upstream_error" },
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
      return { response: errResp, url: PPLX_SSE_ENDPOINT, headers, transformedBody: pplxBody };
    }

    // Build OpenAI-compatible response
    const cid = `chatcmpl-pplx-${crypto.randomUUID().slice(0, 12)}`;
    const created = Math.floor(Date.now() / 1000);

    let finalResponse: Response;
    if (stream) {
      const sseStream = buildStreamingResponse(
        response.body,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
      finalResponse = new Response(sseStream, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    } else {
      finalResponse = await buildNonStreamingResponse(
        response.body,
        model,
        cid,
        created,
        parsed.history,
        parsed.currentMsg,
        signal
      );
    }

    if (hasTools && !stream) {
      const bodyText = await (finalResponse as Response).text();
      try {
        const json = JSON.parse(bodyText);
        const rawContent = json?.choices?.[0]?.message?.content || "";
        const { content, toolCalls, finishReason } = buildToolAwareResult(rawContent, requestedTools, "pplx");
        if (toolCalls) {
          json.choices[0].message = { role: "assistant", content: null, tool_calls: toolCalls };
          json.choices[0].finish_reason = finishReason;
        } else {
          json.choices[0].message.content = content;
        }
        finalResponse = new Response(JSON.stringify(json), {
          status: 200, headers: { "Content-Type": "application/json" },
        });
      } catch { /* keep original response */ }
    }

    return {
      response: finalResponse,
      url: PPLX_SSE_ENDPOINT,
      headers,
      transformedBody: pplxBody,
    };
  }
}
