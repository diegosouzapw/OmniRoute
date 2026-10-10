import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { createTranslator } from "next-intl";
import i18nConfig from "../../config/i18n.json" with { type: "json" };

const expectedEnglish = {
  cloudUploadDestination: "Cloud sync destination (not local backups):",
  cloudUploadWarning:
    "Cloud sync is disabled by default on new installations. Enabling it uploads provider API keys, OAuth access/refresh tokens, OmniRoute API keys, and configuration to the destination above, now and during future syncs. This is separate from local Storage backups. Only enable it if you trust that server.",
  cloudUploadConsent: "I understand and authorize uploading my credentials to this destination.",
};

function readMessages(locale: string) {
  return JSON.parse(
    readFileSync(new URL(`../../src/i18n/messages/${locale}.json`, import.meta.url), "utf8")
  ) as Record<string, Record<string, string>>;
}

test("the existing endpoint title translates without errors", () => {
  const errors: string[] = [];
  const t = createTranslator({
    locale: "en",
    messages: readMessages("en"),
    namespace: "endpoint",
    onError: (error) => errors.push(error.code),
  });
  assert.equal(t("title"), "API Endpoint");
  assert.deepEqual(errors, []);
});

for (const { code: locale } of i18nConfig.locales) {
  test(`${locale}: cloud upload destination, warning and consent render without errors`, () => {
    const messages = readMessages(locale);
    const errors: string[] = [];
    const t = createTranslator({
      locale,
      messages,
      namespace: "endpoint",
      onError: (error) => errors.push(error.code),
    });
    const rendered = Object.fromEntries(Object.keys(expectedEnglish).map((key) => [key, t(key)]));
    assert.deepEqual(
      errors,
      [],
      `${locale}: next-intl must not report missing or invalid messages`
    );
    for (const [key, english] of Object.entries(expectedEnglish)) {
      assert.equal(typeof messages.endpoint[key], "string");
      assert.ok(rendered[key].trim().length > 0);
      assert.equal(rendered[key], messages.endpoint[key], `${locale}.${key}: ICU changed the text`);
      assert.notEqual(rendered[key], `endpoint.${key}`);
      assert.doesNotMatch(rendered[key], /__MISSING__/);
      if (locale === "en") assert.equal(rendered[key], english);
      else assert.notEqual(rendered[key], english, `${locale}.${key}: untranslated English`);
    }
    for (const term of ["API", "OAuth", "OmniRoute"]) {
      assert.ok(rendered.cloudUploadWarning.includes(term), `${locale}: preserve ${term}`);
    }
  });
}
