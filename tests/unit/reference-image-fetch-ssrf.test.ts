/**
 * The Adobe Firefly and UC persona handlers download a reference image whose URL comes from
 * the request body and hand the bytes on to a third party. That download has to use the same
 * public-only, DNS-pinned, size-limited fetch as the other image inputs, so a request cannot
 * make the server read loopback, private-network or cloud-metadata addresses.
 */

import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import net from "node:net";

const { resolveAdobeSourceImageIds } =
  await import("../../open-sse/services/adobeFireflyClient.ts");
const { handleUcVideoGeneration, UC_PERSONA_SIGNED_URL, UC_PERSONA_IMAGE_TO_VIDEO_URL } =
  await import("../../open-sse/handlers/videoGeneration/providers/ucVideo.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const { isUcClerkMintUrl } = await import("./helpers/ucClerkUrl.ts");

const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

// A real listener on loopback: if the guard let a request through, it would land here.
let internalHits = 0;
const internalServer = http.createServer((_req, res) => {
  internalHits += 1;
  res.writeHead(200, { "content-type": "image/png" });
  res.end(PNG);
});
await new Promise<void>((resolve) => internalServer.listen(0, "127.0.0.1", resolve));
const INTERNAL_URL = `http://127.0.0.1:${(internalServer.address() as net.AddressInfo).port}/internal.png`;

const INTERNAL_URLS = [
  INTERNAL_URL,
  "http://169.254.169.254/latest/meta-data/",
  "http://10.0.0.5/admin.png",
  "http://[::1]/x.png",
];

test.beforeEach(() => {
  internalHits = 0;
});

test.afterEach(() => {
  setPinnedFetchTestOverride(undefined);
});

test.after(() => {
  internalServer.closeAllConnections();
  internalServer.close();
});

function pngResponse() {
  return new Response(PNG, { status: 200, headers: { "content-type": "image/png" } });
}

function adobeFetchRecorder() {
  const seen: string[] = [];
  let uploads = 0;
  const fetchImpl = (async (url: string | URL) => {
    const u = String(url);
    seen.push(u);
    if (u.includes("/v2/storage/image")) {
      uploads += 1;
      return new Response(JSON.stringify({ images: [{ id: `blob-${uploads}` }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(PNG, { status: 200, headers: { "content-type": "image/png" } });
  }) as typeof fetch;
  return { fetchImpl, seen, uploads: () => uploads };
}

test("Adobe Firefly refuses a reference image URL that points at an internal address", async () => {
  for (const url of INTERNAL_URLS) {
    const recorder = adobeFetchRecorder();
    await assert.rejects(
      resolveAdobeSourceImageIds({
        accessToken: "tok",
        body: { image: url },
        fetchImpl: recorder.fetchImpl,
      }),
      (error: Error & { status?: number; code?: string }) => {
        assert.equal(error.status, 400, url);
        assert.ok(!error.message.includes(url), "the error must not echo the URL");
        return true;
      },
      url
    );
    assert.deepEqual(recorder.seen, [], url);
  }
  assert.equal(internalHits, 0, "the loopback listener was reached");
});

test("Adobe Firefly does not follow a redirect from a public address to an internal one", async () => {
  const requested: string[] = [];
  setPinnedFetchTestOverride((async (url: string | URL) => {
    requested.push(String(url));
    return new Response(null, { status: 302, headers: { location: INTERNAL_URL } });
  }) as typeof fetch);
  const recorder = adobeFetchRecorder();

  await assert.rejects(
    resolveAdobeSourceImageIds({
      accessToken: "tok",
      body: { image: "http://93.184.216.34/redirect.png" },
      fetchImpl: recorder.fetchImpl,
    }),
    (error: Error & { status?: number }) => error.status === 400
  );
  assert.deepEqual(requested, ["http://93.184.216.34/redirect.png"]);
  assert.equal(internalHits, 0);
  assert.equal(recorder.uploads(), 0);
});

test("Adobe Firefly logs why a reference image was refused but tells the client only that it failed", async () => {
  const logged: string[] = [];
  const log = { error: (_tag: string, message: string) => logged.push(message) };
  const attempts: Array<[string, () => Response]> = [
    [INTERNAL_URL, pngResponse],
    [
      "http://93.184.216.34/big.png",
      () =>
        new Response(PNG, {
          status: 200,
          headers: { "content-type": "image/png", "content-length": String(64 * 1024 * 1024) },
        }),
    ],
    ["http://93.184.216.34/missing.png", () => new Response("no", { status: 404 })],
  ];
  for (const [url, respond] of attempts) {
    setPinnedFetchTestOverride((async () => respond()) as typeof fetch);
    await assert.rejects(
      resolveAdobeSourceImageIds({
        accessToken: "tok",
        body: { image: url },
        fetchImpl: adobeFetchRecorder().fetchImpl,
        log,
      }),
      (error: Error) => error.message === "Failed to download reference image"
    );
  }
  assert.equal(logged.length, 3);
  assert.match(logged[1], /exceeds/);
  assert.match(logged[2], /404/);
});

test("Adobe Firefly still downloads a reference image from a public address", async () => {
  setPinnedFetchTestOverride((async () => pngResponse()) as typeof fetch);
  const recorder = adobeFetchRecorder();

  const ids = await resolveAdobeSourceImageIds({
    accessToken: "tok",
    body: { image: "http://93.184.216.34/a.png" },
    fetchImpl: recorder.fetchImpl,
  });

  assert.deepEqual(ids, ["blob-1"]);
  assert.equal(recorder.uploads(), 1);
});

const PERSONA_CRED = {
  providerSpecificData: {
    ucClientCookie: "clientcookie-abc",
    ucSid: "sess_123",
    ucUid: "b03dd963-d0c1-4193-99c9-f5a9d0c66b7f",
    ucCookies: { __client: "clientcookie-abc", __cf_bm: "cf" },
  },
};

function fakeJwt(): string {
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + 60;
  return `${b64({ alg: "RS256" })}.${b64({ uid: "b03dd963", exp, sub: "user_1", sid: "sess_123" })}.sig`;
}

function ucFetchRecorder() {
  const seen: string[] = [];
  let uploaded = false;
  const json = (body: unknown) =>
    ({
      ok: true,
      status: 200,
      headers: { get: () => "" },
      async json() {
        return body;
      },
      async text() {
        return JSON.stringify(body);
      },
      async arrayBuffer() {
        return new Uint8Array(PNG).buffer;
      },
    }) as unknown as Response;
  const fetchImpl = (async (url: string) => {
    seen.push(url);
    if (isUcClerkMintUrl(url)) return json({ object: "token", jwt: fakeJwt() });
    if (url === UC_PERSONA_SIGNED_URL) {
      return json({ signed_url: "https://d.moveinwater.com/up/tok", blob_name: "blob_xyz" });
    }
    if (url.startsWith("https://d.moveinwater.com/up/")) {
      uploaded = true;
      return json({});
    }
    if (url === UC_PERSONA_IMAGE_TO_VIDEO_URL) {
      return json({ request_id: "req", url: "https://videogen.moveinwater.com/ready" });
    }
    return json({});
  }) as unknown as typeof fetch;
  return { fetchImpl, seen, uploaded: () => uploaded };
}

test("UC persona video refuses an input image URL that points at an internal address", async () => {
  for (const url of INTERNAL_URLS) {
    const recorder = ucFetchRecorder();
    const result = (await handleUcVideoGeneration({
      model: "uc/wan-2.2-spicy",
      provider: "uc",
      body: { prompt: "animate this", image: url, poll_interval_ms: 1 },
      credentials: PERSONA_CRED,
      fetchImpl: recorder.fetchImpl,
      sleepImpl: async () => {},
    })) as { success: boolean; status?: number; error?: string };

    assert.equal(result.success, false, url);
    assert.equal(result.status, 400, url);
    assert.ok(!String(result.error).includes(url), "the error must not echo the URL");
    assert.ok(!recorder.seen.includes(url), `${url} was fetched`);
    assert.equal(recorder.uploaded(), false, url);
  }
  assert.equal(internalHits, 0, "the loopback listener was reached");
});

test("UC persona video does not follow a redirect from a public address to an internal one", async () => {
  const requested: string[] = [];
  setPinnedFetchTestOverride((async (url: string | URL) => {
    requested.push(String(url));
    return new Response(null, { status: 302, headers: { location: INTERNAL_URL } });
  }) as typeof fetch);
  const recorder = ucFetchRecorder();
  const logged: string[] = [];

  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: {
      prompt: "animate this",
      image: "http://93.184.216.34/redirect.png",
      poll_interval_ms: 1,
    },
    credentials: PERSONA_CRED,
    fetchImpl: recorder.fetchImpl,
    sleepImpl: async () => {},
    log: { error: (_tag: string, message: string) => logged.push(message) },
  })) as { success: boolean; status?: number };

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.deepEqual(requested, ["http://93.184.216.34/redirect.png"]);
  assert.equal(internalHits, 0);
  assert.equal(recorder.uploaded(), false);
  assert.ok(
    logged.some((message) => message.includes("input image download failed")),
    logged.join(" | ")
  );
});

test("UC persona video still downloads an input image from a public address", async () => {
  setPinnedFetchTestOverride((async () => pngResponse()) as typeof fetch);
  const recorder = ucFetchRecorder();

  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: { prompt: "animate this", image: "http://93.184.216.34/a.png", poll_interval_ms: 1 },
    credentials: PERSONA_CRED,
    fetchImpl: recorder.fetchImpl,
    sleepImpl: async () => {},
  })) as { success: boolean };

  assert.equal(result.success, true);
  assert.equal(recorder.uploaded(), true);
});
