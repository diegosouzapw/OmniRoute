import test from "node:test";
import assert from "node:assert/strict";
import { Command, Option } from "commander";

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

test("nodes add with --base-url correctly parses and sends baseUrl in body", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  const program = new Command();
  program
    .name("omniroute")
    .addOption(new Option("--base-url <url>", "Server base url").env("OMNIROUTE_BASE_URL"));

  mod.registerNodes(program);

  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) {
      capturedBody = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
    }
    return Promise.resolve(makeResp({ id: "node-1", provider: "openai", baseUrl: "http://127.0.0.1:11434" }));
  }) as any;

  try {
    await program.parseAsync([
      "node",
      "omniroute",
      "nodes",
      "add",
      "--provider",
      "ollama-local",
      "--base-url",
      "http://127.0.0.1:11434",
    ]);
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.ok(capturedUrl.endsWith("/api/provider-nodes"), `expected /api/provider-nodes, got ${capturedUrl}`);
  assert.equal(capturedBody?.provider, "ollama-local");
  assert.equal(capturedBody?.baseUrl, "http://127.0.0.1:11434");
});

test("nodes add without endpoint or base-url exits with error even if OMNIROUTE_BASE_URL is set in environment", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  const program = new Command();
  program
    .name("omniroute")
    .addOption(new Option("--base-url <url>", "Server base url").env("OMNIROUTE_BASE_URL"));

  mod.registerNodes(program);

  process.env.OMNIROUTE_BASE_URL = "http://localhost:20128";
  let exitCode: number | null = null;
  const origExit = process.exit;
  const origStderr = process.stderr.write;
  let stderrOutput = "";

  process.exit = ((code: number) => {
    exitCode = code;
    throw new Error(`EXIT_${code}`);
  }) as any;
  process.stderr.write = ((chunk: string) => {
    stderrOutput += chunk;
    return true;
  }) as any;

  try {
    await program.parseAsync([
      "node",
      "omniroute",
      "nodes",
      "add",
      "--provider",
      "ollama-local",
    ]);
  } catch (err: any) {
    if (!err.message.startsWith("EXIT_")) throw err;
  } finally {
    process.exit = origExit;
    process.stderr.write = origStderr;
    delete process.env.OMNIROUTE_BASE_URL;
  }

  assert.equal(exitCode, 1, "should exit with code 1 when node URL is missing");
  assert.ok(stderrOutput.includes("required option"), "stderr should report missing url option");
});

test("nodes add with --name matching subcommand name correctly parses --base-url and handles duplicate flags with last-wins", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  const program = new Command();
  program
    .name("omniroute")
    .addOption(new Option("--base-url <url>", "Server base url").env("OMNIROUTE_BASE_URL"));

  mod.registerNodes(program);

  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) {
      capturedBody = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
    }
    return Promise.resolve(makeResp({ id: "node-1", provider: "openai", baseUrl: "http://127.0.0.1:11434" }));
  }) as any;

  try {
    await program.parseAsync([
      "node",
      "omniroute",
      "nodes",
      "add",
      "--name",
      "add",
      "--provider",
      "ollama-local",
      "--base-url",
      "http://127.0.0.1:11430",
      "--base-url",
      "http://127.0.0.1:11434",
    ]);
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.ok(capturedUrl.endsWith("/api/provider-nodes"));
  assert.equal(capturedBody?.name, "add");
  assert.equal(capturedBody?.baseUrl, "http://127.0.0.1:11434", "last specified base-url wins");
});

test("nodes update with --base-url correctly parses and sends baseUrl in body without hijacking server base", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  const program = new Command();
  program
    .name("omniroute")
    .addOption(new Option("--base-url <url>", "Server base url").env("OMNIROUTE_BASE_URL"));

  mod.registerNodes(program);

  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) {
      capturedBody = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
    }
    return Promise.resolve(makeResp({ id: "node-1", baseUrl: "http://127.0.0.1:11435" }));
  }) as any;

  try {
    await program.parseAsync([
      "node",
      "omniroute",
      "nodes",
      "update",
      "node-1",
      "--base-url",
      "http://127.0.0.1:11435",
    ]);
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.ok(capturedUrl.endsWith("/api/provider-nodes/node-1"), `expected /api/provider-nodes/node-1, got ${capturedUrl}`);
  assert.equal(capturedBody?.baseUrl, "http://127.0.0.1:11435");
});

test("nodes validate with --base-url correctly parses and sends baseUrl in body", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  const program = new Command();
  program
    .name("omniroute")
    .addOption(new Option("--base-url <url>", "Server base url").env("OMNIROUTE_BASE_URL"));

  mod.registerNodes(program);

  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) {
      capturedBody = typeof opts.body === "string" ? JSON.parse(opts.body) : opts.body;
    }
    return Promise.resolve(makeResp({ valid: true }));
  }) as any;

  try {
    await program.parseAsync([
      "node",
      "omniroute",
      "nodes",
      "validate",
      "--provider",
      "ollama-local",
      "--base-url",
      "http://127.0.0.1:11434",
    ]);
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.ok(capturedUrl.endsWith("/api/provider-nodes/validate"), `expected /api/provider-nodes/validate, got ${capturedUrl}`);
  assert.equal(capturedBody?.baseUrl, "http://127.0.0.1:11434");
  assert.equal(capturedBody?.provider, "ollama-local");
});
