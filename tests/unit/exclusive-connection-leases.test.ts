import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hard-lease-v2-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const leases = await import("../../src/lib/db/exclusiveConnectionLeases.ts");

const OWNER_A = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
const OWNER_B = "vlo_BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB";

function at(seconds: number): string {
  return new Date(Date.UTC(2026, 7, 12, 19, 30, seconds)).toISOString();
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("hashes canonical owners and never persists the raw owner", () => {
  assert.match(leases.hashLeaseOwnerId(OWNER_A), /^[a-f0-9]{64}$/);
  assert.throws(() => leases.hashLeaseOwnerId("routing-session"), /canonical/);

  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: "key-a",
    provider: "codex",
    connectionId: "conn-a",
    now: at(0),
    ttlMs: 120_000,
  });

  assert.equal(acquired.kind, "ACQUIRED");
  const db = core.getDbInstance();
  const row = db.prepare("SELECT lease_owner_hash FROM exclusive_connection_leases").get() as {
    lease_owner_hash: string;
  };
  assert.match(row.lease_owner_hash, /^[a-f0-9]{64}$/);
  assert.notEqual(row.lease_owner_hash, OWNER_A);
  const rawDb = fs.readFileSync(path.join(TEST_DATA_DIR, "storage.sqlite"));
  assert.equal(rawDb.includes(Buffer.from(OWNER_A)), false);
});

test("uses the live next-free migration slot without runner compatibility special cases", () => {
  const migration = fs.readFileSync(
    new URL("../../src/lib/db/migrations/157_exclusive_connection_leases.sql", import.meta.url),
    "utf8"
  );
  const runner = fs.readFileSync(
    new URL("../../src/lib/db/migrationRunner.ts", import.meta.url),
    "utf8"
  );
  assert.match(migration, /CREATE TABLE IF NOT EXISTS exclusive_connection_leases/);
  assert.doesNotMatch(runner, /case "157"/);
});

test("enforces global active owner and connection uniqueness", () => {
  // Establish the OWNER_A/conn-a lease this test reuses, rather than depending
  // on a lease left behind by an earlier test in the file. The DB instance is
  // shared across tests (reset only in test.after), so relying on prior state
  // makes this test order-dependent: run in isolation the re-acquire below
  // returns ACQUIRED instead of REUSED.
  leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: "key-a",
    provider: "codex",
    connectionId: "conn-a",
    now: at(0),
  });

  const ownerA = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: "key-a",
    provider: "codex",
    connectionId: "conn-a",
    now: at(1),
  });
  assert.equal(ownerA.kind, "REUSED");

  const sameOwnerOtherKey = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_A,
    apiKeyId: "key-b",
    provider: "openai",
    connectionId: "conn-b",
    now: at(2),
  });
  assert.equal(sameOwnerOtherKey.kind, "OWNER_ALREADY_ACTIVE");

  const foreign = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: "key-b",
    provider: "codex",
    connectionId: "conn-a",
    now: at(3),
  });
  assert.equal(foreign.kind, "CONNECTION_BUSY");
});

test("renews and releases only an exact generation and release is idempotent", () => {
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: "key-b",
    provider: "codex",
    connectionId: "conn-b",
    now: at(4),
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  assert.equal(
    leases.renewExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: acquired.lease.generation + 1,
      apiKeyId: "key-b",
      now: at(5),
    }).kind,
    "STALE"
  );
  assert.equal(
    leases.renewExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: acquired.lease.generation,
      apiKeyId: "key-b",
      now: at(6),
    }).kind,
    "RENEWED"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: acquired.lease.generation - 1,
      apiKeyId: "key-b",
      now: at(7),
    }).kind,
    "STALE"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: acquired.lease.generation,
      apiKeyId: "key-b",
      now: at(8),
    }).kind,
    "RELEASED"
  );
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: OWNER_B,
      generation: acquired.lease.generation,
      apiKeyId: "key-b",
      now: at(9),
    }).kind,
    "RELEASED"
  );
});

test("keeps generation on failover and fences stale requests", () => {
  const first = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    apiKeyId: "key-b",
    provider: "codex",
    connectionId: "conn-b",
    now: at(10),
  });
  assert.equal(first.kind, "ACQUIRED");
  if (first.kind !== "ACQUIRED") return;

  const transitioned = leases.transitionExclusiveConnectionLease({
    leaseOwnerId: OWNER_B,
    generation: first.lease.generation,
    apiKeyId: "key-b",
    provider: "codex",
    connectionId: "conn-c",
    now: at(11),
    reason: "CONNECTION_INELIGIBLE",
  });
  assert.equal(transitioned.kind, "TRANSITIONED");
  if (transitioned.kind !== "TRANSITIONED") return;
  assert.equal(transitioned.lease.generation, first.lease.generation);
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({
      leaseOwnerId: OWNER_B,
      generation: first.lease.generation,
      apiKeyId: "key-b",
      connectionId: "conn-b",
      now: at(12),
    }).kind,
    "CONNECTION_MISMATCH"
  );
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({
      leaseOwnerId: OWNER_B,
      generation: first.lease.generation,
      apiKeyId: "key-b",
      connectionId: "conn-c",
      now: at(12),
    }).kind,
    "VALID"
  );
  assert.equal(
    leases.assertExclusiveConnectionLeaseFence({
      leaseOwnerId: OWNER_B,
      generation: first.lease.generation,
      apiKeyId: "key-foreign",
      connectionId: "conn-c",
      now: at(12),
    }).kind,
    "AUTHORIZATION_MISMATCH"
  );
});

