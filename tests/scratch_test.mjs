import { getDbInstance } from "../src/lib/db/core.ts";
import { runMigrations, getMigrationStatus } from "../src/lib/db/migrationRunner.ts";
const db = getDbInstance();
console.log(getMigrationStatus(db).pending);
