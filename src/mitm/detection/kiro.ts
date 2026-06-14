/**
 * Kiro IDE installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const HOME = os.homedir();
const PATHS = [
  "/Applications/Kiro.app",
  path.join(HOME, "Applications", "Kiro.app"),
  "/usr/bin/kiro",
  "/usr/local/bin/kiro",
  path.join(HOME, ".local", "bin", "kiro"),
  path.join(
    process.env.LOCALAPPDATA ?? path.join(HOME, "AppData", "Local"),
    "Programs",
    "Kiro",
    "Kiro.exe"
  ),
];

export function detectKiro(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
