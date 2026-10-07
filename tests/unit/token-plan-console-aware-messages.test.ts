/**
 * The personal Token Plan is sold through two consoles (QwenCloud and Alibaba Model
 * Studio) with different hosts, gateways and login tickets. Two operator-facing
 * messages ignored that split (both bit the operator in the 2026-08/09 audits):
 *
 * 1. The quota guidance always said "get the cookie at home.qwencloud.com", even for
 *    connections served by the Alibaba console — whose cookie comes from
 *    modelstudio.console.alibabacloud.com and carries login_aliyunid_ticket. Following
 *    the instructions verbatim produced a cookie the gateway rejects (console
 *    mismatch → BailianGateway.Login.NotLogined).
 * 2. Key validation mapped upstream 401 to a bare "Invalid API key". For Token Plan
 *    keys, an expired/lapsed subscription produces the exact same upstream 401
 *    (observed live 2026-09-01: subscription ended 08-23, key started failing), so
 *    the message must point at the subscription as a cause worth checking.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { getQwenTokenPlanUsage } from "../../open-sse/services/usage/qwen-token-plan.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";

test("cookie guidance points Alibaba-console connections at the Model Studio console", async () => {
  const result = await getQwenTokenPlanUsage(
    "conn-guidance-aliyun",
    "sk-sp-any",
    {},
    "bailian-coding-plan"
  );

  assert.ok("message" in result, "no cookie stored → guidance message expected");
  const message = (result as { message: string }).message;
  assert.match(message, /modelstudio\.console\.alibabacloud\.com/);
  assert.match(message, /bailian-singapore-cs\.alibabacloud\.com/);
  assert.match(message, /login_aliyunid_ticket/);
  assert.doesNotMatch(
    message,
    /login_qwencloud_ticket/,
    "Alibaba guidance must not tell the operator to hunt for the QwenCloud ticket"
  );
});

test("cookie guidance keeps the QwenCloud instructions for the QwenCloud console", async () => {
  const result = await getQwenTokenPlanUsage(
    "conn-guidance-qwen",
    "sk-sp-any",
    {},
    "qwen-cloud-token-plan"
  );

  assert.ok("message" in result, "no cookie stored → guidance message expected");
  const message = (result as { message: string }).message;
  assert.match(message, /home\.qwencloud\.com/);
  assert.match(message, /cs-data\.qwencloud\.com/);
  assert.match(message, /login_qwencloud_ticket/);
});

test("bailian 401 mentions the subscription as a possible cause", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { code: "invalid_api_key" } }), { status: 401 });
  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "sk-sp-expired-subscription",
    });
    assert.equal(result.valid, false);
    assert.match(String(result.error), /Invalid API key/);
    assert.match(
      String(result.error),
      /subscription/i,
      "an expired Token Plan subscription yields the same upstream 401 — say so"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
