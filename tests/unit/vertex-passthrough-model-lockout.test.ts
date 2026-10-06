// Regression guard: after adding passthroughModels: true to Vertex's registry entry, a 404 on
// one Vertex model (e.g. a stale/synthetic model id) must lock out only that model, not cool
// down the whole connection — mirrors the existing ollama-cloud/bedrock protection. Before this
// fix, hasPerModelQuota("vertex", ...) was false, so any 404 on Vertex cooled the whole
// connection for COOLDOWN_MS.notFound (2 minutes), per errorConfig.ts's generic status_404 rule.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vertex-404-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedVertex() {
  return providersDb.createProviderConnection({
    provider: "vertex",
    authType: "apikey",
    apiKey: "vertex-key",
    isActive: true,
    testStatus: "active",
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test('hasPerModelQuota("vertex", ...) is true after the passthroughModels registry flag', () => {
  assert.equal(accountFallback.hasPerModelQuota("vertex", "claude-sonnet-5"), true);
});

test("404 on one Vertex model locks only that model, connection stays active", async () => {
  await resetStorage();
  const conn = await seedVertex();

  const result = await auth.markAccountUnavailable(
    conn.id,
    404,
    "model not found",
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout?.reason, "not_found");

  // A sibling model on the same connection must remain immediately eligible.
  const sibling = accountFallback.getModelLockoutInfo("vertex", conn.id, "gemini-3.1-pro-preview");
  assert.equal(sibling, null);
});

test("503 on one Vertex model locks only that model, connection stays active (proves the fix isn't 404-specific)", async () => {
  // hasPerModelQuota's gate covers status === 404 || status === 429 || status >= 500
  // (auth.ts:2024) in one shared branch — 502/503/504 keep the model-lockout path (only
  // the exact 500 is exempted per #5976). This mirrors the 404 test above with a 5xx to
  // confirm passthroughModels doesn't just fix the specific 404 symptom reported.
  await resetStorage();
  const conn = await seedVertex();

  const result = await auth.markAccountUnavailable(
    conn.id,
    503,
    "Service Unavailable",
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout?.reason, "server_error");

  const sibling = accountFallback.getModelLockoutInfo("vertex", conn.id, "gemini-3.1-pro-preview");
  assert.equal(sibling, null);
});

test("403 PERMISSION_DENIED on Vertex locks only that model too (accepted trade-off, see plan)", async () => {
  await resetStorage();
  const conn = await seedVertex();

  // Google Cloud uses the literal "PERMISSION_DENIED" status name for BOTH a
  // model-specific denial and a connection-wide IAM/API-disabled failure — this
  // fix cannot distinguish them (no live Vertex credential test in this plan), so
  // it intentionally treats both as a per-model lockout post-passthroughModels.
  const result = await auth.markAccountUnavailable(
    conn.id,
    403,
    "PERMISSION_DENIED: the caller does not have permission",
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout?.reason, "forbidden");
});

// ── 403 disambiguation via google.rpc.ErrorInfo (Task 7) ────────────────────
// Google Cloud's documented error format (https://cloud.google.com/apis/design/errors#error_info)
// lets us tell a genuinely connection-wide PERMISSION_DENIED (API disabled, or a
// project-level IAM denial) apart from one scoped to a single model — the former must
// fall through to the existing connection-wide cooldown instead of the #3027 per-model
// lockout path, since a per-model lockout would leave a broken connection "active".

test("403 with SERVICE_DISABLED ErrorInfo reason cools down the whole Vertex connection", async () => {
  await resetStorage();
  const conn = await seedVertex();

  const body = JSON.stringify({
    error: {
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "SERVICE_DISABLED",
          domain: "googleapis.com",
          metadata: { service: "aiplatform.googleapis.com", consumer: "projects/12345" },
        },
      ],
    },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    403,
    body,
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "unavailable");
  assert.ok(after.rateLimitedUntil, "connection must be cooled down, not left active");

  // The #3027 per-model lockout path must NOT have run.
  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout, null);
});

test("403 with IAM_PERMISSION_DENIED reason and a model-scoped resource still locks only that model", async () => {
  await resetStorage();
  const conn = await seedVertex();

  const body = JSON.stringify({
    error: {
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "IAM_PERMISSION_DENIED",
          domain: "iam.googleapis.com",
          metadata: {
            permission: "aiplatform.endpoints.predict",
            resource:
              "projects/12345/locations/us-central1/publishers/google/models/claude-sonnet-5",
          },
        },
      ],
    },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    403,
    body,
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");

  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout?.reason, "forbidden");
});

test("403 with IAM_PERMISSION_DENIED reason and a project-level resource cools down the whole connection", async () => {
  await resetStorage();
  const conn = await seedVertex();

  const body = JSON.stringify({
    error: {
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "IAM_PERMISSION_DENIED",
          domain: "iam.googleapis.com",
          metadata: {
            permission: "aiplatform.googleapis.com/models.predict",
            resource: "projects/12345",
          },
        },
      ],
    },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    403,
    body,
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "unavailable");
  assert.ok(after.rateLimitedUntil, "connection must be cooled down, not left active");

  const lockout = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout, null);
});

test("multi-detail error body correlates reason+resource per-detail, not across details", async () => {
  // Adversarial case: detail[0] has a model-scoped resource under an unrelated reason,
  // detail[1] carries the actual IAM_PERMISSION_DENIED with a project-level resource. A
  // naive independent-regex scan would match detail[0]'s resource against detail[1]'s
  // reason and wrongly conclude "model-scoped" — this must resolve to connection-wide.
  await resetStorage();
  const conn = await seedVertex();

  const body = JSON.stringify({
    error: {
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "SOME_OTHER_REASON",
          domain: "iam.googleapis.com",
          metadata: {
            resource:
              "projects/12345/locations/us-central1/publishers/google/models/claude-sonnet-5",
          },
        },
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "IAM_PERMISSION_DENIED",
          domain: "iam.googleapis.com",
          metadata: {
            permission: "aiplatform.googleapis.com/models.predict",
            resource: "projects/12345",
          },
        },
      ],
    },
  });

  const result = await auth.markAccountUnavailable(
    conn.id,
    403,
    body,
    "vertex",
    "claude-sonnet-5-high"
  );
  assert.equal(result.shouldFallback, true);

  const after2 = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after2.testStatus, "unavailable");
  assert.ok(after2.rateLimitedUntil, "connection must be cooled down, not left active");

  const lockout2 = accountFallback.getModelLockoutInfo("vertex", conn.id, "claude-sonnet-5-high");
  assert.equal(lockout2, null);
});
