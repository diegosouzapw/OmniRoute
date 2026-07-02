/**
 * Regression guard for #5006 — `/api/system/env/repair` 500s on packaged install.
 *
 * Root cause: `route.ts` statically imports `scripts/dev/sync-env.mjs`, so webpack
 * inlines it into the standalone route bundle. `sync-env.mjs` then ran
 * `createRequire(import.meta.url)` at TOP-LEVEL module scope — when bundled,
 * `import.meta.url` is frozen to the build-machine path
 * (`file:///home/runner/.../sync-env.mjs`), which `createRequire` rejects at runtime.
 * Because the throw happens during module evaluation (reached via the static import),
 * the whole route module fails to load → every hit returns HTTP 500 → onboarding breaks.
 *
 * The fix moves `createRequire` out of top-level scope into the single function that
 * needs `better-sqlite3` (guarded by the existing try/catch), and makes the root-dir
 * resolution tolerant of an unusable `import.meta.url` (falls back to `process.cwd()`),
 * so importing/evaluating the module — and calling its exports — never throws.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SYNC_ENV_PATH = fileURLToPath(new URL("../../scripts/dev/sync-env.mjs", import.meta.url));

const mod = (await import("../../scripts/dev/sync-env.mjs")) as {
  getEnvSyncPlan: (opts?: { rootDir?: string; scope?: string }) => {
    available: boolean;
    created: boolean;
    added: number;
    missingEntries: Array<{ key: string; value: string }>;
  };
  syncEnv: (opts?: { rootDir?: string; quiet?: boolean; scope?: string }) => {
    created: boolean;
    added: number;
  };
};

function writeOauthEnvExample(rootDir: string) {
  fs.writeFileSync(
    path.join(rootDir, ".env.example"),
    [
      "# ═══════════════════════════════════════════════════",
      "#   OAUTH PROVIDER CREDENTIALS",
      "# ═══════════════════════════════════════════════════",
      "CLAUDE_OAUTH_CLIENT_ID=claude-default",
      "CODEX_OAUTH_CLIENT_ID=codex-default",
      "# ─────────────────────────────────────────────────────────────────────────────",
      "# Provider User-Agent Overrides (optional)",
      "# ─────────────────────────────────────────────────────────────────────────────",
      "",
    ].join("\n"),
    "utf8"
  );
}

test("#5006: sync-env.mjs does not call createRequire at module top-level scope", () => {
  const source = fs.readFileSync(SYNC_ENV_PATH, "utf8");

  // A top-level `const require = createRequire(import.meta.url)` (column 0, no
  // leading indentation) is the exact crash vector: it runs during module
  // evaluation with a webpack-frozen `import.meta.url`. It must live inside a
  // function body / try-catch instead.
  assert.doesNotMatch(
    source,
    /^const\s+require\s*=\s*createRequire\s*\(/m,
    "createRequire(import.meta.url) must not run at top-level module scope (bundled import.meta.url is frozen → throws on module load → route 500)"
  );

  // `createRequire` is still used lazily where better-sqlite3 is needed — but only
  // from inside a function (every occurrence is indented, never column 0).
  for (const line of source.split(/\r?\n/)) {
    if (/createRequire\s*\(/.test(line)) {
      assert.match(
        line,
        /^\s+/,
        `createRequire must be called from inside a function (indented), found top-level: ${line}`
      );
    }
  }
});

test("#5006: getEnvSyncPlan(oauth) works with explicit rootDir and never throws on bad DATA_DIR", () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-5006-"));
  const origDataDir = process.env.DATA_DIR;
  try {
    writeOauthEnvExample(rootDir);
    // Point DATA_DIR at a dir with no real SQLite DB — exercises the
    // better-sqlite3 / createRequire path that used to crash at module load.
    process.env.DATA_DIR = rootDir;

    const plan = mod.getEnvSyncPlan({ rootDir, scope: "oauth" });

    assert.equal(plan.available, true);
    assert.equal(plan.added, 2);
    const keys = plan.missingEntries.map((e) => e.key);
    assert.deepEqual(keys.sort(), ["CLAUDE_OAUTH_CLIENT_ID", "CODEX_OAUTH_CLIENT_ID"]);
  } finally {
    process.env.DATA_DIR = origDataDir;
    fs.rmSync(rootDir, { recursive: true, force: true });
  }
});
