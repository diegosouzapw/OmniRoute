/**
 * Unified media-part detection for request messages.
 * Single source of truth shared by the vision/audio bridge guardrails (src/)
 * and the combo compatibility filter (open-sse/) — the two previously kept
 * divergent copies (guardrail missed input_image; combo saw it).
 */
export type MediaKind = "image" | "audio";

export interface MediaPart {
  kind: MediaKind;
  /** URL, data URI, or base64 payload reference for the media content. */
  ref: string;
  /**
   * Location of the top-level content part this hit belongs to. For nested
   * hits (`nested: true`) these indexes point at the CONTAINER part — the
   * entry of `message.content` under which the media was found — not at the
   * media object itself.
   */
  messageIndex: number;
  partIndex: number;
  /**
   * True when the media was found below the top level of the content part
   * (inside another object/array, e.g. an image nested in an audio payload
   * or a data URI inside a text field). Splice-style consumers can only
   * replace top-level parts, so they must skip nested hits.
   */
  nested: boolean;
  /** Original wire shape, for callers that need format-specific handling. */
  shape:
    | "image_url"
    | "image_base64"
    | "image_source_url"
    | "input_image"
    | "data_uri_string"
    | "input_audio"
    | "audio_url"
    /** Audio detected via `source.media_type: audio/*` (no explicit type). */
    | "audio_source"
    /**
     * Combo-parity indicator: the value looks like an image part (image-ish
     * `type` in any casing, a bare `image_url`/`input_image` key, or a
     * `source.media_type` of image/*) but carries no extractable ref — `ref`
     * may be "". Boolean callers (combo compatibility filter) count it;
     * ref-consuming callers (vision bridge) must skip empty refs.
     */
    | "image_indicator";
}

const MAX_DEPTH = 8;

interface DetectCtx {
  out: MediaPart[];
  messageIndex: number;
  partIndex: number;
  /** When set, `found` flips true on the first part of this kind (early exit). */
  stopAtKind?: MediaKind;
  found?: boolean;
}

/** Extract a URL from either a bare string or a `{ url }` object. */
function urlFrom(raw: unknown): string | undefined {
  if (typeof raw === "string") return raw;
  const url = (raw as Record<string, unknown> | undefined)?.url;
  return typeof url === "string" ? url : undefined;
}

function pushPart(
  ctx: DetectCtx,
  kind: MediaKind,
  ref: string,
  shape: MediaPart["shape"],
  depth: number
): void {
  ctx.out.push({
    kind,
    ref,
    messageIndex: ctx.messageIndex,
    partIndex: ctx.partIndex,
    nested: depth > 0,
    shape,
  });
  if (ctx.stopAtKind === kind) ctx.found = true;
}

/** Strict image shapes with an extractable ref. Returns true when one was pushed. */
function inspectImageShapes(
  obj: Record<string, unknown>,
  type: string | undefined,
  ctx: DetectCtx,
  depth: number
): boolean {
  if (type === "image_url" || type === "input_image") {
    const url = urlFrom(obj.image_url);
    if (url) {
      pushPart(ctx, "image", url, type === "input_image" ? "input_image" : "image_url", depth);
      return true;
    }
  }
  if (type === "image") {
    const source = obj.source as Record<string, unknown> | undefined;
    if (source?.type === "base64" && typeof source.data === "string") {
      const media = typeof source.media_type === "string" ? source.media_type : "image/png";
      pushPart(ctx, "image", `data:${media};base64,${source.data}`, "image_base64", depth);
      return true;
    }
    // Non-empty url required: an empty `source.url` is not an extractable image
    // (mirrors the guardrail's historical `if (url)` guard).
    if (source?.type === "url" && typeof source.url === "string" && source.url) {
      pushPart(ctx, "image", source.url, "image_source_url", depth);
      return true;
    }
  }
  return false;
}

/**
 * Audio shapes. Returns true when a part was pushed (at most one per object).
 * Callers must NOT early-return on audio: the same object can also carry
 * image indicators or nest image parts inside its payload.
 */
