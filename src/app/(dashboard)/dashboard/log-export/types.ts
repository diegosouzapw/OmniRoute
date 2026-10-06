export interface LogExportFieldDescriptor {
  key: string;
  labelFallback: string;
  type: "text" | "password" | "textarea" | "number" | "boolean" | "select";
  required?: boolean;
  secret?: boolean;
  placeholder?: string;
  helpFallback?: string;
  options?: Array<{ value: string; labelFallback: string }>;
}

export interface LogExportTypeDescriptor {
  id: string;
  label: string;
  description: string;
  docsUrl: string | null;
  fields: LogExportFieldDescriptor[];
}

export interface LogExportDestination {
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

export interface LogExportJobRun {
  id: number;
  jobId: string;
  startedAt: string;
  finishedAt: string | null;
  status: "running" | "success" | "failure";
  errorMessage: string | null;
  recordsAffected: number;
  durationMs: number | null;
}

export interface LogExportStatus {
  job: { id: string; enabled: boolean; cron: string | null; timezone: string } | null;
  runs: LogExportJobRun[];
  maxCallLogRowId: number;
  destinations: LogExportDestination[];
}

/** Sent back in place of a stored secret the operator did not retype. */
export const SECRET_PLACEHOLDER = "__stored__";
