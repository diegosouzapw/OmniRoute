import { test } from "node:test";
import assert from "node:assert";
import {
  computeMaxaiDocId,
  maxaiDocType,
  parseInlineDataUrl,
  extractCurrentTurnDocs,
  buildUploadMultipart,
  sawUploadDone,
  uploadMaxaiDocument,
  resolveMaxaiDocList,
} from "../../open-sse/executors/maxai/documents.ts";
import { __setMaxaiConstantsForTest } from "../../open-sse/executors/maxai/constantsStore.ts";
import { MOCK_CONSTANTS, MOCK_DOC_ID_KEY } from "./helpers/maxaiMockConstants.ts";

// Doc uploads sign like any request, so seed the in-process constants memo with
// MOCK values instead of mocking the bundle fetch. Nothing real is committed.
const DOC_ID_KEY = MOCK_DOC_ID_KEY;
__setMaxaiConstantsForTest(MOCK_CONSTANTS);

const AUTH = {
  accessToken: "tok-abc",
  userId: "11111111-1111-4111-8111-111111111111",
  deviceId: "22222222-2222-4222-8222-222222222222",
};

// --- doc_id (content-addressed HMAC-SHA1) --------------------------------

test("computeMaxaiDocId is a stable HMAC-SHA1(bytes, key) hex digest", () => {
  // Cross-checked shape: HMAC-SHA1 hex is 40 chars; deterministic for same input.
  const id = computeMaxaiDocId(Buffer.from("hello world"), DOC_ID_KEY);
  assert.equal(id.length, 40);
  assert.match(id, /^[0-9a-f]{40}$/);
  assert.equal(computeMaxaiDocId(Buffer.from("hello world"), DOC_ID_KEY), id);
  // Different key or bytes → different id.
  assert.notEqual(id, computeMaxaiDocId(Buffer.from("hello world"), "different-key"));
  assert.notEqual(id, computeMaxaiDocId(Buffer.from("other"), DOC_ID_KEY));
});

test("computeMaxaiDocId requires a key (never hashes with a guess)", () => {
  assert.throws(() => computeMaxaiDocId(Buffer.from("x"), ""));
});

// --- doc_type classification --------------------------------------------

test("maxaiDocType classifies pdf / code / text", () => {
  assert.equal(maxaiDocType("report.pdf", "application/pdf"), "page_content__pdf");
  assert.equal(maxaiDocType("script.py", "text/x-python"), "chat_file_code");
  assert.equal(maxaiDocType("main.ts", "text/plain"), "chat_file_code");
  assert.equal(maxaiDocType("notes.txt", "text/plain"), "chat_file");
  assert.equal(maxaiDocType("data.csv", "text/csv"), "chat_file");
});

// --- data-url parsing ----------------------------------------------------

test("parseInlineDataUrl decodes base64 + plain data urls", () => {
  const b64 = parseInlineDataUrl("data:text/plain;base64,aGVsbG8="); // "hello"
  assert.equal(b64?.mimeType, "text/plain");
  assert.equal(b64?.bytes.toString("utf8"), "hello");

  const plain = parseInlineDataUrl("data:text/plain,hi%20there");
  assert.equal(plain?.bytes.toString("utf8"), "hi there");

  assert.equal(parseInlineDataUrl("https://example.com/x.pdf"), null);
  assert.equal(parseInlineDataUrl("data:text/plain;base64,"), null); // empty
  assert.equal(parseInlineDataUrl(42), null);
});

// --- extract inline docs from the current turn --------------------------

test("extractCurrentTurnDocs handles OpenAI file, Responses input_file, Claude document", () => {
  const docs = extractCurrentTurnDocs([
    { role: "system", content: "sys" },
    {
      role: "user",
      content: [
        { type: "text", text: "review these" },
        {
          type: "file",
          file: { filename: "a.txt", file_data: "data:text/plain;base64,QQ==" }, // "A"
        },
        { type: "input_file", filename: "b.md", file_data: "data:text/markdown;base64,Qg==" }, // "B"
        {
          type: "document",
          title: "c.pdf",
          source: { type: "base64", media_type: "application/pdf", data: "Qw==" }, // "C"
        },
      ],
    },
  ]);
  assert.equal(docs.length, 3);
  assert.equal(docs[0].filename, "a.txt");
  assert.equal(docs[0].bytes.toString("utf8"), "A");
  assert.equal(docs[1].filename, "b.md");
  assert.equal(docs[2].filename, "c.pdf");
  assert.equal(docs[2].mimeType, "application/pdf");
});

test("extractCurrentTurnDocs returns [] for a plain-text turn", () => {
  assert.deepEqual(extractCurrentTurnDocs([{ role: "user", content: "just text" }]), []);
});

