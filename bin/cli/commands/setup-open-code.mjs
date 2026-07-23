/**
 * omniroute setup opencode — Wire the bundled @omniroute/opencode-plugin
 * into a local OpenCode install.
 *
 * Closes the gap where `npm install -g omniroute` ships the plugin
 * inside the omniroute package (`@omniroute/opencode-plugin/dist/`) but
 * OpenCode discovers plugins via `~/.config/opencode/plugins/` or
 * via entries in `opencode.json`. Without this command, the user has
 * to extract the tarball and wire it up by hand (see the plugin README,
 * "Install" section).
 *
 * What it does, in order:
 *   1. Resolves the bundled plugin path (source + built dist).
 *   2. Resolves the OpenCode config directory (XDG-aware).
 *   3. Copies the built plugin into `<opencode>/plugins/omniroute/`.
 *   4. Creates or updates `opencode.json` with a single `plugin` entry
 *      pointing at the local copy (so OC ≥1.15 picks it up).
 *   5. Optionally runs `opencode auth login --provider omniroute`
 *      so the next `opencode` invocation already has the API key.
 *
 * Idempotent: re-running with the same `--provider-id` updates the
 * entry in place (path + baseURL) without duplicating it.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import os from "node:os";

import { printHeading, printInfo, printSuccess, printError } from "../io.mjs";
import { t } from "../i18n.mjs";
import { resolveActiveContext } from "../contexts.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// We walk up from this file to find the omniroute package root. The script
// lives at `<omniroute>/bin/cli/commands/setup-open-code.mjs`, so the
// package root is three levels up. Using import.meta.url (not process.cwd())
// means the command works the same way whether you run it from the source
// repo, a global install, or a symlinked location.
const PACKAGE_ROOT = resolve(__dirname, "..", "..", "..");

// The bundled plugin ships at PACKAGE_ROOT/@omniroute/opencode-plugin/
// (see root package.json `files`: ["@omniroute/", ...]). The env override
// exists so tests can point at a fixture without building the real plugin.
const BUNDLED_PLUGIN_DIR =
  process.env.OMNIROUTE_OPENCODE_PLUGIN_DIR || join(PACKAGE_ROOT, "@omniroute", "opencode-plugin");

/**
 * Resolve the OpenCode config directory. Honours XDG_CONFIG_HOME and the
 * platform-specific defaults documented at https://opencode.ai/.
 *
 * @returns {{ configDir: string, dataDir: string }}
 */
function resolveOpenCodeDirs() {
  const home = os.homedir();
  const xdgConfig = process.env.XDG_CONFIG_HOME;
  const xdgData = process.env.XDG_DATA_HOME;
  const platform = process.platform;

  let configDir;
  let dataDir;
  if (platform === "darwin") {
    // macOS: ~/Library/Application Support/opencode
    configDir = join(home, "Library", "Application Support", "opencode");
    dataDir = configDir; // OC uses the same root for config + data on macOS
  } else if (platform === "win32") {
    const appdata = process.env.APPDATA || join(home, "AppData", "Roaming");
    const localAppdata = process.env.LOCALAPPDATA || join(home, "AppData", "Local");
    configDir = join(appdata, "opencode");
    dataDir = join(localAppdata, "opencode");
  } else {
    // Linux + everything else: XDG-style
    configDir = xdgConfig ? join(xdgConfig, "opencode") : join(home, ".config", "opencode");
    dataDir = xdgData ? join(xdgData, "opencode") : join(home, ".local", "share", "opencode");
  }
  return { configDir, dataDir };
}

/**
 * Locate the bundled @omniroute/opencode-plugin dist. The plugin may be
 * present in two states:
 *
 *   - Built (`dist/index.cjs` + `dist/index.js` exist) — preferred,
 *     ships from a published omniroute tarball after Step 8.8 of
 *     `scripts/build/prepublish.ts` runs.
 *   - Unbuilt (only `src/index.ts`) — local dev / fresh clone. We surface
 *     a clear error instead of running tsup here, because the CLI runtime
 *     may not have tsup available (it's a devDependency).
 *
 * @returns {{ distEntry: string, packageDir: string }}
 */
