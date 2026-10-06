export const PEAK_HOUR_PROTECTION_MODES = ["block", "avoid"] as const;
export const PEAK_HOUR_PROTECTION_DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

export type PeakHourProtectionMode = (typeof PEAK_HOUR_PROTECTION_MODES)[number];
export type PeakHourProtectionDay = (typeof PEAK_HOUR_PROTECTION_DAYS)[number];

export type PeakHourWindow = {
  id?: string;
  name?: string;
  days?: PeakHourProtectionDay[];
  startUtc: string;
  endUtc: string;
};

export type PeakHourProtectionConfig = {
  enabled: boolean;
  mode: PeakHourProtectionMode;
  windows: PeakHourWindow[];
};

export type ActivePeakHourProtection = {
  active: true;
  mode: PeakHourProtectionMode;
  retryAfter: string;
  retryAfterSeconds: number;
  window: PeakHourWindow;
};

export type InactivePeakHourProtection = { active: false };
export type PeakHourProtectionState = ActivePeakHourProtection | InactivePeakHourProtection;

type JsonRecord = Record<string, unknown>;

const DAY_BY_UTC_INDEX: PeakHourProtectionDay[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const MINUTES_PER_DAY = 24 * 60;
const MAX_WINDOWS = 16;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function parseUtcTimeMinutes(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isInteger(hour) || !Number.isInteger(minute)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return hour * 60 + minute;
}

function formatUtcTimeMinutes(minutes: number): string {
  const normalized = ((minutes % MINUTES_PER_DAY) + MINUTES_PER_DAY) % MINUTES_PER_DAY;
  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function normalizeDays(value: unknown): PeakHourProtectionDay[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const days = value
    .map((day) => (typeof day === "string" ? day.trim().toLowerCase() : ""))
    .filter((day): day is PeakHourProtectionDay =>
      (PEAK_HOUR_PROTECTION_DAYS as readonly string[]).includes(day)
    );
  const unique = Array.from(new Set(days));
  return unique.length > 0 ? unique : undefined;
}

export function normalizePeakHourProtection(value: unknown): PeakHourProtectionConfig | null {
  const record = asRecord(value);
  const rawWindows = Array.isArray(record.windows) ? record.windows : [];
  const windows: PeakHourWindow[] = [];

  for (const entry of rawWindows.slice(0, MAX_WINDOWS)) {
    const window = asRecord(entry);
    const start = parseUtcTimeMinutes(window.startUtc);
    const end = parseUtcTimeMinutes(window.endUtc);
    if (start === null || end === null || start === end) continue;
    windows.push({
      ...(typeof window.id === "string" && window.id.trim()
        ? { id: window.id.trim().slice(0, 80) }
        : {}),
      ...(typeof window.name === "string" && window.name.trim()
        ? { name: window.name.trim().slice(0, 120) }
        : {}),
      ...(normalizeDays(window.days) ? { days: normalizeDays(window.days) } : {}),
      startUtc: formatUtcTimeMinutes(start),
      endUtc: formatUtcTimeMinutes(end),
    });
  }

  const enabled = record.enabled === true;
  const mode = record.mode === "avoid" ? "avoid" : "block";
  if (!enabled && windows.length === 0) return null;
  return { enabled, mode, windows };
}

export function getPeakHourProtectionConfig(
  providerSpecificData: unknown
): PeakHourProtectionConfig | null {
  return normalizePeakHourProtection(asRecord(providerSpecificData).peakHourProtection);
}

function isDayAllowed(window: PeakHourWindow, date: Date): boolean {
  if (!window.days || window.days.length === 0) return true;
  return window.days.includes(DAY_BY_UTC_INDEX[date.getUTCDay()]);
}

function windowActiveAt(window: PeakHourWindow, date: Date): boolean {
  const start = parseUtcTimeMinutes(window.startUtc);
  const end = parseUtcTimeMinutes(window.endUtc);
  if (start === null || end === null || start === end) return false;
  const now = date.getUTCHours() * 60 + date.getUTCMinutes();
  const effectiveDay =
    start > end && now < end ? new Date(date.getTime() - MINUTES_PER_DAY * 60_000) : date;
  if (!isDayAllowed(window, effectiveDay)) return false;
  return start < end ? now >= start && now < end : now >= start || now < end;
}

function nextWindowEndMs(window: PeakHourWindow, date: Date): number | null {
  const start = parseUtcTimeMinutes(window.startUtc);
  const end = parseUtcTimeMinutes(window.endUtc);
  if (start === null || end === null || start === end) return null;

  const midnight = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  const now = date.getUTCHours() * 60 + date.getUTCMinutes();
  let endDayOffset = 0;
  if (start > end && now >= start) endDayOffset = 1;
  return midnight + (endDayOffset * MINUTES_PER_DAY + end) * 60_000;
}

export function evaluatePeakHourProtection(
  providerSpecificData: unknown,
  now: Date = new Date()
): PeakHourProtectionState {
  const config = getPeakHourProtectionConfig(providerSpecificData);
  if (!config?.enabled || config.windows.length === 0) return { active: false };

  const active = config.windows
    .filter((window) => windowActiveAt(window, now))
    .map((window) => ({ window, endMs: nextWindowEndMs(window, now) }))
    .filter(
      (entry): entry is { window: PeakHourWindow; endMs: number } =>
        typeof entry.endMs === "number" &&
        Number.isFinite(entry.endMs) &&
        entry.endMs > now.getTime()
    )
    .sort((a, b) => a.endMs - b.endMs)[0];

  if (!active) return { active: false };
  const retryAfterSeconds = Math.max(1, Math.ceil((active.endMs - now.getTime()) / 1000));
  return {
    active: true,
    mode: config.mode,
    retryAfter: new Date(active.endMs).toISOString(),
    retryAfterSeconds,
    window: active.window,
  };
}

export function describePeakHourWindow(window: PeakHourWindow): string {
  const name = window.name ? `${window.name} ` : "";
  const days = window.days && window.days.length > 0 ? `${window.days.join(",")} ` : "daily ";
  return `${name}${days}${window.startUtc}-${window.endUtc} UTC`.trim();
}
