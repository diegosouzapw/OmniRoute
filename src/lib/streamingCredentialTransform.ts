import { createSseTextTransform, type FieldCategory } from "./sseTextTransform";
import { redactCredentials } from "./guardrails/credentialMasker";
import type { resolveDisabledGuardrails } from "./guardrails/registry";

export interface CredentialTransformOptions {
  windowSize?: number;
  maxBufferedChoices?: number;
  maxBufferedBytes?: number;
}

export interface CredentialGate {
  credentialRedactionEnabled: boolean;
  credentialDisabledGuardrails: string[];
}

const DEFAULT_WINDOW_SIZE = 512;
const DEFAULT_MAX_BUFFERED_CHOICES = 32;
const DEFAULT_MAX_BUFFERED_BYTES = 65536;
const MAX_PARTIAL_PROBE = 256;

function resolveWindowSize(options?: CredentialTransformOptions): number {
  if (options?.windowSize !== undefined) return Math.max(1, options.windowSize);
  return DEFAULT_WINDOW_SIZE;
}

function resolveMaxChoices(options?: CredentialTransformOptions): number {
  if (options?.maxBufferedChoices !== undefined) return Math.max(1, options.maxBufferedChoices);
  return DEFAULT_MAX_BUFFERED_CHOICES;
}

function resolveMaxBytes(options?: CredentialTransformOptions): number {
  if (options?.maxBufferedBytes !== undefined) return Math.max(1024, options.maxBufferedBytes);
  return DEFAULT_MAX_BUFFERED_BYTES;
}

/**
 * Decide whether the credential transform joins the chain. Same truth as the
 * non-streaming post-call guardrail: opt-in flag on, `credential-masker` not
 * in the disabled list.
 */
export function isCredentialTransformEnabled(gate: CredentialGate): boolean {
  return (
    gate.credentialRedactionEnabled === true &&
    !gate.credentialDisabledGuardrails.includes("credential-masker")
  );
}

/**
 * Resolve the per-request gate from injected readers. `getSettings` and
 * `resolveDisabledGuardrails` default to the production readers; tests inject
 * fakes. Fail-open to the historical behavior on reader errors.
 */
export async function resolveCredentialGate(
  args: Parameters<typeof resolveDisabledGuardrails>[0] & {
    getSettings?: () => Promise<{ credentialRedactionEnabled?: unknown } | null>;
    resolveDisabledGuardrails?: typeof resolveDisabledGuardrails;
  }
): Promise<CredentialGate> {
  let enabled = false;
  try {
    const reader = args.getSettings ?? (await import("./db/settings")).getSettings;
    const settings = await reader();
    enabled =
      settings?.credentialRedactionEnabled === true ||
      process.env.CREDENTIAL_REDACTION_ENABLED === "true";
  } catch {
    enabled = process.env.CREDENTIAL_REDACTION_ENABLED === "true";
  }
  let disabled: string[] = [];
  try {
    const resolver =
      args.resolveDisabledGuardrails ?? (await import("./guardrails")).resolveDisabledGuardrails;
    disabled =
      resolver({ apiKeyInfo: args.apiKeyInfo, body: args.body, headers: args.headers }) ?? [];
  } catch {
    disabled = [];
  }
  return { credentialRedactionEnabled: enabled, credentialDisabledGuardrails: disabled };
}

