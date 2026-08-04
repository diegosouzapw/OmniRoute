/**
 * Request-body heap amplification benchmark (#7847).
 *
 * #7847 reports a 3.05 MiB request with 729 messages and 86 tools reaching ~12,282 MiB of V8
 * heap. The wire size does not explain the peak: the same logical body is retained several times
 * over (entry-point log clone, per-combo-target clone, token-estimation string, pending-request
 * state). This benchmark attributes retained heap to each of those mechanisms individually, so a
 * fix can be justified by numbers instead of intuition — and so a regression can be caught later.
 *
 * It measures the real production helpers (no reimplementation): `cloneLogPayload` is what
 * `buildClientRawRequest` calls per request, and `cloneBoundedForLog` is what the request logger
 * actually retains downstream.
 *
 * Deterministic and API-free (no network, no upstream credentials). The DATA_DIR is redirected to
 * a temp dir before importing, because the request-logger module opens the SQLite database on
 * import — the benchmark must never touch the operator's real ~/.omniroute store.
 *
 * Node only — NOT bun. We need `--expose-gc` and V8 heap accounting; measuring "V8 heap" under a
 * different engine would report a number that has nothing to do with the production runtime.
 *
 * Usage:
 *   npm run bench:heap-body                          # the #7847 incident shape
 *   npm run bench:heap-body -- --messages 800 --tools 120
 *   npm run bench:heap-body -- --concurrency 16      # simulate overlapping requests
 *   npm run bench:heap-body -- --json                # machine-readable
 *   npm run bench:heap-body -- --max-retained-mib 64 # non-zero exit if exceeded (regression gate)
 */
import os from "node:os";
import path from "node:path";
import fs from "node:fs";

// Must happen BEFORE the dynamic imports below: open-sse/utils/requestLogger.ts transitively
// opens the SQLite store at import time, and the benchmark must stay hermetic.
const TMP_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-heapbench-"));
process.env.DATA_DIR = TMP_DATA_DIR;

// open-sse/utils/requestLogger.ts imports @/lib/usage/usageHistory, so merely importing the
// (pure) log-shaping helper boots SQLite and runs every migration against the temp DATA_DIR.
// That noise would bury the report, so console output is parked for the duration of the import.
// The measurements are unaffected: every baseline is taken after imports have settled.
const { buildAgentPayload, INCIDENT_SHAPE } = await import("./agentPayloadCorpus.ts");

const realLog = console.log;
console.log = () => {};
const { cloneLogPayload } = await import("../../src/lib/logPayloads.ts");
const { cloneBoundedForLog } = await import("../../open-sse/utils/requestLogger.ts");
console.log = realLog;

// ── CLI ──────────────────────────────────────────────────────────────────────
function numArg(flag: string, fallback: number): number {
  const i = process.argv.indexOf(flag);
  if (i === -1) return fallback;
  const v = Number(process.argv[i + 1]);
  return Number.isFinite(v) ? v : fallback;
}
const HAS = (flag: string) => process.argv.includes(flag);

// Defaults mirror the #7847 production incident.
const MESSAGES = numArg("--messages", INCIDENT_SHAPE.messages);
const TOOLS = numArg("--tools", INCIDENT_SHAPE.tools);
// Calibrated so the defaults land on the incident's 3.05 MiB wire size.
const CONTENT_WORDS = numArg("--content-words", INCIDENT_SHAPE.contentWords);
const TARGETS = numArg("--targets", 3); // combo targets -> attemptBody clones
const CONCURRENCY = numArg("--concurrency", 8);
const MAX_RETAINED = numArg("--max-retained-mib", 0); // 0 = report only
const AS_JSON = HAS("--json");

const MIB = 1024 * 1024;
const fmt = (bytes: number) => (bytes / MIB).toFixed(2);

// ── Measurement ──────────────────────────────────────────────────────────────
const gc = globalThis.gc as undefined | (() => void);

function settle(): void {
  // Several passes: one gc() does not reliably collect everything in a young generation.
  for (let i = 0; i < 4; i++) gc?.();
}

/**
 * Retained heap of whatever `produce` returns, while it stays reachable.
 * This is the number that maps to the incident: many concurrent requests each holding copies.
 */
function measureRetained<T>(produce: () => T): { bytes: number; value: T } {
  settle();
  const before = process.memoryUsage().heapUsed;
  const value = produce();
  settle();
  const after = process.memoryUsage().heapUsed;
  return { bytes: Math.max(0, after - before), value };
}

