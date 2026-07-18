/**
 * gTTS — Google Translate text-to-speech (#6667).
 *
 * Reverse-engineered, unofficial, undocumented endpoint (not a published
 * Google public API) — the same class of integration this codebase already
 * accepts for other "-web"/no-auth style providers (edgeTts.ts, chipotle.ts).
 * No user account/API key is required.
 *
 * The issue's originally proposed endpoint
 * (`https://translate.google.com/translate_tts`, GET with `q`/`tl`/`ie` query
 * params) has been deprecated by Google. The current, working mechanism —
 * verified directly against `pndurette/gTTS`'s `gtts/tts.py` source — is a
 * POST RPC call to Google's internal `batchexecute` endpoint:
 *
 *   POST https://translate.google.<tld>/_/TranslateWebserverUi/data/batchexecute
 *   Content-Type: application/x-www-form-urlencoded;charset=utf-8
 *   Body: f.req=<urlencoded JSON envelope>
 *
 * The envelope wraps `[text, lang, true, "null"]` under RPC id `"jQ1olc"`:
 *   f.req = [[["jQ1olc", '["<text>","<lang>",true,"null"]', null, "generic"]]]
 *
 * There is a hard 100-character-per-request limit on `text` — longer input
 * must be split into multiple RPC calls and the resulting MP3 byte chunks
 * concatenated (§ `chunkGttsText`).
 *
 * The response is a `)]}'`-prefixed "batchexecute" payload; the base64 audio
 * lives inside the entry whose outer array starts with `["wrb.fr","jQ1olc",…]`
 * (§ `parseBatchExecuteResponse`).
 *
 * All parsing/chunking above is implemented as pure functions so it can be
 * unit-tested without a live upstream connection — only `synthesizeGtts()`
 * itself touches the network, and it accepts an injectable `fetch` for tests.
 */

/** Hard per-request character limit enforced by Google's batchexecute endpoint. */
export const GOOGLE_TTS_MAX_CHARS = 100;

const GTTS_RPC_ID = "jQ1olc";
const GTTS_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
const GTTS_REFERER = "http://translate.google.com/";
const DEFAULT_LANG = "en";
const DEFAULT_TLD = "com";
/** Only allow simple BCP-47-ish language codes to keep this untrusted input from injecting RPC payload structure. */
const LANG_PATTERN = /^[a-z]{2,3}(-[A-Za-z0-9]{2,8})?$/;

export class GttsUpstreamError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = "GttsUpstreamError";
    this.status = status;
  }
}

export interface GttsSynthInput {
  text: string;
  lang?: string;
  tld?: string;
}

/** Normalize a caller-supplied language code, falling back to English. */
export function normalizeGttsLang(lang: unknown): string {
  const value = typeof lang === "string" ? lang.trim() : "";
  return LANG_PATTERN.test(value) ? value : DEFAULT_LANG;
}

/**
 * Split `text` into chunks respecting Google's 100-character-per-request
 * limit, preferring to break on whitespace so words are not split mid-token.
 * A single "word" longer than `maxChars` is hard-split as a last resort.
 */
export function chunkGttsText(text: unknown, maxChars: number = GOOGLE_TTS_MAX_CHARS): string[] {
  const trimmed = typeof text === "string" ? text.trim() : "";
  if (!trimmed) return [];
  if (trimmed.length <= maxChars) return [trimmed];

  const chunks: string[] = [];
  let remaining = trimmed;
  while (remaining.length > maxChars) {
    let splitAt = -1;
    for (let i = maxChars; i > 0; i--) {
      if (/\s/.test(remaining[i])) {
        splitAt = i;
        break;
      }
    }
    if (splitAt <= 0) splitAt = maxChars;
    chunks.push(remaining.slice(0, splitAt).trim());
    remaining = remaining.slice(splitAt).trim();
  }
  if (remaining) chunks.push(remaining);
  return chunks.filter((c) => c.length > 0);
}

