import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

test("payload metering compiles with the core strict null contract", { timeout: 15000 }, () => {
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  const core = ts.readConfigFile(path.join(root, "tsconfig.typecheck-core.json"), ts.sys.readFile);
  assert.equal(config.error, undefined);
  assert.equal(core.error, undefined);
  assert.equal(core.config.compilerOptions.strictNullChecks, true);
  const options = ts.convertCompilerOptionsFromJson(
    {
      ...config.config.compilerOptions,
      ...core.config.compilerOptions,
      incremental: false,
      types: ["node"],
    },
    root
  );
  assert.deepEqual(options.errors, []);
  const file = path.join(root, "open-sse/utils/proxyPayloadMetering.ts");
  // Check the real module without evaluating transports, application state or the database.
  const program = ts.createProgram([file], options.options);
  assert.ok(program.getSourceFile(file));
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (filename) => filename,
      getCurrentDirectory: () => root,
      getNewLine: () => "\n",
    })
  );
});
