/**
 * #12546 — Action-count badges must survive xp_audit_log retention pruning.
 *
 * Regression guard for the durable per-key/per-action counter (Option A,
 * endorsed by the maintainer). Before the fix, both getActionCount()
 * (src/lib/gamification/badges.ts) and checkActionCountBadges()
 * (src/lib/gamification/events.ts) counted rows directly in xp_audit_log, which
 * cleanupXpAuditLog() prunes by retention.xpAuditLog (default 30 days). So on a
 * default install a user who crossed a lifetime milestone lost the badge as soon
 * as the audit rows aged out — the "lifetime" milestones were really
 * "requests in the last 30 days".
 *
 * Each test drives real activity through addXp(), ages the audit rows past the
 * retention window, runs the ACTUAL prune (cleanupXpAuditLog), and only then
 * evaluates the badge. The durable counter must keep the badge unlockable.
 *
 * RED on base: the audit rows are gone, the count reads 0/1, the milestone
 * badge never unlocks. GREEN with the fix: the durable counter still reads the
 * lifetime total.
 */
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { addXp, hasBadge } from "../../../src/lib/db/gamification";
import { evaluateBadges, seedBuiltinBadges } from "../../../src/lib/gamification/badges";
import { emitGamificationEvent } from "../../../src/lib/gamification/events";
import { cleanupXpAuditLog } from "../../../src/lib/db/cleanup";
import { getDbInstance } from "../../../src/lib/db/core";

// token-consumer requires 1,000 lifetime "request" actions. Using a milestone
// well above 1 keeps the discriminant robust: a single fresh event emitted after
// the prune can never satisfy it from the (empty) audit log alone.
const CONSUMER_THRESHOLD = 1000;

function seedLifetimeRequests(apiKeyId: string, n: number): void {
  for (let i = 0; i < n; i++) {
    addXp(apiKeyId, "request", 1);
  }
}

function ageAndPruneAuditLog(apiKeyId: string): void {
  const db = getDbInstance();
  // Push the audit rows well past the default 30-day retention window.
  db.prepare("UPDATE xp_audit_log SET created_at = datetime('now', '-60 days') WHERE api_key_id = ?").run(
    apiKeyId
  );
}

describe("#12546 action-count badges survive xp_audit_log pruning", () => {
  before(async () => {
    await seedBuiltinBadges();
  });

  it("evaluateBadges() still unlocks the lifetime milestone after the audit log is pruned", async () => {
    const key = `dc-eval-${Date.now()}`;
    const db = getDbInstance();

    seedLifetimeRequests(key, CONSUMER_THRESHOLD);
    ageAndPruneAuditLog(key);

    const pruneResult = await cleanupXpAuditLog();
    assert.ok(pruneResult.deleted >= CONSUMER_THRESHOLD, "the prune must have deleted the aged rows");

    const remaining = db
      .prepare("SELECT COUNT(*) AS c FROM xp_audit_log WHERE api_key_id = ?")
      .get(key) as { c: number };
    assert.equal(remaining.c, 0, "sanity: no audit rows remain for this key after the prune");

    // getActionCount() (the function named in the issue) is exercised through
    // evaluateBadges(). With the durable counter it still reads the lifetime
    // total; against the pruned audit log it reads 0.
    const unlocked = await evaluateBadges(key, "request");
    assert.ok(
      unlocked.includes("token-consumer"),
      "token-consumer must unlock from the durable counter after the audit log is pruned"
    );
  });

  it("checkActionCountBadges() (via emitGamificationEvent) still unlocks the milestone after pruning", async () => {
    const key = `dc-emit-${Date.now()}`;

    seedLifetimeRequests(key, CONSUMER_THRESHOLD);
    ageAndPruneAuditLog(key);
    await cleanupXpAuditLog();

    // A single fresh request. On base this leaves exactly one audit row, so the
    // COUNT(*) source reads 1 (< 1000) and the badge stays locked. With the fix,
    // checkActionCountBadges() reads the durable counter (>= 1000) and unlocks.
    await emitGamificationEvent({ apiKeyId: key, action: "request" });

    assert.equal(
      hasBadge(key, "token-consumer"),
      true,
      "token-consumer must unlock via the events.ts path from the durable counter"
    );
  });
});
