import { workerData } from "node:worker_threads";
import { createRequire } from "node:module";
import { createHash } from "node:crypto";

const { port, signal, pgModulePath, connection } = workerData;
const flag = new Int32Array(signal);
const require = createRequire(import.meta.url);
const pg = require(pgModulePath || "pg");
const { Client, types } = pg;

types.setTypeParser(20, (value) => {
  const asNumber = Number(value);
  return Number.isSafeInteger(asNumber) ? asNumber : value;
});
types.setTypeParser(1700, (value) => Number(value));
types.setTypeParser(1114, (value) => value);
types.setTypeParser(1184, (value) => value);
types.setTypeParser(1082, (value) => value);

let client = null;
let closed = false;
let schemaResetPending = connection.resetSchema === true;

function normalizeValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "bigint") return Number(value);
  if (Array.isArray(value)) return JSON.stringify(value);
  if (value instanceof Date) return value.toISOString();
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) return value;
  if (typeof value === "object") return JSON.stringify(value);
  return value;
}

function normalizeRow(row) {
  const out = {};
  for (const key of Object.keys(row)) out[key] = normalizeValue(row[key]);
  return out;
}

function normalizeParam(value) {
  if (value === undefined) return null;
  if (typeof value === "boolean") return value ? 1 : 0;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array && !Buffer.isBuffer(value)) return Buffer.from(value);
  if (value !== null && typeof value === "object" && !Buffer.isBuffer(value))
    return JSON.stringify(value);
  return value;
}

function serializeError(error) {
  const nested = Array.isArray(error?.errors)
    ? error.errors.map((e) => e?.message ?? String(e)).filter(Boolean)
    : [];
  const message = error?.message || nested.join("; ") || String(error);
  return {
    message,
    code: error?.code ?? (Array.isArray(error?.errors) ? error.errors[0]?.code : null) ?? null,
    detail: error?.detail ?? null,
    table: error?.table ?? null,
    column: error?.column ?? null,
    constraint: error?.constraint ?? null,
    routine: error?.routine ?? null,
    position: error?.position ?? null,
    where: error?.where ?? null,
  };
}

function isConnectionError(error) {
  const code = error?.code;
  if (!code) return false;
  return (
    code === "ECONNRESET" ||
    code === "ECONNREFUSED" ||
    code === "EPIPE" ||
    code === "ETIMEDOUT" ||
    code === "57P01" ||
    code === "57P02" ||
    code === "57P03" ||
    code.startsWith("08")
  );
}

async function connect() {
  if (client) {
    try {
      await client.end();
    } catch {}
    client = null;
  }
  const next = new Client({
    connectionString: connection.url,
    ssl: connection.ssl,
    application_name: connection.applicationName,
    statement_timeout: connection.statementTimeoutMs,
    connectionTimeoutMillis: connection.connectTimeoutMs,
  });
  next.on("error", () => {
    if (client === next) client = null;
  });
  await next.connect();
  await next.query("SET TimeZone TO 'UTC'");
  if (connection.schema) {
    if (schemaResetPending) {
      schemaResetPending = false;
      await next.query(`DROP SCHEMA IF EXISTS "${connection.schema.replace(/"/g, '""')}" CASCADE`);
    }
    await next.query(`CREATE SCHEMA IF NOT EXISTS "${connection.schema.replace(/"/g, '""')}"`);
    await next.query(`SET search_path TO "${connection.schema.replace(/"/g, '""')}"`);
  }
  client = next;
  return next;
}

async function ensureClient() {
  if (client) return client;
  return connect();
}

const statementNames = new Map();

function statementName(sql) {
  let name = statementNames.get(sql);
  if (!name) {
    name = "omni_" + createHash("sha1").update(sql).digest("hex").slice(0, 16);
    if (statementNames.size >= 2000) statementNames.clear();
    statementNames.set(sql, name);
  }
  return name;
}

async function runQuery(sql, params) {
  const active = await ensureClient();
  const values = params ? params.map(normalizeParam) : undefined;
  const result =
    values && values.length
      ? await active.query({ name: statementName(sql), text: sql, values })
      : await active.query(sql);
  const last = Array.isArray(result) ? result[result.length - 1] : result;
  return {
    rows: (last?.rows ?? []).map(normalizeRow),
    rowCount: last?.rowCount ?? 0,
    command: last?.command ?? null,
  };
}

async function runWithStatementSavepoint(sql, params, savepoint) {
  const active = await ensureClient();
  if (!savepoint) return runQuery(sql, params);
  await active.query("SAVEPOINT omniroute_stmt");
  try {
    const result = await runQuery(sql, params);
    await active.query("RELEASE SAVEPOINT omniroute_stmt");
    return result;
  } catch (error) {
    try {
      await active.query("ROLLBACK TO SAVEPOINT omniroute_stmt");
      await active.query("RELEASE SAVEPOINT omniroute_stmt");
    } catch {}
    throw error;
  }
}

async function handle(request) {
  switch (request.op) {
    case "connect":
      await connect();
      return { ok: true };
    case "query": {
      try {
        return await runWithStatementSavepoint(request.sql, request.params, request.savepoint);
      } catch (error) {
        if (isConnectionError(error) && !request.inTransaction) {
          await connect();
          return runWithStatementSavepoint(request.sql, request.params, request.savepoint);
        }
        if (isConnectionError(error)) client = null;
        throw error;
      }
    }
    case "script": {
      const active = await ensureClient();
      await active.query(request.sql);
      return { ok: true };
    }
    case "close":
      closed = true;
      if (client) {
        try {
          await client.end();
        } catch {}
        client = null;
      }
      return { ok: true };
    default:
      throw new Error(`[postgres-worker] unknown op ${request.op}`);
  }
}

port.on("message", async (request) => {
  let response;
  try {
    const result = await handle(request);
    response = { ok: true, result };
  } catch (error) {
    response = { ok: false, error: serializeError(error) };
  }
  try {
    port.postMessage(response);
  } finally {
    Atomics.store(flag, 0, 1);
    Atomics.notify(flag, 0);
  }
  if (closed) port.close();
});
