import test from "node:test";
import assert from "node:assert/strict";

test("types barrel supports the model cooldown error payload consumer", async () => {
  const { buildModelCooldownBody } = await import("../../open-sse/utils/error.ts");

  assert.deepEqual(buildModelCooldownBody({ model: "gpt-4o", retryAfterSec: 1.2 }), {
    error: {
      message: "All credentials for model gpt-4o are cooling down",
      type: "rate_limit_error",
      code: "model_cooldown",
      model: "gpt-4o",
      reset_seconds: 2,
    },
  });
});
