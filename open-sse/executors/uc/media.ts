/**
 * UC (uncensored.com) PERSONA input-media — the unified blob-upload layer.
 *
 * UC persona uses ONE blob-upload mechanism for ALL input
 * media, images (vision) AND documents (PDF/doc RAG), captured in
 * UC-FILE-UPLOAD.md. The backend fetches the blob from CDN storage, parses it
 * server-side (PDF text extraction, image vision), and feeds it to the model. The
 * chat frame then carries only `media_blob_name` + `media_content_type`.
 *
 * Flow (per file, mime-agnostic):
 *   1. POST https://internal-6.pubyar.com/generate-signed-url
 *        Authorization: Bearer <clerk jwt>
 *        { content_type, user_identifier, user_subscriptions }
 *      -> { signed_url: "https://d.moveinwater.com/up/<token>", blob_name: "..." }
 *   2. PUT <signed_url>  (Content-Type = the file mime)  <raw bytes>  -> 200
 *   3. (optional) HEAD/GET https://d.moveinwater.com/<blob_name> to confirm ready
 *   4. send the chat frame with media_blob_name + media_content_type set.
 *
 * This module extracts inline media parts from the CURRENT turn's OpenAI message
 * (image_url data/http parts, and file/input_file/document base64 parts), uploads
 * each, and returns the blob descriptors for the executor to fold into the persona
 * frame. Multi-file = N independent uploads (there is no batch endpoint).
 *
 * Best-effort: an upload failure is logged and skipped so the chat still proceeds
 * without that attachment (best-effort doc-list behavior).
 */
import { Buffer } from "node:buffer";
import { UC_ORIGIN } from "./constants.ts";

const UC_SIGNED_URL_ENDPOINT = "https://internal-6.pubyar.com/generate-signed-url";
/** Poll cap for the post-upload readiness check. */
const UC_BLOB_READY_TIMEOUT_MS = 20_000;

/** A blob reference the persona frame carries. */
export interface UcMediaBlob {
  blobName: string;
  contentType: string;
}

/** An inline media part extracted from an OpenAI message, pre-upload. */
export interface UcInlineMedia {
  /** Raw bytes to upload. */
  bytes: Buffer;
  /** MIME type (e.g. image/png, application/pdf). */
  contentType: string;
}

interface OpenAiPart {
  type?: string;
  image_url?: unknown;
  file?: { filename?: unknown; file_data?: unknown; file_id?: unknown };
  file_data?: unknown;
  source?: { data?: unknown; media_type?: unknown; type?: unknown };
  text?: unknown;
}

interface OpenAiMessage {
  role?: string;
  content?: unknown;
}

/** Decode a data: URL into {bytes, contentType}, or null if not a data URL. */
function decodeDataUrl(url: string): UcInlineMedia | null {
  const m = url.match(/^data:([^;,]+)(;base64)?,(.*)$/s);
  if (!m) return null;
  const contentType = m[1] || "application/octet-stream";
  const isBase64 = !!m[2];
  const data = m[3];
  try {
    const bytes = isBase64
      ? Buffer.from(data, "base64")
      : Buffer.from(decodeURIComponent(data), "utf8");
    return { bytes, contentType };
  } catch {
    return null;
  }
}

/** Guess a content type from a filename extension. */
function mimeFromFilename(name: string): string {
  const ext = (name.split(".").pop() ?? "").toLowerCase();
  const map: Record<string, string> = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    webp: "image/webp",
    txt: "text/plain",
    md: "text/markdown",
    csv: "text/csv",
    json: "application/json",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return map[ext] ?? "application/octet-stream";
}

/**
 * Extract inline media (images + documents) from the CURRENT (last user) turn.
 * Returns http(s) image URLs separately (UC can be handed a remote URL to fetch)
 * and base64/data payloads as bytes to upload. Only the current turn — history
 * media would re-upload every request.
 */
export function extractCurrentTurnMedia(messages: OpenAiMessage[]): {
  inline: UcInlineMedia[];
  remoteImageUrls: string[];
} {
  const inline: UcInlineMedia[] = [];
  const remoteImageUrls: string[] = [];

  let lastUser = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") {
      lastUser = i;
      break;
    }
  }
  if (lastUser < 0) return { inline, remoteImageUrls };

  const content = messages[lastUser]?.content;
  if (!Array.isArray(content)) return { inline, remoteImageUrls };

  for (const raw of content as OpenAiPart[]) {
    if (!raw || typeof raw !== "object") continue;

    // Images: {type:"image_url", image_url:{url}} or shorthand {image_url:"url"}
    if (raw.type === "image_url" || raw.image_url) {
      const iu = raw.image_url;
      const url =
        typeof iu === "string"
          ? iu
          : iu && typeof iu === "object" && typeof (iu as { url?: unknown }).url === "string"
            ? (iu as { url: string }).url
            : "";
      if (!url) continue;
      const data = decodeDataUrl(url);
      if (data) {
        inline.push(data);
      } else if (/^https?:\/\//i.test(url)) {
        remoteImageUrls.push(url);
      }
      continue;
    }

    // OpenAI file part: {type:"file", file:{filename, file_data:"data:...;base64,..."}}
    if (raw.type === "file" && raw.file) {
      const fd = raw.file.file_data;
      const fname = typeof raw.file.filename === "string" ? raw.file.filename : "file";
      if (typeof fd === "string") {
        const dec = decodeDataUrl(fd) ?? {
          bytes: Buffer.from(fd, "base64"),
          contentType: mimeFromFilename(fname),
        };
        if (dec.bytes.length) inline.push(dec);
      }
      continue;
    }

    // Responses-style input_file: {type:"input_file", file_data, filename?}
    if (raw.type === "input_file" && typeof raw.file_data === "string") {
      const dec = decodeDataUrl(raw.file_data) ?? {
        bytes: Buffer.from(raw.file_data, "base64"),
        contentType: "application/octet-stream",
      };
      if (dec.bytes.length) inline.push(dec);
      continue;
    }

    // Claude-style document: {type:"document", source:{type:"base64", media_type, data}}
    if (raw.type === "document" && raw.source && typeof raw.source.data === "string") {
      const contentType =
        typeof raw.source.media_type === "string" ? raw.source.media_type : "application/pdf";
      try {
        const bytes = Buffer.from(raw.source.data, "base64");
        if (bytes.length) inline.push({ bytes, contentType });
      } catch {
        /* skip malformed */
      }
      continue;
    }
  }

  return { inline, remoteImageUrls };
}

