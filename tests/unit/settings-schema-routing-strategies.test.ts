import test from "node:test";
import assert from "node:assert/strict";
import { ROUTING_STRATEGIES } from "@/shared/constants/routingStrategies";
import { updateSettingsSchema as settingsRouteSchema } from "@/shared/validation/settingsSchemas";
import { updateSettingsSchema as sharedSettingsSchema } from "@/shared/validation/schemas";

for (const strategy of ROUTING_STRATEGIES) {
  test(`settings route schema accepts fallbackStrategy=${strategy.value}`, () => {
    const parsed = settingsRouteSchema.parse({ fallbackStrategy: strategy.value });
    assert.equal(parsed.fallbackStrategy, strategy.value);
  });

  test(`shared settings schema accepts fallbackStrategy=${strategy.value}`, () => {
    const parsed = sharedSettingsSchema.parse({ fallbackStrategy: strategy.value });
    assert.equal(parsed.fallbackStrategy, strategy.value);
  });
}

test("settings schemas accept cooldown-aware retry knobs", () => {
  const payload = {
    requestRetry: 3,
    maxRetryIntervalSec: 30,
  };

  const routeParsed = settingsRouteSchema.parse(payload);
  const sharedParsed = sharedSettingsSchema.parse(payload);

  assert.equal(routeParsed.requestRetry, 3);
  assert.equal(routeParsed.maxRetryIntervalSec, 30);
  assert.equal(sharedParsed.requestRetry, 3);
  assert.equal(sharedParsed.maxRetryIntervalSec, 30);
});

test("settings schemas accept wsAuth toggle", () => {
  const routeParsed = settingsRouteSchema.parse({ wsAuth: true });
  const sharedParsed = sharedSettingsSchema.parse({ wsAuth: false });

  assert.equal(routeParsed.wsAuth, true);
  assert.equal(sharedParsed.wsAuth, false);
});

test("settings schemas accept combo configuration modes", () => {
  const routeParsed = settingsRouteSchema.parse({ comboConfigMode: "expert" });
  const sharedParsed = sharedSettingsSchema.parse({ comboConfigMode: "guided" });

  assert.equal(routeParsed.comboConfigMode, "expert");
  assert.equal(sharedParsed.comboConfigMode, "guided");
  assert.equal(settingsRouteSchema.safeParse({ comboConfigMode: "compact" }).success, false);
  assert.equal(sharedSettingsSchema.safeParse({ comboConfigMode: "compact" }).success, false);
});
