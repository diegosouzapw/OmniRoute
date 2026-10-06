import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const PROJECT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

// Regression guard for the Windows-only ESM loader failure:
//
//   Error: Only URLs with a scheme in: file, data, and node are supported by
//   the default ESM loader. On Windows, absolute paths must be valid file://
//   URLs. Received protocol 'e:'
//
// `import()` resolves its specifier as a URL. A POSIX absolute path like
// /home/x/src/lib/db/combos.ts happens to also be a valid relative URL, so
// interpolating it works by accident. A Windows absolute path is
// E:\checkout\src\lib\db\combos.ts, whose leading drive letter the loader
// parses as the URL scheme `e:` and rejects. Every such call site must go
// through pathToFileURL().
//
// This broke `omniroute combo list/create/delete/switch` on Windows whenever
// the CLI fell back to direct DB access with the server offline.

const CLI_DIR = path.join(PROJECT_ROOT, "bin", "cli");

function collectMjsFiles(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectMjsFiles(full));
    else if (entry.name.endsWith(".mjs")) out.push(full);
  }
  return out;
}

test("bin/cli never passes an interpolated absolute path to dynamic import()", () => {
  // Matches import(`${ANY_ROOT_CONST}/...`) — a raw filesystem path, not a URL.
  const badImport = /\bimport\(\s*`\$\{[A-Za-z_$][\w$]*\}\//;

  const offenders: string[] = [];
  for (const file of collectMjsFiles(CLI_DIR)) {
    const source = fs.readFileSync(file, "utf8");
    source.split(/\r?\n/).forEach((line, i) => {
      if (badImport.test(line)) {
        offenders.push(`${path.relative(PROJECT_ROOT, file)}:${i + 1}: ${line.trim()}`);
      }
    });
  }

  assert.deepEqual(
    offenders,
    [],
    "dynamic import() of an interpolated absolute path fails on Windows; " +
      `wrap the path in pathToFileURL(...).href instead:\n${offenders.join("\n")}`,
  );
});

test("runtime.mjs resolves db modules to a file:// URL", async () => {
  const source = fs.readFileSync(path.join(CLI_DIR, "runtime.mjs"), "utf8");
  assert.match(source, /pathToFileURL/, "runtime.mjs must build file:// URLs for dynamic imports");

  // The real proof: the db fallback modules actually load on this platform.
  const runtime = await import(pathToFileURL(path.join(CLI_DIR, "runtime.mjs")).href);
  const ctx = await runtime.withDb(async (c: { kind: string; db: unknown }) => c);
  assert.equal(ctx.kind, "db");
  assert.ok(ctx.db);
});
