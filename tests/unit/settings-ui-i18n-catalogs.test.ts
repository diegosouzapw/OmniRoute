import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { IntlMessageFormat } from "intl-messageformat";
import { parse, type MessageFormatElement } from "@formatjs/icu-messageformat-parser";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (name: string) => JSON.parse(readFileSync(path.join(root, name), "utf8"));
const source = read("src/i18n/messages/en.json").settings as Record<string, string>;
const files = ["CacheSettingsTab.tsx", "AccessTokensTab.tsx", "FactoryAutoPingTab.tsx"];
const required = new Set(
  files.flatMap((file) => {
    const text = readFileSync(
      path.join(root, "src/app/(dashboard)/dashboard/settings/components", file),
      "utf8"
    );
    return [...text.matchAll(/\bt\("([^"]+)"/g)].map((match) => match[1]);
  })
);
const locales = read("config/i18n.json").locales as { code: string }[];

function argumentsOf(elements: MessageFormatElement[]): string[] {
  const names = new Set<string>();
  function visit(nodes: MessageFormatElement[]) {
    for (const node of nodes) {
      if (node.type !== 0 && node.type !== 7) names.add(node.value);
      if ("options" in node) {
        assert.ok(node.options.other, "ICU selections must contain other");
        for (const option of Object.values(node.options)) visit(option.value);
      }
      if ("children" in node) visit(node.children);
    }
  }
  visit(elements);
  return [...names].sort();
}

test("cache and access-token UI keys compile in every supported locale with source arguments", () => {
  assert.ok(required.size > 95, "all settings components must be included");
  for (const { code } of locales) {
    const settings = read(`src/i18n/messages/${code}.json`).settings;
    for (const key of required) {
      const english = source[key];
      const value = settings[key];
      assert.equal(typeof english, "string", `English source missing settings.${key}`);
      assert.equal(typeof value, "string", `${code}: missing settings.${key}`);
      assert.ok(
        value.trim() && !value.startsWith("__MISSING__"),
        `${code}.${key}: untranslated marker`
      );
      const args = argumentsOf(parse(english));
      assert.deepEqual(argumentsOf(parse(value)), args, `${code}.${key}: changed ICU arguments`);
      const samples = Object.fromEntries(
        args.map((name) => [
          name,
          ["count", "min", "max", "value", "dimensions", "latency"].includes(name)
            ? 1536
            : "example",
        ])
      );
      const formatted = new IntlMessageFormat(value, code).format(samples);
      assert.equal(typeof formatted, "string", `${code}.${key}: rich output was not expected`);
      assert.doesNotMatch(String(formatted), /[{}]/, `${code}.${key}: unformatted ICU syntax`);
      for (const protectedTerm of [
        "/docs/guides/MANAGEMENT-AUTH",
        "omniroute",
        "temperature",
        "Bearer",
        "Redis",
        "LRU",
        "TTL",
        "API",
        "URL",
        "CLI",
      ]) {
        if (
          (key.startsWith("semanticCache") || key.startsWith("accessTokens")) &&
          english.includes(protectedTerm) &&
          !(protectedTerm === "temperature" && key === "semanticCacheZeroTemperature")
        )
          assert.ok(value.includes(protectedTerm), `${code}.${key}: lost ${protectedTerm}`);
      }
    }
  }
});

test("the newly localized settings sections do not silently fall back to long English copy", () => {
  const keys = [...required].filter(
    (key) =>
      key.startsWith("semanticCache") ||
      key.startsWith("accessTokens") ||
      key.startsWith("factoryAutoPing")
  );
  for (const { code } of locales.filter((locale) => locale.code !== "en")) {
    const settings = read(`src/i18n/messages/${code}.json`).settings;
    for (const key of keys) {
      if (key.startsWith("factoryAutoPing") || source[key].split(/\s+/).length >= 7) {
        assert.notEqual(settings[key], source[key], `${code}.${key}: English copy`);
      }
    }
  }
});

test("Factory reconnect notice is translated in every supported locale", () => {
  const english = read("src/i18n/messages/en.json").providers.factoryReconnectWithOAuth;
  assert.equal(typeof english, "string");
  for (const { code } of locales) {
    const value = read(`src/i18n/messages/${code}.json`).providers.factoryReconnectWithOAuth;
    assert.equal(typeof value, "string", `${code}: missing providers.factoryReconnectWithOAuth`);
    assert.ok(value.trim(), `${code}: empty Factory reconnect label`);
    if (code !== "en") assert.notEqual(value, english, `${code}: English fallback`);
  }
});

test("Factory OAuth chooser and local import copy stays localized in every catalog", () => {
  const sourceModal = read("src/i18n/messages/en.json").oauthModal as Record<string, string>;
  const keys = Object.keys(sourceModal).filter(
    (key) => key.startsWith("factoryOrganization") || key.startsWith("factoryLocalImport")
  );
  assert.equal(keys.length, 11);
  for (const { code } of locales) {
    const messages = read(`src/i18n/messages/${code}.json`).oauthModal as Record<string, string>;
    for (const key of keys) {
      const value = messages[key];
      assert.equal(typeof value, "string", `${code}: missing oauthModal.${key}`);
      assert.deepEqual(argumentsOf(parse(value)), argumentsOf(parse(sourceModal[key])));
      if (code !== "en") assert.notEqual(value, sourceModal[key], `${code}.${key}: English copy`);
    }
  }
});
