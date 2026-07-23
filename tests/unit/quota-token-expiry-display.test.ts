/**
 * The quota card shows an informative (small, blue) OAuth token-expiry line for
 * connections that expose a concrete token expiry (e.g. Codex), and an expired
 * marker otherwise. API-key / no-expiry connections show nothing.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const headerPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardHeader.tsx"
);
const source = fs.readFileSync(headerPath, "utf8");

test("QuotaCardHeader derives token expiry only for OAuth connections with a known expiry", () => {
  assert.match(source, /connection\.authType === "oauth"/, "must gate on oauth auth type");
  assert.match(
    source,
    /connection\.tokenExpiresAt \|\| connection\.expiresAt/,
    "must read tokenExpiresAt with expiresAt fallback"
  );
  assert.match(source, /formatCountdown\(/, "must format the countdown");
});

test("QuotaCardHeader renders the expiry as a small blue (sky) informative line", () => {
  assert.match(source, /text-\[10px\]/, "expiry line must be small (10px)");
  assert.match(source, /text-sky-500/, "active expiry must be blue (sky-500)");
  assert.match(source, /tokenExpiresIn/, "must use the tokenExpiresIn i18n key");
  assert.match(source, /tokenExpired/, "must use the tokenExpired i18n key");
});

test("token expiry i18n keys exist in en and pt-BR", () => {
  for (const locale of ["en", "pt-BR"]) {
    const msgs = JSON.parse(
      fs.readFileSync(path.join(repoRoot, `src/i18n/messages/${locale}.json`), "utf8")
    );
    assert.ok(msgs.usage?.tokenExpiresIn, `${locale}: usage.tokenExpiresIn must exist`);
    assert.ok(msgs.usage?.tokenExpired, `${locale}: usage.tokenExpired must exist`);
    assert.match(
      msgs.usage.tokenExpiresIn,
      /\{time\}/,
      `${locale}: tokenExpiresIn must interpolate {time}`
    );
  }
});
