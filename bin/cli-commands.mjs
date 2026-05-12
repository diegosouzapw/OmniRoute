#!/usr/bin/env node

/**
 * OmniRoute CLI - Production-grade CLI Integration Suite
 *
 * Commands:
 *   setup     - Configure CLI tools to use OmniRoute
 *   doctor    - Run health diagnostics
 *   status    - Show comprehensive status
 *   logs      - View application logs
 *   provider  - Add OmniRoute as provider for tools
 *   config    - Show current OmniRoute configuration
 *   test      - Test provider/model connectivity
 *   update    - Check for updates
 */

import {
  existsSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  statSync,
  copyFileSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir, platform, release } from "node:os";
import { execSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_BASE_URL = "http://localhost:20128";
const API_PORT = 20128;
const DASHBOARD_PORT = 20129;

const CLI_TOOLS = {
  claude: {
    id: "claude",
    name: "Claude Code",
    command: "claude",
    configPath: ".claude/settings.json",
    type: "json",
  },
  codex: {
    id: "codex",
    name: "Codex CLI",
    command: "codex",
    configPath: ".codex/config.toml",
    type: "toml",
  },
  opencode: {
    id: "opencode",
    name: "OpenCode",
    command: "opencode",
    configPath: ".config/opencode/opencode.json",
    type: "json",
  },
  cline: {
    id: "cline",
    name: "Cline",
    command: "cline",
    configPath: ".cline/data/globalState.json",
    type: "json",
  },
  kilo: {
    id: "kilo",
    name: "Kilo Code",
    command: "kilocode",
    configPath: ".config/kilocode/settings.json",
    type: "json",
  },
  continue: {
    id: "continue",
    name: "Continue",
    command: "continue",
    configPath: ".continue/config.json",
    type: "json",
  },
  openclaw: {
    id: "openclaw",
    name: "OpenClaw",
    command: "openclaw",
    configPath: ".openclaw/openclaw.json",
    type: "json",
  },
};

const PROVIDER_HELP = {
  opencode: `OpenCode configuration:
1. Add to ~/.config/opencode/opencode.json:
{
  "provider": {
    "omniroute": {
      "name": "OmniRoute",
      "baseURL": "http://localhost:20128/v1"
    }
  }
}
2. Set environment: export OPENAI_API_KEY=your-key`,

  cursor: `Cursor configuration:
1. Open Cursor Settings
2. Go to Models → Add Model
3. Set Base URL to: http://localhost:20128/v1
4. Set API Key to your OmniRoute key`,

  cline: `Cline configuration:
1. Open Cline Settings
2. Find "OpenAI Compatible" provider settings
3. Set Base URL: http://localhost:20128/v1
4. Set API Key: your OmniRoute key`,

  vscode: `VS Code + MCP configuration:
1. Install Cline extension
2. Or use: omniroute --mcp for MCP server`,
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getHomeDir() {
  return homedir();
}

function resolveConfigPath(relativePath) {
  return join(getHomeDir(), relativePath);
}

function execCommand(command, timeout = 3000) {
  try {
    const output = execSync(command, {
      encoding: "utf8",
      timeout,
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { success: true, output: output.trim() };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      code: error.status || error.signal,
    };
  }
}

function readJsonFile(filePath) {
  try {
    if (!existsSync(filePath)) return null;
    const content = readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

function writeJsonFile(filePath, data) {
  try {
    const dir = dirname(filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    return false;
  }
}

function createBackup(filePath) {
  if (!existsSync(filePath)) return null;
  const backupPath = filePath + ".backup." + Date.now();
  try {
    writeFileSync(backupPath, readFileSync(filePath), "utf8");
    return backupPath;
  } catch {
    return null;
  }
}

function colorize(text, color) {
  const colors = {
    green: "\x1b[32m",
    red: "\x1b[31m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    reset: "\x1b[0m",
    dim: "\x1b[2m",
  };
  return colors[color] ? `${colors[color]}${text}${colors.reset}` : text;
}

function log(message, color = "reset") {
  console.log(colorize(message, color));
}

function logSection(title) {
  console.log("\n" + colorize("┌─ " + title + " ".repeat(50), "cyan"));
}

function logEndSection() {
  console.log(colorize("└" + "─".repeat(51), "cyan"));
}

// ============================================================================
// TOOL DETECTION
// ============================================================================

function detectInstalledTools() {
  const results = [];

  for (const [id, tool] of Object.entries(CLI_TOOLS)) {
    const result = execCommand(`which ${tool.command}`, 2000);
    const installed = result.success;
    let version = null;

    if (installed) {
      const versionResult = execCommand(`${tool.command} --version`, 2000);
      if (versionResult.success) {
        version = versionResult.output.slice(0, 20);
      }
    }

    results.push({
      id,
      name: tool.name,
      installed,
      version,
      configPath: resolveConfigPath(tool.configPath),
      configured: checkToolConfigured(id),
    });
  }

  return results;
}

function checkToolConfigured(toolId) {
  const tool = CLI_TOOLS[toolId];
  if (!tool) return false;

  const configPath = resolveConfigPath(tool.configPath);

  try {
    if (!existsSync(configPath)) return false;

    const content = readFileSync(configPath, "utf8").toLowerCase();
    const hasOmniRoute =
      content.includes("omniroute") ||
      content.includes(`localhost:${API_PORT}`) ||
      content.includes(`127.0.0.1:${API_PORT}`);
    return hasOmniRoute;
  } catch {
    return false;
  }
}

// ============================================================================
// API FUNCTIONS
// ============================================================================

async function checkServerHealth() {
  try {
    const res = await fetch(`${DEFAULT_BASE_URL}/api/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

async function getCliToolsStatusFromApi() {
  try {
    const res = await fetch(`${DEFAULT_BASE_URL}/api/cli-tools/status`, {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
}

async function getConsoleLogs(limit = 100, level = null) {
  try {
    const url = new URL(`${DEFAULT_BASE_URL}/api/logs/console`);
    url.searchParams.set("limit", String(limit));
    if (level) url.searchParams.set("level", level);

    const res = await fetch(url.toString(), {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return [];
}

async function testProviderConnection(provider = "claude", model = "claude-sonnet-4-20250514") {
  try {
    const res = await fetch(`${DEFAULT_BASE_URL}/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-omniroute-cli-test",
      },
      body: JSON.stringify({
        model,
        messages: [{ role: "user", content: "Hi" }],
        max_tokens: 10,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, response: data.choices?.[0]?.message?.content || "OK" };
    } else {
      const error = await res.text();
      return { success: false, error: `HTTP ${res.status}: ${error.slice(0, 100)}` };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// CONFIG MANAGEMENT
// ============================================================================

function configureTool(toolId, baseUrl, apiKey) {
  const tool = CLI_TOOLS[toolId];
  if (!tool) {
    return { success: false, error: "Unknown tool: " + toolId };
  }

  const configPath = tool.configPath;
  const fullPath = resolveConfigPath(configPath);

  // Create backup first
  const backupPath = createBackup(fullPath);

  try {
    // Ensure directory exists
    const dir = dirname(fullPath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Read existing config or create new
    let config = {};
    if (existsSync(fullPath)) {
      const content = readFileSync(fullPath, "utf8");
      if (tool.type === "json") {
        config = JSON.parse(content);
      }
    }

    // Apply tool-specific configuration
    switch (toolId) {
      case "claude":
        config.api = config.api || {};
        config.api.omniroute = {
          baseUrl: `${baseUrl}/v1`,
          apiKey: apiKey,
          model: "claude-sonnet-4-20250514",
        };
        break;

      case "codex":
        // For TOML, we need to append/modify
        const tomlContent = `[openai]
base_url = "${baseUrl}/v1"
api_key = "${apiKey}"
model = "gpt-4o"
`;
        writeFileSync(fullPath, tomlContent, "utf8");
        return { success: true, configPath: fullPath, backupPath };

      case "opencode":
        config.provider = config.provider || {};
        config.provider.omniroute = {
          name: "OmniRoute",
          baseURL: `${baseUrl}/v1`,
          apiKey: apiKey,
        };
        break;

      case "cline":
        config.openAiBaseUrl = `${baseUrl}/v1`;
        config.openAiApiKey = apiKey;
        config.actModeApiProvider = "openai";
        config.planModeApiProvider = "openai";
        break;

      case "kilo":
        config.apiUrl = `${baseUrl}/v1`;
        config.apiKey = apiKey;
        break;

      case "continue":
        config.models = config.models || [];
        config.models.push({
          name: "OmniRoute",
          provider: "openai-compatible",
          apiKey: apiKey,
          baseUrl: `${baseUrl}/v1`,
        });
        break;

      case "openclaw":
        config.OPENAI_BASE_URL = `${baseUrl}/v1`;
        config.OPENAI_API_KEY = apiKey;
        break;
    }

    // Write JSON configs
    if (tool.type === "json") {
      writeFileSync(fullPath, JSON.stringify(config, null, 2), "utf8");
    }

    return { success: true, configPath: fullPath, backupPath };
  } catch (error) {
    // Restore backup on failure
    if (backupPath && existsSync(backupPath)) {
      try {
        writeFileSync(fullPath, readFileSync(backupPath), "utf8");
      } catch {}
    }
    return { success: false, error: error.message };
  }
}

// ============================================================================
// CONFIG SHOW
// ============================================================================

function getOmniRouteConfig() {
  const config = {
    port: API_PORT,
    dashboardPort: DASHBOARD_PORT,
    baseUrl: `http://localhost:${API_PORT}`,
    dataDir: resolveConfigPath(".omniroute"),
    requireApiKey: process.env.REQUIRE_API_KEY === "true",
    logLevel: process.env.LOG_LEVEL || "info",
  };

  // Check for existing providers
  try {
    const dbPath = join(config.dataDir, "storage.sqlite");
    config.hasDatabase = existsSync(dbPath);
  } catch {
    config.hasDatabase = false;
  }

  // Node version
  config.nodeVersion = process.version;
  config.platform = platform();
  config.osRelease = release();

  return config;
}

// ============================================================================
// COMMAND IMPLEMENTATIONS
// ============================================================================

export async function runSubcommand(cmd, args) {
  switch (cmd) {
    case "setup":
      await runSetup(args);
      break;
    case "doctor":
      await runDoctor(args);
      break;
    case "status":
      await runStatus(args);
      break;
    case "logs":
      await runLogs(args);
      break;
    case "provider":
      await runProvider(args);
      break;
    case "config":
      await runConfig(args);
      break;
    case "test":
      await runTest(args);
      break;
    case "update":
      await runUpdate(args);
      break;
    case "serve":
      await runServe(args);
      break;
    case "stop":
      await runStop(args);
      break;
    case "restart":
      await runRestart(args);
      break;
    case "keys":
      await runKeys(args);
      break;
    case "models":
      await runModels(args);
      break;
    case "combo":
      await runCombo(args);
      break;
    case "completion":
      await runCompletion(args);
      break;
    case "dashboard":
      await runDashboard(args);
      break;
    case "backup":
      await runBackup(args);
      break;
    case "restore":
      await runRestore(args);
      break;
    case "quota":
      await runQuota(args);
      break;
    case "health":
      await runHealth(args);
      break;
    case "cache":
      await runCache(args);
      break;
    case "mcp":
      await runMcp(args);
      break;
    case "a2a":
      await runA2a(args);
      break;
    case "tunnel":
      await runTunnel(args);
      break;
    case "env":
      await runEnv(args);
      break;
    case "open":
      await runDashboard(args);
      break;
    default:
      log(`Unknown subcommand: ${cmd}`, "red");
      log("Run 'omniroute --help' for available commands", "dim");
      process.exit(1);
  }
}

async function runSetup(args) {
  const toolsArg = args.find((a) => a.startsWith("--tools="))?.split("=")[1];
  const urlArg = args.find((a) => a.startsWith("--url="))?.split("=")[1] || DEFAULT_BASE_URL;
  const keyArg =
    args.find((a) => a.startsWith("--key="))?.split("=")[1] || "sk-omniroute-cli-configured";
  const listArg = args.includes("--list");

  const baseUrl = urlArg.endsWith("/") ? urlArg.slice(0, -1) : urlArg;

  if (listArg) {
    logSection("Available CLI Tools");
    const tools = detectInstalledTools();
    for (const tool of tools) {
      const status = tool.installed
        ? tool.configured
          ? colorize("✓ configured", "green")
          : colorize("✗ not configured", "yellow")
        : colorize("✗ not installed", "red");
      log(`  ${tool.name.padEnd(14)} ${status}`);
    }
    logEndSection();
    return;
  }

  logSection("OmniRoute CLI Setup");

  // Detect installed tools
  const installed = detectInstalledTools().filter((t) => t.installed);

  if (installed.length === 0) {
    log("No CLI tools detected. Install Claude Code, Codex, OpenCode, etc.", "yellow");
    return;
  }

  log(`Found ${installed.length} installed tools:`, "dim");
  for (const tool of installed) {
    log(`  - ${tool.name}`);
  }
  console.log();

  // Determine which tools to configure
  const toolsToConfigure = toolsArg
    ? toolsArg.split(",").filter((t) => CLI_TOOLS[t])
    : installed.map((t) => t.id);

  // Configure each tool
  log(`Configuring ${toolsToConfigure.length} tool(s)...\n`, "cyan");

  let successCount = 0;
  let failCount = 0;

  for (const toolId of toolsToConfigure) {
    const tool = CLI_TOOLS[toolId];
    log(`Configuring ${tool.name}...`, "dim");

    const result = configureTool(toolId, baseUrl, keyArg);

    if (result.success) {
      log(`  ✓ Configured: ${result.configPath}`, "green");
      if (result.backupPath) {
        log(`    Backup: ${result.backupPath}`, "dim");
      }
      successCount++;
    } else {
      log(`  ✗ Failed: ${result.error}`, "red");
      failCount++;
    }
  }

  logEndSection();

  console.log();
  if (successCount > 0) {
    log(`✓ Successfully configured ${successCount} tool(s)`, "green");
  }
  if (failCount > 0) {
    log(`✗ Failed to configure ${failCount} tool(s)`, "red");
  }

  console.log();
  log("Next steps:", "cyan");
  log("  1. Test: omniroute test", "dim");
  log("  2. Status: omniroute status", "dim");
  log("  3. Start server: omniroute", "dim");
}

async function runDoctor(args) {
  const verbose = args.includes("--verbose");
  const serverRunning = await checkServerHealth();

  logSection("OmniRoute Doctor");

  // Server status
  if (serverRunning) {
    log("Server:        " + colorize("✓ Running", "green"));
    log(`API:           http://localhost:${API_PORT}/v1`);
    log(`Dashboard:     http://localhost:${DASHBOARD_PORT}`);
  } else {
    log("Server:        " + colorize("✗ Not running", "red"));
    log("Run 'omniroute' to start the server", "dim");
  }
  logEndSection();

  // CLI Tools status
  logSection("CLI Tools Status");

  let tools;
  let dataSource = "local";

  if (serverRunning) {
    const apiStatus = await getCliToolsStatusFromApi();
    if (apiStatus) {
      dataSource = "api";
      tools = Object.entries(apiStatus).map(([id, data]) => ({
        id,
        name: CLI_TOOLS[id]?.name || id,
        installed: data.installed,
        configured: data.configStatus === "configured",
        runnable: data.runnable,
      }));
    }
  }

  if (!tools) {
    tools = detectInstalledTools();
  }

  // Sort: configured first, then installed, then not installed
  tools.sort((a, b) => {
    if (a.configured && !b.configured) return -1;
    if (!a.configured && b.configured) return 1;
    if (a.installed && !b.installed) return -1;
    if (!a.installed && b.installed) return 1;
    return 0;
  });

  for (const tool of tools) {
    let status;
    if (tool.configured) {
      status = colorize("✓ configured", "green");
    } else if (tool.installed) {
      status = colorize("○ not configured", "yellow");
    } else {
      status = colorize("✗ not installed", "red");
    }
    log(`  ${tool.name.padEnd(12)} ${status}`);
  }

  console.log(
    `\n${colorize("Data source:", "dim")} ${dataSource === "api" ? "API (accurate)" : "Local detection"}`
  );
  logEndSection();

  // Recommendations
  console.log();
  const notConfigured = tools.filter((t) => t.installed && !t.configured);
  if (notConfigured.length > 0) {
    log("Recommendations:", "cyan");
    log(`  Run 'omniroute setup --tools=${notConfigured.map((t) => t.id).join(",")}' to configure`);
  }

  if (!serverRunning) {
    log("  Run 'omniroute' to start the server for full diagnostics", "dim");
  }

  if (verbose && serverRunning) {
    console.log();
    logSection("System Info");
    log(`Node:      ${process.version}`);
    log(`Platform:  ${platform()} ${release()}`);
    log(`Home:      ${getHomeDir()}`);
    log(`Data Dir:  ${resolveConfigPath(".omniroute")}`);
    logEndSection();
  }
}

async function runStatus(args) {
  const json = args.includes("--json");
  const serverRunning = await checkServerHealth();

  const config = getOmniRouteConfig();
  const tools = detectInstalledTools();
  const configuredCount = tools.filter((t) => t.configured).length;
  const installedCount = tools.filter((t) => t.installed).length;

  if (json) {
    console.log(
      JSON.stringify(
        {
          server: {
            running: serverRunning,
            port: config.port,
            url: config.baseUrl,
          },
          dashboard: `http://localhost:${config.dashboardPort}`,
          config: {
            dataDir: config.dataDir,
            requireApiKey: config.requireApiKey,
            logLevel: config.logLevel,
          },
          tools: {
            total: Object.keys(CLI_TOOLS).length,
            installed: installedCount,
            configured: configuredCount,
          },
        },
        null,
        2
      )
    );
    return;
  }

  logSection("OmniRoute Status");
  log(
    `Server:       ${serverRunning ? colorize("✓ Running", "green") : colorize("✗ Stopped", "red")}`
  );
  log(`API URL:      ${config.baseUrl}/v1`);
  log(`Dashboard:    http://localhost:${config.dashboardPort}`);
  log(`Data Dir:     ${config.dataDir}`);
  logEndSection();

  logSection("CLI Tools");
  log(`Installed:   ${installedCount}`);
  log(`Configured:  ${configuredCount}`);
  console.log();

  for (const tool of tools) {
    const icon = tool.configured
      ? colorize("●", "green")
      : tool.installed
        ? colorize("○", "yellow")
        : colorize("×", "red");
    log(`  ${icon} ${tool.name}`);
  }
  logEndSection();
}

async function runLogs(args) {
  const linesArg = args.find((a) => a.startsWith("--lines="))?.split("=")[1] || "100";
  const levelArg = args.find((a) => a.startsWith("--level="))?.split("=")[1];
  const followArg = args.includes("--follow");
  const jsonArg = args.includes("--json");
  const searchArg = args.find((a) => a.startsWith("--search="))?.split("=")[1];

  const limit = Math.min(Math.max(parseInt(linesArg) || 100, 10), 1000);
  const level = levelArg || null;

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute'", "red");
    return;
  }

  if (jsonArg) {
    const logs = await getConsoleLogs(limit, level);
    console.log(JSON.stringify(logs, null, 2));
    return;
  }

  logSection("Console Logs");
  log(`Fetching last ${limit} lines...`, "dim");
  if (level) log(`Filter: ${level}`, "dim");
  if (searchArg) log(`Search: ${searchArg}`, "dim");
  logEndSection();

  let logs = await getConsoleLogs(limit, level);

  // Search filter
  if (searchArg) {
    const search = searchArg.toLowerCase();
    logs = logs.filter(
      (l) =>
        (l.msg || l.message || "").toLowerCase().includes(search) ||
        (l.level || "").toLowerCase().includes(search)
    );
  }

  if (logs.length === 0) {
    log("No logs found", "yellow");
    return;
  }

  for (const entry of logs) {
    const timestamp = entry.time || entry.timestamp || "";
    const lvl = entry.level || entry.severity || "info";
    const msg = entry.msg || entry.message || "";

    let color = "dim";
    if (lvl === "error" || lvl === "fatal") color = "red";
    else if (lvl === "warn") color = "yellow";
    else if (lvl === "debug") color = "dim";
    else color = "reset";

    console.log(`${colorize(timestamp.slice(0, 24), "dim")} [${lvl.slice(0, 5).padEnd(5)}] ${msg}`);
  }

  if (followArg) {
    log("\nFollowing logs (Ctrl+C to exit)...", "cyan");
    // Simple polling implementation
    let lastTime = logs[logs.length - 1]?.time || "";

    const interval = setInterval(async () => {
      const newLogs = await getConsoleLogs(50, level);
      const filtered = newLogs.filter((l) => l.time > lastTime);
      for (const entry of filtered) {
        const timestamp = entry.time || "";
        const lvl = entry.level || "info";
        const msg = entry.msg || "";
        let color = lvl === "error" ? "red" : lvl === "warn" ? "yellow" : "dim";
        console.log(
          `${colorize(timestamp.slice(0, 24), "dim")} [${lvl.slice(0, 5).padEnd(5)}] ${msg}`
        );
        lastTime = entry.time;
      }
    }, 2000);

    // Handle interrupt
    process.on("SIGINT", () => {
      clearInterval(interval);
      log("\nStopped following", "yellow");
      process.exit(0);
    });
  }
}

async function runProvider(args) {
  const action = args[0] || "list";

  if (action === "list") {
    logSection("Available Provider Integrations");
    for (const [id, name] of Object.entries({
      opencode: "OpenCode",
      cursor: "Cursor",
      cline: "Cline",
      vscode: "VS Code",
    })) {
      log(`  ${name}`);
    }
    logEndSection();
    log("\nUsage: omniroute provider add <name>", "dim");
    return;
  }

  if (action === "add") {
    const provider = args[1];
    if (!provider || !PROVIDER_HELP[provider]) {
      log(`Unknown provider: ${provider}`, "red");
      log("Available: " + Object.keys(PROVIDER_HELP).join(", "), "dim");
      return;
    }

    logSection(`Configure ${provider}`);
    console.log(PROVIDER_HELP[provider]);
    logEndSection();
    return;
  }

  log(`Unknown action: ${action}`, "red");
  log("Usage: omniroute provider [list|add <name>]", "dim");
}

async function runConfig(args) {
  const action = args[0] || "show";

  if (action === "show") {
    const config = getOmniRouteConfig();

    logSection("OmniRoute Configuration");
    log(`API Port:        ${config.port}`);
    log(`Dashboard Port:  ${config.dashboardPort}`);
    log(`Base URL:        ${config.baseUrl}`);
    log(`Data Directory: ${config.dataDir}`);
    log(`Require API Key: ${config.requireApiKey ? "Yes" : "No"}`);
    log(`Log Level:       ${config.logLevel}`);
    log(`Node Version:    ${config.nodeVersion}`);
    log(`Platform:        ${config.platform} ${config.osRelease}`);
    logEndSection();
    return;
  }

  log(`Unknown action: ${action}`, "red");
  log("Usage: omniroute config show", "dim");
}

async function runTest(args) {
  const providerArg = args.find((a) => a.startsWith("--provider="))?.split("=")[1];
  const modelArg = args.find((a) => a.startsWith("--model="))?.split("=")[1];

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute'", "red");
    return;
  }

  const provider = providerArg || "claude";
  const model = modelArg || "claude-sonnet-4-20250514";

  logSection("Testing Provider Connection");
  log(`Provider: ${provider}`);
  log(`Model:    ${model}`);
  log("Connecting...", "dim");
  console.log();

  const result = await testProviderConnection(provider, model);

  if (result.success) {
    log("✓ Connection successful!", "green");
    log(`Response: ${result.response}`, "dim");
  } else {
    log("✗ Connection failed!", "red");
    log(`Error: ${result.error}`, "yellow");
  }

  logEndSection();
}

async function runUpdate(args) {
  logSection("Checking for Updates");

  // Get current version
  try {
    const pkgPath = join(ROOT, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
    log(`Current version: ${colorize(pkg.version, "cyan")}`);
  } catch {
    log("Current version: unknown", "yellow");
  }

  // Get latest version from npm
  log("Checking npm...", "dim");
  const npmResult = execCommand("npm view omniroute version", 10000);

  if (npmResult.success) {
    const latest = npmResult.output.trim();
    // Try to get current version again for comparison
    const pkgPath = join(ROOT, "package.json");
    const current = JSON.parse(readFileSync(pkgPath, "utf8")).version;

    console.log();
    if (latest !== current) {
      log(`Latest version:  ${colorize(latest, "green")}`);
      log(`Update available! Run:`, "yellow");
      log(`  npm install -g omniroute@latest`, "dim");
    } else {
      log(`Latest version:  ${colorize(latest, "green")}`);
      log("Already on the latest version!", "green");
    }
  } else {
    log("Could not check for updates (npm not available)", "yellow");
  }

  logEndSection();
}

// ============================================================================
// PID FILE MANAGEMENT
// ============================================================================

function getPidFilePath() {
  return join(resolveConfigPath(".omniroute"), "server.pid");
}

function writePidFile(pid) {
  try {
    const dir = dirname(getPidFilePath());
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(getPidFilePath(), String(pid), "utf8");
    return true;
  } catch {
    return false;
  }
}

function readPidFile() {
  try {
    const path = getPidFilePath();
    if (!existsSync(path)) return null;
    const content = readFileSync(path, "utf8").trim();
    return content ? parseInt(content, 10) : null;
  } catch {
    return null;
  }
}

function isPidRunning(pid) {
  if (!pid) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function cleanupPidFile() {
  try {
    const path = getPidFilePath();
    if (existsSync(path)) {
      const fs = require("node:fs");
      fs.unlinkSync(path);
    }
  } catch {}
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(port, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch(`http://localhost:${port}/api/health`, {
        signal: AbortSignal.timeout(2000),
      });
      if (res.ok) return true;
    } catch {}
    await sleep(500);
  }
  return false;
}

// ============================================================================
// SERVER MANAGEMENT COMMANDS
// ============================================================================

async function runServe(args) {
  const portArg = args.find((a) => a.startsWith("--port="))?.split("=")[1];
  const port = portArg ? parseInt(portArg) : API_PORT;
  const daemonArg = args.includes("--daemon");

  logSection("Starting OmniRoute Server");

  // Check if already running via PID file
  const existingPid = readPidFile();
  if (existingPid && isPidRunning(existingPid)) {
    log(`Server already running (PID: ${existingPid})`, "red");
    log(`API:      http://localhost:${port}/v1`);
    log(`Dashboard: http://localhost:${port + 1}`);
    logEndSection();
    return;
  }

  // Check if port is in use
  const portCheck = execCommand(`lsof -ti:${port} 2>/dev/null || true`, 2000);
  if (portCheck.success && portCheck.output.trim()) {
    log(`Port ${port} is already in use`, "red");
    log("Stop the existing server or use a different port", "dim");
    logEndSection();
    return;
  }

  const appDir = join(ROOT, "app");
  const serverWsJs = join(appDir, "server-ws.mjs");
  const serverJs = existsSync(serverWsJs) ? serverWsJs : join(appDir, "server.js");

  if (!existsSync(serverJs)) {
    log("Server not found. Run 'npm run build' first.", "red");
    logEndSection();
    return;
  }

  log(`Starting server on port ${port}...`, "dim");

  const env = {
    ...process.env,
    OMNIROUTE_PORT: String(port),
    PORT: String(port + 1),
    DASHBOARD_PORT: String(port + 1),
    API_PORT: String(port),
    HOSTNAME: "0.0.0.0",
    NODE_ENV: "production",
  };

  const server = spawn("node", [serverJs], {
    cwd: appDir,
    env,
    stdio: daemonArg ? "ignore" : "pipe",
  });

  // Write PID file
  writePidFile(server.pid);

  if (daemonArg) {
    log(`Server started in background (PID: ${server.pid})`, "green");
    log(`API:      http://localhost:${port}/v1`);
    log(`Dashboard: http://localhost:${port + 1}`);
  } else {
    // Wait for server to be ready
    const ready = await waitForServer(port);
    if (ready) {
      log(`Server running!`, "green");
      log(`API:      http://localhost:${port}/v1`);
      log(`Dashboard: http://localhost:${port + 1}`);
      log("");
      log("Press Ctrl+C to stop", "dim");
    } else {
      log("Server may not have started properly", "yellow");
    }
  }

  logEndSection();

  if (!daemonArg) {
    // Keep process alive, handle shutdown
    process.on("SIGINT", () => {
      log("\nShutting down...", "yellow");
      server.kill("SIGTERM");
      cleanupPidFile();
      process.exit(0);
    });

    server.on("exit", (code) => {
      cleanupPidFile();
      if (code !== 0) {
        log(`Server exited with code ${code}`, "red");
      }
      process.exit(code || 0);
    });
  }
}

async function runStop(args) {
  logSection("Stopping OmniRoute Server");

  const pid = readPidFile();

  if (pid && isPidRunning(pid)) {
    log(`Sending SIGTERM to PID ${pid}...`, "dim");

    try {
      process.kill(pid, "SIGTERM");

      // Wait for graceful shutdown
      let waited = 0;
      while (waited < 5000 && isPidRunning(pid)) {
        await sleep(100);
        waited += 100;
      }

      if (isPidRunning(pid)) {
        log("Force killing...", "yellow");
        process.kill(pid, "SIGKILL");
        await sleep(500);
      }

      cleanupPidFile();
      log("Server stopped", "green");
    } catch (err) {
      log(`Error stopping server: ${err.message}`, "red");
    }
  } else {
    // Fallback: try to kill by port
    log("No PID file, trying port-based cleanup...", "dim");

    try {
      // Send SIGTERM first for graceful shutdown, then SIGKILL if still running
      execCommand("lsof -ti:20128 | xargs -r kill -15 2>/dev/null || true", 2000);
      execCommand("lsof -ti:20129 | xargs -r kill -15 2>/dev/null || true", 2000);
      await sleep(1000);
      execCommand("lsof -ti:20128 | xargs -r kill -9 2>/dev/null || true", 2000);
      execCommand("lsof -ti:20129 | xargs -r kill -9 2>/dev/null || true", 2000);
      cleanupPidFile();
      log("Server stopped (port-based)", "green");
    } catch {
      log("No server running", "yellow");
    }
  }

  logEndSection();
}

async function runRestart(args) {
  logSection("Restarting OmniRoute Server");

  const portArg = args.find((a) => a.startsWith("--port="))?.split("=")[1] || String(API_PORT);

  // Stop first
  await runStop([]);

  // Small delay
  await sleep(1000);

  // Start with same port
  log("Starting server...", "dim");
  await runServe(["--port=" + portArg]);

  logEndSection();
}

// ============================================================================
// API KEY MANAGEMENT
// ============================================================================

const VALID_PROVIDERS = [
  "openai",
  "anthropic",
  "google",
  "deepseek",
  "groq",
  "mistral",
  "xai",
  "cohere",
  "google-generativeai",
  "azure",
  "aws",
  "bedrock",
  "perplexity",
  "together",
  "fireworks",
  "huggingface",
  "nvidia",
  "cerebras",
  "siliconflow",
  "nebius",
  "openrouter",
  "ollama",
];

async function runKeys(args) {
  const action = args[0];

  if (!action) {
    logSection("API Key Management");
    log("Usage:");
    log("  omniroute keys add <provider> <api-key>");
    log("  omniroute keys list");
    log("  omniroute keys remove <provider>");
    log("");
    log(`Valid providers: ${VALID_PROVIDERS.join(", ")}`, "dim");
    logEndSection();
    return;
  }

  switch (action) {
    case "add":
      await runKeysAdd(args.slice(1));
      break;
    case "list":
      await runKeysList(args.slice(1));
      break;
    case "remove":
      await runKeysRemove(args.slice(1));
      break;
    default:
      log(`Unknown action: ${action}`, "red");
      log("Valid actions: add, list, remove", "dim");
  }
}

async function runKeysAdd(args) {
  const provider = args[0];
  const apiKey = args[1];

  if (!provider || !apiKey) {
    log("Usage: omniroute keys add <provider> <api-key>", "red");
    return;
  }

  const providerLower = provider.toLowerCase();
  if (!VALID_PROVIDERS.includes(providerLower)) {
    log(`Invalid provider. Valid: ${VALID_PROVIDERS.join(", ")}`, "red");
    return;
  }

  logSection(`Adding API Key for ${provider}`);

  // Try API first
  const serverRunning = await checkServerHealth();

  if (serverRunning) {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/v1/providers/keys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: providerLower, apiKey }),
      });

      if (res.ok) {
        log(`API key for ${provider} added successfully via API`, "green");
        logEndSection();
        return;
      }
    } catch {}
  }

  // Direct DB fallback
  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "red");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    // Check if connection exists
    const existing = db
      .prepare("SELECT id FROM provider_connections WHERE provider = ?")
      .get(providerLower);

    if (existing) {
      db.prepare("UPDATE provider_connections SET api_key = ? WHERE provider = ?").run(
        apiKey,
        providerLower
      );
      log(`API key for ${provider} updated`, "green");
    } else {
      db.prepare(
        "INSERT INTO provider_connections (id, provider, api_key, name, is_active) VALUES (?, ?, ?, ?, 1)"
      ).run(randomUUID(), providerLower, apiKey, provider);
      log(`API key for ${provider} added`, "green");
    }

    db.close();
  } catch (err) {
    log(`Failed to save key: ${err.message}`, "red");
  }

  logEndSection();
}

async function runKeysList(args) {
  logSection("Configured API Keys");

  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "yellow");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    const keys = db
      .prepare(
        `
      SELECT provider_id, api_key, enabled
      FROM provider_connections
      WHERE api_key IS NOT NULL AND api_key != ''
    `
      )
      .all();

    db.close();

    if (keys.length === 0) {
      log("No API keys configured", "yellow");
    } else {
      for (const key of keys) {
        const masked =
          key.api_key && key.api_key.length > 8
            ? key.api_key.slice(0, 6) + "***" + key.api_key.slice(-4)
            : "***";
        const status = key.enabled
          ? colorize("● enabled", "green")
          : colorize("○ disabled", "yellow");
        log(`  ${key.provider_id.padEnd(20)} ${masked.padEnd(20)} ${status}`);
      }
    }
  } catch (err) {
    log(`Error reading keys: ${err.message}`, "red");
  }

  logEndSection();
}

async function runKeysRemove(args) {
  const provider = args[0];

  if (!provider) {
    log("Usage: omniroute keys remove <provider>", "red");
    return;
  }

  logSection(`Removing API Key for ${provider}`);

  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "red");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    const result = db
      .prepare("DELETE FROM provider_connections WHERE provider_id = ?")
      .run(provider.toLowerCase());

    if (result.changes > 0) {
      log(`API key for ${provider} removed`, "green");
    } else {
      log(`No API key found for ${provider}`, "yellow");
    }

    db.close();
  } catch (err) {
    log(`Failed to remove key: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// MODEL BROWSER
// ============================================================================

async function runModels(args) {
  const providerFilter = args[0] && !args[0].startsWith("--") ? args[0] : null;
  const jsonOutput = args.includes("--json");
  const searchQuery = args.find((a) => a.startsWith("--search="))?.split("=")[1];

  logSection("Available Models");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve' or 'omniroute'", "red");
    logEndSection();
    return;
  }

  try {
    // Try various endpoints
    let models = [];

    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/models`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const data = await res.json();
        models = data.models || data || [];
      }
    } catch {}

    // Fallback: try provider registry
    if (models.length === 0) {
      try {
        const res = await fetch(`${DEFAULT_BASE_URL}/api/v1/models`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          models = await res.json();
        }
      } catch {}
    }

    // Filter by provider if specified
    if (providerFilter) {
      const filter = providerFilter.toLowerCase();
      models = models.filter(
        (m) =>
          (m.provider && m.provider.toLowerCase().includes(filter)) ||
          (m.id && m.id.toLowerCase().startsWith(filter)) ||
          (m.name && m.name.toLowerCase().includes(filter))
      );
    }

    // Search filter
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      models = models.filter(
        (m) =>
          (m.id && m.id.toLowerCase().includes(search)) ||
          (m.name && m.name.toLowerCase().includes(search)) ||
          (m.provider && m.provider.toLowerCase().includes(search)) ||
          (m.description && m.description.toLowerCase().includes(search))
      );
    }

    if (jsonOutput) {
      console.log(JSON.stringify(models, null, 2));
      logEndSection();
      return;
    }

    if (models.length === 0) {
      log("No models found", "yellow");
      logEndSection();
      return;
    }

    // Display as formatted table
    console.log();
    console.log(colorize("  Model".padEnd(45) + "Provider".padEnd(20) + "Context", "cyan"));
    console.log(
      colorize("  " + "─".repeat(44) + " " + "─".repeat(19) + " " + "─".repeat(10), "dim")
    );

    const displayModels = models.slice(0, 50);
    for (const model of displayModels) {
      const name = (model.id || model.name || "unknown").slice(0, 43);
      const provider = (model.provider || "unknown").slice(0, 18);
      const context = model.context_length || model.max_tokens || model.contextWindow || "-";
      console.log(`  ${name.padEnd(45)}${provider.padEnd(20)}${String(context).padEnd(10)}`);
    }

    console.log();
    if (models.length > 50) {
      log(`... and ${models.length - 50} more models. Use --json for full list.`, "dim");
    }

    log(`Total: ${models.length} models`, "green");
  } catch (err) {
    log(`Failed to fetch models: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// COMBO MANAGEMENT
// ============================================================================

async function runCombo(args) {
  const action = args[0];

  if (!action) {
    logSection("Combo Management");
    log("Usage:");
    log("  omniroute combo list");
    log("  omniroute combo switch <name>");
    log("  omniroute combo create <name> <strategy>");
    log("  omniroute combo delete <name>");
    log("");
    log("Strategies: priority, weighted, round-robin, p2c, random, auto, lkgp", "dim");
    logEndSection();
    return;
  }

  switch (action) {
    case "list":
      await runComboList(args.slice(1));
      break;
    case "switch":
      await runComboSwitch(args.slice(1));
      break;
    case "create":
      await runComboCreate(args.slice(1));
      break;
    case "delete":
      await runComboDelete(args.slice(1));
      break;
    default:
      log(`Unknown action: ${action}`, "red");
      log("Valid actions: list, switch, create, delete", "dim");
  }
}

async function runComboList(args) {
  const jsonOutput = args.includes("--json");

  logSection("Routing Combos");

  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "yellow");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    const combos = db
      .prepare(
        `
      SELECT id, name, strategy, enabled, target_count
      FROM combos
      ORDER BY name
    `
      )
      .all();

    // Get active combo
    let activeCombo = null;
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/combos/active`, {
        signal: AbortSignal.timeout(3000),
      });
      if (res.ok) {
        const data = await res.json();
        activeCombo = data.active || data.name || data.combo;
      }
    } catch {}

    db.close();

    if (jsonOutput) {
      console.log(JSON.stringify({ combos, active: activeCombo }, null, 2));
      logEndSection();
      return;
    }

    if (combos.length === 0) {
      log("No combos configured", "yellow");
    } else {
      for (const combo of combos) {
        const isActive = activeCombo && (combo.name === activeCombo || combo.id === activeCombo);
        const icon = isActive ? colorize("●", "green") : colorize("○", "dim");
        const status = combo.enabled ? colorize("enabled", "green") : colorize("disabled", "red");
        const strategy = combo.strategy || "priority";
        console.log(`  ${icon} ${combo.name.padEnd(25)} [${strategy.padEnd(12)}] ${status}`);
      }
    }
  } catch (err) {
    log(`Error reading combos: ${err.message}`, "red");
  }

  logEndSection();
}

