import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerQuota(program) {
  program
    .command("quota")
    .description(t("quota.description"))
    .option("--provider <id>", "Filter by provider")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runQuotaCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runQuotaCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("quota.noServer"));
    return 1;
  }

  let quotaData = null;

  try {
    const res = await apiFetch("/api/quota", { retry: false, timeout: 5000, acceptNotOk: true });
    if (res.ok) quotaData = await res.json();
  } catch {}

  if (!quotaData) {
    try {
      const res = await apiFetch("/api/v1/providers", {
        retry: false,
        timeout: 5000,
        acceptNotOk: true,
      });
      if (res.ok) {
        const providers = await res.json();
        quotaData = {
          providers: providers.map((p) => ({
            provider: p.name || p.id,
            quota: p.quota || p.remaining || "N/A",
            used: p.used || 0,
            reset: p.resetAt || "N/A",
          })),
        };
      }
    } catch {}
  }

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify(quotaData || { error: "No quota data" }, null, 2));
    return 0;
  }

  if (!quotaData?.providers) {
    console.log(t("quota.noData"));
    return 0;
  }

  let providers = quotaData.providers;
  if (opts.provider) {
    const filter = opts.provider.toLowerCase();
    providers = providers.filter((p) => p.provider.toLowerCase().includes(filter));
  }

  console.log(`\n\x1b[1m\x1b[36mProvider Quota Usage\x1b[0m\n`);
  console.log(
    "\x1b[36m" +
      "  Provider".padEnd(25) +
      "Used".padEnd(15) +
      "Remaining".padEnd(20) +
      "Reset\x1b[0m"
  );
  console.log(
    "\x1b[2m  " +
      "─".repeat(24) +
      " " +
      "─".repeat(14) +
      " " +
      "─".repeat(19) +
      " " +
      "─".repeat(15) +
      "\x1b[0m"
  );

  for (const p of providers) {
    const provider = (p.provider || "unknown").slice(0, 23).padEnd(25);
    const used = String(p.used || 0).padEnd(15);
    const remaining = String(p.quota || p.remaining || "N/A")
      .slice(0, 18)
      .padEnd(20);
    const reset = p.reset || "N/A";
    console.log(`  ${provider}${used}${remaining}${reset}`);
  }

  console.log(`\n  \x1b[32mTotal: ${providers.length} providers\x1b[0m`);
  return 0;
}
