// Pure, stateless helpers for the OpenAI Responses <-> Chat response translator.
// Extracted verbatim from response/openai-responses.ts (no host imports, no stream state).

// Minimal structural view of the tool JSON-Schema subset this module inspects. Values
// arrive straight from request payloads, so fields stay `unknown` and every access site
// narrows them with runtime guards — the guards below remain the source of truth.
interface ToolArgSchema {
  description?: unknown;
  type?: unknown;
  enum?: unknown;
  properties?: Record<string, ToolArgSchema>;
  required?: unknown;
  default?: unknown;
  [key: string]: unknown;
}

export function normalizeToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// Tools whose empty-string/empty-array optional args are safe to strip. Arbitrary
// tools are left untouched because an empty string/array can be a valid payload.
// - "Read": Claude Code's Read tool (empty `pages`) — #2937.
// - "Subagent": Cursor's local subagent tool emits a cloud-only `cloud_base_branch: ""`,
//   which Cursor rejects unless environment is cloud — ported from decolua/9router#2446.
const STRIPPABLE_EMPTY_ARG_TOOLS = new Set(["Read", "Subagent"]);

// Deep-equal for JSON-shaped values (schema `default` comparison). Cheap and safe:
// tool args are always JSON-serializable, so a stringify comparison is exact.
function jsonValuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function hasUsableSchema(schema: unknown): schema is ToolArgSchema {
  return !!(schema && typeof schema === "object" && !Array.isArray(schema));
}

function schemaProperties(schema: unknown): Record<string, ToolArgSchema> | null {
  if (!hasUsableSchema(schema)) return null;
  return schema.properties && typeof schema.properties === "object" ? schema.properties : null;
}

function schemaRequiredSet(schema: unknown): Set<unknown> {
  const required = hasUsableSchema(schema) ? schema.required : null;
  return new Set(Array.isArray(required) ? required : []);
}

function isEmptyToolArgValue(entry: unknown): boolean {
  return entry === "" || (Array.isArray(entry) && entry.length === 0);
}

// True when `entry` strictly equals the property's declared JSON Schema `default` — an
// emitted value indistinguishable from omission, safe to drop for any tool.
function matchesSchemaDefault(
  propSchema: ToolArgSchema | null | undefined,
  entry: unknown
): boolean {
  if (!propSchema || !Object.prototype.hasOwnProperty.call(propSchema, "default")) return false;
  return jsonValuesEqual(entry, propSchema.default);
}

// True when `entry` is empty and either the tool is on the legacy allowlist, or the
// schema declares this property but does not mark it `required` (generalized #6951 rule).
function isDroppableEmptyEntry(
  entry: unknown,
  propSchema: ToolArgSchema | null | undefined,
  required: Set<unknown>,
  key: string,
  allowlisted: boolean
): boolean {
  if (!isEmptyToolArgValue(entry)) return false;
  return allowlisted || (propSchema != null && !required.has(key));
}

function schemaTypeIncludes(type: unknown, wanted: string): boolean {
  return type === wanted || (Array.isArray(type) && type.includes(wanted));
}

function hasOmissionSentinel(propSchema: ToolArgSchema | null | undefined): boolean {
  if (!propSchema || typeof propSchema !== "object") return false;
  if (
    typeof propSchema.description !== "string" ||
    !propSchema.description.includes("null = omit this parameter")
  ) {
    return false;
  }
  return (
    schemaTypeIncludes(propSchema.type, "null") ||
    (Array.isArray(propSchema.enum) && propSchema.enum.includes(null))
  );
}

// #7023 — the request-side counterpart widens no-default optional properties to accept
// `null`, meaning "omitted" (OpenAI's own nullable-union idiom for Responses-API strict
// mode). Enums use injectOptionalEnumOmissionSentinel; plain strings use
// injectOptionalStringOmissionSentinel. Drop the key when the model follows that idiom
// for a non-required, schema-declared property, or when OmniRoute's marker is present
// even after an upstream strictifies the field into `required`.
function isDroppableNullEntry(
  entry: unknown,
  propSchema: ToolArgSchema | null | undefined,
  required: Set<unknown>,
  key: string,
  toolName: string
): boolean {
  if (entry !== null) return false;
  if (toolName === "Agent") return true;
  if (propSchema == null) return false;
  return !required.has(key) || hasOmissionSentinel(propSchema);
}

function stripEmptyOptionalToolArgsObject(
  value: Record<string, unknown>,
  toolName: string,
  schema: unknown
): Record<string, unknown> {
  const properties = schemaProperties(schema);
  const required = schemaRequiredSet(schema);
  const allowlisted = STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName);

  const cleaned = { ...value };
  for (const [key, entry] of Object.entries(cleaned)) {
    const propSchema = properties ? properties[key] : null;
    if (
      matchesSchemaDefault(propSchema, entry) ||
      isDroppableEmptyEntry(entry, propSchema, required, key, allowlisted) ||
      isDroppableNullEntry(entry, propSchema, required, key, toolName)
    ) {
      delete cleaned[key];
    }
  }
  return cleaned;
}

