import assert from "node:assert/strict";
import test from "node:test";

import { detectCompressionLanguage } from "../../../open-sse/services/compression/languageDetector.ts";

test("detects a Hungarian word bounded by Unicode letters", () => {
  assert.equal(detectCompressionLanguage("így kérem a fájlt"), "hu");
});

test("does not treat an ASCII-adjacent Hungarian fragment as Hungarian", () => {
  assert.equal(detectCompressionLanguage("xígy"), "en");
  assert.equal(detectCompressionLanguage("ígyx"), "en");
});
