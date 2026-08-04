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

test("consumeCodexResetCredit automatically redeems the soonest-expiring available credit", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  let consumedCreditId: string | null = null;

  globalThis.fetch = async (url, init = {}) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(
        JSON.stringify({
          credits: [
            {
              id: "credit-later",
              status: "available",
              expires_at: "2099-08-20T10:00:00.000Z",
            },
            {
              id: "credit-no-expiry",
              status: "available",
              expires_at: null,
            },
            {
              id: "credit-first",
              status: "available",
              expires_at: "2099-07-20T10:00:00.000Z",
            },
          ],
        }),
        { status: 200 }
      );
    }
    if (String(url).includes("/rate-limit-reset-credits/consume")) {
      consumedCreditId = JSON.parse(String(init.body)).credit_id;
      return new Response(JSON.stringify({ code: "reset" }), { status: 200 });
    }
    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response(JSON.stringify({ rate_limit: {} }), { status: 200 });
    }
    return new Response("unexpected", { status: 500 });
  };

  await resetCredits.consumeCodexResetCredit(connection.id, "redeem-fefo");
  assert.equal(consumedCreditId, "credit-first");
});

test("consumeCodexResetCredit redeems an explicitly selected available credit", async () => {
  const connection = (await createCodexConnection()) as { id: string };
  let consumedCreditId: string | null = null;

  globalThis.fetch = async (url, init = {}) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(
        JSON.stringify({
          credits: [
            { id: "credit-first", status: "available", expires_at: "2099-07-20T10:00:00Z" },
            { id: "credit-chosen", status: "available", expires_at: "2099-08-20T10:00:00Z" },
          ],
        }),
        { status: 200 }
      );
    }
    if (String(url).includes("/rate-limit-reset-credits/consume")) {
      consumedCreditId = JSON.parse(String(init.body)).credit_id;
      return new Response(JSON.stringify({ code: "reset" }), { status: 200 });
    }
    if (String(url).includes("/backend-api/wham/usage")) {
      return new Response(JSON.stringify({ rate_limit: {} }), { status: 200 });
    }
    return new Response("unexpected", { status: 500 });
  };

  await resetCredits.consumeCodexResetCredit(connection.id, "redeem-selected", "credit-chosen");
  assert.equal(consumedCreditId, "credit-chosen");
});

test("listCodexResetCredits returns available credits ordered by expiry", async () => {
  const connection = (await createCodexConnection()) as { id: string };

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(
        JSON.stringify({
          available_count: 3,
          credits: [
            {
              id: "credit-no-expiry",
              status: "available",
              expires_at: null,
              title: "No expiry",
            },
            {
              id: "credit-redeemed",
              status: "redeemed",
              expires_at: "2099-06-01T00:00:00Z",
            },
            {
              id: "credit-later",
              status: "available",
              expires_at: "2099-08-01T00:00:00Z",
              title: "Later",
            },
            {
              id: "credit-first",
              status: "available",
              expires_at: "2099-07-01T00:00:00Z",
              title: "First",
              description: "Expires first",
            },
          ],
        }),
        { status: 200 }
      );
    }
    return new Response("unexpected", { status: 500 });
  };

  const result = await resetCredits.listCodexResetCredits(connection.id);
  assert.equal(result.availableCount, 3);
  assert.deepEqual(
    result.credits.map((credit) => credit.selectionToken),
    ["credit-first", "credit-later", "credit-no-expiry"]
  );
  assert.equal(result.credits[0].title, "First");
  assert.equal(result.credits[0].description, "Expires first");
  assert.equal(result.credits[0].expiresAt, "2099-07-01T00:00:00Z");
});

test("consumeCodexResetCredit rejects an unavailable manual selection", async () => {
  const connection = (await createCodexConnection()) as { id: string };

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/rate-limit-reset-credits")) {
      return new Response(JSON.stringify({ credits: [{ id: "credit-other" }] }), {
        status: 200,
      });
    }
    return new Response("unexpected", { status: 500 });
  };

  await assert.rejects(
    () =>
      resetCredits.consumeCodexResetCredit(connection.id, "redeem-unavailable", "credit-missing"),
    (error: unknown) =>
      error instanceof resetCredits.CodexResetCreditError &&
      error.status === 409 &&
      error.code === "selected_credit_unavailable"
  );
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
