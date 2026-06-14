/**
 * Plugin logger — per-plugin log isolation.
 *
 * Writes JSON log entries to <pluginDir>/<name>/plugin.log.
 *
 * @module plugins/logger
 */

import { appendFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";

export class PluginLogger {
  private logPath: string;

  constructor(pluginName: string, pluginDir: string) {
    this.logPath = join(pluginDir, pluginName, "plugin.log");
  }

  private write(level: string, message: string, data?: unknown): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(data !== undefined ? { data } : {}),
    });

    try {
      mkdirSync(dirname(this.logPath), { recursive: true });
      appendFileSync(this.logPath, entry + "\n", "utf-8");
    } catch {
      // Silent fail — don't crash plugin over logging
    }
  }

  info(message: string, data?: unknown): void {
    this.write("INFO", message, data);
  }

  error(message: string, data?: unknown): void {
    this.write("ERROR", message, data);
  }

  warn(message: string, data?: unknown): void {
    this.write("WARN", message, data);
  }

  debug(message: string, data?: unknown): void {
    this.write("DEBUG", message, data);
  }
}
