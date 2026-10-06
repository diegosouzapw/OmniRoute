/**
 * One-time, idempotent backfill: ensure Volcano Ark plan connections carry
 * `autoSync:true` so the 24h modelSyncScheduler picks them up.
 *
 * Plan connections created before volcenginePlanBinding set `autoSync` do not
 * have the flag, so the scheduler (which only syncs connections whose
 * providerSpecificData.autoSync === true) silently skipped them. This runs
 * once per boot, patches any missing flag in place, and exits. It is safe to
 * re-run — updateProviderConnection merges the patch.
 */

import { getProviderConnections, updateProviderConnection } from "@/lib/db/providers";

const VOLC_PLAN_PROVIDERS = new Set(["volcengine-agent-plan", "volcengine-coding-plan"]);

let backfilled = false;

export async function backfillVolcPlanAutoSync(): Promise<void> {
  if (backfilled) return;
  backfilled = true;
  try {
    const connections = await getProviderConnections();
    for (const conn of connections) {
      const provider = typeof conn.provider === "string" ? conn.provider : "";
      if (!VOLC_PLAN_PROVIDERS.has(provider)) continue;
      const psd =
        conn.providerSpecificData && typeof conn.providerSpecificData === "object"
          ? (conn.providerSpecificData as Record<string, unknown>)
          : {};
      if (psd.autoSync === true) continue;
      const merged = { ...psd, autoSync: true };
      if (typeof conn.id !== "string" || !conn.id) continue;
      await updateProviderConnection(conn.id, {
        providerSpecificData: merged,
      });
    }
  } catch (error) {
    backfilled = false; // allow retry on next boot if this boot failed
    console.warn(
      "[VolcPlanAutoSync] backfill failed — will retry next boot:",
      (error as Error).message
    );
  }
}
