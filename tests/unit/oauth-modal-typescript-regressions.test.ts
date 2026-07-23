import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const modalSource = readFileSync("src/shared/components/OAuthModal.tsx", "utf8");

test("OAuthModal narrows failed Grok paste results before reading the error", () => {
  assert.match(modalSource, /if \(parsed\.ok === false\) \{\s*setError\(parsed\.error\);/);
});

test("OAuthModal adapts the retry action to the button click handler", () => {
  assert.match(
    modalSource,
    /<Button onClick=\{\(\) => startOAuthFlow\(\)\} variant="secondary" fullWidth>/
  );
});
