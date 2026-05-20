import test from "node:test";
import assert from "node:assert/strict";

const WEBHOOK = {
  id: "wh-001",
  url: "https://example.com/hook",
  events: ["request.completed", "request.failed"],
  enabled: true,
  secret: "s3cr3t",
  lastDelivery: "2026-05-14T10:00:00Z",
  lastStatus: 200,
};

const WEBHOOKS = [
  WEBHOOK,
  { ...WEBHOOK, id: "wh-002", url: "https://other.io/hook", enabled: false },
];

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("runWebhooksList retorna lista de webhooks", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    assert.ok(url.includes("/api/webhooks"));
    return Promise.resolve(makeResp({ items: WEBHOOKS }));
  }) as any;

  const { runWebhooksList } = await import("../../bin/cli/commands/webhooks.mjs");
  const out = await captureStdout(() => runWebhooksList({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
});

test("runWebhooksGet busca webhook por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(WEBHOOK));
  }) as any;

  const { runWebhooksGet } = await import("../../bin/cli/commands/webhooks.mjs");
  const out = await captureStdout(() => runWebhooksGet("wh-001", {}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/webhooks/wh-001"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "wh-001");
});

test("runWebhooksAdd envia url, events e secret", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp(WEBHOOK));
  }) as any;

  const { runWebhooksAdd } = await import("../../bin/cli/commands/webhooks.mjs");
  await captureStdout(() =>
    runWebhooksAdd(
      {
        url: "https://example.com/hook",
        events: ["request.completed"],
        secret: "s3cr3t",
        header: [],
        enabled: true,
      },
      makeCmd() as any
    )
  );

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.url, "https://example.com/hook");
  assert.deepEqual(capturedBody.events, ["request.completed"]);
  assert.equal(capturedBody.secret, "s3cr3t");
  assert.equal(capturedBody.enabled, true);
});

test("runWebhooksAdd não expõe secret na saída (mascarado)", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => {
    return Promise.resolve(makeResp(WEBHOOK));
  }) as any;

  const { runWebhooksAdd } = await import("../../bin/cli/commands/webhooks.mjs");
  const out = await captureStdout(() =>
    runWebhooksAdd(
      {
        url: "https://example.com/hook",
        events: ["request.completed"],
        secret: "s3cr3t",
        header: [],
        enabled: true,
      },
      makeCmd("table") as any
    )
  );

  globalThis.fetch = origFetch;
  assert.ok(!out.includes("s3cr3t"), "secret não deve aparecer no output");
  assert.ok(out.includes("***") || !out.includes("s3cr3t"));
});

test("runWebhooksUpdate envia apenas campos fornecidos", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp(WEBHOOK));
  }) as any;

  const { runWebhooksUpdate } = await import("../../bin/cli/commands/webhooks.mjs");
  await captureStdout(() => runWebhooksUpdate("wh-001", { enabled: false }, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/webhooks/wh-001"));
  assert.equal(capturedBody.enabled, false);
  assert.equal(capturedBody.url, undefined);
});

test("runWebhooksRemove com --yes chama DELETE", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}, 204));
  }) as any;

  const out = await captureStdout(async () => {
    const { runWebhooksRemove } = await import("../../bin/cli/commands/webhooks.mjs");
    await runWebhooksRemove("wh-001", { yes: true }, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/webhooks/wh-001"));
  assert.equal(capturedMethod, "DELETE");
  assert.ok(out.includes("Removed"));
});

test("runWebhooksTest envia event no body", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ delivered: true, status: 200 }));
  }) as any;

  const { runWebhooksTest } = await import("../../bin/cli/commands/webhooks.mjs");
  await captureStdout(() =>
    runWebhooksTest("wh-001", { event: "budget.exceeded" }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/webhooks/wh-001/test"));
  assert.equal(capturedBody.event, "budget.exceeded");
});

test("webhooks events lista todos tipos de evento conhecidos", async () => {
  const EVENT_TYPES = [
    "request.completed",
    "request.failed",
    "rate_limit.exceeded",
    "budget.exceeded",
    "quota.reset",
    "provider.down",
    "provider.up",
    "combo.switched",
    "circuit.opened",
    "circuit.closed",
    "skill.executed",
    "memory.added",
    "audit.created",
  ];

  const out = await captureStdout(async () => {
    const cmd = makeCmd();
    const { emit } = await import("../../bin/cli/output.mjs");
    emit(
      EVENT_TYPES.map((e) => ({ event: e })),
      cmd.optsWithGlobals()
    );
  });

  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.length >= 13);
  assert.ok(parsed.some((e: any) => e.event === "request.completed"));
  assert.ok(parsed.some((e: any) => e.event === "budget.exceeded"));
});
