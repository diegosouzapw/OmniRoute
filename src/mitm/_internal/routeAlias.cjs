"use strict";

/**
 * Resolve a normalized alias override from one storage namespace.
 * SQLite is authoritative when present; db.json remains the legacy fallback.
 */
function getStoredOverride(namespace, model, deps) {
  const fs = deps.fs;
  const dbFile = deps.dbFile;
  const getSqliteDb = deps.getSqliteDb;
  const aliasConfigShim = deps.aliasConfigShim;

  try {
    const db = getSqliteDb();
    if (db) {
      const row = db
        .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = 'antigravity'")
        .get(namespace);
      if (row) {
        const mappings = aliasConfigShim.normalizeAliasMappings(JSON.parse(row.value));
        return mappings[model] || null;
      }
    }
  } catch {
    // Fall through to JSON fallback.
  }

  try {
    if (fs.existsSync(dbFile)) {
      const db = JSON.parse(fs.readFileSync(dbFile, "utf-8"));
      const mappings = aliasConfigShim.normalizeAliasMappings(db[namespace]?.antigravity);
      return mappings[model] || null;
    }
  } catch {
    // Ignore malformed legacy storage.
  }

  return null;
}

/**
 * Resolve the stored alias override for a source model: `{ model?, reasoningEffort? }`.
 * `mitmRouteAlias` is the client-facing namespace; `mitmAlias` remains the executor
 * compatibility fallback until a route-alias writer is available.
 */
function resolveMappedOverride(model, deps) {
  if (!model) return null;

  return (
    getStoredOverride("mitmRouteAlias", model, deps) || getStoredOverride("mitmAlias", model, deps)
  );
}

module.exports = {
  getStoredOverride,
  resolveMappedOverride,
};
