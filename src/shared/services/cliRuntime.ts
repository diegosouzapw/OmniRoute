import fs from "fs/promises";
import os from "os";
import path from "path";
import { spawn } from "child_process";

const VALID_RUNTIME_MODES = new Set(["auto", "host", "container"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);

const CLI_TOOLS: Record<string, any> = {
  claude: {
    defaultCommand: "claude",
    envBinKey: "CLI_CLAUDE_BIN",
    requiresBinary: true,
    healthcheckTimeoutMs: 4000,
    paths: {
      settings: ".claude/settings.json",
    },
  },
  codex: {
    defaultCommand: "codex",
    envBinKey: "CLI_CODEX_BIN",
    requiresBinary: true,
    healthcheckTimeoutMs: 4000,
    paths: {
      config: ".codex/config.toml",
      auth: ".codex/auth.json",
    },
  },
  droid: {
    defaultCommand: "droid",
    envBinKey: "CLI_DROID_BIN",
    requiresBinary: true,
    // Droid CLI can be slow on some environments; 4s was causing false negatives.
    healthcheckTimeoutMs: 8000,
    paths: {
      settings: ".factory/settings.json",
    },
  },
  openclaw: {
    defaultCommand: "openclaw",
    envBinKey: "CLI_OPENCLAW_BIN",
    requiresBinary: true,
    // openclaw CLI may take >4s on cold start in containers.
    healthcheckTimeoutMs: 15000,
    paths: {
      settings: ".openclaw/openclaw.json",
    },
  },
  cursor: {
    defaultCommands: ["agent", "cursor"],
    envBinKey: "CLI_CURSOR_BIN",
    requiresBinary: true,
    // Cursor startup can be slower on first run in containerized host-mount mode.
    healthcheckTimeoutMs: 15000,
    paths: {
      config: ".cursor/cli-config.json",
      auth: ".config/cursor/auth.json",
      state: ".cursor/agent-cli-state.json",
    },
  },
  cline: {
    defaultCommand: "cline",
    envBinKey: "CLI_CLINE_BIN",
    requiresBinary: true,
    // Cline startup/version check can take >4s on some environments.
    healthcheckTimeoutMs: 12000,
    paths: {
      globalState: ".cline/data/globalState.json",
      secrets: ".cline/data/secrets.json",
    },
  },
  kilo: {
    defaultCommand: "kilocode",
    envBinKey: "CLI_KILO_BIN",
    requiresBinary: true,
    // kilocode renders an ASCII logo banner on startup which can take >4s
    // on cold-start or low-resource environments (VPS, CI). Increase timeout
    // to avoid false healthcheck_failed results.
    healthcheckTimeoutMs: 15000,
    paths: {
      auth: ".local/share/kilo/auth.json",
    },
  },
  continue: {
    defaultCommand: null,
    envBinKey: "CLI_CONTINUE_BIN",
    requiresBinary: false,
    // opencode and continue may take up to 15s on first run / cold start on VPS
    healthcheckTimeoutMs: 15000,
    paths: {
      settings: ".continue/config.json",
    },
  },
  opencode: {
    defaultCommand: "opencode",
    envBinKey: "CLI_OPENCODE_BIN",
    requiresBinary: true,
    // opencode takes several seconds on cold start environments
    healthcheckTimeoutMs: 15000,
    paths: {
      config: ".config/opencode/config.toml",
    },
  },
};

const isWindows = () => process.platform === "win32";

/**
 * (#510) Normalize MSYS2/Git-Bash style paths to Windows-native paths.
 * On Windows with Git Bash, 'where claude' may return '/c/Program Files/...'
 * instead of 'C:\\Program Files\\...'. Convert these so the path is usable
 * by Node's fs and child_process modules.
 */
const normalizeMsys2Path = (p: string): string => {
  if (!p || !isWindows()) return p;
  // Match /letter/rest-of-path — MSYS2 POSIX-style drive mount
  const msys2Match = p.match(/^\/([a-zA-Z])\/(.+)$/);
  if (msys2Match) {
    const drive = msys2Match[1].toUpperCase();
    const rest = msys2Match[2].replace(/\//g, "\\");
    return `${drive}:\\${rest}`;
  }
  return p;
};

const parseBoolean = (value: unknown, defaultValue = true) => {
  if (value == null || value === "") return defaultValue;
  return !FALSE_VALUES.has(String(value).trim().toLowerCase());
};

const runProcess = (
  command: string,
  args: string[],
  { env, timeoutMs = 3000 }: { env?: Record<string, string | undefined>; timeoutMs?: number } = {}
): Promise<any> =>
  new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const child = spawn(command, args, {
      env,
      stdio: ["ignore", "pipe", "pipe"],
      // On Windows, npm installs CLI wrappers as .cmd scripts (e.g. claude.cmd).
      // Without shell:true, spawn cannot resolve them via PATHEXT and the
      // healthcheck fails even when the CLI is correctly installed (#447).
      ...(isWindows() ? { shell: true } : {}),
    });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);

    const done = (result: any) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(result);
    };

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      done({
        ok: false,
        code: null,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        timedOut,
        error: error?.message || "spawn_error",
      });
    });

    child.on("close", (code) => {
      done({
        ok: !timedOut && code === 0,
        code,
        stdout: stdout.trim(),
        stderr: stderr.trim(),
        timedOut,
        error: timedOut ? "timeout" : null,
      });
    });
  });

