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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

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
    provider: "kimi-web",
    authType: "apikey",
    name: "Kimi Web Session",
    providerSpecificData: { token: "kimi-web-session-token" },
    defaultModel: "k3",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  const kimiWeb = combo.models.find(
    (model) => model.providerId === "kimi-web" && model.model === "kimi-web/k3"
  );
  assert.ok(kimiWeb, "the configured web-session model should be an auto candidate");
  assert.ok(combo.autoConfig.candidatePool.includes("kimi-web"));
});

test("createVirtualAutoCombo excludes web-session providers with empty required token data", async () => {
  await providersDb.createProviderConnection({
    provider: "kimi-web",
    authType: "apikey",
    name: "Kimi Web Empty Session",
    providerSpecificData: { token: "   " },
    defaultModel: "k3",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) => model.providerId === "kimi-web"),
    false,
    "web-session providers with empty required token data must not be auto-combo candidates"
  );
  assert.equal(combo.autoConfig.candidatePool.includes("kimi-web"), false);
});

test("createVirtualAutoCombo excludes web-session providers with irrelevant providerSpecificData", async () => {
  await providersDb.createProviderConnection({
    provider: "perplexity-web",
    authType: "apikey",
    name: "Perplexity Web Invalid Session",
    providerSpecificData: { unrelated: "value" },
    defaultModel: "pplx-auto",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) => model.providerId === "perplexity-web"),
    false,
    "web-session providers with irrelevant providerSpecificData must not be auto-combo candidates"
  );
  assert.equal(combo.autoConfig.candidatePool.includes("perplexity-web"), false);
});

