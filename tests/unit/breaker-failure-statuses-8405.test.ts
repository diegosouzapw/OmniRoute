// #8405: PROVIDER_BREAKER_FAILURE_STATUSES was unexported in chatPredicates.ts,
// causing a ReferenceError on the credential-exhaustion path in chat.ts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("#8405: chatPredicates exports PROVIDER_BREAKER_FAILURE_STATUSES as a Set of failure statuses", async () => {
  const chatPredicates = await import("../../src/sse/handlers/chatPredicates.ts");
  assert.ok(
    chatPredicates.PROVIDER_BREAKER_FAILURE_STATUSES,
    "PROVIDER_BREAKER_FAILURE_STATUSES must be exported from chatPredicates"
  );
  assert.ok(
    chatPredicates.PROVIDER_BREAKER_FAILURE_STATUSES instanceof Set,
    "PROVIDER_BREAKER_FAILURE_STATUSES must be a Set"
  );
  assert.deepEqual(
    Array.from(chatPredicates.PROVIDER_BREAKER_FAILURE_STATUSES).sort(),
    [408, 500, 502, 503, 504]
  );
});

test("#8405: chat.ts imports PROVIDER_BREAKER_FAILURE_STATUSES without throwing ReferenceError", async () => {
  const chatSource = fs.readFileSync(
    new URL("../../src/sse/handlers/chat.ts", import.meta.url),
    "utf-8"
  );

  assert.match(
    chatSource,
    /import\s*\{[^}]*PROVIDER_BREAKER_FAILURE_STATUSES[^}]*\}\s*from\s*["']\.\/chatPredicates["']/,
    "chat.ts must explicitly import PROVIDER_BREAKER_FAILURE_STATUSES from chatPredicates"
  );

  const chatModule = await import("../../src/sse/handlers/chat.ts");
  assert.ok(chatModule, "chat.ts must import cleanly without runtime error");
});
