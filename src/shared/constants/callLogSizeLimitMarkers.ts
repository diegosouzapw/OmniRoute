// Sentinel markers written by src/lib/usage/callLogArtifacts.ts when a call-log
// artifact's request/response body or pipeline payload had to be dropped because
// it exceeded the configured size cap (CALL_LOG_PIPELINE_MAX_SIZE_KB /
// MAX_CALL_LOG_ARTIFACT_BYTES). Kept here — not inside callLogArtifacts.ts, which
// pulls in `fs`/`path` and cannot be imported by a client component — so the
// artifact writer and the request-log detail view (RequestLoggerDetail.tsx) share
// one definition of "this is a size-limit omission" instead of each guessing at
// the shape independently (see issue #13894: the previous frontend rendered the
// pipeline marker verbatim as if it were a real upstream error).

export const CALL_LOG_SIZE_LIMIT_REASON = "call_log_artifact_size_limit_exceeded";

export const CALL_LOG_BODY_OMITTED_FOR_SIZE_LIMIT =
  "[omitted: call log artifact size limit exceeded]";

export const CALL_LOG_STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT =
  "[stream chunks omitted: call log artifact size limit exceeded]";

/**
 * True for a placeholder a size-limit fallback wrote in place of a real
 * requestBody/responseBody/stream-chunk payload.
 */
export function isSizeLimitOmissionMarker(value: unknown): boolean {
  return (
    value === CALL_LOG_BODY_OMITTED_FOR_SIZE_LIMIT ||
    value === CALL_LOG_STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT
  );
}

/**
 * True for the `pipeline.error` marker object omitOversizedPipeline() writes in
 * place of the real pipeline payload once it exceeds CALL_LOG_PIPELINE_MAX_SIZE_KB.
 * Checked by shape (not just truthiness) so a real upstream error that happens to
 * be named `error` is never mistaken for the size-limit marker.
 */
export function isPipelineSizeLimitMarker(pipelineError: unknown): boolean {
  if (!pipelineError || typeof pipelineError !== "object") return false;
  const candidate = pipelineError as { _omniroute_truncated?: unknown; reason?: unknown };
  return candidate._omniroute_truncated === true && candidate.reason === CALL_LOG_SIZE_LIMIT_REASON;
}
