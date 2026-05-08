import fs from "fs/promises";
import fsSync from "fs";
import os from "os";
import path from "path";
import { spawn, execFileSync } from "child_process";

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
      auth: [".claude/.credentials.json", ".config/claude/credentials.json"],
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
  windsurf: {
    defaultCommand: null,
    envBinKey: "CLI_WINDSURF_BIN",
    requiresBinary: false,
    healthcheckTimeoutMs: 4000,
    paths: {},
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
      config: ".config/opencode/opencode.json",
    },
  },
  hermes: {
    defaultCommand: "hermes",
    envBinKey: "CLI_HERMES_BIN",
    requiresBinary: false,
    healthcheckTimeoutMs: 4000,
    paths: {
      config: ".config/hermes/config.json",
    },
  },
  amp: {
    defaultCommand: "amp",
    envBinKey: "CLI_AMP_BIN",
    requiresBinary: true,
    healthcheckTimeoutMs: 12000,
    paths: {},
  },
  qoder: {
    defaultCommand: "qodercli",
    envBinKey: "CLI_QODER_BIN",
    requiresBinary: true,
    healthcheckTimeoutMs: 12000,
    paths: {
      config: ".qoder/settings.json",
      auth: ".qoder/auth.json",
    },
  },
  qwen: {
    defaultCommand: "qwen",
    envBinKey: "CLI_QWEN_BIN",
    requiresBinary: true,
    healthcheckTimeoutMs: 12000,
    paths: {
      settings: ".qwen/settings.json",
      env: ".qwen/.env",
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
  {
    env,
    timeoutMs = 3000,
    useShell = isWindows(),
  }: {
    env?: Record<string, string | undefined>;
    timeoutMs?: number;
    useShell?: boolean;
  } = {}
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
      ...(useShell ? { shell: true } : {}),
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

/**
 * Check if a path is within a parent directory (case-insensitive, handles mixed separators).
 * Normalizes both paths to forward slashes before comparison to handle
 * inconsistent separator styles on Windows.
 */
const isPathWithin = (childPath: string, parentPath: string): boolean => {
  // Normalize to forward slashes for consistent comparison
  const normalize = (p: string) => path.normalize(p).toLowerCase().replace(/\\/g, "/");
  const normalizedChild = normalize(childPath);
  const normalizedParent = normalize(parentPath);

  if (normalizedChild === normalizedParent) return true;

  // Ensure parent ends with / for proper prefix matching
  const parentWithSep = normalizedParent.endsWith("/") ? normalizedParent : normalizedParent + "/";

  return normalizedChild.startsWith(parentWithSep);
};

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
    const withinAllowed = allowedParents.some((parent) => isPathWithin(normalized, parent));
    if (!withinAllowed) return "";
  }

  return normalized;
};

/**
 * Detect the npm global bin directory.
 * Cached on first call — `execFileSync` is expensive, only run once.
 */
let _npmGlobalPrefix: string | undefined;
const getNpmGlobalPrefix = (): string => {
  if (_npmGlobalPrefix !== undefined) return _npmGlobalPrefix;

  const envPrefix = String(process.env.npm_config_prefix || "").trim();
  if (envPrefix && path.isAbsolute(envPrefix)) {
    _npmGlobalPrefix = envPrefix;
    return _npmGlobalPrefix;
  }

  try {
    const result = execFileSync("npm", ["config", "get", "prefix"], {
      timeout: 5000,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      ...(isWindows() ? { shell: true } : {}),
    });
    const prefix = result.trim();
    if (
      prefix &&
      path.isAbsolute(prefix) &&
      !DANGEROUS_PATH_CHARS.some((c) => prefix.includes(c))
    ) {
      _npmGlobalPrefix = prefix;
      return _npmGlobalPrefix;
    }
  } catch {}

  _npmGlobalPrefix = "";
  return _npmGlobalPrefix;
};

/**
 * Pre-compute expected parent directories at module startup for performance.
 * These are the allowed directories for CLI binary installation locations.
 */
const getExpectedParentPaths = (): string[] => {
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

  const npmPrefix = getNpmGlobalPrefix();

  // Add common user bin directories
  const userBinPaths = [path.join(home, "bin"), path.join(home, ".local", "bin")];

  return [
    home,
    ...userBinPaths,
    userProfile,
    validatedAppData,
    validatedLocalAppData,
    validatedProgramFiles,
    validatedProgramFilesX86,
    npmPrefix,
  ].filter(Boolean);
};

// Cache expected parent paths at module startup (avoid recalculation on every checkKnownPath call)
const EXPECTED_PARENT_PATHS = getExpectedParentPaths();

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
 * Get known installation paths for a specific CLI tool.
 * Checks npm global prefix, NVM locations, standalone installer paths.
 * Works on all platforms — Windows checks .cmd wrappers, Linux/macOS checks bare names.
 */
