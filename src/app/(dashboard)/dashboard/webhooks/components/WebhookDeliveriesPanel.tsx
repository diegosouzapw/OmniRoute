"use client";

import { useCallback, useEffect, useState } from "react";
import { DeliveryStatusBadge } from "./shared/DeliveryStatusBadge";

interface Delivery {
  id: number;
  event_type: string;
  status: string;
  http_status: number | null;
  latency_ms: number | null;
  error: string | null;
  created_at: string;
}

interface WebhookDeliveriesPanelProps {
  webhookId: string;
  t: (key: string) => string;
}

export function WebhookDeliveriesPanel({ webhookId, t }: WebhookDeliveriesPanelProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/webhooks/${webhookId}/deliveries?limit=5`);
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || t("deliveries.loadFailed"));
      setDeliveries(Array.isArray(data.deliveries) ? data.deliveries : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : t("deliveries.loadFailed"));
    } finally {
      setLoading(false);
    }
  }, [webhookId, t]);

  useEffect(() => {
    void load();
  }, [load]);

  if (loading) {
    return <p className="py-4 text-center text-xs text-text-muted">{t("loading")}</p>;
  }

  if (error) {
    return <p className="py-4 text-center text-xs text-red-500">{error}</p>;
  }

  if (deliveries.length === 0) {
    return <p className="py-4 text-center text-xs text-text-muted">{t("deliveries.empty")}</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="border-b border-border text-text-muted">
          <tr>
            <th className="py-2 pr-3 font-medium">{t("deliveries.status")}</th>
            <th className="py-2 pr-3 font-medium">{t("deliveries.event")}</th>
            <th className="py-2 pr-3 font-medium">{t("deliveries.latency")}</th>
            <th className="py-2 font-medium">{t("deliveries.at")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {deliveries.map((d) => (
            <tr key={d.id}>
              <td className="py-2 pr-3">
                <DeliveryStatusBadge status={d.status} httpStatus={d.http_status} />
              </td>
              <td className="py-2 pr-3 font-mono text-text-main">{d.event_type}</td>
              <td className="py-2 pr-3 text-text-muted">
                {d.latency_ms != null ? `${d.latency_ms}ms` : "—"}
              </td>
              <td className="py-2 text-text-muted">
                {new Date(d.created_at).toLocaleString()}
                {d.error && (
                  <p className="mt-0.5 truncate text-red-400" title={d.error}>
                    {d.error}
                  </p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
