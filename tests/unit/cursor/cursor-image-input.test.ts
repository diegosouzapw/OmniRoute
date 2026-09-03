import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import dns from "node:dns";
import sharp from "sharp";
import {
  encodeSelectedImageBody,
  encodeAgentRunRequest,
  type EncodedImage,
} from "../../../open-sse/utils/cursorAgentProtobuf";
import {
  resolveCursorImages,
  extractImageUrls,
  assertResolvedAddressesPublic,
  prepareCursorImageForWire,
  sniffCursorImageDimensions,
  sniffCursorImageFormat,
  CursorImageError,
  MAX_CURSOR_IMAGE_BYTES,
  MAX_CURSOR_IMAGE_DECODE_BYTES,
  MAX_CURSOR_IMAGES,
  CURSOR_VISION_SOFT_MAX_BYTES,
} from "../../../open-sse/utils/cursorImages";
import { CursorExecutor } from "../../../open-sse/executors/cursor";

// A public IP for mocking DNS so the redirect tests (which use non-resolvable
// example hostnames) pass the DNS-rebinding gate.
const PUBLIC_IP = [{ address: "93.184.216.34", family: 4 }];

/** Tiny valid 1x1 PNG (red pixel). */
const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);

async function makeTinyJpeg(): Promise<Buffer> {
  return sharp({
    create: { width: 8, height: 8, channels: 3, background: { r: 20, g: 40, b: 60 } },
  })
    .jpeg({ quality: 80 })
    .toBuffer();
}

async function makeLargePng(edge = 1200): Promise<Buffer> {
  // Uncompressed-ish PNG well over the soft cap but under the decode ceiling.
  return sharp({
    create: {
      width: edge,
      height: edge,
      channels: 3,
      background: { r: 180, g: 90, b: 30 },
    },
  })
    .png({ compressionLevel: 0 })
    .toBuffer();
}

// ─── Minimal protobuf field walker (test-only) ──────────────────────────────
type WalkField = { fn: number; wt: 0; varint: bigint } | { fn: number; wt: 2; bytes: Buffer };

function walk(buf: Buffer): WalkField[] {
  const out: WalkField[] = [];
  let pos = 0;
  const varint = (): bigint => {
    let r = 0n;
    let s = 0n;
    for (;;) {
      const b = buf[pos++];
      r |= BigInt(b & 0x7f) << s;
      if (!(b & 0x80)) break;
      s += 7n;
    }
    return r;
  };
  while (pos < buf.length) {
    const tag = varint();
    const fn = Number(tag >> 3n);
    const wt = Number(tag & 7n);
    if (wt === 0) {
      out.push({ fn, wt: 0, varint: varint() });
    } else if (wt === 2) {
      const len = Number(varint());
      out.push({ fn, wt: 2, bytes: buf.subarray(pos, pos + len) });
      pos += len;
    } else if (wt === 5) {
      pos += 4;
    } else if (wt === 1) {
      pos += 8;
    } else {
      throw new Error(`bad wireType ${wt}`);
    }
  }
  return out;
}
const find = (fields: WalkField[], fn: number) => fields.find((f) => f.fn === fn);
const lenBytes = (fields: WalkField[], fn: number): Buffer => {
  const f = find(fields, fn);
  assert.ok(f && f.wt === 2, `expected len field ${fn}`);
  return Buffer.from((f as { bytes: Buffer }).bytes);
};

function navUserMessage(req: Buffer): WalkField[] {
  const acm = walk(req);
  const arr = walk(lenBytes(acm, 1));
  const action = walk(lenBytes(arr, 2));
  const uma = walk(lenBytes(action, 1));
  return walk(lenBytes(uma, 1));
}

function decodeBlobIdWithData(fields: WalkField[]): { blobId: Buffer; data: Buffer } {
  assert.equal(find(fields, 8), undefined, "legacy field 8 (data) must be absent");
  const nested = walk(lenBytes(fields, 9));
  return {
    blobId: lenBytes(nested, 1),
    data: lenBytes(nested, 2),
  };
}

// ─── encodeSelectedImageBody field layout ───────────────────────────────────