async function runComboSwitch(args) {
  const name = args[0];

  if (!name) {
    log("Usage: omniroute combo switch <name>", "red");
    return;
  }

  logSection(`Switching to Combo: ${name}`);

  // Try API first
  const serverRunning = await checkServerHealth();

  if (serverRunning) {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/combos/switch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        log(`Switched to combo '${name}'`, "green");
        logEndSection();
        return;
      }
    } catch {}
  }

  // Direct DB fallback
  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "red");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    // Check combo exists
    const combo = db.prepare("SELECT id FROM combos WHERE name = ?").get(name);

    if (!combo) {
      log(`Combo '${name}' not found`, "red");
      db.close();
      logEndSection();
      return;
    }

    // Update settings to set active combo
    const settingsPath = join(dataDir, "settings.json");
    let settings = {};
    if (existsSync(settingsPath)) {
      try {
        settings = JSON.parse(readFileSync(settingsPath, "utf8"));
      } catch {}
    }

    settings.activeCombo = name;
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2), "utf8");

    log(`Switched to combo '${name}'`, "green");
    db.close();
  } catch (err) {
    log(`Failed to switch combo: ${err.message}`, "red");
  }

  logEndSection();
}

async function runComboCreate(args) {
  const name = args[0];
  const strategy = args[1] || "priority";

  if (!name) {
    log("Usage: omniroute combo create <name> [strategy]", "red");
    return;
  }

  const validStrategies = [
    "priority",
    "weighted",
    "round-robin",
    "p2c",
    "random",
    "auto",
    "lkgp",
    "context-optimized",
    "context-relay",
  ];
  if (!validStrategies.includes(strategy)) {
    log(`Invalid strategy. Valid: ${validStrategies.join(", ")}`, "red");
    return;
  }

  logSection(`Creating Combo: ${name}`);

  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "red");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    // Check if combo already exists
    const existing = db.prepare("SELECT id FROM combos WHERE name = ?").get(name);

    if (existing) {
      log(`Combo '${name}' already exists. Use 'combo delete' first.`, "red");
      db.close();
      logEndSection();
      return;
    }

    // Insert new combo
    db.prepare(
      `
      INSERT INTO combos (name, strategy, enabled, target_count)
      VALUES (?, ?, 1, 0)
    `
    ).run(name, strategy);

    log(`Combo '${name}' created with strategy '${strategy}'`, "green");
    log("Use 'omniroute combo switch " + name + "' to activate", "dim");
    db.close();
  } catch (err) {
    log(`Failed to create combo: ${err.message}`, "red");
  }

  logEndSection();
}

