/**
 * Antigravity IDE installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types.ts";

const HOME = os.homedir();
const PATHS = [
  // macOS
  "/Applications/Antigravity.app",
  path.join(HOME, "Applications", "Antigravity.app"),
  // Linux (AppImage / system install)
  "/usr/bin/antigravity",
  "/usr/local/bin/antigravity",
  path.join(HOME, ".local", "bin", "antigravity"),
  // Windows
  path.join(
    process.env.LOCALAPPDATA ?? path.join(HOME, "AppData", "Local"),
    "Programs",
    "Antigravity",
    "Antigravity.exe"
  ),
];

export function detectAntigravity(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
