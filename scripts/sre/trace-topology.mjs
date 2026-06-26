#!/usr/bin/env node
/**
 * Trace topology — query an OTLP/HTTP collector and render the service
 * graph as ASCII.
 *
 * The OmniRoute observability PRs (#4997, #5014, #5018) wire
 * OpenTelemetry exporters into the chatCore pipeline. Once those land,
 * a Prometheus + Tempo stack will be running at:
 *
 *   - Prometheus: http://prometheus.observability.internal:9090
 *   - Tempo:      http://tempo.observability.internal:4318 (OTLP/HTTP)
 *
 * This script queries Tempo's `/api/search` endpoint over a recent time
 * window, aggregates the spans by `service.name`, and renders a simple
 * service graph (parent → child) using ASCII boxes and arrows.
 *
 * Why a custom script instead of `npx @grafana/tempo-cli`:
 *   - We want this to run from the on-call laptop without a browser.
 *   - The output needs to paste cleanly into Slack / GitHub issues.
 *   - The script is meant to fail soft: if Tempo is unreachable, it
 *     prints "tempo unreachable" and exits 0 so the on-call can still
 *     post in the incident channel.
 *
 * CLI:
 *   node scripts/sre/trace-topology.mjs \
 *     --endpoint http://tempo.observability.internal:4318 \
 *     --window 10m \
 *     --trace-id <TRACE_ID>
 *
 *   # Without a trace-id, render the service graph for the last 10 min
 *   # of all services.
 *
 * @see docs/sre/INDEX.md (PR-011)
 */

import process from "node:process";

// ── Library API ──────────────────────────────────────────────────────────────

/**
 * Query Tempo's `/api/search` for spans within the last `window` seconds.
 *
 * @param {string} endpoint   e.g. "http://tempo.observability.internal:4318"
 * @param {object} [options]
 * @param {number} [options.windowSeconds=600]  Look-back window in seconds
 * @param {string} [options.traceId]            If set, restrict to one trace
 * @param {string} [options.service]            If set, restrict to one service
 * @param {number} [options.limit=500]          Max spans to return
 * @returns {Promise<{ ok: boolean, status: number, spans: Array<object>, error?: string }>}
 */
export async function queryTempo(endpoint, options = {}) {
  const windowSeconds = options.windowSeconds ?? 600;
  const limit = options.limit ?? 500;
  if (!endpoint) {
    return { ok: false, status: 0, spans: [], error: "endpoint is required" };
  }

  const url = new URL("/api/search", endpoint.replace(/\/$/, ""));
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("start", String(Math.floor(Date.now() / 1000) - windowSeconds));

  const tags = [];
  if (options.traceId) tags.push(`trace_id=${options.traceId}`);
  if (options.service) tags.push(`service.name=${options.service}`);
  if (tags.length > 0) {
    // Tempo uses Loki-style tag queries.
    url.searchParams.set("tags", tags.join(" "));
  }

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      return { ok: false, status: res.status, spans: [], error: `tempo responded ${res.status}` };
    }
    const body = await res.json();
    const traces = body?.traces ?? [];
    const spans = [];
    for (const trace of traces) {
      for (const span of trace?.spans ?? []) {
        spans.push({
          traceId: trace.traceID,
          spanId: span.spanID,
          parentSpanId: span.parentSpanID || null,
          service: span?.attributes?.find?.((a) => a.key === "service.name")?.value?.stringValue
            ?? span?.serviceName
            ?? "unknown",
          name: span.name,
          startTimeUnixNano: Number(span.startTimeUnixNano || 0),
          durationMs: Number(span.durationNanos || 0) / 1_000_000,
          attributes: indexAttributes(span.attributes),
        });
      }
    }
    return { ok: true, status: res.status, spans };
  } catch (err) {
    return { ok: false, status: 0, spans: [], error: err.message || String(err) };
  }
}

function indexAttributes(attrs) {
  const out = {};
  if (!Array.isArray(attrs)) return out;
  for (const a of attrs) {
    if (!a || typeof a.key !== "string") continue;
    const v = a.value?.stringValue ?? a.value?.intValue ?? a.value?.doubleValue ?? a.value?.boolValue;
    out[a.key] = v;
  }
  return out;
}

/**
 * Aggregate spans into a service graph: nodes are services, edges are
 * parent → child relationships with a weight (span count) and average
 * duration.
 *
 * @param {Array<object>} spans
 * @returns {{ nodes: string[], edges: Array<{ from: string, to: string, count: number, p99Ms: number, avgMs: number }> }}
 */
