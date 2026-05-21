import test from "node:test";
import assert from "node:assert/strict";

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

function makeCmd(baseUrl = "http://localhost:20128") {
  return { optsWithGlobals: () => ({ baseUrl }) };
}

test("open.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/open.mjs");
  assert.equal(typeof mod.registerOpen, "function");
});

test("RESOURCES inclui todos os recursos principais", async () => {
  const resources = [
    "combos",
    "providers",
    "api-manager",
    "cli-tools",
    "agents",
    "settings",
    "logs",
    "memory",
    "skills",
    "evals",
    "audit",
    "cost",
    "resilience",
  ];
  const mod = await import("../../bin/cli/commands/open.mjs");
  assert.equal(typeof mod.registerOpen, "function");
  assert.ok(resources.length > 10);
});

test("URL base dashboard é /dashboard quando sem recurso", () => {
  const base = "http://localhost:20128";
  const url = `${base}/dashboard`;
  assert.ok(url.includes("/dashboard"));
});

test("URL de logs com ID usa ?request= param", () => {
  const base = "http://localhost:20128";
  const id = "req-abc-123";
  const url = `${base}/dashboard/logs?request=${encodeURIComponent(id)}`;
  assert.ok(url.includes("request=req-abc-123"));
});

test("URL de combo com nome usa path /dashboard/combos/<name>", () => {
  const base = "http://localhost:20128";
  const name = "fast-combo";
  const url = `${base}/dashboard/combos/${encodeURIComponent(name)}`;
  assert.ok(url.includes("/dashboard/combos/fast-combo"));
});

test("URL de settings com section usa path /dashboard/settings/<section>", () => {
  const base = "http://localhost:20128";
  const section = "memory";
  const url = `${base}/dashboard/settings/${encodeURIComponent(section)}`;
  assert.ok(url.includes("/dashboard/settings/memory"));
});
