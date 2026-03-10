#!/usr/bin/env node
/**
 * system-info.mjs — OmniRoute System Information Reporter (#280)
 *
 * Collects system/environment info for bug reports.
 * Usage: node scripts/system-info.mjs [--output system-info.txt]
 *
 * Output includes:
 *   - Node.js version
 *   - OmniRoute version
 *   - OS info
 *   - Relevant system packages (if apt available)
 *   - Agent CLI tools (iflow, gemini, claude, codex, antigravity, droid, etc.)
 *   - Docker / PM2 status
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import os from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── Helpers ────────────────────────────────────────────────────────────────

function run(cmd, fallback = "N/A") {
  try {
    return execSync(cmd, { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }).trim();
  } catch {
    return fallback;
  }
}

function toolVersion(cmd, args = "--version") {
  const version = run(`${cmd} ${args}`, null);
  if (version === null) return "not installed";
  // Trim to first line, remove prefixes like "v", "Version: "
  return version
    .split("\n")[0]
    .replace(/^(version\s*:?\s*|v)/i, "")
    .trim();
}

function section(title) {
  const line = "─".repeat(60);
  return `\n${line}\n  ${title}\n${line}\n`;
}

// ── Collect Info ──────────────────────────────────────────────────────────

const lines = [];

lines.push("OmniRoute System Information Report");
lines.push(`Generated: ${new Date().toISOString()}`);

// ── Node.js & Runtime ────────────────────────────────────────────────────

lines.push(section("Node.js & Runtime"));
lines.push(`Node.js:    ${process.version}`);
lines.push(`npm:        v${run("npm --version")}`);
lines.push(`Platform:   ${process.platform} (${process.arch})`);
lines.push(`OS:         ${os.type()} ${os.release()} (${os.arch()})`);
lines.push(`Hostname:   ${os.hostname()}`);
lines.push(`CPUs:       ${os.cpus().length}x ${os.cpus()[0]?.model || "unknown"}`);
lines.push(`Total RAM:  ${Math.round(os.totalmem() / 1024 / 1024)} MB`);
lines.push(`Free RAM:   ${Math.round(os.freemem() / 1024 / 1024)} MB`);

// ── OmniRoute Version ────────────────────────────────────────────────────

lines.push(section("OmniRoute"));
try {
  const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
  lines.push(`Version:    ${pkg.version}`);
  lines.push(`Name:       ${pkg.name}`);
} catch {
  lines.push("Version:    unable to read package.json");
}

const installedGlobal = run("npm list -g omniroute --depth=0 2>/dev/null | grep omniroute");
lines.push(`Global npm: ${installedGlobal || "not installed globally"}`);

const pm2Status = run("pm2 list 2>/dev/null | grep omniroute | awk '{print $4, $10, $12}'");
lines.push(`PM2 status: ${pm2Status || "not running via PM2"}`);

// ── Agent CLI Tools ──────────────────────────────────────────────────────

lines.push(section("Agent CLI Tools"));

const cliTools = [
  { name: "iflow-cli", cmd: "iflow", args: "--version" },
  { name: "gemini-cli", cmd: "gemini", args: "--version" },
  { name: "claude-code", cmd: "claude", args: "--version" },
  { name: "openai-codex", cmd: "codex", args: "--version" },
  { name: "antigravity", cmd: "antigravity", args: "--version" },
  { name: "droid", cmd: "droid", args: "--version" },
  { name: "openclaw", cmd: "openclaw", args: "--version" },
  { name: "kilo", cmd: "kilo", args: "--version" },
  { name: "cursor", cmd: "cursor", args: "--version" },
  { name: "aider", cmd: "aider", args: "--version" },
];

for (const { name, cmd, args } of cliTools) {
  const v = toolVersion(cmd, args);
  lines.push(`${name.padEnd(20)} ${v}`);
}

// ── Docker ───────────────────────────────────────────────────────────────

lines.push(section("Docker"));
lines.push(`Docker:     ${run("docker --version", "not installed")}`);

const dockerContainers = run(
  "docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}' 2>/dev/null",
  "N/A"
);
lines.push(`Containers:\n${dockerContainers}`);

// ── System Packages ──────────────────────────────────────────────────────

lines.push(section("System Packages (relevant)"));

const relevantPkgs = ["build-essential", "libssl-dev", "openssl", "libsqlite3-dev", "python3"];
for (const pkg of relevantPkgs) {
  const ver = run(`dpkg -l ${pkg} 2>/dev/null | grep '^ii' | awk '{print $3}'`, "not found");
  lines.push(`${pkg.padEnd(24)} ${ver}`);
}

// ── Environment Variables (safe subset) ─────────────────────────────────

lines.push(section("Environment Variables (non-sensitive)"));

const safeEnvKeys = [
  "NODE_ENV",
  "PORT",
  "DATA_DIR",
  "DB_BACKUPS_DIR",
  "LOG_LEVEL",
  "NEXT_PUBLIC_APP_URL",
  "ROUTER_API_KEY_HINT",
];

for (const key of safeEnvKeys) {
  const val = process.env[key];
  if (val !== undefined) {
    // Mask if looks like a secret
    const masked = val.length > 8 ? val.substring(0, 4) + "****" : "****";
    lines.push(`${key.padEnd(28)} ${masked}`);
  }
}

// ── Output ───────────────────────────────────────────────────────────────

const report = lines.join("\n") + "\n";

// Write to file
const outArg = process.argv.find((a) => a.startsWith("--output="));
const outFile = outArg
  ? outArg.replace("--output=", "")
  : process.argv[process.argv.indexOf("--output") + 1] || "system-info.txt";

const outPath = join(ROOT, outFile);

writeFileSync(outPath, report);
console.log(report);
console.log(`\n✅ Report saved to: ${outPath}`);
console.log(
  `📎 Attach this file when reporting issues at: https://github.com/diegosouzapw/OmniRoute/issues`
);
