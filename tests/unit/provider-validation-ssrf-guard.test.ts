/**
 * QA P0 (security) — provider-validation SSRF guard.
 *
 * `directHttpsRequest` (used by web-cookie / NVIDIA / Z.AI validation, all of
 * which accept a caller-controllable baseUrl) previously ran with
 * `guard: "none"` + `allowRedirect: true`, i.e. an open relay to cloud-metadata
 * endpoints. It now runs with `getProviderValidationGuard()` (default
 * "block-metadata") + `allowRedirect: false`. These tests assert the guard
 * rejects IMDS / link-local targets BEFORE any network call, while ordinary
 * public hosts still pass the guard.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { directHttpsRequest } = await import("../../src/lib/providers/validation/headers.ts");

const METADATA_TARGETS = [
  "http://169.254.169.254/latest/meta-data/", // AWS/GCP IMDS
  "http://[fd00:ec2::254]/latest/meta-data/", // AWS IMDSv6
  "http://metadata.google.internal/computeMetadata/v1/", // GCP metadata host
];

for (const url of METADATA_TARGETS) {
  test(`SSRF: directHttpsRequest blocks cloud-metadata target ${url}`, async () => {
    await assert.rejects(
      () => directHttpsRequest(url, { method: "GET" }, 2000),
      (err: unknown) => {
        const msg = String((err as Error)?.message ?? err);
        // Must be a guard rejection, not a network timeout/connect error — i.e.
        // the request was refused before any socket was opened.
        assert.match(msg, /guard|metadata|blocked|not allowed|URL/i, `expected guard block, got: ${msg}`);
        return true;
      }
    );
  });
}

test("SSRF: a normal public provider host is NOT blocked by the guard", async () => {
  // block-metadata permits public + LAN hosts; only IMDS/link-local are refused.
  // We use an unroutable TEST-NET-1 address (RFC 5737) so no real traffic leaves,
  // and assert the failure is a network error (guard passed), never a guard block.
  await assert.rejects(
    () => directHttpsRequest("http://192.0.2.1:9/models", { method: "GET" }, 1500),
    (err: unknown) => {
      const msg = String((err as Error)?.message ?? err);
      assert.doesNotMatch(
        msg,
        /url_guard_blocked|guard blocked|metadata/i,
        `public host must pass the guard, got a guard block: ${msg}`
      );
      return true;
    }
  );
});
