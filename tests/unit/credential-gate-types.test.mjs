import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

test(
  "credential cache and gate accept optional diagnoses under strict null checks",
  { timeout: 15000 },
  () => {
    const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
    const core = ts.readConfigFile(
      path.join(root, "tsconfig.typecheck-core.json"),
      ts.sys.readFile
    );
    assert.equal(config.error, undefined);
    assert.equal(core.error, undefined);
    assert.equal(core.config.compilerOptions.strictNullChecks, true);
    const options = ts.convertCompilerOptionsFromJson(
      {
        ...config.config.compilerOptions,
        ...core.config.compilerOptions,
        incremental: false,
        types: [],
      },
      root
    );
    assert.deepEqual(options.errors, []);
    const files = ["src/lib/credentialHealth/cache.ts", "open-sse/services/credentialGate.ts"].map(
      (file) => path.join(root, file)
    );
    const program = ts.createProgram(files, options.options);
    for (const file of files) assert.ok(program.getSourceFile(file), `Compiler must load ${file}`);
    // Semantic checking reads the real pure dependency closure; it never evaluates app modules.
    const diagnostics = ts.getPreEmitDiagnostics(program);
    assert.equal(
      diagnostics.length,
      0,
      ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: (file) => file,
        getCurrentDirectory: () => root,
        getNewLine: () => "\n",
      })
    );
  }
);
