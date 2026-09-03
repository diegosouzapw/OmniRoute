import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const modalSource = readFileSync("src/shared/components/OAuthModal.tsx", "utf8");
const errorStepSource = readFileSync(
  "src/shared/components/oauthModal/OAuthErrorStep.tsx",
  "utf8"
);

test("OAuthModal narrows failed Grok paste results before reading the error", () => {
  assert.match(modalSource, /if \(parsed\.ok === false\) \{\s*setError\(parsed\.error\);/);
});

test("OAuthModal adapts the retry action to the button click handler", () => {
  // #8688 extracted the error panel; retry stays a Button onClick in OAuthErrorStep,
  // wired from OAuthModal via onTryAgain → startOAuthFlow.
  assert.match(modalSource, /onTryAgain=\{\(\) => void startOAuthFlow\(\)\}/);
  assert.match(
    errorStepSource,
    /<Button\s+onClick=\{\(\) => \{[\s\S]*?onTryAgain\(\);[\s\S]*?\}\}\s+variant="secondary"\s+fullWidth\s*>/
  );
});
