import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { homedir } from "os";
import { join } from "path";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * Probe dependencies for {@link readMonkeyCodeCredentials}. Injectable so the
 * reader is unit-testable without touching the real home directory — mirrors
 * the probe pattern in `src/app/api/oauth/cursor/auto-import/route.ts`, minus
 * the subprocess probe (no binaries are spawned here, only a fixed-path file
 * read, so there is no RCE-via-tunnel surface to loopback-gate).
 */
export interface MonkeyCodeSettingsProbe {
  /** Override the home directory used to locate `.ohmyagent/settings.json`. */
  home?: string;
  /** Read a file as UTF-8 text; rejects when missing/unreadable. */
  read?: (path: string) => Promise<string>;
}

export interface MonkeyCodeCredentials {
  apiKey: string;
  signingSecret: string;
  models: string[];
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * Read the ohmyagent CLI's provisioned MonkeyCode credentials.
 *
 * The CLI provisions a free `oma_…` key + `omas_…` signing secret into
 * `~/.ohmyagent/settings.json` on login (no key signup exists) — one entry
 * per model under `models`, keyed `"<tier>/<model>@monkeycode#<uuid>"`.
 * Returns the first `@monkeycode#` entry's key, the top-level signing secret,
 * and every `@monkeycode#` model id.
 */
export async function readMonkeyCodeCredentials(
  probe: MonkeyCodeSettingsProbe = {}
): Promise<(MonkeyCodeCredentials & { source: string }) | null> {
  const home = probe.home ?? homedir();
  const read = probe.read ?? ((p: string) => readFile(p, "utf8"));
  const settingsPath = join(home, ".ohmyagent", "settings.json");

  let parsed: unknown;
  try {
    parsed = JSON.parse(await read(settingsPath));
  } catch {
    return null;
  }
  const root = asRecord(parsed);
  const models = asRecord(root?.models);
  const signingSecret = typeof root?.signing_secret === "string" ? root.signing_secret : "";
  if (!models || !signingSecret) return null;

  const ids: string[] = [];
  let apiKey = "";
  for (const [key, entry] of Object.entries(models)) {
    if (!key.includes("@monkeycode#")) continue;
    const record = asRecord(entry);
    const model = typeof record?.model === "string" ? record.model : "";
    if (model) ids.push(model);
    if (!apiKey && typeof record?.api_key === "string" && record.api_key) {
      apiKey = record.api_key;
    }
  }
  if (!apiKey || ids.length === 0) return null;
  return { apiKey, signingSecret, models: ids, source: settingsPath };
}

/**
 * GET /api/oauth/monkeycode/auto-import
 * Auto-detect the local ohmyagent CLI login (free MonkeyCode credentials).
 *
 * 🔒 Auth-guarded: requires JWT cookie or Bearer API key (same gate as the
 * Cursor auto-import route).
 */
export async function GET(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const found = await readMonkeyCodeCredentials();
    if (found) {
      return NextResponse.json({ found: true, ...found });
    }
    return NextResponse.json({
      found: false,
      error: "No ohmyagent login found. Install ohmyagent and log in to MonkeyCode first.",
    });
  } catch (error) {
    console.error("MonkeyCode auto-import error:", error);
    return NextResponse.json({ found: false, error: "Internal server error" }, { status: 500 });
  }
}
