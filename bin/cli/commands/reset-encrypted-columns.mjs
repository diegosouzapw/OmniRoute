import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { existsSync } from "node:fs";
import { resolveDataDir } from "../data-dir.mjs";
import { join } from "node:path";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

export async function runResetEncryptedColumns(argv) {
  const dataDir = resolveDataDir();
  const dbPath = join(dataDir, "storage.sqlite");

  if (!existsSync(dbPath)) {
    console.log(`\x1b[33m⚠ No database found at ${dbPath}\x1b[0m`);
    return 0;
  }

  const force = Array.isArray(argv) ? argv.includes("--force") : argv?.force === true;

  if (!force) {
    console.log(`
  \x1b[1m\x1b[33m⚠ WARNING: This will erase all encrypted credentials\x1b[0m

  This command will NULL out the following columns in provider_connections:
    • api_key
    • access_token
    • refresh_token
    • id_token

  Provider metadata (name, provider_id, settings) will be preserved.
  You will need to re-authenticate all providers after this operation.

  Database: ${dbPath}

  \x1b[1mTo confirm, run:\x1b[0m
    omniroute reset-encrypted-columns --force
    `);
    return 0;
  }

  try {
    const { countEncryptedCredentials, resetEncryptedColumns } = await import(
      `${PROJECT_ROOT}/src/lib/db/recovery.ts`
    );

    const count = countEncryptedCredentials();

    if (count === 0) {
      console.log("\x1b[32m✔ No encrypted credentials found — nothing to reset.\x1b[0m");
      return 0;
    }

    const { affected } = resetEncryptedColumns({ dryRun: false });

    console.log(
      `\x1b[32m✔ Reset ${affected} provider connection(s).\x1b[0m\n` +
        `  Re-authenticate your providers in the dashboard or re-add API keys.\n`
    );
    return 0;
  } catch (err) {
    console.error(
      `\x1b[31m✖ Failed to reset encrypted columns:\x1b[0m ${err instanceof Error ? err.message : String(err)}`
    );
    return 1;
  }
}
