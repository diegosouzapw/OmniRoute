/**
 * Regression guard for #12272 — translate pre-existing __MISSING__: i18n keys
 * (combo.sort, requestLogger.detail expand/collapse, common.profile,
 * settings.resilienceCredentialHealth*).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES } from "../../src/i18n/config";

const MESSAGES_DIR = fileURLToPath(new URL("../../src/i18n/messages/", import.meta.url));

const UNTRANSLATED_SENTINEL = "__MISSING__:";

/** Dotted paths named in #12272. Scope is these 20 keys only — other
 *  pre-existing sentinels (e.g. common.suspicious) are out of issue. */
const ISSUE_KEYS = [
  "common.profile",
  "requestLogger.detail.collapseAllLevels",
  "requestLogger.detail.collapseOneLevel",
  "requestLogger.detail.currentExpandLevel",
  "requestLogger.detail.expandOneLevel",
  "requestLogger.detail.expandAllLevels",
  "combo.sort.label",
  "combo.sort.method.manual",
  "combo.sort.method.provider",
  "combo.sort.method.score",
  "combo.sort.method.name",
  "combo.sort.scoreHint",
  "settings.resilienceCredentialHealthTitle",
  "settings.resilienceCredentialHealthScope",
  "settings.resilienceCredentialHealthTrigger",
  "settings.resilienceCredentialHealthEffect",
  "settings.resilienceCredentialHealthDesc",
  "settings.resilienceCredentialHealthInterval",
  "settings.resilienceCredentialHealthEveryMinutes",
  "settings.resilienceCredentialHealthHint",
] as const;

function getDotted(obj: unknown, dotted: string): unknown {
  return dotted.split(".").reduce<unknown>((cur, k) => {
    if (cur == null || typeof cur !== "object" || Array.isArray(cur)) return undefined;
    return (cur as Record<string, unknown>)[k];
  }, obj);
}

function readCatalog(filePath: string, file: string): Record<string, unknown> {
  const content = fs.readFileSync(filePath, "utf8");
  try {
    return JSON.parse(content) as Record<string, unknown>;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to parse JSON in catalog ${file} (${filePath}): ${msg}`);
  }
}

function requireString(rawVal: unknown, label: string): string {
  assert.equal(typeof rawVal, "string", `${label} must be a string, got ${typeof rawVal}`);
  return rawVal as string;
}

test("#12272 all canonical locales translate the named keys without untranslated sentinels", async (t) => {
  assert.ok(LOCALES.length > 0, "LOCALES list must not be empty");

  for (const locale of LOCALES) {
    await t.test(`locale: ${locale}`, () => {
      const file = `${locale}.json`;
      const filePath = path.join(MESSAGES_DIR, file);
      assert.ok(fs.existsSync(filePath), `Catalog file missing for canonical locale: ${file}`);

      const data = readCatalog(filePath, file);
      assert.ok(
        data && typeof data === "object" && !Array.isArray(data),
        `Catalog ${file} must be a valid object`,
      );

      for (const key of ISSUE_KEYS) {
        const rawVal = getDotted(data, key);
        assert.notEqual(rawVal, undefined, `Catalog ${file} missing ${key}`);
        const val = requireString(rawVal, `Catalog ${file} ${key}`);
        assert.ok(val.trim().length > 0, `Catalog ${file} has empty ${key}`);
        assert.ok(
          !val.trim().startsWith(UNTRANSLATED_SENTINEL),
          `Catalog ${file} has untranslated sentinel for ${key}: ${val}`,
        );
        if (key === "settings.resilienceCredentialHealthEveryMinutes") {
          assert.ok(
            val.includes("{minutes}"),
            `Catalog ${file} ${key} must contain '{minutes}': ${val}`,
          );
        }
      }
    });
  }
});
