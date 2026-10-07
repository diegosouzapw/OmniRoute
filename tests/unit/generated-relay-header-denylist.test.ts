import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { __buildRelayWorkerForTest } from "../../src/app/api/settings/proxy/deno-deploy/route";
import { __buildRelayFunctionForTest } from "../../src/app/api/settings/proxy/vercel-deploy/route";
import { buildCloudflareWorkerScript } from "../../src/lib/proxyRelay/cloudflareWorkerScript";

const FORBIDDEN_RELAY_HEADERS = [
  "host",
  "connection",
  "content-length",
  "keep-alive",
  "proxy-connection",
  "proxy-authenticate",
  "proxy-authorization",
  "transfer-encoding",
  "te",
  "trailer",
  "upgrade",
  "x-relay-target",
  "x-relay-path",
  "x-relay-auth",
];

const relays = {
  Cloudflare: buildCloudflareWorkerScript("relay-secret"),
  Vercel: __buildRelayFunctionForTest("relay-secret"),
  Deno: __buildRelayWorkerForTest("relay-secret"),
};

describe("generated relay request header sanitization", () => {
  for (const [runtime, source] of Object.entries(relays)) {
    it(`${runtime} strips relay controls, framing, and hop-by-hop headers`, () => {
      const deletionBlock = source.match(
        /const headers = new Headers\([^;]+\);\s*\[([\s\S]*?)\]\.forEach\(\(?h\)?\s*=>\s*headers\.delete\(h\)\);/
      );
      assert.ok(deletionBlock, `${runtime} generated source must sanitize forwarded headers`);

      const deletedHeaders = [...deletionBlock[1].matchAll(/["']([^"']+)["']/g)].map(
        (match) => match[1]
      );
      assert.deepEqual(deletedHeaders, FORBIDDEN_RELAY_HEADERS);
    });
  }
});