export function aggregateServiceGraph(spans) {
  const nodes = new Set();
  /** @type {Map<string, { count: number, durations: number[] }>} */
  const edgeMap = new Map();
  /** @type {Map<string, string>} spanId → service */
  const spanService = new Map();

  for (const s of spans) {
    spanService.set(s.spanId, s.service);
    nodes.add(s.service);
  }
  for (const s of spans) {
    if (!s.parentSpanId) continue;
    const from = spanService.get(s.parentSpanId);
    if (!from || from === s.service) continue;
    nodes.add(from);
    const key = `${from}\u0000${s.service}`;
    const cur = edgeMap.get(key) ?? { count: 0, durations: [] };
    cur.count += 1;
    cur.durations.push(s.durationMs);
    edgeMap.set(key, cur);
  }

  const edges = [];
  for (const [key, agg] of edgeMap.entries()) {
    const [from, to] = key.split("\u0000");
    const sorted = agg.durations.slice().sort((a, b) => a - b);
    const p99Idx = Math.min(sorted.length - 1, Math.floor(sorted.length * 0.99));
    edges.push({
      from,
      to,
      count: agg.count,
      avgMs: agg.durations.reduce((a, b) => a + b, 0) / agg.durations.length,
      p99Ms: sorted[p99Idx],
    });
  }
  edges.sort((a, b) => b.count - a.count);
  return { nodes: [...nodes].sort(), edges };
}

/**
 * Render the service graph as an ASCII diagram. Returns a string ready
 * to paste into a chat message.
 *
 * @param {{ nodes: string[], edges: Array<{ from: string, to: string, count: number, p99Ms: number }> }} graph
 * @param {object} [options]
 * @param {number} [options.p99OutlierThresholdMs=1000]  Edges above this are flagged
 * @returns {string}
 */
export function renderAsciiTopology(graph, options = {}) {
  const p99Threshold = options.p99OutlierThresholdMs ?? 1000;
  const lines = [];
  lines.push(`Services (${graph.nodes.length}): ${graph.nodes.join(", ")}`);
  lines.push("");
  lines.push("Edges (sorted by span count):");
  for (const edge of graph.edges) {
    const flag = edge.p99Ms >= p99Threshold ? "  ⚠ p99 outlier" : "";
    lines.push(`  ${edge.from} -> ${edge.to}   count=${edge.count}  avg=${edge.avgMs.toFixed(1)}ms  p99=${edge.p99Ms.toFixed(1)}ms${flag}`);
  }
  if (graph.edges.length === 0) {
    lines.push("  (no edges detected — only root spans or single-service traces)");
  }
  return lines.join("\n");
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const out = { endpoint: null, window: "10m", traceId: null, service: null, help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--endpoint") {
      out.endpoint = argv[++i];
    } else if (a === "--window") {
      out.window = argv[++i];
    } else if (a === "--trace-id") {
      out.traceId = argv[++i];
    } else if (a === "--service") {
      out.service = argv[++i];
    } else if (a === "--help" || a === "-h") {
      out.help = true;
    } else {
      process.stderr.write(`unknown argument: ${a}\n`);
      process.exit(2);
    }
  }
  return out;
}

function parseWindow(spec) {
  // "10m" → 600, "1h" → 3600, "30s" → 30
  const m = /^(\d+)([smhd])$/.exec(spec);
  if (!m) return 600;
  const n = Number(m[1]);
  switch (m[2]) {
    case "s":
      return n;
    case "m":
      return n * 60;
    case "h":
      return n * 3600;
    case "d":
      return n * 86400;
    default:
      return 600;
  }
}

function printHelp() {
  process.stdout.write(`Usage: trace-topology.mjs [options]

Options:
  --endpoint <url>       OTLP/HTTP collector base URL (required).
  --window <spec>        Look-back window: 30s, 10m, 1h, 1d. Default 10m.
  --trace-id <id>        Restrict to a single trace.
  --service <name>       Restrict to a single service.
  --help, -h             Show this help.

Environment:
  OTLP_ENDPOINT          Default for --endpoint if not set on CLI.

Exit codes:
  0   Success (or tempo unreachable — message printed to stderr).
  2   Bad arguments.
`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    printHelp();
    return;
  }
  const endpoint = args.endpoint || process.env.OTLP_ENDPOINT;
  if (!endpoint) {
    process.stderr.write("trace-topology: --endpoint (or OTLP_ENDPOINT) is required\n");
    process.exit(2);
  }
  const result = await queryTempo(endpoint, {
    windowSeconds: parseWindow(args.window),
    traceId: args.traceId,
    service: args.service,
  });
  if (!result.ok) {
    process.stderr.write(`trace-topology: tempo unreachable (${result.error}). skipping topology render.\n`);
    // Fail soft so the on-call can still post a status update.
    process.exit(0);
  }
  const graph = aggregateServiceGraph(result.spans);
  const ascii = renderAsciiTopology(graph);
  process.stdout.write(`${ascii}\n`);
  process.stdout.write(`\nspans=${result.spans.length} window=${args.window}\n`);
}

import { pathToFileURL } from "node:url";
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    process.stderr.write(`trace-topology: ${err.stack || err.message}\n`);
    process.exit(1);
  });
}