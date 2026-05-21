import { apiFetch, isServerUp } from "../api.mjs";
import { emit } from "../output.mjs";
import { printHeading } from "../io.mjs";
import { getAvailableProviderCategories, loadAvailableProviders } from "../provider-catalog.mjs";
import { testProviderApiKey } from "../provider-test.mjs";
import {
  findProviderConnection,
  getProviderApiKey,
  listProviderConnections,
  updateProviderApiKey,
  updateProviderTestResult,
} from "../provider-store.mjs";
import { encryptCredential } from "../encryption.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { t } from "../i18n.mjs";

function publicConnection(connection) {
  return {
    id: connection.id,
    provider: connection.provider,
    name: connection.name,
    authType: connection.authType,
    isActive: connection.isActive,
    testStatus: connection.testStatus,
    lastTested: connection.lastTested,
    lastError: connection.lastError,
    defaultModel: connection.defaultModel,
  };
}

function statusColor(status) {
  if (status === "active" || status === "success") return "\x1b[32m";
  if (status === "error" || status === "expired" || status === "unavailable") return "\x1b[31m";
  return "\x1b[33m";
}

function printProviderTable(connections) {
  if (connections.length === 0) {
    console.log("No providers configured.");
    return;
  }

  for (const connection of connections) {
    const shortId = connection.id.slice(0, 8);
    const status = connection.testStatus || "unknown";
    const color = statusColor(status);
    console.log(
      `${shortId.padEnd(10)} ${connection.provider.padEnd(14)} ${String(connection.name).padEnd(
        24
      )} ${color}${status}\x1b[0m`
    );
  }
}

function normalizeCategoryFilter(category) {
  const normalized = String(category || "")
    .trim()
    .toLowerCase()
    .replaceAll("_", "-");
  if (normalized === "apikey") return "api-key";
  return normalized;
}

function availableProviderNotes(provider) {
  const notes = [];
  if (provider.alias) notes.push(`alias:${provider.alias}`);
  if (provider.hasFree) notes.push("free");
  if (provider.passthroughModels) notes.push("passthrough");
  if (provider.deprecated) notes.push("deprecated");
  return notes.join(", ");
}

function publicAvailableProvider(provider) {
  return {
    id: provider.id,
    name: provider.name,
    category: provider.category,
    alias: provider.alias,
    website: provider.website,
    deprecated: provider.deprecated,
    hasFree: provider.hasFree,
    passthroughModels: provider.passthroughModels,
  };
}

function filterAvailableProviders(providers, opts) {
  const search = String(opts.search || opts.q || "")
    .trim()
    .toLowerCase();
  const category = normalizeCategoryFilter(opts.category);

  return providers.filter((provider) => {
    if (category && provider.category !== category) return false;
    if (!search) return true;

    return [provider.id, provider.name, provider.category, provider.alias]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(search));
  });
}

function printAvailableProviderTable(providers, categories) {
  if (providers.length === 0) {
    console.log("No available providers matched the filters.");
    return;
  }

  console.log(`${providers.length} providers available.`);
  console.log(`Categories: ${categories.join(", ")}`);
  console.log("Use --search <text> or --category <category> to filter.\n");
  console.log(`${"ID".padEnd(24)} ${"Category".padEnd(14)} ${"Name".padEnd(28)} Notes`);

  for (const provider of providers) {
    console.log(
      `${provider.id.padEnd(24)} ${provider.category.padEnd(14)} ${String(provider.name).padEnd(
        28
      )} ${availableProviderNotes(provider)}`
    );
  }
}

function buildTestInput(connection, apiKey) {
  return {
    provider: connection.provider,
    apiKey,
    defaultModel: connection.defaultModel,
    baseUrl: connection.providerSpecificData?.baseUrl || null,
  };
}

async function runProviderTest(db, connection) {
  try {
    const apiKey = getProviderApiKey(connection);
    const result = await testProviderApiKey(buildTestInput(connection, apiKey));
    updateProviderTestResult(db, connection.id, result);
    return {
      connection: publicConnection(connection),
      ...result,
    };
  } catch (error) {
    const result = {
      valid: false,
      error: error instanceof Error ? error.message : String(error),
      statusCode: null,
    };
    updateProviderTestResult(db, connection.id, result);
    return {
      connection: publicConnection(connection),
      ...result,
    };
  }
}

