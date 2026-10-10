/**
 * #6700 — Dokploy (and some other self-hosted) Docker builds ended up with a
 * broken/mismatched better-sqlite3 native binding under npm 11. The `builder`
 * stage installed dependencies with `npm ci --ignore-scripts` (deliberate — it
 * closes the supply-chain surface where a transitive dep's install script runs
 * arbitrary code) and then re-enabled the native build for the one package that
 * needs it via `npm rebuild better-sqlite3`. `npm rebuild` re-runs the package's
 * own install script indirectly, which depends on npm's script-allowlist
 * machinery correctly re-enabling that single package's script — some
 * self-hosted build environments hit a broken build via that indirection.
 *
 * Fix: invoke `node-gyp rebuild` directly inside `node_modules/better-sqlite3`,
 * bypassing npm's script-running layer entirely, so the compile step is
 * deterministic regardless of npm version or ignore-scripts allowlist behavior.
 *
 * This guards the mechanism (the direct node-gyp invocation replaces the
 * `npm rebuild` indirection, and a smoke-load still follows it); the end-to-end
 * "the Dokploy build now produces a working binding" proof is a successful
 * `docker build` in that environment (tracked as a live-validation follow-up —
 * this fixture records shell boundaries without running a Docker build).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dockerfile = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf8");
const gyp = "/usr/local/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js";
const sqliteSmoke = "require('better-sqlite3')(':memory:').close()";
const transportSmoke =
  "const wreq=require('wreq-js'); if(typeof wreq.createTransport!=='function') process.exit(1)";
const shellOptions = {
  skip:
    process.platform === "win32"
      ? "requires a POSIX shell; no shell is installed by this test"
      : false,
};

type Invocation = { command: string; args: string[]; cwd: string; mirror: string };

/** Fold Docker continuations, never unrelated RUN instructions or comment lines. */
function instructions(source: string): string[] {
  const result: string[] = [];
  let pending = "";
  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const continued = trimmed.endsWith("\\");
    pending += (continued ? trimmed.slice(0, -1) : trimmed) + " ";
    if (!continued) {
      result.push(pending.trim());
      pending = "";
    }
  }
  assert.equal(pending, "", "unterminated Docker instruction");
  return result;
}

function builderInstallRun(source: string): string {
  const all = instructions(source);
  const start = all.findIndex((line) => {
    const words = line.toUpperCase().split(/\s{1,100}/);
    return words[0] === "FROM" && words.slice(-2).join(" ") === "AS BUILDER";
  });
  assert.ok(start >= 0, "Dockerfile must declare a builder stage");
  const later = all.slice(start + 1);
  const next = later.findIndex((line) => line.toUpperCase().startsWith("FROM "));
  const stage = next < 0 ? later : later.slice(0, next);
  const runs = stage.filter((line) => line.startsWith("RUN ") && line.includes("npm ci "));
  assert.equal(runs.length, 1, "one builder install RUN is required");
  let command = runs[0].slice(4).trimStart();
  while (command.startsWith("--mount=")) {
    const end = command.indexOf(" ");
    assert.ok(end > 0, "mount must be followed by a command");
    command = command.slice(end).trimStart();
  }
  return command;
}

/** Only the four expected boundaries can run; there is no real npm/node fallback. */
function writeBoundaryStub(bin: string) {
  const source = `#!${process.execPath}
const fs = require("node:fs"), path = require("node:path"), assert = require("node:assert/strict");
const command = path.basename(process.argv[1]), args = process.argv.slice(2), root = process.env.PROBE_ROOT;
const events = fs.existsSync(process.env.PROBE_LOG) ? fs.readFileSync(process.env.PROBE_LOG, "utf8").trim().split("\\n").filter(Boolean) : [];
if (command === "npm") {
  assert.deepEqual(args, ["ci", "--include=optional", "--no-audit", "--no-fund", "--legacy-peer-deps", "--ignore-scripts"]);
  assert.equal(events.length, 0); assert.equal(process.cwd(), root);
} else if (args[0] === process.env.PROBE_GYP) {
  assert.deepEqual(args, [process.env.PROBE_GYP, "rebuild", "--force_build=1"]);
  assert.equal(events.length, 1); assert.equal(process.cwd(), path.join(root, "node_modules/better-sqlite3"));
  fs.mkdirSync("build/Release", { recursive: true }); fs.writeFileSync("build/Release/better_sqlite3.node", "synthetic marker, not an addon");
} else {
  const expected = events.length === 2 ? process.env.PROBE_SQLITE_SMOKE : process.env.PROBE_TRANSPORT_SMOKE;
  assert.ok(events.length === 2 || events.length === 3); assert.deepEqual(args, ["-e", expected]);
  assert.equal(process.cwd(), root); assert.ok(fs.existsSync("node_modules/better-sqlite3/build/Release/better_sqlite3.node"));
}
fs.appendFileSync(process.env.PROBE_LOG, JSON.stringify({ command, args, cwd: process.cwd(), mirror: process.env.NODEJS_ORG_MIRROR || "" }) + "\\n");
`;
  for (const command of ["npm", "node"])
    fs.writeFileSync(path.join(bin, command), source, { mode: 0o700 });
}

