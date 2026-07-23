// Latency-based proxy rotation strategy: picks the candidate with the lowest
// average latency observed in `proxy_logs` over a trailing window. Extracted
// from proxies.ts to keep that frozen god-file under its line-count cap
// (imported directly by src/lib/db/proxies.ts, anti-barrel, #6798).
import { getDbInstance } from "./core";

const PROXY_LATENCY_WINDOW_HOURS = parseInt(process.env.PROXY_LATENCY_WINDOW_HOURS ?? "3", 10);

type LatencyLogRow = {
  proxy_host: string;
  proxy_port: number;
  avg_latency: number | null;
};

// Builds a `"host:port" -> avg_latency_ms` map from proxy_logs rows recorded
// within the trailing PROXY_LATENCY_WINDOW_HOURS window.
function buildLatencyMap(db: ReturnType<typeof getDbInstance>): Map<string, number> {
  const sinceIso = new Date(Date.now() - PROXY_LATENCY_WINDOW_HOURS * 60 * 60 * 1000).toISOString();

  const latencyRows = db
    .prepare(
      `SELECT proxy_host, proxy_port, AVG(latency_ms) as avg_latency
       FROM proxy_logs
       WHERE timestamp >= ?
       GROUP BY proxy_host, proxy_port`
    )
    .all(sinceIso) as LatencyLogRow[];

  const latencyMap = new Map<string, number>();
  for (const r of latencyRows) {
    if (r.avg_latency !== null && r.avg_latency !== undefined) {
      latencyMap.set(`${r.proxy_host}:${r.proxy_port}`, r.avg_latency);
    }
  }
  return latencyMap;
}

// Picks the candidate with the lowest recorded average latency; candidates
// with no logged latency are treated as -1 (best/first) so untested proxies
// still get a chance to be selected and gather data.
export function pickByLatency<T>(db: ReturnType<typeof getDbInstance>, candidates: T[]): T {
  const latencyMap = buildLatencyMap(db);

  const sorted = [...candidates].sort((a, b) => {
    const pA = a as { host: string; port: number };
    const pB = b as { host: string; port: number };
    const keyA = `${pA.host}:${pA.port}`;
    const keyB = `${pB.host}:${pB.port}`;
    const latA = latencyMap.has(keyA) ? latencyMap.get(keyA)! : -1;
    const latB = latencyMap.has(keyB) ? latencyMap.get(keyB)! : -1;
    return latA - latB;
  });

  return sorted[0];
}
