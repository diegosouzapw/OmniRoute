/**
 * UC (uncensored.com) PERSONA path — wire constants.
 *
 * UC is a consumer subscription app (uncensored.com) whose un-metered "persona"
 * chat runs over a WebSocket to its inference backend. There is no public API on
 * this path: auth is a short-lived Clerk `__session` JWT minted from a durable
 * `__client` cookie, passed as the `?token=` query param on the socket URL.
 *
 * All values below are capture-confirmed (UC-PERSONA-WS-OMNIROUTE-SPEC.md /
 * UC-AUTH-AND-EMAIL-LOGIN.md) and match the proven reference client.
 */

/** Clerk Frontend API host (auth: token mint, session touch, email sign-in). */
export const UC_CLERK_FAPI = "https://clerk.uncensored.com";

/** Clerk JS version echoed as `?_clerk_js_version` on every Clerk call. */
export const UC_CLERK_JS_VERSION = "5.127.1";

/** Clerk API version echoed as `?__clerk_api_version` on sign-in calls. */
export const UC_CLERK_API_VERSION = "2025-11-10";

/** Origin the UC web app sends; Clerk + the WS backend both check it. */
export const UC_ORIGIN = "https://uncensored.com";

/** WebSocket inference backend base (persona/non-direct + direct both ride this). */
export const UC_WS_HOST = "wss://internal-6.pubyar.com/ws";

/**
 * Synthetic base URL for the registry entry. UC persona has no HTTP chat
 * endpoint (it is a WebSocket), so this is a marker the executor recognizes; it
 * is never fetched. Mirrors the muse-spark-web pattern of a nominal baseUrl.
 */
export const UC_BASE_URL = "https://internal-6.pubyar.com";

/** Refresh a 60s `__session` JWT this many seconds before its `exp`. */
export const UC_TOKEN_REFRESH_SKEW_S = 8;

/** Default per-turn WebSocket timeout (ms). */
export const UC_WS_TIMEOUT_MS = 120_000;

/** The web app version string the persona frame carries. */
export const UC_APP_VERSION = "1.0.0-web";

/**
 * TTS (text-to-speech) WebSocket backend base. Distinct host from the persona
 * chat WS (pubyar.com); the full URL is `${UC_TTS_WS_HOST}/{uid}?token={jwt}`.
 * Same Clerk-JWT-in-query-param auth + `Origin: https://uncensored.com`
 * handshake header as the chat socket (see UC-MEDIA-GENERATION.md).
 */
export const UC_TTS_WS_HOST = "wss://tts-stream.chatuncensored.ai";

/** Default UC TTS voice (capture-confirmed; others presumably exist). */
export const UC_TTS_DEFAULT_VOICE = "jade";

/** Default UC TTS model tier carried in the `start` frame. */
export const UC_TTS_DEFAULT_MODEL = "default";

/** Default per-request UC TTS WebSocket timeout (ms). */
export const UC_TTS_WS_TIMEOUT_MS = 120_000;
