import { randomUUID } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, relative, resolve } from "node:path";
import { threadId } from "node:worker_threads";

const require = createRequire(import.meta.url);
const captureKey = Symbol.for("omni.common-source-coverage.capture");

function configuration() {
  const env = process.env;
  const scope = JSON.parse(readFileSync(env.OMNI_COVERAGE_SCOPE, "utf8"));
  if (
    scope.sha !== env.OMNI_COVERAGE_SHA ||
    scope.schemaVersion !== 1 ||
    !["vitest-node", "vitest-ui"].includes(env.OMNI_COVERAGE_LANE) ||
    !env.OMNI_COVERAGE_RUN_ID ||
    !env.OMNI_COVERAGE_SHARD ||
    !env.OMNI_COVERAGE_DIR ||
    !env.OMNI_COVERAGE_ROOT
  )
    throw new Error("coverage Vitest configuration mismatch");
  return {
    scope,
    directory: env.OMNI_COVERAGE_DIR,
    identity: {
      schemaVersion: 1,
      sha: scope.sha,
      scopeHash: scope.scopeHash,
      runId: env.OMNI_COVERAGE_RUN_ID,
      lane: env.OMNI_COVERAGE_LANE,
      shard: env.OMNI_COVERAGE_SHARD,
      instrumenter: `istanbul-lib-instrument@${require("istanbul-lib-instrument/package.json").version}`,
    },
  };
}

function writeEntry(directory, kind, value) {
  mkdirSync(join(directory, kind), { recursive: true });
  writeFileSync(join(directory, kind, `${value.processId}.json`), JSON.stringify(value), {
    flag: "wx",
    mode: 0o600,
  });
}

export default {
  startCoverage({ isolate }) {
    if (!isolate) throw new Error("common-source coverage requires isolated Vitest files");
    const config = configuration();
    const current = { ...config.identity, processId: `${process.pid}-${threadId}-${randomUUID()}` };
    globalThis[captureKey] = current;
    writeEntry(config.directory, "started", current);
    globalThis.__coverage__ = {};
  },
  takeCoverage() {
    const current = globalThis[captureKey];
    if (!current) throw new Error("coverage Vitest worker never started");
    const { scope } = configuration();
    const coverage = globalThis.__coverage__ || {};
    const hashes = new Map(scope.files.map((file) => [file.path, file.sourceHash]));
    const sources = Object.fromEntries(
      Object.keys(coverage).map((path) => {
        if (!hashes.has(path)) throw new Error(`coverage path outside scope: ${path}`);
        return [path, hashes.get(path)];
      })
    );
    return { ...current, sources, coverage: JSON.parse(JSON.stringify(coverage)) };
  },
  stopCoverage() {
    delete globalThis[captureKey];
  },
  getProvider() {
    let ctx;
    let failed = false;
    const pending = [];
    return {
      name: "omni-common-source-shadow",
      initialize(context) {
        ctx = context;
        configuration();
      },
      resolveOptions() {
        return ctx.config.coverage;
      },
      clean() {},
      onTestFailure() {
        failed = true;
      },
      onAfterSuiteRun({ coverage, testFiles }) {
        if (!coverage || !Array.isArray(testFiles) || !testFiles.length)
          throw new Error("coverage Vitest suite receipt missing");
        const root = resolve(process.env.OMNI_COVERAGE_ROOT);
        const entries = testFiles.map((file) => resolve(root, file));
        if (entries.some((file) => relative(root, file).startsWith("..")))
          throw new Error("coverage Vitest test entrypoint outside checkout");
        pending.push({ ...coverage, testFiles: entries });
      },
      generateCoverage() {
        failed ||=
          ctx.state.getUnhandledErrors().length > 0 ||
          ctx.state.getFiles().some((file) => file.result?.state === "fail");
        return pending;
      },
      reportCoverage(receipts) {
        const { directory } = configuration();
        for (const receipt of receipts)
          writeEntry(directory, "receipts", {
            ...receipt,
            completed: !failed,
            exitCode: failed ? 1 : 0,
          });
      },
    };
  },
};