export interface UcUploadContext {
  jwt: string;
  uid: string;
  /** Opaque subscription echo string; optional (server tolerates absence). */
  userSubscriptions?: string;
  signal?: AbortSignal | null;
  fetchImpl?: typeof fetch;
  log?: { warn?: (tag: string, msg: string) => void; debug?: (tag: string, msg: string) => void };
}

/**
 * Upload one inline media payload via the presigned-URL flow. Returns the blob
 * descriptor, or null on any failure (best-effort; caller proceeds without it).
 */
export async function uploadUcBlob(
  media: UcInlineMedia,
  ctx: UcUploadContext
): Promise<UcMediaBlob | null> {
  const doFetch = ctx.fetchImpl ?? fetch;

  // 1. request a signed upload URL
  let signedUrl = "";
  let blobName = "";
  try {
    const res = await doFetch(UC_SIGNED_URL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ctx.jwt}`,
        "Content-Type": "application/json",
        Origin: UC_ORIGIN,
        Referer: UC_ORIGIN + "/",
      },
      body: JSON.stringify({
        content_type: media.contentType,
        user_identifier: ctx.uid,
        ...(ctx.userSubscriptions ? { user_subscriptions: ctx.userSubscriptions } : {}),
      }),
      signal: ctx.signal ?? undefined,
    });
    if (res.status !== 200) {
      ctx.log?.warn?.("uc", `generate-signed-url HTTP ${res.status}`);
      return null;
    }
    const body = (await res.json()) as { signed_url?: unknown; blob_name?: unknown };
    signedUrl = typeof body.signed_url === "string" ? body.signed_url : "";
    blobName = typeof body.blob_name === "string" ? body.blob_name : "";
  } catch (err) {
    ctx.log?.warn?.(
      "uc",
      `signed-url request failed: ${err instanceof Error ? err.message : String(err)}`
    );
    return null;
  }
  if (!signedUrl || !blobName) return null;

  // 2. PUT the raw bytes
  try {
    const put = await doFetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": media.contentType },
      // Buffer -> ArrayBuffer slice (BodyInit-compatible in this codebase's fetch
      // typing; a Uint8Array view is not assignable to BodyInit here).
      body: media.bytes.buffer.slice(
        media.bytes.byteOffset,
        media.bytes.byteOffset + media.bytes.byteLength
      ) as ArrayBuffer,
      signal: ctx.signal ?? undefined,
    });
    if (put.status !== 200 && put.status !== 201 && put.status !== 204) {
      ctx.log?.warn?.("uc", `blob PUT HTTP ${put.status}`);
      return null;
    }
  } catch (err) {
    ctx.log?.warn?.("uc", `blob PUT failed: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  }

  // 3. best-effort readiness check (HEAD the final blob URL). Non-fatal.
  await confirmBlobReady(blobName, ctx).catch(() => undefined);

  return { blobName, contentType: media.contentType };
}

/** HEAD/GET the final blob URL until it resolves (best-effort, bounded). */
async function confirmBlobReady(blobName: string, ctx: UcUploadContext): Promise<void> {
  const doFetch = ctx.fetchImpl ?? fetch;
  const finalUrl = `https://d.moveinwater.com/${encodeURIComponent(blobName)}`;
  const deadline = Date.now() + UC_BLOB_READY_TIMEOUT_MS;
  for (let attempt = 0; Date.now() < deadline; attempt++) {
    try {
      const r = await doFetch(finalUrl, { method: "HEAD", signal: ctx.signal ?? undefined });
      if (r.status === 200) return;
    } catch {
      /* keep trying */
    }
    await new Promise((res) => setTimeout(res, 1000));
    if (attempt > 20) break;
  }
}

/**
 * Upload every inline media payload for a turn, returning the blob descriptors
 * (best-effort — failed uploads are skipped). Remote http(s) image URLs are NOT
 * uploaded here; the caller may pass them through if UC accepts remote refs.
 */
export async function uploadUcTurnMedia(
  inline: UcInlineMedia[],
  ctx: UcUploadContext
): Promise<UcMediaBlob[]> {
  const blobs: UcMediaBlob[] = [];
  for (const media of inline) {
    const blob = await uploadUcBlob(media, ctx);
    if (blob) blobs.push(blob);
  }
  return blobs;
}
