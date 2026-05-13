import { parseArgs, getStringFlag, hasFlag } from "../args.mjs";
import { createPrompt, printHeading, printInfo, printSuccess } from "../io.mjs";
import { openOmniRouteDb } from "../sqlite.mjs";
import { getSettings, hashManagementPassword, updateSettings } from "../settings-store.mjs";
import { testProviderApiKey } from "../provider-test.mjs";
import { updateProviderTestResult, upsertApiKeyProviderConnection } from "../provider-store.mjs";
import {
  formatProviderChoices,
  getProviderDisplayName,
  resolveProviderChoice,
} from "../provider-catalog.mjs";

function wantsProviderSetup(flags) {
  return (
    hasFlag(flags, "add-provider") ||
    Boolean(getStringFlag(flags, "provider", "OMNIROUTE_PROVIDER")) ||
    Boolean(getStringFlag(flags, "api-key", "OMNIROUTE_API_KEY"))
  );
}

async function resolvePassword(flags, prompt, nonInteractive) {
  const flagPassword = getStringFlag(flags, "password", "OMNIROUTE_SETUP_PASSWORD");
  if (flagPassword) return flagPassword;
  if (nonInteractive) return "";

  const answer = await prompt.ask("Set an admin password now? [y/N]", "N");
  if (!/^y(es)?$/i.test(answer)) return "";

  const password = await prompt.askSecret("Admin password");
  const confirm = await prompt.askSecret("Confirm password");
  if (password !== confirm) {
    throw new Error("Passwords do not match.");
  }
  return password;
}

async function setupPassword(db, flags, prompt, nonInteractive) {
  const password = await resolvePassword(flags, prompt, nonInteractive);
  if (!password) {
    const settings = getSettings(db);
    if (!settings.password) {
      updateSettings(db, { requireLogin: false });
    }
    if (!nonInteractive) {
      printInfo("Password setup skipped. Dashboard login remains disabled.");
    }
    return false;
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters.");
  }

  const hashedPassword = await hashManagementPassword(password);
  updateSettings(db, {
    password: hashedPassword,
    requireLogin: true,
  });
  printSuccess("Admin password configured");
  return true;
}

async function resolveProviderInput(flags, prompt, nonInteractive) {
  let provider = getStringFlag(flags, "provider", "OMNIROUTE_PROVIDER");
  let apiKey = getStringFlag(flags, "api-key", "OMNIROUTE_API_KEY");
  let name = getStringFlag(flags, "provider-name", "OMNIROUTE_PROVIDER_NAME");
  const defaultModel = getStringFlag(flags, "default-model", "OMNIROUTE_DEFAULT_MODEL");
  const baseUrl = getStringFlag(flags, "provider-base-url", "OMNIROUTE_PROVIDER_BASE_URL");

  if (!provider && !nonInteractive) {
    console.log("Choose a provider:");
    console.log(formatProviderChoices());
    provider = resolveProviderChoice(await prompt.ask("Provider", "1"));
  }

  provider = provider || "openai";
  if (!apiKey && !nonInteractive) {
    apiKey = await prompt.ask(`${getProviderDisplayName(provider)} API key`);
  }

  if (!apiKey) {
    throw new Error("Provider API key is required. Pass --api-key or OMNIROUTE_API_KEY.");
  }

  if (!name) {
    name = getProviderDisplayName(provider);
  }

  return {
    provider,
    apiKey,
    name,
    defaultModel: defaultModel || null,
    providerSpecificData: baseUrl ? { baseUrl } : null,
  };
}

async function setupProvider(db, flags, prompt, nonInteractive) {
  if (!wantsProviderSetup(flags) && nonInteractive) return null;

  if (!wantsProviderSetup(flags)) {
    const answer = await prompt.ask("Add your first provider now? [Y/n]", "Y");
    if (/^n(o)?$/i.test(answer)) return null;
  }

  const input = await resolveProviderInput(flags, prompt, nonInteractive);
  const connection = upsertApiKeyProviderConnection(db, input);
  printSuccess(`Provider configured: ${connection.name}`);

  if (hasFlag(flags, "test-provider")) {
    printInfo(`Testing provider connection: ${connection.provider}`);
    const result = await testProviderApiKey({
      provider: input.provider,
      apiKey: input.apiKey,
      defaultModel: input.defaultModel,
      baseUrl: input.providerSpecificData?.baseUrl || null,
    });
    updateProviderTestResult(db, connection.id, result);

    if (result.valid) {
      printSuccess("Provider test passed");
    } else {
      printInfo(`Provider test failed: ${result.error || "unknown error"}`);
    }
  }

  return connection;
}

function printSetupHelp() {
  console.log(`
Usage:
  omniroute setup
  omniroute setup --password <password>
  omniroute setup --add-provider --provider openai --api-key <key>
  omniroute setup --non-interactive

Options:
  --password <value>        Set admin password
  --add-provider            Add an API-key provider connection
  --provider <id>           Provider id, for example openai or anthropic
  --provider-name <name>    Display name for the connection
  --api-key <value>         Provider API key
  --default-model <model>   Optional default model
  --provider-base-url <url> Optional OpenAI-compatible base URL override
  --test-provider           Test the provider after saving it
  --non-interactive         Read all inputs from flags/env and do not prompt

Environment:
  OMNIROUTE_SETUP_PASSWORD
  OMNIROUTE_PROVIDER
  OMNIROUTE_PROVIDER_NAME
  OMNIROUTE_PROVIDER_BASE_URL
  OMNIROUTE_API_KEY
  OMNIROUTE_DEFAULT_MODEL
  DATA_DIR
`);
}

export async function runSetupCommand(argv) {
  const { flags } = parseArgs(argv);
  if (hasFlag(flags, "help") || hasFlag(flags, "h")) {
    printSetupHelp();
    return 0;
  }

  const nonInteractive = hasFlag(flags, "non-interactive");
  const prompt = createPrompt();

  try {
    printHeading("OmniRoute Setup");
    const { db, dbPath } = await openOmniRouteDb();
    printInfo(`Database: ${dbPath}`);

    const before = getSettings(db);
    const passwordChanged = await setupPassword(db, flags, prompt, nonInteractive);
    const providerConnection = await setupProvider(db, flags, prompt, nonInteractive);

    updateSettings(db, { setupComplete: true });
    const after = getSettings(db);
    db.close();

    console.log("");
    printSuccess("Setup complete");
    printInfo(
      `Login: ${after.requireLogin === true ? "enabled" : "disabled"}${
        passwordChanged ? " (password updated)" : ""
      }`
    );
    if (providerConnection) {
      printInfo(`Provider: ${providerConnection.provider} (${providerConnection.name})`);
    } else if (!before.setupComplete) {
      printInfo("Provider: skipped");
    }

    return 0;
  } finally {
    prompt.close();
  }
}