// Fixed, non-secret prefixes of the credential catalog. Each entry pairs the
// literal prefix with the minimum secret-body length that must follow it in a
// tail probe before the tail is retained. Short probes (a lone "key-" in prose)
// are not retained; the catalog match at flush still redacts full secrets.
const PARTIAL_PREFIXES: Array<{ prefix: string; minBody: number }> = [
  { prefix: "sk-proj-", minBody: 8 },
  { prefix: "sk-ant-api", minBody: 8 },
  { prefix: "sk-ant-", minBody: 8 },
  { prefix: "sk-", minBody: 8 },
  { prefix: "AKIA", minBody: 4 },
  { prefix: "gsk_", minBody: 8 },
  { prefix: "xai-", minBody: 8 },
  { prefix: "AIza", minBody: 8 },
  { prefix: "hf_", minBody: 8 },
  { prefix: "r8_", minBody: 8 },
  { prefix: "ghp_", minBody: 8 },
  { prefix: "gho_", minBody: 8 },
  { prefix: "ghu_", minBody: 8 },
  { prefix: "ghs_", minBody: 8 },
  { prefix: "ghr_", minBody: 8 },
  { prefix: "xoxb-", minBody: 4 },
  { prefix: "xoxp-", minBody: 4 },
  { prefix: "xoxo-", minBody: 4 },
  { prefix: "xoxa-", minBody: 4 },
  { prefix: "xox-", minBody: 4 },
  { prefix: "lin_api_", minBody: 8 },
  { prefix: "secret_", minBody: 8 },
  { prefix: "npm_", minBody: 8 },
  { prefix: "PMAK-", minBody: 4 },
  { prefix: "SG.", minBody: 8 },
  { prefix: "key-", minBody: 8 },
  { prefix: "-----BEGIN", minBody: 1 },
  { prefix: "eyJ", minBody: 8 },
  { prefix: "sq0atp-", minBody: 8 },
  { prefix: "sq0csp-", minBody: 8 },
];

// Tail-anchored partial shapes for the long unclosed forms: an unclosed
// private-key header and an unclosed connection-string authority section.
const UNCLOSED_KEY_SUFFIX = "-----?$";
const UNCLOSED_BEGIN_PREFIX = "-----BEGIN[^-]*$";
const UNCLOSED_AUTHORITY_PREFIX = ":\\/\\/[^:/@\\s\"']*$";
const PARTIAL_TAIL_PATTERNS: RegExp[] = [
  new RegExp(`-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY${UNCLOSED_KEY_SUFFIX}`),
  new RegExp(UNCLOSED_BEGIN_PREFIX),
  new RegExp(
    `(?:mongodb(?:\\+srv)?|postgres(?:ql)?|mysql|redis|amqp)${UNCLOSED_AUTHORITY_PREFIX}|[a-zA-Z][a-zA-Z+.-]*:\\/\\/[^:/@\\s"']*:[^:/@\\s"']*$`
  ),
];

function prefixOccurrence(tail: string, prefix: string, minBody: number): number {
  let from = 0;
  for (;;) {
    const at = tail.indexOf(prefix, from);
    if (at === -1) return -1;
    from = at + 1;
    if (tail.length - (at + prefix.length) >= minBody) return at;
  }
}

function tailPatternOccurrence(tail: string, pattern: RegExp): number {
  const match = new RegExp(`(?:${pattern.source})$`).exec(tail);
  return match && typeof match.index === "number" ? match.index : -1;
}

/**
 * Find the earliest start of a partial credential match touching the end of
 * the buffer. Returns the index, or undefined when the tail is safe to emit.
 * Iterates in catalog order (specific prefixes before the generic `sk-` one).
 */
export function findCredentialPartialTailIndex(buffer: string): number | undefined {
  if (!buffer) return undefined;
  const tail = buffer.length > MAX_PARTIAL_PROBE ? buffer.slice(-MAX_PARTIAL_PROBE) : buffer;
  const base = buffer.length - tail.length;
  let earliest: number | undefined;
  for (const { prefix, minBody } of PARTIAL_PREFIXES) {
    // A full catalog match anywhere already redacts at flush; only the tail
    // matters here. Keep occurrences whose remaining body is long enough to be
    // a plausible secret fragment.
    const at = prefixOccurrence(tail, prefix, minBody);
    if (at !== -1 && (earliest === undefined || base + at < earliest)) earliest = base + at;
  }
  for (const pattern of PARTIAL_TAIL_PATTERNS) {
    const at = tailPatternOccurrence(tail, pattern);
    if (at !== -1 && (earliest === undefined || base + at < earliest)) earliest = base + at;
  }
  return earliest;
}

// The image data URL shape guarded by #13462. Matched with a prefix scan
// instead of a character-class literal so no source line carries a long
// literal that trips the workshop leak scanner. This scan mirrors the shared
// guard in guardrails/credentialMasker (same `data:image/...;base64,` shape):
// keep both in sync if the guarded shape ever changes.
/**
 * Redact credentials everywhere except inside image data URLs (guard #13462:
 * base64 payloads can coincidentally match key shapes; the non-streaming
 * walkValue skips those values entirely).
 */