function validateConnection(connection) {
  const issues = [];
  const warnings = [];

  if (!connection.id) issues.push("Missing id");
  if (!connection.provider) issues.push("Missing provider");
  if (!connection.authType) warnings.push("Missing auth type");

  if (connection.authType === "apikey") {
    try {
      getProviderApiKey(connection);
    } catch (error) {
      issues.push(error instanceof Error ? error.message : String(error));
    }
  } else if (!connection.accessToken && !connection.refreshToken) {
    warnings.push("OAuth connection has no access or refresh token visible locally");
  }

  if (connection.providerSpecificData === null && connection.providerSpecificData !== undefined) {
    warnings.push("provider_specific_data is absent or not an object");
  }

  return {
    connection: publicConnection(connection),
    valid: issues.length === 0,
    issues,
    warnings,
  };
}

export async function runAvailableCommand(opts = {}) {
  const allProviders = loadAvailableProviders();
  const providers = filterAvailableProviders(allProviders, opts).map(publicAvailableProvider);
  const categories = getAvailableProviderCategories(allProviders);

  if (opts.json) {
    console.log(JSON.stringify({ count: providers.length, categories, providers }, null, 2));
  } else {
    printHeading("OmniRoute Available Providers");
    printAvailableProviderTable(providers, categories);
  }

  return 0;
}

export async function runListCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const connections = listProviderConnections(db).map(publicConnection);
    if (opts.json) {
      console.log(JSON.stringify({ providers: connections }, null, 2));
    } else {
      printHeading("OmniRoute Providers");
      printProviderTable(connections);
    }
    return 0;
  } finally {
    db.close();
  }
}

export async function runTestCommand(selector, opts = {}) {
  if (!selector) {
    console.error("Provider id or name is required.");
    return 1;
  }

  const { db } = await openOmniRouteDb();
  try {
    const connection = findProviderConnection(db, selector);
    if (!connection) {
      console.error(`Provider connection not found: ${selector}`);
      return 1;
    }

    const result = await runProviderTest(db, connection);
    if (opts.json) {
      console.log(JSON.stringify(result, null, 2));
    } else if (result.valid) {
      console.log(`\x1b[32mOK\x1b[0m ${connection.name}: provider test passed`);
    } else {
      console.log(`\x1b[31mFAIL\x1b[0m ${connection.name}: ${result.error}`);
    }
    return result.valid ? 0 : 1;
  } finally {
    db.close();
  }
}

export async function runTestAllCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const connections = listProviderConnections(db);
    const results = [];
    for (const connection of connections) {
      if (!connection.isActive) {
        results.push({
          connection: publicConnection(connection),
          valid: false,
          skipped: true,
          error: "Connection is inactive",
        });
        continue;
      }
      results.push(await runProviderTest(db, connection));
    }

    if (opts.json) {
      console.log(JSON.stringify({ results }, null, 2));
    } else {
      printHeading("OmniRoute Provider Tests");
      for (const result of results) {
        const label = result.valid
          ? "\x1b[32mOK\x1b[0m"
          : result.skipped
            ? "\x1b[33mSKIP\x1b[0m"
            : "\x1b[31mFAIL\x1b[0m";
        console.log(
          `${label} ${result.connection.name}: ${result.valid ? "provider test passed" : result.error}`
        );
      }
    }

    return results.some((result) => !result.valid && !result.skipped) ? 1 : 0;
  } finally {
    db.close();
  }
}

