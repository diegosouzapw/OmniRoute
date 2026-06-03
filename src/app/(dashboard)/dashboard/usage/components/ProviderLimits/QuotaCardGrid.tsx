"use client";

import QuotaCard from "./QuotaCard";

interface Props {
  connections: any[];
  quotaData: Record<string, any>;
  loading: Record<string, boolean>;
  errors: Record<string, string | null>;
  lastRefreshedAt: Record<string, string | undefined>;
  emailsVisible: boolean;
  providerLabels: Record<string, string>;
  onRefresh: (id: string, provider: string) => void;
  onOpenCutoff: (connection: any) => void;
}

export default function QuotaCardGrid({
  connections,
  quotaData,
  loading,
  errors,
  lastRefreshedAt,
  emailsVisible,
  providerLabels,
  onRefresh,
  onOpenCutoff,
}: Props) {
  if (connections.length === 0) return null;

  // Group connections by provider, preserving the order from sortedConnections.
  const groups = new Map<string, typeof connections>();
  for (const conn of connections) {
    const list = groups.get(conn.provider) ?? [];
    list.push(conn);
    groups.set(conn.provider, list);
  }

  return (
    <div className="flex flex-col gap-6">
      {[...groups.entries()].map(([provider, conns]) => (
        <div key={provider} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-text-main flex items-center gap-2">
            {providerLabels[provider] || provider}
            <span className="text-xs font-normal text-text-muted">
              ({conns.length} account{conns.length !== 1 ? "s" : ""})
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {conns.map((conn) => (
              <QuotaCard
                key={conn.id}
                connection={conn}
                quota={quotaData[conn.id]}
                loading={!!loading[conn.id]}
                error={errors[conn.id] || null}
                refreshedAt={lastRefreshedAt[conn.id]}
                emailsVisible={emailsVisible}
                providerLabel={providerLabels[conn.provider] || conn.provider}
                onRefresh={() => onRefresh(conn.id, conn.provider)}
                onOpenCutoff={() => onOpenCutoff(conn)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
