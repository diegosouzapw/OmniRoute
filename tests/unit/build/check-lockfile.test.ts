// tests/unit/build/check-lockfile.test.ts
// TDD tests for check-lockfile.mjs — lockfile policy gate (Task 7.7).
//
// Strategy: the lockfile-lint binary is an external CLI tool; we do not spawn it
// in unit tests. Instead, we test the exported policy helpers and inject the
// process boundary used by the workspace consistency runner:
//   - getLockfileLintConfig() — returns the policy configuration object
//   - buildLockfileLintArgs()  — maps a config object to the argv array
//
// This validates the policy settings and the arg-assembly logic without requiring
// a real package-lock.json or a network call.
import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import {
  getLockfileLintConfig,
  buildLockfileLintArgs,
  getWorkspaceDependencyCheckCommand,
  runWorkspaceDependencyCheck,
} from "../../../scripts/check/check-lockfile.mjs";

// ---------------------------------------------------------------------------
// getLockfileLintConfig
// ---------------------------------------------------------------------------

test("getLockfileLintConfig: returns an object with required keys", () => {
  const cfg = getLockfileLintConfig();
  assert.ok(typeof cfg === "object" && cfg !== null, "config should be an object");
  assert.ok("lockfilePath" in cfg, "should have lockfilePath");
  assert.ok("type" in cfg, "should have type");
  assert.ok("validateHttps" in cfg, "should have validateHttps");
  assert.ok("validateIntegrity" in cfg, "should have validateIntegrity");
  assert.ok("allowedHosts" in cfg, "should have allowedHosts");
});

test("getLockfileLintConfig: lockfilePath points to package-lock.json", () => {
  const cfg = getLockfileLintConfig();
  assert.ok(
    cfg.lockfilePath.endsWith("package-lock.json"),
    `lockfilePath should end with package-lock.json, got: ${cfg.lockfilePath}`
  );
});

test("getLockfileLintConfig: type is npm", () => {
  const cfg = getLockfileLintConfig();
  assert.equal(cfg.type, "npm");
});

test("getLockfileLintConfig: validateHttps is true (HTTPS enforcement)", () => {
  const cfg = getLockfileLintConfig();
  assert.equal(cfg.validateHttps, true, "HTTPS enforcement must be enabled");
});

test("getLockfileLintConfig: validateIntegrity is true (integrity enforcement)", () => {
  const cfg = getLockfileLintConfig();
  assert.equal(cfg.validateIntegrity, true, "integrity validation must be enabled");
});

test("getLockfileLintConfig: allowedHosts includes npm (official registry)", () => {
  const cfg = getLockfileLintConfig();
  assert.ok(Array.isArray(cfg.allowedHosts), "allowedHosts should be an array");
  assert.ok(
    cfg.allowedHosts.includes("npm"),
    "npm must be in allowedHosts (covers registry.npmjs.org)"
  );
});

test("getLockfileLintConfig: no http:// hosts in allowedHosts", () => {
  const cfg = getLockfileLintConfig();
  for (const host of cfg.allowedHosts) {
    assert.ok(
      !host.startsWith("http://"),
      `allowedHosts must not contain http:// URLs, found: ${host}`
    );
  }
});

// ---------------------------------------------------------------------------
// buildLockfileLintArgs
// ---------------------------------------------------------------------------

test("buildLockfileLintArgs: includes --path and --type", () => {
  const cfg = getLockfileLintConfig();
  const args = buildLockfileLintArgs(cfg);
  assert.ok(args.includes("--path"), "args should include --path");
  assert.ok(args.includes("--type"), "args should include --type");
  const pathIdx = args.indexOf("--path");
  assert.equal(args[pathIdx + 1], cfg.lockfilePath);
  const typeIdx = args.indexOf("--type");
  assert.equal(args[typeIdx + 1], cfg.type);
});

test("buildLockfileLintArgs: includes --validate-https when validateHttps=true", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: true,
    validateIntegrity: false,
    allowedHosts: [],
  });
  assert.ok(args.includes("--validate-https"), "should include --validate-https");
});

test("buildLockfileLintArgs: omits --validate-https when validateHttps=false", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: false,
    allowedHosts: [],
  });
  assert.ok(!args.includes("--validate-https"), "should not include --validate-https");
});

test("buildLockfileLintArgs: includes --validate-integrity when validateIntegrity=true", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: true,
    allowedHosts: [],
  });
  assert.ok(args.includes("--validate-integrity"), "should include --validate-integrity");
});

test("buildLockfileLintArgs: omits --validate-integrity when validateIntegrity=false", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: false,
    allowedHosts: [],
  });
  assert.ok(!args.includes("--validate-integrity"), "should not include --validate-integrity");
});

test("buildLockfileLintArgs: includes --allowed-hosts and its values", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: false,
    allowedHosts: ["npm", "myprivatescope"],
  });
  assert.ok(args.includes("--allowed-hosts"), "should include --allowed-hosts");
  assert.ok(args.includes("npm"), "should include npm host");
  assert.ok(args.includes("myprivatescope"), "should include additional host");
});

test("buildLockfileLintArgs: omits --allowed-hosts when array is empty", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: false,
    allowedHosts: [],
  });
  assert.ok(!args.includes("--allowed-hosts"), "should not include --allowed-hosts when empty");
});

