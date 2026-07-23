import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROVIDER_DIR = path.resolve(__dirname, "../../src/app/(dashboard)/dashboard/providers/[id]");
const EN_MESSAGES = path.resolve(__dirname, "../../src/i18n/messages/en.json");

// #3501 strangler-fig decomposition: the provider-detail god-component (page.tsx)
// was split into helpers + per-section components. The defensive count labels and
// proxy-toggle markup now live in these files — scan their union.
const providerPageSrc = [
  "providerPageHelpers.ts",
  "components/ConnectionsListPanel.tsx",
  "components/ConnectionRow.tsx",
]
  .map((rel) => readFileSync(path.join(PROVIDER_DIR, rel), "utf-8"))
  .join("\n");
const enMessages = JSON.parse(readFileSync(EN_MESSAGES, "utf-8"));

describe("provider connections UI regression", () => {
  it("keeps English provider count messages available for the provider detail header", () => {
    assert.equal(
      enMessages.providers?.selectedCount,
      "{count, plural, one {# selected} other {# selected}}"
    );
    assert.equal(
      enMessages.providers?.accountsCount,
      "{count, plural, one {# account} other {# accounts}}"
    );
  });

  it("uses defensive provider count labels instead of leaking raw i18n keys", () => {
    assert.match(providerPageSrc, /function\s+providerCountText\s*\(/);
    assert.match(
      providerPageSrc,
      /providerCountText\([\s\S]*"selectedCount"[\s\S]*"\{count\} selected"/
    );
    assert.match(
      providerPageSrc,
      /providerCountText\([\s\S]*"accountsCount"[\s\S]*"\{count\} account"[\s\S]*"\{count\} accounts"/
    );
    assert.doesNotMatch(
      providerPageSrc,
      /\?\s*t\("selectedCount",\s*\{\s*count:\s*selectedIds\.size\s*\}\)\s*:\s*t\("accountsCount",\s*\{\s*count:\s*connections\.length\s*\}\)/
    );
  });

  it("keeps proxy toggle text accessible without repeating active/default labels visually", () => {
    // Whitespace-tolerant: Prettier may format these aria-labels across multiple lines.
    assert.match(
      providerPageSrc,
      /aria-label=\{\s*proxyEnabled\s*\?\s*t\("proxyEnabledTitle"\)\s*:\s*t\("proxyDisabledTitle"\)\s*\}/
    );
    assert.match(
      providerPageSrc,
      /aria-label=\{\s*perKeyProxyEnabled\s*\?\s*t\("perKeyProxyEnabledTitle"\)\s*:\s*t\("perKeyProxyDisabledTitle"\)\s*\}/
    );
    assert.ok(providerPageSrc.includes('<span className="sr-only">{t("proxyOn")}</span>'));
    assert.ok(providerPageSrc.includes('<span className="sr-only">{t("perKeyProxyOff")}</span>'));
    assert.doesNotMatch(providerPageSrc, /\{proxyEnabled \? t\("proxyOn"\) : t\("proxyOff"\)\}/);
    assert.doesNotMatch(
      providerPageSrc,
      /\{perKeyProxyEnabled \? t\("perKeyProxyOn"\) : t\("perKeyProxyOff"\)\}/
    );
  });
});