async function runComboDelete(args) {
  const name = args[0];

  if (!name) {
    log("Usage: omniroute combo delete <name>", "red");
    return;
  }

  logSection(`Deleting Combo: ${name}`);

  const dataDir = resolveConfigPath(".omniroute");
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    log("Database not found. Start server first.", "red");
    logEndSection();
    return;
  }

  try {
    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    const Database = require("better-sqlite3");
    const db = new Database(dbPath);

    const result = db.prepare("DELETE FROM combos WHERE name = ?").run(name);

    if (result.changes > 0) {
      log(`Combo '${name}' deleted`, "green");
    } else {
      log(`Combo '${name}' not found`, "yellow");
    }

    db.close();
  } catch (err) {
    log(`Failed to delete combo: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// SHELL COMPLETION
// ============================================================================

const VALID_SHELLS = ["bash", "zsh", "fish"];

async function runCompletion(args) {
  const shell = args[0];

  if (!shell) {
    logSection("Shell Completion");
    log("Usage:");
    log("  omniroute completion bash");
    log("  omniroute completion zsh");
    log("  omniroute completion fish");
    log("");
    log("To install:");
    log("  bash: omniroute completion bash > ~/.bash_completion");
    log("  zsh:  omniroute completion zsh > ~/.zsh/completions/_omniroute", "dim");
    logEndSection();
    return;
  }

  if (!VALID_SHELLS.includes(shell)) {
    log(`Invalid shell. Valid: ${VALID_SHELLS.join(", ")}`, "red");
    return;
  }

  switch (shell) {
    case "bash":
      console.log(generateBashCompletion());
      break;
    case "zsh":
      console.log(generateZshCompletion());
      break;
    case "fish":
      console.log(generateFishCompletion());
      break;
  }
}

function generateBashCompletion() {
  const script = `#!/bin/bash
# OmniRoute CLI Bash Completion

_omniroute() {
  local cur prev opts cmds
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"

  opts="--help --version"
  cmds="setup doctor status logs provider config test update serve stop restart keys models combo completion dashboard"

  # Command-specific options
  case "\${prev}" in
    setup)
      COMPREPLY=($(compgen -W "--tools --url --key --list" -- \${cur}))
      return 0
      ;;
    logs)
      COMPREPLY=($(compgen -W "--lines --level --follow" -- \${cur}))
      return 0
      ;;
    doctor)
      COMPREPLY=($(compgen -W "--verbose" -- \${cur}))
      return 0
      ;;
    status)
      COMPREPLY=($(compgen -W "--json" -- \${cur}))
      return 0
      ;;
    keys)
      COMPREPLY=($(compgen -W "add list remove" -- \${cur}))
      return 0
      ;;
    keys add)
      COMPREPLY=($(compgen -W "openai anthropic google deepseek groq mistral xai cohere" -- \${cur}))
      return 0
      ;;
    models)
      COMPREPLY=($(compgen -W "--json openai anthropic google deepseek groq" -- \${cur}))
      return 0
      ;;
    combo)
      COMPREPLY=($(compgen -W "list switch create delete" -- \${cur}))
      return 0
      ;;
    provider)
      COMPREPLY=($(compgen -W "list add" -- \${cur}))
      return 0
      ;;
    completion)
      COMPREPLY=($(compgen -W "bash zsh fish" -- \${cur}))
      return 0
      ;;
    serve)
      COMPREPLY=($(compgen -W "--port --daemon" -- \${cur}))
      return 0
      ;;
    test)
      COMPREPLY=($(compgen -W "--provider --model" -- \${cur}))
      return 0
      ;;
    dashboard)
      COMPREPLY=($(compgen -W "--url" -- \${cur}))
      return 0
      ;;
    config)
      COMPREPLY=($(compgen -W "show" -- \${cur}))
      return 0
      ;;
    *)
      COMPREPLY=($(compgen -W "\${cmds} \${opts}" -- \${cur}))
      return 0
      ;;
  esac
}

