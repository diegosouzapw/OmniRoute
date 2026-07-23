import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-virtual-auto-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

type VirtualComboResult = Awaited<ReturnType<typeof virtualFactory.createVirtualAutoCombo>>;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("createVirtualAutoCombo returns an executable auto combo for API-key connections", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI",
    apiKey: "sk-test-openai",
    defaultModel: "gpt-4o-mini",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  assert.equal(combo.strategy, "auto");
  assert.ok(combo.models.length >= 1);
  const openaiModel = combo.models.find(
    (model) => model.providerId === "openai" && model.model === "openai/gpt-4o-mini"
  );
  assert.ok(openaiModel, "the configured default must remain among registry candidates");
  assert.equal(openaiModel.kind, "model");
  assert.equal(combo.autoConfig.routerStrategy, "lkgp");
  assert.ok(combo.autoConfig.candidatePool.includes("openai"));
});

test("createVirtualAutoCombo includes OAuth accessToken connections with real expiry fields", async () => {
  await providersDb.createProviderConnection({
    provider: "anthropic",
    authType: "oauth",
    email: "oauth@example.com",
    accessToken: "oauth-access-token",
    tokenExpiresAt: new Date(Date.now() + 60_000).toISOString(),
    defaultModel: "claude-sonnet-4-5",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(combo.strategy, "auto");
  assert.ok(combo.models.length >= 1);
  assert.ok(
    combo.models.some(
      (model) => model.providerId === "anthropic" && model.model === "anthropic/claude-sonnet-4-5"
    ),
    "the configured default must remain among registry candidates"
  );
  assert.ok(combo.autoConfig.candidatePool.includes("anthropic"));
});

test("createVirtualAutoCombo includes configured web-session providers without apiKey fields", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Qwen Web Session",
    providerSpecificData: { token: "qwen-web-session-token" },
    defaultModel: "qwen3-coder-plus",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  const qwenWeb = combo.models.find(
    (model) => model.providerId === "qwen-web" && model.model === "qwen-web/qwen3-coder-plus"
  );
  assert.ok(qwenWeb, "the configured web-session model should be an auto candidate");
  assert.ok(combo.autoConfig.candidatePool.includes("qwen-web"));
});

test("createVirtualAutoCombo excludes web-session providers with empty required token data", async () => {
  await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Qwen Web Empty Session",
    providerSpecificData: { token: "   " },
    defaultModel: "qwen3-coder-plus",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) => model.providerId === "qwen-web"),
    false,
    "web-session providers with empty required token data must not be auto-combo candidates"
  );
  assert.equal(combo.autoConfig.candidatePool.includes("qwen-web"), false);
});

test("createVirtualAutoCombo excludes web-session providers with irrelevant providerSpecificData", async () => {
  await providersDb.createProviderConnection({
    provider: "chatgpt-web",
    authType: "apikey",
    name: "ChatGPT Web Invalid Session",
    providerSpecificData: { unrelated: "value" },
    defaultModel: "gpt-4o",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) => model.providerId === "chatgpt-web"),
    false,
    "web-session providers with irrelevant providerSpecificData must not be auto-combo candidates"
  );
  assert.equal(combo.autoConfig.candidatePool.includes("chatgpt-web"), false);
});

test("createVirtualAutoCombo groups same-provider web sessions behind one logical model", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Qwen Web Session A",
    providerSpecificData: { token: "qwen-web-session-token-a" },
    defaultModel: "qwen3-coder-plus",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Qwen Web Session B",
    providerSpecificData: { token: "qwen-web-session-token-b" },
    defaultModel: "qwen3-coder-plus",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  const qwenWebModel = combo.models.find(
    (model) => model.providerId === "qwen-web" && model.model === "qwen-web/qwen3-coder-plus"
  );
  assert.ok(qwenWebModel, "the provider model should remain in the candidate pool");
  assert.equal(qwenWebModel.connectionId, null);
  assert.deepEqual(
    new Set(qwenWebModel.allowedConnectionIds),
    new Set([connA.id, connB.id]),
    "same-provider web sessions should remain available as account fallbacks"
  );
  assert.equal(
    combo.autoConfig.candidatePool.filter((provider) => provider === "qwen-web").length,
    1,
    "provider pool remains provider-scoped while model entries preserve connection identity"
  );
});

test("createVirtualAutoCombo includes cookie web-session providers with required cookie data", async () => {
  await providersDb.createProviderConnection({
    provider: "chatgpt-web",
    authType: "apikey",
    name: "ChatGPT Web Session",
    providerSpecificData: { cookie: "__Secure-next-auth.session-token=chatgpt-session" },
    defaultModel: "gpt-4o",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  const chatgptWeb = combo.models.find(
    (model) => model.providerId === "chatgpt-web" && model.model === "chatgpt-web/gpt-4o"
  );
  assert.ok(chatgptWeb, "the configured cookie web-session model should be a candidate");
  assert.ok(combo.autoConfig.candidatePool.includes("chatgpt-web"));
});

test("createVirtualAutoCombo includes no-auth OpenCode Free without provider_connections rows", async () => {
  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  const opencode = combo.models.find((model) => model.providerId === "opencode");
  assert.ok(
    opencode,
    "OpenCode Free should appear in auto/* even when it has no provider_connections row"
  );
  assert.equal(opencode.connectionId, "noauth");
  assert.equal(opencode.model, "oc/big-pickle");
  assert.ok(combo.autoConfig.candidatePool.includes("opencode"));
});

test("createVirtualAutoCombo restricts the no-auth pool to the allowlist", async () => {
  // Policy: the no-auth (keyless) auto-combo allowlist is narrowed to `opencode`
  // and `felo-web` (open-sse/services/autoCombo/virtualFactory.ts::AUTO_COMBO_NOAUTH_ALLOWLIST) —
  // the keyless backends verified to work without configuration on our reference
  // egress. The others stay usable via direct `<alias>/<model>` calls but must
  // NOT be auto-routed to. Dedicated guard:
  // tests/unit/noauth-autocombo-allowlist.test.ts.
  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  for (const allowed of ["opencode", "felo-web"]) {
    const models = combo.models.filter((m) => m.providerId === allowed);
    assert.ok(models.length >= 1, `${allowed} should have at least one model`);
    assert.ok(
      models.every((m) => m.connectionId === "noauth"),
      `all ${allowed} models should use noauth connection`
    );
  }

  for (const excluded of ["duckduckgo-web", "theoldllm", "chipotle", "aihorde"]) {
    assert.equal(
      combo.models.some((model) => model.providerId === excluded),
      false,
      `no-auth provider "${excluded}" must be excluded from the auto-combo pool (not in allowlist)`
    );
  }

  assert.equal(
    combo.models.some((model) => model.providerId === "veoaifree-web"),
    false,
    "video-only no-auth providers must not be inserted into chat auto-combos"
  );
});

test("createVirtualAutoCombo keeps credential-required providers out when disconnected", async () => {
  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  assert.equal(
    combo.models.some((model) => model.providerId === "openai"),
    false,
    "OpenAI should still require a real active connection"
  );
});
