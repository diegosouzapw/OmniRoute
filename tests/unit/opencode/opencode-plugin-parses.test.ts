/**
 * opencode-plugin-parses.test.ts — regression guard: the opencode-plugin sources
 * must at least PARSE as TypeScript.
 *
 * The plugin is a standalone package (not an npm workspace), so it is outside
 * typecheck:core and outside both test runners — nothing parses it until the
 * release build (prepublish → tsup dts). The #9316 merge auto-resolve left a
 * doubled `});` in src/index.ts that broke every release build with a cascade
 * of "Cannot find name" DTS errors. This guard makes that class of damage fail
 * in the unit suite instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const PLUGIN_SRC = fileURLToPath(new URL("../../../@omniroute/opencode-plugin/src", import.meta.url));

test("@omniroute/opencode-plugin sources parse without syntax errors", async () => {
  const entries = await readdir(PLUGIN_SRC, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && e.name.endsWith(".ts"))
    .map((e) => join(PLUGIN_SRC, e.name));

  assert.ok(files.length > 0, "no plugin source files found");

  const problems: string[] = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    const { diagnostics } = ts.transpileModule(source, {
      reportDiagnostics: true,
      compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
      fileName: file,
    });
    for (const diag of diagnostics ?? []) {
      const where =
        diag.file && diag.start !== undefined
          ? diag.file.getLineAndCharacterOfPosition(diag.start)
          : null;
      problems.push(
        `${file}${where ? `:${where.line + 1}:${where.character + 1}` : ""} — ` +
          ts.flattenDiagnosticMessageText(diag.messageText, " ")
      );
    }
  }

  assert.deepEqual(problems, [], `syntax errors in opencode-plugin:\n${problems.join("\n")}`);
});
