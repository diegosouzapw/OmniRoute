// Regression test for #7244: Grok Build inference used to bypass the configured
// proxy because the legacy executor overrode execute() with raw https.request().
// The official-client implementation must stay on BaseExecutor's shared fetch
// transport, which is patched by proxyFetch and receives the active proxy context.
import test from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

test("grok-cli inherits the shared proxy-aware BaseExecutor transport", () => {
  const executor = new GrokCliExecutor();

  assert.equal(Object.hasOwn(GrokCliExecutor.prototype, "execute"), false);
  assert.equal(executor.execute, BaseExecutor.prototype.execute);
});
