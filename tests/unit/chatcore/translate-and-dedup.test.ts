import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/translateAndDedup.ts");

function readBarrelSource(): string {
  assert.equal(fs.existsSync(barrelPath), true, "chatCore.ts barrel must exist");
  return fs.readFileSync(barrelPath, "utf8");
}

test("translateAndDedup leaf exists", () => {
  assert.equal(fs.existsSync(leafPath), true, "translateAndDedup.ts must exist");
});

test("barrel file exists", () => {
  assert.equal(fs.existsSync(barrelPath), true, "chatCore.ts barrel must exist");
});

test("barrel imports and calls runTranslateAndDedup", () => {
  const src = readBarrelSource();
  assert.equal(
    src.includes('import { runTranslateAndDedup } from "./chatCore/translateAndDedup.ts";'),
    true,
    "barrel must import runTranslateAndDedup"
  );
  assert.equal(
    src.includes("const translated = await runTranslateAndDedup("),
    true,
    "barrel must invoke runTranslateAndDedup"
  );
});

test("barrel no longer inlines translatedBody assignment", () => {
  const src = readBarrelSource();
  assert.equal(
    src.includes("let translatedBody = body;"),
    false,
    "request translation must leave barrel"
  );
});

test("barrel rebinds persistAttemptLogs with compressed tokens before send", () => {
  const src = readBarrelSource();
  const sliceCall = src.indexOf("await runTranslateAndDedup({");
  const sendIdx = src.indexOf("const executeProviderRequest = (");
  assert.notEqual(sliceCall, -1, "barrel must call runTranslateAndDedup");
  assert.notEqual(sendIdx, -1, "executeProviderRequest wrapper must remain");
  assert.ok(sliceCall < sendIdx, "translation must run before send");
  const between = src.slice(sliceCall, sendIdx);
  assert.equal(
    between.includes("persistAttemptLogsFor"),
    true,
    "rebind must call persistAttemptLogsFor after translation"
  );
  assert.equal(
    between.includes("tokensCompressed"),
    true,
    "rebind must capture live tokensCompressed"
  );
});

test("runTranslateAndDedup returns continue with translated payload and controllers", async () => {
  const { runTranslateAndDedup } =
    await import("../../../open-sse/handlers/chatCore/translateAndDedup.ts");
  const result = await runTranslateAndDedup({
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello world" }],
    },
    tokensCompressed: 0,
    compressionAnalyticsWritePromise: null,
    compressionResponseMeta: null,
    preCompressionBody: {},
    credentials: { apiKey: "sk-test" },
    clientRawRequest: { headers: {} },
    connectionId: "conn-1",
    apiKeyInfo: { id: "key-1" },
    provider: "openai",
    model: "gpt-4o",
    effectiveModel: "gpt-4o",
    sourceFormat: "openai",
    targetFormat: "openai",
    stream: false,
    traceId: "test-trace-id",
    settings: {},
  });

  assert.equal(result.kind, "continue");
  if (result.kind === "continue") {
    assert.ok(result.continue.translatedBody, "translatedBody must be truthy");
    assert.equal(
      (result.continue.translatedBody as Record<string, unknown>).model,
      "gpt-4o",
      "translatedBody.model must match input model"
    );
    assert.deepEqual(
      (result.continue.translatedBody as Record<string, unknown>).messages,
      [{ role: "user", content: "hello world" }],
      "translatedBody.messages must be preserved"
    );
    assert.equal(typeof result.continue.dedupEnabled, "boolean");
    assert.ok(result.continue.streamController);
    assert.equal(typeof result.continue.tokensCompressed, "number");
    assert.ok("compressionAnalyticsWritePromise" in result.continue);
    assert.equal(typeof result.continue.getExecutionCredentials, "function");
    assert.equal(typeof result.continue.bindPipelineStreamError, "function");
    assert.equal(typeof result.continue.bindClientDisconnectFinalize, "function");
  }
});
