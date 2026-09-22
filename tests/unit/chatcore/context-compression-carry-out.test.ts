import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// The compression block was lifted out of handleChatCore into its own leaf.
// Everything it reassigns now has to travel back through the result object and
// be reseated by the caller. Dropping one of those write-backs is silent: the
// compression still runs, its output is just thrown away, and every existing
// compression suite stays green because they exercise the leaf's internals
// rather than the barrel's plumbing.
//
// This pins the plumbing itself: every field the leaf returns must be reseated
// by the barrel.
//
// Both halves are read through the TypeScript parser rather than by regex. A
// text pattern here would encode today's formatting — indentation, whether the
// return object is split across lines — and go red on a reformat that changed
// no behaviour at all.

const leafPath = new URL(
  "../../../open-sse/handlers/chatCore/contextCompression.ts",
  import.meta.url
);
const parentLeafPath = new URL(
  "../../../open-sse/handlers/chatCore/cacheAndCompress.ts",
  import.meta.url
);

function parse(path: URL) {
  return ts.createSourceFile(
    path.pathname,
    readFileSync(path, "utf8"),
    ts.ScriptTarget.ESNext,
    true
  );
}

/** Shorthand property names on the object literal `applyContextCompression` returns. */
function returnedFields(): string[] {
  const sf = parse(leafPath);
  let fn: ts.FunctionDeclaration | null = null;
  const findFn = (node: ts.Node) => {
    if (ts.isFunctionDeclaration(node) && node.name?.text === "applyContextCompression") {
      fn = node;
    }
    ts.forEachChild(node, findFn);
  };
  findFn(sf);
  assert.ok(fn, "applyContextCompression must exist in the leaf");

  const body = (fn as ts.FunctionDeclaration).body;
  assert.ok(body, "applyContextCompression must have a body");

  const returns: ts.ReturnStatement[] = [];
  const findReturns = (node: ts.Node) => {
    // Nested functions carry their own returns; stop before descending into one.
    if (ts.isFunctionLike(node) && node !== fn) return;
    if (ts.isReturnStatement(node)) returns.push(node);
    ts.forEachChild(node, findReturns);
  };
  ts.forEachChild(body, findReturns);

  assert.equal(returns.length, 1, "the leaf must have exactly one exit so the contract is total");
  const expr = returns[0].expression;
  assert.ok(
    expr && ts.isObjectLiteralExpression(expr),
    "the leaf must return an object literal carrying its results"
  );
  return expr.properties
    .map((prop) => (prop.name && ts.isIdentifier(prop.name) ? prop.name.text : null))
    .filter((name): name is string => name !== null)
    .sort();
}

/** `x = compressionOutcome.y;` assignments in the parent leaf / caller, as [target, source] pairs. */
function callerWriteBacks(): Array<[string, string]> {
  const sf = parse(parentLeafPath);
  const pairs: Array<[string, string]> = [];
  const walk = (node: ts.Node) => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isIdentifier(node.left) &&
      ts.isPropertyAccessExpression(node.right) &&
      ts.isIdentifier(node.right.expression) &&
      node.right.expression.text === "compressionOutcome"
    ) {
      pairs.push([node.left.text, node.right.name.text]);
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);
  return pairs;
}

test("the leaf returns every value it reassigns", () => {
  const fields = returnedFields();
  // Eleven: the twelve mutable carry-ins minus nativeCodexPassthrough, which is
  // read-only. The count is deliberately exact. A new field on the result is
  // only half a change — it also needs a write-back in the barrel — so growing
  // the contract should break this and send you to the other test below.
  assert.equal(fields.length, 11, `expected the full carry-out set, got ${fields.join(", ")}`);
  assert.ok(fields.includes("body"), "body is reassigned inside the block");
  assert.ok(fields.includes("tokensCompressed"));
  assert.ok(fields.includes("compressionResponseMeta"));
});

test("the caller reseats every field the leaf returns", () => {
  const reseated = new Set(callerWriteBacks().map(([, source]) => source));
  const missing = returnedFields().filter((field) => !reseated.has(field));
  assert.deepEqual(
    missing,
    [],
    "the caller drops these compression results on the floor: " + missing.join(", ")
  );
});

test("the caller does not reseat anything the leaf never returns", () => {
  const returned = new Set(returnedFields());
  const pairs = callerWriteBacks();
  assert.ok(pairs.length > 0, "the caller must consume the compression result");
  for (const [target, source] of pairs) {
    assert.equal(target, source, "a write-back must not cross-wire two fields");
    assert.ok(
      returned.has(source),
      `the caller reads compressionOutcome.${source}, which the leaf does not return`
    );
  }
});

test("nativeCodexPassthrough stays an input, never a carry-out", () => {
  // It is destructured as a const from the request prelude. The block reads it
  // to decide whether reactive compaction applies, but never assigns it, so
  // putting it in the result would produce an assignment to a constant at
  // runtime while typechecking clean.
  assert.ok(
    !returnedFields().includes("nativeCodexPassthrough"),
    "nativeCodexPassthrough must not be returned"
  );
  assert.ok(
    !callerWriteBacks().some(([, source]) => source === "nativeCodexPassthrough"),
    "assigning it would throw: it is a const in the caller"
  );
});
