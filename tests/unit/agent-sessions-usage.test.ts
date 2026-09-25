// Agent sessions: saveRequestUsage aggregates each attributed request into its session row
// (190_agent_sessions) and links the usage row to it (191_usage_history_agent_session_id).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type SessionRow = {
  id: string;
  api_key_id: string | null;
  client: string | null;
  project_name: string | null;
  project_path: string | null;
  git_branch: string | null;
  first_seen_at: string;
  last_seen_at: string;
  request_count: number;
  error_count: number;
  tokens_input: number;
  tokens_output: number;
  tokens_cache_read: number;
  cost_usd: number;
  unpriced_count: number;
  last_model: string | null;
};

function agentContext(overrides: Record<string, unknown> = {}) {
  return {
    client: "claude-code",
    clientSessionId: null,
    projectName: "acme",
    projectRepo: null,
    projectPath: "/Users/dev/acme",
    projectSource: "path" as const,
    gitBranch: "main",
    ...overrides,
  };
}

async function recordUsage(entry: Record<string, unknown>) {
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o-mini",
    tokens: { input: 1000, output: 500, cacheRead: 200 },
    success: true,
    latencyMs: 10,
    apiKeyId: "key-alice",
    apiKeyName: "Alice",
    ...entry,
  });
}

function sessionsFor(apiKeyId: string): SessionRow[] {
  return core
    .getDbInstance()
    .prepare("SELECT * FROM agent_sessions WHERE api_key_id IS ? ORDER BY first_seen_at")
    .all(apiKeyId) as SessionRow[];
}

function usageSessionIds(apiKeyId: string): Array<string | null> {
  return (
    core
      .getDbInstance()
      .prepare("SELECT agent_session_id FROM usage_history WHERE api_key_id IS ? ORDER BY id")
      .all(apiKeyId) as Array<{ agent_session_id: string | null }>
  ).map((row) => row.agent_session_id);
}

test.before(async () => {
  await settingsDb.updatePricing({
    openai: {
      "gpt-4o-mini": { input: 1, output: 2, cached: 0.5, cache_creation: 1, reasoning: 2 },
    },
  });
});

test("requests of one client session aggregate into a single priced session row", async () => {
  const context = agentContext({ clientSessionId: "sess-1" });
  await recordUsage({ agentContext: context, timestamp: "2026-09-25T10:00:00.000Z" });
  await recordUsage({
    agentContext: { ...context, gitBranch: "feature/x" },
    timestamp: "2026-09-25T10:05:00.000Z",
    success: false,
    tokens: { input: 0, output: 0 },
  });

  const [session] = sessionsFor("key-alice");
  assert.equal(sessionsFor("key-alice").length, 1);
  assert.equal(session.request_count, 2);
  assert.equal(session.error_count, 1);
  assert.equal(session.tokens_input, 1000);
  assert.equal(session.tokens_output, 500);
  assert.equal(session.tokens_cache_read, 200);
  assert.equal(session.first_seen_at, "2026-09-25T10:00:00.000Z");
  assert.equal(session.last_seen_at, "2026-09-25T10:05:00.000Z");
  assert.equal(session.git_branch, "feature/x");
  assert.equal(session.project_name, "acme");
  assert.equal(session.client, "claude-code");
  assert.ok(session.cost_usd > 0, "cost is priced at write time");
  assert.equal(session.unpriced_count, 0);
  assert.deepEqual(usageSessionIds("key-alice"), [session.id, session.id]);
});

test("the same client session id under another API key is a separate session", async () => {
  await recordUsage({
    apiKeyId: "key-bob",
    apiKeyName: "Bob",
    agentContext: agentContext({ clientSessionId: "sess-1" }),
    timestamp: "2026-09-25T10:01:00.000Z",
  });
  const [bobSession] = sessionsFor("key-bob");
  const [aliceSession] = sessionsFor("key-alice");
  assert.ok(bobSession);
  assert.notEqual(bobSession.id, aliceSession.id);
  assert.equal(aliceSession.request_count, 2, "Bob's request never touches Alice's session");
});

test("without a client session id, one key and project share a session within the idle window", async () => {
  const context = agentContext({ projectName: "billing", projectPath: "/srv/billing" });
  await recordUsage({
    apiKeyId: "key-carol",
    agentContext: context,
    timestamp: "2026-09-25T09:00:00.000Z",
  });
  await recordUsage({
    apiKeyId: "key-carol",
    agentContext: context,
    timestamp: "2026-09-25T09:29:00.000Z",
  });
  await recordUsage({
    apiKeyId: "key-carol",
    agentContext: context,
    timestamp: "2026-09-25T10:30:00.000Z",
  });

  const sessions = sessionsFor("key-carol");
  assert.deepEqual(
    sessions.map((session) => session.request_count),
    [2, 1],
    "a gap longer than 30 minutes starts a new session"
  );
});

test("a deduplicated usage write does not count the request twice", async () => {
  const entry = {
    apiKeyId: "key-dave",
    agentContext: agentContext({ clientSessionId: "sess-dave" }),
    timestamp: "2026-09-25T11:00:00.000Z",
  };
  await recordUsage(entry);
  await recordUsage(entry);
  const [session] = sessionsFor("key-dave");
  assert.equal(session.request_count, 1);
});

test("unpriced models are counted instead of silently adding $0", async () => {
  await recordUsage({
    apiKeyId: "key-erin",
    model: "model-without-pricing-xyz",
    agentContext: agentContext({ clientSessionId: "sess-erin" }),
    timestamp: "2026-09-25T12:00:00.000Z",
  });
  const [session] = sessionsFor("key-erin");
  assert.equal(session.unpriced_count, 1);
  assert.equal(session.cost_usd, 0);
});

test("traffic without an agent identity creates no session", async () => {
  await recordUsage({ apiKeyId: "key-frank", timestamp: "2026-09-25T13:00:00.000Z" });
  await recordUsage({
    apiKeyId: "key-frank",
    agentContext: agentContext({ projectName: null, projectPath: null, projectSource: null }),
    timestamp: "2026-09-25T13:01:00.000Z",
  });
  assert.equal(sessionsFor("key-frank").length, 0);
  assert.deepEqual(usageSessionIds("key-frank"), [null, null]);
});
