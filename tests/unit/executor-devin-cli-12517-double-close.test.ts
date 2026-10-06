import { describe, it, after } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/devin-cli.ts");

describe("DevinCliExecutor — #12517 spawn error must not double-close SSE controller", () => {
  it("surfaces a sanitized SSE error and never fires uncaughtException on ENOENT spawn", async () => {
    const previousBin = process.env.CLI_DEVIN_BIN;
    process.env.CLI_DEVIN_BIN = "/nonexistent/absolute/path/to/devin-bin-12517";

    let caught: unknown = null;
    const onUncaught = (err: unknown) => {
      caught = err;
    };
    process.on("uncaughtException", onUncaught);

    try {
      const executor = new mod.DevinCliExecutor();
      const { response } = await executor.execute({
        model: "devin-cli",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: true,
        credentials: {},
        signal: undefined,
        log: undefined,
      } as never);

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let payload = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        payload += decoder.decode(value);
      }

      assert.match(payload, /Devin CLI not found/);
      assert.match(payload, /data: \[DONE\]/);

      // Give the child's async "close" event (which fires after "error" for a
      // failed spawn) room to run before asserting no uncaughtException fired.
      await new Promise((resolve) => setTimeout(resolve, 300));

      assert.equal(caught, null, `expected no uncaughtException, got: ${String(caught)}`);
    } finally {
      process.removeListener("uncaughtException", onUncaught);
      if (previousBin === undefined) delete process.env.CLI_DEVIN_BIN;
      else process.env.CLI_DEVIN_BIN = previousBin;
    }
  });

  after(() => {
    delete process.env.CLI_DEVIN_BIN;
  });
});
