/** Dashboard-side report filter state and its mapping to /api/reports query strings. */

export interface ReportFilterState {
  /** `datetime-local` values in the browser's time zone; empty means unbounded. */
  from: string;
  to: string;
  apiKeyId: string;
  projectName: string;
  client: string;
  provider: string;
  connectionId: string;
}

export const TIME_PRESETS = ["24h", "7d", "30d", "90d", "all"] as const;
export type TimePreset = (typeof TIME_PRESETS)[number];

const PRESET_HOURS: Record<Exclude<TimePreset, "all">, number> = {
  "24h": 24,
  "7d": 7 * 24,
  "30d": 30 * 24,
  "90d": 90 * 24,
};

/** `datetime-local` wants local wall-clock time without a zone suffix. */
function toLocalInputValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export function presetWindow(preset: TimePreset, now = new Date()): { from: string; to: string } {
  if (preset === "all") return { from: "", to: "" };
  const from = new Date(now.getTime() - PRESET_HOURS[preset] * 3_600_000);
  return { from: toLocalInputValue(from), to: "" };
}

export function emptyFilters(preset: TimePreset): ReportFilterState {
  return {
    ...presetWindow(preset),
    apiKeyId: "",
    projectName: "",
    client: "",
    provider: "",
    connectionId: "",
  };
}

/** Query string for the report APIs; `windowOnly` drops every non-time filter. */
export function toReportQuery(filters: ReportFilterState, windowOnly = false): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.from) params.set("from", new Date(filters.from).toISOString());
  if (filters.to) params.set("to", new Date(filters.to).toISOString());
  if (windowOnly) return params;
  for (const field of ["apiKeyId", "projectName", "client", "provider", "connectionId"] as const) {
    if (filters[field]) params.set(field, filters[field]);
  }
  return params;
}