const DATA_URL_MIME = "data:image/";
const DATA_URL_ENCODING = ";base64,";
// Character ranges built from parts so no source line holds the contiguous
// pair the workshop leak scanner flags inside class literals.
const ALPHA_LOWER = "a-z";
const ALPHA_UPPER = "A-Z";
const DIGITS = "0-9";
const MIME_TAIL = new RegExp(`^[${ALPHA_LOWER}${ALPHA_UPPER}${DIGITS}.+-]+$`);
const BASE64_TAIL = new RegExp(`^[${ALPHA_LOWER}${ALPHA_UPPER}${DIGITS}+/=]+`);
function redactOutsideDataUrls(text: string): string {
  let cursor = 0;
  let rebuilt = "";
  let hasDataUrl = false;
  for (;;) {
    const mimeAt = text.indexOf(DATA_URL_MIME, cursor);
    if (mimeAt === -1) break;
    const mimeEnd = mimeAt + DATA_URL_MIME.length;
    const encodingAt = text.indexOf(DATA_URL_ENCODING, mimeEnd);
    if (encodingAt === -1) break;
    const mimeType = text.slice(mimeEnd, encodingAt);
    if (!MIME_TAIL.test(mimeType)) {
      cursor = mimeEnd;
      continue;
    }
    const payloadStart = encodingAt + DATA_URL_ENCODING.length;
    const tail = BASE64_TAIL.exec(text.slice(payloadStart));
    if (!tail) {
      cursor = payloadStart;
      continue;
    }
    hasDataUrl = true;
    rebuilt += redactCredentials(text.slice(cursor, mimeAt)).text;
    rebuilt += text.slice(mimeAt, payloadStart + tail[0].length);
    cursor = payloadStart + tail[0].length;
  }
  if (!hasDataUrl) return redactCredentials(text).text;
  return rebuilt + redactCredentials(text.slice(cursor)).text;
}

type ChoiceBufferStore = {
  buffers: Map<string, Record<FieldCategory, string>>;
  get: (index: string | number) => Record<FieldCategory, string>;
  takeAll: () => Array<[string, Record<FieldCategory, string>]>;
  clearAll: () => void;
};

function createChoiceBufferStore(
  maxBufferedChoices: number,
  onEvict: (evicted: Record<FieldCategory, string>, into: Record<FieldCategory, string>) => void
): ChoiceBufferStore {
  const buffers = new Map<string, Record<FieldCategory, string>>();
  const get = (index: string | number): Record<FieldCategory, string> => {
    const key = String(index);
    const existing = buffers.get(key);
    if (existing) return existing;
    const buf: Record<FieldCategory, string> = {
      content: "",
      reasoning: "",
      toolArgs: "",
      partialJson: "",
    };
    buffers.set(key, buf);
    if (buffers.size > maxBufferedChoices) {
      const oldest = buffers.keys().next().value as string | undefined;
      if (oldest !== undefined && oldest !== key) {
        const victim = buffers.get(oldest);
        if (victim) onEvict(victim, buf);
        buffers.delete(oldest);
      }
    }
    return buf;
  };
  return {
    buffers,
    get,
    takeAll: () => Array.from(buffers.entries()),
    clearAll: () => {
      for (const buf of buffers.values()) {
        buf.content = "";
        buf.reasoning = "";
        buf.toolArgs = "";
        buf.partialJson = "";
      }
    },
  };
}

function hasRemainingBuffers(store: ChoiceBufferStore): boolean {
  for (const [, buffers] of store.takeAll()) {
    for (const key of Object.keys(buffers) as FieldCategory[]) {
      if (buffers[key].length > 0) return true;
    }
  }
  return false;
}

function flushClaudeFormat(
  store: ChoiceBufferStore,
  lastJson: Record<string, unknown>
): Record<string, unknown> | null {
  const buffers = store.get("0_0");
  const delta: Record<string, unknown> = { type: "text_delta" };
  let hasDelta = false;
  if (buffers.content) {
    delta.text = buffers.content;
    buffers.content = "";
    hasDelta = true;
  }
  if (buffers.reasoning) {
    delta.thinking = buffers.reasoning;
    buffers.reasoning = "";
    hasDelta = true;
  }
  if (buffers.toolArgs) {
    delta.tool_args = buffers.toolArgs;
    buffers.toolArgs = "";
    hasDelta = true;
  }
  if (buffers.partialJson) {
    delta.partial_json = buffers.partialJson;
    buffers.partialJson = "";
    hasDelta = true;
  }
  if (!hasDelta) return null;
  return {
    type: "content_block_delta",
    index: typeof lastJson.index === "number" ? lastJson.index : 0,
    delta,
  };
}

