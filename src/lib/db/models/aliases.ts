/** db/models/aliases.ts — model alias CRUD (modelAliases namespace). */

import { getDbInstance } from "../core";
import { backupDbFile } from "../backup";
import { getKeyValue } from "./shared";

export async function getModelAliases() {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'modelAliases'")
    .all();
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

export async function setModelAlias(alias: string, model: unknown) {
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('modelAliases', ?, ?)"
  ).run(alias, JSON.stringify(model));
  backupDbFile("pre-write");
}

export async function deleteModelAlias(alias: string) {
  const db = getDbInstance();
  db.prepare("DELETE FROM key_value WHERE namespace = 'modelAliases' AND key = ?").run(alias);
  backupDbFile("pre-write");
}

/**
 * Cascade-delete every model-alias row that resolves to the given provider.
 *
 * Managed/imported aliases are stored as `key = <alias>`, `value = "<providerId>/<model>"`
 * (e.g. `setModelAlias("x-fast", "providerX/fast-model")`). When a custom provider is
 * removed, its connections and node are deleted but these alias rows are left behind,
 * which then block re-importing the same provider ("already exists" / no new models) — see
 * #1409. This removes every alias whose stored value begins with `<providerId>/`, so a
 * fresh import is unblocked.
 *
 * Only string values starting with the exact `"<providerId>/"` prefix match, so unrelated
 * providers and user-facing settings aliases (whose value is the bare alias, not a
 * `<providerId>/<model>` string) are left untouched.
 *
 * @returns the list of alias keys that were removed.
 */
export async function deleteModelAliasesForProvider(providerId: string): Promise<string[]> {
  const prefix = `${providerId}/`;
  const aliases = await getModelAliases();
  const removed: string[] = [];
  for (const [alias, value] of Object.entries(aliases)) {
    if (typeof value !== "string" || !value.startsWith(prefix)) continue;
    await deleteModelAlias(alias);
    removed.push(alias);
  }
  return removed;
}
