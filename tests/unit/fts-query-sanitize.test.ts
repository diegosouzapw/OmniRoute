import { test, describe } from "node:test";
import assert from "node:assert/strict";
import Database from "better-sqlite3";
import {
  sanitizeFtsQuery,
  isEmptyFtsQuery,
  MAX_FTS_QUERY_LENGTH,
  MAX_FTS_TERMS,
} from "../../src/lib/db/ftsQuery.ts";

/**
 * Regression guard for the FTS5 injection/syntax gap.
 *
 * Binding a search term as a parameter (`... MATCH ?`) blocks SQL injection but
 * NOT FTS5's own grammar — a bare `-`, a stray `"`, `*`, `col:` or `NEAR/` in
 * user text raised "fts5: syntax error" and aborted the search. In
 * memory/retrieval.ts the throw was swallowed by a catch that fell back to a
 * date-ordered query, so the user silently got *recent* rows instead of
 * *matching* ones.
 */

function withFts<T>(fn: (db: Database.Database) => T): T {
  const db = new Database(":memory:");
  try {
    db.exec("CREATE VIRTUAL TABLE docs USING fts5(body);");
    const ins = db.prepare("INSERT INTO docs(body) VALUES (?)");
    ins.run("hello world alpha beta");
    ins.run("routing fallback provider kilocode");
    ins.run("the quick brown fox");
    return fn(db);
  } finally {
    db.close();
  }
}

const matchCount = (db: Database.Database, q: string) =>
  (db.prepare("SELECT count(*) c FROM docs WHERE docs MATCH ?").get(q) as { c: number }).c;

// Inputs a real user can type that break an unsanitized MATCH.
const HOSTILE = [
  'hello"',
  "*",
  "NEAR/",
  "(hello",
  "nosuchcol: hello",
  "fallback AND NOT provider",
  "-hello",
  "   ",
  "!!!@@@###",
  '" OR 1=1 --',
  "a".repeat(MAX_FTS_QUERY_LENGTH + 200),
];

describe("sanitizeFtsQuery", () => {
  test("every sanitized input is accepted by FTS5", () => {
    withFts((db) => {
      for (const raw of HOSTILE) {
        const safe = sanitizeFtsQuery(raw);
        if (safe === null) continue; // caller skips the FTS branch
        assert.doesNotThrow(
          () => matchCount(db, safe),
          `sanitized form of ${JSON.stringify(raw)} still threw`
        );
      }
    });
  });

  test("at least one hostile input genuinely breaks the raw path", () => {
    // Guards the premise: if FTS5 ever stops throwing, this test should be
    // revisited rather than silently passing for the wrong reason.
    withFts((db) => {
      const threw = HOSTILE.filter((raw) => {
        try {
          matchCount(db, raw);
          return false;
        } catch {
          return true;
        }
      });
      assert.ok(threw.length > 0, "expected raw operator input to throw");
    });
  });

  test("ordinary search still returns the right rows", () => {
    withFts((db) => {
      const safe = sanitizeFtsQuery("routing fallback");
      assert.notEqual(safe, null);
      assert.equal(matchCount(db, safe as string), 1);
    });
  });

  test("prefix search matches a partial token", () => {
    withFts((db) => {
      const safe = sanitizeFtsQuery("kilo", { prefix: true });
      assert.notEqual(safe, null);
      assert.equal(matchCount(db, safe as string), 1);
    });
  });

  test("quotes are doubled, not dropped", () => {
    assert.equal(sanitizeFtsQuery('say "hi"'), '"say" "hi"');
  });

  test("returns null when nothing searchable survives", () => {
    for (const empty of ["", "   ", "***", "!!!", null, undefined, 42, {}]) {
      assert.equal(sanitizeFtsQuery(empty as unknown), null, `expected null for ${String(empty)}`);
    }
  });

  test("isEmptyFtsQuery agrees with sanitizeFtsQuery", () => {
    assert.equal(isEmptyFtsQuery("***"), true);
    assert.equal(isEmptyFtsQuery("hello"), false);
  });

  test("caps term count", () => {
    const many = Array.from({ length: MAX_FTS_TERMS + 20 }, (_, i) => `t${i}`).join(" ");
    const safe = sanitizeFtsQuery(many);
    assert.notEqual(safe, null);
    assert.equal((safe as string).split(" ").length, MAX_FTS_TERMS);
  });

  test("bounds overlong input", () => {
    const safe = sanitizeFtsQuery("a".repeat(MAX_FTS_QUERY_LENGTH + 500));
    assert.notEqual(safe, null);
    // +2 for the surrounding quotes.
    assert.ok((safe as string).length <= MAX_FTS_QUERY_LENGTH + 2);
  });

  test("the no-match fallback used by hybrid search is valid FTS5", () => {
    // vectorStore.searchHybrid falls back to '""' so the vector half of the
    // fusion still returns when the text half has nothing searchable.
    withFts((db) => {
      assert.doesNotThrow(() => matchCount(db, '""'));
      assert.equal(matchCount(db, '""'), 0);
    });
  });
});
