import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");

test("streamMaterialize leaf exports makeOnStreamComplete", async () => {
  const mod = await import("../../../open-sse/handlers/chatCore/streamMaterialize.ts");
  assert.equal(typeof mod.makeOnStreamComplete, "function");
});

test("chatCore barrel no longer nests const onStreamComplete", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("const onStreamComplete = ({"),
    false,
    "nested const onStreamComplete = ({ must leave the barrel"
  );
});
