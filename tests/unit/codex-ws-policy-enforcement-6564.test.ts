/**
 * Regression guard for #6564.
 *
 * The Codex Responses-over-WebSocket bridge (`src/app/api/internal/codex-responses-ws/route.ts`)
 * authenticates the API key (`authenticate()` / `authorizeWebSocketHandshake()`) but historically
 * never enforced the API-key model/combo policy the HTTP `/v1/responses` path enforces via
 * `enforceApiKeyPolicy()`. A key restricted via `allowedModels` could still reach a DIRECT Codex
 * model (e.g. `gpt-5.5`) through this WS transport, as long as an eligible Codex OAuth connection
 * existed — silently bypassing the restriction the HTTP path correctly rejects.
 *
 * `prepare()` now calls `enforceApiKeyPolicy()` against the client-requested model BEFORE any
 * Codex-specific model remapping / credential selection, using a synthetic `Request` carrying an
 * explicit `Authorization: Bearer <apiKey>` header (the WS bridge's token normally arrives via a
 * `requestUrl` query param, not a header, so the same extraction `enforceApiKeyPolicy()` uses on
 * the HTTP path would otherwise see no credential at all).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-policy-6564-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "issue-6564-api-key-secret";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "issue-6564-bridge-secret";

const coreDb = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const rulesDb = await import("../../src/lib/db/reasoningRoutingRules.ts");
const costRules = await import("../../src/domain/costRules.ts");
const rateLimiter = await import("../../src/shared/utils/rateLimiter.ts");
const route = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

rateLimiter.setRateLimiterTestMode(true);

type CodexWsPrepareBody = {
  model: string;
  response: {
    reasoning: { effort: string };
    _omnirouteReasoningRule?: unknown;
    _omnirouteReasoningRouteTrace?: unknown;
  };
  reasoningRouting: {
    ruleId: string;
    sourceModel: string;
    targetModel: string;
  };
};

type ErrorBody = {
  error: {
    code: string;
    message?: string;
  };
};

function getFsErrorCode(error: unknown): string | undefined {
  if (typeof error !== "object" || error === null || !("code" in error)) return undefined;
  const { code } = error as { code?: unknown };
  return typeof code === "string" ? code : undefined;
}

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = getFsErrorCode(error);
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  costRules.resetCostData();
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/** Builds a bridge POST request for the internal codex-responses-ws route's "prepare" action. */
function buildPrepareRequest(apiKey: string, model: string): Request {
  return new Request("http://localhost/api/internal/codex-responses-ws", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-omniroute-ws-bridge-secret": process.env.OMNIROUTE_WS_BRIDGE_SECRET as string,
    },
    body: JSON.stringify({
      action: "prepare",
      // The bridge's real client sends the WS auth token via a query param on
      // requestUrl (api_key/token/access_token) — never a header.
      requestUrl: `/api/v1/responses?api_key=${encodeURIComponent(apiKey)}`,
      response: { model },
    }),
  });
}

test("WS prepare() rejects a DIRECT model not in the key's allowedModels policy (403, before credential selection)", async () => {
  const restrictedKey = await apiKeysDb.createApiKey("Restricted Policy Key", "machine-6564-a");
  await apiKeysDb.updateApiKeyPermissions(restrictedKey.id, {
    allowedModels: ["combo/model-1.0"],
  });

  const response = await route.POST(buildPrepareRequest(restrictedKey.key, "gpt-5.5"));
  const body = (await response.json()) as { error?: { code?: string; message?: string } };

  assert.equal(
    response.status,
    403,
    `expected a policy rejection (403), got ${response.status}: ${JSON.stringify(body)}`
  );
  assert.notEqual(
    body.error?.code,
    "codex_credentials_unavailable",
    "must be rejected by API-key policy, not by (unrelated) missing Codex credentials"
  );
  assert.match(body.error?.message ?? "", /not allowed|not enabled/i);
});

