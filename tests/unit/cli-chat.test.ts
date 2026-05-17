import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, readFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function mockFetch(body: unknown, status = 200) {
  return () =>
    Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      })
    );
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

const FAKE_RESPONSE = {
  id: "chatcmpl-abc",
  model: "claude-sonnet-4-6",
  choices: [{ message: { role: "assistant", content: "Hello!" } }],
  usage: { prompt_tokens: 5, completion_tokens: 10, total_tokens: 15 },
};

test("runChatCommand imprime texto da resposta no stdout", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "chat-test-"));
  process.env.DATA_DIR = tmpDir;
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch(FAKE_RESPONSE) as any;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: false }) };
  const out = await captureStdout(() =>
    runChatCommand("hi", { model: "auto", noHistory: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  delete process.env.DATA_DIR;
  assert.ok(out.includes("Hello!"));
});

test("runChatCommand com --output json emite body completo", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "chat-test-"));
  process.env.DATA_DIR = tmpDir;
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch(FAKE_RESPONSE) as any;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() =>
    runChatCommand("hi", { model: "auto", noHistory: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  delete process.env.DATA_DIR;
  assert.equal(JSON.parse(out).id, "chatcmpl-abc");
});

test("runChatCommand lê prompt de arquivo com --file", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "chat-test-"));
  const promptFile = join(tmpDir, "prompt.txt");
  writeFileSync(promptFile, "file prompt content");
  process.env.DATA_DIR = tmpDir;

  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    capturedBody = JSON.parse(init.body);
    return Promise.resolve(new Response(JSON.stringify(FAKE_RESPONSE), { status: 200 }));
  }) as any;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  await captureStdout(() =>
    runChatCommand(undefined, { model: "auto", file: promptFile, noHistory: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  delete process.env.DATA_DIR;
  assert.equal(capturedBody.messages[0].content, "file prompt content");
});

test("runChatCommand salva histórico em cli-history.jsonl", async () => {
  const tmpDir = mkdtempSync(join(tmpdir(), "chat-hist-"));
  process.env.DATA_DIR = tmpDir;
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch(FAKE_RESPONSE) as any;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  await captureStdout(() => runChatCommand("save this", { model: "auto" }, cmd as any));

  globalThis.fetch = origFetch;

  const histPath = join(tmpDir, "cli-history.jsonl");
  assert.ok(existsSync(histPath));
  const line = JSON.parse(readFileSync(histPath, "utf8").trim().split("\n")[0]);
  assert.equal(line.prompt, "save this");
  assert.ok(line.ts);
  delete process.env.DATA_DIR;
});

test("runChatCommand usa /v1/responses com --responses-api", async () => {
  const responsesBody = {
    id: "resp-abc",
    output: [{ content: [{ text: "Responses API response" }] }],
    usage: { total_tokens: 10 },
    model: "auto",
  };
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    capturedUrl = url;
    return Promise.resolve(new Response(JSON.stringify(responsesBody), { status: 200 }));
  }) as any;

  const tmpDir = mkdtempSync(join(tmpdir(), "chat-test-"));
  process.env.DATA_DIR = tmpDir;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  const out = await captureStdout(() =>
    runChatCommand("test", { model: "auto", responsesApi: true, noHistory: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  delete process.env.DATA_DIR;
  assert.ok(capturedUrl.includes("/v1/responses"));
  assert.ok(out.includes("Responses API response"));
});

test("runChatCommand propaga system prompt no payload", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    capturedBody = JSON.parse(init.body);
    return Promise.resolve(new Response(JSON.stringify(FAKE_RESPONSE), { status: 200 }));
  }) as any;

  const tmpDir = mkdtempSync(join(tmpdir(), "chat-test-"));
  process.env.DATA_DIR = tmpDir;

  const { runChatCommand } = await import("../../bin/cli/commands/chat.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "text", quiet: true }) };
  await captureStdout(() =>
    runChatCommand("hi", { model: "auto", system: "Be concise", noHistory: true }, cmd as any)
  );

  globalThis.fetch = origFetch;
  delete process.env.DATA_DIR;
  assert.equal(capturedBody.messages[0].role, "system");
  assert.equal(capturedBody.messages[0].content, "Be concise");
  assert.equal(capturedBody.messages[1].content, "hi");
});
