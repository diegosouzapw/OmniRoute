"use client";

import { Button, Input, Select, Toggle } from "@/shared/components";
import {
  PEAK_HOUR_PROTECTION_DAYS,
  type PeakHourProtectionConfig,
  type PeakHourProtectionDay,
  type PeakHourProtectionMode,
  type PeakHourWindow,
} from "@/lib/providers/peakHourProtection";
import { providerText, type ProviderMessageTranslator } from "../providerPageHelpers";

export const EMPTY_PEAK_HOUR_PROTECTION: PeakHourProtectionConfig = {
  enabled: false,
  mode: "block",
  windows: [],
};

const DAY_LABELS: Record<PeakHourProtectionDay, string> = {
  mon: "Mon",
  tue: "Tue",
  wed: "Wed",
  thu: "Thu",
  fri: "Fri",
  sat: "Sat",
  sun: "Sun",
};

function cloneConfig(value: unknown): PeakHourProtectionConfig {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { ...EMPTY_PEAK_HOUR_PROTECTION, windows: [] };
  }
  const record = value as Record<string, unknown>;
  const mode: PeakHourProtectionMode = record.mode === "avoid" ? "avoid" : "block";
  const windows = Array.isArray(record.windows)
    ? record.windows
        .filter((entry): entry is PeakHourWindow => !!entry && typeof entry === "object")
        .map((entry) => ({
          id: typeof entry.id === "string" ? entry.id : crypto.randomUUID(),
          name: typeof entry.name === "string" ? entry.name : "",
          days: Array.isArray(entry.days)
            ? entry.days.filter((day): day is PeakHourProtectionDay =>
                (PEAK_HOUR_PROTECTION_DAYS as readonly string[]).includes(day)
              )
            : [],
          startUtc: typeof entry.startUtc === "string" ? entry.startUtc : "06:00",
          endUtc: typeof entry.endUtc === "string" ? entry.endUtc : "10:00",
        }))
    : [];
  return { enabled: record.enabled === true, mode, windows };
}

function newWindow(): PeakHourWindow {
  return { id: crypto.randomUUID(), name: "", days: [], startUtc: "06:00", endUtc: "10:00" };
}

function weekdayWindow(startUtc: string, endUtc: string): PeakHourWindow {
  return {
    id: crypto.randomUUID(),
    name: "Weekday peak",
    days: ["mon", "tue", "wed", "thu", "fri"],
    startUtc,
    endUtc,
  };
}

export function normalizePeakHourProtectionForSave(
  value: PeakHourProtectionConfig
): PeakHourProtectionConfig | null {
  const windows = value.windows
    .map((window) => ({
      ...(window.name?.trim() ? { name: window.name.trim() } : {}),
      ...(window.days && window.days.length > 0 ? { days: window.days } : {}),
      startUtc: window.startUtc,
      endUtc: window.endUtc,
    }))
    .filter(
      (window) => /^\d{2}:\d{2}$/.test(window.startUtc) && /^\d{2}:\d{2}$/.test(window.endUtc)
    );
  if (!value.enabled && windows.length === 0) return null;
  return { enabled: value.enabled, mode: value.mode, windows };
}

export function formatPeakHourSummary(value: unknown): string | null {
  const config = cloneConfig(value);
  if (!config.enabled || config.windows.length === 0) return null;
  const mode = config.mode === "avoid" ? "Avoid" : "Block";
  return `${mode} during ${config.windows.length} peak window${config.windows.length === 1 ? "" : "s"}`;
}