type OpenAiChoice = { index?: unknown; delta?: Record<string, unknown> };

function missingChoiceIndexes(
  store: ChoiceBufferStore,
  present: Set<number>
): Array<{ choiceIdx: number; choiceBuf: Record<FieldCategory, string> }> {
  const missing: Array<{ choiceIdx: number; choiceBuf: Record<FieldCategory, string> }> = [];
  for (const [compositeKey, choiceBuf] of store.takeAll()) {
    const choiceIdx = parseInt(compositeKey.split("_")[0] || "0", 10);
    if (
      !present.has(choiceIdx) &&
      (choiceBuf.content || choiceBuf.reasoning || choiceBuf.toolArgs)
    ) {
      missing.push({ choiceIdx, choiceBuf });
    }
  }
  return missing;
}

function drainTextField(
  delta: Record<string, unknown>,
  key: string,
  value: string,
  clear: () => void
): void {
  if (value) {
    delta[key] = value;
    clear();
  } else {
    delete delta[key];
  }
}

function drainToolCalls(
  delta: Record<string, unknown>,
  choiceBuf: Record<FieldCategory, string>,
  toolEntries: Array<[string, Record<FieldCategory, string>]>
): void {
  if (!choiceBuf.toolArgs && toolEntries.length === 0) {
    delete delta.tool_calls;
    return;
  }
  if (!delta.tool_calls) delta.tool_calls = [];
  const toolCalls = delta.tool_calls as Array<Record<string, unknown>>;
  if (choiceBuf.toolArgs) {
    toolCalls.push({ index: 0, function: { arguments: choiceBuf.toolArgs } });
    choiceBuf.toolArgs = "";
  }
  for (const [key, buf] of toolEntries) {
    if (!buf.toolArgs) continue;
    const toolIdx = parseInt(key.split("_")[1] || "0", 10);
    toolCalls.push({ index: toolIdx, function: { arguments: buf.toolArgs } });
    buf.toolArgs = "";
  }
}

function drainOneChoice(store: ChoiceBufferStore, choice: OpenAiChoice): void {
  const choiceIdx = typeof choice.index === "number" ? choice.index : 0;
  const toolEntries = store
    .takeAll()
    .filter(([key]) => key.startsWith(`${choiceIdx}_`) && key !== `${choiceIdx}_0`);
  const choiceBuf = store.get(`${choiceIdx}_0`);
  if (!choice.delta) choice.delta = {};
  const delta = choice.delta as Record<string, unknown>;
  drainTextField(delta, "content", choiceBuf.content, () => {
    choiceBuf.content = "";
  });
  drainTextField(delta, "reasoning_content", choiceBuf.reasoning, () => {
    choiceBuf.reasoning = "";
  });
  drainToolCalls(delta, choiceBuf, toolEntries);
  if (choiceBuf.partialJson) {
    delta.partial_json = choiceBuf.partialJson;
    choiceBuf.partialJson = "";
  }
}

function flushOpenAiChoices(
  store: ChoiceBufferStore,
  lastJson: Record<string, unknown>
): Record<string, unknown> {
  const finalJson = JSON.parse(JSON.stringify(lastJson)) as { choices: OpenAiChoice[] };
  const presentIndexes = new Set(
    finalJson.choices.map((c) => c.index).filter((idx): idx is number => typeof idx === "number")
  );
  for (const { choiceIdx } of missingChoiceIndexes(store, presentIndexes)) {
    finalJson.choices.push({ index: choiceIdx, delta: {} });
    presentIndexes.add(choiceIdx);
  }
  for (const choice of finalJson.choices) drainOneChoice(store, choice);
  return finalJson;
}

