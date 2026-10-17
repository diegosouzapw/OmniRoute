/** Server compatibility wrappers; query/mapping code is shared with the read-only child. */
import { getDbInstance } from "../db/core";
import { getCallLogById } from "./callLogs";
import * as queries from "./callLogExportQueries";
import type { LogExportSourceRow } from "../logExport/types";
export { DEFAULT_MAX_BODY_BYTES, type CallLogExportOptions } from "./callLogExportQueries";
export function getMaxCallLogRowId(): number {
  return queries.getMaxCallLogRowId(getDbInstance());
}
export function countCallLogsAfterRowId(afterRowId: number): number {
  return queries.countCallLogsAfterRowId(getDbInstance(), afterRowId);
}
export function getCallLogsForExport(afterRowId: number, limit: number): LogExportSourceRow[] {
  return queries.getCallLogsForExport(getDbInstance(), afterRowId, limit);
}
export function attachExportBodies(
  rows: LogExportSourceRow[],
  maxBodyBytes = queries.DEFAULT_MAX_BODY_BYTES
): Promise<LogExportSourceRow[]> {
  return queries.attachExportBodies(rows, maxBodyBytes, getCallLogById);
}