const getKnownToolPaths = (toolId: string): string[] => {
  const home = os.homedir();
  const paths: string[] = [];

  const npmPrefix = getNpmGlobalPrefix();
  const nvmNodePath = getNvmNodePath();

  const toolBins: Record<string, [string, string][]> = {
    claude: [
      ["claude.cmd", "claude"],
      ["claude.exe", "claude"],
    ],
    codex: [["codex.cmd", "codex"]],
    droid: [
      ["droid.cmd", "droid"],
      ["droid.exe", "droid"],
    ],
    openclaw: [["openclaw.cmd", "openclaw"]],
    cursor: [
      ["agent.cmd", "agent"],
      ["cursor.cmd", "cursor"],
    ],
    cline: [["cline.cmd", "cline"]],
    kilo: [["kilocode.cmd", "kilocode"]],
    opencode: [["opencode.cmd", "opencode"]],
    qoder: [
      ["qodercli.cmd", "qodercli"],
      ["qodercli.exe", "qodercli"],
    ],
  };

  const bins = toolBins[toolId] || [];

  if (isWindows()) {
    const userProfile = process.env.USERPROFILE || home;
    const appData = validateEnvPath(process.env.APPDATA, [home, userProfile]);
    const localAppData = validateEnvPath(process.env.LOCALAPPDATA, [
      path.join(home, "AppData", "Local"),
      path.join(userProfile, "AppData", "Local"),
      userProfile,
    ]);

    if (toolId === "claude") {
      paths.push(path.join(home, ".local", "bin", "claude.exe"));
      if (localAppData) {
        paths.push(path.join(localAppData, "Programs", "Claude", "claude.exe"));
        paths.push(path.join(localAppData, "claude-code", "claude.exe"));
      }
    }

    if (toolId === "droid") {
      paths.push(path.join(home, "bin", "droid.exe"));
    }

    for (const [winName] of bins) {
      if (npmPrefix) paths.push(path.join(npmPrefix, winName));
      if (appData) {
        const appDataPath = path.join(appData, "npm", winName);
        if (
          !npmPrefix ||
          path.normalize(appDataPath) !== path.normalize(path.join(npmPrefix, winName))
        ) {
          paths.push(appDataPath);
        }
      }
      if (nvmNodePath) paths.push(path.join(nvmNodePath, winName));
    }
  } else {
    for (const [, posixName] of bins) {
      const nodeBinDir = path.dirname(process.execPath);
      paths.push(path.join(nodeBinDir, posixName));

      if (npmPrefix) {
        paths.push(path.join(npmPrefix, "bin", posixName));
      }

      paths.push(path.join(home, ".local", "bin", posixName));
      // Only add system paths if they exist (avoids unnecessary stat calls)
      if (fsSync.existsSync("/usr/local/bin")) {
        paths.push(path.join("/usr", "local", "bin", posixName));
      }
      if (fsSync.existsSync("/usr/bin")) {
        paths.push(path.join("/usr", "bin", posixName));
      }

      if (toolId === "opencode") {
        paths.push(path.join(home, ".opencode", "bin", posixName));
      }
      if (toolId === "claude") {
        paths.push(path.join(home, ".claude", "bin", posixName));
      }
    }
  }

  return paths;
};

/**
 * Detect nvm-windows installation path dynamically from current Node.js executable.
 * Returns the directory containing node.exe if nvm is detected, null otherwise.
 */
const getNvmNodePath = (): string | null => {
  // Simple heuristic: if process.execPath includes "nvm", use its directory
  if (process.execPath.toLowerCase().includes("nvm")) {
    return path.dirname(process.execPath);
  }

  return null;
};

const getLookupEnv = () => {
  const env = { ...process.env };
  const extraPaths = getExtraPaths();
  const currentPath = env.PATH || env.Path || "";

  // Only add user-specified extra paths, NOT generic user directories
  // This is more secure - user explicitly opts in via CLI_EXTRA_PATHS
  if (extraPaths.length > 0) {
    const mergedPath = [...extraPaths, currentPath].filter(Boolean).join(path.delimiter);
    env.PATH = mergedPath;
    if (isWindows()) {
      env.Path = mergedPath;
    }
  } else if (isWindows() && currentPath) {
    env.PATH = currentPath;
    env.Path = currentPath;
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
    const located = await runProcess("where.exe", [command], {
      env,
      timeoutMs: 3000,
      useShell: false,
    });
    if (located.ok && located.stdout) {
      // `where` may return multiple matches (e.g. `opencode` + `opencode.cmd`).
      // npm global installs on Windows create both a Unix shell script (no extension)
      // and a .cmd wrapper. We must prefer the Windows executable extension.
      const lines = located.stdout
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length === 0) {
        return { installed: false, commandPath: null, reason: "not_found" };
      }
      const winExt = /\.(cmd|exe|bat|com)$/i;
      const preferred = lines.find((l) => winExt.test(l)) || lines[0];
      return { installed: true, commandPath: normalizeMsys2Path(preferred), reason: null };
    }
    return { installed: false, commandPath: null, reason: "not_found" };
  }

  const located = await runProcess("sh", ["-c", 'command -v -- "$1"', "sh", command], {
    env,
    timeoutMs: 3000,
  });
  if (located.ok && located.stdout) {
    return { installed: true, commandPath: command, reason: null };
  }
  return { installed: false, commandPath: null, reason: "not_found" };
};

