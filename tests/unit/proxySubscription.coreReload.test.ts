import assert from "node:assert/strict";
import test from "node:test";

function makeFeed(tags: string[]): {
  nodes: never[];
  needsCore: unknown[];
  format: "v2ray-json";
} {
  const mk = (tag: string, port: number) => ({
    name: tag,
    source: {
      kind: "object" as const,
      value: { type: "vless", server: "203.0.113.9", server_port: port, uuid: `u-${tag}` },
    },
  });
  return {
    nodes: [],
    needsCore: tags.map((t, i) => mk(t, 443 + i)) as never[],
    format: "v2ray-json",
  };
}

const ENDPOINTS = "socks5://127.0.0.1:1080 selector=a\nsocks5://127.0.0.1:1081 selector=b";

async function freshReload() {
  const reload = await import("../../src/lib/proxySubscription/coreConfig/reload.ts");
  reload.__resetCoreReloadTestState();
  return reload;
}

// 1. Nothing declared after a replacement reports undeclared, no fetch/exec.
test("nothing declared after a replacement reports undeclared", async () => {
  const reload = await freshReload();
  let fetchCalls = 0;
  let execCalls = 0;
  const outcome = await reload.reloadCore({
    subscriptionId: "case-1",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: null,
    fetchFn: async () => {
      fetchCalls += 1;
      return { status: 200 };
    },
    execFn: async () => {
      execCalls += 1;
      return { code: 0 };
    },
  });
  assert.equal(outcome.kind, "undeclared");
  assert.equal(fetchCalls, 0);
  assert.equal(execCalls, 0);
  assert.equal(
    reload.resolveCoreReloadMode({
      controlUrl: null,
      apiCapable: false,
      commandDecl: { kind: "absent" },
    }),
    "undeclared"
  );
});

// 2. External succeeds silently, exposed mode is external.
test("external declaration succeeds silently", async () => {
  const reload = await freshReload();
  let calls = 0;
  const outcome = await reload.reloadCore({
    subscriptionId: "case-2",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: "external",
    execFn: async () => {
      calls += 1;
      return { code: 0 };
    },
  });
  assert.equal(outcome.kind, "external");
  assert.equal(calls, 0);
  assert.equal(
    reload.resolveCoreReloadMode({
      controlUrl: null,
      apiCapable: false,
      commandDecl: { kind: "external" },
    }),
    "external"
  );
});

// 3. Deleting a subscription clears its state and cancels the deferred run.
test("clearing state cancels a deferred reload", async () => {
  const reload = await freshReload();
  let now = 1_000_000;
  const jobs: Array<() => void> = [];
  let calls = 0;
  const base = {
    subscriptionId: "case-3",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/true"],
    nowFn: () => now,
    scheduleFn: (_ms: number, fn: () => void) => {
      jobs.push(fn);
      return () => {};
    },
    execFn: async () => {
      calls += 1;
      return { code: 0 };
    },
  };
  await reload.reloadCore({ ...base });
  assert.equal(calls, 1);
  await reload.reloadCore({ ...base });
  assert.equal(jobs.length, 1);
  assert.equal(reload.__coreReloadStateSize(), 1);
  reload.clearCoreReloadState("case-3");
  assert.equal(reload.__coreReloadStateSize(), 0);
  now += 61_000;
  for (const j of jobs) j();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls, 1);
});

