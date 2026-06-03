/**
 * Zed IDE OAuth Token Extractor
 *
 * Extracts OAuth credentials from OS keychain where Zed IDE stores them.
 * Supports macOS (Keychain), Windows (Credential Manager), and Linux (libsecret).
 *
 * `keytar` is a native module (e.g. libsecret on Linux). Load it only via dynamic import
 * so `next build` / CI without those libs does not fail when this module is analyzed.
 *
 * @see https://zed.dev/docs/ai/llm-providers - Official Zed documentation confirming keychain storage
 */

import fs from "fs";
import os from "os";
import path from "path";
import { isRunningInDocker } from "./dockerDetect";

/** Minimal keytar surface (CJS/native; typings may not expose `default`). */
type KeytarModule = {
  findCredentials: (service: string) => Promise<Array<{ account: string; password: string }>>;
  getPassword: (service: string, account: string) => Promise<string | null>;
};

async function loadKeytar(): Promise<KeytarModule | null> {
  try {
    const mod = (await import("keytar")) as { default?: KeytarModule } & KeytarModule;
    return mod.default ?? mod;
  } catch {
    return null;
  }
}

export interface ZedCredential {
  provider: string;
  service: string;
  account: string;
  token: string;
}

/**
 * Common service name patterns used by Zed IDE for storing OAuth tokens
 */
const ZED_SERVICE_PATTERNS = [
  // OpenAI
  "zed-openai",
  "ai.zed.openai",
  "zed.openai",
  "Zed-OpenAI",

  // Anthropic
  "zed-anthropic",
  "ai.zed.anthropic",
  "zed.anthropic",
  "Zed-Anthropic",

  // Google AI
  "zed-google",
  "ai.zed.google",
  "zed.google",
  "Zed-Google",

  // Mistral
  "zed-mistral",
  "ai.zed.mistral",
  "zed.mistral",
  "Zed-Mistral",

  // xAI
  "zed-xai",
  "ai.zed.xai",
  "zed.xai",
  "Zed-xAI",

  // OpenRouter
  "zed-openrouter",
  "ai.zed.openrouter",
  "zed.openrouter",
  "Zed-OpenRouter",

  // DeepSeek
  "zed-deepseek",
  "ai.zed.deepseek",
  "zed.deepseek",
  "Zed-DeepSeek",
];

/**
 * Maps Zed service names to OmniRoute provider IDs
 */
function extractProviderFromService(service: string): string {
  const lower = service.toLowerCase();
  if (lower.includes("openai")) return "openai";
  if (lower.includes("anthropic")) return "anthropic";
  if (lower.includes("google")) return "google";
  if (lower.includes("mistral")) return "mistral";
  if (lower.includes("xai")) return "xai";
  if (lower.includes("openrouter")) return "openrouter";
  if (lower.includes("deepseek")) return "deepseek";
  return "unknown";
}

/**
 * Discovers all Zed OAuth credentials stored in the system keychain.
 *
 * SECURITY-AUDITOR-NOTE: This function appears in Socket.dev finding for
 * `app/.next/server/app/api/providers/zed/import/route.js`. Behaviour:
 *   - Called from `POST /api/providers/zed/discover` and `POST /api/providers/zed/import`,
 *     which are gated by `requireManagementAuth`.
 *   - From v3.8.6 onward, `/import` requires `confirmedAccounts` (per-account
 *     user consent) before persisting any credential. See the matching note in
 *     `src/app/api/providers/zed/import/route.ts`.
 *   - Reads only Zed editor patterns (`zed-openai`, `ai.zed.anthropic`, …).
 *     The raw token never leaves the host — the `/discover` response carries
 *     only a 16-char fingerprint.
 *   - See docs/security/SOCKET_DEV_FINDINGS.md §2 for the full attestation.
 *
 * @returns Array of discovered credentials with provider, service, and token
 */
export async function discoverZedCredentials(): Promise<ZedCredential[]> {
  const keytar = await loadKeytar();
  if (!keytar) {
    console.debug("[Zed keychain] keytar not available — skipping keychain read");
    return [];
  }

  const credentials: ZedCredential[] = [];

  for (const pattern of ZED_SERVICE_PATTERNS) {
    try {
      // Try to find credentials for this service
      const creds = await keytar.findCredentials(pattern);

      for (const cred of creds) {
        // FIX #1: Add null check for cred.password
        if (!cred.password) {
          console.debug(`Skipping credential with missing password: ${pattern}/${cred.account}`);
          continue;
        }

        credentials.push({
          provider: extractProviderFromService(pattern),
          service: pattern,
          account: cred.account,
          token: cred.password,
        });
      }
    } catch (error: any) {
      console.debug("No credentials found for %s:", pattern, error?.message || error);
      // Continue to next pattern
    }
  }

  return credentials;
}

/**
 * Gets a specific Zed credential for a provider
 *
 * FIX #2: Instead of hardcoded account names, first try findCredentials
 * which will return all actual credentials for the service, then fallback
 * to common patterns only if needed.
 *
 * @param provider - Provider name (openai, anthropic, google, etc.)
 * @returns The credential if found, null otherwise
 */
export async function getZedCredential(provider: string): Promise<ZedCredential | null> {
  const keytar = await loadKeytar();
  if (!keytar) return null;

  const patterns = ZED_SERVICE_PATTERNS.filter((p) =>
    p.toLowerCase().includes(provider.toLowerCase())
  );

  for (const pattern of patterns) {
    try {
      // First, try findCredentials to get all actual credentials
      const creds = await keytar.findCredentials(pattern);
      if (creds.length > 0 && creds[0].password) {
        return {
          provider,
          service: pattern,
          account: creds[0].account,
          token: creds[0].password,
        };
      }

      // Fallback: Try common account name patterns
      const accountNames = ["api-key", "token", "oauth", provider];

      for (const account of accountNames) {
        const token = await keytar.getPassword(pattern, account);
        if (token) {
          return {
            provider,
            service: pattern,
            account,
            token,
          };
        }
      }
    } catch (error: any) {
      console.debug("Failed to get credential for %s:", pattern, error?.message || error);
    }
  }

  return null;
}

/**
 * Checks if Zed IDE appears to be installed and configured
 *
 * FIX #3: Convert to ES imports instead of CommonJS require()
 *
 * @returns true if Zed config directory exists
 */
export async function isZedInstalled(): Promise<boolean> {
  const homeDir = os.homedir();
  const zedConfigPaths = [
    path.join(homeDir, ".config", "zed"), // Linux
    path.join(homeDir, "Library", "Application Support", "Zed"), // macOS
    path.join(homeDir, "AppData", "Roaming", "Zed"), // Windows
  ];

  for (const configPath of zedConfigPaths) {
    if (fs.existsSync(/* turbopackIgnore: true */ configPath)) {
      return true;
    }
  }

  return false;
}
