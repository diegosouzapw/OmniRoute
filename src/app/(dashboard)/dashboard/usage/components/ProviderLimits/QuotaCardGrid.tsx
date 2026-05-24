"use client";

import QuotaCard from "./QuotaCard";

interface Props {
  connections: any[];
  quotaData: Record<string, any>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastRefreshedAt: Record<string, string | undefined>;
  expandedRows: Set<string>;
  emailsVisible: boolean;
  providerLabels: Record<string, string>;
  onToggle: (id: string) => void;
  onRefresh: (id: string, provider: string) => void;
  onOpenCutoff: (connection: any) => void;
}

export default function QuotaCardGrid({
  connections,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  expandedRows,
  emailsVisible,
  providerLabels,
  onToggle,
  onRefresh,
  onOpenCutoff,
}: Props) {
  if (connections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {connections.map((conn) => (
        <QuotaCard
          key={conn.id}
          connection={conn}
          quota={quotaData[conn.id]}
          loading={!!loading[conn.id]}
          error={errors[conn.id] || null}
          refreshedAt={lastRefreshedAt[conn.id]}
          emailsVisible={emailsVisible}
          providerLabel={providerLabels[conn.provider] || conn.provider}
          expanded={expandedRows.has(conn.id)}
          onToggle={() => onToggle(conn.id)}
          onRefresh={() => onRefresh(conn.id, conn.provider)}
          onOpenCutoff={() => onOpenCutoff(conn)}
        />
      ))}
    </div>
  );
}
