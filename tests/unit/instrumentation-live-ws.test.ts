import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

test("instrumentation-node.ts imports liveServer for in-process WS auto-start", () => {
  const source = readFileSync(resolve("src/instrumentation-node.ts"), "utf8");
  assert.ok(
    source.includes("server/ws/liveServer"),
    "instrumentation-node.ts should import @/server/ws/liveServer"
  );
});
