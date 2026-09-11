import type { RequestPipelinePayloads } from "@omniroute/open-sse/utils/requestLogger.ts";
import { classifyProviderError } from "@omniroute/open-sse/services/errorClassifier.ts";
import {
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "@omniroute/open-sse/utils/errorSanitization.ts";
import { sanitizePII } from "../../piiSanitizer";
import {
  omitEncryptedReasoningFromLogChunks,
  protectErrorPayloadForLog,
  protectPayloadForLog,
  sanitizeErrorFramesFromLogChunks,
} from "../../logPayloads";
import type { CallLogDetailState } from "../callLogArtifacts";
// #7879: re-export the canonical helper so existing consumers of this module
// keep importing `toNumber` from here unchanged.
export { toNumber } from "@/shared/utils/numeric";

type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function truncateText(value: string, maxLength: number) {
  return value.length > maxLength ? value.slice(0, maxLength) : value;
}

export function parseInlineError(value: unknown): unknown {
  if (typeof value !== "string" || value.trim().length === 0) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export function normalizeDetailState(value: unknown): CallLogDetailState {
  if (
    value === "ready" ||
    value === "missing" ||
    value === "corrupt" ||
    value === "legacy-inline"
  ) {
    return value;
  }
  return "none";
}

export function sanitizeErrorForLog(error: unknown): unknown {
  if (error === null || error === undefined) return null;
  if (typeof error === "string") {
    return sanitizePII(sanitizeErrorMessage(error)).text;
  }
  try {
    if (error instanceof Error) {
      const message = sanitizePII(sanitizeErrorMessage(error.message)).text;
      const stack = sanitizePII(sanitizeErrorMessage(error.stack || "")).text;
      const name = sanitizeErrorMessage(error.name) || "Error";
      return {
        message,
        ...(stack ? { stack } : {}),
        name,
      };
    }
    return protectPayloadForLog(sanitizeUpstreamDetails(error));
  } catch {
    return "[REDACTED]";
  }
}

export function toStoredErrorSummary(error: unknown): string | null {
  const sanitized = sanitizeErrorForLog(error);
  if (sanitized === null || sanitized === undefined) return null;

  if (typeof sanitized === "string") {
    return truncateText(sanitized, 4000);
  }

  try {
    return truncateText(JSON.stringify(sanitized), 4000);
  } catch {
    return truncateText(String(sanitized), 4000);
  }
}

export function protectPipelinePayloads(
  payloads: unknown,
  responseStatus?: unknown
): RequestPipelinePayloads | null {
  if (!payloads || typeof payloads !== "object") return null;

  const protectedPayloads: RequestPipelinePayloads = {};
  for (const [key, value] of Object.entries(payloads as JsonRecord)) {
    if (value === null || value === undefined) continue;

    if (key === "streamChunks" && value && typeof value === "object") {
      const chunks = value as Record<string, unknown>;
      const compacted = Object.fromEntries(
        Object.entries(chunks)
          .filter(([, chunkValue]) => Array.isArray(chunkValue) && chunkValue.length > 0)
          .map(([stage, chunkValue]) => [
            stage,
            sanitizeErrorFramesFromLogChunks(
              omitEncryptedReasoningFromLogChunks(chunkValue as string[])
            ),
          ])
      );
      if (Object.keys(compacted).length > 0) {
        protectedPayloads.streamChunks = protectPayloadForLog(
          compacted
        ) as RequestPipelinePayloads["streamChunks"];
      }
      continue;
    }

    if (key === "providerResponse" || key === "clientResponse") {
      const response = asRecord(value);
      const status = Number(response.status ?? responseStatus);
      if (Number.isFinite(status) && status >= 400 && status <= 599) {
        const projectedResponse =
          "body" in response
            ? { ...response, body: protectErrorPayloadForLog(response.body) }
            : protectErrorPayloadForLog(value);
        protectedPayloads[key as "providerResponse" | "clientResponse"] = protectPayloadForLog(
          projectedResponse
        ) as RequestPipelinePayloads["providerResponse"];
        continue;
      }
    }

    protectedPayloads[key as keyof RequestPipelinePayloads] = protectPayloadForLog(value) as never;
  }

  return Object.keys(protectedPayloads).length > 0 ? protectedPayloads : null;
}

export function buildRequestSummary(
  requestType: string | null,
  requestBody: unknown
): string | null {
  if (requestType !== "search") return null;

  const body = asRecord(requestBody);
  if (Object.keys(body).length === 0) return null;

  const summary: JsonRecord = {};
  if (typeof body.query === "string" && body.query.trim().length > 0) {
    summary.query = sanitizePII(body.query).text;
  }

  const filters = Object.fromEntries(
    Object.entries(body).filter(([key]) => key !== "query" && key !== "provider")
  );
  if (Object.keys(filters).length > 0) {
    summary.filters = filters;
  }

  if (Object.keys(summary).length === 0) return null;
  return JSON.stringify(summary);
}

// #10670: per-call error family at the single write point. Reuses the
// production classifier (chatCore.ts:3974, auth.ts:2598) so the persisted
// vocabulary is exactly PROVIDER_ERROR_TYPES. Successes (status < 400 with no
// error text) short-circuit to null — the classifier never returns a family
// for them anyway, this only skips the call.
// Normalization: strings pass through, Error objects yield .message, any other
// object yields "" (no caller passes plain objects — verified: 35 callers use
// strings and Error only). Deliberate deviation from design §4 ("objet →
// JSON.stringify"): a stringified object carries no classifier signal.
export function classifyCallLogError(
  status: number,
  error: unknown,
  provider?: string | null
): string | null {
  const errorText = typeof error === "string" ? error : error instanceof Error ? error.message : "";
  if (status < 400 && errorText.length === 0) return null;
  return classifyProviderError(status, errorText, provider);
}
