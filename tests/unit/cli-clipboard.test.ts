import test from "node:test";
import assert from "node:assert/strict";

test("clipboard.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/utils/clipboard.mjs");
  assert.equal(typeof mod.copyToClipboard, "function");
  assert.equal(typeof mod.isClipboardSupported, "function");
});

test("isClipboardSupported retorna boolean", async () => {
  const { isClipboardSupported } = await import("../../bin/cli/utils/clipboard.mjs");
  const result = isClipboardSupported();
  assert.ok(typeof result === "boolean");
});

test("copyToClipboard retorna boolean (true em macOS/win, qualquer em Linux)", async () => {
  const { copyToClipboard } = await import("../../bin/cli/utils/clipboard.mjs");
  const result = copyToClipboard("test-text");
  assert.ok(typeof result === "boolean");
});

test("copyToClipboard não lança exceção mesmo sem xclip/xsel/wl-copy", async () => {
  const { copyToClipboard } = await import("../../bin/cli/utils/clipboard.mjs");
  let threw = false;
  try {
    copyToClipboard("some text");
  } catch {
    threw = true;
  }
  assert.ok(!threw);
});
