import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cas-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const local = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const factory = await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
import type * as pin from "../../src/sse/services/sessionAffinityPin.ts";

function account(id: string, user: string, priority = 1) {
  return {
    id,
    provider: "codex",
    authType: "oauth",
    priority,
    consecutiveUseCount: 4,
    providerSpecificData: { workspaceId: "synthetic-workspace", chatgptUserId: user },
  };
}
function record(connection: ReturnType<typeof account>) {
  const now = Date.now();
  return {
    connectionId: connection.id,
    accountIdentity: identity.sessionAffinityAccountIdentity(connection, "codex"),
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60_000).toISOString(),
  };
}
// Command double, not a Redis/Lua integration test.
class FakeRedis {
  value: string | null = null;
  rejected = 0;
  writes = 0;
  repinOnEval: string | null = null;
  async get(_key: string) {
    return this.value;
  }
  async set(_key: string, value: string, _mode: "PX", _ttl: number) {
    this.value = value;
  }
  async del(_key: string) {
    const existed = this.value !== null;
    this.value = null;
    return Number(existed);
  }
  async eval(
    _script: string,
    _count: number,
    _key: string,
    expected: string,
    replacement: string,
    _ttl: number
  ) {
    if (expected === undefined) return [await this.get(_key), this.value === null ? -2 : 60_000];
    this.writes++;
    if (this.repinOnEval) this.value = this.repinOnEval;
    if ((this.value ?? "") !== expected) {
      this.rejected++;
      return [0, this.value, this.value === null ? -2 : 60_000];
    }
    const existed = this.value !== null;
    this.value = replacement || null;
    return [replacement ? 1 : Number(existed), this.value, replacement ? _ttl : -2];
  }
}
function inject(redis: FakeRedis) {
  process.env.OMNIROUTE_SESSION_AFFINITY_STORE = "redis";
  factory._setSessionAffinityRedisForTests({
    getClient: async () => redis,
    isConfigured: () => true,
  });
}
test.afterEach(() => {
  factory._setSessionAffinityRedisForTests(null);
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Compile the real declarations in this realm to inject usage/log spies.
const source = fs.readFileSync(
  new URL("../../src/sse/services/sessionAffinityPin.ts", import.meta.url),
  "utf8"
);
const ast = ts.createSourceFile("pin.ts", source, ts.ScriptTarget.Latest, true);
const names = new Set([
  "compareLruConnections",
  "liveAffinitySnapshot",
  "formatSessionKeyForLog",
  "clearObsoleteSessionAffinity",
  "logSessionAffinitySelection",
  "logSharedSessionAffinitySelection",
  "selectSessionAffinityConnection",
  "planSessionAffinityConnection",
]);
const bodies = ast.statements
  .filter((node) => ts.isFunctionDeclaration(node) && names.has(node.name!.text))
  .map((node) => node.getText(ast).replace(/^export /, ""))
  .join("\n");
const js = ts.transpileModule(bodies, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;
function recordingSelectors() {
  const usage: Array<[string, number]> = [];
  const logs: Array<[string, string]> = [];
  const dependencies = {
    ...local,
    ...identity,
    getSessionAffinityStore: factory.getSessionAffinityStore,
    touchConnectionLastUsed: async (id: string, count: number) => {
      usage.push([id, count]);
    },
    log: {
      info: (_tag: string, message: string) => logs.push(["info", message]),
      debug: (_tag: string, message: string) => logs.push(["debug", message]),
    },
  };
  const selectors = vm.compileFunction(
    js + "; return { selectSessionAffinityConnection, planSessionAffinityConnection };",
    Object.keys(dependencies)
  )(...Object.values(dependencies)) as Pick<
    typeof pin,
    "selectSessionAffinityConnection" | "planSessionAffinityConnection"
  >;
  return { ...selectors, usage, logs };
}

test("two independent pools dispatch the same shared CAS winner, touching/logging only the used account", async () => {
  const redis = new FakeRedis();
  const { selectSessionAffinityConnection: select, usage, logs } = recordingSelectors();
  inject(redis);
  const a = select(
    "codex",
    "synthetic-race",
    [account("a-x", "X", 1), account("a-y", "Y", 2)],
    60_000
  );
  inject(redis);
  const b = select(
    "codex",
    "synthetic-race",
    [account("b-x", "X", 2), account("b-y", "Y", 1)],
    60_000
  );
  const [selectedA, selectedB] = await Promise.all([a, b]);
  const shared = JSON.parse(redis.value!);
  assert.equal(redis.rejected, 1);
  assert.equal(redis.writes, 2, "adoption must not write/touch the shared winner again");
  for (const selected of [selectedA, selectedB])
    assert.equal(
      identity.sessionAffinityAccountIdentity(selected!, "codex"),
      shared.accountIdentity
    );
  assert.deepEqual(
    [...usage].sort(([a], [b]) => a.localeCompare(b)),
    [
      ["a-x", 1],
      ["b-x", 5],
    ]
  );
  assert.equal(selectedB?.consecutiveUseCount, 5);
  assert.ok(
    logs.some(
      ([level, message]) => level === "info" && message.includes("connection b-x (affinity)")
    )
  );
  assert.ok(
    logs.every(([, message]) => !message.includes("b-y")),
    "never log a new pin for the loser"
  );
});

test("rejected winner outside the pool keeps the local candidate without changing shared/shadow state", async () => {
  const redis = new FakeRedis();
  const winner = JSON.stringify(record(account("remote", "remote")));
  redis.repinOnEval = winner;
  inject(redis);
  const { selectSessionAffinityConnection: select, usage, logs } = recordingSelectors();
  const selected = await select("codex", "synthetic-absent", [account("local", "local")], 60_000);
  assert.equal(selected?.id, "local");
  assert.equal(redis.value, winner);
  assert.equal(redis.writes, 1);
  assert.equal(local.getSessionAccountAffinity("synthetic-absent", "codex", 60_000), null);
  assert.deepEqual(usage, [["local", 1]]);
  assert.equal(logs.filter(([level]) => level === "debug").length, 1);
  assert.ok(
    logs.every(([level, message]) => level !== "info" || !message.includes("new affinity created"))
  );
});

test("durably claimed lease candidate cannot switch after rejected CAS and leaves the winner intact", async () => {
  const redis = new FakeRedis();
  const winner = JSON.stringify(record(account("remote", "X")));
  redis.repinOnEval = winner;
  inject(redis);
  const { planSessionAffinityConnection: planSelection, usage } = recordingSelectors();
  const plan = planSelection(
    "codex",
    "synthetic-lease",
    [account("local-y", "Y", 1), account("local-x", "X", 2)],
    60_000,
    null
  )!;
  const claimed = plan.connection;
  await plan.commit();
  assert.equal(plan.connection, claimed);
  assert.equal(claimed.id, "local-y");
  assert.equal(redis.value, winner);
  assert.equal(redis.writes, 1);
  assert.deepEqual(usage, [["local-y", 1]]);
  assert.equal(local.getSessionAccountAffinity("synthetic-lease", "codex", 60_000), null);
});

test("store reports the rejected winner to its caller without caching the losing pin", async (t) => {
  const now = Date.now();
  t.mock.method(Date, "now", () => now);
  const redis = new FakeRedis();
  const winner = record(account("remote", "X"));
  redis.repinOnEval = JSON.stringify(winner);
  inject(redis);
  const result = await factory
    .getSessionAffinityStore()
    .upsert("synthetic-outcome", "codex", "loser", Date.now(), 60_000);
  assert.deepEqual(result, winner);
  assert.equal(local.getSessionAccountAffinity("synthetic-outcome", "codex", 60_000), null);
});
