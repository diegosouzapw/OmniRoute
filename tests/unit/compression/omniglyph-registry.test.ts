import { test } from "node:test";
import assert from "node:assert";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";
import { getCompressionEngine } from "../../../open-sse/services/compression/engines/registry.ts";
import { ENGINE_CATALOG } from "../../../open-sse/services/compression/engineCatalog.ts";

test("omniglyph registrada nos builtins e no catálogo (single mode, por último)", () => {
  registerBuiltinCompressionEngines();
  const engine = getCompressionEngine("omniglyph");
  assert.ok(engine, "engine registrada");
  assert.equal(engine!.sampling, true);
  const meta = ENGINE_CATALOG["omniglyph"];
  assert.ok(meta, "entrada no catálogo");
  assert.equal(meta!.isSingleMode, true);
  const maxOther = Math.max(
    ...Object.values(ENGINE_CATALOG).filter((m) => m.id !== "omniglyph").map((m) => m.stackPriority)
  );
  assert.ok(meta!.stackPriority > maxOther, "roda por último no stack");
});
