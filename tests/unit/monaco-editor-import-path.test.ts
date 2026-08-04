import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(import.meta.url);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const monacoComponent = path.join(repoRoot, "src/shared/components/MonacoEditor.tsx");

// Regression guard for #7897 (monaco-editor 0.55.1 -> 0.56.0). Monaco 0.56 shipped a
// restrictive `exports` map (`"./*.js": "./esm/vs/*.js"`, `"./*": "./esm/vs/*.js"`) that
// rewrites every subpath by prepending `esm/vs/`. The pre-0.56 deep import
// `monaco-editor/esm/vs/editor/editor.api` therefore resolves to the doubled, non-existent
// `esm/vs/esm/vs/editor/editor.api.js` and breaks the production (Turbopack) build. The
// 0.56-compatible specifier drops the `esm/vs/` prefix: `monaco-editor/editor/editor.api.js`.

test("MonacoEditor.tsx uses the 0.56-compatible monaco specifier (no esm/vs prefix)", () => {
  const src = readFileSync(monacoComponent, "utf8");
  const match = src.match(/import\(\s*["'](monaco-editor\/[^"']+)["']\s*\)/);
  assert.ok(match, "expected a dynamic import of a monaco-editor subpath in MonacoEditor.tsx");
  const specifier = match[1];
  assert.ok(
    !specifier.includes("esm/vs/"),
    `monaco deep import must not include the esm/vs/ prefix under monaco 0.56 exports (got "${specifier}")`
  );
});

test("the monaco specifier resolves to a real file under the installed monaco-editor", () => {
  const src = readFileSync(monacoComponent, "utf8");
  const specifier = src.match(/import\(\s*["'](monaco-editor\/[^"']+)["']\s*\)/)![1];
  const resolved = require.resolve(specifier);
  assert.ok(resolved.endsWith("editor.api.js"), `expected to resolve editor.api.js, got ${resolved}`);
});
