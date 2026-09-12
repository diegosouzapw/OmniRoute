import { getTlsFirstByteWatchdogMs } from "@/shared/utils/runtimeTimeouts";
import { guardFirstByte } from "./firstByteWatchdog.ts";

// #12656 — the wreq-js TLS-fingerprint transport resolves the Response as
// soon as upstream headers arrive, with zero protection around how long the
// caller then waits for the body's first byte. The only timing guard on that
// path, TlsClient's flat `timeout`, defaults to 600_000ms — matching the
// reported 90-600s stall window exactly. This module races the body's first
// `read()` against a short, env-overridable watchdog: a healthy body is
// completely unaffected (bytes already buffered are replayed through a
// passthrough stream, nothing is dropped), while a body that never yields
// within the deadline cancels the wreq reader and throws so the caller
// (proxyFetch's existing TLS-fallback catch blocks) can fall back to the
// direct/proxy dispatcher instead of hanging for minutes.

export const TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE = "TLS_FIRST_BYTE_WATCHDOG_TIMEOUT";

export function isTlsFirstByteWatchdogTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    (err as { code?: unknown }).code === TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE
  );
}

/**
 * Guard a TLS-fingerprint Response's first body byte with a short watchdog.
 * Resolves with an equivalent Response whose body has already produced at least one byte, or
 * throws TLS_FIRST_BYTE_WATCHDOG_TIMEOUT after cancelling the reader so the caller can fall back
 * to another transport.
 */
export function guardTlsFirstByte(
  response: Response,
  timeoutMs: number = getTlsFirstByteWatchdogMs()
): Promise<Response> {
  return guardFirstByte(response, {
    timeoutMs,
    code: TLS_FIRST_BYTE_WATCHDOG_TIMEOUT_CODE,
    message: (ms) => `TLS fingerprint transport produced no first byte within ${ms}ms`,
  });
}