// #6951 — Responses API strict mode forces every tool property into `required`, so the
// model always emits *some* value for "optional" params (no first-class optional).
// When the tool's JSON Schema is available (`schema`, from the request's `tools[]`),
// normalization becomes schema-aware instead of allowlist-only:
//   - drop-if-default: value strictly equals the property's declared `default`.
//   - drop-if-empty (generalized): empty string/array for a property that is declared
//     in `schema.properties` but absent from `schema.required` — any tool, not just the
//     Read/Subagent allowlist above.
// Without a schema, behavior is unchanged (allowlist + empty-only), preserving existing
// callers that only pass (value, toolName).
export function stripEmptyOptionalToolArgs(
  value: unknown,
  toolName: string,
  schema: unknown
): unknown {
  if (value == null) return value;

  if (typeof value === "string") {
    // JSON-string cleanup runs for allowlisted tools, or for any tool once a schema is
    // supplied (schema-aware normalization is not restricted to the allowlist).
    // "Agent" also passes without a schema: isDroppableNullEntry drops its null
    // omission sentinels even when the strict schema snapshot is unavailable (#9423).
    if (
      !hasUsableSchema(schema) &&
      !STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName) &&
      toolName !== "Agent"
    ) {
      return value;
    }
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) || typeof parsed !== "object" || parsed === null) return value;
      const cleaned = stripEmptyOptionalToolArgs(parsed, toolName, schema);
      return JSON.stringify(cleaned ?? {});
    } catch {
      return value;
    }
  }

  if (Array.isArray(value) || typeof value !== "object") return value;

  return stripEmptyOptionalToolArgsObject(value as Record<string, unknown>, toolName, schema);
}

export function normalizeOutputIndex(outputIndex: unknown): number {
  const normalized = Number(outputIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : 0;
}

export function normalizeUpstreamFailure(data: unknown, fallbackType = "server_error") {
  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const response =
    root.response && typeof root.response === "object"
      ? (root.response as Record<string, unknown>)
      : null;
  const error =
    response?.error && typeof response.error === "object"
      ? (response.error as Record<string, unknown>)
      : root.error && typeof root.error === "object"
        ? (root.error as Record<string, unknown>)
        : null;

  const code = typeof error?.code === "string" ? error.code : "";
  const message =
    typeof error?.message === "string"
      ? error.message
      : typeof root.message === "string"
        ? root.message
        : "Upstream failure";

  // Preserve upstream error semantics:
  // - context_length_exceeded → 400 (client can retry with smaller context)
  // - rate_limit_exceeded → 429 (client should back off)
  // - Everything else → 502 (upstream failure)
  const isContextOverflow = code === "context_length_exceeded";
  const isRateLimit = code === "rate_limit_exceeded" || code === "rate_limited";
  let status: number;
  let type: string;
  if (isRateLimit) {
    status = 429;
    type = "rate_limit_error";
  } else if (isContextOverflow) {
    status = 400;
    type = "invalid_request_error";
  } else {
    status = 502;
    type = fallbackType;
  }

  return {
    status,
    type,
    code: code || (isRateLimit ? "rate_limit_exceeded" : "bad_gateway"),
    message,
  };
}

export function extractResponsesReasoningSummaryText(item: unknown): string {
  const summary = item && typeof item === "object" ? (item as { summary?: unknown }).summary : null;
  if (!Array.isArray(summary)) return "";
  // #9500 — reasoning summary parts are discrete segments; join with "\n\n"
  // (matches extractThinkingFromContent convention). Filter empties so an
  // empty summary_text element does not produce a dangling separator.
  return summary
    .map((part) => {
      const p = part as { text?: unknown } | null;
      return p && typeof p === "object" && typeof p.text === "string" ? p.text : "";
    })
    .filter((text) => text.length > 0)
    .join("\n\n");
}

// #7095/#7176/#7243 — when Codex exposes a reasoning item only as encrypted
// private reasoning (no plaintext summary), callers may synthesize client-facing
// reasoning summary events from this helper. Reconciles three goals:
//   - #7176: never mutate the upstream item — `encrypted_content` (needed by
//     Codex for subsequent requests) must not be overwritten with a fabricated
//     `summary`.
//   - #7095: real plaintext summaries from upstream are forwarded to chat
//     clients that render a thinking panel.
//   - #7243: when upstream provides no plaintext summary, do NOT fabricate an
//     alarming error-like paragraph into `reasoning_summary_text.delta` — clients
//     would display it as if it were real reasoning. Return empty so synthetic
//     summary events are suppressed; the reasoning item (with `encrypted_content`)
//     still arrives on `response.output_item.done`.
export function getVisibleResponsesReasoningSummaryText(item: unknown): string {
  return extractResponsesReasoningSummaryText(item);
}
