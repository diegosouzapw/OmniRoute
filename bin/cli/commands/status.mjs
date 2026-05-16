import { printHeading } from "../io.mjs";
import { resolveDataDir, resolveStoragePath } from "../data-dir.mjs";
import { t } from "../i18n.mjs";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

function getPackageVersion() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf-8"));
    return pkg.version || "unknown";
  } catch {
    return "unknown";
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

export function registerStatus(program) {
  program
    .command("status")
    .description("Show OmniRoute status dashboard")
    .option("-v, --verbose", "Show additional details")
    .action(async (opts, cmd) => {
      const globalOpts = cmd.optsWithGlobals();
      const exitCode = await runStatusCommand({ ...opts, output: globalOpts.output });
      if (exitCode !== 0) process.exit(exitCode);
    });
}

export async function runStatusCommand(opts = {}) {
  const isJson = opts.output === "json";
  const isVerbose = opts.verbose;

  const dataDir = resolveDataDir();
  const dbPath = resolveStoragePath(dataDir);
  const version = getPackageVersion();

  const status = {
    version,
    dataDir,
    database: {
      exists: fs.existsSync(dbPath),
      path: dbPath,
      size: fs.existsSync(dbPath) ? formatBytes(fs.statSync(dbPath).size) : null,
    },
    configDir: path.join(dataDir, "config"),
    configExists: fs.existsSync(path.join(dataDir, "config")),
  };

  if (isVerbose || !isJson) {
    try {
      const { detectAllTools } = await import("../../../src/lib/cli-helper/tool-detector.js");
      const tools = await detectAllTools();
      status.tools = tools.map((t) => ({
        id: t.id,
        name: t.name,
        installed: t.installed,
        configured: t.configured,
        version: t.version || null,
      }));
    } catch {
      status.tools = "unavailable";
    }
  }

  if (isJson) {
    console.log(JSON.stringify(status, null, 2));
    return 0;
  }

  printHeading("OmniRoute Status");
  console.log(`  Version:     ${status.version}`);
  console.log(`  Data Dir:    ${status.dataDir}`);
  console.log(
    `  Database:    ${status.database.exists ? "Found" : "Not found"} (${status.database.size || "N/A"})`
  );
  console.log(`  Config Dir:  ${status.configExists ? "Exists" : "Not found"}`);

  if (status.tools) {
    console.log("\n  CLI Tools:");
    for (const tool of status.tools) {
      const icon = tool.configured ? "✓" : tool.installed ? "~" : "✗";
      console.log(
        `    ${icon} ${tool.name.padEnd(14)} ${tool.installed ? "installed" : "not installed"}${tool.version ? ` (${tool.version})` : ""}`
      );
    }
  }

  return 0;
}
