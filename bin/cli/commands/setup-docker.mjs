/**
 * omniroute setup docker — Print and (optionally) execute the right
 * `docker build` / `docker run` / `docker compose` invocation for the
 * user's scenario.
 *
 * The repo ships `docker-compose.yml` with 7 profiles (see header of that
 * file): `base`, `web`, `cli`, `host`, `cliproxyapi`, `memory`, `bifrost`.
 * The validator below parses the file directly so adding a new profile
 * requires zero code changes here — re-running `setup docker` picks it up.
 *
 * Conventions mirror `setup-codex` / `setup-electron`:
 *   - `../io.mjs` for print helpers
 *   - `run*Command` is the unit-testable inner action
 *   - `--json` switches output to a structured payload
 *   - `--run` actually shells out (docker / docker compose)
 */

import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const COMPOSE_FILE = join(REPO_ROOT, "docker-compose.yml");

export const DOCKER_ACTIONS = ["build", "run", "compose"];

/**
 * Extract the `profiles: [...]` lists from docker-compose.yml. Returns
 * the union of all profiles declared anywhere in the file plus the list
 * of service names that declare each.
 *
 * Pure regex / line-based parsing — we don't need a full YAML parser
 * because the compose file is committed and stable.
 *
 * @param {string} [composePath=COMPOSE_FILE]
 * @returns {{ profiles: string[], servicesByProfile: Record<string,string[]> }}
 */
export function parseComposeProfiles(composePath = COMPOSE_FILE) {
  if (!existsSync(composePath)) {
    return { profiles: [], servicesByProfile: {} };
  }
  const text = readFileSync(composePath, "utf8");

  const servicesByProfile = {};
  let currentService = null;
  let inProfilesList = false;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, ""); // strip comments
    const indent = rawLine.match(/^(\s*)/)[1].length;

    // Top-level service name: two-space indent, name:, no further indent.
    // (YAML in docker-compose uses 2-space indent under `services:`.)
    const svcMatch = line.match(/^\s{2}([a-z0-9][a-z0-9-]*):\s*$/);
    if (svcMatch && indent === 2) {
      currentService = svcMatch[1];
      inProfilesList = false;
      continue;
    }

    const profilesHeader = line.match(/^\s{4}profiles:\s*$/);
    if (profilesHeader && currentService) {
      inProfilesList = true;
      continue;
    }

    const profileEntry = line.match(/^\s{6}-\s*([a-z0-9][a-z0-9-]*)\s*$/);
    if (profileEntry && inProfilesList && currentService) {
      const p = profileEntry[1];
      servicesByProfile[p] = servicesByProfile[p] || [];
      servicesByProfile[p].push(currentService);
      continue;
    }

    // Any other 4-space key resets the profiles-list scanner (we hit the
    // next attribute of the service, like `image:`, `build:`, etc.).
    if (indent <= 4 && line.trim() && !profilesHeader) {
      inProfilesList = false;
    }
  }

  return {
    profiles: Object.keys(servicesByProfile).sort(),
    servicesByProfile,
  };
}

/**
 * Validate that `profile` is one of the profiles declared in
 * docker-compose.yml. Returns null on success, an error string on failure.
 *
 * @param {string} profile
 * @param {string} [composePath]
 * @returns {string | null}
 */
export function validateProfile(profile, composePath = COMPOSE_FILE) {
  if (!profile) return "Profile is required.";
  const { profiles } = parseComposeProfiles(composePath);
  if (profiles.length === 0) {
    return `Could not parse any profiles from ${composePath}.`;
  }
  if (!profiles.includes(profile)) {
    return `Unknown profile '${profile}'. Valid: ${profiles.join(", ")}`;
  }
  return null;
}

/** Detect host platform. Exposed for tests. */
export function detectPlatform() {
  return process.platform;
}

/** Default docker action per platform — `compose` is portable everywhere. */
export function defaultActionForPlatform(_p) {
  return "compose";
}

/** Default compose profile per platform. */
export function defaultProfileForPlatform(p) {
  // `web` ships Chromium for cookie providers; the safest universal default.
  if (p === "win32" || p === "darwin") return "web";
  return "base";
}

/**
 * Render the right `docker` / `docker compose` command for the chosen
 * action + profile. PowerShell-friendly on Windows.
 *
 * @param {string} action "build" | "run" | "compose"
 * @param {string} [profile]
 * @param {string} [platform=process.platform]
 * @returns {string}
 */
export function renderCommand(action, profile, platform = process.platform) {
  if (action === "build") {
    // Build the runner-base image locally — matches `target: runner-base`
    // used by the `base` and `host` profiles.
    return `docker build --target runner-base -t omniroute:base .`;
  }
  if (action === "run") {
    // A self-contained `docker run` invocation that mirrors the `base`
    // compose service. Suited for a quick smoke test.
    return [
      "docker run --rm -it",
      "  --name omniroute",
      "  -p 20128:20128",
      "  -p 20129:20129",
      "  -v omniroute-data:/app/data",
      "  omniroute:base",
    ].join(" ");
  }
  // action === "compose"
  const flag = profile
    ? `--profile ${profile}`
    : `--profile ${defaultProfileForPlatform(platform)}`;
  // Up + build + detached is the canonical "start the stack" form.
  return `docker compose ${flag} up -d --build`;
}

