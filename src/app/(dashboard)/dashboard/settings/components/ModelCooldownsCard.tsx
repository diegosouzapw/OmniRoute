"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Card } from "@/shared/components";
import { useNotificationStore } from "@/store/notificationStore";

type CooldownItem = {
  provider: string;
  model: string;
  reason: string;
  remainingMs: number;
  unavailableSince: string;
};

function formatRemaining(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}m ${sec}s`;
}

export default function ModelCooldownsCard() {
  const notify = useNotificationStore();
  const [items, setItems] = useState<CooldownItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/resilience/model-cooldowns", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      setItems(Array.isArray(json.items) ? json.items : []);
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to load cooldowns");
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    void load();
    const timer = setInterval(() => {
      void load();
    }, 5000);
    return () => clearInterval(timer);
  }, [load]);

  const clearOne = useCallback(
    async (provider: string, model: string) => {
      const key = `${provider}::${model}`;
      setBusyKey(key);
      try {
        const res = await fetch("/api/resilience/model-cooldowns", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ provider, model }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
        notify.success(`Modelo reativado: ${provider}/${model}`);
        await load();
      } catch (error) {
        notify.error(error instanceof Error ? error.message : "Failed to clear cooldown");
      } finally {
        setBusyKey(null);
      }
    },
    [load, notify]
  );

  const clearAll = useCallback(async () => {
    setBusyKey("ALL");
    try {
      const res = await fetch("/api/resilience/model-cooldowns", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      notify.success("Todos os modelos em cooldown foram reativados.");
      await load();
    } catch (error) {
      notify.error(error instanceof Error ? error.message : "Failed to clear cooldowns");
    } finally {
      setBusyKey(null);
    }
  }, [load, notify]);

  const hasItems = items.length > 0;
  const sorted = useMemo(() => [...items].sort((a, b) => b.remainingMs - a.remainingMs), [items]);

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-main">Modelos em cooldown</h2>
          <p className="mt-1 text-sm text-text-muted">
            Lista de modelos temporariamente isolados por falha. Quando o cooldown expira, eles
            voltam automaticamente.
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onClick={() => void load()} disabled={loading}>
            Atualizar
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => void clearAll()}
            disabled={!hasItems || busyKey === "ALL"}
          >
            Reativar todos
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {loading ? (
          <p className="text-sm text-text-muted">Carregando...</p>
        ) : !hasItems ? (
          <p className="text-sm text-text-muted">Nenhum modelo em cooldown no momento.</p>
        ) : (
          sorted.map((item) => {
            const rowKey = `${item.provider}::${item.model}`;
            return (
              <div
                key={rowKey}
                className="rounded-lg border border-border bg-bg-subtle px-3 py-2 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-text-main truncate">
                    {item.provider}/{item.model}
                  </p>
                  <p className="text-xs text-text-muted">
                    motivo: {item.reason} • restante: {formatRemaining(item.remainingMs)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => void clearOne(item.provider, item.model)}
                  disabled={busyKey === rowKey}
                >
                  Reativar
                </Button>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
