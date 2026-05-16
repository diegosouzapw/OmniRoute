import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerHealth(program) {
  const health = program
    .command("health")
    .description(t("health.description"))
    .option("-v, --verbose", "Show extended info (memory, breakers)")
    .option("--json", "Output as JSON")
    .option("--alerts-only", "Show only components with alerts")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runHealthCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  health
    .command("components")
    .description("List health components and their status")
    .option("--alerts-only", "Show only components with alerts")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runHealthComponentsCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  health
    .command("watch")
    .description("Live dashboard — refresh every N seconds")
    .option("--interval <s>", "Refresh interval in seconds", "5")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const interval = parseInt(opts.interval, 10) * 1000;
      process.stdout.write("\x1B[2J\x1B[0f");
      while (true) {
        process.stdout.write("\x1B[0f");
        await runHealthCommand({ ...globalOpts, verbose: true });
        await new Promise((r) => setTimeout(r, interval));
      }
    });
}

export async function runHealthCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("health.noServer"));
    return 1;
  }

  try {
    const res = await apiFetch("/api/health", { retry: false, timeout: 5000, acceptNotOk: true });
    if (!res.ok) {
      console.error(t("common.error", { message: `HTTP ${res.status}` }));
      return 1;
    }

    const health = await res.json();

    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(health, null, 2));
      return 0;
    }

    console.log(`\n\x1b[1m\x1b[36m${t("health.title")}\x1b[0m\n`);
    console.log(t("health.status", { status: "\x1b[32mhealthy\x1b[0m" }));
    if (health.uptime) console.log(t("health.uptime", { uptime: health.uptime }));
    if (health.version) console.log(`  Version: ${health.version}`);

    if (health.requests !== undefined) {
      console.log(t("health.requests", { count: health.requests }));
    }

    if (health.breakers && opts.verbose) {
      console.log("\n  \x1b[1mCircuit Breakers\x1b[0m");
      for (const [name, status] of Object.entries(health.breakers)) {
        const state =
          status.state === "closed" ? "\x1b[32m● closed\x1b[0m" : "\x1b[33m○ open\x1b[0m";
        console.log(`    ${name.padEnd(20)} ${state}`);
      }
    }

    if (health.cache && opts.verbose) {
      console.log("\n  \x1b[1mCache\x1b[0m");
      console.log(`    Semantic hits:   ${health.cache.semanticHits || 0}`);
      console.log(`    Signature hits:  ${health.cache.signatureHits || 0}`);
    }

    if (opts.verbose && health.memory) {
      console.log("\n  \x1b[1mMemory\x1b[0m");
      console.log(`    RSS:        ${health.memory.rss || "N/A"}`);
      console.log(`    Heap used:  ${health.memory.heapUsed || "N/A"}`);
    }

    return 0;
  } catch (err) {
    console.error(t("common.error", { message: err instanceof Error ? err.message : String(err) }));
    return 1;
  }
}

export async function runHealthComponentsCommand(opts = {}) {
  try {
    const res = await apiFetch("/api/health", { retry: false, timeout: 5000, acceptNotOk: true });
    if (!res.ok) {
      console.error(`HTTP ${res.status}`);
      return 1;
    }
    const health = await res.json();
    const components = health.components || health.breakers || {};
    for (const [name, info] of Object.entries(components)) {
      const status =
        typeof info === "object" ? info.state || info.status || "unknown" : String(info);
      const isAlert = status !== "closed" && status !== "ok" && status !== "healthy";
      if (opts.alertsOnly && !isAlert) continue;
      const icon = isAlert ? "\x1b[33m⚠\x1b[0m" : "\x1b[32m✓\x1b[0m";
      console.log(`  ${icon} ${name.padEnd(24)} ${status}`);
    }
    return 0;
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    return 1;
  }
}
