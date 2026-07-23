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
