"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { SegmentedControl, Collapsible } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";
import { rtkConfigSchema } from "@/shared/validation/compressionConfigSchemas";
import RtkLearnDiscoverCard from "./RtkLearnDiscoverCard";
import RtkTomlImportCard from "./RtkTomlImportCard";

type RtkFilter = {
  id: string;
  name: string;
  description: string;
  commandTypes: string[];
  category: string;
  priority: number;
};

type RtkConfig = {
  enabled: boolean;
  intensity: "minimal" | "standard" | "aggressive";
  applyToToolResults: boolean;
  applyToAssistantMessages: boolean;
  applyToCodeBlocks: boolean;
  enabledFilters: string[];
  disabledFilters: string[];
  maxLinesPerResult: number;
  maxCharsPerResult: number;
  deduplicateThreshold: number;
  customFiltersEnabled: boolean;
  trustProjectFilters: boolean;
  rawOutputRetention: "never" | "failures" | "always";
  rawOutputMaxBytes: number;
};

type ConfigUpdate = (current: RtkConfig) => Partial<RtkConfig>;

type AnalyticsSummary = {
  totalRequests: number;
  totalTokensSaved: number;
  avgSavingsPct: number;
  byEngine?: Record<string, { count: number; tokensSaved: number; avgSavingsPct: number }>;
};

type PreviewResult = {
  text?: string;
  compressed?: boolean;
  originalTokens?: number;
  compressedTokens?: number;
  techniquesUsed?: string[];
  detection?: { type: string; confidence: number; category: string };
  error?: string;
};

const SAMPLE_OUTPUT = `$ npm run typecheck
src/lib/example.ts:10:15 - error TS2322: Type 'string' is not assignable to type 'number'.

10 const value: number = "bad";
                 ~~~~~

Found 1 error in src/lib/example.ts:10`;

function formatNumber(value: number | undefined): string {
  return new Intl.NumberFormat().format(value ?? 0);
}

// A save or read-back that gets no reply in this time counts as failed, so one stalled request
// cannot hold back the saves queued behind it.
const REQUEST_TIMEOUT_MS = 15_000;

// Config saves and loads from every copy of this page run one at a time, in order. A save still
// queued when the user leaves the page then goes out before the next visit loads, so it cannot
// overwrite a newer edit made there, and the reopened page starts from what it stored.
let configQueue = Promise.resolve();

function queueConfigTask(task: () => Promise<void>) {
  // A task that throws anyway must not strand the saves queued behind it.
  configQueue = configQueue.then(task, () => {});
}

// The route answers with the stored config; a body without the array that carries the filter
// state is not one (a proxy or login page, a garbled body).
function isRtkConfig(value: unknown): value is RtkConfig {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as RtkConfig).disabledFilters)
  );
}