complete -F _omniroute omniroute
`;
  return script;
}

function generateZshCompletion() {
  return `#compdef omniroute

local -a commands
commands=(
  'setup:Configure CLI tools to use OmniRoute'
  'doctor:Run health diagnostics'
  'status:Show server and tools status'
  'logs:View application logs'
  'provider:Add OmniRoute as provider'
  'config:Show configuration'
  'test:Test provider connectivity'
  'update:Check for updates'
  'serve:Start the server'
  'stop:Stop the server'
  'restart:Restart the server'
  'keys:Manage API keys'
  'models:Browse available models'
  'combo:Manage routing combos'
  'completion:Generate shell completion'
  'dashboard:Open dashboard'
)

_arguments -C \\
  '1: :->command' \\
  '*:: :->arg' \\
  && return 0

case $state in
  command)
    _describe 'command' commands
    ;;
  arg)
    case $words[1] in
      setup)
        _arguments '--tools[Tools to configure]:tools:(claude codex opencode cline kilo continue openclaw)' '--url[Base URL]:url:' '--key[API Key]:key:' '--list[List available tools'
        ;;
      keys)
        case $words[2] in
          add)
            _arguments '2:provider:(openai anthropic google deepseek groq mistral xai cohere)' '3:api-key:'
            ;;
          remove)
            _arguments '2:provider:(openai anthropic google deepseek groq mistral xai cohere)'
            ;;
          *)
            _describe 'subcommand' 'add:Add API key' 'list:List keys' 'remove:Remove key'
            ;;
        esac
        ;;
      combo)
        _describe 'subcommand' 'list:List combos' 'switch:Switch combo' 'create:Create combo' 'delete:Delete combo'
        ;;
      completion)
        _arguments '2:shell:(bash zsh fish)'
        ;;
      serve)
        _arguments '--port[Port number]:port:' '--daemon[Run in background'
        ;;
      models)
        _arguments '--json[JSON output]' '2:provider:(openai anthropic google deepseek groq)'
        ;;
      logs)
        _arguments '--lines[Number of lines]:lines:' '--level[Log level]:level:(debug info warn error)' '--follow[Follow logs]'
        ;;
    esac
    ;;
