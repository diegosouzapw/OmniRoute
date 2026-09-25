// N111 functional: 15 accounts, 13 in cooldown → 13 skipped info lines (one per
// distinct account, masked + remaining time), selection itself unchanged (the
// 2 ready accounts still serve). RED-first: exercises OpencodeExecutor.execute
// with a stubbed transport (mirrors opencode-proxy-rotation-4954.test.ts).
import test from "node:test";
import assert from "node:assert/strict";

process.env.ROTATION_ATTRIBUTION = "true";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { maskAccountId } = await import("../../open-sse/executors/accountRotation.ts");

function fingerprints(n: number): string[] {
  return Array.from({ length: n }, (_, i) => `fp${String(i).padStart(2, "0")}${"x".repeat(28)}`);
}

function makeLog() {
  const infos: string[] = [];
  return {
    infos,
    log: {
      debug() {},
      info(_tag: string, msg: string) {
        infos.push(String(msg));
      },
      warn() {},
      error() {},
    },
  };
}

test("15 accounts, 13 cooling → 13 skipped info lines, ready accounts serve", async () => {
  const fps = fingerprints(15);
  const ready = new Set([fps[0], fps[1]]);
  const future = Date.now() + 120_000;
  const exec = new OpencodeExecutor("opencode-zen");
  const creds = {
    apiKey: "test-key",
    connectionId: "conn-15",
    providerSpecificData: { fingerprints: fps },
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof globalThis.fetch;
  const { infos, log } = makeLog();
  try {
    // Prime: first execute syncs accounts; then force 13 into cooldown and
    // re-run — the request-scoped enumeration must log each of them once.
    await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds as never,
      log: log as never,
    });
    for (const a of (
      exec as unknown as {
        accounts: Array<{ fingerprint: string; cooldownUntil: number }>;
      }
    ).accounts) {
      if (!ready.has(a.fingerprint)) a.cooldownUntil = future;
    }
    infos.length = 0;
    const result = await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: creds as never,
      log: log as never,
    });
    assert.equal((result as { response: Response }).response.status, 200);
    const skipped = infos.filter((m) => m.includes("skipped account"));
    assert.equal(skipped.length, 13, `expected 13 skipped lines, got ${skipped.length}`);
    for (const fp of fps) {
      if (ready.has(fp)) continue;
      const masked = maskAccountId(fp);
      assert.ok(
        skipped.some((m) => m.includes(masked) && m.includes("remaining")),
        `missing skipped line for ${masked}`
      );
      assert.ok(!skipped.some((m) => m.includes(fp.slice(8))), "never log the full id");
    }
    for (const fp of ready) {
      assert.ok(
        !skipped.some((m) => m.includes(maskAccountId(fp))),
        "ready accounts must not be logged as skipped"
      );
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("single direct account stays silent (no skipped lines)", async () => {
  const exec = new OpencodeExecutor("opencode-zen");
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof globalThis.fetch;
  const { infos, log } = makeLog();
  try {
    await exec.execute({
      model: "deepseek-v4-flash-free",
      body: { messages: [{ role: "user", content: "hi" }], stream: false },
      stream: false,
      signal: null,
      credentials: { apiKey: "k", connectionId: "c1", providerSpecificData: {} } as never,
      log: log as never,
    });
    assert.equal(
      infos.filter((m) => m.includes("skipped account")).length,
      0,
      "healthy single-account request must be silent"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
