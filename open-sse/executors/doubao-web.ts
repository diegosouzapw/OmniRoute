/**
 * DoubaoWebExecutor — Dola Global web chat via dola.com.
 *
 * The provider id remains `doubao-web` for compatibility with existing saved
 * provider connections, but the global consumer service now runs through Dola.
 *
 * Endpoint: POST https://www.dola.com/chat/completion
 * Auth: Session cookies from www.dola.com
 */
import { randomUUID } from "node:crypto";
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult as makeErrorResult, normalizeCookie } from "../utils/error.ts";

const BASE_URL = "https://www.dola.com";
const CHAT_URL = `${BASE_URL}/chat/completion`;
const DEFAULT_MODEL = "dola-speed";
const DOLA_BOT_ID = "7339470689562525703";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36";

type JsonRecord = Record<string, unknown>;

export interface DolaTextExtractionState {
  deferUntilAnswer: boolean;
  answerStarted: boolean;
  bufferedDeltas: string[];
}

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function toString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toContentText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseJsonRecord(raw: string): JsonRecord | null {
  if (!raw.startsWith("{")) return null;
  try {
    return asRecord(JSON.parse(raw));
  } catch {
    return null;
  }
}

function randomNumericId(length = 19): string {
  let id = String(Math.floor(Math.random() * 9) + 1);
  while (id.length < length) id += String(Math.floor(Math.random() * 10));
  return id;
}

function contentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        const item = asRecord(part);
        if (item.type === "text") return toContentText(item.text);
        if (typeof item.text === "string") return item.text;
        return "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

function isDolaReasoningModel(modelId: string): boolean {
  return modelId === "dola-pro" || modelId === "dola-deep-think";
}

function createDolaTextExtractionState(modelId: string): DolaTextExtractionState {
  const deferUntilAnswer = isDolaReasoningModel(modelId);
  return {
    deferUntilAnswer,
    answerStarted: !deferUntilAnswer,
    bufferedDeltas: [],
  };
}

function isDolaAnswerBoundary(block: JsonRecord): boolean {
  return block.block_type === 10040 && block.is_finish === true;
}

export function foldMessages(messages: unknown): string {
  if (!Array.isArray(messages)) return "";
  return messages
    .map((message) => {
      const item = asRecord(message);
      const role = toString(item.role) || "user";
      const text = contentToText(item.content);
      return text ? `${role}: ${text}` : "";
    })
    .filter(Boolean)
    .join("\n\n");
}

export function extractCookieValue(cookieHeader: string, name: string): string {
  const pattern = new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`);
  const value = pattern.exec(cookieHeader)?.[1] ?? "";
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

function extractQueryValue(raw: string, name: string): string {
  if (!raw.includes("?") && !raw.includes("&")) return "";
  try {
    const url = raw.startsWith("http") ? new URL(raw) : new URL(`https://www.dola.com/?${raw}`);
    return toString(url.searchParams.get(name));
  } catch {
    return "";
  }
}

export function resolveDolaFingerprint(
  cookieHeader: string,
  providerSpecificData?: unknown,
  rawCredential = ""
): string {
  const data = asRecord(providerSpecificData);
  return (
    toString(data.s_v_web_id) ||
    toString(data.sVWebId) ||
    extractCookieValue(cookieHeader, "s_v_web_id") ||
    toString(data.fp) ||
    extractCookieValue(cookieHeader, "fp") ||
    extractQueryValue(rawCredential, "fp")
  );
}

export function buildDolaCookieHeader(
  rawCredential: string,
  providerSpecificData?: unknown
): string {
  const providerData = asRecord(providerSpecificData);
  const raw = normalizeCookie(rawCredential.trim());
  const parsed = parseJsonRecord(raw);
  const data = { ...providerData, ...(parsed ?? {}) };
  const explicitCookie = normalizeCookie(toString(data.cookie));
  const directCookie = raw && !parsed ? raw : "";
  const cookieSource = explicitCookie || directCookie;

  if (cookieSource.includes("=")) return cookieSource;

  const cookieNames = [
    "sessionid",
    "ttwid",
    "s_v_web_id",
    "fp",
    "sessionid_ss",
    "sid_guard",
    "sid_tt",
    "uid_tt",
    "uid_tt_ss",
    "passport_auth_status",
    "passport_auth_status_ss",
    "odin_tt",
  ];
  const parts = cookieNames
    .map((name) => {
      const value = toString(data[name]);
      return value ? `${name}=${value}` : "";
    })
    .filter(Boolean);

  if (parts.length > 0) return parts.join("; ");
  return raw ? `sessionid=${raw}` : "";
}

