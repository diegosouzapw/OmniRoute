/**
 * Tests for the management-auth file download endpoint:
 * GET /api/files/{id}/content
 *
 * This route is used by the batch dashboard UI to let admins download
 * batch input/output/error files without needing an OpenAI-compatible API key.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-file-download-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-file-dl";

const core = await import("../../src/lib/db/core.ts");
const localDb = await import("../../src/lib/localDb.ts");
const fileContentRoute = await import("../../src/app/api/files/[id]/content/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── Helper: create a real file in the DB ───────────────────────────────────

function makeFileContent(text: string) {
  return Buffer.from(text);
}

function createTestFile(
  opts: {
    filename?: string;
    content?: Buffer | null;
    mimeType?: string;
  } = {}
) {
  const { filename = "test.jsonl", content = makeFileContent("line1\nline2"), mimeType } = opts;
  return localDb.createFile({
    bytes: content ? content.length : 0,
    filename,
    purpose: "batch",
    content: content ?? undefined,
    mimeType,
  });
}

// ── Auth tests ─────────────────────────────────────────────────────────────

test("GET /api/files/{id}/content — auth not required (default) → file content returned", async () => {
  // By default (no INITIAL_PASSWORD, no password set) auth is skipped,
  // so a plain unauthenticated request should still work.
  const content = makeFileContent("hello batch");
  const file = createTestFile({ filename: "hello.jsonl", content });

  const res = await fileContentRoute.GET(
    new Request(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 200);
  const buf = Buffer.from(await res.arrayBuffer());
  assert.equal(buf.toString(), "hello batch");
});

test("GET /api/files/{id}/content — with management session → 200 and file content", async () => {
  const content = makeFileContent('{"custom_id":"req-1","response":{"status_code":200}}');
  const file = createTestFile({ filename: "output.jsonl", content, mimeType: "application/jsonl" });

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 200);
  const buf = Buffer.from(await res.arrayBuffer());
  assert.equal(buf.toString(), '{"custom_id":"req-1","response":{"status_code":200}}');
});

test("GET /api/files/{id}/content — with management session → content-type header set", async () => {
  const content = makeFileContent("data");
  const file = createTestFile({ filename: "data.jsonl", content, mimeType: "application/jsonl" });

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 200);
  assert.ok(
    res.headers.get("content-type")?.includes("application/jsonl"),
    "content-type should be application/jsonl"
  );
});

test("GET /api/files/{id}/content — content-disposition includes filename", async () => {
  const content = makeFileContent("payload");
  const file = createTestFile({ filename: "my_batch_output.jsonl", content });

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 200);
  const disposition = res.headers.get("content-disposition") ?? "";
  assert.ok(
    disposition.includes("my_batch_output.jsonl"),
    `content-disposition should include filename, got: ${disposition}`
  );
  assert.ok(
    disposition.includes("attachment"),
    `content-disposition should be attachment, got: ${disposition}`
  );
});

test("GET /api/files/{id}/content — fallbacks to octet-stream when no mimeType", async () => {
  const content = makeFileContent("raw");
  const file = createTestFile({ filename: "raw.bin", content, mimeType: undefined });

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 200);
  assert.ok(
    res.headers.get("content-type")?.includes("application/octet-stream"),
    "Should fall back to octet-stream"
  );
});

// ── Not-found tests ────────────────────────────────────────────────────────

test("GET /api/files/{id}/content — unknown file ID returns 404", async () => {
  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest("http://localhost/api/files/file-does-not-exist/content"),
    { params: Promise.resolve({ id: "file-does-not-exist" }) }
  );

  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.error.message, "File not found");
  assert.equal(body.error.type, "invalid_request_error");
});

test("GET /api/files/{id}/content — deleted file returns 404", async () => {
  const content = makeFileContent("will be deleted");
  const file = createTestFile({ filename: "deleted.jsonl", content });

  // Soft-delete the file
  localDb.deleteFile(file.id);

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.error.message, "File not found");
});

test("GET /api/files/{id}/content — file with null content returns 404", async () => {
  // createFile with content=null simulates a file record with no stored bytes
  // (e.g., an expired file where content was cleared)
  const file = localDb.createFile({
    bytes: 0,
    filename: "no-content.jsonl",
    purpose: "batch",
  });

  const res = await fileContentRoute.GET(
    await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
    { params: Promise.resolve({ id: file.id }) }
  );

  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.error.message, "File content not found");
});

// ── Auth enforcement tests (when INITIAL_PASSWORD is set) ─────────────────

test("GET /api/files/{id}/content — unauthenticated request is rejected when auth is required", async () => {
  // Enable auth
  process.env.INITIAL_PASSWORD = "test-password";

  const content = makeFileContent("secret");
  const file = createTestFile({ filename: "secret.jsonl", content });

  try {
    const res = await fileContentRoute.GET(
      new Request(`http://localhost/api/files/${file.id}/content`),
      { params: Promise.resolve({ id: file.id }) }
    );
    assert.notEqual(res.status, 200, "Unauthenticated request should not return 200");
    assert.ok(res.status === 401 || res.status === 403, `Expected 401/403, got ${res.status}`);
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});

test("GET /api/files/{id}/content — management session works when auth is required", async () => {
  process.env.INITIAL_PASSWORD = "test-password";

  const content = makeFileContent("authed content");
  const file = createTestFile({ filename: "authed.jsonl", content });

  try {
    const res = await fileContentRoute.GET(
      await makeManagementSessionRequest(`http://localhost/api/files/${file.id}/content`),
      { params: Promise.resolve({ id: file.id }) }
    );
    assert.equal(res.status, 200);
    const buf = Buffer.from(await res.arrayBuffer());
    assert.equal(buf.toString(), "authed content");
  } finally {
    delete process.env.INITIAL_PASSWORD;
  }
});
