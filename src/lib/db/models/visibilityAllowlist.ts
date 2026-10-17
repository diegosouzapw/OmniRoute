/**
 * #16977 — opt-in provider-level chat model allowlist.
 *
 * Stored independently from per-model compat/custom rows, so unknown or
 * newly re-synced model IDs remain excluded until the operator admits them.
 * The raw provider-relative model IDs are never rewritten or aliased.
 * Missing row => legacy denylist behavior; an empty array => hide all.
 */
import { getDbInstance } from "../core";
import { getKeyValue } from "./shared";
import { finishModelCatalogWriteWithBackup } from "./modelCatalogWriteSignals";

const NAMESPACE = "chatModelVisibilityAllowlist";

function decode(value: string | null): ReadonlySet<string> | null {
  if (value === null) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) return null;
    return new Set(parsed as string[]);
  } catch {
    return null;
  }
}

export function getModelVisibilityAllowlist(providerId: string): ReadonlySet<string> | null {
  const row = getDbInstance()
    .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
    .get(NAMESPACE, providerId);
  if (!row) return null; // absence alone disables the opt-in policy
  return decode(getKeyValue(row).value) ?? new Set(); // corrupt row must fail closed
}

export function getModelVisibilityAllowlists(): Map<string, ReadonlySet<string>> {
  const rows = getDbInstance()
    .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
    .all(NAMESPACE);
  const all = new Map<string, ReadonlySet<string>>();
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key) continue;
    const decoded = decode(value);
    all.set(key, decoded ?? new Set()); // invalid stored policy never widens visibility
  }
  return all;
}

export function setModelVisibilityAllowlist(
  providerId: string,
  rawModelIds: readonly string[] | null
): void {
  const db = getDbInstance();
  if (rawModelIds === null) {
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      NAMESPACE, providerId
    );
  } else {
    const uniqueIds = [...new Set(rawModelIds)];
    db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
      NAMESPACE, providerId, JSON.stringify(uniqueIds)
    );
  }
  finishModelCatalogWriteWithBackup();
}
