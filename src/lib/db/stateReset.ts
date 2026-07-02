/**
 * Central registry for DB module state resetters.
 * Used by restore flows to clear prepared statement caches without cross-module imports.
 */

type DbStateResetter = () => void;

const resetters = new Set<DbStateResetter>();

/**
 * Register a module-level state resetter.
 * Duplicate function references are deduplicated by Set semantics.
 */
export function registerDbStateResetter(resetter: DbStateResetter) {
  resetters.add(resetter);
}

/**
 * Invoke all registered state resetters.
 * A failing resetter must not block execution of the remaining handlers.
 */
export function resetAllDbModuleState() {
  for (const resetter of resetters) {
    try {
      resetter();
    } catch (error) {
      console.warn("[DB] Failed to reset module state:", error);
    }
  }
}
