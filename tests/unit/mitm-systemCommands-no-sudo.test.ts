/**
 * Feature #6122 — root-less / no-sudo mode for the MITM cert-trust path.
 *
 * OmniRoute funnels every privileged MITM command through the single choke
 * point `execFileWithPassword("sudo", ["-S", ...], password)`, which strips the
 * leading `sudo -S` when running as root or when `sudo` is not on PATH. This
 * feature adds a third opt-out trigger — the `OMNIROUTE_NO_SUDO` env flag — so
 * OmniRoute starts cleanly in a root-less / user-namespace deployment where
 * `/usr/bin/sudo` exists but must not be used.
 *
 * These tests assert the RESOLVED argv (via the pure `resolveSudoSpawn` seam)
 * WITHOUT spawning a real `sudo`: with the flag ON the leading `sudo`/`-S`
 * tokens are dropped and no password is written to stdin; with the flag OFF
 * (and non-root + sudo available) the `sudo -S …` argv is preserved.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { isNoSudoEnv, resolveSudoSpawn } from "../../src/mitm/systemCommands.ts";

// Non-root host with sudo on PATH: the only variable is the env flag. This is
// the exact environment the feature targets (sudo present, must be skipped).
const NON_ROOT_WITH_SUDO = { root: false, sudoAvailable: true } as const;

test(
  "resolveSudoSpawn: with OMNIROUTE_NO_SUDO=1, strips `sudo -S` and needs no password",
  () => {
    const prev = process.env.OMNIROUTE_NO_SUDO;
    process.env.OMNIROUTE_NO_SUDO = "1";
    try {
      const { finalCommand, finalArgs, stripSudo, needsPassword } = resolveSudoSpawn(
        "sudo",
        ["-S", "cp", "/tmp/ca.pem", "/usr/local/share/ca-certificates/ca.crt"],
        NON_ROOT_WITH_SUDO
      );
      assert.equal(stripSudo, true);
      assert.equal(finalCommand, "cp");
      assert.deepEqual(finalArgs, [
        "/tmp/ca.pem",
        "/usr/local/share/ca-certificates/ca.crt",
      ]);
      // No `sudo` and no `-S` survive into the spawned argv.
      assert.ok(!finalArgs.includes("sudo"));
      assert.ok(!finalArgs.includes("-S"));
      // Password is only piped when `sudo -S` is actually spawned.
      assert.equal(needsPassword, false);
    } finally {
      if (prev === undefined) delete process.env.OMNIROUTE_NO_SUDO;
      else process.env.OMNIROUTE_NO_SUDO = prev;
    }
  }
);

test(
  "resolveSudoSpawn: with the flag OFF + non-root + sudo available, preserves `sudo -S`",
  () => {
    const prev = process.env.OMNIROUTE_NO_SUDO;
    delete process.env.OMNIROUTE_NO_SUDO;
    try {
      const { finalCommand, finalArgs, stripSudo, needsPassword } = resolveSudoSpawn(
        "sudo",
        ["-S", "cp", "/tmp/ca.pem", "/usr/local/share/ca-certificates/ca.crt"],
        NON_ROOT_WITH_SUDO
      );
      // Regression guard: do NOT strip when not asked to.
      assert.equal(stripSudo, false);
      assert.equal(finalCommand, "sudo");
      assert.deepEqual(finalArgs, [
        "-S",
        "cp",
        "/tmp/ca.pem",
        "/usr/local/share/ca-certificates/ca.crt",
      ]);
      assert.equal(needsPassword, true);
    } finally {
      if (prev === undefined) delete process.env.OMNIROUTE_NO_SUDO;
      else process.env.OMNIROUTE_NO_SUDO = prev;
    }
  }
);

test("resolveSudoSpawn: a non-sudo command is never touched, regardless of the flag", () => {
  const prev = process.env.OMNIROUTE_NO_SUDO;
  process.env.OMNIROUTE_NO_SUDO = "1";
  try {
    const { finalCommand, finalArgs, stripSudo, needsPassword } = resolveSudoSpawn(
      "certutil",
      ["-A", "-n", "OmniRoute"],
      NON_ROOT_WITH_SUDO
    );
    assert.equal(stripSudo, false);
    assert.equal(needsPassword, false);
    assert.equal(finalCommand, "certutil");
    assert.deepEqual(finalArgs, ["-A", "-n", "OmniRoute"]);
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_NO_SUDO;
    else process.env.OMNIROUTE_NO_SUDO = prev;
  }
});

test("isNoSudoEnv: truthiness matrix matches isTruthyEnvFlag semantics", () => {
  const prev = process.env.OMNIROUTE_NO_SUDO;
  const cases: Array<[string | undefined, boolean]> = [
    ["1", true],
    ["true", true],
    ["TRUE", true],
    ["yes", true],
    ["on", true],
    [" 1 ", true],
    ["0", false],
    ["false", false],
    ["no", false],
    ["off", false],
    ["", false],
    [undefined, false],
  ];
  try {
    for (const [value, expected] of cases) {
      if (value === undefined) delete process.env.OMNIROUTE_NO_SUDO;
      else process.env.OMNIROUTE_NO_SUDO = value;
      assert.equal(isNoSudoEnv(), expected, `OMNIROUTE_NO_SUDO=${JSON.stringify(value)}`);
    }
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_NO_SUDO;
    else process.env.OMNIROUTE_NO_SUDO = prev;
  }
});

test("resolveSudoSpawn: env flag alone (no overrides) drives stripping on non-root sudo host", () => {
  // Exercises the real env-reading default path (noSudo defaults to isNoSudoEnv()).
  const prev = process.env.OMNIROUTE_NO_SUDO;
  process.env.OMNIROUTE_NO_SUDO = "yes";
  try {
    const { finalCommand, stripSudo } = resolveSudoSpawn(
      "sudo",
      ["-S", "true"],
      // Pin root/sudo probes so the assertion is deterministic across hosts;
      // leave `noSudo` unset so it reads the live env flag.
      NON_ROOT_WITH_SUDO
    );
    assert.equal(stripSudo, true);
    assert.equal(finalCommand, "true");
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_NO_SUDO;
    else process.env.OMNIROUTE_NO_SUDO = prev;
  }
});
