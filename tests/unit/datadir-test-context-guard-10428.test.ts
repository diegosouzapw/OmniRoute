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
