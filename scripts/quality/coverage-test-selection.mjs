#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { matchesGlob, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import ts from "typescript";
import { load } from "js-yaml";
import { parseVitestExcludes } from "./quarantine-contract.mjs";

const POLICY_PATH = "config/quality/coverage-test-selection.json";
const REQUIRED = new Map([
  ["node-main", ["node", 8]],
  ["node-dashboard", ["node", 8]],
  ["node-serial", ["node", 8]],
  ["vitest-node", ["vitest-node", 1]],
  ["vitest-ui", ["vitest-ui", 1]],
]);
const fail = (message) => {
  throw new Error(`coverage selection: ${message}`);
};
const hash = (input) => createHash("sha256").update(input).digest("hex");
const git = (root, ...args) =>
  execFileSync("git", ["-C", root, ...args], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
    stdio: ["pipe", "pipe", "pipe"],
  });
function canonical(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !posix.isAbsolute(value) &&
    !value.startsWith("../") &&
    posix.normalize(value) === value &&
    !/[\\\x00-\x1f?:]/.test(value)
  );
}
function validatePolicy(policy) {
  if (
    policy?.schemaVersion !== 1 ||
    policy.policyVersion !== "coverage-test-selection/1" ||
    policy.profile !== "ci-coverage-shadow" ||
    !Array.isArray(policy.partitions) ||
    policy.partitions.length !== REQUIRED.size
  )
    fail("required partition policy");
  const seen = new Set();
  for (const part of policy.partitions) {
    const required = REQUIRED.get(part.id);
    if (!required || seen.has(part.id) || part.lane !== required[0] || part.shards !== required[1])
      fail("required partition policy");
    seen.add(part.id);
    if (
      !Array.isArray(part.include) ||
      !part.include.length ||
      !Array.isArray(part.exclude) ||
      ![...part.include, ...part.exclude].every(canonical)
    )
      fail("invalid selection patterns");
  }
}

