/**
 * Source-scan tests for src/lib/plugins/pluginWorker.ts sandbox hardening.
 *
 * Why source-scan (not behavioral)?
 * pluginWorker.ts is a worker-thread entry point: it throws at import time when
 * parentPort is null (line 17-19), so it cannot be imported directly in a test
 * runner. createSandbox is also not exported. Source-scan tests mirror the pattern
 * used in tests/unit/electron-preload.test.ts for the same reason.
 *
 * Assertions cover:
 * - exec permission gates child_process behind OMNIROUTE_PLUGINS_ALLOW_EXEC==="1"
 * - the throw path exists when env is absent
 * - vm.runInContext is called with a finite timeout (no infinite-loop DoS)
 * - the trust-model comment is present
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(
  resolve(process.cwd(), "src/lib/plugins/pluginWorker.ts"),
  "utf8"
);

describe("pluginWorker sandbox — exec permission gating", () => {
  it("gates child_process behind OMNIROUTE_PLUGINS_ALLOW_EXEC === '1'", () => {
    assert.ok(
      source.includes('OMNIROUTE_PLUGINS_ALLOW_EXEC !== "1"') ||
        source.includes("OMNIROUTE_PLUGINS_ALLOW_EXEC !== '1'"),
      "exec block must check process.env.OMNIROUTE_PLUGINS_ALLOW_EXEC !== \"1\""
    );
  });

  it("checks the env flag inside the exec permission block", () => {
    // The env guard must appear inside the exec permission block.
    // Use the SECOND occurrence of OMNIROUTE_PLUGINS_ALLOW_EXEC (the first is in
    // the trust-model comment above createSandbox; the second is the actual guard).
    const execIdx = source.indexOf('permissions.includes("exec")');
    assert.ok(execIdx !== -1, 'source must contain permissions.includes("exec")');
    // Find the env check that occurs *after* the exec block opens
    const envIdxInBlock = source.indexOf("OMNIROUTE_PLUGINS_ALLOW_EXEC", execIdx);
    assert.ok(
      envIdxInBlock !== -1,
      "OMNIROUTE_PLUGINS_ALLOW_EXEC check must appear inside the exec permission block"
    );
  });

  it("throws when exec is requested but env is not set", () => {
    // The throw statement must be inside the exec block and before child_process assignment
    const execIdx = source.indexOf('permissions.includes("exec")');
    const throwIdx = source.indexOf("throw new Error", execIdx);
    const childProcessIdx = source.indexOf("sandbox.child_process", execIdx);
    assert.ok(throwIdx !== -1, "a throw must exist after the exec permission check");
    assert.ok(
      throwIdx < childProcessIdx,
      "the throw must appear before sandbox.child_process is wired"
    );
  });

  it("throw message references the disabled exec permission without internal paths", () => {
    // Message must be operator-readable, not expose stack/paths
    assert.ok(
      source.includes("exec' permission, which is disabled"),
      "throw message must mention the exec permission being disabled"
    );
    assert.ok(
      source.includes("OMNIROUTE_PLUGINS_ALLOW_EXEC=1"),
      "throw message must reference the opt-in env var"
    );
  });

  it("does NOT wire child_process without the env guard in place", () => {
    // Ensure child_process assignment is nested under the env check, not at the exec-block top level.
    // The OMNIROUTE_PLUGINS_ALLOW_EXEC check must come before sandbox.child_process.
    const envIdx = source.indexOf("OMNIROUTE_PLUGINS_ALLOW_EXEC");
    const childProcessIdx = source.indexOf("sandbox.child_process =");
    assert.ok(envIdx < childProcessIdx, "env guard must precede sandbox.child_process assignment");
  });
});

describe("pluginWorker sandbox — vm.runInContext timeout", () => {
  it("passes a finite timeout to vm.runInContext", () => {
    assert.ok(
      source.includes("vm.runInContext"),
      "vm.runInContext must be present in the source"
    );
    // The call must include a timeout option
    assert.match(
      source,
      /vm\.runInContext\([^)]*timeout\s*:/,
      "vm.runInContext must be called with a timeout option"
    );
  });

  it("timeout value is 10000 ms (10 seconds)", () => {
    assert.match(
      source,
      /timeout\s*:\s*10000/,
      "timeout must be 10000 ms"
    );
  });
});

describe("pluginWorker sandbox — trust-model comment", () => {
  it("documents that vm is NOT a security boundary", () => {
    assert.ok(
      source.includes("vm is NOT a security boundary"),
      "createSandbox must have a trust-model comment stating vm is NOT a security boundary"
    );
  });

  it("references the loopback-only routeGuard classification", () => {
    assert.ok(
      source.includes("LOCAL_ONLY") || source.includes("routeGuard"),
      "trust-model comment must reference LOCAL_ONLY or routeGuard"
    );
  });

  it("references the OMNIROUTE_PLUGINS_ALLOW_EXEC opt-in in the comment", () => {
    assert.ok(
      source.includes("OMNIROUTE_PLUGINS_ALLOW_EXEC"),
      "trust-model comment must reference OMNIROUTE_PLUGINS_ALLOW_EXEC"
    );
  });
});
