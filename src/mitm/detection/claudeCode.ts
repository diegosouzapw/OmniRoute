/**
 * Claude Code (Anthropic CLI) installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types.ts";

const getHome = () => os.homedir();
const PATHS = [
  "/usr/local/bin/claude",
  "/usr/bin/claude",
  path.join(getHome(), ".local", "bin", "claude"),
  path.join(getHome(), ".npm-global", "bin", "claude"),
  path.join(getHome(), ".claude"),
  path.join(process.env.APPDATA ?? path.join(getHome(), "AppData", "Roaming"), "npm", "claude.cmd"),
];

export function detectClaudeCode(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