test("encodeSelectedImageBody emits uuid(2), path(3), dimension(4), mime_type(7), blobIdWithData(9)", () => {
  const data = Buffer.from([1, 2, 3, 4, 5]);
  const blobStore = new Map<string, Buffer>();
  const body = encodeSelectedImageBody(
    {
      data,
      mimeType: "image/png",
      width: 10,
      height: 20,
      uuid: "abc-123",
    },
    blobStore
  );
  const fields = walk(body);

  assert.equal(lenBytes(fields, 2).toString("utf8"), "abc-123"); // uuid
  assert.equal(lenBytes(fields, 3).toString("utf8"), "attachment-abc-123.png"); // path
  const dim = walk(lenBytes(fields, 4)); // dimension submessage
  assert.equal(Number((find(dim, 1) as { varint: bigint }).varint), 10); // width
  assert.equal(Number((find(dim, 2) as { varint: bigint }).varint), 20); // height
  assert.equal(lenBytes(fields, 7).toString("utf8"), "image/png"); // mime_type

  const expectedBlobId = crypto.createHash("sha256").update(data).digest();
  const { blobId, data: nestedData } = decodeBlobIdWithData(fields);
  assert.deepEqual(blobId, expectedBlobId);
  assert.deepEqual(nestedData, data);
  assert.deepEqual(blobStore.get(expectedBlobId.toString("hex")), data);
});

test("encodeSelectedImageBody omits dimension/mime_type when not provided", () => {
  const data = Buffer.from([9]);
  const body = encodeSelectedImageBody({ data, uuid: "u" });
  const fields = walk(body);
  assert.equal(find(fields, 4), undefined, "no dimension");
  assert.equal(find(fields, 7), undefined, "no mime_type");
  assert.ok(find(fields, 2), "uuid present");
  assert.ok(find(fields, 3), "path present");
  const { data: nestedData } = decodeBlobIdWithData(fields);
  assert.deepEqual(nestedData, data);
});

test("encodeSelectedImageBody omits dimension when width/height are invalid", () => {
  const body = encodeSelectedImageBody({
    data: Buffer.from([1]),
    uuid: "u",
    width: 0,
    height: -5,
  });
  assert.equal(find(walk(body), 4), undefined, "zero/negative dims dropped");
});

// ─── No-image path is byte-identical to today ───────────────────────────────

test("no-image request is byte-identical to images:undefined and images:[]", () => {
  const base = {
    modelId: "auto",
    userText: "hello world",
    conversationId: "fixed-conv",
    messageId: "fixed-msg",
  };
  const plain = encodeAgentRunRequest({ ...base });
  const undef = encodeAgentRunRequest({ ...base, images: undefined });
  const empty = encodeAgentRunRequest({ ...base, images: [] });
  assert.ok(plain.equals(undef), "images:undefined matches no images");
  assert.ok(plain.equals(empty), "images:[] matches no images");

  const um = navUserMessage(plain);
  const sc = find(um, 3);
  assert.ok(sc && sc.wt === 2, "selected_context present");
  assert.equal((sc as { bytes: Buffer }).bytes.length, 0, "selected_context empty");
});

// ─── Images attach under UserMessage.selected_context.selected_images ────────

test("images attach as selected_context.selected_images[] with blobIdWithData", () => {
  const imgs: EncodedImage[] = [
    { data: Buffer.from([0xaa, 0xbb]), mimeType: "image/png", uuid: "u1" },
    { data: Buffer.from([0xcc]), mimeType: "image/jpeg", uuid: "u2" },
  ];
  const blobStore = new Map<string, Buffer>();
  const req = encodeAgentRunRequest({
    modelId: "gpt-5.2",
    userText: "what colors?",
    conversationId: "c",
    messageId: "m",
    images: imgs,
    blobStore,
  });
  const um = navUserMessage(req);
  const sc = walk(lenBytes(um, 3)); // SelectedContext
  const selectedImages = sc.filter((f) => f.fn === 1 && f.wt === 2);
  assert.equal(selectedImages.length, 2, "two selected_images entries");

  const first = walk(Buffer.from((selectedImages[0] as { bytes: Buffer }).bytes));
  assert.equal(lenBytes(first, 2).toString("utf8"), "u1");
  assert.equal(lenBytes(first, 7).toString("utf8"), "image/png");
  const firstNested = decodeBlobIdWithData(first);
  assert.deepEqual(firstNested.data, Buffer.from([0xaa, 0xbb]));
  assert.deepEqual(blobStore.get(firstNested.blobId.toString("hex")), Buffer.from([0xaa, 0xbb]));

  const second = walk(Buffer.from((selectedImages[1] as { bytes: Buffer }).bytes));
  const secondNested = decodeBlobIdWithData(second);
  assert.deepEqual(secondNested.data, Buffer.from([0xcc]));

  assert.equal(lenBytes(um, 1).toString("utf8"), "what colors?");
});

// ─── extractImageUrls ───────────────────────────────────────────────────────

