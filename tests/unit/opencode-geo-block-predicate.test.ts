import { describe, it } from "node:test";
import assert from "node:assert";
import { isOpencodeGeoBlocked, proxyKeyOf } from "../../open-sse/executors/opencodeGeoBlock.ts";

const GEO_BODY = JSON.stringify({
  error: { type: "RegionError", message: "This model is not available in your country." },
});
const FP_BODY = JSON.stringify({
  error: { error_code: 1010, message: "browser_signature_banned" },
});
const AUTH_BODY = JSON.stringify({ error: { message: "invalid api key", type: "auth_error" } });

describe("isOpencodeGeoBlocked", () => {
  it("matches 403 + country signal", () => {
    assert.strictEqual(isOpencodeGeoBlocked(403, GEO_BODY), true);
  });
  it("matches 451 geo by definition (signal present)", () => {
    assert.strictEqual(isOpencodeGeoBlocked(451, GEO_BODY.replace("country", "region")), true);
  });
  it("rejects fingerprint 1010 even with geo-looking text", () => {
    assert.strictEqual(isOpencodeGeoBlocked(403, FP_BODY), false);
  });
  it("parity with errorClassifier: keyed 1010 rejected, bare 1010 ignored", () => {
    assert.strictEqual(
      isOpencodeGeoBlocked(403, '{"error_code":1010,"message":"blocked"}'),
      false,
      "keyed 1010 = fingerprint, never geo"
    );
    assert.strictEqual(
      isOpencodeGeoBlocked(403, "retry after 1010 seconds, model is not available in your country"),
      true,
      "bare 1010 is not a fingerprint token; geo signal still matches"
    );
  });
  it("rejects 403 auth without signal", () => {
    assert.strictEqual(isOpencodeGeoBlocked(403, AUTH_BODY), false);
  });
  it("rejects non-403/451 statuses", () => {
    assert.strictEqual(isOpencodeGeoBlocked(429, GEO_BODY), false);
    assert.strictEqual(isOpencodeGeoBlocked(200, GEO_BODY), false);
  });
  it("rejects region_error / region-error adversarial variants without word boundary", () => {
    assert.strictEqual(isOpencodeGeoBlocked(403, "Region_error occurred"), false);
    assert.strictEqual(isOpencodeGeoBlocked(403, "region-error occurred"), false);
  });
});

describe("proxyKeyOf", () => {
  it("builds host:port key, null for null proxy", () => {
    assert.strictEqual(proxyKeyOf({ host: "proxy.example", port: 8080 }), "proxy.example:8080");
    assert.strictEqual(proxyKeyOf(null), null);
  });
});
