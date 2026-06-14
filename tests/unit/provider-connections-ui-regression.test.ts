import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROVIDER_PAGE = path.resolve(
  __dirname,
  "../../src/app/(dashboard)/dashboard/providers/[id]/page.tsx",
);
const EN_MESSAGES = path.resolve(__dirname, "../../src/i18n/messages/en.json");

const providerPageSrc = readFileSync(PROVIDER_PAGE, "utf-8");
const enMessages = JSON.parse(readFileSync(EN_MESSAGES, "utf-8"));

describe("provider connections UI regression", () => {
  it("keeps English provider count messages available for the provider detail header", () => {
    assert.equal(
      enMessages.providers?.selectedCount,
      "{count, plural, one {# selected} other {# selected}}",
    );
    assert.equal(
      enMessages.providers?.accountsCount,
      "{count, plural, one {# account} other {# accounts}}",
    );
  });

  it("uses defensive provider count labels instead of leaking raw i18n keys", () => {
    assert.match(providerPageSrc, /function\s+providerCountText\s*\(/);
    assert.match(providerPageSrc, /providerCountText\([\s\S]*"selectedCount"[\s\S]*"\{count\} selected"/);
    assert.match(providerPageSrc, /providerCountText\([\s\S]*"accountsCount"[\s\S]*"\{count\} account"[\s\S]*"\{count\} accounts"/);
    assert.doesNotMatch(
      providerPageSrc,
      /\?\s*t\("selectedCount",\s*\{\s*count:\s*selectedIds\.size\s*\}\)\s*:\s*t\("accountsCount",\s*\{\s*count:\s*connections\.length\s*\}\)/,
    );
  });

  it("keeps proxy toggle text accessible without repeating active/default labels visually", () => {
    assert.ok(
      providerPageSrc.includes(
      'aria-label={proxyEnabled ? t("proxyEnabledTitle") : t("proxyDisabledTitle")}',
      ),
    );
    assert.ok(
      providerPageSrc.includes(
      'aria-label={perKeyProxyEnabled ? t("perKeyProxyEnabledTitle") : t("perKeyProxyDisabledTitle")}',
      ),
    );
    assert.ok(
      providerPageSrc.includes(
      '<span className="sr-only">{t("proxyOn")}</span>',
      ),
    );
    assert.ok(
      providerPageSrc.includes(
      '<span className="sr-only">{t("perKeyProxyOff")}</span>',
      ),
    );
    assert.doesNotMatch(providerPageSrc, /\{proxyEnabled \? t\("proxyOn"\) : t\("proxyOff"\)\}/);
    assert.doesNotMatch(
      providerPageSrc,
      /\{perKeyProxyEnabled \? t\("perKeyProxyOn"\) : t\("perKeyProxyOff"\)\}/,
    );
  });
});
