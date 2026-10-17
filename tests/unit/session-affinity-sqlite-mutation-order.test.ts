import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-order-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "synthetic-affinity-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const sqlite = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const providers = await import("../../src/lib/db/providers.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Assert the original synchronous contract directly; CI needs no historical git object.
for (const mode of ["select", "lease-commit"] as const) {
  function start(key: string, candidate: string) {
    const connections = [{ id: candidate }];
    if (mode === "select")
      return pin.selectSessionAffinityConnection("glm", key, connections, 60_000);
    return pin.planSessionAffinityConnection("glm", key, connections, 60_000)!.commit();
  }
  test(`${mode}: replacement is visible before control yields`, async () => {
    const key = `synthetic-${mode}-visible`;
    sqlite.upsertSessionAccountAffinity(key, "glm", "obsolete", Date.now(), 60_000);
    const pending = start(key, "A");
    const immediately = sqlite.getSessionAccountAffinity(key, "glm", 60_000)?.connectionId;
    await pending;
    assert.equal(immediately, "A");
  });
  test(`${mode}: provider usage is touched before control yields`, async () => {
    const created = await providers.createProviderConnection({
      provider: "glm",
      authType: "apikey",
      name: `synthetic-${mode}`,
      apiKey: `synthetic-${mode}-key`,
      isActive: true,
    });
    const id = String(created.id);
    const key = `synthetic-${mode}-touch`;
    sqlite.upsertSessionAccountAffinity(key, "glm", id, Date.now(), 60_000);
    const pending = start(key, id);
    const immediately = core
      .getDbInstance()
      .prepare("SELECT consecutive_use_count FROM provider_connections WHERE id = ?")
      .get(id) as { consecutive_use_count: number };
    await pending;
    assert.equal(immediately.consecutive_use_count, 1);
  });
  test(`${mode}: a later concurrent selection stays the last writer`, async () => {
    const key = `synthetic-${mode}-order`;
    sqlite.upsertSessionAccountAffinity(key, "glm", "obsolete", Date.now(), 60_000);
    const first = start(key, "A");
    const second = start(key, "B");
    await Promise.all([first, second]);
    assert.equal(sqlite.getSessionAccountAffinity(key, "glm", 60_000)?.connectionId, "B");
  });
}

// Execute each actual chat eviction try-block, including its await/branch shape.
// The continuation marker catches a new yield even when the deletion itself is synchronous.
const chatText = fs.readFileSync(
  new URL("../../src/sse/handlers/chat.ts", import.meta.url),
  "utf8"
);
const chatAst = ts.createSourceFile("chat.ts", chatText, ts.ScriptTarget.Latest, true);
const sites: ts.TryStatement[] = [];
function visit(node: ts.Node): void {
  if (
    ts.isTryStatement(node) &&
    node.tryBlock.getText(chatAst).includes("evictSessionAccountAffinityForConnection")
  )
    sites.push(node);
  ts.forEachChild(node, visit);
}
visit(chatAst);
// The two Antigravity failover blocks keep the exact base code (TTL-gated read + delete) and are
// pinned byte-for-byte by session-affinity-antigravity-base-parity.test.ts.
assert.equal(sites.length, 2, "cover both guarded chat eviction sites");
const reasons = ["terminal stream EOF", "generic fallback"];
for (const [index, site] of sites.entries()) {
  test(`chat ${reasons[index]}: SQLite eviction and continuation are synchronous`, async () => {
    const key = `synthetic-chat-eviction-${index}`;
    sqlite.upsertSessionAccountAffinity(key, "glm", "A", Date.now(), 60_000);
    let continued = false;
    const compiled = ts.transpileModule(
      `(async () => { ${site.getText(chatAst)} markContinued(); })`,
      { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }
    ).outputText;
    const start = vm.runInNewContext(compiled, {
      Promise,
      runtimeOptions: { sessionAffinityKey: key },
      provider: "glm",
      credentials: { connectionId: "A" },
      getSessionAffinityStore: affinity.getSessionAffinityStore,
      evictSessionAccountAffinityForConnection:
        affinity.evictSessionAccountAffinityForConnectionAsync,
      evictSessionAccountAffinityForConnectionAsync:
        affinity.evictSessionAccountAffinityForConnectionAsync,
      markContinued: () => {
        continued = true;
      },
    }) as () => Promise<void>;
    const pending = start();
    const immediately = sqlite.getSessionAccountAffinity(key, "glm", 60_000);
    const continuedImmediately = continued;
    await pending;
    assert.equal(immediately, null, "eviction must be visible in the calling turn");
    assert.equal(continuedImmediately, true, "the caller must not gain an await boundary");
  });
}