function resolveBundledPlugin() {
  if (!existsSync(BUNDLED_PLUGIN_DIR)) {
    throw new Error(
      `Bundled @omniroute/opencode-plugin not found at ${BUNDLED_PLUGIN_DIR}.\n` +
        `This usually means omniroute was installed from a source tree that does not ` +
        `include the workspace package. Try reinstalling omniroute (npm install -g omniroute) ` +
        `or run \`cd @omniroute/opencode-plugin && npm install && npm run build\` from the source repo.`
    );
  }

  const esmEntry = join(BUNDLED_PLUGIN_DIR, "dist", "index.js");

  if (!existsSync(esmEntry)) {
    throw new Error(
      `@omniroute/opencode-plugin dist/ not built (looked for ${esmEntry}).\n` +
        `Run \`cd ${BUNDLED_PLUGIN_DIR} && npm install && npm run build\` and re-run this command.`
    );
  }

  // ESM-only build (CJS was dropped in tsup config). OpenCode (>=1.15) loads
  // ESM modules natively.
  return { distEntry: esmEntry, packageDir: BUNDLED_PLUGIN_DIR };
}

/**
 * Copy the plugin package into `<opencodeConfig>/plugins/omniroute/`. We
 * copy the entire package (dist/ + package.json) so the dist file's
 * require/import of `zod` and `@opencode-ai/plugin` resolves against the
 * copy's own node_modules. Without the copy, OpenCode would need to
 * resolve the peer deps from the omniroute package's tree, which is
 * unreliable.
 */
function installPluginToOpenCode(pluginInfo, opencodeConfigDir) {
  const targetDir = join(opencodeConfigDir, "plugins", "omniroute");
  mkdirSync(dirname(targetDir), { recursive: true });
  mkdirSync(targetDir, { recursive: true });

  // Copy package.json + dist/. We intentionally do NOT recursively copy
  // node_modules from the source — `peerDependenciesMeta` declares zod +
  // @opencode-ai/plugin as peers, and the user's OpenCode install already
  // provides them. Copying our own node_modules would risk duplicate zod
  // instances (the @opencode-ai/plugin contract uses a singleton).
  const packageJsonSrc = join(pluginInfo.packageDir, "package.json");
  const distSrc = join(pluginInfo.packageDir, "dist");
  cpSync(packageJsonSrc, join(targetDir, "package.json"));
  cpSync(distSrc, join(targetDir, "dist"), { recursive: true });

  return targetDir;
}

/**
 * Update `opencode.json` to register the plugin. Idempotent: if an entry
 * for the same `providerId` already exists, replace it in place. If the
 * user has any other plugin entries, preserve them.
 *
 * @returns {{ configPath: string, changed: boolean }}
 */
function registerPluginInOpenCodeConfig({
  opencodeConfigDir,
  pluginTargetDir,
  providerId,
  baseURL,
  displayName,
}) {
  const configPath = join(opencodeConfigDir, "opencode.json");
  let cfg = {};
  if (existsSync(configPath)) {
    try {
      cfg = JSON.parse(readFileSync(configPath, "utf8"));
    } catch (err) {
      throw new Error(
        `Failed to parse existing ${configPath}: ${err.message}\n` +
          `Fix or remove the file manually, then re-run \`omniroute setup opencode\`.`
      );
    }
  }

  const plugins = Array.isArray(cfg.plugin) ? cfg.plugin : [];

  // Plugin entries can be either a string ("@some/pkg") or a tuple
  // ("@some/pkg", { options }). The README documents the tuple form, so
  // we use that. The "module path" is a file:// URL relative to the
  // opencode config dir — that is what opencode ≥1.15 resolves.
  const entry = [
    `./plugins/omniroute/dist/index.js`,
    {
      providerId,
      baseURL,
      ...(displayName ? { displayName } : {}),
    },
  ];

  // Idempotency: drop any prior entry for the same providerId. We also
  // drop a legacy `opencode-omniroute-auth` entry if present — that
  // package is the obsolete predecessor of @omniroute/opencode-plugin
  // and was the root cause of issue #3711.
  const filtered = plugins.filter((p) => {
    if (typeof p === "string") {
      return !p.includes("opencode-omniroute-auth");
    }
    if (Array.isArray(p) && p[1] && typeof p[1] === "object") {
      const pid = p[1].providerId;
      if (pid === providerId) return false;
      // Also drop the legacy auth plugin if it's there.
      if (typeof p[0] === "string" && p[0].includes("opencode-omniroute-auth")) {
        return false;
      }
    }
    return true;
  });
  filtered.push(entry);
  cfg.plugin = filtered;

  // Make sure the config dir exists, then write the updated config.
  mkdirSync(dirname(configPath), { recursive: true });
  writeFileSync(configPath, JSON.stringify(cfg, null, 2) + "\n", "utf8");

  return { configPath, changed: true };
}

