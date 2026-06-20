import { spawn } from "node:child_process";
import { promisify } from "node:util";
import { execFile as execFileCb } from "node:child_process";

import { t } from "../i18n.mjs";

const execFile = promisify(execFileCb);

const DEFAULT_IMAGE = "docker.io/redis:7-alpine";
const DEFAULT_NAME = "omniroute-redis";
const DEFAULT_PORT = "6379";
const DEFAULT_VOLUME = "omniroute-redis-data";

const RUNTIME_PREFERENCE = ["podman", "docker"];

async function detectRuntime() {
  for (const candidate of RUNTIME_PREFERENCE) {
    try {
      await execFile(candidate, ["--version"], { timeout: 3000 });
      return candidate;
    } catch {
      // try next candidate
    }
  }
  return null;
}

async function containerExists(runtime, name) {
  try {
    const { stdout } = await execFile(runtime, ["ps", "-a", "--filter", `name=^${name}$`, "--format", "{{.Names}}"]);
    return stdout.trim() === name;
  } catch {
    return false;
  }
}

async function containerRunning(runtime, name) {
  try {
    const { stdout } = await execFile(runtime, ["ps", "--filter", `name=^${name}$`, "--format", "{{.Names}}"]);
    return stdout.trim() === name;
  } catch {
    return false;
  }
}

async function pingRedis(port) {
  // Minimal TCP probe via /dev/tcp — works in bash/zsh but Node has no
  // native equivalent, so spawn a short-lived `redis-cli` if available,
  // otherwise fall back to a raw socket connect.
  return new Promise((resolve) => {
    import("node:net").then(({ createConnection }) => {
      const socket = createConnection({ port: Number(port), host: "127.0.0.1" });
      const timeout = setTimeout(() => {
        socket.destroy();
        resolve(false);
      }, 1500);
      socket.once("connect", () => {
        clearTimeout(timeout);
        socket.end();
        resolve(true);
      });
      socket.once("error", () => {
        clearTimeout(timeout);
        resolve(false);
      });
    });
  });
}

function colorize(text, code) {
  if (process.stdout.isTTY === false) return text;
  return `\x1b[${code}m${text}\x1b[0m`;
}

function info(msg) {
  console.log(colorize("•", "36") + " " + msg);
}

function success(msg) {
  console.log(colorize("✓", "32") + " " + msg);
}

function warn(msg) {
  console.error(colorize("!", "33") + " " + msg);
}

function fail(msg) {
  console.error(colorize("✗", "31") + " " + msg);
}

