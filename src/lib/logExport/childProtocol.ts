/** Only control metadata crosses IPC; records and payloads never return to the parent. */
export interface ExportChildStart {
  kind: "start";
  destination: { id: string; type: string; name: string };
  config: Record<string, unknown>;
  batchSize: number;
  maxRowsPerRun: number;
  includeBodies: boolean;
  maxBodyBytes: number;
  cursorRowId: number;
  /** Set only by the explicitly invoked test seam, never by persisted destination config. */
  testModulePath?: string;
  testConfig?: Record<string, unknown>;
}
export type ExportChildReply =
  | { kind: "batch"; cursorRowId: number; count: number }
  | { kind: "done" }
  | { kind: "error"; message: string };
