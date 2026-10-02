/**
 * Regression guard for the T06 route-validation gate on the proxy-subscriptions
 * management routes.
 *
 * `POST /api/v1/management/proxy-subscriptions` and
 * `PATCH /api/v1/management/proxy-subscriptions/:id` used to hand-roll their body
 * parsing (a local `parsePayload()` / inline field-by-field checks) instead of a
 * Zod schema, which `scripts/check/check-route-validation.mjs` flags as an
 * unvalidated `request.json()` usage. The fix swaps both routes to
 * `proxySubscriptionCreateSchema` / `proxySubscriptionUpdateSchema`
 * (`src/lib/proxySubscription/schema.ts`) applied via `.safeParse()`.
 *
 * These tests pin the EXACT pre-existing acceptance/rejection rules, error
 * messages, and `{ error: string }` envelope shape — the schema swap must be a
 * pure refactor, not a behavior change.
 *
 * DB/auth setup mirrors tests/unit/api-malformed-json-400.test.ts: a temp
 * DATA_DIR with no configured password means requireManagementAuth() is a
 * no-op, so the handlers run unauthenticated.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-sub-route-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "proxy-sub-route-test-secret";
delete process.env.INITIAL_PASSWORD; // ensure auth is NOT required

const core = await import("../../src/lib/db/core.ts");
const collectionRoute =
  await import("../../src/app/api/v1/management/proxy-subscriptions/route.ts");
const itemRoute = await import("../../src/app/api/v1/management/proxy-subscriptions/[id]/route.ts");

function jsonRequest(url: string, body: unknown, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function malformedJsonRequest(url: string, method = "POST"): Request {
  return new Request(url, {
    method,
    headers: { "content-type": "application/json" },
    body: "not-json",
  });
}

async function createValidSubscription(name: string) {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name,
    url: `https://example.com/${name}`,
  });
  const res = await collectionRoute.POST(req);
  assert.equal(res.status, 201, "fixture creation must succeed");
  return (await res.json()) as { id: string };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

// ═════════════════════════════════════════════════════════════════════════════
// POST /api/v1/management/proxy-subscriptions
// ═════════════════════════════════════════════════════════════════════════════

test("POST proxy-subscriptions — valid body still creates (201), unregressed happy path", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "my-sub",
    url: "https://example.com/sub.txt",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 201);
  const body = (await res.json()) as { name?: string; url?: string; mode?: string };
  assert.equal(body.name, "my-sub");
  assert.equal(body.url, "https://example.com/sub.txt");
  assert.equal(body.mode, "global", "mode defaults to 'global' when omitted");
});

test("POST proxy-subscriptions — trims name/url and coerces unknown mode to 'global'", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "  padded-name  ",
    url: "  https://example.com/padded  ",
    mode: "not-a-real-mode",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 201);
  const body = (await res.json()) as { name?: string; url?: string; mode?: string };
  assert.equal(body.name, "padded-name");
  assert.equal(body.url, "https://example.com/padded");
  assert.equal(body.mode, "global");
});

test("POST proxy-subscriptions — malformed JSON body returns 400 with the original message", async () => {
  const req = malformedJsonRequest("http://localhost/api/v1/management/proxy-subscriptions");
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("POST proxy-subscriptions — valid-JSON non-object (string) body returns 400 'Invalid JSON body'", async () => {
  // A bare JSON array is still `typeof === "object"` in JS (matching the original
  // `typeof body !== "object"` guard), so it falls through to the missing-name
  // check instead — see the array-body test below for that path. A primitive
  // (string/number/boolean) is the one JSON shape that actually trips this guard.
  const req = jsonRequest(
    "http://localhost/api/v1/management/proxy-subscriptions",
    "just-a-string"
  );
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("POST proxy-subscriptions — a JSON array body is an 'object' in JS, so it hits 'name is required' (not 'Invalid JSON body')", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", [1, 2, 3]);
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "name is required");
});

test("POST proxy-subscriptions — missing name returns 400 'name is required'", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    url: "https://example.com/sub.txt",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "name is required");
});

test("POST proxy-subscriptions — blank name (whitespace only) returns 400 'name is required'", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "   ",
    url: "https://example.com/sub.txt",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "name is required");
});

test("POST proxy-subscriptions — missing url returns 400 'url is required' (checked after name)", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "my-sub",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "url is required");
});

test("POST proxy-subscriptions — mode 'rule' without ruleProviders returns 400", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "my-sub",
    url: "https://example.com/sub.txt",
    mode: "rule",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "ruleProviders is required when mode is 'rule'");
});

test("POST proxy-subscriptions — mode 'rule' with an empty ruleProviders array returns 400", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "my-sub",
    url: "https://example.com/sub.txt",
    mode: "rule",
    ruleProviders: [],
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "ruleProviders is required when mode is 'rule'");
});

test("POST proxy-subscriptions — mode 'rule' with ruleProviders succeeds (201)", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "rule-sub",
    url: "https://example.com/rule-sub.txt",
    mode: "rule",
    ruleProviders: ["openai", 42, "anthropic"],
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 201);
  const body = (await res.json()) as { mode?: string; ruleProviders?: string[] };
  assert.equal(body.mode, "rule");
  assert.deepEqual(
    body.ruleProviders,
    ["openai", "anthropic"],
    "non-string ruleProviders entries are filtered out, matching the original parser"
  );
});

test("POST proxy-subscriptions — invalid updateIntervalMinutes silently falls back to 60", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "interval-sub",
    url: "https://example.com/interval-sub.txt",
    updateIntervalMinutes: "not-a-number",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 201);
  const body = (await res.json()) as { updateIntervalMinutes?: number };
  assert.equal(body.updateIntervalMinutes, 60);
});

test("POST proxy-subscriptions — enabled must be exactly `true`, not truthy", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "enabled-sub",
    url: "https://example.com/enabled-sub.txt",
    enabled: "yes",
  });
  const res = await collectionRoute.POST(req);

  assert.equal(res.status, 201);
  const body = (await res.json()) as { enabled?: boolean };
  assert.equal(body.enabled, false);
});

// ═════════════════════════════════════════════════════════════════════════════
// PATCH /api/v1/management/proxy-subscriptions/:id
// ═════════════════════════════════════════════════════════════════════════════

test("PATCH proxy-subscriptions/:id — valid partial body updates (200), unregressed happy path", async () => {
  const fixture = await createValidSubscription("patch-target");
  const req = jsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    { name: "renamed" },
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });

  assert.equal(res.status, 200);
  const body = (await res.json()) as { name?: string };
  assert.equal(body.name, "renamed");
});

test("PATCH proxy-subscriptions/:id — wrong-typed fields are ignored, not rejected", async () => {
  const fixture = await createValidSubscription("patch-wrongtype");
  const req = jsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    { name: "kept", updateIntervalMinutes: "not-a-number", enabled: "yes" },
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });

  assert.equal(res.status, 200, "unknown-typed fields must be silently dropped, not a 400");
  const body = (await res.json()) as {
    name?: string;
    updateIntervalMinutes?: number;
    enabled?: boolean;
  };
  assert.equal(body.name, "kept");
  assert.equal(body.updateIntervalMinutes, 60, "untouched — non-number was ignored, not coerced");
  assert.equal(body.enabled, false, "untouched — non-boolean was ignored");
});

test("PATCH proxy-subscriptions/:id — malformed JSON body returns 400 'Invalid JSON body'", async () => {
  const fixture = await createValidSubscription("patch-malformed");
  const req = malformedJsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("PATCH proxy-subscriptions/:id — valid-JSON non-object body returns 400 'Invalid JSON body'", async () => {
  const fixture = await createValidSubscription("patch-nonobject");
  const req = jsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    "just-a-string",
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });

  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("PATCH proxy-subscriptions/:id — a JSON array body is an 'object' in JS, so it's a no-op update (200), not 400", async () => {
  const fixture = await createValidSubscription("patch-arraybody");
  const req = jsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    [1, 2, 3],
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });

  assert.equal(
    res.status,
    200,
    "matches the original inline parser: no typed field matches, no error"
  );
  const body = (await res.json()) as { name?: string };
  assert.equal(body.name, "patch-arraybody", "name is unchanged — the array had no usable fields");
});

test("PATCH proxy-subscriptions/:id — unknown id still 404s past body validation", async () => {
  const req = jsonRequest(
    "http://localhost/api/v1/management/proxy-subscriptions/does-not-exist",
    { name: "whatever" },
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: "does-not-exist" }) });

  assert.equal(res.status, 404);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Subscription not found");
});

test("POST proxy-subscriptions — five bad coreConfigPath values return 400 with reason", async () => {
  const bad: Array<[string, string]> = [
    ["relative/path.json", "not_absolute"],
    ["/adopted/../escape.json", "dotdot_segment"],
    ["no-extension", "not_absolute"],
    [`/${"a".repeat(2000)}.json`, "too_long"],
    ["\0null.json", "nul_byte"],
  ];
  for (const [coreConfigPath, reason] of bad) {
    const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
      name: `bad-path-${reason}`,
      url: "https://example.com/feed",
      coreConfigPath,
    });
    const res = await collectionRoute.POST(req);
    assert.equal(res.status, 400, `expected 400 for ${reason}`);
    const body = (await res.json()) as { error?: string };
    assert.ok(
      body.error === `coreConfigPath is not allowed (${reason})`,
      `unexpected message: ${body.error}`
    );
  }
});

test("POST proxy-subscriptions — absolute non-json path returns 400 bad_extension", async () => {
  const req = jsonRequest("http://localhost/api/v1/management/proxy-subscriptions", {
    name: "bad-ext",
    url: "https://example.com/feed",
    coreConfigPath: "/adopted/core.txt",
  });
  const res = await collectionRoute.POST(req);
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "coreConfigPath is not allowed (bad_extension)");
});

test("PATCH proxy-subscriptions/:id — bad coreConfigPath returns 400", async () => {
  const fixture = await createValidSubscription("patch-bad-path");
  const req = jsonRequest(
    `http://localhost/api/v1/management/proxy-subscriptions/${fixture.id}`,
    { coreConfigPath: "relative.json" },
    "PATCH"
  );
  const res = await itemRoute.PATCH(req, { params: Promise.resolve({ id: fixture.id }) });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "coreConfigPath is not allowed (not_absolute)");
});
// ═════════════════════════════════════════════════════════════════════════════
// coreBinaryPath — the binary is executed, so the API never accepts it (Hard Rule #15);
// it comes from OMNIROUTE_PROXY_CORE_BINARY_PATH on the host only
// ═════════════════════════════════════════════════════════════════════════════

const COLLECTION_URL = "http://localhost/api/v1/management/proxy-subscriptions";

async function listedNames(): Promise<string[]> {
  const res = await collectionRoute.GET(new Request(COLLECTION_URL));
  return ((await res.json()) as { items: Array<{ name: string }> }).items.map((it) => it.name);
}

test("POST proxy-subscriptions — a coreBinaryPath in the body is refused (400) and nothing is created", async () => {
  for (const [index, value] of [
    "/usr/bin/sing-box",
    "/tmp/attacker/sing-box",
    "relative/sing-box",
    "",
    null,
  ].entries()) {
    const name = `core-binary-refused-${index}`;
    const res = await collectionRoute.POST(
      jsonRequest(COLLECTION_URL, {
        name,
        url: "https://example.com/sub.txt",
        coreBinaryPath: value,
      })
    );
    assert.equal(res.status, 400, String(value));
    const body = (await res.json()) as { error?: string };
    assert.match(body.error ?? "", /coreBinaryPath cannot be set through the API/);
    assert.match(body.error ?? "", /OMNIROUTE_PROXY_CORE_BINARY_PATH/);
    assert.ok(!(await listedNames()).includes(name), `${name} must not be created`);
  }
});

test("PATCH proxy-subscriptions/:id — a coreBinaryPath in the body is refused (400) and nothing changes", async () => {
  const fixture = await createValidSubscription("core-binary-patch-refused");
  const res = await itemRoute.PATCH(
    jsonRequest(
      `${COLLECTION_URL}/${fixture.id}`,
      { name: "renamed-by-refused-patch", coreBinaryPath: "/tmp/attacker/sing-box" },
      "PATCH"
    ),
    { params: Promise.resolve({ id: fixture.id }) }
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.match(body.error ?? "", /coreBinaryPath cannot be set through the API/);

  const names = await listedNames();
  assert.ok(names.includes("core-binary-patch-refused"));
  assert.ok(!names.includes("renamed-by-refused-patch"));
});

test("proxy-subscription records never carry a coreBinaryPath field", async () => {
  const fixture = await createValidSubscription("core-binary-absent-field");
  const res = await itemRoute.GET(new Request(`${COLLECTION_URL}/${fixture.id}`), {
    params: Promise.resolve({ id: fixture.id }),
  });
  assert.equal(res.status, 200);
  assert.ok(!("coreBinaryPath" in ((await res.json()) as Record<string, unknown>)));
});
