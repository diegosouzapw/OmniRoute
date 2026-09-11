import { test } from "node:test";
import assert from "node:assert/strict";

import {
  buildRunPlan,
  resolveRunTarget,
  resolveModelFromTargetOptions,
  runCliTarget,
} from "../../../bin/cli/commands/run.mjs";
import { logicalArgs } from "./_helpers/shellArgs.mjs";

test("resolveRunTarget resolves aliases", () => {
  assert.equal(resolveRunTarget("claude"), "claude");
  assert.equal(resolveRunTarget("CLAUDE-CODE"), "claude");
  assert.equal(resolveRunTarget("cc"), "claude");
  assert.equal(resolveRunTarget("codex"), "codex");
  assert.equal(resolveRunTarget("codex-cli"), "codex");
  assert.equal(resolveRunTarget("openai-codex"), "codex");
  assert.equal(resolveRunTarget("openai"), "codex");
  assert.equal(resolveRunTarget("anthropic"), "claude");
  assert.equal(resolveRunTarget("unknown"), undefined);
});

test("resolveModelFromTargetOptions prefixes provider", () => {
  assert.equal(resolveModelFromTargetOptions({ provider: "glm", model: "glm-4.5" }), "glm/glm-4.5");
  assert.equal(
    resolveModelFromTargetOptions({ provider: "glm", model: "glm/glm-4.5" }),
    "glm/glm-4.5"
  );
  assert.equal(resolveModelFromTargetOptions({ model: "glm/glm-4.5" }), "glm/glm-4.5");
  assert.equal(resolveModelFromTargetOptions({ provider: "glm" }), "");
});

