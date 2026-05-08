#!/usr/bin/env node

/**
 * CLI Commands - Standalone implementation
 * No TypeScript imports - fully self-contained
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir, platform } from "node:os";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// CLI tool configurations
const CLI_TOOL_IDS = [
  "claude",
  "codex",
  "openclaw",
  "cursor",
  "windsurf",
  "cline",
  "kilo",
  "continue",
  "opencode",
  "qoder",
  "qwen",
  "gemini",
];

// Tool names defined in getToolConfig

function getToolConfig(id) {
  const configs = {
    claude: { command: "claude", name: "Claude Code" },
    codex: { command: "codex", name: "Codex CLI" },
    openclaw: { command: "openclaw", name: "OpenClaw" },
    cursor: { command: "cursor", name: "Cursor" },
    windsurf: { command: "windsurf", name: "Windsurf" },
    cline: { command: "cline", name: "Cline" },
    kilo: { command: "kilocode", name: "Kilo Code" },
    continue: { command: "continue", name: "Continue" },
    opencode: { command: "opencode", name: "OpenCode" },
    qoder: { command: "qoder", name: "Qoder" },
    qwen: { command: "qwen", name: "Qwen CLI" },
    gemini: { command: "gemini", name: "Gemini CLI" },
  };
  return configs[id] || { command: id, name: id };
}

// Detect installed CLI tools
function detectAllTools() {
  const results = [];

  for (const id of CLI_TOOL_IDS) {
    const tool = getToolConfig(id);
    let installed = false;
    let version = null;

    try {
      execSync(`${tool.command} --version 2>/dev/null`, { stdio: "ignore" });
      installed = true;
      try {
        version = execSync(`${tool.command} --version 2>&1`, { encoding: "utf8", timeout: 3000 })
          .trim()
          .slice(0, 15);
      } catch {
        version = "installed";
      }
    } catch {
      installed = false;
    }

    results.push({
      id,
      name: tool.name,
      installed,
      version,
    });
  }

  return { tools: results };
}

// Check server health
async function checkServerHealth() {
  try {
    const res = await fetch("http://localhost:20128/api/health", {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Fetch CLI tools status from existing API when server is running
async function getCliToolsStatusFromApi() {
  try {
    const res = await fetch("http://localhost:20128/api/cli-tools/status", {
      method: "GET",
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return null;
}

// Main subcommand runner
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
    case "update":
      await runUpdate(args);
      break;
    default:
      console.log(`Unknown subcommand: ${cmd}`);
      process.exit(1);
  }
}

async function runSetup(args) {
  const nonInteractive = args.includes("--non-interactive") || args.includes("-y");
  const urlArg = args.find((a) => a.startsWith("--url="))?.split("=")[1];
  const keyArg = args.find((a) => a.startsWith("--key="))?.split("=")[1];
  const toolsArg = args.find((a) => a.startsWith("--tools="))?.split("=")[1];

  console.log("\n🔍 Scanning for CLI tools...");

  const result = detectAllTools();
  const installed = result.tools.filter((t) => t.installed);

  if (installed.length === 0) {
    console.log("✗ No CLI tools detected");
    console.log("\nInstall one of: Claude Code, Codex, OpenCode, Cline, Kilo, etc.");
    return;
  }

  console.log("\n📦 Installed CLI tools:");
  for (const tool of installed) {
    console.log(`  ✓ ${tool.name.padEnd(14)} (${tool.version || "unknown"})`);
  }

  if (nonInteractive) {
    const url = urlArg || "http://localhost:20128";
    // const key = keyArg || "sk-omniroute-test"; // TODO: actually configure
    const tools = toolsArg ? toolsArg.split(",") : installed.map((t) => t.id);

    console.log(`\n⚙️  Configuring: ${tools.join(", ")}`);
    console.log(`   URL: ${url}`);

    for (const toolId of tools) {
      console.log(`   ${toolId}...`);
    }
    console.log("\n✅ Setup complete! (mock)");
    return;
  }

  console.log(`
  
📡 To configure: omniroute setup --non-interactive --url=http://localhost:20128 --key=sk-xxx --tools=claude,opencode

Or run the dashboard: omniroute
Then visit: http://localhost:20128/dashboard/cli-tools`);
}

async function runDoctor(args) {
  const verbose = args.includes("--verbose");

  console.log(`
╔════════════════════════════════════╗
║         OmniRoute Doctor           ║
╚════════════════════════════════════╝
`);

  // Check server status and fetch from API if running
  console.log("┌─ OmniRoute Server ─────────────────┐");
  const serverRunning = await checkServerHealth();
  const apiStatus = serverRunning ? await getCliToolsStatusFromApi() : null;

  if (serverRunning) {
    console.log("│ Status        ✓ Running             │");
  } else {
    console.log("│ Status        ✗ Not running          │");
    console.log("│              Run 'omniroute' to start │");
  }
  console.log("└─────────────────────────────────────┘");

  // Check CLI tools - use API if available, otherwise local detection
  console.log("\n┌─ CLI Tools ─────────────────────────┐");

  if (apiStatus) {
    // Use API data (more accurate - reads actual config files)
    for (const [toolId, data] of Object.entries(apiStatus)) {
      const tool = getToolConfig(toolId);
      const icon = data.installed ? "✓" : "✗";
      const status =
        data.configStatus === "configured"
          ? "configured"
          : data.installed
            ? "installed"
            : "not found";
      console.log(`│ ${icon} ${tool.name.padEnd(14)} ${status.padEnd(18)}│`);
    }
  } else {
    // Fallback to local detection
    const result = detectAllTools();
    for (const tool of result.tools) {
      const icon = tool.installed ? "✓" : "✗";
      const state = tool.installed ? tool.version || "installed" : "not found";
      console.log(`│ ${icon} ${tool.name.padEnd(14)} ${state.padEnd(18)}│`);
    }
  }
  console.log("└─────────────────────────────────────┘");

  if (verbose) {
    console.log("\n📋 Detailed diagnostics (verbose mode)");
    console.log(`   Node: ${process.version}`);
    console.log(`   Platform: ${platform()}`);
    console.log(`   Home: ${homedir()}`);
    if (apiStatus) {
      console.log("   Data source: API (accurate config reading)");
    } else {
      console.log("   Data source: Local detection (basic)");
    }
  }

  console.log("\n💡 Run 'omniroute doctor --verbose' for detailed diagnostics");
}

async function runStatus(args) {
  const json = args.includes("--json");

  const serverRunning = await checkServerHealth();
  const apiStatus = serverRunning ? await getCliToolsStatusFromApi() : null;

  const localResult = detectAllTools();
  const installedCount = apiStatus
    ? Object.values(apiStatus).filter((d) => d.installed).length
    : localResult.tools.filter((t) => t.installed).length;

  if (json) {
    console.log(
      JSON.stringify(
        {
          server: serverRunning ? "running" : "stopped",
          tools: apiStatus || localResult.tools,
          installed: installedCount,
          source: apiStatus ? "api" : "local",
        },
        null,
        2
      )
    );
    return;
  }

  console.log(`
┌─ OmniRoute Status ─────────────────┐
│ Server       ${serverRunning ? "✓ Running" : "✗ Stopped".padEnd(25)}│
│ Dashboard    http://localhost:20129  │
│ Data         ${apiStatus ? "API (accurate)" : "Local (basic)".padEnd(18)}│
└─────────────────────────────────────┘

┌─ CLI Tools (${installedCount} installed) ─────┐`);

  const tools = apiStatus
    ? Object.entries(apiStatus).map(([id, data]) => ({
        id,
        name: getToolConfig(id).name,
        installed: data.installed,
        version: data.configStatus === "configured" ? "configured" : "",
      }))
    : localResult.tools;

  for (const tool of tools) {
    const icon = tool.installed ? "✓" : "✗";
    const version = (tool.version || "").padEnd(12);
    console.log(`│ ${icon} ${tool.name.padEnd(14)} ${version}│`);
  }
  console.log("└─────────────────────────────────────┘");
}

async function runLogs(args) {
  console.log("📡 Streaming logs (Ctrl+C to exit)...");

  try {
    const response = await fetch("http://localhost:20128/api/v1/logs?stream=true");
    if (!response.ok) {
      console.log("✗ Could not connect. Is OmniRoute running?");
      console.log("   Run 'omniroute' to start the server.");
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      process.stdout.write(decoder.decode(value));
    }
  } catch (e) {
    console.log("✗ Could not connect. Is OmniRoute running?");
    console.log("   Run 'omniroute' to start the server.");
  }
}

async function runProvider(args) {
  const action = args[0] || "list";

  if (action === "add") {
    console.log("📦 Adding OmniRoute as OpenCode provider...");

    const configDir = join(homedir(), ".config", "opencode");
    const configPath = join(configDir, "opencode.json");

    try {
      mkdirSync(configDir, { recursive: true });
    } catch {}

    let config = {};
    try {
      if (existsSync(configPath)) {
        config = JSON.parse(readFileSync(configPath, "utf8"));
      }
    } catch {}

    config.provider = {
      ...config.provider,
      omniroute: {
        name: "OmniRoute AI Gateway",
        npm: "@ai-sdk/openai-compatible",
        options: {
          baseURL: "http://localhost:20128/v1",
        },
      },
    };

    writeFileSync(configPath, JSON.stringify(config, null, 2));

    console.log("✅ Added omniroute to OpenCode config");
    console.log(`   📁 ${configPath}`);
    console.log("\n⚠️  Set OMNIROUTE_API_KEY in your environment");
  } else if (action === "list") {
    console.log("📋 Available providers:");
    console.log("   - OpenCode (via omniroute)");
    console.log("   - Claude Code (OAuth)");
    console.log("   - Codex (OAuth)");
    console.log("   - Gemini CLI (OAuth)");
  } else {
    console.log("Usage: omniroute provider [add|list]");
  }
}

async function runUpdate(_args) {
  console.log("🔄 Checking for updates...");

  try {
    const pkgPath = join(ROOT, "package.json");
    if (existsSync(pkgPath)) {
      const { version } = JSON.parse(readFileSync(pkgPath, "utf8"));
      console.log(`Current version: ${version}`);
    }

    try {
      const latest = execSync("npm view omniroute version 2>/dev/null", {
        encoding: "utf8",
      }).trim();
      console.log(`Latest version: ${latest}`);

      if (latest) {
        const current = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).version;
        if (latest !== current) {
          console.log(`\n⚠️  Update available! Run: npm install -g omniroute@latest`);
        } else {
          console.log("\n✅ You have the latest version");
        }
      }
    } catch {
      console.log("(Could not check npm for latest version)");
    }
  } catch (e) {
    console.log("✗ Could not read version info");
  }
}
