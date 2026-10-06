import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

function makeResponse(data: unknown, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(),
    json: async () => data,
    text: async () => JSON.stringify(data),
  } as Response;
}

async function captureStdout(fn: () => Promise<number>): Promise<{ output: string; code: number }> {
  const chunks: string[] = [];
  const original = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((chunk: string | Uint8Array) => {
    if (typeof chunk === "string") chunks.push(chunk);
    return true;
  }) as typeof process.stdout.write;
  try {
    const code = await fn();
    return { output: chunks.join(""), code };
  } finally {
    process.stdout.write = original;
  }
}

test("radar status is GET-only, read-only, and prints no secret", async () => {
  const originalFetch = globalThis.fetch;
  let method = "GET";
  let url = "";
  globalThis.fetch = (async (input, init) => {
    url = String(input);
    method = init?.method ?? "GET";
    return makeResponse({
      settings: { optIn: true, hasSupporterKey: true },
      feeds: { catalog: { available: true, version: "2026.08.09.1", tier: "live" } },
    });
  }) as typeof fetch;
  try {
    const { runRadarStatusCommand } = await import("../../bin/cli/commands/radar.mjs");
    const result = await captureStdout(() => runRadarStatusCommand({ output: "json" }));
    assert.equal(result.code, 0);
    assert.match(url, /\/api\/radar\/status$/);
    assert.equal(method, "GET");
    assert.ok(!result.output.includes("omr_"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("radar sync posts only to the local aggregate route and prints per-feed results", async () => {
  const originalFetch = globalThis.fetch;
  let method = "";
  let url = "";
  globalThis.fetch = (async (input, init) => {
    url = String(input);
    method = init?.method ?? "GET";
    return makeResponse({
      catalog: { status: "updated", version: "2026.08.09.1" },
      referrals: { status: "stale" },
      offers: { status: "no_key" },
      intel: { status: "no_key" },
    });
  }) as typeof fetch;
  try {
    const { runRadarSyncCommand } = await import("../../bin/cli/commands/radar.mjs");
    const result = await captureStdout(() => runRadarSyncCommand({ output: "json" }));
    assert.equal(result.code, 0);
    assert.match(url, /\/api\/radar\/sync-all$/);
    assert.equal(method, "POST");
    const parsed = JSON.parse(result.output) as Record<string, unknown>;
    assert.deepEqual(Object.keys(parsed).sort(), ["catalog", "intel", "offers", "referrals"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("CLI registry exposes nested radar status and sync commands with EN/PT strings", async () => {
  const { createProgram } = await import("../../bin/cli/program.mjs");
  const program = createProgram();
  const radar = program.commands.find((command) => command.name() === "radar");
  assert.ok(radar);
  assert.deepEqual(radar.commands.map((command) => command.name()).sort(), ["status", "sync"]);

  for (const locale of ["en", "pt-BR"]) {
    const messages = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), `bin/cli/locales/${locale}.json`), "utf8")
    ) as { radar?: Record<string, unknown> };
    assert.equal(typeof messages.radar?.description, "string");
    assert.equal(typeof messages.radar?.status, "string");
    assert.equal(typeof messages.radar?.sync, "string");
  }
});