export async function runValidateCommand(opts = {}) {
  const { db } = await openOmniRouteDb();
  try {
    const results = listProviderConnections(db).map(validateConnection);
    if (opts.json) {
      console.log(JSON.stringify({ results }, null, 2));
    } else {
      printHeading("OmniRoute Provider Validation");
      if (results.length === 0) {
        console.log("No providers configured.");
      }
      for (const result of results) {
        const label = result.valid ? "\x1b[32mOK\x1b[0m" : "\x1b[31mFAIL\x1b[0m";
        const messages = [...result.issues, ...result.warnings].join("; ");
        console.log(`${label} ${result.connection.name}${messages ? `: ${messages}` : ""}`);
      }
    }
    return results.some((result) => !result.valid) ? 1 : 0;
  } finally {
    db.close();
  }
}

export async function runProvidersRotateCommand(selector, opts = {}) {
  if (!selector) {
    console.error("Provider connection id or name is required.");
    return 2;
  }

  // --- Resolve connection ---
  const { db } = await openOmniRouteDb();
  let connection;
  try {
    connection = findProviderConnection(db, selector);
  } finally {
    db.close();
  }

  if (!connection) {
    console.error(`Provider connection not found: ${selector}`);
    return 2;
  }

  // --- OAuth short-circuit ---
  if (opts.oauth || connection.authType !== "apikey") {
    console.log(t("providers.rotate.oauthHint", { provider: connection.provider }));
    return 0;
  }

  // --- Source new key ---
  let newKey;
  if (opts.fromEnv) {
    newKey = process.env[opts.fromEnv];
    if (!newKey) {
      console.error(t("providers.rotate.envVarEmpty", { var: opts.fromEnv }));
      return 2;
    }
  } else if (opts.newKey) {
    newKey = opts.newKey;
  } else {
    // Interactive prompt (echo-off not strictly needed for a key value, but best practice)
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    newKey = await new Promise((resolve) =>
      rl.question(`New API key for ${connection.name}: `, (a) => {
        rl.close();
        resolve(a.trim());
      })
    );
    if (!newKey) {
      console.error("No key provided.");
      return 2;
    }
  }

  // --- Dry-run ---
  if (opts.dryRun) {
    console.log(
      t("providers.rotate.dryRunResult", { name: connection.name, id: connection.id.slice(0, 8) })
    );
    return 0;
  }

  // --- Confirm ---
  if (!opts.yes) {
    const readline = await import("node:readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question(
        t("providers.rotate.confirmPrompt", {
          name: connection.name,
          id: connection.id.slice(0, 8),
        }),
        resolve
      )
    );
    rl.close();
    if (!/^y(es|s)?$/i.test(answer)) {
      console.log(t("common.cancelled"));
      return 0;
    }
  }

  // --- Write ---
  const serverUp = await isServerUp();
  if (serverUp) {
    try {
      const res = await apiFetch(`/api/providers/${encodeURIComponent(connection.id)}`, {
        method: "PATCH",
        body: {
          apiKey: newKey,
          testStatus: "unknown",
          lastError: null,
          rateLimitedUntil: null,
          backoffLevel: 0,
        },
        retry: false,
        acceptNotOk: true,
      });
      if (!res.ok) {
        console.error(t("common.error", { message: `HTTP ${res.status}` }));
        return 1;
      }
    } catch {
      // Fall through to direct DB write
      const { db: db2 } = await openOmniRouteDb();
      try {
        updateProviderApiKey(db2, connection.id, encryptCredential(newKey));
      } finally {
        db2.close();
      }
    }
  } else {
    const { db: db2 } = await openOmniRouteDb();
    try {
      updateProviderApiKey(db2, connection.id, encryptCredential(newKey));
    } finally {
      db2.close();
    }
  }

  console.log(
    t("providers.rotate.success", { name: connection.name, id: connection.id.slice(0, 8) })
  );

  // --- Post-rotation test ---
  if (!opts.skipTest) {
    const { db: db3 } = await openOmniRouteDb();
    try {
      const fresh = findProviderConnection(db3, connection.id);
      if (fresh) {
        const result = await runProviderTest(db3, fresh);
        if (result.valid) {
          console.log(t("providers.rotate.testPassed"));
        } else {
          console.error(t("providers.rotate.testFailed", { error: result.error }));
        }
      }
    } finally {
      db3.close();
    }
  }

  return 0;
}

