import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import i18nConfig from "../../../config/i18n.json" with { type: "json" };

const MESSAGES_DIR = path.resolve("src/i18n/messages");
const KEY = "denoRelayOrgDomainHint";
const RAW_APP_NAME = /<app-name>/;
const RAW_ORG_SLUG = /<org-slug>/;
const ENTITY_APP_NAME = "&lt;app-name&gt;";
const ENTITY_ORG_SLUG = "&lt;org-slug&gt;";

/**
 * Regression guard for the UNCLOSED_TAG fix (INVALID_MESSAGE: UNCLOSED_TAG in
 * React Flight parser). The `denoRelayOrgDomainHint` translation string
 * contained literal `<app-name>` and `<org-slug>`, which the RSC Flight
 * protocol parser interpreted as unclosed HTML tags, corrupting the payload
 * and breaking the DenoRelayModal render.
 *
 * Fix: `<` and `>` were replaced with `&lt;` / `&gt;` in all 43 locale files,
 * and BOM inserted by PowerShell's Set-Content was stripped.
 *
 * This suite guards against regressions across four axes:
 *   1. Every locale file parses as valid JSON (no BOM, no syntax errors).
 *   2. The `denoRelayOrgDomainHint` key exists in all 43 locales.
 *   3. No locale still carries raw `<app-name>` or `<org-slug>` literals.
 *   4. The key uses HTML entities `&lt;app-name&gt;.&lt;org-slug&gt;` everywhere.
 */

describe("i18n — denoRelayOrgDomainHint UNCLOSED_TAG regression", () => {
  const localeFiles = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json"));
  const expectedCount = i18nConfig.locales.length;

  // --- Test 1: JSON validity (no BOM, no parse errors) ---
  it(`all ${expectedCount} locale JSON files are valid (no BOM, no parse errors)`, () => {
    assert.equal(
      localeFiles.length,
      expectedCount,
      `Expected ${expectedCount} locale files, found ${localeFiles.length}`
    );

    const invalid: string[] = [];

    for (const file of localeFiles) {
      const fullPath = path.join(MESSAGES_DIR, file);
      const raw = fs.readFileSync(fullPath, "utf8");

      // BOM (U+FEFF) must not be present — it breaks JSON parsers and
      // Next.js Turbopack module resolution.
      if (raw.charCodeAt(0) === 0xfeff) {
        invalid.push(`${file}: starts with BOM (U+FEFF)`);
        continue;
      }

      try {
        JSON.parse(raw);
      } catch (err) {
        invalid.push(`${file}: ${(err as Error).message}`);
      }
    }

    assert.deepEqual(
      invalid,
      [],
      `${invalid.length} invalid JSON file(s). First few: ${invalid.slice(0, 5).join("; ")}`
    );
  });

  // --- Test 2: key existence in all locales ---
  it(`${KEY} key exists in all ${expectedCount} locales`, () => {
    const missingKey: string[] = [];

    for (const file of localeFiles) {
      const content = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
      const flat = flatten(content);
      // The key lives in a namespace (e.g. "settings.denoRelayOrgDomainHint")
      // — match any path that ends with the target key name.
      const found = Object.keys(flat).some((k) => k.endsWith(`.${KEY}`));
      if (!found) {
        missingKey.push(file);
      }
    }

    assert.deepEqual(
      missingKey,
      [],
      `${missingKey.length} locale(s) missing key "${KEY}": ${missingKey.join(", ")}`
    );
  });

  // --- Test 3: no raw <app-name> or <org-slug> anywhere ---
  it(`no locale contains raw <app-name> or <org-slug> in any value`, () => {
    const offenders: string[] = [];

    for (const file of localeFiles) {
      const raw = fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8");
      if (RAW_APP_NAME.test(raw)) {
        offenders.push(`${file}: raw <app-name>`);
      }
      if (RAW_ORG_SLUG.test(raw)) {
        offenders.push(`${file}: raw <org-slug>`);
      }
    }

    assert.deepEqual(
      offenders,
      [],
      `${offenders.length} file(s) still carry raw angle-bracket placeholders: ${offenders.join(", ")}`
    );
  });

  // --- Test 4: correct HTML entities in every locale ---
  it(`${KEY} uses &lt;app-name&gt;.&lt;org-slug&gt; in all locales`, () => {
    const wrong: string[] = [];

    for (const file of localeFiles) {
      const content = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
      const flat = flatten(content);

      // Find the full dotted path (e.g. "settings.denoRelayOrgDomainHint")
      const fullPath = Object.keys(flat).find((k) => k.endsWith(`.${KEY}`));
      if (!fullPath) {
        wrong.push(`${file}: key "${KEY}" not found`);
        continue;
      }

      const value = flat[fullPath];

      if (typeof value !== "string") {
        wrong.push(`${file}: value is ${typeof value}, expected string`);
        continue;
      }

      if (!value.includes(ENTITY_APP_NAME)) {
        wrong.push(`${file}: missing "${ENTITY_APP_NAME}"`);
      }
      if (!value.includes(ENTITY_ORG_SLUG)) {
        wrong.push(`${file}: missing "${ENTITY_ORG_SLUG}"`);
      }
      // Double-check: the encoded value should contain the full URL pattern
      if (!value.includes(`${ENTITY_APP_NAME}.${ENTITY_ORG_SLUG}`)) {
        wrong.push(`${file}: missing "${ENTITY_APP_NAME}.${ENTITY_ORG_SLUG}" sequence`);
      }
    }

    assert.deepEqual(
      wrong,
      [],
      `${wrong.length} locale(s) with wrong value for "${KEY}": ${wrong.slice(0, 10).join(", ")}`
    );
  });
});

// --- helpers (mirror patterns from tests/unit/i18n-pt-br.test.ts) ---

/**
 * Flatten a nested JSON object into dotted-key paths.
 * E.g. { settings: { denoRelayOrgDomainHint: "..." } } →
 *      { "settings.denoRelayOrgDomainHint": "..." }
 */
function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of Object.keys(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) {
      Object.assign(out, flatten(v as Record<string, unknown>, key));
    } else {
      out[key] = v;
    }
  }
  return out;
}
