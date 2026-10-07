import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

import { CORS_HEADERS } from "../utils/cors";

const JSON_HEADERS = { ...CORS_HEADERS, "Content-Type": "application/json" };

/**
 * `Retry-After` floors for the retryable 503s — the pre-#12135 fixed values. A caller
 * passes an occupancy-derived hint (`ChatAdmissionController#retryAfterSeconds`) and the
 * header carries whichever is larger, so an idle gate still answers exactly as before
 * while a gate whose leases have been busy for a whole SSE stream stops inviting a
 * 1-second retry storm.
 */
const BYTE_STAGE_RETRY_AFTER_FLOOR_SECONDS = 2;
const STRUCTURAL_RETRY_AFTER_FLOOR_SECONDS = 1;

function retryAfterHeader(floorSeconds: number, hintSeconds: number | undefined): string {
  const hint = Number.isFinite(hintSeconds) ? Math.ceil(hintSeconds as number) : 0;
  return String(Math.max(floorSeconds, hint));
}

export function chatAdmissionRejectionResponse(
  status: 413 | 503,
  hardMaxBytes: number,
  retryAfterSeconds?: number
): Response {
  const isPayload = status === 413;
  const headers: Record<string, string> = { ...JSON_HEADERS };
  if (!isPayload) {
    headers["Retry-After"] = retryAfterHeader(
      BYTE_STAGE_RETRY_AFTER_FLOOR_SECONDS,
      retryAfterSeconds
    );
  }
  const message = isPayload
    ? `Request body too large for chat completions (max ${Math.floor(
        hardMaxBytes / (1024 * 1024)
      )} MB).`
    : "Chat admission capacity is temporarily unavailable. Retry shortly.";
  return new Response(
    JSON.stringify(
      buildErrorBody(status, message, undefined, {
        type: isPayload ? "payload_too_large" : "server_error",
        code: isPayload ? "PAYLOAD_TOO_LARGE" : "chat_admission_busy",
      })
    ),
    { status, headers }
  );
}

export function bodyExceedsBudgetResponse(maxInflightBytes: number): Response {
  const maxMiB = Math.max(1, Math.floor(maxInflightBytes / (1024 * 1024)));
  return new Response(
    JSON.stringify(
      buildErrorBody(
        413,
        `Request body exceeds the chat ingest budget (max ${maxMiB} MB).`,
        undefined,
        { type: "payload_too_large", code: "body_exceeds_budget" }
      )
    ),
    { status: 413, headers: JSON_HEADERS }
  );
}

export function resourcePressureRejectionResponse(): Response {
  return new Response(
    JSON.stringify(
      buildErrorBody(
        503,
        "Service temporarily unavailable due to resource pressure. Retry shortly.",
        undefined,
        { type: "server_error", code: "resource_pressure" }
      )
    ),
    { status: 503, headers: { ...JSON_HEADERS, "Retry-After": "2" } }
  );
}

export function structuralRejectionResponse(
  status: 413 | 503,
  maxMessages: number,
  retryAfterSeconds?: number
): Response {
  const historyLimit = status === 413;
  const headers: Record<string, string> = { ...JSON_HEADERS };
  if (!historyLimit) {
    headers["Retry-After"] = retryAfterHeader(
      STRUCTURAL_RETRY_AFTER_FLOOR_SECONDS,
      retryAfterSeconds
    );
  }
  const body = buildErrorBody(
    status,
    historyLimit
      ? `Chat history exceeds the ${maxMessages}-message limit; compact the conversation and retry.`
      : "Local chat admission capacity is busy for this structurally heavy request; upstream provider routing was not attempted. Retry shortly.",
    undefined,
    {
      type: historyLimit ? "payload_too_large" : "server_error",
      code: historyLimit ? "chat_history_too_large" : "chat_admission_busy",
      reason: historyLimit ? "message_limit" : "structure_limit",
    }
  );
  return new Response(JSON.stringify(body), { status, headers });
}
