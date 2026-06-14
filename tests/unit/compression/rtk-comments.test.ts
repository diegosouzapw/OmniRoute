import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { stripCode } from "../../../open-sse/services/compression/index.ts";

const OPTS = { removeComments: true, removeEmptyLines: false, collapseWhitespace: false };

describe("RTK code stripper — real comment removal (R1/N3)", () => {
  it("removes JS line and block comments when removeComments is enabled", () => {
    const out = stripCode("// header\nconst x = 1; /* inline */\nconst y = 2;", "javascript", OPTS);
    assert.ok(!out.text.includes("header"), "line comment not removed");
    assert.ok(!out.text.includes("inline"), "block comment not removed");
    assert.ok(out.text.includes("const x = 1;"), "code corrupted (x)");
    assert.ok(out.text.includes("const y = 2;"), "code corrupted (y)");
  });

  it("preserves string content that looks like a comment", () => {
    const out = stripCode(
      'const url = "https://example.com/a//b"; // real comment',
      "javascript",
      OPTS
    );
    assert.ok(out.text.includes("https://example.com/a//b"), "URL inside string lost");
    assert.ok(!out.text.includes("real comment"), "trailing comment not removed");
  });

  it("preserves regex literals containing slashes", () => {
    const out = stripCode("const re = /foo\\/\\/bar/g; // strip me", "typescript", OPTS);
    assert.ok(out.text.includes("/foo\\/\\/bar/g"), "regex literal corrupted");
    assert.ok(!out.text.includes("strip me"), "trailing comment not removed");
  });

  it("preserves template literals containing comment-like text", () => {
    const out = stripCode(
      "const t = `a // not a comment /* nor this */ b`; // yes comment",
      "javascript",
      OPTS
    );
    assert.ok(
      out.text.includes("a // not a comment /* nor this */ b"),
      "template literal corrupted"
    );
    assert.ok(!out.text.includes("yes comment"), "trailing comment not removed");
  });

  it("preserves JSX comments (bails out on JSX to avoid corruption)", () => {
    const out = stripCode("const el = <div>{/* keep me */}</div>;", "typescript", OPTS);
    assert.ok(out.text.includes("{/* keep me */}"), "JSX comment must be preserved");
    assert.ok(out.text.includes("<div>"), "JSX must be preserved");
  });

  it("preserves comments by default (no behavioral change without opt-in)", () => {
    const out = stripCode("// keep\nconst x = 1;", "javascript");
    assert.ok(out.text.includes("// keep"), "default must preserve comments");
  });

  it("does not touch non-JS/TS languages", () => {
    const py = stripCode("# py comment\nprint('ok')", "python", OPTS);
    assert.ok(py.text.includes("# py comment"), "python comment should be untouched by JS remover");
  });
});
