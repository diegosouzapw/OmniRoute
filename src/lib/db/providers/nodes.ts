/**
 * db/providers/nodes.ts — Provider nodes CRUD.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance, rowToCamel } from "../core";
import { selectProviderNodeForConnection } from "../providerNodeSelect";
import { backupDbFile } from "../backup";
import { toRecord, type JsonRecord } from "./columns";

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes?: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

export async function getProviderNodes(filter: JsonRecord = {}) {
  const db = getDbInstance() as unknown as DbLike;
  let sql = "SELECT * FROM provider_nodes";
  const params: Record<string, unknown> = {};

  if (filter.type) {
    sql += " WHERE type = @type";
    params.type = filter.type;
  }

  return db.prepare(sql).all(params).map(rowToCamel);
}

export async function getProviderNodeById(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const row = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  return row ? rowToCamel(row) : null;
}

// #4421: resolve the provider node for a new connection from either its concrete id
// (what the dashboard sends, "<type>-<uuid>") OR the bare derived type (what callers
// using the /api/providers API directly often pass, e.g. "openai-compatible-responses").
// Falls back to the sole node of that type only when unambiguous; otherwise null (so the
// caller still surfaces the existing 404).
export async function resolveProviderNodeForConnection(idOrType: string) {
  const exact = await getProviderNodeById(idOrType);
  if (exact) return exact;
  const all = (await getProviderNodes()) as JsonRecord[];
  return selectProviderNodeForConnection(idOrType, all);
}

export async function createProviderNode(data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();

  const customHeadersJson = data.customHeaders ? JSON.stringify(data.customHeaders) : null;

  const node = {
    id: data.id || uuidv4(),
    type: data.type,
    name: data.name,
    prefix: data.prefix || null,
    apiType: data.apiType || null,
    baseUrl: data.baseUrl || null,
    chatPath: data.chatPath || null,
    modelsPath: data.modelsPath || null,
    // Optional operator-supplied remote icon URL (#2166) — plain TEXT, no JSON parsing needed.
    iconUrl: data.iconUrl || null,
    customHeadersJson,
    createdAt: now,
    updatedAt: now,
  };

  db.prepare(
    `
    INSERT INTO provider_nodes (id, type, name, prefix, api_type, base_url, chat_path, models_path, icon_url, custom_headers_json, created_at, updated_at)
    VALUES (@id, @type, @name, @prefix, @apiType, @baseUrl, @chatPath, @modelsPath, @iconUrl, @customHeadersJson, @createdAt, @updatedAt)
  `
  ).run(node);

  backupDbFile("pre-write");

  const result: JsonRecord = { ...node };
  if (customHeadersJson) {
    try {
      result.customHeaders = JSON.parse(customHeadersJson);
    } catch {
      result.customHeaders = null;
    }
  } else {
    result.customHeaders = null;
  }
  delete result.customHeadersJson;
  return result;
}

export async function updateProviderNode(id: string, data: JsonRecord) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  const merged: JsonRecord = {
    ...toRecord(rowToCamel(existing)),
    ...data,
    updatedAt: new Date().toISOString(),
  };

  if (data.customHeaders !== undefined) {
    merged["customHeadersJson"] = data.customHeaders ? JSON.stringify(data.customHeaders) : null;
  } else {
    // Partial update that omits customHeaders must PRESERVE the stored value.
    // rowToCamel surfaces the column under `customHeaders` (suffix stripped),
    // never `customHeadersJson`, so read the raw stored JSON from `existing`
    // directly instead of relying on the (absent) merged key — otherwise the
    // UPDATE would bind null and silently wipe the saved headers.
    const existingJson = (existing as JsonRecord).custom_headers_json;
    merged["customHeadersJson"] = typeof existingJson === "string" ? existingJson : null;
  }

  db.prepare(
    `
    UPDATE provider_nodes SET type = @type, name = @name, prefix = @prefix,
    api_type = @apiType, base_url = @baseUrl, chat_path = @chatPath,
    models_path = @modelsPath, icon_url = @iconUrl,
    custom_headers_json = @customHeadersJson, updated_at = @updatedAt
    WHERE id = @id
  `
  ).run({
    id,
    type: merged["type"],
    name: merged["name"],
    prefix: merged["prefix"] || null,
    apiType: merged["apiType"] || null,
    baseUrl: merged["baseUrl"] || null,
    chatPath: merged["chatPath"] || null,
    modelsPath: merged["modelsPath"] || null,
    // #2166: iconUrl is nullable — explicit `null` (not omission) clears a previously
    // stored custom icon when the caller submits an empty value.
    iconUrl: merged["iconUrl"] || null,
    customHeadersJson: merged["customHeadersJson"] || null,
    updatedAt: merged["updatedAt"],
  });

  backupDbFile("pre-write");

  const result: JsonRecord = { ...merged };
  const storedJson = merged["customHeadersJson"] as string | null;
  if (storedJson) {
    try {
      result.customHeaders = JSON.parse(storedJson);
    } catch {
      result.customHeaders = null;
    }
  } else {
    result.customHeaders = null;
  }
  delete result.customHeadersJson;
  return result;
}

export async function deleteProviderNode(id: string) {
  const db = getDbInstance() as unknown as DbLike;
  const existing = db.prepare("SELECT * FROM provider_nodes WHERE id = ?").get(id);
  if (!existing) return null;

  db.prepare("DELETE FROM provider_nodes WHERE id = ?").run(id);
  backupDbFile("pre-write");
  return rowToCamel(existing);
}
