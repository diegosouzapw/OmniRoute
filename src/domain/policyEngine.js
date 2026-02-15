// @ts-check
/**
 * Policy Engine — FASE-06 Architecture Refactoring
 *
 * Centralized policy evaluation that combines domain decisions from
 * fallback, cost, lockout, and circuit-breaker modules into a single
 * verdict before forwarding a request to a provider.
 *
 * Usage: Call `evaluateRequest(request)` before executing a chat request.
 * The function returns `{ allowed, reason, adjustments }`.
 *
 * @module domain/policyEngine
 */

import { checkLockout } from "./lockoutPolicy.js";
import { checkBudget } from "./costRules.js";
import { resolveFallbackChain } from "./fallbackPolicy.js";

/**
 * @typedef {Object} PolicyRequest
 * @property {string} model - Requested model
 * @property {string} [apiKeyId] - API key identifier for budget checks
 * @property {string} [clientIp] - Client IP for lockout checks
 * @property {string} [provider] - Target provider
 */

/**
 * @typedef {Object} PolicyVerdict
 * @property {boolean} allowed - Whether the request is permitted
 * @property {string|null} reason - Human-readable denial reason (null if allowed)
 * @property {Object} adjustments - Optional flight-path adjustments
 * @property {string} [adjustments.model] - Replaced model (from combo/fallback)
 * @property {Array} [adjustments.fallbackChain] - Available fallbacks
 * @property {string} policyPhase - Which policy phase determined the outcome
 */

/**
 * Evaluate a request against all domain policies.
 *
 * Evaluation order (short-circuits on first denial):
 *   1. Lockout      — is the client/IP locked out?
 *   2. Budget       — is the API key within budget?
 *   3. Fallback     — is there a fallback chain for the model?
 *
 * @param {PolicyRequest} request
 * @returns {PolicyVerdict}
 */
export function evaluateRequest(request) {
  const { model, apiKeyId, clientIp } = request;

  // ── 1. Lockout Policy ──────────────────────────────
  if (clientIp) {
    const lockout = checkLockout(clientIp);
    if (lockout.locked) {
      return {
        allowed: false,
        reason: `Client locked out (${lockout.remainingMs}ms remaining)`,
        adjustments: {},
        policyPhase: "lockout",
      };
    }
  }

  // ── 2. Budget Policy ───────────────────────────────
  if (apiKeyId) {
    const budget = checkBudget(apiKeyId);
    if (budget && !budget.allowed) {
      return {
        allowed: false,
        reason: `Budget exceeded: ${budget.reason || "daily limit reached"}`,
        adjustments: {},
        policyPhase: "budget",
      };
    }
  }

  // ── 3. Fallback Chain Resolution ───────────────────
  const fallbackChain = resolveFallbackChain(model);

  return {
    allowed: true,
    reason: null,
    adjustments: {
      model,
      fallbackChain: fallbackChain || [],
    },
    policyPhase: "passed",
  };
}

/**
 * Evaluate a set of models against policies and return the first allowed one.
 * Useful for combo/fallback scenarios where multiple models may be tried.
 *
 * @param {string[]} models - Models to evaluate in order
 * @param {Omit<PolicyRequest, 'model'>} baseRequest - Base request without model
 * @returns {{ model: string, verdict: PolicyVerdict } | { model: null, verdict: PolicyVerdict }}
 */
export function evaluateFirstAllowed(models, baseRequest) {
  for (const model of models) {
    const verdict = evaluateRequest({ ...baseRequest, model });
    if (verdict.allowed) {
      return { model, verdict };
    }
  }

  // All models denied — return last denial
  const lastVerdict = evaluateRequest({ ...baseRequest, model: models[models.length - 1] });
  return { model: null, verdict: lastVerdict };
}
