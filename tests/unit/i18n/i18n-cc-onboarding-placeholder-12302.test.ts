import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

// #12302: ccOnboardingKeyPlaceholder used raw angle brackets (<your OmniRoute
// API key>) in all 43 locale files. next-intl's IntlMessageFormat parser treated
// these as rich-text tags and threw INVALID_MESSAGE: INVALID_TAG, crashing the
// Claude Code onboarding block. The fix wraps values in ICU single quotes so
// angle brackets render literally.

const messagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../src/i18n/messages"
);

function findNested(obj: unknown, key: string): string | undefined {
  if (obj === null || typeof obj !== "object") return undefined;
  for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
    if (k === key && typeof v === "string") return v;
    if (v !== null && typeof v === "object") {
      const found = findNested(v, key);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

const localeFiles = readdirSync(messagesDir)
  .filter((f) => f.endsWith(".json"))
  .sort();

test("ccOnboardingKeyPlaceholder exists in all locale files", () => {
  for (const file of localeFiles) {
    const messages = JSON.parse(readFileSync(path.join(messagesDir, file), "utf8"));
    const value = findNested(messages, "ccOnboardingKeyPlaceholder");
    assert.ok(value, `ccOnboardingKeyPlaceholder must exist in ${file}`);
  }
});

test("ccOnboardingKeyPlaceholder compiles without INVALID_TAG in all locales (#12302)", async () => {
  const { IntlMessageFormat } = await import("intl-messageformat");

  for (const file of localeFiles) {
    const messages = JSON.parse(readFileSync(path.join(messagesDir, file), "utf8"));
    const value = findNested(messages, "ccOnboardingKeyPlaceholder");
    assert.ok(value, `ccOnboardingKeyPlaceholder must exist in ${file}`);

    const locale = file.replace(".json", "");
    let threw = false;
    try {
      const fmt = new IntlMessageFormat(value, locale);
      fmt.format();
    } catch (err) {
      threw = true;
      assert.fail(`ccOnboardingKeyPlaceholder in ${file} threw during compilation: ${err}`);
    }
    assert.ok(!threw, `ccOnboardingKeyPlaceholder in ${file} must not throw`);
  }
});

test("ccOnboardingKeyPlaceholder renders literal angle brackets in all locales", async () => {
  const { IntlMessageFormat } = await import("intl-messageformat");

  for (const file of localeFiles) {
    const messages = JSON.parse(readFileSync(path.join(messagesDir, file), "utf8"));
    const value = findNested(messages, "ccOnboardingKeyPlaceholder");
    assert.ok(value, `ccOnboardingKeyPlaceholder must exist in ${file}`);

    const locale = file.replace(".json", "");
    const fmt = new IntlMessageFormat(value, locale);
    const result = String(fmt.format());

    assert.ok(
      result.includes("<"),
      `ccOnboardingKeyPlaceholder in ${file} must render literal '<', got: ${result}`
    );
    assert.ok(
      result.includes(">"),
      `ccOnboardingKeyPlaceholder in ${file} must render literal '>', got: ${result}`
    );
    // Must NOT be treated as a tag — the output should NOT contain "INVALID_TAG"
    // or empty output (which happens when tags are stripped).
    assert.ok(
      result.length > 0,
      `ccOnboardingKeyPlaceholder in ${file} must not render empty string`
    );
  }
});
