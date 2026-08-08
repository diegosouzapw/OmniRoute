import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildFunctionalGatewayPredicate,
  type FunctionalGatewayGateSnapshot,
} from "../../src/app/api/v1/models/functionalGatewayPredicate.ts";

test("provider on makes its gateway-owned models eligible", () => {
  const snapshot: FunctionalGatewayGateSnapshot = {
    global: false,
    providers: new Map([["agentrouter", "on"]]),
    models: new Map(),
  };
  const pred = buildFunctionalGatewayPredicate(snapshot);
  assert.equal(
    pred({ id: "agentrouter/deepseek/deepseek-v4-flash", owned_by: "agentrouter" }),
    true
  );
  assert.equal(pred({ id: "deepseek/deepseek-v4-flash", owned_by: "deepseek" }), false);
});

test("model off wins over provider on", () => {
  const snapshot: FunctionalGatewayGateSnapshot = {
    global: false,
    providers: new Map([["agentrouter", "on"]]),
    models: new Map([["agentrouter/deepseek/deepseek-v4-flash", "off"]]),
  };
  const pred = buildFunctionalGatewayPredicate(snapshot);
  assert.equal(
    pred({ id: "agentrouter/deepseek/deepseek-v4-flash", owned_by: "agentrouter" }),
    false
  );
});

test("global on makes everything eligible, model off still wins", () => {
  const snapshot: FunctionalGatewayGateSnapshot = {
    global: true,
    providers: new Map(),
    models: new Map([["agentrouter/deepseek/deepseek-v4-flash", "off"]]),
  };
  const pred = buildFunctionalGatewayPredicate(snapshot);
  assert.equal(pred({ id: "agentrouter/gpt-5.6-luna", owned_by: "agentrouter" }), true);
  assert.equal(
    pred({ id: "agentrouter/deepseek/deepseek-v4-flash", owned_by: "agentrouter" }),
    false
  );
});
