#!/usr/bin/env node

import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");

export function resolveChatGptWebCodexMcpEntry(rootDir = root, exists = existsSync) {
  const candidates = [
    join(
      rootDir,
      "dist",
      "open-sse",
      "vendor",
      "codex-chatgpt-web",
      "adapters",
      "chatgpt-web",
      "mcp-server.js"
    ),
    join(
      rootDir,
      "open-sse",
      "vendor",
      "codex-chatgpt-web",
      "adapters",
      "chatgpt-web",
      "mcp-server.ts"
    ),
  ];
  return candidates.find((candidate) => exists(candidate)) ?? null;
}

export async function loadChatGptWebCodexMcpModule(entry) {
  if (entry.endsWith(".ts")) {
    await import("tsx/esm");
  }
  return import(pathToFileURL(entry).href);
}

export async function startChatGptWebCodexMcp(args = process.argv.slice(2), rootDir = root) {
  const socketIndex = args.indexOf("--broker-socket");
  const brokerSocketPath = socketIndex >= 0 ? args[socketIndex + 1] : undefined;
  if (!brokerSocketPath) throw new Error("--broker-socket is required");
  const entry = resolveChatGptWebCodexMcpEntry(rootDir);
  if (!entry) throw new Error("ChatGPT Web (Codex) MCP entrypoint was not found");
  const module = await loadChatGptWebCodexMcpModule(entry);
  await module.runChatGptMcpServer({ brokerSocketPath });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  startChatGptWebCodexMcp().catch((error) => {
    console.error(
      `ChatGPT Web (Codex) MCP konnte nicht gestartet werden: ${error?.message || error}`
    );
    process.exit(1);
  });
}
