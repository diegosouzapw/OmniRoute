import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "badge-criteria-16195-"));
process.env.DATA_DIR = dataDir;
const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const { addXp, getBadges, hasBadge, unlockBadge } =
  await import("../../../src/lib/db/gamification.ts");
const { evaluateBadges, seedBuiltinBadges } =
  await import("../../../src/lib/gamification/badges.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test.beforeEach(() => {
  const db = getDbInstance();
  db.exec("DELETE FROM user_badges; DELETE FROM badge_definitions;");
});

function define(id: string, criteria: string | null): void {
  getDbInstance()
    .prepare(
      `INSERT INTO badge_definitions (id, name, description, icon, category, rarity, criteria, hidden)
       VALUES (?, ?, '', 'x', 'usage', 'common', ?, 0)`
    )
    .run(id, id, criteria);
}

const regular = JSON.stringify({ type: "action_count", action: "request", threshold: 1 });
const invalid: Array<[string, string | null]> = [
  ["syntax", "not json"],
  ["SQL NULL", null],
  ["empty", ""],
  ["JSON null", "null"],
  ["array", "[]"],
  ["number", "42"],
  ["boolean", "true"],
  ["string", '"text"'],
  ["missing type", "{}"],
  ["null type", '{"type":null}'],
  ["object type", '{"type":{}}'],
  ["array type", '{"type":[]}'],
  ["empty type", '{"type":""}'],
  ["blank type", '{"type":"  "}'],
];

for (const [label, criteria] of invalid) {
  test(`invalid ${label} neither aborts evaluation nor blocks hidden prerequisites`, async () => {
    define("invalid", criteria);
    define("regular", regular);
    define("hidden", '{"type":"hidden"}');
    const owner = `invalid-${label}`;
    addXp(owner, "request", 1);
    assert.deepEqual(await evaluateBadges(owner, "request"), ["regular"]);
    assert.equal(hasBadge(owner, "invalid"), false);
    assert.deepEqual(await evaluateBadges(owner, "request"), ["hidden"]);
    assert.deepEqual(await evaluateBadges(owner, "request"), []);
    assert.deepEqual(
      getBadges(owner)
        .map((badge) => badge.badgeId)
        .sort(),
      ["hidden", "regular"]
    );
    const row = getDbInstance()
      .prepare("SELECT criteria FROM badge_definitions WHERE id = 'invalid'")
      .get() as { criteria: string | null };
    assert.equal(
      row.criteria,
      criteria,
      "invalid persisted definitions are not repaired or removed"
    );
  });
}

test("the built-in catalog continues after malformed criteria and persists a valid award", async () => {
  await seedBuiltinBadges();
  define("broken", "not json");
  addXp("builtin-owner", "request", 1);
  const awarded = await evaluateBadges("builtin-owner", "request");
  assert.ok(awarded.includes("first-token"));
  assert.equal(hasBadge("builtin-owner", "first-token"), true);
  assert.equal(hasBadge("builtin-owner", "broken"), false);
});

test("a valid unearned prerequisite still blocks the hidden badge", async () => {
  define("regular", regular);
  define("hidden", '{"type":"hidden"}');
  assert.deepEqual(await evaluateBadges("unearned-owner", "request"), []);
  assert.equal(hasBadge("unearned-owner", "hidden"), false);
});

test("unknown nonempty type strings remain prerequisites without becoming awards", async () => {
  define("future", '{"type":"future"}');
  define("hidden", '{"type":"hidden"}');
  assert.deepEqual(await evaluateBadges("future-owner", "request"), []);
  unlockBadge("future-owner", "future");
  assert.deepEqual(await evaluateBadges("future-owner", "request"), ["hidden"]);
});

test("the historical hidden substring exclusion is preserved", async () => {
  define("future", '{"type":"custom_hidden"}');
  define("hidden", '{"type":"hidden"}');
  assert.deepEqual(await evaluateBadges("hidden-substring-owner", "request"), ["hidden"]);
  assert.equal(hasBadge("hidden-substring-owner", "future"), false);
});

test("definition order and the earned snapshot are preserved across owners and calls", async () => {
  define("second", regular);
  define("hidden", '{"type":"hidden"}');
  define("first", regular);
  define("invalid-after-hidden", "not json");
  addXp("order-owner-a", "request", 1);
  assert.deepEqual(await evaluateBadges("order-owner-a", "request"), ["second", "first"]);
  assert.deepEqual(await evaluateBadges("order-owner-b", "request"), []);
  assert.deepEqual(await evaluateBadges("order-owner-a", "request"), ["hidden"]);
  assert.deepEqual(await evaluateBadges("order-owner-a", "request"), []);
  assert.deepEqual(getBadges("order-owner-b"), []);
});

test("legitimate SQLite write errors propagate rather than becoming skipped criteria", async () => {
  define("regular", regular);
  addXp("sql-error-owner", "request", 1);
  const db = getDbInstance();
  db.exec(`CREATE TEMP TRIGGER fail_badge_award BEFORE INSERT ON user_badges
    WHEN NEW.api_key_id = 'sql-error-owner'
    BEGIN SELECT RAISE(ABORT, 'synthetic badge storage failure'); END;`);
  try {
    await assert.rejects(
      evaluateBadges("sql-error-owner", "request"),
      /synthetic badge storage failure/
    );
    assert.equal(hasBadge("sql-error-owner", "regular"), false);
  } finally {
    db.exec("DROP TRIGGER fail_badge_award");
  }
});
