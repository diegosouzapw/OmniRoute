import { readHeaderValue } from "./auth.ts";

type AuthRequestHeaders = Headers | Record<string, string | string[] | undefined>;

/**
 * Issue #7034: `gemini-cli` (and any `@google/genai`-based client) sends its
 * credential exclusively via `x-goog-api-key`, and it is not
 * client-configurable to use `Authorization`/`x-api-key` instead — accept it
 * unconditionally, mirroring the existing `x-api-key` fallback shape, just
 * without an `anthropic-version`-style gate (the header name is unambiguous).
 *
 * Extracted to its own module so the two call sites — the real enforcement
 * gate in `src/server/authz/policies/clientApi.ts::extractBearer()` and the
 * general extractor `extractApiKey()` in `./auth.ts` — stay in lockstep
 * without growing the frozen `auth.ts` file (`config/quality/file-size-baseline.json`).
 */
export function extractGoogApiKeyHeader(
  headers: AuthRequestHeaders | null | undefined
): string | null {
  return readHeaderValue(headers, "x-goog-api-key") || readHeaderValue(headers, "X-Goog-Api-Key");
}
