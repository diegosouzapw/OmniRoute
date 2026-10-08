"use client";
/**
 * Polls the 3 agent sources (allSettled), listens to the `agents` WS channel as a refetch
 * trigger, and relaxes the poll interval from 5s to 30s while that WS connection is up (the
 * channel event still forces an immediate debounced refetch either way).
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLiveDashboard } from "@/hooks/useLiveDashboard";
import type { CloudAgentTask } from "@/lib/cloudAgent/types";
import type { A2ATask } from "@/lib/a2a/taskManager";
import type { FleetSnapshot } from "@/lib/conductor/hubProxy";
import { fromCloudAgent } from "../model/fromCloudAgent";
import { fromA2A } from "../model/fromA2A";
import { fromConductor } from "../model/fromConductor";
import { mergeSnapshot } from "../model/mergeSnapshot";
import type { OrchSnapshot, OrchSource, SourceStatus } from "../model/orchestrationTypes";

export const POLL_MS = 5_000;
export const POLL_MS_WS_CONNECTED = 30_000;
export const WS_REFETCH_DEBOUNCE_MS = 1_000;

interface Raw {
  cloudAgent: CloudAgentTask[];
  a2a: A2ATask[];
  conductor: FleetSnapshot;
}
const EMPTY_RAW: Raw = {
  cloudAgent: [],
  a2a: [],
  conductor: { offline: true, runners: [], tasks: [] },
};

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

/**
 * A cheap structural fingerprint of the fields that actually affect rendering.
 * `polledAt`/`raw` change on every 5s poll even when nothing meaningful moved,
 * which would otherwise re-mint every node/edge array each tick and defeat the
 * `React.memo` on the canvas node components. Exported for the test.
 */
export function snapshotContentKey(s: OrchSnapshot): string {
  return JSON.stringify([
    s.nodes.map((n) => [
      n.id,
      n.state,
      n.updatedAt,
      n.label,
      n.sublabel,
      n.cost,
      n.counts,
      n.sourceIssue,
    ]),
    s.edges.map((e) => [e.id, e.active]),
    s.sources,
  ]);
}

/**
 * Builds the 3-source status list from a `Promise.allSettled` triple.
 *
 * `prev` is the source-status list from the previous poll: a source that is failing NOW
 * reuses the `staleSince` it already had when it was ALSO failing in `prev` (so the
 * timestamp pins to the FIRST failure instead of advancing every tick — that advance both
 * misreported "stale since" as the last poll and defeated `snapshotContentKey`'s stability,
 * since it serializes `sources`). A source that recovers loses `staleSince`; a source
 * failing for the first time (or failing again after recovering) is stamped with `nowIso`.
 */
function buildSourceStatuses(
  ca: PromiseSettledResult<{ data: CloudAgentTask[] }>,
  a2a: PromiseSettledResult<{ tasks: A2ATask[] }>,
  cond: PromiseSettledResult<FleetSnapshot>,
  nowIso: string,
  prev: SourceStatus[]
): SourceStatus[] {
  const staleSinceFor = (source: OrchSource): string => {
    const prevStatus = prev.find((s) => s.source === source);
    return prevStatus && !prevStatus.ok && prevStatus.staleSince ? prevStatus.staleSince : nowIso;
  };
  const next: SourceStatus[] = [];
  if (ca.status === "fulfilled") next.push({ source: "cloud-agent", ok: true });
  else
    next.push({
      source: "cloud-agent",
      ok: false,
      error: String(ca.reason),
      staleSince: staleSinceFor("cloud-agent"),
    });
  if (a2a.status === "fulfilled") next.push({ source: "a2a", ok: true });
  else
    next.push({
      source: "a2a",
      ok: false,
      error: String(a2a.reason),
      staleSince: staleSinceFor("a2a"),
    });
  if (cond.status === "fulfilled") {
    next.push({ source: "conductor", ok: true, offline: cond.value.offline });
  } else
    next.push({
      source: "conductor",
      ok: false,
      error: String(cond.reason),
      staleSince: staleSinceFor("conductor"),
    });
  return next;
}

