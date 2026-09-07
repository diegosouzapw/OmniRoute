import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";
import { load } from "js-yaml";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const { scripts } = JSON.parse(
  readFileSync(new URL("../../../package.json", import.meta.url), "utf8")
) as {
  scripts: Record<string, string>;
};

for (const name of [
  "test:unit",
  "test:unit:ci",
  "test:unit:ci:shard",
  "test:unit:fast",
  "test:unit:shard:1",
  "test:unit:shard:2",
  "test:coverage:runner",
]) {
  test(`${name} keeps dashboard and serial files out of the main loader`, () => {
    const [main, dashboard] = scripts[name].split(" && ");
    const globs = main.match(/tests\/unit\/[^\s"']+/g) || [];
    assert.ok(globs.length > 0, "the main phase must still collect unit tests");
    const files = globSync(globs, { cwd: root });
    assert.ok(files.length > 0, "the test globs must resolve to real files");
    const wrongLoader = files.filter((file) => /^tests\/unit\/(dashboard|serial)\//.test(file));
    assert.deepEqual(wrongLoader, [], "special-loader tests must not run twice or under tsx/esm");
    assert.match(dashboard, /--import tsx(?:\s|$)/);
    assert.match(dashboard, /tests\/unit\/dashboard\/\*\*\/\*\.test\.ts/);
  });
}

const workflow = load(
  readFileSync(new URL("../../../.github/workflows/ci.yml", import.meta.url), "utf8")
) as {
  jobs: Record<
    string,
    {
      env?: Record<string, string>;
      strategy: { matrix: { shard: number[] } };
      steps: { run?: string; env?: Record<string, string> }[];
    }
  >;
};
const integrationJob = workflow.jobs["test-integration"];
const integrationTiers = ["test:integration", "test:integration:e2e", "test:integration:live"];

for (const name of integrationTiers) {
  test(`${name} runs once per CI shard with the local collector preserved`, () => {
    const ciName = `${name}:ci`;
    const steps = integrationJob.steps.filter((step) => step.run === `npm run ${ciName}`);
    assert.equal(steps.length, 1, `${ciName} must have exactly one CI step`);
    assert.ok(
      !integrationJob.steps.some((step) => step.run === `npm run ${name}`),
      "unsharded commands must not repeat the whole tier in each matrix job"
    );
    assert.deepEqual(integrationJob.strategy.matrix.shard, [1, 2]);
    const env = { ...integrationJob.env, ...steps[0].env };
    assert.equal(env.TEST_SHARD, "${{ matrix.shard }}/2");
    assert.equal(
      scripts[ciName]?.replace(" --test-shard=$TEST_SHARD", ""),
      scripts[name],
      "CI must run the same tests and isolation flags, adding only shard selection"
    );
  });
}

test("integration tiers collect disjoint, nonempty file sets", () => {
  const seen = new Set<string>();
  for (const name of integrationTiers) {
    const globs = scripts[name].match(/tests\/integration\/[^\s"']+/g) || [];
    const files = globSync(globs, { cwd: root });
    assert.ok(files.length > 0, `${name} must collect tests`);
    for (const file of files) {
      assert.ok(!seen.has(file), `${file} is collected by more than one integration tier`);
      seen.add(file);
    }
  }
});
