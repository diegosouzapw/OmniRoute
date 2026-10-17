import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

/**
 * #10428 — a script or test that opens the DB without setting DATA_DIR resolves to the
 * operator's REAL database (`~/.omniroute/storage.sqlite`, credentials included).
 * `tests/_setup/isolateDataDir.ts` protects the npm test scripts, but it is opt-in per
 * invocation: the AGENTS.md-documented single-file command
 * (`node --import tsx/esm --test tests/unit/x.test.ts`) does NOT load it, and neither does
 * an ad-hoc `node --import tsx probe.ts`.
 *
 * The guard therefore lives at the one place that actually opens the DB
 * (`resolveWritableDataDir`, consumed only by `src/lib/db/core.ts`): in a test context
 * pointing at the default user data dir, it redirects to a throwaway temp dir instead of
 * touching the real one. Redirecting rather than throwing keeps the documented
 * single-file command working — a hard failure there would just teach people to unset the
 * guard.
 */

const { resolveWritableDataDir, getDefaultDataDir } = await import("../../src/lib/dataPaths.ts");
const redirectedDirs = new Set<string>();

function assertOwnedRedirectDir(candidate: string): string {
  const resolved = path.resolve(candidate);
  const tempRoot = path.resolve(os.tmpdir());
  assert.ok(
    resolved.startsWith(`${tempRoot}${path.sep}`) &&
      path.basename(resolved).startsWith("omniroute-testctx-"),
    `refusing to treat a non-owned path as a test redirect: ${resolved}`
  );
  return resolved;
}

function rememberRedirectDir(candidate: string): string {
  const resolved = assertOwnedRedirectDir(candidate);
  redirectedDirs.add(resolved);
  return resolved;
}

