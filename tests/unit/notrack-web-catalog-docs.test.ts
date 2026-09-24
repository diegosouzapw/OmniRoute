/**
 * Catalog / docs lock for notrack-web (#12534).
 *
 * Only asserts about notrack-web itself. Global provider counts are reconciled
 * once on the release train, so they are deliberately not pinned here.
 *
 * Run: node --import tsx/esm --test tests/unit/notrack-web-catalog-docs.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function readRepo(rel: string): string {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

test("notrack-web is in the live web-cookie catalog with alias ntw", () => {
  const entry = WEB_COOKIE_PROVIDERS["notrack-web"];
  assert.ok(entry, "notrack-web missing from WEB_COOKIE_PROVIDERS");
  assert.equal(entry.id, "notrack-web");
  assert.equal(entry.alias, "ntw");
  assert.equal(entry.hasFree, true);
});

test("PROVIDER_REFERENCE.md lists notrack-web", () => {
  const reference = readRepo("docs/reference/PROVIDER_REFERENCE.md");
  assert.match(reference, /`notrack-web`/, "PROVIDER_REFERENCE.md must list notrack-web");
});
