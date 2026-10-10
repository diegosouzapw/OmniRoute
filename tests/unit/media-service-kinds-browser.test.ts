import assert from "node:assert/strict";
import test from "node:test";
import { build } from "esbuild";

test("dashboard media service kinds bundle without server-only dependencies", async () => {
  const result = await build({
    entryPoints: ["src/lib/providers/serviceKindIndex.ts"],
    bundle: true,
    platform: "browser",
    write: false,
    metafile: true,
    logLevel: "silent",
    tsconfig: "tsconfig.json",
  });
  assert.ok(result.outputFiles[0].text.length > 0);
  const inputs = Object.keys(result.metafile!.inputs);
  assert.ok(
    !inputs.some((file) => /src\/lib\/db\/|node_modules\/(sharp|better-sqlite3)\//.test(file))
  );
});