esac
`;
}

function generateFishCompletion() {
  return `# OmniRoute CLI Fish Completion

complete -c omniroute -f

# Main commands
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'setup' -d 'Configure CLI tools'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'doctor' -d 'Run health diagnostics'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'status' -d 'Show status'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'logs' -d 'View logs'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'provider' -d 'Provider management'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'config' -d 'Show config'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'test' -d 'Test connectivity'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'update' -d 'Check updates'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'serve' -d 'Start server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'stop' -d 'Stop server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'restart' -d 'Restart server'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'keys' -d 'API key management'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'models' -d 'Browse models'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'combo' -d 'Combo management'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'completion' -d 'Shell completion'
complete -c omniroute -n '__fish_is_nth_arg 1' -a 'dashboard' -d 'Open dashboard'

# Subcommands
complete -c omniroute -n '__fish_seen_subcommand_from keys' -a 'add' -d 'Add key'
complete -c omniroute -n '__fish_seen_subcommand_from keys' -a 'list' -d 'List keys'
complete -c omniroute -n '__fish_seen_subcommand_from keys' -a 'remove' -d 'Remove key'

complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'list' -d 'List combos'
complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'switch' -d 'Switch combo'
complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'create' -d 'Create combo'
complete -c omniroute -n '__fish_seen_subcommand_from combo' -a 'delete' -d 'Delete combo'

