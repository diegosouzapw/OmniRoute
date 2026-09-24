import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

test("companion loader accepts the real executable manifest without a type assertion", () => {
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const options = ts.convertCompilerOptionsFromJson(config.config.compilerOptions, root);
  assert.deepEqual(options.errors, []);
  const files = ["src/lib/cli-helper/companionTargets.ts", "src/shared/utils/cliCompanion.ts"].map(
    (file) => path.join(root, file)
  );
  // Use Next's real ambient declarations for the server-only module boundary.
  const program = ts.createProgram(
    [...files, path.join(root, "node_modules/next/types/global.d.ts")],
    {
      ...options.options,
      noEmit: true,
      incremental: false,
    }
  );
  const diagnostics = files.flatMap((file) => {
    const source = program.getSourceFile(file);
    assert.ok(source, `TypeScript must load ${file}`);
    return program.getSemanticDiagnostics(source);
  });
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })
  );
});
