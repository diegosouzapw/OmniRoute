/**
 * Console Log API — GET /api/logs/console
 *
 * Reads the application log file and returns entries from the last 1 hour.
 * Supports filtering by level and limiting the number of entries.
 *
 * Query params:
 *   - level: minimum log level (debug|info|warn|error) — default: all
 *   - limit: max entries to return — default: 500
 *   - component: filter by component/module name
 */

import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { getAppLogFilePath } from "@/lib/logEnv";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { matchesSearch } from "@/shared/utils/turkishText";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const LEVEL_ORDER: Record<string, number> = {
  trace: 5,
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  fatal: 50,
};

// Map pino numeric levels to string levels
const NUMERIC_LEVEL_MAP: Record<number, string> = {
  10: "trace",
  20: "debug",
  30: "info",
  40: "warn",
  50: "error",
  60: "fatal",
};

function getLogFilePath(): string {
  return getAppLogFilePath();
}

function parseLevel(raw: string | number): string {
  if (typeof raw === "number") {
    return NUMERIC_LEVEL_MAP[raw] || "info";
  }
  return String(raw).toLowerCase();
}

function stringifyLogValue(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message || value.name;
  if (typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    return String(value);
  }

  try {
    const json = JSON.stringify(value);
    return typeof json === "string" ? json : String(value);
  } catch {
    return String(value);
  }
}

export async function GET(req: NextRequest) {
  const authError = await requireManagementAuth(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const levelFilter = searchParams.get("level") || "all";
    const rawLimit = parseInt(searchParams.get("limit") || "500", 10);
    const limit = Math.min(Number.isFinite(rawLimit) && rawLimit > 0 ? rawLimit : 500, 2000);
    const componentFilter = searchParams.get("component") || "";

    const logPath = getLogFilePath();

    if (!existsSync(logPath)) {
      return NextResponse.json([], { status: 200 });
    }

    const raw = readFileSync(logPath, "utf-8");
    const lines = raw.trim().split("\n").filter(Boolean);

    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const minLevel = LEVEL_ORDER[levelFilter] || 0;

    const entries: any[] = [];

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);

        // Filter by time (last 1 hour)
        const ts = entry.time || entry.timestamp;
        if (ts) {
          const entryTime = new Date(ts).getTime();
          if (entryTime < oneHourAgo) continue;
        }

        // Normalize render-sensitive fields so malformed structured logs cannot crash the viewer.
        entry.level = parseLevel(entry.level);
        entry.msg = stringifyLogValue(entry.msg ?? entry.message ?? "");
        entry.message = stringifyLogValue(entry.message ?? entry.msg);
        if (entry.component !== undefined) entry.component = stringifyLogValue(entry.component);
        if (entry.module !== undefined) entry.module = stringifyLogValue(entry.module);
        if (entry.correlationId !== undefined) {
          entry.correlationId = stringifyLogValue(entry.correlationId);
        }

        // Filter by level
        const entryLevelNum = LEVEL_ORDER[entry.level] || 0;
        if (minLevel > 0 && entryLevelNum < minLevel) continue;

        // Filter by component
        if (componentFilter) {
          const comp = entry.component || entry.module || "";
          if (!matchesSearch(comp, componentFilter)) continue;
        }

        // Normalize timestamp field
        if (entry.time && !entry.timestamp) {
          entry.timestamp = entry.time;
        }

        entries.push(entry);
      } catch {
        // Skip unparseable lines
      }
    }

    // Return last N entries (most recent)
    const result = entries.slice(-limit);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(err?.message) || "Failed to read logs" },
      { status: 500 }
    );
  }
}
