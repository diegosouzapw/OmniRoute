import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-affinity-logs-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const sqlite = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
const abortReasons = await import("../../open-sse/services/combo/comboAbortReasons.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// Run HEAD's actual declarations with a recording logger, not a rewritten selector.
const text = fs.readFileSync(
  new URL("../../src/sse/services/sessionAffinityPin.ts", import.meta.url),
  "utf8"
);
const ast = ts.createSourceFile("pin.ts", text, ts.ScriptTarget.Latest, true);
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
const compiled = ts.transpileModule(bodies, {
  compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
}).outputText;

for (const initial of ["miss", "reuse", "obsolete"] as const) {
  test(`SQLite ${initial}: original affinity messages and mutation/log order`, async () => {
    const key = `synthetic-log-${initial}`;
    const trace: string[] = [];
    const store = sqlite.sqliteSessionAffinityStore;
    if (initial !== "miss")
      sqlite.upsertSessionAccountAffinity(
        key,
        "glm",
        initial === "reuse" ? "A" : "old",
        Date.now(),
        60_000
      );
    const select = vm.runInNewContext(compiled + "\nselectSessionAffinityConnection;", {
      ...sqlite,
      ...identity,
      Promise,
      Date,
      getSessionAffinityStore: () => ({
        ...store,
        touch: (...args: Parameters<typeof store.touch>) => {
          trace.push("touch");
          return store.touch(...args);
        },
        delete: (...args: Parameters<typeof store.delete>) => {
          trace.push("delete");
          return store.delete(...args);
        },
        upsert: (...args: Parameters<typeof store.upsert>) => {
          trace.push("upsert");
          return store.upsert(...args);
        },
      }),
      touchConnectionLastUsed: async () => {
        trace.push("usage");
      },
      log: { info: (_tag: string, message: string) => trace.push(message) },
    }) as typeof pin.selectSessionAffinityConnection;
    const pending = select("glm", key, [{ id: "A" }], 60_000);
    const label = pin.formatSessionKeyForLog(key);
    const beforeYield =
      initial === "reuse"
        ? ["touch", "usage"]
        : [
            ...(initial === "obsolete"
              ? ["delete", `affinity cleared for session_key=${label} provider=glm`]
              : []),
            "upsert",
            "usage",
          ];
    const immediate = [...trace];
    await pending;
    assert.deepEqual(immediate, beforeYield);
    assert.deepEqual(trace, [
      ...beforeYield,
      initial === "reuse"
        ? `session_key=${label} -> connection A (affinity)`
        : `new affinity created for session_key=${label} -> connection A`,
    ]);
  });
}

test("request eviction returns a synchronous SQLite result", () => {
  sqlite.upsertSessionAccountAffinity("synthetic-request", "glm", "A", Date.now(), 60_000);
  assert.equal(
    affinity.evictSessionAccountAffinityForConnectionAsync("synthetic-request", "glm", "A"),
    true
  );
});

test("combo timeout helper returns the legacy SQLite result synchronously", () => {
  const controller = new AbortController();
  controller.abort(new Error(abortReasons.COMBO_PER_MODEL_TIMEOUT_REASON));
  sqlite.upsertSessionAccountAffinity("synthetic-combo", "glm", "A", Date.now(), 60_000);
  assert.equal(
    pin.evictSessionAffinityOnComboTimeoutAsync({
      sessionKey: "synthetic-combo",
      provider: "glm",
      connectionId: "A",
      modelAbortSignal: controller.signal,
    }),
    true
  );
  assert.equal(sqlite.getSessionAccountAffinity("synthetic-combo", "glm", 60_000), null);
});
