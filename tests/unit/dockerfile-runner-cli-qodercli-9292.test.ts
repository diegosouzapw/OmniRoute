/**
 * #9292 / #14901 — the `runner-cli` image must ship the `qodercli` binary.
 *
 * The Qoder PAT (`pt-*`) path is served entirely by spawning the local `qodercli`
 * (open-sse/services/qoderCli.ts). In the published image the binary was missing,
 * so every PAT login failed with `spawn qodercli ENOENT`, which the executor maps
 * to the `cli_not_found` envelope.
 *
 * This suite is the static/hermetic replacement for a `docker build`:
 *   - it PARSES the Dockerfile (runner-cli stage) and guards the mechanism: the
 *     exact-pinned install, root-only install layer, stage isolation;
 *   - it ties the Dockerfile to the names the application looks for
 *     (`qodercli` on PATH, `CLI_QODER_BIN`, `cli_not_found`);
 *   - it exercises the application's own resolution against a stub on PATH to
 *     show the image-with-binary / image-without-binary behaviours;
 *   - it keeps `tests/security/test-cli-runtime.sh` (the docker-based suite)
 *     covering qodercli for both stages.
 *
 * What it CANNOT prove (residual risk, deliberately not faked): that
 * `npm install -g @qoder-ai/qodercli@1.1.63` succeeds inside the image (registry
 * auth, network, postinstall), that the tarball still exposes a `qodercli` bin,
 * and that the binary starts on node:26-trixie-slim. Only a real
 * `docker build --target runner-cli` + `qodercli --version` can disprove those.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { QoderExecutor } from "../../open-sse/executors/qoder.ts";
import {
  __clearQoderCliInvocationCache,
  getQoderCliCommand,
} from "../../open-sse/services/qoderCliResolve.ts";
import {
  CLI_TOOL_IDS,
  getCliToolCommandCandidates,
  getKnownToolPaths,
} from "../../src/shared/services/cliRuntime.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dockerfile = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf-8");
const runtimeScript = fs.readFileSync(
  path.join(repoRoot, "tests", "security", "test-cli-runtime.sh"),
  "utf-8"
);

const QODER_PACKAGE = "@qoder-ai/qodercli";
const QODER_PIN = "1.1.63";

// ─── Dockerfile parsing ──────────────────────────────────────────────────────

type Stage = { name: string; base: string; instructions: string[] };

/** Split the Dockerfile into stages; continuations joined, comments dropped. */
function parseStages(source: string): Stage[] {
  const lines = source
    .replace(/\\\r?\n\s*/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  const stages: Stage[] = [];
  for (const line of lines) {
    const from = /^FROM\s+(\S+)(?:\s+AS\s+(\S+))?/i.exec(line);
    if (from) {
      stages.push({ name: from[2] ?? `stage${stages.length}`, base: from[1], instructions: [] });
    } else if (stages.length > 0) {
      stages[stages.length - 1].instructions.push(line);
    }
  }
  return stages;
}

const stages = parseStages(dockerfile);
const stage = (name: string): Stage => {
  const found = stages.find((s) => s.name === name);
  assert.ok(found, `Dockerfile has no "${name}" stage`);
  return found;
};

/** `npm install -g …` RUN instructions in a stage → their package specs. */
function globalNpmInstalls(s: Stage): string[][] {
  return s.instructions
    .filter((i) => /^RUN\b/.test(i) && /\bnpm install\b[^&|;]*\s-g\b/.test(i))
    .map((i) => {
      const afterInstall = i.slice(i.search(/\bnpm install\b/));
      return afterInstall.split(/\s+/).filter((tok) => /^(@[\w.-]+\/)?[\w.-]+@\S+$/.test(tok));
    });
}

/** Split `name@version` / `@scope/name@version` at the last `@`. */
function splitSpec(spec: string): { name: string; version: string } {
  const at = spec.lastIndexOf("@");
  return { name: spec.slice(0, at), version: spec.slice(at + 1) };
}

// ─── Dockerfile: the install itself ──────────────────────────────────────────

test("#9292: the Dockerfile still has runner-base / runner-web / runner-cli stages", () => {
  assert.deepEqual(
    stages.map((s) => s.name).filter((n) => n.startsWith("runner")),
    ["runner-base", "runner-web", "runner-cli"]
  );
  assert.equal(stage("runner-cli").base, "runner-base");
});

test("#9292: runner-cli installs @qoder-ai/qodercli at the exact pinned version", () => {
  const installs = globalNpmInstalls(stage("runner-cli"));
  assert.equal(installs.length, 1, "exactly one global-npm layer in runner-cli");
  const specs = installs[0].map(splitSpec);
  const qoder = specs.filter((s) => s.name === QODER_PACKAGE);
  assert.equal(qoder.length, 1, `${QODER_PACKAGE} must be installed exactly once`);
  assert.equal(qoder[0].version, QODER_PIN);
});

test("#9292: every global CLI in runner-cli is an exact x.y.z pin (#12576) and the siblings are kept", () => {
  const specs = globalNpmInstalls(stage("runner-cli"))[0].map(splitSpec);
  for (const { name, version } of specs) {
    assert.match(
      version,
      /^\d+\.\d+\.\d+$/,
      `${name}@${version}: floating ranges/dist-tags are forbidden (#12576)`
    );
  }
  // Adding qodercli must not have displaced an existing CLI.
  assert.deepEqual(specs.map((s) => s.name).sort(), [
    "@anthropic-ai/claude-code",
    "@openai/codex",
    "@qoder-ai/qodercli",
    "droid",
    "openclaw",
  ]);
});

test("#9292: the qodercli install runs as root and the stage hands back to the node user", () => {
  const instr = stage("runner-cli").instructions;
  const installIdx = instr.findIndex((i) => i.includes(QODER_PACKAGE));
  assert.ok(installIdx > 0);
  const userBefore = instr
    .slice(0, installIdx)
    .filter((i) => /^USER\b/.test(i))
    .pop();
  assert.equal(userBefore, "USER root", "global npm install needs root (writes /usr/local)");
  const userLast = instr.filter((i) => /^USER\b/.test(i)).pop();
  assert.equal(userLast, "USER node", "the runtime must not stay root");
  assert.ok(
    instr.slice(installIdx).some((i) => i === "USER node"),
    "USER node comes after the install layer"
  );
});

test("#9292: PATH is not overridden in runner stages (npm -g bins land in /usr/local/bin, already on PATH)", () => {
  for (const name of ["runner-base", "runner-cli"]) {
    const overrides = stage(name).instructions.filter(
      (i) => /^ENV\s+(PATH|NPM_CONFIG_PREFIX)\b/.test(i) || /^ENV\s+PATH=/.test(i)
    );
    assert.deepEqual(overrides, [], `${name} must not reroute PATH / npm prefix`);
  }
  assert.match(stage("runner-base").base, /^base$/);
  assert.match(stage("base").base, /^node:/, "official node image: npm prefix is /usr/local");
});

test("#9292: qodercli stays out of runner-base and runner-web (those stages must remain CLI-free)", () => {
  for (const name of ["base", "builder", "runner-base", "runner-web"]) {
    const text = stage(name).instructions.join("\n");
    assert.ok(!text.includes("qodercli"), `${name} must not install qodercli`);
    assert.ok(!text.includes("@qoder-ai"), `${name} must not reference @qoder-ai`);
  }
});

// ─── Contract with the application: binary name / env / error code ───────────

test("#9292: the pinned package basename is the command the application spawns", () => {
  // Heuristic contract: npm names the bin after the package basename. The
  // Dockerfile installs `@qoder-ai/qodercli` and the app spawns `qodercli`.
  // (At authoring time `npm view @qoder-ai/qodercli@1.1.63 bin` listed both
  // `qodercli` and `qoder`; that registry fact is residual risk, not asserted.)
  const basename = QODER_PACKAGE.split("/").pop();
  assert.equal(basename, "qodercli");
  assert.deepEqual(getCliToolCommandCandidates("qoder").includes(basename!), true);
  const prev = process.env.CLI_QODER_BIN;
  delete process.env.CLI_QODER_BIN;
  try {
    assert.equal(getQoderCliCommand(), basename, "default spawn command is the bare name");
  } finally {
    if (prev !== undefined) process.env.CLI_QODER_BIN = prev;
  }
});

test("#9292: qoder is a detectable CLI tool whose runtime endpoint the docker suite can query", () => {
  assert.ok(CLI_TOOL_IDS.includes("qoder"), "/api/cli-tools/runtime/qoder must resolve");
});

// ─── Application behaviour with / without the binary on PATH ─────────────────

async function withQoderEnv<T>(
  env: { PATH?: string; CLI_QODER_BIN?: string },
  fn: () => Promise<T>
): Promise<T> {
  const keys = ["PATH", "CLI_QODER_BIN"] as const;
  const prev = Object.fromEntries(keys.map((k) => [k, process.env[k]]));
  for (const k of keys) {
    if (env[k] === undefined) {
      if (k !== "PATH") delete process.env[k];
    } else {
      process.env[k] = env[k];
    }
  }
  __clearQoderCliInvocationCache();
  try {
    return await fn();
  } finally {
    for (const k of keys) {
      if (prev[k] === undefined) delete process.env[k];
      else process.env[k] = prev[k];
    }
    __clearQoderCliInvocationCache();
  }
}

const patRequest = {
  model: "qwen3-coder-plus",
  body: { messages: [{ role: "user", content: "Reply with OK only." }] },
  stream: false,
  credentials: { apiKey: "pt-test-token" },
};

test("#9292: image WITHOUT qodercli — the PAT path reports 502 cli_not_found (the reported failure)", async () => {
  // A command that cannot exist: independent of whatever the host has installed,
  // spawn fails with ENOENT exactly like `spawn qodercli ENOENT` in the old image.
  const missing = path.join(os.tmpdir(), `definitely-missing-${process.pid}`, "qodercli");
  await withQoderEnv({ CLI_QODER_BIN: missing }, async () => {
    const { response, url } = await new QoderExecutor().execute(patRequest);
    assert.equal(url, "qodercli://stdio");
    assert.equal(response.status, 502);
    const body = (await response.json()) as { error: { code?: string; message: string } };
    assert.equal(body.error.code, "cli_not_found");
    assert.match(body.error.message, /qodercli/);
    assert.match(body.error.message, /CLI_QODER_BIN/);
    assert.ok(!body.error.message.includes("at /"), "no stack trace in the error body");
  });
});

test("#9292: image WITH a `qodercli` on PATH (what npm -g puts in /usr/local/bin) — PAT chat is served", async (t) => {
  if (getKnownToolPaths("qoder").some((p) => fs.existsSync(p))) {
    // A real qodercli on this host would win over the PATH stub (known paths are
    // probed first) and make the assertion depend on the vendor binary.
    t.skip("host has a real qodercli installed");
    return;
  }
  // A POSIX shell stub named exactly like the npm shim, found ONLY through PATH
  // (no CLI_QODER_BIN) — this checks OmniRoute's bare-name PATH resolution, i.e.
  // the contract the Dockerfile layer relies on. It says nothing about the real
  // vendor binary.
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "qodercli-path-"));
  fs.writeFileSync(
    path.join(binDir, "qodercli"),
    [
      "#!/bin/sh",
      'case "$*" in',
      '  *--version*) echo "qodercli 1.1.63"; exit 0;;',
      "  *--print*)",
      "    cat >/dev/null;",
      '    printf \'{"type":"result","subtype":"success","is_error":false,"result":"OK from PATH stub"}\\n\'; exit 0;;',
      "esac",
      "exit 0",
    ].join("\n"),
    { mode: 0o755 }
  );
  try {
    const hostPath = process.env.PATH ?? "";
    await withQoderEnv({ PATH: `${binDir}${path.delimiter}${hostPath}` }, async () => {
      const { response } = await new QoderExecutor().execute(patRequest);
      assert.equal(response.status, 200);
      const payload = (await response.json()) as {
        choices: { message: { content: string } }[];
      };
      assert.equal(payload.choices[0].message.content, "OK from PATH stub");
    });
  } finally {
    fs.rmSync(binDir, { recursive: true, force: true });
  }
});

