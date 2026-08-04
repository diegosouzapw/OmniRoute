import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { detectBrowserLocale } from "../../src/i18n/detectBrowserLocale";

const SUPPORTED_LOCALES = ["en", "pt-BR", "es", "zh-TW", "fr", "de"] as const;

describe("detectBrowserLocale", () => {
  it("returns the exact match when a browser language equals a supported locale", () => {
    assert.equal(detectBrowserLocale(["pt-BR"], SUPPORTED_LOCALES), "pt-BR");
  });

  it("folds zh-HK to zh-TW when zh-TW is supported", () => {
    assert.equal(detectBrowserLocale(["zh-HK"], SUPPORTED_LOCALES), "zh-TW");
  });

  it("folds zh-MO to zh-TW when zh-TW is supported", () => {
    assert.equal(detectBrowserLocale(["zh-MO"], SUPPORTED_LOCALES), "zh-TW");
  });

  it("falls back to a language-prefix match when no exact match exists", () => {
    assert.equal(detectBrowserLocale(["en-US"], SUPPORTED_LOCALES), "en");
  });

  it("returns null when nothing matches", () => {
    assert.equal(detectBrowserLocale(["ja-JP"], SUPPORTED_LOCALES), null);
  });

  it("returns null for an empty languages list", () => {
    assert.equal(detectBrowserLocale([], SUPPORTED_LOCALES), null);
  });

  it("returns null for an empty locales list", () => {
    assert.equal(detectBrowserLocale(["en-US"], []), null);
  });

  it("tries each browser language in order until one matches", () => {
    assert.equal(detectBrowserLocale(["ja-JP", "fr-CA"], SUPPORTED_LOCALES), "fr");
  });

  it("is case-insensitive", () => {
    assert.equal(detectBrowserLocale(["PT-br"], SUPPORTED_LOCALES), "pt-BR");
  });
});
