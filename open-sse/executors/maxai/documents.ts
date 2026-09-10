/**
 * MaxAI doc-RAG — inline document parts → /app/upload_document → doc_list.
 *
 * OmniRoute delivers attached documents INLINE in the chat request as base64
 * `file_data` content parts (OpenAI `{type:"file",file:{filename,file_data}}` /
 * Responses `{type:"input_file",file_data}` / Claude `{type:"document",source}`).
 * MaxAI's `/gpt/cwc/chat` cannot take binary docs inline; instead it references
 * uploaded documents by a content-addressed `doc_id`. This module bridges the
 * two: it detects inline base64 doc parts on the current turn, uploads each via
 * the multipart `/app/upload_document` endpoint (signed like every MaxAI call),
 * and returns the `doc_list` entries to attach to the chat body.
 *
 * doc_id is NOT random — MaxAI requires `doc_id = HMAC-SHA1(file_bytes, IT)` hex
 * (createDocId/qM in the extension). A random id is rejected with a 400
 * "Inconsistency between server doc_id and request doc_id". The IT key is a
 * public web-app constant (ships in the bundle), same class as the signing
 * constants; kept here as a named constant (not a secret).
 *
 * The doc_list item shape is exactly what the live web app sends
 * (site chunk 41068): `{ doc_id, doc_type, file_name }`.
 */
import { createHmac } from "node:crypto";
import { buildMaxaiSignedHeaders } from "./signing.ts";
import { ensureMaxaiConstants } from "./constantsStore.ts";
import { maxaiStaticHeaders, MAXAI_BASE_URL } from "./protocol.ts";

export const MAXAI_UPLOAD_PATH = "/app/upload_document";

export interface MaxaiDocListEntry {
  doc_id: string;
  doc_type: string;
  file_name: string;
}

/** An inline document extracted from an OpenAI/Responses/Claude content part. */
export interface InlineDoc {
  filename: string;
  mimeType: string;
  bytes: Buffer;
}

/** doc_id = HMAC-SHA1(file_bytes, docIdKey) hex. Content-addressed; MaxAI verifies it. */
export function computeMaxaiDocId(bytes: Buffer, key: string): string {
  if (!key) throw new Error("computeMaxaiDocId: missing docIdKey");
  return createHmac("sha1", key).update(bytes).digest("hex");
}

const TEXTUAL_EXT = /\.(txt|md|markdown|csv|json|log|xml|yaml|yml|tsv)$/i;
const CODE_EXT =
  /\.(py|ipynb|js|jsx|ts|tsx|html?|css|java|cs|php|c|cpp|cxx|h|hpp|go|rs|rb|swift|kt|sh|sql)$/i;

/** Classify the MaxAI doc_type from the filename/mime (extension taxonomy). */
export function maxaiDocType(filename: string, mimeType: string): string {
  const f = filename.toLowerCase();
  if (/\.pdf$/i.test(f) || mimeType === "application/pdf") return "page_content__pdf";
  if (CODE_EXT.test(f)) return "chat_file_code";
  return "chat_file"; // text / generic
}

/** Whether a doc_type requires the pure_text field (text-extractable docs). */
function requiresPureText(docType: string): boolean {
  return docType === "chat_file" || docType === "chat_file_code";
}

/**
 * Parse an OpenAI/Responses/Claude data-URL into raw bytes + mime. Returns null
 * for anything that isn't an inline base64 payload (e.g. a remote URL or an
 * already-uploaded file_id reference, which this bridge does not handle).
 */
export function parseInlineDataUrl(dataUrl: unknown): { mimeType: string; bytes: Buffer } | null {
  if (typeof dataUrl !== "string") return null;
  const m = /^data:([^;,]*)(;base64)?,(.*)$/s.exec(dataUrl);
  if (!m) return null;
  const mimeType = m[1] || "application/octet-stream";
  const isBase64 = !!m[2];
  try {
    const bytes = isBase64
      ? Buffer.from(m[3], "base64")
      : Buffer.from(decodeURIComponent(m[3]), "utf8");
    if (bytes.length === 0) return null;
    return { mimeType, bytes };
  } catch {
    return null;
  }
}