complete -c omniroute -n '__fish_seen_subcommand_from completion' -a 'bash' -d 'Bash completion'
complete -c omniroute -n '__fish_seen_subcommand_from completion' -a 'zsh' -d 'Zsh completion'
complete -c omniroute -n '__fish_seen_subcommand_from completion' -a 'fish' -d 'Fish completion'
`;
}

// ============================================================================
// DASHBOARD COMMAND
// ============================================================================

async function runDashboard(args) {
  const urlOnly = args.includes("--url");

  const dashboardUrl = `http://localhost:${DASHBOARD_PORT}`;

  if (urlOnly) {
    console.log(dashboardUrl);
    return;
  }

  logSection("Opening Dashboard");

  try {
    const { execSync } = require("node:child_process");
    const platform = process.platform;

    let command;
    if (platform === "darwin") {
      command = `open "${dashboardUrl}"`;
    } else if (platform === "win32") {
      command = `start "" "${dashboardUrl}"`;
    } else {
      command = `xdg-open "${dashboardUrl}" 2>/dev/null || sensible-browser "${dashboardUrl}" 2>/dev/null || echo "Cannot open browser. Go to: ${dashboardUrl}"`;
    }

    execSync(command, { stdio: "ignore" });
    log(`Opening: ${dashboardUrl}`, "green");
  } catch {
    log(`Open in browser: ${dashboardUrl}`, "yellow");
  }

  logEndSection();
}

