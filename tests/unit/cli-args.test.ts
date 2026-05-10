import test from "node:test";
import assert from "node:assert/strict";

test("CLI parser treats short flags as flags", async () => {
  const { parseArgs, hasFlag } = await import("../../bin/cli/args.mjs");

  const { flags, positionals } = parseArgs(["doctor", "-h"]);

  assert.deepEqual(positionals, ["doctor"]);
  assert.equal(hasFlag(flags, "h"), true);
});

test("CLI parser supports bundled short flags", async () => {
  const { parseArgs, hasFlag } = await import("../../bin/cli/args.mjs");

  const { flags, positionals } = parseArgs(["providers", "-hv"]);

  assert.deepEqual(positionals, ["providers"]);
  assert.equal(hasFlag(flags, "h"), true);
  assert.equal(hasFlag(flags, "v"), true);
});
