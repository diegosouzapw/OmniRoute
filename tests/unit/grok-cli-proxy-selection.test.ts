// Regression test for #7244: Grok Build inference used to bypass the configured
// proxy because the legacy executor overrode execute() with raw https.request().
// The official-client implementation must stay on BaseExecutor's shared fetch
// transport, which is patched by proxyFetch and receives the active proxy context.
import test from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { GrokCliExecutor } from "../../open-sse/executors/grok-cli.ts";

test("grok-cli inherits the shared proxy-aware BaseExecutor transport", async () => {
  // execute() may only pre/post-process (namespace tools); the transport itself
  // must stay BaseExecutor.prototype.execute.
  const executor = new GrokCliExecutor();
  const originalExecute = BaseExecutor.prototype.execute;
  const sentinel = { response: new Response("ok") };
  let calls = 0;
  BaseExecutor.prototype.execute = async function () {
    calls++;
    return sentinel;
  };
  try {
    const input = { model: "grok-4.6", body: { input: "hi" }, stream: true, credentials: {} };
    assert.equal(await executor.execute(input), sentinel);
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
  assert.equal(calls, 1);
});
