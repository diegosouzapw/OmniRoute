// Defensive shims for tool calls whose strict-schema fields can be malformed
// by upstream models (e.g. MiMo emitting empty objects/strings instead of
// arrays for Capy's submit_pr_review).
//
// Applied on the assembled OpenAI tool-call arguments after streaming, just
// before they are re-emitted as a single Claude input_json_delta.
//
// To add a new shim: register a (input) => input transformer in TOOL_SHIMS
// keyed by the tool name. The transformer must accept arbitrary input and
// return a JSON-safe value.

type ShimFn = (input: unknown) => unknown;

function coerceToArray(v: unknown): unknown[] {
  if (Array.isArray(v)) return v;
  if (v == null) return [];
  if (typeof v === "string") {
    if (v === "") return [];
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  // Plain object or other non-array → empty
  return [];
}

// Claude Code's Read tool caps `limit` at 2000 lines per call. Non-Anthropic models
// (GPT-5.5, DeepSeek …) occasionally emit absurd values (e.g. `limit: 25999999999999999`)
// that Claude Code rejects, causing a retry loop that wastes tokens. Clamp here.
const READ_MAX_LIMIT = 2000;

// `pages` is only meaningful for PDFs and only as `"N"` or `"N-M"` (1-based).
// Reference: claude-code-tools docs + upstream decolua/9router#1144.
function isValidPdfPagesArg(filePath: unknown, pages: unknown): boolean {
  return (
    typeof filePath === "string" &&
    filePath.toLowerCase().endsWith(".pdf") &&
    typeof pages === "string" &&
    /^\d+(?:-\d+)?$/.test(pages)
  );
}

function sanitizeReadArgs(args: Record<string, unknown>): void {
  // Coerce numeric-string limit/offset (some non-Anthropic models stringify everything).
  if (typeof args.limit === "string" && /^\d+$/.test(args.limit)) {
    args.limit = Number(args.limit);
  }
  if (typeof args.offset === "string" && /^-?\d+$/.test(args.offset)) {
    args.offset = Number(args.offset);
  }

  if (typeof args.limit === "number") {
    if (args.limit > READ_MAX_LIMIT) args.limit = READ_MAX_LIMIT;
    if (args.limit < 1) delete args.limit;
  }
  if (typeof args.offset === "number" && args.offset < 0) args.offset = 0;

  if ("pages" in args && !isValidPdfPagesArg(args.file_path, args.pages)) {
    delete args.pages;
  }
}

const TOOL_SHIMS: Record<string, ShimFn> = {
  // Claude Code Read rejects bad params and retries — wasting tokens with non-Anthropic
  // models that emit oversized limits, negative offsets, stringified numbers, or stray
  // `pages` on non-PDF files. Buffer and emit one cleaned JSON delta so the client never
  // sees the bad fields. See `sanitizeReadArgs` for the per-field rules.
  Read: (input) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) return input;
    const patched = { ...(input as Record<string, unknown>) };
    sanitizeReadArgs(patched);
    return patched;
  },
  submit_pr_review: (input) => {
    if (typeof input !== "object" || input === null || Array.isArray(input)) return input;
    const patched = { ...(input as Record<string, unknown>) };
    for (const key of ["functionalChanges", "findings"]) {
      patched[key] = coerceToArray(patched[key]);
    }
    return patched;
  },
};

export function hasToolCallShim(name: string | undefined | null): boolean {
  return typeof name === "string" && Object.prototype.hasOwnProperty.call(TOOL_SHIMS, name);
}

/**
 * Apply the registered shim for a tool call's raw assembled arguments string.
 * Returns a stringified JSON value safe to emit as input_json_delta.partial_json.
 * If the buffer is unparseable, returns the empty-object JSON `{}` after applying
 * the shim with `{}` as input (so required arrays still get injected).
 */
export function applyToolCallShimToBuffer(name: string, raw: string): string {
  const shim = TOOL_SHIMS[name];
  if (!shim) return raw;

  let parsed: unknown;
  try {
    parsed = raw && raw.length > 0 ? JSON.parse(raw) : {};
  } catch {
    parsed = {};
  }

  const patched = shim(parsed);
  return JSON.stringify(patched);
}

// Exposed for unit tests only.
export const __test = { coerceToArray, TOOL_SHIMS };