/**
 * Check if a command exists at a specific absolute path.
 * Used for known installation locations.
 *
 * Security hardening:
 * - Resolves symlinks and verifies target stays within expected directories
 * - Verifies file is a regular file (not directory, pipe, or device)
 * - Checks file size bounds (30B - 100MB) to detect suspicious binaries
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
    // Use pre-computed expected parent paths (cached at module startup for performance).
    // On macOS temp directories often resolve from /var -> /private/var, so compare both
    // the configured parent and its canonical realpath when available.
    let isWithinExpected = false;
    for (const parent of EXPECTED_PARENT_PATHS) {
      if (isPathWithin(realPath, parent)) {
        isWithinExpected = true;
        break;
      }

      try {
        const resolvedParent = await fs.realpath(parent);
        if (isPathWithin(realPath, resolvedParent)) {
          isWithinExpected = true;
          break;
        }
      } catch {
        // Ignore missing/unresolvable parents and continue checking the remaining ones.
      }
    }

    if (!isWithinExpected) {
      return { installed: false, commandPath: null, reason: "symlink_escape" };
    }

    // Verify it's a regular file with reasonable size
    const stat = await fs.stat(realPath);
    if (!stat.isFile()) {
      return { installed: false, commandPath: null, reason: "not_file" };
    }

    // CLI binaries should be > 30 bytes and < 350MB
    // npm .cmd wrappers on Windows are ~300-500 bytes, JS wrappers on Linux can be ~44 bytes
    // Minimum catches empty/suspicious files while allowing legitimate thin wrappers
    // Many modern CLIs (like Claude Code and OpenCode) build as single ~150-250MB binaries
    if (stat.size < 30 || stat.size > 350 * 1024 * 1024) {
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
  if (toolId) {
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

      if (result.installed && result.reason === "not_executable") {
        return {
          command: commands[0],
          installed: true,
          commandPath: result.commandPath,
          reason: "not_executable",
        };
      }

      if (result.reason && result.reason !== "not_found") {
        return { command: commands[0], ...result };
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
    PATH: env.PATH || env.Path,
    HOME: env.HOME || env.USERPROFILE,
    USERPROFILE: env.USERPROFILE, // Windows needs this for os.homedir()
    APPDATA: env.APPDATA, // Many npm CLI tools rely on APPDATA
    LOCALAPPDATA: env.LOCALAPPDATA,
    TEMP: env.TEMP,
    TMP: env.TMP,
    SystemRoot: env.SystemRoot, // Windows needs this
    ComSpec: env.ComSpec, // Windows shell
    PATHEXT: env.PATHEXT, // Windows cmd.exe needs this to resolve .cmd/.bat/.exe extensions
  };

  if (isWindows() && minimalEnv.PATH) {
    minimalEnv.Path = minimalEnv.PATH;
  }

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
  if (!isPathWithin(normalized, home)) {
    return home; // Silently fall back to home
  }

  return normalized;
};

export const resolveOpencodeConfigDir = (
  platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
  homeDir = os.homedir()
) => {
  const isWin = platform === "win32";
  if (isWin) {
    const appData = String(env.APPDATA || "").trim();
    return appData || path.join(homeDir, "AppData", "Roaming");
  }

  const xdgConfigHome = String(env.XDG_CONFIG_HOME || "").trim();
  return xdgConfigHome || path.join(homeDir, ".config");
};

export const resolveOpencodeConfigPath = (
  platform = process.platform,
  env: NodeJS.ProcessEnv = process.env,
  homeDir = os.homedir()
) => path.join(resolveOpencodeConfigDir(platform, env, homeDir), "opencode", "opencode.json");

export const getOpenCodeConfigPath = () => resolveOpencodeConfigPath();

export const getCliConfigPaths = (toolId: string) => {
  const tool = CLI_TOOLS[toolId];
  if (!tool) return null;

  if (toolId === "opencode") {
    return {
      config: getOpenCodeConfigPath(),
    };
  }

  const home = getCliConfigHome();
  return Object.fromEntries(
    Object.entries(tool.paths).map(([key, relativePath]) => {
      let resolvedPath = "";
      if (Array.isArray(relativePath)) {
        // Find the first path that exists, or default to the first one
        resolvedPath = path.join(home, relativePath[0]);
        for (const p of relativePath) {
          const candidate = path.join(home, p);
          if (fsSync.existsSync(candidate)) {
            resolvedPath = candidate;
            break;
          }
        }
      } else {
        resolvedPath = path.join(home, relativePath as string);
      }
      return [key, resolvedPath];
    })
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

  const envCommand = String(process.env[tool.envBinKey] || "").trim();
  const hasEnvOverride = !!envCommand;

  const located = await locateCommandCandidate(commands, env, hasEnvOverride ? undefined : toolId);
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
