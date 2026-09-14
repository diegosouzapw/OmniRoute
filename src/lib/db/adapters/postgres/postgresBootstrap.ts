import { buildBootstrapSql, POSTGRES_BOOTSTRAP_VERSION } from "./bootstrapSql";
import type { PostgresSession } from "./postgresSession";

const BOOTSTRAP_LOCK_KEY = 7211005;

function readBootstrapVersion(session: PostgresSession): number {
  try {
    const rows = session.rawQuery("SELECT omniroute_bootstrap_version() AS version", [], false)
      .rows as Array<{ version: number }>;
    return rows[0]?.version ?? 0;
  } catch {
    return 0;
  }
}

export function ensureBootstrapped(session: PostgresSession): void {
  if (readBootstrapVersion(session) >= POSTGRES_BOOTSTRAP_VERSION) return;
  session.rawQuery(
    `SELECT pg_advisory_lock(${BOOTSTRAP_LOCK_KEY}, hashtext(current_schema()))`,
    [],
    false
  );
  try {
    if (readBootstrapVersion(session) >= POSTGRES_BOOTSTRAP_VERSION) return;
    session.runScript(buildBootstrapSql());
  } finally {
    session.rawQuery(
      `SELECT pg_advisory_unlock(${BOOTSTRAP_LOCK_KEY}, hashtext(current_schema()))`,
      [],
      false
    );
  }
}
