/**
 * Credential Loader — Reads provider credentials from an external JSON file.
 *
 * Loads `provider-credentials.json` from the data directory and merges it
 * over the hardcoded defaults in PROVIDERS. This keeps credentials out of
 * source control while maintaining backwards compatibility (hardcoded values
 * serve as defaults when the file is absent).
 *
 * Expected JSON structure:
 * {
 *   "claude": { "clientId": "..." },
 *   "gemini": { "clientId": "...", "clientSecret": "..." },
 *   ...
 * }
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";

// Fields that can be overridden per provider
const CREDENTIAL_FIELDS = ["clientId", "clientSecret", "tokenUrl", "authUrl", "refreshUrl"];

// TTL-based cache — reloads credentials from disk at most once per minute
const CONFIG_TTL_MS = 60_000;
let lastLoadTime = 0;
let cachedProviders = null;

/**
 * Resolve the path to provider-credentials.json
 * Priority: DATA_DIR env → ./data (project root)
 */
function resolveCredentialsPath() {
  const dataDir = process.env.DATA_DIR || join(process.cwd(), "data");
  return join(dataDir, "provider-credentials.json");
}

/**
 * Load and merge external credentials into the PROVIDERS object.
 * Uses TTL-based caching (60s) so credential file changes are picked up
 * without requiring a server restart.
 *
 * @param {object} providers - The PROVIDERS object from constants.js
 * @returns {object} The same PROVIDERS object (mutated in place)
 */
export function loadProviderCredentials(providers) {
  // Return cached result if within TTL
  if (cachedProviders && Date.now() - lastLoadTime < CONFIG_TTL_MS) {
    return cachedProviders;
  }

  const credPath = resolveCredentialsPath();

  if (!existsSync(credPath)) {
    if (!cachedProviders) {
      console.log("[CREDENTIALS] No external credentials file found, using defaults.");
    }
    cachedProviders = providers;
    lastLoadTime = Date.now();
    return providers;
  }

  try {
    const raw = readFileSync(credPath, "utf-8");
    const external = JSON.parse(raw);

    let overrideCount = 0;

    for (const [providerKey, creds] of Object.entries(external)) {
      if (!providers[providerKey]) {
        console.log(
          `[CREDENTIALS] Warning: unknown provider "${providerKey}" in credentials file, skipping.`
        );
        continue;
      }

      if (!creds || typeof creds !== "object") {
        console.log(
          `[CREDENTIALS] Warning: provider "${providerKey}" value must be an object, got ${typeof creds}. Skipping.`
        );
        continue;
      }

      for (const field of CREDENTIAL_FIELDS) {
        if (creds[field] !== undefined) {
          providers[providerKey][field] = creds[field];
          overrideCount++;
        }
      }
    }

    const isReload = cachedProviders !== null;
    console.log(
      `[CREDENTIALS] ${isReload ? "Reloaded" : "Loaded"} external credentials: ${overrideCount} field(s) from ${credPath}`
    );
  } catch (err) {
    console.log(`[CREDENTIALS] Error reading credentials file: ${err.message}. Using defaults.`);
  }

  cachedProviders = providers;
  lastLoadTime = Date.now();
  return providers;
}
