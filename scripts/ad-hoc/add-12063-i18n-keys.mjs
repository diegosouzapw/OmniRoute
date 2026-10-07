#!/usr/bin/env node
// One-off, scoped i18n key insertion for issue #12063 — adds exactly the two new
// contextCombos keys (activeProfileMasterSwitchOffWarning / ...Cta) as __MISSING__
// placeholders to every non-English locale, WITHOUT touching any other pre-existing
// missing-key drift (running the full `i18n:sync-ui` would also backfill unrelated
// drift across ~1000 keys, well outside this issue's scope).
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const MESSAGES_DIR = join(process.cwd(), "src/i18n/messages");
const EN = JSON.parse(readFileSync(join(MESSAGES_DIR, "en.json"), "utf8"));

const NEW_KEYS = ["activeProfileMasterSwitchOffWarning", "activeProfileMasterSwitchOffCta"];
const NAMESPACE = "contextCombos";

const enValues = Object.fromEntries(NEW_KEYS.map((k) => [k, EN[NAMESPACE][k]]));

const files = readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json") && f !== "en.json");

let changed = 0;
for (const file of files) {
  const path = join(MESSAGES_DIR, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  if (!data[NAMESPACE]) continue;
  let touched = false;
  for (const key of NEW_KEYS) {
    if (!(key in data[NAMESPACE])) {
      data[NAMESPACE][key] = `__MISSING__:${enValues[key]}`;
      touched = true;
    }
  }
  if (touched) {
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
    changed++;
  }
}

console.log(`[add-12063-i18n-keys] updated ${changed} locale file(s)`);
