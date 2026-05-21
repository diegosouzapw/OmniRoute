#!/usr/bin/env node
/**
 * For every missing key in _audit.json, locate its English value by
 * 1) finding the t("key") call site in the file
 * 2) grabbing the line(s) immediately around it in the HEAD version of the file
 *
 * This rebuilds a complete _pending-keys.json after subagents have already
 * rewritten .tsx files but en.json edits were lost.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const audit = JSON.parse(readFileSync("scripts/i18n/_audit.json", "utf8"));

function loadHead(file) {
  try {
    return execSync(`git show "HEAD:${file}"`, {
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
    });
  } catch {
    return null;
  }
}

const SKIP = new Set([
  "templatePayloads.vision.system",
  "templatePayloads.vision.userPrompt",
  "templatePayloads.vision.imageUrl",
  "templatePayloads.schemaCoercion.userPrompt",
  "templatePayloads.schemaCoercion.toolDescription",
  "templatePayloads.schemaCoercion.cityDescription",
]);

/** Find the line in NEW source where t("key") is used, then derive English value from HEAD */
function valueForKey(file, key) {
  const cur = readFileSync(file, "utf8").split("\n");
  const head = loadHead(file)?.split("\n") ?? [];
  // String search avoids ReDoS — key is our own audit data but better safe
  const needle1 = `t("${key}")`;
  const needle2 = `t('${key}')`;
  for (let i = 0; i < cur.length; i++) {
    const line = cur[i];
    if (!line.includes(needle1) && !line.includes(needle2)) continue;
    // The original line in HEAD should be similar around the same area
    // Find the most-recently corresponding HEAD line: scan backwards and forwards from i
    const probe = [i, i - 1, i + 1, i - 2, i + 2, i - 3, i + 3];
    for (const j of probe) {
      if (j < 0 || j >= head.length) continue;
      const line = head[j];
      // Try to extract the English literal: between > <, or attribute value
      const jsxMatch = line.match(/>([^<>{}\n]{2,})</);
      if (jsxMatch && !jsxMatch[1].includes("{") && !jsxMatch[1].includes("=>")) {
        const v = jsxMatch[1].trim();
        if (v && /[A-Za-z]/.test(v) && v !== key) return v;
      }
      const attrMatch = line.match(
        /\b(?:title|placeholder|aria-label|alt|label)\s*=\s*["']([^"']+)["']/
      );
      if (attrMatch) {
        const v = attrMatch[1].trim();
        if (v && /[A-Za-z]/.test(v) && v !== key) return v;
      }
    }
  }
  return null;
}

const inferredNamespaces = new Map();
function ensureNs(ns) {
  if (!inferredNamespaces.has(ns)) inferredNamespaces.set(ns, {});
  return inferredNamespaces.get(ns);
}

for (const entry of audit) {
  if (!entry.missingKeys.length) continue;
  const ns = entry.namespaces[0];
  if (!ns) continue; // exampleTemplates etc. — skip
  const target = ensureNs(ns);
  for (const key of entry.missingKeys) {
    if (SKIP.has(key)) continue;
    if (target[key]) continue;
    const value = valueForKey(entry.file, key);
    if (value) {
      target[key] = value;
    } else {
      // Could not infer — leave a TODO marker so we notice
      target[key] = `__TODO__${key}`;
    }
  }
}

const out = Object.fromEntries(inferredNamespaces);
writeFileSync("scripts/i18n/_pending-keys.json", JSON.stringify(out, null, 2) + "\n");

let total = 0;
let todo = 0;
for (const [ns, keys] of Object.entries(out)) {
  const cnt = Object.keys(keys).length;
  total += cnt;
  for (const v of Object.values(keys)) if (String(v).startsWith("__TODO__")) todo++;
  console.log(`${ns}: ${cnt} keys`);
}
console.log(`\nTotal: ${total} keys (${todo} need manual resolution)`);
