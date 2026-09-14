"use client";

import { useTranslations } from "next-intl";

export type PostgresStorageSummaryState = {
  connection: string;
  database: string | null;
  schema: string | null;
  serverVersion: string | null;
  sizeBytes: number;
  tableCount: number;
  replicas: number;
};

type PostgresStorageSummaryProps = {
  postgres: PostgresStorageSummaryState | null;
};

export default function PostgresStorageSummary({ postgres }: PostgresStorageSummaryProps) {
  const t = useTranslations("settings");

  return (
    <>
      {postgres && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            [t("postgresSchema"), postgres.schema ?? "public"],
            [t("postgresServerVersion"), postgres.serverVersion ?? "?"],
            [t("postgresReplicas"), String(postgres.replicas)],
            [t("postgresTables"), String(postgres.tableCount)],
          ].map(([label, value]) => (
            <div key={label} className="p-3 rounded-lg bg-bg border border-border">
              <p className="text-[11px] text-text-muted uppercase tracking-wide mb-1">{label}</p>
              <p className="text-sm font-mono text-text-main break-all">{value}</p>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-text-muted">{t("postgresFileActionsUnavailable")}</p>
    </>
  );
}
