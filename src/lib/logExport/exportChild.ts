/** One short-lived OS process per destination run. Never import the server DB singleton. */
import path from "node:path";
import { pathToFileURL } from "node:url";
import { openLogExportReadOnlyDb } from "../db/logExportReadOnly";
import { resolveDataDir } from "../dataPaths";
import {
  attachExportBodies,
  getCallLogsForExport,
  getMaxCallLogRowId,
} from "../usage/callLogExportQueries";
import { resolveCallLogDetail, type CallLogDetailEntry } from "../usage/callLogDetailResolver";
import { getLogExportDestinationType, __registerLogExportDestinationTypeForTest } from "./registry";
import { exportSecretValues, safeExportError } from "./safeExportError";
import { installExportProxyDispatcher } from "./childProxy";
import type { ExportChildReply, ExportChildStart } from "./childProtocol";

installExportProxyDispatcher();

function post(message: ExportChildReply): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!process.send) return reject(new Error("Log export IPC disconnected"));
    process.send(message, (error) => (error ? reject(error) : resolve()));
  });
}
let ack: { cursor: number; resolve: () => void } | null = null;
let started = false;
process.on("disconnect", () => process.exit(1));
process.on("message", (message: ExportChildStart | { kind: "ack"; cursorRowId: number }) => {
  if (message.kind === "ack") {
    if (ack && message.cursorRowId === ack.cursor) {
      const pending = ack;
      ack = null;
      pending.resolve();
    }
    return;
  }
  if (message.kind !== "start" || started) return;
  started = true;
  void run(message);
});

async function run(start: ExportChildStart) {
  let db: ReturnType<typeof openLogExportReadOnlyDb> | undefined;
  let secretValues: string[] = [];
  try {
    // Only parent-injected test code can register fixture destinations or stub fetch.
    // No environment variable or persisted config can enable this in a production run.
    if (start.testModulePath) {
      const fixture = await import(pathToFileURL(start.testModulePath).href);
      fixture.register?.(__registerLogExportDestinationTypeForTest);
      fixture.installBigQueryFetchFixture?.(start.testConfig ?? {});
    }
    const type = getLogExportDestinationType(start.destination.type);
    if (!type) throw new Error("Unknown log export destination type");
    secretValues = exportSecretValues(start.config, type.secretFields);
    const client = type.createClient(start.config);
    db = openLogExportReadOnlyDb();
    const readDb = db;
    // Snapshot the insertion boundary, not a long-lived SQLite read transaction:
    // live WAL writers/checkpoints remain free while destination I/O awaits.
    const throughRowId = getMaxCallLogRowId(readDb);
    const baseDir = path.join(resolveDataDir(), "call_logs");
    let cursor = start.cursorRowId;
    let exported = 0;
    let prepared = false;
    while (exported < start.maxRowsPerRun) {
      const summaries = getCallLogsForExport(
        readDb,
        cursor,
        Math.min(start.batchSize, start.maxRowsPerRun - exported),
        throughRowId
      );
      if (!summaries.length) break;
      const batch = start.includeBodies
        ? await attachExportBodies(summaries, start.maxBodyBytes, async (id) => {
            const row = readDb
              .prepare(
                "SELECT id, timestamp, model, status, detail_state, artifact_relpath, error_summary, has_pipeline_details FROM call_logs WHERE id = ?"
              )
              .get(id) as Record<string, unknown> | undefined;
            if (!row) return null;
            const entry: CallLogDetailEntry = {
              id: String(row.id),
              timestamp: row.timestamp as string | null,
              model: row.model as string | null,
              status: Number(row.status),
              detailState: String(row.detail_state ?? "none"),
              artifactRelPath: row.artifact_relpath as string | null,
              error: row.error_summary,
              hasPipelineDetails: Number(row.has_pipeline_details) === 1,
            };
            return resolveCallLogDetail(readDb, entry, baseDir);
          })
        : summaries;
      if (!prepared) {
        await client.prepare();
        prepared = true;
      }
      await client.send(batch.map((row) => row.record));
      cursor = batch[batch.length - 1].rowId;
      // Install the waiter BEFORE sending, including for an immediately responding parent.
      const acknowledged = new Promise<void>((resolve) => {
        ack = { cursor, resolve };
      });
      await post({ kind: "batch", cursorRowId: cursor, count: batch.length });
      await acknowledged;
      exported += batch.length;
      if (batch.length < start.batchSize) break;
    }
    db.close();
    db = undefined;
    await post({ kind: "done" });
    process.exit(0);
  } catch (error) {
    db?.close();
    try {
      await post({ kind: "error", message: safeExportError(error, secretValues) });
    } catch {
      /* Parent disconnected; there is no run left to notify. */
    }
    process.exit(1);
  }
}
