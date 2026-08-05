#!/usr/bin/env node
/**
 * @omniroute/openhands-plugin CLI — generate OpenHands .env / Docker config
 * for a running OmniRoute instance.
 *
 * Usage:
 *   omniroute-openhands env   --api-key sk-... --model deepseek-chat [--url http://localhost:20128]
 *   omniroute-openhands compose --api-key sk-... --model deepseek-chat [--persistence-dir /path]
 *   omniroute-openhands docker-run --api-key sk-... --model deepseek-chat
 *   omniroute-openhands models  (print the default model map)
 */
import { buildOpenHandsEnv, serializeOpenHandsEnv } from "./env.ts";
import { buildOpenHandsCompose, buildOpenHandsDockerRun } from "./docker.ts";
import { DEFAULT_OPENHANDS_MODEL_MAP } from "./model-map.ts";

function parseArgs(argv: string[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith("--")) continue;
    const key = arg.slice(2);
    const next = argv[i + 1];
    if (next !== undefined && !next.startsWith("--")) {
      out[key] = next;
      i++;
    } else {
      out[key] = "true";
    }
  }
  return out;
}

function requireArgs(args: Record<string, string>, names: string[]): void {
  for (const name of names) {
    if (!args[name]) {
      console.error(`Missing required --${name}`);
      process.exit(2);
    }
  }
}

const [cmd, ...rest] = process.argv.slice(2);
const args = parseArgs(rest);

switch (cmd) {
  case "env": {
    requireArgs(args, ["api-key", "model"]);
    const env = buildOpenHandsEnv({
      apiKey: args["api-key"],
      model: args.model,
      omnirouteUrl: args.url,
      persistenceDir: args["persistence-dir"],
      corsOrigins: args["cors-origins"]?.split(","),
    });
    process.stdout.write(serializeOpenHandsEnv(env));
    break;
  }
  case "compose": {
    requireArgs(args, ["api-key", "model"]);
    process.stdout.write(
      buildOpenHandsCompose({
        apiKey: args["api-key"],
        model: args.model,
        omnirouteUrl: args.url,
        persistenceDir: args["persistence-dir"] ?? ".openhands-state",
        corsOrigins: args["cors-origins"]?.split(","),
        sandboxBaseImage: args["sandbox-image"],
      })
    );
    break;
  }
  case "docker-run": {
    requireArgs(args, ["api-key", "model"]);
    process.stdout.write(
      buildOpenHandsDockerRun({
        apiKey: args["api-key"],
        model: args.model,
        omnirouteUrl: args.url,
        persistenceDir: args["persistence-dir"] ?? ".openhands-state",
        corsOrigins: args["cors-origins"]?.split(","),
        sandboxBaseImage: args["sandbox-image"],
      })
    );
    break;
  }
  case "models": {
    for (const [name, target] of Object.entries(DEFAULT_OPENHANDS_MODEL_MAP)) {
      process.stdout.write(`${name}\t->\t${target}\n`);
    }
    break;
  }
  default:
    console.error(
      "Usage: omniroute-openhands <env|compose|docker-run|models> [options]\n" +
        "Options:\n" +
        "  --api-key <sk-...>         OmniRoute API key (required for env/compose/docker-run)\n" +
        "  --model <name>             OpenHands model name or OmniRoute combo\n" +
        "  --url <base>               OmniRoute URL (default http://localhost:20128)\n" +
        "  --persistence-dir <path>   Host dir for conversation state\n" +
        "  --cors-origins <a,b,...>   Allowed CORS origins\n" +
        "  --sandbox-image <image>    OpenHands sandbox base image"
    );
    process.exit(1);
}