const getRuntimeMode = () => {
  const mode = String(process.env.CLI_MODE || "auto")
    .trim()
    .toLowerCase();
  return VALID_RUNTIME_MODES.has(mode) ? mode : "auto";
};

/**
 * T12: Validate a CLI executable path to prevent shell injection.
 * Enforces: absolute path, no dangerous shell metacharacters, must exist and be a file.
 * Inspired by Antigravity Manager commit 96732c2 (Mar 11, 2026).
 */
const DANGEROUS_PATH_CHARS = ["&", "|", ";", "<", ">", "(", ")", "`", "$", "^", "%", "!"];

const isSafePath = (execPath: string): boolean => {
  if (!execPath || !path.isAbsolute(execPath)) return false;
  if (DANGEROUS_PATH_CHARS.some((c) => execPath.includes(c))) return false;
  // Allow path.sep and path.delimiter — no further character filtering needed
  return true;
};

/**
 * Validate that an environment variable value is a safe, absolute path
 * within acceptable directory trees. Rejects traversal, special chars,
 * and paths outside expected locations.
 */
const validateEnvPath = (value: string | undefined, allowedParents: string[]): string => {
  if (!value) return "";
  const trimmed = value.trim();

  // Reject if not absolute
  if (!path.isAbsolute(trimmed)) return "";

  // Reject dangerous characters (same as isSafePath but applied to env vars)
  if (DANGEROUS_PATH_CHARS.some((c) => trimmed.includes(c))) return "";

  // Reject if contains path traversal segments
  const normalized = path.normalize(trimmed);
  if (normalized.includes("..")) return "";

  // Reject if outside allowed parent directories
  if (allowedParents.length > 0) {
    const withinAllowed = allowedParents.some(
      (parent) =>
        normalized.toLowerCase().startsWith(parent.toLowerCase() + path.sep) ||
        normalized.toLowerCase() === parent.toLowerCase()
    );
    if (!withinAllowed) return "";
  }

  return normalized;
};

const getExtraPaths = () =>
  String(process.env.CLI_EXTRA_PATHS || "")
    .split(path.delimiter)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .filter((p) => {
      // Must be absolute
      if (!path.isAbsolute(p)) return false;
      // No dangerous characters
      if (DANGEROUS_PATH_CHARS.some((c) => p.includes(c))) return false;
      // No path traversal
      if (path.normalize(p).includes("..")) return false;
      return true;
    });

/**
 * Get known installation paths for a specific CLI tool on Windows.
 * Returns ONLY verified, tool-specific paths - NOT generic user bin directories.
 * This is more secure than searching PATH as it checks known locations only.
 */
