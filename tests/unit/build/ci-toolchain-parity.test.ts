import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { parse } from "yaml";

const root = new URL("../../../", import.meta.url);
const action = parse(
  readFileSync(new URL(".github/actions/npm-ci-retry/action.yml", root), "utf8")
);
const acceptance = parse(
  readFileSync(new URL(".github/workflows/release-acceptance.yml", root), "utf8")
);

test("release acceptance uses the repository's supported development runtime and installer", () => {
  const steps = acceptance.jobs.acceptance.steps;
  const setup = steps.find((step: { uses?: string }) =>
    step.uses?.startsWith("actions/setup-node@")
  );
  assert.equal(setup.with["node-version-file"], ".node-version");
  assert.ok(
    steps.some((step: { uses?: string }) => step.uses === "./.github/actions/npm-ci-retry")
  );
});

test("the exact npm version participates in dependency cache identity", () => {
  const cache = action.runs.steps.find((step: { id?: string }) => step.id === "node-modules");
  assert.match(cache.with.key, /steps\.npm\.outputs\.version/);
  assert.match(cache.with.key, /node-modules-v2-/);
  const bootstrap = action.runs.steps.findIndex((step: { id?: string }) => step.id === "npm");
  const restore = action.runs.steps.findIndex(
    (step: { id?: string }) => step.id === "node-modules"
  );
  assert.ok(
    bootstrap >= 0 && bootstrap < restore,
    "resolve the installer before restoring its tree"
  );
});

for (const fixture of [
  { initial: "11.15.0", installed: "11.15.0", installExit: 0, exit: 0, installs: 0 },
  { initial: "10.9.8", installed: "11.15.0", installExit: 0, exit: 0, installs: 1 },
  { initial: "10.9.8", installed: "11.15.0", installExit: 42, exit: 42, installs: 1 },
  { initial: "10.9.8", installed: "10.9.8", installExit: 0, exit: 1, installs: 1 },
]) {
  test(`npm bootstrap ${JSON.stringify(fixture)}`, () => {
    const dir = mkdtempSync(join(tmpdir(), "omni-npm-toolchain-"));
    try {
      mkdirSync(join(dir, "config/ci"), { recursive: true });
      writeFileSync(
        join(dir, "config/ci/toolchain.json"),
        readFileSync(new URL("config/ci/toolchain.json", root))
      );
      writeFileSync(join(dir, "version"), fixture.initial);
      writeFileSync(join(dir, "calls"), "");
      const run = action.runs.steps.find((step: { id?: string }) => step.id === "npm").run;
      const result = spawnSync(
        "bash",
        [
          "-euo",
          "pipefail",
          "-c",
          `
        npm() {
          if [ "$1" = "--version" ]; then cat version; return; fi
          printf '%s\\n' "$*" >> calls
          if [ "$FIXTURE_INSTALL_EXIT" != "0" ]; then return "$FIXTURE_INSTALL_EXIT"; fi
          printf '%s' "$FIXTURE_INSTALLED_VERSION" > version
        }
        ${run}
      `,
        ],
        {
          cwd: dir,
          encoding: "utf8",
          env: {
            ...process.env,
            FIXTURE_INSTALL_EXIT: String(fixture.installExit),
            FIXTURE_INSTALLED_VERSION: fixture.installed,
            GITHUB_OUTPUT: join(dir, "outputs"),
          },
        }
      );
      assert.equal(result.status, fixture.exit, result.stderr);
      const calls = readFileSync(join(dir, "calls"), "utf8").trim();
      assert.equal(calls ? calls.split("\n").length : 0, fixture.installs);
      if (fixture.installs)
        assert.match(calls, /^install --global npm@11\.15\.0 --no-audit --no-fund$/);
      if (fixture.exit === 0)
        assert.equal(readFileSync(join(dir, "outputs"), "utf8"), "version=11.15.0\n");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