export function registerRedis(program) {
  const redis = program
    .command("redis")
    .description(
      t("redis.description") ||
        "Launch a 1-click local Redis container (Podman or Docker) for OmniRoute caching and quota tracking"
    );

  redis
    .command("up")
    .description("Start the local Redis container")
    .option("-p, --port <port>", "Host port to expose", DEFAULT_PORT)
    .option("-n, --name <name>", "Container name", DEFAULT_NAME)
    .option("-i, --image <image>", "Container image", DEFAULT_IMAGE)
    .option("--no-pull", "Skip pulling the image if it is missing")
    .option("--runtime <runtime>", "Force a specific runtime (podman|docker)")
    .option("--password <password>", "Set a Redis password (AUTH)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runRedisUpCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  redis
    .command("down")
    .description("Stop and remove the local Redis container")
    .option("-n, --name <name>", "Container name", DEFAULT_NAME)
    .option("--keep-data", "Keep the named volume for next start")
    .option("--runtime <runtime>", "Force a specific runtime (podman|docker)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runRedisDownCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });

  redis
    .command("status")
    .description("Show status of the local Redis container")
    .option("-n, --name <name>", "Container name", DEFAULT_NAME)
    .option("-p, --port <port>", "Host port", DEFAULT_PORT)
    .option("--runtime <runtime>", "Force a specific runtime (podman|docker)")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.parent.optsWithGlobals();
      const exitCode = await runRedisStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

async function pickRuntime(forced) {
  if (forced) {
    try {
      await execFile(forced, ["--version"], { timeout: 3000 });
      return forced;
    } catch (err) {
      fail(`Forced runtime '${forced}' not available: ${err.message}`);
      return null;
    }
  }
  const detected = await detectRuntime();
  if (!detected) {
    fail("Neither podman nor docker found on PATH. Install one or pass --runtime.");
    return null;
  }
  return detected;
}

export async function runRedisUpCommand(opts = {}) {
  const runtime = await pickRuntime(opts.runtime);
  if (!runtime) return 1;

  const name = opts.name || DEFAULT_NAME;
  const port = opts.port || DEFAULT_PORT;
  const image = opts.image || DEFAULT_IMAGE;

  const exists = await containerExists(runtime, name);
  const running = exists && (await containerRunning(runtime, name));

  if (running) {
    success(`Container '${name}' is already running on port ${port}.`);
    return 0;
  }

  if (exists && !opts.pull) {
    info(`Starting existing container '${name}'…`);
    try {
      await execFile(runtime, ["start", name]);
      success(`Container '${name}' started on port ${port}.`);
      return 0;
    } catch (err) {
      fail(`Failed to start existing container: ${err.message}`);
      return 1;
    }
  }

  if (!opts.pull) {
    info(`Checking if image '${image}' is present locally…`);
    let present = false;
    try {
      const { stdout } = await execFile(runtime, ["images", "--format", "{{.Repository}}:{{.Tag}}"]);
      present = stdout.split("\n").some((line) => line.trim() === image);
    } catch {
      // ignore — fall through to pull
    }
    if (!present) {
      info(`Image not found locally — pulling '${image}'…`);
      try {
        await execFile(runtime, ["pull", image]);
      } catch (err) {
        fail(`Failed to pull image: ${err.message}`);
        return 1;
      }
    }
  }

  const args = [
    "run",
    "-d",
    "--name", name,
    "--restart", "unless-stopped",
    "-p", `${port}:6379`,
    "-v", `${DEFAULT_VOLUME}:/data`,
  ];
  if (opts.password) {
    args.push("-e", `REDIS_PASSWORD=${opts.password}`);
  }
  args.push(image, "redis-server", "--appendonly", "yes");
  if (opts.password) args.push("--requirepass", opts.password);

  info(`Launching ${runtime} run ${args.join(" ")}`);
  try {
    await execFile(runtime, args);
    success(`Container '${name}' is now running on redis://127.0.0.1:${port}`);
    info(`Set OMNIROUTE_REDIS_URL=redis://127.0.0.1:${port} in your .env to wire OmniRoute to it.`);
    return 0;
  } catch (err) {
    fail(`Failed to launch container: ${err.message}`);
    return 1;
  }
}

export async function runRedisDownCommand(opts = {}) {
  const runtime = await pickRuntime(opts.runtime);
  if (!runtime) return 1;

  const name = opts.name || DEFAULT_NAME;

  if (!(await containerExists(runtime, name))) {
    info(`Container '${name}' does not exist — nothing to do.`);
    return 0;
  }

  try {
    await execFile(runtime, ["rm", "-f", name]);
    success(`Removed container '${name}'.`);
  } catch (err) {
    fail(`Failed to remove container: ${err.message}`);
    return 1;
  }

  if (!opts.keepData) {
    try {
      await execFile(runtime, ["volume", "rm", DEFAULT_VOLUME]);
      success(`Removed volume '${DEFAULT_VOLUME}'.`);
    } catch (err) {
      warn(`Could not remove volume '${DEFAULT_VOLUME}': ${err.message}`);
    }
  }
  return 0;
}

export async function runRedisStatusCommand(opts = {}) {
  const runtime = await pickRuntime(opts.runtime);
  if (!runtime) return 1;

  const name = opts.name || DEFAULT_NAME;
  const port = opts.port || DEFAULT_PORT;

  const exists = await containerExists(runtime, name);
  if (!exists) {
    console.log(JSON.stringify({ runtime, name, port, exists: false, running: false, reachable: false }, null, 2));
    return 0;
  }

  const running = await containerRunning(runtime, name);
  const reachable = running ? await pingRedis(port) : false;

  if (opts.json || opts.output === "json") {
    console.log(JSON.stringify({ runtime, name, port, exists, running, reachable }, null, 2));
    return 0;
  }

  console.log(`\n\x1b[1m\x1b[36mRedis (${runtime})\x1b[0m\n`);
  console.log(`  Container:   ${name}`);
  console.log(`  Exists:      ${exists ? "yes" : "no"}`);
  console.log(`  Running:     ${running ? "yes" : "no"}`);
  console.log(`  Reachable:   ${reachable ? "yes" : "no"} (port ${port})`);
  if (running && !reachable) {
    warn("Container is running but the port is not reachable. Is REDIS_PASSWORD set or another process bound?");
  }
  if (!running) {
    info(`Run 'omniroute redis up' to launch it.`);
  }
  return 0;
}