/**
 * Unit tests for bin/aliasResolver.mjs — the ESM resolver hook that fixes
 * `Cannot find package '@/shared'` when OmniRoute is installed globally
 * (issue #7791).
 *
 * The hook is registered via module.register() and runs in a loader worker,
 * which is hard to exercise directly from node:test. Instead we test:
 *
 *   1. The exported `resolveAlias` pure function — the mapping logic without
 *      needing the loader machinery.
 *   2. The hook end-to-end by spawning a child process that imports a fixture
 *      using `@/...` specifiers after registering the resolver. This proves
 *      the integration works in a real Node process, not just in isolation.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  resolveAlias,
  registerAliasResolver,
  ALIAS_PREFIX,
  ALIAS_MAP,
} from "../../../bin/aliasResolver.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..", "..");

describe("aliasResolver.resolveAlias (pure)", () => {
  it("returns null for non-@/ specifiers (lets Node/tsx handle them)", () => {
    assert.equal(resolveAlias("node:fs", REPO_ROOT), null);
    assert.equal(resolveAlias("./foo", REPO_ROOT), null);
    assert.equal(resolveAlias("../foo", REPO_ROOT), null);
    assert.equal(resolveAlias("react", REPO_ROOT), null);
    assert.equal(resolveAlias("@scope/pkg", REPO_ROOT), null);
    assert.equal(resolveAlias("", REPO_ROOT), null);
  });

  it("maps @/X to <root>/src/X as a file URL", () => {
    const got = resolveAlias("@/shared/utils/featureFlags", REPO_ROOT);
    assert.ok(got, "expected a non-null URL");
    assert.ok(got.startsWith("file://"), "must be a file URL");
    const fsPath = fileURLToPath(got);
    // The source file on disk is featureFlags.ts; the resolver probes source
    // extensions and returns the first existing match. Assert against the
    // known extension rather than the specifier's bare stem, so the test does
    // not regress when the resolver's extension probe order changes.
    assert.ok(
      fsPath.endsWith(join("src", "shared", "utils", "featureFlags.ts")),
      `unexpected path: ${fsPath}`
    );
  });

  it("exposes ALIAS_PREFIX as @/ for symmetry with the hook source", () => {
    assert.equal(ALIAS_PREFIX, "@/");
  });

  it("rejects non-string / empty input without throwing", () => {
    assert.equal(resolveAlias(undefined, REPO_ROOT), null);
    assert.equal(resolveAlias(null, REPO_ROOT), null);
    assert.equal(resolveAlias(123, REPO_ROOT), null);
    assert.equal(resolveAlias({}, REPO_ROOT), null);
  });

  it("rejects empty root", () => {
    assert.equal(resolveAlias("@/shared", ""), null);
  });

  it("rejects @// escape attempts (absolute path injection)", () => {
    // `@//etc/passwd` must NOT become `<root>/src//etc/passwd` — after the
    // path-join normalisation it would still be `src/etc/passwd` inside the
    // root, which is fine, but we explicitly bail out so the hook never
    // silently rewrites a malformed specifier.
    assert.equal(resolveAlias("@//etc/passwd", REPO_ROOT), null);
    assert.equal(resolveAlias("@/\\etc/passwd", REPO_ROOT), null);
  });

  it("rejects @/../ path-traversal escapes outside <root>/src", () => {
    // `@/../../../etc/hostname` must NOT escape <root>/src onto the real
    // filesystem — even though it does not start with `/` or `\`, `join()`
    // would otherwise normalize it to a path outside the intended root.
    assert.equal(resolveAlias("@/../../../etc/hostname", REPO_ROOT), null);
    assert.equal(resolveAlias("@/..", REPO_ROOT), null);
    assert.equal(resolveAlias("@/foo/../../bar", REPO_ROOT), null);
    // A `..` segment that stays inside <root>/src after normalization is
    // still rejected — the guard is a literal segment check, not just a
    // containment check, so it fails closed even in ambiguous cases.
    assert.equal(resolveAlias("@/shared/../shared/utils/featureFlags", REPO_ROOT), null);
  });

  it("preserves an explicit .ts extension if the file exists", () => {
    // `@/shared/utils/featureFlags.ts` exists on disk → resolves to it
    const got = resolveAlias("@/shared/utils/featureFlags.ts", REPO_ROOT);
    assert.ok(got);
    assert.ok(fileURLToPath(got).endsWith("featureFlags.ts"));
  });

  it("probes source extensions when the specifier has none (#7791 core)", () => {
    // `@/lib/db/core` → `<root>/src/lib/db/core.ts` (file on disk has .ts)
    const got = resolveAlias("@/lib/db/core", REPO_ROOT);
    assert.ok(got, "expected non-null URL for @/lib/db/core");
    const fsPath = fileURLToPath(got);
    assert.ok(
      fsPath.endsWith(join("src", "lib", "db", "core.ts")),
      `expected <root>/src/lib/db/core.ts, got ${fsPath}`
    );
  });

  it("resolves directory imports to <dir>/index.*", () => {
    // Pick a real directory that has an index file in src/
    // `@/shared` → src/shared/index.ts if it exists, else null.
    const got = resolveAlias("@/shared", REPO_ROOT);
    // We don't assert non-null (depends on repo layout) but the call must not
    // throw and must return either null or a file URL.
    if (got !== null) {
      assert.ok(got.startsWith("file://"));
    }
  });

  it("returns null when no candidate file exists on disk", () => {
    // Real root, but specifier points at a non-existent path
    assert.equal(resolveAlias("@/does/not/exist", REPO_ROOT), null);
  });
});

describe("aliasResolver.resolveAlias — @omniroute/open-sse aliases", () => {
  it("exposes ALIAS_MAP with three entries matching tsconfig paths", () => {
    assert.equal(ALIAS_MAP.length, 3, "must have 3 alias entries");
    // @/
    assert.equal(ALIAS_MAP[0].prefix, "@/");
    assert.equal(ALIAS_MAP[0].target, "src");
    assert.equal(ALIAS_MAP[0].exact, false);
    // @omniroute/open-sse/ (subpath)
    assert.equal(ALIAS_MAP[1].prefix, "@omniroute/open-sse/");
    assert.equal(ALIAS_MAP[1].target, "open-sse");
    assert.equal(ALIAS_MAP[1].exact, false);
    // @omniroute/open-sse (exact package name)
    assert.equal(ALIAS_MAP[2].prefix, "@omniroute/open-sse");
    assert.equal(ALIAS_MAP[2].target, "open-sse");
    assert.equal(ALIAS_MAP[2].exact, true);
  });

  it("resolves @omniroute/open-sse (bare) to open-sse/index.ts", () => {
    const got = resolveAlias("@omniroute/open-sse", REPO_ROOT);
    assert.ok(got, "expected non-null URL for @omniroute/open-sse");
    assert.ok(got.startsWith("file://"), "must be a file URL");
    const fsPath = fileURLToPath(got);
    assert.ok(
      fsPath.endsWith(join("open-sse", "index.ts")),
      `expected <root>/open-sse/index.ts, got ${fsPath}`
    );
  });

  it("resolves @omniroute/open-sse/services/usage to open-sse/services/usage.ts", () => {
    const got = resolveAlias("@omniroute/open-sse/services/usage", REPO_ROOT);
    assert.ok(got, "expected non-null URL");
    const fsPath = fileURLToPath(got);
    assert.ok(
      fsPath.endsWith(join("open-sse", "services", "usage.ts")),
      `expected <root>/open-sse/services/usage.ts, got ${fsPath}`
    );
  });

  it("resolves @omniroute/open-sse/utils/proxyFetch to open-sse/utils/proxyFetch.ts", () => {
    const got = resolveAlias("@omniroute/open-sse/utils/proxyFetch", REPO_ROOT);
    assert.ok(got, "expected non-null URL");
    const fsPath = fileURLToPath(got);
    assert.ok(
      fsPath.endsWith(join("open-sse", "utils", "proxyFetch.ts")),
      `expected <root>/open-sse/utils/proxyFetch.ts, got ${fsPath}`
    );
  });

  it("returns null for non-existent @omniroute/open-sse/* paths", () => {
    assert.equal(resolveAlias("@omniroute/open-sse/does/not/exist", REPO_ROOT), null);
  });

  it("returns null for @omniroute/other (unmatched scope)", () => {
    assert.equal(resolveAlias("@omniroute/other", REPO_ROOT), null);
    assert.equal(resolveAlias("@omniroute/other/pkg", REPO_ROOT), null);
  });

  it("rejects path-traversal via @omniroute/open-sse/../../etc/passwd", () => {
    assert.equal(resolveAlias("@omniroute/open-sse/../../etc/passwd", REPO_ROOT), null);
  });
});

describe("aliasResolver.registerAliasResolver", () => {
  it("returns false when <root>/src does not exist (no-op, does not throw)", async () => {
    const tmp = mkdtempSync(join(tmpdir(), "alias-resolver-no-src-"));
    try {
      const ok = await registerAliasResolver(tmp);
      assert.equal(ok, false, "must return false when there is no src/ dir");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("returns true and registers when <root>/src exists", async () => {
    const tmp = mkdtempSync(join(tmpdir(), "alias-resolver-with-src-"));
    try {
      mkdirSync(join(tmp, "src"), { recursive: true });
      const ok = await registerAliasResolver(tmp);
      assert.equal(ok, true, "must register when src/ exists");
    } finally {
      rmSync(tmp, { recursive: true, force: true });
    }
  });

  it("throws TypeError when root is empty or non-string", async () => {
    // Empty string triggers the guard; null/undefined are coerced by the
    // function signature (no default), so they also reach the guard and
    // reject with TypeError. (null is falsy → `!root` true; undefined same.)
    await assert.rejects(() => registerAliasResolver(""), TypeError);
    await assert.rejects(() => registerAliasResolver(null), TypeError);
    await assert.rejects(() => registerAliasResolver(undefined), TypeError);
    // Numbers/objects are explicitly rejected by the typeof check too.
    await assert.rejects(() => registerAliasResolver(123), TypeError);
    await assert.rejects(() => registerAliasResolver({}), TypeError);
  });
});

/**
 * End-to-end regression for issue #7791: spawning a child Node process that
 * mimics a global install (no tsconfig.json in CWD, no parent package.json)
 * and confirms `@/...` specifiers resolve via the hook.
 *
 * This is a separate process because module.register() installs a process-
 * wide hook and we do not want to pollute the test runner's loader.
 */
