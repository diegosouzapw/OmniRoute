import test from "node:test";
import assert from "node:assert/strict";
import { Request as UndiciRequest } from "undici";

import { buildCloudflareWorkerUploadRequest } from "../../src/lib/proxyRelay/cloudflareWorkerScript.ts";

// Issue #6416: deploying a Cloudflare relay Worker from Dashboard → System →
// Proxy pool → Cloudflare relay failed immediately with:
//   "Cloudflare Worker upload failed: Content-Type must be one of:
//    application/javascript, text/javascript, multipart/form-data"
// even with a valid token/account (not a credential problem).
//
// Root cause: the upload built a native `FormData` and let `fetch` derive the
// multipart Content-Type automatically. In production `globalThis.fetch` is
// patched (open-sse/utils/proxyFetch.ts) with `node_modules/undici`'s own
// fetch, whose `FormData`/`Request` classes differ from the runtime's global
// `FormData` — a cross-realm class mismatch. Passing a native `FormData`
// instance through undici's `Request`/`fetch` makes it fail to recognize the
// body as FormData and serialize it as the literal string `"[object
// FormData]"` with `Content-Type: text/plain;charset=UTF-8`, which Cloudflare
// rejects outright. This is the same class of bug already fixed once for
// image edits in #3273 (open-sse/handlers/imageGeneration.ts).

test("RED reproduction: a native FormData body loses its shape through undici's Request/fetch", () => {
  // This documents the underlying cross-realm bug itself (independent of our
  // fix) — it does not touch application code, just proves the mechanism
  // that made the original bug report reproducible on self-hosted Docker
  // (where globalThis.fetch is always patched with this same `undici` pkg).
  const fd = new FormData();
  fd.append(
    "index.js",
    new Blob(["export default { fetch() {} };"], { type: "application/javascript" }),
    "index.js"
  );

  const req = new UndiciRequest("https://api.cloudflare.com/client/v4/accounts/x/workers/scripts/y", {
    method: "PUT",
    body: fd,
  });

  // This is the exact Content-Type Cloudflare's API rejects — proves *why*
  // relying on FormData + fetch-derived headers broke on self-hosted Docker.
  assert.equal(req.headers.get("content-type"), "text/plain;charset=UTF-8");
});

test("buildCloudflareWorkerUploadRequest sets a Cloudflare-accepted Content-Type", () => {
  const { headers } = buildCloudflareWorkerUploadRequest("export default { fetch() {} };", {
    main_module: "index.js",
    compatibility_date: "2026-03-20",
  });

  const contentType = headers["Content-Type"];
  assert.ok(contentType, "Content-Type header must be set explicitly");
  assert.match(contentType, /^multipart\/form-data; boundary=.+/);
  assert.notEqual(contentType, "application/json");
  assert.notEqual(contentType, "text/plain;charset=UTF-8");
});

test("buildCloudflareWorkerUploadRequest body is a well-formed multipart Buffer carrying both parts", () => {
  const workerScript = "export default { fetch() { return new Response('ok'); } };";
  const metadata = { main_module: "index.js", compatibility_date: "2026-03-20" };
  const { headers, body } = buildCloudflareWorkerUploadRequest(workerScript, metadata);

  assert.ok(Buffer.isBuffer(body), "body must be a Buffer, not a FormData instance");
  const text = body.toString("utf8");
  const boundary = headers["Content-Type"].split("boundary=")[1];

  assert.ok(text.includes(`--${boundary}`), "body must contain the declared boundary");
  assert.ok(
    text.includes('Content-Disposition: form-data; name="index.js"; filename="index.js"'),
    "body must carry the index.js script part"
  );
  assert.ok(
    text.includes('Content-Disposition: form-data; name="metadata"; filename="metadata.json"'),
    "body must carry the metadata part"
  );
  assert.ok(text.includes(workerScript), "body must embed the actual worker script source");
  assert.ok(text.includes(JSON.stringify(metadata)), "body must embed the JSON metadata");
  assert.ok(!text.includes("[object FormData]"), "body must never degrade to the FormData stringification bug");
});

test("the request undici's fetch/Request builds from our headers+body keeps the accepted Content-Type", () => {
  // Simulates exactly what open-sse/utils/proxyFetch.ts's patchedFetch does in
  // production (self-hosted, non-cloud): constructing a Request/fetch call
  // via the pinned `undici` package. This is the regression guard for the
  // actual upload path used by the cloudflare-deploy route.
  const { headers, body } = buildCloudflareWorkerUploadRequest("export default {};", {
    main_module: "index.js",
  });

  const req = new UndiciRequest("https://api.cloudflare.com/client/v4/accounts/x/workers/scripts/y", {
    method: "PUT",
    headers,
    body,
  });

  const contentType = req.headers.get("content-type");
  assert.ok(contentType?.startsWith("multipart/form-data; boundary="));
});
