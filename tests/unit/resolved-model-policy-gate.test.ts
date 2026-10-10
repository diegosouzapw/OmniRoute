/**
 * #12886 / #12899 / #14197 — resolved-model policy helpers used by
 * handleSingleModelChat (src/sse/handlers/chat/resolvedModelPolicy.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  comboAuthorizationOptions,
  comboGrantedTargetSet,
  createResolvedModelGate,
  effectivePolicyTargets,
  resolveAuthorizationContextModel,
} from "../../src/sse/handlers/chat/resolvedModelPolicy.ts";
import { isLocalModelPolicyResponse } from "../../src/shared/utils/resolvedModelAccess.ts";

test("authorization context falls back to the dispatched model string", () => {
  assert.equal(resolveAuthorizationContextModel("  my-combo ", "openai/gpt-4.1"), "my-combo");
  assert.equal(resolveAuthorizationContextModel("   ", "openai/gpt-4.1"), "openai/gpt-4.1");
  assert.equal(resolveAuthorizationContextModel(null, "openai/gpt-4.1"), "openai/gpt-4.1");
});

test("only a server-computed combo grant yields granted targets", () => {
  assert.equal(comboGrantedTargetSet(undefined, "openai", "gpt-4.1", "openai/gpt-4.1"), null);
  assert.equal(comboGrantedTargetSet(false, "openai", "gpt-4.1", "openai/gpt-4.1"), null);
  assert.deepEqual(
    [...(comboGrantedTargetSet(true, "openai", "gpt-4.1", "gpt-4.1") ?? [])],
    ["openai/gpt-4.1"]
  );
});

test("requestBody.model is a new target only when an override rewrote it", () => {
  assert.deepEqual(
    [...effectivePolicyTargets("openai", "gpt-4.1", "my-combo", "my-combo")],
    ["openai/gpt-4.1"]
  );
  assert.deepEqual(
    [...effectivePolicyTargets("openai", "gpt-4.1", "gpt-5", "my-combo")],
    ["openai/gpt-4.1", "openai/gpt-5"]
  );
  assert.deepEqual(
    [...effectivePolicyTargets("openai", "gpt-4.1", "anthropic/claude", "gpt-4.1")],
    ["openai/gpt-4.1", "anthropic/claude"]
  );
});

test("allowedCombos grants stored combos but never auto/* combos", () => {
  const info = { allowedCombos: ["combo/*"] };
  assert.deepEqual(comboAuthorizationOptions(info, "my-combo"), {
    authorizationContextModel: "my-combo",
    comboGrantsTargets: true,
  });
  assert.equal(comboAuthorizationOptions(info, "auto/best").comboGrantsTargets, false);
  assert.equal(
    comboAuthorizationOptions({ allowedCombos: ["other"] }, "my-combo").comboGrantsTargets,
    false
  );
});

test("gate skips granted targets and fails closed on the rest", async () => {
  const gate = createResolvedModelGate({
    apiKeyInfo: { id: "key" },
    apiKey: null, // metadata without a key → policy unavailable
    contextModel: "my-combo",
    comboGrantsTargets: true,
    provider: "openai",
    model: "gpt-4.1",
    modelStr: "openai/gpt-4.1",
  });
  assert.equal(await gate(["openai/gpt-4.1"]), null, "the combo's own target is granted");

  const rejection = await gate(["openai/gpt-4.1", "openai/gpt-5"]);
  assert.ok(rejection, "an override target outside the grant is still checked");
  assert.equal(rejection.status, 503);
  assert.equal(isLocalModelPolicyResponse(rejection), true);
});

test("gate admits everything when the request carries no API-key metadata", async () => {
  const gate = createResolvedModelGate({
    apiKeyInfo: null,
    apiKey: null,
    contextModel: null,
    comboGrantsTargets: false,
    provider: "openai",
    model: "gpt-4.1",
    modelStr: "openai/gpt-4.1",
  });
  assert.equal(await gate(["openai/gpt-5"]), null);
});