export default function PeakHourProtectionEditor({
  value,
  onChange,
  t,
}: {
  value: PeakHourProtectionConfig;
  onChange: (next: PeakHourProtectionConfig) => void;
  t: ProviderMessageTranslator;
}) {
  const updateWindow = (id: string | undefined, patch: Partial<PeakHourWindow>) => {
    onChange({
      ...value,
      windows: value.windows.map((window) => (window.id === id ? { ...window, ...patch } : window)),
    });
  };

  const toggleDay = (window: PeakHourWindow, day: PeakHourProtectionDay) => {
    const days = new Set(window.days || []);
    if (days.has(day)) days.delete(day);
    else days.add(day);
    updateWindow(window.id, { days: Array.from(days) });
  };

  const applyPreset = (provider: "deepseek" | "zai") => {
    const windows =
      provider === "deepseek"
        ? [weekdayWindow("01:00", "04:00"), weekdayWindow("06:00", "10:00")]
        : [{ ...newWindow(), name: "Daily peak", startUtc: "06:00", endUtc: "10:00" }];
    onChange({ enabled: true, mode: value.mode, windows });
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
      <Toggle
        checked={value.enabled}
        onChange={(enabled) => onChange({ ...value, enabled })}
        label={providerText(t, "peakHourProtectionLabel", "Peak-hour protection")}
        description={providerText(
          t,
          "peakHourProtectionDescription",
          "Block this connection during configured UTC peak-hour windows. This avoids uncertain peak multipliers instead of trying to price them."
        )}
      />
      <Select
        label={providerText(t, "peakHourProtectionModeLabel", "Protection mode")}
        value={value.mode}
        options={[
          {
            value: "block",
            label: providerText(t, "peakHourProtectionModeBlock", "Block requests"),
          },
          {
            value: "avoid",
            label: providerText(t, "peakHourProtectionModeAvoid", "Avoid in routing"),
          },
        ]}
        onChange={(event) =>
          onChange({ ...value, mode: event.target.value === "avoid" ? "avoid" : "block" })
        }
        hint={providerText(
          t,
          "peakHourProtectionModeHint",
          "Direct requests fail while active; combo/auto routing skips protected connections when alternatives exist."
        )}
      />
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="secondary" onClick={() => applyPreset("deepseek")}>
          {providerText(t, "peakHourDeepSeekPreset", "Use DeepSeek preset")}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => applyPreset("zai")}>
          {providerText(t, "peakHourZaiPreset", "Use Z.ai preset")}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          icon="add"
          onClick={() => onChange({ ...value, windows: [...value.windows, newWindow()] })}
        >
          {providerText(t, "peakHourAddWindow", "Add window")}
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {value.windows.length === 0 ? (
          <p className="text-xs text-text-muted">
            {providerText(t, "peakHourNoWindows", "No peak-hour windows configured.")}
          </p>
        ) : (
          value.windows.map((window) => (
            <div key={window.id} className="rounded-lg border border-border/70 bg-surface/50 p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Input
                  label={providerText(t, "peakHourWindowName", "Window name")}
                  value={window.name || ""}
                  onChange={(event) => updateWindow(window.id, { name: event.target.value })}
                  placeholder={providerText(
                    t,
                    "peakHourWindowNamePlaceholder",
                    "e.g. weekday peak"
                  )}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  icon="delete"
                  onClick={() =>
                    onChange({
                      ...value,
                      windows: value.windows.filter((entry) => entry.id !== window.id),
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input
                  label={providerText(t, "peakHourStartUtc", "Start UTC")}
                  type="time"
                  value={window.startUtc}
                  onChange={(event) => updateWindow(window.id, { startUtc: event.target.value })}
                />
                <Input
                  label={providerText(t, "peakHourEndUtc", "End UTC")}
                  type="time"
                  value={window.endUtc}
                  onChange={(event) => updateWindow(window.id, { endUtc: event.target.value })}
                />
              </div>
              <div className="mt-3">
                <p className="mb-2 text-xs font-medium text-text-muted">
                  {providerText(t, "peakHourDays", "Days (empty = every day)")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {PEAK_HOUR_PROTECTION_DAYS.map((day) => {
                    const active = (window.days || []).includes(day);
                    return (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(window, day)}
                        className={`rounded-full px-2 py-1 text-xs font-medium transition-colors ${
                          active
                            ? "bg-amber-500 text-white"
                            : "bg-muted/60 text-text-muted hover:bg-muted"
                        }`}
                      >
                        {DAY_LABELS[day]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
