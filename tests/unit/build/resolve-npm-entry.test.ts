/**
 * #8858 follow-up — `resolveBundledNpmEntry` only knew the WINDOWS npm layout
 * (`<dir(node.exe)>\node_modules\npm\bin\...`). On POSIX installs (GitHub
 * hosted runners, nvm, system node) npm lives at
 * `<prefix>/lib/node_modules/npm/bin/...` while node is `<prefix>/bin/node`,
 * so the resolver returned null and `npm run build:cli` (Fast Production
 * Build, dast-smoke) failed on every fresh CI checkout with
 * "npm-cli.js not found next to the running Node binary".
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveBundledNpmEntry } from "../../../scripts/build/resolveNpmEntry.ts";

const POSIX_PREFIX = "/opt/hostedtoolcache/node/24.18.0/x64";
const POSIX_NODE = `${POSIX_PREFIX}/bin/node`;
const POSIX_NPM_CLI = `${POSIX_PREFIX}/lib/node_modules/npm/bin/npm-cli.js`;

const WIN_STYLE_DIR = "/fake/nodejs"; // Windows layout shape (npm beside the binary)
const WIN_STYLE_NODE = `${WIN_STYLE_DIR}/node.exe`;
const WIN_STYLE_NPM_CLI = `${WIN_STYLE_DIR}/node_modules/npm/bin/npm-cli.js`;

test("POSIX layout: finds npm-cli.js under <prefix>/lib/node_modules (hosted runner shape)", () => {
  const resolved = resolveBundledNpmEntry("npm-cli.js", {
    execPath: POSIX_NODE,
    npmExecPath: undefined,
    exists: (p) => p === POSIX_NPM_CLI,
  });
  assert.equal(resolved, POSIX_NPM_CLI);
});

test("Windows layout: still finds npm-cli.js beside the node binary", () => {
  const resolved = resolveBundledNpmEntry("npm-cli.js", {
    execPath: WIN_STYLE_NODE,
    npmExecPath: undefined,
    exists: (p) => p === WIN_STYLE_NPM_CLI,
  });
  assert.equal(resolved, WIN_STYLE_NPM_CLI);
});

test("npm_execpath (set by `npm run`) wins and resolves npx-cli.js as its sibling", () => {
  const npmExecPath = `${POSIX_PREFIX}/lib/node_modules/npm/bin/npm-cli.js`;
  const npxSibling = `${POSIX_PREFIX}/lib/node_modules/npm/bin/npx-cli.js`;
  const resolved = resolveBundledNpmEntry("npx-cli.js", {
    execPath: POSIX_NODE,
    npmExecPath,
    exists: (p) => p === npxSibling,
  });
  assert.equal(resolved, npxSibling);
});

test("returns null when no layout matches", () => {
  const resolved = resolveBundledNpmEntry("npm-cli.js", {
    execPath: POSIX_NODE,
    npmExecPath: undefined,
    exists: () => false,
  });
  assert.equal(resolved, null);
});

test("live environment: the real node install can resolve npm-cli.js (POSIX regression guard)", (t) => {
  if (process.platform === "win32") {
    t.skip("POSIX-only live check");
    return;
  }
  const resolved = resolveBundledNpmEntry("npm-cli.js");
  assert.ok(
    resolved,
    `real install must resolve npm-cli.js (execPath=${process.execPath}) — the #8858 resolver returned null on POSIX`
  );
});
