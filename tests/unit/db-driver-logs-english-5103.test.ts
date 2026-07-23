/**
 * #5103 — Two startup log lines in the SQLite driver-fallback path were written in
 * pt-BR ("Pré-inicializando sql.js…", "Drivers síncronos indisponíveis…"), mixing
 * languages in the server logs. All user-facing server log strings must be English.
 *
 * Guard: scan the DB driver-fallback files for `console.*("…")` string literals that
 * contain Latin accented characters (the tell-tale of a non-English log line). This
 * fails on the pt-BR strings and stays green once they're translated, preventing
 * regressions in this path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "../..");

const DB_DRIVER_FILES = [
  "src/lib/db/core.ts",
  "src/lib/db/adapters/driverFactory.ts",
];

// Latin-1 Supplement accented letters used by pt-BR/es/etc. (á à â ã é ê í ó ô õ ú ç …).
const ACCENTED = /[À-ÿ]/;
// Match the string argument(s) of a console.{warn,error,log,info} call (single line).
const CONSOLE_CALL = /console\.(?:warn|error|log|info)\s*\(([^\n]*)\)/g;

test("#5103 DB driver-fallback log strings contain no non-English (accented) text", () => {
  const offenders: string[] = [];

  for (const rel of DB_DRIVER_FILES) {
    const abs = path.join(repoRoot, rel);
    const src = fs.readFileSync(abs, "utf8");
    const lines = src.split("\n");

    lines.forEach((line, i) => {
      let m: RegExpExecArray | null;
      CONSOLE_CALL.lastIndex = 0;
      while ((m = CONSOLE_CALL.exec(line)) !== null) {
        if (ACCENTED.test(m[1])) {
          offenders.push(`${rel}:${i + 1}  ${line.trim()}`);
        }
      }
    });
  }

  assert.deepEqual(
    offenders,
    [],
    `Non-English (accented) console log strings found in the DB driver path:\n${offenders.join("\n")}`
  );
});