/**
 * Optionally invoke `opencode auth login --provider <providerId>`. We
 * shell out (instead of importing) so this command works even if
 * OpenCode's CLI surface shifts between minor versions — the user gets
 * a clear "could not run opencode" message instead of a hard import
 * failure.
 */
/**
 * Pure resolver for the `opencode auth login` spawn descriptor. Extracted so the
 * platform-branching logic is unit-testable without mocking child_process or
 * mutating process.platform.
 *
 * On Windows the `opencode` binary is an npm `.cmd` shim that Node's hardened
 * spawnSync (post CVE-2024-27980) refuses to run without a shell — spawning it
 * with shell:false throws EINVAL (#7913). Mirror the same fix already applied to
 * codex (resolveCodexSpawn in launch-codex.mjs, crediting #6263) and
 * qodercli/Auggie (#6263/#6304): shell:true on win32, shell:false everywhere else.
 */
export function resolveOpenCodeAuthSpawn(providerId, platform = process.platform) {
  const isWin = platform === "win32";
  return {
    command: isWin ? "opencode.cmd" : "opencode",
    args: ["auth", "login", "--provider", providerId],
    options: { stdio: "inherit", shell: isWin },
  };
}

export function runOpenCodeAuth(providerId) {
  const { command, args, options } = resolveOpenCodeAuthSpawn(providerId);
  const res = spawnSync(command, args, options);
  if (res.error) {
    // ENOENT = opencode is not on PATH
    if (res.error.code === "ENOENT") {
      printInfo(
        `opencode CLI not found on PATH. Run \`opencode auth login --provider ${providerId}\` manually after installing OpenCode.`
      );
      return 1;
    }
    printError(`opencode auth login failed: ${res.error.message}`);
    return 1;
  }
  return typeof res.status === "number" ? res.status : 1;
}

/**
 * Top-level action handler. Kept exported so the integration test can
 * drive it without spawning a subprocess.
 *
 * @param {object} opts
 * @param {string} [opts.providerId="omniroute"]
 * @param {string} [opts.baseURL="http://localhost:20128"]  (Commander camelCases
 *   `--base-url` into `baseUrl`, so both spellings are accepted.)
 * @param {string} [opts.configDir]  Override the OpenCode config dir (tests / non-standard installs).
 * @param {string} [opts.displayName]
 * @param {boolean} [opts.auth=false]   Run `opencode auth login` after wiring.
 * @param {boolean} [opts.nonInteractive=false]   Skip prompts.
 * @returns {Promise<{ exitCode: number, configPath?: string, pluginTargetDir?: string }>}
 */