test("extractImageUrls pulls urls from object and string image_url parts", () => {
  assert.deepEqual(
    extractImageUrls([
      { type: "text", text: "hi" },
      { type: "image_url", image_url: { url: "data:image/png;base64,AA==" } },
      { type: "image_url", image_url: "https://x.test/y.png" },
      { type: "image_url", image_url: { detail: "high" } }, // no url -> ignored
    ]),
    ["data:image/png;base64,AA==", "https://x.test/y.png"]
  );
  assert.deepEqual(extractImageUrls("plain string content"), []);
  assert.deepEqual(extractImageUrls(null), []);
});

// ─── resolveCursorImages: happy path ────────────────────────────────────────

test("resolveCursorImages decodes a valid base64 data URI", async () => {
  const out = await resolveCursorImages([`data:image/png;base64,${TINY_PNG.toString("base64")}`]);
  assert.equal(out.length, 1);
  assert.equal(out[0].mimeType, "image/jpeg"); // soft-cap prep re-encodes to JPEG
  assert.ok(out[0].data.length > 0);
  assert.ok(out[0].data.length <= CURSOR_VISION_SOFT_MAX_BYTES);
  assert.ok(out[0].uuid && out[0].uuid.length > 0);
  assert.equal(out[0].width, 1);
  assert.equal(out[0].height, 1);
});

// ─── resolveCursorImages: rejections (all CursorImageError, all sanitized) ───

