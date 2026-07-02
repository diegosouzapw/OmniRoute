/**
 * usage/codex.ts — Codex (OpenAI / ChatGPT backend) usage fetcher.
 *
 * Extracted from services/usage.ts (god-file decomposition): the Codex family — the ChatGPT
 * backend usage-API config and the getCodexUsage fetcher that reads the persisted workspace
 * binding and shapes quotas via buildCodexUsageQuotas. Depends only on the scalar leaf +
 * codexUsageQuotas — no host coupling — so it lives as a co-located provider leaf. usage.ts
 * imports getCodexUsage (dispatcher). Behavior-preserving move.
 */

import { buildCodexUsageQuotas } from "../codexUsageQuotas.ts";
import { getFieldValue } from "./scalars.ts";

// Codex (OpenAI) API config
const CODEX_CONFIG = {
  usageUrl: "https://chatgpt.com/backend-api/wham/usage",
};

/**
 * Codex (OpenAI) Usage - Fetch from ChatGPT backend API
 * IMPORTANT: Uses persisted workspaceId from OAuth to ensure correct workspace binding.
 * No fallback to other workspaces - strict binding to user's selected workspace.
 */
export async function getCodexUsage(
  accessToken?: string,
  providerSpecificData: Record<string, unknown> = {}
) {
  try {
    // Use persisted workspace ID from OAuth - NO FALLBACK
    const accountId =
      typeof providerSpecificData.workspaceId === "string"
        ? providerSpecificData.workspaceId
        : null;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (accountId) {
      headers["chatgpt-account-id"] = accountId;
    }

    const response = await fetch(CODEX_CONFIG.usageUrl, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        return {
          message: `Codex token expired or access denied. Please re-authenticate the connection.`,
        };
      }
      throw new Error(`Codex API error: ${response.status}`);
    }

    const data = await response.json();

    const { rateLimit, quotas } = buildCodexUsageQuotas(data);

    return {
      plan: String(getFieldValue(data, "plan_type", "planType") || "unknown"),
      limitReached: Boolean(getFieldValue(rateLimit, "limit_reached", "limitReached")),
      quotas,
    };
  } catch (error) {
    return { message: `Failed to fetch Codex usage: ${(error as Error).message}` };
  }
}
