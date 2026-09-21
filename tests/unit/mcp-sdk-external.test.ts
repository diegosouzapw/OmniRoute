import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The bundled MCP SDK client graph contains a module-level `class extends
// Client` cycle against the async Client module. Under Next's standalone
// webpack TLA runtime that cycle throws `ReferenceError: Cannot access 'l'
// before initialization` during module evaluation, which takes down
// /api/mcp/stream with HTTP 500 on every initialize. Node's native ESM
// loader resolves the same circular graph through live bindings, so the SDK
// must stay external to the server bundle.
test("next.config keeps @modelcontextprotocol/sdk out of the server bundle", () => {
  const src = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
  // Strip // line comments first: a commented-out entry must not satisfy the check.
  const uncommented = src
    .split("\n")
    .map((line) => line.replace(/[/][/].*$/, ""))
    .join("\n");
  const externalBlock = uncommented.match(/serverExternalPackages:\s*\[([\s\S]*?)\]/);
  assert.ok(externalBlock, "serverExternalPackages block must exist");
  assert.ok(
    /["']@modelcontextprotocol[/]sdk["']/.test(externalBlock[1]),
    "serverExternalPackages must externalize @modelcontextprotocol/sdk",
  );
});
