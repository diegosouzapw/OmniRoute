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

import {
  antigravityUserAgent,
  getAntigravityHeaders,
  getAntigravityLoadCodeAssistMetadata,
} from "../antigravityHeaders.ts";

import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../../executors/antigravity.ts";

// Quota / usage upstream URLs (overridable for testing or relays).
export const CROF_USAGE_URL = process.env.OMNIROUTE_CROF_USAGE_URL ?? "https://crof.ai/usage_api/";

export const GEMINI_CLI_USAGE_URL =
  process.env.OMNIROUTE_GEMINI_CLI_USAGE_URL ??
  "https://cloudcode-pa.googleapis.com/v1internal:loadCodeAssist";

export const CODEWHISPERER_BASE_URL =
  process.env.OMNIROUTE_CODEWHISPERER_BASE_URL ?? "https://codewhisperer.us-east-1.amazonaws.com";

// Antigravity API config (credentials from PROVIDERS via credential loader)
export const ANTIGRAVITY_CONFIG = {
  quotaApiUrls: getAntigravityFetchAvailableModelsUrls(),
  loadProjectApiUrl: "https://daily-cloudcode-pa.sandbox.googleapis.com/v1internal:loadCodeAssist",
  tokenUrl: "https://oauth2.googleapis.com/token",
  get clientId() {
    return PROVIDERS.antigravity?.clientId;
  },
  get clientSecret() {
    return PROVIDERS.antigravity?.clientSecret;
  },
  get userAgent() {
    return antigravityUserAgent();
  },
};

// Codex (OpenAI) API config
export const CODEX_CONFIG = {
  usageUrl: "https://chatgpt.com/backend-api/wham/usage",
};

// Claude API config
export const CLAUDE_CONFIG = {
  oauthUsageUrl: "https://api.anthropic.com/api/oauth/usage",
  usageUrl: "https://api.anthropic.com/v1/organizations/{org_id}/usage",
  settingsUrl: "https://api.anthropic.com/v1/settings",
  apiVersion: "2023-06-01",
};

// Kimi Coding API config
export const KIMI_CONFIG = {
  baseUrl: "https://api.kimi.com/coding/v1",
  usageUrl: "https://api.kimi.com/coding/v1/usages",
  apiVersion: "2023-06-01",
};

export const NANOGPT_CONFIG = {
  usageUrl: "https://nano-gpt.com/api/subscription/v1/usage",
};

export const OPENCODE_GO_QUOTA_URL =
  process.env.OMNIROUTE_OPENCODE_GO_QUOTA_URL ?? "https://api.z.ai/api/monitor/usage/quota/limit";

export const OPENCODE_GO_QUOTA_TOTALS = {
  session: 12,
  weekly: 30,
  mcp_monthly: 60,
} as const;

export const OPENCODE_GO_QUOTA_ORDER = ["session", "weekly", "mcp_monthly"] as const;

export type OpenCodeGoQuotaName = (typeof OPENCODE_GO_QUOTA_ORDER)[number];

// Cursor dashboard usage API config
// The endpoint that powers https://cursor.com/dashboard/spending. Validates the WorkOS
// session via the WorkosCursorSessionToken cookie (format: `${userId}::${jwt}`) and
// rejects requests without a matching Origin/Referer (Invalid origin for state-changing request).
export const CURSOR_USAGE_CONFIG = {
  usageUrl: "https://cursor.com/api/dashboard/get-current-period-usage",
  origin: "https://cursor.com",
  referer: "https://cursor.com/dashboard/spending",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

export const MINIMAX_USAGE_CONFIG = {
  minimax: {
    usageUrls: [
      "https://www.minimax.io/v1/token_plan/remains",
      "https://api.minimax.io/v1/api/openplatform/coding_plan/remains",
    ],
  },
  "minimax-cn": {
    usageUrls: [
      "https://www.minimaxi.com/v1/api/openplatform/coding_plan/remains",
      "https://api.minimaxi.com/v1/api/openplatform/coding_plan/remains",
    ],
  },
} as const;

export const GLM_QUOTA_ORDER = [
  "5 Hours Quota",
  "Weekly Quota",
  "Monthly Tools",
  "Tokens",
  "Time Limit",
];
