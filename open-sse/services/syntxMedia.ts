/**
 * SYNTX.ai media generation — design / video / audio / transcribe / upscale.
 *
 * Ports the unofficial syntx-ai-mcp SDK flow:
 *   create chat (scope image|video|audio)
 *   optional upload → r2.syntx.ai URL
 *   POST /api/v1/{design|video|audio}/generate?ai_name=
 *   poll GET /api/v1/chats/{uuid}/messages until media objects complete
 *
 * Chat/LLM generate stays in executors/syntx.ts and is not used here.
 */
import { randomBytes } from "node:crypto";
import { SYNTX_API_BASE, looksLikeJwt, resolveSyntxToken, syntxAuthHeaders } from "./syntxAuth.ts";
import {
  defaultAiNameForKind,
  parseSyntxMediaModelId,
  type SyntxMediaKind,
} from "./syntxMediaCatalog.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export { looksLikeJwt, resolveSyntxToken };

export const SYNTX_MEDIA_POLL_TIMEOUT_MS = 600_000;
export const SYNTX_MEDIA_POLL_INTERVAL_MS = 5_000;
export const SYNTX_TRANSCRIBE_MAX_BYTES = 52_428_800;

const MEDIA_OBJECT_TYPES = new Set(["image", "video", "audio", "file"]);

type JsonRecord = Record<string, unknown>;
type FetchImpl = typeof fetch;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function chatTitleFromText(text: string): string {
  const trimmed = (text || "media").replace(/\s+/g, " ").trim();
  return trimmed.slice(0, 60) || "media";
}

export type SyntxMediaItem = {
  objectType: string;
  url: string;
  text?: string;
};

export type SyntxGenerateResult = {
  chatUuid: string;
  text: string;
  media: SyntxMediaItem[];
};

export class SyntxMediaError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.name = "SyntxMediaError";
    this.status = status;
  }
}

function drop(settings: JsonRecord, key: string): void {
  delete settings[key];
}

function dropAll(settings: JsonRecord, keys: string[]): void {
  for (const key of keys) drop(settings, key);
}

/**
 * SPA pre-processor rules from syntx-ai-mcp `resources/provider-rules.ts`.
 * Mutates `settings` in place after the caller merge.
 */
export function applySyntxProviderRules(
  aiName: string,
  settings: JsonRecord,
  ctx: { modelType: string; fileCount?: number }
): void {
  const modelType = ctx.modelType || "";
  const fileCount = ctx.fileCount ?? 0;

  if (aiName === "grok_video") {
    if (modelType === "grok_i2v") drop(settings, "aspect_ratio");
    if (modelType === "grok_v2v")
      dropAll(settings, ["aspect_ratio", "video_duration", "resolution"]);
  }
  if (aiName === "kling" && /^kling_o1_/.test(modelType)) drop(settings, "mode");
  if (aiName === "runway" && modelType === "acttwo") drop(settings, "video_duration");
  if (aiName === "grok_image") {
    if (modelType === "grok_i2i_pro") drop(settings, "aspect_ratio");
    else if (modelType === "grok_i2i" && fileCount < 2) drop(settings, "aspect_ratio");
  }
  if (aiName === "ideogram") {
    if (settings.mode === "upscale") drop(settings, "aspect_ratio");
    if (settings.mode === "describe") {
      dropAll(settings, [
        "aspect_ratio",
        "quality",
        "details_quality",
        "seed",
        "style",
        "version",
        "negative_prompt",
        "enhance",
        "rendering_speed",
      ]);
    }
  }
  if (aiName === "luma_image" && fileCount > 0 && settings.mode !== undefined)
    settings.mode = "auto";
  if (aiName === "midjourney" && (settings.version === "8.1" || settings.version === "niji 7")) {
    drop(settings, "quality");
  }
  if (aiName === "runway-frames") drop(settings, "style");
  if (aiName === "seedream") {
    if (
      (modelType === "seedream-4.5" || modelType === "seedream-5") &&
      settings.resolution === "1K"
    ) {
      settings.resolution = "2K";
    }
    if (modelType === "seedream-5.0-pro" && settings.resolution === "4K")
      settings.resolution = "2K";
  }
  if (aiName === "sora-images" && modelType !== "gpt-image-2") {
    drop(settings, "quality");
    drop(settings, "details_quality");
  }
  if (
    aiName === "wan_image" &&
    modelType === "wan-2.7-pro" &&
    fileCount > 0 &&
    settings.resolution === "4K"
  ) {
    settings.resolution = "2K";
  }
  if (aiName === "suno" && (settings.mode ?? "generate") === "generate") {
    dropAll(settings, ["audio_url", "continue_at", "source_clip_id", "source_task_id"]);
  }
}

