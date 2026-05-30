#!/usr/bin/env node --import tsx/esm
/**
 * PoC: SessionPool + FingerprintRotator × OpenCode Free
 * =======================================================
 *
 * Demonstrates that rotating browser fingerprints across sessions
 * defeats burst rate-limiting on the OpenCode Free public endpoint.
 *
 * Run:
 *   node --import tsx/esm tests/poc/session-pool-opencode-poc.ts
 *
 * Output: TAP-style results + summary table.
 *
 * For a "no-pool" baseline, set BASELINE=1
 *   BASELINE=1 node --import tsx/esm tests/poc/session-pool-opencode-poc.ts
 */

import { setTimeout as sleep } from "node:timers/promises";
import { SessionPool } from "../../open-sse/services/sessionPool/sessionPool.ts";
import { FingerprintRotator } from "../../open-sse/services/sessionPool/fingerprintRotator.ts";
import type { PoolConfig } from "../../open-sse/services/sessionPool/types.ts";
import { DEFAULT_POOL_CONFIG } from "../../open-sse/services/sessionPool/types.ts";

// ─── Config ─────────────────────────────────────────────────────────────────

import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const OPENCODE_CHAT_URL = "https://opencode.ai/zen/v1/chat/completions";
const USE_AUTH_KEY = process.env.USE_AUTH_KEY || "";
const USE_POOL = !process.env.BASELINE;

function getOpencodeApiKey(): string {
  if (USE_AUTH_KEY) return USE_AUTH_KEY;
  try {
    const authPath = path.join(homedir(), ".local", "share", "opencode", "auth.json");
    const raw = readFileSync(authPath, "utf8");
    const auth = JSON.parse(raw);
    return auth?.opencode?.key ?? "";
  } catch {
    return "";
  }
}

const API_KEY = getOpencodeApiKey();

const FAST_CONFIG: PoolConfig = {
  ...DEFAULT_POOL_CONFIG,
  cooldownBase: 100,
  cooldownMax: 1000,
  cooldownJitter: 50,
  minSessions: 3,
  maxSessions: 10,
};

const TEST_PROMPT = "Say 'ok' and nothing else.";
const REQUEST_COUNT = 30;
const CONCURRENCY = 3;
const ROUNDS = 3; // how many times to repeat the batch

// ─── Helpers ─────────────────────────────────────────────────────────────────

function now(): string {
  return new Date().toISOString().slice(11, 19);
}

function divider(title: string): void {
  console.log(`\n# ${"━".repeat(60)}`);
  console.log(`# ${title}`);
  console.log(`# ${"━".repeat(60)}`);
}

interface AttemptResult {
  ok: boolean;
  status: number | string;
  latencyMs: number;
  fingerprintId?: string;
  model?: string;
}

// ─── Pool-based approach ─────────────────────────────────────────────────────

