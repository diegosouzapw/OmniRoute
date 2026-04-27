import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-v1-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxyV1Route = await import("../../src/app/api/v1/management/proxies/route.ts");
const proxyAssignmentsV1Route =
  await import("../../src/app/api/v1/management/proxies/assignments/route.ts");
const proxyHealthV1Route = await import("../../src/app/api/v1/management/proxies/health/route.ts");
const proxyBulkAssignV1Route =
  await import("../../src/app/api/v1/management/proxies/bulk-assign/route.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");

async function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }

  try {
    return await fn();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function withPrepareFailure(match, message, fn) {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);

  db.prepare = (sql, ...args) => {
    const sqlText = String(sql);
    const matched = typeof match === "function" ? match(sqlText) : sqlText.includes(match);
    if (matched) {
      throw new Error(message);
    }
    return originalPrepare(sql, ...args);
  };

  try {
    return await fn();
  } finally {
    db.prepare = originalPrepare;
  }
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 management proxies supports create/list/pagination", async () => {
  await resetStorage();

  const createA = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy A",
        type: "http",
        host: "proxy-a.local",
        port: 8080,
      }),
    })
  );
  assert.equal(createA.status, 201);

  const createB = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy B",
        type: "https",
        host: "proxy-b.local",
        port: 443,
      }),
    })
  );
  assert.equal(createB.status, 201);

  const listRes = await proxyV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies?limit=1&offset=0")
  );
  assert.equal(listRes.status, 200);
  const listPayload = (await listRes.json()) as any;
  assert.equal(Array.isArray(listPayload.items), true);
  assert.equal(listPayload.items.length, 1);
  assert.equal(listPayload.page.total >= 2, true);
});

test("v1 management proxies main route covers auth, lookup variants, update and delete branches", async () => {
  await resetStorage();

  await withEnv("INITIAL_PASSWORD", "secret", async () => {
    const getAuthRes = await proxyV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies")
    );
    assert.equal(getAuthRes.status, 401);

    const postAuthRes = await proxyV1Route.POST(
      new Request("http://localhost/api/v1/management/proxies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer invalid-management-token",
        },
        body: JSON.stringify({
          name: "Denied Proxy",
          type: "http",
          host: "denied.local",
          port: 8080,
        }),
      })
    );
    assert.equal(postAuthRes.status, 403);

    const patchAuthRes = await proxyV1Route.PATCH(
      new Request("http://localhost/api/v1/management/proxies", {
        method: "PATCH",
        headers: { Authorization: "Bearer invalid-management-token" },
        body: JSON.stringify({ id: "proxy-1", notes: "denied" }),
      })
    );
    assert.equal(patchAuthRes.status, 403);

    const deleteAuthRes = await proxyV1Route.DELETE(
      new Request("http://localhost/api/v1/management/proxies?id=proxy-1", {
        method: "DELETE",
      })
    );
    assert.equal(deleteAuthRes.status, 401);
  });

  const providerConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "v1-main-route",
    apiKey: "sk-test-main-route",
  });

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Primary Proxy",
        type: "http",
        host: "primary.local",
        port: 8080,
      }),
    })
  );
  assert.equal(createdRes.status, 201);
  const created = (await createdRes.json()) as any;

  const defaultListRes = await proxyV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies")
  );
  assert.equal(defaultListRes.status, 200);
  const defaultListBody = (await defaultListRes.json()) as any;
  assert.equal(defaultListBody.page.limit, 50);
  assert.equal(defaultListBody.page.offset, 0);
  assert.equal(defaultListBody.items.length, 1);

  const byIdRes = await proxyV1Route.GET(
    new Request(`http://localhost/api/v1/management/proxies?id=${created.id}`)
  );
  assert.equal(byIdRes.status, 200);
  const byIdBody = (await byIdRes.json()) as any;
  assert.equal(byIdBody.id, created.id);

  const assignRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: providerConn.id,
        proxyId: created.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const whereUsedRes = await proxyV1Route.GET(
    new Request(`http://localhost/api/v1/management/proxies?id=${created.id}&where_used=1`)
  );
  assert.equal(whereUsedRes.status, 200);
  const whereUsedBody = (await whereUsedRes.json()) as any;
  assert.equal(whereUsedBody.count, 1);
  assert.equal(whereUsedBody.assignments[0].scopeId, providerConn.id);

  const missingGetRes = await proxyV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies?id=missing-proxy")
  );
  assert.equal(missingGetRes.status, 404);

  const updatedRes = await proxyV1Route.PATCH(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: created.id,
        host: "updated.local",
        port: 9090,
        notes: "updated via patch",
      }),
    })
  );
  assert.equal(updatedRes.status, 200);
  const updatedBody = (await updatedRes.json()) as any;
  assert.equal(updatedBody.host, "updated.local");
  assert.equal(updatedBody.port, 9090);

  const missingPatchRes = await proxyV1Route.PATCH(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "missing-proxy",
        notes: "not found",
      }),
    })
  );
  assert.equal(missingPatchRes.status, 404);

  const missingIdDeleteRes = await proxyV1Route.DELETE(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "DELETE",
    })
  );
  assert.equal(missingIdDeleteRes.status, 400);

  const missingDeleteRes = await proxyV1Route.DELETE(
    new Request("http://localhost/api/v1/management/proxies?id=missing-proxy", {
      method: "DELETE",
    })
  );
  assert.equal(missingDeleteRes.status, 404);

  const inUseDeleteRes = await proxyV1Route.DELETE(
    new Request(`http://localhost/api/v1/management/proxies?id=${created.id}`, {
      method: "DELETE",
    })
  );
  assert.equal(inUseDeleteRes.status, 409);
  const inUseDeleteBody = (await inUseDeleteRes.json()) as any;
  assert.match(inUseDeleteBody.error.message, /remove assignments first/i);

  const forceDeleteRes = await proxyV1Route.DELETE(
    new Request(`http://localhost/api/v1/management/proxies?id=${created.id}&force=1`, {
      method: "DELETE",
    })
  );
  assert.equal(forceDeleteRes.status, 200);
  assert.deepEqual(await forceDeleteRes.json(), { success: true });
});

