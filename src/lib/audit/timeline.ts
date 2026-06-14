/**
 * Timeline helpers — pure functions for grouping AuditLogEntry arrays by day
 * and producing human-readable relative timestamps.
 *
 * No I/O, no side-effects — safe to import in both server and client contexts.
 */

import type { AuditLogEntry } from "@/lib/compliance/index";

export interface DayGroup {
  /** YYYY-MM-DD in local server time */
  dayKey: string;
  /** "today" | "yesterday" | ISO date string for older days */
  label: "today" | "yesterday" | string;
  entries: AuditLogEntry[];
}

/**
 * Returns YYYY-MM-DD for a given ISO timestamp (using local server time).
 */
function toDayKey(iso: string): string {
  const d = new Date(iso);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Returns YYYY-MM-DD for a given epoch ms (local server time).
 */
function epochToDayKey(ms: number): string {
  const d = new Date(ms);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Groups audit log entries by calendar day (local server time), sorted
 * descending (most recent day first). Each group has a human label:
 * - "today" for the current day
 * - "yesterday" for the previous day
 * - ISO date string "YYYY-MM-DD" for older days
 *
 * @param entries - Flat list of audit entries (order not assumed)
 * @param referenceNowMs - Override for "now" (ms since epoch). Defaults to Date.now().
 */
export function groupByDay(entries: AuditLogEntry[], referenceNowMs?: number): DayGroup[] {
  if (!entries.length) return [];

  const nowMs = referenceNowMs ?? Date.now();
  const todayKey = epochToDayKey(nowMs);
  const yesterdayKey = epochToDayKey(nowMs - 24 * 60 * 60 * 1000);

  // Sort descending by timestamp
  const sorted = [...entries].sort((a, b) => {
    const ta = a.timestamp ?? "";
    const tb = b.timestamp ?? "";
    if (ta > tb) return -1;
    if (ta < tb) return 1;
    // tiebreak by id desc
    const ia = typeof a.id === "number" ? a.id : 0;
    const ib = typeof b.id === "number" ? b.id : 0;
    return ib - ia;
  });

  const groupMap = new Map<string, AuditLogEntry[]>();
  const dayOrder: string[] = [];

  for (const entry of sorted) {
    const dk = toDayKey(entry.timestamp ?? "");
    if (!groupMap.has(dk)) {
      groupMap.set(dk, []);
      dayOrder.push(dk);
    }
    groupMap.get(dk)!.push(entry);
  }

  return dayOrder.map((dk) => {
    let label: string;
    if (dk === todayKey) {
      label = "today";
    } else if (dk === yesterdayKey) {
      label = "yesterday";
    } else {
      label = dk;
    }
    return { dayKey: dk, label, entries: groupMap.get(dk)! };
  });
}

/**
 * Returns a human-readable relative time string for the given ISO timestamp.
 *
 * @param iso - ISO 8601 timestamp string
 * @param locale - "en" or "pt-BR"
 * @param referenceNowMs - Override for "now" (ms since epoch). Defaults to Date.now().
 */
export function relativeTime(
  iso: string,
  locale: "en" | "pt-BR",
  referenceNowMs?: number
): string {
  const nowMs = referenceNowMs ?? Date.now();
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) {
    return locale === "pt-BR" ? "agora há pouco" : "just now";
  }

  const diffMs = nowMs - then;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (locale === "pt-BR") {
    if (diffSec < 60) return "agora há pouco";
    if (diffMin < 60) return `há ${diffMin} min`;
    if (diffHour < 24) return `há ${diffHour} h`;
    if (diffDay === 1) return "ontem";
    return `há ${diffDay} dias`;
  }

  // English
  if (diffSec < 60) return "just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  if (diffHour < 24) return `${diffHour} h ago`;
  if (diffDay === 1) return "yesterday";
  return `${diffDay} days ago`;
}
