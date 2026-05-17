import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerCache(program) {
  const cache = program.command("cache").description(t("cache.description"));

  cache
    .command("status")
    .alias("stats")
    .description("Show cache statistics")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runCacheStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  cache
    .command("clear")
    .description("Clear all cached responses")
    .option("--yes", "Skip confirmation")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runCacheClearCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runCacheStatusCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("cache.noServer"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/cache/stats", {
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (!res.ok) {
      console.log("Cache stats not available.");
      return 0;
    }

    const stats = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(stats, null, 2));
      return 0;
    }

    console.log(`\n\x1b[1m\x1b[36mCache Status\x1b[0m\n`);
    console.log(`  Semantic hits:   ${stats.semanticHits || 0}`);
    console.log(`  Signature hits:  ${stats.signatureHits || 0}`);
    if (stats.size !== undefined) console.log(`  Size:            ${stats.size}`);
    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runCacheClearCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("cache.noServer"));
    return 1;
  }

  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question("Clear all cached responses? [y/N] ", resolve)
    );
    rl.close();
    if (!/^y(es)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  try {
    const res = await apiFetch("/api/cache/clear", {
      method: "POST",
      retry: false,
      timeout: 5000,
      acceptNotOk: true,
    });
    if (res.ok) {
      console.log(t("cache.cleared"));
      return 0;
    }
    console.error(t("cache.clearFailed"));
    return 1;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}
