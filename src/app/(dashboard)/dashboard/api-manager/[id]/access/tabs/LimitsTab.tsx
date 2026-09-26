"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/shared/components";
import { UsageLimitSettings } from "@/app/(dashboard)/dashboard/api-manager/components/UsageLimitSettings";
import type { ApiKeyAccessFormState } from "../useApiKeyAccessForm";

interface LimitsTabProps {
  formState: ApiKeyAccessFormState;
  setMaxSessions: (sessions: number) => void;
  setThrottleDelayMs: (delay: number) => void;
  addRateLimit: () => void;
  removeRateLimit: (index: number) => void;
  updateRateLimit: (index: number, limit: number, windowVal: number) => void;
  setScheduleEnabled: (enabled: boolean) => void;
  setScheduleFrom: (from: string) => void;
  setScheduleUntil: (until: string) => void;
  setScheduleDays: (days: number[] | ((prev: number[]) => number[])) => void;
  setScheduleTz: (tz: string) => void;
  setUsageLimitEnabled: (enabled: boolean) => void;
  setDailyUsageLimitUsd: (val: string) => void;
  setWeeklyUsageLimitUsd: (val: string) => void;
}

export default function LimitsTab({
  formState,
  setMaxSessions,
  setThrottleDelayMs,
  addRateLimit,
  removeRateLimit,
  updateRateLimit,
  setScheduleEnabled,
  setScheduleFrom,
  setScheduleUntil,
  setScheduleDays,
  setScheduleTz,
  setUsageLimitEnabled,
  setDailyUsageLimitUsd,
  setWeeklyUsageLimitUsd,
}: LimitsTabProps) {
  const t = useTranslations("apiManager");
  const tc = useTranslations("common");

  return (
    <div className="flex flex-col gap-5">
      {/* Max Sessions Limit (T08) */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("maxActiveSessions")}</p>
          <p className="text-xs text-text-muted">{t("maxActiveSessionsDescription")}</p>
        </div>
        <div className="w-32 shrink-0">
          <Input
            type="number"
            min={0}
            step={1}
            value={String(formState.maxSessions)}
            onChange={(e) => {
              const parsed = Number.parseInt(e.target.value || "0", 10);
              setMaxSessions(Number.isFinite(parsed) && parsed > 0 ? parsed : 0);
            }}
          />
        </div>
      </div>

      {/* Soft Throttle */}
      <div className="flex items-start justify-between gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-text-main">{t("throttleDelay")}</p>
          <p className="text-xs text-text-muted">{t("throttleDelayDescription")}</p>
        </div>
        <div className="w-36 shrink-0">
          <Input
            type="number"
            min={0}
            max={300000}
            step={100}
            value={String(formState.throttleDelayMs)}
            onChange={(e) => {
              const parsed = Number.parseInt(e.target.value || "0", 10);
              setThrottleDelayMs(
                Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, 300000) : 0
              );
            }}
          />
          <p className="text-[10px] text-text-muted mt-1 text-right">milliseconds</p>
        </div>
      </div>

      {/* Custom Rate Limits */}
      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("apiManagerCustomRateLimits")}</p>
            <p className="text-xs text-text-muted">{t("apiManagerCustomRateLimitsDesc")}</p>
          </div>
          <button
            type="button"
            onClick={addRateLimit}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            Add Limit
          </button>
        </div>
        {formState.rateLimits.length > 0 && (
          <div className="flex flex-col gap-2 pt-1">
            {formState.rateLimits.map((rl, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  type="number"
                  min={1}
                  value={String(rl.limit)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateRateLimit(index, val, rl.window);
                  }}
                  placeholder={t("apiManagerRateLimitRequestsPlaceholder")}
                />
                <span className="text-sm text-text-muted shrink-0">
                  {t("apiManagerRateLimitReqPer")}
                </span>
                <Input
                  type="number"
                  min={1}
                  value={String(rl.window)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    updateRateLimit(index, rl.limit, val);
                  }}
                  placeholder={t("apiManagerRateLimitSecondsPlaceholder")}
                />
                <span className="text-sm text-text-muted shrink-0">sec</span>
                <button
                  type="button"
                  onClick={() => removeRateLimit(index)}
                  className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors shrink-0"
                  title={t("apiManagerRemoveLimitTitle")}
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Access Schedule */}
      <div className="flex flex-col gap-3 p-4 rounded-lg border border-border bg-surface/40">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium text-text-main">{t("accessSchedule")}</p>
            <p className="text-xs text-text-muted">{t("accessScheduleDesc")}</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={formState.scheduleEnabled}
            onClick={() => setScheduleEnabled(!formState.scheduleEnabled)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors shrink-0 ${
              formState.scheduleEnabled
                ? "bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-500/30"
                : "bg-black/5 dark:bg-white/5 text-text-muted border border-border"
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {formState.scheduleEnabled ? tc("enabled") : tc("disabled")}
          </button>
        </div>
        {formState.scheduleEnabled && (
          <div className="flex flex-col gap-3 pt-1 border-t border-border/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t("scheduleFrom")}</label>
                <input
                  type="time"
                  value={formState.scheduleFrom}
                  onChange={(e) => setScheduleFrom(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-sm border border-border rounded-md bg-background text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t("scheduleUntil")}</label>
                <input
                  type="time"
                  value={formState.scheduleUntil}
                  onChange={(e) => setScheduleUntil(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-sm border border-border rounded-md bg-background text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1.5 block">{t("scheduleDays")}</label>
              <div className="flex gap-1.5 flex-wrap">
                {(
                  [
                    [0, t("daySun")],
                    [1, t("dayMon")],
                    [2, t("dayTue")],
                    [3, t("dayWed")],
                    [4, t("dayThu")],
                    [5, t("dayFri")],
                    [6, t("daySat")],
                  ] as [number, string][]
                ).map(([dayIdx, label]) => {
                  const selected = formState.scheduleDays.includes(dayIdx);
                  return (
                    <button
                      key={dayIdx}
                      type="button"
                      onClick={() =>
                        setScheduleDays((prev) =>
                          prev.includes(dayIdx)
                            ? prev.filter((d) => d !== dayIdx)
                            : [...prev, dayIdx].sort((a, b) => a - b)
                        )
                      }
                      className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                        selected
                          ? "bg-primary text-white"
                          : "bg-surface border border-border text-text-muted hover:border-primary/50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="text-xs text-text-muted mb-1 block">{t("scheduleTimezone")}</label>
              <input
                type="text"
                value={formState.scheduleTz}
                onChange={(e) => setScheduleTz(e.target.value)}
                placeholder={t("apiManagerTimezonePlaceholder")}
                className="w-full max-w-sm px-2.5 py-1.5 text-sm border border-border rounded-md bg-background text-text-main font-mono focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-[10px] text-text-muted mt-1">{t("scheduleTimezoneHint")}</p>
            </div>
          </div>
        )}
      </div>

      {/* Usage Limit Settings */}
      <div className="p-4 rounded-lg border border-border bg-surface/40">
        <UsageLimitSettings
          enabled={formState.usageLimitEnabled}
          dailyLimitUsd={formState.dailyUsageLimitUsd}
          weeklyLimitUsd={formState.weeklyUsageLimitUsd}
          enabledLabel={tc("enabled")}
          disabledLabel={tc("disabled")}
          onEnabledChange={setUsageLimitEnabled}
          onDailyLimitUsdChange={setDailyUsageLimitUsd}
          onWeeklyLimitUsdChange={setWeeklyUsageLimitUsd}
        />
      </div>
    </div>
  );
}
