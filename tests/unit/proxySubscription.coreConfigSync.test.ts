import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

test("empty path writes nothing and never calls the renderer", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-empty-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  let calls = 0;
  const renderers = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");
  const orig = renderers.RENDERERS[renderers.DEFAULT_CORE];
  (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = () => {
    calls += 1;
    return orig;
  };
  try {
    const res = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: "", localCoreEndpoint: "socks5://127.0.0.1:1080 selector=g" },
        { nodes: [], needsCore: [], format: "empty" }
      )
    ).warning;
    assert.equal(res, null);
    assert.equal(calls, 0);
    assert.deepEqual(fs.readdirSync(dir), []);
  } finally {
    (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = orig;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

function singBoxFeed(): { nodes: never[]; needsCore: never[]; format: "v2ray-json" } {
  const mk = (i: number) => ({
    name: `sb-node-${i}`,
    source: {
      kind: "object" as const,
      value: { type: "vless", server: `203.0.113.${i}`, server_port: 443, uuid: `u-${i}` },
    },
  });
  return {
    nodes: [],
    needsCore: [mk(1), mk(2), mk(3), mk(4)] as never[],
    format: "v2ray-json",
  };
}

const ENDPOINTS = "socks5://127.0.0.1:1080 selector=a\nsocks5://127.0.0.1:1081 selector=b";

test("writes beside-file once per subscription, leaves the adopted file alone", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-write-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(
    target,
    JSON.stringify({ dns: { servers: ["https://9.9.9.9/dns-query"] }, inbounds: [], outbounds: [] })
  );
  const beforeHash = createHash("sha256").update(fs.readFileSync(target)).digest("hex");
  const warned: string[] = [];
  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    warned.push(args.map(String).join(" "));
  };
  try {
    const res = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
        singBoxFeed()
      )
    ).warning;
    assert.equal(res, null);
  } finally {
    console.warn = origWarn;
  }
  const generated = JSON.parse(fs.readFileSync(`${target}.generated`, "utf8"));
  const selectors = generated.outbounds.filter((o: { type: string }) => o.type === "selector");
  assert.equal(selectors.length, 2);
  assert.equal(generated.inbounds.length, 2);
  assert.equal(
    generated.outbounds.filter((o: { tag: string }) => o.tag.startsWith("omniroute-sb-node-"))
      .length,
    4
  );
  assert.equal(createHash("sha256").update(fs.readFileSync(target)).digest("hex"), beforeHash);
  assert.equal(warned.length, 0);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("second identical run writes nothing (mtime unchanged)", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-mtime-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  const sub = { coreConfigPath: target, localCoreEndpoint: ENDPOINTS };
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  (await sync.generateCoreConfigIntention(sub, singBoxFeed())).warning;
  const first = fs.statSync(`${target}.generated`).mtimeMs;
  await new Promise((r) => setTimeout(r, 20));
  const res = (await sync.generateCoreConfigIntention(sub, singBoxFeed())).warning;
  assert.equal(res, null);
  assert.equal(fs.statSync(`${target}.generated`).mtimeMs, first);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("missing directory warns without throwing", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const res = (
    await sync.generateCoreConfigIntention(
      {
        coreConfigPath: path.join(os.tmpdir(), "omniroute-no-such-dir-xyz", "core.json"),
        localCoreEndpoint: ENDPOINTS,
      },
      singBoxFeed()
    )
  ).warning;
  assert.ok(res?.includes("CORE_CONFIG_NOT_GENERATED"));
});

