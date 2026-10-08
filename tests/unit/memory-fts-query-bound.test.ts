import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

import {
  getRelevanceScore,
  rowToMemory,
  sanitizeFts5Query,
} from "../../src/lib/memory/retrieval/scoring.ts";

describe("memory lexical query budgets", () => {
  it("preserves short-query sanitization, quoted phrases, and repeated terms", () => {
    assert.equal(sanitizeFts5Query(undefined), "");
    assert.equal(sanitizeFts5Query(" * : ( ) "), "");
    assert.equal(
      sanitizeFts5Query('hello_world OR café "hello"'),
      '"hello_world" "OR" "café" "hello"'
    );
    assert.equal(sanitizeFts5Query("hello hello"), '"hello" "hello"');
  });

  it("caps the implicit-AND expression before a long prompt reaches SQLite", () => {
    const query = sanitizeFts5Query("word ".repeat(50_000));
    assert.equal(query.split(" ").length, 32);
    assert.equal(query, Array(32).fill('"word"').join(" "));
  });

  it("bounds scanned characters even for one huge phrase or punctuation prefix", () => {
    assert.ok(sanitizeFts5Query("word".repeat(50_000)).length <= 4096 + 2);
    assert.equal(sanitizeFts5Query("!".repeat(4096) + "needle"), "");
    assert.ok(sanitizeFts5Query("é_".repeat(50_000)).length <= 4096 + 2);
  });

  it("bounds fallback scoring while preserving normal full-phrase scores", () => {
    const memory = rowToMemory({ id: "fixture", type: "fact" as never, content: "word" });
    assert.equal(getRelevanceScore(memory, "word"), 23);
    assert.equal(getRelevanceScore(memory, "word ".repeat(50_000)), 32 * 3);
    assert.equal(getRelevanceScore(memory, "!".repeat(4096) + " word"), 0);
  });

  it("executes bounded long-query MATCH expressions in a killable SQLite child", () => {
    // Assert the budgets first: the old implementation must fail without sending
    // an uncapped synchronous MATCH to the test runner or its database driver.
    const queries = [
      sanitizeFts5Query("word ".repeat(50_000)),
      sanitizeFts5Query("a_".repeat(50_000)),
      sanitizeFts5Query("é_".repeat(50_000)),
    ];
    for (const query of queries) {
      assert.ok(query.length <= 4096 + 64);
      assert.ok(query.split(" ").length <= 32);
    }
    const child = spawnSync(
      process.execPath,
      [fileURLToPath(new URL("../fixtures/memory-fts-query-bound.cjs", import.meta.url))],
      { input: JSON.stringify(queries), encoding: "utf8", timeout: 5000 }
    );
    assert.ifError(child.error);
    assert.equal(child.status, 0, child.stderr);
    assert.deepEqual(JSON.parse(child.stdout), [1, 0, 0]);
  });
});
