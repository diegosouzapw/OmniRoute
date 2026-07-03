import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the huggingchat executor JSONL-stream extraction.
// The pure JSONL->OpenAI-SSE translation lives in huggingchat/jsonlStream.ts
// (consumes a passed-in ReadableStream; no host state/fetch/auth). Host imports it back.
const HERE = dirname(fileURLToPath(import.meta.url));
const EXE = join(HERE, "../../open-sse/executors");
const HOST = join(EXE, "huggingchat.ts");
const LEAF = join(EXE, "huggingchat/jsonlStream.ts");

test("leaf hosts the jsonl translators and does not import the host", () => {
  const src = readFileSync(LEAF, "utf8");
  assert.match(src, /export async function\* streamJsonlToOpenAi\b/);
  assert.match(src, /export async function readJsonlResponse\b/);
  assert.match(src, /export function (sseChunk|parseJsonlLine)\b/);
  assert.doesNotMatch(src, /from "\.\.\/huggingchat\.ts"/);
});

test("host imports the jsonl translators back from the leaf", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/huggingchat\/jsonlStream\.ts"/);
});

test("parseJsonlLine parses a jsonl data line", async () => {
  const { parseJsonlLine } = await import("../../open-sse/executors/huggingchat/jsonlStream.ts");
  assert.equal(typeof parseJsonlLine, "function");
  assert.doesNotThrow(() => parseJsonlLine("not json"));
});
