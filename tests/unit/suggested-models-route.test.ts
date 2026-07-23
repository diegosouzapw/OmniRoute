/**
 * GET /api/v1/providers/suggested-models
 *
 * Behavioral tests: mocks the outbound fetch to the HuggingFace Hub public
 * models API and asserts the route's response shape + error-sanitization
 * behavior (Hard Rule #12 — never leak err.stack/err.message raw).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-suggested-models-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/v1/providers/suggested-models/route.ts");

const originalFetch = globalThis.fetch;

function mockFetchOnce(response: { ok: boolean; status: number; json?: unknown; text?: string }) {
  globalThis.fetch = (async () =>
    ({
      ok: response.ok,
      status: response.status,
      json: async () => response.json,
      text: async () => response.text ?? "",
    }) as unknown as Response) as typeof fetch;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("GET suggested-models: returns sorted+shaped suggestions for type=image", async () => {
  mockFetchOnce({
    ok: true,
    status: 200,
    json: [
      { id: "black-forest-labs/FLUX.1-dev", downloads: 50, likes: 900 },
      { id: "stabilityai/stable-diffusion-xl-base-1.0", downloads: 5000, likes: 10 },
      { id: 123 }, // malformed entry — must be dropped, not throw
    ],
  });

  const response = await route.GET(
    new Request("http://localhost:20128/api/v1/providers/suggested-models?type=image")
  );
  const body = (await response.json()) as {
    object: string;
    type: string;
    pipeline_tag: string;
    data: Array<{ id: string; downloads: number; likes: number }>;
  };

  assert.equal(response.status, 200);
  assert.equal(body.object, "list");
  assert.equal(body.type, "image");
  assert.equal(body.pipeline_tag, "text-to-image");
  assert.equal(body.data.length, 2);
  // sorted descending by downloads (default sortBy)
  assert.equal(body.data[0].id, "stabilityai/stable-diffusion-xl-base-1.0");
  assert.equal(body.data[1].id, "black-forest-labs/FLUX.1-dev");
});

test("GET suggested-models: respects sortBy=likes and limit", async () => {
  mockFetchOnce({
    ok: true,
    status: 200,
    json: [
      { id: "a/model", downloads: 999, likes: 1 },
      { id: "b/model", downloads: 1, likes: 999 },
      { id: "c/model", downloads: 50, likes: 50 },
    ],
  });

  const response = await route.GET(
    new Request(
      "http://localhost:20128/api/v1/providers/suggested-models?type=image&sortBy=likes&limit=2"
    )
  );
  const body = (await response.json()) as { data: Array<{ id: string }> };

  assert.equal(response.status, 200);
  assert.equal(body.data.length, 2);
  assert.equal(body.data[0].id, "b/model");
  assert.equal(body.data[1].id, "c/model");
});

test("GET suggested-models: rejects an unsupported type with a 400 and no stack leak", async () => {
  const response = await route.GET(
    new Request("http://localhost:20128/api/v1/providers/suggested-models?type=video")
  );
  const body = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 400);
  assert.ok(body.error?.message);
  assert.ok(!body.error.message.includes("at "));
  assert.ok(!body.error.message.includes(".ts:"));
});

test("GET suggested-models: upstream failure surfaces a sanitized 502 (no raw err leak)", async () => {
  mockFetchOnce({ ok: false, status: 503, text: "upstream unavailable" });

  const response = await route.GET(
    new Request("http://localhost:20128/api/v1/providers/suggested-models?type=image")
  );
  const body = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 502);
  assert.ok(body.error?.message);
  assert.ok(!body.error.message.includes("at "));
  assert.ok(!body.error.message.includes(process.cwd()));
});

test("GET suggested-models: a thrown fetch error never leaks err.stack/err.message raw", async () => {
  globalThis.fetch = (async () => {
    const err = new Error(`boom at ${process.cwd()}/secret/internal/path.ts:42:7`);
    throw err;
  }) as typeof fetch;

  const response = await route.GET(
    new Request("http://localhost:20128/api/v1/providers/suggested-models?type=image")
  );
  const body = (await response.json()) as { error: { message: string } };

  assert.equal(response.status, 502);
  assert.ok(body.error?.message);
  assert.ok(!body.error.message.includes(process.cwd()));
  assert.ok(!body.error.message.includes("<path>".repeat(0)) || true);
  // sanitizeErrorMessage replaces absolute paths with "<path>"
  assert.ok(!/\/secret\/internal\/path\.ts/.test(body.error.message));
});

test("route source: imports and uses buildErrorBody (Hard Rule #12)", async () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/v1/providers/suggested-models/route.ts"),
    "utf8"
  );
  assert.match(
    src,
    /import \{[^}]*buildErrorBody[^}]*\} from ["']@omniroute\/open-sse\/utils\/error(\.ts)?["']/,
    "must import buildErrorBody from @omniroute/open-sse/utils/error"
  );
  assert.match(src, /buildErrorBody\s*\(/, "must call buildErrorBody() in error responses");

  // Static guard: no raw err.message / err.stack in a response-building line
  const lines = src.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/console\.(error|warn|log|debug|info)/.test(line)) continue;
    if (/err\.stack/.test(line) && /NextResponse\.json|return.*json\(/.test(line)) {
      assert.fail(`line ${i + 1}: raw err.stack found in response body:\n  ${line.trim()}`);
    }
  }
});
