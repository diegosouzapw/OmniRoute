import test from "node:test";
import assert from "node:assert/strict";

const fs = await import("node:fs");
const path = await import("node:path");

const servePath = path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs");
const serveSource = fs.readFileSync(servePath, "utf-8");

test("serve startup time uses monotonic performance.now()", () => {
  assert.match(serveSource, /const startedAt = performance\.now\(\);/);
  assert.match(
    serveSource,
    /const elapsed = \(\(performance\.now\(\) - startedAt\) \/ 1000\)\.toFixed\(1\);/
  );
});

test("serve startup banner includes started in elapsed time", () => {
  assert.match(serveSource, /\(started in \$\{elapsed\}s\)/);
});

test("serve daemon mode does not accept startedAt", () => {
  assert.match(
    serveSource,
    /function runDaemon\(serverJs, env, memoryLimit, dashboardPort, apiPort\)/
  );
  assert.ok(
    !/function runDaemon\(serverJs, env, memoryLimit, dashboardPort, apiPort, startedAt\)/.test(
      serveSource
    )
  );
});

test("serve runWithSupervisor uses startedAt before defaulted useTray", () => {
  assert.ok(
    serveSource.includes(
      "async function runWithSupervisor(\n  serverJs,\n  env,\n  memoryLimit,\n  dashboardPort,\n  apiPort,\n  noOpen,\n  showLog,\n  maxRestarts,\n  startedAt,\n  useTray = false\n)"
    ),
    "runWithSupervisor should declare startedAt before the defaulted useTray parameter"
  );
  assert.ok(
    serveSource.includes(
      "return runWithSupervisor(\n    serverJs,\n    env,\n    memoryLimit,\n    dashboardPort,\n    apiPort,\n    noOpen,\n    opts.log === true,\n    opts.maxRestarts ?? 2,\n    startedAt,\n    useTray\n  );"
    ),
    "runWithSupervisor should be called with startedAt before useTray"
  );
});