export async function runSetupOpenCodeCommand(opts = {}) {
  const providerId = opts.providerId || "omniroute";
  // Remote-aware: explicit --remote/--base-url → active context → localhost.
  let baseURL = opts.remote || opts.baseURL || opts.baseUrl;
  if (!baseURL) {
    try {
      const ctx = resolveActiveContext(opts.context ?? process.env.OMNIROUTE_CONTEXT);
      baseURL = ctx?.baseUrl;
    } catch {
      /* no context */
    }
  }
  if (!baseURL) baseURL = "http://localhost:20128";
  const displayName = opts.displayName || null;
  const wantsAuth = Boolean(opts.auth);
  const nonInteractive = Boolean(opts.nonInteractive);

  printHeading("OmniRoute → OpenCode Plugin Setup");

  const resolvedDirs = resolveOpenCodeDirs();
  const opencodeConfigDir = opts.configDir || resolvedDirs.configDir;
  const opencodeDataDir = resolvedDirs.dataDir;
  printInfo(`OpenCode config dir: ${opencodeConfigDir}`);
  printInfo(`OpenCode data dir:   ${opencodeDataDir}`);

  // 1. Resolve bundled plugin
  let pluginInfo;
  try {
    pluginInfo = resolveBundledPlugin();
  } catch (err) {
    printError(err.message);
    return { exitCode: 1 };
  }
  printInfo(`Bundled plugin:      ${pluginInfo.distEntry}`);

  // 2. Ensure OpenCode config dir exists (opencode will create it on
  //    first run, but creating it now means we can write opencode.json
  //    even if OC has never been launched).
  if (!existsSync(opencodeConfigDir)) {
    mkdirSync(opencodeConfigDir, { recursive: true });
    printInfo(`Created OpenCode config dir (didn't exist yet).`);
  }

  // 3. Copy plugin into OpenCode's plugin dir
  let pluginTargetDir;
  try {
    pluginTargetDir = installPluginToOpenCode(pluginInfo, opencodeConfigDir);
    printSuccess(`Plugin installed at ${pluginTargetDir}`);
  } catch (err) {
    printError(`Failed to install plugin: ${err.message}`);
    return { exitCode: 1 };
  }

  // 4. Register in opencode.json
  let configPath;
  try {
    const reg = registerPluginInOpenCodeConfig({
      opencodeConfigDir,
      pluginTargetDir,
      providerId,
      baseURL,
      displayName,
    });
    configPath = reg.configPath;
    printSuccess(`opencode.json updated at ${configPath}`);
  } catch (err) {
    printError(`Failed to update opencode.json: ${err.message}`);
    return { exitCode: 1, pluginTargetDir };
  }

  // 5. Optionally run auth login
  if (wantsAuth) {
    if (nonInteractive) {
      printInfo(`Skipping \`opencode auth login\` (non-interactive mode).`);
      printInfo(`Run manually: opencode auth login --provider ${providerId}`);
    } else {
      printHeading("Authenticating with OpenCode");
      const authExit = runOpenCodeAuth(providerId);
      if (authExit !== 0) {
        return { exitCode: authExit, configPath, pluginTargetDir };
      }
    }
  } else {
    printInfo(
      `Next step: opencode auth login --provider ${providerId}   (pass --auth to do this automatically)`
    );
  }

  printSuccess("OpenCode plugin setup complete");
  printInfo(`Restart OpenCode to pick up the new plugin entry.`);
  return { exitCode: 0, configPath, pluginTargetDir };
}

/**
 * Register the `omniroute setup opencode` subcommand on the parent
 * `setup` command. Commander builds the doc/help from the chain, so
 * `omniroute setup --help` automatically shows the new subcommand.
 *
 * @param {import("commander").Command} setupCommand  the registered `setup` command
 */
export function registerSetupOpenCode(setupCommand) {
  setupCommand
    .command("opencode")
    .description(
      t("setup.opencode") ||
        "Install and register the bundled @omniroute/opencode-plugin with a local OpenCode install"
    )
    .option(
      "--provider-id <id>",
      "OpenCode provider id to register (default: omniroute)",
      "omniroute"
    )
    .option(
      "--base-url <url>",
      "OmniRoute base URL the plugin should talk to (default: active context or http://localhost:20128)"
    )
    .option(
      "--remote <url>",
      "Remote OmniRoute URL, e.g. http://192.168.0.15:20128 (overrides --base-url and the context)"
    )
    .option("--display-name <name>", "Display name in the OpenCode UI (optional)")
    .option(
      "--auth",
      "Run `opencode auth login --provider <providerId>` after wiring (interactive)",
      false
    )
    .option("--non-interactive", "Do not prompt; skip the auth login step", false)
    .action(async (opts, cmd) => {
      // The parent `setup` command uses cmd.optsWithGlobals(); we mirror
      // that here so global flags (--json, --base-url, --api-key) still
      // flow through to the runner.
      const globalOpts = cmd.parent?.parent?.optsWithGlobals?.() ?? {};
      const merged = {
        ...opts,
        output: globalOpts.output,
        apiKey: opts.apiKey ?? globalOpts.apiKey,
        baseUrl: opts.baseUrl ?? globalOpts.baseUrl,
        context: globalOpts.context ?? opts.context,
      };
      const { exitCode } = await runSetupOpenCodeCommand(merged);
      if (exitCode !== 0) process.exit(exitCode);
    });
}
