import test from "node:test";
import assert from "node:assert/strict";

// Regression guard for #6271 — Baidu / Qianfan dashboard website links must
// point at current developer/console entry points, not retired consumer URLs.
const { APIKEY_PROVIDERS_REGIONAL } = await import(
  "../../src/shared/constants/providers/apikey/regional.ts"
);

test("#6271 qianfan website is the current Qianfan product home (not wenxinworkshop)", () => {
  const entry = (APIKEY_PROVIDERS_REGIONAL as Record<string, { website?: string }>).qianfan;
  assert.ok(entry, "qianfan regional provider entry must exist");
  assert.equal(entry.website, "https://cloud.baidu.com/product-s/qianfan_home");
  assert.doesNotMatch(
    entry.website ?? "",
    /wenxinworkshop/,
    "stale Wenxin Workshop path must not remain",
  );
});

test("#6271 baidu (ERNIE) website is ernie.baidu.com (not yiyan consumer nag)", () => {
  const entry = (APIKEY_PROVIDERS_REGIONAL as Record<string, { website?: string }>).baidu;
  assert.ok(entry, "baidu regional provider entry must exist");
  assert.equal(entry.website, "https://ernie.baidu.com/");
  assert.doesNotMatch(entry.website ?? "", /yiyan\.baidu\.com/, "deprecated yiyan URL must not remain");
});

test("#6271 baidu authHint still points operators at the BCE console", () => {
  const entry = (APIKEY_PROVIDERS_REGIONAL as Record<string, { authHint?: string }>).baidu;
  assert.match(entry.authHint ?? "", /console\.bce\.baidu\.com/);
});