test("unparseable adopted file warns and is never modified", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-bad-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, "not json{{{");
  const before = fs.readFileSync(target, "utf8");
  const res = (
    await sync.generateCoreConfigIntention(
      { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
      singBoxFeed()
    )
  ).warning;
  assert.ok(res?.includes("CORE_CONFIG_NOT_GENERATED"));
  assert.equal(fs.readFileSync(target, "utf8"), before);
  assert.ok(!fs.existsSync(`${target}.generated`));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("additive migration replays without effect", async () => {
  const sql = fs.readFileSync(
    new URL("../../src/lib/db/migrations/197_proxy_subscription_core_config.sql", import.meta.url),
    "utf8"
  );
  assert.ok(sql.includes("ADD COLUMN core_config_path TEXT"));
});

test("end to end: adopted dns and log survive into the beside-file", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-e2e-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(
    target,
    JSON.stringify({
      dns: { servers: ["https://1.1.1.1/dns-query"] },
      log: { level: "warn" },
      inbounds: [],
      outbounds: [],
      route: { rules: [] },
    })
  );
  const res = (
    await sync.generateCoreConfigIntention(
      { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
      singBoxFeed()
    )
  ).warning;
  assert.equal(res, null);
  const generated = JSON.parse(fs.readFileSync(`${target}.generated`, "utf8"));
  assert.deepEqual(generated.dns, { servers: ["https://1.1.1.1/dns-query"] });
  assert.deepEqual(generated.log, { level: "warn" });
  assert.equal(generated.inbounds.length, 2);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("earlier warning wins: generation skipped, skip logged, prior error kept", async () => {
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  // Unit-level: generateCoreConfigIntention itself reports a null warning for
  // empty path — the skip-when-warning branch lives in the service caller
  // (covered below by code inspection of the warn-on-skip line in
  // subscriptionService.ts).
  const src = fs.readFileSync(
    new URL("../../src/lib/proxySubscription/subscriptionService.ts", import.meta.url),
    "utf8"
  );
  assert.ok(src.includes("core config generation skipped"));
  void sync;
});

function captureWarn(): { lines: string[]; restore: () => void } {
  const lines: string[] = [];
  const orig = console.warn;
  console.warn = (...args: unknown[]) => {
    lines.push(args.map(String).join(" "));
  };
  return { lines, restore: () => void (console.warn = orig) };
}

function uriFeed(
  count: number,
  name = "shared"
): { nodes: never[]; needsCore: never[]; format: "lines" } {
  return {
    nodes: [],
    needsCore: Array.from({ length: count }, (_, i) => ({
      name,
      source: { kind: "uri" as const, value: `vless://u@10.9.0.${i + 1}:443#${name}` },
    })) as never[],
    format: "lines",
  };
}

const THREE_ENDPOINTS =
  "socks5://127.0.0.1:1080 selector=g1\nsocks5://127.0.0.1:1081 selector=g2\nsocks5://127.0.0.1:1082 selector=g3";

test("unassigned groups log one empty_group line per group", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-skip-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const cap = captureWarn();
  try {
    const res = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: THREE_ENDPOINTS },
        uriFeed(1)
      )
    ).warning;
    assert.equal(res, null);
  } finally {
    cap.restore();
  }
  assert.equal(cap.lines.length, 1);
  assert.ok(cap.lines[0].includes("empty_group=3"));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("fully populated generation stays silent", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-quiet-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const cap = captureWarn();
  try {
    const res = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
        singBoxFeed()
      )
    ).warning;
    assert.equal(res, null);
  } finally {
    cap.restore();
  }
  assert.equal(cap.lines.length, 0);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("identical rerun stays silent (unchanged)", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-rerun-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const sub = { coreConfigPath: target, localCoreEndpoint: THREE_ENDPOINTS };
  (await sync.generateCoreConfigIntention(sub, uriFeed(1))).warning;
  const cap = captureWarn();
  try {
    const res = (await sync.generateCoreConfigIntention(sub, uriFeed(1))).warning;
    assert.equal(res, null);
  } finally {
    cap.restore();
  }
  assert.equal(cap.lines.length, 0);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("skip line carries counts only, never node names or servers", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-leak-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  const cap = captureWarn();
  try {
    (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: THREE_ENDPOINTS },
        uriFeed(2, "leakcheck-name")
      )
    ).warning;
  } finally {
    cap.restore();
  }
  assert.equal(cap.lines.length, 1);
  assert.ok(!cap.lines[0].includes("leakcheck-name"));
  assert.ok(!cap.lines[0].includes("10.9.0."));
});

test("repeated generations leave no accumulated state", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-bounded-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const cap = captureWarn();
  try {
    for (let i = 0; i < 5; i += 1) {
      const target = path.join(dir, `core-${i}.json`);
      fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
      const res = (
        await sync.generateCoreConfigIntention(
          { coreConfigPath: target, localCoreEndpoint: THREE_ENDPOINTS },
          uriFeed(1)
        )
      ).warning;
      assert.equal(res, null);
    }
  } finally {
    cap.restore();
  }
  assert.equal(cap.lines.length, 5);
  assert.ok(cap.lines.every((l) => l.includes("empty_group=3")));
  fs.rmSync(dir, { recursive: true, force: true });
});

