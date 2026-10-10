import test from "node:test";
import assert from "node:assert/strict";
import { createPinnedModelRetryResponse } from "../../open-sse/services/combo/nativeCodexTurnPin.ts";
import { lockExactModel, clearAllModelLockouts } from "../../open-sse/services/accountFallback.ts";

const target = {
  kind: "model" as const,
  stepId: "test",
  executionKey: "test",
  modelStr: "codex/gpt-6-astra",
  provider: "codex",
  providerId: "codex",
  connectionId: "test-account",
  weight: 1,
  label: null,
};
test.afterEach(() => clearAllModelLockouts());
test("quota cooldown is retryable without promising an upstream reset", async () => {
  lockExactModel("codex", "test-account", "gpt-6-astra", "quota_exhausted", 120000);
  const result = createPinnedModelRetryResponse([target]);
  assert.equal(result?.status, 429);
  assert.ok(Number(result?.headers.get("Retry-After")) <= 120);
  assert.ok(Number(result?.headers.get("Retry-After")) > 0);
  const body = await result!.json();
  assert.equal(body.error.code, "model_cooldown");
  assert.ok(!body.error.message.includes("Start a new turn"));
  clearAllModelLockouts();
  assert.equal(createPinnedModelRetryResponse([target]), null);
});
for (const reason of ["auth_error", "not_found", "not_found_local", "forbidden", "unknown"]) {
  test(`permanent or unknown ${reason} is not turned into a retry`, () => {
    lockExactModel("codex", "test-account", "gpt-6-astra", reason, 120000);
    assert.equal(createPinnedModelRetryResponse([target]), null);
  });
}