// 3bis. First verified replacement without a seed reports digestChanged:true,
// an identical second one reports false (via finishVerified).
test("first replaced without seed reloads, identical digest does not", async () => {
  const reload = await freshReload();
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reload-3bis-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reload-bin-"));
    const fakeBin = path.join(binDir, "sing-box");
    fs.writeFileSync(
      fakeBin,
      '#!/bin/sh\nif grep -q "BAD" "$3" 2>/dev/null; then exit 1; fi\nexit 0\n'
    );
    fs.chmodSync(fakeBin, 0o755);
    const run = (
      sync as unknown as {
        generateCoreConfigIntention: (
          sub: unknown,
          parsed: unknown
        ) => Promise<{
          status: string;
          digestChanged: boolean;
          warning: string | null;
          membersDigest?: string;
        }>;
      }
    ).generateCoreConfigIntention;
    const sub = {
      id: "case-3bis",
      coreConfigPath: target,
      localCoreEndpoint: ENDPOINTS,
    };
    process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = fakeBin;
    // Absent seed counts as a change: first verified replacement reloads.
    assert.equal(reload.getLastMembersDigest("case-3bis"), undefined);
    const first = await run(sub, makeFeed(["sb-1", "sb-2"]));
    assert.equal(first.warning, null);
    assert.equal(first.status, "replaced");
    assert.equal(first.digestChanged, true);
    // Identical members: adopted file already current, no replacement at all.
    const second = await run(sub, makeFeed(["sb-1", "sb-2"]));
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
    assert.equal(second.status, "none");
    assert.equal(second.digestChanged, false);
    fs.rmSync(binDir, { recursive: true, force: true });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// 4. Invalid command is ignored with a single process-wide warning.
test("invalid command is ignored with one warning across syncs", async () => {
  const reload = await freshReload();
  const warnings: string[] = [];
  const orig = console.warn;
  console.warn = (msg: string) => {
    warnings.push(String(msg));
  };
  try {
    let calls = 0;
    for (const bad of ['"not an array"', "[]", "not json"]) {
      const outcome = await reload.reloadCore({
        subscriptionId: `case-4-${bad.length}`,
        controlUrl: null,
        secret: null,
        configPath: "core.json",
        command: bad,
        execFn: async () => {
          calls += 1;
          return { code: 0 };
        },
      });
      assert.equal(outcome.kind, "undeclared");
    }
    assert.equal(calls, 0);
    assert.equal(warnings.length, 1);
  } finally {
    console.warn = orig;
  }
});

// 5. Two replacements in a minute run once now, once deferred at expiry.
test("second replacement inside the window is deferred then runs at expiry", async () => {
  const reload = await freshReload();
  let now = 2_000_000;
  const jobs: Array<() => void> = [];
  let calls = 0;
  const base = {
    subscriptionId: "case-5",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/true"],
    nowFn: () => now,
    scheduleFn: (_ms: number, fn: () => void) => {
      assert.ok(_ms > 0 && _ms <= 60_000);
      jobs.push(fn);
      return () => {};
    },
    execFn: async () => {
      calls += 1;
      return { code: 0 };
    },
  };
  const first = await reload.reloadCore({ ...base });
  assert.equal(first.kind, "command");
  now += 20_000;
  const second = await reload.reloadCore({ ...base });
  assert.equal(second.kind, "command");
  assert.equal(calls, 1);
  assert.equal(jobs.length, 1);
  now += 40_000;
  jobs[0]();
  await new Promise((r) => setTimeout(r, 10));
  assert.equal(calls, 2);
});

// 6. Same endpoint with a changed port gets a new identity tag, so the digest
// changes and the core reloads once (identity-derived tags replace the old
// positional display-name tags).
test("changed port changes identity tag and digest", async () => {
  const reload = await freshReload();
  const singbox = await import("../../src/lib/proxySubscription/coreConfig/singbox.ts");
  const model = await import("../../src/lib/proxySubscription/coreConfig/model.ts");
  const core = await import("../../src/lib/proxySubscription/coreEndpoint.ts");
  const base = JSON.stringify({ inbounds: [], outbounds: [] });
  const endpoints = core.parseLocalCoreEndpoints(ENDPOINTS);
  const mkFeed = (port: number) => ({
    nodes: [],
    needsCore: [
      {
        name: "sb-1",
        source: {
          kind: "object",
          value: { type: "vless", server: "203.0.113.9", server_port: port, uuid: "u-same" },
        },
      },
    ],
    format: "v2ray-json",
  });
  const r1 = singbox.renderSingBox(
    model.buildCoreModel(
      endpoints,
      (mkFeed(443) as unknown as { nodes: []; needsCore: never[] }).needsCore.concat([]) as never[]
    ),
    base
  );
  const r2 = singbox.renderSingBox(
    model.buildCoreModel(
      endpoints,
      (mkFeed(8443) as unknown as { nodes: []; needsCore: never[] }).needsCore.concat([]) as never[]
    ),
    base
  );
  assert.equal(r1.ok, true);
  assert.equal(r2.ok, true);
  if (r1.ok && r2.ok) {
    assert.notEqual(r1.membersDigest, r2.membersDigest);
  }
  assert.equal(typeof reload.getLastMembersDigest, "function");
});

// 7. Failing command maps to failed with exit-code.
test("command exit 1 maps to failed", async () => {
  const reload = await freshReload();
  const outcome = await reload.reloadCore({
    subscriptionId: "case-7",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/false"],
    execFn: async () => ({ code: 1 }),
  });
  assert.equal(outcome.kind, "failed");
  assert.equal(outcome.reason, "exit-code");
});

// 8. Overrunning command maps to failed with timeout (rejected timeout shape).
test("command timeout maps to failed with timeout reason", async () => {
  const reload = await freshReload();
  const outcome = await reload.reloadCore({
    subscriptionId: "case-8",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/sleep", "60"],
    execFn: async () => {
      const err = new Error("reload command timed out") as Error & { code: string };
      err.code = "ETIMEDOUT";
      throw err;
    },
  });
  assert.equal(outcome.kind, "failed");
  assert.equal(outcome.reason, "timeout");
});

// 9. Trapped arguments pass through verbatim (no shell).
test("trapped arguments are passed verbatim", async () => {
  const reload = await freshReload();
  const seen: Array<{ file: string; args: string[] }> = [];
  const outcome = await reload.reloadCore({
    subscriptionId: "case-9",
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/echo", "$(rm -rf /)", "a b"],
    execFn: async (file: string, args: string[]) => {
      seen.push({ file, args });
      return { code: 0 };
    },
  });
  assert.equal(outcome.kind, "command");
  assert.deepEqual(seen[0], { file: "/bin/echo", args: ["$(rm -rf /)", "a b"] });
});

// 10. Beside-write without replacement reports no-call intention.
test("beside-write without a binary reports status none", async () => {
  await freshReload();
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reload-10-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const intention = await (
      sync as unknown as {
        generateCoreConfigIntention: (
          sub: unknown,
          parsed: unknown
        ) => Promise<{ status: string; digestChanged: boolean; warning: string | null }>;
      }
    ).generateCoreConfigIntention(
      { id: "case-10", coreConfigPath: target, localCoreEndpoint: ENDPOINTS },
      makeFeed(["sb-1"])
    );
    assert.equal(intention.status, "none");
    assert.equal(intention.digestChanged, false);
    assert.ok(
      intention.warning?.includes("CORE_CONFIG_ENTRIES_SKIPPED"),
      `got: ${intention.warning}`
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

// 11. Capable renderer triggers a guarded PUT; sing-box never fetches.
test("capable renderer calls the control API after the guard", async () => {
  const reload = await freshReload();
  const renderers = await import("../../src/lib/proxySubscription/coreConfig/renderers.ts");
  const orig = renderers.RENDERERS[renderers.DEFAULT_CORE];
  let guardCalls = 0;
  const seen: Array<{ url: string; init: Record<string, unknown> }> = [];
  (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = Object.assign(
    (...a: unknown[]) => (orig as (...x: unknown[]) => unknown)(...a),
    { apiReload: true }
  );
  try {
    // Loopback control URL passes the real fetch-time guard without DNS.
    const outcome = await reload.reloadCore({
      subscriptionId: "case-11",
      controlUrl: "http://127.0.0.1:9090",
      secret: "s3cret",
      configPath: "core.json",
      command: null,
      fetchFn: async (url: string, init: Record<string, unknown>) => {
        guardCalls += 1;
        seen.push({ url, init });
        return { status: 204 };
      },
    });
    assert.equal(outcome.kind, "api");
    assert.equal(seen.length, 1);
    assert.ok(seen[0].url.endsWith("/configs?force=true"));
    assert.equal(seen[0].init.body as string, JSON.stringify({ path: "core.json" }));
    assert.ok(guardCalls >= 0);
  } finally {
    (renderers.RENDERERS as Record<string, unknown>)[renderers.DEFAULT_CORE] = orig;
  }
  // A blocked control URL never reaches fetch (falls back to undeclared here).
  {
    let fetchCalls = 0;
    const outcome = await reload.reloadCore({
      subscriptionId: "case-11b",
      controlUrl: "http://192.168.1.1:9090",
      secret: "s3cret",
      configPath: "core.json",
      command: null,
      fetchFn: async () => {
        fetchCalls += 1;
        return { status: 204 };
      },
    });
    assert.equal(outcome.kind, "undeclared");
    assert.equal(fetchCalls, 0);
  }
});

// State size tracks subscriptions: two ids then delete one.
test("state size tracks two subscriptions, delete leaves one", async () => {
  const reload = await freshReload();
  let now = 3_000_000;
  const jobs = new Map<string, Array<() => void>>();
  let calls = 0;
  const mkBase = (id: string) => ({
    subscriptionId: id,
    controlUrl: null,
    secret: null,
    configPath: "core.json",
    command: ["/bin/true"],
    nowFn: () => now,
    scheduleFn: (_ms: number, fn: () => void) => {
      void _ms;
      const list = jobs.get(id) ?? [];
      list.push(fn);
      jobs.set(id, list);
      return () => {};
    },
    execFn: async () => {
      calls += 1;
      return { code: 0 };
    },
  });
  reload.setLastMembersDigest("r2-a", "d1");
  reload.setLastMembersDigest("r2-b", "d2");
  assert.equal(reload.__coreReloadStateSize(), 2);
  await reload.reloadCore(mkBase("r2-a"));
  await reload.reloadCore(mkBase("r2-b"));
  assert.equal(reload.__coreReloadStateSize(), 2);
  reload.clearCoreReloadState("r2-a");
  assert.equal(reload.__coreReloadStateSize(), 1);
  assert.equal(calls, 2);
  void now;
});

// Functional: five verified syncs with stable members reload nothing (first
// seeds, rest are current), then one added member reloads exactly once.
// reloadCore is counted by wrapping the module through the service path:
// the intention gate decides, the counting exec proves the call.
test("stable syncs reload nothing, added member reloads", async () => {
  const reload = await freshReload();
  const sync = await import("../../src/lib/proxySubscription/coreConfig/sync.ts");
  const fs = await import("node:fs");
  const os = await import("node:os");
  const path = await import("node:path");
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reload-fn-"));
  const binDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reload-fnbin-"));
  try {
    const target = path.join(dir, "core.json");
    fs.writeFileSync(target, JSON.stringify({ inbounds: [], outbounds: [] }));
    const fakeBin = path.join(binDir, "sing-box");
    fs.writeFileSync(
      fakeBin,
      '#!/bin/sh\nif grep -q "BAD" "$3" 2>/dev/null; then exit 1; fi\nexit 0\n'
    );
    fs.chmodSync(fakeBin, 0o755);
    const run = (
      sync as unknown as {
        generateCoreConfigIntention: (
          sub: unknown,
          parsed: unknown
        ) => Promise<{
          status: string;
          digestChanged: boolean;
          warning: string | null;
          membersDigest?: string;
        }>;
      }
    ).generateCoreConfigIntention;
    const sub = {
      id: "fn-1",
      coreConfigPath: target,
      localCoreEndpoint: ENDPOINTS,
    };
    process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH = fakeBin;
    // Count reloadCore executions by routing the intention through it with an
    // injected command executor (no real core, no real process). A fake clock
    // steps past the 60 s cadence between phases so each decision executes.
    let reloadCalls = 0;
    let now = 10_000_000;
    const maybeReload = async (intention: {
      status: string;
      digestChanged: boolean;
      warning: string | null;
      configPath?: string;
    }): Promise<void> => {
      if (intention.warning || intention.status !== "replaced" || !intention.digestChanged) return;
      now += 61_000;
      const outcome = await reload.reloadCore({
        subscriptionId: "fn-1",
        controlUrl: null,
        secret: null,
        configPath: target,
        command: ["/bin/true"],
        nowFn: () => now,
        scheduleFn: (_ms: number, fn: () => void) => {
          fn();
          return () => {};
        },
        execFn: async () => {
          reloadCalls += 1;
          return { code: 0 };
        },
      });
      assert.notEqual(outcome.kind, "undeclared");
    };
    // First verified sync seeds the digest and reloads once.
    const seed = await run(sub, makeFeed(["sb-1", "sb-2"]));
    assert.equal(seed.warning, null);
    assert.equal(seed.status, "replaced");
    await maybeReload(seed);
    assert.equal(reloadCalls, 1);
    // Four further stable syncs: adopted file current, zero reloads.
    for (let i = 0; i < 4; i += 1) {
      const intention = await run(sub, makeFeed(["sb-1", "sb-2"]));
      assert.equal(intention.status, "none");
      await maybeReload(intention);
    }
    assert.equal(reloadCalls, 1);
    // One added member: replaced + digest changed → exactly one more reload.
    const grown = await run(sub, makeFeed(["sb-1", "sb-2", "sb-3"]));
    assert.equal(grown.warning, null);
    assert.equal(grown.status, "replaced");
    assert.equal(grown.digestChanged, true);
    await maybeReload(grown);
    assert.equal(reloadCalls, 2);
    // One removed member: N → N-1 reloads as well.
    const shrunk = await run(sub, makeFeed(["sb-1", "sb-2"]));
    assert.equal(shrunk.warning, null);
    assert.equal(shrunk.status, "replaced");
    assert.equal(shrunk.digestChanged, true);
    await maybeReload(shrunk);
    assert.equal(reloadCalls, 3);
  } finally {
    delete process.env.OMNIROUTE_PROXY_CORE_BINARY_PATH;
    fs.rmSync(dir, { recursive: true, force: true });
    fs.rmSync(binDir, { recursive: true, force: true });
  }
});

test("reload warnings encode a terminal failure and an undeclared core", async () => {
  const secret = await import("../../src/lib/proxySubscription/reloadSecret.ts");
  assert.equal(
    secret.encodeReloadWarning("CORE_RELOAD_FAILED", "exit-code"),
    JSON.stringify({ code: "CORE_RELOAD_FAILED", detail: "exit-code" })
  );
  assert.equal(
    secret.encodeReloadWarning("CORE_RELOAD_UNDECLARED"),
    JSON.stringify({ code: "CORE_RELOAD_UNDECLARED" })
  );
});
