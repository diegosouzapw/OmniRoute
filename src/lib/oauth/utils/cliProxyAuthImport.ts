/**
 * #1934: import OAuth credentials saved by CLIProxyAPI (router-for-me/CLIProxyAPI)
 * from its config dir (`~/.cli-proxy-api/`) so users don't have to re-login every
 * account individually.
 *
 * CLIProxyAPI stores one JSON file per account in a **unified format** with a `type`
 * discriminator identifying the provider, plus the OAuth tokens and account metadata.
 * This module is the pure parse/normalize/scan layer; the connection write reuses the
 * existing `createProviderConnection` upsert path. The actual DB write + filesystem scan
 * are invoked from the local-only API route.
 */

import { promises as fs } from "fs";
import path from "path";

type JsonRecord = Record<string, unknown>;

/**
 * CLIProxyAPI `type` → OmniRoute provider id. Only OAuth-based providers OmniRoute
 * supports are mapped; unknown types are skipped during import.
 */
export const CLIPROXY_TYPE_TO_PROVIDER: Record<string, string> = {
  anthropic: "claude",
  claude: "claude",
  codex: "codex",
  antigravity: "antigravity",
  kimi: "kimi",
};

export interface ParsedCliProxyAuth {
  provider: string;
  type: string;
  email: string | null;
  accessToken: string;
  refreshToken: string | null;
  expiresAt: string | null;
  projectId: string | null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

/**
 * Normalize CLIProxyAPI's expiry metadata to an ISO timestamp.
 * Accepts `expired` (absolute RFC3339 string or unix seconds/ms) or `expires_in`
 * (relative seconds from `now`). Returns null when neither is usable.
 */
export function resolveCliProxyExpiry(record: JsonRecord, now: number): string | null {
  const expired = record.expired;
  if (typeof expired === "string" && expired.trim()) {
    const ms = Date.parse(expired);
    if (Number.isFinite(ms)) return new Date(ms).toISOString();
  }
  if (typeof expired === "number" && Number.isFinite(expired) && expired > 0) {
    // Heuristic: < 1e12 ⇒ unix seconds, otherwise milliseconds.
    const ms = expired < 1e12 ? expired * 1000 : expired;
    return new Date(ms).toISOString();
  }
  const expiresIn = record.expires_in;
  if (typeof expiresIn === "number" && Number.isFinite(expiresIn) && expiresIn > 0) {
    return new Date(now + expiresIn * 1000).toISOString();
  }
  return null;
}

/**
 * Parse one CLIProxyAPI auth-file object into a normalized record. Returns null when
 * the file is not a supported OAuth credential (unknown `type`, or no access token).
 */
export function parseCliProxyAuthRecord(raw: unknown, now: number = 0): ParsedCliProxyAuth | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const record = raw as JsonRecord;
  const type = asString(record.type)?.toLowerCase();
  if (!type) return null;
  const provider = CLIPROXY_TYPE_TO_PROVIDER[type];
  if (!provider) return null;
  const accessToken = asString(record.access_token);
  if (!accessToken) return null;
  return {
    provider,
    type,
    email: asString(record.email),
    accessToken,
    refreshToken: asString(record.refresh_token),
    expiresAt: resolveCliProxyExpiry(record, now),
    projectId: asString(record.project_id) ?? asString(record.projectId),
  };
}

/**
 * Map a parsed record to the `createProviderConnection` payload shape.
 */
export function toConnectionPayload(parsed: ParsedCliProxyAuth): JsonRecord {
  return {
    provider: parsed.provider,
    authType: "oauth",
    email: parsed.email ?? undefined,
    name: parsed.email || `${parsed.provider} (CLIProxyAPI import)`,
    accessToken: parsed.accessToken,
    refreshToken: parsed.refreshToken ?? undefined,
    expiresAt: parsed.expiresAt ?? undefined,
    testStatus: "active",
    providerSpecificData: {
      ...(parsed.projectId ? { projectId: parsed.projectId } : {}),
      importedFrom: "cliproxyapi",
      importedAt: new Date().toISOString(),
    },
  };
}

/**
 * Scan a CLIProxyAPI config directory for importable auth files. Reads every `*.json`,
 * parses it, and returns the importable candidates plus a count of skipped files.
 * Filesystem/parse errors on an individual file are skipped, never thrown.
 */
export async function scanCliProxyAuthDir(
  dir: string,
  now: number = 0
): Promise<{ candidates: ParsedCliProxyAuth[]; skipped: number; scanned: number }> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return { candidates: [], skipped: 0, scanned: 0 };
  }
  const jsonFiles = entries.filter((f) => f.toLowerCase().endsWith(".json"));
  const candidates: ParsedCliProxyAuth[] = [];
  let skipped = 0;
  for (const file of jsonFiles) {
    try {
      const text = await fs.readFile(path.join(dir, file), "utf8");
      const parsed = parseCliProxyAuthRecord(JSON.parse(text), now);
      if (parsed) candidates.push(parsed);
      else skipped++;
    } catch {
      skipped++;
    }
  }
  return { candidates, skipped, scanned: jsonFiles.length };
}
