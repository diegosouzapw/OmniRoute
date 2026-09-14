import fs from "node:fs";
import path from "node:path";

const WORKER_PATH_ENV = "OMNIROUTE_PG_WORKER_PATH";
const RELATIVE_CANDIDATES = [
  ["postgres", "postgresWorker.mjs"],
  ["src", "lib", "db", "adapters", "postgres", "postgresWorker.mjs"],
  ["db-runtime", "postgres", "postgresWorker.mjs"],
  ["app", "src", "lib", "db", "adapters", "postgres", "postgresWorker.mjs"],
];

function searchRoots(preferredRoots: string[]): string[] {
  const roots = [...preferredRoots, process.cwd()];
  const migrationsDir = process.env.OMNIROUTE_MIGRATIONS_DIR;
  if (migrationsDir) roots.push(path.dirname(path.resolve(migrationsDir)));
  return roots;
}

function findInAncestors(root: string): string | null {
  let current = root;
  while (true) {
    for (const candidate of RELATIVE_CANDIDATES) {
      const full = path.join(current, ...candidate);
      if (fs.existsSync(full)) return full;
    }
    const parent = path.dirname(current);
    if (parent === current) return null;
    current = parent;
  }
}

export function locateWorker(preferredRoots: string[]): string {
  const configured = process.env[WORKER_PATH_ENV];
  if (configured && fs.existsSync(configured)) return path.resolve(configured);
  for (const root of searchRoots(preferredRoots)) {
    const found = findInAncestors(root);
    if (found) return found;
  }
  throw new Error(
    `[DB] Cannot locate postgresWorker.mjs. Set ${WORKER_PATH_ENV} to the file shipped under src/lib/db/adapters/postgres/.`
  );
}
