#!/usr/bin/env node
/**
 * ONE-OFF migration — fixes every message in src/i18n/messages/*.json that
 * fails `new IntlMessageFormat(value, locale)` (the parser next-intl uses).
 *
 * Literal-tag/literal-brace failures (381 values across 42 catalogs)
 * clustered into 7 key patterns:
 *   - literal JSON/regex examples containing `{...}` (paste hints, regex
 *     samples, service-account JSON) — parsed as ICU arguments
 *   - raw `<gateway-alias>/<model>` tags (feature flag description) —
 *     UNCLOSED_TAG, same class as #12302/#12505
 *   - a broken rich-text tag `<emdeze</em>` in nl (typo)
 *   - `{" "}` artifacts in two status labels (phi/sv)
 *
 * Every change is asserted render-identical:
 *   new IntlMessageFormat(fixed, locale).format() === original
 * EXCEPT the nl typo key, which is a deliberate correction (asserted
 * compile-only).
 *
 * Run once: node scripts/ad-hoc/fix-invalid-icu.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IntlMessageFormat } from "intl-messageformat";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(SCRIPT_DIR, "..", "..", "src", "i18n", "messages");

/** Wrap every `{...}` literal group in ICU single quotes so it renders verbatim. */
function quoteBraceGroups(value) {
  return value.replace(/\{[^}]*\}/g, "'$&'");
}

const TRANSFORMS = {
  // Literal JSON/regex examples — wrap the brace groups.
  "providers.claudeImportBulkPasteHint": quoteBraceGroups,
  "providers.geminiImportBulkPasteHint": quoteBraceGroups,
  "providers.codexImportBulkPasteHint": quoteBraceGroups,
  "providers.vertexServiceAccountPlaceholder": quoteBraceGroups,
  "usage.suiteBuilderCaseExpectedPlaceholderRegex": quoteBraceGroups,
  "oauthModal.grokAuthJsonPlaceholder": quoteBraceGroups,
  // Raw angle-bracket path — quote each tag (renders identical, compiles clean).
  featureFlagExposeFunctionalGatewayMirrorsDescription: (v) =>
    v.replace(/<gateway-alias>/g, "'<gateway-alias>'").replace(/<model>/g, "'<model>'"),
  // nl typo: `<emdeze` should be `<em>deze` (matches en `<em>this</em>`).
  "traeAuthModal.authorizeImportant": (v) => v.replace("<emdeze</em>", "<em>deze</em>"),
  // `{" "}` artifacts (phi/sv only) — quote just the fragment so it renders verbatim.
  "requestLogger.status.pinned": (v) =>
    v.includes('{" "}') ? v.replace(/\{" "\}/g, "'{\" \"}'") : v,
  "settings.modalityBridgeStatsLastUsed": (v) =>
    v.includes('{" "}') ? v.replace(/\{" "\}/g, "'{\" \"}'") : v,
};

/** True if the value already compiles under the exact parser next-intl uses. */
function compiles(value, locale) {
  try {
    new IntlMessageFormat(value, locale);
    return true;
  } catch {
    return false;
  }
}

function setKey(obj, dotted, value) {
  const parts = dotted.split(".");
  let node = obj;
  for (let i = 0; i < parts.length - 1; i++) node = node[parts[i]];
  node[parts[parts.length - 1]] = value;
}

function getKey(obj, dotted) {
  return dotted.split(".").reduce((n, p) => (n == null ? undefined : n[p]), obj);
}

const files = fs
  .readdirSync(MESSAGES_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();
let changed = 0,
  failures = 0;

for (const file of files) {
  const locale = file.slice(0, -5);
  const fullPath = path.join(MESSAGES_DIR, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  let fileChanged = false;

  for (const [key, transform] of Object.entries(TRANSFORMS)) {
    const original = getKey(data, key);
    if (typeof original !== "string") continue;
    // Idempotence + safety: only touch values that actually fail to compile.
    if (compiles(original, locale)) continue;

    const fixed = transform(original);
    if (fixed === original) continue;

    // Assert compile-OK.
    let compiled = true,
      compileErr = null;
    try {
      new IntlMessageFormat(fixed, locale);
    } catch (e) {
      compiled = false;
      compileErr = `${e.code ?? e.constructor.name}: ${String(e.message).split("\n")[0]}`;
    }
    if (!compiled) {
      failures++;
      console.error(`✗ ${file} ${key}: fix still fails compile (${compileErr})`);
      continue;
    }

    // Assert render-identical — except the nl typo key (deliberate correction).
    const expectIdentical = key !== "traeAuthModal.authorizeImportant";
    if (expectIdentical) {
      const rendered = new IntlMessageFormat(fixed, locale).format();
      if (rendered !== original) {
        failures++;
        console.error(
          `✗ ${file} ${key}: render changed!\n  original: ${JSON.stringify(original)}\n  fixed:    ${JSON.stringify(fixed)}\n  rendered: ${JSON.stringify(rendered)}`
        );
        continue;
      }
    }

    setKey(data, key, fixed);
    fileChanged = true;
    changed++;
  }

  if (fileChanged) {
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  }
}

console.log(`\nFixed ${changed} message(s); ${failures} failure(s).`);
process.exit(failures > 0 ? 1 : 0);
