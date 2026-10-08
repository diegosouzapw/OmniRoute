/**
 * Foreign reasoning replay for Grok Build (grok-cli).
 *
 * Responses clients running with `store: false` (Codex CLI / desktop) replay
 * every prior `reasoning` item together with its `encrypted_content`. When a
 * combo served an earlier turn from another Responses provider (typically
 * codex), that blob was encrypted by OpenAI and Grok Build refuses the whole
 * request with `400 Could not decrypt the provided encrypted_content. Ensure
 * the value is the unmodified encrypted_content from a previous response.` —
 * from then on the conversation can never return to grok-cli.
 *
 * Grok Build names its reasoning items `rs_<uuid>`, while OpenAI uses `rs_`
 * followed by hex digits. Its server-side tool reasoning (e.g. after a web
 * search) is `tco_…`, with an id and a blob that both start with `tco_`; the
 * base sanitizer deletes that id (it does not start with `rs_`), so the blob
 * prefix is what identifies it. Grok accepts a replayed reasoning item without
 * `encrypted_content` (with `summary: []`). So the blob is dropped from every
 * reasoning item that is not Grok Build's, including items without an id. This
 * fails closed on purpose: forwarding a foreign blob is a hard 400, dropping
 * one of Grok's own blobs only costs reasoning continuity. The item itself
 * (id, summary, plaintext content) stays.
 */

type JsonRecord = Record<string, unknown>;

const GROK_BUILD_REASONING_ID_RE =
  /^rs_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const GROK_BUILD_TOOL_REASONING_PREFIX = "tco_";

function isGrokBuildReasoning(rec: JsonRecord): boolean {
  const id = typeof rec.id === "string" ? rec.id : "";
  const blob = typeof rec.encrypted_content === "string" ? rec.encrypted_content : "";
  return (
    GROK_BUILD_REASONING_ID_RE.test(id) ||
    id.startsWith(GROK_BUILD_TOOL_REASONING_PREFIX) ||
    blob.startsWith(GROK_BUILD_TOOL_REASONING_PREFIX)
  );
}

function isForeignEncryptedReasoning(item: unknown): item is JsonRecord {
  if (!item || typeof item !== "object" || Array.isArray(item)) return false;
  const rec = item as JsonRecord;
  return (
    rec.type === "reasoning" && rec.encrypted_content !== undefined && !isGrokBuildReasoning(rec)
  );
}

/**
 * Return `input` with `encrypted_content` removed from reasoning items Grok
 * Build did not produce. The caller's array and items are never mutated (combo
 * fallback re-dispatches the same body), and `input` itself is returned when
 * there is nothing to strip.
 */
export function stripForeignGrokBuildReasoning(input: unknown[]): unknown[] {
  if (!input.some(isForeignEncryptedReasoning)) return input;
  return input.map((item) => {
    if (!isForeignEncryptedReasoning(item)) return item;
    const { encrypted_content: _foreignBlob, ...rest } = item;
    return Array.isArray(rest.summary) ? rest : { ...rest, summary: [] };
  });
}
