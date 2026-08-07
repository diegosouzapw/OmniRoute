/**
 * Usage Fetcher - Get usage data from provider APIs
 *
 * This module is the dispatcher (orchestration) layer: it maps a provider name
 * to the per-provider usage fetcher leaf under `./usage/<provider>.ts` and
 * shapes the connection into the args each leaf expects. The provider-specific
 * fetcher/parser logic itself lives in those leaves so this file stays flat.
 * External consumers import `getUsageForProvider` / `USAGE_FETCHER_PROVIDERS`
 * (and the re-exported helpers) from here — the leaf split is an internal
 * implementation detail.
 */

import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "./codeAssistSubscription.ts";
import { toDisplayLabel } from "./usage/scalars.ts";
import { parseResetTime, createQuotaFromUsage } from "./usage/quota.ts";
import {
  getMiniMaxUsage,
  getMiniMaxPlanLabel,
  getMiniMaxSessionTotal,
  inferMiniMaxPlanLabelFromTotals,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
} from "./usage/minimax.ts";
import { getGlmUsage } from "./usage/glm.ts";
// Re-exported para o teste glm-coding-plan-monthly (importa de services/usage).
export { glmMonthlyRemainingPercentage } from "./usage/glm.ts";
import {
  getAntigravityUsage,
  getAntigravityPlanLabel,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
} from "./usage/antigravity.ts";
import { getCursorUsage } from "./usage/cursor.ts";
import { getKimiUsage } from "./usage/kimi.ts";
import { getCodexUsage } from "./usage/codex.ts";
import { getClaudeUsage, getClaudePlanLabel } from "./usage/claude.ts";
import { getKiroUsage, buildKiroUsageResult, discoverKiroProfileArn } from "./usage/kiro.ts";
// Re-exported para os testes kiro-* (importam de services/usage).
export { buildKiroUsageResult, discoverKiroProfileArn } from "./usage/kiro.ts";
import { getAdobeFireflyUsage } from "./usage/adobeFirefly.ts";
import { getOpenrouterUsage } from "./usage/openrouter.ts";
import { getOllamaCloudUsage, getOpenCodeGoUsage } from "./opencodeOllamaUsage.ts";
import { getCodeBuddyCnUsage } from "./usage/codebuddy-cn.ts";
import { getPromptQlUsage } from "./usage/promptql.ts";
import { getHyperAgentUsage } from "./usage/hyperagent.ts";
import { getGitHubUsage, formatGitHubQuotaSnapshot, inferGitHubPlanName } from "./usage/github.ts";
import { getCrofUsage } from "./usage/crof.ts";
import { getNanoGptUsage } from "./usage/nanogpt.ts";
import { getQoderUsage, parseQoderUserStatusUsage } from "./usage/qoder.ts";
// Re-exported para o teste qoder-usage-quota (importa parseQoderUserStatusUsage de services/usage).
export { parseQoderUserStatusUsage } from "./usage/qoder.ts";
import { getOpencodeUsage } from "./usage/opencode.ts";
import { getDeepseekUsage } from "./usage/deepseek.ts";
import { getBailianCodingPlanUsage } from "./usage/bailian.ts";
import { getVertexUsage } from "./usage/vertex.ts";
import { getXiaomiMimoUsage } from "./usage/xiaomi-mimo.ts";
import { getXaiUsage } from "./usage/xai.ts";
import { getXaiOauthUsage } from "./usage/xaiOauth.ts";
import { getGrokCliUsage } from "./usage/grokCli.ts";
import { getFirecrawlUsage } from "./usage/firecrawl.ts";

type JsonRecord = Record<string, unknown>;
type UsageProviderConnection = JsonRecord & {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
  projectId?: string;
  email?: string;
};

/**
 * Single source of truth for which providers have a `getUsageForProvider`
 * implementation. Consumers like `genericQuotaFetcher.ts` reference this so
 * the registration list can't drift from the switch statement below.
 *
 * If you add a new provider to the switch, add it here too.
 */
export const USAGE_FETCHER_PROVIDERS = [
  "github",
  "antigravity",
  "agy",
  "claude",
  "codex",
  "cursor",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "kimi-coding-apikey",
  "qoder",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "ollama-cloud",
  "minimax",
  "minimax-cn",
  "crof",
  "bailian-coding-plan",
  "nanogpt",
  "deepseek",
  "opencode",
  "opencode-zen",
  "xiaomi-mimo",
  "xai",
  "xai-oauth",
  "xao",
  "grok-cli",
  "vertex",
  "vertex-partner",
  "codebuddy-cn",
  "openrouter",
  // PromptQL playground credits (data.pro.ql.app getCreditSummary)
  "promptql",
  "pql",
  // HyperAgent billing usage (creditBlocks USD)
  "hyperagent",
  "ha",
  // Firecrawl team credits (GET /v2/team/credit-usage)
  "firecrawl",
] as const;

