// Pure, stateless helpers for the OpenAI Responses <-> Chat response translator.
// Extracted verbatim from response/openai-responses.ts (no host imports, no stream state).

export function normalizeToolName(value) {
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
function jsonValuesEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function hasUsableSchema(schema) {
  return !!(schema && typeof schema === "object" && !Array.isArray(schema));
}

function schemaProperties(schema) {
  return hasUsableSchema(schema) && schema.properties && typeof schema.properties === "object"
    ? schema.properties
    : null;
}

function schemaRequiredSet(schema) {
  return new Set(hasUsableSchema(schema) && Array.isArray(schema.required) ? schema.required : []);
}

function isEmptyToolArgValue(entry) {
  return entry === "" || (Array.isArray(entry) && entry.length === 0);
}

// True when `entry` strictly equals the property's declared JSON Schema `default` — an
// emitted value indistinguishable from omission, safe to drop for any tool.
function matchesSchemaDefault(propSchema, entry) {
  if (!propSchema || !Object.prototype.hasOwnProperty.call(propSchema, "default")) return false;
  return jsonValuesEqual(entry, propSchema.default);
}

// True when `entry` is empty and either the tool is on the legacy allowlist, or the
// schema declares this property but does not mark it `required` (generalized #6951 rule).
function isDroppableEmptyEntry(entry, propSchema, required, key, allowlisted) {
  if (!isEmptyToolArgValue(entry)) return false;
  return allowlisted || (propSchema != null && !required.has(key));
}

function stripEmptyOptionalToolArgsObject(value, toolName, schema) {
  const properties = schemaProperties(schema);
  const required = schemaRequiredSet(schema);
  const allowlisted = STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName);

  const cleaned = { ...value };
  for (const [key, entry] of Object.entries(cleaned)) {
    const propSchema = properties ? properties[key] : null;
    if (
      matchesSchemaDefault(propSchema, entry) ||
      isDroppableEmptyEntry(entry, propSchema, required, key, allowlisted)
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
export function stripEmptyOptionalToolArgs(value, toolName, schema) {
  if (value == null) return value;

  if (typeof value === "string") {
    // JSON-string cleanup runs for allowlisted tools, or for any tool once a schema is
    // supplied (schema-aware normalization is not restricted to the allowlist).
    if (!hasUsableSchema(schema) && !STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName)) return value;
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

  return stripEmptyOptionalToolArgsObject(value, toolName, schema);
}

export function normalizeOutputIndex(outputIndex) {
  const normalized = Number(outputIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : 0;
}

export function normalizeUpstreamFailure(data, fallbackType = "server_error") {
  const response = data?.response && typeof data.response === "object" ? data.response : null;
  const error =
    response?.error && typeof response.error === "object"
      ? response.error
      : data?.error && typeof data.error === "object"
        ? data.error
        : null;

  const code = typeof error?.code === "string" ? error.code : "";
  const message =
    typeof error?.message === "string"
      ? error.message
      : typeof data?.message === "string"
        ? data.message
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

export function extractResponsesReasoningSummaryText(item) {
  if (!item || !Array.isArray(item.summary)) return "";
  return item.summary
    .map((part) =>
      part && typeof part === "object" && typeof part.text === "string" ? part.text : ""
    )
    .join("");
}

// #7095/#7176 — when Codex exposes a reasoning item only as encrypted private
// reasoning (no plaintext summary), chat clients would otherwise see nothing in
// their thinking panel. Reconciles two goals that used to be in tension:
//   - #7095 wants a visible placeholder in the chat client.
//   - #7176 wants the upstream response item left untouched, so `encrypted_content`
//     (needed by Codex for subsequent requests) is never overwritten by a
//     fabricated `summary`.
// This function computes the placeholder text WITHOUT mutating `item` — callers
// use the returned text for synthetic client-facing events only.
const ENCRYPTED_REASONING_PLACEHOLDER =
  "Codex is reasoning, but the upstream Responses API exposed this reasoning block only as encrypted private reasoning. OmniRoute cannot recover the plaintext.";

export function getVisibleResponsesReasoningSummaryText(item) {
  const existingSummary = extractResponsesReasoningSummaryText(item);
  if (existingSummary) return existingSummary;

  const hasEncryptedReasoning =
    item &&
    item.type === "reasoning" &&
    typeof item.encrypted_content === "string" &&
    item.encrypted_content.length > 0;

  return hasEncryptedReasoning ? ENCRYPTED_REASONING_PLACEHOLDER : "";
}
