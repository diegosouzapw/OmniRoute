import test from "node:test";
import assert from "node:assert/strict";

// Regression: the shared interactive prompt helper (createPrompt) used rl.question
// without an EOF guard, so a non-interactive stdin (pipe, CI, `< /dev/null`) left
// the promise pending — Node then warned about an "unsettled top-level await" at
// exit and the command hung. ask/askSecret now resolve on the readline `close`
// event (fired on EOF) with the default / empty string instead of hanging. close()
// here simulates that EOF/non-interactive close.

test("createPrompt.ask resolves the default on EOF (non-interactive, no hang)", async () => {
  const { createPrompt } = await import("../../bin/cli/io.mjs");
  const p = createPrompt();
  const pending = p.ask("Name", "fallback");
  p.close();
  assert.equal(await pending, "fallback");
});

test("createPrompt.ask resolves empty when there is no default on EOF", async () => {
  const { createPrompt } = await import("../../bin/cli/io.mjs");
  const p = createPrompt();
  const pending = p.ask("Name");
  p.close();
  assert.equal(await pending, "");
});

test("createPrompt.askSecret resolves empty on EOF (no hang)", async () => {
  const { createPrompt } = await import("../../bin/cli/io.mjs");
  const p = createPrompt();
  const pending = p.askSecret("Secret");
  p.close();
  assert.equal(await pending, "");
});
