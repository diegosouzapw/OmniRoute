/**
 * Build a generic client error and a privacy-safe diagnostic for non-ok
 * Antigravity/agy upstream responses (#3229).
 *
 * The provider body is never forwarded or stored. Diagnostics use a fixed
 * allowlist of scalar envelope fields and classifications; arbitrary text,
 * nested details, identifiers, and request-derived values are discarded.
 */
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import { isGeoBlockedError } from "../services/errorClassifier.ts";

// The dashboard "Test Connection" for antigravity only probes the OAuth userinfo
// endpoint (https://www.googleapis.com/oauth2/v1/userinfo), which is NOT
// geo-restricted — so a green tick does not prove the model path works. Spell
// this out in the geo-block message so operators stop chasing accounts.
// The hint is a fixed literal: it is emitted verbatim and never interpolates
// provider-derived text (#3229).
const GEO_BLOCKED_HINT =
  "The Cloud Code API is not offered from this server's current egress location " +
  '("User location is not supported for the API use."). This is not an account ' +
  "problem: the connection test only validates the Google OAuth token and does not " +
  "call the model API. Route antigravity/agy egress through a proxy in a " +
  "supported region (e.g. US/EU) or use a different provider.";

const MAX_DIAGNOSTIC_TOKEN_LENGTH = 96;
const SAFE_DIAGNOSTIC_TOKEN = /^[A-Za-z][A-Za-z0-9_.-]*$/;

type ValidationCategory =
  | "content_shape"
  | "mixed_tool_types"
  | "policy_rejection"
  | "system_instruction"
  | "thought_signature"
  | "tool_name"
  | "tool_pairing"
  | "tool_schema"
  | "unknown_validation";

type ValidationField = "contents" | "system_instruction" | "thought_signature" | "tools";

type SchemaKeyword =
  | "$ref"
  | "additionalProperties"
  | "allOf"
  | "anyOf"
  | "const"
  | "enum"
  | "format"
  | "items"
  | "oneOf"
  | "properties"
  | "required"
  | "type";

export type AntigravityValidationDiagnostic = {
  httpStatus: number;
  providerCode?: number | string;
  providerStatus?: string;
  providerReason?: string;
  validationCategory?: ValidationCategory;
  validationField?: ValidationField;
  schemaKeyword?: SchemaKeyword;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function readFirst(record: Record<string, unknown>, keys: readonly string[]): unknown {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(record, key)) return record[key];
  }
  return undefined;
}

function sanitizeDiagnosticToken(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const candidate = value.trim();
  if (
    !candidate ||
    candidate.length > MAX_DIAGNOSTIC_TOKEN_LENGTH ||
    !SAFE_DIAGNOSTIC_TOKEN.test(candidate)
  ) {
    return undefined;
  }
  // Sanitization is a second gate, never a repair. `sanitizeErrorMessage` redacts in place, so
  // running it FIRST lets "BAD_REQUEST\nAuthorization: Bearer <token>" collapse into the
  // token-shaped "BAD_REQUEST" and be projected as though the provider had sent only that.
  // Reject anything that is not ALREADY a bare token, and anything sanitization would still alter.
  const sanitized = sanitizeErrorMessage(candidate).trim();
  return sanitized === candidate ? candidate : undefined;
}

function sanitizeProviderCode(value: unknown): number | string | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  return sanitizeDiagnosticToken(value);
}

function readClassificationText(
  error: Record<string, unknown>,
  root: Record<string, unknown>
): string {
  const values = [
    readFirst(error, ["message"]),
    readFirst(error, ["reason", "validationReason", "validation_reason"]),
    readFirst(root, ["message"]),
    readFirst(root, ["reason", "validationReason", "validation_reason"]),
  ];
  return values
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .toLowerCase();
}

