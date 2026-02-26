/**
 * API Key Policy Enforcement — Shared middleware for all /v1/* endpoints.
 *
 * Enforces API key policies: model restrictions and budget limits.
 * Should be called after API key authentication in every endpoint that
 * accepts a model parameter.
 *
 * @module shared/utils/apiKeyPolicy
 */

import { extractApiKey } from "@/sse/services/auth";
import { getApiKeyMetadata, isModelAllowedForKey } from "@/lib/localDb";
import { checkBudget } from "@/domain/costRules";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import * as log from "@/sse/utils/logger";

/** Metadata stored for an API key in the local database. */
export interface ApiKeyMetadata {
  id: string;
  name?: string;
  allowedModels?: string[];
  budget?: number;
  usedBudget?: number;
  [key: string]: unknown;
}

export interface ApiKeyPolicyResult {
  /** API key string (null if no key provided) */
  apiKey: string | null;
  /** Metadata from DB (null if no key or key not found) */
  apiKeyInfo: ApiKeyMetadata | null;
  /** If set, the request should be rejected with this Response */
  rejection: Response | null;
}

/**
 * Enforce API key policies for a request.
 *
 * Checks:
 * 1. Model restriction — if the key has `allowedModels`, verify the requested model is permitted
 * 2. Budget limit — if the key has a budget configured, verify it hasn't been exceeded
 *
 * @param request - The incoming HTTP request
 * @param modelStr - The model ID from the request body
 * @returns ApiKeyPolicyResult with apiKey, metadata, and optional rejection response
 *
 * @example
 * ```ts
 * const policy = await enforceApiKeyPolicy(request, body.model);
 * if (policy.rejection) return policy.rejection;
 * // proceed with request, optionally use policy.apiKeyInfo
 * ```
 */
export async function enforceApiKeyPolicy(
  request: Request,
  modelStr: string | null
): Promise<ApiKeyPolicyResult> {
  const apiKey = extractApiKey(request);

  // No API key = local mode, skip policy checks
  if (!apiKey) {
    return { apiKey: null, apiKeyInfo: null, rejection: null };
  }

  // Fetch key metadata (includes allowedModels)
  let apiKeyInfo: ApiKeyMetadata | null = null;
  try {
    apiKeyInfo = await getApiKeyMetadata(apiKey);
  } catch (error) {
    // If metadata fetch fails, don't block — degrade gracefully, but log for debugging
    log.warn("API_POLICY", "Failed to fetch API key metadata. Request will be allowed.", { error });
    return { apiKey, apiKeyInfo: null, rejection: null };
  }

  // Key not found in DB — skip policy (auth layer handles validation)
  if (!apiKeyInfo) {
    return { apiKey, apiKeyInfo: null, rejection: null };
  }

  // ── Check 1: Model restriction ──
  if (modelStr && apiKeyInfo.allowedModels && apiKeyInfo.allowedModels.length > 0) {
    const allowed = await isModelAllowedForKey(apiKey, modelStr);
    if (!allowed) {
      return {
        apiKey,
        apiKeyInfo,
        rejection: errorResponse(
          HTTP_STATUS.FORBIDDEN,
          `Model "${modelStr}" is not allowed for this API key`
        ),
      };
    }
  }

  // ── Check 2: Budget limit ──
  if (apiKeyInfo.id) {
    try {
      const budgetOk = checkBudget(apiKeyInfo.id);
      if (!budgetOk.allowed) {
        return {
          apiKey,
          apiKeyInfo,
          rejection: errorResponse(
            HTTP_STATUS.RATE_LIMITED,
            budgetOk.reason || "Budget limit exceeded"
          ),
        };
      }
    } catch (error) {
      // Budget check is best-effort — don't block on errors, but log them
      log.warn("API_POLICY", "Budget check failed. Request will be allowed.", { error });
    }
  }

  return { apiKey, apiKeyInfo, rejection: null };
}
