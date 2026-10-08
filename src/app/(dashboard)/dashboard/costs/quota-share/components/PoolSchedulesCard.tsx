"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import type { QuotaSchedule, ReserveRule } from "@/lib/quota/schedules";

export interface PoolSchedulesCardProps {
  poolId: string;
}

/** A row being edited. Same shape the API takes, minus the server-assigned poolId. */
type DraftSchedule = Omit<QuotaSchedule, "poolId">;

const BUDGET_UNITS = ["requests", "tokens", "usd"] as const;
const BUDGET_WINDOWS = ["hourly", "5h", "daily", "weekly", "monthly"] as const;
const RESERVE_WINDOWS = ["any", "hourly", "5h", "daily", "weekly", "monthly"] as const;

/** Sub-percent steps matter: 1 % of a weekly token budget is a lot to round away. */
const RESERVE_STEP = 0.5;

/** "09:30" ⇄ 570. The native time input speaks HH:MM; the API speaks minutes. */
function minutesToTime(minutes: number): string {
  const clamped = Math.max(0, Math.min(minutes, 1440));
  const h = Math.floor(clamped / 60) % 24;
  const m = clamped % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function timeToMinutes(value: string, fallback: number): number {
  const [h, m] = value.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return fallback;
  return h * 60 + m;
}

/**
 * Localized one-letter weekday initials, indexed by JS getDay().
 * 2024-01-07 was a Sunday, so day N is that date + N — no hand-written table to
 * translate, and the letters follow whatever the viewer's locale spells.
 */
function weekdayInitials(locale: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "narrow", timeZone: "UTC" });
  return Array.from({ length: 7 }, (_, i) => fmt.format(new Date(Date.UTC(2024, 0, 7 + i))));
}

function newDraft(): DraftSchedule {
  return {
    id: `new-${Math.random().toString(36).slice(2, 10)}`,
    days: [1, 2, 3, 4, 5],
    startMinute: 9 * 60,
    endMinute: 18 * 60,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
    mode: "allow",
    reserves: [],
    budgetWindow: "daily",
    priority: 0,
    enabled: true,
  };
}

/**
 * PoolSchedulesCard — collapsible editor for a pool's time-aware quota windows,
 * backed by GET/PUT /api/quota/pools/[id]/schedules.
 *
 * Each row answers two separate questions, and either half can be left empty:
 *   · WHEN may OmniRoute use these accounts (days + hours + allow/block)
 *   · HOW MUCH may it take once it is inside the window —
 *       "reserve" = how much upstream quota must be LEFT (counts everyone's
 *       usage, so a colleague on the same account pushes OmniRoute out first);
 *       "budget"  = how much OmniRoute itself may spend (counts only its own
 *       traffic, so somebody else's usage neither eats nor inflates it).
 *
 * Fail-soft like its UsageLogCard sibling: a failed load or save shows an inline
 * message and never crashes the parent PoolCard. Collapsed by default so pool
 * cards stay compact.
 */
