import { t } from "../i18n.mjs";

const OMNIROUTE_ENV_VARS = [
  "PORT",
  "API_PORT",
  "DASHBOARD_PORT",
  "DATA_DIR",
  "REQUIRE_API_KEY",
  "LOG_LEVEL",
  "NODE_ENV",
  "REQUEST_TIMEOUT_MS",
  "ENABLE_SOCKS5_PROXY",
  "OMNIROUTE_API_KEY",
  "OMNIROUTE_BASE_URL",
  "OMNIROUTE_HTTP_TIMEOUT_MS",
];

const ENV_DEFAULTS = {
  PORT: "20128",
  DASHBOARD_PORT: "20128",
  DATA_DIR: "~/.omniroute",
  NODE_ENV: "production",
};

export function registerEnv(program) {
  const env = program.command("env").description("Show and manage environment variables");

  env
    .command("show")
    .alias("list")
    .description("Show current environment variables")
    .option("--json", "Output as JSON")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      await runEnvShowCommand({ ...opts, output: globalOpts.output });
    });

  env
    .command("get <key>")
    .description("Get a single environment variable")
    .action(async (key) => {
      await runEnvGetCommand(key);
    });

  env
    .command("set <key> <value>")
    .description("Set an environment variable (current session only)")
    .action(async (key, value) => {
      await runEnvSetCommand(key, value);
    });
}

export async function runEnvShowCommand(opts = {}) {
  const current = {};
  for (const key of OMNIROUTE_ENV_VARS) {
    if (process.env[key] !== undefined) current[key] = process.env[key];
  }

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify({ current, defaults: ENV_DEFAULTS }, null, 2));
    return 0;
  }

  console.log("\n\x1b[1m\x1b[36mEnvironment Variables\x1b[0m\n");
  console.log("  Current:");
  if (Object.keys(current).length === 0) {
    console.log("\x1b[2m  (none set)\x1b[0m");
  } else {
    for (const [key, value] of Object.entries(current)) {
      const display = key.includes("KEY") || key.includes("SECRET") ? "***" : value;
      console.log(`\x1b[2m    ${key.padEnd(28)} ${display}\x1b[0m`);
    }
  }

  console.log("\n  Defaults:");
  for (const [key, value] of Object.entries(ENV_DEFAULTS)) {
    console.log(`    ${key.padEnd(28)} ${value}`);
  }

  return 0;
}

export async function runEnvGetCommand(key) {
  if (!key) {
    console.error("Key is required. Usage: omniroute env get <key>");
    return 1;
  }
  console.log(process.env[key] || "");
  return 0;
}

export async function runEnvSetCommand(key, value) {
  if (!key || value === undefined) {
    console.error("Usage: omniroute env set <key> <value>");
    return 1;
  }
  process.env[key] = String(value);
  console.log(`\x1b[33m  ${key}=${value} (temporary — current session only)\x1b[0m`);
  return 0;
}
