import test from "node:test";
import assert from "node:assert/strict";
import { patchZcodeImageProtocol } from "../../scripts/ops/zcode-image-runtime.mjs";

test("ZCode image patch changes only the native user-content schema and fails closed on drift", () => {
  const schema =
    'prefix;m.object({role:m.literal("user"),content:m.string()}).strict(),m.object({role:m.literal("assistant"),content:m.string(),toolCalls:suffix';
  const patched = patchZcodeImageProtocol(schema);
  assert.match(patched, /dataUrl:m.string\(\).startsWith\("data:image\/"\)/);
  assert.match(patched, /role:m.literal\("assistant"\),content:m.string\(\),toolCalls:suffix$/);
  assert.ok(patched.startsWith("prefix;"));
  assert.throws(() => patchZcodeImageProtocol("unknown native build"), /exactly one/);
  assert.throws(() => patchZcodeImageProtocol(schema + schema), /exactly one/);
});
