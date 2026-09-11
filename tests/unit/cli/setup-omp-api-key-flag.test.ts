import { test } from "node:test";
import assert from "node:assert/strict";
import { Command, Option } from "commander";
import {
  registerSetupOmp,
  resolveSetupOmpActionOpts,
} from "../../../bin/cli/commands/setup-omp.mjs";

// Regression: the root program declares `--api-key <key>` (with an
// OMNIROUTE_API_KEY env fallback), so Commander routes `setup-omp --api-key sk-…`
// to the PARENT and the subcommand's own `--api-key` option never receives it.
// resolveOmpTarget then falls back to the env var — with no env var set the
// catalog fetch hit /v1/models unauthenticated (401) even though the user passed
// the documented flag. The action must merge the program-level options.

function programLikeRoot() {
  // Mirrors bin/cli/program.mjs: same global option shapes that shadow the flag.
  const program = new Command().name("omniroute").exitOverride();
  program.addOption(new Option("--api-key <key>", "API key").env("OMNIROUTE_API_KEY"));
  program.addOption(new Option("--base-url <url>", "Base URL").env("OMNIROUTE_BASE_URL"));
  program.addOption(new Option("--context <name>", "Context").env("OMNIROUTE_CONTEXT"));
  return program;
}

test("commander hands `setup-omp --api-key` to the root program, not the subcommand", async () => {
  const program = programLikeRoot();
  let subOpts: Record<string, unknown> | undefined;
  program
    .command("probe")
    .option("--api-key <key>")
    .option("--remote <url>")
    .action((opts) => {
      subOpts = opts;
    });
  await program.parseAsync([
    "node",
    "omniroute",
    "probe",
    "--remote",
    "http://r",
    "--api-key",
    "sk-flag",
  ]);
  // Documents the upstream behaviour the fix works around.
  assert.equal(subOpts?.apiKey, undefined);
});

test("resolveSetupOmpActionOpts recovers the flag from the program-level options", async () => {
  const program = programLikeRoot();
  let merged: Record<string, unknown> | undefined;
  program
    .command("probe")
    .option("--api-key <key>")
    .option("--remote <url>")
    .option("--port <port>", "port", "20128")
    .action((opts, cmd) => {
      merged = resolveSetupOmpActionOpts(opts, cmd);
    });
  await program.parseAsync([
    "node",
    "omniroute",
    "probe",
    "--remote",
    "http://r",
    "--api-key",
    "sk-flag",
  ]);
  assert.equal(merged?.apiKey, "sk-flag");
  assert.equal(merged?.remote, "http://r");
  assert.equal(merged?.port, "20128");
});

test("resolveSetupOmpActionOpts lets subcommand values win over globals", () => {
  const cmd = {
    optsWithGlobals: () => ({ apiKey: "global", remote: "http://global", output: "table" }),
  };
  const merged = resolveSetupOmpActionOpts({ remote: "http://sub", apiKey: undefined }, cmd);
  assert.equal(merged.remote, "http://sub");
  assert.equal(merged.apiKey, "global");
  assert.equal(merged.output, "table");
});

test("registerSetupOmp forwards the recovered --api-key into the setup run", async () => {
  const program = programLikeRoot();
  let forwarded: Record<string, unknown> | undefined;
  // Inject the runner so the real registered action is exercised without
  // touching the filesystem or a server.
  registerSetupOmp(program, {
    run: async (opts: Record<string, unknown>) => {
      forwarded = opts;
      return 0;
    },
  });
  await program.parseAsync([
    "node",
    "omniroute",
    "setup-omp",
    "--remote",
    "http://127.0.0.1:1",
    "--api-key",
    "sk-flag",
    "--dry-run",
  ]);
  assert.equal(forwarded?.apiKey, "sk-flag");
  assert.equal(forwarded?.dryRun, true);
});