test("extractCurrentTurnDocs ignores image_url and remote-url file parts", () => {
  const docs = extractCurrentTurnDocs([
    {
      role: "user",
      content: [
        { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
        { type: "file", file: { filename: "x.pdf", file_data: "https://example.com/x.pdf" } },
      ],
    },
  ]);
  assert.deepEqual(docs, []); // image handled by vision path; remote url not an inline upload
});

// --- multipart body ------------------------------------------------------

test("buildUploadMultipart includes all required fields + the file bytes", () => {
  const doc = { filename: "notes.txt", mimeType: "text/plain", bytes: Buffer.from("secret data") };
  const body = buildUploadMultipart(doc, "docid123", "chat_file", "BOUND").toString("utf8");
  assert.ok(body.includes('name="doc_id"\r\n\r\ndocid123'));
  assert.ok(body.includes('name="doc_type"\r\n\r\nchat_file'));
  assert.ok(body.includes('name="pure_text"\r\n\r\nsecret data')); // textual -> pure_text filled
  assert.ok(body.includes('name="tokens"'));
  assert.ok(body.includes('name="doc_type_dependent_data"\r\n\r\n{}'));
  assert.ok(body.includes('name="file"; filename="notes.txt"'));
  assert.ok(body.includes("Content-Type: text/plain"));
  assert.ok(body.trimEnd().endsWith("--BOUND--"));
});

test("buildUploadMultipart leaves pure_text empty for binary (pdf)", () => {
  const doc = { filename: "r.pdf", mimeType: "application/pdf", bytes: Buffer.from([1, 2, 3, 4]) };
  const body = buildUploadMultipart(doc, "id", "page_content__pdf", "B").toString("latin1");
  assert.ok(body.includes('name="pure_text"\r\n\r\n\r\n')); // empty value
});

// --- SSE done detection --------------------------------------------------

test("sawUploadDone detects the terminal event", () => {
  assert.equal(sawUploadDone('data: {"event":"upload_done","data":{"doc_id":"x"}}'), true);
  assert.equal(sawUploadDone('data: {"event":"upload_to_s3"}'), false);
});

// --- upload (mocked fetch) ----------------------------------------------

test("uploadMaxaiDocument returns a doc_list entry on upload_done", async () => {
  let hitUrl = "";
  let hitContentType = "";
  const fetchImpl = (async (url: string, init: RequestInit) => {
    hitUrl = url;
    hitContentType = (init.headers as Record<string, string>)["Content-Type"];
    return {
      ok: true,
      status: 200,
      async text() {
        return 'data: {"event":"upload_done","data":{"doc_id":"srv"}}\n';
      },
    } as unknown as Response;
  }) as unknown as typeof fetch;

  const entry = await uploadMaxaiDocument(
    { filename: "a.txt", mimeType: "text/plain", bytes: Buffer.from("hi") },
    AUTH,
    { fetchImpl }
  );
  assert.ok(entry);
  assert.equal(entry!.doc_id, computeMaxaiDocId(Buffer.from("hi"), DOC_ID_KEY));
  assert.equal(entry!.doc_type, "chat_file");
  assert.equal(entry!.file_name, "a.txt");
  assert.match(hitUrl, /\/app\/upload_document$/);
  assert.match(hitContentType, /^multipart\/form-data; boundary=/);
});

test("uploadMaxaiDocument returns null on a non-200 (best-effort)", async () => {
  const fetchImpl = (async () =>
    ({ ok: false, status: 400, async text() { return "bad"; } }) as unknown as Response) as unknown as typeof fetch;
  const entry = await uploadMaxaiDocument(
    { filename: "a.txt", mimeType: "text/plain", bytes: Buffer.from("hi") },
    AUTH,
    { fetchImpl }
  );
  assert.equal(entry, null);
});

test("resolveMaxaiDocList uploads all current-turn docs, skips failures", async () => {
  let call = 0;
  const fetchImpl = (async () => {
    call += 1;
    // first upload succeeds, second fails
    if (call === 1) {
      return { ok: true, status: 200, async text() { return '{"event":"upload_done"}'; } } as unknown as Response;
    }
    return { ok: false, status: 500, async text() { return ""; } } as unknown as Response;
  }) as unknown as typeof fetch;

  const list = await resolveMaxaiDocList(
    [
      {
        role: "user",
        content: [
          { type: "file", file: { filename: "a.txt", file_data: "data:text/plain;base64,QQ==" } },
          { type: "file", file: { filename: "b.txt", file_data: "data:text/plain;base64,Qg==" } },
        ],
      },
    ],
    AUTH,
    { fetchImpl }
  );
  assert.equal(list.length, 1); // one succeeded, one skipped
  assert.equal(list[0].file_name, "a.txt");
});

test("resolveMaxaiDocList returns [] when there are no inline docs", async () => {
  const list = await resolveMaxaiDocList([{ role: "user", content: "hi" }], AUTH, {
    fetchImpl: (async () => ({ ok: true, status: 200, async text() { return ""; } }) as unknown as Response) as unknown as typeof fetch,
  });
  assert.deepEqual(list, []);
});
