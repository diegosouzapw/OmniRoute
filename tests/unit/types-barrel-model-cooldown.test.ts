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

test("model cooldown body includes optional retry_after ISO + credentials_cooling count", async () => {
  const { buildModelCooldownBody } = await import("../../open-sse/utils/error.ts");

  const iso = "2026-07-07T12:34:56.000Z";
  assert.deepEqual(
    buildModelCooldownBody({
      model: "openrouter/fusion",
      retryAfterSec: 30,
      retryAfterAt: iso,
      credentialsCoolingCount: 3,
    }),
    {
      error: {
        message: "All credentials for model openrouter/fusion are cooling down",
        type: "rate_limit_error",
        code: "model_cooldown",
        model: "openrouter/fusion",
        reset_seconds: 30,
        retry_after: iso,
        credentials_cooling: 3,
      },
    }
  );
});

test("model cooldown body omits retry_after / credentials_cooling when absent or invalid", async () => {
  const { buildModelCooldownBody } = await import("../../open-sse/utils/error.ts");

  assert.deepEqual(
    buildModelCooldownBody({
      model: "x",
      retryAfterSec: 5,
      retryAfterAt: null,
      credentialsCoolingCount: 0,
    }),
    {
      error: {
        message: "All credentials for model x are cooling down",
        type: "rate_limit_error",
        code: "model_cooldown",
        model: "x",
        reset_seconds: 5,
      },
    }
  );
});

test("model cooldown body projects hostile model and retry timestamp fields", async () => {
  const { buildModelCooldownBody } = await import("../../open-sse/utils/error.ts");
  const secret = "COOLDOWN_SECRET";
  const body = buildModelCooldownBody({
    model: `model access_token=${secret} /home/alice/model.ts`,
    retryAfterSec: Number.NaN,
    retryAfterAt: `2026-07-07T12:34:56.000Z password=${secret}`,
    credentialsCoolingCount: 2,
  });
  const serialized = JSON.stringify(body);

  assert.equal(body.error.message, "All credentials for the requested model are cooling down");
  assert.equal(body.error.model, undefined);
  assert.equal(body.error.retry_after, undefined);
  assert.equal(body.error.reset_seconds, 1);
  assert.equal(body.error.credentials_cooling, 2);
  assert.ok(!serialized.includes(secret));
  assert.ok(!serialized.includes("/home/alice"));
});

test("modelCooldownResponse emits HTTP 429 with Retry-After header and retry_after ISO in body (#6460)", async () => {
  const { modelCooldownResponse } = await import("../../open-sse/utils/error.ts");

  const iso = "2026-07-07T12:34:56.000Z";
  const res = modelCooldownResponse({
    model: "openrouter/fusion",
    retryAfter: iso,
    credentialsCoolingCount: 4,
  });

  assert.equal(res.status, 429);
  assert.ok(res.headers.get("Retry-After"), "Retry-After header must be set");
  const body = await res.json();
  assert.equal(body.error.code, "model_cooldown");
  assert.equal(body.error.type, "rate_limit_error");
  assert.equal(body.error.model, "openrouter/fusion");
  assert.equal(body.error.retry_after, iso);
  assert.equal(body.error.credentials_cooling, 4);
  assert.equal(typeof body.error.reset_seconds, "number");
});
