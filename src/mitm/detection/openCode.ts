/**
 * OpenCode installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const getHome = () => os.homedir();
const PATHS = [
  "/Applications/OpenCode.app",
  path.join(getHome(), "Applications", "OpenCode.app"),
  "/usr/bin/opencode",
  "/usr/local/bin/opencode",
  path.join(getHome(), ".local", "bin", "opencode"),
  path.join(getHome(), ".opencode"),
  path.join(getHome(), ".config", "opencode"),
  path.join(
    process.env.LOCALAPPDATA ?? path.join(getHome(), "AppData", "Local"),
    "Programs",
    "OpenCode",
    "OpenCode.exe"
  ),
];

export function detectOpenCode(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
