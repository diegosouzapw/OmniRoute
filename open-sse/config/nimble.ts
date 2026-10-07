/**
 * Nimble shared client constants.
 *
 * Nimble asks every integration to identify itself with a stable client-source
 * header so calls can be attributed to the host product. Both Nimble surfaces
 * in OmniRoute — search (`POST /v1/search`, wired in open-sse/handlers/search.ts)
 * and fetch (`POST /v1/extract`, open-sse/executors/nimble-fetch.ts) — send it,
 * and both read the value from here so the two can never drift apart.
 *
 * Docs: https://docs.nimbleway.com/api-reference/introduction
 */

/** Header Nimble uses to attribute a request to the calling product. */
export const NIMBLE_CLIENT_SOURCE_HEADER = "X-Client-Source";

/** The value OmniRoute sends. Do not vary it per surface or per request. */
export const NIMBLE_CLIENT_SOURCE = "omniroute";
