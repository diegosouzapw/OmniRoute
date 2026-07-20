import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Regression guard for the device-code provider that returned "ошибка сервера OmniRoute":
//
//   codebuddy-cn— the Tencent state endpoint reads `platform` from the QUERY string, not the JSON
//                 body; body-only returned 400 "platform is empty" (verified live). The fix passes
//                 it as a query param. Guard: requestDeviceCode builds the URL with ?platform=.
//
// Source-level: the real validation is the live upstream 200 (can't be hit from CI); these pin
// the exact change so a revert to the broken host / body-only platform fails here.
const here = dirname(fileURLToPath(import.meta.url));
const read = (p: string) => readFileSync(resolve(here, "../..", p), "utf8");

test("codebuddy-cn device-code sends platform as a query param (not body-only)", () => {
  const cb = read("src/lib/oauth/providers/codebuddy-cn.ts");
  assert.match(
    cb,
    /\?platform=\$\{encodeURIComponent\(config\.platform\)\}/,
    "platform query param"
  );
});
