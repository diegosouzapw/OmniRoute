import test from "node:test";
import assert from "node:assert/strict";
import { PassThrough } from "node:stream";

// Regression: createPrompt().ask registered `rl.once("close")` for every question
// and never removed it after the question was answered. A single prompt that asks
// more than ten questions (the `configure omp` per-role picker asks 9 roles plus
// re-prompts on invalid input) tripped Node's MaxListenersExceededWarning and
// printed a "possible EventEmitter memory leak" trace in the middle of the wizard.

test("createPrompt.ask does not accumulate close listeners across many questions", async () => {
  const input = new PassThrough();
  const stdinDescriptor = Object.getOwnPropertyDescriptor(process, "stdin");
  Object.defineProperty(process, "stdin", { value: input, configurable: true });

  const warnings: Error[] = [];
  const onWarning = (w: Error) => warnings.push(w);
  process.on("warning", onWarning);

  try {
    const { createPrompt } = await import("../../../bin/cli/io.mjs");
    const prompt = createPrompt();
    for (let i = 0; i < 12; i++) {
      const pending = prompt.ask(`Question ${i}`);
      input.write(`answer-${i}\n`);
      assert.equal(await pending, `answer-${i}`);
    }
    prompt.close();
    // process 'warning' is emitted on a later tick
    await new Promise((resolve) => setTimeout(resolve, 20));
    const leaks = warnings.filter((w) => w.name === "MaxListenersExceededWarning");
    assert.equal(leaks.length, 0, `unexpected warning: ${leaks.map((w) => w.message).join("; ")}`);
  } finally {
    process.off("warning", onWarning);
    if (stdinDescriptor) Object.defineProperty(process, "stdin", stdinDescriptor);
  }
});