/**
 * Extract inline documents from the CURRENT (last user) turn of an OpenAI
 * messages[] array. Recognizes the three OmniRoute-delivered shapes:
 *   OpenAI Chat:  {type:"file", file:{filename, file_data|data}}
 *   Responses:    {type:"input_file", filename, file_data}
 *   Claude:       {type:"document", source:{type:"base64", media_type, data}}
 * Only base64/data-URL payloads are handled (a bridge upload needs the bytes).
 */
export function extractCurrentTurnDocs(
  messages: Array<{ role?: string; content?: unknown }>
): InlineDoc[] {
  let content: unknown;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i]?.role === "user") {
      content = messages[i]?.content;
      break;
    }
  }
  if (!Array.isArray(content)) return [];
  const docs: InlineDoc[] = [];
  for (const part of content) {
    if (!part || typeof part !== "object") continue;
    const p = part as Record<string, unknown>;
    const type = p.type;

    if (type === "file" && p.file && typeof p.file === "object") {
      const file = p.file as Record<string, unknown>;
      const filename = typeof file.filename === "string" ? file.filename : "upload.bin";
      const raw = (file.file_data ?? file.data) as unknown;
      const parsed = parseInlineDataUrl(raw);
      if (parsed) docs.push({ filename, mimeType: parsed.mimeType, bytes: parsed.bytes });
    } else if (type === "input_file") {
      const filename = typeof p.filename === "string" ? p.filename : "upload.bin";
      const parsed = parseInlineDataUrl(p.file_data);
      if (parsed) docs.push({ filename, mimeType: parsed.mimeType, bytes: parsed.bytes });
    } else if (type === "document" && p.source && typeof p.source === "object") {
      const source = p.source as Record<string, unknown>;
      if (source.type === "base64" && typeof source.data === "string") {
        const mimeType =
          typeof source.media_type === "string" ? source.media_type : "application/octet-stream";
        try {
          const bytes = Buffer.from(source.data, "base64");
          if (bytes.length > 0) {
            const filename =
              typeof p.title === "string" && p.title ? p.title : `document.${mimeExt(mimeType)}`;
            docs.push({ filename, mimeType, bytes });
          }
        } catch {
          /* skip malformed base64 */
        }
      }
    }
  }
  return docs;
}

function mimeExt(mime: string): string {
  if (mime === "application/pdf") return "pdf";
  if (mime.startsWith("text/")) return "txt";
  return "bin";
}

/** Rough ~4-chars/token estimate; ceil, never 0 for non-empty text. */
function estimateTokens(text: string): number {
  return text ? Math.max(1, Math.ceil(text.length / 4)) : 0;
}

/** Build the multipart/form-data body for /app/upload_document (fixed boundary). */
export function buildUploadMultipart(
  doc: InlineDoc,
  docId: string,
  docType: string,
  boundary: string
): Buffer {
  const isTextual =
    requiresPureText(docType) &&
    (TEXTUAL_EXT.test(doc.filename) ||
      CODE_EXT.test(doc.filename) ||
      doc.mimeType.startsWith("text/"));
  const pureText = isTextual ? doc.bytes.toString("utf8") : "";
  const tokens = String(estimateTokens(pureText));

  const parts: Buffer[] = [];
  const dash = `--${boundary}\r\n`;
  const field = (name: string, value: string): void => {
    parts.push(
      Buffer.from(`${dash}Content-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`)
    );
  };
  field("doc_id", docId);
  field("doc_type", docType);
  field("pure_text", pureText);
  field("tokens", tokens);
  field("doc_type_dependent_data", "{}");
  // The file part carries the raw bytes with a content-type.
  parts.push(
    Buffer.from(
      `${dash}Content-Disposition: form-data; name="file"; filename="${doc.filename.replace(/"/g, "")}"\r\n` +
        `Content-Type: ${doc.mimeType}\r\n\r\n`
    )
  );
  parts.push(doc.bytes);
  parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));
  return Buffer.concat(parts);
}

