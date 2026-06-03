import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
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
import { t } from "../i18n.mjs";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

async function getListCliTools() {
  const { listCliTools } = await import(`${PROJECT_ROOT}/src/shared/constants/cliTools.ts`);
  return listCliTools;
}

function wantsProviderSetup(opts) {
  return opts.addProvider || Boolean(opts.provider) || Boolean(opts.apiKey);
}

async function resolvePassword(opts, prompt, nonInteractive) {
  if (opts.password) return opts.password;
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

async function setupPassword(db, opts, prompt, nonInteractive) {
  const password = await resolvePassword(opts, prompt, nonInteractive);
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

async function resolveProviderInput(opts, prompt, nonInteractive) {
  let provider = opts.provider;
  let apiKey = opts.apiKey;
  let name = opts.providerName;
  const defaultModel = opts.defaultModel;
  const baseUrl = opts.providerBaseUrl;

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

async function setupProvider(db, opts, prompt, nonInteractive) {
  if (!wantsProviderSetup(opts) && nonInteractive) return null;

  if (!wantsProviderSetup(opts)) {
    const answer = await prompt.ask("Add your first provider now? [Y/n]", "Y");
    if (/^n(o)?$/i.test(answer)) return null;
  }

  const input = await resolveProviderInput(opts, prompt, nonInteractive);
  const connection = upsertApiKeyProviderConnection(db, input);
  printSuccess(`Provider configured: ${connection.name}`);

  if (opts.testProvider) {
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

export function registerSetup(program) {
  program
    .command("setup")
    .description(t("setup.title"))
    .option("--password <value>", "Set admin password")
    .option("--add-provider", "Add an API-key provider connection")
    .option("--provider <id>", "Provider id, for example openai or anthropic")
    .option("--provider-name <name>", "Display name for the connection")
    .option("--api-key <value>", "Provider API key")
    .option("--default-model <model>", "Optional default model")
    .option("--provider-base-url <url>", "Optional OpenAI-compatible base URL override")
    .option("--test-provider", "Test the provider after saving it")
    .option("--non-interactive", "Read all inputs from flags/env and do not prompt")
    .option("--list", "List all supported CLI tools")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runSetupCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runSetupCommand(opts = {}) {
  if (opts.list) {
    const listCliTools = await getListCliTools();
    const tools = listCliTools();
    if (opts.json || opts.output === "json") {
      console.log(JSON.stringify(tools, null, 2));
    } else {
      printHeading("Supported CLI Tools");
      for (const tool of tools) {
        const cmd = tool.defaultCommand || tool.defaultCommands?.[0] || "";
        const cmdStr = cmd ? `  \x1b[2m(${cmd})\x1b[0m` : "";
        console.log(`  • ${tool.name}${cmdStr}`);
      }
    }
    return 0;
  }

  const nonInteractive = opts.nonInteractive ?? false;
  const prompt = createPrompt();

  try {
    printHeading("OmniRoute Setup");
    const { db, dbPath } = await openOmniRouteDb();
    printInfo(`Database: ${dbPath}`);

    const before = getSettings(db);
    const passwordChanged = await setupPassword(db, opts, prompt, nonInteractive);
    const providerConnection = await setupProvider(db, opts, prompt, nonInteractive);

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
