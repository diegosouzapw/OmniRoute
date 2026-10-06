/**
 * playgroundAuth — shared helpers so the dashboard mini-playgrounds authenticate
 * upstream requests via the dashboard session instead of a raw Bearer token.
 *
 * `/api/keys` only ever exposes MASKED key values (sk-xxxx****yyyy — see
 * `maskStoredApiKey` in `src/lib/apiKeyExposure.ts`). Sending that masked
 * string as `Authorization: Bearer` is never a valid credential and 401s
 * under `REQUIRE_API_KEY` (#9935). The fix mirrors `LlmChatCard.tsx` (#3503):
 * requests go out with `credentials: "same-origin"` and no Bearer header: the
 * gateway falls through to the dashboard session. When a specific key is
 * selected we forward only its id via `PLAYGROUND_KEY_ID_HEADER` so the
 * gateway can still apply that key's policy (allowed_models, etc.)
 * server-side — the secret itself never reaches the browser.
 */

/** Header used to test a specific API key's policy from the dashboard playground
 *  without exposing the key secret to the browser — the gateway resolves the key
 *  by id server-side (see enforceApiKeyPolicy). */
export const PLAYGROUND_KEY_ID_HEADER = "x-omniroute-playground-key-id";

/**
 * Map the playground's masked key selection (sk-xxxx****yyyy, as returned by
 * `/api/keys`) back to its key id. The id — never the secret — is sent to the
 * gateway so it can apply that key's policy (allowed_models, etc.) server-side.
 * Returns null when there is no match, which falls through to the dashboard
 * session (full access, any model).
 */
export function resolvePlaygroundKeyId(
  selectedMaskedKey: string,
  keys: { id: string; key: string }[]
): string | null {
  if (!selectedMaskedKey) return null;
  return keys.find((k) => k.key === selectedMaskedKey)?.id ?? null;
}
