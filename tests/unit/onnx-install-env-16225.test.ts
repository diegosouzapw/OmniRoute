import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = fileURLToPath(new URL("../../", import.meta.url));
const parserPath = join(root, "node_modules/onnxruntime-node/script/install-utils.js");
const action = parse(
  readFileSync(join(root, ".github/actions/npm-ci-retry/action.yml"), "utf8")
) as { runs: { steps: Array<{ name?: string; env?: Record<string, string>; run?: string }> } };

type Observation = { value: boolean | null; isUndefined: boolean };

const checkedNpm = new Set<string>();

function npmCommand(env: NodeJS.ProcessEnv) {
  const cli = env.npm_execpath;
  if (cli) assert.ok(existsSync(cli), "npm_execpath must point to an existing npm CLI");
  const command = cli ? process.execPath : process.platform === "win32" ? "cmd.exe" : "npm";
  const prefix = cli ? [cli] : process.platform === "win32" ? ["/d", "/s", "/c", "npm"] : [];
  const identity = JSON.stringify([command, prefix]);
  if (!checkedNpm.has(identity)) {
    const expected = JSON.parse(readFileSync(join(root, "config/ci/toolchain.json"), "utf8")).npm;
    const version = spawnSync(command, [...prefix, "--version"], {
      env,
      encoding: "utf8",
      timeout: 15_000,
    });
    assert.equal(version.error, undefined, "npm must be available through npm_execpath or PATH");
    assert.equal(version.status, 0, version.stderr);
    assert.equal(version.stdout.trim(), expected, `use the repository's pinned npm ${expected}`);
    checkedNpm.add(identity);
  }
  return { command, prefix };
}

function writeActionBoundary(dir: string, shell: string) {
  writeFileSync(
    join(dir, "action.sh"),
    `
npm() {
  test "$1" = "ci" || return 97
  if [ -n "$ONNX_FIXTURE_NPM" ]; then
    "$ONNX_FIXTURE_NODE" "$ONNX_FIXTURE_NPM" run postinstall --offline --ignore-scripts=false --no-audit --no-fund
  else
    command npm run postinstall --offline --ignore-scripts=false --no-audit --no-fund
  fi
}
sleep() { return 98; }
` + shell
  );
}

function parserProbe(
  extraEnv: Record<string, string>,
  lifecycle: boolean | string = false
): Observation {
  const dir = mkdtempSync(join(tmpdir(), "onnx-env-16225-"));
  try {
    const output = join(dir, "observation.json");
    writeFileSync(
      join(dir, "parser-probe.cjs"),
      `const { parseInstallFlag } = require(process.env.ONNX_FIXTURE_PARSER);
require("node:assert/strict").equal(process.execPath, process.env.ONNX_FIXTURE_NODE);
const value = parseInstallFlag();
require("node:fs").writeFileSync(process.env.ONNX_FIXTURE_OUTPUT,
  JSON.stringify({ value: value ?? null, isUndefined: value === undefined }));
`
    );
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({
        name: "onnx-env-local-fixture",
        private: true,
        scripts: { postinstall: "node parser-probe.cjs" },
      })
    );
    const env = { ...process.env };
    for (const key of Object.keys(env)) {
      if (key.toLowerCase().includes("onnxruntime")) delete env[key];
    }
    Object.assign(env, extraEnv, {
      ONNX_FIXTURE_PARSER: parserPath,
      ONNX_FIXTURE_OUTPUT: output,
      ONNX_FIXTURE_NODE: process.execPath,
      PATH: dirname(process.execPath) + delimiter + (env.PATH ?? ""),
    });
    const npm = lifecycle ? npmCommand(env) : undefined;
    const args = npm
      ? [
          ...npm.prefix,
          "run",
          "postinstall",
          "--offline",
          "--ignore-scripts=false",
          "--no-audit",
          "--no-fund",
        ]
      : [join(dir, "parser-probe.cjs")];
    if (typeof lifecycle === "string") {
      writeActionBoundary(dir, lifecycle);
      env.ONNX_FIXTURE_NPM = env.npm_execpath ?? "";
    }
    const result = spawnSync(
      typeof lifecycle === "string" ? "bash" : (npm?.command ?? process.execPath),
      typeof lifecycle === "string" ? ["--noprofile", "--norc", join(dir, "action.sh")] : args,
      {
        cwd: dir,
        env,
        encoding: "utf8",
        timeout: 15_000,
      }
    );
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr);
    return JSON.parse(readFileSync(output, "utf8")) as Observation;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