function vitestIncludes(source) {
  const file = ts.createSourceFile(
    "vitest.config.ts",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  if (file.parseDiagnostics.length) fail("invalid Vitest configuration syntax");
  const arrays = [];
  function visit(node) {
    if (ts.isPropertyAssignment(node) && node.name.getText(file) === "include") {
      if (
        !ts.isArrayLiteralExpression(node.initializer) ||
        !node.initializer.elements.every(ts.isStringLiteral)
      )
        fail("Vitest include must be a literal string array");
      arrays.push(node.initializer.elements.map((item) => item.text));
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  if (arrays.length !== 1) fail("expected exactly one Vitest include array");
  return arrays[0];
}

function verifyRunnerPolicy(root, sha, policy) {
  const manifest = JSON.parse(git(root, "show", `${sha}:package.json`));
  const ci = load(git(root, "show", `${sha}:.github/workflows/ci.yml`));
  if (
    !isDeepStrictEqual(ci?.jobs?.["test-unit"]?.strategy?.matrix?.shard, [1, 2, 3, 4, 5, 6, 7, 8])
  )
    fail("CI shard matrix policy drift");
  if (
    manifest.scripts?.["test:vitest"] !== "vitest run --config vitest.mcp.config.ts" ||
    manifest.scripts?.["test:vitest:ui"] !== "vitest run --config vitest.config.ts"
  )
    fail("Vitest entrypoint policy drift");
  const command = manifest.scripts?.["test:unit:ci:shard"];
  if (typeof command !== "string") fail("missing Node CI runner");
  const segments = command.split(/\s+&&\s+/);
  const nodePolicies = policy.partitions.filter((part) => part.lane === "node");
  if (segments.length !== nodePolicies.length) fail("Node segment policy drift");
  for (let index = 0; index < segments.length; index += 1) {
    const tokens = segments[index].match(/"[^"\n]*"|'[^'\n]*'|[^\s]+/g) || [];
    const patterns = tokens
      .map((token) => token.replace(/^(?:"(.*)"|'(.*)')$/, "$1$2"))
      .filter((token) => token.startsWith("tests/unit/") && /\.test\.(?:ts|mjs)$/.test(token));
    if (
      !segments[index].includes("--test-shard=$TEST_SHARD") ||
      !isDeepStrictEqual(patterns, nodePolicies[index].include)
    )
      fail("Node selector policy drift");
  }
  for (const [id, config] of [
    ["vitest-node", "vitest.mcp.config.ts"],
    ["vitest-ui", "vitest.config.ts"],
  ]) {
    const specification = policy.partitions.find((part) => part.id === id);
    const source = git(root, "show", `${sha}:${config}`);
    if (
      !isDeepStrictEqual(vitestIncludes(source), specification.include) ||
      !isDeepStrictEqual(parseVitestExcludes(source), specification.exclude)
    )
      fail("Vitest selector policy drift");
  }
}

/** Independent, immutable policy selection: never derive this plan from observed coverage/PIDs.
 * Shards use explicit file lists. This does NOT assert parity with Node's native --test-shard.
 * The current CI still uses its existing runners until separate shadow/wiring acceptance.
 */
export function createCoverageTestPlan(root, sha) {
  if (
    typeof sha !== "string" ||
    !/^[a-f0-9]{40}$/.test(sha) ||
    git(root, "rev-parse", "--verify", `${sha}^{commit}`).trim() !== sha
  )
    fail("exact commit SHA required");
  const policyBytes = git(root, "show", `${sha}:${POLICY_PATH}`);
  const policy = JSON.parse(policyBytes);
  validatePolicy(policy);
  verifyRunnerPolicy(root, sha, policy);
  const tracked = git(root, "ls-tree", "-rz", "--full-tree", sha)
    .split("\0")
    .filter(Boolean)
    .map((entry) => {
      const tab = entry.indexOf("\t");
      const match = entry.slice(0, tab).match(/^(\d{6}) (blob|commit) ([a-f0-9]{40})$/);
      const path = entry.slice(tab + 1);
      if (!match || tab < 0 || !canonical(path)) fail("invalid tracked path");
      return { path, mode: match[1], type: match[2], blob: match[3] };
    });
  const partitions = [];
  for (const specification of policy.partitions) {
    const selected = tracked
      .filter(
        (entry) =>
          specification.include.some((pattern) => matchesGlob(entry.path, pattern)) &&
          !specification.exclude.some((pattern) => matchesGlob(entry.path, pattern))
      )
      .sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
    if (!selected.length) fail(`empty required segment: ${specification.id}`);
    if (
      selected.some((entry) => entry.type !== "blob" || !["100644", "100755"].includes(entry.mode))
    )
      fail("selected test must be a regular tracked file");
    for (let index = 0; index < specification.shards; index += 1) {
      const entries = selected.filter((_, position) => position % specification.shards === index);
      partitions.push({
        id: `${specification.id}/${index + 1}-of-${specification.shards}`,
        lane: specification.lane,
        segment: specification.id,
        shard: `${index + 1}/${specification.shards}`,
        files: entries.map((entry) => entry.path),
        blobs: entries.map((entry) => entry.blob),
      });
    }
  }
  const identity = {
    schemaVersion: 1,
    sha,
    tree: git(root, "rev-parse", `${sha}^{tree}`).trim(),
    policyVersion: policy.policyVersion,
    profile: policy.profile,
    policyHash: hash(policyBytes),
    shardAssignment: "explicit-files-round-robin/v1",
    partitions,
  };
  return { ...identity, selectionHash: hash(JSON.stringify(identity)), releaseAcceptance: false };
}

/** Adapter boundary: reject a self-reduced plan and any missing/extra/duplicate selected file. */
export function verifyCoverageTestSelection(root, sha, plan, partitionId, files) {
  if (!isDeepStrictEqual(plan, createCoverageTestPlan(root, sha))) fail("frozen plan mismatch");
  const partition = plan.partitions.find((part) => part.id === partitionId);
  if (
    !partition ||
    !Array.isArray(files) ||
    !files.every(canonical) ||
    new Set(files).size !== files.length ||
    !isDeepStrictEqual([...files].sort(), [...partition.files].sort())
  )
    fail("partition test files mismatch");
  return true;
}

function main(args) {
  const options = {};
  for (let index = 0; index < args.length; index += 2) {
    const key = args[index];
    if (
      !["--root", "--sha", "--out"].includes(key) ||
      options[key] ||
      !args[index + 1] ||
      args[index + 1].startsWith("--")
    )
      fail("invalid CLI arguments");
    options[key] = args[index + 1];
  }
  if (!options["--sha"] || !options["--out"]) fail("--sha and --out are required");
  const plan = createCoverageTestPlan(resolve(options["--root"] || "."), options["--sha"]);
  writeFileSync(options["--out"], JSON.stringify(plan, null, 2) + "\n", {
    flag: "wx",
    mode: 0o600,
  });
  console.log(
    JSON.stringify({
      sha: plan.sha,
      selectionHash: plan.selectionHash,
      partitions: plan.partitions.length,
      plannedTestExecutions: plan.partitions.reduce((sum, part) => sum + part.files.length, 0),
      releaseAcceptance: false,
    })
  );
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
