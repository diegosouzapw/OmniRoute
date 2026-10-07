import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { resolveCatalog } from "../../scripts/i18n/sync-ui-keys.mjs";

test("resolveCatalog: ui is the default and points at the dashboard messages", () => {
  const ui = resolveCatalog("ui");
  assert.equal(ui.name, "ui");
  assert.ok(ui.dir.endsWith(path.join("src", "i18n", "messages")));
  assert.ok(ui.allowlistPath.endsWith("untranslatable-keys.json"));
});

test("resolveCatalog: cli points at the CLI locales and its own allowlist", () => {
  const cli = resolveCatalog("cli");
  assert.equal(cli.name, "cli");
  assert.ok(cli.dir.endsWith(path.join("bin", "cli", "locales")));
  assert.ok(cli.allowlistPath.endsWith("untranslatable-cli-keys.json"));
});

test("resolveCatalog: anything else is rejected loudly", () => {
  assert.throws(() => resolveCatalog("docs"), /unknown catalog/);
});
