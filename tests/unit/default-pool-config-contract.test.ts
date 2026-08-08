import test from "node:test";
import assert from "node:assert/strict";

import { normalizePoolConfig } from "../../open-sse/executors/default/poolConfig.ts";

test("normalizePoolConfig preserves a complete registry pool contract", () => {
  assert.deepEqual(
    normalizePoolConfig({
      minSessions: 1,
      maxSessions: 3,
      cooldownBase: 2000,
      cooldownMax: 5000,
      cooldownJitter: 100,
      requestTimeout: 30000,
      requestJitter: 50,
    }),
    {
      minSessions: 1,
      maxSessions: 3,
      cooldownBase: 2000,
      cooldownMax: 5000,
      cooldownJitter: 100,
      requestTimeout: 30000,
      requestJitter: 50,
    }
  );
});

test("normalizePoolConfig rejects incomplete registry values", () => {
  assert.equal(normalizePoolConfig({ minSessions: 1, maxSessions: 3 }), null);
});
