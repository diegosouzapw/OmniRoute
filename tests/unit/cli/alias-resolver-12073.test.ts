/**
 * RED regression coverage for issue #12073: Node 26 deprecates
 * module.register() in favor of the synchronous module.registerHooks() API.
 */
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { parseNodeVersion } from "../../../src/shared/utils/nodeRuntimeSupport.ts";

import { registerAliasResolver, resolveAlias } from "../../../bin/aliasResolver.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");
const NODE_VERSION = parseNodeVersion(process.versions.node);
const NODE_26_SKIP_REASON =
  `running Node ${process.versions.node}; DEP0205 assertion is unverified on this runtime ` +
  "(requires Node >= 26)";

// Child import() specifiers must be real file URLs. A Windows drive letter in
// a bare path would otherwise be parsed as a URL scheme.
const repoFileUrl = (relPath: string) => pathToFileURL(join(REPO_ROOT, relPath)).href;

function runChild(script: string, cwd = REPO_ROOT) {
  const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
    cwd,
    env: {
      ...process.env,
      DATA_DIR: mkdtempSync(join(tmpdir(), "alias-resolver-12073-")),
      OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
    },
    encoding: "utf8",
  });
  return { stdout: result.stdout, stderr: result.stderr, status: result.status };
}

describe("aliasResolver Node 26 registration (#12073)", () => {
  it(
    "uses the real entry point without emitting DEP0205",
    { skip: NODE_VERSION.major >= 26 ? false : NODE_26_SKIP_REASON },
    () => {
      const script = `
        await import("tsx/esm");
        const { registerAliasResolver } = await import(${JSON.stringify(repoFileUrl("bin/aliasResolver.mjs"))});
        const ok = await registerAliasResolver(${JSON.stringify(REPO_ROOT)});
        if (!ok) { console.error("FAIL: registerAliasResolver returned false"); process.exit(2); }
        try {
          const m = await import(${JSON.stringify(repoFileUrl("src/shared/network/outboundUrlGuard.ts"))});
          console.log("OK:" + Object.keys(m).sort().join(","));
        } catch (err) {
          console.error("FAIL:" + (err && err.message || err));
          process.exit(3);
        }
      `;
      const { stdout, stderr, status } = runChild(script);

      assert.equal(status, 0, `expected exit 0, got ${status}. stderr=${stderr.slice(0, 500)}`);
      assert.match(stdout.trim(), /^OK:/);
      assert.doesNotMatch(stderr, /DEP0205|DeprecationWarning/);
    }
  );

  it("keeps global-install-style alias imports working", () => {
    // A foreign cwd has no repository tsconfig or package.json to let tsx
    // resolve the bare alias by itself. This makes the import a tripwire for a
    // hook that registers without throwing but silently never runs.
    const globalInstallCwd = mkdtempSync(join(tmpdir(), "alias-resolver-global-install-"));
    try {
      const script = `
        await import(${JSON.stringify(repoFileUrl("node_modules/tsx/dist/esm/index.mjs"))});
        const { registerAliasResolver } = await import(${JSON.stringify(repoFileUrl("bin/aliasResolver.mjs"))});
        const ok = await registerAliasResolver(${JSON.stringify(REPO_ROOT)});
        if (!ok) { console.error("FAIL: registerAliasResolver returned false"); process.exit(2); }
        try {
          const m = await import("@/shared/network/outboundUrlGuard");
          console.log("OK:" + Object.keys(m).sort().join(","));
        } catch (err) {
          console.error("FAIL:" + (err && err.message || err));
          process.exit(3);
        }
      `;
      const { stdout, stderr, status } = runChild(script, globalInstallCwd);

      assert.equal(status, 0, `expected exit 0, got ${status}. stderr=${stderr.slice(0, 500)}`);
      const trimmed = stdout.trim();
      assert.match(trimmed, /^OK:/, `expected OK:<exports>, got: ${trimmed}`);
      assert.match(trimmed, /OutboundUrlGuardError|PROVIDER_URL_BLOCKED_MESSAGE/);
    } finally {
      rmSync(globalInstallCwd, {
        recursive: true,
        force: true,
        maxRetries: 5,
        retryDelay: 100,
      });
    }
  });

  it("retains module.register() for simulated legacy runtimes", () => {
    const script = `
      await import("tsx/esm");
      const { createRequire, syncBuiltinESMExports } = await import("node:module");
      const require = createRequire(import.meta.url);
      const cjsModule = require("node:module");
      const saved = cjsModule.registerHooks;
      try {
        cjsModule.registerHooks = undefined;
        syncBuiltinESMExports();
        const esmModule = await import("node:module");
        if (esmModule.registerHooks !== undefined) {
          console.error("FAIL: registerHooks was not blanked");
          process.exitCode = 2;
        } else {
          const { registerAliasResolver } = await import(${JSON.stringify(repoFileUrl("bin/aliasResolver.mjs"))});
          const ok = await registerAliasResolver(${JSON.stringify(REPO_ROOT)});
          const m = await import(${JSON.stringify(repoFileUrl("src/shared/network/outboundUrlGuard.ts"))});
          const hasExpectedExport = "OutboundUrlGuardError" in m || "PROVIDER_URL_BLOCKED_MESSAGE" in m;
          if (!ok || !hasExpectedExport) {
            console.error("FAIL: legacy registration did not resolve the alias");
            process.exitCode = 3;
          } else {
            console.log("OK:true:" + Object.keys(m).sort().join(","));
          }
        }
      } catch (err) {
        console.error("FAIL:" + (err && err.message || err));
        process.exitCode = 4;
      } finally {
        cjsModule.registerHooks = saved;
        syncBuiltinESMExports();
      }
    `;
    const { stdout, stderr, status } = runChild(script);

    assert.equal(status, 0, `expected exit 0, got ${status}. stderr=${stderr.slice(0, 500)}`);
    assert.match(stdout.trim(), /^OK:true:/);
    if (NODE_VERSION.major >= 26) {
      assert.match(stderr, /DEP0205|DeprecationWarning/);
    }
  });

  it("keeps idempotency, input validation, and traversal guards characterized", async () => {
    const noSrcRoot = mkdtempSync(join(tmpdir(), "alias-resolver-no-src-"));
    const emptySrcRoot = mkdtempSync(join(tmpdir(), "alias-resolver-empty-src-"));

    try {
      assert.equal(await registerAliasResolver(noSrcRoot), false);

      mkdirSync(join(emptySrcRoot, "src"), { recursive: true });
      assert.equal(await registerAliasResolver(emptySrcRoot), true);
      assert.equal(await registerAliasResolver(emptySrcRoot), true);

      await assert.rejects(() => registerAliasResolver(""), TypeError);
      await assert.rejects(() => registerAliasResolver(null), TypeError);
      await assert.rejects(() => registerAliasResolver(123), TypeError);

      assert.equal(resolveAlias("@/../../../etc/hostname", REPO_ROOT), null);
      assert.equal(resolveAlias("@omniroute/open-sse/../../etc/passwd", REPO_ROOT), null);
    } finally {
      rmSync(noSrcRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      rmSync(emptySrcRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
});
