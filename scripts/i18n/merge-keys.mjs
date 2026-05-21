#!/usr/bin/env node
/**
 * Merge keys from scripts/i18n/_pending-keys.json into src/i18n/messages/en.json
 *
 * Format of _pending-keys.json:
 *   { "namespace": { "key": "value", ... }, ... }
 *
 * Keys are appended to the END of each namespace block. Existing keys with
 * the same name are preserved (we never overwrite).
 */
import { readFileSync, writeFileSync } from "node:fs";

const SRC = "src/i18n/messages/en.json";
const PENDING = "scripts/i18n/_pending-keys.json";

const enJson = JSON.parse(readFileSync(SRC, "utf8"));
const pending = JSON.parse(readFileSync(PENDING, "utf8"));

let added = 0;
let skipped = 0;
for (const [ns, keys] of Object.entries(pending)) {
  if (!Object.prototype.hasOwnProperty.call(enJson, ns)) {
    console.warn(`! namespace missing in en.json: ${ns} — skipping`);
    continue;
  }
  const target = enJson[ns];
  for (const [k, v] of Object.entries(keys)) {
    if (Object.prototype.hasOwnProperty.call(target, k)) {
      skipped++;
      continue;
    }
    target[k] = v;
    added++;
  }
}

writeFileSync(SRC, JSON.stringify(enJson, null, 2) + "\n");
console.log(`✓ merged ${added} new keys (${skipped} skipped — already present)`);
