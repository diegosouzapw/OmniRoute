/**
 * API projection for log-export destinations: redacts secrets and adds the derived
 * backlog figure the dashboard shows. Every route returns destinations through here,
 * so a stored credential can never leak into a response by accident.
 */

import { countCallLogsAfterRowId } from "@/lib/usage/callLogExportSource";
import type { LogExportDestinationRow } from "@/lib/db/logExportDestinations";
import { getLogExportDestinationType } from "./registry";
import { redactDestinationConfig } from "./secrets";

export interface LogExportDestinationView {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  typeAvailable: boolean;
  enabled: boolean;
  config: Record<string, unknown>;
  batchSize: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  maxRowsPerRun: number;
  cursorRowId: number;
  exportedTotal: number;
  pending: number;
  lastRunAt: string | null;
  lastStatus: "success" | "failure" | null;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
}

export function toDestinationView(row: LogExportDestinationRow): LogExportDestinationView {
  const type = getLogExportDestinationType(row.type);
  return {
    id: row.id,
    name: row.name,
    type: row.type,
    typeLabel: type?.labelFallback ?? row.type,
    typeAvailable: type !== undefined,
    enabled: row.enabled,
    config: redactDestinationConfig(row.type, row.config),
    batchSize: row.batchSize,
    includeBodies: row.includeBodies,
    maxBodyBytes: row.maxBodyBytes,
    maxRowsPerRun: row.maxRowsPerRun,
    cursorRowId: row.cursorRowId,
    exportedTotal: row.exportedTotal,
    pending: countCallLogsAfterRowId(row.cursorRowId),
    lastRunAt: row.lastRunAt,
    lastStatus: row.lastStatus,
    lastError: row.lastError,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
