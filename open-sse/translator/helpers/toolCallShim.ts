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

const TOOL_SHIMS: Record<string, ShimFn> = {
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