test("createVirtualAutoCombo groups same-provider web sessions behind one logical model", async () => {
  const connA = await providersDb.createProviderConnection({
    provider: "kimi-web",
    authType: "apikey",
    name: "Kimi Web Session A",
    providerSpecificData: { token: "kimi-web-session-token-a" },
    defaultModel: "k3",
  });
  const connB = await providersDb.createProviderConnection({
    provider: "kimi-web",
    authType: "apikey",
    name: "Kimi Web Session B",
    providerSpecificData: { token: "kimi-web-session-token-b" },
    defaultModel: "k3",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  const kimiWebModel = combo.models.find(
    (model) => model.providerId === "kimi-web" && model.model === "kimi-web/k3"
  );
  assert.ok(kimiWebModel, "the provider model should remain in the candidate pool");
  assert.equal(kimiWebModel.connectionId, null);
  assert.deepEqual(
    new Set(kimiWebModel.allowedConnectionIds),
    new Set([connA.id, connB.id]),
    "same-provider web sessions should remain available as account fallbacks"
  );
  assert.equal(
    combo.autoConfig.candidatePool.filter((provider) => provider === "kimi-web").length,
    1,
    "provider pool remains provider-scoped while model entries preserve connection identity"
  );
});

test("createVirtualAutoCombo excludes trigger-bypassed retired Qwen rows", async () => {
  const db = core.getDbInstance();
  db.exec(`
    DROP TRIGGER provider_connections_retire_qwen_web_insert;
    DROP TRIGGER provider_connections_retire_qwen_web_update;
  `);

  await providersDb.createProviderConnection({
    provider: "qwen-web",
    authType: "apikey",
    name: "Retired Qwen Web",
    apiKey: "retired-qwen-web-key",
    defaultModel: "qwen3.8-max",
  });
  await providersDb.createProviderConnection({
    provider: "qw",
    authType: "apikey",
    name: "Retired Qwen Web Alias",
    apiKey: "retired-qw-key",
    defaultModel: "qwen3.8-max",
  });
  await providersDb.createProviderConnection({
    provider: "qwen-cloud",
    authType: "apikey",
    name: "Qwen Cloud Control",
    apiKey: "qwen-cloud-key",
    defaultModel: "qwen3.8-max",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) => model.providerId === "qwen-web"),
    false
  );
  assert.equal(
    combo.models.some((model) => model.providerId === "qw"),
    false
  );
  assert.equal(combo.autoConfig.candidatePool.includes("qwen-web"), false);
  assert.equal(combo.autoConfig.candidatePool.includes("qw"), false);
  assert.ok(combo.autoConfig.candidatePool.includes("qwen-cloud"));
});

test("createVirtualAutoCombo includes clean-room ChatGPT Web and excludes its legacy alias", async () => {
  const db = core.getDbInstance();
  db.exec(`
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_insert;
    DROP TRIGGER IF EXISTS provider_connections_retire_chatgpt_web_update;
  `);
  for (const provider of ["chatgpt-web", "cgpt-web"]) {
    const model = provider === "chatgpt-web" ? "gpt-5-5-thinking" : "gpt-5.5";
    const credential =
      provider === "chatgpt-web"
        ? JSON.stringify({
            cookies: [
              {
                name: "session",
                value: "fixture",
                domain: ".chatgpt.com",
                path: "/",
                expires: -1,
                httpOnly: true,
                secure: true,
                sameSite: "Lax",
              },
            ],
            origins: [],
          })
        : `sk-${provider}-restored-auto`;
    db.prepare(
      "INSERT INTO provider_connections " +
        "(id, provider, auth_type, name, api_key, default_model, is_active, test_status, " +
        "created_at, updated_at) VALUES (?, ?, 'apikey', ?, ?, ?, 1, 'active', " +
        "datetime('now'), datetime('now'))"
    ).run(`${provider}-restored-auto`, provider, `${provider} restored auto`, credential, model);
  }

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.ok(combo.models.some((model) => model.providerId === "chatgpt-web"));
  assert.ok(combo.autoConfig.candidatePool.includes("chatgpt-web"));
  assert.equal(
    combo.models.some((model) => model.providerId === "cgpt-web"),
    false
  );
  assert.equal(combo.autoConfig.candidatePool.includes("cgpt-web"), false);
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
  // (open-sse/services/autoCombo/virtualFactory.ts::AUTO_COMBO_NOAUTH_ALLOWLIST) —
  // the keyless backend verified to work without configuration on our reference
  // egress. The others stay usable via direct `<alias>/<model>` calls but must
  // NOT be auto-routed to. Dedicated guard:
  // tests/unit/noauth-autocombo-allowlist.test.ts.
  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  for (const allowed of ["opencode"]) {
    const models = combo.models.filter((m) => m.providerId === allowed);
    assert.ok(models.length >= 1, `${allowed} should have at least one model`);
    assert.ok(
      models.every((m) => m.connectionId === "noauth"),
      `all ${allowed} models should use noauth connection`
    );
  }

  for (const excluded of ["duckduckgo-web", "chipotle", "aihorde"]) {
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

test("createVirtualAutoCombo excludes trigger-bypassed Microsoft Designer connections exactly", async () => {
  await core.ensureDbInitialized();
  const db = core.getDbInstance();
  db.exec("DROP TRIGGER IF EXISTS trg_retire_microsoft_designer_web_provider_insert");
  db.exec("DROP TRIGGER IF EXISTS trg_retire_microsoft_designer_web_provider_update");

  for (const [provider, model] of [
    ["microsoft-designer-web", "dall-e-3"],
    ["msdesigner", "dall-e-3"],
    ["microsoft-designer-web-preview", "preview-model"],
  ] as const) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name: `${provider}-trigger-bypass`,
      apiKey: `sk-${provider}-test`,
      providerSpecificData: { accessToken: `${provider}-token` },
      defaultModel: model,
      isActive: true,
    });
  }

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("coding");

  assert.equal(
    combo.models.some((model) =>
      ["microsoft-designer-web", "msdesigner"].includes(model.providerId)
    ),
    false
  );
  assert.equal(combo.autoConfig.candidatePool.includes("microsoft-designer-web"), false);
  assert.equal(combo.autoConfig.candidatePool.includes("msdesigner"), false);
  assert.equal(
    combo.models.some((model) => model.providerId === "microsoft-designer-web-preview"),
    true,
    "a merely similar provider ID must remain eligible"
  );
});
