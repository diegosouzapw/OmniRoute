import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, renameSync, writeFileSync } from "node:fs";
import { createRequire, registerHooks } from "node:module";
import { extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { threadId } from "node:worker_threads";
import { transformSync } from "esbuild";
import { instrumentCoverageSource } from "./coverage-instrumenter.mjs";

const required = (name) => {
  if (!process.env[name]) throw new Error(`coverage capture requires ${name}`);
  return process.env[name];
};
const root = realpathSync(required("OMNI_COVERAGE_ROOT"));
const scope = JSON.parse(readFileSync(required("OMNI_COVERAGE_SCOPE"), "utf8"));
const sha = required("OMNI_COVERAGE_SHA");
const runId = required("OMNI_COVERAGE_RUN_ID");
const shard = required("OMNI_COVERAGE_SHARD");
const directory = resolve(required("OMNI_COVERAGE_DIR"));
if (
  scope.schemaVersion !== 1 ||
  scope.sha !== sha ||
  !/^[a-f0-9]{40}$/.test(sha) ||
  !/^[a-f0-9]{64}$/.test(scope.scopeHash)
)
  throw new Error("coverage capture scope mismatch");
const expected = new Map(scope.files.map((file) => [file.path, file.sourceHash]));
const sources = {};
const processId = `${process.pid}-${threadId}`;
const require = createRequire(import.meta.url);
const identity = {
  schemaVersion: 1,
  sha,
  scopeHash: scope.scopeHash,
  runId,
  lane: "node",
  shard,
  processId,
  instrumenter: `istanbul-lib-instrument@${require("istanbul-lib-instrument/package.json").version}`,
};
for (const name of ["started", "receipts"]) mkdirSync(join(directory, name), { recursive: true });
writeFileSync(
  join(directory, "started", `${processId}.json`),
  JSON.stringify({ ...identity, entryFile: process.argv[1] || null }),
  { flag: "wx", mode: 0o600 }
);

process.once("exit", (exitCode) => {
  const coverage = globalThis.__coverage__ || {};
  const receipt = { ...identity, completed: exitCode === 0, exitCode, sources, coverage };
  const target = join(directory, "receipts", `${processId}.json`);
  const temporary = `${target}.tmp`;
  try {
    writeFileSync(temporary, JSON.stringify(receipt), { flag: "wx", mode: 0o600 });
    renameSync(temporary, target);
  } catch (error) {
    console.error(`[coverage-capture] failed to flush: ${error.message}`);
    process.exitCode = 1;
  }
});

registerHooks({
  load(url, context, nextLoad) {
    const loaded = nextLoad(url, context);
    if (!url.startsWith("file:")) return loaded;
    const filename = fileURLToPath(url);
    const path = relative(root, filename).replaceAll("\\", "/");
    if (!expected.has(path)) return loaded;
    if (realpathSync(filename) !== filename) throw new Error("coverage source cannot be a symlink");
    const original = readFileSync(filename, "utf8");
    const sourceHash = createHash("sha256").update(original).digest("hex");
    if (sourceHash !== expected.get(path))
      throw new Error(`coverage source hash mismatch: ${path}`);
    const instrumented = instrumentCoverageSource(original, path);
    sources[path] = sourceHash;
    const extension = extname(path);
    const loader = [".tsx", ".jsx"].includes(extension)
      ? extension.slice(1)
      : [".ts", ".mts", ".cts"].includes(extension)
        ? "ts"
        : "js";
    const format = loaded.format?.startsWith("commonjs") ? "cjs" : "esm";
    const compiled = transformSync(instrumented.code, {
      loader,
      format,
      target: "es2022",
      sourcefile: path,
      sourcemap: "inline",
      jsx: "automatic",
    });
    return { ...loaded, source: compiled.code, shortCircuit: true };
  },
});
