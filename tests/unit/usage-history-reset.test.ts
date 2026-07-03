/**
 * TDD regression guard for the on-demand, period-scoped usage-data reset
 * (Settings → Storage → "Reset usage data").
 *
 * Ported from decolua/9router PR #2272 (usage-reset concern only — the
 * connection bulk-delete half of that PR is intentionally not ported;
 * OmniRoute already has a native bulk-delete for connections).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

let tempDir: string;
let originalDataDir: string | undefined;

function setup() {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-reset-test-"));
  originalDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tempDir;
}

function teardown() {
  try {
    const { resetDbInstance } = require("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    // ignore if import fails
  }
  if (originalDataDir !== undefined) {
    process.env.DATA_DIR = originalDataDir;
  } else {
    delete process.env.DATA_DIR;
  }
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
  } catch {
    // ignore cleanup errors
  }
}

function countRows(db: import("better-sqlite3").Database, table: string): number {
  const row = db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number };
  return row.c;
}

test.after(() => {
  // Belt-and-suspenders: guarantee the DB handle from the last test that ran
  // (if teardown() somehow wasn't reached) is closed so node:test can exit.
  try {
    const { resetDbInstance } = require("../../src/lib/db/core.ts");
    resetDbInstance();
  } catch {
    // ignore
  }
});

test("resetUsageHistory: 'all' wipes usage_history, daily_usage_summary, and hourly_usage_summary; a period only deletes rows older than the cutoff; an invalid period throws", async () => {
  setup();
  try {
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const { resetUsageHistory } = await import("../../src/lib/db/cleanup.ts");

    const db = getDbInstance();

    const now = Date.now();
    const oldIso = new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(); // 2 days ago
    const recentIso = new Date(now - 60 * 60 * 1000).toISOString(); // 1 hour ago
    const oldDate = oldIso.slice(0, 10);
    const recentDate = recentIso.slice(0, 10);
    const oldDateHour = `${oldIso.slice(0, 10)} ${oldIso.slice(11, 13)}:00:00`;
    const recentDateHour = `${recentIso.slice(0, 10)} ${recentIso.slice(11, 13)}:00:00`;

    function seed() {
      db.prepare(
        "INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", oldIso);
      db.prepare(
        "INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", recentIso);

      db.prepare(
        "INSERT INTO daily_usage_summary (provider, model, date) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", oldDate);
      db.prepare(
        "INSERT INTO daily_usage_summary (provider, model, date) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", recentDate);

      db.prepare(
        "INSERT INTO hourly_usage_summary (provider, model, date_hour) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", oldDateHour);
      db.prepare(
        "INSERT INTO hourly_usage_summary (provider, model, date_hour) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", recentDateHour);
    }

    seed();

    assert.equal(countRows(db, "usage_history"), 2, "sanity: 2 usage_history rows seeded");
    assert.equal(
      countRows(db, "daily_usage_summary"),
      2,
      "sanity: 2 daily_usage_summary rows seeded"
    );
    assert.equal(
      countRows(db, "hourly_usage_summary"),
      2,
      "sanity: 2 hourly_usage_summary rows seeded"
    );

    // 1) A period ("1d") deletes only the row older than the cutoff, keeps the recent one.
    const periodResult = await resetUsageHistory("1d");

    assert.equal(periodResult.errors, 0, "period reset should not report errors");
    assert.equal(periodResult.deletedUsageHistory, 1, "should delete only the old usage_history row");
    assert.equal(
      periodResult.deletedDailySummary,
      1,
      "should delete only the old daily_usage_summary row"
    );
    assert.equal(
      periodResult.deletedHourlySummary,
      1,
      "should delete only the old hourly_usage_summary row"
    );
    assert.equal(periodResult.deleted, 3, "total deleted should sum the three tables");

    assert.equal(countRows(db, "usage_history"), 1, "recent usage_history row should survive");
    assert.equal(
      countRows(db, "daily_usage_summary"),
      1,
      "recent daily_usage_summary row should survive"
    );
    assert.equal(
      countRows(db, "hourly_usage_summary"),
      1,
      "recent hourly_usage_summary row should survive"
    );

    const survivingTimestamp = db
      .prepare("SELECT timestamp FROM usage_history")
      .get() as { timestamp: string };
    assert.equal(
      survivingTimestamp.timestamp,
      recentIso,
      "the surviving usage_history row should be the recent one"
    );

    // 2) "all" wipes everything left (including the row the period reset kept).
    const allResult = await resetUsageHistory("all");

    assert.equal(allResult.errors, 0, "'all' reset should not report errors");
    assert.equal(allResult.deletedUsageHistory, 1, "'all' should delete the remaining usage_history row");
    assert.equal(
      allResult.deletedDailySummary,
      1,
      "'all' should delete the remaining daily_usage_summary row"
    );
    assert.equal(
      allResult.deletedHourlySummary,
      1,
      "'all' should delete the remaining hourly_usage_summary row"
    );

    assert.equal(countRows(db, "usage_history"), 0, "'all' should empty usage_history");
    assert.equal(countRows(db, "daily_usage_summary"), 0, "'all' should empty daily_usage_summary");
    assert.equal(countRows(db, "hourly_usage_summary"), 0, "'all' should empty hourly_usage_summary");

    // 3) An invalid period throws instead of silently doing nothing / deleting everything.
    await assert.rejects(
      () => resetUsageHistory("bogus-period"),
      /Invalid reset period/,
      "an invalid period should throw"
    );
  } finally {
    teardown();
  }
});