export function buildDolaQueryParams(
  cookieHeader: string,
  providerSpecificData?: unknown,
  rawCredential = ""
): URLSearchParams {
  const data = asRecord(providerSpecificData);
  const generatedId = randomNumericId();
  const deviceId = toString(data.device_id) || toString(data.deviceId) || generatedId;
  const fp = resolveDolaFingerprint(cookieHeader, providerSpecificData, rawCredential);

  return new URLSearchParams({
    aid: "495671",
    real_aid: "495671",
    device_platform: "web",
    device_id: deviceId,
    web_id: toString(data.web_id) || toString(data.webId) || deviceId,
    tea_uuid: toString(data.tea_uuid) || toString(data.teaUuid) || deviceId,
    web_tab_id: randomUUID(),
    pc_version: toString(data.pc_version) || toString(data.pcVersion) || "3.25.3",
    pkg_type: "release_version",
    version_code: "20800",
    samantha_web: "1",
    web_platform: "browser",
    "use-olympus-account": "1",
    language: toString(data.language) || "en",
    region: toString(data.region) || "US",
    sys_region: toString(data.sys_region) || toString(data.sysRegion) || "US",
    fp,
  });
}

export function resolveDolaDeepThinkValue(modelId: string, providerSpecificData?: unknown): 0 | 3 {
  const data = asRecord(providerSpecificData);
  const configured = toString(data.use_deep_think) || toString(data.useDeepThink);
  if (configured === "3") return 3;
  if (configured === "0") return 0;
  if (data.deepThink === true || modelId === "dola-pro" || modelId === "dola-deep-think") return 3;
  return 0;
}

export function buildDolaPayload(
  prompt: string,
  modelId = DEFAULT_MODEL,
  cookieHeader = "",
  providerSpecificData?: unknown,
  rawCredential = ""
): JsonRecord {
  const data = asRecord(providerSpecificData);
  const localConversationId =
    toString(data.local_conversation_id) ||
    toString(data.localConversationId) ||
    `local_${randomNumericId(16)}`;
  const blockId = randomUUID();
  const messageId = randomUUID();
  const uniqueKey = randomUUID();
  const now = Date.now();
  const deepThinkValue = resolveDolaDeepThinkValue(modelId, providerSpecificData);
  const fp = resolveDolaFingerprint(cookieHeader, providerSpecificData, rawCredential);

  return {
    client_meta: {
      local_conversation_id: localConversationId,
      conversation_id: "",
      bot_id: toString(data.bot_id) || toString(data.botId) || DOLA_BOT_ID,
      last_section_id: "",
      last_message_index: null,
    },
    messages: [
      {
        local_message_id: messageId,
        content_block: [
          {
            block_type: 10000,
            content: {
              text_block: {
                text: prompt,
                icon_url: "",
                icon_url_dark: "",
                summary: "",
              },
              pc_event_block: "",
            },
            block_id: blockId,
            parent_id: "",
            meta_info: [],
            append_fields: [],
          },
        ],
        message_status: 0,
      },
    ],
    option: {
      send_message_scene: "",
      create_time_ms: now,
      collect_id: "",
      is_audio: false,
      answer_with_suggest: false,
      tts_switch: false,
      need_deep_think: deepThinkValue,
      click_clear_context: false,
      from_suggest: false,
      is_regen: false,
      is_replace: false,
      is_from_click_option: false,
      is_from_click_softlink: false,
      disable_sse_cache: false,
      select_text_action: "",
      is_select_text: false,
      resend_for_regen: false,
      scene_type: 0,
      unique_key: uniqueKey,
      start_seq: 0,
      need_create_conversation: true,
      conversation_init_option: { need_ack_conversation: true },
      regen_query_id: [],
      edit_query_id: [],
      regen_instruction: "",
      no_replace_for_regen: false,
      message_from: 0,
      shared_app_name: "",
      shared_app_id: "",
      sse_recv_event_options: { support_chunk_delta: true },
      is_ai_playground: false,
      is_old_user: false,
      recovery_option: {
        is_recovery: false,
        req_create_time_sec: Math.floor(now / 1000),
        append_sse_event_scene: 0,
      },
      message_storage_type: 0,
    },
    user_context: [],
    ext: {
      use_deep_think: String(deepThinkValue),
      fp,
      sub_conv_firstmet_type: "1",
      collection_id: "",
      conversation_init_option: JSON.stringify({ need_ack_conversation: true }),
      commerce_credit_config_enable: "0",
    },
  };
}