// ============================================================================
// BACKUP & RESTORE
// ============================================================================

async function runBackup(args) {
  const dataDir = resolveConfigPath(".omniroute");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const backupDir = join(dataDir, "backups");
  const backupName = `omniroute-backup-${timestamp}`;
  const backupPath = join(backupDir, backupName);

  logSection("Creating Backup");

  try {
    // Ensure backup directory exists
    if (!existsSync(backupDir)) {
      mkdirSync(backupDir, { recursive: true });
    }

    // Files to backup
    const filesToBackup = [
      { name: "storage.sqlite", dest: "storage.sqlite" },
      { name: "settings.json", dest: "settings.json" },
      { name: "combos.json", dest: "combos.json" },
      { name: "providers.json", dest: "providers.json" },
    ];

    let backedUp = 0;
    let skipped = 0;

    const { createRequire } = await import("node:module");
    const require = createRequire(import.meta.url);
    let Database;
    try {
      Database = require("better-sqlite3");
    } catch {
      Database = null;
    }

    for (const file of filesToBackup) {
      const sourcePath = join(dataDir, file.name);
      if (existsSync(sourcePath)) {
        const destPath = join(backupPath, file.dest);
        mkdirSync(dirname(destPath), { recursive: true });
        if (file.name.endsWith(".sqlite") && Database) {
          // Use better-sqlite3 backup API for a consistent snapshot (safe with WAL)
          const db = new Database(sourcePath, { readonly: true });
          await db.backup(destPath);
          db.close();
        } else {
          copyFileSync(sourcePath, destPath);
        }
        backedUp++;
      } else {
        skipped++;
      }
    }

    if (backedUp > 0) {
      // Create backup info
      const info = {
        timestamp: new Date().toISOString(),
        version: "omniroute-cli-v1",
        files: filesToBackup.filter((f) => existsSync(join(dataDir, f.name))).map((f) => f.name),
      };
      writeFileSync(join(backupPath, "backup-info.json"), JSON.stringify(info, null, 2), "utf8");

      log(`Backup created: ${backupName}`, "green");
      log(`Files: ${backedUp} backed up, ${skipped} skipped`, "dim");
      log(`Location: ${backupPath}`, "dim");
    } else {
      log("No files to backup (database not initialized)", "yellow");
    }
  } catch (err) {
    log(`Backup failed: ${err.message}`, "red");
  }

  logEndSection();
}

