/**
 * Key Group Authorization Service
 *
 * Enforces model-level access control based on API key group membership.
 * Used in the request pipeline to check if an API key's groups allow
 * access to the requested model.
 *
 * If the API key is not in any group, all models are allowed (no restriction).
 * If the API key IS in a group, model access is determined by permissions:
 *   - Deny rules override allow rules
 *   - Patterns support wildcards: "gpt-*", "claude-*", "*" for all
 *   - Provider-specific rules: "openai/gpt-4"
 */

import { checkKeyModelAccess, getKeyGroupsForApiKey } from "@/lib/localDb";

export interface KeyGroupAuthResult {
  /** Whether the request is authorized */
  authorized: boolean;
  /** Human-readable reason if denied */
  reason?: string;
  /** Groups that apply to this key */
  groups: Array<{ id: string; name: string }>;
}

/**
 * Check if an API key has access to a specific model.
 * This is the main entry point for the request pipeline.
 *
 * @param apiKeyId - The API key ID from the auth pipeline
 * @param model - The model string (e.g., "gpt-4", "claude-opus-4-7")
 * @param provider - Optional provider (e.g., "openai", "anthropic")
 * @returns KeyGroupAuthResult
 */
export function authorizeKeyModelAccess(
  apiKeyId: string | undefined,
  model: string,
  provider?: string,
): KeyGroupAuthResult {
  if (!apiKeyId) {
    // No API key = no restriction (public endpoint)
    return { authorized: true, groups: [] };
  }

  const groups = getKeyGroupsForApiKey(apiKeyId);
  if (groups.length === 0) {
    // Key not in any group = no restriction
    return { authorized: true, groups: [] };
  }

  const accessCheck = checkKeyModelAccess(apiKeyId, model, provider);

  if (accessCheck.allowed) {
    return {
      authorized: true,
      groups: groups.map((g) => ({ id: g.id, name: g.name })),
    };
  }

  const denyReason = accessCheck.deniedBy
    ? `Model "${model}" is denied by group permission (pattern: ${accessCheck.deniedBy.modelPattern})`
    : `Model "${model}" is not in the allowed models for your API key group(s). ` +
      `Configure group permissions or contact your administrator.`;

  return {
    authorized: false,
    reason: denyReason,
    groups: groups.map((g) => ({ id: g.id, name: g.name })),
  };
}

/**
 * Get a summary of group memberships for an API key (for dashboard display).
 */
export function getKeyGroupSummary(apiKeyId: string): {
  groups: Array<{ id: string; name: string }>;
  restricted: boolean;
} {
  const groups = getKeyGroupsForApiKey(apiKeyId);
  return {
    groups: groups.map((g) => ({ id: g.id, name: g.name })),
    restricted: groups.length > 0,
  };
}
