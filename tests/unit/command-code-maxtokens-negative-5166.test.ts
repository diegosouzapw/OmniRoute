import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #5166: Zoo Code sends `max_tokens: -1` to mean "let the server choose". The
// old clampMaxTokens did `Math.max(1, ...)`, forcing -1 → 1 and truncating
// output to a single token (the observed `completion_tokens: 1`, `content:null`,
// `reasoning_content:"The"` symptom). A non-positive limit must be OMITTED so
// Command Code's upstream applies the model's own native default.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-maxtokens-5166-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { getExecutor } = await import("../../open-sse/executors/index.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

type FetchCall = { url: string; init: Record<string, unknown>; body?: any };

function commandCodeStream(lines: unknown[]) {
  const text = lines.map((line) => `${JSON.stringify(line)}\n`).join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "application/x-ndjson" } });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
});

async function captureParams(body: Record<string, unknown>): Promise<FetchCall> {
  const calls: FetchCall[] = [];
  globalThis.fetch = async (url: any, init: any = {}) => {
    calls.push({ url: String(url), init, body: JSON.parse(String(init.body)) });
    return commandCodeStream([{ type: "text-delta", text: "ok" }, { type: "finish" }]);
  };
  await getExecutor("command-code").execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }], ...body },
  });
  return calls[0];
}

test("Command Code omits max_tokens when the client sends max_tokens: -1 (#5166)", async () => {
  const call = await captureParams({ max_tokens: -1 });
  assert.ok(
    !("max_tokens" in call.body.params),
    `max_tokens:-1 must be omitted, got params.max_tokens=${call.body.params.max_tokens}`
  );
});

test("Command Code omits max_tokens when the client sends max_completion_tokens: -1 (#5166)", async () => {
  const call = await captureParams({ max_completion_tokens: -1 });
  assert.ok(
    !("max_tokens" in call.body.params),
    `max_completion_tokens:-1 must be omitted, got params.max_tokens=${call.body.params.max_tokens}`
  );
});

test("Command Code omits max_tokens when the client sends 0 (#5166)", async () => {
  const call = await captureParams({ max_tokens: 0 });
  assert.ok(!("max_tokens" in call.body.params), "max_tokens:0 must be omitted");
});

test("Command Code still honors a positive client max_tokens after the #5166 fix", async () => {
  const call = await captureParams({ max_tokens: 2048 });
  assert.equal(call.body.params.max_tokens, 2048);
});
