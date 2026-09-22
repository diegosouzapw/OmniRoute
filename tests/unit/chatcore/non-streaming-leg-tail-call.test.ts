import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// The non-streaming leg carries nothing back to the barrel, and that is only
// safe because the barrel tail-calls it: `return await runNonStreamingLeg(...)`
// with nothing after it. The streaming leg is the opposite shape -- it can fall
// through, so the barrel keeps using values the leg rebound, and every one of
// those has to be carried out explicitly (see streaming-leg-carry.test.ts).
//
// If someone ever adds work after that return, the two legs stop being
// different shapes and the non-streaming one silently acquires the same
// stale-value problem this suite caught in the streaming one.

const barrelPath = new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url);

const parseBarrel = () => {
  const source = readFileSync(barrelPath, "utf8");
  return {
    source,
    tree: ts.createSourceFile("chatCore.ts", source, ts.ScriptTarget.ESNext, true),
  };
};

const findCall = (tree: ts.SourceFile, callee: string) => {
  const hits: ts.CallExpression[] = [];
  const walk = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === callee
    ) {
      hits.push(node);
    }
    node.forEachChild(walk);
  };
  walk(tree);
  return hits;
};

test("the barrel tail-calls the non-streaming leg, so it needs no carry-out", () => {
  const { tree } = parseBarrel();
  const calls = findCall(tree, "runNonStreamingLeg");

  assert.equal(
    calls.length,
    1,
    `expected exactly one callsite, found ${calls.length} -- a second one would need its own review of whether the tail-call property still holds`
  );

  const call = calls[0];
  const line = tree.getLineAndCharacterOfPosition(call.getStart(tree)).line + 1;

  // Walk out to the enclosing return, tolerating the await in between.
  let node: ts.Node | undefined = call.parent;
  while (node && !ts.isReturnStatement(node)) {
    // Anything other than await between the call and the return means the
    // result is being consumed rather than handed straight back.
    assert.ok(
      ts.isAwaitExpression(node) || ts.isParenthesizedExpression(node),
      `line ${line}: the leg's result flows through ${ts.SyntaxKind[node.kind]} instead of being returned directly`
    );
    node = node.parent;
  }
  assert.ok(node, `line ${line}: the leg's result is not returned`);

  const block = node.parent;
  assert.ok(
    block && ts.isBlock(block),
    `line ${line}: expected the return to sit directly in a block`
  );

  const trailing = (block as ts.Block).statements.filter(
    (statement) => statement.getStart(tree) > node!.getEnd()
  );
  assert.deepEqual(
    trailing.map(
      (statement) =>
        `${tree.getLineAndCharacterOfPosition(statement.getStart(tree)).line + 1}: ${ts.SyntaxKind[statement.kind]}`
    ),
    [],
    "code now runs after the non-streaming leg returns, so values the leg rebinds no longer reach it -- give it a carry-out like the streaming leg has"
  );
});
