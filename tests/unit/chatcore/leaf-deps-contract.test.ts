import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

// The streaming/non-streaming/tail leaves take a loosely typed deps bag
// (Record<string, any>), so the compiler cannot notice a key the leaf reads
// but chatCore.ts never passes — the leaf then dies at runtime with
// "x is not a function" (the streaming direct-refresh retry lost
// getExecutorClientHeaders this way). Assert the contract structurally.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const BARREL = path.join(ROOT, "open-sse/handlers/chatCore.ts");
const LEAVES: Record<string, string> = {
  runStreamingResponse: "open-sse/handlers/chatCore/streamingResponse.ts",
  runNonStreamingResponse: "open-sse/handlers/chatCore/nonStreamingResponse.ts",
  runStreamingTail: "open-sse/handlers/chatCore/streamingTail.ts",
};

function parse(file: string): ts.SourceFile {
  return ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
}

function passedKeys(sf: ts.SourceFile, fn: string): Set<string> {
  const keys = new Set<string>();
  const walk = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === fn
    ) {
      const arg = node.arguments[0];
      if (arg && ts.isObjectLiteralExpression(arg)) {
        for (const prop of arg.properties) {
          const name = prop.name;
          if (name && (ts.isIdentifier(name) || ts.isStringLiteral(name))) keys.add(name.text);
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);
  return keys;
}

function readKeys(sf: ts.SourceFile): Set<string> {
  const keys = new Set<string>();
  const walk = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isObjectBindingPattern(node.name) &&
      node.initializer &&
      ts.isIdentifier(node.initializer) &&
      node.initializer.text === "deps"
    ) {
      for (const el of node.name.elements) {
        keys.add(((el.propertyName ?? el.name) as ts.Identifier).text);
      }
    }
    if (
      ts.isPropertyAccessExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "deps"
    ) {
      keys.add(node.name.text);
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);
  return keys;
}

const barrel = parse(BARREL);

for (const [fn, leafPath] of Object.entries(LEAVES)) {
  test(`${fn}: chatCore.ts passes every deps key the leaf reads`, () => {
    const read = readKeys(parse(path.join(ROOT, leafPath)));
    const given = passedKeys(barrel, fn);
    assert.ok(read.size > 0, `no deps keys found in ${leafPath}`);
    assert.ok(given.size > 0, `no ${fn}({...}) call found in chatCore.ts`);
    const missing = [...read].filter((key) => !given.has(key));
    assert.deepEqual(missing, [], `${fn} reads deps keys chatCore.ts never passes`);
  });
}