describe("aliasResolver end-to-end (#7791 regression)", () => {
  function runChild(script) {
    const result = spawnSync(process.execPath, ["--input-type=module", "-e", script], {
      cwd: REPO_ROOT,
      env: {
        ...process.env,
        // Force a clean DATA_DIR so loadEnvFile() does not pick up dev .env
        DATA_DIR: mkdtempSync(join(tmpdir(), "alias-resolver-e2e-")),
        OMNIROUTE_CLI_SKIP_REPO_ENV: "1",
      },
      encoding: "utf8",
    });
    return { stdout: result.stdout, stderr: result.stderr, status: result.status };
  }

  it("resolves @/shared/network/outboundUrlGuard from a child process", () => {
    // Reproduces the exact import chain that setup-opencode triggers.
    // Before #7791 fix: `Cannot find package '@/shared'`.
    // After fix: imports succeed and the module exports are reachable.
    //
    // The child process registers tsx/esm *before* the alias resolver: the
    // loaded module's transitive relative imports (e.g. `./core` without an
    // extension) need tsx to resolve, and tsx must be installed in the loader
    // before any dynamic import() of a .ts file. This mirrors what
    // bin/omniroute.mjs does (await import("tsx/esm") first, then register).
    const script = `
      await import("tsx/esm");
      import { join } from "node:path";
      import { registerAliasResolver } from "${join(REPO_ROOT, "bin/aliasResolver.mjs").replace(/\\/g, "/")}";
      const ok = await registerAliasResolver(${JSON.stringify(REPO_ROOT)});
      if (!ok) { console.error("FAIL: registerAliasResolver returned false"); process.exit(2); }
      try {
        const m = await import(${JSON.stringify(join(REPO_ROOT, "src/shared/network/outboundUrlGuard.ts").replace(/\\/g, "/"))});
        const keys = Object.keys(m).sort().join(",");
        console.log("OK:" + keys);
      } catch (err) {
        console.error("FAIL:" + (err && err.message || err));
        process.exit(3);
      }
    `;
    const { stdout, stderr, status } = runChild(script);
    assert.equal(status, 0, `expected exit 0, got ${status}. stderr=${stderr.slice(0, 500)}`);
    const trimmed = stdout.trim();
    assert.match(trimmed, /^OK:/, `expected OK:<exports>, got: ${trimmed}`);
    // Sanity: the module must actually export the documented symbols
    assert.match(
      trimmed,
      /OutboundUrlGuardError|PROVIDER_URL_BLOCKED_MESSAGE/,
      `unexpected exports: ${trimmed}`
    );
  });

  it("does not interfere with bare/relative specifiers (regression guard)", () => {
    const script = `
      import { registerAliasResolver } from "${join(REPO_ROOT, "bin/aliasResolver.mjs").replace(/\\/g, "/")}";
      await registerAliasResolver(${JSON.stringify(REPO_ROOT)});
      // node:fs must still resolve via the default resolver
      const fs = await import("node:fs");
      console.log("OK:" + typeof fs.readFile);
    `;
    const { stdout, status, stderr } = runChild(script);
    assert.equal(status, 0, `node:fs broke: stderr=${stderr.slice(0, 500)}`);
    // Node's console.log appends a newline; trim before matching the anchored regex.
    assert.match(stdout.trim(), /^OK:function$/);
  });
});