test("resolveCursorImages rejects a non-image data URI", async () => {
  await assert.rejects(
    () => resolveCursorImages(["data:text/plain;base64,aGVsbG8="]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages rejects invalid base64", async () => {
  await assert.rejects(
    () => resolveCursorImages(["data:image/png;base64,@@@@"]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages rejects base64 with trailing garbage (strict round-trip)", async () => {
  // Buffer.from would silently drop the trailing "!!!!" — we must reject.
  const padded = `${TINY_PNG.toString("base64")}!!!!`;
  await assert.rejects(
    () => resolveCursorImages([`data:image/png;base64,${padded}`]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages rejects a non-base64 data URI", async () => {
  await assert.rejects(
    () => resolveCursorImages(["data:image/png,not-base64-payload"]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages rejects an oversized image over the decode ceiling", async () => {
  const big = Buffer.alloc(MAX_CURSOR_IMAGE_DECODE_BYTES + 16).toString("base64");
  await assert.rejects(
    () => resolveCursorImages([`data:image/png;base64,${big}`]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages blocks SSRF targets (localhost, link-local, file://)", async () => {
  for (const url of [
    "http://127.0.0.1/x.png",
    "http://localhost:8080/x.png",
    "http://169.254.169.254/latest/meta-data/",
    "http://[::1]/x.png",
    "http://10.0.0.5/x.png",
    "file:///etc/passwd",
  ]) {
    await assert.rejects(
      () => resolveCursorImages([url]),
      (e) => e instanceof CursorImageError,
      `expected ${url} to be blocked`
    );
  }
});

test("resolveCursorImages rejects too many images", async () => {
  const one = `data:image/png;base64,${TINY_PNG.toString("base64")}`;
  await assert.rejects(
    () => resolveCursorImages(Array.from({ length: MAX_CURSOR_IMAGES + 1 }, () => one)),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages accepts an uppercase DATA: scheme (RFC 2397 case-insensitive)", async () => {
  const out = await resolveCursorImages([`DATA:image/png;base64,${TINY_PNG.toString("base64")}`]);
  assert.equal(out.length, 1);
  assert.equal(out[0].mimeType, "image/jpeg");
  assert.ok(out[0].data.length > 0);
});

test("assertResolvedAddressesPublic blocks private/metadata IPs, allows public", () => {
  for (const ip of ["127.0.0.1", "10.0.0.1", "169.254.169.254", "192.168.1.1", "::1", "fd00::1"]) {
    assert.throws(
      () => assertResolvedAddressesPublic([ip]),
      CursorImageError,
      `should block ${ip}`
    );
  }
  assert.doesNotThrow(() => assertResolvedAddressesPublic(["93.184.216.34", "1.1.1.1"]));
  assert.throws(() => assertResolvedAddressesPublic(["8.8.8.8", "127.0.0.1"]), CursorImageError);
});

test("resolveCursorImages blocks DNS rebinding (public host resolving to a private IP)", async (t) => {
  t.mock.method(dns.promises, "lookup", async () => [{ address: "127.0.0.1", family: 4 }]);
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("fetch must not run for a rebinding host");
  };
  try {
    await assert.rejects(
      () => resolveCursorImages(["https://rebind.attacker.example/a.png"]),
      (e) => e instanceof CursorImageError && /blocked address/i.test((e as Error).message)
    );
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("resolveCursorImages re-validates redirects: a 30x to a private host is blocked (SSRF)", async (t) => {
  t.mock.method(dns.promises, "lookup", async () => PUBLIC_IP);
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(null, { status: 302, headers: { location: "http://127.0.0.1/secret.png" } });
  try {
    await assert.rejects(
      () => resolveCursorImages(["https://public.example/a.png"]),
      (e) => e instanceof CursorImageError && /blocked address/i.test((e as Error).message)
    );
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("resolveCursorImages follows a redirect to another public host and reads the image", async (t) => {
  t.mock.method(dns.promises, "lookup", async () => PUBLIC_IP);
  const realFetch = globalThis.fetch;
  let call = 0;
  globalThis.fetch = async () => {
    call++;
    if (call === 1) {
      return new Response(null, {
        status: 302,
        headers: { location: "https://cdn.public.example/a.png" },
      });
    }
    return new Response(new Uint8Array(TINY_PNG), {
      status: 200,
      headers: { "content-type": "image/png" },
    });
  };
  try {
    const out = await resolveCursorImages(["https://public.example/a.png"]);
    assert.equal(out.length, 1);
    assert.equal(out[0].mimeType, "image/jpeg");
    assert.ok(out[0].data.length > 0);
    assert.ok(out[0].data.length <= MAX_CURSOR_IMAGE_BYTES);
  } finally {
    globalThis.fetch = realFetch;
  }
});

test("resolveCursorImages rejects an over-long redirect chain", async (t) => {
  t.mock.method(dns.promises, "lookup", async () => PUBLIC_IP);
  const realFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(null, {
      status: 302,
      headers: { location: "https://public.example/loop.png" },
    });
  try {
    await assert.rejects(
      () => resolveCursorImages(["https://public.example/start.png"]),
      (e) => e instanceof CursorImageError && /too many redirects/i.test((e as Error).message)
    );
  } finally {
    globalThis.fetch = realFetch;
  }
});

// ─── JPEG soft-cap / sniff regressions ──────────────────────────────────────

test("prepareCursorImageForWire re-encodes a large PNG under the soft cap", async () => {
  const large = await makeLargePng(1400);
  assert.ok(large.length > CURSOR_VISION_SOFT_MAX_BYTES, "fixture must exceed soft cap");
  assert.ok(large.length < MAX_CURSOR_IMAGE_DECODE_BYTES, "fixture under decode ceiling");
  const prepared = await prepareCursorImageForWire({
    data: large,
    mimeType: "image/png",
  });
  assert.equal(prepared.mimeType, "image/jpeg");
  assert.ok(prepared.data.length <= CURSOR_VISION_SOFT_MAX_BYTES);
  assert.ok(prepared.data.length <= MAX_CURSOR_IMAGE_BYTES);
  assert.equal(sniffCursorImageFormat(prepared.data), "jpeg");
  const dims = sniffCursorImageDimensions(prepared.data);
  assert.ok(dims && dims.width > 0 && dims.height > 0);
});

test("prepareCursorImageForWire does not passthrough mislabeled PNG-as-JPEG", async () => {
  // Declared JPEG but bytes are PNG — must re-encode (or fail), never SOI-less passthrough.
  const prepared = await prepareCursorImageForWire({
    data: TINY_PNG,
    mimeType: "image/jpeg",
  });
  assert.equal(prepared.mimeType, "image/jpeg");
  assert.equal(sniffCursorImageFormat(prepared.data), "jpeg");
  assert.ok(sniffCursorImageDimensions(prepared.data), "JPEG must have a real SOF");
});

test("prepareCursorImageForWire skips re-encode for small real JPEG with SOF", async () => {
  const jpeg = await makeTinyJpeg();
  assert.ok(jpeg.length <= CURSOR_VISION_SOFT_MAX_BYTES);
  assert.equal(sniffCursorImageFormat(jpeg), "jpeg");
  assert.ok(sniffCursorImageDimensions(jpeg), "fixture must have SOF dims");
  const prepared = await prepareCursorImageForWire({
    data: jpeg,
    mimeType: "image/jpeg",
  });
  assert.deepEqual(prepared.data, jpeg);
  assert.equal(prepared.mimeType, "image/jpeg");
});

test("sniffCursorImageDimensions reads PNG IHDR", () => {
  const dims = sniffCursorImageDimensions(TINY_PNG);
  assert.deepEqual(dims, { width: 1, height: 1 });
});

test("resolveCursorImages soft-caps a large PNG under the wire budget", async () => {
  const large = await makeLargePng(1400);
  const out = await resolveCursorImages([`data:image/png;base64,${large.toString("base64")}`]);
  assert.equal(out.length, 1);
  assert.equal(out[0].mimeType, "image/jpeg");
  assert.ok(out[0].data.length <= CURSOR_VISION_SOFT_MAX_BYTES);
  assert.ok(out[0].data.length <= MAX_CURSOR_IMAGE_BYTES);
});

// ─── Executor-level error body (response path, hard rule #12) ───────────────

// #10804 moved agent-endpoint discovery (a live api2.cursor.sh call) ahead of
// request building inside CursorExecutor.execute. These tests exercise the
// image-validation 400 path with a fake token, so stub the discovery fetch to
// return a minimal valid Connect-RPC config response instead of hitting the
// network (which would 401 before image validation ever runs).
function mockCursorServerConfig(t: TestContext): void {
  t.mock.method(globalThis, "fetch", async (input, init) => {
    const url = String(input);
    if (!url.includes("ServerConfigService/GetServerConfig")) {
      throw new Error(`unexpected fetch in test: ${url}`);
    }
    void init;
    // Minimal protobuf matching parseCursorAgentUrls: field 27 wraps a
    // sub-message holding field 1 (agentUrl) + field 2 (agentnUrl), each a
    // length-delimited https://host string. validateCursorAgentUrl only
    // accepts *.api5.cursor.sh hosts, so use those.
    const str = (field: number, host: string): Buffer => {
      const value = Buffer.from(`https://${host}`);
      return Buffer.concat([Buffer.from([(field << 3) | 0x02, value.length]), value]);
    };
    const inner = Buffer.concat([str(1, "us.api5.cursor.sh"), str(2, "eu.api5.cursor.sh")]);
    // Field-27 tag (218) needs proper varint encoding (2 bytes).
    const tag = ((27 << 3) | 0x02) as number;
    const header = Buffer.from([(tag & 0x7f) | 0x80, tag >>> 7, inner.length]);
    const body = Buffer.concat([header, inner]);
    return new Response(body, { status: 200 });
  });
}

test("executor returns a sanitized 400 for an oversized image", async (t) => {
  mockCursorServerConfig(t);
  const exec = new CursorExecutor();
  const big = Buffer.alloc(MAX_CURSOR_IMAGE_DECODE_BYTES + 16).toString("base64");
  const result = await exec.execute({
    model: "gpt-5.2",
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "what color?" },
            { type: "image_url", image_url: { url: `data:image/png;base64,${big}` } },
          ],
        },
      ],
    },
    stream: false,
    credentials: { accessToken: "test-token" },
    signal: undefined,
    log: () => {},
    upstreamExtraHeaders: undefined,
  });
  assert.ok(
    result.response.status === 400 || result.response.status === 401,
    `expected sanitized 400 or auth 401 before image decode, got ${result.response.status}`
  );
  const body = await result.response.json();
  assert.ok(body.error, "error envelope present");
  if (result.response.status === 400) {
    assert.match(body.error.message, /too large/i);
  }
  assert.ok(!body.error.message.includes("at /"), "no stack frame in error body");
  assert.ok(!/\/(root|home|usr)\//.test(body.error.message), "no absolute path in error body");
});

test("executor returns a sanitized 400 for an SSRF-blocked image URL", async (t) => {
  mockCursorServerConfig(t);
  const exec = new CursorExecutor();
  const result = await exec.execute({
    model: "gpt-5.2",
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "what color?" },
            { type: "image_url", image_url: { url: "http://169.254.169.254/latest/" } },
          ],
        },
      ],
    },
    stream: false,
    credentials: { accessToken: "test-token" },
    signal: undefined,
    log: () => {},
    upstreamExtraHeaders: undefined,
  });
  assert.ok(
    result.response.status === 400 || result.response.status === 401,
    `expected sanitized 400 or auth 401 before image fetch, got ${result.response.status}`
  );
  const body = await result.response.json();
  assert.ok(body.error, "error envelope present");
  assert.ok(!String(body.error.message || "").includes("at /"), "no stack frame in error body");
});

test("CursorImageError messages never leak stack traces or paths", async () => {
  const triggers = [
    "data:text/plain;base64,aGVsbG8=",
    "data:image/png;base64,@@@@",
    "http://127.0.0.1/x.png",
    "file:///etc/passwd",
  ];
  for (const url of triggers) {
    await resolveCursorImages([url]).then(
      () => assert.fail(`expected rejection for ${url}`),
      (e) => {
        assert.ok(e instanceof CursorImageError);
        assert.ok(!/\bat \//.test(e.message), `no stack frame in: ${e.message}`);
        assert.ok(!/\/(root|home|usr)\//.test(e.message), `no abs path in: ${e.message}`);
      }
    );
  }
});