/** True if any SSE frame in the response is the terminal upload_done event. */
export function sawUploadDone(text: string): boolean {
  return /"event"\s*:\s*"upload_done"/.test(text) || text.includes("upload_done");
}

/**
 * Upload one inline document to MaxAI and return its doc_list entry, or null on
 * failure (upload failures are non-fatal: the chat proceeds without the doc).
 */
export async function uploadMaxaiDocument(
  doc: InlineDoc,
  auth: { accessToken: string; userId: string; deviceId: string },
  opts?: { fetchImpl?: typeof fetch; signal?: AbortSignal }
): Promise<MaxaiDocListEntry | null> {
  const fetchImpl = opts?.fetchImpl ?? fetch;
  const constants = await ensureMaxaiConstants({ fetchImpl, signal: opts?.signal });
  if (!constants) return null;
  const docId = computeMaxaiDocId(doc.bytes, constants.docIdKey);
  const docType = maxaiDocType(doc.filename, doc.mimeType);
  const boundary = `----maxai${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
  const bodyBuf = buildUploadMultipart(doc, docId, docType, boundary);

  // Sign like any request, but DROP the JSON content-type so we can set the
  // multipart boundary content-type ourselves (v3h.signed_headers pattern).
  const { "Content-Type": _drop, ...staticHeaders } = maxaiStaticHeaders();
  const headers: Record<string, string> = {
    ...staticHeaders,
    ...buildMaxaiSignedHeaders(
      { path: MAXAI_UPLOAD_PATH, userId: auth.userId, deviceId: auth.deviceId },
      constants
    ),
    Authorization: `Bearer ${auth.accessToken}`,
    "Content-Type": `multipart/form-data; boundary=${boundary}`,
  };

  // Copy the multipart bytes into a fresh Uint8Array backed by a plain
  // (non-shared) ArrayBuffer. `Buffer.buffer` is typed ArrayBufferLike
  // (ArrayBuffer | SharedArrayBuffer) which isn't assignable to fetch's
  // BodyInit; a freshly-allocated Uint8Array is the BodyInit shape the rest of
  // the codebase uses for binary bodies (kimi-web.ts:397, conol-web.ts:529).
  const bodyBytes = new Uint8Array(bodyBuf.byteLength);
  bodyBytes.set(bodyBuf);

  try {
    const resp = await fetchImpl(MAXAI_BASE_URL + MAXAI_UPLOAD_PATH, {
      method: "POST",
      headers,
      body: bodyBytes,
      signal: opts?.signal,
    });
    if (!resp.ok) return null;
    const text = await resp.text().catch(() => "");
    if (!sawUploadDone(text)) return null;
    return { doc_id: docId, doc_type: docType, file_name: doc.filename };
  } catch {
    return null;
  }
}

/**
 * Upload every inline document on the current turn and return the doc_list to
 * attach to the chat body. Failures are skipped (best-effort); the chat still
 * proceeds. Empty array when there are no inline docs.
 */
export async function resolveMaxaiDocList(
  messages: Array<{ role?: string; content?: unknown }>,
  auth: { accessToken: string; userId: string; deviceId: string },
  opts?: { fetchImpl?: typeof fetch; signal?: AbortSignal }
): Promise<MaxaiDocListEntry[]> {
  const docs = extractCurrentTurnDocs(messages);
  if (docs.length === 0) return [];
  const results = await Promise.all(docs.map((d) => uploadMaxaiDocument(d, auth, opts)));
  return results.filter((r): r is MaxaiDocListEntry => r !== null);
}
