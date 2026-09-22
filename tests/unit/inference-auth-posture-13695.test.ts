import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  MAIN_SERVER_DEFAULT_HOST,
  resolveMainServerHost,
  warnIfInferenceServerExposed,
} from "@/lib/startup/nonLoopbackApiKeyGuard";

// #13695: `/v1/models` follows the dashboard login posture while inference
// follows REQUIRE_API_KEY, so probing `/v1/models` can report "protected" for
// an instance whose `/v1/responses` is open to anyone who can reach the port.
// #12568 added the boot warning for the API bridge and live-WS servers; the
// Next server that actually answers inference was left uncovered, and it is
// the one that binds every interface by default.

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

// HOSTNAME is exported by the shell on many Linux boxes, so a test that only
// clears HOST would read the machine name and pass for the wrong reason.
const CLEAR_HOST = {
  OMNIROUTE_BOUND_HOST: undefined,
  HOSTNAME: undefined,
  HOST: undefined,
} satisfies Record<string, string | undefined>;

function withEnv<T>(vars: Record<string, string | undefined>, fn: () => T): T {
  const prev: Record<string, string | undefined> = {};
  for (const key of Object.keys(vars)) {
    prev[key] = process.env[key];
    const value = vars[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    return fn();
  } finally {
    for (const key of Object.keys(prev)) {
      const value = prev[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

function captureWarn(fn: () => void): string[] {
  const messages: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.warn = original;
  }
  return messages;
}

test("inference server warns on its default bind with REQUIRE_API_KEY unset", () => {
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: undefined }, () => {
    const messages = captureWarn(warnIfInferenceServerExposed);
    assert.equal(messages.length, 1);
    assert.match(messages[0], /\/v1 inference/);
    assert.match(messages[0], /non-loopback host "0\.0\.0\.0"/);
    assert.match(messages[0], /REQUIRE_API_KEY/);
  });
});

test("inference server warns on an explicit LAN bind with REQUIRE_API_KEY=false", () => {
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: "false", OMNIROUTE_BOUND_HOST: "192.168.1.5" }, () => {
    const messages = captureWarn(warnIfInferenceServerExposed);
    assert.equal(messages.length, 1);
    assert.match(messages[0], /non-loopback host "192\.168\.1\.5"/);
  });
});

test("inference server stays silent on loopback, and on 0.0.0.0 with the key required", () => {
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: "false", OMNIROUTE_BOUND_HOST: "127.0.0.1" }, () => {
    assert.deepEqual(captureWarn(warnIfInferenceServerExposed), []);
  });
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: "false", OMNIROUTE_BOUND_HOST: "::1" }, () => {
    assert.deepEqual(captureWarn(warnIfInferenceServerExposed), []);
  });
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: "true" }, () => {
    assert.deepEqual(captureWarn(warnIfInferenceServerExposed), []);
  });
});

test("host resolution tracks both entrypoints that bind the inference server", () => {
  // The two runners are dependency-free and boot before any TypeScript, so
  // neither can import the guard. run-next.mjs publishes what it binds;
  // the standalone/Docker path goes through Next's own HOSTNAME convention.
  // If either contract moves, the warning names an interface the server is
  // not on — and one false warning is enough to train an operator to ignore
  // the next one.
  const runner = fs.readFileSync(path.join(REPO_ROOT, "scripts/dev/run-next.mjs"), "utf8");
  const match = runner.match(/const hostname = process\.env\.HOST \|\| "([^"]+)"/);
  assert.ok(match, 'run-next.mjs no longer resolves its bind host as `process.env.HOST || "..."`');
  assert.equal(match[1], MAIN_SERVER_DEFAULT_HOST);
  assert.match(
    runner,
    /process\.env\.OMNIROUTE_BOUND_HOST = hostname;/,
    "run-next.mjs no longer publishes the host it binds"
  );

  const dockerfile = fs.readFileSync(path.join(REPO_ROOT, "Dockerfile"), "utf8");
  assert.match(
    dockerfile,
    /^ENV HOSTNAME=0\.0\.0\.0$/m,
    "Dockerfile no longer sets the HOSTNAME the standalone server binds"
  );

  withEnv(CLEAR_HOST, () => {
    assert.equal(resolveMainServerHost(), MAIN_SERVER_DEFAULT_HOST);
  });
  // run-next.mjs path: the published value wins over anything ambient.
  withEnv({ ...CLEAR_HOST, OMNIROUTE_BOUND_HOST: "127.0.0.1", HOSTNAME: "build-box" }, () => {
    assert.equal(resolveMainServerHost(), "127.0.0.1");
  });
  // standalone/Docker path: no published value, Next reads HOSTNAME.
  withEnv({ ...CLEAR_HOST, HOSTNAME: "10.0.0.7" }, () => {
    assert.equal(resolveMainServerHost(), "10.0.0.7");
  });
  // HOST is deliberately absent from the chain: the standalone server ignores
  // it, and run-next.mjs has already folded it into OMNIROUTE_BOUND_HOST.
  withEnv({ ...CLEAR_HOST, HOST: "10.0.0.8" }, () => {
    assert.equal(resolveMainServerHost(), MAIN_SERVER_DEFAULT_HOST);
  });
  // Ordering is load-bearing: on the standalone path Next binds HOSTNAME, so
  // a stray HOST in the environment must not win.
  withEnv({ ...CLEAR_HOST, HOSTNAME: "127.0.0.1", HOST: "192.168.1.9" }, () => {
    assert.equal(resolveMainServerHost(), "127.0.0.1");
  });
});

test("a loopback-bound Docker instance does not get a false warning", () => {
  // The regression this ordering exists to prevent: reading only HOST would
  // fall through to "0.0.0.0" and warn about an instance that is in fact
  // bound to loopback.
  withEnv({ ...CLEAR_HOST, REQUIRE_API_KEY: "false", HOSTNAME: "127.0.0.1" }, () => {
    assert.deepEqual(captureWarn(warnIfInferenceServerExposed), []);
  });
});

test("the Next boot hook actually invokes the inference exposure guard", () => {
  // A guard nobody calls is what #13695 is reporting: the module existed and
  // was tested, but the inference server never reached it.
  const boot = fs.readFileSync(path.join(REPO_ROOT, "src/instrumentation-node.ts"), "utf8");
  assert.match(boot, /warnIfInferenceServerExposed\(\)/);
});

test("docs state which setting gates /v1/models and which gates inference", () => {
  const env = fs.readFileSync(path.join(REPO_ROOT, "docs/reference/ENVIRONMENT.md"), "utf8");
  const row = env.split("\n").find((line) => line.startsWith("| `REQUIRE_API_KEY`"));
  assert.ok(row, "REQUIRE_API_KEY row missing from ENVIRONMENT.md");
  assert.match(row, /does not gate `GET \/v1\/models`/);
  assert.match(row, /requireAuthForModels/);

  const doc = fs.readFileSync(
    path.join(REPO_ROOT, "docs/security/INFERENCE_AUTH_POSTURE.md"),
    "utf8"
  );
  assert.match(doc, /requireAuthForModels/);
  assert.match(doc, /REQUIRE_API_KEY/);
  assert.match(doc, /does \*\*not\*\* verify that\s*(?:>\s*)?inference is protected/);

  const meta = JSON.parse(
    fs.readFileSync(path.join(REPO_ROOT, "docs/security/meta.json"), "utf8")
  ) as { pages: string[] };
  assert.ok(
    meta.pages.includes("INFERENCE_AUTH_POSTURE"),
    "new security page is not registered in docs/security/meta.json"
  );
});
