import { test } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkGlossaryConsistency } from "../../scripts/i18n/check-glossary-consistency.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

const glossary = {
  version: 1,
  locale: "zh-CN",
  terms: {
    provider: { canonical: "提供者", synonyms: ["提供商"] },
  },
};

const protectedTerms = ["DATA_DIR"];

test("catalog mixing canonical and synonym for a concept is flagged", () => {
  const messages = {
    common: {
      provider: "提供者",
      unknownProvider: "未知提供商",
    },
  };
  const { violations } = checkGlossaryConsistency(messages, glossary, protectedTerms);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].type, "glossary-synonym");
  assert.equal(violations[0].concept, "provider");
  assert.equal(violations[0].found, "提供商");
  assert.equal(violations[0].canonical, "提供者");
});

test("clean catalog using only the canonical rendering has no violations", () => {
  const messages = {
    common: {
      provider: "提供者",
      providerHealth: "提供者健康状态",
    },
  };
  const { violations } = checkGlossaryConsistency(messages, glossary, protectedTerms);
  assert.deepEqual(violations, []);
});

test("protected term altered inside a value is flagged", () => {
  const messages = {
    settings: {
      dataDirHint: "存储在 数据目录 中",
    },
  };
  const { violations } = checkGlossaryConsistency(messages, glossary, protectedTerms);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].type, "protected-term-altered");
  assert.equal(violations[0].term, "DATA_DIR");
  assert.equal(violations[0].found, "数据目录");
});

test("protected term left verbatim is not flagged", () => {
  const messages = {
    settings: {
      dataDirHint: "存储在 DATA_DIR 中",
    },
  };
  const { violations } = checkGlossaryConsistency(messages, glossary, protectedTerms);
  assert.deepEqual(violations, []);
});

test("empty synonyms list for a concept never produces violations", () => {
  const permissiveGlossary = {
    version: 1,
    locale: "zh-CN",
    terms: {
      cache: { canonical: "缓存", synonyms: [] },
    },
  };
  const messages = { common: { cache: "高速缓存" } };
  const { violations } = checkGlossaryConsistency(messages, permissiveGlossary, protectedTerms);
  assert.deepEqual(violations, []);
});

// Regression guard: the one-shot 提供商→提供者 normalization pass (#8038) must
// not silently regress. Load the REAL zh-CN catalogs and assert the retired
// synonym is gone.
test("regression: src/i18n/messages/zh-CN.json no longer contains 提供商", () => {
  const raw = readFileSync(path.join(ROOT, "src/i18n/messages/zh-CN.json"), "utf8");
  assert.equal(raw.includes("提供商"), false);
});

test("regression: bin/cli/locales/zh-CN.json no longer contains 提供商", () => {
  const raw = readFileSync(path.join(ROOT, "bin/cli/locales/zh-CN.json"), "utf8");
  assert.equal(raw.includes("提供商"), false);
});

test("glossary-file protectedTermMistranslations are merged into the protected-term check", () => {
  const koGlossary = {
    version: 1,
    locale: "ko",
    terms: {},
    protectedTermMistranslations: {
      ngrok: ["응록"],
    },
  };
  const messages = { endpoint: { ngrokTitle: "응록 터널" } };
  const { violations } = checkGlossaryConsistency(messages, koGlossary, ["ngrok"]);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].type, "protected-term-altered");
  assert.equal(violations[0].term, "ngrok");
  assert.equal(violations[0].found, "응록");
});

test("protectedTermMistranslations for a term absent from protected-terms.json are inert", () => {
  const koGlossary = {
    version: 1,
    locale: "ko",
    terms: {},
    protectedTermMistranslations: {
      ngrok: ["응록"],
    },
  };
  const messages = { endpoint: { ngrokTitle: "응록 터널" } };
  // "ngrok" not in the protected list → the glossary entry alone must not fire.
  const { violations } = checkGlossaryConsistency(messages, koGlossary, ["DATA_DIR"]);
  assert.deepEqual(violations, []);
});

test("legacy KNOWN_MISTRANSLATIONS still fire when the glossary has no mistranslation map", () => {
  const messages = { settings: { dataDirHint: "存储在 数据目录 中" } };
  const { violations } = checkGlossaryConsistency(messages, glossary, ["DATA_DIR"]);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].term, "DATA_DIR");
});

// Regression guard for the #8224 ko.json mistranslation cleanup: the garbled
// product names and wrong-sense homonyms must not reappear in either ko catalog
// (e.g. via a future machine-translation run).
for (const badTerm of ["응록", "인류", "쌍둥이자리", "반중력", "달리기", "장애인"]) {
  test(`regression: src/i18n/messages/ko.json no longer contains ${badTerm}`, () => {
    const raw = readFileSync(path.join(ROOT, "src/i18n/messages/ko.json"), "utf8");
    assert.equal(raw.includes(badTerm), false);
  });

  test(`regression: bin/cli/locales/ko.json no longer contains ${badTerm}`, () => {
    const raw = readFileSync(path.join(ROOT, "bin/cli/locales/ko.json"), "utf8");
    assert.equal(raw.includes(badTerm), false);
  });
}

test("real ko.json + real ko glossary + real protected terms pass the gate", () => {
  const realMessages = JSON.parse(
    readFileSync(path.join(ROOT, "src/i18n/messages/ko.json"), "utf8")
  );
  const realGlossary = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/ko.json"), "utf8")
  );
  const realProtected = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/protected-terms.json"), "utf8")
  );
  const { violations } = checkGlossaryConsistency(
    realMessages,
    realGlossary,
    realProtected.terms
  );
  assert.deepEqual(violations, []);
});

test("real zh-CN.json + real glossary + real protected terms pass the gate", () => {
  const realMessages = JSON.parse(
    readFileSync(path.join(ROOT, "src/i18n/messages/zh-CN.json"), "utf8")
  );
  const realGlossary = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/zh-CN.json"), "utf8")
  );
  const realProtected = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/protected-terms.json"), "utf8")
  );
  const { violations } = checkGlossaryConsistency(
    realMessages,
    realGlossary,
    realProtected.terms
  );
  assert.deepEqual(violations, []);
});