const RESOLUTION_TOKEN = /^(?:\d+x\d+|\d+K|[1-9]\d{1,3}p)$/i;
const ASPECT_TOKEN = /^\d+:\d+$/;

function firstString(body: JsonRecord, keys: string[]): string {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "string" && value.trim() && value.trim().toLowerCase() !== "auto") {
      return value.trim();
    }
  }
  return "";
}

function firstNumber(body: JsonRecord, keys: string[]): number | undefined {
  for (const key of keys) {
    const value = body[key];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) return value;
    if (typeof value === "string" && value.trim()) {
      const parsed = Number(value.trim());
      if (Number.isFinite(parsed) && parsed > 0) return parsed;
    }
  }
  return undefined;
}

/**
 * Map OpenAI/Media-page fields onto the SPA settings keys each SYNTX ai_name
 * actually accepts. Size "16:9" is aspect_ratio; "1024x1024" / "2K" / "720p"
 * is resolution. Quality is only kept when it is not a resolution alias.
 */
export function mapSyntxImageRequestSettings(
  aiName: string,
  modelType: string,
  body: JsonRecord
): JsonRecord {
  const settings: JsonRecord = { model_type: modelType };
  const n = typeof body.n === "number" && body.n > 0 ? Math.min(body.n, 8) : 1;
  settings.n = n;

  const size = firstString(body, ["size", "aspect_ratio", "aspectRatio"]);
  const quality = firstString(body, ["quality", "resolution"]);
  if (ASPECT_TOKEN.test(size)) settings.aspect_ratio = size;
  else if (RESOLUTION_TOKEN.test(size)) settings.resolution = size;

  if (RESOLUTION_TOKEN.test(quality)) {
    settings.resolution = quality;
  } else if (quality && quality.toLowerCase() !== "auto") {
    if (aiName === "sora-images" && modelType === "gpt-image-2") settings.quality = quality;
    else if (aiName === "midjourney") settings.quality = quality;
  }

  return settings;
}

export function mapSyntxVideoRequestSettings(
  aiName: string,
  modelType: string,
  body: JsonRecord
): JsonRecord {
  const settings: JsonRecord = { model_type: modelType };
  const aspect = firstString(body, ["aspect_ratio", "aspectRatio", "ratio", "size"]);
  if (ASPECT_TOKEN.test(aspect) || /^\d+:\d+$/.test(aspect.replace("x", ":"))) {
    settings.aspect_ratio = aspect.includes("x") ? aspect.replace("x", ":") : aspect;
  }
  const duration = firstNumber(body, ["duration", "durationSeconds", "video_duration"]);
  if (duration != null) {
    if (aiName === "grok_video") settings.video_duration = duration;
    else settings.duration = duration;
  }
  const resolution = firstString(body, ["resolution", "quality"]);
  if (RESOLUTION_TOKEN.test(resolution) || /p$/i.test(resolution)) {
    settings.resolution = resolution;
  }
  const fps = firstNumber(body, ["fps"]);
  if (fps != null) settings.fps = fps;
  const seed = firstNumber(body, ["seed"]);
  if (seed != null) settings.seed = seed;
  return settings;
}

export function mapSyntxAudioRequestSettings(
  _aiName: string,
  modelType: string,
  body: JsonRecord
): JsonRecord {
  const settings: JsonRecord = { model_type: modelType };
  const voice = firstString(body, ["voice", "voice_id"]);
  if (voice && voice.toLowerCase() !== "alloy") settings.voice_id = voice;
  const duration = firstNumber(body, ["duration"]);
  if (duration != null) settings.duration = duration;
  const speed = firstNumber(body, ["speed"]);
  if (speed != null && speed !== 1) settings.speed = speed;
  const style = firstString(body, ["style_prompt", "instructions"]);
  if (style) settings.prompt = style;
  return settings;
}

