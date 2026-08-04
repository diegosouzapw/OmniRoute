// In-process relay probe counters. We deliberately keep these in memory rather
// than persisting to the DB: the dashboard only needs a coarse "how many relay
// probes have we run, and how many came back alive" signal to flag a sidecar
// backend that is drifting unhealthy. They reset on restart, which is acceptable
// for an operational pulse.

interface RelayProbeStats {
  tested: number;
  alive: number;
}

let stats: RelayProbeStats = { tested: 0, alive: 0 };

export function recordRelayProbe(alive: boolean): void {
  // Single-threaded JS; no lock needed. Guard against pathological values.
  stats = {
    tested: stats.tested + 1,
    alive: stats.alive + (alive ? 1 : 0),
  };
}

export function getRelayProbeStats(): RelayProbeStats {
  return { ...stats };
}

export function resetRelayProbeStats(): void {
  stats = { tested: 0, alive: 0 };
}