test("v1 management proxies main route validates malformed and invalid payloads", async () => {
  await resetStorage();

  const invalidPostJsonRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidPostJsonRes.status, 400);

  const invalidPostBodyRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Missing Host",
        type: "http",
        port: 8080,
      }),
    })
  );
  assert.equal(invalidPostBodyRes.status, 400);

  const invalidPatchJsonRes = await proxyV1Route.PATCH(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidPatchJsonRes.status, 400);

  const invalidPatchBodyRes = await proxyV1Route.PATCH(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: "",
        port: 70000,
      }),
    })
  );
  assert.equal(invalidPatchBodyRes.status, 400);
});

test("v1 management proxies main route returns server errors when persistence fails", async () => {
  await resetStorage();

  await withPrepareFailure(
    "ORDER BY datetime(updated_at) DESC, name ASC",
    "list proxy failure",
    async () => {
      const response = await proxyV1Route.GET(
        new Request("http://localhost/api/v1/management/proxies")
      );
      assert.equal(response.status, 500);
      assert.match((await response.json()).error.message, /list proxy failure/i);
    }
  );

  await withPrepareFailure("INSERT INTO proxy_registry", "create proxy failure", async () => {
    const response = await proxyV1Route.POST(
      new Request("http://localhost/api/v1/management/proxies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Broken Create",
          type: "http",
          host: "broken-create.local",
          port: 8080,
        }),
      })
    );
    assert.equal(response.status, 500);
    assert.match((await response.json()).error.message, /create proxy failure/i);
  });

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Broken Update",
        type: "http",
        host: "broken-update.local",
        port: 8081,
      }),
    })
  );
  assert.equal(createdRes.status, 201);
  const created = (await createdRes.json()) as any;

  await withPrepareFailure("UPDATE proxy_registry", "update proxy failure", async () => {
    const response = await proxyV1Route.PATCH(
      new Request("http://localhost/api/v1/management/proxies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: created.id,
          notes: "should fail",
        }),
      })
    );
    assert.equal(response.status, 500);
    assert.match((await response.json()).error.message, /update proxy failure/i);
  });

  await withPrepareFailure("DELETE FROM proxy_registry", "delete proxy failure", async () => {
    const response = await proxyV1Route.DELETE(
      new Request(`http://localhost/api/v1/management/proxies?id=${created.id}`, {
        method: "DELETE",
      })
    );
    assert.equal(response.status, 500);
    assert.match((await response.json()).error.message, /delete proxy failure/i);
  });
});