export function resolveSyntxMediaTarget(
  model: string,
  kind: SyntxMediaKind
): { aiName: string; modelType: string } {
  const parsed = parseSyntxMediaModelId(model);
  const aiName = parsed.aiName || defaultAiNameForKind(kind);
  const modelType = parsed.modelType || parsed.aiName || defaultAiNameForKind(kind);
  return { aiName, modelType };
}

export function collectSyntxCompletedMedia(message: unknown): {
  text: string;
  media: SyntxMediaItem[];
  ready: boolean;
} {
  const rec = asRecord(message);
  const objects = Array.isArray(rec.message_object) ? rec.message_object : [];
  if (objects.length === 0) return { text: "", media: [], ready: false };
  const ready = objects.every((item) => asRecord(item).completed === true);
  const textParts: string[] = [];
  const media: SyntxMediaItem[] = [];
  for (const item of objects) {
    const obj = asRecord(item);
    const type = asString(obj.object_type);
    if (type === "text" || type === "filetext") {
      const text = asString(obj.object_text);
      if (text) textParts.push(text);
    } else if (MEDIA_OBJECT_TYPES.has(type) && asString(obj.object_url)) {
      media.push({
        objectType: type,
        url: asString(obj.object_url),
        text: asString(obj.object_text) || undefined,
      });
    }
  }
  return {
    text: textParts.length > 1 ? textParts.join("\n\n") : textParts.join(""),
    media,
    ready,
  };
}

function extractUrlsDeep(value: unknown, into: SyntxMediaItem[], kindHint: string): void {
  if (!value) return;
  if (typeof value === "string") {
    if (/^https?:\/\//i.test(value) && !value.includes("syntx.ai/api/")) {
      into.push({ objectType: kindHint, url: value });
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) extractUrlsDeep(item, into, kindHint);
    return;
  }
  const rec = asRecord(value);
  const preferred = [
    "object_url",
    "url",
    "image_url",
    "video_url",
    "audio_url",
    "file_url",
    "download_url",
  ];
  for (const key of preferred) {
    const raw = rec[key];
    if (typeof raw === "string" && /^https?:\/\//i.test(raw)) {
      into.push({ objectType: kindHint, url: raw });
    }
  }
  for (const nested of Object.values(rec)) {
    if (nested && typeof nested === "object") extractUrlsDeep(nested, into, kindHint);
  }
}

async function syntxJson(
  fetchImpl: FetchImpl,
  token: string,
  method: string,
  url: string,
  body?: unknown
): Promise<{ status: number; json: unknown; text: string }> {
  const headers: Record<string, string> = { ...syntxAuthHeaders(token) };
  const init: RequestInit = { method, headers };
  if (body !== undefined) {
    headers["content-type"] = "application/json";
    init.body = JSON.stringify(body);
  }
  const response = await fetchImpl(url, init);
  const text = await response.text().catch(() => "");
  let json: unknown = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { message: text };
  }
  return { status: response.status, json, text };
}

export async function createSyntxMediaChat(options: {
  token: string;
  scope: "image" | "video" | "audio";
  title: string;
  fetchImpl?: FetchImpl;
}): Promise<string> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const { status, json, text } = await syntxJson(
    fetchImpl,
    options.token,
    "POST",
    `${SYNTX_API_BASE}/api/v1/chats`,
    { title: chatTitleFromText(options.title), scope: options.scope }
  );
  if (status < 200 || status >= 300) {
    throw new SyntxMediaError(
      `SYNTX create chat HTTP ${status}: ${sanitizeErrorMessage(text)}`,
      status
    );
  }
  const uuid = asString(asRecord(json).uuid);
  if (!uuid) throw new SyntxMediaError("SYNTX create chat returned no uuid", 502);
  return uuid;
}

function encodeUploadMultipart(file: { bytes: Uint8Array; name: string; mime: string }): {
  body: Buffer;
  contentType: string;
} {
  const safeName = file.name.replace(/["\r\n]/g, "_") || "upload.bin";
  const safeMime = file.mime.replace(/[\r\n]/g, "") || "application/octet-stream";
  const boundary = `----WebKitFormBoundary${randomBytes(8).toString("hex")}`;
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="files"; filename="${safeName}"\r\nContent-Type: ${safeMime}\r\n\r\n`
    ),
    Buffer.from(file.bytes),
    Buffer.from(
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="destination"\r\n\r\nuploaded\r\n--${boundary}\r\nContent-Disposition: form-data; name="check_duplicates"\r\n\r\ntrue\r\n--${boundary}\r\nContent-Disposition: form-data; name="model_type"\r\n\r\n\r\n--${boundary}--\r\n`
    ),
  ]);
  return { body, contentType: `multipart/form-data; boundary=${boundary}` };
}

