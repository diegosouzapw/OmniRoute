import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-reset-credits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-codex-reset-credits-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const resetCredits = await import("../../src/lib/usage/codexResetCredits.ts");

const originalFetch = globalThis.fetch;
type QuotaUsageRecord = Record<string, { used?: unknown } | undefined>;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createCodexConnection(overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: `Codex Reset ${Date.now()} ${Math.random()}`,
    email: `codex-${Date.now()}-${Math.random()}@example.test`,
    accessToken: "codex-access-token",
    refreshToken: "codex-refresh-token",
    providerSpecificData: { workspaceId: "workspace-123" },
    ...overrides,
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("consumeCodexResetCredit fetches a credit id, posts it, then refreshes usage", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  const calls: Array<{ url: string; init: RequestInit }> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });

    if (String(url).endsWith("/rate-limit-reset-credits")) {
      assert.equal(init.method, "GET");
      assert.equal((init.headers as Record<string, string>)["chatgpt-account-id"], "workspace-123");
      return new Response(
        JSON.stringify({ credits: [{ id: "credit-123", status: "available" }] }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    if (String(url).includes("/rate-limit-reset-credits/consume")) {
      assert.equal((init.headers as Record<string, string>)["chatgpt-account-id"], "workspace-123");
      assert.deepEqual(JSON.parse(String(init.body)), {
        redeem_request_id: "redeem-1",
        credit_id: "credit-123",
      });
      return new Response(JSON.stringify({ code: "reset" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response(
        JSON.stringify({
          plan_type: "plus",
          rate_limit: {
            primary_window: { used_percent: 0 },
            secondary_window: { used_percent: 40 },
          },
          rate_limit_reset_credits: { available_count: 1 },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    return new Response("unexpected", { status: 500 });
  };

  const result = await resetCredits.consumeCodexResetCredit(connection.id, "redeem-1");
  const refreshedQuotas = result.usage.quotas as QuotaUsageRecord;

  assert.equal(result.outcome, "reset");
  assert.equal(result.usage.plan, "plus");
  assert.equal(refreshedQuotas.weekly?.used, 40);
  assert.equal(
    calls.some((call) => call.url.endsWith("/rate-limit-reset-credits")),
    true
  );
  assert.equal(
    calls.some((call) => call.url.includes("/rate-limit-reset-credits/consume")),
    true
  );
});

test("consumeCodexResetCredit accepts alreadyRedeemed as success", async () => {
  const connection = (await createCodexConnection()) as { id: string };

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(JSON.stringify({ credits: [{ credit_id: "credit-456" }] }), {
        status: 200,
      });
    }
    if (String(url).includes("/rate-limit-reset-credits/consume")) {
      return new Response(JSON.stringify({ code: "alreadyRedeemed" }), { status: 200 });
    }
    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response(
        JSON.stringify({
          rate_limit: { primary_window: { used_percent: 5 } },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return new Response("unexpected", { status: 500 });
  };

  const result = await resetCredits.consumeCodexResetCredit(connection.id, "redeem-2");
  assert.equal(result.outcome, "alreadyRedeemed");
});

for (const code of ["noCredit", "nothingToReset"]) {
  test(`consumeCodexResetCredit maps ${code} to 409`, async () => {
    const connection = (await createCodexConnection()) as { id: string };

    globalThis.fetch = async (url) => {
      if (String(url).endsWith("/rate-limit-reset-credits")) {
        return new Response(JSON.stringify({ credits: [{ id: "credit-error" }] }), {
          status: 200,
        });
      }
      if (String(url).includes("/rate-limit-reset-credits/consume")) {
        return new Response(JSON.stringify({ code }), { status: 200 });
      }
      return new Response("unexpected", { status: 500 });
    };

    await assert.rejects(
      () => resetCredits.consumeCodexResetCredit(connection.id, `redeem-${code}`),
      (error: unknown) =>
        error instanceof resetCredits.CodexResetCreditError &&
        error.status === 409 &&
        error.code === (code === "noCredit" ? "no_credit" : "nothing_to_reset")
    );
  });
}

test("consumeCodexResetCredit rejects when the credits endpoint has no redeemable id", async () => {
  const connection = (await createCodexConnection()) as { id: string };

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(
        JSON.stringify({ credits: [{ id: "used-credit", status: "redeemed" }] }),
        {
          status: 200,
        }
      );
    }
    return new Response("unexpected", { status: 500 });
  };

  await assert.rejects(
    () => resetCredits.consumeCodexResetCredit(connection.id, "redeem-no-credit-id"),
    (error: unknown) =>
      error instanceof resetCredits.CodexResetCreditError &&
      error.status === 409 &&
      error.code === "no_credit"
  );
});

test("consumeCodexResetCredit rejects non-Codex and missing connections", async () => {
  await assert.rejects(
    () => resetCredits.consumeCodexResetCredit("missing", "redeem-missing"),
    (error: unknown) =>
      error instanceof resetCredits.CodexResetCreditError &&
      error.status === 404 &&
      error.code === "connection_not_found"
  );

  const connection = (await createCodexConnection({
    provider: "claude",
    providerSpecificData: {},
  })) as { id: string };

  await assert.rejects(
    () => resetCredits.consumeCodexResetCredit(connection.id, "redeem-wrong-provider"),
    (error: unknown) =>
      error instanceof resetCredits.CodexResetCreditError &&
      error.status === 400 &&
      error.code === "codex_provider_required"
  );
});
