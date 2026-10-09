import assert from "node:assert/strict";
import test from "node:test";
import {
  checkResolvedModelPermission,
  hasApiKeyModelRestrictions,
  isLocalModelPolicyResponse,
  markLocalModelPolicyResponse,
} from "../../src/shared/utils/resolvedModelAccess.ts";

test("resolved-model policy recognizes every persisted restriction", () => {
  assert.equal(hasApiKeyModelRestrictions({ modelAccessMode: "restricted" }), true);
  assert.equal(hasApiKeyModelRestrictions({ allowedModels: ["public/*"] }), true);
  assert.equal(hasApiKeyModelRestrictions({ blockedModels: ["private/*"] }), true);
  assert.equal(hasApiKeyModelRestrictions({ disableNonPublicModels: true }), true);
  assert.equal(hasApiKeyModelRestrictions({ modelAccessMode: "all" }), false);
  assert.equal(hasApiKeyModelRestrictions(null), false);
});

test("resolved-model policy asks the key checker about requested and concrete identities", async () => {
  const calls: Array<[string, string, string | undefined]> = [];
  const result = await checkResolvedModelPermission(
    {
      hasApiKeyMetadata: true,
      apiKey: "sk-test-resolved",
      requestedModel: "friendly-alias",
      resolvedModel: "provider/private-target",
    },
    async (key, requestedModel, resolvedModel) => {
      calls.push([key, requestedModel, resolvedModel]);
      return false;
    }
  );
  assert.equal(result, "denied");
  assert.deepEqual(calls, [["sk-test-resolved", "friendly-alias", "provider/private-target"]]);
});

test("resolved-model policy distinguishes local mode from unavailable key policy", async () => {
  let calls = 0;
  const checker = async () => {
    calls += 1;
    return true;
  };
  assert.equal(
    await checkResolvedModelPermission(
      {
        hasApiKeyMetadata: false,
        apiKey: null,
        requestedModel: "alias",
        resolvedModel: "provider/target",
      },
      checker
    ),
    "allowed"
  );
  assert.equal(
    await checkResolvedModelPermission(
      {
        hasApiKeyMetadata: true,
        apiKey: null,
        requestedModel: "alias",
        resolvedModel: "provider/target",
      },
      checker
    ),
    "unavailable"
  );
  assert.equal(calls, 0);
});

test("resolved-model policy fails closed when the key checker is unavailable", async () => {
  const result = await checkResolvedModelPermission(
    {
      hasApiKeyMetadata: true,
      apiKey: "sk-test-resolved",
      requestedModel: "friendly-alias",
      resolvedModel: "provider/private-target",
    },
    async () => {
      throw new Error("policy backend unavailable");
    }
  );
  assert.equal(result, "unavailable");
});

test("local model-policy responses remain distinguishable from upstream responses", () => {
  const local = markLocalModelPolicyResponse(new Response("denied", { status: 403 }));
  assert.equal(isLocalModelPolicyResponse(local), true);
  assert.equal(isLocalModelPolicyResponse(new Response("denied", { status: 403 })), false);
});