export async function uploadSyntxMediaFile(options: {
  token: string;
  bytes: Uint8Array;
  filename: string;
  mimeType: string;
  fetchImpl?: FetchImpl;
}): Promise<string | null> {
  if (!options.bytes || options.bytes.byteLength === 0) return null;
  if (options.bytes.byteLength > 100 * 1024 * 1024) return null;
  const fetchImpl = options.fetchImpl ?? fetch;
  const encoded = encodeUploadMultipart({
    bytes: options.bytes,
    name: options.filename,
    mime: options.mimeType,
  });
  const headers = syntxAuthHeaders(options.token);
  const response = await fetchImpl(`${SYNTX_API_BASE}/api/v1/chats/upload-files`, {
    method: "POST",
    headers: {
      authorization: headers.authorization,
      accept: headers.accept,
      origin: headers.origin,
      referer: headers.referer,
      "user-agent": headers["user-agent"],
      "accept-language": headers["accept-language"],
      "content-type": encoded.contentType,
    },
    body: encoded.body,
  });
  if (!response.ok) return null;
  const json = asRecord(await response.json().catch(() => ({})));
  const files = Array.isArray(json.files)
    ? json.files
    : Array.isArray(asRecord(json.data).files)
      ? (asRecord(json.data).files as unknown[])
      : [];
  const url = asString(asRecord(files[0]).url);
  return url || null;
}