async function runRestore(args) {
  const backupName = args[0];
  const dataDir = resolveConfigPath(".omniroute");
  const backupDir = join(dataDir, "backups");

  if (!backupName) {
    logSection("Available Backups");
    if (!existsSync(backupDir)) {
      log("No backups found", "yellow");
      logEndSection();
      return;
    }

    try {
      const dirs = readdirSync(backupDir).filter((f) => f.startsWith("omniroute-backup-"));
      if (dirs.length === 0) {
        log("No backups found", "yellow");
      } else {
        for (const dir of dirs.sort().reverse()) {
          const infoPath = join(backupDir, dir, "backup-info.json");
          if (existsSync(infoPath)) {
            const info = JSON.parse(readFileSync(infoPath, "utf8"));
            log(`  ${dir.replace("omniroute-backup-", "")}`);
            log(
              `    ${new Date(info.timestamp).toLocaleString()} - ${info.files?.length || 0} files`,
              "dim"
            );
          } else {
            log(`  ${dir.replace("omniroute-backup-", "")}`, "dim");
          }
        }
      }
    } catch (err) {
      log(`Error listing backups: ${err.message}`, "red");
    }
    logEndSection();
    console.log("Usage: omniroute restore <backup-timestamp>");
    return;
  }

  logSection(`Restoring from: ${backupName}`);

  const backupPath = join(backupDir, `omniroute-backup-${backupName}`);

  if (!existsSync(backupPath)) {
    log(`Backup not found: ${backupName}`, "red");
    logEndSection();
    return;
  }

  try {
    // Restore files
    const filesToRestore = [
      { name: "storage.sqlite", dest: "storage.sqlite" },
      { name: "settings.json", dest: "settings.json" },
      { name: "combos.json", dest: "combos.json" },
      { name: "providers.json", dest: "providers.json" },
    ];

    for (const file of filesToRestore) {
      const sourcePath = join(backupPath, file.dest);
      if (existsSync(sourcePath)) {
        const destPath = join(dataDir, file.name);
        copyFileSync(sourcePath, destPath);
        log(`Restored: ${file.name}`, "dim");
      }
    }

    log("Backup restored successfully!", "green");
    log("Restart OmniRoute to load restored data", "dim");
  } catch (err) {
    log(`Restore failed: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// QUOTA MANAGEMENT
// ============================================================================

async function runQuota(args) {
  const jsonOutput = args.includes("--json");

  logSection("Provider Quota Usage");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve'", "red");
    logEndSection();
    return;
  }

  try {
    // Try quota endpoint
    let quotaData = null;
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/quota`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        quotaData = await res.json();
      }
    } catch {}

    // Fallback: get from providers
    if (!quotaData) {
      try {
        const res = await fetch(`${DEFAULT_BASE_URL}/api/v1/providers`, {
          signal: AbortSignal.timeout(5000),
        });
        if (res.ok) {
          const providers = await res.json();
          quotaData = {
            providers: providers.map((p) => ({
              provider: p.name || p.id,
              quota: p.quota || p.remaining || "N/A",
              used: p.used || 0,
              reset: p.resetAt || "N/A",
            })),
          };
        }
      } catch {}
    }

    if (jsonOutput) {
      console.log(JSON.stringify(quotaData || { error: "No quota data" }, null, 2));
      logEndSection();
      return;
    }

    if (!quotaData?.providers) {
      log("No quota information available", "yellow");
      logEndSection();
      return;
    }

    console.log();
    console.log(
      colorize(
        "  Provider".padEnd(25) + "Used".padEnd(15) + "Remaining".padEnd(20) + "Reset",
        "cyan"
      )
    );
    console.log(
      colorize(
        "  " + "─".repeat(24) + " " + "─".repeat(14) + " " + "─".repeat(19) + " " + "─".repeat(15),
        "dim"
      )
    );

    for (const p of quotaData.providers) {
      const provider = (p.provider || "unknown").slice(0, 23);
      const used = String(p.used || 0).padEnd(14);
      const remaining = (p.quota || p.remaining || "N/A").toString().slice(0, 18);
      const reset = p.reset || "N/A";
      console.log(`  ${provider.padEnd(25)}${used.padEnd(15)}${remaining.padEnd(20)}${reset}`);
    }

    log(`Total: ${quotaData.providers.length} providers`, "green");
  } catch (err) {
    log(`Failed to fetch quota: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// HEALTH STATUS
// ============================================================================

async function runHealth(args) {
  const verbose = args.includes("--verbose");
  const jsonOutput = args.includes("--json");

  logSection("OmniRoute Health");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve'", "red");
    logEndSection();
    return;
  }

  try {
    const res = await fetch(`${DEFAULT_BASE_URL}/api/health`, {
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const health = await res.json();

      if (jsonOutput) {
        console.log(JSON.stringify(health, null, 2));
        logEndSection();
        return;
      }

      // Display health info
      log(`Status: ${colorize("healthy", "green")}`);
      log(`Uptime: ${health.uptime || "N/A"}`);
      log(`Version: ${health.version || "N/A"}`);

      if (health.breakers) {
        console.log();
        logSection("Circuit Breakers");
        for (const [name, status] of Object.entries(health.breakers)) {
          const state =
            status.state === "closed"
              ? colorize("● closed", "green")
              : colorize("○ open", "yellow");
          log(`  ${name.padEnd(20)} ${state}`);
        }
      }

      if (health.cache) {
        console.log();
        logSection("Cache Status");
        log(`  Semantic: ${health.cache.semanticHits || 0} hits`);
        log(`  Signature: ${health.cache.signatureHits || 0} hits`);
      }

      if (verbose && health.memory) {
        console.log();
        logSection("Memory");
        log(`  RSS: ${health.memory.rss || "N/A"}`);
        log(`  Heap Used: ${health.memory.heapUsed || "N/A"}`);
      }
    }
  } catch (err) {
    log(`Failed to get health: ${err.message}`, "red");
  }

  logEndSection();
}

// ============================================================================
// CACHE MANAGEMENT
// ============================================================================

async function runCache(args) {
  const action = args[0];

  if (!action || action === "status") {
    logSection("Cache Status");

    const serverRunning = await checkServerHealth();

    if (!serverRunning) {
      log("Server not running. Start with 'omniroute serve'", "yellow");
      logEndSection();
      return;
    }

    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/cache/stats`, {
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const stats = await res.json();
        log(`Semantic Cache: ${stats.semanticHits || 0} hits`);
        log(`Signature Cache: ${stats.signatureHits || 0} hits`);
      } else {
        log("Cache stats not available", "yellow");
      }
    } catch {
      log("Cache stats not available", "yellow");
    }
    logEndSection();
    return;
  }

  if (action === "clear") {
    logSection("Clearing Cache");

    const serverRunning = await checkServerHealth();

    if (!serverRunning) {
      log("Server not running. Cannot clear cache.", "red");
      logEndSection();
      return;
    }

    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/cache/clear`, {
        method: "POST",
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        log("Cache cleared successfully!", "green");
      } else {
        log("Failed to clear cache", "red");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
    logEndSection();
    return;
  }

  log(`Unknown cache action: ${action}`, "red");
  log("Valid actions: status, clear", "dim");
}

// ============================================================================
// MCP SERVER STATUS
// ============================================================================

async function runMcp(args) {
  const action = args[0] || "status";

  logSection("MCP Server");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve'", "red");
    logEndSection();
    return;
  }

  if (action === "status" || action === "list") {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/mcp/status`, {
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const status = await res.json();
        log(
          `Status: ${status.running ? colorize("running", "green") : colorize("stopped", "red")}`
        );
        log(`Tools: ${status.toolsCount || 0}`);
        log(`Transport: ${status.transport || "stdio"}`);

        if (status.scopes) {
          console.log();
          log("Scopes:");
          for (const scope of status.scopes) {
            log(`  - ${scope}`);
          }
        }
      } else {
        log("MCP status not available", "yellow");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else if (action === "restart") {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/mcp/restart`, {
        method: "POST",
        signal: AbortSignal.timeout(10000),
      });

      if (res.ok) {
        log("MCP server restarted", "green");
      } else {
        log("Failed to restart MCP", "red");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else {
    log(`Unknown action: ${action}`, "red");
    log("Valid actions: status, list, restart", "dim");
  }

  logEndSection();
}

// ============================================================================
// A2A SERVER STATUS
// ============================================================================

async function runA2a(args) {
  const action = args[0] || "status";

  logSection("A2A Server");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve'", "red");
    logEndSection();
    return;
  }

  if (action === "status" || action === "list") {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/a2a/status`, {
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const status = await res.json();
        log(
          `Status: ${status.running ? colorize("running", "green") : colorize("stopped", "red")}`
        );
        log(`Protocol: ${status.protocol || "JSON-RPC 2.0"}`);
        log(`Tasks: ${status.activeTasks || 0} active`);

        if (status.skills) {
          console.log();
          log("Skills:");
          for (const skill of status.skills) {
            log(`  - ${skill.name}: ${skill.description || "N/A"}`, "dim");
          }
        }
      } else {
        log("A2A status not available", "yellow");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else if (action === "card") {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/.well-known/agent.json`, {
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const card = await res.json();
        console.log(JSON.stringify(card, null, 2));
      } else {
        log("Agent card not available", "yellow");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else {
    log(`Unknown action: ${action}`, "red");
    log("Valid actions: status, list, card", "dim");
  }

  logEndSection();
}

// ============================================================================
// TUNNEL MANAGEMENT
// ============================================================================

async function runTunnel(args) {
  const action = args[0];

  logSection("Tunnel Management");

  const serverRunning = await checkServerHealth();

  if (!serverRunning) {
    log("Server not running. Start with 'omniroute serve'", "red");
    logEndSection();
    return;
  }

  if (!action || action === "list") {
    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/tunnels`, {
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const tunnels = await res.json();

        if (tunnels.length === 0) {
          log("No active tunnels", "yellow");
        } else {
          for (const t of tunnels) {
            const status = t.active ? colorize("● active", "green") : colorize("○ inactive", "dim");
            log(`  ${t.type || "unknown"}: ${t.url || "N/A"} ${status}`);
          }
        }
      } else {
        log("Tunnel info not available", "yellow");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else if (action === "create" || action === "add") {
    const tunnelType = args[1] || "cloudflare";

    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/tunnels`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: tunnelType }),
        signal: AbortSignal.timeout(15000),
      });

      if (res.ok) {
        const result = await res.json();
        log(`Tunnel created: ${result.url}`, "green");
      } else {
        log("Failed to create tunnel", "red");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else if (action === "stop" || action === "delete") {
    const tunnelType = args[1];

    try {
      const res = await fetch(`${DEFAULT_BASE_URL}/api/tunnels/${tunnelType}`, {
        method: "DELETE",
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        log(`Tunnel ${tunnelType} stopped`, "green");
      } else {
        log("Failed to stop tunnel", "red");
      }
    } catch (err) {
      log(`Error: ${err.message}`, "red");
    }
  } else {
    log("Valid actions: list, create <type>, stop <type>");
    log("Types: cloudflare, tailscale, ngrok", "dim");
  }

  logEndSection();
}

// ============================================================================
// ENVIRONMENT VARIABLES
// ============================================================================

async function runEnv(args) {
  const action = args[0];

  if (!action || action === "show" || action === "list") {
    logSection("Environment Variables");

    const importantVars = [
      "PORT",
      "API_PORT",
      "DASHBOARD_PORT",
      "DATA_DIR",
      "REQUIRE_API_KEY",
      "LOG_LEVEL",
      "NODE_ENV",
      "REQUEST_TIMEOUT_MS",
      "ENABLE_SOCKS5_PROXY",
    ];

    log("Current configuration:");
    console.log();

    for (const key of importantVars) {
      const value = process.env[key];
      if (value !== undefined) {
        log(`  ${key.padEnd(25)} ${value}`, "dim");
      }
    }

    console.log();
    log("Defaults:", "dim");
    log("  PORT                20128");
    log("  DASHBOARD_PORT      20129");
    log("  DATA_DIR            ~/.omniroute");
    logEndSection();
    return;
  }

  if (action === "get") {
    const key = args[1];
    if (!key) {
      log("Usage: omniroute env get <key>", "red");
      return;
    }
    console.log(process.env[key] || "");
    return;
  }

  if (action === "set") {
    const key = args[1];
    const value = args[2];

    if (!key || value === undefined) {
      log("Usage: omniroute env set <key> <value>", "red");
      return;
    }

    log(`Setting ${key}=${value} (temporary - only affects current session)`, "yellow");
    process.env[key] = value;
    log("Set successfully (note: this is temporary)", "green");
    return;
  }

  log("Valid actions: show, get <key>, set <key> <value>", "dim");
}