test("v1 management assignments supports put and filtered get", async () => {
  await resetStorage();

  const providerConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "v1-assignment",
    apiKey: "sk-test-v1",
  });

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy Assign",
        type: "http",
        host: "assign.local",
        port: 8000,
      }),
    })
  );
  const created = (await createdRes.json()) as any;

  const assignRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: providerConn.id,
        proxyId: created.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const filteredRes = await proxyAssignmentsV1Route.GET(
    new Request(
      `http://localhost/api/v1/management/proxies/assignments?scope=account&scope_id=${providerConn.id}`
    )
  );
  assert.equal(filteredRes.status, 200);
  const payload = (await filteredRes.json()) as any;
  assert.equal(payload.items.length, 1);
  assert.equal(payload.items[0].proxyId, created.id);
});

test("v1 management assignments covers unfiltered listing and error branches", async () => {
  await resetStorage();

  const listRes = await proxyAssignmentsV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/assignments?limit=5&offset=0")
  );
  assert.equal(listRes.status, 200);
  const listPayload = (await listRes.json()) as any;
  assert.deepEqual(listPayload.items, []);
  assert.equal(listPayload.page.limit, 5);
  assert.equal(listPayload.page.offset, 0);
  assert.equal(listPayload.page.total, 0);

  await withPrepareFailure(
    "FROM proxy_assignments ORDER BY scope, scope_id",
    "assignment list failure",
    async () => {
      const response = await proxyAssignmentsV1Route.GET(
        new Request("http://localhost/api/v1/management/proxies/assignments")
      );
      assert.equal(response.status, 500);
      assert.match((await response.json()).error.message, /assignment list failure/i);
    }
  );

  const invalidJsonRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidJsonRes.status, 400);
  assert.match((await invalidJsonRes.json()).error.message, /invalid json body/i);

  const invalidPayloadRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
      }),
    })
  );
  assert.equal(invalidPayloadRes.status, 400);
  const invalidPayloadBody = (await invalidPayloadRes.json()) as any;
  assert.equal(invalidPayloadBody.error.type, "invalid_request");
  assert.equal(Array.isArray(invalidPayloadBody.error.details), true);

  const clearGlobalRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "global",
        proxyId: null,
      }),
    })
  );
  assert.equal(clearGlobalRes.status, 200);
  assert.deepEqual(await clearGlobalRes.json(), { success: true, assignment: null });

  const missingProxyRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "global",
        proxyId: "missing-proxy",
      }),
    })
  );
  assert.equal(missingProxyRes.status, 404);
  assert.match((await missingProxyRes.json()).error.message, /proxy not found/i);
});

test("v1 management health endpoint aggregates proxy log metrics", async () => {
  await resetStorage();

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy Health",
        type: "http",
        host: "health.local",
        port: 8080,
      }),
    })
  );
  const created = (await createdRes.json()) as any;

  proxyLogger.logProxyEvent({
    status: "success",
    proxy: { type: "http", host: "health.local", port: 8080 },
    latencyMs: 120,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });
  proxyLogger.logProxyEvent({
    status: "error",
    proxy: { type: "http", host: "health.local", port: 8080 },
    latencyMs: 200,
    level: "provider",
    levelId: "openai",
    provider: "openai",
  });

  const healthRes = await proxyHealthV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/health?hours=24")
  );
  assert.equal(healthRes.status, 200);
  const healthPayload = (await healthRes.json()) as any;
  const row = healthPayload.items.find((item) => item.proxyId === created.id);
  assert.ok(row);
  assert.equal(row.totalRequests >= 2, true);
  assert.equal(row.errorCount >= 1, true);
});

test("v1 management health endpoint covers default window and error handling", async () => {
  await resetStorage();

  const createdRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Proxy Health Default",
        type: "http",
        host: "health-default.local",
        port: 8080,
      }),
    })
  );
  assert.equal(createdRes.status, 201);

  const defaultRes = await proxyHealthV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/health")
  );
  assert.equal(defaultRes.status, 200);
  const defaultBody = (await defaultRes.json()) as any;
  assert.equal(defaultBody.windowHours, 24);
  assert.equal(defaultBody.total, 1);

  await withPrepareFailure("FROM proxy_registry p", "proxy health failure", async () => {
    const errorRes = await proxyHealthV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies/health")
    );
    assert.equal(errorRes.status, 500);
    assert.match((await errorRes.json()).error.message, /proxy health failure/i);
  });
});

