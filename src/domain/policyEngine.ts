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

import { checkLockout } from "./lockoutPolicy";
import { checkBudget } from "./costRules";
import { resolveFallbackChain } from "./fallbackPolicy";

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

// ─── Class-Based Policy Engine ───────────────────────────────────────────────

/**
 * Matches a value against a glob pattern (supports * wildcard).
 * @param {string} pattern - Glob pattern (e.g. "gpt-*")
 * @param {string} value - Value to test
 * @returns {boolean}
 */
function globMatch(pattern, value) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
  return new RegExp(`^${escaped}$`).test(value);
}

/**
 * Declarative Policy Engine — supports routing, access, and budget policies
 * with glob-based model matching and priority ordering.
 *
 * @example
 * const engine = new PolicyEngine();
 * engine.loadPolicies([{ id: "1", name: "prefer-openai", type: "routing", enabled: true, priority: 1, conditions: { model_pattern: "gpt-*" }, actions: { prefer_provider: ["openai"] } }]);
 * const result = engine.evaluate({ model: "gpt-4o" });
 */
export class PolicyEngine {
  constructor() {
    /** @type {Array} */
    this._policies = [];
  }

  /** Load a full set of policies (replaces existing). */
  loadPolicies(policies) {
    this._policies = [...policies];
  }

  /** Add a single policy. */
  addPolicy(policy) {
    this._policies.push(policy);
  }

  /** Remove a policy by id. */
  removePolicy(id) {
    this._policies = this._policies.filter((p) => p.id !== id);
  }

  /** Get current policies. */
  getPolicies() {
    return [...this._policies];
  }

  /**
   * Evaluate a request context against all loaded policies.
   * @param {{ model: string }} context
   * @returns {{ allowed: boolean, reason?: string, preferredProviders: string[], appliedPolicies: string[], maxTokens?: number }}
   */
  evaluate(context) {
    const result = {
      allowed: true,
      reason: undefined,
      preferredProviders: [],
      appliedPolicies: [],
      maxTokens: undefined,
    };

    const sorted = [...this._policies]
      .filter((p) => p.enabled)
      .sort((a, b) => a.priority - b.priority);

    for (const policy of sorted) {
      // Check model condition
      if (policy.conditions?.model_pattern) {
        if (!globMatch(policy.conditions.model_pattern, context.model)) {
          continue; // Model doesn't match — skip this policy
        }
      }

      // Apply actions based on policy type
      switch (policy.type) {
        case "routing":
          if (policy.actions?.prefer_provider) {
            result.preferredProviders.push(...policy.actions.prefer_provider);
          }
          result.appliedPolicies.push(policy.name);
          break;

        case "access":
          if (policy.actions?.block_model) {
            const blocked = policy.actions.block_model.some((pattern) =>
              globMatch(pattern, context.model)
            );
            if (blocked) {
              result.allowed = false;
              result.reason = `Model "${context.model}" blocked by policy "${policy.name}"`;
              result.appliedPolicies.push(policy.name);
              return result;
            }
          }
          result.appliedPolicies.push(policy.name);
          break;

        case "budget":
          if (policy.actions?.max_tokens != null) {
            result.maxTokens = policy.actions.max_tokens;
          }
          result.appliedPolicies.push(policy.name);
          break;
      }
    }

    return result;
  }
}
