import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import http from "node:http";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "quota-eligibility-"));
process.env.DATA_DIR = dataDir;
const db = await import("../../../src/lib/db/providers.ts");
const core = await import("../../../src/lib/db/core.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { orderTargetsByResetAwareQuota, orderTargetsByQuotaWeighted } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const log = { info() {}, warn() {}, debug() {}, error() {} };
const quota = { used: 20, total: 100, percentUsed: 0.2, limitReached: false };

after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

function target(provider: string, connectionId: string | null, allowedConnectionIds?: string[]) {
  return {
    kind: "model" as const,
    stepId: randomUUID(),
    executionKey: randomUUID(),
    modelStr: `${provider}/test-model`,
    provider,
    providerId: provider,
    connectionId,
    allowedConnectionIds,
    weight: 1,
    label: null,
  };
}

async function fixture() {
  const provider = `eligibility-${randomUUID()}`;
  const rows = [];
  for (const [name, isActive, testStatus] of [
    ["healthy", true, "active"],
    ["disabled", false, "error"],
    ["banned", true, "banned"],
    ["transient", true, "error"],
  ] as const) {
    rows.push(
      await db.createProviderConnection({
        provider,
        name,
        isActive,
        testStatus,
        authType: "apikey",
      })
    );
  }
  const [healthy, disabled, banned, transient] = rows;
  const fetched: string[] = [];
  registerQuotaFetcher(provider, async (id) => {
    fetched.push(id);
    return quota;
  });
  return { provider, healthy, disabled, banned, transient, fetched };
}

for (const [strategy, order] of [
  ["reset-aware", orderTargetsByResetAwareQuota],
  ["quota-weighted", orderTargetsByQuotaWeighted],
] as const) {
  for (const mode of ["pinned", "allowlisted", "expanded"] as const) {
    test(`${strategy}: ${mode} excludes ineligible IDs before quota workers`, async () => {
      const f = await fixture();
      const ids = [f.healthy.id, f.disabled.id, f.banned.id, f.transient.id, randomUUID()];
      const targets =
        mode === "pinned"
          ? ids.map((id) => target(f.provider, id))
          : [target(f.provider, null, mode === "allowlisted" ? ids : undefined)];
      const ordered = await order(targets, randomUUID(), {}, log, ids);
      const eligible = [f.healthy.id, f.transient.id].sort();
      assert.deepEqual(
        [...f.fetched].sort(),
        eligible,
        "no quota calls for disabled, banned, or missing IDs"
      );
      assert.deepEqual(ordered.map((t) => t.connectionId).sort(), eligible);
    });
  }
  test(`${strategy}: API-key allowlist cannot admit disabled or banned pins`, async () => {
    const f = await fixture();
    const ids = [f.disabled.id, f.banned.id, f.healthy.id];
    const ordered = await order(
      [...ids, f.transient.id].map((id) => target(f.provider, id)),
      randomUUID(),
      {},
      log,
      ids
    );
    assert.deepEqual(f.fetched, [f.healthy.id]);
    assert.deepEqual(
      ordered.map((t) => t.connectionId),
      [f.healthy.id]
    );
  });
  test(`${strategy}: API-key allowlist that matches no eligible row does not fall back`, async () => {
    const f = await fixture();
    const emptyPool = [f.disabled.id, f.banned.id];
    const ordered = await order([target(f.provider, null)], randomUUID(), {}, log, emptyPool);
    assert.deepEqual(ordered, []);
    assert.deepEqual(f.fetched, []);
  });
  test(`${strategy}: a pin cannot borrow another provider's eligible row`, async () => {
    const first = await fixture();
    const second = await fixture();
    const ordered = await order(
      [target(second.provider, second.healthy.id), target(first.provider, second.healthy.id)],
      randomUUID(),
      {},
      log
    );
    assert.deepEqual(first.fetched, []);
    assert.deepEqual(second.fetched, [second.healthy.id]);
    assert.equal(ordered.length, 1);
    assert.equal(ordered[0].provider, second.provider);
  });
  test(`${strategy}: disabling all connections prevents provider fallback`, async () => {
    const f = await fixture();
    await db.updateProviderConnection(f.healthy.id, { isActive: false });
    await db.updateProviderConnection(f.banned.id, { isActive: false });
    await db.updateProviderConnection(f.transient.id, { isActive: false });
    const ordered = await order([target(f.provider, null)], randomUUID(), {}, log);
    assert.deepEqual(ordered, []);
    assert.deepEqual(f.fetched, []);
  });
  test(`${strategy}: retry reloads eligibility after disable and ban`, async () => {
    const f = await fixture();
    const targets = [f.healthy, f.transient].map((r) => target(f.provider, r.id));
    await order(targets, randomUUID(), {}, log);
    await db.updateProviderConnection(f.healthy.id, { isActive: false });
    await db.updateProviderConnection(f.transient.id, { testStatus: "banned" });
    f.fetched.length = 0;
    const ordered = await order(targets, randomUUID(), {}, log);
    assert.deepEqual(ordered, [], "cached active rows must not re-enter retry pool");
    assert.deepEqual(f.fetched, []);
  });
}

test(
  "real combo routing sends only eligible pins to local HTTP upstream",
  { timeout: 15_000 },
  async (t) => {
    const f = await fixture();
    const dispatched: string[] = [];
    const received: string[] = [];
    const server = http.createServer((req, res) => {
      received.push(String(req.headers["x-connection-id"]));
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "healthy reply" } }] })
      );
    });
    t.after(() => server.closeAllConnections());
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address() as { port: number };
      const response = await handleComboChat({
        body: { stream: false, messages: [{ role: "user", content: "test" }] },
        combo: {
          name: randomUUID(),
          strategy: "reset-aware",
          config: { disableSessionStickiness: true, maxRetries: 0 },
          models: [f.disabled, f.banned, f.healthy].map((r) => ({
            model: `${f.provider}/test-model`,
            providerId: f.provider,
            connectionId: r.id,
          })),
        },
        settings: {},
        allCombos: [],
        log,
        handleSingleModel: async (_body, _model, options) => {
          assert.ok(options && "connectionId" in options && options.connectionId);
          dispatched.push(options.connectionId);
          const upstream = await fetch(`http://127.0.0.1:${address.port}`, {
            headers: { "x-connection-id": options.connectionId },
          });
          return new Response(upstream.body, {
            status: upstream.status,
            headers: upstream.headers,
          });
        },
      });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).choices[0].message.content, "healthy reply");
      assert.deepEqual(f.fetched, [f.healthy.id]);
      assert.deepEqual(dispatched, [f.healthy.id]);
      assert.deepEqual(received, [f.healthy.id]);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  }
);

