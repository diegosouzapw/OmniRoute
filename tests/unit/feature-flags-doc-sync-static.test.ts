import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");

/**
 * docs/reference/FEATURE_FLAGS.md promises that its catalog matches
 * FEATURE_FLAG_DEFINITIONS "1:1". Keep that promise checkable: every flag the
 * code defines must be a table row with the same type and default, every table
 * row must be a real flag, and the per-category / total counts must match.
 */
const doc = readFileSync(join(root, "docs/reference/FEATURE_FLAGS.md"), "utf8");
const catalog = doc.slice(doc.indexOf("## Flag Catalog"), doc.indexOf("## Toggling Flags"));

interface DocRow {
  key: string;
  type: string;
  defaultValue: string;
  restart: boolean;
  category: string;
}

function parseCatalog(): DocRow[] {
  const rows: DocRow[] = [];
  let category = "";
  for (const line of catalog.split("\n")) {
    const heading = line.match(/^### (\w+) \(\d+\)/);
    if (heading) {
      category = heading[1].toLowerCase();
      continue;
    }
    const cells = line.match(/^\| `([A-Z0-9_]+)` +\| (\w+) +\| ([^|]+?) +\|(.*)$/);
    if (!cells) continue;
    rows.push({
      key: cells[1],
      type: cells[2],
      defaultValue: cells[3].replace(/`/g, ""),
      restart: /^ *✓ *\|/.test(cells[4]),
      category,
    });
  }
  return rows;
}

const docRows = parseCatalog();
const docByKey = new Map(docRows.map((row) => [row.key, row]));

test("every defined feature flag has a catalog row in FEATURE_FLAGS.md", () => {
  const missing = FEATURE_FLAG_DEFINITIONS.filter((d) => !docByKey.has(d.key)).map((d) => d.key);
  assert.deepEqual(
    missing,
    [],
    `flags defined in featureFlagDefinitions.ts but absent from the doc: ${missing.join(", ")}`
  );
});

test("every catalog row in FEATURE_FLAGS.md is a defined feature flag", () => {
  const known = new Set(FEATURE_FLAG_DEFINITIONS.map((d) => d.key));
  const extra = docRows.filter((row) => !known.has(row.key)).map((row) => row.key);
  assert.deepEqual(
    extra,
    [],
    `doc rows that are not feature flags (env-only knobs belong in ENVIRONMENT.md): ${extra.join(", ")}`
  );
});

test("catalog rows carry the code's category, type, default and restart hint", () => {
  const mismatches: string[] = [];
  for (const def of FEATURE_FLAG_DEFINITIONS) {
    const row = docByKey.get(def.key);
    if (!row) continue;
    if (row.category !== def.category)
      mismatches.push(`${def.key}: category doc=${row.category} code=${def.category}`);
    if (row.type !== def.type) mismatches.push(`${def.key}: type doc=${row.type} code=${def.type}`);
    if (row.defaultValue !== def.defaultValue)
      mismatches.push(`${def.key}: default doc=${row.defaultValue} code=${def.defaultValue}`);
    if (row.restart !== def.requiresRestart)
      mismatches.push(`${def.key}: requiresRestart doc=${row.restart} code=${def.requiresRestart}`);
  }
  assert.deepEqual(mismatches, []);
});

test("category headings and the total match the number of defined flags", () => {
  const perCategory = new Map<string, number>();
  for (const def of FEATURE_FLAG_DEFINITIONS) {
    perCategory.set(def.category, (perCategory.get(def.category) ?? 0) + 1);
  }
  for (const [, name, count] of catalog.matchAll(/^### (\w+) \((\d+)\)/gm)) {
    assert.equal(Number(count), perCategory.get(name.toLowerCase()), `heading count for ${name}`);
  }
  const total = catalog.match(/^(\d+) flags across (\d+) categories/m);
  assert.ok(total, "expected an '<N> flags across <M> categories' summary line");
  assert.equal(Number(total[1]), FEATURE_FLAG_DEFINITIONS.length, "total flag count");
  assert.equal(Number(total[2]), perCategory.size, "category count");
});
