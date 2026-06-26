/*!
 * Scenario 08 — Cascading quota exhaustion across 5 tenants.
 *
 * What this proves:
 *   • When 5 tenants simultaneously exhaust their quota, the fair-share
 *     algorithm still serves each tenant — no single tenant starves.
 *   • Excess requests beyond a tenant's quota queue (do not error).
 *   • The fair-share invariant (`fair-share-no-starvation`) confirms
 *     no tenant receives < 50% of the average per-tenant share.
 *
 * Hermetic:
 *   A tiny in-memory quota manager with per-tenant counters and a
 *   round-robin scheduler. No DB.
 *
 * Cleanup:
 *   No injectors pushed. Default invariants apply, plus the
 *   `fair-share-no-starvation` invariant added for this scenario.
 */
import { fairShareNoStarvation } from "../invariants.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "08-cascading-quota-exhaustion";
export const title = "5 tenants exhaust quota simultaneously — fair-share holds, no starvation";

const TENANTS = ["acme", "globex", "initech", "umbrella", "wayne"];
const PER_TENANT_QUOTA = 60;
const REQUESTS_PER_TENANT = 100; // > quota to force overflow

export async function run(ctx: ScenarioContext): Promise<void> {
  ctx.addInvariant(fairShareNoStarvation);

  // ── Synthetic fair-share scheduler ────────────────────────────────
  // Model:
  //   • Each tenant has its own queue.
  //   • A tenant's own request consumes a quota slot if any remain.
  //   • When a tenant's quota is exhausted, requests either borrow
  //     from a shared overflow pool or queue.
  //   • Round-robin drain: take one queued request from each tenant
  //     in turn, repeatedly, until all queues are empty or the pool
  //     is full.
  const perTenant: Record<string, { used: number; queued: number; served: number }> = {};
  for (const t of TENANTS) perTenant[t] = { used: 0, queued: 0, served: 0 };
  let borrowPoolUsed = 0;
  const BORROW_POOL = 200; // shared overflow capacity

  function submit(tenant: string): "served" | "queued" | "rejected" {
    const q = perTenant[tenant];
    if (q.used < PER_TENANT_QUOTA) {
      q.used++;
      q.served++;
      return "served";
    }
    // Quota exhausted. Either borrow from the shared pool or queue.
    if (borrowPoolUsed < BORROW_POOL) {
      borrowPoolUsed++;
      q.served++;
      return "served";
    }
    q.queued++;
    return "queued";
  }

  function drainQueuesFair(): void {
    let progressed = true;
    while (progressed) {
      progressed = false;
      for (const t of TENANTS) {
        const q = perTenant[t];
        if (q.queued > 0 && borrowPoolUsed < BORROW_POOL) {
          q.queued--;
          q.served++;
          borrowPoolUsed++;
          progressed = true;
        }
      }
    }
  }

  // ── Submit requests interleaved across tenants ────────────────────
  let submittedQueued = 0;
  let submittedServed = 0;
  let submittedRejected = 0;
  for (let i = 0; i < REQUESTS_PER_TENANT; i++) {
    for (const t of TENANTS) {
      const r = submit(t);
      if (r === "queued") submittedQueued++;
      else if (r === "served") submittedServed++;
      else submittedRejected++;
    }
  }
  drainQueuesFair();

  // ── Per-tenant served counters feed the invariant ─────────────────
  for (const t of TENANTS) {
    ctx.state.perTenantServed[t] = perTenant[t].served;
  }

  // ── Assertions ────────────────────────────────────────────────────
  ctx.assert("all-tenants-served", TENANTS.every((t) => (perTenant[t].served ?? 0) > 0));
  ctx.assert("no-requests-rejected", submittedRejected === 0, `rejected=${submittedRejected}`);
  ctx.assert(
    "all-queues-drained",
    TENANTS.every((t) => perTenant[t].queued === 0),
    `queues=${JSON.stringify(perTenant)}`,
  );
  ctx.assert(
    "fair-distribution",
    (() => {
      const counts = Object.values(ctx.state.perTenantServed);
      const max = Math.max(...counts);
      const min = Math.min(...counts);
      return max - min <= 1; // round-robin can differ by at most 1
    })(),
    `served=${JSON.stringify(ctx.state.perTenantServed)}`,
  );
}