for (const fixture of [
  {
    name: "explicit skip without npm custom config",
    env: { ONNXRUNTIME_NODE_INSTALL: "skip" },
    value: false,
  },
  { name: "unset flags retain the upstream default", env: {}, value: undefined },
  {
    name: "legacy custom config still skips",
    env: { npm_config_onnxruntime_node_install: "skip" },
    value: false,
  },
  {
    name: "explicit skip precedes custom true",
    env: { ONNXRUNTIME_NODE_INSTALL: "skip", npm_config_onnxruntime_node_install: "true" },
    value: false,
  },
  {
    name: "explicit true precedes custom skip",
    env: { ONNXRUNTIME_NODE_INSTALL: "true", npm_config_onnxruntime_node_install: "skip" },
    value: true,
  },
]) {
  test(`ONNX parser: ${fixture.name}`, () => {
    assert.deepEqual(parserProbe(fixture.env), {
      value: fixture.value ?? null,
      isUndefined: fixture.value === undefined,
    });
  });
}

test("npm lifecycle receives an explicit caller flag without a project npmrc", () => {
  assert.deepEqual(parserProbe({ ONNXRUNTIME_NODE_INSTALL: "skip" }, true), {
    value: false,
    isUndefined: false,
  });
});

test("the composite npm ci environment skips ONNX without npm custom config delivery", () => {
  const install = action.runs.steps.find((step) => step.name === "npm ci (with retry)");
  assert.ok(install, "the actual installation step must exist");
  assert.deepEqual(parserProbe(install.env ?? {}, true), {
    value: false,
    isUndefined: false,
  });
});

type InstallStep = {
  run?: string;
  env?: Record<string, string>;
  "working-directory"?: string;
};
type Workflow = {
  env?: Record<string, string>;
  defaults?: { run?: { "working-directory"?: string } };
  jobs: Record<
    string,
    {
      env?: Record<string, string>;
      defaults?: { run?: { "working-directory"?: string } };
      steps: InstallStep[];
    }
  >;
};

const directRootInstalls = [
  ["build", "build"],
  ["electron-release", "web-build"],
  ["electron-release", "build"],
  ["mutation-redundancy", "stryker-nobail"],
  ["nightly-llm-security", "promptfoo-guard"],
  ["nightly-llm-security", "garak"],
  ["nightly-mutation", "stryker"],
  ["nightly-property", "property-random-seed"],
  ["nightly-resilience", "heap"],
  ["nightly-resilience", "chaos"],
  ["nightly-resilience", "k6-soak"],
  ["nightly-resilience", "a11y"],
  ["nightly-schemathesis", "schemathesis"],
  ["radar-export", "publish-export"],
] as const;

function installEnvironment(workflow: Workflow, jobName: string, step: InstallStep) {
  const job = workflow.jobs[jobName];
  const cwd =
    step["working-directory"] ??
    job.defaults?.run?.["working-directory"] ??
    workflow.defaults?.run?.["working-directory"] ??
    ".";
  assert.equal(cwd, ".", "the recorded entrypoint must install the checkout root");
  return { ...workflow.env, ...job.env, ...step.env };
}

for (const [workflowName, jobName] of directRootInstalls) {
  test(`root install ${workflowName}/${jobName} delivers skip to npm lifecycle`, () => {
    const workflow = parse(
      readFileSync(join(root, ".github/workflows", `${workflowName}.yml`), "utf8")
    ) as Workflow;
    const step = workflow.jobs[jobName].steps.find((entry) => entry.run?.trim() === "npm ci");
    assert.ok(step, "the audited npm ci root entrypoint must exist");
    const effective = installEnvironment(workflow, jobName, step);
    // Only the installation flag crosses this boundary: GitHub expressions and
    // secrets from unrelated job environment are not needed by this local probe.
    const flag = effective.ONNXRUNTIME_NODE_INSTALL;
    assert.deepEqual(
      parserProbe(flag === undefined ? {} : { ONNXRUNTIME_NODE_INSTALL: flag }, true),
      {
        value: false,
        isUndefined: false,
      }
    );
  });
}