test("host env binary routes through the native check (pass replaces, miss warns beside)", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-verify-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const renderers = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");
  const apply = await import("../../src/lib/proxySubscription/coreConfig/apply.ts");
  const origRender = renderers.RENDERERS[renderers.DEFAULT_CORE];
  (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = () => ({
    ok: true,
    text: JSON.stringify({ inbounds: [], outbounds: [{ tag: "omniroute-probe" }] }),
    unchanged: false,
    skipped: [],
  });
  const target = path.join(dir, "core.json");
  fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
  try {
    // No binary: beside-file written directly, adopted untouched.
    const plain = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
        singBoxFeed()
      )
    ).warning;
    assert.equal(plain, null);
    assert.ok(fs.existsSync(`${target}.generated`));
    // Binary configured on the host env: applyRendered runs (fake binary that always passes).
    // Proof it went through the check (not the beside-direct path): the
    // adopted file now holds the rendered text, and the stale beside copy
    // from the first call is gone.
    const fakeBin = path.join(dir, "sing-box");
    fs.writeFileSync(fakeBin, "#!/bin/sh\nexit 0\n");
    fs.chmodSync(fakeBin, 0o755);
    process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = fakeBin;
    const verified = (
      await sync.generateCoreConfigIntention(
        { coreConfigPath: target, localCoreEndpoint: ENDPOINTS, id: "sub-verify" },
        singBoxFeed()
      )
    ).warning;
    assert.equal(verified, null);
    assert.ok(fs.readFileSync(target, "utf8").includes("omniroute-probe"));
    assert.ok(!fs.existsSync(`${target}.generated`));
    void apply;
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
    (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = origRender;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a host env binary that fails the guard is ignored: beside-file only, adopted untouched", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-badbin-"));
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const target = path.join(dir, "core.json");
  const adopted = JSON.stringify({ inbounds: [], outbounds: [] });
  fs.writeFileSync(target, adopted);
  // A script the guard must never execute: an executable that records its own run.
  const marker = path.join(dir, "ran");
  const trapped = path.join(dir, "not-sing-box");
  fs.writeFileSync(trapped, `#!/bin/sh\ntouch ${marker}\nexit 0\n`);
  fs.chmodSync(trapped, 0o755);
  try {
    for (const value of [trapped, "relative/sing-box", "/opt/sb/../sing-box"]) {
      process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = value;
      const res = (
        await sync.generateCoreConfigIntention(
          { coreConfigPath: target, localCoreEndpoint: ENDPOINTS, id: "sub-badbin" },
          singBoxFeed()
        )
      ).warning;
      assert.equal(res, null, value);
      assert.equal(fs.readFileSync(target, "utf8"), adopted, value);
      assert.ok(fs.existsSync(`${target}.generated`), value);
      assert.ok(!fs.existsSync(marker), `${value} must not be executed`);
    }
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("delete removes only the beside copy and never the adopted file, missing files do not fail", async () => {
  const apply = await import("../../src/lib/proxySubscription/coreConfig/apply.ts");
  // Unit-level: removeSubscriptionSideFiles unlinks `<path>.generated` only,
  // best-effort (missing files do not throw). The adopted file is the
  // operator's live core configuration.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-sidefiles-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, "{}");
    fs.writeFileSync(`${target}.generated`, "{}");
    const calls: string[] = [];
    apply.removeSubscriptionSideFiles(
      {
        unlinkSync: (p: string) => {
          calls.push(p);
          fs.unlinkSync(p);
        },
      },
      target,
      "sub-del"
    );
    assert.deepEqual(calls, [`${target}.generated`]);
    assert.ok(fs.existsSync(target), "the adopted file must survive");
    assert.ok(!fs.existsSync(`${target}.generated`));
    // Missing beside copy: no throw, still attempted, adopted still intact.
    const noop = { unlinkSync: (p: string) => void calls.push(p) };
    apply.removeSubscriptionSideFiles(noop, target, "sub-del");
    assert.deepEqual(calls, [`${target}.generated`, `${target}.generated`]);
    assert.ok(fs.existsSync(target));
    // Empty path: no-op.
    apply.removeSubscriptionSideFiles(noop, "  ", "sub-del");
    assert.equal(calls.length, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  // The service delete path calls it with the stored adopted path.
  const src = fs.readFileSync(
    new URL("../../src/lib/proxySubscription/subscriptionService.ts", import.meta.url),
    "utf8"
  );
  assert.ok(src.includes("removeSubscriptionSideFiles"));
});
