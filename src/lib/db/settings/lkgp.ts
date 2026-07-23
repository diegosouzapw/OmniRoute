/**
 * db/settings/lkgp.ts — Last Known Good Provider (LKGP) persistence.
 */

import { getDbInstance } from "../core";

export interface LKGPRecord {
  provider: string;
  connectionId?: string;
}

export async function getLKGP(comboName: string, modelId: string): Promise<LKGPRecord | null> {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'lkgp' AND key = ?")
    .get(key) as { value?: string } | undefined;
  if (!row?.value) return null;
  try {
    const parsed = JSON.parse(row.value);
    if (typeof parsed === "object" && parsed !== null && "provider" in parsed) {
      return parsed as LKGPRecord;
    }
    return { provider: String(parsed) };
  } catch {
    return { provider: row.value };
  }
}

export async function setLKGP(
  comboName: string,
  modelId: string,
  providerId: string,
  connectionId?: string
) {
  const db = getDbInstance();
  const key = `${comboName}:${modelId}`;
  const value: LKGPRecord = { provider: providerId };
  if (connectionId) value.connectionId = connectionId;
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('lkgp', ?, ?)").run(
    key,
    JSON.stringify(value)
  );
}

export function clearAllLKGP(): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'lkgp'").run();
}
