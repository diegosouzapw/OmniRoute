// @ts-check
/**
 * Policy Engine — FASE-08 LLM Proxy Advanced
 *
 * Declarative policy engine for routing, budget, and access control decisions
 * in the LLM proxy pipeline. Policies are evaluated before provider selection.
 *
 * @module lib/policies/policyEngine
 */

/**
 * @typedef {'routing'|'budget'|'access'} PolicyType
 */

/**
 * @typedef {Object} Policy
 * @property {string} id - Unique policy ID
 * @property {string} name - Display name
 * @property {PolicyType} type - Policy type
 * @property {boolean} enabled - Whether the policy is active
 * @property {number} priority - Evaluation order (lower = first)
 * @property {Object} conditions - Matching conditions
 * @property {string} [conditions.model_pattern] - Glob pattern for model names
 * @property {string} [conditions.provider] - Provider ID
 * @property {string} [conditions.api_key_id] - API key ID
 * @property {Object} actions - Actions to take when matched
 * @property {string[]} [actions.prefer_provider] - Preferred providers
 * @property {string[]} [actions.block_provider] - Blocked providers
 * @property {string[]} [actions.block_model] - Blocked models
 * @property {number} [actions.max_cost_per_1k] - Max cost per 1000 tokens
 * @property {number} [actions.max_tokens] - Max tokens per request
 * @property {number} [actions.daily_budget] - Daily budget in USD
 * @property {string} createdAt - ISO timestamp
 * @property {string} updatedAt - ISO timestamp
 */

/**
 * Simple glob pattern matching (supports * wildcard only).
 * @param {string} pattern
 * @param {string} value
 * @returns {boolean}
 */
function matchGlob(pattern, value) {
  if (!pattern || pattern === "*") return true;
  const regex = new RegExp(
    "^" + pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$",
    "i"
  );
  return regex.test(value);
}

export class PolicyEngine {
  /** @type {Policy[]} */
  #policies = [];

  /**
   * Load policies from an array.
   * @param {Policy[]} policies
   */
  loadPolicies(policies) {
    this.#policies = [...policies].sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));
  }

  /**
   * Add a single policy.
   * @param {Policy} policy
   */
  addPolicy(policy) {
    this.#policies.push(policy);
    this.#policies.sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));
  }

  /**
   * Remove a policy by ID.
   * @param {string} id
   * @returns {boolean}
   */
  removePolicy(id) {
    const idx = this.#policies.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.#policies.splice(idx, 1);
    return true;
  }

  /**
   * Get all policies.
   * @returns {Policy[]}
   */
  getPolicies() {
    return [...this.#policies];
  }

  /**
   * Evaluate all policies against a request context.
   *
   * @param {{ model: string, provider?: string, apiKeyId?: string }} context
   * @returns {{ allowed: boolean, reason?: string, preferredProviders?: string[], blockedProviders?: string[], maxTokens?: number }}
   */
  evaluate(context) {
    const result = {
      allowed: true,
      preferredProviders: [],
      blockedProviders: [],
      blockedModels: [],
      maxTokens: undefined,
      maxCostPer1k: undefined,
      appliedPolicies: [],
    };

    for (const policy of this.#policies) {
      if (!policy.enabled) continue;

      // Check conditions
      const conditions = policy.conditions || {};
      let matches = true;

      if (conditions.model_pattern && !matchGlob(conditions.model_pattern, context.model)) {
        matches = false;
      }
      if (conditions.provider && conditions.provider !== context.provider) {
        matches = false;
      }
      if (conditions.api_key_id && conditions.api_key_id !== context.apiKeyId) {
        matches = false;
      }

      if (!matches) continue;

      // Apply actions
      const actions = policy.actions || {};
      result.appliedPolicies.push(policy.name);

      if (actions.prefer_provider) {
        result.preferredProviders.push(...actions.prefer_provider);
      }

      if (actions.block_provider) {
        result.blockedProviders.push(...actions.block_provider);
      }

      if (actions.block_model) {
        const isBlocked = actions.block_model.some((pattern) =>
          matchGlob(pattern, context.model)
        );
        if (isBlocked) {
          result.allowed = false;
          result.reason = `Model "${context.model}" blocked by policy "${policy.name}"`;
          break;
        }
      }

      if (actions.max_tokens !== undefined) {
        result.maxTokens =
          result.maxTokens !== undefined
            ? Math.min(result.maxTokens, actions.max_tokens)
            : actions.max_tokens;
      }

      if (actions.max_cost_per_1k !== undefined) {
        result.maxCostPer1k =
          result.maxCostPer1k !== undefined
            ? Math.min(result.maxCostPer1k, actions.max_cost_per_1k)
            : actions.max_cost_per_1k;
      }
    }

    return result;
  }
}

// Singleton instance
let engineInstance;

/**
 * Get the global policy engine instance.
 * @returns {PolicyEngine}
 */
export function getPolicyEngine() {
  if (!engineInstance) {
    engineInstance = new PolicyEngine();
  }
  return engineInstance;
}
