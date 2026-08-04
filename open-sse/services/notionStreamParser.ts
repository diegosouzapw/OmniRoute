/**
 * Notion AI Web — NDJSON `runInferenceTranscript` response parsing.
 *
 * Extracted from `executors/notion-web.ts` (file-size gate) — parses Notion's
 * undocumented streaming response format (legacy rich-text tuples, patch-start /
 * patch ops, and terminal record-map agent-inference steps) into plain text, and
 * detects in-band Notion error objects (often shipped with HTTP 200).
 */

/** Strips lang tags / BOM noise Notion sometimes wraps assistant text in. */
export function sanitizeNotionAssistantText(text: string): string {
  if (!text) return "";
  let clean = text.replace(/^\uFEFF/, "").trim();
  // Self-closing or paired lang tags at the start (and anywhere).
  clean = clean.replace(/<\/?lang\b[^>]*\/?>/gi, "");
  clean = clean.replace(/<\/lang>/gi, "");
  // Incomplete leading <lang… without close
  if (/^<lang\b/i.test(clean) && !clean.includes(">")) return "";
  return clean.trim();
}

/** Extract plain text from Notion's rich-text tuple value: `[[text, marks?]]`. */
function extractRichText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  return value
    .map((segment) => (Array.isArray(segment) && typeof segment[0] === "string" ? segment[0] : ""))
    .join("");
}

function extractAgentInferenceText(value: unknown): string {
  if (!Array.isArray(value)) return "";
  const parts: string[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const part = item as Record<string, unknown>;
    const t = typeof part.type === "string" ? part.type.toLowerCase() : "";
    if (t === "text" && typeof part.content === "string" && part.content) {
      parts.push(part.content);
    }
  }
  return parts.join("");
}

/** Unwraps `thread_message[key].value.value.step` from a Notion record-map entry. */
function extractThreadMessageStep(msg: unknown): Record<string, unknown> | null {
  if (!msg || typeof msg !== "object") return null;
  const valueWrapper = (msg as Record<string, unknown>).value;
  if (!valueWrapper || typeof valueWrapper !== "object") return null;
  const inner = (valueWrapper as Record<string, unknown>).value;
  if (!inner || typeof inner !== "object") return null;
  const step = (inner as Record<string, unknown>).step;
  if (!step || typeof step !== "object") return null;
  return step as Record<string, unknown>;
}

/** Extracts the text carried by a single thread-message step, or "" if none. */
function extractStepText(stepObj: Record<string, unknown>): string {
  const stepType = typeof stepObj.type === "string" ? stepObj.type : "";
  if (stepType === "agent-inference") {
    return extractAgentInferenceText(stepObj.value);
  }
  if (stepType === "markdown-chat" && typeof stepObj.value === "string") {
    return stepObj.value;
  }
  return "";
}

function extractFromRecordMap(recordMap: unknown): string {
  if (!recordMap || typeof recordMap !== "object" || Array.isArray(recordMap)) return "";
  const tm = (recordMap as Record<string, unknown>).thread_message;
  if (!tm || typeof tm !== "object" || Array.isArray(tm)) return "";
  let best = "";
  for (const msg of Object.values(tm as Record<string, unknown>)) {
    const stepObj = extractThreadMessageStep(msg);
    if (!stepObj) continue;
    const text = extractStepText(stepObj);
    if (text && text.length >= best.length) best = text;
  }
  return best;
}

/** Accumulator threaded through {@link parseNotionInferenceStream}'s line parsing. */
type NotionStreamState = {
  lastLegacy: string;
  lastPatchFinal: string;
  lastIncremental: string;
  lastRecordMap: string;
};

/** Full agent-inference text-part append: `o:"a", p:".../value/-"`. */
function applyNotionValuePartAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const part = v as Record<string, unknown>;
  if (part.type === "text" && typeof part.content === "string" && part.content) {
    state.lastPatchFinal = part.content;
  }
  if (part.type === "markdown-chat" && typeof part.value === "string" && part.value) {
    state.lastPatchFinal = part.value;
  }
}

/** Step append with markdown-chat / agent-inference: `o:"a", p:".../s/-"`. */
function applyNotionStepAppend(v: unknown, state: NotionStreamState): void {
  if (!v || typeof v !== "object" || Array.isArray(v)) return;
  const step = v as Record<string, unknown>;
  if (step.type === "markdown-chat" && typeof step.value === "string" && step.value) {
    state.lastPatchFinal = step.value;
  }
  if (step.type === "agent-inference") {
    const text = extractAgentInferenceText(step.value);
    if (text) state.lastPatchFinal = text;
  }
}

function applyNotionPatchOp(rawOp: unknown, state: NotionStreamState): void {
  if (!rawOp || typeof rawOp !== "object") return;
  const op = rawOp as Record<string, unknown>;
  const o = typeof op.o === "string" ? op.o : "";
  const p = typeof op.p === "string" ? op.p : "";
  const v = op.v;

  if (o === "a" && p.endsWith("/value/-")) {
    applyNotionValuePartAppend(v, state);
  } else if (o === "a" && p.endsWith("/s/-")) {
    applyNotionStepAppend(v, state);
  } else if ((o === "x" || o === "p") && p.includes("/value") && typeof v === "string" && v) {
    // Incremental string patches
    state.lastIncremental += v;
  }
}