/** Build the `f.req=`-prefixed, urlencoded RPC body for one text chunk. */
export function buildGttsRpcBody(text: string, lang: string): string {
  const innerPayload = JSON.stringify([text, lang, true, "null"]);
  const envelope = [[[GTTS_RPC_ID, innerPayload, null, "generic"]]];
  return `f.req=${encodeURIComponent(JSON.stringify(envelope))}&`;
}

/**
 * Extract the base64 audio payload from one `["wrb.fr","jQ1olc",…]` entry,
 * or `null` if this entry isn't a matching audio fragment.
 */
function extractAudioFromWrbFrEntry(entry: unknown): string | null {
  if (!Array.isArray(entry) || entry[0] !== "wrb.fr" || entry[1] !== GTTS_RPC_ID) return null;
  if (typeof entry[2] !== "string") return null;

  try {
    const inner = JSON.parse(entry[2]);
    if (Array.isArray(inner) && typeof inner[0] === "string" && inner[0].length > 0) {
      return inner[0];
    }
  } catch {
    // Not a JSON-parseable payload — treat as "no audio in this entry".
  }
  return null;
}

/** Parse one newline-delimited JSON fragment, returning its audio payload if present. */
function findAudioInBatchExecuteLine(line: string): string | null {
  let outer: unknown;
  try {
    outer = JSON.parse(line);
  } catch {
    return null;
  }
  if (!Array.isArray(outer)) return null;

  for (const entry of outer) {
    const audio = extractAudioFromWrbFrEntry(entry);
    if (audio) return audio;
  }
  return null;
}

/**
 * Extract the base64-encoded audio payload from a `batchexecute` response.
 * The response is `)]}'`-prefixed, followed by newline-delimited JSON
 * fragments interleaved with numeric length-prefix lines; the audio lives
 * in the fragment whose entry starts with `["wrb.fr","jQ1olc",…]`.
 */
export function parseBatchExecuteResponse(raw: string): string {
  const cleaned = typeof raw === "string" ? raw.replace(/^\)\]\}'\n?/, "") : "";
  const lines = cleaned.split("\n").filter((line) => {
    const trimmedLine = line.trim();
    return trimmedLine.length > 0 && !/^\d+$/.test(trimmedLine);
  });

  for (const line of lines) {
    const audio = findAudioInBatchExecuteLine(line);
    if (audio) return audio;
  }

  throw new GttsUpstreamError(502, "gTTS response did not contain audio data");
}

type FetchLike = (url: string, init: RequestInit) => Promise<Response>;

/** Synthesize one ≤100-char chunk, returning the decoded MP3 bytes. */
async function synthesizeGttsChunk(
  chunk: string,
  lang: string,
  tld: string,
  fetchImpl: FetchLike
): Promise<Buffer> {
  const body = buildGttsRpcBody(chunk, lang);
  const res = await fetchImpl(
    `https://translate.google.${tld}/_/TranslateWebserverUi/data/batchexecute`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "User-Agent": GTTS_USER_AGENT,
        Referer: GTTS_REFERER,
      },
      body,
    }
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new GttsUpstreamError(res.status, errText || `gTTS upstream error (${res.status})`);
  }

  const raw = await res.text();
  const base64Audio = parseBatchExecuteResponse(raw);
  return Buffer.from(base64Audio, "base64");
}

/**
 * Synthesize `input.text` end-to-end: chunk to Google's 100-char limit,
 * POST each chunk to the batchexecute RPC endpoint, and concatenate the
 * decoded MP3 byte chunks into one buffer.
 */
export async function synthesizeGtts(
  input: GttsSynthInput,
  fetchImpl: FetchLike = fetch
): Promise<Buffer> {
  const lang = normalizeGttsLang(input.lang);
  const tld = (typeof input.tld === "string" && input.tld.trim()) || DEFAULT_TLD;
  const chunks = chunkGttsText(input.text);
  if (chunks.length === 0) {
    throw new GttsUpstreamError(400, "gTTS requires non-empty input text");
  }

  const buffers: Buffer[] = [];
  for (const chunk of chunks) {
    buffers.push(await synthesizeGttsChunk(chunk, lang, tld, fetchImpl));
  }
  return Buffer.concat(buffers);
}
