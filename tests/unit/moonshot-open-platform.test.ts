import test from "node:test";
import assert from "node:assert/strict";
import {
  parseMoonshotOrigin,
  moonshotBalanceUrl,
  resolveMoonshotOrigin,
  isMoonshotOpenPlatformConnection,
} from "../../open-sse/services/usage/moonshotOpenPlatform.ts";

const CN = "https://api.moonshot.cn/v1";
const AI = "https://api.moonshot.ai/v1";
const COMPAT = "openai-compatible-chat-e2971611-bc02-4c37-8fc5-39b8e3906fdf";

test("parseMoonshotOrigin accepts cn and ai hosts only", () => {
  assert.equal(parseMoonshotOrigin(CN), "https://api.moonshot.cn");
  assert.equal(
    parseMoonshotOrigin("https://api.moonshot.cn/v1/chat/completions"),
    "https://api.moonshot.cn",
  );
  assert.equal(parseMoonshotOrigin(AI), "https://api.moonshot.ai");
  assert.equal(parseMoonshotOrigin("https://api.openai.com/v1"), null);
  assert.equal(parseMoonshotOrigin("https://api.kimi.com/coding/v1"), null);
  assert.equal(parseMoonshotOrigin(""), null);
  assert.equal(parseMoonshotOrigin(null), null);
});

test("moonshotBalanceUrl stays on the connection origin", () => {
  assert.equal(
    moonshotBalanceUrl("https://api.moonshot.cn"),
    "https://api.moonshot.cn/v1/users/me/balance",
  );
  assert.equal(
    moonshotBalanceUrl("https://api.moonshot.ai"),
    "https://api.moonshot.ai/v1/users/me/balance",
  );
});

test("resolveMoonshotOrigin prefers psd.baseUrl over node", () => {
  const origin = resolveMoonshotOrigin(
    {
      provider: COMPAT,
      providerSpecificData: { baseUrl: CN },
    },
    "https://api.moonshot.ai/v1",
  );
  assert.equal(origin, "https://api.moonshot.cn");
});

test("resolveMoonshotOrigin uses node baseUrl when psd has none", () => {
  const origin = resolveMoonshotOrigin({ provider: COMPAT, providerSpecificData: {} }, CN);
  assert.equal(origin, "https://api.moonshot.cn");
});

test("resolveMoonshotOrigin uses built-in moonshot/kimi registry host", () => {
  assert.equal(resolveMoonshotOrigin({ provider: "moonshot" }), "https://api.moonshot.ai");
  assert.equal(resolveMoonshotOrigin({ provider: "kimi" }), "https://api.moonshot.ai");
});

test("isMoonshotOpenPlatformConnection is true for mnative-shaped rows", () => {
  assert.equal(
    isMoonshotOpenPlatformConnection({
      provider: COMPAT,
      providerSpecificData: { baseUrl: CN, prefix: "mnative" },
    }),
    true,
  );
  assert.equal(
    isMoonshotOpenPlatformConnection({ provider: "deepseek", providerSpecificData: {} }),
    false,
  );
  assert.equal(isMoonshotOpenPlatformConnection({ provider: "moonshot" }), true);
});