export type UsageFetcherProvider = (typeof USAGE_FETCHER_PROVIDERS)[number];

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Promise<unknown>} Usage data with quotas
 */
export async function getUsageForProvider(
  connection: UsageProviderConnection,
  options: { forceRefresh?: boolean } = {}
) {
  const { id, provider, accessToken, apiKey, providerSpecificData, projectId, email } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "antigravity":
    case "agy":
      return await getAntigravityUsage(
        provider,
        accessToken,
        providerSpecificData,
        projectId,
        id,
        options
      );
    case "claude":
      return await getClaudeUsage(accessToken);
    case "codex":
      return await getCodexUsage(accessToken, providerSpecificData);
    case "cursor":
      return await getCursorUsage(accessToken || "", providerSpecificData);
    case "kiro":
    case "amazon-q":
      return await getKiroUsage(accessToken, providerSpecificData);
    case "vertex":
    case "vertex-partner":
      return await getVertexUsage(id || "", provider);
    case "kimi-coding":
    case "kimi-coding-apikey":
      return await getKimiUsage(accessToken, apiKey, providerSpecificData);
    case "qoder":
      // Qoder PATs live in `apiKey` (decrypted) or `providerSpecificData.qoderPat`,
      // never in `accessToken`.
      return await getQoderUsage(apiKey, providerSpecificData);
    case "glm":
    case "glm-cn":
    case "zai":
    case "glmt":
      return await getGlmUsage(apiKey || "", {
        ...(providerSpecificData || {}),
        ...(provider === "glm-cn" ? { apiRegion: "china" } : {}),
      });
    case "opencode-go":
      return await getOpenCodeGoUsage(apiKey || "", providerSpecificData);
    case "ollama-cloud":
      return await getOllamaCloudUsage(providerSpecificData);
    case "minimax":
    case "minimax-cn":
      return await getMiniMaxUsage(apiKey || "", provider);
    case "crof":
      return await getCrofUsage(apiKey || "");
    case "bailian-coding-plan":
      return await getBailianCodingPlanUsage(id || "", apiKey || "", providerSpecificData);
    case "nanogpt":
      return await getNanoGptUsage(apiKey || "");
    case "deepseek":
      return await getDeepseekUsage(id || "", apiKey || "");
    case "openrouter":
      return await getOpenrouterUsage(id || "", apiKey || "", providerSpecificData);
    case "opencode":
    case "opencode-zen":
      return await getOpencodeUsage(id || "", apiKey || "");
    case "xiaomi-mimo":
      return await getXiaomiMimoUsage(id || "");
    case "xai":
      return await getXaiUsage(id || "");
    case "xai-oauth":
    case "xao":
      return await getXaiOauthUsage(id || "", accessToken, connection);
    case "grok-cli":
      return await getGrokCliUsage(accessToken);
    case "codebuddy-cn":
      return await getCodeBuddyCnUsage(accessToken, apiKey, providerSpecificData);
    case "promptql":
    case "pql":
      // DDN lux JWTs carry projectId only in JWT aud; connection.projectId may be set by sync.
      return await getPromptQlUsage(apiKey || accessToken, providerSpecificData, projectId);
    case "adobe-firefly":
    case "firefly":
      // Cookie or IMS JWT in apiKey/accessToken → GET firefly.adobe.io/v1/credits/balance
      return await getAdobeFireflyUsage(apiKey, accessToken, providerSpecificData);
    case "hyperagent":
    case "ha":
      return await getHyperAgentUsage(apiKey || accessToken, providerSpecificData);
    case "firecrawl":
      return await getFirecrawlUsage(id || "", apiKey, connection);
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}

export const __testing = {
  parseResetTime,
  parseQoderUserStatusUsage,
  formatGitHubQuotaSnapshot,
  inferGitHubPlanName,
  getAntigravityPlanLabel,
  extractCodeAssistSubscriptionTier,
  extractCodeAssistOnboardTierId,
  getMiniMaxPlanLabel,
  inferMiniMaxPlanLabelFromTotals,
  getOpencodeUsage,
  getClaudePlanLabel,
  createQuotaFromUsage,
  getMiniMaxQuotaResetAt,
  isMiniMaxTextQuotaModel,
  getMiniMaxSessionTotal,
  getMiniMaxWeeklyTotal,
  createMiniMaxQuotaFromCount,
  createMiniMaxQuotaFromPercent,
  getMiniMaxRemainingPercent,
  getMiniMaxUsage,
  getXiaomiMimoUsage,
  getXaiUsage,
  getXaiOauthUsage,
  getFirecrawlUsage,
  getVertexUsage,
  getMiniMaxAuthErrorMessage,
  getMiniMaxErrorSummary,
  mapCodeAssistSubscriptionToPlanLabel,
  mapCodeAssistTierIdToLabel,
  mapSubscriptionTierStringToPlanLabel,
  toDisplayLabel,
  getKiroUsage,
};
