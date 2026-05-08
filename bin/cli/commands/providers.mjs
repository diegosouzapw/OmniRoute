import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { printHeading } from "../io.mjs";
import { getAvailableProviderCategories, loadAvailableProviders } from "../provider-catalog.mjs";
import { testProviderApiKey } from "../provider-test.mjs";
import {
  findProviderConnection,
  getProviderApiKey,
  listProviderConnections,
  updateProviderTestResult,
} from "../provider-store.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";

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

function printProvidersHelp() {
  console.log(`
Usage:
  omniroute providers available
  omniroute providers available --search openai
  omniroute providers available --category api-key
  omniroute providers list
  omniroute providers test <id|name>
  omniroute providers test-all
  omniroute providers validate

Options:
  --json                 Print machine-readable JSON
  --search, --q <text>   Filter available providers by id, name, alias, or category
  --category <category>  Filter available providers by category

Notes:
  "available" shows the OmniRoute provider catalog.
  "list" shows provider connections already configured in local SQLite.
  Provider commands read local SQLite directly and do not require the server to be running.
  API-key provider tests update test_status, last_tested, and error fields in SQLite.
`);
}

function printAvailableHelp() {
  console.log(`
Usage:
  omniroute providers available
  omniroute providers available --search openai
  omniroute providers available --category api-key
  omniroute providers available --json

Options:
  --json                 Print machine-readable JSON
  --search, --q <text>   Filter by id, name, alias, or category
  --category <category>  Filter by category, for example api-key, oauth, free

Notes:
  Shows the OmniRoute provider catalog, not locally configured provider connections.
`);
}

function printListHelp() {
  console.log(`
Usage:
  omniroute providers list
  omniroute providers list --json

Options:
  --json  Print machine-readable JSON

Notes:
  Lists provider connections already configured in local SQLite.
`);
}

function printTestHelp() {
  console.log(`
Usage:
  omniroute providers test <id|name>
  omniroute providers test <id|name> --json

Options:
  --json  Print machine-readable JSON

Notes:
  Tests one configured provider connection and updates test status in local SQLite.
`);
}

function printTestAllHelp() {
  console.log(`
Usage:
  omniroute providers test-all
  omniroute providers test-all --json

Options:
  --json  Print machine-readable JSON

Notes:
  Tests every active configured provider connection and updates test status in local SQLite.
`);
}

function printValidateHelp() {
  console.log(`
Usage:
  omniroute providers validate
  omniroute providers validate --json

Options:
  --json  Print machine-readable JSON

Notes:
  Validates local provider configuration without calling upstream providers.
`);
}

function printProvidersSubcommandHelp(subcommand) {
  if (subcommand === "available") printAvailableHelp();
  else if (subcommand === "list") printListHelp();
  else if (subcommand === "test") printTestHelp();
  else if (subcommand === "test-all") printTestAllHelp();
  else if (subcommand === "validate") printValidateHelp();
  else printProvidersHelp();
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

function filterAvailableProviders(providers, flags) {
  const search = String(getStringFlag(flags, "search") || getStringFlag(flags, "q") || "")
    .trim()
    .toLowerCase();
  const category = normalizeCategoryFilter(getStringFlag(flags, "category"));

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

async function availableCommand(flags) {
  const allProviders = loadAvailableProviders();
  const providers = filterAvailableProviders(allProviders, flags).map(publicAvailableProvider);
  const categories = getAvailableProviderCategories(allProviders);

  if (hasFlag(flags, "json")) {
    console.log(JSON.stringify({ count: providers.length, categories, providers }, null, 2));
  } else {
    printHeading("OmniRoute Available Providers");
    printAvailableProviderTable(providers, categories);
  }

  return 0;
}

async function listCommand(flags) {
  const { db } = await openOmniRouteDb();
  try {
    const connections = listProviderConnections(db).map(publicConnection);
    if (hasFlag(flags, "json")) {
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

async function testCommand(flags, selector) {
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
    if (hasFlag(flags, "json")) {
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

async function testAllCommand(flags) {
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

    if (hasFlag(flags, "json")) {
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

async function validateCommand(flags) {
  const { db } = await openOmniRouteDb();
  try {
    const results = listProviderConnections(db).map(validateConnection);
    if (hasFlag(flags, "json")) {
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

export async function runProvidersCommand(argv) {
  const { flags, positionals } = parseArgs(argv);
  const requestedSubcommand = positionals[0];
  const subcommand = requestedSubcommand || "list";

  if (hasFlag(flags, "help") || hasFlag(flags, "h")) {
    printProvidersSubcommandHelp(requestedSubcommand);
    return 0;
  }

  if (subcommand === "available") return availableCommand(flags);
  if (subcommand === "list") return listCommand(flags);
  if (subcommand === "test") return testCommand(flags, positionals[1]);
  if (subcommand === "test-all") return testAllCommand(flags);
  if (subcommand === "validate") return validateCommand(flags);

  console.error(`Unknown providers subcommand: ${subcommand}`);
  printProvidersHelp();
  return 1;
}