function classifyValidation(text: string): ValidationCategory | undefined {
  if (!text) return undefined;
  if (/safety|policy|prohibited|cybersecurity risk/.test(text)) return "policy_rejection";
  if (/thought[_ -]?signature/.test(text)) return "thought_signature";
  if (
    /(built[ -]?in|google[_ -]?search|code[_ -]?execution).*(function|custom tool)/.test(text) ||
    /(function|custom tool).*(built[ -]?in|google[_ -]?search|code[_ -]?execution)/.test(text)
  ) {
    return "mixed_tool_types";
  }
  if (/function[_ -]?(call|response)|tool[_ -]?(use|result)|tool (call|result)/.test(text)) {
    return "tool_pairing";
  }
  // Deliberately narrow. A loose `function.*name` also swallows Gemini's most common SCHEMA
  // complaint — "Invalid JSON payload received. Unknown name \"additionalProperties\" at
  // 'tools[0].function_declarations[0].parameters'" — and would point the repair at tool naming
  // when the actual defect is the JSON Schema we emit. Only an explicit name-validity phrase or
  // an indexed `.name` path counts here.
  if (
    /(function|tool)[_ -]?declarations?\[\d+\][.\]]?\.?name/.test(text) ||
    /(invalid|unsupported|malformed|duplicate) (function|tool)[_ -]?name/.test(text) ||
    /(function|tool)[_ -]?name.{0,40}(invalid|not valid|must (start|match|be|contain)|too long)/.test(
      text
    )
  ) {
    return "tool_name";
  }
  if (
    /function[_ -]?declarations?|json schema|parameters|additionalproperties|\$ref|oneof|anyof|allof/.test(
      text
    ) ||
    /tools?\[/.test(text)
  ) {
    return "tool_schema";
  }
  if (/system[_ -]?instruction/.test(text)) return "system_instruction";
  if (/contents?\[|invalid role|parts?\[/.test(text)) return "content_shape";
  return undefined;
}

function validationFieldFor(category: ValidationCategory | undefined): ValidationField | undefined {
  if (category === "thought_signature") return "thought_signature";
  if (category === "system_instruction") return "system_instruction";
  if (category === "content_shape" || category === "tool_pairing") return "contents";
  if (category === "mixed_tool_types" || category === "tool_name" || category === "tool_schema") {
    return "tools";
  }
  return undefined;
}

const SCHEMA_KEYWORDS: ReadonlyArray<[RegExp, SchemaKeyword]> = [
  [/additionalproperties/i, "additionalProperties"],
  [/\$ref/i, "$ref"],
  [/\boneof\b/i, "oneOf"],
  [/\banyof\b/i, "anyOf"],
  [/\ballof\b/i, "allOf"],
  [/\bproperties\b/i, "properties"],
  [/\brequired\b/i, "required"],
  [/\bitems\b/i, "items"],
  [/\bformat\b/i, "format"],
  [/\bconst\b/i, "const"],
  [/\benum\b/i, "enum"],
  [/\btype\b/i, "type"],
];

function findSchemaKeyword(text: string): SchemaKeyword | undefined {
  for (const [pattern, keyword] of SCHEMA_KEYWORDS) {
    if (pattern.test(text)) return keyword;
  }
  return undefined;
}

/**
 * Project an upstream body to bounded, non-user-controlled diagnostic labels.
 * Never add a general-purpose field here: every emitted value must be either a
 * finite number, a restricted token, or one of the fixed classifications above.
 */
export function projectAntigravityValidationDiagnostic(
  httpStatus: number,
  rawBody: string
): AntigravityValidationDiagnostic {
  const diagnostic: AntigravityValidationDiagnostic = { httpStatus };

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawBody);
  } catch {
    return diagnostic;
  }

  const root = asRecord(parsed);
  if (!root) return diagnostic;
  const error = asRecord(root.error) ?? root;

  const providerCode = sanitizeProviderCode(readFirst(error, ["code"]));
  if (providerCode !== undefined) diagnostic.providerCode = providerCode;

  const providerStatus = sanitizeDiagnosticToken(readFirst(error, ["status"]));
  if (providerStatus !== undefined) diagnostic.providerStatus = providerStatus;

  const providerReason = sanitizeDiagnosticToken(
    readFirst(error, ["reason", "validationReason", "validation_reason"])
  );
  if (providerReason !== undefined) diagnostic.providerReason = providerReason;

  const classificationText = readClassificationText(error, root);
  let validationCategory = classifyValidation(classificationText);
  if (!validationCategory && (httpStatus === 400 || providerStatus === "INVALID_ARGUMENT")) {
    validationCategory = "unknown_validation";
  }
  if (validationCategory) diagnostic.validationCategory = validationCategory;

  const validationField = validationFieldFor(validationCategory);
  if (validationField) diagnostic.validationField = validationField;

  if (validationCategory === "tool_schema") {
    const schemaKeyword = findSchemaKeyword(classificationText);
    if (schemaKeyword) diagnostic.schemaKeyword = schemaKeyword;
  }

  return diagnostic;
}

export function buildAntigravityUpstreamError(
  status: number,
  _statusText: string,
  rawBody: string
) {
  // Keep provider-derived diagnostics internal. The client receives only fixed,
  // sanitized text and the actual HTTP status; no upstream prose or details.
  if (isGeoBlockedError(rawBody)) {
    return buildErrorBody(status, `Antigravity upstream error (${status}). ${GEO_BLOCKED_HINT}`);
  }
  return buildErrorBody(status, `Antigravity upstream error (${status})`);
}

/**
 * True for the providers whose terminal error bodies are diagnosed but never retained.
 *
 * Google's Gemini / Code-Assist errors are free-form and can echo request content — schema
 * fragments, tool names, occasionally prompt text — so for Antigravity the raw body must
 * reach neither the persisted call log nor the client error envelope, and its response
 * headers are account/project scoped so they stay out of the log too. Rate-limit and quota
 * parsing still read the body in memory; only what is RETAINED changes.
 */
export function isAntigravityProvider(provider: string): boolean {
  return provider === "antigravity" || provider === "agy";
}

/**
 * Wrap an already-projected classification in the shape persisted under `providerResponse`.
 *
 * Accepts only the output of {@link projectAntigravityValidationDiagnostic}. Handing it a raw
 * provider payload would defeat the projection this whole path exists to enforce, so callers
 * keep the result in its own binding rather than reading it back out of a wider union.
 */
export function toAntigravityDiagnosticPayload(
  diagnostic: Record<string, unknown> | undefined
): { antigravityValidation: Record<string, unknown> } | null {
  return diagnostic ? { antigravityValidation: diagnostic } : null;
}
