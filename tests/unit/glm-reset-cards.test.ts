import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-glm-reset-cards-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-glm-reset-cards-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const leasesDb = await import("../../src/lib/db/exclusiveConnectionLeases.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const glmResetCards = await import("../../src/lib/usage/glmResetCards.ts");
const wire = await import("../../open-sse/services/usage/glmResetCards.ts");
const glmProvider = await import("../../open-sse/config/glmProvider.ts");
const proxyFetch = await import("../../open-sse/utils/proxyFetch.ts");
const uiUtils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");

const originalFetch = globalThis.fetch;

/** The exact envelope z.ai returns for an account with no cards banked. */
const EMPTY_LIST_ENVELOPE = {
  code: 200,
  msg: "Operation successful",
  data: {
    customerId: 75751781508272646,
    targetType: "PERSONAL",
    organizationId: null,
    projectId: null,
    lastFiveHourResetTime: null,
    lastWeekResetTime: "2026-09-04 18:39:23",
    fiveHourResets: [],
    weekResets: [],
  },
  success: true,
};

function listEnvelopeWith(overrides: Record<string, unknown>) {
  return {
    ...EMPTY_LIST_ENVELOPE,
    data: { ...EMPTY_LIST_ENVELOPE.data, ...overrides },
  };
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createGlmConnection(overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Reset ${Date.now()} ${Math.random()}`,
    apiKey: "glm-test-key",
    ...overrides,
  });
}

test.beforeEach(async () => {
  globalThis.fetch = originalFetch;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("parseGlmResetCards reports no cards for an account with both buckets empty", () => {
  const parsed = wire.parseGlmResetCards(EMPTY_LIST_ENVELOPE);
  assert.equal(parsed.availableCount, 0);
  assert.deepEqual(parsed.cards, []);
  assert.equal(parsed.lastWeekResetAt, "2026-09-04 18:39:23");
  assert.equal(parsed.lastFiveHourResetAt, null);
});

test("parseGlmResetCards derives the reset window from the bucket it came from", () => {
  const parsed = wire.parseGlmResetCards(
    listEnvelopeWith({
      fiveHourResets: [{ recordId: 111 }],
      weekResets: [{ recordId: 124128 }],
    })
  );

  assert.equal(parsed.availableCount, 2);
  assert.deepEqual(
    parsed.cards.map((card) => [card.id, card.resetType]),
    [
      ["111", "FIVE_HOUR"],
      ["124128", "WEEK"],
    ]
  );
});

test("parseGlmResetCards prefers an explicit resetType and skips entries without an id", () => {
  const parsed = wire.parseGlmResetCards(
    listEnvelopeWith({
      fiveHourResets: [{ recordId: 222, resetType: "WEEK" }, { packageName: "no id here" }],
    })
  );

  assert.equal(parsed.availableCount, 1);
  assert.equal(parsed.cards[0].resetType, "WEEK");
});

test("z.ai envelopes fail closed despite an HTTP 200 status line", () => {
  // Observed live: no auth header → code 1001, bad Bearer token → code 401.
  const missingAuth = { code: 1001, msg: "Authentication parameter not received in Header" };
  const badToken = { code: 401, msg: "token expired or incorrect", success: false };

  for (const malformed of [
    null,
    "<html>upstream error</html>",
    {},
    { code: 200 },
    { code: 200, success: "true" },
    { code: "200", success: true },
    { code: 201, success: true },
  ]) {
    assert.equal(wire.isGlmResetCardEnvelopeOk(malformed), false);
  }
  assert.equal(wire.isGlmResetCardEnvelopeOk(missingAuth), false);
  assert.equal(wire.isGlmResetCardEnvelopeOk(badToken), false);
  assert.equal(wire.isGlmResetCardEnvelopeOk(EMPTY_LIST_ENVELOPE), true);
  assert.equal(wire.isGlmResetCardEnvelopeOk({ code: 0, success: true }), true);
  assert.equal(wire.isGlmResetCardListEnvelopeOk(EMPTY_LIST_ENVELOPE), true);
  assert.equal(wire.isGlmResetCardListEnvelopeOk({ code: 200, success: true }), false);
  assert.equal(wire.isGlmResetCardListEnvelopeOk({ code: 200, success: true, data: null }), false);
  assert.equal(wire.isGlmResetCardListEnvelopeOk({ code: 200, success: true, data: {} }), false);
  assert.equal(
    wire.isGlmResetCardListEnvelopeOk(listEnvelopeWith({ fiveHourResets: undefined })),
    false
  );

  assert.equal(wire.getGlmResetCardEnvelopeStatus(missingAuth, 200), 401);
  assert.equal(wire.getGlmResetCardEnvelopeStatus(badToken, 200), 401);
  assert.equal(wire.getGlmResetCardEnvelopeMessage(badToken), "token expired or incorrect");
});

test("parseGlmResetCards filters unavailable cards and orders usable cards by expiry", () => {
  const parsed = wire.parseGlmResetCards(
    listEnvelopeWith({
      fiveHourResets: [
        { recordId: 1, status: "consumed", expireTime: "2099-01-01 00:00:00" },
        { recordId: 2, available: false, expireTime: "2099-01-01 00:00:00" },
        { recordId: 3, consumed: true, expireTime: "2099-01-01 00:00:00" },
        { recordId: 4, expireTime: "2000-01-01 00:00:00" },
        { recordId: 5, expireTime: "2099-03-01 00:00:00" },
        { recordId: 6, expireTime: "not-a-date" },
      ],
      weekResets: [
        { recordId: 7, status: "redeeming", expireTime: "2099-01-01 00:00:00" },
        { recordId: 8, redeemed: true, expireTime: "2099-01-01 00:00:00" },
        { recordId: 9, expireTime: "2099-02-01T00:00:00Z" },
      ],
    })
  );

  assert.equal(parsed.availableCount, 3);
  assert.deepEqual(
    parsed.cards.map((card) => card.id),
    ["9", "5", "6"]
  );
});

test("buildGlmResetCardFetch targets the right host, path and headers per region", () => {
  const list = glmProvider.buildGlmResetCardFetch("key-1", undefined, "list");
  assert.equal(
    list.url,
    "https://api.z.ai/api/biz/customer-package-reset/list?targetType=PERSONAL"
  );
  assert.equal(list.headers.Authorization, "Bearer key-1");
  assert.equal(list.headers["Content-Type"], undefined);

  const use = glmProvider.buildGlmResetCardFetch("key-1", { apiRegion: "china" }, "use");
  assert.equal(use.url, "https://open.bigmodel.cn/api/biz/customer-package-reset/use");
  assert.equal(use.headers["Content-Type"], "application/json");

  const team = glmProvider.buildGlmResetCardFetch(
    "key-1",
    { glmOrganizationId: "org-1", glmProjectId: "proj-1" },
    "list"
  );
  assert.equal(team.headers["bigmodel-organization"], "org-1");
  assert.equal(team.headers["bigmodel-project"], "proj-1");
});

test("consumeGlmResetCard redeems the listed card with z.ai's wire body, then refreshes usage", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  const calls: Array<{ url: string; init: RequestInit }> = [];

  globalThis.fetch = async (url, init = {}) => {
    const href = String(url);
    calls.push({ url: href, init });

    if (href.includes("/customer-package-reset/list")) {
      assert.equal((init.headers as Record<string, string>).Authorization, "Bearer glm-test-key");
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124128 }] }));
    }

    if (href.includes("/customer-package-reset/use")) {
      assert.deepEqual(JSON.parse(String(init.body)), {
        targetType: "PERSONAL",
        resetType: "WEEK",
        recordId: 124128,
        requestId: "redeem-1",
      });
      return json({ code: 200, msg: "Operation successful", data: 124128, success: true });
    }

    if (href.includes("/monitor/usage/quota/limit")) {
      return json({
        code: 200,
        success: true,
        data: { limits: [{ type: "CREDIT_LIMIT", unit: 3, number: 5, percentage: 0 }] },
      });
    }

    return new Response("unexpected", { status: 500 });
  };

  const result = await glmResetCards.consumeGlmResetCard(connection.id, "redeem-1");

  assert.equal(result.outcome, "reset");
  assert.ok(
    calls.some((call) => call.url.includes("/customer-package-reset/use")),
    "expected the redemption call to be issued"
  );
});

test("GLM reset-card list and redemption run inside the assigned proxy context", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  const server = net.createServer((socket) => socket.destroy());
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");

  await settingsDb.setProxyForLevel("key", connection.id, {
    type: "http",
    host: "127.0.0.1",
    port: address.port,
  });

  const sources: string[] = [];
  globalThis.fetch = async (url) => {
    sources.push(proxyFetch.resolveProxyForRequest(String(url)).source);
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124141 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({ code: 200, success: true, data: 124141 });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  try {
    const listed = await glmResetCards.listGlmResetCards(connection.id);
    assert.equal(listed.availableCount, 1);
    await glmResetCards.consumeGlmResetCard(connection.id, "redeem-proxied", "124141");
    assert.ok(sources.length >= 3);
    assert.ok(sources.every((source) => source === "context"));
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});

test("an unreachable assigned proxy blocks GLM reset-card requests before direct fallback", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  const server = net.createServer();
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const deadPort = address.port;
  await new Promise<void>((resolve) => server.close(() => resolve()));

  await settingsDb.setProxyForLevel("key", connection.id, {
    type: "http",
    host: "127.0.0.1",
    port: deadPort,
  });

  const sources: string[] = [];
  globalThis.fetch = async (url) => {
    sources.push(proxyFetch.resolveProxyForRequest(String(url)).source);
    return new Promise<Response>(() => {});
  };

  await assert.rejects(
    () => glmResetCards.listGlmResetCards(connection.id),
    (error: unknown) => {
      assert.ok(error instanceof glmResetCards.GlmResetCardError);
      assert.equal(error.status, 503);
      assert.equal(error.code, "proxy_unreachable");
      assert.equal(error.message, "The connection proxy is unreachable.");
      assert.doesNotMatch(error.message, /127\.0\.0\.1|:\d{2,5}/);
      return true;
    }
  );
  assert.deepEqual(sources, ["context"], "an unreachable proxy must never retry directly");
});

test("GLM reset-card requests remain direct when no proxy is configured", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let source: string | null = null;
  globalThis.fetch = async (url) => {
    source = proxyFetch.resolveProxyForRequest(String(url)).source;
    return json(EMPTY_LIST_ENVELOPE);
  };

  await glmResetCards.listGlmResetCards(connection.id);
  assert.equal(source, "direct");
});

test("an unproxied GLM connection does not inherit an ambient proxy context", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let source: string | null = null;
  globalThis.fetch = async (url) => {
    source = proxyFetch.resolveProxyForRequest(String(url)).source;
    return json(EMPTY_LIST_ENVELOPE);
  };

  await proxyFetch.runWithProxyContext({ type: "vercel", host: "ambient-proxy.invalid" }, () =>
    glmResetCards.listGlmResetCards(connection.id)
  );

  assert.equal(source, "direct");
});

test("consumeGlmResetCard atomically fences the connection while the wire operation is active", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let releaseList!: () => void;
  let listStarted!: () => void;
  const started = new Promise<void>((resolve) => {
    listStarted = resolve;
  });
  const blockedList = new Promise<void>((resolve) => {
    releaseList = resolve;
  });

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      listStarted();
      await blockedList;
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124142 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({ code: 200, success: true, data: 124142 });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  const redemption = glmResetCards.consumeGlmResetCard(connection.id, "redeem-fenced");
  await started;

  const competingLease = leasesDb.acquireExclusiveConnectionLease({
    leaseOwnerId: `vlo_${"a".repeat(43)}`,
    apiKeyId: "test-competing-key",
    provider: "glm",
    connectionId: connection.id,
  });
  assert.equal(competingLease.kind, "CONNECTION_BUSY");

  releaseList();
  assert.equal((await redemption).outcome, "reset");
});

test("consumeGlmResetCard releases its operation lease after success and failure", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let failList = false;

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      if (failList) throw new Error("list transport failed");
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124143 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({ code: 200, success: true, data: 124143 });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  await glmResetCards.consumeGlmResetCard(connection.id, "redeem-release-success");
  failList = true;
  await assert.rejects(() => glmResetCards.listGlmResetCards(connection.id));

  const competingLease = leasesDb.acquireExclusiveConnectionLease({
    leaseOwnerId: `vlo_${"b".repeat(43)}`,
    apiKeyId: "test-after-operation",
    provider: "glm",
    connectionId: connection.id,
  });
  assert.equal(competingLease.kind, "ACQUIRED");
  if (competingLease.kind === "ACQUIRED") {
    leasesDb.releaseExclusiveConnectionLease({
      leaseOwnerId: `vlo_${"b".repeat(43)}`,
      generation: competingLease.lease.generation,
      apiKeyId: "test-after-operation",
    });
  }
});

test("consumeGlmResetCard reports committed success when usage refresh fails", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let uses = 0;

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124129 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      uses += 1;
      return json({ code: 200, msg: "Operation successful", data: 124129, success: true });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      throw new Error("quota refresh unavailable");
    }
    return new Response("unexpected", { status: 500 });
  };

  const result = await glmResetCards.consumeGlmResetCard(connection.id, "redeem-refresh-fails");
  assert.equal(result.outcome, "reset");
  assert.equal(result.refreshPending, true);
  assert.equal(uses, 1);
});

test("consumeGlmResetCard coalesces concurrent requests with one idempotency key", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let lists = 0;
  let uses = 0;

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      lists += 1;
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124130 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      uses += 1;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return json({ code: 200, msg: "Operation successful", data: 124130, success: true });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  const [first, second] = await Promise.all([
    glmResetCards.consumeGlmResetCard(connection.id, "redeem-concurrent"),
    glmResetCards.consumeGlmResetCard(connection.id, "redeem-concurrent"),
  ]);
  assert.deepEqual(second, first);
  assert.equal(lists, 1);
  assert.equal(uses, 1);
});

test("consumeGlmResetCard coalesces a duplicate that arrives after lease acquisition", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  let releaseList!: () => void;
  let listStarted!: () => void;
  let lists = 0;
  let uses = 0;
  const started = new Promise<void>((resolve) => {
    listStarted = resolve;
  });
  const blockedList = new Promise<void>((resolve) => {
    releaseList = resolve;
  });

  globalThis.fetch = async (url) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      lists += 1;
      listStarted();
      await blockedList;
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124144 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      uses += 1;
      return json({ code: 200, success: true, data: 124144 });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  const first = glmResetCards.consumeGlmResetCard(connection.id, "redeem-late-duplicate");
  await started;
  const second = glmResetCards.consumeGlmResetCard(connection.id, "redeem-late-duplicate");
  releaseList();

  assert.deepEqual(await second, await first);
  assert.equal(lists, 1);
  assert.equal(uses, 1);
});

test("an unproxied redemption ignores an ambient proxy context", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  const sources: string[] = [];

  globalThis.fetch = async (url) => {
    sources.push(proxyFetch.resolveProxyForRequest(String(url)).source);
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124145 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({ code: 200, success: true, data: 124145 });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  await proxyFetch.runWithProxyContext({ type: "vercel", host: "ambient-proxy.invalid" }, () =>
    glmResetCards.consumeGlmResetCard(connection.id, "redeem-direct-context")
  );

  assert.ok(sources.length >= 3);
  assert.ok(sources.every((source) => source === "direct"));
});

test("consumeGlmResetCard retries an ambiguous use with the same card and request id", async () => {
  const connection = (await createGlmConnection()) as { id: string };
  const bodies: unknown[] = [];
  let lists = 0;

  globalThis.fetch = async (url, init = {}) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      lists += 1;
      return json(listEnvelopeWith({ weekResets: [{ recordId: 124131 }] }));
    }
    if (href.includes("/customer-package-reset/use")) {
      bodies.push(JSON.parse(String(init.body)));
      if (bodies.length === 1) throw new Error("response lost after send");
      return json({ code: 200, msg: "Operation successful", data: 124131, success: true });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  await assert.rejects(() =>
    glmResetCards.consumeGlmResetCard(connection.id, "redeem-ambiguous", "124131")
  );
  const result = await glmResetCards.consumeGlmResetCard(
    connection.id,
    "redeem-ambiguous",
    "124131"
  );

  assert.equal(result.outcome, "reset");
  assert.equal(lists, 1, "retry must not relist a card that may already be consumed");
  assert.equal(bodies.length, 2);
  assert.deepEqual(bodies[1], bodies[0]);
});

test("consumeGlmResetCard rejects reuse of an idempotency key for another card", async () => {
  const connection = (await createGlmConnection()) as { id: string };

  globalThis.fetch = async (url, init = {}) => {
    const href = String(url);
    if (href.includes("/customer-package-reset/list")) {
      return json(
        listEnvelopeWith({
          weekResets: [{ recordId: 124132 }, { recordId: 124133 }],
        })
      );
    }
    if (href.includes("/customer-package-reset/use")) {
      return json({
        code: 200,
        msg: "Operation successful",
        data: JSON.parse(String(init.body)).recordId,
        success: true,
      });
    }
    if (href.includes("/monitor/usage/quota/limit")) {
      return json({ code: 200, success: true, data: { limits: [] } });
    }
    return new Response("unexpected", { status: 500 });
  };

  await glmResetCards.consumeGlmResetCard(connection.id, "redeem-conflict", "124132");
  await assert.rejects(
    () => glmResetCards.consumeGlmResetCard(connection.id, "redeem-conflict", "124133"),
    (error: InstanceType<typeof glmResetCards.GlmResetCardError>) => {
      assert.equal(error.status, 409);
      assert.equal(error.code, "idempotency_key_conflict");
      return true;
    }
  );
});

test("consumeGlmResetCard reports a 409 when nothing is banked", async () => {
  const connection = (await createGlmConnection()) as { id: string };

  globalThis.fetch = async (url) => {
    if (String(url).includes("/customer-package-reset/list")) return json(EMPTY_LIST_ENVELOPE);
    return new Response("unexpected", { status: 500 });
  };

  await assert.rejects(
    () => glmResetCards.consumeGlmResetCard(connection.id, "redeem-2"),
    (error: InstanceType<typeof glmResetCards.GlmResetCardError>) => {
      assert.equal(error.status, 409);
      assert.equal(error.code, "no_reset_card");
      return true;
    }
  );
});

test("non-GLM connections are rejected before any upstream call", async () => {
  const connection = (await createGlmConnection({
    provider: "openai",
    apiKey: "sk-openai",
  })) as { id: string };

  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return new Response("unexpected", { status: 500 });
  };

  await assert.rejects(
    () => glmResetCards.listGlmResetCards(connection.id),
    (error: InstanceType<typeof glmResetCards.GlmResetCardError>) => {
      assert.equal(error.status, 400);
      assert.equal(error.code, "glm_provider_required");
      return true;
    }
  );
  assert.equal(called, false, "no upstream request should be made for a non-GLM provider");
});

test("fetchGlmResetCardCount distinguishes an authoritative zero from unknown", async () => {
  globalThis.fetch = async () => json(EMPTY_LIST_ENVELOPE);
  assert.equal(await wire.fetchGlmResetCardCount("glm-test-key"), 0);
  assert.equal(await wire.fetchGlmResetCardCount(""), 0);

  globalThis.fetch = async () => {
    throw new Error("network down");
  };
  assert.equal(await wire.fetchGlmResetCardCount("glm-test-key"), null);

  // A truncated-but-JSON body must stay "unknown", never an authoritative zero.
  globalThis.fetch = async () => json({ code: 200, success: true });
  assert.equal(await wire.fetchGlmResetCardCount("glm-test-key"), null);
  globalThis.fetch = async () => json({ code: 200, success: true, data: {} });
  assert.equal(await wire.fetchGlmResetCardCount("glm-test-key"), null);

  globalThis.fetch = async () => json({ code: 401, msg: "token expired or incorrect" });
  assert.equal(await wire.fetchGlmResetCardCount("glm-test-key"), null);
});

test("the redeem button unlocks for the GLM family, not only for Codex", () => {
  const quotas = [{ isResetCredits: true, creditCount: 1 }];

  for (const provider of ["codex", "glm", "glm-cn", "glmt", "zai"]) {
    assert.equal(
      uiUtils.computeCanRedeemResetCredit(provider, quotas),
      true,
      `${provider} should be able to redeem`
    );
  }

  assert.equal(uiUtils.computeCanRedeemResetCredit("openai", quotas), false);
  assert.equal(uiUtils.computeCanRedeemResetCredit("glm", [{ isResetCredits: true }]), false);
  assert.equal(uiUtils.getResetCreditEndpoint("codex"), "/api/usage/codex-reset-credit");
  for (const provider of ["glm", "glm-cn", "glmt", "zai"]) {
    assert.equal(uiUtils.getResetCreditEndpoint(provider), "/api/usage/glm-reset-card");
  }
  assert.equal(uiUtils.getResetCreditEndpoint("openai"), null);
  assert.equal(uiUtils.getResetCreditEndpoint("opencode-go"), null);
});
