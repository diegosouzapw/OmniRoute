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
    healthcheckTimeoutMs: 12000,
    paths: {
      settings: ".openclaw/openclaw.json",
    },
  },
  cursor: {
    defaultCommands: ["agent", "cursor"],
    envBinKey: "CLI_CURSOR_BIN",
    requiresBinary: true,
    // Cursor startup can be slower on first run in containerized host-mount mode.
    healthcheckTimeoutMs: 12000,
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
    healthcheckTimeoutMs: 4000,
    paths: {
      auth: ".local/share/kilo/auth.json",
    },
  },
  continue: {
    defaultCommand: null,
    envBinKey: "CLI_CONTINUE_BIN",
    requiresBinary: false,
    paths: {
      settings: ".continue/config.json",
    },
  },
};

const isWindows = () => process.platform === "win32";

const parseBoolean = (value: unknown, defaultValue = true) => {
  if (value == null || value === "") return defaultValue;
  return !FALSE_VALUES.has(String(value).trim().toLowerCase());
};

const runProcess = (command: string, args: string[], { env, timeoutMs = 3000 }: { env?: Record<string, string | undefined>; timeoutMs?: number } = {}): Promise<any> =>
  new Promise((resolve) => {
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const child = spawn(command, args, { env, stdio: ["ignore", "pipe", "pipe"] });
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

const getExtraPaths = () =>
  String(process.env.CLI_EXTRA_PATHS || "")
    .split(path.delimiter)
    .map((segment) => segment.trim())
    .filter(Boolean);

const getLookupEnv = () => {
  const env = { ...process.env };
  const extraPaths = getExtraPaths();
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
        .map((line) => line.trim())
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
      .map((line) => line.trim())
      .find(Boolean) || null;
  return { installed: !!first, commandPath: first, reason: first ? null : "not_found" };
};

const locateCommandCandidate = async (commands: string[], env: Record<string, string | undefined>) => {
  if (!Array.isArray(commands) || commands.length === 0) {
    return { command: null, installed: false, commandPath: null, reason: "missing_command" };
  }

  for (const command of commands) {
    const located = await locateCommand(command, env);
    if (located.installed || located.reason !== "not_found") {
      return { command, ...located };
    }
  }

  return { command: commands[0], installed: false, commandPath: null, reason: "not_found" };
};

const checkRunnable = async (commandPath: string, env: Record<string, string | undefined>, timeoutMs = 4000) => {
  for (const args of [["--version"], ["-v"]]) {
    const result = await runProcess(commandPath, args, { env, timeoutMs });
    if (result.ok) {
      return { runnable: true, reason: null };
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

export const getCliConfigHome = () =>
  String(process.env.CLI_CONFIG_HOME || "").trim() || os.homedir();

export const getCliConfigPaths = (toolId: string) => {
  const tool = CLI_TOOLS[toolId];
  if (!tool) return null;
  const home = getCliConfigHome();
  return Object.fromEntries(
    Object.entries(tool.paths).map(([key, relativePath]) => [key, path.join(home, relativePath as string)])
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

  const located = await locateCommandCandidate(commands, env);
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
