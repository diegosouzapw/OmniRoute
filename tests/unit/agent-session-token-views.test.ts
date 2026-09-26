// Agent-session token split: /v1/me/sessions, the team-report session detail and the team-report
// rollups must return the same Input / Cache / Output figures for the same requests, including
// requests stored without their cached part (non-streaming Claude-format providers before the
// usage extractor fix).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-token-views-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { buildAgentSessionReport } = await import("../../src/lib/usage/agentSessionReports.ts");
const { splitTokens } =
  await import("../../src/app/(dashboard)/dashboard/analytics/team-reports/components/format.ts");
const { GET: getMeSessions } = await import("../../src/app/api/v1/me/sessions/route.ts");
const { GET: getReportSession } = await import("../../src/app/api/reports/sessions/[id]/route.ts");
const { SELF_USAGE_SCOPE } = await import("../../src/shared/constants/selfServiceScopes.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Every request is 100 fresh + 9000 cache-read + 900 cache-write input tokens and 50 output.
const CORRECT_ROW = { input: 10000, output: 50, cacheRead: 9000, cacheCreation: 900 };
const ROW_STORED_WITHOUT_CACHE = { input: 100, output: 50, cacheRead: 9000, cacheCreation: 900 };
const EXPECTED = {
  input: 30000,
  uncachedInput: 300,
  cacheRead: 27000,
  cacheCreation: 2700,
  output: 150,
  reasoning: 0,
  total: 30150,
};

let keyToken = "";
let keyId = "";

test.before(async () => {
  await settingsDb.updatePricing({
    openai: { "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1 } },
  });
  const key = await apiKeysDb.createApiKey("Views Key", "test-machine", [SELF_USAGE_SCOPE]);
  keyToken = key.key;
  keyId = key.id;

  const rows = [CORRECT_ROW, ROW_STORED_WITHOUT_CACHE, CORRECT_ROW];
  for (const [index, tokens] of rows.entries()) {
    await usageHistory.saveRequestUsage({
      provider: "openai",
      model: "gpt-4o-mini",
      tokens,
      success: true,
      latencyMs: 10,
      timestamp: `2026-09-25T10:0${index}:00.000Z`,
      apiKeyId: keyId,
      apiKeyName: "Views Key",
      agentContext: {
        client: "claude-code",
        clientSessionId: "views-session",
        projectName: "views",
        projectRepo: null,
        projectPath: "/work/views",
        projectSource: "path",
        gitBranch: "main",
      },
    });
  }
});

test("the self-service API, the report detail and the report rollups agree on the split", async () => {
  const meRes = await getMeSessions(
    new Request("http://localhost/api/v1/me/sessions", {
      headers: { Authorization: `Bearer ${keyToken}` },
    })
  );
  assert.equal(meRes.status, 200);
  const me = (await meRes.json()) as {
    sessions: Array<{ id: string; costUsd: number; tokens: typeof EXPECTED }>;
  };
  assert.equal(me.sessions.length, 1);
  const [session] = me.sessions;
  assert.deepEqual(session.tokens, EXPECTED);

  const detailRes = await getReportSession(
    new Request(`http://localhost/api/reports/sessions/${session.id}`),
    { params: Promise.resolve({ id: session.id }) }
  );
  assert.equal(detailRes.status, 200);
  const detail = (await detailRes.json()) as { session: { tokens: typeof EXPECTED } };
  assert.deepEqual(detail.session.tokens, EXPECTED);

  const report = await buildAgentSessionReport({ apiKeyId: keyId });
  assert.deepEqual(report.totals.tokens, EXPECTED);
  assert.deepEqual(report.breakdowns.members[0].tokens, EXPECTED);
  assert.ok(Math.abs(report.totals.costUsd - session.costUsd) < 1e-9, "same pricing input");

  // The dashboard shows the same figures whichever view it renders.
  const shown = { input: 300, output: 150, cache: 29700, cacheRead: 27000, cacheCreation: 2700 };
  assert.deepEqual(splitTokens(detail.session.tokens), shown);
  assert.deepEqual(splitTokens(report.totals.tokens), shown);
});
