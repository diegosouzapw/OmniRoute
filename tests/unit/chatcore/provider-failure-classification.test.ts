import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("providerFailureClassification exports classifier factory and handles failure branches", async () => {
  const { createProviderConnection, getProviderConnectionById } =
    await import("@/lib/db/providers");
  const { isModelLocked } = await import("../../../open-sse/services/accountFallback.ts");
  const module =
    await import("../../../open-sse/handlers/chatCore/providerFailureClassification.ts");
  assert.equal(
    typeof module.createProviderFailureClassifier,
    "function",
    "createProviderFailureClassifier must be exported as a function"
  );
  assert.equal(
    typeof module.applyProviderFailureClassification,
    "function",
    "applyProviderFailureClassification must be exported as a function"
  );

  const testConn = (await createProviderConnection({
    provider: "openai",
    apiKey: "sk-test-fail-classif",
    name: "test-fail-conn",
  })) as { id: string };

  const calls: string[] = [];
  const classifier = module.createProviderFailureClassifier({
    provider: "openai",
    model: "gpt-4o",
    connectionId: testConn.id,
    isModelScope: () => false,
    getCurrentConnectionId: () => testConn.id,
    log: {
      warn: (_tag, msg) => calls.push(`warn:${msg}`),
      info: (_tag, msg) => calls.push(`info:${msg}`),
    },
  });

  // 1. Exercise 401 UNAUTHORIZED branch
  await classifier({
    statusCode: 401,
    message: "Invalid API key provided",
    targetModel: "gpt-4o",
  });

  const updatedConn401 = await getProviderConnectionById(testConn.id);
  assert.ok(updatedConn401, "connection must exist in database");
  assert.equal(
    updatedConn401.lastErrorType,
    "unauthorized",
    "401 failure must record error type unauthorized"
  );
  assert.equal(Number(updatedConn401.errorCode), 401, "401 failure must record error code 401");
  assert.equal(
    updatedConn401.lastError,
    "Invalid API key provided",
    "401 failure must record sanitized error message"
  );

  // 2. Exercise 403 FORBIDDEN branch (terminal status)
  await classifier({
    statusCode: 403,
    message: "Cloudflare Turnstile challenge: SENTINEL_BLOCKED",
    targetModel: "gpt-4o",
  });

  const updatedConn403 = await getProviderConnectionById(testConn.id);
  assert.ok(updatedConn403, "connection must exist in database");
  assert.equal(
    updatedConn403.testStatus,
    "banned",
    "403 forbidden failure must mark connection as banned"
  );
  assert.equal(updatedConn403.isActive, false, "403 forbidden failure must deactivate connection");

  // 3. Exercise 404 MODEL_NOT_FOUND branch
  await classifier({
    statusCode: 404,
    message: "The model gpt-4o does not exist",
    targetModel: "gpt-4o",
  });

  assert.equal(
    isModelLocked("openai", testConn.id, "gpt-4o"),
    true,
    "404 model not found must lock model for connection"
  );
});

test("barrel chatCore.ts delegates provider failure classification to leaf", () => {
  const barrel = readFileSync(
    new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url),
    "utf-8"
  );

  // Must import createProviderFailureClassifier from ./chatCore/providerFailureClassification.ts
  assert.match(
    barrel,
    /import\s*\{[^}]*?\bcreateProviderFailureClassifier\b[^}]*?\}\s*from\s*["']\.\/chatCore\/providerFailureClassification(?:\.ts)?["']/,
    "chatCore.ts must import createProviderFailureClassifier from the leaf module"
  );

  // The inline 300+ line async definition must no longer exist in the barrel
  assert.doesNotMatch(
    barrel,
    /const\s+applyProviderFailureClassification\s*=\s*async\s*\(\s*\{[\s\S]*?statusCode[\s\S]*?message[\s\S]*?headers[\s\S]*?upstreamErrorBody[\s\S]*?retryAfterMs[\s\S]*?targetModel[\s\S]*?\}\s*:\s*\{[\s\S]*?classifyProviderError/,
    "chatCore.ts must not keep the 300+ line inline applyProviderFailureClassification definition"
  );

  // chatCore.ts must call createProviderFailureClassifier
  assert.match(
    barrel,
    /const\s+applyProviderFailureClassification\s*=\s*createProviderFailureClassifier\(\{/,
    "chatCore.ts must instantiate classifier using createProviderFailureClassifier"
  );
});