function executeInstall(command: string, mirror = ""): Invocation[] {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "docker-gyp-6700-"));
  try {
    const bin = path.join(root, "bin");
    fs.mkdirSync(bin);
    fs.mkdirSync(path.join(root, "node_modules/better-sqlite3"), { recursive: true });
    writeBoundaryStub(bin);
    const log = path.join(root, "invocations.jsonl");
    const env: NodeJS.ProcessEnv = {
      ...process.env,
      PATH: bin,
      NODE_DIST_URL: mirror,
      PROBE_ROOT: root,
      PROBE_LOG: log,
      PROBE_GYP: gyp,
      PROBE_SQLITE_SMOKE: sqliteSmoke,
      PROBE_TRANSPORT_SMOKE: transportSmoke,
    };
    delete env.NODEJS_ORG_MIRROR;
    const child = spawnSync("/bin/sh", ["-eu", "-c", command], {
      cwd: root,
      env,
      encoding: "utf8",
      timeout: 10000,
    });
    assert.equal(child.error, undefined);
    assert.equal(child.status, 0, child.stderr.slice(-2000));
    const calls = fs
      .readFileSync(log, "utf8")
      .trim()
      .split("\n")
      .map((line) => JSON.parse(line) as Invocation);
    assert.equal(calls.length, 4, "install, rebuild and both smoke checks must execute");
    assert.equal(calls[1].mirror, mirror, "the rebuild inherits the requested Node mirror");
    assert.equal(calls[2].mirror, "", "the subshell must not change the outer environment");
    return calls;
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

test(
  "#6700 builder stage compiles better-sqlite3 via a direct node-gyp rebuild, not `npm rebuild`",
  shellOptions,
  () => {
    const calls = executeInstall(builderInstallRun(dockerfile));
    assert.deepEqual(calls[1].args, [gyp, "rebuild", "--force_build=1"]);
    assert.ok(calls[1].cwd.endsWith("/node_modules/better-sqlite3"));
    assert.equal(
      calls.some((call) => call.command === "npm" && call.args[0] === "rebuild"),
      false
    );
  }
);

test(
  "#6700 the better-sqlite3 rebuild happens after `npm ci --ignore-scripts` and before the smoke-load",
  shellOptions,
  () => {
    const calls = executeInstall(builderInstallRun(dockerfile), "https://headers.invalid/node");
    assert.deepEqual(
      calls.map((call) => call.args[0]),
      ["ci", gyp, "-e", "-e"]
    );
    assert.ok(calls[0].args.includes("--ignore-scripts"));
    assert.equal(calls[2].args[1], sqliteSmoke);
  }
);

const invalidRuns: [string, string, string][] = [
  ["wrong working directory", "cd node_modules/better-sqlite3", "cd node_modules"],
  ["npm rebuild indirection", `node ${gyp} rebuild --force_build=1`, "npm rebuild better-sqlite3"],
  ["npx download indirection", `node ${gyp} rebuild --force_build=1`, "npx --yes node-gyp rebuild"],
  ["install scripts enabled", " --ignore-scripts", ""],
  ["smoke before rebuild", `node ${gyp} rebuild --force_build=1`, `node -e "${sqliteSmoke}"`],
  ["missing mirror export", "export NODEJS_ORG_MIRROR=", "NODEJS_ORG_MIRROR="],
];
for (const [name, before, after] of invalidRuns) {
  test(`#6700 rejects ${name}`, shellOptions, () => {
    const command = builderInstallRun(dockerfile);
    assert.ok(command.includes(before), "mutation must target an existing boundary");
    assert.throws(() =>
      executeInstall(command.replace(before, after), "https://headers.invalid/node")
    );
  });
}

test("#6700 comments cannot supply the required install instruction", () => {
  assert.throws(() => builderInstallRun("RUN echo AS builder\nRUN npm ci --ignore-scripts"));
  assert.throws(() =>
    builderInstallRun("FROM node AS builder\n# RUN npm ci --ignore-scripts\nFROM node AS runner")
  );
});

test("#6700 cd in a different RUN cannot authorize the rebuild", shellOptions, () => {
  const command = builderInstallRun(dockerfile);
  const changed = command.replace("cd node_modules/better-sqlite3", "true");
  const source = `FROM node AS builder\nRUN cd node_modules/better-sqlite3\nRUN ${changed}\nFROM node AS runner`;
  assert.throws(() => executeInstall(builderInstallRun(source)));
});
