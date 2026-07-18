import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { isVersionFastPath } from "../../bin/cli/utils/versionFastPath.mjs";

const execFileAsync = promisify(execFile);

// argv shape is [node, script, ...args]
const argv = (...args: string[]) => ["node", "omniroute", ...args];

test("fast-path selector: bare --version/-V select the fast path", () => {
  assert.equal(isVersionFastPath(argv("--version")), true);
  assert.equal(isVersionFastPath(argv("-V")), true);
});

test("fast-path selector: --help does NOT select the fast path (help text is dynamic)", () => {
  assert.equal(isVersionFastPath(argv("--help")), false);
  assert.equal(isVersionFastPath(argv("-h")), false);
});

test("fast-path selector: extra args or a subcommand alongside --version fall through", () => {
  assert.equal(isVersionFastPath(argv("serve", "--version")), false);
  assert.equal(isVersionFastPath(argv("--version", "extra")), false);
  assert.equal(isVersionFastPath(argv("--lang", "en", "--version")), false);
});

test("fast-path selector: no args or a real command do not select the fast path", () => {
  assert.equal(isVersionFastPath(argv()), false);
  assert.equal(isVersionFastPath(argv("serve")), false);
});

test("fast-path selector: defensive on non-array input", () => {
  // @ts-expect-error intentional bad input
  assert.equal(isVersionFastPath(undefined), false);
});

test("omniroute CLI --version fast-path prints ONLY the version, skipping bootstrap output", async () => {
  const pkg = JSON.parse(
    readFileSync(join(process.cwd(), "package.json"), "utf8")
  ) as { version: string };

  const { stdout } = await execFileAsync(process.execPath, ["bin/omniroute.mjs", "--version"], {
    cwd: process.cwd(),
    env: { ...process.env, DATA_DIR: "" },
  });

  // Before the fast-path, env-file loading (loadEnvFile) runs ahead of Commander and
  // prints "Loaded env from ..." lines interleaved with the version — proving the full
  // bootstrap (tsx/esm polyfill, env loading, ~70-command Commander registration) ran
  // for a plain --version query. The fast-path must short-circuit before any of that,
  // so stdout is EXACTLY the version string and nothing else.
  assert.equal(stdout.trim(), pkg.version);
});
