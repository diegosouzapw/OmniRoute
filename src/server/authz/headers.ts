/**
 * Header constants used by the authz pipeline.
 *
 * Middleware adds these headers to the upstream request after a successful
 * auth decision. Route handlers and downstream services read them through
 * the assertAuth() helper instead of re-running auth logic.
 *
 * All header names are lowercase to match Next.js / fetch semantics.
 *
 * IMPORTANT: these headers are stripped from incoming client requests
 * before classification (see pipeline.ts) so a remote caller cannot
 * pre-populate them and impersonate a privileged subject.
 */

export const AUTHZ_HEADER_REQUEST_ID = "x-request-id";

export const AUTHZ_HEADER_ROUTE_CLASS = "x-omniroute-route-class";

export const AUTHZ_HEADER_AUTH_KIND = "x-omniroute-auth-kind";
export const AUTHZ_HEADER_AUTH_ID = "x-omniroute-auth-id";
export const AUTHZ_HEADER_AUTH_LABEL = "x-omniroute-auth-label";
export const AUTHZ_HEADER_AUTH_SCOPES = "x-omniroute-auth-scopes";

/** CLI sends this header so the local process can call management APIs without login. */
export const CLI_TOKEN_HEADER = "x-omniroute-cli-token";

/**
 * The real TCP peer IP, stamped by the custom Node server BEFORE Next runs
 * (scripts/dev/peer-stamp.mjs), formatted as `<token>|<ip>`. The middleware has
 * no socket, so this is the only trustworthy locality signal — but ONLY when the
 * token matches this process's OMNIROUTE_PEER_STAMP_TOKEN (see
 * policies/management.ts → resolveStampedPeer). Any client-supplied value is
 * deleted by the server before stamping, and this header is stripped from the
 * forwarded request in pipeline.ts so it never reaches route handlers/upstream.
 * NEVER decide locality from the Host header — it is fully client-controlled.
 * Keep in sync with PEER_IP_HEADER in scripts/dev/peer-stamp.mjs.
 */
export const PEER_IP_HEADER = "x-omniroute-peer-ip";

/**
 * Trusted locality verdict ("loopback" | "lan" | "remote") that the pipeline
 * computes from the stamped real peer IP and forwards to route handlers. Route
 * code (e.g. cliTokenAuth) reads THIS instead of re-deriving locality from the
 * spoofable Host header. Like the other trusted headers it is stripped from
 * client input and re-set by the pipeline, so a remote caller cannot forge it.
 */
export const AUTHZ_HEADER_PEER_LOCALITY = "x-omniroute-peer-locality";

/**
 * Headers the pipeline must NEVER trust on incoming requests. They are
 * stripped before route classification to prevent header-spoofing attacks.
 */
export const AUTHZ_TRUSTED_HEADERS: ReadonlyArray<string> = [
  AUTHZ_HEADER_ROUTE_CLASS,
  AUTHZ_HEADER_AUTH_KIND,
  AUTHZ_HEADER_AUTH_ID,
  AUTHZ_HEADER_AUTH_LABEL,
  AUTHZ_HEADER_AUTH_SCOPES,
  AUTHZ_HEADER_PEER_LOCALITY,
];
