/**
 * GitHub Copilot installation detection.
 *
 * Detection strategy: look for the Copilot extension folder inside the user's
 * VS Code (or fork) extensions directory. Purely filesystem-based — no shell
 * interpolation (Hard Rule #13).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { DetectionResult } from "../types";

const HOME = os.homedir();

const EXTENSIONS_DIRS = [
  path.join(HOME, ".vscode", "extensions"),
  path.join(HOME, ".vscode-insiders", "extensions"),
  path.join(HOME, ".cursor", "extensions"),
];

export function detectCopilot(): DetectionResult {
  for (const dir of EXTENSIONS_DIRS) {
    try {
      if (!fs.existsSync(dir)) continue;
      const entries = fs.readdirSync(dir);
      for (const name of entries) {
        // Copilot extensions are named like `github.copilot-1.x.x`,
        // `github.copilot-chat-...`. Match by prefix only.
        const lower = name.toLowerCase();
        if (lower.startsWith("github.copilot")) {
          return { installed: true, path: path.join(dir, name) };
        }
      }
    } catch {
      // Permission or transient fs error — skip this directory.
    }
  }
  return { installed: false };
}
