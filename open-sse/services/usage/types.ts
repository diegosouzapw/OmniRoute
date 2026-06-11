/**
 * Usage Fetcher - Get usage data from provider APIs
 */

import { PROVIDERS } from "../../config/constants.ts";

import { USAGE_FETCHER_PROVIDERS } from "./core.ts";



export type JsonRecord = Record<string, unknown>;


export type UsageQuota = {
  used: number;
  total: number;
  remaining?: number;
  remainingPercentage?: number;
  resetAt: string | null;
  unlimited: boolean;
  /**
   * True when the upstream provider reported the remaining fraction. False
   * means the API didn't include the field and the 0 value here is a sentinel,
   * NOT a confirmed-exhausted state. Antigravity-specific.
   */
  fractionReported?: boolean;
  quotaSource?: "retrieveUserQuota" | "fetchAvailableModels" | "localUsageHistory";
  displayName?: string;
  details?: Array<{
    name: string;
    used: number;
  }>;
  currency?: string;
  grantedBalance?: number;
  toppedUpBalance?: number;
};


export type UsageProviderConnection = JsonRecord & {
  id?: string;
  provider?: string;
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: JsonRecord;
  projectId?: string;
  email?: string;
};


export type SubscriptionCacheEntry = {
  data: unknown;
  fetchedAt: number;
};



export type UsageFetcherProvider = (typeof USAGE_FETCHER_PROVIDERS)[number];

 // Don't prevent process exit

export interface AntigravityUsageOptions {
  forceRefresh?: boolean;
}