/**
 * Inner action runner. Pure (no Commander coupling).
 *
 * @param {{ action?: string, profile?: string, run?: boolean, json?: boolean, output?: string }} opts
 * @returns {Promise<{ exitCode: number, payload?: object }>}
 */
export async function runSetupDockerCommand(opts = {}) {
  const platform = detectPlatform();
  const action = opts.action || defaultActionForPlatform(platform);
  const wantsJson = Boolean(opts.json || opts.output === "json");
  const wantsRun = Boolean(opts.run);

  if (!DOCKER_ACTIONS.includes(action)) {
    const msg = `Unknown docker action '${action}'. Valid: ${DOCKER_ACTIONS.join(", ")}`;
    if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: DOCKER_ACTIONS } };
    printError(msg);
    return { exitCode: 2 };
  }

  // Parse + validate the profile list (only meaningful for `compose`).
  const { profiles, servicesByProfile } = parseComposeProfiles();

  let profile = opts.profile;
  if (action === "compose" && !profile) {
    profile = defaultProfileForPlatform(platform);
  }

  if (action === "compose" && profile) {
    const profileErr = validateProfile(profile);
    if (profileErr) {
      if (wantsJson) return { exitCode: 2, payload: { error: profileErr, profiles } };
      printError(profileErr);
      return { exitCode: 2 };
    }
  }

  const cmd = renderCommand(action, profile, platform);

  const payload = {
    platform,
    action,
    profile: profile || null,
    profileServices: profile ? servicesByProfile[profile] || [] : [],
    availableProfiles: profiles,
    command: cmd,
    composeFileExists: existsSync(COMPOSE_FILE),
    executed: false,
  };

  if (wantsJson) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    printHeading("OmniRoute → Docker setup");
    printInfo(`Action: ${action}${profile ? `  Profile: ${profile}` : ""}`);
    if (action === "compose" && payload.profileServices.length > 0) {
      printInfo(`Services: ${payload.profileServices.join(", ")}`);
    }
    printInfo(`Command: ${cmd}`);
    if (!payload.composeFileExists) {
      printError(`docker-compose.yml not found at ${COMPOSE_FILE}.`);
      printInfo("Run from the OmniRoute repo root.");
    } else {
      printSuccess(`Found ${profiles.length} profiles in docker-compose.yml`);
    }
  }

  if (!wantsRun) {
    if (!wantsJson) {
      console.log("");
      printInfo(`Next: ${cmd}`);
      printInfo(`(pass --run to execute it now)`);
    }
    return { exitCode: 0, payload: wantsJson ? payload : undefined };
  }

  if (!payload.composeFileExists) {
    if (!wantsJson) printError("Refusing to execute: docker-compose.yml not found.");
    return { exitCode: 3, payload: wantsJson ? payload : undefined };
  }

  if (!wantsJson) printInfo("Executing…");

  // Split the command into argv for spawnSync. We deliberately avoid
  // `shell: true` here because the rendered command contains no pipes or
  // redirects — only flags + args — and avoiding the shell keeps argument
  // quoting predictable on Windows.
  const argv = cmd.split(/\s+/);
  const bin = argv[0];
  const args = argv.slice(1);

  const res = spawnSync(bin, args, {
    cwd: REPO_ROOT,
    stdio: "inherit",
    shell: false,
  });
  payload.executed = true;
  const exitCode = typeof res.status === "number" ? res.status : 1;
  if (!wantsJson && exitCode === 0) printSuccess("Docker command complete.");
  return { exitCode, payload: wantsJson ? payload : undefined };
}

/**
 * Register the `omniroute setup docker` subcommand on the parent setup
 * command.
 *
 * @param {import("commander").Command} setupCommand
 */
export function registerSetupDocker(setupCommand) {
  setupCommand
    .command("docker [action]")
    .description(
      t("setup.docker") ||
        "Print the right docker / docker compose command (build | run | compose --profile …)"
    )
    .option(
      "--profile <name>",
      "Compose profile to enable (see docker-compose.yml: base, web, cli, host, cliproxyapi, memory, bifrost)"
    )
    .option("--run", "Execute the command instead of just printing it", false)
    .option("--json", "Emit a structured JSON payload and exit", false)
    .addHelpText(
      "after",
      `\nActions:\n` +
        DOCKER_ACTIONS.map((a) => `  ${a.padEnd(8)} → docker / docker compose invocation`).join(
          "\n"
        ) +
        `\n\nExamples:\n` +
        `  omniroute setup docker compose --profile web\n` +
        `  omniroute setup docker compose --profile base --profile memory --run\n` +
        `  omniroute setup docker build --run\n` +
        `  omniroute setup docker run --run\n` +
        `  omniroute setup docker --json   # print available profiles\n`
    )
    .action(async (action, opts, cmd) => {
      const globalOpts = cmd.parent?.parent?.optsWithGlobals?.() ?? {};
      const merged = {
        ...opts,
        action: action || opts.action,
        output: globalOpts.output,
        json: Boolean(opts.json || globalOpts.output === "json"),
      };
      const { exitCode } = await runSetupDockerCommand(merged);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