test("invalidates an unsafe binding only for the exact generation", () => {
  const owner = "vlo_DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD";
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-d",
    provider: "codex",
    connectionId: "conn-invalid",
    now: at(13),
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  assert.equal(
    leases.invalidateExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: acquired.lease.generation + 1,
      apiKeyId: "key-d",
      reason: "QUOTA_UNAVAILABLE",
      now: at(14),
    }).kind,
    "STALE"
  );
  const invalidated = leases.invalidateExclusiveConnectionLease({
    leaseOwnerId: owner,
    generation: acquired.lease.generation,
    apiKeyId: "key-d",
    reason: "QUOTA_UNAVAILABLE",
    now: at(15),
  });
  assert.equal(invalidated.kind, "INVALIDATED");
  assert.equal(leases.getActiveExclusiveConnectionLease(owner, at(16)), null);
});

test("expires lazily, reconciles at restart, and increments generation", () => {
  const owner = "vlo_CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC";
  const first = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-c",
    provider: "codex",
    connectionId: "conn-expire",
    now: at(13),
    ttlMs: 1_000,
  });
  assert.equal(first.kind, "ACQUIRED");
  if (first.kind !== "ACQUIRED") return;

  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases(at(15)), 1);
  const second = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-c",
    provider: "codex",
    connectionId: "conn-expire",
    now: at(16),
  });
  assert.equal(second.kind, "ACQUIRED");
  if (second.kind !== "ACQUIRED") return;
  assert.equal(second.lease.generation, first.lease.generation + 1);
});

test("zero-request heartbeat holds through idle and restart until bounded TTL recovery", () => {
  const owner = "vlo_GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG";
  const contender = "vlo_HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH";
  const acquired = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-g",
    provider: "codex",
    connectionId: "conn-idle-heartbeat",
    now: "2026-08-12T19:32:00.000Z",
    ttlMs: 1_000,
  });
  assert.equal(acquired.kind, "ACQUIRED");
  if (acquired.kind !== "ACQUIRED") return;

  const renewed = leases.renewExclusiveConnectionLease({
    leaseOwnerId: owner,
    generation: acquired.lease.generation,
    apiKeyId: "key-g",
    now: "2026-08-12T19:32:00.500Z",
    ttlMs: 1_000,
  });
  assert.equal(renewed.kind, "RENEWED");
  assert.equal(
    leases.acquireExclusiveConnectionLease({
      leaseOwnerId: contender,
      apiKeyId: "key-h",
      provider: "codex",
      connectionId: "conn-idle-heartbeat",
      now: "2026-08-12T19:32:01.000Z",
    }).kind,
    "CONNECTION_BUSY"
  );

  core.resetDbInstance();
  assert.equal(
    leases.getActiveExclusiveConnectionLease(owner, "2026-08-12T19:32:01.250Z")?.generation,
    acquired.lease.generation
  );
  assert.equal(leases.reconcileExpiredExclusiveConnectionLeases("2026-08-12T19:32:01.500Z"), 1);
  assert.equal(
    leases.acquireExclusiveConnectionLease({
      leaseOwnerId: contender,
      apiKeyId: "key-h",
      provider: "codex",
      connectionId: "conn-idle-heartbeat",
      now: "2026-08-12T19:32:01.501Z",
    }).kind,
    "ACQUIRED"
  );
});

test("generation remains monotonic after release and invalidation", () => {
  const owner = "vlo_IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII";
  const first = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-i",
    provider: "codex",
    connectionId: "conn-generation-a",
    now: "2026-08-12T19:33:00.000Z",
  });
  assert.equal(first.kind, "ACQUIRED");
  if (first.kind !== "ACQUIRED") return;
  assert.equal(
    leases.releaseExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: first.lease.generation,
      apiKeyId: "key-i",
      now: "2026-08-12T19:33:01.000Z",
    }).kind,
    "RELEASED"
  );

  const second = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-i",
    provider: "codex",
    connectionId: "conn-generation-b",
    now: "2026-08-12T19:33:02.000Z",
  });
  assert.equal(second.kind, "ACQUIRED");
  if (second.kind !== "ACQUIRED") return;
  assert.equal(second.lease.generation, first.lease.generation + 1);
  assert.equal(
    leases.invalidateExclusiveConnectionLease({
      leaseOwnerId: owner,
      generation: second.lease.generation,
      apiKeyId: "key-i",
      reason: "CONNECTION_INELIGIBLE",
      now: "2026-08-12T19:33:03.000Z",
    }).kind,
    "INVALIDATED"
  );

  const third = leases.acquireExclusiveConnectionLease({
    leaseOwnerId: owner,
    apiKeyId: "key-i",
    provider: "codex",
    connectionId: "conn-generation-c",
    now: "2026-08-12T19:33:04.000Z",
  });
  assert.equal(third.kind, "ACQUIRED");
  if (third.kind !== "ACQUIRED") return;
  assert.equal(third.lease.generation, second.lease.generation + 1);
});