async function runWithPool(): Promise<AttemptResult[]> {
  const results: AttemptResult[] = [];
  const pool = new SessionPool("opencode-poc", FAST_CONFIG);
  await pool.warmUp(FAST_CONFIG.minSessions);
  console.log(`# Pool warmed: ${pool.totalCount} sessions, ${pool.availableCount} available`);

  for (let round = 1; round <= ROUNDS; round++) {
    console.log(`\n# === Round ${round}/${ROUNDS} (${REQUEST_COUNT} sequential requests) ===`);

    for (let i = 0; i < REQUEST_COUNT; i++) {
      const session = pool.acquire();
      if (!session) {
        console.log(`#   [${now()}] req ${i + 1}: NO SESSION AVAILABLE (all on cooldown)`);
        results.push({ ok: false, status: "no-session", latencyMs: 0 });
        await sleep(200); // backoff before retry
        continue;
      }

      const fpId = session.fingerprint.id;
      const poolHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      };
      if (API_KEY) {
        poolHeaders["Authorization"] = `Bearer ${API_KEY}`;
      }
      const headers = session.buildHeaders(poolHeaders);

      const body = JSON.stringify({
        model: "deepseek-v4-flash-free",
        messages: [{ role: "user", content: TEST_PROMPT }],
        stream: false,
      });

      const start = performance.now();
      try {
        const res = await fetch(OPENCODE_CHAT_URL, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(15_000),
        });

        const latency = Math.round(performance.now() - start);
        const status = res.status;

        if (status === 429) {
          pool.reportCooldown(session);
          console.log(`#   [${now()}] req ${i + 1} [${fpId}] 429 RATE LIMITED (${latency}ms) → cooldown`);
          results.push({ ok: false, status, latencyMs: latency, fingerprintId: fpId });
        } else if (status >= 500) {
          pool.reportDead(session);
          console.log(`#   [${now()}] req ${i + 1} [${fpId}] ${status} SERVER ERROR (${latency}ms) → dead`);
          results.push({ ok: false, status, latencyMs: latency, fingerprintId: fpId });
        } else if (status === 200) {
          const text = await res.text();
          let model = "?";
          try {
            const json = JSON.parse(text);
            model = json.model ?? json?.choices?.[0]?.message?.content?.slice(0, 20) ?? "?";
          } catch { /* ignore parse errors */ }
          pool.reportSuccess(session);
          console.log(`#   [${now()}] req ${i + 1} [${fpId}] 200 OK (${latency}ms) model=${model}`);
          results.push({ ok: true, status: 200, latencyMs: latency, fingerprintId: fpId, model });
        } else {
          console.log(`#   [${now()}] req ${i + 1} [${fpId}] ${status} UNEXPECTED (${latency}ms)`);
          results.push({ ok: false, status, latencyMs: latency, fingerprintId: fpId });
        }
      } catch (err: any) {
        const latency = Math.round(performance.now() - start);
        const errMsg = err?.name === "TimeoutError" ? "TIMEOUT" : err?.message?.slice(0, 60) ?? String(err);
        console.log(`#   [${now()}] req ${i + 1} [${fpId}] ERROR: ${errMsg} (${latency}ms)`);
        pool.reportDead(session);
        results.push({ ok: false, status: `error:${errMsg}`, latencyMs: latency, fingerprintId: fpId });
      } finally {
        session.release();
      }

      // Small jitter between requests to avoid overwhelming
      await sleep(50 + Math.random() * 100);
    }

    // Print pool stats after each round
    const stats = pool.getStats();
    console.log(`\n#   Pool after round ${round}:`);
    console.log(`#     sessions: ${stats.sessions.active} active, ${stats.sessions.cooldown} cooldown, ${stats.sessions.dead} dead`);
    console.log(`#     requests: ${stats.requests.total} total, ${stats.requests.success} success`);
    console.log(`#     rate-429: ${stats.requests.rate429}, errors: ${stats.requests.otherErrors}`);

    // Let pool recover between rounds
    if (round < ROUNDS) {
      console.log(`#   Waiting 2s for cooldown recovery before next round...`);
      await sleep(2000);
    }
  }

  await pool.shutdown();
  return results;
}

// ─── Baseline (no pool) ──────────────────────────────────────────────────────

async function runBaseline(): Promise<AttemptResult[]> {
  const results: AttemptResult[] = [];
  const rotator = new FingerprintRotator();

  for (let round = 1; round <= ROUNDS; round++) {
    console.log(`\n# === Round ${round}/${ROUNDS} (${REQUEST_COUNT} requests, same fingerprint) ===`);

    // Use the same fingerprint for the entire round (no session rotation = baseline)
    const fp = rotator.next();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "User-Agent": fp.userAgent,
      "Accept-Language": fp.acceptLanguage ?? "en-US,en;q=0.9",
    };
    if (API_KEY) {
      headers["Authorization"] = `Bearer ${API_KEY}`;
    }
    if (fp.secChUa) {
      headers["Sec-CH-UA"] = fp.secChUa;
      headers["Sec-CH-UA-Mobile"] = fp.secChUaMobile ?? "?0";
      headers["Sec-CH-UA-Platform"] = fp.secChUaPlatform ?? '"Windows"';
    }

    console.log(`#   Using fingerprint: ${fp.id}`);

    for (let i = 0; i < REQUEST_COUNT * 1.5; i++) {
      const body = JSON.stringify({
        model: "deepseek-v4-flash-free",
        messages: [{ role: "user", content: TEST_PROMPT }],
        stream: false,
      });

      const start = performance.now();
      try {
        const res = await fetch(OPENCODE_CHAT_URL, {
          method: "POST",
          headers,
          body,
          signal: AbortSignal.timeout(15_000),
        });
        const latency = Math.round(performance.now() - start);
        const status = res.status;

        if (status === 200) {
          console.log(`#   [${now()}] req ${i + 1} 200 OK (${latency}ms)`);
          results.push({ ok: true, status, latencyMs: latency, fingerprintId: fp.id });
        } else if (status === 429) {
          console.log(`#   [${now()}] req ${i + 1} 429 RATE LIMITED (${latency}ms) — backing off 3s`);
          results.push({ ok: false, status, latencyMs: latency, fingerprintId: fp.id });
          await sleep(3000);
        } else {
          console.log(`#   [${now()}] req ${i + 1} ${status} (${latency}ms)`);
          results.push({ ok: false, status, latencyMs: latency, fingerprintId: fp.id });
        }
      } catch (err: any) {
        const latency = Math.round(performance.now() - start);
        const errMsg = err?.name === "TimeoutError" ? "TIMEOUT" : err?.message?.slice(0, 60) ?? String(err);
        console.log(`#   [${now()}] req ${i + 1} ERROR: ${errMsg} (${latency}ms)`);
        results.push({ ok: false, status: `error:${errMsg}`, latencyMs: latency, fingerprintId: fp.id });
      }

      await sleep(100 + Math.random() * 200);
    }
  }

  return results;
}

