import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { isDeepStrictEqual } from "node:util";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { instrumentCoverageSource } from "./coverage-instrumenter.mjs";
import { verifyCoverageScope } from "./coverage-scope.mjs";

const require = createRequire(import.meta.url);
const { createCoverageMap } = require("istanbul-lib-coverage");
const { createContext } = require("istanbul-lib-report");
const reports = require("istanbul-reports");

function evidenceError(reason) {
  throw new Error(`coverage evidence: ${reason}`);
}

function validateCompleteness(plan, receipts) {
  const lanes = new Set(["node", "vitest-node", "vitest-ui"]);
  const seenLanes = new Set();
  const expected = new Set();
  if (plan?.schemaVersion !== 1 || !Array.isArray(plan.partitions) || !plan.partitions.length)
    evidenceError("missing partition plan");
  const key = (lane, shard, processId) => JSON.stringify([lane, shard, processId]);
  const validId = (id) => typeof id === "string" && /^[a-zA-Z0-9._-]+$/.test(id);
  const partitions = new Set();
  for (const partition of plan.partitions) {
    const { lane, shard, processes } = partition;
    const partitionKey = key(lane, shard, null);
    if (
      !lanes.has(lane) ||
      !validId(shard) ||
      partitions.has(partitionKey) ||
      !Array.isArray(processes) ||
      !processes.length
    )
      evidenceError("invalid or duplicate partition");
    partitions.add(partitionKey);
    seenLanes.add(lane);
    for (const processId of processes) {
      const id = key(lane, shard, processId);
      if (!validId(processId) || expected.has(id)) evidenceError("invalid process plan");
      expected.add(id);
    }
  }
  if (seenLanes.size !== lanes.size) evidenceError("all three runner lanes are required");
  if (!Array.isArray(receipts)) evidenceError("missing process receipts");
  for (const receipt of receipts) {
    const id = key(receipt.lane, receipt.shard, receipt.processId);
    if (!expected.delete(id)) evidenceError("unexpected or duplicate process receipt");
    if (receipt.completed !== true || receipt.exitCode !== 0)
      evidenceError("process failed or did not complete");
  }
  if (expected.size) evidenceError("missing process receipt");
}

function validateCounters(actual, original) {
  for (const map of ["statementMap", "fnMap", "branchMap"])
    if (!isDeepStrictEqual(actual[map], original[map])) evidenceError("incompatible source map");
  for (const counter of ["s", "f", "b"]) {
    if (
      !actual[counter] ||
      !isDeepStrictEqual(Object.keys(actual[counter]).sort(), Object.keys(original[counter]).sort())
    )
      evidenceError("incomplete counters");
    for (const [id, count] of Object.entries(actual[counter])) {
      const values = counter === "b" ? count : [count];
      if (
        !Array.isArray(values) ||
        (counter === "b" && values.length !== original.b[id].length) ||
        !values.every((value) => Number.isSafeInteger(value) && value >= 0)
      )
        evidenceError("invalid counters");
    }
  }
}

function originalMaps(root, scope, onProgress) {
  const output = execFileSync("git", ["-C", root, "cat-file", "--batch"], {
    input: scope.files.map((file) => `${file.blob}\n`).join(""),
    maxBuffer: 256 * 1024 * 1024,
  });
  let offset = 0;
  return scope.files.map((file, index) => {
    const end = output.indexOf(10, offset);
    const header = output.subarray(offset, end).toString("utf8");
    if (header !== `${file.blob} blob ${file.bytes}`) throw new Error("source blob mismatch");
    offset = end + 1;
    const source = output.subarray(offset, offset + file.bytes).toString("utf8");
    offset += file.bytes + 1;
    const result = instrumentCoverageSource(source, file.path);
    onProgress({ path: file.path, count: index + 1, total: scope.files.length });
    return { coverage: result.coverage, identity: result.identity };
  });
}

export function createCoverageDenominator(root, sha, scope, { onProgress = () => {} } = {}) {
  verifyCoverageScope(scope, root, sha);
  return originalMaps(root, scope, onProgress);
}

