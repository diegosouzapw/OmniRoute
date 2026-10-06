"use client";

import { Badge, Button, Card } from "@/shared/components";
import type { LogExportDestination } from "../types";

interface DestinationCardProps {
  destination: LogExportDestination;
  busy: "test" | "run" | "toggle" | null;
  onTest: () => void;
  onRun: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function formatTimestamp(value: string | null): string {
  if (!value) return "never";
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
}

function statusBadge(destination: LogExportDestination) {
  if (!destination.enabled) return <Badge variant="default">Disabled</Badge>;
  if (destination.lastStatus === "failure") return <Badge variant="error">Failing</Badge>;
  if (destination.lastStatus === "success") return <Badge variant="success">Healthy</Badge>;
  return <Badge variant="info">Not run yet</Badge>;
}

export function DestinationCard({
  destination,
  busy,
  onTest,
  onRun,
  onToggle,
  onEdit,
  onDelete,
}: DestinationCardProps) {
  return (
    <Card padding="sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-semibold text-text-main">{destination.name}</h3>
            <Badge variant="primary" size="sm">
              {destination.typeLabel}
            </Badge>
            {statusBadge(destination)}
            {!destination.typeAvailable ? (
              <Badge variant="warning" size="sm">
                Type not installed
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-text-muted">
            Last run {formatTimestamp(destination.lastRunAt)} · exported{" "}
            {destination.exportedTotal.toLocaleString()} rows · {destination.pending.toLocaleString()}{" "}
            pending · cursor {destination.cursorRowId}
          </p>
          {destination.lastError ? (
            <p className="mt-2 rounded-control bg-red-500/10 p-2 text-xs text-red-600 dark:text-red-400">
              {destination.lastError}
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="secondary" loading={busy === "test"} onClick={onTest}>
            Test
          </Button>
          <Button size="sm" variant="secondary" loading={busy === "run"} onClick={onRun}>
            Run now
          </Button>
          <Button size="sm" variant="ghost" loading={busy === "toggle"} onClick={onToggle}>
            {destination.enabled ? "Disable" : "Enable"}
          </Button>
          <Button size="sm" variant="ghost" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