test("migration exposes exactly global ACTIVE uniqueness indexes", () => {
  const db = core.getDbInstance();
  const ownerIndex = db
    .prepare("SELECT sql FROM sqlite_master WHERE name = 'idx_exclusive_lease_active_owner'")
    .get() as { sql: string };
  const connectionIndex = db
    .prepare("SELECT sql FROM sqlite_master WHERE name = 'idx_exclusive_lease_active_connection'")
    .get() as { sql: string };

  assert.match(ownerIndex.sql, /UNIQUE INDEX[\s\S]*\(lease_owner_hash\)[\s\S]*state = 'ACTIVE'/i);
  assert.doesNotMatch(ownerIndex.sql, /api_key_id|provider/i);
  assert.match(connectionIndex.sql, /UNIQUE INDEX[\s\S]*\(connection_id\)[\s\S]*state = 'ACTIVE'/i);
  assert.doesNotMatch(connectionIndex.sql, /api_key_id|provider/i);
});

test("cross-process contenders never both acquire the same connection", async () => {
  const raceDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hard-lease-race-"));
  const barrier = path.join(raceDir, "go");
  const coreUrl = new URL("../../src/lib/db/core.ts", import.meta.url).href;
  const moduleUrl = new URL("../../src/lib/db/exclusiveConnectionLeases.ts", import.meta.url).href;
  const worker = [
    `import fs from "node:fs";`,
    `process.env.DATA_DIR = process.env.LEASE_RACE_DIR;`,
    `const leases = await import(${JSON.stringify(moduleUrl)});`,
    `while (!fs.existsSync(process.env.LEASE_RACE_BARRIER)) { await new Promise((r) => setTimeout(r, 2)); }`,
    `const result = leases.acquireExclusiveConnectionLease({`,
    `  leaseOwnerId: process.env.LEASE_RACE_OWNER,`,
    `  apiKeyId: process.env.LEASE_RACE_KEY,`,
    `  provider: "codex",`,
    `  connectionId: "conn-process-race",`,
    `  now: "2026-08-12T19:31:00.000Z",`,
    `});`,
    `process.stdout.write(JSON.stringify({ kind: result.kind, generation: result.lease?.generation }));`,
  ].join("\n");

  function runChild(script: string, env: Record<string, string>): Promise<string> {
    return new Promise((resolve, reject) => {
      const child = spawn(
        process.execPath,
        ["--import", "tsx/esm", "--input-type=module", "-e", script],
        {
          cwd: process.cwd(),
          env: { ...process.env, ...env },
          stdio: ["ignore", "pipe", "pipe"],
        }
      );
      let stdout = "";
      let stderr = "";
      child.stdout.setEncoding("utf8").on("data", (chunk) => (stdout += chunk));
      child.stderr.setEncoding("utf8").on("data", (chunk) => (stderr += chunk));
      child.once("error", reject);
      child.once("exit", (code) => {
        if (code !== 0) return reject(new Error(`race worker failed (${code}): ${stderr}`));
        resolve(stdout);
      });
    });
  }

  function contender(owner: string, key: string): Promise<{ kind: string; generation?: number }> {
    return runChild(worker, {
      LEASE_RACE_DIR: raceDir,
      LEASE_RACE_BARRIER: barrier,
      LEASE_RACE_OWNER: owner,
      LEASE_RACE_KEY: key,
    }).then((stdout) => {
      const start = stdout.lastIndexOf("{");
      return JSON.parse(stdout.slice(start)) as { kind: string; generation?: number };
    });
  }

  try {
    await runChild(
      `process.env.DATA_DIR = process.env.LEASE_RACE_DIR; const core = await import(${JSON.stringify(coreUrl)}); core.getDbInstance();`,
      { LEASE_RACE_DIR: raceDir }
    );
    const contenders = [
      contender("vlo_EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE", "key-e"),
      contender("vlo_FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "key-f"),
    ];
    fs.writeFileSync(barrier, "go", { flag: "wx" });
    const results = await Promise.all(contenders);
    assert.equal(results.filter((result) => result.kind === "ACQUIRED").length, 1);
    assert.equal(results.filter((result) => result.kind === "CONNECTION_BUSY").length, 1);
  } finally {
    fs.rmSync(raceDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