export async function pollSyntxChatMedia(options: {
  token: string;
  chatUuid: string;
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const timeout = options.timeoutMs ?? SYNTX_MEDIA_POLL_TIMEOUT_MS;
  const maxInterval = options.pollIntervalMs ?? SYNTX_MEDIA_POLL_INTERVAL_MS;
  const start = Date.now();
  let interval = Math.max(Math.floor(maxInterval * 0.4), Math.min(1000, maxInterval));
  let errors = 0;

  while (true) {
    if (options.signal?.aborted) throw new SyntxMediaError("SYNTX media wait cancelled", 499);
    const elapsed = Date.now() - start;
    if (elapsed > timeout) {
      throw new SyntxMediaError(`Timeout waiting for SYNTX media in chat ${options.chatUuid}`, 504);
    }
    const { status, json } = await syntxJson(
      fetchImpl,
      options.token,
      "GET",
      `${SYNTX_API_BASE}/api/v1/chats/${options.chatUuid}/messages?page_size=50`
    );
    if (status < 200 || status >= 300) {
      errors += 1;
      if (errors >= 5) {
        throw new SyntxMediaError(`SYNTX poll messages HTTP ${status}`, status);
      }
    } else {
      errors = 0;
      const messages = Array.isArray(asRecord(json).messages)
        ? (asRecord(json).messages as unknown[])
        : Array.isArray(json)
          ? json
          : [];
      const assistants = messages.filter((item) => asRecord(item).author_id === -1);
      const latest = assistants[assistants.length - 1];
      if (latest) {
        const projection = collectSyntxCompletedMedia(latest);
        if (projection.ready) {
          return { chatUuid: options.chatUuid, text: projection.text, media: projection.media };
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
    interval = Math.min(maxInterval, Math.floor(interval * 1.5));
  }
}

function dedupeMedia(items: SyntxMediaItem[]): SyntxMediaItem[] {
  const seen = new Set<string>();
  const out: SyntxMediaItem[] = [];
  for (const item of items) {
    if (!item.url || seen.has(item.url)) continue;
    seen.add(item.url);
    out.push(item);
  }
  return out;
}

async function generateDesignWithChat(options: {
  token: string;
  model: string;
  prompt: string;
  settings?: JsonRecord;
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const { aiName, modelType } = resolveSyntxMediaTarget(options.model, "image");
  const settings: JsonRecord = { model_type: modelType, ...(options.settings || {}) };
  const fileCount = Array.isArray(settings.image_url)
    ? (settings.image_url as unknown[]).length
    : settings.image_url
      ? 1
      : 0;
  applySyntxProviderRules(aiName, settings, { modelType, fileCount });
  const chatUuid = await createSyntxMediaChat({
    token: options.token,
    scope: "image",
    title: options.prompt,
    fetchImpl,
  });
  const url = `${SYNTX_API_BASE}/api/v1/design/generate?ai_name=${encodeURIComponent(aiName)}`;
  const { status, json, text } = await syntxJson(fetchImpl, options.token, "POST", url, {
    chat_uuid: chatUuid,
    prompt: options.prompt,
    settings,
  });
  if (status < 200 || status >= 300) {
    throw new SyntxMediaError(
      `SYNTX image generate HTTP ${status}: ${sanitizeErrorMessage(text)}`,
      status
    );
  }
  const immediate: SyntxMediaItem[] = [];
  extractUrlsDeep(json, immediate, "image");
  const uniqueImmediate = dedupeMedia(immediate);
  const polled = await pollSyntxChatMedia({
    token: options.token,
    chatUuid,
    timeoutMs: options.timeoutMs,
    pollIntervalMs: options.pollIntervalMs,
    fetchImpl,
    signal: options.signal,
  });
  if (polled.media.length === 0 && uniqueImmediate.length > 0) {
    return { ...polled, media: uniqueImmediate };
  }
  return polled;
}

export async function runSyntxImageGeneration(options: {
  token: string;
  model: string;
  prompt: string;
  settings?: JsonRecord;
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  return generateDesignWithChat(options);
}

export async function runSyntxUpscale(options: {
  token: string;
  model: string;
  prompt?: string;
  imageUrl: string;
  settings?: JsonRecord;
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  const { aiName, modelType } = resolveSyntxMediaTarget(options.model, "upscale");
  const settings: JsonRecord = {
    model_type: modelType,
    image_url: [options.imageUrl],
    ...(options.settings || {}),
  };
  if (aiName === "ideogram") settings.mode = settings.mode || "upscale";
  return generateDesignWithChat({
    token: options.token,
    model: options.model,
    prompt: options.prompt || "upscale",
    settings,
    timeoutMs: options.timeoutMs,
    pollIntervalMs: options.pollIntervalMs,
    fetchImpl: options.fetchImpl,
    signal: options.signal,
  });
}

export async function runSyntxVideoGeneration(options: {
  token: string;
  model: string;
  prompt: string;
  settings?: JsonRecord;
  fileUrls?: string[];
  audioUrl?: string;
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const { aiName, modelType } = resolveSyntxMediaTarget(options.model, "video");
  const settings: JsonRecord = { model_type: modelType, ...(options.settings || {}) };
  applySyntxProviderRules(aiName, settings, {
    modelType,
    fileCount: options.fileUrls?.length ?? 0,
  });
  const chatUuid = await createSyntxMediaChat({
    token: options.token,
    scope: "video",
    title: options.prompt,
    fetchImpl,
  });
  const body: JsonRecord = { chat_id: chatUuid, prompt: options.prompt, settings };
  if (options.fileUrls && options.fileUrls.length > 0) body.file_urls = options.fileUrls;
  if (options.audioUrl) body.audio_url = options.audioUrl;
  const url = `${SYNTX_API_BASE}/api/v1/video/generate?ai_name=${encodeURIComponent(aiName)}`;
  const { status, json, text } = await syntxJson(fetchImpl, options.token, "POST", url, body);
  if (status < 200 || status >= 300) {
    throw new SyntxMediaError(
      `SYNTX video generate HTTP ${status}: ${sanitizeErrorMessage(text)}`,
      status
    );
  }
  const immediate: SyntxMediaItem[] = [];
  extractUrlsDeep(json, immediate, "video");
  const polled = await pollSyntxChatMedia({
    token: options.token,
    chatUuid,
    timeoutMs: options.timeoutMs,
    pollIntervalMs: options.pollIntervalMs,
    fetchImpl,
    signal: options.signal,
  });
  const uniqueImmediate = dedupeMedia(immediate);
  if (polled.media.length === 0 && uniqueImmediate.length > 0) {
    return { ...polled, media: uniqueImmediate };
  }
  return polled;
}

export async function runSyntxAudioGeneration(options: {
  token: string;
  model: string;
  prompt: string;
  kind?: "speech" | "music";
  settings?: JsonRecord;
  fileUrls?: string[];
  timeoutMs?: number;
  pollIntervalMs?: number;
  fetchImpl?: FetchImpl;
  signal?: AbortSignal | null;
}): Promise<SyntxGenerateResult> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const kind = options.kind ?? "speech";
  const { aiName, modelType } = resolveSyntxMediaTarget(options.model, kind);
  const settings: JsonRecord = { model_type: modelType, ...(options.settings || {}) };
  applySyntxProviderRules(aiName, settings, {
    modelType,
    fileCount: options.fileUrls?.length ?? 0,
  });
  const chatUuid = await createSyntxMediaChat({
    token: options.token,
    scope: "audio",
    title: options.prompt,
    fetchImpl,
  });
  const body: JsonRecord = { chat_uuid: chatUuid, prompt: options.prompt, settings };
  if (options.fileUrls && options.fileUrls.length > 0) body.file_urls = options.fileUrls;
  const url = `${SYNTX_API_BASE}/api/v1/audio/generate?ai_name=${encodeURIComponent(aiName)}`;
  const { status, json, text } = await syntxJson(fetchImpl, options.token, "POST", url, body);
  if (status < 200 || status >= 300) {
    throw new SyntxMediaError(
      `SYNTX audio generate HTTP ${status}: ${sanitizeErrorMessage(text)}`,
      status
    );
  }
  const immediate: SyntxMediaItem[] = [];
  extractUrlsDeep(json, immediate, "audio");
  const polled = await pollSyntxChatMedia({
    token: options.token,
    chatUuid,
    timeoutMs: options.timeoutMs,
    pollIntervalMs: options.pollIntervalMs,
    fetchImpl,
    signal: options.signal,
  });
  const uniqueImmediate = dedupeMedia(immediate);
  if (polled.media.length === 0 && uniqueImmediate.length > 0) {
    return { ...polled, media: uniqueImmediate };
  }
  return polled;
}

export async function transcribeSyntxAudio(options: {
  token: string;
  bytes: Uint8Array;
  filename: string;
  mimeType?: string;
  fetchImpl?: FetchImpl;
}): Promise<string> {
  if (options.bytes.byteLength > SYNTX_TRANSCRIBE_MAX_BYTES) {
    throw new SyntxMediaError(
      `Audio too large: ${options.bytes.byteLength} bytes (limit ${SYNTX_TRANSCRIBE_MAX_BYTES})`,
      413
    );
  }
  const fetchImpl = options.fetchImpl ?? fetch;
  const boundary = `----WebKitFormBoundary${randomBytes(8).toString("hex")}`;
  const filename = options.filename.replace(/["\r\n]/g, "_") || "audio.mp3";
  const mime = (options.mimeType || "audio/mpeg").replace(/[\r\n]/g, "");
  const body = Buffer.concat([
    Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${mime}\r\n\r\n`
    ),
    Buffer.from(options.bytes),
    Buffer.from(`\r\n--${boundary}--\r\n`),
  ]);
  const headers = syntxAuthHeaders(options.token);
  const response = await fetchImpl(`${SYNTX_API_BASE}/api/v1/audio/transcribe`, {
    method: "POST",
    headers: {
      authorization: headers.authorization,
      accept: headers.accept,
      origin: headers.origin,
      referer: headers.referer,
      "user-agent": headers["user-agent"],
      "accept-language": headers["accept-language"],
      "content-type": `multipart/form-data; boundary=${boundary}`,
    },
    body,
  });
  const text = await response.text().catch(() => "");
  if (!response.ok) {
    throw new SyntxMediaError(
      `SYNTX transcribe HTTP ${response.status}: ${sanitizeErrorMessage(text)}`,
      response.status
    );
  }
  let json: unknown = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    return text;
  }
  const rec = asRecord(json);
  const nested = asRecord(rec.data);
  return asString(rec.text) || asString(nested.text) || "";
}

export async function fetchSyntxMediaBytes(
  url: string,
  fetchImpl: FetchImpl = fetch
): Promise<{ bytes: Buffer; contentType: string }> {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new SyntxMediaError(
      `Failed to download SYNTX media HTTP ${response.status}`,
      response.status
    );
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type") || "application/octet-stream";
  return { bytes, contentType };
}

export function firstMediaUrl(result: SyntxGenerateResult, type?: string): string {
  const match = type
    ? result.media.find((item) => item.objectType === type) || result.media[0]
    : result.media[0];
  return match?.url || "";
}
