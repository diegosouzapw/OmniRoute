import { getDbInstance } from "./core";

type DbInstance = ReturnType<typeof getDbInstance>;

const ENCRYPTED_COLUMNS = ["api_key", "access_token", "refresh_token", "id_token"] as const;

const ENCRYPTED_PATTERN = "enc:v1:%";

function buildWhereClause(): string {
  return ENCRYPTED_COLUMNS.map((col) => `${col} LIKE '${ENCRYPTED_PATTERN}'`).join(" OR ");
}

export function countEncryptedCredentials(db: DbInstance = getDbInstance()): number {
  const where = buildWhereClause();
  const row = db
    .prepare(`SELECT COUNT(*) AS cnt FROM provider_connections WHERE ${where}`)
    .get() as { cnt: number } | undefined;
  return row?.cnt ?? 0;
}

export function resetEncryptedColumns(
  { dryRun }: { dryRun: boolean },
  db: DbInstance = getDbInstance()
): { affected: number } {
  const affected = countEncryptedCredentials(db);
  if (dryRun || affected === 0) return { affected };

  const nullCols = ENCRYPTED_COLUMNS.map((col) => `${col} = NULL`).join(", ");
  const where = buildWhereClause();
  db.prepare(`UPDATE provider_connections SET ${nullCols} WHERE ${where}`).run();

  return { affected };
}