// ─── Report ──────────────────────────────────────────────────────────────────

function printReport(results: AttemptResult[], label: string): void {
  const total = results.length;
  const ok = results.filter((r) => r.ok).length;
  const rateLimited = results.filter((r) => r.status === 429).length;
  const serverErrors = results.filter((r) => typeof r.status === "number" && r.status >= 500).length;
  const timeouts = results.filter((r) => String(r.status).includes("TIMEOUT")).length;
  const noSessions = results.filter((r) => r.status === "no-session").length;
  const other = total - ok - rateLimited - serverErrors - timeouts - noSessions;

  const latencies = results.filter((r) => r.latencyMs > 0).map((r) => r.latencyMs);
  const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
  const sorted = [...latencies].sort((a, b) => a - b);
  const p50 = sorted[Math.floor(sorted.length * 0.5)] ?? 0;
  const p95 = sorted[Math.floor(sorted.length * 0.95)] ?? 0;

  const uniqueFps = new Set(results.filter((r) => r.fingerprintId).map((r) => r.fingerprintId));

  console.log(`\n${"━".repeat(70)}`);
  console.log(` 📊 REPORT: ${label}`);
  console.log(`${"━".repeat(70)}`);
  console.log(`   Total requests:     ${total}`);
  console.log(`   ✅ Success (200):    ${ok}  (${(ok / total * 100).toFixed(1)}%)`);
  console.log(`   ⏳ Rate limited:     ${rateLimited}`);
  console.log(`   💀 Server errors:    ${serverErrors}`);
  console.log(`   ⌛ Timeouts:         ${timeouts}`);
  console.log(`   ❌ No sessions:      ${noSessions}`);
  console.log(`   ? Other:            ${other}`);
  console.log(`   ───────────────────────────`);
  console.log(`   Avg latency:        ${avgLatency}ms`);
  console.log(`   p50 latency:        ${p50}ms`);
  console.log(`   p95 latency:        ${p95}ms`);
  console.log(`   Unique fingerprints: ${uniqueFps.size}`);
  console.log(`${"━".repeat(70)}`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const keyMasked = API_KEY ? `${API_KEY.slice(0, 8)}...${API_KEY.slice(-4)}` : "NONE";
  console.log(`# ═══════════════════════════════════════════════════════════════`);
  console.log(`#  PoC: SessionPool × OpenCode Free`);
  console.log(`#  Mode: ${USE_POOL ? "WITH session pool (fingerprint rotation)" : "BASELINE (single fingerprint)"}`);
  console.log(`#  Endpoint: ${OPENCODE_CHAT_URL}`);
  console.log(`#  Auth: ${API_KEY ? `YES (key: ${keyMasked})` : "NO (anonymous)"}`);
  console.log(`#  Requests per round: ${REQUEST_COUNT} × ${ROUNDS} rounds`);
  console.log(`# ═══════════════════════════════════════════════════════════════`);

  let results: AttemptResult[];
  if (USE_POOL) {
    results = await runWithPool();
    printReport(results, "SessionPool + FingerprintRotator");
  } else {
    results = await runBaseline();
    printReport(results, "Baseline (single fingerprint, no pool)");
  }

  console.log(`\n# PoC complete.`);
}

main().catch((err) => {
  console.error("PoC failed:", err);
  process.exit(1);
});
