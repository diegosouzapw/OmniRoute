import test from "node:test";
import assert from "node:assert/strict";
import {
  encodeSelectedImageBody,
  encodeAgentRunRequest,
  type EncodedImage,
} from "../../open-sse/utils/cursorAgentProtobuf";
import dns from "node:dns";
import {
  resolveCursorImages,
  extractImageUrls,
  assertResolvedAddressesPublic,
  CursorImageError,
  MAX_CURSOR_IMAGE_BYTES,
  MAX_CURSOR_IMAGES,
} from "../../open-sse/utils/cursorImages";
import { CursorExecutor } from "../../open-sse/executors/cursor";

// A public IP for mocking DNS so the redirect tests (which use non-resolvable
// example hostnames) pass the DNS-rebinding gate.
const PUBLIC_IP = [{ address: "93.184.216.34", family: 4 }];

// ─── Minimal protobuf field walker (test-only) ──────────────────────────────
// Mirrors the production decoder enough to assert field layout without exposing
// the internal decodeFields helper.
type WalkField =
  | { fn: number; wt: 0; varint: bigint }
  | { fn: number; wt: 2; bytes: Buffer };

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

// Navigate AgentClientMessage(1) -> AgentRunRequest -> action(2) ->
// ConversationAction -> user_message_action(1) -> UserMessageAction ->
// user_message(1) -> UserMessage.
function navUserMessage(req: Buffer): WalkField[] {
  const acm = walk(req);
  const arr = walk(lenBytes(acm, 1));
  const action = walk(lenBytes(arr, 2));
  const uma = walk(lenBytes(action, 1));
  return walk(lenBytes(uma, 1));
}

// ─── encodeSelectedImageBody field layout ───────────────────────────────────

test("encodeSelectedImageBody emits uuid(2), dimension(4), mime_type(7), data(8)", () => {
  const data = Buffer.from([1, 2, 3, 4, 5]);
  const body = encodeSelectedImageBody({
    data,
    mimeType: "image/png",
    width: 10,
    height: 20,
    uuid: "abc-123",
  });
  const fields = walk(body);

  assert.equal(lenBytes(fields, 2).toString("utf8"), "abc-123"); // uuid
  const dim = walk(lenBytes(fields, 4)); // dimension submessage
  assert.equal(Number((find(dim, 1) as { varint: bigint }).varint), 10); // width
  assert.equal(Number((find(dim, 2) as { varint: bigint }).varint), 20); // height
  assert.equal(lenBytes(fields, 7).toString("utf8"), "image/png"); // mime_type
  assert.deepEqual(lenBytes(fields, 8), data); // inline data (oneof case)
});

test("encodeSelectedImageBody omits dimension/mime_type when not provided", () => {
  const body = encodeSelectedImageBody({ data: Buffer.from([9]), uuid: "u" });
  const fields = walk(body);
  assert.equal(find(fields, 4), undefined, "no dimension");
  assert.equal(find(fields, 7), undefined, "no mime_type");
  assert.ok(find(fields, 2), "uuid present");
  assert.deepEqual(lenBytes(fields, 8), Buffer.from([9]), "data present");
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

  // And selected_context (field 3) is present but empty in the no-image case.
  const um = navUserMessage(plain);
  const sc = find(um, 3);
  assert.ok(sc && sc.wt === 2, "selected_context present");
  assert.equal((sc as { bytes: Buffer }).bytes.length, 0, "selected_context empty");
});

// ─── Images attach under UserMessage.selected_context.selected_images ────────

test("images attach as selected_context.selected_images[] with inline data", () => {
  const imgs: EncodedImage[] = [
    { data: Buffer.from([0xaa, 0xbb]), mimeType: "image/png", uuid: "u1" },
    { data: Buffer.from([0xcc]), mimeType: "image/jpeg", uuid: "u2" },
  ];
  const req = encodeAgentRunRequest({
    modelId: "gpt-5.2",
    userText: "what colors?",
    conversationId: "c",
    messageId: "m",
    images: imgs,
  });
  const um = navUserMessage(req);
  const sc = walk(lenBytes(um, 3)); // SelectedContext
  const selectedImages = sc.filter((f) => f.fn === 1 && f.wt === 2);
  assert.equal(selectedImages.length, 2, "two selected_images entries");

  const first = walk(Buffer.from((selectedImages[0] as { bytes: Buffer }).bytes));
  assert.equal(lenBytes(first, 2).toString("utf8"), "u1");
  assert.equal(lenBytes(first, 7).toString("utf8"), "image/png");
  assert.deepEqual(lenBytes(first, 8), Buffer.from([0xaa, 0xbb]));

  const second = walk(Buffer.from((selectedImages[1] as { bytes: Buffer }).bytes));
  assert.deepEqual(lenBytes(second, 8), Buffer.from([0xcc]));

  // UserMessage.text (field 1) still carries the prompt text alongside images.
  assert.equal(lenBytes(um, 1).toString("utf8"), "what colors?");
});

