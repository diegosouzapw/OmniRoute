/**
 * Claude Code (Anthropic CLI) installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const HOME = os.homedir();
const PATHS = [
  "/usr/local/bin/claude",
  "/usr/bin/claude",
  path.join(HOME, ".local", "bin", "claude"),
  path.join(HOME, ".npm-global", "bin", "claude"),
  path.join(HOME, ".claude"),
  path.join(
    process.env.APPDATA ?? path.join(HOME, "AppData", "Roaming"),
    "npm",
    "claude.cmd"
  ),
];

export function detectClaudeCode(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
