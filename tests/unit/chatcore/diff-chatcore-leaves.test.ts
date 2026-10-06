import test from "node:test";
import assert from "node:assert/strict";

import {
  classifyHunk,
  myersHunks,
  normalize,
  sliceRegion,
  tokenize,
  // @ts-expect-error - plain .mjs dev script without type declarations
} from "../../../scripts/dev/diff-chatcore-leaves.mjs";

const region = {
  carryKeys: ["a", "b"],
  allowRemoved: [],
};

test("tokenize ignores comments, whitespace and prettier re-wrap commas", () => {
  const wrapped = tokenize("foo(\n  a, // note\n  b,\n);");
  const flat = tokenize("foo(a, b);");
  assert.deepEqual(wrapped, flat);
});

test("normalize drops blank, line-comment and block-comment lines", () => {
  assert.deepEqual(normalize("  a  =  1;\n\n// c\n/* x\n y */\n  b;"), ["a = 1;", "b;"]);
});

test("sliceRegion honours the anchor, start and end patterns", () => {
  const lines = ["x", "start", "y", "end", "start", "z", "end"];
  assert.deepEqual(sliceRegion(lines, { startPattern: /^start$/, endPattern: /^end$/ }), [
    "start",
    "y",
  ]);
  assert.deepEqual(
    sliceRegion(lines, {
      after: /^end$/,
      startPattern: /^start$/,
      endPattern: /^end$/,
      inclusiveEnd: true,
    }),
    ["start", "z", "end"]
  );
});

test("identical token streams produce no hunks; a changed literal produces one", () => {
  const a = tokenize('return fail(499, "Request aborted");');
  assert.equal(myersHunks(a, [...a]).length, 0);
  const b = tokenize('return fail(499, "Request aborted!");');
  const hunks = myersHunks(a, b);
  assert.equal(hunks.length, 1);
  assert.equal(
    classifyHunk(
      a.slice(hunks[0].aStart, hunks[0].aEnd).join(" "),
      b.slice(hunks[0].bStart, hunks[0].bEnd).join(" "),
      region
    ),
    null,
    "a rewritten literal is NOT a mechanical seam"
  );
});

test("classifyHunk accepts only the documented lift seams", () => {
  assert.ok(classifyHunk("", "syncExecuteTranslatedBody ( translatedBody ) ;", region));
  assert.ok(classifyHunk("", "{ response :", region));
  assert.ok(classifyHunk("", ", carry : { a , b } }", region));
  assert.ok(classifyHunk("result", "{ response : result , carry : { a , b } }", region));
  // wrong carry keys / unknown additions are rejected
  assert.equal(classifyHunk("", ", carry : { a , c } }", region), null);
  assert.equal(classifyHunk("result", "{ response : other , carry : { a , b } }", region), null);
  assert.equal(classifyHunk("", "doSomethingNew ( ) ;", region), null);
});
