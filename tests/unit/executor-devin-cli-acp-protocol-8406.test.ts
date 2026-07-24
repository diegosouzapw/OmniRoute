// #8406: devin-cli ACP wire-format protocol fixes
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { writeFileSync } from "node:fs";

const mod = await import("../../open-sse/executors/devin-cli.ts");

test("#8406: DevinCliExecutor emits correct ACP wire-format frames and handles agent_message_chunk", async () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "devin-acp-test-"));
  const framesFile = path.join(tmpDir, "received_frames.json");
  const scriptFile = path.join(tmpDir, "mock-devin");

  const scriptContent = `#!/usr/bin/env node
const fs = require('fs');
const readline = require('readline');

const frames = [];
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch (e) { return; }
  frames.push(msg);
  fs.writeFileSync(${JSON.stringify(framesFile)}, JSON.stringify(frames, null, 2));

  if (msg.method === 'initialize') {
    process.stdout.write(JSON.stringify({ jsonrpc: '2.0', result: {}, id: msg.id }) + '\\n');
  } else if (msg.method === 'session/new') {
    process.stdout.write(JSON.stringify({ jsonrpc: '2.0', result: { sessionId: 'sess-8406' }, id: msg.id }) + '\\n');
  } else if (msg.method === 'session/prompt') {
    const updateMsg = {
      jsonrpc: '2.0',
      method: 'session/update',
      params: {
        update: {
          sessionUpdate: 'agent_message_chunk',
          content: { type: 'text', text: 'Hello ACP 8406' }
        }
      }
    };
    process.stdout.write(JSON.stringify(updateMsg) + '\\n');
    const resultMsg = {
      jsonrpc: '2.0',
      result: { stopReason: 'end_turn' },
      id: msg.id
    };
    process.stdout.write(JSON.stringify(resultMsg) + '\\n');
  }
});
`;

  writeFileSync(scriptFile, scriptContent, { mode: 0o755 });

  const oldBin = process.env.CLI_DEVIN_BIN;
  process.env.CLI_DEVIN_BIN = scriptFile;

  try {
    const executor = new mod.DevinCliExecutor();
    const res = await executor.execute({
      model: "swe-1-6-fast",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { apiKey: "test-key" },
    });

    const reader = res.response.body!.getReader();
    const decoder = new TextDecoder();
    let sseOutput = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      sseOutput += decoder.decode(value, { stream: true });
    }

    const receivedFrames = JSON.parse(fs.readFileSync(framesFile, "utf-8"));

    const newFrame = receivedFrames.find((f: any) => f.method === "session/new");
    assert.ok(newFrame, "session/new frame must be sent");
    assert.ok(Array.isArray(newFrame.params.mcpServers), "session/new must include mcpServers array");

    const promptFrame = receivedFrames.find((f: any) => f.method === "session/prompt");
    assert.ok(promptFrame, "session/prompt frame must be sent");
    assert.ok(Array.isArray(promptFrame.params.prompt), "session/prompt must name the field prompt");
    assert.equal(promptFrame.params.content, undefined, "session/prompt must not use content field");

    assert.match(sseOutput, /Hello ACP 8406/, "SSE output must contain chunk text from agent_message_chunk");
    assert.match(sseOutput, /data: \[DONE\]/, "SSE output must terminate with [DONE]");
  } finally {
    if (oldBin !== undefined) {
      process.env.CLI_DEVIN_BIN = oldBin;
    } else {
      delete process.env.CLI_DEVIN_BIN;
    }
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
