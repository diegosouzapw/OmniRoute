/**
 * Unit tests: agentBridgeHook — source and agent field assignment
 *
 * Verifies that recordRequestStart() sets:
 *   - source="custom-host" + agent=undefined when the request host is in
 *     inspector_custom_hosts with enabled=1 (R5-8)
 *   - source="agent-bridge" + agent=agentId otherwise
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { IncomingMessage } from "node:http";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ab-hook-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resetDbInstance, getDbInstance } = await import("../../src/lib/db/core.ts");
const { addCustomHost, toggleCustomHost } = await import(
  "../../src/lib/db/inspectorCustomHosts.ts"
);
const { recordRequestStart } = await import(
  "../../src/mitm/inspector/agentBridgeHook.ts"
);

async function resetStorage() {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  getDbInstance();
}

function makeFakeReq(host: string): IncomingMessage {
  return {
    method: "POST",
    url: "/v1/chat/completions",
    headers: { host, "content-type": "application/json" },
  } as unknown as IncomingMessage;
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("recordRequestStart: custom-host entry → source=custom-host, agent=undefined", async () => {
  addCustomHost("my-app.example.com", "app", "My App");

  const entry = await recordRequestStart({
    req: makeFakeReq("my-app.example.com"),
    body: Buffer.from("{}"),
    agentId: "codex" as any,
    mappedModel: "gpt-4o",
  });

  assert.equal(entry.source, "custom-host", "source should be custom-host");
  assert.equal(entry.agent, undefined, "agent should be undefined for custom-host");
  assert.equal(entry.host, "my-app.example.com");
});

test("recordRequestStart: non-custom host → source=agent-bridge, agent=agentId", async () => {
  // Do NOT add the host to inspector_custom_hosts
  const entry = await recordRequestStart({
    req: makeFakeReq("api.openai.com"),
    body: Buffer.from("{}"),
    agentId: "codex" as any,
    mappedModel: "gpt-4o",
  });

  assert.equal(entry.source, "agent-bridge", "source should be agent-bridge");
  assert.equal(entry.agent, "codex", "agent should be the provided agentId");
  assert.equal(entry.host, "api.openai.com");
});

test("recordRequestStart: disabled custom-host → source=agent-bridge (not matched)", async () => {
  addCustomHost("disabled-app.example.com");
  toggleCustomHost("disabled-app.example.com", false);

  const entry = await recordRequestStart({
    req: makeFakeReq("disabled-app.example.com"),
    body: Buffer.from("{}"),
    agentId: "codex" as any,
    mappedModel: "gpt-4o",
  });

  assert.equal(
    entry.source,
    "agent-bridge",
    "disabled custom-host should not be treated as custom-host source"
  );
  assert.equal(entry.agent, "codex");
});
