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

function countRows(db: unknown, table: string): number {
  const row = (db as { prepare: (sql: string) => { get: () => unknown } })
    .prepare(`SELECT COUNT(*) as c FROM ${table}`)
    .get() as { c: number };
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
    const oldArtifactRelpath = "2026-01-01/old-call.json";
    const recentArtifactRelpath = "2026-01-01/recent-call.json";
    const oldArtifactPath = path.join(tempDir, "call_logs", oldArtifactRelpath);
    const recentArtifactPath = path.join(tempDir, "call_logs", recentArtifactRelpath);

    fs.mkdirSync(path.dirname(oldArtifactPath), { recursive: true });
    fs.writeFileSync(oldArtifactPath, "{}");
    fs.writeFileSync(recentArtifactPath, "{}");

    function seed() {
      db.prepare(
        "INSERT INTO provider_nodes (id, type, name, prefix, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
      ).run("openai-compatible-chat-test", "chat", "Custom Test", "custom-test", recentIso, recentIso);
      db.prepare("INSERT INTO api_keys (id, name, key, created_at) VALUES (?, ?, ?, ?)").run(
        "key-test",
        "Test Key",
        "sk-test",
        recentIso
      );
      db.prepare("INSERT INTO combos (id, name, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?)").run(
        "combo-test",
        "Test Combo",
        "{}",
        recentIso,
        recentIso
      );

      db.prepare(
        "INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", oldIso);
      db.prepare(
        "INSERT INTO usage_history (provider, model, timestamp) VALUES (?, ?, ?)"
      ).run("openai", "gpt-test", recentIso);

      db.prepare("INSERT INTO call_logs (id, timestamp, artifact_relpath) VALUES (?, ?, ?)").run(
        "old-call",
        oldIso,
        oldArtifactRelpath
      );
      db.prepare("INSERT INTO call_logs (id, timestamp, artifact_relpath) VALUES (?, ?, ?)").run(
        "recent-call",
        recentIso,
        recentArtifactRelpath
      );
      db.prepare("INSERT INTO request_detail_logs (id, timestamp) VALUES (?, ?)").run(
        "old-detail",
        oldIso
      );
      db.prepare("INSERT INTO request_detail_logs (id, timestamp) VALUES (?, ?)").run(
        "recent-detail",
        recentIso
      );
      db.prepare("INSERT INTO proxy_logs (id, timestamp) VALUES (?, ?)").run("old-proxy", oldIso);
      db.prepare("INSERT INTO proxy_logs (id, timestamp) VALUES (?, ?)").run("recent-proxy", recentIso);
      db.prepare(
        "INSERT INTO compression_analytics (timestamp, mode, original_tokens, compressed_tokens, tokens_saved) VALUES (?, ?, ?, ?, ?)"
      ).run(oldIso, "lite", 100, 50, 50);
      db.prepare(
        "INSERT INTO compression_analytics (timestamp, mode, original_tokens, compressed_tokens, tokens_saved) VALUES (?, ?, ?, ?, ?)"
      ).run(recentIso, "lite", 100, 50, 50);

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
    assert.equal(countRows(db, "call_logs"), 2, "sanity: 2 call_logs rows seeded");
    assert.equal(
      countRows(db, "request_detail_logs"),
      2,
      "sanity: 2 request_detail_logs rows seeded"
    );
    assert.equal(countRows(db, "proxy_logs"), 2, "sanity: 2 proxy_logs rows seeded");
    assert.equal(
      countRows(db, "compression_analytics"),
      2,
      "sanity: 2 compression_analytics rows seeded"
    );
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
    assert.equal(periodResult.deletedCallLogs, 1, "should delete only the old call_logs row");
    assert.equal(
      periodResult.deletedRequestDetailLogs,
      1,
      "should delete only the old request_detail_logs row"
    );
    assert.equal(periodResult.deletedProxyLogs, 1, "should delete only the old proxy_logs row");
    assert.equal(
      periodResult.deletedCompressionAnalytics,
      1,
      "should delete only the old compression_analytics row"
    );
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
    assert.equal(periodResult.deleted, 7, "total deleted should sum the reset tables");
    assert.equal(periodResult.deletedCallLogArtifacts, 1, "period reset should delete only old call artifact");
    assert.equal(fs.existsSync(oldArtifactPath), false, "period reset should delete old call artifact");
    assert.equal(fs.existsSync(recentArtifactPath), true, "period reset should preserve recent call artifact");

    assert.equal(countRows(db, "provider_nodes"), 1, "provider config should survive reset");
    assert.equal(countRows(db, "api_keys"), 1, "API keys should survive reset");
    assert.equal(countRows(db, "combos"), 1, "combos should survive reset");

    assert.equal(countRows(db, "usage_history"), 1, "recent usage_history row should survive");
    assert.equal(countRows(db, "call_logs"), 1, "recent call_logs row should survive");
    assert.equal(
      countRows(db, "request_detail_logs"),
      1,
      "recent request_detail_logs row should survive"
    );
    assert.equal(countRows(db, "proxy_logs"), 1, "recent proxy_logs row should survive");
    assert.equal(
      countRows(db, "compression_analytics"),
      1,
      "recent compression_analytics row should survive"
    );
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
    assert.equal(allResult.deletedCallLogs, 1, "'all' should delete the remaining call_logs row");
    assert.equal(
      allResult.deletedRequestDetailLogs,
      1,
      "'all' should delete the remaining request_detail_logs row"
    );
    assert.equal(allResult.deletedProxyLogs, 1, "'all' should delete the remaining proxy_logs row");
    assert.equal(
      allResult.deletedCompressionAnalytics,
      1,
      "'all' should delete the remaining compression_analytics row"
    );
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
    assert.equal(allResult.deletedCallLogArtifacts, 1, "'all' should delete remaining call artifact");
    assert.equal(fs.existsSync(recentArtifactPath), false, "'all' should delete recent call artifact");

    assert.equal(countRows(db, "usage_history"), 0, "'all' should empty usage_history");
    assert.equal(countRows(db, "call_logs"), 0, "'all' should empty call_logs");
    assert.equal(countRows(db, "request_detail_logs"), 0, "'all' should empty request_detail_logs");
    assert.equal(countRows(db, "proxy_logs"), 0, "'all' should empty proxy_logs");
    assert.equal(countRows(db, "compression_analytics"), 0, "'all' should empty compression_analytics");
    assert.equal(countRows(db, "daily_usage_summary"), 0, "'all' should empty daily_usage_summary");
    assert.equal(countRows(db, "hourly_usage_summary"), 0, "'all' should empty hourly_usage_summary");
    assert.equal(countRows(db, "provider_nodes"), 1, "provider config should still survive 'all'");
    assert.equal(countRows(db, "api_keys"), 1, "API keys should still survive 'all'");
    assert.equal(countRows(db, "combos"), 1, "combos should still survive 'all'");

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
