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
import { join } from "path";

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
  20: "info",
  30: "warn",
  40: "error",
  50: "fatal",
  60: "fatal",
};

function getLogFilePath(): string {
  return process.env.LOG_FILE_PATH || join(process.cwd(), "logs", "application", "app.log");
}

function parseLevel(raw: string | number): string {
  if (typeof raw === "number") {
    return NUMERIC_LEVEL_MAP[raw] || "info";
  }
  return String(raw).toLowerCase();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const levelFilter = searchParams.get("level") || "all";
    const limit = Math.min(parseInt(searchParams.get("limit") || "500", 10), 2000);
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

        // Normalize level
        entry.level = parseLevel(entry.level);

        // Filter by level
        const entryLevelNum = LEVEL_ORDER[entry.level] || 0;
        if (minLevel > 0 && entryLevelNum < minLevel) continue;

        // Filter by component
        if (componentFilter) {
          const comp = entry.component || entry.module || "";
          if (!comp.toLowerCase().includes(componentFilter.toLowerCase())) continue;
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
    return NextResponse.json({ error: err.message || "Failed to read logs" }, { status: 500 });
  }
}