/** Applies one parsed NDJSON record (markdown-chat / agent-inference / patch / record-map / legacy). */
function applyNotionStreamRecord(rec: Record<string, unknown>, state: NotionStreamState): void {
  const type = typeof rec.type === "string" ? rec.type : "";

  // 1) Direct markdown-chat event
  if (type === "markdown-chat" && typeof rec.value === "string" && rec.value) {
    state.lastPatchFinal = rec.value;
    return;
  }

  // 2) Direct agent-inference event
  if (type === "agent-inference") {
    const text = extractAgentInferenceText(rec.value);
    if (text) state.lastPatchFinal = text;
    return;
  }

  // 3) Patch stream
  if (type === "patch" && Array.isArray(rec.v)) {
    for (const rawOp of rec.v) applyNotionPatchOp(rawOp, state);
    return;
  }

  // 4) record-map terminal
  if (type === "record-map" || rec.recordMap) {
    const text = extractFromRecordMap(rec.recordMap || rec);
    if (text) state.lastRecordMap = text;
    return;
  }

  // 5) Legacy rich-text value (cumulative)
  const rich = extractRichText(rec.value);
  if (rich) state.lastLegacy = rich;
}

/** Parses one raw NDJSON line (trims / strips SSE `data:` prefix / JSON-parses) into state. */
function applyNotionStreamLine(rawLine: string, state: NotionStreamState): void {
  const line = rawLine.trim();
  if (!line || line === "[DONE]") return;
  // Strip optional SSE "data:" prefix if a proxy rewrote it.
  const payloadLine = line.startsWith("data:") ? line.slice(5).trim() : line;
  if (!payloadLine) return;

  let record: unknown;
  try {
    record = JSON.parse(payloadLine);
  } catch {
    return;
  }
  if (!record || typeof record !== "object" || Array.isArray(record)) return;
  applyNotionStreamRecord(record as Record<string, unknown>, state);
}

/**
 * Parse Notion's NDJSON `runInferenceTranscript` response body.
 * Supports:
 * 1. Legacy rich-text tuples on `value` (cumulative snapshots)
 * 2. Modern patch-start / patch streams (text / markdown-chat ops)
 * 3. Terminal record-map with agent-inference steps (authoritative final)
 */
export function parseNotionInferenceStream(raw: string): string {
  if (!raw) return "";
  const state: NotionStreamState = {
    lastLegacy: "",
    lastPatchFinal: "",
    lastIncremental: "",
    lastRecordMap: "",
  };

  for (const rawLine of raw.split("\n")) {
    applyNotionStreamLine(rawLine, state);
  }

  const candidates = [
    state.lastRecordMap,
    state.lastPatchFinal,
    state.lastIncremental,
    state.lastLegacy,
  ]
    .map(sanitizeNotionAssistantText)
    .filter(Boolean);
  // Prefer the longest non-empty candidate; record-map usually wins.
  return candidates.sort((a, b) => b.length - a.length)[0] || "";
}

/**
 * Detect Notion in-band errors (often HTTP 200 with NDJSON/JSON error objects),
 * e.g. `{ type:"error", subType:"temporarily-unavailable", message:"…" }`.
 */
export function extractNotionUpstreamError(raw: string): {
  message: string;
  subType?: string;
  isRetryable: boolean;
} | null {
  if (!raw || !raw.trim()) return null;
  const tryParse = (s: string): Record<string, unknown> | null => {
    try {
      const o = JSON.parse(s) as Record<string, unknown>;
      return o && typeof o === "object" ? o : null;
    } catch {
      return null;
    }
  };

  const candidates: Record<string, unknown>[] = [];
  const whole = tryParse(raw.trim());
  if (whole) candidates.push(whole);
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t) continue;
    const o = tryParse(t);
    if (o) candidates.push(o);
  }

  // Flatten nested error objects: live Notion streams often nest the error inside
  // `patch-start.data.s[]` (HTTP 200 NDJSON) instead of a top-level `{type:"error"}`.
  // Missing that shape used to surface as the misleading "No response from Notion AI".
  const flat: Record<string, unknown>[] = [];
  const pushNested = (o: Record<string, unknown>) => {
    flat.push(o);
    const data = o.data;
    if (data && typeof data === "object" && !Array.isArray(data)) {
      const s = (data as Record<string, unknown>).s;
      if (Array.isArray(s)) {
        for (const item of s) {
          if (item && typeof item === "object" && !Array.isArray(item)) {
            flat.push(item as Record<string, unknown>);
          }
        }
      }
    }
    // Also walk a top-level `s` array if present on the record.
    if (Array.isArray(o.s)) {
      for (const item of o.s) {
        if (item && typeof item === "object" && !Array.isArray(item)) {
          flat.push(item as Record<string, unknown>);
        }
      }
    }
  };
  for (const o of candidates) pushNested(o);

  for (const o of flat) {
    const type = typeof o.type === "string" ? o.type.toLowerCase() : "";
    const subType = typeof o.subType === "string" ? o.subType : undefined;
    const message =
      (typeof o.message === "string" && o.message) ||
      (typeof o.error === "string" && o.error) ||
      "";
    const isError =
      type === "error" ||
      Boolean(subType) ||
      (typeof o.isRetryable === "boolean" && message.toLowerCase().includes("went wrong"));
    if (!isError && !subType) continue;

    const sub = (subType || "").toLowerCase();
    // Notion often sets isRetryable:false on temporarily-unavailable even though
    // a short wait + retry succeeds (TLS/edge flake). Treat those subtypes as retryable.
    const retryable =
      o.isRetryable === true ||
      sub.includes("temporarily") ||
      sub.includes("unavailable") ||
      sub.includes("rate") ||
      sub.includes("timeout") ||
      sub.includes("overloaded");

    return {
      message: message || subType || "Notion upstream error",
      subType,
      isRetryable: retryable,
    };
  }
  return null;
}
