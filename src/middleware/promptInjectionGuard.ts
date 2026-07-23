/**
 * Prompt Injection Guard — Express/Next.js middleware
 *
 * Legacy middleware facade that now delegates to the guardrail system.
 *
 * @module middleware/promptInjectionGuard
 */

import {
  evaluatePromptInjection,
  type PromptInjectionGuardrailOptions,
} from "@/lib/guardrails/promptInjection";
import { resolveDisabledGuardrails } from "@/lib/guardrails/registry";
import { CORS_HEADERS } from "@/shared/utils/cors";

/**
 * Create a prompt injection guard middleware.
 *
 * @param {PromptInjectionGuardrailOptions} [options={}]
 * @returns {(req: Request) => { blocked: boolean, result: Object }|null}
 */
export function createInjectionGuard(options: PromptInjectionGuardrailOptions = {}) {
  /**
   * Check a request body for prompt injection.
   *
   * @param {Object} body - The parsed request body
   * @returns {{ blocked: boolean, result: Object }}
   */
  return function guardRequest(body: any) {
    if (!body || typeof body !== "object") {
      return { blocked: false, result: { flagged: false, detections: [], piiDetections: [] } };
    }

    const decision = evaluatePromptInjection(body, options, {
      disabledGuardrails: resolveDisabledGuardrails({ body }),
      log: options.logger || console,
    });
    return {
      blocked: decision.blocked,
      result: decision.result,
    };
  };
}

/**
 * Next.js API route handler wrapper for injection guarding.
 *
 * @param {Function} handler - Original route handler
 * @param {GuardOptions} [options={}]
 * @returns {Function} Wrapped handler
 */
export function withInjectionGuard(handler: any, options: any = {}) {
  const guard = createInjectionGuard(options);

  return async function guardedHandler(request: any, context: any) {
    // Only apply to POST/PUT/PATCH
    if (!["POST", "PUT", "PATCH"].includes(request.method)) {
      return handler(request, context);
    }

    // Hoist parsed body so it can be threaded to the downstream handler (#4041).
    let parsedBody: any = null;

    try {
      // Clone request so body can still be read by handler
      const cloned = request.clone();
      parsedBody = await cloned.json().catch(() => null);

      if (parsedBody) {
        const { blocked, result }: any = guard(parsedBody);

        if (blocked) {
          return new Response(
            JSON.stringify({
              error: {
                message: "Request blocked: potential prompt injection detected",
                type: "injection_detected",
                code: "SECURITY_001",
                detections: result.detections.length,
              },
            }),
            { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
          );
        }

        // Attach sanitization result as header for downstream handlers.
        // Web Request headers may be immutable — never let this throw into the
        // outer security-check path (issue #8095).
        if (result.flagged) {
          try {
            request.headers.set("X-Injection-Flagged", "true");
            request.headers.set(
              "X-Injection-Detections",
              String(result.detections.length)
            );
          } catch {
            // immutable headers: detection still applied; metadata is best-effort
          }
        }
      }
    } catch (error) {
      console.error("[SECURITY] Injection guard error:", error);
      return new Response(JSON.stringify({ error: "Security check failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Thread the already-parsed body to the handler as a third argument so downstream
    // handlers (e.g. /v1/responses) can reuse it without re-cloning+re-parsing the
    // request on the hot path (#4041). Handlers that don't accept a preParsedBody
    // simply ignore the extra argument — no signature change required for other routes.
    return handler(request, context, parsedBody);
  };
}