function inspectAudioShapes(
  obj: Record<string, unknown>,
  type: string | undefined,
  mediaType: unknown,
  ctx: DetectCtx,
  depth: number
): boolean {
  if (type === "input_audio") {
    const audio = obj.input_audio as Record<string, unknown> | undefined;
    if (typeof audio?.data === "string") {
      pushPart(ctx, "audio", audio.data, "input_audio", depth);
      return true;
    }
  }
  if (type === "audio_url") {
    const url = urlFrom(obj.audio_url);
    if (url) {
      pushPart(ctx, "audio", url, "audio_url", depth);
      return true;
    }
  }
  if (typeof mediaType === "string" && mediaType.startsWith("audio/")) {
    const data = (obj.source as Record<string, unknown>).data;
    if (typeof data === "string") {
      pushPart(ctx, "audio", data, "audio_source", depth);
      return true;
    }
  }
  return false;
}

/**
 * Combo-parity image indicators: the legacy valueContainsImagePart
 * (comboStructure) matched image-ish `type` names case-insensitively, bare
 * `image_url`/`input_image` keys, and `source.media_type` image/* — all
 * without needing an extractable ref. Emit an indicator part (ref
 * best-effort, possibly "") so boolean callers keep seeing those requests as
 * vision requests. Returns true when one was pushed.
 */
function inspectImageIndicators(
  obj: Record<string, unknown>,
  type: string | undefined,
  mediaType: unknown,
  ctx: DetectCtx,
  depth: number
): boolean {
  const lowerType = type?.toLowerCase();
  const looksLikeImage =
    lowerType === "image" ||
    lowerType === "image_url" ||
    lowerType === "input_image" ||
    "image_url" in obj ||
    "input_image" in obj;
  const imageMediaType =
    typeof mediaType === "string" && mediaType.toLowerCase().startsWith("image/");
  if (!looksLikeImage && !imageMediaType) return false;
  pushPart(ctx, "image", urlFrom(obj.image_url ?? obj.input_image) ?? "", "image_indicator", depth);
  return true;
}

function inspect(value: unknown, ctx: DetectCtx, depth: number): void {
  if (ctx.found || depth > MAX_DEPTH || value == null) return;
  if (typeof value === "string") {
    if (value.startsWith("data:image/")) pushPart(ctx, "image", value, "data_uri_string", depth);
    return;
  }
  if (Array.isArray(value)) {
    for (const entry of value) {
      inspect(entry, ctx, depth + 1);
      if (ctx.found) return;
    }
    return;
  }
  if (typeof value !== "object") return;
  const obj = value as Record<string, unknown>;
  const type = typeof obj.type === "string" ? obj.type : undefined;

  if (inspectImageShapes(obj, type, ctx, depth)) return;

  const mediaType = (obj.source as Record<string, unknown> | undefined)?.media_type;
  // Audio does not early-return: the same object can also carry image
  // indicators (bare `image_url`/`input_image` keys the legacy combo filter
  // matched) or nest image parts inside its payload.
  inspectAudioShapes(obj, type, mediaType, ctx, depth);
  if (ctx.found) return;
  if (inspectImageIndicators(obj, type, mediaType, ctx, depth)) return;
  for (const nested of Object.values(obj)) {
    inspect(nested, ctx, depth + 1);
    if (ctx.found) return;
  }
}

export function detectMediaParts(
  messages: ReadonlyArray<{ role?: string; content?: unknown }> | undefined | null
): MediaPart[] {
  const out: MediaPart[] = [];
  if (!Array.isArray(messages)) return out;
  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    const content = messages[messageIndex]?.content;
    if (!Array.isArray(content)) continue;
    for (let partIndex = 0; partIndex < content.length; partIndex++) {
      inspect(content[partIndex], { out, messageIndex, partIndex }, 0);
    }
  }
  return out;
}

/**
 * Early-exit presence check: returns true as soon as the FIRST part of the
 * requested kind is found, without collecting the full part list or finishing
 * the traversal. Prefer this on hot paths (e.g. the combo compatibility
 * filter runs on every request) over `detectMediaParts(...).some(...)`.
 */
export function containsMediaKind(
  messages: ReadonlyArray<{ role?: string; content?: unknown }> | undefined | null,
  kind: MediaKind
): boolean {
  if (!Array.isArray(messages)) return false;
  const out: MediaPart[] = [];
  for (let messageIndex = 0; messageIndex < messages.length; messageIndex++) {
    const content = messages[messageIndex]?.content;
    if (!Array.isArray(content)) continue;
    for (let partIndex = 0; partIndex < content.length; partIndex++) {
      const ctx: DetectCtx = { out, messageIndex, partIndex, stopAtKind: kind };
      inspect(content[partIndex], ctx, 0);
      if (ctx.found) return true;
    }
  }
  return false;
}