const getKnownToolPaths = (toolId: string): string[] => {
  if (!isWindows()) return [];

  const home = os.homedir();
  const userProfile = process.env.USERPROFILE || home;

  // Validate environment paths against allowed parent directories
  const appData = validateEnvPath(process.env.APPDATA, [home, userProfile]);
  const localAppData = validateEnvPath(process.env.LOCALAPPDATA, [
    path.join(home, "AppData", "Local"),
    path.join(userProfile, "AppData", "Local"),
    userProfile,
  ]);

  // Tool-specific known installation paths (verified locations only)
  const knownPaths: Record<string, string[]> = {
    claude: [
      // Official Claude Code standalone installer locations
      path.join(home, ".local", "bin", "claude.exe"),
      ...(localAppData ? [path.join(localAppData, "Programs", "Claude", "claude.exe")] : []),
      ...(localAppData ? [path.join(localAppData, "claude-code", "claude.exe")] : []),
      // npm global (only if nvm-windows is detected)
      ...(getNvmNodePath() ? [path.join(getNvmNodePath()!, "claude-code.cmd")] : []),
    ],
    codex: [
      path.join(home, ".local", "bin", "codex"),
      ...(appData ? [path.join(appData, "npm", "codex.cmd")] : []),
    ],
    droid: [
      path.join(home, ".local", "bin", "droid"),
      ...(appData ? [path.join(appData, "npm", "droid.cmd")] : []),
    ],
    openclaw: [
      path.join(home, ".local", "bin", "openclaw"),
      ...(appData ? [path.join(appData, "npm", "openclaw.cmd")] : []),
    ],
    cursor: [
      path.join(home, ".local", "bin", "agent"),
      path.join(home, ".local", "bin", "cursor"),
      ...(appData ? [path.join(appData, "npm", "agent.cmd")] : []),
      ...(appData ? [path.join(appData, "npm", "cursor.cmd")] : []),
    ],
    cline: [
      path.join(home, ".local", "bin", "cline"),
      ...(appData ? [path.join(appData, "npm", "cline.cmd")] : []),
    ],
    kilo: [
      path.join(home, ".local", "bin", "kilocode"),
      ...(appData ? [path.join(appData, "npm", "kilocode.cmd")] : []),
    ],
    opencode: [
      path.join(home, ".local", "bin", "opencode"),
      ...(appData ? [path.join(appData, "npm", "opencode.cmd")] : []),
    ],
    // Add other tools as needed with their specific known paths
  };

  return knownPaths[toolId] || [];
};

/**
 * Detect nvm-windows installation path dynamically from current Node.js executable.
 * Returns the directory containing node.exe if nvm is detected, null otherwise.
 */
const getNvmNodePath = (): string | null => {
  // Try to detect nvm-windows from the current Node.js executable
  const nodeDir = path.dirname(process.execPath);

  // Check if the node directory contains nvm indicators
  // nvm-windows typically installs to %APPDATA%\nvm\<version>\
  // but the node.exe will be in that version's directory
  const nvmIndicator = path.join(nodeDir, "nvm.exe");

  // Simple heuristic: if process.execPath includes "nvm", use its directory
  if (process.execPath.toLowerCase().includes("nvm")) {
    return nodeDir;
  }

  return null;
};

const getLookupEnv = () => {
  const env = { ...process.env };
  const extraPaths = getExtraPaths();

  // Only add user-specified extra paths, NOT generic user directories
  // This is more secure - user explicitly opts in via CLI_EXTRA_PATHS
  if (extraPaths.length > 0) {
    env.PATH = [...extraPaths, env.PATH || ""].filter(Boolean).join(path.delimiter);
  }
  return env;
};

const resolveToolCommands = (toolId: string): string[] => {
  const tool = CLI_TOOLS[toolId];
  if (!tool) return [];
  const envCommand = String(process.env[tool.envBinKey] || "").trim();
  if (envCommand) return [envCommand];
  if (Array.isArray(tool.defaultCommands) && tool.defaultCommands.length > 0) {
    return tool.defaultCommands.filter(Boolean);
  }
  return tool.defaultCommand ? [tool.defaultCommand] : [];
};

const checkExplicitPath = async (commandPath: string) => {
  // Reject paths that look like injection attempts
  if (!isSafePath(commandPath)) {
    return { installed: false, commandPath: null, reason: "unsafe_path" };
  }

  try {
    await fs.access(commandPath, fs.constants.F_OK);
  } catch {
    return { installed: false, commandPath: null, reason: "not_found" };
  }

  try {
    await fs.access(commandPath, fs.constants.X_OK);
    return { installed: true, commandPath, reason: null };
  } catch {
    return { installed: true, commandPath, reason: "not_executable" };
  }
};

const locateCommand = async (command: string, env: Record<string, string | undefined>) => {
  if (!command) {
    return { installed: false, commandPath: null, reason: "missing_command" };
  }

  if (command.includes("/") || command.includes("\\")) {
    return checkExplicitPath(command);
  }

  if (isWindows()) {
    const located = await runProcess("where", [command], { env, timeoutMs: 3000 });
    if (!located.ok || !located.stdout) {
      return { installed: false, commandPath: null, reason: "not_found" };
    }
    const first =
      located.stdout
        .split(/\r?\n/)
        .map((line) => normalizeMsys2Path(line.trim()))
        .find(Boolean) || null;
    return { installed: !!first, commandPath: first, reason: first ? null : "not_found" };
  }

  const located = await runProcess("sh", ["-c", 'command -v -- "$1"', "sh", command], {
    env,
    timeoutMs: 3000,
  });
  if (!located.ok || !located.stdout) {
    return { installed: false, commandPath: null, reason: "not_found" };
  }
  const first =
    located.stdout
      .split(/\r?\n/)
      .map((line) => normalizeMsys2Path(line.trim()))
      .find(Boolean) || null;
  return { installed: !!first, commandPath: first, reason: first ? null : "not_found" };
};

