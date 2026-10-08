import { describe, it, before } from "node:test";
import assert from "node:assert";

// `GET /v1/files` fails closed for a caller that is neither an API key nor a
// dashboard session (GHSA-m3hp-hq9g-fpmv), so the HTTP cases below present a
// real key: the subject here is limit validation, not auth.
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "files-limit-validation-secret";

const { createFile, deleteFile } = await import("@/lib/db/files");
const { createApiKey } = await import("@/lib/db/apiKeys");
const { GET, parseFilesListQuery } = await import("@/app/api/v1/files/route");

let authHeaders: Record<string, string> = {};
let apiKeyId = "";

describe("GET /v1/files limit validation", () => {
  before(async () => {
    const key = await createApiKey("files-limit-validation", "machine-files-limit", []);
    apiKeyId = key.id;
    authHeaders = { Authorization: `Bearer ${key.key}` };
  });

  it("defaults to 20 when limit is absent", () => {
    const parsed = parseFilesListQuery(new URLSearchParams("order=asc"));

    assert.equal(parsed.ok, true);
    if (!parsed.ok) return;
    assert.equal(parsed.limit, 20);
  });

  it("parses an explicit positive integer limit", () => {
    const parsed = parseFilesListQuery(new URLSearchParams("limit=2&order=asc&purpose=batch"));

    assert.equal(parsed.ok, true);
    if (!parsed.ok) return;
    assert.equal(parsed.limit, 2);
    assert.equal(parsed.order, "asc");
    assert.equal(parsed.purpose, "batch");
  });

  it("rejects non-integer, zero, and oversized limits", async () => {
    for (const rawLimit of ["abc", "1.5", "-1", "0", "10001"]) {
      const parsed = parseFilesListQuery(
        new URLSearchParams(`limit=${encodeURIComponent(rawLimit)}`)
      );
      assert.equal(parsed.ok, false, `limit=${rawLimit} should be rejected`);
      if (parsed.ok) continue;
      assert.equal(parsed.response.status, 400);
      const body = await parsed.response.json();
      assert.equal(body.error.type, "invalid_request_error");
    }
  });

  it("returns only the requested number of files over HTTP", async () => {
    const created = [
      createFile({
        bytes: 1,
        filename: "test-files-limit-http-a.txt",
        purpose: "assistants",
        content: Buffer.from("a"),
        mimeType: "text/plain",
        apiKeyId,
      }),
      createFile({
        bytes: 1,
        filename: "test-files-limit-http-b.txt",
        purpose: "assistants",
        content: Buffer.from("b"),
        mimeType: "text/plain",
        apiKeyId,
      }),
    ];

    try {
      const response = await GET(
        new Request("http://localhost/v1/files?limit=1&purpose=assistants", {
          headers: authHeaders,
        })
      );
      assert.equal(response.status, 200);
      const body = await response.json();
      assert.equal(body.object, "list");
      assert.equal(body.data.length, 1);
      assert.equal(body.has_more, true);
    } finally {
      for (const file of created) deleteFile(file.id);
    }
  });

  it("returns 400 over HTTP for an invalid limit instead of listing files", async () => {
    const response = await GET(
      new Request("http://localhost/v1/files?limit=-1", { headers: authHeaders })
    );

    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error.type, "invalid_request_error");
  });

  it("rejects an anonymous list with 401 before the limit is even looked at (GHSA-m3hp-hq9g-fpmv)", async () => {
    const response = await GET(new Request("http://localhost/v1/files?limit=1"));

    assert.equal(response.status, 401);
    const body = await response.json();
    assert.equal(body.error.message, "Authentication required");
    assert.equal(body.error.type, "authentication_error");
  });
});