// ─── extractImageUrls ───────────────────────────────────────────────────────

test("extractImageUrls pulls urls from object and string image_url parts", () => {
  assert.deepEqual(
    extractImageUrls([
      { type: "text", text: "hi" },
      { type: "image_url", image_url: { url: "data:image/png;base64,AA" } },
      { type: "image_url", image_url: "https://x.test/y.png" },
      { type: "image_url", image_url: { detail: "high" } }, // no url -> ignored
    ]),
    ["data:image/png;base64,AA", "https://x.test/y.png"]
  );
  assert.deepEqual(extractImageUrls("plain string content"), []);
  assert.deepEqual(extractImageUrls(null), []);
});

// ─── resolveCursorImages: happy path ────────────────────────────────────────

test("resolveCursorImages decodes a valid base64 data URI", async () => {
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const out = await resolveCursorImages([`data:image/png;base64,${png.toString("base64")}`]);
  assert.equal(out.length, 1);
  assert.deepEqual(out[0].data, png);
  assert.equal(out[0].mimeType, "image/png");
  assert.ok(out[0].uuid && out[0].uuid.length > 0);
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

test("resolveCursorImages rejects a non-base64 data URI", async () => {
  await assert.rejects(
    () => resolveCursorImages(["data:image/png,not-base64-payload"]),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages rejects an oversized image (>1 MiB)", async () => {
  const big = Buffer.alloc(MAX_CURSOR_IMAGE_BYTES + 16).toString("base64");
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
  const one = "data:image/png;base64,AAAA";
  await assert.rejects(
    () => resolveCursorImages(Array.from({ length: MAX_CURSOR_IMAGES + 1 }, () => one)),
    (e) => e instanceof CursorImageError
  );
});

test("resolveCursorImages accepts an uppercase DATA: scheme (RFC 2397 case-insensitive)", async () => {
  const png = Buffer.from([137, 80, 78, 71]);
  const out = await resolveCursorImages([`DATA:image/png;base64,${png.toString("base64")}`]);
  assert.equal(out.length, 1);
  assert.deepEqual(out[0].data, png);
  assert.equal(out[0].mimeType, "image/png");
});

test("assertResolvedAddressesPublic blocks private/metadata IPs, allows public", () => {
  for (const ip of ["127.0.0.1", "10.0.0.1", "169.254.169.254", "192.168.1.1", "::1", "fd00::1"]) {
    assert.throws(() => assertResolvedAddressesPublic([ip]), CursorImageError, `should block ${ip}`);
  }
  assert.doesNotThrow(() => assertResolvedAddressesPublic(["93.184.216.34", "1.1.1.1"]));
  // A single private answer among public ones still blocks (DNS-rebinding).
  assert.throws(() => assertResolvedAddressesPublic(["8.8.8.8", "127.0.0.1"]), CursorImageError);
});

test("resolveCursorImages blocks DNS rebinding (public host resolving to a private IP)", async (t) => {
  t.mock.method(dns.promises, "lookup", async () => [{ address: "127.0.0.1", family: 4 }]);
  const realFetch = globalThis.fetch;
  // fetch should never be reached — the DNS gate blocks first.
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
  // fetch() follows redirects by default; the resolver uses redirect:"manual"
  // and re-validates each hop. A public URL that 302s to 127.0.0.1 must be
  // blocked, not followed.
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
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
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
    return new Response(new Uint8Array(png), {
      status: 200,
      headers: { "content-type": "image/png" },
    });
  };
  try {
    const out = await resolveCursorImages(["https://public.example/a.png"]);
    assert.equal(out.length, 1);
    assert.deepEqual(out[0].data, png);
    assert.equal(out[0].mimeType, "image/png");
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

// ─── Executor-level error body (response path, hard rule #12) ───────────────

test("executor returns a sanitized 400 for an oversized image", async () => {
  // buildRequest throws CursorImageError before any network/session/DB work,
  // so this stays fully offline (no token needed).
  const exec = new CursorExecutor();
  const big = Buffer.alloc(MAX_CURSOR_IMAGE_BYTES + 16).toString("base64");
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
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.ok(body.error, "error envelope present");
  assert.match(body.error.message, /too large/i);
  // No stack-trace / source-path leakage in the response body (hard rule #12).
  assert.ok(!body.error.message.includes("at /"), "no stack frame in error body");
  assert.ok(!/\/(root|home|usr)\//.test(body.error.message), "no absolute path in error body");
});

test("executor returns a sanitized 400 for an SSRF-blocked image URL", async () => {
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
  assert.equal(result.response.status, 400);
  const body = await result.response.json();
  assert.ok(!body.error.message.includes("at /"), "no stack frame in error body");
});

test("CursorImageError messages never leak stack traces or paths", async () => {
  // Every rejection message must be a clean human string (no "at /" frames,
  // no absolute paths) so the executor's sanitized 400 body stays clean
  // (hard rule #12).
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
