import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-completion-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const local = await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const identity = await import("../../src/lib/db/sessionAffinity/accountIdentity.ts");
const pin = await import("../../src/sse/services/sessionAffinityPin.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

// The base contract is encoded in the markers below, not loaded from a historical SHA.
// compileFunction uses this realm's Promise jobs, unlike runInNewContext.
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
const dependencies = {
  ...local,
  ...identity,
  getSessionAffinityStore: () => local.sqliteSessionAffinityStore,
  touchConnectionLastUsed: async () => {}, // immediately resolved, no hidden I/O/await
  log: { info: () => {} },
};
const selectors = vm.compileFunction(
  js + "; return { selectSessionAffinityConnection, planSessionAffinityConnection };",
  Object.keys(dependencies)
)(...Object.values(dependencies)) as Pick<
  typeof pin,
  "selectSessionAffinityConnection" | "planSessionAffinityConnection"
>;

async function trace(start: () => Promise<unknown>) {
  const events: string[] = [];
  const pending = start();
  pending.then(() => events.push("settled"));
  queueMicrotask(() => {
    events.push("tick-1");
    queueMicrotask(() => events.push("tick-2"));
  });
  await pending;
  await new Promise((resolve) => setImmediate(resolve));
  return events;
}
for (const initial of ["miss", "reuse", "obsolete"] as const) {
  for (const mode of ["select", "lease-commit", "auth-await-commit"] as const) {
    test(`default ${mode} ${initial}: completion has exactly the base microtask trace`, async () => {
      const key = `synthetic-${mode}-${initial}`;
      if (initial !== "miss")
        local.upsertSessionAccountAffinity(
          key,
          "glm",
          initial === "reuse" ? "A" : "old",
          Date.now(),
          60_000
        );
      const start = () => {
        if (mode === "select")
          return selectors.selectSessionAffinityConnection("glm", key, [{ id: "A" }], 60_000);
        const plan = selectors.planSessionAffinityConnection("glm", key, [{ id: "A" }], 60_000)!;
        if (mode === "lease-commit") return plan.commit();
        // auth.ts already awaited this callback on base; only that existing layer is allowed.
        return (async () => {
          await plan.commit();
        })();
      };
      assert.deepEqual(
        await trace(start),
        mode === "auth-await-commit"
          ? ["tick-1", "tick-2", "settled"]
          : ["tick-1", "settled", "tick-2"]
      );
    });
  }
}

test("real default selector also settles before the second marker", async () => {
  assert.deepEqual(
    await trace(() =>
      pin.selectSessionAffinityConnection(
        "glm",
        "synthetic-real-trace",
        [{ id: "missing-synthetic-connection" }],
        60_000
      )
    ),
    ["tick-1", "settled", "tick-2"]
  );
});