/** Compose only common-original-source counters; never average runner percentages. */
export function mergeCoverageEvidence({ root, sha, scope, plan, receipts }) {
  validateCompleteness(plan, receipts);
  if (
    plan.sha !== sha ||
    plan.scopeHash !== scope.scopeHash ||
    typeof plan.runId !== "string" ||
    !plan.runId.trim()
  )
    evidenceError("invalid plan identity");
  const coverage = createCoverageMap({});
  const maps = createCoverageDenominator(root, sha, scope);
  for (const result of maps) coverage.addFileCoverage(result.coverage);
  const originals = new Map(maps.map((result) => [result.coverage.path, result.coverage]));
  const hashes = new Map(scope.files.map((file) => [file.path, file.sourceHash]));
  for (const receipt of receipts) {
    if (
      receipt.schemaVersion !== 1 ||
      receipt.sha !== sha ||
      receipt.scopeHash !== scope.scopeHash ||
      receipt.runId !== plan.runId ||
      receipt.instrumenter !== maps[0].identity.instrumenter
    )
      evidenceError("process identity mismatch");
    if (
      !receipt.coverage ||
      typeof receipt.coverage !== "object" ||
      Array.isArray(receipt.coverage)
    )
      evidenceError("missing coverage counters");
    if (
      !receipt.sources ||
      !isDeepStrictEqual(Object.keys(receipt.sources).sort(), Object.keys(receipt.coverage).sort())
    )
      evidenceError("missing source identities");
    for (const [path, actual] of Object.entries(receipt.coverage)) {
      if (!originals.has(path) || !actual || actual.path !== path)
        evidenceError("coverage path outside original scope");
      if (receipt.sources[path] !== hashes.get(path)) evidenceError("source hash mismatch");
      validateCounters(actual, originals.get(path));
    }
    coverage.merge(receipt.coverage);
    for (const path of Object.keys(receipt.coverage))
      validateCounters(coverage.fileCoverageFor(path).toJSON(), originals.get(path));
  }
  const summary = { total: coverage.getCoverageSummary().toJSON() };
  for (const path of coverage.files())
    summary[path] = coverage.fileCoverageFor(path).toSummary().toJSON();
  return {
    schemaVersion: 1,
    sha,
    scopeHash: scope.scopeHash,
    runId: plan.runId,
    partitions: structuredClone(plan.partitions),
    completeness: "declared-process-plan",
    coverage: Object.fromEntries(
      coverage.files().map((path) => [path, coverage.fileCoverageFor(path).toJSON()])
    ),
    summary,
    complete: true,
    releaseAcceptance: false,
  };
}

/** Shadow output only. Fixed absolute floors do not replace the existing ratchet. */
export function writeCoverageReports(result, directory) {
  if (result.complete !== true) evidenceError("cannot report incomplete coverage");
  mkdirSync(directory, { recursive: true });
  writeFileSync(join(directory, "coverage-final.json"), JSON.stringify(result.coverage, null, 2));
  writeFileSync(join(directory, "coverage-summary.json"), JSON.stringify(result.summary, null, 2));
  const context = createContext({
    dir: directory,
    coverageMap: createCoverageMap(result.coverage),
  });
  reports.create("lcovonly").execute(context);
  const floors = { statements: 60, lines: 60, functions: 60, branches: 60 };
  const floorVerdict = Object.entries(floors).every(
    ([metric, floor]) => result.summary.total[metric].pct >= floor
  )
    ? "PASS"
    : "FAIL";
  const verdict = {
    schemaVersion: 1,
    sha: result.sha,
    scopeHash: result.scopeHash,
    runId: result.runId,
    partitions: result.partitions,
    completeness: result.completeness,
    complete: true,
    floors,
    floorVerdict,
    releaseAcceptance: false,
  };
  writeFileSync(join(directory, "coverage-evidence.json"), JSON.stringify(verdict, null, 2));
  return verdict;
}

function main() {
  const flags = new Set(["--root", "--sha", "--scope", "--plan", "--receipts", "--out"]);
  const options = {};
  const args = process.argv.slice(2);
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    if (
      !flags.has(key) ||
      Object.hasOwn(options, key) ||
      !args[index + 1] ||
      args[index + 1].startsWith("--")
    )
      evidenceError("invalid arguments");
    options[key] = args[index + 1];
  }
  for (const key of ["--sha", "--scope", "--plan", "--receipts", "--out"])
    if (!options[key]) evidenceError(`missing ${key}`);
  const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
  const receipts = readdirSync(options["--receipts"], { withFileTypes: true })
    .filter((entry) => entry.name.endsWith(".json"))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      if (!entry.isFile()) evidenceError("receipt must be a regular file");
      return readJson(join(options["--receipts"], entry.name));
    });
  const result = mergeCoverageEvidence({
    root: resolve(options["--root"] || process.cwd()),
    sha: options["--sha"],
    scope: readJson(options["--scope"]),
    plan: readJson(options["--plan"]),
    receipts,
  });
  const verdict = writeCoverageReports(result, resolve(options["--out"]));
  console.log(JSON.stringify(verdict));
  if (verdict.floorVerdict !== "PASS") process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    main();
  } catch (error) {
    console.error(`[coverage-union] ${error.message}`);
    process.exitCode = 1;
  }
}
