/**
 * Zed editor installation detection.
 * Purely filesystem-based — no shell interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const getHome = () => os.homedir();
const PATHS = [
  "/Applications/Zed.app",
  path.join(getHome(), "Applications", "Zed.app"),
  "/usr/bin/zed",
  "/usr/local/bin/zed",
  path.join(getHome(), ".local", "bin", "zed"),
  path.join(getHome(), ".local", "share", "zed"),
  path.join(getHome(), ".config", "zed"),
];

export function detectZed(): DetectionResult {
  for (const p of PATHS) {
    if (fs.existsSync(p)) return { installed: true, path: p };
  }
  return { installed: false };
}
