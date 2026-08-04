import { test, after } from "node:test";
import assert from "node:assert/strict";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import {
  removeFeatureFlagOverride,
  setFeatureFlagOverride,
} from "../../src/lib/db/featureFlags.ts";
import {
  getFunctionalGatewayGlobalState,
  getFunctionalGatewayProviderSetting,
  getFunctionalGatewayModelSetting,
  setFunctionalGatewayProviderSetting,
  setFunctionalGatewayModelSetting,
  getFunctionalGatewaySettingsBulk,
} from "../../src/lib/db/functionalGatewayMirrors.ts";

const FLAG_KEY = "EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS";

after(() => {
  removeFeatureFlagOverride(FLAG_KEY);
  resetDbInstance();
});

test("global state defaults to off", () => {
  const { enabled } = getFunctionalGatewayGlobalState();
  assert.equal(enabled, false);
});

test("can flip global on via feature-flag override (the dashboard/env mechanism)", () => {
  setFeatureFlagOverride(FLAG_KEY, "true");
  const { enabled, source } = getFunctionalGatewayGlobalState();
  assert.equal(enabled, true);
  assert.equal(source, "db");
});

test("provider and model settings default to null", () => {
  assert.equal(getFunctionalGatewayProviderSetting("agentrouter"), null);
  assert.equal(
    getFunctionalGatewayModelSetting("agentrouter/deepseek/deepseek-v4-flash"),
    null
  );
});

test("bulk settings reflect provider/model overrides", () => {
  setFunctionalGatewayProviderSetting("agentrouter", "on");
  setFunctionalGatewayModelSetting("openrouter/deepseek/deepseek-v4-flash", "off");
  const { providers, models } = getFunctionalGatewaySettingsBulk();
  assert.equal(providers.get("agentrouter"), "on");
  assert.equal(models.get("openrouter/deepseek/deepseek-v4-flash"), "off");
  setFunctionalGatewayProviderSetting("agentrouter", null);
  setFunctionalGatewayModelSetting("openrouter/deepseek/deepseek-v4-flash", null);
});