export function useOrchestrationSnapshot() {
  // `raw` and `polledAt` are React state (not refs) so the merge below reads them
  // during render like any other state — a ref read during render trips the
  // `react-hooks/refs` lint rule, and computing `Date.now()` inline in the memo
  // factory trips `react-hooks/purity`. Sampling `Date.now()` once per poll (inside
  // the effect, not during render) keeps `mergeSnapshot`'s staleness math correct
  // without either violation.
  const [raw, setRaw] = useState<Raw>(EMPTY_RAW);
  const [statuses, setStatuses] = useState<SourceStatus[]>([]);
  // Lazy initializer (not a literal 0) so the pre-first-poll render already has a
  // real timestamp — with `0` the very first `mergeSnapshot` call stamped
  // `generatedAt` as the 1970 epoch. Safe: with EMPTY_RAW there is nothing to
  // staleness-filter at mount, so seeding `Date.now()` here changes no behavior.
  const [polledAt, setPolledAt] = useState<number>(() => Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Populated by the mount effect below; lets `refetch()` (and the WS debounce
  // trigger) reach the same poll loop without hoisting it out of the effect —
  // hoisting to a top-level `useCallback` invoked from the effect body trips
  // `react-hooks/set-state-in-effect`.
  const pollRef = useRef<() => void>(() => {});

  useEffect(() => {
    const controller = new AbortController();

    const poll = async () => {
      const [ca, a2a, cond] = await Promise.allSettled([
        fetchJson<{ data: CloudAgentTask[] }>("/api/v1/agents/tasks?limit=100", controller.signal),
        fetchJson<{ tasks: A2ATask[] }>("/api/a2a/tasks?limit=200", controller.signal),
        fetchJson<FleetSnapshot>("/api/conductor/fleet", controller.signal),
      ]);
      if (controller.signal.aborted) return;
      const nowMs = Date.now();
      const nowIso = new Date(nowMs).toISOString();

      // Failed sources keep the previously stored slice — only overwrite what
      // actually resolved this round ("last good data" contract from the brief).
      setRaw((prev) => ({
        cloudAgent: ca.status === "fulfilled" ? ca.value.data : prev.cloudAgent,
        a2a: a2a.status === "fulfilled" ? a2a.value.tasks : prev.a2a,
        conductor: cond.status === "fulfilled" ? cond.value : prev.conductor,
      }));
      // Functional updater form: gives `buildSourceStatuses` the latest previous
      // statuses (for the staleSince-pinning rule) without a stale closure over
      // `statuses` and without adding a ref or an extra effect for it.
      setStatuses((prevStatuses) => buildSourceStatuses(ca, a2a, cond, nowIso, prevStatuses));
      setPolledAt(nowMs);
      setIsLoading(false);
    };

    pollRef.current = () => void poll();
    void poll();
    return () => {
      controller.abort();
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, []);

  const refetch = useCallback(() => {
    pollRef.current();
  }, []);

  const { connection } = useLiveDashboard({
    channels: ["agents"],
    onEvent: (payload) => {
      if (payload.channel !== "agents") return;
      if (debounceRef.current) return; // debounce burst → one refetch
      debounceRef.current = setTimeout(() => {
        debounceRef.current = null;
        refetch();
      }, WS_REFETCH_DEBOUNCE_MS);
    },
  });

  // Adaptive poll interval, separated from the mount effect above: a connected `agents` WS
  // already pushes refetches on change, so the background poll only needs to be a slow safety
  // net (30s) — it falls back to the tighter 5s cadence while the WS is down. Declared AFTER
  // the mount effect so `pollRef.current` is already populated (its initial value is a safe
  // no-op) by the time this effect's first tick can fire.
  const wsConnected = connection.isConnected;
  useEffect(() => {
    const id = setInterval(() => pollRef.current(), wsConnected ? POLL_MS_WS_CONNECTED : POLL_MS);
    return () => clearInterval(id);
  }, [wsConnected]);

  const snapshot: OrchSnapshot = useMemo(
    () =>
      mergeSnapshot(
        {
          cloudAgent: fromCloudAgent(raw.cloudAgent),
          a2a: fromA2A(raw.a2a),
          conductor: fromConductor(raw.conductor),
        },
        statuses,
        { now: polledAt, showCompleted }
      ),
    [raw, statuses, showCompleted, polledAt]
  );

  // `polledAt` advances every poll tick and re-mints every node/edge array in
  // `snapshot` above even when nothing meaningful changed, which would defeat
  // the canvas node components' `React.memo`. Render-time-sync idiom (same
  // pattern as `useSyncedNodeIdentity` in `useDrawerDetail.ts`): only adopt the
  // freshly computed snapshot when its content key actually differs, so
  // `stableSnapshot` keeps referential identity across no-op ticks.
  const [syncedKey, setSyncedKey] = useState("");
  const [stableSnapshot, setStableSnapshot] = useState<OrchSnapshot>(snapshot);
  const key = snapshotContentKey(snapshot);
  if (key !== syncedKey) {
    setSyncedKey(key);
    setStableSnapshot(snapshot);
  }

  return { snapshot: stableSnapshot, isLoading, showCompleted, setShowCompleted, refetch };
}