// Asks the config route. status is the HTTP status when the route refused the request, and null
// when there is no usable answer: a dropped connection, no reply in time, or a 2xx body that is
// not a config.
async function fetchConfig(
  init?: RequestInit
): Promise<{ config: RtkConfig | null; status: number | null }> {
  try {
    const res = await fetch("/api/context/rtk/config", {
      ...init,
      signal: init?.signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) return { config: null, status: res.status };
    const data: unknown = await res.json().catch(() => null);
    return isRtkConfig(data) ? { config: data, status: null } : { config: null, status: null };
  } catch {
    return { config: null, status: null };
  }
}

// The range a number setting accepts, read from the schema the route validates with, so the
// form and the server cannot disagree.
function fieldBounds(key: keyof typeof rtkConfigSchema.shape): { min: number; max?: number } {
  const field = rtkConfigSchema.shape[key].unwrap() as { minValue?: number; maxValue?: number };
  return { min: field.minValue ?? 0, max: field.maxValue ?? undefined };
}

// Turns typed text into the value to save: an empty or unreadable edit saves nothing (the shown
// value comes back), decimals round, and out-of-range values clamp into the schema's range.
// Null saves nothing.
function commitValue(draft: string, value: number, min: number, max?: number): number | null {
  if (draft.trim() === "") return null;
  const parsed = Math.round(Number(draft));
  if (!Number.isFinite(parsed)) return null;
  const next = Math.min(Math.max(parsed, min), max ?? parsed);
  return next === value ? null : next;
}

// Keeps the typed text locally and saves once the edit is committed (blur or Enter), so typing a
// value sends one save and the schema only sees the finished value; it rejects the partial ones.
function NumberSetting({
  label,
  value,
  min,
  max,
  onCommit,
  onDraftChange,
}: {
  label: string;
  value: number;
  min: number;
  max?: number;
  onCommit: (value: number) => void;
  onDraftChange: (open: boolean) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const draftRef = useRef<string | null>(null);
  const commitRef = useRef<() => void>(() => {});
  const commit = () => {
    if (draftRef.current === null) return;
    const pending = draftRef.current;
    draftRef.current = null;
    setDraft(null);
    const next = commitValue(pending, value, min, max);
    if (next !== null) onCommit(next);
  };
  // The newest commit closure survives the component, so a number typed but not committed is
  // still saved when the page unmounts.
  useEffect(() => {
    commitRef.current = commit;
  });
  useEffect(
    () => () => {
      commitRef.current();
    },
    []
  );
  const open = draft !== null;
  useEffect(() => {
    if (!open) return;
    onDraftChange(true);
    return () => onDraftChange(false);
  }, [open, onDraftChange]);
  return (
    <label className="flex flex-col gap-1 text-sm text-text-main">
      {label}
      <input
        type="number"
        min={min}
        max={max}
        value={draft ?? value}
        onChange={(event) => {
          draftRef.current = event.target.value;
          setDraft(event.target.value);
        }}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
        }}
        className="rounded border border-border bg-bg px-2 py-1 text-sm"
      />
    </label>
  );
}

