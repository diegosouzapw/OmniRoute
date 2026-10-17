import fs from "node:fs";
import path from "node:path";
import type { SqliteAdapter } from "../db/adapters/types";
import { parseStoredPayload } from "./parseStoredPayload";

/** Read-only surface shared by the dashboard and isolated export process. */
export interface CallLogReadDb {
  prepare(sql: string): Pick<ReturnType<SqliteAdapter["prepare"]>, "get" | "all">;
}
export interface CallLogDetailEntry {
  id: string;
  timestamp: string | null;
  model: string | null;
  status: number;
  detailState: string;
  artifactRelPath: string | null;
  error: unknown;
  hasPipelineDetails: boolean;
}
interface DetailFileIo {
  readFile(file: string): string | Promise<string>;
  readdir(dir: string): string[] | Promise<string[]>;
}
const asyncIo: DetailFileIo = {
  readFile: (file) => fs.promises.readFile(file, "utf8"),
  readdir: (dir) => fs.promises.readdir(dir),
};
/** Dashboard compatibility: its existing detail path still reads synchronously. */
export const dashboardDetailIo: DetailFileIo = {
  readFile: (file) => fs.readFileSync(file, "utf8"),
  readdir: (dir) => fs.readdirSync(dir),
};

function hasTable(db: CallLogReadDb, table: string): boolean {
  return Boolean(
    db.prepare("SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = ?").get(table)
  );
}
function legacyPipeline(db: CallLogReadDb, id: string): Record<string, unknown> | null {
  if (!hasTable(db, "request_detail_logs")) return null;
  const row = db
    .prepare(
      `SELECT * FROM request_detail_logs WHERE call_log_id = ? ORDER BY timestamp DESC LIMIT 1`
    )
    .get(id) as Record<string, unknown> | undefined;
  if (!row) return null;
  return {
    clientRequest: parseStoredPayload(row.client_request),
    providerRequest: parseStoredPayload(row.translated_request),
    providerResponse: parseStoredPayload(row.provider_response),
    clientResponse: parseStoredPayload(row.client_response),
  };
}
async function legacyDisk(
  entry: CallLogDetailEntry,
  baseDir: string | null,
  io: DetailFileIo
): Promise<Record<string, unknown> | null> {
  if (!baseDir || !entry.timestamp) return null;
  const date = new Date(entry.timestamp);
  if (Number.isNaN(date.getTime())) return null;
  const dateFolder = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const dir = path.join(baseDir, dateFolder);
  const time = `${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}${String(date.getSeconds()).padStart(2, "0")}`;
  const safeModel = (entry.model || "unknown").replace(/[/:]/g, "-");
  try {
    try {
      return JSON.parse(
        await io.readFile(path.join(dir, `${time}_${safeModel}_${entry.status}.json`))
      ) as Record<string, unknown>;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") return null;
    }
    const files = (await io.readdir(dir)).filter(
      (file) => file.startsWith(time) && file.endsWith(`_${entry.status}.json`)
    );
    return files.length
      ? (JSON.parse(await io.readFile(path.join(dir, files[0]))) as Record<string, unknown>)
      : null;
  } catch {
    // Missing/corrupt historical files intentionally export summary-only records.
    return null;
  }
}

/**
 * Pure detail resolution: artifact → legacy-inline → legacy-disk → none.
 * Never updates SQLite. The dashboard owns missing/corrupt bookkeeping via onArtifactState;
 * the export child deliberately supplies no callback and uses asynchronous filesystem IO.
 */
export async function resolveCallLogDetail<T extends CallLogDetailEntry>(
  db: CallLogReadDb,
  entry: T,
  baseDir: string | null,
  options: {
    io?: DetailFileIo;
    onArtifactState?: (relativePath: string, state: "missing" | "corrupt") => void;
  } = {}
) {
  const io = options.io ?? asyncIo;
  let detailState = entry.detailState;
  let artifactRelPath = entry.artifactRelPath;
  let payload: Record<string, unknown> | null = null;
  let artifactReady = false;
  let inline = false;
  let pipelinePayloads: Record<string, unknown> | null = null;
  if (artifactRelPath && baseDir) {
    try {
      payload = JSON.parse(await io.readFile(path.join(baseDir, artifactRelPath))) as Record<
        string,
        unknown
      >;
      if (payload) {
        artifactReady = true;
        detailState = "ready";
        pipelinePayloads = (payload.pipeline ?? legacyPipeline(db, entry.id)) as Record<
          string,
          unknown
        > | null;
      }
    } catch (error) {
      detailState = (error as NodeJS.ErrnoException).code === "ENOENT" ? "missing" : "corrupt";
      options.onArtifactState?.(artifactRelPath, detailState as "missing" | "corrupt");
      if (detailState === "missing") artifactRelPath = null;
    }
  }
  if (!payload && detailState === "legacy-inline" && hasTable(db, "call_logs_v1_legacy")) {
    const row = db
      .prepare("SELECT request_body, response_body, error FROM call_logs_v1_legacy WHERE id = ?")
      .get(entry.id) as Record<string, unknown> | undefined;
    if (row) {
      inline = true;
      let error: unknown = row.error;
      if (typeof error === "string") {
        if (!error.trim()) error = null;
        else {
          try {
            error = JSON.parse(error);
          } catch {
            /* Historical plain-text error. */
          }
        }
      } else error = null;
      payload = {
        requestBody: parseStoredPayload(row.request_body),
        responseBody: parseStoredPayload(row.response_body),
        error,
      };
    }
  }
  if (!payload) payload = await legacyDisk(entry, baseDir, io);
  if (!pipelinePayloads) pipelinePayloads = legacyPipeline(db, entry.id);
  return {
    ...entry,
    detailState,
    artifactRelPath,
    requestBody: payload?.requestBody ?? null,
    responseBody: payload?.responseBody ?? null,
    error: inline ? payload?.error : (payload?.error ?? entry.error),
    pipelinePayloads,
    hasPipelineDetails:
      (artifactReady ? Boolean(payload?.pipeline) : Boolean(pipelinePayloads)) ||
      entry.hasPipelineDetails,
    active: false,
  };
}
