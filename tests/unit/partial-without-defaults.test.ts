import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

// zod 4 applies .default() even under .partial(): an update schema built that way hands the
// creation default back for every field the client omitted, and the merge that follows
// overwrites the stored value. These tests pin the helper and scan every exported update
// schema so a new one cannot bring the problem back.

const { partialWithoutDefaults } =
  await import("../../src/shared/validation/partialWithoutDefaults.ts");

const source = z
  .object({
    name: z.string().min(1),
    enabled: z.boolean().optional().default(true),
    priority: z.number().default(0),
    note: z.string().optional(),
  })
  .strict();

test("an omitted field stays absent instead of taking its creation default", () => {
  assert.deepEqual(source.partial().parse({ name: "n" }), {
    name: "n",
    enabled: true,
    priority: 0,
  });
  assert.deepEqual(partialWithoutDefaults(source).parse({ name: "n" }), { name: "n" });
  assert.deepEqual(partialWithoutDefaults(source).parse({}), {});
});

test("a sent field is still validated and kept", () => {
  const update = partialWithoutDefaults(source);
  assert.deepEqual(update.parse({ enabled: false, priority: 3 }), { enabled: false, priority: 3 });
  assert.equal(update.safeParse({ priority: "high" }).success, false);
  assert.equal(update.safeParse({ name: "" }).success, false);
});

test("the unknown-key policy of the source object is kept", () => {
  assert.equal(partialWithoutDefaults(source).safeParse({ typo: 1 }).success, false);
  const loose = z.object({ a: z.string().default("x") });
  assert.deepEqual(partialWithoutDefaults(loose).parse({ typo: 1 }), {});
});

test("the source schema keeps its defaults for creation", () => {
  partialWithoutDefaults(source);
  assert.deepEqual(source.parse({ name: "n" }), { name: "n", enabled: true, priority: 0 });
});

function hasDefault(field: unknown): boolean {
  let current = field;
  for (let depth = 0; depth < 4; depth++) {
    if (current instanceof z.ZodDefault || current instanceof z.ZodPrefault) return true;
    if (current instanceof z.ZodOptional || current instanceof z.ZodNullable) {
      current = current.unwrap();
    } else {
      return false;
    }
  }
  return false;
}

function listTsFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return listTsFiles(full);
    return entry.name.endsWith(".ts") ? [full] : [];
  });
}

test("no exported update or patch schema re-applies a creation default", async () => {
  const roots = ["src/shared/schemas", "src/shared/validation"].map((dir) => path.resolve(dir));
  const offenders: string[] = [];
  let scanned = 0;
  for (const file of roots.flatMap(listTsFiles)) {
    const mod = (await import(file)) as Record<string, unknown>;
    for (const [name, schema] of Object.entries(mod)) {
      if (!/update|patch/i.test(name) || !(schema instanceof z.ZodObject)) continue;
      scanned++;
      for (const [key, field] of Object.entries(schema.shape)) {
        if (hasDefault(field))
          offenders.push(`${path.relative(process.cwd(), file)} ${name}.${key}`);
      }
    }
  }
  assert.ok(scanned > 20, `expected to scan the update schemas, scanned ${scanned}`);
  assert.deepEqual(offenders, []);
});
