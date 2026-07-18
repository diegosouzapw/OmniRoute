import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guards for the two device-code providers that returned "ошибка сервера OmniRoute":
//
//   qwen        — QWEN_CONFIG pointed at the bare host qwen.ai, whose device/token paths 404.
//                 The working qwen-code device flow lives at chat.qwen.ai (verified live: 200 +
//                 a valid device_code). Guard: the config uses chat.qwen.ai, never bare qwen.ai.
//   codebuddy-cn— the Tencent state endpoint reads `platform` from the QUERY string, not the JSON
//                 body; body-only returned 400 "platform is empty" (verified live). The fix passes
//                 it as a query param. Guard: requestDeviceCode builds the URL with ?platform=.
//
// Source-level: the real validation is the live upstream 200 (can't be hit from CI); these pin
// the exact change so a revert to the broken host / body-only platform fails here.
const here = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(resolve(here, "../..", p), "utf8");

test("qwen device-code config uses chat.qwen.ai (not the 404ing bare qwen.ai)", () => {
  const oauth = read("src/lib/oauth/constants/oauth.ts");
  const qwenBlock = oauth.slice(oauth.indexOf("QWEN_CONFIG"), oauth.indexOf("QWEN_CONFIG") + 700);
  assert.match(qwenBlock, /chat\.qwen\.ai\/api\/v1\/oauth2\/device\/code/, "deviceCodeUrl host");
  assert.match(qwenBlock, /chat\.qwen\.ai\/api\/v1\/oauth2\/token/, "tokenUrl host");
  assert.doesNotMatch(qwenBlock, /"https:\/\/qwen\.ai\//, "must not use the bare qwen.ai host");
});

test("codebuddy-cn device-code sends platform as a query param (not body-only)", () => {
  const cb = read("src/lib/oauth/providers/codebuddy-cn.ts");
  assert.match(cb, /\?platform=\$\{encodeURIComponent\(config\.platform\)\}/, "platform query param");
});