test("the action source participates in the exact dependency cache identity", () => {
  const parsed = parse(
    readFileSync(join(root, ".github/actions/npm-ci-retry/action.yml"), "utf8")
  ) as {
    runs: { steps: Array<{ id?: string; with?: Record<string, string> }> };
  };
  const cache = parsed.runs.steps.find((step) => step.id === "node-modules");
  assert.ok(cache?.with);
  assert.ok(cache.with.key.includes("'.github/actions/npm-ci-retry/action.yml'"));
  assert.equal(cache.with["restore-keys"], undefined);
});

test("legacy npmrc compatibility remains while explicit caller delivery is added", () => {
  const lines = readFileSync(join(root, ".npmrc"), "utf8").split("\n");
  assert.ok(lines.includes("onnxruntime-node-install=skip"));
});

test("comments and environment on another step cannot supply the install flag", () => {
  const workflow = parse(`
# ONNXRUNTIME_NODE_INSTALL: skip
jobs:
  build:
    steps:
      - run: npm ci
      - run: echo finished
        env:
          ONNXRUNTIME_NODE_INSTALL: skip
`) as Workflow;
  assert.equal(
    installEnvironment(workflow, "build", workflow.jobs.build.steps[0]).ONNXRUNTIME_NODE_INSTALL,
    undefined
  );
});

test("step environment overrides job and workflow installation defaults", () => {
  const workflow: Workflow = {
    env: { ONNXRUNTIME_NODE_INSTALL: "skip" },
    jobs: { build: { env: { ONNXRUNTIME_NODE_INSTALL: "skip" }, steps: [] } },
  };
  const effective = installEnvironment(workflow, "build", {
    run: "npm ci",
    env: { ONNXRUNTIME_NODE_INSTALL: "true" },
  });
  assert.equal(parserProbe(effective).value, true);
});

test(
  "the actual composite shell carries its step environment into npm lifecycle",
  { skip: process.platform === "win32" && "composite Bash contract runs on the Linux runner" },
  () => {
    const install = action.runs.steps.find((step) => step.name === "npm ci (with retry)");
    assert.ok(install?.run);
    assert.deepEqual(parserProbe(install.env ?? {}, install.run), {
      value: false,
      isUndefined: false,
    });
  }
);

test("direct install flags do not become workflow or job defaults for downstream consumers", () => {
  for (const [workflowName, jobName] of directRootInstalls) {
    const workflow = parse(
      readFileSync(join(root, ".github/workflows", `${workflowName}.yml`), "utf8")
    ) as Workflow;
    assert.equal(workflow.env?.ONNXRUNTIME_NODE_INSTALL, undefined);
    assert.equal(workflow.jobs[jobName].env?.ONNXRUNTIME_NODE_INSTALL, undefined);
    for (const step of workflow.jobs[jobName].steps) {
      if (step.run?.trim() !== "npm ci")
        assert.equal(step.env?.ONNXRUNTIME_NODE_INSTALL, undefined);
    }
  }
});

test("only the composite installation step receives the explicit flag", () => {
  for (const step of action.runs.steps) {
    if (step.name !== "npm ci (with retry)")
      assert.equal(step.env?.ONNXRUNTIME_NODE_INSTALL, undefined);
  }
});

test("the excluded Docker checkout install explicitly disables lifecycle scripts", () => {
  const dockerfile = readFileSync(join(root, "Dockerfile"), "utf8");
  const command = dockerfile
    .split("\n")
    .find((line) => line.trim().startsWith("npm ci --include=optional"));
  assert.ok(command, "the audited checkout installation must remain identifiable");
  assert.ok(command.split(/\s+/).includes("--ignore-scripts"));
});
