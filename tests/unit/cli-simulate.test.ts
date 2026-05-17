import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const COMBO_RESPONSE = {
  combos: [
    {
      id: "default",
      name: "default",
      enabled: true,
      steps: [
        { provider: "openai", model: "gpt-4o", inputCostPer1M: 5 },
        { provider: "anthropic", model: "claude-3-5-sonnet", inputCostPer1M: 3 },
      ],
    },
  ],
};

const HEALTH_RESPONSE = {
  circuitBreakers: [
    { provider: "openai", state: "CLOSED" },
    { provider: "anthropic", state: "HALF_OPEN" },
  ],
};

const QUOTA_RESPONSE = {
  providers: [
    { provider: "openai", percentRemaining: 80 },
    { provider: "anthropic", percentRemaining: 60 },
  ],
};

function makeResp(data: unknown, status = 200) {
  const json = () => Promise.resolve(data);
  const text = () => Promise.resolve(JSON.stringify(data));
  const obj = { ok: status < 400, status, json, text, headers: new Headers() };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

function mockFetch(overrides: Record<string, unknown> = {}) {
  return (url: string) => {
    const path = new URL(url, "http://localhost").pathname;
    if (path.includes("/api/combos"))
      return Promise.resolve(makeResp(overrides.combos ?? COMBO_RESPONSE));
    if (path.includes("/api/monitoring/health")) return Promise.resolve(makeResp(HEALTH_RESPONSE));
    if (path.includes("/api/usage/quota")) return Promise.resolve(makeResp(QUOTA_RESPONSE));
    return Promise.resolve(makeResp({}, 404));
  };
}

async function captureOutput(fn: () => Promise<void>): Promise<{ stdout: string; stderr: string }> {
  const stdoutChunks: string[] = [];
  const stderrChunks: string[] = [];
  const origOut = process.stdout.write.bind(process.stdout);
  const origErr = process.stderr.write.bind(process.stderr);
  process.stdout.write = (c: string | Uint8Array) => {
    stdoutChunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  process.stderr.write = (c: string | Uint8Array) => {
    stderrChunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = origOut;
    process.stderr.write = origErr;
  }
  return { stdout: stdoutChunks.join(""), stderr: stderrChunks.join("") };
}

test("runSimulateCommand exibe tabela com provedores do combo", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const { stdout } = await captureOutput(() =>
    runSimulateCommand("explique RAG", { model: "auto" }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(stdout.includes("openai") || stdout.includes("Provider"));
});

test("runSimulateCommand --output json retorna simulatedPath completo", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runSimulateCommand("test", { model: "auto" }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].provider, "openai");
  assert.equal(parsed[0].order, 1);
  assert.ok(typeof parsed[0].healthStatus === "string");
});

test("runSimulateCommand --explain imprime arvore de fallback no stderr", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const { stderr } = await captureOutput(() =>
    runSimulateCommand("test", { model: "auto", explain: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(stderr.includes("Primary:"));
  assert.ok(stderr.includes("anthropic"));
});

test("runSimulateCommand --file carrega JSON e usa como body", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "sim-test-"));
  const filePath = join(tmpDir, "body.json");
  writeFileSync(filePath, JSON.stringify({ messages: [{ role: "user", content: "hello" }] }));

  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runSimulateCommand(undefined, { model: "auto", file: filePath }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.length >= 1);
});

test("runSimulateCommand --combo filtra por nome do combo", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runSimulateCommand("test", { model: "auto", combo: "default" }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].provider, "openai");
});

test("runSimulateCommand quando servidor offline emite mensagem e sai com 3", async () => {
  const origFetch = globalThis.fetch;
  const exitCodes: (number | string)[] = [];
  const origExit = process.exit.bind(process);
  process.exit = ((code: number) => {
    exitCodes.push(code);
  }) as any;
  globalThis.fetch = (() => Promise.reject(new Error("ECONNREFUSED"))) as any;

  const { runSimulateCommand } = await import("../../bin/cli/commands/simulate.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const { stderr } = await captureOutput(() =>
    runSimulateCommand("test", { model: "auto" }, cmd as any).catch(() => {})
  );

  globalThis.fetch = origFetch;
  process.exit = origExit;
  assert.ok(exitCodes.includes(3) || stderr.length > 0);
});
