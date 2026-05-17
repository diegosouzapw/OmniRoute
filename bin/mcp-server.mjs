#!/usr/bin/env node

import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

function resolveMcpEntry(rootDir = ROOT) {
  const candidates = [
    // Preferred distributable JS entry (npm publish artifact)
    join(rootDir, "app", "open-sse", "mcp-server", "server.js"),
    // Local workspace TypeScript source fallback
    join(rootDir, "open-sse", "mcp-server", "server.ts"),
  ];

  for (const entry of candidates) {
    if (existsSync(entry)) return entry;
  }
  return null;
}

function formatSpawnError(exitCode, signal) {
  if (signal) return `MCP server exited by signal ${signal}`;
  return `MCP server exited with code ${exitCode ?? 1}`;
}

export async function startMcpCli(rootDir = ROOT) {
  const mcpEntry = resolveMcpEntry(rootDir);
  if (!mcpEntry) {
    throw new Error(
      "MCP server entrypoint not found. Expected app/open-sse/mcp-server/server.js or open-sse/mcp-server/server.ts."
    );
  }

  // `tsx` loader is only required for local `.ts` fallback; JS entry works without it.
  const loaderArgs = mcpEntry.endsWith(".ts") ? ["--import", "tsx"] : [];

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [...loaderArgs, mcpEntry], {
      cwd: rootDir,
      env: process.env,
      stdio: "inherit",
    });

    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if ((code ?? 0) === 0 && !signal) {
        resolve(undefined);
        return;
      }
      reject(new Error(formatSpawnError(code, signal)));
    });
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  startMcpCli().catch((err) => {
    console.error("\x1b[31m✖ Failed to start MCP server:\x1b[0m", err?.message || err);
    process.exit(1);
  });
}
