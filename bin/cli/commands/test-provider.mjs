import { writeFileSync } from "node:fs";
import { apiFetch, isServerUp } from "../api.mjs";
import { t } from "../i18n.mjs";

export function registerTestProvider(program) {
  program
    .command("test [provider] [model]")
    .description(t("test.description"))
    .option("--all-providers", t("test.allProvidersOpt"))
    .option("--json", t("common.jsonOpt"))
    .option("--latency", t("test.latencyOpt"))
    .option("--repeat <n>", t("test.repeatOpt"), parseInt)
    .option("--compare <models>", t("test.compareOpt"))
    .option("--save <path>", t("test.saveOpt"))
    .action(async (provider, model, opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runTestProviderCommand(provider, model, {
        ...opts,
        output: globalOpts.output,
      });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runTestProviderCommand(provider, model, opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("test.noServer"));
    return 1;
  }

  if (opts.allProviders) {
    return _runAllProviders(opts);
  }

  if (opts.compare) {
    return _runCompare(provider, opts);
  }

  const targetProvider = provider || "anthropic";
  const targetModel = model || "claude-haiku-4-5-20251001";
  const repeat = opts.repeat && opts.repeat > 0 ? opts.repeat : 1;

  const results = [];
  for (let i = 0; i < repeat; i++) {
    const result = await _runSingleTest(targetProvider, targetModel);
    results.push(result);
  }

  const aggregated = _aggregate(results, opts.latency);

  if (opts.save) {
    try {
      writeFileSync(opts.save, JSON.stringify(aggregated, null, 2), "utf8");
      console.log(t("test.saved", { path: opts.save }));
    } catch (err) {
      console.error(
        t("common.error", { message: err instanceof Error ? err.message : String(err) })
      );
    }
  }

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify(aggregated, null, 2));
    return aggregated.success ? 0 : 1;
  }

  _printResult(aggregated, opts.latency);
  return aggregated.success ? 0 : 1;
}

async function _runAllProviders(opts) {
  const res = await apiFetch("/api/providers?limit=200", {
    retry: false,
    timeout: 5000,
    acceptNotOk: true,
  });
  if (!res.ok) {
    console.error(t("test.noServer"));
    return 1;
  }
  const data = await res.json();
  const connections = (data.providers ?? data.items ?? data).filter(
    (c) => c.authType === "apikey" || c.testStatus !== "unavailable"
  );
  if (connections.length === 0) {
    console.log(t("test.noProviders"));
    return 0;
  }

  const providers = connections.map((c) => ({
    provider: c.provider ?? c.id,
    model: c.defaultModel ?? c.model,
  }));

  if (process.stdout.isTTY && !opts.json && opts.output !== "json") {
    const { startProvidersTestTui } = await import("../tui/ProvidersTestAll.jsx");
    const baseUrl = opts.baseUrl ?? "http://localhost:20128";
    const apiKey = opts.apiKey ?? process.env.OMNIROUTE_API_KEY;
    await startProvidersTestTui({ providers, baseUrl, apiKey });
    return 0;
  }

  const results = await Promise.all(
    providers.map(async ({ provider, model }) => {
      const r = await _runSingleTest(provider, model);
      return { provider, model, ...r };
    })
  );

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify(results, null, 2));
  } else {
    for (const r of results) {
      const mark = r.success ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✖\x1b[0m";
      console.log(`${mark}  ${r.provider}/${r.model ?? "-"}`);
    }
  }

  const failed = results.filter((r) => !r.success).length;
  return failed > 0 ? 1 : 0;
}

async function _runCompare(provider, opts) {
  const targetProvider = provider || "anthropic";
  const models = opts.compare
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  if (models.length < 2) {
    console.error(t("test.compareMinTwo"));
    return 1;
  }

  const repeat = opts.repeat && opts.repeat > 0 ? opts.repeat : 1;
  const rows = [];

  for (const model of models) {
    const results = [];
    for (let i = 0; i < repeat; i++) {
      const result = await _runSingleTest(targetProvider, model);
      results.push(result);
    }
    rows.push({ model, ..._aggregate(results, true) });
  }

  if (opts.save) {
    try {
      writeFileSync(opts.save, JSON.stringify(rows, null, 2), "utf8");
      console.log(t("test.saved", { path: opts.save }));
    } catch (err) {
      console.error(
        t("common.error", { message: err instanceof Error ? err.message : String(err) })
      );
    }
  }

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify(rows, null, 2));
    return rows.every((r) => r.success) ? 0 : 1;
  }

  console.log(`\n\x1b[1m\x1b[36m${t("test.compareTitle")}\x1b[0m\n`);
  const colW = Math.max(...models.map((m) => m.length), 20);
  console.log(
    `  ${"Model".padEnd(colW)}  ${"Status".padEnd(8)}  ${"Avg ms".padEnd(8)}  ${"Min ms".padEnd(8)}  Max ms`
  );
  console.log(`  ${"─".repeat(colW)}  ────────  ────────  ────────  ──────`);
  for (const row of rows) {
    const statusMark = row.success ? "\x1b[32m✔\x1b[0m" : "\x1b[31m✖\x1b[0m";
    const avg = row.latency?.avgMs != null ? String(row.latency.avgMs) : "N/A";
    const min = row.latency?.minMs != null ? String(row.latency.minMs) : "N/A";
    const max = row.latency?.maxMs != null ? String(row.latency.maxMs) : "N/A";
    console.log(
      `  ${row.model.padEnd(colW)}  ${statusMark}        ${avg.padEnd(8)}  ${min.padEnd(8)}  ${max}`
    );
  }
  console.log();

  return rows.every((r) => r.success) ? 0 : 1;
}

async function _runSingleTest(provider, model) {
  const startMs = Date.now();
  try {
    const res = await apiFetch("/api/v1/providers/test", {
      method: "POST",
      body: { provider, model },
      retry: false,
      timeout: 30000,
      acceptNotOk: true,
    });
    const durationMs = Date.now() - startMs;
    const data = res.ok ? await res.json() : { success: false, error: `HTTP ${res.status}` };
    return { ...data, durationMs };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      error: msg.slice(0, 100),
      durationMs: Date.now() - startMs,
    };
  }
}

function _aggregate(results, includeLatency) {
  const allOk = results.every((r) => r.success);
  const durations = results.map((r) => r.durationMs).filter((d) => d != null);
  const base = {
    success: allOk,
    runs: results.length,
    passed: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success).length,
    response: results.find((r) => r.response)?.response,
    error: results.find((r) => r.error)?.error,
  };
  if (includeLatency && durations.length > 0) {
    const avgMs = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
    const minMs = Math.min(...durations);
    const maxMs = Math.max(...durations);
    return { ...base, latency: { avgMs, minMs, maxMs } };
  }
  return base;
}

function _printResult(result, showLatency) {
  if (result.success) {
    const runs = result.runs > 1 ? ` (${result.passed}/${result.runs} passed)` : "";
    console.log(`\x1b[32m✔ ${t("test.passed")}\x1b[0m${runs}`);
    if (result.response) console.log(`\x1b[2m  Response: ${result.response}\x1b[0m`);
  } else {
    const runs = result.runs > 1 ? ` (${result.passed}/${result.runs} passed)` : "";
    console.error(
      `\x1b[31m✖ ${t("test.failed", { error: result.error || "Unknown error" })}\x1b[0m${runs}`
    );
  }
  if (showLatency && result.latency) {
    console.log(
      `\x1b[2m  Latency — avg: ${result.latency.avgMs}ms  min: ${result.latency.minMs}ms  max: ${result.latency.maxMs}ms\x1b[0m`
    );
  }
}