test.after(() => {
  for (const redirected of redirectedDirs) {
    fs.rmSync(redirected, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

function withEnv(overrides: Record<string, string | undefined>, run: () => void) {
  const saved: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(overrides)) {
    saved[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    run();
  } finally {
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const EVAL_PROBE_SCRIPT =
  "import('./src/lib/dataPaths.ts').then(({ resolveWritableDataDir }) => " +
  "console.log('OMNIROUTE_TEST_DATA_DIR=' + resolveWritableDataDir()))";

function assertEvalProbeIsIsolated(evalArgs: string[], configuredDataDir = "") {
  const result = spawnSync(process.execPath, ["--import", "tsx/esm", ...evalArgs], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: {
      ...process.env,
      DATA_DIR: configuredDataDir,
      XDG_CONFIG_HOME: "",
      NODE_ENV: "production",
      NODE_TEST_CONTEXT: "",
      VITEST: "",
      OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: "",
    },
  });

  assert.equal(result.status, 0, result.stderr);
  const outputLine = result.stdout
    .trim()
    .split("\n")
    .find((line) => line.startsWith("OMNIROUTE_TEST_DATA_DIR="));
  const resolved = outputLine?.slice("OMNIROUTE_TEST_DATA_DIR=".length) ?? "";
  const ownedRedirect = assertOwnedRedirectDir(resolved);
  try {
    assert.notEqual(
      ownedRedirect,
      path.join(os.homedir(), ".omniroute"),
      "an eval/import probe must not inherit the normal server's default database"
    );
    assert.equal(
      fs.existsSync(ownedRedirect),
      false,
      "the child exit handler must remove its exact redirected DATA_DIR"
    );
  } finally {
    fs.rmSync(ownedRedirect, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  }
}

test("G1: a test context with no DATA_DIR never resolves to the operator's real data dir", () => {
  withEnv(
    { DATA_DIR: undefined, NODE_ENV: "test", OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: undefined },
    () => {
      const resolved = rememberRedirectDir(resolveWritableDataDir());
      assert.notEqual(
        resolved,
        getDefaultDataDir(),
        "a test run must never be handed the operator's real DATA_DIR"
      );
      assert.ok(resolved.startsWith(os.tmpdir()), `expected a throwaway temp dir, got ${resolved}`);
      assert.ok(fs.existsSync(resolved), "the redirected dir must exist and be usable");
    }
  );
});

test("G2: an explicit DATA_DIR still wins inside a test context", () => {
  const explicit = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-explicit-"));
  withEnv({ DATA_DIR: explicit, NODE_ENV: "test" }, () => {
    assert.equal(resolveWritableDataDir(), explicit);
  });
  fs.rmSync(explicit, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("G3: the escape hatch restores the old behavior for deliberate runs", () => {
  withEnv({ DATA_DIR: undefined, NODE_ENV: "test", OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: "1" }, () => {
    assert.equal(
      resolveWritableDataDir(),
      getDefaultDataDir(),
      "an explicit opt-in must still reach the real dir, so the intent is recorded"
    );
  });
});

test("G4: a normal server run (no test markers) is untouched", () => {
  withEnv(
    {
      DATA_DIR: undefined,
      NODE_ENV: "production",
      VITEST: undefined,
      NODE_TEST_CONTEXT: undefined,
      OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: undefined,
    },
    () => {
      assert.equal(
        resolveWritableDataDir(),
        getDefaultDataDir(),
        "the server must keep resolving to the real data dir"
      );
    }
  );
});

test("G5: node:test subprocesses are detected through NODE_TEST_CONTEXT too", () => {
  withEnv(
    {
      DATA_DIR: undefined,
      NODE_ENV: undefined,
      NODE_TEST_CONTEXT: "child-v8",
      OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: undefined,
    },
    () => {
      const resolved = rememberRedirectDir(resolveWritableDataDir());
      assert.notEqual(resolved, getDefaultDataDir());
      assert.ok(resolved.startsWith(os.tmpdir()));
    }
  );
});

test("G6: the redirect is stable within a process (same dir on repeated calls)", () => {
  withEnv({ DATA_DIR: undefined, NODE_ENV: "test" }, () => {
    const first = rememberRedirectDir(resolveWritableDataDir());
    const second = rememberRedirectDir(resolveWritableDataDir());
    assert.equal(first, second, "a per-call temp dir would split the DB across handles");
  });
});

test("G7: a node --eval probe without DATA_DIR is isolated from the operator home", () => {
  assertEvalProbeIsIsolated(["--eval", EVAL_PROBE_SCRIPT]);
});

test("G8: the single-argument --eval= form is isolated too", () => {
  assertEvalProbeIsIsolated([`--eval=${EVAL_PROBE_SCRIPT}`]);
});

test("G9: whitespace DATA_DIR is absent for a node -e probe", () => {
  assertEvalProbeIsIsolated(["-e", EVAL_PROBE_SCRIPT], "   ");
});

test("G10: a combined node -pe probe is isolated too", () => {
  assertEvalProbeIsIsolated(["-pe", EVAL_PROBE_SCRIPT]);
});

function runGateChild(
  script: string,
  env: Record<string, string | undefined>
): {
  status: number | null;
  stdout: string;
  stderr: string;
} {
  const childEnv: Record<string, string> = { ...process.env } as Record<string, string>;
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) delete childEnv[key];
    else childEnv[key] = value;
  }
  const result = spawnSync(process.execPath, ["--import", "tsx/esm", "--eval", script], {
    cwd: process.cwd(),
    encoding: "utf8",
    env: childEnv,
  });
  return { status: result.status, stdout: result.stdout ?? "", stderr: result.stderr ?? "" };
}

function childEnvBase(
  overrides: Record<string, string | undefined>
): Record<string, string | undefined> {
  return {
    DATA_DIR: undefined,
    XDG_CONFIG_HOME: "",
    NODE_ENV: "test",
    NODE_TEST_CONTEXT: "child-v8",
    VITEST: undefined,
    OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: undefined,
    ...overrides,
  };
}

test("gate case 11: artifacts follow the redirected database dir when DATA_DIR is unset", () => {
  const script = [
    "import('./src/lib/usage/callLogArtifacts.ts').then(async ({ getCallLogsDir, writeCallArtifact }) => {",
    "  const fs = await import('node:fs');",
    "  const path = await import('node:path');",
    "  const dataPaths = await import('./src/lib/dataPaths.ts');",
    "  const dir = getCallLogsDir();",
    "  const expected = path.join(dataPaths.resolveWritableDataDir(), 'call_logs');",
    "  if (dir !== expected) { console.error('MISMATCH ' + dir + ' vs ' + expected); process.exit(11); }",
    "  const artifact = { schemaVersion: 5, summary: { id: 'gate-g11', timestamp: '2026-04-06T12:00:00.000Z', method: 'POST', path: '/v1/chat/completions', status: 200, model: 'm', requestedModel: null, provider: 'p', account: 'a', connectionId: null, duration: 1, tokens: { in: 0, out: 0, cacheRead: null, cacheWrite: null, reasoning: null, compressed: null }, requestType: null, sourceFormat: null, targetFormat: null, apiKeyId: null, apiKeyName: null, comboName: null, comboStepId: null, comboExecutionKey: null }, requestBody: { gate: true }, responseBody: null, error: null };",
    "  const result = writeCallArtifact(artifact);",
    "  if (!result) { console.error('NO_WRITE'); process.exit(12); }",
    "  const abs = path.join(dir, result.relPath);",
    "  if (!fs.existsSync(abs)) { console.error('MISSING ' + abs); process.exit(13); }",
    "  const def = path.join(dataPaths.getDefaultDataDir(), 'call_logs', result.relPath);",
    "  if (fs.existsSync(def)) { console.error('LEAK ' + def); process.exit(14); }",
    "  console.log('CHILD_DIR=' + path.dirname(dir));",
    "  console.log('CHILD_REL=' + result.relPath);",
    "});",
  ].join("\n");
  const child = runGateChild(script, childEnvBase({}));
  assert.equal(child.status, 0, child.stderr);
  const dirLine = child.stdout.split("\n").find((line) => line.startsWith("CHILD_DIR="));
  const relLine = child.stdout.split("\n").find((line) => line.startsWith("CHILD_REL="));
  assert.ok(dirLine, `child must report its redirect dir, got: ${child.stdout}${child.stderr}`);
  assert.ok(relLine, `child must report its artifact path, got: ${child.stdout}${child.stderr}`);
  const childDir = rememberRedirectDir(dirLine.slice("CHILD_DIR=".length));
  assert.ok(
    childDir.startsWith(`${path.resolve(os.tmpdir())}${path.sep}`),
    `child redirect must stay under the temp root, got ${childDir}`
  );
  assert.ok(
    !path.resolve(childDir).startsWith(`${path.resolve(getDefaultDataDir())}${path.sep}`) &&
      path.resolve(childDir) !== path.resolve(getDefaultDataDir()),
    "a test run must not write artifacts under the operator data dir"
  );
});

test("gate case 12: an explicit DATA_DIR keeps artifacts under it", () => {
  const explicit = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gate-explicit-"));
  try {
    const script = [
      "import('./src/lib/usage/callLogArtifacts.ts').then(({ getCallLogsDir }) => {",
      "  console.log('CHILD_EXPLICIT_DIR=' + getCallLogsDir());",
      "});",
    ].join("\n");
    const child = runGateChild(script, childEnvBase({ DATA_DIR: explicit }));
    assert.equal(child.status, 0, child.stderr);
    const line = child.stdout.split("\n").find((l) => l.startsWith("CHILD_EXPLICIT_DIR="));
    assert.equal(line, `CHILD_EXPLICIT_DIR=${path.join(explicit, "call_logs")}`);
  } finally {
    fs.rmSync(explicit, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("gate case 13: a normal server run resolves artifacts under the default dir", () => {
  // A --eval child always carries --eval in its own execArgv, so the eval-probe
  // guard would redirect it. Run this case from a temp script file instead, so
  // the child looks like a plain server process (no test markers, no --eval).
  const scriptFile = path.join(
    fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gate-server-")),
    "server-probe.mts"
  );
  fs.writeFileSync(
    scriptFile,
    [
      "import path from 'node:path';",
      `import { getCallLogsDir } from '${process.cwd()}/src/lib/usage/callLogArtifacts.ts';`,
      `import { resolveDataDir } from '${process.cwd()}/src/lib/dataPaths.ts';`,
      "import { createRequire } from 'node:module';",
      "const dir = getCallLogsDir();",
      "const expected = path.join(resolveDataDir(), 'call_logs');",
      "if (dir !== expected) { console.error('MISMATCH ' + dir + ' vs ' + expected); process.exit(21); }",
      "console.log('SERVER_DIR=' + dir);",
    ].join("\n")
  );
  try {
    const childEnv: Record<string, string> = { ...process.env } as Record<string, string>;
    for (const key of [
      "DATA_DIR",
      "XDG_CONFIG_HOME",
      "NODE_TEST_CONTEXT",
      "VITEST",
      "OMNIROUTE_ALLOW_DEFAULT_DATA_DIR",
    ]) {
      delete childEnv[key];
    }
    childEnv.NODE_ENV = "production";
    const result = spawnSync(process.execPath, ["--import", "tsx/esm", scriptFile], {
      cwd: process.cwd(),
      encoding: "utf8",
      env: childEnv,
    });
    assert.equal(result.status, 0, result.stderr);
    const line = (result.stdout ?? "").split("\n").find((l) => l.startsWith("SERVER_DIR="));
    assert.ok(line, `server child must report its dir, got: ${result.stdout}${result.stderr}`);
  } finally {
    fs.rmSync(path.dirname(scriptFile), {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 100,
    });
  }
});

test("gate case 14: the allow-default escape hatch keeps artifacts on the default dir", () => {
  // The expected dir is computed inside the child: the parent may resolve the
  // default dir through XDG_CONFIG_HOME while this child clears it (see
  // childEnvBase), so a parent-side prefix check compares two different
  // defaults. Same pattern as gate case 13 (in-child equality).
  const script = [
    "Promise.all([import('./src/lib/usage/callLogArtifacts.ts'), import('node:path'), import('./src/lib/dataPaths.ts')]).then(([{ getCallLogsDir }, path, dataPaths]) => {",
    "  const dir = getCallLogsDir();",
    "  const expected = path.join(dataPaths.getDefaultDataDir(), 'call_logs');",
    "  if (dir !== expected) { console.error('MISMATCH ' + dir + ' vs ' + expected); process.exit(41); }",
    "  console.log('ALLOW_DIR=' + dir);",
    "});",
  ].join("\n");
  const child = runGateChild(script, childEnvBase({ OMNIROUTE_ALLOW_DEFAULT_DATA_DIR: "1" }));
  assert.equal(child.status, 0, child.stderr);
  const line = child.stdout.split("\n").find((l) => l.startsWith("ALLOW_DIR="));
  assert.ok(line, `escape-hatch child must report its dir, got: ${child.stdout}${child.stderr}`);
  assert.ok(
    !(line ?? "").includes("omniroute-testctx-"),
    `escape hatch must skip the test redirect, got ${line}`
  );
});

test("gate case 15: the artifact writer lands under the redirected dir", () => {
  const script = [
    "Promise.all([import('./src/lib/usage/callLogArtifactWriter.ts'), import('./src/lib/dataPaths.ts'), import('./src/lib/usage/callLogArtifacts.ts')]).then(async ([{ writeCallArtifactAsync, closeCallLogArtifactWriter }, dataPaths, { buildArtifactRelativePath }]) => {",
    "  const fs = await import('node:fs');",
    "  const path = await import('node:path');",
    "  const staleRel = buildArtifactRelativePath('2026-04-06T12:00:00.000Z', 'gate-g15');",
    "  fs.rmSync(path.join(dataPaths.getDefaultDataDir(), 'call_logs', staleRel), { force: true });",
    "  const artifact = { schemaVersion: 5, summary: { id: 'gate-g15', timestamp: '2026-04-06T12:00:00.000Z', method: 'POST', path: '/v1/chat/completions', status: 200, model: 'm', requestedModel: null, provider: 'p', account: 'a', connectionId: null, duration: 1, tokens: { in: 0, out: 0, cacheRead: null, cacheWrite: null, reasoning: null, compressed: null }, requestType: null, sourceFormat: null, targetFormat: null, apiKeyId: null, apiKeyName: null, comboName: null, comboStepId: null, comboExecutionKey: null }, requestBody: { gate: 'worker' }, responseBody: null, error: null };",
    "  const result = await writeCallArtifactAsync(artifact);",
    "  await closeCallLogArtifactWriter(2000);",
    "  await new Promise((r) => setTimeout(r, 500));",
    "  if (!result) { console.error('NO_WRITE'); process.exit(31); }",
    "  const dir = path.dirname(path.join(dataPaths.resolveWritableDataDir(), 'call_logs', result.relPath));",
    "  const abs = path.join(dataPaths.resolveWritableDataDir(), 'call_logs', result.relPath);",
    "  if (!fs.existsSync(abs)) { console.error('MISSING ' + abs); process.exit(32); }",
    "  const def = path.join(dataPaths.getDefaultDataDir(), 'call_logs', result.relPath);",
    "  if (fs.existsSync(def)) { console.error('LEAK ' + def); process.exit(33); }",
    "  console.log('WORKER_DIR=' + path.dirname(path.join(dataPaths.resolveWritableDataDir(), 'call_logs')));",
    "  console.log('WORKER_REL=' + result.relPath);",
    "  void dir;",
    "}).catch((e) => { console.error(String(e)); process.exit(34); });",
  ].join("\n");
  const child = runGateChild(script, childEnvBase({}));
  assert.equal(child.status, 0, child.stderr);
  const dirLine = child.stdout.split("\n").find((line) => line.startsWith("WORKER_DIR="));
  assert.ok(dirLine, `worker child must report its dir, got: ${child.stdout}${child.stderr}`);
  rememberRedirectDir(dirLine.slice("WORKER_DIR=".length));
});
