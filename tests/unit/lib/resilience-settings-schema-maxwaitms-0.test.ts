/**
 * requestQueueSettingsSchema previously clamped maxWaitMs to min(1), so an operator
 * PATCHing requestQueue.maxWaitMs: 0 through the settings API got a 400 before the
 * request ever reached normalizeRequestQueueSettings() (which #12902 already taught
 * to treat 0 as a disable sentinel). Without this schema relax, the fix is unreachable
 * through the real product surface.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { requestQueueSettingsSchema } from "../../../src/shared/validation/schemas/settings.ts";

test("requestQueueSettingsSchema accepts maxWaitMs=0 (disable sentinel)", () => {
  const result = requestQueueSettingsSchema.safeParse({ maxWaitMs: 0 });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.maxWaitMs, 0);
  }
});

test("requestQueueSettingsSchema still rejects a negative maxWaitMs", () => {
  const result = requestQueueSettingsSchema.safeParse({ maxWaitMs: -1 });
  assert.equal(result.success, false);
});

test("requestQueueSettingsSchema still rejects executionMaxWaitMs=0 (untouched by #12902)", () => {
  const result = requestQueueSettingsSchema.safeParse({ executionMaxWaitMs: 0 });
  assert.equal(result.success, false);
});
