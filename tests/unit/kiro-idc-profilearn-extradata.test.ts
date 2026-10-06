import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Source-level contract tests for the IdC (IAM Identity Center) Kiro login path.
//
// A Kiro connection added through "Your organization (AWS IAM Identity Center)" must end up
// with a `profileArn` in providerSpecificData. Without it every CodeWhisperer usage call is
// made unbound to the Q Developer profile and AWS answers 403 "User is not authorized to make
// this call", so the quota card shows "Kiro quota API rejected the current token" while chat
// keeps working.
//
// The value is only discovered when `_authMethod` survives the device-code round trip:
//
//   requestDeviceCode  -> _authMethod: "idc"        (startUrl present)
//   OAuthModal         -> forwards extraData to the poll request   <- the link that broke
//   pollToken          -> extraData?._authMethod || "builder-id"
//   postExchange       -> returns early for "builder-id" (no profile lookup)
//   mapTokens          -> persists authMethod + profileArn
//
// The modal used to copy only _clientId/_clientSecret/_region, so an IdC login was persisted as
// a Builder ID one and the profile lookup never ran.

const here = dirname(fileURLToPath(import.meta.url));
const modalSource = readFileSync(join(here, "../../src/shared/components/OAuthModal.tsx"), "utf8");
const kiroProviderSource = readFileSync(
  join(here, "../../src/lib/oauth/providers/kiro.ts"),
  "utf8"
);

test("OAuthModal forwards _authMethod to the poll request for Kiro device code", () => {
  const extraDataBlock = modalSource.match(
    /provider === "kiro" \|\| provider === "amazon-q"\s*\?\s*\{[\s\S]*?\}/
  );
  assert.ok(extraDataBlock, "Kiro extraData block not found in OAuthModal");

  const block = extraDataBlock[0];
  assert.match(block, /_clientId: data\._clientId/);
  assert.match(block, /_clientSecret: data\._clientSecret/);
  assert.match(block, /_region: data\._region/);
  // The regression: dropping this line silently downgrades an IdC login to Builder ID.
  assert.match(
    block,
    /_authMethod: data\._authMethod/,
    "OAuthModal must forward _authMethod so pollToken does not fall back to builder-id"
  );
});

test("requestDeviceCode marks IdC logins so the profile lookup can run", () => {
  assert.match(
    kiroProviderSource,
    /_authMethod: config\.skipIssuerUrlForRegistration \? "idc" : "builder-id"/
  );
});

test("pollToken keeps the device-code _authMethod when the caller forwards it", () => {
  assert.match(kiroProviderSource, /_authMethod: extraData\?\._authMethod \|\| "builder-id"/);
});

test("postExchange skips the profile lookup only for Builder ID logins", () => {
  assert.match(kiroProviderSource, /if \(tokenData\?\._authMethod === "builder-id"\) return null;/);
  assert.match(
    kiroProviderSource,
    /discoverKiroProfileArnAcrossRegions\(accessToken, storedRegion\)/
  );
});

test("mapTokens persists profileArn when the exchange discovered one", () => {
  assert.match(
    kiroProviderSource,
    /\.\.\.\(extra\?\.profileArn \? \{ profileArn: extra\.profileArn \} : \{\}\)/
  );
});
