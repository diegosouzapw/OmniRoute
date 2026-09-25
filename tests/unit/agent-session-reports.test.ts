// Team reports (/api/reports/*): request-level rollups of agent-session usage by member,
// project, provider and account, their filters, and the CSV export.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-reports-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const { buildAgentSessionReport } = await import("../../src/lib/usage/agentSessionReports.ts");
const { GET: getSummary } = await import("../../src/app/api/reports/summary/route.ts");
const { GET: getSessions } = await import("../../src/app/api/reports/sessions/route.ts");
const { GET: getExport } = await import("../../src/app/api/reports/export/route.ts");

test.after(() => {
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const TOKENS = { input: 1000, output: 500, cacheRead: 200 };

async function recordUsage(entry: Record<string, unknown>) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    connectionId: "conn-openai-1",
    tokens: TOKENS,
    success: true,
    latencyMs: 10,
    apiKeyId: "key-alice",
    apiKeyName: "Alice",
    ...entry,
  });
}

function agentContext(clientSessionId: string, projectName = "acme") {
  return {
    client: "claude-code",
    clientSessionId,
    projectName,
    projectRepo: `github.com/team/${projectName}`,
    projectPath: `/work/${projectName}`,
    projectSource: "header" as const,
    gitBranch: "main",
  };
}

function reportRequest(pathAndQuery: string): Request {
  return new Request(`http://localhost:20128${pathAndQuery}`);
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
    deepseek: { "deepseek-chat": { input: 0.5, output: 1, cached: 0.1, cache_creation: 0.5 } },
  });

  // Alice, project acme: one session that falls back from openai to deepseek mid-way.
  const aliceAcme = agentContext("alice-1");
  await recordUsage({ agentContext: aliceAcme, timestamp: "2026-09-20T10:00:00.000Z" });
  await recordUsage({
    agentContext: aliceAcme,
    provider: "deepseek",
    model: "deepseek-chat",
    connectionId: "conn-deepseek-1",
    timestamp: "2026-09-20T10:05:00.000Z",
  });
  // Bob, project billing: two openai requests on different days, one failed.
  const bobBilling = agentContext("bob-1", "billing");
  await recordUsage({
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: bobBilling,
    timestamp: "2026-09-21T09:00:00.000Z",
  });
  await recordUsage({
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: bobBilling,
    success: false,
    timestamp: "2026-09-22T09:00:00.000Z",
  });
  // Unattributed traffic (no agent context) must never appear in team reports.
  await recordUsage({ apiKeyId: "key-alice", timestamp: "2026-09-21T12:00:00.000Z" });
});

test("read-time report cost matches the write-time session cost for the same requests", async () => {
  const report = await buildAgentSessionReport();
  const sessionCost = (
    core.getDbInstance().prepare("SELECT SUM(cost_usd) AS cost FROM agent_sessions").get() as {
      cost: number;
    }
  ).cost;

  assert.equal(report.totals.requests, 4, "the unattributed request is excluded");
  assert.equal(report.totals.errors, 1);
  assert.equal(report.totals.sessions, 2);
  assert.equal(report.totals.members, 2);
  assert.equal(report.totals.projects, 2);
  assert.equal(report.totals.tokens.total, 4 * (1000 + 500 + 200));
  assert.ok(report.totals.costUsd > 0);
  assert.ok(Math.abs(report.totals.costUsd - sessionCost) < 1e-9);
});

test("a session that switched providers is split across both providers and accounts", async () => {
  const { breakdowns } = await buildAgentSessionReport({ apiKeyId: "key-alice" });

  assert.deepEqual(
    breakdowns.providers.map((row) => [row.key, row.requests, row.sessions]).sort(),
    [
      ["deepseek", 1, 1],
      ["openai", 1, 1],
    ]
  );
  const deepseekAccount = breakdowns.accounts.find((row) => row.key === "conn-deepseek-1");
  assert.equal(deepseekAccount?.detail, "deepseek");
  assert.equal(deepseekAccount?.requests, 1);
});

test("provider and account filters count only matching requests but list every session that used them", async () => {
  const report = await buildAgentSessionReport({ provider: "openai" });
  assert.equal(report.totals.requests, 3, "Alice's deepseek request is excluded");
  assert.deepEqual(breakdownKeys(report.breakdowns.members), ["key-alice", "key-bob"]);

  // Alice's session last used deepseek, yet it did use openai.
  const res = await getSessions(reportRequest("/api/reports/sessions?provider=openai"));
  const body = (await res.json()) as { total: number };
  assert.equal(res.status, 200);
  assert.equal(body.total, 2);

  const byAccount = await buildAgentSessionReport({ connectionId: "conn-deepseek-1" });
  assert.equal(byAccount.totals.requests, 1);
});

function breakdownKeys(rows: Array<{ key: string }>): string[] {
  return rows.map((row) => row.key).sort();
}

test("the time window bounds each request, and offset timestamps are normalized to UTC", async () => {
  // 2026-09-21T12:00+03:00 is 09:00Z, so Bob's first request (09:00Z) is included.
  const res = await getSummary(
    reportRequest(
      `/api/reports/summary?from=${encodeURIComponent("2026-09-21T12:00:00+03:00")}` +
        `&to=${encodeURIComponent("2026-09-21T23:59:59Z")}`
    )
  );
  assert.equal(res.status, 200);
  const report = (await res.json()) as Awaited<ReturnType<typeof buildAgentSessionReport>>;
  assert.equal(report.totals.requests, 1);
  assert.deepEqual(breakdownKeys(report.breakdowns.daily), ["2026-09-21"]);
});

test("invalid filters are rejected with a sanitized 400", async () => {
  const res = await getSummary(reportRequest("/api/reports/summary?from=yesterday"));
  const body = (await res.json()) as { error: { message: string } };
  assert.equal(res.status, 400);
  assert.equal(body.error.message, "Invalid query parameters");
  assert.ok(!body.error.message.includes("at /"));

  const badType = await getExport(reportRequest("/api/reports/export?type=secrets"));
  assert.equal(badType.status, 400);
});

test("CSV export neutralizes spreadsheet formulas in client-supplied names", async () => {
  await recordUsage({
    apiKeyId: "key-mallory",
    apiKeyName: "Mallory",
    agentContext: agentContext("mallory-1", '=HYPERLINK("http://evil","x"),y'),
    timestamp: "2026-09-23T08:00:00.000Z",
  });

  const res = await getExport(reportRequest("/api/reports/export?type=projects"));
  const csv = await res.text();
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-disposition") ?? "", /omniroute-report-projects-/);
  assert.ok(csv.includes(`"'=HYPERLINK(""http://evil"",""x""),y"`), csv);
  assert.ok(!/(^|,)=HYPERLINK/m.test(csv), "no cell starts with a bare formula");

  const sessionsCsv = await (
    await getExport(reportRequest("/api/reports/export?type=sessions&apiKeyId=key-bob"))
  ).text();
  const [header, ...rows] = sessionsCsv.split("\n");
  assert.ok(header.startsWith("session_id,api_key_id,api_key_name"));
  assert.equal(rows.length, 1);
  assert.ok(rows[0].includes(",key-bob,Bob,claude-code,billing,"));
});

test("report routes require management auth when login is enabled", async () => {
  process.env.INITIAL_PASSWORD = "reports-test-password";
  try {
    for (const route of [getSummary, getSessions, getExport]) {
      const res = await route(reportRequest("/api/reports/summary"));
      assert.ok([401, 403].includes(res.status), `expected auth rejection, got ${res.status}`);
    }
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});
