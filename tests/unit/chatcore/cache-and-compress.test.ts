import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/cacheAndCompress.ts");

test("cacheAndCompress leaf exists", () => {
  assert.equal(fs.existsSync(leafPath), true, "cacheAndCompress.ts must exist");
});

test("barrel no longer inlines checkSemanticCache call", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("const cacheHit = await checkSemanticCache({"),
    false,
    "checkSemanticCache must move out of chatCore.ts barrel"
  );
});

test("runCacheAndCompress returns continue with processed body and memory settings", async () => {
  const { runCacheAndCompress } =
    await import("../../../open-sse/handlers/chatCore/cacheAndCompress.ts");
  const result = await runCacheAndCompress({
    semanticCacheEnabled: false,
    body: {
      model: "gpt-4o",
      messages: [{ role: "user", content: "hello world" }],
    },
    clientRawRequest: { headers: {} },
    model: "gpt-4o",
    provider: "openai",
    stream: false,
    startTime: Date.now(),
    sourceFormat: "openai",
    targetFormat: "openai",
    isCombo: false,
    effectiveModel: "gpt-4o",
    tokensCompressed: 0,
    traceId: "test-trace-id",
    nativeCodexPassthrough: false,
    webSearchFallbackPlan: { enabled: false },
    webFetchFallbackPlan: { enabled: false },
  });

  assert.equal(result.kind, "continue");
  if (result.kind === "continue") {
    assert.ok(result.body);
    assert.equal(typeof result.tokensCompressed, "number");
    assert.equal(typeof result.contextEditingEnabled, "boolean");
    assert.ok("preCompressionBody" in result, "preCompressionBody key must exist in result");
    assert.ok(
      "compressionResponseMeta" in result,
      "compressionResponseMeta key must exist in result"
    );
    assert.ok(
      "runPostTranslationCompression" in result,
      "runPostTranslationCompression key must exist in result"
    );
  }
});