test("WS prepare() allows the requested model when the key's policy permits it (proceeds past policy)", async () => {
  const allowedKey = await apiKeysDb.createApiKey("Allowed Policy Key", "machine-6564-b");
  await apiKeysDb.updateApiKeyPermissions(allowedKey.id, {
    allowedModels: ["gpt-5.5"],
  });

  const response = await route.POST(buildPrepareRequest(allowedKey.key, "gpt-5.5"));
  const body = (await response.json()) as { error?: { code?: string; message?: string } };

  // No Codex OAuth connection exists in this test environment, so a request
  // that clears the policy gate still fails downstream — but with the
  // credential-unavailable error, never the model/combo policy rejection.
  assert.notEqual(response.status, 403, `must not be rejected by policy: ${JSON.stringify(body)}`);
  assert.equal(body.error?.code, "codex_credentials_unavailable");
});

test("WS prepare() rejects a combo not in the key's allowedCombos policy (403)", async () => {
  await combosDb.createCombo({
    name: "model-1.0",
    strategy: "priority",
    models: ["anthropic/claude-3-5-sonnet"],
  });
  await combosDb.createCombo({
    name: "other-combo",
    strategy: "priority",
    models: ["openai/gpt-4.1"],
  });
  const comboRestrictedKey = await apiKeysDb.createApiKey("Combo Restricted Key", "machine-6564-c");
  await apiKeysDb.updateApiKeyPermissions(comboRestrictedKey.id, {
    allowedCombos: ["model-1.0"],
  });

  const response = await route.POST(
    buildPrepareRequest(comboRestrictedKey.key, "combo/other-combo")
  );
  const body = (await response.json()) as { error?: { code?: string; message?: string } };

  assert.equal(
    response.status,
    403,
    `expected a policy rejection (403), got ${response.status}: ${JSON.stringify(body)}`
  );
  assert.notEqual(body.error?.code, "codex_credentials_unavailable");
});

test("WS reasoning rules apply Codex-to-Codex effort and reject non-Codex targets", async () => {
  const key = await apiKeysDb.createApiKey("Reasoning WS Key", "machine-reasoning-ws");
  await apiKeysDb.updateApiKeyPermissions(key.id, {
    allowedModels: ["gpt-5.5", "codex/gpt-5.6-sol", "openai/gpt-4o"],
  });
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex WS test",
    accessToken: "test-codex-access-token",
    refreshToken: "test-codex-refresh-token",
    expiresAt: Date.now() + 60 * 60 * 1000,
    isActive: true,
  });

  const codexRule = await rulesDb.createReasoningRoutingRule({
    name: "Codex WS high",
    description: "",
    scope: "apiKey",
    apiKeyId: key.id,
    comboId: null,
    connectionId: null,
    modelPattern: "codex/gpt-5.5",
    sourceEffort: "any",
    requestTags: [],
    tagMatchMode: "any",
    effortMode: "force",
    targetEffort: "high",
    targetKind: "model",
    targetModel: "codex/gpt-5.6-sol",
    targetComboId: null,
    budgetAction: "preserve",
    budgetTokens: null,
    priority: 10,
    enabled: true,
  });

  const allowed = await route.POST(buildPrepareRequest(key.key, "gpt-5.5"));
  const allowedBody = (await allowed.json()) as CodexWsPrepareBody;
  assert.equal(allowed.status, 200, JSON.stringify(allowedBody));
  assert.equal(allowedBody.model, "gpt-5.6-sol");
  assert.equal(allowedBody.response.reasoning.effort, "high");
  assert.equal(allowedBody.reasoningRouting.ruleId, codexRule.id);
  assert.equal(allowedBody.reasoningRouting.sourceModel, "codex/gpt-5.5");
  assert.equal(allowedBody.reasoningRouting.targetModel, "codex/gpt-5.6-sol");
  assert.equal(allowedBody.response._omnirouteReasoningRule, undefined);
  assert.equal(allowedBody.response._omnirouteReasoningRouteTrace, undefined);

  await rulesDb.updateReasoningRoutingRule(codexRule.id, {
    targetModel: "openai/gpt-4o",
  });
  const rejected = await route.POST(buildPrepareRequest(key.key, "gpt-5.5"));
  const rejectedBody = (await rejected.json()) as ErrorBody;
  assert.equal(rejected.status, 400);
  assert.equal(rejectedBody.error.code, "reasoning_route_transport");
});
