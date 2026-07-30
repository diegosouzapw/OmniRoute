/*
 * OmniRoute integration layer for code adapted from miuuyy/codex-chatgpt-web
 * commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT).
 */
import {
  chmodSync,
  closeSync,
  mkdirSync,
  openSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";

export type RuntimeMode = "browser-only" | "full";

export interface AppConfig {
  mode: RuntimeMode;
  appName: string;
  chromeExecutablePath?: string;
  cdpEndpoint?: string;
  storageStatePath: string;
  brokerSocketPath: string;
  headed: boolean;
  proAvailable: boolean;
  autoApproveToolCalls: boolean;
}

export function expandUserPath(value: string): string {
  if (value === "~") return homedir();
  if (value.startsWith("~/")) return join(homedir(), value.slice(2));
  return value;
}

export function getConfigDir(): string {
  const configured = process.env.DATA_DIR || process.env.OMNIROUTE_DATA_DIR;
  return resolve(configured?.trim() || join(homedir(), ".omniroute"), "chatgpt-web-codex");
}

export function atomicWriteFile(path: string, data: string | Uint8Array): void {
  const directory = dirname(path);
  mkdirSync(directory, { recursive: true, mode: 0o700 });
  try {
    chmodSync(directory, 0o700);
  } catch {
    // Windows ACLs are managed by the host.
  }
  const temp = `${path}.tmp-${process.pid}-${crypto.randomUUID()}`;
  const fd = openSync(temp, "wx", 0o600);
  try {
    writeFileSync(fd, data);
    closeSync(fd);
    renameSync(temp, path);
  } catch (error) {
    try {
      closeSync(fd);
    } catch {}
    rmSync(temp, { force: true });
    throw error;
  }
  try {
    chmodSync(path, 0o600);
  } catch {
    // Windows ACLs are managed by the host.
  }
}
