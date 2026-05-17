import { rmSync } from "node:fs";
import { t } from "../i18n.mjs";
import { emit } from "../output.mjs";
import { withSpinner } from "../spinner.mjs";
import {
  getRuntimeNodeModules,
  hasModule,
  isBetterSqliteBinaryValid,
  ensureBetterSqliteRuntime,
} from "../runtime/nativeDeps.mjs";

async function confirm(msg) {
  const readline = await import("node:readline");
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((r) => rl.question(`${msg} [y/N] `, r));
  rl.close();
  return /^y(es)?$/i.test(answer);
}

export function registerRuntime(program) {
  const runtime = program
    .command("runtime")
    .description(t("runtime.description") || "Manage native runtime dependencies");

  runtime
    .command("check")
    .description("Check status of native deps in runtime directory")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const status = {
        runtimeDir: getRuntimeNodeModules(),
        betterSqlite3: {
          installed: hasModule("better-sqlite3"),
          valid: isBetterSqliteBinaryValid(),
        },
      };
      emit(status, globalOpts);
    });

  runtime
    .command("repair")
    .description("Reinstall native deps in runtime directory")
    .option("--force", "Force reinstall even if valid")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      await withSpinner(
        "Repairing native deps",
        async () => ensureBetterSqliteRuntime({ silent: true, force: opts.force }),
        globalOpts
      );
      const ok = hasModule("better-sqlite3") && isBetterSqliteBinaryValid();
      if (ok) {
        process.stdout.write("✓ better-sqlite3 repaired OK\n");
      } else {
        process.stderr.write("✗ Repair failed — check npm availability\n");
        process.exit(1);
      }
    });

  runtime
    .command("clean")
    .description("Remove runtime directory (frees disk space)")
    .option("--yes", "Skip confirmation")
    .action(async (opts) => {
      if (!opts.yes) {
        const ok = await confirm(`Remove ${getRuntimeNodeModules()}?`);
        if (!ok) {
          process.stdout.write("Cancelled.\n");
          return;
        }
      }
      try {
        rmSync(getRuntimeNodeModules(), { recursive: true, force: true });
        process.stdout.write("Cleaned runtime directory.\n");
      } catch (e) {
        process.stderr.write(`Failed: ${e instanceof Error ? e.message : String(e)}\n`);
        process.exit(1);
      }
    });
}
