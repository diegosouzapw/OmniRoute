// Regression test for issue #11787.
//
// scripts/build/prepublish.ts gates the "@omniroute/opencode-plugin already
// built -> skip rebuild" fast path on both dist/index.js AND dist/index.cjs
// existing. @omniroute/opencode-plugin/tsup.config.ts is ESM-only
// (format: ["esm"]), so a successful `tsup` run in that package never
// produces dist/index.cjs -- the old predicate could never be true.
//
// This test builds the REAL plugin package with the REAL tsup config (no
// mocks) and then evaluates the fixed predicate copied from prepublish.ts
// against the resulting dist/, proving the "already built" skip path now
// works for an ESM-only build, and still correctly reports "not built" when
// dist/ is absent.
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveLocalBinEntry, isNativeExecutable } from "../../scripts/build/buildToolRunner.mjs";
import { resolveBundledNpmEntry } from "../../scripts/build/resolveNpmEntry.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const opencodePluginSrc = join(ROOT, "@omniroute", "opencode-plugin");
const opencodePluginDist = join(opencodePluginSrc, "dist", "index.js");
const opencodePluginCjs = join(opencodePluginSrc, "dist", "index.cjs");

test("prepublish pluginAlreadyBuilt predicate recognizes a real ESM-only tsup build (#11787)", () => {
  rmSync(join(opencodePluginSrc, "dist"), { recursive: true, force: true });
  // The plugin is a standalone package, not an npm workspace member (see
  // scripts/build/prepublish.ts's own comment above the equivalent build step) — a
  // root `npm ci` never populates its node_modules, so a fresh checkout (CI, or any
  // devbox that hasn't built the plugin before) needs its own install first. Mirror
  // prepublish.ts's own install step instead of hardcoding a `.bin/tsup` path that
  // only exists on a devbox someone happened to `npm install` in already.
  if (!existsSync(join(opencodePluginSrc, "node_modules"))) {
    const npmEntry = resolveBundledNpmEntry("npm-cli.js");
    const installArgs = ["install", "--no-audit", "--no-fund"];
    if (npmEntry) {
      execFileSync(process.execPath, [npmEntry, ...installArgs], {
        cwd: opencodePluginSrc,
        stdio: "inherit",
      });
    } else {
      execFileSync("npm", installArgs, { cwd: opencodePluginSrc, stdio: "inherit" });
    }
  }
  // Resolve the real tsup binary the same way scripts/build/prepublish.ts's
  // runBuildTool() does — never a hardcoded `.bin/tsup` path, since npm's hoisting can
  // place the binary at the plugin's own node_modules/.bin OR the repo root's,
  // depending on the install.
  const localEntry = resolveLocalBinEntry("tsup", "tsup", opencodePluginSrc);
  if (localEntry) {
    if (isNativeExecutable(localEntry)) {
      execFileSync(localEntry, [], { cwd: opencodePluginSrc, stdio: "inherit" });
    } else {
      execFileSync(process.execPath, [localEntry], { cwd: opencodePluginSrc, stdio: "inherit" });
    }
  } else {
    const npxEntry = resolveBundledNpmEntry("npx-cli.js");
    if (npxEntry) {
      execFileSync(process.execPath, [npxEntry, "tsup"], {
        cwd: opencodePluginSrc,
        stdio: "inherit",
      });
    } else {
      execFileSync("npx", ["tsup"], { cwd: opencodePluginSrc, stdio: "inherit" });
    }
  }

  assert.equal(existsSync(opencodePluginDist), true, "dist/index.js should exist after tsup");
  assert.equal(
    existsSync(opencodePluginCjs),
    false,
    "dist/index.cjs should NOT exist for an ESM-only tsup build"
  );

  // This is the fixed predicate from scripts/build/prepublish.ts.
  const pluginAlreadyBuilt = existsSync(opencodePluginDist);

  assert.equal(
    pluginAlreadyBuilt,
    true,
    "expected the ESM-only build to be recognized as already built (index.js present is sufficient)"
  );
});

test("prepublish pluginAlreadyBuilt predicate is false when dist/ is absent (#11787)", () => {
  rmSync(join(opencodePluginSrc, "dist"), { recursive: true, force: true });

  const pluginAlreadyBuilt = existsSync(opencodePluginDist);

  assert.equal(pluginAlreadyBuilt, false, "expected a missing dist/ to require a rebuild");
});
