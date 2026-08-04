import test from "node:test";
import assert from "node:assert/strict";
import { resolveOpenCommand } from "../../bin/cli/commands/dashboard.mjs";

test("openFallback: darwin uses 'open' command", () => {
  const { cmd, args } = resolveOpenCommand("darwin", "http://localhost:20128");
  assert.equal(cmd, "open");
  assert.deepEqual(args, ["http://localhost:20128"]);
});

test("openFallback: win32 uses 'rundll32 url.dll,FileProtocolHandler' instead of cmd.exe", () => {
  const { cmd, args } = resolveOpenCommand("win32", "http://localhost:20128");
  assert.equal(cmd, "rundll32");
  assert.deepEqual(args, ["url.dll,FileProtocolHandler", "http://localhost:20128"]);
  assert.notEqual(cmd, "cmd");
});

test("openFallback: linux/other uses 'xdg-open' command", () => {
  const { cmd, args } = resolveOpenCommand("linux", "http://localhost:20128");
  assert.equal(cmd, "xdg-open");
  assert.deepEqual(args, ["http://localhost:20128"]);
});

test("openFallback: unknown platform falls back to xdg-open", () => {
  const { cmd, args } = resolveOpenCommand("aix", "http://localhost:20128");
  assert.equal(cmd, "xdg-open");
  assert.deepEqual(args, ["http://localhost:20128"]);
});

test("openFallback: URL with special characters is passed through verbatim", () => {
  const url = "http://localhost:20128/dashboard?q=test&filter=a+b";
  const { cmd, args } = resolveOpenCommand("win32", url);
  assert.equal(cmd, "rundll32");
  assert.equal(args[1], url);
});