function parseSseBlock(block: string): { event: string; data: unknown } | null {
  const lines = block.split(/\r?\n/);
  const event = lines
    .find((line) => line.startsWith("event:"))
    ?.slice(6)
    .trim();
  const dataLines = lines
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).trim());
  if (dataLines.length === 0) return null;
  const rawData = dataLines.join("\n");
  if (rawData === "[DONE]") return { event: event || "done", data: "[DONE]" };
  try {
    return { event: event || "", data: JSON.parse(rawData) };
  } catch {
    return null;
  }
}

function extractDolaBlockDeltas(blocks: unknown[], state?: DolaTextExtractionState): string[] {
  const deltas: string[] = [];

  for (const block of blocks) {
    const blockRecord = asRecord(block);
    if (state && isDolaAnswerBoundary(blockRecord)) {
      state.answerStarted = true;
      state.bufferedDeltas = [];
      continue;
    }

    const text = toContentText(asRecord(asRecord(blockRecord.content).text_block).text);
    if (!text) continue;

    if (!state || state.answerStarted) {
      deltas.push(text);
    } else {
      state.bufferedDeltas.push(text);
    }
  }

  return deltas;
}

function flushDolaTextExtractionState(state: DolaTextExtractionState): string[] {
  if (state.answerStarted) return [];
  const fallback = state.bufferedDeltas;
  state.bufferedDeltas = [];
  state.answerStarted = true;
  return fallback;
}

export function extractDolaTextDeltas(data: unknown, state?: DolaTextExtractionState): string[] {
  const root = asRecord(data);
  const payload = asRecord(root.data);
  const content = asRecord(root.content);
  const payloadContent = asRecord(payload.content);
  const initialBlocks = Array.isArray(content.content_block)
    ? content.content_block
    : Array.isArray(payloadContent.content_block)
      ? payloadContent.content_block
      : [];
  const patchOps = Array.isArray(root.patch_op)
    ? root.patch_op
    : Array.isArray(payload.patch_op)
      ? payload.patch_op
      : [];
  const deltas = extractDolaBlockDeltas(initialBlocks, state);

  for (const op of patchOps) {
    const patchValue = asRecord(asRecord(op).patch_value);
    const blocks = Array.isArray(patchValue.content_block) ? patchValue.content_block : [];
    deltas.push(...extractDolaBlockDeltas(blocks, state));
  }

  return deltas;
}

function extractDolaError(data: unknown): string {
  const root = asRecord(data);
  const payload = asRecord(root.data);
  return (
    toString(root.message) ||
    toString(payload.message) ||
    toString(payload.error_msg) ||
    toString(payload.errorMessage)
  );
}

export function isDolaBusyMessage(content: string): boolean {
  const normalized = content.trim().toLowerCase();
  return (
    normalized.includes("a lot of people are using the app right now") &&
    normalized.includes("try again later")
  );
}

function openAiChunk(modelId: string, content: string): JsonRecord {
  return {
    id: `chatcmpl-dola-${Date.now()}`,
    object: "chat.completion.chunk",
    created: Math.floor(Date.now() / 1000),
    model: modelId,
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  };
}