/**
 * Check if a command exists at a specific absolute path.
 * Used for known installation locations.
 *
 * Security hardening:
 * - Resolves symlinks and verifies target stays within expected directories
 * - Verifies file is a regular file (not directory, pipe, or device)
 * - Checks file size bounds (1KB - 100MB) to detect suspicious binaries
 */
const checkKnownPath = async (commandPath: string) => {
  if (!path.isAbsolute(commandPath)) {
    return { installed: false, commandPath: null, reason: "not_absolute" };
  }

  if (!isSafePath(commandPath)) {
    return { installed: false, commandPath: null, reason: "unsafe_path" };
  }

  try {
    // Resolve symlinks to get the real path and detect symlink escapes
    const realPath = await fs.realpath(commandPath);

    // Verify the resolved path is still within expected directories
    // Use validateEnvPath to ensure we're comparing against validated paths
    const home = os.homedir();
    const userProfile = process.env.USERPROFILE || home;
    const validatedAppData = validateEnvPath(process.env.APPDATA, [home, userProfile]);
    const validatedLocalAppData = validateEnvPath(process.env.LOCALAPPDATA, [
      path.join(home, "AppData", "Local"),
      path.join(userProfile, "AppData", "Local"),
      userProfile,
    ]);
    const validatedProgramFiles = validateEnvPath(process.env.ProgramFiles, [
      "C:\\Program Files",
      "C:\\Program Files (x86)",
    ]);
    const validatedProgramFilesX86 = validateEnvPath(process.env["ProgramFiles(x86)"], [
      "C:\\Program Files",
      "C:\\Program Files (x86)",
    ]);

    const expectedParents = [
      home,
      userProfile,
      validatedAppData,
      validatedLocalAppData,
      validatedProgramFiles,
      validatedProgramFilesX86,
    ].filter(Boolean);

    const isWithinExpected = expectedParents.some((parent) => {
      const normalizedParent = path.normalize(parent).toLowerCase();
      const normalizedRealPath = realPath.toLowerCase();
      return (
        normalizedRealPath.startsWith(normalizedParent + path.sep) ||
        normalizedRealPath === normalizedParent
      );
    });

    if (!isWithinExpected) {
      return { installed: false, commandPath: null, reason: "symlink_escape" };
    }

    // Verify it's a regular file with reasonable size
    const stat = await fs.stat(realPath);
    if (!stat.isFile()) {
      return { installed: false, commandPath: null, reason: "not_file" };
    }

    // CLI binaries should be > 1KB and < 100MB
    // This catches suspicious files while allowing for wrapper scripts
    if (stat.size < 1024 || stat.size > 100 * 1024 * 1024) {
      return { installed: false, commandPath: null, reason: "suspicious_size" };
    }
  } catch (error) {
    const errorCode = (error as NodeJS.ErrnoException).code;
    if (errorCode === "ENOENT") {
      return { installed: false, commandPath: null, reason: "not_found" };
    }
    if (errorCode === "EINVAL") {
      return { installed: false, commandPath: null, reason: "invalid_path" };
    }
    return { installed: false, commandPath: null, reason: "access_error" };
  }

  try {
    await fs.access(commandPath, fs.constants.X_OK);
    return { installed: true, commandPath, reason: null };
  } catch {
    return { installed: true, commandPath, reason: "not_executable" };
  }
};

const locateCommandCandidate = async (
  commands: string[],
  env: Record<string, string | undefined>,
  toolId?: string
) => {
  if (!Array.isArray(commands) || commands.length === 0) {
    return { command: null, installed: false, commandPath: null, reason: "missing_command" };
  }

  // SECURITY: First check known installation paths for this specific tool
  // This avoids searching PATH and reduces attack surface
  if (toolId && isWindows()) {
    const knownPaths = getKnownToolPaths(toolId);
    for (const knownPath of knownPaths) {
      const result = await checkKnownPath(knownPath);
      if (result.installed && result.reason === null) {
        return {
          command: commands[0],
          installed: true,
          commandPath: result.commandPath,
          reason: null,
        };
      }
    }
  }

  // Fallback: search PATH (user can set CLI_EXTRA_PATHS if needed)
  for (const command of commands) {
    const located = await locateCommand(command, env);
    if (located.installed || located.reason !== "not_found") {
      return { command, ...located };
    }
  }

  return { command: commands[0], installed: false, commandPath: null, reason: "not_found" };
};

