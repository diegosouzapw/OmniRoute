/**
 * A persisted per-connection cooldown always wins over the in-memory
 * transient rate-limit signal: a future rateLimitedUntil skips the
 * connection even when the transient set would reopen it.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getPersistedConnectionCooldownSkipReason,
  resolvePersistedConnectionCooldownSkipReason,
} from "../../open-sse/services/combo/comboPredicates.ts";

const NOW = 1_700_000_000_000;
const TARGET = {
  modelStr: "zai/glm-5.3",
  connectionId: "0217fa47-157d-4f94-9149-0e2101097fa5",
};
const SIBLING = {
  modelStr: "zai/glm-5.3b",
  connectionId: "b3d7aa19-4f2c-4e81-9f55-1c2e7a0d9f44",
};

function iso(offsetMs: number): string {
  return new Date(NOW + offsetMs).toISOString();
}

describe("combo transient vs persisted precedence", () => {
  it("case 1: future cooldown skips even when transient allows (sync)", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      const reason = getPersistedConnectionCooldownSkipReason(
        TARGET,
        { testStatus: "active", rateLimitedUntil: iso(60_000) },
        true
      );
      assert.ok(reason);
      assert.match(reason!, /has persisted cooldown until/);
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 2: future cooldown skips even when transient allows (async)", async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      const reason = await resolvePersistedConnectionCooldownSkipReason(
        TARGET,
        async () => ({ testStatus: "active", rateLimitedUntil: iso(60_000) }),
        true
      );
      assert.ok(reason);
      assert.match(reason!, /has persisted cooldown until/);
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 3: transient bypass survives without a future cooldown", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      assert.equal(
        getPersistedConnectionCooldownSkipReason(
          TARGET,
          { testStatus: "active", rateLimitedUntil: iso(-60_000) },
          true
        ),
        null
      );
      assert.equal(
        getPersistedConnectionCooldownSkipReason(
          TARGET,
          { testStatus: "active", rateLimitedUntil: null },
          true
        ),
        null
      );
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 4: future cooldown skips without transient (no regression)", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      const reason = getPersistedConnectionCooldownSkipReason(TARGET, {
        testStatus: "active",
        rateLimitedUntil: iso(60_000),
      });
      assert.ok(reason);
      assert.match(reason!, /has persisted cooldown until/);
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 5: cooldown equal to now is not future, dispatch proceeds", (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      assert.equal(
        getPersistedConnectionCooldownSkipReason(
          TARGET,
          { testStatus: "active", rateLimitedUntil: iso(0) },
          true
        ),
        null
      );
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 6: pre-dispatch gate honors future cooldown with transient set", async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      const reason = await resolvePersistedConnectionCooldownSkipReason(
        TARGET,
        async () => ({ testStatus: "active", rateLimitedUntil: iso(60_000) }),
        true
      );
      assert.ok(reason);
      assert.match(reason!, /has persisted cooldown until/);
    } finally {
      t.mock.timers.reset();
    }
  });

  it("case 7: intra-run transient set does not reopen a persisted sibling", async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: NOW });
    try {
      // First: a transient 429 on provider P populates the in-memory set
      // (mirrors the exhaustion writer adding the provider on 429).
      const transientRateLimitedProviders = new Set<string>();
      transientRateLimitedProviders.add("zai");
      const allowRateLimitedConnection =
        Boolean("zai" && "zai" !== "unknown") && transientRateLimitedProviders.has("zai");
      assert.equal(allowRateLimitedConnection, true);
      // Then: the sibling connection carries a persisted future cooldown —
      // the pre-dispatch read must still skip it.
      const reason = await resolvePersistedConnectionCooldownSkipReason(
        SIBLING,
        async () => ({ testStatus: "active", rateLimitedUntil: iso(60_000) }),
        allowRateLimitedConnection
      );
      assert.ok(reason);
      assert.match(reason!, /has persisted cooldown until/);
    } finally {
      t.mock.timers.reset();
    }
  });
});
