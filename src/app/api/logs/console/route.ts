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
import fs from "node:fs";
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

const TAIL_INITIAL_BYTES = 256 * 1024;

interface TailProbe {
  matched: number;
  oldestDated: number | null;
}

function datedStamp(line: string): number | null {
  try {
    const probe = JSON.parse(line) as { time?: unknown; timestamp?: unknown };
    const ts = probe.time ?? probe.timestamp;
    if (!ts) return null;
    const stamp = new Date(ts as string).getTime();
    return Number.isFinite(stamp) ? stamp : null;
  } catch {
    // Unparseable head fragments are skipped here; the entry loop below drops them too.
    return null;
  }
}

function oldestDatedStamp(lines: string[]): number | null {
  // The hour boundary is driven by dated lines only: undated parseable
  // lines are kept as today and never stop the climb.
  let oldest: number | null = null;
  for (const line of lines) {
    const stamp = datedStamp(line);
    if (stamp === null) continue;
    if (oldest === null || stamp < oldest) oldest = stamp;
  }
  return oldest;
}

function matchesTailGates(
  line: string,
  minLevel: number,
  componentFilter: string,
  oneHourAgo: number
): boolean {
  try {
    const entry = JSON.parse(line) as Record<string, unknown>;
    const ts = entry["time"] ?? entry["timestamp"];
    if (ts) {
      const stamp = new Date(ts as string).getTime();
      if (Number.isFinite(stamp) && stamp < oneHourAgo) return false;
    }
    const level = parseLevel(entry["level"] as string | number);
    const entryLevelNum = LEVEL_ORDER[level] || 0;
    if (minLevel > 0 && entryLevelNum < minLevel) return false;
    if (componentFilter) {
      const comp = String(entry["component"] ?? entry["module"] ?? "");
      if (!matchesSearch(comp, componentFilter)) return false;
    }
    return true;
  } catch {
    // Skip unparseable lines.
    return false;
  }
}

function countTailMatches(
  lines: string[],
  limit: number,
  minLevel: number,
  componentFilter: string,
  oneHourAgo: number
): number {
  // Count matching entries without duplicating the filter logic: walk
  // newest-first applying the time/level/component gates until the limit.
  let matched = 0;
  for (let i = lines.length - 1; i >= 0 && matched < limit; i -= 1) {
    if (matchesTailGates(lines[i], minLevel, componentFilter, oneHourAgo)) matched += 1;
  }
  return matched;
}

function probeTailWindow(
  lines: string[],
  limit: number,
  minLevel: number,
  componentFilter: string,
  oneHourAgo: number
): TailProbe {
  return {
    matched: countTailMatches(lines, limit, minLevel, componentFilter, oneHourAgo),
    oldestDated: oldestDatedStamp(lines),
  };
}

function startsAfterLineBreak(fd: number, start: number): boolean {
  if (start === 0) return false;
  const probe = Buffer.alloc(1);
  const read = fs.readSync(fd, probe, 0, 1, start - 1);
  return read !== 1 || probe[0] !== 0x0a;
}

function readTailWindow(fd: number, start: number, length: number): string[] {
  const buffer = Buffer.alloc(length);
  let read = 0;
  while (read < length) {
    const n = fs.readSync(fd, buffer, read, length - read, start + read);
    if (n <= 0) break;
    read += n;
  }
  const text = buffer.subarray(0, read).toString("utf-8");
  const windowLines = text.trim().split("\n").filter(Boolean);
  return startsAfterLineBreak(fd, start) ? windowLines.slice(1) : windowLines;
}

function readTailLines(
  logPath: string,
  size: number,
  limit: number,
  minLevel: number,
  componentFilter: string,
  oneHourAgo: number
): string[] {
  // Read only the tail of the file in bounded blocks: grow a byte window
  // from the end until the limit is met, the hour boundary is reached, or
  // the start of the file is covered. The buffer stays binary until the
  // whole window decodes once as UTF-8, so a multi-byte character split
  // across two blocks never renders as a replacement character.
  let windowBytes = Math.min(TAIL_INITIAL_BYTES, size);
  let lines: string[] = [];
  let fd: number | null = null;
  try {
    fd = fs.openSync(logPath, "r");
    for (;;) {
      const start = Math.max(0, size - windowBytes);
      lines = readTailWindow(fd, start, size - start);
      if (start === 0) break;

      const probe = probeTailWindow(lines, limit, minLevel, componentFilter, oneHourAgo);
      if (probe.matched >= limit) break;
      if (probe.oldestDated !== null && probe.oldestDated < oneHourAgo) break;
      windowBytes = Math.min(windowBytes * 2, size);
    }
  } finally {
    if (fd !== null) fs.closeSync(fd);
  }
  return lines;
}

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

    if (!fs.existsSync(logPath)) {
      return NextResponse.json([], { status: 200 });
    }

    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    const minLevel = LEVEL_ORDER[levelFilter] || 0;

    const size = fs.statSync(logPath).size;
    const lines = readTailLines(logPath, size, limit, minLevel, componentFilter, oneHourAgo);

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