// ─── tests/security/test-cli-runtime.sh keeps covering qodercli ──────────────

/** The body of the numbered section of the script that starts with `[n/8]`. */
function scriptSection(n: number): string {
  const start = runtimeScript.indexOf(`echo "[${n}/8]`);
  assert.ok(start >= 0, `section [${n}/8] present`);
  const next = runtimeScript.indexOf(`echo "[${n + 1}/8]`, start);
  return runtimeScript.slice(start, next >= 0 ? next : undefined);
}

test("#9292: the docker runtime suite asserts qoder is ABSENT in runner-base and PRESENT in runner-cli", () => {
  const base = scriptSection(2);
  assert.match(base, /\/api\/cli-tools\/runtime\/qoder/);
  assert.match(base, /assert_equals "runner-base qoder installed" "false"/);
  assert.match(base, /assert_equals "runner-base qoder runnable" "false"/);

  const cli = scriptSection(3);
  assert.match(cli, /codex\/claude\/droid\/openclaw\/qodercli preinstalled/);
  assert.match(cli, /\/api\/cli-tools\/runtime\/qoder/);
  assert.match(cli, /assert_equals "runner-cli qoder installed" "true"/);
  assert.match(cli, /assert_equals "runner-cli qoder runnable" "true"/);
});

test("#9292: the docker runtime suite smoke-runs `qodercli --version` inside the runner-cli container", () => {
  assert.match(
    scriptSection(3),
    /docker exec "\$\{CLI_CONTAINER\}" qodercli --version/,
    "the binary must actually execute inside the image, not only be detected"
  );
});