export default function PoolSchedulesCard({ poolId }: PoolSchedulesCardProps) {
  const t = useTranslations("quotaShare");
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState<DraftSchedule[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const initials = weekdayInitials(locale);

  useEffect(() => {
    if (!open || loaded) return;
    let alive = true;
    fetch(`/api/quota/pools/${poolId}/schedules`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!alive) return;
        const raw: unknown = data?.schedules;
        setRows(Array.isArray(raw) ? (raw as DraftSchedule[]) : []);
        setLoaded(true);
      })
      .catch(() => {
        if (!alive) return;
        setRows([]);
        setLoaded(true);
        setMessage({ kind: "error", text: t("schedulesLoadError") });
      });
    return () => {
      alive = false;
    };
  }, [open, loaded, poolId, t]);

  const patchRow = useCallback((index: number, patch: Partial<DraftSchedule>) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
    setMessage(null);
  }, []);

  const toggleDay = useCallback((index: number, day: number) => {
    setRows((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              days: row.days.includes(day)
                ? row.days.filter((d) => d !== day)
                : [...row.days, day].sort((a, b) => a - b),
            }
          : row
      )
    );
    setMessage(null);
  }, []);

  /** Rewrite one row's reserve list; `next` of null removes the rule at `ruleIndex`. */
  const patchReserve = useCallback((index: number, ruleIndex: number, next: ReserveRule | null) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        const reserves = next
          ? row.reserves.map((rule, r) => (r === ruleIndex ? next : rule))
          : row.reserves.filter((_, r) => r !== ruleIndex);
        return { ...row, reserves };
      })
    );
    setMessage(null);
  }, []);

  const addReserve = useCallback((index: number) => {
    setRows((prev) =>
      prev.map((row, i) => {
        if (i !== index) return row;
        // Offer a window the row has not reserved yet, so a second rule is
        // useful on its own instead of shadowing the first.
        const taken = new Set(row.reserves.map((r) => r.window));
        const window = RESERVE_WINDOWS.find((w) => !taken.has(w)) ?? "any";
        return { ...row, reserves: [...row.reserves, { window, percent: 10 }] };
      })
    );
    setMessage(null);
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    setMessage(null);
    try {
      // Drop the client-side placeholder ids so the server mints stable ones,
      // and never ship half a budget — the API rejects an orphan value/unit.
      const payload = rows.map((row) => {
        const { id, ...rest } = row;
        const hasBudget = rest.budgetValue !== undefined && rest.budgetUnit !== undefined;
        return {
          ...rest,
          ...(id.startsWith("new-") ? {} : { id }),
          ...(hasBudget ? {} : { budgetValue: undefined, budgetUnit: undefined }),
        };
      });

      const res = await fetch(`/api/quota/pools/${poolId}/schedules`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedules: payload }),
      });

      if (!res.ok) {
        setMessage({ kind: "error", text: t("schedulesSaveError") });
        return;
      }
      const data = await res.json();
      setRows(Array.isArray(data?.schedules) ? (data.schedules as DraftSchedule[]) : []);
      setMessage({ kind: "ok", text: t("schedulesSaved") });
    } catch {
      setMessage({ kind: "error", text: t("schedulesSaveError") });
    } finally {
      setSaving(false);
    }
  }, [rows, poolId, t]);

  const inputCls =
    "bg-bg-subtle border border-border/50 rounded px-1.5 py-0.5 text-[11px] text-text-main";

  return (
    <div className="mt-2 pt-2 border-t border-border/30">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 text-[10px] uppercase tracking-wide font-bold text-text-muted hover:text-text-main w-full text-left cursor-pointer"
      >
        <span
          className={`material-symbols-outlined text-[13px] transition-transform ${open ? "rotate-90" : ""}`}
        >
          chevron_right
        </span>
        {t("schedulesTitle")}
        {rows.length > 0 && (
          <span className="ml-1 text-text-muted/60 normal-case font-normal">({rows.length})</span>
        )}
      </button>

      {open && (
        <div className="mt-1.5 flex flex-col gap-2">
          <p className="text-[11px] text-text-muted leading-snug">{t("schedulesHint")}</p>

          {!loaded ? (
            <div className="text-[11px] text-text-muted italic">{t("loading")}</div>
          ) : rows.length === 0 ? (
            <div className="text-[11px] text-text-muted italic">{t("schedulesEmpty")}</div>
          ) : (
            <div className="flex flex-col gap-2">
              {rows.map((row, index) => (
                <div
                  key={row.id}
                  className={`rounded-md border border-border/40 p-2 flex flex-col gap-1.5 ${
                    row.enabled ? "" : "opacity-50"
                  }`}
                >
                  {/* Row 1 — when */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <input
                      type="checkbox"
                      checked={row.enabled}
                      onChange={(e) => patchRow(index, { enabled: e.target.checked })}
                      aria-label={t("schedulesEnabled")}
                      className="cursor-pointer"
                    />

                    <select
                      value={row.mode}
                      onChange={(e) =>
                        patchRow(index, { mode: e.target.value as DraftSchedule["mode"] })
                      }
                      aria-label={t("schedulesMode")}
                      className={`${inputCls} cursor-pointer`}
                    >
                      <option value="allow">{t("schedulesModeAllow")}</option>
                      <option value="block">{t("schedulesModeBlock")}</option>
                    </select>

                    <div className="flex items-center gap-0.5">
                      {initials.map((initial, day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDay(index, day)}
                          aria-pressed={row.days.includes(day)}
                          title={initial}
                          className={`w-5 h-5 rounded text-[10px] font-bold cursor-pointer ${
                            row.days.includes(day)
                              ? "bg-accent/20 text-accent"
                              : "bg-bg-subtle text-text-muted"
                          }`}
                        >
                          {initial}
                        </button>
                      ))}
                    </div>

                    <input
                      type="time"
                      value={minutesToTime(row.startMinute)}
                      onChange={(e) =>
                        patchRow(index, {
                          startMinute: timeToMinutes(e.target.value, row.startMinute),
                        })
                      }
                      aria-label={t("schedulesFrom")}
                      className={inputCls}
                    />
                    <span className="text-[11px] text-text-muted">→</span>
                    <input
                      type="time"
                      value={minutesToTime(row.endMinute)}
                      onChange={(e) =>
                        patchRow(index, { endMinute: timeToMinutes(e.target.value, row.endMinute) })
                      }
                      aria-label={t("schedulesTo")}
                      className={inputCls}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setRows((prev) => prev.filter((_, i) => i !== index));
                        setMessage(null);
                      }}
                      title={t("schedulesRemove")}
                      className="ml-auto p-1 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>

                  {/* Row 2a — how much must be left, one floor per metered window */}
                  {row.mode === "allow" && (
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <label
                          className="text-[11px] text-text-muted"
                          title={t("schedulesReserveHint")}
                        >
                          {t("schedulesReserve")}
                        </label>
                        {row.reserves.length === 0 && (
                          <span className="text-[11px] text-text-muted/60 italic">
                            {t("schedulesReserveNone")}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => addReserve(index)}
                          className="text-[11px] px-1.5 py-0.5 rounded bg-bg-subtle hover:bg-bg-subtle/70 text-text-main cursor-pointer"
                        >
                          + {t("schedulesReserveAdd")}
                        </button>
                      </div>

                      {row.reserves.map((rule, ruleIndex) => (
                        <div
                          key={`${rule.window}-${ruleIndex}`}
                          className="flex flex-wrap items-center gap-1.5 pl-3"
                        >
                          <select
                            value={rule.window}
                            onChange={(e) =>
                              patchReserve(index, ruleIndex, {
                                ...rule,
                                window: e.target.value as ReserveRule["window"],
                              })
                            }
                            aria-label={t("schedulesReserveWindow")}
                            className={`${inputCls} cursor-pointer`}
                          >
                            {RESERVE_WINDOWS.map((w) => (
                              <option key={w} value={w}>
                                {w === "any" ? t("schedulesReserveWindowAny") : w}
                              </option>
                            ))}
                          </select>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            step={RESERVE_STEP}
                            value={rule.percent}
                            onChange={(e) =>
                              patchReserve(index, ruleIndex, {
                                ...rule,
                                percent: Number(e.target.value) || 0,
                              })
                            }
                            aria-label={t("schedulesReserve")}
                            className={`${inputCls} w-16`}
                          />
                          <span className="text-[11px] text-text-muted">%</span>
                          <button
                            type="button"
                            onClick={() => patchReserve(index, ruleIndex, null)}
                            title={t("schedulesReserveRemove")}
                            className="p-0.5 rounded hover:bg-red-500/10 text-text-muted hover:text-red-400 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[13px]">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Row 2b — how much OmniRoute itself may spend */}
                  {row.mode === "allow" && (
                    <div className="flex flex-wrap items-center gap-1.5">
                      <label
                        className="text-[11px] text-text-muted"
                        title={t("schedulesBudgetHint")}
                      >
                        {t("schedulesBudget")}
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={row.budgetValue ?? ""}
                        placeholder="—"
                        onChange={(e) =>
                          patchRow(index, {
                            budgetValue: e.target.value === "" ? undefined : Number(e.target.value),
                            // A value needs a unit to be countable; seed one so a
                            // half-filled budget can never be submitted.
                            budgetUnit:
                              e.target.value === "" ? undefined : (row.budgetUnit ?? "tokens"),
                          })
                        }
                        className={`${inputCls} w-24`}
                      />
                      <select
                        value={row.budgetUnit ?? ""}
                        disabled={row.budgetValue === undefined}
                        onChange={(e) =>
                          patchRow(index, {
                            budgetUnit: (e.target.value ||
                              undefined) as DraftSchedule["budgetUnit"],
                          })
                        }
                        aria-label={t("schedulesBudgetUnit")}
                        className={`${inputCls} cursor-pointer disabled:opacity-40`}
                      >
                        <option value="">—</option>
                        {BUDGET_UNITS.map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                      <select
                        value={row.budgetWindow}
                        disabled={row.budgetValue === undefined}
                        onChange={(e) =>
                          patchRow(index, {
                            budgetWindow: e.target.value as DraftSchedule["budgetWindow"],
                          })
                        }
                        aria-label={t("schedulesBudgetWindow")}
                        className={`${inputCls} cursor-pointer disabled:opacity-40`}
                      >
                        {BUDGET_WINDOWS.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Row 3 — zone and precedence */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <label className="text-[11px] text-text-muted">{t("schedulesTimezone")}</label>
                    <input
                      type="text"
                      value={row.timezone ?? ""}
                      placeholder="Europe/Rome"
                      onChange={(e) => patchRow(index, { timezone: e.target.value.trim() || null })}
                      className={`${inputCls} w-40`}
                    />
                    <label className="text-[11px] text-text-muted ml-1">
                      {t("schedulesPriority")}
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={1000}
                      value={row.priority}
                      onChange={(e) => patchRow(index, { priority: Number(e.target.value) || 0 })}
                      className={`${inputCls} w-14`}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setRows((prev) => [...prev, newDraft()]);
                setMessage(null);
              }}
              className="text-[11px] px-2 py-1 rounded bg-bg-subtle hover:bg-bg-subtle/70 text-text-main cursor-pointer"
            >
              + {t("schedulesAdd")}
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving || !loaded}
              className="text-[11px] px-2 py-1 rounded bg-accent/20 text-accent hover:bg-accent/30 disabled:opacity-40 cursor-pointer"
            >
              {saving ? t("loading") : t("save")}
            </button>
            {message && (
              <span
                className={`text-[11px] ${message.kind === "ok" ? "text-emerald-400" : "text-red-400"}`}
              >
                {message.text}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