export default function RtkContextPageClient() {
  const t = useTranslations("contextRtk");
  const tSettings = useTranslations("settings");
  const tCommon = useTranslations("common");
  const [filters, setFilters] = useState<RtkFilter[]>([]);
  const [config, setConfig] = useState<RtkConfig | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [sample, setSample] = useState(SAMPLE_OUTPUT);
  const [preview, setPreview] = useState<PreviewResult | null>(null);
  const [saveFailed, setSaveFailed] = useState(false);
  // Set when the stored config could not be read: the HTTP status, or "" when the request or its
  // body failed. The page stays empty instead of showing a form that would save defaults over
  // the stored config.
  const [loadError, setLoadError] = useState<string | null>(null);
  // The form shows the config the server last confirmed plus the edits still queued, so the
  // newest edit stays on screen and a failed save rolls back only its own change. A queued edit is
  // worked out again from the confirmed config when its save goes out, so it never carries an
  // earlier edit that failed.
  const savedRef = useRef<RtkConfig | null>(null);
  const queuedRef = useRef<ConfigUpdate[]>([]);
  // Number fields with text typed but not committed yet; the unload guard counts them.
  const draftsRef = useRef(0);
  const onDraftChange = useCallback((open: boolean) => {
    draftsRef.current += open ? 1 : -1;
  }, []);
  // True until the page unmounts; a save that fails after that can only say so as a toast.
  const mountedRef = useRef(true);
  const addNotification = useNotificationStore((state) => state.addNotification);
  const [viewMode, setViewMode] = useState<"simple" | "advanced">("simple");
  const [masterEnabled, setMasterEnabled] = useState<boolean | null>(null);
  // The stored master flag decides the "master switch is OFF" banner, so a failed
  // settings GET must not read as off. A retry re-runs the load; answers that arrive
  // for the run it replaced are ignored.
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    // A save still queued, or a number typed but not committed, would be lost by closing the
    // tab, so the browser asks first; it renders its own prompt.
    const guard = (event: BeforeUnloadEvent) => {
      if (queuedRef.current.length > 0 || draftsRef.current > 0) event.preventDefault();
    };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch("/api/settings/compression")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (ignore) return;
        if (data) setMasterEnabled(Boolean(data.enabled));
        setLoadFailed(!data);
      })
      .catch(() => {
        if (!ignore) setLoadFailed(true);
      });
    return () => {
      ignore = true;
    };
  }, [loadAttempt]);

  const loadFilters = () =>
    fetch("/api/context/rtk/filters")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setFilters(Array.isArray(data?.filters) ? data.filters : []))
      .catch(() => {});

  useEffect(() => {
    void loadFilters();
    queueConfigTask(async () => {
      const reply = await fetchConfig();
      if (reply.config) {
        savedRef.current = reply.config;
        setConfig(reply.config);
      } else {
        setLoadError(reply.status === null ? "" : String(reply.status));
      }
    });
    fetch("/api/context/analytics?since=7d")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setAnalytics(data))
      .catch(() => {});
  }, []);

  const groupedFilters = useMemo(() => {
    return filters.reduce<Record<string, RtkFilter[]>>((groups, filter) => {
      groups[filter.category] = [...(groups[filter.category] ?? []), filter];
      return groups;
    }, {});
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    if (!config) return 0;
    if (config.enabledFilters.length > 0) return config.enabledFilters.length;
    return filters.filter((filter) => !config.disabledFilters.includes(filter.id)).length;
  }, [config, filters]);

  // The human name of each editable setting, for a failure the user no longer sees on the page.
  const settingLabels: Partial<Record<keyof RtkConfig, string>> = {
    maxLinesPerResult: t("maxLines"),
    maxCharsPerResult: t("maxChars"),
    deduplicateThreshold: t("deduplicateThreshold"),
    rawOutputMaxBytes: t("rawOutputMaxBytes"),
    applyToToolResults: t("toolResults"),
    applyToAssistantMessages: t("assistantMessages"),
    applyToCodeBlocks: t("codeBlocks"),
    customFiltersEnabled: t("customFilters"),
    trustProjectFilters: t("trustProjectFilters"),
    rawOutputRetention: t("rawOutputRetention"),
    enabledFilters: t("filterCatalog"),
    disabledFilters: t("filterCatalog"),
  };

  const saveConfig = (patch: Partial<RtkConfig> | ConfigUpdate) => {
    if (!savedRef.current) return;
    const update = typeof patch === "function" ? patch : () => patch;
    const showQueued = () =>
      setConfig(
        queuedRef.current.reduce<RtkConfig>(
          (shown, queued) => ({ ...shown, ...queued(shown) }),
          savedRef.current as RtkConfig
        )
      );
    const markFailed = (body: Partial<RtkConfig>) => {
      setSaveFailed(true);
      if (!mountedRef.current) {
        const key = String(Object.keys(body)[0]) as keyof RtkConfig | "";
        addNotification({
          type: "error",
          title: tSettings("saveFailed"),
          message: (key && settingLabels[key]) || String(key),
        });
      }
    };
    queuedRef.current.push(update);
    showQueued();
    setSaveFailed(false);
    queueConfigTask(async () => {
      try {
        const body = update(savedRef.current as RtkConfig);
        // One timeout budget covers the save and, when its answer is lost, the read-back.
        const deadline = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
        const reply = await fetchConfig({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: deadline,
        });
        // A lost or unusable answer leaves the outcome unknown: the server may have stored the
        // change, so read back what it holds, and the save failed only if the change is not
        // there. A refused request stored nothing, so a 4xx answer is failed without a read;
        // a 5xx may or may not have stored, so it reads back too.
        const readBack =
          reply.config === null && (reply.status === null || reply.status >= 500)
            ? await fetchConfig({ signal: deadline })
            : null;
        const stored = reply.config ?? readBack?.config ?? null;
        const kept =
          reply.config !== null ||
          (stored !== null &&
            Object.entries(body).every(
              ([key, value]) =>
                JSON.stringify(stored[key as keyof RtkConfig]) === JSON.stringify(value)
            ));
        queuedRef.current.shift();
        if (stored) savedRef.current = stored;
        if (!kept) markFailed(body);
        showQueued();
      } catch {
        // The request could not even be attempted; the edit counts as failed.
        queuedRef.current.shift();
        markFailed({});
        showQueued();
      }
    });
  };

  const toggleFilter = (filterId: string, enabled: boolean) =>
    saveConfig((current) => ({
      disabledFilters: enabled
        ? current.disabledFilters.filter((id) => id !== filterId)
        : [...new Set([...current.disabledFilters, filterId])],
    }));

  const runPreview = async () => {
    const res = await fetch("/api/context/rtk/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: sample, config: config ?? undefined }),
    });
    setPreview(res.ok ? await res.json() : { error: await res.text() });
  };

  const rtkStats = analytics?.byEngine?.rtk;
  const statCards = [
    [t("tokensFiltered"), formatNumber(rtkStats?.tokensSaved ?? analytics?.totalTokensSaved)],
    [t("filtersActive"), formatNumber(activeFilterCount)],
    [t("requests"), formatNumber(rtkStats?.count ?? analytics?.totalRequests)],
    [t("avgSavings"), `${rtkStats?.avgSavingsPct ?? analytics?.avgSavingsPct ?? 0}%`],
  ];

  if (loadFailed) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between gap-4 rounded-lg border border-border bg-surface p-4">
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {tSettings("compressionTitle")}: {tCommon("failedToLoad")}
          </p>
          <button
            type="button"
            onClick={() => setLoadAttempt((attempt) => attempt + 1)}
            className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs text-text-main hover:bg-bg"
          >
            {tSettings("retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[30px] text-primary">filter_alt</span>
            <div>
              <h1 className="text-2xl font-bold text-text-main">{t("title")}</h1>
              <p className="text-sm text-text-muted">{t("description")}</p>
            </div>
          </div>
          <SegmentedControl
            value={viewMode}
            onChange={(v) => setViewMode(v as "simple" | "advanced")}
            options={[
              { value: "simple", label: t("simpleMode") || "Simple" },
              { value: "advanced", label: t("advancedMode") || "Advanced" },
            ]}
          />
        </div>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-surface p-4">
            <p className="text-xs uppercase text-text-muted">{label}</p>
            <p className="mt-1 text-xl font-semibold text-text-main">{value}</p>
          </div>
        ))}
      </section>

      {masterEnabled === false && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300 flex items-start gap-2">
          <span className="material-symbols-outlined text-[18px]">info</span>
          <p>{t("masterSwitchOffAlert")}</p>
        </div>
      )}

      {loadError !== null && (
        <p
          role="alert"
          className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400"
        >
          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
            error
          </span>
          {tSettings("failedLoadWithStatus", { status: loadError || tSettings("unknownError") })}
        </p>
      )}

      {config && (
        <section className="rounded-lg border border-border bg-surface p-4">
          {/* On/off + intensity now live in the panel (/dashboard/context/settings). This
              page edits RTK's detailed configuration only. */}
          {saveFailed && (
            <p
              role="alert"
              className="mb-3 flex items-center gap-1 text-xs font-medium text-red-500"
            >
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                error
              </span>
              {tSettings("saveFailed")}
            </p>
          )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {(
              [
                ["maxLinesPerResult", t("maxLines")],
                ["maxCharsPerResult", t("maxChars")],
                ["deduplicateThreshold", t("deduplicateThreshold")],
                ["rawOutputMaxBytes", t("rawOutputMaxBytes")],
              ] as const
            ).map(([key, label]) => (
              <NumberSetting
                key={key}
                label={label}
                value={config[key]}
                {...fieldBounds(key)}
                onCommit={(value) => saveConfig({ [key]: value } as Partial<RtkConfig>)}
                onDraftChange={onDraftChange}
              />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-main">
            {[
              ["applyToToolResults", t("toolResults")],
              ["applyToAssistantMessages", t("assistantMessages")],
              ["applyToCodeBlocks", t("codeBlocks")],
              ["customFiltersEnabled", t("customFilters")],
              ["trustProjectFilters", t("trustProjectFilters")],
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={Boolean(config[key as keyof RtkConfig])}
                  onChange={(event) =>
                    saveConfig({ [key]: event.target.checked } as Partial<RtkConfig>)
                  }
                />
                {label}
              </label>
            ))}
          </div>
          <div className="mt-4 max-w-sm text-sm text-text-main">
            <label className="flex flex-col gap-1">
              {t("rawOutputRetention")}
              <select
                value={config.rawOutputRetention}
                onChange={(event) =>
                  saveConfig({
                    rawOutputRetention: event.target.value as RtkConfig["rawOutputRetention"],
                  })
                }
                className="rounded border border-border bg-bg px-2 py-1 text-sm"
              >
                <option value="never">{t("rawOutputNever")}</option>
                <option value="failures">{t("rawOutputFailures")}</option>
                <option value="always">{t("rawOutputAlways")}</option>
              </select>
            </label>
          </div>
        </section>
      )}

      {viewMode === "advanced" && (
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1fr]">
          <div className="rounded-lg border border-border bg-surface p-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-text-main">{t("filterTesting")}</h2>
              <button
                onClick={runPreview}
                className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white"
              >
                {t("run")}
              </button>
            </div>
            <textarea
              value={sample}
              onChange={(event) => setSample(event.target.value)}
              placeholder={t("pasteOutput")}
              className="h-72 w-full rounded-lg border border-border bg-bg p-3 font-mono text-xs text-text-main"
            />
          </div>
          <div className="rounded-lg border border-border bg-surface p-4">
            <h2 className="mb-3 text-sm font-semibold text-text-main">{t("result")}</h2>
            {preview?.detection && (
              <p className="mb-2 text-xs text-text-muted">
                {t("detected")}: {preview.detection.type} (
                {Math.round(preview.detection.confidence * 100)}%)
              </p>
            )}
            <pre className="h-72 overflow-auto rounded-lg border border-border bg-bg p-3 text-xs text-text-main">
              {preview ? JSON.stringify(preview, null, 2) : t("previewEmpty")}
            </pre>
          </div>
        </section>
      )}

      <Collapsible
        title={t("filterCatalog") || "Filter Catalog"}
        subtitle={t("filterCatalogDesc") || "Available output filters by category"}
        icon="filter_list"
        trailing={
          <span className="text-xs text-text-muted">
            {Object.values(groupedFilters).flat().length} {t("filtersActive") || "filters"}
          </span>
        }
        defaultOpen={viewMode === "advanced"}
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(groupedFilters).map(([category, items]) => (
            <div key={category} className="rounded-lg border border-border bg-bg p-3">
              <h3 className="text-xs font-semibold capitalize text-text-main">{category}</h3>
              <div className="mt-2 space-y-2">
                {items.map((filter) => {
                  const enabled = config ? !config.disabledFilters.includes(filter.id) : true;
                  return (
                    <div
                      key={filter.id}
                      className="border-t border-border pt-2 first:border-t-0 first:pt-0"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-text-main">{filter.name}</p>
                          <p className="mt-0.5 text-[11px] text-text-muted">{filter.description}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={enabled}
                          disabled={!config}
                          onChange={(event) => toggleFilter(filter.id, event.target.checked)}
                          className="mt-0.5"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Collapsible>

      {viewMode === "advanced" && <RtkTomlImportCard onInstalled={loadFilters} />}

      <RtkLearnDiscoverCard />
    </div>
  );
}
