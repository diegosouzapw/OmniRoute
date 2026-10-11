import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import * as yaml from "js-yaml";

interface Step {
  name?: string;
  run?: string;
  env?: Record<string, string>;
  if?: string;
  "continue-on-error"?: boolean;
}

const workflow = yaml.load(
  fs.readFileSync(
    new URL("../../../.github/workflows/nightly-schemathesis.yml", import.meta.url),
    "utf8"
  )
) as { jobs: { schemathesis: { steps: Step[] } } };
const steps = workflow.jobs.schemathesis.steps;
const start = steps.find((step) => step.name === "Start OmniRoute (background)")!;
const stop = steps.find((step) => step.name === "Stop server")!;

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "schemathesis-15988-"));
  const bin = path.join(dir, "bin");
  const data = path.join(dir, "initial-data");
  fs.mkdirSync(bin);
  fs.mkdirSync(data);
  const env: NodeJS.ProcessEnv = {
    PATH: `${bin}:${process.env.PATH}`,
    HOME: path.join(dir, "home"),
    RUNNER_TEMP: dir,
    GITHUB_ENV: path.join(dir, "github-env"),
    DATA_DIR: data,
    OMNIROUTE_PLUGINS_DIR: path.join(data, "plugins"),
    PROBE_MODE: "healthy",
    FIXTURE: dir,
  };
  fs.writeFileSync(env.GITHUB_ENV!, "");
  const scripts = {
    npm: 'printf "%s\\n%s\\n" "$DATA_DIR" "$OMNIROUTE_PLUGINS_DIR" > "$FIXTURE/build-env"',
    node: 'printf "%s\\n%s\\n" "$DATA_DIR" "$OMNIROUTE_PLUGINS_DIR" > "$FIXTURE/server-env"\n[ "$PROBE_MODE" = dead ] && exit 1\nexec /bin/sleep 60',
    curl: 'printf "%s\\n" "$@" > "$FIXTURE/health-args"\n/bin/sleep 0.02\n[ "$PROBE_MODE" = healthy ] || [ "$PROBE_MODE" = dead ]',
    schemathesis: 'printf "%s\\n" "$@" > "$FIXTURE/fuzz-args"\nexit 42',
    sleep: "/bin/sleep 0.01",
  };
  for (const [name, script] of Object.entries(scripts)) {
    fs.writeFileSync(path.join(bin, name), `#!/bin/sh\n${script}\n`, { mode: 0o755 });
  }
  t.after(() => {
    // Only this fixture's recorded child PIDs, including the old workflow's location.
    for (const pidFile of [path.join(dir, "server.pid"), path.join(env.DATA_DIR!, "server.pid")]) {
      if (fs.existsSync(pidFile)) {
        try {
          process.kill(Number(fs.readFileSync(pidFile, "utf8")));
        } catch {
          // The child may already have exited (the dead-server regression).
        }
      }
    }
    fs.rmSync(dir, { recursive: true, force: true });
  });
  const run = (step: Step, overrides: NodeJS.ProcessEnv = {}) =>
    spawnSync("bash", ["-e", "-o", "pipefail", "-c", step.run!], {
      cwd: dir,
      env: { ...env, ...step.env, ...overrides },
      encoding: "utf8",
      timeout: 5000,
    });
  return { dir, env, run };
}

async function listen(t: test.TestContext) {
  const server = net.createServer((socket) => socket.destroy());
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  server.unref();
  t.after(() => server.close());
  return { server, port: String((server.address() as net.AddressInfo).port) };
}

