import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { processLocale, setMessagesDir } from "../../scripts/i18n/sync-ui-keys.mjs";

// #15562 moved the `localePath` declaration into loadMergedLocale(), leaving
// processLocale() to write through an undefined variable: every non-dry run of
// `sync-ui-keys --locale=<code>` died with "ReferenceError: localePath is not defined".
test("processLocale writes the merged catalog for a single locale", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "sync-ui-keys-"));
  const source = { greeting: "Hello", farewell: "Bye" };
  writeFileSync(path.join(dir, "en.json"), JSON.stringify(source));
  writeFileSync(path.join(dir, "xx.json"), JSON.stringify({ greeting: "Hallo" }));
  setMessagesDir(dir);

  const result = await processLocale("xx", source, { locales: [] }, { dryRun: false }, null);

  assert.deepEqual(result.addedPaths, ["farewell"]);
  const written = JSON.parse(readFileSync(path.join(dir, "xx.json"), "utf8"));
  assert.equal(written.greeting, "Hallo");
  assert.match(String(written.farewell), /__MISSING__/);
});

test("processLocale leaves the file untouched in dry-run mode", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "sync-ui-keys-"));
  const source = { greeting: "Hello", farewell: "Bye" };
  const original = JSON.stringify({ greeting: "Hallo" });
  writeFileSync(path.join(dir, "xx.json"), original);
  setMessagesDir(dir);

  await processLocale("xx", source, { locales: [] }, { dryRun: true }, null);

  assert.equal(readFileSync(path.join(dir, "xx.json"), "utf8"), original);
});