test(
  "real combo retries local upstream 503 without dispatching ineligible accounts",
  { timeout: 15_000 },
  async (t) => {
    const f = await fixture();
    const dispatched: string[] = [];
    const received: string[] = [];
    const server = http.createServer((req, res) => {
      received.push(String(req.headers["x-connection-id"]));
      res.setHeader("Content-Type", "application/json");
      if (received.length === 1) {
        res.statusCode = 503;
        res.end(JSON.stringify({ error: { message: "upstream temporarily unavailable" } }));
        return;
      }
      res.end(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "healthy reply" } }] })
      );
    });
    t.after(() => server.closeAllConnections());
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    try {
      const address = server.address() as { port: number };
      const response = await handleComboChat({
        body: { stream: false, messages: [{ role: "user", content: "test" }] },
        combo: {
          name: randomUUID(),
          strategy: "reset-aware",
          config: { disableSessionStickiness: true, maxRetries: 0 },
          models: [f.disabled, f.banned, f.healthy, f.transient].map((r) => ({
            model: `${f.provider}/test-model`,
            providerId: f.provider,
            connectionId: r.id,
          })),
        },
        settings: {},
        allCombos: [],
        log,
        handleSingleModel: async (_body, _model, options) => {
          assert.ok(options && "connectionId" in options && options.connectionId);
          dispatched.push(options.connectionId);
          const upstream = await fetch(`http://127.0.0.1:${address.port}`, {
            headers: { "x-connection-id": options.connectionId },
          });
          return new Response(upstream.body, {
            status: upstream.status,
            headers: upstream.headers,
          });
        },
      });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).choices[0].message.content, "healthy reply");
      const eligible = [f.healthy.id, f.transient.id].sort();
      assert.deepEqual([...f.fetched].sort(), eligible);
      assert.deepEqual([...dispatched].sort(), eligible);
      assert.deepEqual([...received].sort(), eligible);
    } finally {
      server.closeAllConnections();
      await new Promise<void>((resolve) => server.close(() => resolve()));
    }
  }
);
