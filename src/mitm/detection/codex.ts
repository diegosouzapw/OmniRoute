/**
 * OpenAI Codex CLI installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const HOME = os.homedir();
const PATHS = [
  "/usr/local/bin/codex",
  "/usr/bin/codex",
  path.join(HOME, ".local", "bin", "codex"),
  path.join(HOME, ".npm-global", "bin", "codex"),
  path.join(HOME, "node_modules", ".bin", "codex"),
  path.join(
    process.env.APPDATA ?? path.join(HOME, "AppData", "Roaming"),
    "npm",
    "codex.cmd"
  ),
];

export function detectCodex(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