export async function runProvidersStatusCommand(opts = {}) {
  const serverUp = await isServerUp();
  if (!serverUp) {
    console.error(t("providers.status.requiresServer"));
    return 3;
  }

  const res = await apiFetch("/api/providers/expiration", { acceptNotOk: true, retry: false });
  if (!res.ok) {
    console.error(t("common.error", { message: `HTTP ${res.status}` }));
    return 1;
  }

  const data = await res.json();
  const list = data.list || [];

  // Optional provider filter
  const filter = opts.provider ? String(opts.provider).toLowerCase() : null;
  const rows = filter ? list.filter((item) => item.provider?.toLowerCase().includes(filter)) : list;

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify({ count: rows.length, connections: rows }, null, 2));
    return 0;
  }

  if (rows.length === 0) {
    console.log(t("providers.status.noData"));
    return 0;
  }

  console.log(t("providers.status.header"));
  for (const item of rows) {
    const shortId = (item.connectionId || item.id || "").slice(0, 8);
    const expiry = item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "-";
    const expiryStatus = item.status || "unknown";
    const testStatus = item.testStatus || "unknown";
    const cooldown = item.rateLimitedUntil ? new Date(item.rateLimitedUntil).toLocaleString() : "-";
    const expiryColor = statusColor(expiryStatus);
    const testColor = statusColor(testStatus);
    console.log(
      `${shortId.padEnd(10)} ${String(item.provider || "").padEnd(14)} ${String(item.name || "").padEnd(24)} ` +
        `${expiry.padEnd(12)} ${expiryColor}${expiryStatus.padEnd(8)}\x1b[0m ` +
        `${testColor}${testStatus.padEnd(12)}\x1b[0m ${cooldown}`
    );
  }

  return 0;
}

