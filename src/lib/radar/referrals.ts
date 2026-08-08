/**
 * referrals.ts — pure helpers for the Radar "referral links / free credits"
 * feature (D28).
 *
 * DELIBERATELY DB-FREE: this file must be safe to import from a `"use
 * client"` component (e.g. the providers dashboard) without pulling in
 * `@/lib/db/*` (better-sqlite3 is Node-only and cannot be bundled into the
 * browser). The DB-touching accessors (`getRadarReferrals`,
 * `getDefaultReferralFor`) live in `./index.ts` and delegate the actual
 * "which referral is the default for this provider" decision back to
 * `findDefaultReferral` here, so the logic is defined exactly once and both
 * the server accessor and the client UI use the same rule.
 */

import type { RadarReferral } from "./feedSchema";

/**
 * Find the fixed, isDefault:true referral link for a provider.
 *
 * Only looks at `fixed` referrals by design — campaigns are never used as
 * the "default" link on the provider name (they are temporary/opt-in extras
 * surfaced separately on the Radar "free credits" tab).
 */
export function findDefaultReferral(
  fixed: RadarReferral[],
  provider: string,
): RadarReferral | null {
  return fixed.find((r) => r.provider === provider && r.isDefault === true) ?? null;
}
