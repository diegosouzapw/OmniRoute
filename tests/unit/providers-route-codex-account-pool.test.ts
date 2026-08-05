import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-provider-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.ALLOW_API_KEY_REVEAL = "false";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providersRoute = await import("../../src/app/api/providers/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET keeps one parent row and projects raw Codex state without exposing credentials", async () => {
  const cooldown = new Date(Date.now() + 60_000).toISOString();
  const codex = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex parent",
    apiKey: "codex-api-secret",
    accessToken: "codex-access-secret",
    refreshToken: "codex-refresh-secret",
    idToken: "codex-id-secret",
    providerSpecificData: {
      consoleApiKey: "nested-secret",
      accessToken: "nested-access-secret",
      codexScopeRateLimitedUntil: { spark: cooldown },
      codexQuotaStateByScope: {
        spark: {
          usage5h: 100,
          limit5h: 100,
          resetAt5h: cooldown,
          observedAt: "2026-01-01T00:00:00.000Z",
        },
      },
      codexExhaustedWindowByScope: { spark: "5h" },
    },
  });
  const openai = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI parent",
    apiKey: "openai-api-secret",
  });

  const response = await providersRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/providers")
  );
  const body = (await response.json()) as {
    connections: Array<Record<string, unknown>>;
    total: number;
  };

  assert.equal(response.status, 200);
  assert.equal(body.total, 2);
  assert.equal(body.connections.length, 2);
  assert.deepEqual(
    new Set(body.connections.map((connection) => connection.id)),
    new Set([codex.id, openai.id])
  );

  const codexRow = body.connections.find((connection) => connection.id === codex.id);
  const openaiRow = body.connections.find((connection) => connection.id === openai.id);
  assert.ok(codexRow);
  assert.ok(openaiRow);
  assert.equal("codexAccountPool" in openaiRow, false);

  const pool = codexRow.codexAccountPool as {
    parentConnectionId: string;
    aggregate: { status: string; limitedChildCount: number };
    children: Array<Record<string, unknown>>;
  };
  assert.equal(pool.parentConnectionId, codex.id);
  assert.equal(pool.children.length, 2);
  assert.deepEqual(
    pool.children.map((child) => child.key),
    [
      { parentConnectionId: codex.id, scope: "codex" },
      { parentConnectionId: codex.id, scope: "spark" },
    ]
  );
  const spark = pool.children[1] as {
    unavailable: boolean;
    cooldown: { active: boolean; rateLimitedUntil: string | null };
    quota: { exhaustedWindow: string | null };
  };
  assert.equal(spark.unavailable, true);
  assert.equal(spark.cooldown.active, true);
  assert.equal(spark.cooldown.rateLimitedUntil, cooldown);
  assert.equal(spark.quota.exhaustedWindow, "5h");
  assert.equal("connectionId" in pool.children[0], false);

  const serialized = JSON.stringify(body);
  for (const secret of [
    "codex-api-secret",
    "codex-access-secret",
    "codex-refresh-secret",
    "codex-id-secret",
    "nested-secret",
    "nested-access-secret",
    "openai-api-secret",
  ]) {
    assert.equal(serialized.includes(secret), false, `response leaked ${secret}`);
  }
  const safeProviderData = codexRow.providerSpecificData as Record<string, unknown>;
  assert.equal("consoleApiKey" in safeProviderData, false);
});
