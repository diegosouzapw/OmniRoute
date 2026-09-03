import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createTranslator } from "next-intl";

/**
 * Regression guard for next-intl INVALID_MESSAGE: UNCLOSED_TAG on CC
 * discovery-alias copy (`claude/<provider>/<model>`).
 *
 * #8747 escaped these angle brackets to HTML entities. A later bulk
 * entity-unescape reintroduced raw tags; next-intl treats them as rich-text
 * tags and logs UNCLOSED_TAG on provider detail pages.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "..", "..", "..", "src", "i18n", "messages");
const RAW_PATTERN = "claude/<provider>/<model>";
const RAW_ALIAS_PATTERN = /claude\/<[^>\n]+>\/<[^>\n]+>/;
const ESCAPED_PATTERN = "claude/&lt;provider&gt;/&lt;model&gt;";

function localeFiles(): string[] {
  return readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

function readLocale(file: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path.join(MESSAGES_DIR, file), "utf8")) as Record<string, unknown>;
}

test("no locale message file contains raw claude/<provider>/<model> in any language", () => {
  const offenders: string[] = [];
  for (const file of localeFiles()) {
    const text = readFileSync(path.join(MESSAGES_DIR, file), "utf8");
    if (RAW_ALIAS_PATTERN.test(text)) {
      offenders.push(file);
    }
  }
  assert.equal(
    offenders.length,
    0,
    `Raw angle-bracket path must be HTML-entity escaped (#8747 regression):\n${offenders.join("\n")}`
  );
});

test("en.json CC discovery-alias keys use HTML-entity escaped path", () => {
  const en = readLocale("en.json");
  const providers = (en.providers ?? {}) as Record<string, unknown>;
  const cliTools = (en.cliTools ?? {}) as Record<string, unknown>;
  const keys: Array<{ label: string; value: unknown }> = [
    {
      label: "featureFlagExposeCcDiscoveryAliasesDescription",
      value: en.featureFlagExposeCcDiscoveryAliasesDescription,
    },
    { label: "cliTools.ccDiscoveryInfoTooltip", value: cliTools.ccDiscoveryInfoTooltip },
    { label: "providers.ccAliasSectionHint", value: providers.ccAliasSectionHint },
  ];

  for (const { label, value } of keys) {
    assert.equal(typeof value, "string", `${label} must be a string`);
    assert.ok(
      (value as string).includes(ESCAPED_PATTERN),
      `${label} must contain ${ESCAPED_PATTERN}`
    );
    assert.equal(
      (value as string).includes(RAW_PATTERN),
      false,
      `${label} must not contain raw ${RAW_PATTERN}`
    );
  }
});

test("createTranslator accepts CC discovery-alias keys in every locale", () => {
  const errors: Array<{
    locale: string;
    code?: string;
    originalMessage?: string;
    message?: string;
  }> = [];

  for (const file of localeFiles()) {
    const locale = file.replace(/\.json$/, "");
    const messages = readLocale(file);
    const onError = (err: unknown) => {
      errors.push({
        locale,
        ...(err as { code?: string; originalMessage?: string; message?: string }),
      });
    };

    const tProviders = createTranslator({
      locale,
      messages,
      namespace: "providers",
      onError,
    });
    const tCliTools = createTranslator({
      locale,
      messages,
      namespace: "cliTools",
      onError,
    });
    const tRoot = createTranslator({ locale, messages, onError });

    assert.ok(tProviders("ccAliasSectionHint").length > 0);
    assert.ok(tCliTools("ccDiscoveryInfoTooltip").length > 0);
    assert.ok(tRoot("featureFlagExposeCcDiscoveryAliasesDescription").length > 0);
  }

  const bad = errors.filter(
    (e) =>
      e.code === "INVALID_MESSAGE" ||
      String(e.originalMessage ?? e.message ?? "").includes("UNCLOSED_TAG")
  );
  assert.equal(
    bad.length,
    0,
    `next-intl INVALID_MESSAGE/UNCLOSED_TAG on CC alias keys:\n${bad
      .map((e) => `${e.locale}: ${e.code}: ${e.originalMessage ?? e.message}`)
      .join("\n")}`
  );
});
