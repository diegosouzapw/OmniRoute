/**
 * Code Assist (loadCodeAssist) subscription tier extraction.
 * Mirrors Antigravity-Manager src-tauri/src/modules/quota.rs fetch_project_id().
 */

type JsonRecord = Record<string, unknown>;

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function pickTierField(tier: unknown, field: "name" | "id"): string | null {
  const record = toRecord(tier);
  const value = record[field];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function isIneligible(subscription: JsonRecord): boolean {
  const ineligible = subscription.ineligibleTiers;
  return Array.isArray(ineligible) && ineligible.length > 0;
}

function findDefaultAllowedTier(subscription: JsonRecord): JsonRecord | null {
  if (!Array.isArray(subscription.allowedTiers)) return null;
  for (const tierValue of subscription.allowedTiers) {
    const tier = toRecord(tierValue);
    if (tier.isDefault) return tier;
  }
  return null;
}

/**
 * Display subscription tier from loadCodeAssist (paid → current → restricted default).
 */
export function extractCodeAssistSubscriptionTier(subscriptionInfo: unknown): string | null {
  const subscription = toRecord(subscriptionInfo);
  if (Object.keys(subscription).length === 0) return null;

  let tier =
    pickTierField(subscription.paidTier, "name") || pickTierField(subscription.paidTier, "id");

  if (!tier) {
    if (!isIneligible(subscription)) {
      tier =
        pickTierField(subscription.currentTier, "name") ||
        pickTierField(subscription.currentTier, "id");
    } else {
      const defaultTier = findDefaultAllowedTier(subscription);
      if (defaultTier) {
        const name = pickTierField(defaultTier, "name");
        const id = pickTierField(defaultTier, "id");
        if (name) tier = `${name} (Restricted)`;
        else if (id) tier = `${id} (Restricted)`;
      }
    }
  }

  return tier;
}

/**
 * Tier ID for onboardUser tier_id (paid → current → restricted default → legacy-tier).
 */
export function extractCodeAssistOnboardTierId(subscriptionInfo: unknown): string {
  const subscription = toRecord(subscriptionInfo);

  const paidId = pickTierField(subscription.paidTier, "id");
  if (paidId) return paidId;

  if (!isIneligible(subscription)) {
    const currentId = pickTierField(subscription.currentTier, "id");
    if (currentId) return currentId;
  }

  const defaultTier = findDefaultAllowedTier(subscription);
  const defaultId = defaultTier ? pickTierField(defaultTier, "id") : null;
  if (defaultId) return defaultId;

  const currentId = pickTierField(subscription.currentTier, "id");
  if (currentId) return currentId;

  return "legacy-tier";
}