test("buildLockfileLintArgs: full config produces expected canonical args", () => {
  const cfg = getLockfileLintConfig();
  const args = buildLockfileLintArgs(cfg);
  // Must include all four enforcement flags
  assert.ok(args.includes("--validate-https"), "must enforce HTTPS");
  assert.ok(args.includes("--validate-integrity"), "must enforce integrity");
  assert.ok(args.includes("--allowed-hosts"), "must restrict hosts");
  assert.ok(args.includes("npm"), "npm must be an allowed host");
});

test("buildLockfileLintArgs: --allowed-hosts values follow immediately after the flag", () => {
  const args = buildLockfileLintArgs({
    lockfilePath: "/tmp/package-lock.json",
    type: "npm",
    validateHttps: false,
    validateIntegrity: false,
    allowedHosts: ["npm", "verdaccio"],
  });
  const hostIdx = args.indexOf("--allowed-hosts");
  assert.ok(hostIdx !== -1, "--allowed-hosts should be present");
  assert.equal(args[hostIdx + 1], "npm");
  assert.equal(args[hostIdx + 2], "verdaccio");
});

// ---------------------------------------------------------------------------
// workspace dependency consistency
// ---------------------------------------------------------------------------

test("getWorkspaceDependencyCheckCommand: checks every workspace at direct depth", () => {
  const command = getWorkspaceDependencyCheckCommand("linux");
  assert.deepEqual(command.args, ["ls", "--workspaces", "--depth=0", "--package-lock-only"]);
});

test("getWorkspaceDependencyCheckCommand: invokes npm directly outside Windows", () => {
  const command = getWorkspaceDependencyCheckCommand("linux");
  assert.equal(command.command, "npm");
});

test("getWorkspaceDependencyCheckCommand: invokes npm.cmd through cmd.exe on Windows", () => {
  const command = getWorkspaceDependencyCheckCommand("win32", "C:\\Windows\\System32\\cmd.exe");
  assert.equal(command.command, "C:\\Windows\\System32\\cmd.exe");
  assert.deepEqual(command.args, [
    "/d",
    "/s",
    "/c",
    "npm.cmd",
    "ls",
    "--workspaces",
    "--depth=0",
    "--package-lock-only",
  ]);
});

test("runWorkspaceDependencyCheck: executes the selected command and returns success", () => {
  const calls: unknown[][] = [];
  const result = runWorkspaceDependencyCheck({
    platform: "linux",
    execFile: (...args: unknown[]) => {
      calls.push(args);
      return "tree is valid";
    },
  });

  assert.deepEqual(result, { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.[0], "npm");
  assert.deepEqual(calls[0]?.[1], ["ls", "--workspaces", "--depth=0", "--package-lock-only"]);
});

test("runWorkspaceDependencyCheck: reports npm ls failures without masking diagnostics", () => {
  const failure = Object.assign(new Error("ELSPROBLEMS"), {
    stdout: "invalid playwright",
    stderr: "npm error code ELSPROBLEMS",
  });

  const result = runWorkspaceDependencyCheck({
    platform: "linux",
    execFile: () => {
      throw failure;
    },
  });

  assert.deepEqual(result, {
    ok: false,
    stdout: "invalid playwright",
    stderr: "npm error code ELSPROBLEMS",
  });
});

test("workspace check validates lock entries independently of node_modules", (t) => {
  const root = mkdtempSync(path.join(os.tmpdir(), "omniroute-lockfile-check-"));
  t.after(() => rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));
  mkdirSync(path.join(root, "packages", "example"), { recursive: true });
  writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify({ name: "root", version: "1.0.0", private: true, workspaces: ["packages/*"] })
  );
  writeFileSync(
    path.join(root, "packages", "example", "package.json"),
    JSON.stringify({ name: "example", version: "1.0.0", dependencies: { semver: "7.7.4" } })
  );
  const lock = {
    name: "root",
    version: "1.0.0",
    lockfileVersion: 3,
    requires: true,
    packages: {
      "": { name: "root", version: "1.0.0", workspaces: ["packages/*"] },
      "node_modules/example": { resolved: "packages/example", link: true },
      "node_modules/semver": { version: "7.6.0" },
      "packages/example": {
        name: "example",
        version: "1.0.0",
        dependencies: { semver: "7.7.4" },
      },
    },
  };
  const lockPath = path.join(root, "package-lock.json");
  writeFileSync(lockPath, JSON.stringify(lock));

  const command = getWorkspaceDependencyCheckCommand(process.platform, process.env.ComSpec);
  assert.throws(
    () =>
      execFileSync(command.command, command.args, {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }),
    (error: unknown) => {
      const diagnostics = `${String((error as { stdout?: string }).stdout ?? "")}\n${String(
        (error as { stderr?: string }).stderr ?? ""
      )}`;
      return /ELSPROBLEMS|invalid/i.test(diagnostics);
    }
  );

  lock.packages["node_modules/semver"].version = "7.7.4";
  writeFileSync(lockPath, JSON.stringify(lock));
  mkdirSync(path.join(root, "node_modules", "semver"), { recursive: true });
  writeFileSync(
    path.join(root, "node_modules", "semver", "package.json"),
    JSON.stringify({ name: "semver", version: "7.6.0" })
  );
  assert.doesNotThrow(() =>
    execFileSync(command.command, command.args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
  );
});
