import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const root = fileURLToPath(new URL("../../", import.meta.url));

test("streaming credential gate compiles with its production resolver", { timeout: 60000 }, () => {
  const config = ts.readConfigFile(path.join(root, "tsconfig.json"), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const options = ts.convertCompilerOptionsFromJson(config.config.compilerOptions, root);
  assert.deepEqual(options.errors, []);
  const gate = path.join(root, "src/lib/streamingCredentialTransform.ts");
  const registry = path.join(root, "src/lib/guardrails/registry.ts");
  const fixture = path.join(root, "tests/unit/streaming-credential-gate-contract.ts");
  const input = [
    'import { resolveCredentialGate } from "../../src/lib/streamingCredentialTransform.ts";',
    'import { resolveDisabledGuardrails } from "../../src/lib/guardrails/registry.ts";',
    "export function forward(input: Parameters<typeof resolveCredentialGate>[0]) {",
    "  return resolveDisabledGuardrails(input);",
    "}",
  ].join("\n");
  const compilerOptions = {
    ...options.options,
    types: ["node"],
    noCheck: false,
    noEmit: true,
    incremental: false,
  };
  const host = ts.createCompilerHost(compilerOptions);
  const getSourceFile = host.getSourceFile.bind(host);
  const sameFixture = (file) => ts.normalizePath(file) === ts.normalizePath(fixture);
  host.getSourceFile = (file, languageVersion, onError, shouldCreateNewSourceFile) =>
    sameFixture(file)
      ? ts.createSourceFile(file, input, languageVersion, true)
      : getSourceFile(file, languageVersion, onError, shouldCreateNewSourceFile);
  const program = ts.createProgram(
    [fixture, path.join(root, "src/types/global.d.ts")],
    compilerOptions,
    host
  );
  assert.ok(program.getSourceFile(gate), "Compiler must load the real streaming gate");
  assert.ok(program.getSourceFile(registry), "Compiler must load the production resolver");
  const source = program.getSourceFile(fixture);
  assert.ok(source, "Compiler must load the caller contract");
  // A caller must be able to forward the gate's request fields to the production resolver.
  const diagnostics = [
    ...program.getOptionsDiagnostics(),
    ...program.getSyntacticDiagnostics(source),
    ...program.getSemanticDiagnostics(source),
  ];
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
