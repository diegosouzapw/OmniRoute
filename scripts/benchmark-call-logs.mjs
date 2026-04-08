#!/usr/bin/env node
/**
 * Benchmark test for call logs query optimization
 * Tests SELECT * vs selective column fetching
 */

import Database from "better-sqlite3";
import { performance } from "perf_hooks";

const DB_PATH = process.env.HOME + "/.omniroute/storage.sqlite";

// Simulate the old query (SELECT *)
const OLD_QUERY = `SELECT * FROM call_logs ORDER BY timestamp DESC LIMIT 200`;

// Simulate the new optimized query (selective columns)
const NEW_QUERY = `SELECT id, timestamp, method, path, status, model, requested_model, provider, account, duration, tokens_in, tokens_out, source_format, target_format, error, combo_name, api_key_id, api_key_name, has_pipeline_details, request_body, response_body FROM call_logs ORDER BY timestamp DESC LIMIT 200`;

// Columns we need (from callLogs.ts getCallLogs function)
const NEEDED_COLUMNS = [
  "id",
  "timestamp",
  "method",
  "path",
  "status",
  "model",
  "requested_model",
  "provider",
  "account",
  "duration",
  "tokens_in",
  "tokens_out",
  "source_format",
  "target_format",
  "error",
  "combo_name",
  "api_key_id",
  "api_key_name",
  "has_pipeline_details",
  "request_body",
  "response_body",
];

// Columns that are NOT needed (waste memory when fetched)
const UNUSED_COLUMNS = ["connection_id", "artifact_relpath"];

function getMemoryUsage() {
  if (global.gc) {
    global.gc();
  }
  const usage = process.memoryUsage();
  return {
    heapUsed: Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100, // MB
    external: Math.round((usage.external / 1024 / 1024) * 100) / 100, // MB
  };
}

function benchmarkQuery(db, query, name, iterations = 5) {
  console.log(`\n📊 Benchmarking: ${name}`);
  console.log("-".repeat(60));

  const times = [];
  const memBefore = getMemoryUsage();

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    const stmt = db.prepare(query);
    const rows = stmt.all();
    const end = performance.now();
    times.push(end - start);

    // Verify we got results
    if (i === 0) {
      console.log(`  Rows returned: ${rows.length}`);
      console.log(
        `  Sample row keys: ${Object.keys(rows[0] || {})
          .slice(0, 5)
          .join(", ")}...`
      );
    }
  }

  const memAfter = getMemoryUsage();

  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  console.log(`  Avg Time: ${avgTime.toFixed(2)}ms`);
  console.log(`  Min Time: ${minTime.toFixed(2)}ms`);
  console.log(`  Max Time: ${maxTime.toFixed(2)}ms`);
  console.log(`  Heap Used: ${memBefore.heapUsed}MB → ${memAfter.heapUsed}MB`);

  return { avgTime, minTime, maxTime, memDelta: memAfter.heapUsed - memBefore.heapUsed };
}

async function main() {
  console.log("🔍 Query Optimization Benchmark");
  console.log("=".repeat(60));
  console.log(`Database: ${DB_PATH}`);

  try {
    const { default: DatabaseCtor } = await import("better-sqlite3");
    const db = new DatabaseCtor(DB_PATH, { readonly: true });

    // Get table info
    const tableInfo = db.prepare("PRAGMA table_info(call_logs)").all();
    console.log(`\nTable 'call_logs' has ${tableInfo.length} columns`);
    console.log(`Columns fetched by OLD query: ${tableInfo.length}`);
    console.log(`Columns fetched by NEW query: ${NEEDED_COLUMNS.length}`);
    console.log(
      `Columns saved: ${tableInfo.length - NEEDED_COLUMNS.length} (${UNUSED_COLUMNS.join(", ")})`
    );

    // Warm up
    console.log("\n🔄 Warming up...");
    db.prepare(OLD_QUERY).all();
    db.prepare(NEW_QUERY).all();

    // Benchmark old query
    const oldResult = benchmarkQuery(db, OLD_QUERY, "OLD: SELECT *", 10);

    // Force GC between tests
    if (global.gc) global.gc();
    await new Promise((r) => setTimeout(r, 100));

    // Benchmark new query
    const newResult = benchmarkQuery(db, NEW_QUERY, "NEW: Selective Columns", 10);

    // Summary
    console.log("\n📈 Performance Summary");
    console.log("=".repeat(60));
    console.log(
      `Time Improvement: ${oldResult.avgTime.toFixed(2)}ms → ${newResult.avgTime.toFixed(2)}ms (${((1 - newResult.avgTime / oldResult.avgTime) * 100).toFixed(1)}% faster)`
    );
    console.log(
      `Memory Efficiency: Fetching ${NEEDED_COLUMNS.length}/${tableInfo.length} columns (${((NEEDED_COLUMNS.length / tableInfo.length) * 100).toFixed(1)}%)`
    );

    // Verify data integrity
    console.log("\n✅ Verifying data integrity...");
    const oldRows = db.prepare(OLD_QUERY).all();
    const newRows = db.prepare(NEW_QUERY).all();

    let integrityCheck = true;
    for (let i = 0; i < Math.min(oldRows.length, newRows.length); i++) {
      for (const col of NEEDED_COLUMNS) {
        if (oldRows[i][col] !== newRows[i][col]) {
          console.log(`  MISMATCH at row ${i}, column ${col}`);
          integrityCheck = false;
          break;
        }
      }
    }

    if (integrityCheck) {
      console.log("  ✓ All needed columns match between queries");
    }

    db.close();

    console.log("\n✨ Benchmark complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
