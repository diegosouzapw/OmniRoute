/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import {
  getAntigravityFetchAvailableModelsUrls,
  ANTIGRAVITY_BASE_URLS,
} from "../../config/antigravityUpstream.ts";

import {
  isUserCallableAntigravityModelId,
  toClientAntigravityModelId,
} from "../../config/antigravityModelAliases.ts";

import { isUserCallableAgyModelId } from "../../config/agyModels.ts";

import { getGlmQuotaUrl } from "../../config/glmProvider.ts";

import { getGitHubCopilotInternalUserHeaders } from "../../config/providerHeaderProfiles.ts";

import { fetchBailianQuota, type BailianTripleWindowQuota } from "../bailianQuotaFetcher.ts";

import { fetchDeepseekQuota, type DeepseekQuota } from "../deepseekQuotaFetcher.ts";

import { fetchOpencodeQuota, type OpencodeTripleWindowQuota } from "../opencodeQuotaFetcher.ts";

import {
  applyAntigravityClientProfileHeaders,
  getAntigravityBootstrapHeaders,
  getAntigravityClientProfile,
} from "../antigravityClientProfile.ts";

import {
  antigravityUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "../antigravityHeaders.ts";

import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../../executors/antigravity.ts";

import { getCreditsMode } from "../antigravityCredits.ts";

import { CLAUDE_CODE_VERSION, fetchClaudeBootstrap } from "../../executors/claudeIdentity.ts";

import { generateAntigravityRequestId, getAntigravitySessionId } from "../antigravityIdentity.ts";

import {
  extractCodeAssistOnboardTierId,
  extractCodeAssistSubscriptionTier,
} from "../codeAssistSubscription.ts";

import { sanitizeErrorMessage } from "../../utils/error.ts";

import { UsageProviderConnection } from "./types.ts";
import { getGitHubUsage } from "./github.ts";
import { getGeminiUsage } from "./gemini.ts";
import { getAntigravityUsage } from "./antigravity.ts";
import { getClaudeUsage } from "./claude.ts";
import { getCodexUsage } from "./codex.ts";
import { getCursorUsage } from "./cursor.ts";
import { getKiroUsage } from "./kiro.ts";
import { getKimiUsage } from "./kimi.ts";
import { getQwenUsage } from "./qwen.ts";
import { getQoderUsage } from "./qoder.ts";
import { getGlmUsage } from "./glm.ts";
import { getOpenCodeGoUsage } from "./opencodeGo.ts";
import { getMiniMaxUsage } from "./minimax.ts";
import { getCrofUsage } from "./crof.ts";
import { getBailianCodingPlanUsage } from "./bailian.ts";
import { getNanoGptUsage } from "./nanogpt.ts";
import { getDeepseekUsage } from "./deepseek.ts";
import { getOpencodeUsage } from "./opencode.ts";
import { getXiaomiMimoUsage } from "./xiaomi.ts";
import { getVertexUsage } from "./vertex.ts";

/**
 * Single source of truth for which providers have a `getUsageForProvider`
 * implementation. Consumers like `genericQuotaFetcher.ts` reference this so
 * the registration list can't drift from the switch statement below.
 *
 * If you add a new provider to the switch, add it here too.
 */
export const USAGE_FETCHER_PROVIDERS = [
  "github",
  "gemini-cli",
  "antigravity",
  "agy",
  "claude",
  "codex",
  "cursor",
  "kiro",
  "amazon-q",
  "kimi-coding",
  "qwen",
  "qoder",
  "glm",
  "glm-cn",
  "zai",
  "glmt",
  "opencode-go",
  "minimax",
  "minimax-cn",
  "crof",
  "bailian-coding-plan",
  "nanogpt",
  "deepseek",
  "opencode",
  "opencode-zen",
  "xiaomi-mimo",
  "vertex",
  "vertex-partner",
] as const;

/**
 * Get usage data for a provider connection
 * @param {Object} connection - Provider connection with accessToken
 * @returns {Promise<unknown>} Usage data with quotas
 */
export async function getUsageForProvider(
  connection: UsageProviderConnection,
  options: { forceRefresh?: boolean } = {}
) {
  if (!connection) {
    return { message: "Connection not available." };
  }
  const { id, provider, accessToken, apiKey, providerSpecificData, projectId, email } = connection;

  switch (provider) {
    case "github":
      return await getGitHubUsage(accessToken, providerSpecificData);
    case "gemini-cli":
      return await getGeminiUsage(accessToken, providerSpecificData, projectId);
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
    case "kimi-coding":
      return await getKimiUsage(accessToken);
    case "qwen":
      return await getQwenUsage(accessToken, providerSpecificData);
    case "qoder":
      return await getQoderUsage(accessToken);
    case "glm":
    case "glm-cn":
    case "zai":
    case "glmt":
      return await getGlmUsage(apiKey || "", {
        ...(providerSpecificData || {}),
        ...(provider === "glm-cn" ? { apiRegion: "china" } : {}),
      });
    case "opencode-go":
      return await getOpenCodeGoUsage(apiKey || "");
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
    case "opencode":
    case "opencode-zen":
      return await getOpencodeUsage(id || "", apiKey || "");
    case "vertex":
    case "vertex-partner":
      return await getVertexUsage(id || "", provider);
    case "xiaomi-mimo":
      return await getXiaomiMimoUsage(id || "");
    default:
      return { message: `Usage API not implemented for ${provider}` };
  }
}
