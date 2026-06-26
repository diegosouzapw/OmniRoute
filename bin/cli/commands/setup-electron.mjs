/**
 * omniroute setup electron — Print and (optionally) execute the Electron
 * install / dev / build incantations for the host platform.
 *
 * OmniRoute ships an `electron/` workspace that produces a packaged desktop
 * client. The corresponding npm scripts live at the repo root
 * (`electron:dev`, `electron:build`, `electron:build:win`, …). Users
 * regularly ask which command to run for their platform; this command
 * answers that with one line and (with `--run`) actually shells out to
 * the matching `npm run` script.
 *
 * Conventions mirror `setup-codex` / `setup-opencode`:
 *   - imports stay on `../io.mjs` for print helpers
 *   - `--help` is automatic via Commander
 *   - `run*Command` is the unit-testable inner action
 *   - `--json` switches output to a structured payload
 *
 * Platform detection is `process.platform` (`win32` / `darwin` / `linux`).
 */

import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// bin/cli/commands/setup-electron.mjs  →  <repo-root>/package.json
const REPO_ROOT = resolve(__dirname, "..", "..", "..");
const ELECTRON_DIR = join(REPO_ROOT, "electron");
const ROOT_PACKAGE_JSON = join(REPO_ROOT, "package.json");

/** All subcommands this area knows about. Order = display order in --help. */
export const ELECTRON_ACTIONS = [
  "install",
  "dev",
  "build",
  "build:win",
  "build:mac",
  "build:linux",
];

/**
 * Map an action to the npm script name at the repo root, or `null` if
 * the action has no matching root script (we render an equivalent shell
 * incantation instead).
 */
function rootScriptFor(action) {
  switch (action) {
    case "install":
      // No dedicated `electron:install` script exists; the equivalent is
      // installing the electron/ workspace's own deps.
      return null;
    case "dev":
      return "electron:dev";
    case "build":
      return "electron:build";
    case "build:win":
      return "electron:build:win";
    case "build:mac":
      return "electron:build:mac";
    case "build:linux":
      return "electron:build:linux";
    default:
      return null;
  }
}

/** Detect the host platform. Exposed for tests. */
export function detectPlatform() {
  return process.platform;
}

/** Pretty label for a platform. */
function platformLabel(p) {
  if (p === "win32") return "Windows (PowerShell)";
  if (p === "darwin") return "macOS (zsh/bash)";
  return "Linux (bash)";
}

/** Pick the default Electron action for the host platform. */
export function defaultActionForPlatform(p) {
  if (p === "win32") return "build:win";
  if (p === "darwin") return "build:mac";
  if (p === "linux") return "build:linux";
  return "build";
}

/**
 * Render the equivalent shell command for a given action + platform.
 * PowerShell on Windows, bash on Unix-like systems.
 *
 * @param {string} action one of ELECTRON_ACTIONS
 * @param {string} [platform=process.platform]
 * @returns {string}
 */
export function renderCommand(action, platform = process.platform) {
  const script = rootScriptFor(action);
  if (script) {
    return `npm run ${script}`;
  }
  // No matching npm script — emit the equivalent shell incantation.
  // `install` has no dedicated root script; the workspace's own deps
  // are installed via `npm install` inside the electron/ directory.
  if (action === "install") {
    if (platform === "win32") return `cd electron && npm install`;
    return `(cd electron && npm install)`;
  }
  // Fallback: best-effort `npm run electron:<action>` even though it
  // probably 404s. Keeps the surface consistent.
  return `npm run electron:${action}`;
}

/**
 * Sanity-check the repo layout for the electron command. Returns a list of
 * issues (empty = good). Exposed so tests and `--check` mode can share it.
 *
 * @param {string} [repoRoot=REPO_ROOT]
 * @returns {string[]}
 */
export function checkRepoLayout(repoRoot = REPO_ROOT) {
  const issues = [];
  if (!existsSync(ROOT_PACKAGE_JSON)) {
    issues.push(`Root package.json not found at ${ROOT_PACKAGE_JSON}`);
  }
  if (!existsSync(ELECTRON_DIR) || !statSync(ELECTRON_DIR).isDirectory()) {
    issues.push(`electron/ workspace not found at ${ELECTRON_DIR}`);
  }
  return issues;
}

/**
 * Inner action runner. Pure (no Commander coupling) so tests can call it
 * directly.
 *
 * @param {{ action?: string, run?: boolean, json?: boolean, output?: string }} opts
 * @returns {Promise<{ exitCode: number, payload?: object }>}
 */
