import test from "node:test";
import assert from "node:assert/strict";

// Feature guard for #5462 — geo-restriction notices for CN-registration providers.
//
// SenseNova's console appears to require a Chinese (+86) phone number for
// registration with no documented international path. StepFun's default endpoint
// (api.stepfun.com) is the China platform, but a genuine Singapore-operated global
// platform (platform.stepfun.ai) exists — so StepFun's notice must POINT users to
// the global alternative rather than claim a hard CN-only block.
const { APIKEY_PROVIDERS_REGIONAL } = await import(
  "../../src/shared/constants/providers/apikey/regional.ts"
);

function notice(id: string): { text?: string; signupUrl?: string } | undefined {
  const entry = (APIKEY_PROVIDERS_REGIONAL as Record<string, any>)[id];
  assert.ok(entry, `${id} regional provider entry must exist`);
  return entry.notice;
}

test("#5462 SenseNova carries a CN-phone registration notice with its signup URL", () => {
  const n = notice("sensenova");
  assert.ok(n, "sensenova must have a notice");
  assert.match(n.text ?? "", /\+86|Chinese/i, "notice must mention the Chinese phone requirement");
  assert.equal(n.signupUrl, "https://platform.sensenova.cn/console");
});

test("#5462 StepFun notice points international users to the global .ai platform", () => {
  const n = notice("stepfun");
  assert.ok(n, "stepfun must have a notice");
  // Must reference the global platform — NOT a blanket CN-only block (a Singapore
  // platform genuinely exists, so a symmetric 'CN-only' warning would be wrong).
  assert.match(n.text ?? "", /stepfun\.ai/i, "notice must point to the global platform");
  assert.equal(n.signupUrl, "https://platform.stepfun.ai");
});

test("#5462 the notices do not disable the providers (display-only hint)", () => {
  for (const id of ["sensenova", "stepfun"]) {
    const entry = (APIKEY_PROVIDERS_REGIONAL as Record<string, any>)[id];
    assert.equal(entry.hasFree, true, `${id} must stay usable — notice is informational only`);
    assert.equal(entry.id, id);
  }
});
