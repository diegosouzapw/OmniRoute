import { sanitizeErrorMessage } from "./error.ts";

export const CODEX_PUBLIC_ERROR_MESSAGE = sanitizeErrorMessage("Codex provider request failed");

export interface CodexPublicError {
  message: string;
  type: string;
  code: string;
}

interface CodexPublicErrorInput {
  status?: number | null;
  type?: unknown;
  code?: unknown;
}

interface CodexPublicErrorRule {
  type: string;
  allowsStatus: (status: number) => boolean;
}

const exactStatuses =
  (...statuses: number[]) =>
  (status: number): boolean =>
    statuses.includes(status);

const CODEX_PUBLIC_ERROR_RULES = new Map<string, CodexPublicErrorRule>([
  ["browser_stream_inconsistent", { type: "server_error", allowsStatus: exactStatuses(502) }],
  ["chatgpt_session_expired", { type: "authentication_error", allowsStatus: exactStatuses(401) }],
  ["chatgpt_submission_ambiguous", { type: "server_error", allowsStatus: exactStatuses(502) }],
  ["chatgpt_submitted_turn_failed", { type: "server_error", allowsStatus: exactStatuses(502) }],
  ["chatgpt_subscription_unavailable", { type: "server_error", allowsStatus: exactStatuses(503) }],
  ["client_cancelled", { type: "invalid_request_error", allowsStatus: exactStatuses(499) }],
  ["client_closed_request", { type: "invalid_request_error", allowsStatus: exactStatuses(499) }],
  ["codex_app_server_turn_failed", { type: "provider_error", allowsStatus: exactStatuses(502) }],
  [
    "compaction_control_unavailable",
    { type: "invalid_request_error", allowsStatus: exactStatuses(409) },
  ],
  [
    "compaction_handoff_failed",
    { type: "invalid_request_error", allowsStatus: exactStatuses(409) },
  ],
  [
    "compaction_source_unavailable",
    { type: "invalid_request_error", allowsStatus: exactStatuses(409) },
  ],
  ["connector_not_found", { type: "connector_error", allowsStatus: exactStatuses(424) }],
  [
    "context_length_exceeded",
    { type: "invalid_request_error", allowsStatus: exactStatuses(400, 413) },
  ],
  ["insufficient_quota", { type: "insufficient_quota", allowsStatus: exactStatuses(429) }],
  ["invalid_api_key", { type: "authentication_error", allowsStatus: exactStatuses(401) }],
  ["invalid_output_schema", { type: "invalid_request_error", allowsStatus: exactStatuses(400) }],
  ["invalid_request_error", { type: "invalid_request_error", allowsStatus: exactStatuses(400) }],
  ["multipart_protocol_violation", { type: "server_error", allowsStatus: exactStatuses(502) }],
  ["origin_rejected", { type: "invalid_request_error", allowsStatus: exactStatuses(403) }],
  ["permission_denied", { type: "permission_error", allowsStatus: exactStatuses(403) }],
  ["prompt_attachment_integrity", { type: "server_error", allowsStatus: exactStatuses(502) }],
  ["rate_limit_exceeded", { type: "rate_limit_error", allowsStatus: exactStatuses(429) }],
  ["server_is_overloaded", { type: "server_error", allowsStatus: exactStatuses(503) }],
  [
    "structured_output_validation_failed",
    { type: "server_error", allowsStatus: exactStatuses(502) },
  ],
  ["subscription_required", { type: "permission_error", allowsStatus: exactStatuses(403) }],
  [
    "upstream_server_error",
    {
      type: "server_error",
      allowsStatus: (status) => status >= 500 && status <= 599 && status !== 503,
    },
  ],
  [
    "upstream_websocket_connect_failed",
    { type: "provider_error", allowsStatus: exactStatuses(502) },
  ],
  ["upstream_websocket_error", { type: "provider_error", allowsStatus: exactStatuses(502) }],
  ["usage_limit_reached", { type: "rate_limit_error", allowsStatus: exactStatuses(429) }],
]);

function defaultPublicClassification(status: number): Pick<CodexPublicError, "type" | "code"> {
  if (status === 429) return { type: "rate_limit_error", code: "rate_limit_exceeded" };
  if (status === 401) return { type: "authentication_error", code: "invalid_api_key" };
  if (status === 403) return { type: "permission_error", code: "permission_denied" };
  if (status === 499) return { type: "invalid_request_error", code: "client_closed_request" };
  if (status === 503) return { type: "server_error", code: "server_is_overloaded" };
  if (status >= 500) return { type: "server_error", code: "upstream_server_error" };
  return { type: "invalid_request_error", code: "invalid_request_error" };
}

/**
 * Project an internally classified Codex failure onto its public Responses contract.
 *
 * Upstream message, code, and type fields are untrusted. The public message is fixed,
 * while code/type retain only closed, protocol-level identifiers already produced by
 * OmniRoute. Everything else falls back to the HTTP status classification.
 */
export function projectCodexPublicError(input: CodexPublicErrorInput): CodexPublicError {
  const status =
    typeof input.status === "number" && Number.isInteger(input.status) ? input.status : 502;
  const fallback = defaultPublicClassification(status);
  const rule =
    typeof input.code === "string" ? CODEX_PUBLIC_ERROR_RULES.get(input.code) : undefined;
  if (!rule || !rule.allowsStatus(status)) {
    return { message: CODEX_PUBLIC_ERROR_MESSAGE, ...fallback };
  }
  return { message: CODEX_PUBLIC_ERROR_MESSAGE, type: rule.type, code: input.code as string };
}