export async function runSetupElectronCommand(opts = {}) {
  const platform = detectPlatform();
  const action = opts.action || defaultActionForPlatform(platform);
  const wantsJson = Boolean(opts.json || opts.output === "json");
  const wantsRun = Boolean(opts.run);

  if (!ELECTRON_ACTIONS.includes(action)) {
    const msg = `Unknown electron action '${action}'. Valid: ${ELECTRON_ACTIONS.join(", ")}`;
    if (wantsJson) return { exitCode: 2, payload: { error: msg, valid: ELECTRON_ACTIONS } };
    printError(msg);
    return { exitCode: 2 };
  }

  const repoIssues = checkRepoLayout();
  const cmd = renderCommand(action, platform);

  const payload = {
    platform,
    platformLabel: platformLabel(platform),
    action,
    script: rootScriptFor(action),
    command: cmd,
    repoOk: repoIssues.length === 0,
    repoIssues,
    executed: false,
  };

  if (wantsJson) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    printHeading(`OmniRoute → Electron setup (${platformLabel(platform)})`);
    printInfo(`Action: ${action}`);
    printInfo(`Command: ${cmd}`);
    if (repoIssues.length > 0) {
      for (const issue of repoIssues) printError(issue);
      printInfo("Continuing in 'print-only' mode. Run from the OmniRoute repo root.");
    } else {
      printSuccess("Repo layout looks good.");
    }
  }

  if (!wantsRun) {
    if (!wantsJson) {
      console.log("");
      printInfo(`Next: ${cmd}`);
      printInfo(`(pass --run to execute it now)`);
    }
    payload.executed = false;
    return { exitCode: 0, payload: wantsJson ? payload : undefined };
  }

  // --run: actually shell out to npm
  if (repoIssues.length > 0) {
    if (!wantsJson) {
      printError("Refusing to execute: repo layout check failed.");
    }
    return { exitCode: 3, payload: wantsJson ? payload : undefined };
  }

  if (!wantsJson) printInfo("Executing…");

  // Two execution shapes:
  //   - script != null  → `npm run <script>` from the repo root
  //   - script == null  → render the command into argv and spawn directly
  //     (used by `install`, which has no matching root npm script).
  const script = rootScriptFor(action);
  let res;
  if (script) {
    res = spawnSync("npm", ["run", script], {
      cwd: REPO_ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  } else if (action === "install") {
    res = spawnSync("npm", ["install"], {
      cwd: ELECTRON_DIR,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  } else {
    // Last-ditch: try the notional `npm run electron:<action>` anyway.
    res = spawnSync("npm", ["run", `electron:${action}`], {
      cwd: REPO_ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
    });
  }

  payload.executed = true;
  const exitCode = typeof res.status === "number" ? res.status : 1;
  if (!wantsJson && exitCode === 0) printSuccess("Electron build complete.");
  return { exitCode, payload: wantsJson ? payload : undefined };
}

/**
 * Register the `omniroute setup electron` subcommand. The parent `setup`
 * command is passed in so the new subcommand rides on the parent's help
 * (consistent with `registerSetupOpenCode`).
 *
 * @param {import("commander").Command} setupCommand
 */
export function registerSetupElectron(setupCommand) {
  setupCommand
    .command("electron [action]")
    .description(
      t("setup.electron") ||
        "Print the right Electron install/dev/build command for this platform (electron:dev, electron:build, electron:build:win|mac|linux)"
    )
    .option("--run", "Execute the command instead of just printing it", false)
    .option("--json", "Emit a structured JSON payload and exit", false)
    .addHelpText(
      "after",
      `\nActions:\n` +
        `  install        → (cd electron && npm install)  # no root script\n` +
        ELECTRON_ACTIONS.filter((a) => a !== "install")
          .map((a) => `  ${a.padEnd(14)} → npm run electron:${a}`)
          .join("\n") +
        `\n\nDefault action per platform:\n` +
        `  Windows → build:win\n` +
        `  macOS   → build:mac\n` +
        `  Linux   → build:linux\n` +
        `\nExamples:\n` +
        `  omniroute setup electron dev\n` +
        `  omniroute setup electron build:win --run\n` +
        `  omniroute setup electron install --run\n` +
        `  omniroute setup electron --json\n`
    )
    .action(async (action, opts, cmd) => {
      const globalOpts = cmd.parent?.parent?.optsWithGlobals?.() ?? {};
      const merged = {
        ...opts,
        action: action || opts.action,
        output: globalOpts.output,
        json: Boolean(opts.json || globalOpts.output === "json"),
      };
      const { exitCode } = await runSetupElectronCommand(merged);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
