import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-agy-parity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const eviction = await import("../../src/lib/db/sessionAffinity/requestEviction.ts");
const headSource = fs.readFileSync(
  fileURLToPath(new URL("../../src/sse/handlers/chat.ts", import.meta.url)),
  "utf8"
);
// Exact try-block text from 3c5e5aed1abc637e13ea90272bb17a469acd8d6a,
// identical in both branches. Embedded so shallow clones still exercise parity.
const baseBlock = `{
              const affinity = getSessionAccountAffinity(
                runtimeOptions.sessionAffinityKey,
                provider
              );
              if (affinity?.connectionId === credentials.connectionId) {
                deleteSessionAccountAffinity(runtimeOptions.sessionAffinityKey, provider);
              }
            }`;
function affinityBlock(branch: string): string {
  const tree = ts.createSourceFile("chat.ts", headSource, ts.ScriptTarget.Latest, true);
  let found: ts.Block | undefined;
  function scan(node: ts.Node) {
    if (
      ts.isTryStatement(node) &&
      /getSessionAccountAffinity\(|evictSessionAccountAffinityForConnectionAsync\(/.test(
        node.tryBlock.getText(tree)
      )
    )
      found = node.tryBlock;
    else ts.forEachChild(node, scan);
  }
  function visit(node: ts.Node) {
    if (ts.isIfStatement(node) && node.expression.getText(tree) === branch)
      scan(node.thenStatement);
    else ts.forEachChild(node, visit);
  }
  visit(tree);
  assert.ok(found, `missing affinity block in ${branch}`);
  return found.getText(tree);
}
function run(block: string, key: string) {
  const js = ts.transpileModule(`async function run() ${block}`, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None },
  }).outputText;
  return runInNewContext(`${js}; run();`, {
    runtimeOptions: { sessionAffinityKey: key },
    provider: "antigravity",
    credentials: { connectionId: "failed-A" },
    getSessionAccountAffinity: local.get,
    deleteSessionAccountAffinity: local.delete,
    evictSessionAccountAffinityForConnectionAsync:
      eviction.evictSessionAccountAffinityForConnectionAsync,
  });
}
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
for (const branch of ["isAntigravityStreamReadinessFailure", "isAntigravityPreResponseTimeout"]) {
  test(`default-off parity: ${branch} retains byte-identical base pin`, async () => {
    const key = `${branch}`;
    local.upsert(key, "antigravity", "failed-A", 1_000_000, 60_000);
    const seeded = local.getSerialized(key, "antigravity");
    await run(baseBlock, key);
    const baseRow = local.getSerialized(key, "antigravity");
    assert.equal(baseRow, seeded, "base's two-argument TTL-gated read is a no-op");
    const headBlock = affinityBlock(branch);
    await run(headBlock, key);
    assert.equal(local.getSerialized(key, "antigravity"), baseRow);
    assert.equal(headBlock, baseBlock, "both drivers must retain the exact base block");
  });
}
