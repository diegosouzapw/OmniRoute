// #8510 (artickc, feat/adobe-firefly-reference-images): route-level coverage for the Adobe
// Firefly branch that /v1/images/edits gained in this PR. Exercises the actual
// POST(request) handler (not the inner handleAdobeFireflyImageGeneration helper directly,
// which tests/unit/adobe-firefly.test.ts already covers) so the credentials /
// rate-limit / 4-reference-cap branches added to route.ts itself are proven, not just the
// downstream service call.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-adobe-firefly-edits-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "adobe-firefly-edits-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const {
  ADOBE_FIREFLY_IMAGE_UPLOAD_URL,
  ADOBE_FIREFLY_IMAGE_SUBMIT_URL,
} = await import("../../open-sse/services/adobeFireflyClient.ts");

interface ErrorResponseBody {
  error: { message: string; code?: string };
}

interface ImageResponseBody {
  data: Array<{ b64_json?: string; url?: string }>;
}

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedAdobeFireflyConnection(
  overrides: { apiKey?: string; rateLimitedUntil?: string | null } = {}
) {
  return providersDb.createProviderConnection({
    provider: "adobe-firefly",
    authType: "apikey",
    name: "adobe-firefly-test",
    apiKey: overrides.apiKey ?? userImsJwt(),
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: overrides.rateLimitedUntil ?? null,
  });
}

// Mirrors tests/unit/adobe-firefly.test.ts's userImsJwt() helper — a synthetic,
// non-guest IMS access token shape so resolveAdobeAccessToken() accepts it directly
// without needing a live cookie->token exchange call.
function userImsJwt(userId = "0EB@AdobeID"): string {
  return (
    `eyJhbGciOiJSUzI1NiJ9.` +
    Buffer.from(
      JSON.stringify({ user_id: userId, type: "access_token", client_id: "clio-playground-web" })
    ).toString("base64url") +
    `.` +
    "sig".padEnd(40, "x")
  );
}

function dataUrlPng(bytes: number[]): string {
  return `data:image/png;base64,${Buffer.from(bytes).toString("base64")}`;
}

const REF_A = dataUrlPng([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 1]);
const REF_B = dataUrlPng([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 2]);

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8510 v1 image edit POST uploads Adobe Firefly reference images and dispatches referenceBlobs", async () => {
  await seedAdobeFireflyConnection();

  const uploadedIds: string[] = [];
  let submitBody: Record<string, unknown> | null = null;

  globalThis.fetch = async (url, init: RequestInit = {}) => {
    const stringUrl = String(url);
    if (stringUrl === ADOBE_FIREFLY_IMAGE_UPLOAD_URL) {
      const id = `blob-${uploadedIds.length + 1}`;
      uploadedIds.push(id);
      return new Response(JSON.stringify({ images: [{ id }] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === ADOBE_FIREFLY_IMAGE_SUBMIT_URL) {
      submitBody = JSON.parse(String(init.body || "{}"));
      return new Response(JSON.stringify({ links: { result: "https://poll.example/job/img1" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === "https://poll.example/job/img1") {
      return new Response(
        JSON.stringify({
          status: "COMPLETED",
          outputs: [{ image: { presignedUrl: "https://cdn.example/edited-out.png" } }],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "adobe-firefly/nano-banana-pro",
        prompt: "combine these two references",
        images: [REF_A, REF_B],
      }),
    })
  );
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.data[0].url, "https://cdn.example/edited-out.png");

  // referenceBlobs upload path: both distinct reference images must have been uploaded
  // to Firefly storage and forwarded as referenceBlobs on the generate-async dispatch.
  assert.equal(uploadedIds.length, 2, "both reference images must be uploaded individually");
  assert.ok(submitBody, "generate-async must have been called");
  const referenceBlobs = (submitBody as Record<string, unknown>).referenceBlobs as Array<{
    id: string;
  }>;
  assert.ok(Array.isArray(referenceBlobs), "generate-async payload must carry referenceBlobs");
  assert.deepEqual(
    referenceBlobs.map((r) => r.id).sort(),
    [...uploadedIds].sort()
  );
});

test("#8510 v1 image edit POST rejects more than 4 Adobe Firefly reference images", async () => {
  await seedAdobeFireflyConnection();
  globalThis.fetch = async () => {
    throw new Error("Over-cap Adobe Firefly reference sets must not reach upstream");
  };

  const images = Array.from({ length: 5 }, (_, i) => dataUrlPng([0x89, 0x50, 0x4e, 0x47, i + 1]));
  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "adobe-firefly/nano-banana-pro",
        prompt: "combine these references",
        images,
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 400);
  assert.match(body.error.message, /Adobe Firefly image edit supports at most 4 reference images/);
  // Hard Rule #12 — every error response routes through buildErrorBody/sanitizeErrorMessage
  // and must never leak a raw stack trace.
  assert.ok(!body.error.message.includes("at /"));
});

test("#8510 v1 image edit POST surfaces missing Adobe Firefly credentials", async () => {
  // No adobe-firefly connection seeded at all.
  globalThis.fetch = async () => {
    throw new Error("Missing-credentials path must not reach upstream");
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "adobe-firefly/nano-banana-pro",
        prompt: "edit this",
        images: [REF_A],
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.match(body.error.message, /No credentials for provider: adobe-firefly/);
  assert.ok(!body.error.message.includes("at /"));
});

test("#8510 v1 image edit POST surfaces Adobe Firefly rate-limit sentinel", async () => {
  await seedAdobeFireflyConnection({ rateLimitedUntil: new Date(Date.now() + 60_000).toISOString() });
  globalThis.fetch = async () => {
    throw new Error("Rate-limited path must not reach upstream");
  };

  const response = await imageEditRoute.POST(
    new Request("http://localhost/api/v1/images/edits", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "adobe-firefly/nano-banana-pro",
        prompt: "edit this",
        images: [REF_A],
      }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 429);
  assert.match(body.error.message, /All accounts rate limited/);
  assert.ok(!body.error.message.includes("at /"));
});
