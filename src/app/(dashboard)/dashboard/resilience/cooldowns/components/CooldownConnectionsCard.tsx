"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Card from "@/shared/components/Card";
import Button from "@/shared/components/Button";
import Select from "@/shared/components/Select";
import Toggle from "@/shared/components/Toggle";
import type { CooldownConnection } from "@/lib/resilience/cooldownManager";
import CooldownRow, { isClearable } from "./CooldownRow";

type ClearRequest = { connectionIds?: string[]; all?: boolean; provider?: string };

function useVisibleConnections(
  connections: CooldownConnection[],
  provider: string,
  showHealthy: boolean
) {
  return useMemo(
    () =>
      connections
        .filter((connection) => !provider || connection.provider === provider)
        .filter((connection) => showHealthy || connection.status !== "healthy")
        .sort((a, b) => b.cooldownRemainingMs - a.cooldownRemainingMs),
    [connections, provider, showHealthy]
  );
}

function TableHead() {
  const t = useTranslations("resilienceCooldowns");
  const columns = ["connection", "provider", "status", "remaining", "lockouts", "lastError"];
  return (
    <thead className="text-left text-xs uppercase text-text-muted">
      <tr>
        <th className="px-3 py-2" />
        {columns.map((column) => (
          <th key={column} className="px-3 py-2">
            {t(`list.columns.${column}`)}
          </th>
        ))}
        <th className="px-3 py-2" />
      </tr>
    </thead>
  );
}

function useSelection() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const toggle = (id: string, checked: boolean) =>
    setSelected((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  return { selected, toggle, reset: () => setSelected(new Set()) };
}

function ConnectionsTable({
  connections,
  selected,
  busy,
  onToggle,
  onClear,
}: {
  connections: CooldownConnection[];
  selected: Set<string>;
  busy: boolean;
  onToggle: (id: string, checked: boolean) => void;
  onClear: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <TableHead />
        <tbody>
          {connections.map((connection) => (
            <CooldownRow
              key={connection.id}
              connection={connection}
              selected={selected.has(connection.id)}
              busy={busy}
              onToggle={onToggle}
              onClear={onClear}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Connections out of routing for a transient reason, with single and bulk clear. */
export default function CooldownConnectionsCard({
  connections,
  onClear,
  onRefresh,
}: {
  connections: CooldownConnection[];
  onClear: (request: ClearRequest) => Promise<void>;
  onRefresh: () => void;
}) {
  const t = useTranslations("resilienceCooldowns");
  const [provider, setProvider] = useState("");
  const [showHealthy, setShowHealthy] = useState(false);
  const { selected, toggle, reset } = useSelection();
  const [busy, setBusy] = useState(false);
  const visible = useVisibleConnections(connections, provider, showHealthy);
  const providers = useMemo(
    () => [...new Set(connections.map((connection) => connection.provider))].sort(),
    [connections]
  );
  const selectedIds = visible.filter((c) => selected.has(c.id) && isClearable(c)).map((c) => c.id);

  const run = async (request: ClearRequest) => {
    setBusy(true);
    try {
      await onClear(request);
      reset();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card title={t("list.title")} subtitle={t("list.subtitle")} icon="timer_off">
      <div className="mb-4 flex flex-wrap items-end gap-4">
        <Select
          label={t("list.provider")}
          value={provider}
          placeholder={t("list.allProviders")}
          placeholderDisabled={false}
          options={providers.map((id) => ({ value: id, label: id }))}
          onChange={(event) => setProvider(event.target.value)}
        />
        <Toggle checked={showHealthy} onChange={setShowHealthy} label={t("list.showHealthy")} />
        <div className="ml-auto flex gap-2">
          <Button variant="ghost" size="sm" icon="refresh" onClick={onRefresh}>
            {t("list.refresh")}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={selectedIds.length === 0 || busy}
            onClick={() => run({ connectionIds: selectedIds })}
          >
            {t("list.clearSelected", { count: selectedIds.length })}
          </Button>
          <Button
            size="sm"
            disabled={!visible.some(isClearable) || busy}
            onClick={() => run({ all: true, provider: provider || undefined })}
          >
            {t("list.clearAll")}
          </Button>
        </div>
      </div>
      {visible.length === 0 ? (
        <p className="text-sm text-text-muted">{t("list.empty")}</p>
      ) : (
        <ConnectionsTable
          connections={visible}
          selected={selected}
          busy={busy}
          onToggle={toggle}
          onClear={(id) => run({ connectionIds: [id] })}
        />
      )}
    </Card>
  );
}
