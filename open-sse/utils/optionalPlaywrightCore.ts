import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { packInstallDir } from "./optionalPacks.ts";

type PlaywrightCore = typeof import("playwright-core");

/** Resolve the optional browser pack explicitly: native ESM ignores NODE_PATH. */
export async function loadPlaywrightCore(): Promise<PlaywrightCore> {
  const packRoot = packInstallDir("browser-runtime");
  const member = path.join(packRoot, "node_modules", "playwright-core", "package.json");
  if (existsSync(member)) {
    // Installed packs take precedence over the bundled dependency, as in Electron.
    return createRequire(path.join(packRoot, "package.json"))("playwright-core") as PlaywrightCore;
  }
  try {
    return await import("playwright-core");
  } catch (error) {
    const missing = error as NodeJS.ErrnoException;
    if (
      missing.message?.includes("Cannot find package 'playwright-core'") &&
      (missing.code === "ERR_MODULE_NOT_FOUND" ||
        missing.message.startsWith("Failed to load external module playwright-core:"))
    ) {
      throw new Error(
        "The browser-runtime optional pack is missing. Install it to use browser features."
      );
    }
    throw error;
  }
}