test("buildRunPlan for claude includes env diff and model injection", async () => {
  const plan = await buildRunPlan(
    "claude",
    { port: "20128", apiKey: "sk_test_x", model: "gpt-5" },
    ["--help"]
  );
  assert.equal(plan.target, "claude");
  assert.equal(plan.baseUrl, "http://localhost:20128");
  assert.equal(plan.model, "gpt-5");
  assert.equal(logicalArgs(plan.args).includes("--help"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("ANTHROPIC_AUTH_TOKEN"), true);
  assert.equal(plan.authSource, "option");
  assert.equal(plan.command.includes("claude"), true);
});

test("buildRunPlan for codex injects model into provider args", async () => {
  const plan = await buildRunPlan(
    "codex",
    { baseUrl: "http://localhost:20128", apiKey: "sk_test_x", model: "glm/glm-4.5" },
    ["--help"]
  );
  assert.equal(plan.target, "codex");
  assert.equal(plan.baseUrl, "http://localhost:20128");
  assert.equal(plan.model, "glm/glm-4.5");
  assert.equal(logicalArgs(plan.args).includes("--help"), true);
  assert.equal(
    logicalArgs(plan.args).some((a) => a.includes("model_providers.omniroute.model")),
    true
  );
  assert.equal(plan.authSource, "option");
});

test("buildRunPlan for Aider uses its OpenAI-compatible root endpoint", async () => {
  const plan = await buildRunPlan(
    "aider",
    { remote: "https://relay.example.test/v1", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["--message", "reply OK"]
  );
  assert.equal(plan.target, "aider");
  assert.equal(plan.baseUrl, "https://relay.example.test");
  assert.deepEqual(logicalArgs(plan.args).slice(0, 2), ["--model", "openai/glm/glm-5.2"]);
  assert.equal(plan.envDiff.changedOrAdded.includes("OPENAI_API_BASE"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("OPENAI_API_KEY"), true);
});

test("buildRunPlan for Goose injects provider and model without writing config", async () => {
  const plan = await buildRunPlan(
    "goose-cli",
    { baseUrl: "http://localhost:20128", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["session"]
  );
  assert.equal(plan.target, "goose");
  assert.deepEqual(logicalArgs(plan.args), ["session"]);
  assert.equal(plan.envDiff.changedOrAdded.includes("GOOSE_PROVIDER"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("GOOSE_MODEL"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("OPENAI_HOST"), true);
});

test("buildRunPlan for OpenCode uses an ephemeral compatible config", async () => {
  const plan = await buildRunPlan(
    "open-code",
    { baseUrl: "https://relay.example.test", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["run", "reply OK"]
  );
  assert.equal(plan.target, "opencode");
  assert.deepEqual(logicalArgs(plan.args).slice(0, 2), ["--model", "omniroute/glm/glm-5.2"]);
  assert.equal(plan.envDiff.changedOrAdded.includes("OPENCODE_CONFIG_CONTENT"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("OMNIROUTE_API_KEY"), true);
  assert.equal(plan.configOverlay, "OPENCODE_CONFIG_CONTENT (process environment only)");
  assert.equal(JSON.stringify(plan).includes("sk_test_x"), false);
});

test("buildRunPlan for Qwen requires a deterministic model and injects only env names", async () => {
  const plan = await buildRunPlan(
    "qwen-code",
    { baseUrl: "https://relay.example.test", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["-p", "reply OK"]
  );
  assert.equal(plan.target, "qwen");
  assert.deepEqual(logicalArgs(plan.args).slice(0, 2), ["--model", "glm/glm-5.2"]);
  assert.equal(plan.envDiff.changedOrAdded.includes("OMNIROUTE_API_KEY"), true);
  assert.equal(plan.configOverlay, "temporary QWEN_HOME (removed after exit)");
  await assert.rejects(
    () => buildRunPlan("qwen", { baseUrl: "https://relay.example.test", apiKey: "sk_test_x" }),
    /requires --model/
  );
});

test("buildRunPlan for Gemini points the CLI at the /v1beta surface via env", async () => {
  const plan = await buildRunPlan(
    "gemini-cli",
    { baseUrl: "https://relay.example.test", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["-p", "reply OK"]
  );
  assert.equal(plan.target, "gemini");
  assert.equal(plan.baseUrl, "https://relay.example.test");
  assert.deepEqual(logicalArgs(plan.args).slice(0, 2), ["--model", "glm/glm-5.2"]);
  assert.equal(plan.envDiff.changedOrAdded.includes("GOOGLE_GEMINI_BASE_URL"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("GEMINI_API_KEY"), true);
  assert.equal(plan.envDiff.changedOrAdded.includes("GEMINI_DEFAULT_AUTH_TYPE"), true);
  assert.equal(plan.configOverlay, "temporary GEMINI_CLI_HOME (removed after exit)");
  assert.equal(JSON.stringify(plan).includes("sk_test_x"), false);
});

test("runCliTarget returns usage error code for unsupported targets", async () => {
  const seen = [];
  const originalWrite = process.stderr.write;
  // @ts-ignore
  process.stderr.write = (chunk) => {
    seen.push(String(chunk));
    return true;
  };

  const code = await runCliTarget("nope", {}, ["--help"]);

  // @ts-ignore
  process.stderr.write = originalWrite;
  assert.equal(code, 2);
  assert.equal(seen.length > 0, true);
  assert.match(seen.join(""), /Unsupported target/);
});

test("dry-run --json does not print resolved auth token", async () => {
  const chunks = [];
  const originalStdout = process.stdout.write;
  // @ts-ignore
  process.stdout.write = (chunk) => {
    chunks.push(String(chunk));
    return true;
  };

  const code = await runCliTarget(
    "claude",
    { dryRun: true, json: true, apiKey: "sk_live_very_private_token", model: "gpt-5" },
    []
  );

  // @ts-ignore
  process.stdout.write = originalStdout;
  assert.equal(code, 0);
  const raw = chunks.join("");
  assert.equal(raw.includes("sk_live_very_private_token"), false);
});

test("--api-key-env resolves credentials without exposing their value in the plan", async () => {
  const previous = process.env.OMNIROUTE_RUN_TEST_TOKEN;
  process.env.OMNIROUTE_RUN_TEST_TOKEN = "sk_env_private";
  try {
    const plan = await buildRunPlan("codex-cli", { apiKeyEnv: "OMNIROUTE_RUN_TEST_TOKEN" });
    assert.equal(plan.authSource, "env");
    assert.equal(plan.envDiff.changedOrAdded.includes("OMNIROUTE_API_KEY"), true);
    assert.equal(JSON.stringify(plan).includes("sk_env_private"), false);
  } finally {
    if (previous === undefined) delete process.env.OMNIROUTE_RUN_TEST_TOKEN;
    else process.env.OMNIROUTE_RUN_TEST_TOKEN = previous;
  }
});

test("buildRunPlan for Oh My Pi resolves aliases, injects model flag once, and leaks no token", async () => {
  for (const alias of ["omp", "oh-my-pi", "ohmypi"]) {
    assert.equal(resolveRunTarget(alias), "omp");
  }
  const plan = await buildRunPlan(
    "oh-my-pi",
    { baseUrl: "https://relay.example.test", apiKey: "sk_test_x", model: "glm/glm-5.2" },
    ["-p", "reply OK"]
  );
  assert.equal(plan.target, "omp");
  assert.equal(plan.command, "omp");
  const args = logicalArgs(plan.args);
  assert.deepEqual(args.slice(0, 2), ["--model", "omniroute/glm/glm-5.2"]);
  assert.equal(args.filter((arg) => arg === "--model").length, 1);
  assert.equal(args.filter((arg) => String(arg).startsWith("omniroute/omniroute/")).length, 0);
  assert.equal(plan.envDiff.changedOrAdded.includes("OMNIROUTE_API_KEY"), true);
  assert.equal(plan.configOverlay, "temporary OMP home (removed after exit)");
  assert.equal(JSON.stringify(plan).includes("sk_test_x"), false);
});

test("buildRunPlan for Oh My Pi never double-prefixes an already-prefixed model", async () => {
  const plan = await buildRunPlan(
    "omp",
    { baseUrl: "https://relay.example.test", apiKey: "sk_test_x", model: "omniroute/glm/glm-5.2" },
    ["-p", "reply OK"]
  );
  const args = logicalArgs(plan.args);
  assert.deepEqual(args.slice(0, 2), ["--model", "omniroute/glm/glm-5.2"]);
  assert.equal(args.filter((arg) => arg === "--model").length, 1);
});