const checkRunnable = async (
  commandPath: string,
  env: Record<string, string | undefined>,
  timeoutMs = 4000
) => {
  // Minimal environment to prevent credential leakage to potentially malicious binaries
  const minimalEnv: Record<string, string | undefined> = {
    PATH: env.PATH,
    HOME: env.HOME || env.USERPROFILE,
    SystemRoot: env.SystemRoot, // Windows needs this
  };

  for (const args of [["--version"], ["-v"]]) {
    const result = await runProcess(commandPath, args, { env: minimalEnv, timeoutMs });
    // Validate output: must be non-empty and reasonable length (< 4KB)
    if (result.ok && result.stdout.length > 0 && result.stdout.length < 4096) {
      return { runnable: true, reason: null, version: result.stdout.trim() };
    }
  }
  return { runnable: false, reason: "healthcheck_failed" };
};

export const isCliConfigWriteAllowed = () =>
  parseBoolean(process.env.CLI_ALLOW_CONFIG_WRITES, true);

export const ensureCliConfigWriteAllowed = () => {
  if (isCliConfigWriteAllowed()) return null;
  return "CLI config writes are disabled (CLI_ALLOW_CONFIG_WRITES=false)";
};

export const getCliConfigHome = () => {
  const override = String(process.env.CLI_CONFIG_HOME || "").trim();
  if (!override) return os.homedir();

  // Must be absolute
  if (!path.isAbsolute(override)) return os.homedir();

  // Must not contain dangerous characters
  if (DANGEROUS_PATH_CHARS.some((c) => override.includes(c))) return os.homedir();

  // Must not contain path traversal
  if (path.normalize(override).includes("..")) return os.homedir();

  // Must be within user's home directory (prevent reading from system dirs)
  const home = os.homedir();
  const normalized = path.normalize(override);
  if (
    !normalized.toLowerCase().startsWith(home.toLowerCase() + path.sep) &&
    normalized.toLowerCase() !== home.toLowerCase()
  ) {
    return home; // Silently fall back to home
  }

  return normalized;
};

export const getCliConfigPaths = (toolId: string) => {
  const tool = CLI_TOOLS[toolId];
  if (!tool) return null;
  const home = getCliConfigHome();
  return Object.fromEntries(
    Object.entries(tool.paths).map(([key, relativePath]) => [
      key,
      path.join(home, relativePath as string),
    ])
  );
};

export const getCliPrimaryConfigPath = (toolId: string) => {
  const paths = getCliConfigPaths(toolId);
  if (!paths) return null;
  const firstKey = Object.keys(paths)[0];
  return firstKey ? paths[firstKey] : null;
};

export const getCliRuntimeStatus = async (toolId: string) => {
  const tool = CLI_TOOLS[toolId];
  const runtimeMode = getRuntimeMode();
  if (!tool) {
    return {
      installed: false,
      runnable: false,
      command: null,
      commandPath: null,
      reason: "unknown_tool",
      runtimeMode,
      requiresBinary: false,
    };
  }

  const env = getLookupEnv();
  const commands = resolveToolCommands(toolId);
  const requiresBinary = tool.requiresBinary !== false;

  if (!requiresBinary && commands.length === 0) {
    return {
      installed: true,
      runnable: true,
      command: null,
      commandPath: null,
      reason: "not_required",
      runtimeMode,
      requiresBinary,
    };
  }

  const located = await locateCommandCandidate(commands, env, toolId);
  const command = located.command;

  if (!located.installed) {
    return {
      installed: false,
      runnable: false,
      command,
      commandPath: null,
      reason: located.reason || "not_found",
      runtimeMode,
      requiresBinary,
    };
  }

  if (located.reason === "not_executable") {
    return {
      installed: true,
      runnable: false,
      command,
      commandPath: located.commandPath,
      reason: "not_executable",
      runtimeMode,
      requiresBinary,
    };
  }

  const healthcheck = await checkRunnable(
    located.commandPath,
    env,
    Number(tool.healthcheckTimeoutMs || 4000)
  );
  return {
    installed: true,
    runnable: healthcheck.runnable,
    command,
    commandPath: located.commandPath,
    reason: healthcheck.reason,
    runtimeMode,
    requiresBinary,
  };
};

export const CLI_TOOL_IDS = Object.keys(CLI_TOOLS);
