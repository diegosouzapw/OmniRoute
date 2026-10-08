"use client";

import { useLocale, useTranslations } from "next-intl";
import { Card } from "@/shared/components";
import { useConcurrencySnapshot } from "./useConcurrencySnapshot";

interface GateRow {
  key: string;
  identity: Array<{ label: string; value: string }>;
  running: number;
  queued: number;
  limit: number;
  until: string | null;
  snapshotAt: number;
}

function QueueEntry({ row }: { row: GateRow }) {
  const t = useTranslations("health");
  const tc = useTranslations("common");
  const locale = useLocale();
  const cooling = row.until && Date.parse(row.until) > row.snapshotAt;
  return (
    <li
      title={row.key}
      className={`rounded-lg border p-3 ${row.queued > 0 ? "border-amber-500/25 bg-amber-500/5" : "border-border bg-surface/30"}`}
    >
      <dl className="space-y-1 text-xs">
        {row.identity.map(({ label, value }) => (
          <div key={label} className="flex flex-wrap gap-x-2">
            <dt className="text-text-muted">{label}</dt>
            <dd className="min-w-0 break-all font-mono text-text-main">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-text-muted">
        <span className={row.queued > 0 ? "font-semibold text-amber-500" : ""}>
          {t("queuedCount", { count: row.queued })}
        </span>
        <span>{t("runningCount", { count: row.running })}</span>
        <span>
          {tc("limit")}: {row.limit}
        </span>
      </div>
      {cooling && (
        <p className="mt-1 text-xs text-amber-500">
          {t("cooldown")} · {t("until", { time: new Date(row.until!).toLocaleTimeString(locale) })}
        </p>
      )}
    </li>
  );
}

function QueueSection({ title, rows }: { title: string; rows: GateRow[] }) {
  const t = useTranslations("health");
  return (
    <section aria-label={title}>
      <h3 className="mb-2 text-sm font-semibold text-text-main">{title}</h3>
      {rows.length ? (
        <ul className="space-y-2">
          {rows
            .sort((a, b) => b.queued - a.queued || a.key.localeCompare(b.key))
            .map((row) => (
              <QueueEntry key={row.key} row={row} />
            ))}
        </ul>
      ) : (
        <p className="rounded-lg border border-dashed border-border p-3 text-sm text-text-muted">
          {t("queuesEmpty")}
        </p>
      )}
    </section>
  );
}

function SnapshotStatus({
  data,
  error,
  stale,
}: Pick<ReturnType<typeof useConcurrencySnapshot>, "data" | "error" | "stale">) {
  const t = useTranslations("health");
  const tc = useTranslations("common");
  const ta = useTranslations("auth");
  const locale = useLocale();
  return (
    <>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-text-muted" role="status">
        {!data && !error && <span>{tc("loading")}</span>}
        {data && (
          <time dateTime={data.timestamp}>
            {t("updatedAt", { time: new Date(data.timestamp).toLocaleTimeString(locale) })}
          </time>
        )}
        {stale && <span className="text-amber-500">{t("queuesStale")}</span>}
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-red-500">
          {t("queuesError")}
          {error === "unauthorized" && <> · {ta("signIn")}</>}
        </p>
      )}
    </>
  );
}

export default function ConcurrencyQueuesCard() {
  const { data, error, refreshing, stale, refresh } = useConcurrencySnapshot();
  const t = useTranslations("health");
  const tc = useTranslations("common");
  const ts = useTranslations("settings");
  const snapshot = data ?? { timestamp: "", comboQueues: {}, semaphores: {} };

  const comboRows: GateRow[] = Object.entries(snapshot.comboQueues).map(([key, gate]) => {
    // Combo names exclude colons in the schema. Everything after the first
    // separator is the opaque execution key; never truncate or re-parse it.
    const remainder = key.slice("combo:".length);
    const separator = remainder.indexOf(":");
    const identity =
      key.startsWith("combo:") && separator > 0
        ? [
            { label: tc("combos"), value: remainder.slice(0, separator) },
            { label: tc("target"), value: remainder.slice(separator + 1) },
          ]
        : [{ label: tc("id"), value: key }];
    return {
      key,
      identity,
      ...gate,
      limit: gate.max,
      until: gate.rateLimitedUntil,
      snapshotAt: Date.parse(snapshot.timestamp),
    };
  });
  const admissionRows: GateRow[] = Object.entries(snapshot.semaphores).map(([key, gate]) => {
    const separator = key.indexOf(":");
    const identity =
      key === "global"
        ? [{ label: tc("scope"), value: ts("globalLabel") }]
        : key.startsWith("provider:")
          ? [{ label: tc("provider"), value: key.slice("provider:".length) }]
          : separator > 0
            ? [
                { label: tc("provider"), value: key.slice(0, separator) },
                { label: tc("account"), value: key.slice(separator + 1) },
              ]
            : [{ label: tc("id"), value: key }];
    return {
      key,
      identity,
      ...gate,
      limit: gate.maxConcurrency,
      until: gate.blockedUntil,
      snapshotAt: Date.parse(snapshot.timestamp),
    };
  });

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-main">{t("queuesTitle")}</h2>
          <p className="mt-1 max-w-3xl text-xs text-text-muted">{t("queuesScope")}</p>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={refreshing}
          className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-sm text-text-main hover:bg-primary/10 disabled:opacity-50"
        >
          {tc("refresh")}
        </button>
      </div>
      <SnapshotStatus data={data} error={error} stale={stale} />
      {data && (
        <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
          <QueueSection title={t("queuesCombo")} rows={comboRows} />
          <QueueSection title={t("queuesAdmission")} rows={admissionRows} />
        </div>
      )}
    </Card>
  );
}
