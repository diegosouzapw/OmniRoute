import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  PROXY_BULK_IMPORT_LIMIT_DEFAULT,
  PROXY_BULK_IMPORT_LIMIT_MAX,
  resolveProxyBulkImportLimit,
} from "@/shared/constants/proxyBulkImport";
import { makeBulkImportProxiesSchema, bulkImportProxiesSchema } from "@/shared/validation/schemas";

// #13917: the 100-proxy ceiling was hardcoded twice — the server Zod schema and
// the dashboard's pre-flight check — so an operator could not raise it without
// editing source, and the two could drift apart. Both now resolve one setting.

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");

function items(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    name: `p${i}`,
    host: "127.0.0.1",
    port: 8080 + (i % 1000),
  }));
}

test("resolveProxyBulkImportLimit falls back to the default for unusable values", () => {
  // Total by design: this runs on the request path, so a corrupt settings row
  // must not take bulk import offline.
  for (const bad of [undefined, null, "500", NaN, Infinity, -Infinity, 0, -1, {}, []]) {
    assert.equal(
      resolveProxyBulkImportLimit(bad),
      PROXY_BULK_IMPORT_LIMIT_DEFAULT,
      `expected default for ${JSON.stringify(bad)}`
    );
  }
});

test("a configured value in range is honoured, and a fraction is truncated", () => {
  assert.equal(resolveProxyBulkImportLimit(500), 500);
  assert.equal(resolveProxyBulkImportLimit(1), 1);
  assert.equal(resolveProxyBulkImportLimit(250.9), 250);
});

test("a value above the hard cap clamps to the cap, it does not fall back", () => {
  // An operator who asked for more than the ceiling wants the ceiling. Falling
  // back to 100 here would silently give them LESS than they have today.
  assert.equal(
    resolveProxyBulkImportLimit(PROXY_BULK_IMPORT_LIMIT_MAX + 1),
    PROXY_BULK_IMPORT_LIMIT_MAX
  );
  assert.equal(resolveProxyBulkImportLimit(1_000_000), PROXY_BULK_IMPORT_LIMIT_MAX);
});

test("the default-limit schema still rejects at 100, so fresh installs are unchanged", () => {
  assert.equal(bulkImportProxiesSchema.safeParse({ items: items(100) }).success, true);
  assert.equal(bulkImportProxiesSchema.safeParse({ items: items(101) }).success, false);
});

test("a configured limit moves the boundary on the server schema", () => {
  const schema = makeBulkImportProxiesSchema(500);
  assert.equal(schema.safeParse({ items: items(500) }).success, true);
  const over = schema.safeParse({ items: items(501) });
  assert.equal(over.success, false);
  // The message must state the configured number, not the old constant.
  assert.match(JSON.stringify(over.error?.issues ?? []), /Maximum 500 proxies per import/);
});

test("an empty import is still rejected at every limit", () => {
  for (const limit of [1, PROXY_BULK_IMPORT_LIMIT_DEFAULT, PROXY_BULK_IMPORT_LIMIT_MAX]) {
    assert.equal(makeBulkImportProxiesSchema(limit).safeParse({ items: [] }).success, false);
  }
});

test("the route resolves the setting instead of importing the fixed schema", () => {
  // The regression this guards: reverting either enforcement point to the
  // hardcoded constant leaves the other configurable, which is the drift the
  // issue reports. A grep-level assertion is enough to catch that.
  const route = fs.readFileSync(
    path.join(REPO_ROOT, "src/app/api/settings/proxies/bulk-import/route.ts"),
    "utf8"
  );
  assert.match(route, /resolveProxyBulkImportLimit/);
  assert.match(route, /makeBulkImportProxiesSchema\(limit\)/);
  assert.doesNotMatch(
    route,
    /validateBody\(\s*bulkImportProxiesSchema/,
    "route must not validate against the fixed-limit schema"
  );
});

test("the dashboard check reads the same setting and names the number", () => {
  const ui = fs.readFileSync(
    path.join(
      REPO_ROOT,
      "src/app/(dashboard)/dashboard/settings/components/ProxyRegistryManager.tsx"
    ),
    "utf8"
  );
  assert.match(ui, /bulkImportParsed\.length > bulkImportLimit/);
  assert.match(ui, /t\("bulkImportMaxExceeded",\s*\{\s*max: bulkImportLimit\s*\}\)/);
  assert.doesNotMatch(ui, /bulkImportParsed\.length > 100/, "hardcoded 100 is back");
});

test("every locale interpolates the limit rather than hardcoding 100", () => {
  // The message existed in 66 locales with a literal 100. A locale left behind
  // would tell the operator the wrong number in their own language.
  const dir = path.join(REPO_ROOT, "src/i18n/messages");
  const locales = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  assert.ok(locales.length > 50, `expected the full locale set, saw ${locales.length}`);

  const offenders: string[] = [];
  for (const file of locales) {
    const tree = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as unknown;
    const found: string[] = [];
    const walk = (node: unknown) => {
      if (node && typeof node === "object") {
        for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
          if (key === "bulkImportMaxExceeded" && typeof value === "string") found.push(value);
          else walk(value);
        }
      }
    };
    walk(tree);
    if (found.length === 0) continue; // locale simply lacks the key
    if (!found[0]!.includes("{max}")) offenders.push(file);
  }
  assert.deepEqual(offenders, [], "locales still hardcoding the limit");
});