test("each run gives build and server the same fresh state, distinct from a prior run", async (t) => {
  const f = fixture(t);
  const listener = await listen(t);
  await new Promise<void>((resolve) => listener.server.close(() => resolve()));
  const dataDirs: string[] = [];
  for (let attempt = 0; attempt < 2; attempt++) {
    // Model a persistent runner; even its inherited DATA_DIR must not be reused.
    for (const step of steps.slice(0, steps.indexOf(start))) {
      if (step.run) {
        const result = f.run(step);
        assert.equal(result.status, 0, result.stderr);
        for (const line of fs.readFileSync(f.env.GITHUB_ENV!, "utf8").trim().split("\n")) {
          const equals = line.indexOf("=");
          if (equals > 0) f.env[line.slice(0, equals)] = line.slice(equals + 1);
        }
      }
    }
    const dataDir = f.env.DATA_DIR!;
    assert.ok(
      !fs.existsSync(path.join(dataDir, "storage.sqlite")),
      "must start with no prior database"
    );
    fs.writeFileSync(path.join(dataDir, "storage.sqlite"), "prior run sentinel");
    const result = f.run(start, { PORT: listener.port });
    assert.equal(result.status, 0, result.stderr);
    const healthArgs = fs.readFileSync(path.join(f.dir, "health-args"), "utf8").trim().split("\n");
    assert.ok(
      healthArgs.includes(`http://${start.env!.HOSTNAME}:${listener.port}/api/monitoring/health`)
    );
    assert.equal(healthArgs[healthArgs.indexOf("--max-time") + 1], "2");
    assert.equal(
      fs.readFileSync(path.join(f.dir, "server-env"), "utf8"),
      fs.readFileSync(path.join(f.dir, "build-env"), "utf8")
    );
    assert.equal(f.env.OMNIROUTE_PLUGINS_DIR, path.join(dataDir, "plugins"));
    dataDirs.push(dataDir);
    assert.equal(f.run(stop).status, 0);
  }
  assert.notEqual(dataDirs[0], dataDirs[1]);
});

test("unhealthy server exhausts readiness with a blocking failure", async (t) => {
  const f = fixture(t);
  const listener = await listen(t);
  await new Promise<void>((resolve) => listener.server.close(() => resolve()));
  const result = f.run(start, { PORT: listener.port, PROBE_MODE: "unhealthy" });
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, "readiness exhaustion must not allow fuzzing");
  assert.notEqual(start["continue-on-error"], true);
});

test("dead own process cannot be accepted even when a health request succeeds", async (t) => {
  const f = fixture(t);
  const listener = await listen(t);
  await new Promise<void>((resolve) => listener.server.close(() => resolve()));
  const result = f.run(start, { PORT: listener.port, PROBE_MODE: "dead" });
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0, "a different responder cannot substitute for the dead child");
});

test("an occupied port is rejected before launching or stopping any server", async (t) => {
  const f = fixture(t);
  const listener = await listen(t);
  const result = f.run(start, { PORT: listener.port });
  assert.equal(result.error, undefined);
  assert.notEqual(result.status, 0);
  assert.equal(fs.existsSync(path.join(f.dir, "server-env")), false);
  assert.equal(f.run(stop).status, 0);
  assert.equal(listener.server.listening, true);
});

test("startup blocks fuzzing while contract violations stay advisory and logs are retained", () => {
  const fuzz = steps.find((step) => step.name === "Schemathesis contract fuzz (advisory)")!;
  assert.ok(steps.indexOf(start) < steps.indexOf(fuzz));
  assert.equal(fuzz.if, undefined, "default success() must gate the fuzz step");
  assert.equal(fuzz["continue-on-error"], true);
  assert.equal(stop.if, "always() && steps.runtime.outcome == 'success'");
  assert.equal(steps.find((step) => step.name === "Upload schemathesis report")?.if, "always()");
});

test("Schemathesis probes the configured server URL and keeps spec violations advisory", (t) => {
  const f = fixture(t);
  const fuzz = steps.find((step) => step.name === "Schemathesis contract fuzz (advisory)")!;
  const result = f.run(fuzz);
  assert.equal(result.status, 0, "the fake Schemathesis violation (exit 42) must remain advisory");
  const args = fs.readFileSync(path.join(f.dir, "fuzz-args"), "utf8").trim().split("\n");
  assert.equal(args[args.indexOf("--url") + 1], `http://${start.env!.HOSTNAME}:${start.env!.PORT}`);
});
