import test from "node:test";
import assert from "node:assert/strict";

const fs = await import("node:fs");
const path = await import("node:path");

const servePath = path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs");
const serveSource = fs.readFileSync(servePath, "utf-8");

test("serve startup time uses monotonic performance.now()", () => {
  assert.match(serveSource, /performance\.now\(\)/);
  assert.match(serveSource, /typeof startedAt === "number"/);
});

test("serve startup banner includes started in elapsed time", () => {
  assert.match(serveSource, /started in/);
});

test("serve daemon mode does not accept startedAt", () => {
  assert.match(
    serveSource,
    /function\s+runDaemon\s*\(\s*serverJs\s*,\s*env\s*,\s*memoryLimit\s*,\s*dashboardPort\s*,\s*apiPort\s*\)/
  );
  assert.ok(
    !/function\s+runDaemon\s*\(\s*serverJs\s*,\s*env\s*,\s*memoryLimit\s*,\s*dashboardPort\s*,\s*apiPort\s*,\s*startedAt\s*\)/.test(
      serveSource
    )
  );
});

test("serve runWithSupervisor uses startedAt before defaulted useTray", () => {
  const signatureRegex =
    /async\s+function\s+runWithSupervisor\s*\([\s\S]*?startedAt\s*,\s*useTray\s*=\s*false\s*\)/;
  assert.match(
    serveSource,
    signatureRegex,
    "runWithSupervisor should declare startedAt before the defaulted useTray parameter"
  );

  const callRegex = /runWithSupervisor\s*\([\s\S]*?startedAt\s*,\s*useTray\s*\)/;
  assert.match(
    serveSource,
    callRegex,
    "runWithSupervisor should be called with startedAt before useTray"
  );
});
