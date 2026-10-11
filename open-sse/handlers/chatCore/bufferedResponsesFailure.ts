/**
 * HTTP 200 Responses bodies whose status is "failed" are provider errors.
 * finishOk classifies them here, before the success tail translates the body
 * and drops status/error. The same tail covers the initial send and fallbacks.
 */
import type {
  ChatCoreErrorResult,
  NonStreamingProviderLegResult,
  ProviderLegReceipt,
  ProviderLegUsage,
} from "@/lib/skills/toolLoopTypes.ts";
import { normalizeStreamFailurePayload } from "../../utils/streamErrorFormat.ts";

interface BufferedResponsesFailureParams {
  responseBody: Record<string, unknown>;
  provider: string;
  model: string;
  connectionId: string;
  headers: Headers;
  startMs: number;
  startedAt: string;
  upstreamResponse?: Response;
}

interface ReceiptParams {
  httpStatus: number;
  errorType: string | null;
  usage: ProviderLegUsage | null;
  termination: string;
  latencyMs: number;
  startedAt: string;
  endedAt: string;
  connectionId: string;
  model: string;
}

type LegError = (
  status: number,
  message: string,
  originalError?: unknown,
  retryAfterMs?: number | null,
  errorCode?: string,
  errorType?: string,
  opts?: { passthrough?: boolean }
) => ChatCoreErrorResult;

type ExtractUsage = (
  responseBody: Record<string, unknown>,
  provider: string
) => ProviderLegUsage | null;

type PhaseInput = {
  phase: "initial" | "follow-up";
  provider?: string;
};

export function bufferedResponsesFailure<TInput extends PhaseInput>(
  input: TInput,
  params: BufferedResponsesFailureParams,
  helpers: {
    legError: LegError;
    extractUsage: ExtractUsage;
    buildReceipt: (input: TInput, params: ReceiptParams) => ProviderLegReceipt;
  }
): Extract<NonStreamingProviderLegResult, { kind: "error" }> | null {
  // A buffered Responses stream can fail inside HTTP 200. Classify it before
  // translation drops status/error, and before the caller records success.
  if (params.responseBody.object === "response" && params.responseBody.status === "failed") {
    const failure = normalizeStreamFailurePayload({ response: params.responseBody });
    const usage = helpers.extractUsage(params.responseBody, params.provider);
    const message = failure?.message ?? "Upstream failure";
    const status = failure?.status ?? 502;
    const result = helpers.legError(status, message, undefined, null, failure?.code, failure?.type);
    result.rawMessage = message;
    result.upstreamHeaders = params.upstreamResponse?.headers ?? params.headers;
    result.upstreamErrorBody = params.responseBody;
    return {
      kind: "error",
      result,
      usage,
      receipt: helpers.buildReceipt(input, {
        httpStatus: status,
        errorType: failure?.code ?? null,
        usage,
        termination: "provider_error",
        latencyMs: Date.now() - params.startMs,
        startedAt: params.startedAt,
        endedAt: new Date().toISOString(),
        connectionId: params.connectionId,
        model: params.model,
      }),
    };
  }
  return null;
}
