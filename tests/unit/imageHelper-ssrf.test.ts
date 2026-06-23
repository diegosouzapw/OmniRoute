import { test } from "node:test";
import assert from "node:assert/strict";

import { fetchImageAsBase64 } from "../../open-sse/translator/helpers/imageHelper.ts";

// Helper: install a fetch spy, run, restore. Records every URL fetch() saw.
async function withFetch<T>(
  impl: (url: string, init?: RequestInit) => Promise<Response>,
  fn: (calls: string[]) => Promise<T>
): Promise<T> {
  const realFetch = globalThis.fetch;
  const calls: string[] = [];
  // @ts-expect-error test stub
  globalThis.fetch = async (url: string, init?: RequestInit) => {
    calls.push(String(url));
    return impl(String(url), init);
  };
  try {
    return await fn(calls);
  } finally {
    globalThis.fetch = realFetch;
  }
}

function imageResponse(bytes = Buffer.from([0xff, 0xd8, 0xff, 0xe0]), type = "image/png"): Response {
  return new Response(bytes, { status: 200, headers: { "Content-Type": type } });
}

// --- SSRF: blocked targets must return null WITHOUT ever calling fetch ---

const BLOCKED_URLS = [
  "http://169.254.169.254/latest/meta-data/iam/security-credentials/", // AWS IMDS
  "http://metadata.google.internal/computeMetadata/v1/", // GCP metadata
  "http://127.0.0.1:20128/api/internal", // loopback
  "http://localhost/secret", // localhost
  "http://10.0.0.5/x.png", // RFC1918 private
  "http://192.168.1.1/x.png", // RFC1918 private
  "http://[::1]/x.png", // IPv6 loopback
  "file:///etc/passwd", // non-http scheme
  "ftp://example.com/x.png", // non-http scheme
  "http://user:pass@example.com/x.png", // embedded credentials
];

for (const url of BLOCKED_URLS) {
  test(`SSRF guard blocks ${url} and never fetches it`, async () => {
    await withFetch(
      async () => {
        throw new Error("fetch must NOT be called for a blocked URL");
      },
      async (calls) => {
        const result = await fetchImageAsBase64(url);
        assert.equal(result, null, `expected null for blocked URL ${url}`);
        assert.equal(calls.length, 0, `fetch was called for blocked URL ${url}`);
      }
    );
  });
}

// --- Redirect re-validation: a 30x to a private host is blocked at the hop ---

test("a redirect from a public host to a private IP is blocked", async () => {
  await withFetch(
    async (url) => {
      // Public IP literal first hop → 302 to loopback.
      if (url.startsWith("http://93.184.216.34")) {
        return new Response(null, { status: 302, headers: { location: "http://127.0.0.1/x.png" } });
      }
      throw new Error(`fetch must not follow redirect to ${url}`);
    },
    async (calls) => {
      const result = await fetchImageAsBase64("http://93.184.216.34/start.png");
      assert.equal(result, null, "redirect to private IP must yield null");
      // Only the first (public) hop is fetched; the loopback hop is rejected
      // by the guard before any second fetch.
      assert.equal(calls.length, 1);
      assert.equal(calls[0], "http://93.184.216.34/start.png");
    }
  );
});

// --- Non-image content type is rejected (no exfiltration as a base64 image) ---

test("a non-image content type is rejected", async () => {
  await withFetch(
    async () => new Response("<html>internal</html>", { status: 200, headers: { "Content-Type": "text/html" } }),
    async () => {
      const result = await fetchImageAsBase64("http://93.184.216.34/page");
      assert.equal(result, null, "text/html must not be returned as an image");
    }
  );
});

// --- Oversized body is rejected ---

test("an oversized image body is rejected", async () => {
  await withFetch(
    async () => imageResponse(Buffer.alloc(2048, 1)),
    async () => {
      const result = await fetchImageAsBase64("http://93.184.216.34/big.png", { maxBytes: 1024 });
      assert.equal(result, null, "body over maxBytes must yield null");
    }
  );
});

// --- Happy path: a public IP literal (skips DNS) returns a base64 data URI ---

test("a public image URL is fetched and base64-encoded", async () => {
  const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
  await withFetch(
    async () => imageResponse(bytes, "image/png"),
    async (calls) => {
      const result = await fetchImageAsBase64("http://93.184.216.34/logo.png");
      assert.ok(result, "expected a FetchedImage");
      assert.equal(result!.mimeType, "image/png");
      assert.equal(result!.url, `data:image/png;base64,${bytes.toString("base64")}`);
      assert.equal(calls.length, 1);
    }
  );
});

// --- Empty / nullish input short-circuits to null ---

test("empty input returns null", async () => {
  assert.equal(await fetchImageAsBase64(""), null);
  assert.equal(await fetchImageAsBase64(null), null);
  assert.equal(await fetchImageAsBase64(undefined), null);
});