function openAiCompletion(modelId: string, content: string): JsonRecord {
  return {
    id: `chatcmpl-dola-${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model: modelId,
    choices: [{ index: 0, message: { role: "assistant", content }, finish_reason: "stop" }],
  };
}

export class DoubaoWebExecutor extends BaseExecutor {
  constructor() {
    super("doubao-web", { id: "doubao-web", baseUrl: BASE_URL });
  }

  private createHeaders(cookieHeader: string): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "User-Agent": USER_AGENT,
      Accept: "text/event-stream",
      Referer: `${BASE_URL}/chat/`,
      Origin: BASE_URL,
      "Agw-Js-Conv": "str",
    };
    if (cookieHeader) headers.Cookie = cookieHeader;
    return headers;
  }

  private async collectText(upstream: Response, modelId: string): Promise<string> {
    const raw = await upstream.text();
    const state = createDolaTextExtractionState(modelId);
    const deltas: string[] = [];

    for (const block of raw.split(/\r?\n\r?\n/)) {
      const event = parseSseBlock(block);
      if (event) deltas.push(...extractDolaTextDeltas(event.data, state));
    }
    deltas.push(...flushDolaTextExtractionState(state));

    return deltas.join("");
  }

  private createStream(upstream: Response, modelId: string, signal?: AbortSignal | null) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const state = createDolaTextExtractionState(modelId);
    let sentDone = false;

    return new ReadableStream({
      async start(controller) {
        const reader = upstream.body?.getReader();
        if (!reader) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          return;
        }
        let buffer = "";
        let errored = false;
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const blocks = buffer.split(/\r?\n\r?\n/);
            buffer = blocks.pop() || "";

            for (const block of blocks) {
              const event = parseSseBlock(block);
              if (!event) continue;
              if (event.event === "STREAM_ERROR") {
                const message = extractDolaError(event.data) || "Dola stream error";
                errored = true;
                controller.error(new Error(message));
                return;
              }
              for (const text of extractDolaTextDeltas(event.data, state)) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify(openAiChunk(modelId, text))}\n\n`)
                );
              }
              if (event.event === "SSE_REPLY_END") {
                sentDone = true;
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              }
            }
          }
        } catch (err) {
          if (!signal?.aborted) {
            errored = true;
            controller.error(err);
          }
          return;
        } finally {
          if (errored) return;
          for (const text of flushDolaTextExtractionState(state)) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(openAiChunk(modelId, text))}\n\n`)
            );
          }
          if (!sentDone) controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });
  }

  async execute(input: ExecuteInput) {
    const { body, credentials, signal, stream: wantStream } = input;
    const bodyObj = asRecord(body);
    const providerSpecificData = credentials?.providerSpecificData;
    const rawCredential = toString(credentials?.apiKey);
    const cookieHeader = buildDolaCookieHeader(rawCredential, providerSpecificData);
    const requestedModel = toString(bodyObj.model) || input.model || DEFAULT_MODEL;
    const modelId = requestedModel.split("/").pop() || DEFAULT_MODEL;
    const prompt = foldMessages(bodyObj.messages);
    const fingerprint = resolveDolaFingerprint(cookieHeader, providerSpecificData, rawCredential);
    const transformedBody = buildDolaPayload(
      prompt,
      modelId,
      cookieHeader,
      providerSpecificData,
      rawCredential
    );
    const query = buildDolaQueryParams(cookieHeader, providerSpecificData, rawCredential);
    const url = `${CHAT_URL}?${query.toString()}`;
    const reqHeaders = this.createHeaders(cookieHeader);

    if (!extractCookieValue(cookieHeader, "sessionid")) {
      return {
        ...makeErrorResult(
          401,
          "Dola Web requires a www.dola.com Cookie header containing at least sessionid, ttwid, and s_v_web_id.",
          body,
          url
        ),
        headers: reqHeaders,
        transformedBody,
      };
    }
    if (!fingerprint) {
      return {
        ...makeErrorResult(
          401,
          "Dola Web requires the browser fingerprint value from www.dola.com. Add s_v_web_id=... from Cookies or fp=verify_... from a Network chat/completion request URL.",
          body,
          url
        ),
        headers: reqHeaders,
        transformedBody,
      };
    }

    let upstream: Response;
    try {
      upstream = await fetch(url, {
        method: "POST",
        headers: reqHeaders,
        body: JSON.stringify(transformedBody),
        signal,
      });
    } catch (err) {
      return {
        ...makeErrorResult(
          502,
          `Dola fetch failed: ${err instanceof Error ? err.message : "unknown"}`,
          body,
          url
        ),
        headers: reqHeaders,
        transformedBody,
      };
    }

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => "");
      return {
        ...makeErrorResult(upstream.status, `Dola error: ${errText}`, body, url),
        headers: reqHeaders,
        transformedBody,
      };
    }

    const contentType = upstream.headers.get("Content-Type") || "";
    if (!contentType.toLowerCase().includes("text/event-stream")) {
      const text = await upstream.text().catch(() => "");
      return {
        ...makeErrorResult(502, `Dola returned non-SSE response: ${text}`, body, url),
        headers: reqHeaders,
        transformedBody,
      };
    }

    if (!wantStream) {
      const content = await this.collectText(upstream, modelId);
      if (isDolaBusyMessage(content)) {
        return {
          ...makeErrorResult(429, "Dola is temporarily busy. Please try again later.", body, url),
          headers: reqHeaders,
          transformedBody,
        };
      }
      return {
        response: new Response(JSON.stringify(openAiCompletion(modelId, content)), {
          headers: { "Content-Type": "application/json" },
        }),
        url,
        headers: reqHeaders,
        transformedBody,
      };
    }

    return {
      response: new Response(this.createStream(upstream, modelId, signal), {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      }),
      url,
      headers: reqHeaders,
      transformedBody,
    };
  }
}
