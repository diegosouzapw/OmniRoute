import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Regression guard for the startup-banner version line (#5752).
 *
 * `runServe` prints `v<version>` under the ASCII banner. The version is parsed
 * once at module load from the repo-root package.json. These source-inspection
 * assertions (same technique as cli-serve-port.test.ts) ensure the banner never
 * silently loses the version again — mirroring how the CLI is exercised without
 * spawning a real server.
 */
const serveSource = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../bin/cli/commands/serve.mjs"),
  "utf-8",
);

test("serve banner: version is parsed from package.json at module load", () => {
  assert.match(
    serveSource,
    /_pkg\s*=\s*JSON\.parse\(\s*readFileSync\(/,
    "serve.mjs should parse the version from package.json into _pkg",
  );
  assert.ok(
    serveSource.includes("package.json"),
    "serve.mjs should reference package.json for the version source",
  );
});

test("serve banner: startup banner prints v<version>", () => {
  assert.match(
    serveSource,
    /v\$\{_pkg\.version\}/,
    "serve.mjs should print v${_pkg.version} in the startup banner",
  );
});