type Row = { mechanism: string; site: string; bytes: number };

async function main(): Promise<void> {
  if (typeof gc !== "function") {
    console.error(
      "[heap-bench] refusing to run without --expose-gc: retained-heap numbers would be\n" +
        "            dominated by uncollected garbage and are not comparable across runs.\n" +
        "            Use `npm run bench:heap-body`, which passes it."
    );
    process.exitCode = 2;
    return;
  }

  const body = buildAgentPayload(MESSAGES, TOOLS, CONTENT_WORDS);
  const wireBytes = Buffer.byteLength(JSON.stringify(body), "utf8");

  const rows: Row[] = [];
  const hold: unknown[] = []; // keep results reachable so "retained" means retained

  // 1. The entry-point clone every chat request pays (src/sse/handlers/chat.ts buildClientRawRequest).
  {
    const r = measureRetained(() => cloneLogPayload(body));
    hold.push(r.value);
    rows.push({ mechanism: "cloneLogPayload (unbounded)", site: "chat.ts buildClientRawRequest", bytes: r.bytes });
  }

  // 2. What the request logger actually keeps (open-sse/utils/requestLogger.ts).
  {
    const r = measureRetained(() => cloneBoundedForLog(body));
    hold.push(r.value);
    rows.push({ mechanism: "cloneBoundedForLog (bounded)", site: "requestLogger.logClientRawRequest", bytes: r.bytes });
  }

  // 3. Combo per-target attempt clones (open-sse/services/combo.ts attemptBody).
  {
    const r = measureRetained(() => Array.from({ length: TARGETS }, () => structuredClone(body)));
    hold.push(r.value);
    rows.push({ mechanism: `structuredClone x${TARGETS} (combo targets)`, site: "combo.ts attemptBody", bytes: r.bytes });
  }

  // 4. Whole-body serialization for token estimation (combo.ts estimateTokens(JSON.stringify(...))).
  {
    const r = measureRetained(() => JSON.stringify(body));
    hold.push(r.value);
    rows.push({ mechanism: "JSON.stringify (token estimate)", site: "combo.ts estimateTokens", bytes: r.bytes });
  }

  // 5. Overlap: what C concurrent in-flight requests retain via the entry clone alone.
  const concurrent = measureRetained(() =>
    Array.from({ length: CONCURRENCY }, () => cloneLogPayload(body))
  );
  hold.push(concurrent.value);

  const perRequest = rows.reduce((a, r) => a + r.bytes, 0);

  if (AS_JSON) {
    console.log(
      JSON.stringify(
        {
          shape: { messages: MESSAGES, tools: TOOLS, targets: TARGETS, concurrency: CONCURRENCY },
          wireBytes,
          mechanisms: rows,
          perRequestBytes: perRequest,
          concurrentEntryCloneBytes: concurrent.bytes,
        },
        null,
        2
      )
    );
  } else {
    console.log(`# Request-body heap amplification (#7847)\n`);
    console.log(
      `Shape: ${MESSAGES} messages · ${TOOLS} tools · wire size **${fmt(wireBytes)} MiB**` +
        ` · ${TARGETS} combo targets\n`
    );
    console.log("| mechanism | call site | retained | x wire |");
    console.log("| --- | --- | ---: | ---: |");
    for (const r of rows) {
      console.log(
        `| ${r.mechanism} | \`${r.site}\` | ${fmt(r.bytes)} MiB | ${(r.bytes / wireBytes).toFixed(2)}x |`
      );
    }
    console.log(
      `| **per request (sum)** | | **${fmt(perRequest)} MiB** | **${(perRequest / wireBytes).toFixed(2)}x** |`
    );
    console.log("");
    console.log(
      `${CONCURRENCY} concurrent requests retain **${fmt(concurrent.bytes)} MiB**` +
        ` via the entry clone alone (${(concurrent.bytes / wireBytes).toFixed(2)}x wire).`
    );
    console.log("");
  }

  if (MAX_RETAINED > 0 && perRequest / MIB > MAX_RETAINED) {
    console.error(
      `[heap-bench] FAIL — per-request retained ${fmt(perRequest)} MiB exceeds --max-retained-mib ${MAX_RETAINED}`
    );
    process.exitCode = 1;
  }

  // Referenced after all measurements so V8 cannot collect the holds early and flatter the numbers.
  if (hold.length === 0) console.log("unreachable");
}

try {
  await main();
} finally {
  fs.rmSync(TMP_DATA_DIR, { recursive: true, force: true });
}
