/**
 * Regression: combo dispatch burned real upstream 429s against a connection
 * that SQLite already had on a future rateLimitedUntil.
 *
 * executeTarget checked circuit breaker, global provider cooldown, model
 * lockout and the semaphore — but not the persisted connection cooldown.
 * AUTH only learned "allRateLimited" after the credential lookup, so a burst
 * of max_concurrent requests went out before the skip kicked in.
 *
 * getPersistedConnectionCooldownSkipReason() is the pre-dispatch gate.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getPersistedConnectionCooldownSkipReason,
  resolvePersistedConnectionCooldownSkipReason,
} from "../../../open-sse/services/combo/comboPredicates.ts";

const TARGET = {
  modelStr: "zai/glm-5.3",
  connectionId: "0217fa47-157d-4f94-9149-0e2101097fa5",
};

describe("combo persisted-cooldown pre-skip", () => {
  it("skips a future rateLimitedUntil even when testStatus is unavailable", () => {
    const until = new Date(Date.now() + 146 * 60 * 60 * 1000).toISOString();
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "unavailable",
      rateLimitedUntil: until,
    });
    assert.ok(reason);
    assert.match(reason!, /persisted cooldown until/);
    assert.match(reason!, /0217fa47-157d-4f94-9149-0e2101097fa5/);
  });

  it("skips a future cooldown even if testStatus was wiped back to active", () => {
    const until = new Date(Date.now() + 60_000).toISOString();
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "active",
      rateLimitedUntil: until,
    });
    assert.ok(reason);
    assert.match(reason!, /persisted cooldown until/);
  });

  it("skips terminal statuses with no cooldown timestamp", () => {
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "credits_exhausted",
      rateLimitedUntil: null,
    });
    assert.ok(reason);
    assert.match(reason!, /status=credits_exhausted/);
  });

  it("does not skip a healthy connection", () => {
    assert.equal(
      getPersistedConnectionCooldownSkipReason(TARGET, {
        testStatus: "active",
        rateLimitedUntil: null,
      }),
      null
    );
  });

  it("skips a RECENT unavailable connection that has no cooldown timestamp yet", () => {
    // AUTH's markAccountUnavailable() writes testStatus before (and sometimes
    // without) rate_limited_until — a burst must not dispatch into that window.
    // #12168: the skip is now bounded by lastErrorAt, so the failure must be
    // recent for the bare label to still block.
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "unavailable",
      rateLimitedUntil: null,
      lastErrorAt: new Date().toISOString(),
    });
    assert.ok(reason);
    assert.match(reason!, /status=unavailable/);
  });

  it("#12168: does NOT skip a stale unavailable label once the grace window passed", () => {
    // This inverts the pre-#12168 assertion, which locked in the bug: an
    // `unavailable` row whose failure is old (and whose cooldown, if any, has
    // expired) was skipped unconditionally. Because this gate runs BEFORE
    // dispatch, that prevented the very success that would call
    // clearAccountError() — and the recovery job cannot rescue a row with no
    // rateLimitedUntil either. A whole pool could stay dark forever.
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "unavailable",
      rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
      lastErrorAt: new Date(Date.now() - 10 * 60_000).toISOString(),
    });
    assert.equal(reason, null);
  });

  it("#12168: does NOT skip an unavailable row with no timestamps at all", () => {
    // The orphan state: testStatus left as `unavailable` while rateLimitedUntil
    // was nulled. Unbounded skipping here is what produced ALL_TARGETS_SKIPPED
    // with zero upstream attempts.
    const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
      testStatus: "unavailable",
      rateLimitedUntil: null,
      lastErrorAt: null,
    });
    assert.equal(reason, null);
  });

  it("does not skip an expired cooldown on an otherwise healthy connection", () => {
    assert.equal(
      getPersistedConnectionCooldownSkipReason(TARGET, {
        testStatus: "active",
        rateLimitedUntil: new Date(Date.now() - 60_000).toISOString(),
      }),
      null
    );
  });

  it("does not skip when allowRateLimitedConnection is set", () => {
    const until = new Date(Date.now() + 60_000).toISOString();
    assert.equal(
      getPersistedConnectionCooldownSkipReason(
        TARGET,
        { testStatus: "unavailable", rateLimitedUntil: until },
        true
      ),
      null
    );
  });

  it("does not skip when the connection row is missing", () => {
    assert.equal(getPersistedConnectionCooldownSkipReason(TARGET, null), null);
    assert.equal(
      getPersistedConnectionCooldownSkipReason(
        { modelStr: "x", connectionId: null },
        {
          testStatus: "unavailable",
          rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
        }
      ),
      null
    );
  });
});

/**
 * The retry path is the second half of the same leak: the pre-skip above ran
 * ONCE, before the retry loop, so an attempt that failed with a quota 429 was
 * retried straight back into the connection its own failure had just locked
 * ("Trying model 1/7: zai/glm-5.3 (retry 1)" after "already marked unavailable
 * until …"). The retry re-check must read the row FRESH — the 5s readCache can
 * still serve the pre-429 snapshot during a burst.
 */
describe("combo persisted-cooldown re-check on retry", () => {
  it("skips once a sibling attempt has written the cooldown mid-flight", async () => {
    let calls = 0;
    const fetchConnection = async () => {
      calls++;
      // First read (before dispatch) is clean; by the retry the 429 has landed.
      return calls === 1
        ? { testStatus: "active", rateLimitedUntil: null }
        : {
            testStatus: "unavailable",
            rateLimitedUntil: new Date(Date.now() + 146 * 60 * 60 * 1000).toISOString(),
          };
    };

    assert.equal(await resolvePersistedConnectionCooldownSkipReason(TARGET, fetchConnection), null);

    const retryReason = await resolvePersistedConnectionCooldownSkipReason(
      TARGET,
      fetchConnection
    );
    assert.ok(retryReason);
    assert.match(retryReason!, /persisted cooldown until/);
    assert.equal(calls, 2, "each attempt must re-read the connection");
  });

  it("does not read the connection when allowRateLimitedConnection is set", async () => {
    let calls = 0;
    const reason = await resolvePersistedConnectionCooldownSkipReason(
      TARGET,
      async () => {
        calls++;
        return { testStatus: "unavailable", rateLimitedUntil: null };
      },
      true
    );
    assert.equal(reason, null);
    assert.equal(calls, 0);
  });

  it("never blocks dispatch when the connection read throws", async () => {
    const reason = await resolvePersistedConnectionCooldownSkipReason(TARGET, async () => {
      throw new Error("SQLITE_BUSY");
    });
    assert.equal(reason, null);
  });

  it("does not read the connection for a target without a connectionId", async () => {
    let calls = 0;
    const reason = await resolvePersistedConnectionCooldownSkipReason(
      { modelStr: "zai/glm-5.3", connectionId: null },
      async () => {
        calls++;
        return { testStatus: "unavailable", rateLimitedUntil: null };
      }
    );
    assert.equal(reason, null);
    assert.equal(calls, 0);
  });
});
