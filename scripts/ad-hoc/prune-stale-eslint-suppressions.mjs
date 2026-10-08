/**
 * One-off: prune entries in config/quality/eslint-suppressions.json whose files no
 * longer exist (e.g. the removed electron/ tree and its tests). ESLint regenerates
 * counts for surviving files on the next `npm run lint`, so only absent files are
 * removed — never any live violation budget.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FILE = path.join(ROOT, "config/quality/eslint-suppressions.json");
const data = JSON.parse(fs.readFileSync(FILE, "utf8"));

const removed = [];
for (const file of Object.keys(data)) {
  if (file === "_policy" || file === "total") continue;
  if (!fs.existsSync(path.join(ROOT, file))) {
    removed.push(file);
    delete data[file];
  }
}

fs.writeFileSync(FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(`[prune-stale-suppressions] removed ${removed.length} stale file entries:`);
for (const file of removed) console.log(`  - ${file}`);
