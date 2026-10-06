import test from "node:test";
import assert from "node:assert/strict";
import { Command, Option } from "commander";

import { mergeSetupOptions } from "../../../bin/cli/commands/setup.mjs";

/**
 * Reproduces the flag shape of the real CLI: bin/cli/program.mjs declares a
 * program-level `--api-key` (OmniRoute server key) and bin/cli/commands/setup.mjs
 * declares its own `--api-key` (provider key).
 */
function parseSetupArgv(argv: string[]) {
  const program = new Command();
  program.exitOverride();
  program.addOption(new Option("--api-key <key>", "server key").env("OMNIROUTE_API_KEY"));
  program.addOption(new Option("--output <format>", "output").default("table"));

  let captured: Record<string, unknown> | null = null;
  program
    .command("setup")
    .exitOverride()
    .option("--api-key <value>", "Provider API key")
    .option("--add-provider", "Add an API-key provider connection")
    .option("--provider <id>", "Provider id")
    .option("--non-interactive", "Read all inputs from flags")
    .action((opts, cmd) => {
      captured = mergeSetupOptions(opts, cmd.optsWithGlobals());
    });

  program.parse(["node", "omniroute", ...argv]);
  return captured as unknown as Record<string, unknown>;
}

test("setup --api-key reaches runSetupCommand despite the program-level --api-key", () => {
  const merged = parseSetupArgv([
    "setup",
    "--non-interactive",
    "--add-provider",
    "--provider",
    "openrouter",
    "--api-key",
    "sk-or-v1-example",
  ]);

  // Regression: Commander binds the value to the program-level option, so the
  // subcommand's own opts.apiKey is undefined and setup aborted with
  // "Provider API key is required" even though --api-key was supplied.
  assert.equal(merged.apiKey, "sk-or-v1-example");
  assert.equal(merged.provider, "openrouter");
  assert.equal(merged.addProvider, true);
});

test("OMNIROUTE_API_KEY satisfies the provider key the error message advertises", () => {
  const original = process.env.OMNIROUTE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "sk-from-env";
  try {
    const merged = parseSetupArgv(["setup", "--non-interactive", "--add-provider"]);
    assert.equal(merged.apiKey, "sk-from-env");
  } finally {
    if (original === undefined) delete process.env.OMNIROUTE_API_KEY;
    else process.env.OMNIROUTE_API_KEY = original;
  }
});

test("an explicit subcommand value wins over the program-level one", () => {
  const merged = mergeSetupOptions(
    { apiKey: "subcommand-value" },
    { apiKey: "global-value", output: "json" }
  );
  assert.equal(merged.apiKey, "subcommand-value");
  assert.equal(merged.output, "json");
});

test("output still comes from the program-level options", () => {
  const merged = mergeSetupOptions({}, { output: "json" });
  assert.equal(merged.output, "json");
  assert.equal(merged.apiKey, undefined);
});