export function registerProviders(program) {
  const providers = program.command("providers").description(t("providers.title"));

  providers
    .command("available")
    .description("Show available providers in the OmniRoute catalog")
    .option("--json", "Print machine-readable JSON")
    .option("--search <query>", "Filter by id, name, alias, or category")
    .option("-q, --q <query>", "Alias for --search")
    .option("--category <category>", "Filter by category (api-key, oauth, free)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runAvailableCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("list")
    .description("List configured provider connections")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runListCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("test <idOrName>")
    .description("Test a configured provider connection")
    .option("--json", "Print machine-readable JSON")
    .action(async (idOrName, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTestCommand(idOrName, { ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("test-all")
    .description("Test all active provider connections")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runTestAllCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("validate")
    .description("Validate local provider configuration without calling upstream")
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runValidateCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("rotate <idOrName>")
    .description(t("providers.rotate.description"))
    .option("--new-key <key>", t("providers.rotate.newKeyOpt"))
    .option("--from-env <VAR>", t("providers.rotate.fromEnvOpt"))
    .option("--oauth", t("providers.rotate.oauthOpt"))
    .option("--yes", t("common.yesOpt"))
    .option("--skip-test", t("providers.rotate.skipTestOpt"))
    .option("--dry-run", t("providers.rotate.dryRunOpt"))
    .action(async (idOrName, opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runProvidersRotateCommand(idOrName, {
        ...opts,
        output: globalOpts.output,
      });
      if (exitCode !== 0) process.exit(exitCode);
    });

  providers
    .command("status")
    .description(t("providers.status.description"))
    .option("--provider <name>", t("providers.status.providerOpt"))
    .option("--json", "Print machine-readable JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runProvidersStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  extendProvidersMetrics(providers);
}

const providerMetricsSchema = [
  { key: "provider", header: "Provider", width: 20 },
  { key: "requests", header: "Reqs", formatter: (v) => (v != null ? v.toLocaleString() : "0") },
  {
    key: "successRate",
    header: "Success %",
    formatter: (v) => (v != null ? `${(v * 100).toFixed(1)}%` : "-"),
  },
  {
    key: "avgLatencyMs",
    header: "Avg Latency",
    formatter: (v) => (v ? `${Math.round(v)}ms` : "-"),
  },
  { key: "latencyP95Ms", header: "P95", formatter: (v) => (v ? `${v}ms` : "-") },
  {
    key: "costUsd",
    header: "Cost (USD)",
    formatter: (v) => (v != null ? `$${Number(v).toFixed(4)}` : "-"),
  },
  { key: "errors", header: "Errors", formatter: (v) => (v != null ? String(v) : "0") },
  { key: "breakerState", header: "Breaker" },
];

function sortRows(rows, sortBy) {
  if (!sortBy) return rows;
  return [...rows].sort((a, b) => {
    const av = a[sortBy] ?? 0;
    const bv = b[sortBy] ?? 0;
    return bv > av ? 1 : bv < av ? -1 : 0;
  });
}

export async function runProvidersMetrics(opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();

  const fetchMetrics = async () => {
    const params = new URLSearchParams({ period: opts.period ?? "24h" });
    if (opts.provider) params.set("provider", opts.provider);
    if (opts.connectionId) params.set("connectionId", opts.connectionId);
    if (opts.compare) params.set("providers", opts.compare);
    const res = await apiFetch(`/api/provider-metrics?${params}`, {
      timeout: globalOpts.timeout,
      acceptNotOk: true,
    });
    if (!res.ok) return [];
    const data = await res.json();
    const raw = data.metrics ?? data.items ?? data.providers ?? data;
    if (Array.isArray(raw)) return raw;
    return Object.entries(raw).map(([provider, m]) => ({
      provider,
      ...(typeof m === "object" && m !== null ? m : {}),
    }));
  };

  const renderOnce = async () => {
    const rows = await fetchMetrics();
    const sorted = sortRows(rows, opts.sortBy);
    emit(sorted.slice(0, opts.limit ?? 50), globalOpts, providerMetricsSchema);
  };

  if (opts.watch) {
    process.stderr.write("[watching — Ctrl+C to exit]\n");
    await renderOnce();
    const interval = setInterval(async () => {
      process.stdout.write("\x1b[2J\x1b[H");
      await renderOnce();
    }, 5000);
    process.on("SIGINT", () => {
      clearInterval(interval);
      process.exit(0);
    });
    return;
  }

  await renderOnce();
}

export async function runProviderMetricSingle(id, metric, opts, cmd) {
  const globalOpts = cmd.optsWithGlobals();
  const params = new URLSearchParams({ connectionId: id, period: opts.period ?? "24h" });
  const res = await apiFetch(`/api/provider-metrics?${params}`, {
    timeout: globalOpts.timeout,
    acceptNotOk: true,
  });
  if (!res.ok) {
    process.stderr.write(t("common.serverOffline") + "\n");
    process.exit(res.exitCode ?? 1);
  }
  const data = await res.json();
  const raw = data.metrics ?? data;
  const connData =
    raw[id] ??
    (Array.isArray(raw) ? raw.find((r) => r.connectionId === id || r.provider === id) : null);
  const value = connData?.[metric] ?? connData;
  if (globalOpts.output === "json") {
    process.stdout.write(JSON.stringify(value, null, 2) + "\n");
  } else {
    process.stdout.write(`${metric}: ${JSON.stringify(value)}\n`);
  }
}

export function extendProvidersMetrics(providers) {
  providers
    .command("metrics")
    .description(t("providers.metrics.description"))
    .option("--provider <id>", t("providers.metrics.provider"))
    .option("--connection-id <id>", t("providers.metrics.connection_id"))
    .option("--period <p>", t("providers.metrics.period"), "24h")
    .option("--metric <m>", t("providers.metrics.metric"))
    .option("--sort-by <field>", t("providers.metrics.sort"))
    .option("--limit <n>", t("providers.metrics.limit"), parseInt, 50)
    .option("--watch", t("providers.metrics.watch"))
    .option("--compare <list>", t("providers.metrics.compare"))
    .action(runProvidersMetrics);

  providers
    .command("metric <connectionId> <metric>")
    .description(t("providers.metric_single.description"))
    .option("--period <p>", t("providers.metrics.period"), "24h")
    .action(runProviderMetricSingle);
}
