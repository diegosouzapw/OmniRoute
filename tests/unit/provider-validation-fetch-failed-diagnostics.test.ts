// Repro for #14309 — "all provider validation fails with 'fetch failed'".
//
// open-sse/utils/proxyFetch.ts already computes a rich diagnostic string
// (dispatcher cause + native-fallback cause, including the real DNS/socket
// error code) whenever BOTH the pooled undici dispatcher path AND the
// native-fetch fallback fail, and attaches it to the thrown error as
// `.proxyFetchDetail` (open-sse/utils/proxyFetch.ts:953-961; proven attached
// by the existing tests/unit/proxyfetch-undici-retry.test.ts).
//
// That thrown error then reaches safeOutboundFetch()'s catch block
// (src/shared/network/safeOutboundFetch.ts::normalizeFetchFailure), which
// wraps it into a `SafeOutboundFetchError` whose `.message` is copied from
// the ORIGINAL error's generic "fetch failed" message and whose `.cause` is
// the original error (carrying `.proxyFetchDetail`).
//
// `toValidationErrorResult()` in src/lib/providers/validation/transport.ts
// — the function that turns that thrown error into the JSON body
// `/api/providers/validate` sends to the dashboard — only ever reads
// `error.message`. It never looks at `error.cause`, so the diagnostic detail
// that was carefully computed two layers down is silently discarded before
// it ever reaches the user, and the dashboard always shows the bare,
// non-actionable "fetch failed" string regardless of the real underlying
// cause (DNS failure, connection refused, TLS error, etc.) — exactly what
// #14309 reports.
import { test } from "node:test";
import assert from "node:assert/strict";
import { toValidationErrorResult } from "../../src/lib/providers/validation/transport";
import { SafeOutboundFetchError } from "../../src/shared/network/safeOutboundFetch";

test("toValidationErrorResult should surface the computed proxyFetchDetail diagnosis (via error.cause) instead of the generic 'fetch failed' message (#14309)", () => {
  // Mirrors exactly what proxyFetch.ts's native-fallback-also-failed branch
  // attaches to the original error (open-sse/utils/proxyFetch.ts:955-958).
  const nativeError = new Error("fetch failed") as Error & { proxyFetchDetail?: string };
  nativeError.proxyFetchDetail =
    "dispatcher=[fetch failed code=UND_ERR_SOCKET] native=[getaddrinfo ENOTFOUND api.mistral.ai code=ENOTFOUND syscall=getaddrinfo]";

  // Mirrors exactly what safeOutboundFetch.ts's normalizeFetchFailure() produces
  // for a generic (non-SafeOutboundFetchError, non-FetchTimeoutError) transport
  // failure: message copied from the original error, cause = the original error.
  const wrapped = new SafeOutboundFetchError(nativeError.message, {
    code: "NETWORK_ERROR",
    url: "https://api.mistral.ai/v1/models",
    method: "GET",
    attempts: 1,
    isRetryable: true,
    cause: nativeError,
  });

  const result = toValidationErrorResult(wrapped);

  assert.notEqual(
    result.error,
    "fetch failed",
    "expected behavior: a concrete transport diagnosis was computed two layers down (error.cause.proxyFetchDetail), so the response must not collapse to the bare, non-actionable 'fetch failed' string"
  );
  assert.match(
    result.error || "",
    /ENOTFOUND|UND_ERR_SOCKET/,
    "expected behavior: the underlying DNS/socket error code should reach the dashboard so the operator can actually diagnose the failure"
  );
});