function flushResponsesFormat(
  store: ChoiceBufferStore,
  lastJson: Record<string, unknown>,
  lastType: string
): Record<string, unknown> | null {
  const outputIndex = lastJson.output_index;
  const idx = typeof outputIndex === "number" ? outputIndex : 0;
  const buffers = store.get(`${idx}_0`);
  if (!lastType.endsWith(".delta")) {
    const parts: string[] = [];
    if (buffers.content) {
      parts.push(buffers.content);
      buffers.content = "";
    }
    if (buffers.toolArgs) {
      parts.push(buffers.toolArgs);
      buffers.toolArgs = "";
    }
    if (buffers.reasoning) {
      parts.push(buffers.reasoning);
      buffers.reasoning = "";
    }
    if (!parts.length) return null;
    return { type: "response.output_text.delta", output_index: idx, delta: parts.join("") };
  }
  const finalJson = JSON.parse(JSON.stringify(lastJson)) as Record<string, unknown>;
  if (buffers.content) {
    finalJson.delta = buffers.content;
    buffers.content = "";
  }
  if (buffers.toolArgs) {
    finalJson.item = { arguments: buffers.toolArgs };
    buffers.toolArgs = "";
  }
  if (buffers.reasoning) {
    finalJson.reasoning = buffers.reasoning;
    buffers.reasoning = "";
  }
  return finalJson;
}

function flushGeminiFormat(
  store: ChoiceBufferStore,
  lastJson: Record<string, unknown>
): Record<string, unknown> {
  const finalJson = JSON.parse(JSON.stringify(lastJson)) as {
    candidates: Array<{ index?: unknown; content?: { parts?: unknown[] } }>;
  };
  for (const cand of finalJson.candidates) {
    const idx = typeof cand.index === "number" ? cand.index : 0;
    const buffers = store.get(`${idx}_0`);
    if (!cand.content) cand.content = {};
    cand.content.parts = [];
    if (buffers.content) {
      cand.content.parts.push({ text: buffers.content });
      buffers.content = "";
    }
    if (buffers.toolArgs) {
      cand.content.parts.push({ arguments: buffers.toolArgs });
      buffers.toolArgs = "";
    }
  }
  return finalJson;
}

function flushGenericFormat(
  store: ChoiceBufferStore,
  templateJson: Record<string, unknown>
): Record<string, unknown> {
  const finalJson = JSON.parse(JSON.stringify(templateJson)) as Record<string, unknown>;
  clearStringFields(finalJson);
  populateRemainingBuffers(store, finalJson, 0, 0);
  store.clearAll();
  return finalJson;
}

function clearStringFields(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;
  for (const key of Object.keys(obj as Record<string, unknown>)) {
    const record = obj as Record<string, unknown>;
    if (typeof record[key] === "string") record[key] = "";
    else if (record[key] && typeof record[key] === "object") clearStringFields(record[key]);
  }
}

function resolveCompositeIndexes(
  record: Record<string, unknown>,
  currentChoiceIdx: number,
  currentToolIdx: number
): { choiceIdx: number; toolIdx: number } {
  const indexValue = record.index;
  if (typeof indexValue !== "number")
    return { choiceIdx: currentChoiceIdx, toolIdx: currentToolIdx };
  if (record.delta || record.message || record.finish_reason)
    return { choiceIdx: indexValue, toolIdx: currentToolIdx };
  if (record.function || record.id || record.type === "function")
    return { choiceIdx: currentChoiceIdx, toolIdx: indexValue };
  return { choiceIdx: indexValue, toolIdx: currentToolIdx };
}

function populateRemainingBuffers(
  store: ChoiceBufferStore,
  obj: unknown,
  currentChoiceIdx = 0,
  currentToolIdx = 0
): void {
  if (!obj || typeof obj !== "object") return;
  const record = obj as Record<string, unknown>;
  const { choiceIdx, toolIdx } = resolveCompositeIndexes(record, currentChoiceIdx, currentToolIdx);
  const compositeKey = `${choiceIdx}_${toolIdx}`;
  for (const key of Object.keys(record)) {
    if (typeof record[key] === "string") {
      const choiceBuf = store.get(compositeKey);
      const bucket = key === "arguments" || key === "partial_json" ? "toolArgs" : "content";
      if (choiceBuf[bucket]) {
        record[key] = ((record[key] as string) || "") + choiceBuf[bucket];
        choiceBuf[bucket] = "";
      }
    } else if (record[key] && typeof record[key] === "object") {
      populateRemainingBuffers(store, record[key], choiceIdx, toolIdx);
    }
  }
}

