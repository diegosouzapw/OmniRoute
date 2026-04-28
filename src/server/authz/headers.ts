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
];
