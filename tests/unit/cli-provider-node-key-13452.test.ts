import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { Command, Option } from "commander";

import { runKeysAddCommand } from "../../bin/cli/commands/keys.mjs";
import { registerOpenapi } from "../../bin/cli/commands/openapi.mjs";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "node-key-13452-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_CLI_TOKEN = "fixture-cli-token";
process.env.OMNIROUTE_API_KEY = "fixture-management-key";
const nodeIds = [
  "openai-compatible-chat-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  "openai-compatible-responses-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  "anthropic-compatible-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
  "anthropic-compatible-cc-aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
];
type SavedKey = { path: string; authorization?: string; body: Record<string, unknown> };
const saved: SavedKey[] = [];
let saveStatus = 200;
const server = http.createServer(async (request, response) => {
  response.setHeader("content-type", "application/json");
  if (request.url === "/api/health") return response.end("{}");
  if (request.url === "/api/openapi/spec") {
    return response.end(JSON.stringify({ openapi: "3.0.0", paths: {} }));
  }
  let body = "";
  for await (const chunk of request) body += chunk;
  saved.push({
    path: request.url || "",
    authorization: request.headers.authorization,
    body: JSON.parse(body || "{}"),
  });
  response.statusCode = nodeIds.includes(String(saved.at(-1)?.body.provider)) ? saveStatus : 404;
  response.end(JSON.stringify({ id: "saved-connection" }));
});

test.before(async () => {
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  process.env.OMNIROUTE_BASE_URL = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  await new Promise<void>((resolve, reject) =>
    server.close((error) => (error ? reject(error) : resolve()))
  );
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("#13452 keys add binds all compatible node shapes through the management hydration route", async () => {
  for (const provider of nodeIds) {
    saved.length = 0;
    assert.equal(await runKeysAddCommand(provider, "fixture-upstream-key", {}), 0);
    assert.equal(saved.length, 1);
    assert.equal(saved[0].path, "/api/providers");
    assert.equal(saved[0].body.provider, provider);
    assert.equal(saved[0].body.apiKey, "fixture-upstream-key");
    assert.equal(saved[0].authorization, "Bearer fixture-management-key");
  }
});

test("#13452 unknown nodes and server rejection never create a raw local credential", async () => {
  saved.length = 0;
  assert.equal(await runKeysAddCommand("unknown-provider", "fixture-upstream-key", {}), 1);
  assert.equal(saved.length, 0);
  saveStatus = 403;
  try {
    assert.equal(await runKeysAddCommand(nodeIds[0], "fixture-upstream-key", {}), 1);
    assert.equal(saved.length, 1, "the management API must enforce the rejection");
    assert.equal(fs.existsSync(path.join(dataDir, "storage.sqlite")), false);
  } finally {
    saveStatus = 200;
  }
});

test("#13452 missing nodes and offline servers never fall back to local SQLite", async () => {
  assert.equal(
    await runKeysAddCommand("openai-compatible-chat-ffffffff", "fixture-upstream-key", {}),
    1
  );
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("fixture offline");
  };
  try {
    assert.equal(await runKeysAddCommand(nodeIds[0], "fixture-upstream-key", {}), 1);
    assert.equal(fs.existsSync(path.join(dataDir, "storage.sqlite")), false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("#13452 openapi file output uses --out independently of the global --output format", async () => {
  const outputFile = path.join(dataDir, "openapi.json");
  const program = new Command().exitOverride();
  program.addOption(new Option("--output <format>").choices(["table", "json", "jsonl", "csv"]));
  registerOpenapi(program);
  await program.parseAsync([
    "node",
    "omniroute",
    "--output",
    "json",
    "openapi",
    "dump",
    "--format",
    "json",
    "--out",
    outputFile,
  ]);
  assert.deepEqual(JSON.parse(fs.readFileSync(outputFile, "utf8")), {
    openapi: "3.0.0",
    paths: {},
  });
});
