/**
 * Unified authz type definitions.
 *
 * These types are the canonical contract between the Next.js middleware,
 * the policy layer, and any defense-in-depth helpers used by route handlers.
 *
 * Three classes of HTTP routes are recognized:
 *
 *   - PUBLIC      — explicitly safe routes (login, logout, status, health,
 *                   onboarding bootstrap).
 *   - CLIENT_API  — model-serving and OpenAI/Anthropic-compatible endpoints
 *                   protected by API keys.
 *   - MANAGEMENT  — dashboard pages, settings, providers, keys, admin and
 *                   diagnostics endpoints protected by dashboard session
 *                   or management-grade credentials.
 *
 * Any route that cannot be classified MUST fail closed.
 */

export type RouteClass = "PUBLIC" | "CLIENT_API" | "MANAGEMENT";

/**
 * Why a particular path was placed into a route class. Used for telemetry,
 * diagnostics, and tests so we can prove that routing decisions are
 * deterministic and reviewable.
 */
export type ClassificationReason =
  | "public_prefix"
  | "public_readonly_prefix"
  | "dashboard_prefix"
  | "client_api_v1"
  | "client_api_alias"
  | "client_api_codex_alias"
  | "client_api_double_prefix"
  | "management_api"
  | "root_redirect"
  | "fallback_management";

export interface RouteClassification {
  routeClass: RouteClass;
  reason: ClassificationReason;
  /**
   * The normalized internal pathname after rewrites. For example
   * "/v1/chat/completions" or "/codex/foo" is normalized to
   * "/api/v1/chat/completions" / "/api/v1/responses" so policy code does
   * not have to know about every alias.
   */
  normalizedPath: string;
}

/**
 * Identity of the authenticated principal once a policy has accepted the
 * request. Populated by the policy layer (Phase 2) and consumed by route
 * handlers via assertAuth().
 */
export interface AuthSubject {
  kind: "client_api_key" | "dashboard_session" | "management_key" | "anonymous";
  /**
   * Stable identifier of the principal:
   *  - hashed key id for API keys
   *  - "dashboard" for the single-tenant dashboard session
   *  - "anonymous" for unauthenticated PUBLIC requests
   */
  id: string;
  /**
   * Optional human-friendly label (key name, scope hint). Never includes
   * the raw secret.
   */
  label?: string;
  /**
   * Scopes granted to this subject. Empty for unauthenticated subjects.
   */
  scopes?: ReadonlyArray<string>;
}
