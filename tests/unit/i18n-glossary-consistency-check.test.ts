import { test } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { checkGlossaryConsistency } from "../../scripts/i18n/check-glossary-consistency.mjs";
import {
  hasUnblockedOccurrence,
  normalizeLocaleText,
} from "../../scripts/i18n/glossary-normalize.mjs";

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
  const { violations } = checkGlossaryConsistency(realMessages, realGlossary, realProtected.terms);
  assert.deepEqual(violations, []);
});

// ---------------------------------------------------------------------------
// zh-TW terminology normalization
// ---------------------------------------------------------------------------

const zhTwGlossary = {
  version: 1,
  locale: "zh-TW",
  terms: {
    type: { canonical: "類型", synonyms: ["型別"], blockedPrefixes: ["模", "本"] },
    upstream: { canonical: "上游", synonyms: ["上遊"] },
  },
};

test("blockedPrefixes suppresses a synonym match inside an unrelated compound", () => {
  // 模型別名 ("model alias") contains 型別 across the character boundary, and
  // 基本型別 is the correct rendering of a programming data type.
  const messages = { common: { alias: "模型別名", primitive: "基本型別值" } };
  const { violations } = checkGlossaryConsistency(messages, zhTwGlossary, []);
  assert.deepEqual(violations, []);
});

test("blockedPrefixes still flags the synonym in a genuine UI label", () => {
  const messages = { common: { eventType: "事件型別" } };
  const { violations } = checkGlossaryConsistency(messages, zhTwGlossary, []);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].concept, "type");
  assert.equal(violations[0].canonical, "類型");
});

test("a value mixing a blocked and an unblocked occurrence is still flagged", () => {
  const messages = { common: { mixed: "模型別名與事件型別" } };
  const { violations } = checkGlossaryConsistency(messages, zhTwGlossary, []);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].found, "型別");
});

test("hasUnblockedOccurrence handles a synonym at index 0", () => {
  assert.equal(hasUnblockedOccurrence("型別標籤", "型別", ["模", "本"]), true);
  assert.equal(hasUnblockedOccurrence("模型別名", "型別", ["模", "本"]), false);
  assert.equal(hasUnblockedOccurrence("沒有相關詞", "型別", []), false);
});

test("normalizeLocaleText rewrites mainland habits and wrong-homophone conversions", () => {
  assert.equal(normalizeLocaleText("默認的儀錶板緩存", "zh-TW"), "預設的儀表板快取");
  // 上遊 is not a Chinese word — the correct rendering of "upstream" is 上游.
  assert.equal(normalizeLocaleText("向上遊發起請求", "zh-TW"), "向上游發起請求");
});

test("normalizeLocaleText never corrupts legitimate uses of a blocked term", () => {
  // Regression guard for the blanket /代碼/g rule this replaced: it turned
  // 控制代碼 (handle) into 控制程式碼 and 語系代碼 (locale code) into
  // 語系程式碼. 代碼 is seeded with no synonyms, so it must pass through.
  assert.equal(normalizeLocaleText("控制代碼與語系代碼", "zh-TW"), "控制代碼與語系代碼");
  assert.equal(normalizeLocaleText("模型別名與事件型別", "zh-TW"), "模型別名與事件類型");
  assert.equal(normalizeLocaleText("基本型別值", "zh-TW"), "基本型別值");
});

test("normalizeLocaleText leaves locales without a glossary untouched", () => {
  assert.equal(normalizeLocaleText("默認", "de"), "默認");
  assert.equal(normalizeLocaleText("默認", ""), "默認");
});

test("real zh-TW.json + real zh-TW glossary pass the gate", () => {
  const realMessages = JSON.parse(
    readFileSync(path.join(ROOT, "src/i18n/messages/zh-TW.json"), "utf8")
  );
  const realGlossary = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/zh-TW.json"), "utf8")
  );
  const realProtected = JSON.parse(
    readFileSync(path.join(ROOT, "scripts/i18n/glossary/protected-terms.json"), "utf8")
  );
  const { violations } = checkGlossaryConsistency(realMessages, realGlossary, realProtected.terms);
  assert.deepEqual(violations, []);
});

test("regression: src/i18n/messages/zh-TW.json is free of the retired renderings", () => {
  const raw = readFileSync(path.join(ROOT, "src/i18n/messages/zh-TW.json"), "utf8");
  for (const retired of ["默認", "內存", "儀錶板", "鏈接", "上遊", "後臺", "供應商", "提供商"]) {
    assert.equal(raw.includes(retired), false, `zh-TW catalog still contains ${retired}`);
  }
});