test("v1 bulk assignment updates multiple scope IDs in one request", async () => {
  await resetStorage();

  const proxyRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bulk Proxy",
        type: "http",
        host: "bulk.local",
        port: 8080,
      }),
    })
  );
  const proxy = (await proxyRes.json()) as any;

  const bulkRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: ["openai", "anthropic"],
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(bulkRes.status, 200);
  const bulkPayload = (await bulkRes.json()) as any;
  assert.equal(bulkPayload.updated, 2);

  const checkRes = await proxyAssignmentsV1Route.GET(
    new Request("http://localhost/api/v1/management/proxies/assignments?scope=provider")
  );
  const checkPayload = (await checkRes.json()) as any;
  assert.equal(checkPayload.items.length >= 2, true);
});

test("v1 proxy management companion routes require auth when login protection is enabled", async () => {
  await resetStorage();

  await withEnv("INITIAL_PASSWORD", "secret", async () => {
    const assignmentsGetRes = await proxyAssignmentsV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies/assignments")
    );
    assert.equal(assignmentsGetRes.status, 401);

    const assignmentsPutRes = await proxyAssignmentsV1Route.PUT(
      new Request("http://localhost/api/v1/management/proxies/assignments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer invalid-management-token",
        },
        body: JSON.stringify({
          scope: "global",
          proxyId: null,
        }),
      })
    );
    assert.equal(assignmentsPutRes.status, 403);

    const healthRes = await proxyHealthV1Route.GET(
      new Request("http://localhost/api/v1/management/proxies/health", {
        headers: {
          Authorization: "Bearer invalid-management-token",
        },
      })
    );
    assert.equal(healthRes.status, 403);

    const bulkRes = await proxyBulkAssignV1Route.PUT(
      new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scope: "global",
          proxyId: null,
        }),
      })
    );
    assert.equal(bulkRes.status, 401);
  });
});

test("v1 assignments route resolves connection proxies and bulk assignment covers validation branches", async () => {
  await resetStorage();

  const providerConn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "v1-resolve",
    apiKey: "sk-test-v1-resolve",
  });

  const proxyRes = await proxyV1Route.POST(
    new Request("http://localhost/api/v1/management/proxies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Resolve Proxy",
        type: "http",
        host: "resolve.local",
        port: 9000,
      }),
    })
  );
  const proxy = (await proxyRes.json()) as any;

  const assignRes = await proxyAssignmentsV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/assignments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "account",
        scopeId: providerConn.id,
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(assignRes.status, 200);

  const resolveRes = await proxyAssignmentsV1Route.GET(
    new Request(
      `http://localhost/api/v1/management/proxies/assignments?resolve_connection_id=${providerConn.id}`
    )
  );
  assert.equal(resolveRes.status, 200);
  const resolvePayload = (await resolveRes.json()) as any;
  assert.equal(resolvePayload.level, "account");
  assert.equal(resolvePayload.proxy.host, "resolve.local");

  const invalidJsonRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: "{",
    })
  );
  assert.equal(invalidJsonRes.status, 400);

  const invalidPayloadRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "provider",
        scopeIds: [],
      }),
    })
  );
  assert.equal(invalidPayloadRes.status, 400);

  const normalizedRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "key",
        scopeIds: [providerConn.id, providerConn.id],
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(normalizedRes.status, 200);
  const normalizedPayload = (await normalizedRes.json()) as any;
  assert.equal(normalizedPayload.scope, "account");
  assert.equal(normalizedPayload.requested, 2);
  assert.equal(normalizedPayload.updated, 1);

  const globalRes = await proxyBulkAssignV1Route.PUT(
    new Request("http://localhost/api/v1/management/proxies/bulk-assign", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        scope: "global",
        proxyId: proxy.id,
      }),
    })
  );
  assert.equal(globalRes.status, 200);
  const globalPayload = (await globalRes.json()) as any;
  assert.equal(globalPayload.scope, "global");
  assert.equal(globalPayload.requested, 1);
  assert.equal(globalPayload.updated, 1);
});
