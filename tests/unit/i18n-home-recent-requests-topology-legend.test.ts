import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const MESSAGES_DIR = path.join(repoRoot, "src", "i18n", "messages");
const PLACEHOLDER_PREFIX = "__MISSING__:";

function readMessages(locale: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path.join(MESSAGES_DIR, `${locale}.json`), "utf8")) as Record<
    string,
    unknown
  >;
}

function getMessage(messages: Record<string, unknown>, dottedKey: string): unknown {
  return dottedKey.split(".").reduce<unknown>((value, segment) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
    return (value as Record<string, unknown>)[segment];
  }, messages);
}

const allLocales = readdirSync(MESSAGES_DIR)
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.slice(0, -".json".length));

// The home "Recent Requests" panel (#10900) shipped its five catalog keys as verbatim English
// copies in 39 of 41 non-English locales, so the widget rendered in English on every
// translated dashboard (title, "Model", "In / Out", "When", empty state). The topology legend
// borrowed `settings.recent` (the memory-retrieval window label, also an English copy) and
// `analytics.modelStatusError`, which mixed languages and casing ("Activo · Recent · error").
const RECENT_REQUESTS_KEYS = [
  "home.recentRequests",
  "home.recentRequestsEmpty",
  "home.recentRequestsModel",
  "home.recentRequestsTokens",
  "home.recentRequestsWhen",
];
const TOPOLOGY_LEGEND_KEYS = [
  "home.topologyLegendActive",
  "home.topologyLegendRecent",
  "home.topologyLegendError",
];
const HOME_WIDGET_KEYS = [...RECENT_REQUESTS_KEYS, ...TOPOLOGY_LEGEND_KEYS];

// Locales that must carry a real translation, never an English copy nor a placeholder.
const TRANSLATED_LOCALES = ["es", "pt", "pt-BR", "fr", "de", "it", "vi"];
// Genuine cognates: the correct translation happens to spell exactly like the English value.
const COGNATES = new Set([
  "es.home.topologyLegendError",
  // "Model" is the correct Croatian and Slovenian word; there is nothing to translate.
  "hr.home.recentRequestsModel",
  "sl.home.recentRequestsModel",
]);

test("home widget keys exist as non-empty strings in every locale catalog", () => {
  assert.ok(allLocales.length >= 42, `expected the 42 locale catalogs, found ${allLocales.length}`);
  for (const locale of allLocales) {
    const messages = readMessages(locale);
    for (const key of HOME_WIDGET_KEYS) {
      const value = getMessage(messages, key);
      assert.equal(typeof value, "string", `${locale}.${key} must exist`);
      assert.notEqual((value as string).trim(), "", `${locale}.${key} must not be empty`);
    }
  }
});

test("home widget keys are translated (not English copies) in the maintained locales", () => {
  const en = readMessages("en");
  for (const locale of TRANSLATED_LOCALES) {
    const messages = readMessages(locale);
    for (const key of HOME_WIDGET_KEYS) {
      const value = getMessage(messages, key) as string;
      const english = getMessage(en, key) as string;
      assert.ok(
        !value.startsWith(PLACEHOLDER_PREFIX),
        `${locale}.${key} must not be a ${PLACEHOLDER_PREFIX} placeholder`
      );
      if (COGNATES.has(`${locale}.${key}`)) continue;
      assert.notEqual(value, english, `${locale}.${key} must not be the verbatim English value`);
    }
  }
});

test("no locale keeps a silent English copy of the Recent Requests keys", () => {
  // A verbatim copy of the English value is invisible to every i18n gate (it counts as
  // "covered"); either translate it or mark it __MISSING__ so the pipeline can see it.
  const en = readMessages("en");
  for (const locale of allLocales) {
    if (locale === "en") continue;
    const messages = readMessages(locale);
    for (const key of RECENT_REQUESTS_KEYS) {
      const value = getMessage(messages, key) as string;
      const english = getMessage(en, key) as string;
      assert.ok(
        value !== english ||
          value.startsWith(PLACEHOLDER_PREFIX) ||
          COGNATES.has(`${locale}.${key}`),
        `${locale}.${key} is a verbatim English copy ("${english}")`
      );
    }
  }
});

test("topology legend reads its labels from the home namespace, not memory settings", () => {
  const source = readFileSync(
    path.join(repoRoot, "src/app/(dashboard)/dashboard/HomeProviderTopologySection.tsx"),
    "utf8"
  );
  assert.doesNotMatch(source, /tSettings\("recent"\)/, "legend must not borrow settings.recent");
  assert.doesNotMatch(
    source,
    /tAnalytics\("modelStatusError"\)/,
    "legend must not borrow analytics.modelStatusError"
  );
  for (const key of ["topologyLegendActive", "topologyLegendRecent", "topologyLegendError"]) {
    assert.match(source, new RegExp(`t\\("${key}"\\)`), `legend must use home.${key}`);
  }
});

test("topology legend casing matches across languages in the maintained locales", () => {
  // The legend is a row of three labels; they must share capitalisation within a locale.
  for (const locale of ["en", ...TRANSLATED_LOCALES]) {
    const messages = readMessages(locale);
    const labels = TOPOLOGY_LEGEND_KEYS.map((key) => getMessage(messages, key) as string);
    const upperInitial = labels.map((label) => /^\p{Lu}/u.test(label));
    assert.ok(
      upperInitial.every((flag) => flag === upperInitial[0]),
      `${locale} legend mixes capitalisation: ${JSON.stringify(labels)}`
    );
  }
});