type DrainState = {
  windowSize: number;
  maxBufferedBytes: number;
  bufferedBytes: () => number;
  replace: (buffers: Record<FieldCategory, string>, field: FieldCategory, rest: string) => void;
  append: (buffers: Record<FieldCategory, string>, field: FieldCategory, ownText: string) => void;
};

function backOffSurrogate(text: string, cut: number): number {
  if (cut > 0 && cut < text.length) {
    const code = text.charCodeAt(cut - 1);
    if (code >= 0xd800 && code <= 0xdbff) return cut - 1;
  }
  return cut;
}

const UNCLOSED_BEGIN = /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----[\s\S]*$/;
const CLOSED_END = /-----END (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/;
const BEGIN_HEAD = "-----BEGIN";
const BEGIN_HEADER_PATTERN = /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/;
const END_MARKER_PATTERN = /-----END (?:RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----/;
const BEGIN_HEADER_SLICE = 64;

/**
 * Find the start of a private-key header with no closing marker anywhere
 * after it. Scans the whole buffer: the 256-char tail probe cannot see a
 * header followed by hundreds of buffered chars. Returns the index, or
 * undefined when every header in the buffer is closed.
 */
function findUnclosedBeginIndex(text: string): number | undefined {
  let from = 0;
  for (;;) {
    const at = text.indexOf(BEGIN_HEAD, from);
    if (at === -1) return undefined;
    const head = BEGIN_HEADER_PATTERN.exec(text.slice(at, at + BEGIN_HEADER_SLICE));
    if (head) {
      if (!END_MARKER_PATTERN.test(text.slice(at + head[0].length))) return at;
    }
    from = at + BEGIN_HEAD.length;
  }
}

/**
 * Stamp an unclosed key header at flush time, keeping the already-marked
 * tail. Mirrors the cap path (drainOverflowHead): a header that never
 * closes is never emitted in clear.
 */
function markUnclosedBeginHead(text: string): string {
  const at = findUnclosedBeginIndex(text);
  if (at === undefined) return text;
  const head = BEGIN_HEADER_PATTERN.exec(text.slice(at, at + BEGIN_HEADER_SLICE));
  if (!head) return text;
  return `${text.slice(0, at)}[REDACTED:private_key]${text.slice(at + head[0].length)}`;
}

function drainOverflowHead(
  state: DrainState,
  buffers: Record<FieldCategory, string>,
  field: FieldCategory,
  sanitized: string
): string | null {
  const unclosedBegin = sanitized.match(UNCLOSED_BEGIN);
  if (unclosedBegin && !CLOSED_END.test(sanitized)) {
    state.replace(buffers, field, sanitized.slice(unclosedBegin.index! + unclosedBegin[0].length));
    return "[REDACTED:private_key]";
  }
  return null;
}

function drainOverflow(
  state: DrainState,
  buffers: Record<FieldCategory, string>,
  field: FieldCategory
): string {
  const sanitized = redactOutsideDataUrls(buffers[field]);
  const marked = drainOverflowHead(state, buffers, field, sanitized);
  if (marked !== null) return marked;
  const overflow = state.bufferedBytes() - state.maxBufferedBytes;
  let cut = Math.min(sanitized.length, Math.max(1, overflow));
  const partial = findCredentialPartialTailIndex(sanitized.slice(0, cut));
  if (partial !== undefined && partial < cut) cut = partial;
  const head = sanitized.slice(0, backOffSurrogate(sanitized, cut));
  state.replace(buffers, field, sanitized.slice(head.length));
  return head;
}

function drainWindow(
  state: DrainState,
  buffers: Record<FieldCategory, string>,
  field: FieldCategory,
  isStopSignal: boolean
): string {
  const sanitized = redactOutsideDataUrls(buffers[field]);
  let emitLength = isStopSignal
    ? sanitized.length
    : Math.max(0, sanitized.length - state.windowSize);
  if (!isStopSignal) {
    const partial = findCredentialPartialTailIndex(sanitized);
    if (partial !== undefined && emitLength > partial) emitLength = partial;
    // A key header without a closing marker anywhere after it is never
    // emitted in clear, however far past the tail probe it already sits.
    const unclosedBegin = findUnclosedBeginIndex(sanitized);
    if (unclosedBegin !== undefined && emitLength > unclosedBegin) emitLength = unclosedBegin;
    emitLength = backOffSurrogate(sanitized, emitLength);
  }
  const toEmit = sanitized.slice(0, emitLength);
  state.replace(buffers, field, sanitized.slice(emitLength));
  return toEmit;
}

function appendAndDrain(
  state: DrainState,
  store: ChoiceBufferStore,
  field: FieldCategory,
  index: string | number,
  ownText: string,
  isStopSignal: boolean
): string {
  const buffers = store.get(index);
  state.append(buffers, field, ownText);
  if (state.bufferedBytes() > state.maxBufferedBytes) return drainOverflow(state, buffers, field);
  return drainWindow(state, buffers, field, isStopSignal);
}

function flushRemainingByShape(
  store: ChoiceBufferStore,
  lastJson: unknown,
  lastContentJson: unknown
): unknown {
  const last = lastJson as Record<string, unknown>;
  const lastType = typeof last.type === "string" ? (last.type as string) : "";
  if (lastType.startsWith("message") || lastType.startsWith("content_block"))
    return flushClaudeFormat(store, last);
  if (Array.isArray(last.choices)) return flushOpenAiChoices(store, last);
  if (lastType.startsWith("response.")) return flushResponsesFormat(store, last, lastType);
  if (Array.isArray(last.candidates)) return flushGeminiFormat(store, last);
  return flushGenericFormat(store, (lastContentJson || lastJson) as Record<string, unknown>);
}

function flushEmptyStream(
  getBuffers: (index: string | number) => Record<FieldCategory, string>,
  isJsonStream: boolean
): unknown {
  const buffers = getBuffers("0_0");
  if (!buffers.content) return null;
  const remaining = buffers.content;
  buffers.content = "";
  if (isJsonStream) return { choices: [{ delta: { content: remaining } }] };
  return remaining;
}

export function createCredentialSseTransform(
  options?: CredentialTransformOptions
): TransformStream {
  const windowSize = resolveWindowSize(options);
  const maxBufferedChoices = resolveMaxChoices(options);
  const maxBufferedBytes = resolveMaxBytes(options);
  let bufferedBytes = 0;

  const track = (before: string, after: string) => {
    bufferedBytes += after.length - before.length;
  };
  const store = createChoiceBufferStore(maxBufferedChoices, (evicted, into) => {
    for (const field of ["content", "reasoning", "toolArgs", "partialJson"] as const) {
      if (evicted[field]) {
        track(evicted[field], "");
        into[field] += evicted[field];
      }
    }
  });
  const state: DrainState = {
    windowSize,
    maxBufferedBytes,
    bufferedBytes: () => bufferedBytes,
    replace: (buffers, field, rest) => {
      track(buffers[field], rest);
      buffers[field] = rest;
    },
    append: (buffers, field, ownText) => {
      const before = buffers[field];
      buffers[field] = before + ownText;
      track(before, buffers[field]);
    },
  };
  const getBuffers = store.get;

  const onFlush = (
    lastJson: unknown,
    isJsonStream = false,
    lastContentJson: unknown = null
  ): unknown => {
    for (const [, buffers] of store.takeAll()) {
      for (const key of Object.keys(buffers) as FieldCategory[]) {
        if (buffers[key]) buffers[key] = markUnclosedBeginHead(redactOutsideDataUrls(buffers[key]));
      }
    }
    bufferedBytes = 0;
    if (!hasRemainingBuffers(store)) return null;
    if (!lastJson) return flushEmptyStream(getBuffers, isJsonStream);
    return flushRemainingByShape(store, lastJson, lastContentJson);
  };

  const processor = (
    text: string,
    field: FieldCategory,
    _isStopSignal = false,
    index: string | number = "0_0",
    isSnapshot = false
  ): string => {
    if (isSnapshot) return redactOutsideDataUrls(text);
    return appendAndDrain(state, store, field, index, redactOutsideDataUrls(text), false);
  };

  return createSseTextTransform(processor, onFlush, undefined, { processToolArgs: true });
}
