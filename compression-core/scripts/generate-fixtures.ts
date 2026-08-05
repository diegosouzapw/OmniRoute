#!/usr/bin/env node
/**
 * Generates golden fixtures for compression-core from the OmniRoute JS
 * implementation. Every fixture records: input text + expected token counts
 * (cl100k / o200k) computed by the JS tokenizer.
 *
 * Usage:  node --import tsx/esm scripts/generate-fixtures.ts
 * Output: fixtures/tokenizer/*.json, fixtures/conversations/*.json
 *
 * The Rust side (crates/tests) reads these and asserts equality. Until 100%
 * of fixtures pass, the JS implementation must not be replaced.
 */
import { countTextTokens } from "../../src/shared/utils/tiktokenCounter.ts";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const TOKENIZER_DIR = join(ROOT, "fixtures", "tokenizer");
const EXPECTED_DIR = join(ROOT, "fixtures", "expected");

mkdirSync(TOKENIZER_DIR, { recursive: true });
mkdirSync(EXPECTED_DIR, { recursive: true });

const SAMPLES = [
  "Hello world! This is a test.",
  "The quick brown fox jumps over the lazy dog.",
  "🎉🎊 party time! emoji heavy sentence 🚀",
  "JSON:\n{\"name\":\"test\",\"values\":[1,2,3]}",
  "Code:\n```rust\nfn main() { println!(\"hi\"); }\n```",
  "😀".repeat(50),
  "Поддерживается ли русский текст корректно? Проверяем длинное предложение с кириллицей и пунктуацией!",
  "a".repeat(10000),
  "t".repeat(1),
  "",
  "Mixed 🎯 unicode 中文 한국어 + english + numbers 12345",
  "function foo(a,b){return a+b*2;}\n\nconst x = foo(1,2);\nconsole.log(x);",
];

// A longer realistic conversation-style text (~230K chars) to mirror the
// measured baseline and to stress the counter on large inputs.
const LONG = ("The quick brown fox jumps over the lazy dog. ").repeat(9000);
SAMPLES.push(LONG);

const cl100k = (t) => countTextTokens(t);
const o200k = (t) => countTextTokens(t, { provider: "codex", model: "codex/gpt-5.5" });

let count = 0;
for (const [idx, text] of SAMPLES.entries()) {
  const id = String(idx).padStart(3, "0");
  const record = {
    id,
    text,
    cl100k_tokens: cl100k(text),
    o200k_tokens: o200k(text),
  };
  writeFileSync(join(TOKENIZER_DIR, `sample-${id}.json`), JSON.stringify(record, null, 2));
  count++;
}

// Also emit a combined manifest for quick scanning.
writeFileSync(
  join(EXPECTED_DIR, "tokenizer-manifest.json"),
  JSON.stringify(
    SAMPLES.map((t, idx) => ({
      id: String(idx).padStart(3, "0"),
      chars: t.length,
      cl100k_tokens: cl100k(t),
      o200k_tokens: o200k(t),
    })),
    null,
    2
  )
);

console.log(`Generated ${count} tokenizer fixtures + manifest in fixtures/`);
