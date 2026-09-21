import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { ExecuteInput } from "@omniroute/open-sse/executors/base";

const { AuggieExecutor, __resetAuggieModels } = await import(
  "@omniroute/open-sse/executors/auggie"
);

function makeFakeAuggieBin(dir: string, stderrLine: string): string {
  const fakeBin = path.join(dir, "fake-auggie.sh");
  fs.writeFileSync(fakeBin, `#!/bin/sh\necho "${stderrLine}" 1>&2\nexit 1\n`);
  fs.chmodSync(fakeBin, 0o755);
  return fakeBin;
}

async function withFakeAuggieBin<T>(
  stderrLine: string,
  fn: (dir: string) => Promise<T>
): Promise<T> {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "auggie-probe-"));
  const fakeBin = makeFakeAuggieBin(dir, stderrLine);
  const prevBin = process.env.AUGGIE_BIN;
  process.env.AUGGIE_BIN = fakeBin;
  __resetAuggieModels();
  try {
    return await fn(dir);
  } finally {
    if (prevBin === undefined) delete process.env.AUGGIE_BIN;
    else process.env.AUGGIE_BIN = prevBin;
    __resetAuggieModels();
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

test("Auggie CLI-not-found surfaced via shell exit code (non-streaming) gets the actionable cliNotFoundMessage", async () => {
  await withFakeAuggieBin(
    "'auggie' is not recognized as an internal or external command,",
    async () => {
      const executor = new AuggieExecutor();
      const { response } = await executor.execute({
        model: "",
        body: { messages: [{ role: "user", content: "hi" }] },
        stream: false,
        credentials: {} as never,
      } satisfies ExecuteInput);

      const json = await response.json();
      const message: string = json?.error?.message ?? "";

      // sanitizeErrorMessage() redacts the absolute bin path (and anything the
      // path-redaction tokenizer folds into it) — see errorPathRedaction.ts —
      // so the assertion mirrors the existing precedent in
      // auggie-executor.test.ts: assert the actionable prefix routed through
      // cliNotFoundMessage(), and that the raw, confusing shell text from
      // #12645 is gone.
      assert.match(
        message,
        /Auggie CLI not found/,
        `expected the actionable 'Auggie CLI not found' message, but got: ${message}`
      );
      assert.doesNotMatch(
        message,
        /is not recognized as an internal or external command/i,
        `expected the raw shell text to be replaced, but got: ${message}`
      );
    }
  );
});

test("Auggie CLI-not-found surfaced via shell exit code (streaming) gets the actionable cliNotFoundMessage", async () => {
  await withFakeAuggieBin("sh: 1: auggie: not found", async () => {
    const executor = new AuggieExecutor();
    const { response } = await executor.execute({
      model: "",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {} as never,
    } satisfies ExecuteInput);

    const text = await response.text();
    const dataLine = text
      .split("\n")
      .find((line) => line.startsWith("data: ") && line.includes('"error"'));
    assert.ok(dataLine, `expected an SSE error frame, got body: ${text}`);
    const payload = JSON.parse(dataLine!.slice("data: ".length));
    const message: string = payload?.error?.message ?? "";

    assert.match(
      message,
      /Auggie CLI not found/,
      `expected the actionable 'Auggie CLI not found' message, but got: ${message}`
    );
    assert.doesNotMatch(
      message,
      /exited with code/i,
      `expected the raw shell exit-code text to be replaced, but got: ${message}`
    );
  });
});
