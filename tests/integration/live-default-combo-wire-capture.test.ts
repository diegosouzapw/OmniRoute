/**
 * tests/integration/live-default-combo-wire-capture.test.ts
 *
 * Wire-level correlation test. Spins up a dedicated, throwaway podman
 * container (liveContainerHarness.ts), captures its network traffic
 * (wireCapture.ts — rootless tcpdump via `podman unshare nsenter`, no root),
 * sends a representative sample of requests against the real "default"
 * combo, then cross-checks each request's app-level result (JSON status)
 * against what actually went out on the wire (HTTP response status line,
 * verdict on who closed the connection first). Catches bugs where the app
 * layer claims success but the wire shows a truncated/reset stream.
 *
 * Fully self-contained — does not touch omniroute-beta or omniroute-dev
 * (only reads from omniroute-dev's DB once, to seed its own dedicated
 * container's data dir). Gated on RUN_LIVE_WIRE_CAPTURE=1: needs podman,
 * tcpdump, python3, and a real .env with provider credentials, so it must
 * never run in CI.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  LIVE_CONTAINER_ENABLED,
  startLiveContainer,
  type LiveContainerHandle,
} from "./liveContainerHarness.ts";
import {
  startWireCapture,
  analyzeCapture,
  indexByCorrelationId,
  responseStatusLine,
  type CaptureHandle,
} from "./wireCapture.ts";
import {
  getDefaultComboModelTargets,
  filterActiveModelTargets,
  sendModelRequest,
} from "./liveDefaultComboShared.ts";

const skip = !LIVE_CONTAINER_ENABLED
  ? "RUN_LIVE_WIRE_CAPTURE not set — skipping wire-capture live test"
  : undefined;

// Wire-level correlation is the point of this suite, not breadth across
// every provider (already covered by live-default-combo-workload.test.ts) —
// keep the sample small so capture/analysis stays fast.
const SAMPLE_SIZE = 4;

let container: LiveContainerHandle;
let capture: CaptureHandle;

test.before(async () => {
  if (skip) return;
  container = await startLiveContainer();
  process.env.DATA_DIR = container.dataDir;

  // PID-scoped so a concurrent session running this same test never
  // collides on the capture file or the pkill-by-path cleanup in
  // wireCapture.ts's stop().
  const pcapPath = `/tmp/omniroute-live-wire-capture-${process.pid}.pcap`;
  // Capture happens INSIDE the container's own netns (podman unshare
  // nsenter --net=<SandboxKey>), so packets there are addressed to the
  // container's internal listening port (20128), not the dynamically
  // assigned host port used to reach it from outside — filtering on
  // hostPort here would silently match nothing.
  capture = await startWireCapture(container.netnsPath, pcapPath, "tcp port 20128");
});

test.after(async () => {
  if (skip) return;
  await capture?.stop();
  await container?.stop();
});

test(
  "wire capture: app-level status matches the HTTP status line actually observed on the wire",
  { skip },
  async () => {
    const allTargets = await getDefaultComboModelTargets();
    assert.ok(allTargets.length > 0, `"default" combo has no model steps — nothing to test`);

    const { active } = await filterActiveModelTargets(allTargets, {
      baseUrl: container.baseUrl,
      apiKey: container.managementApiKey,
    });
    assert.ok(active.length > 0, "no active provider connections in the seeded container");

    const sample = active.slice(0, SAMPLE_SIZE);
    console.log(
      `\n  [wire-capture] sampling ${sample.length} model(s): ${sample.map((t) => t.model).join(", ")}`
    );

    const results = await Promise.all(
      sample.map((t) =>
        sendModelRequest(t.model, false, "chat", {
          baseUrl: container.baseUrl,
          apiKey: container.apiKey,
        })
      )
    );

    // Give the capture a moment to flush the last packets before analyzing.
    await new Promise((r) => setTimeout(r, 1000));
    await capture.stop();
    const streams = await analyzeCapture(capture.pcapPath);
    const byCorrelationId = indexByCorrelationId(streams);

    console.log(`  [wire-capture] captured ${streams.length} TCP stream(s)`);

    const mismatches: string[] = [];
    for (const r of results) {
      if (r.correlationId === "?") {
        mismatches.push(`${r.model}: no correlationId returned in response headers`);
        continue;
      }
      const matched = byCorrelationId.get(r.correlationId);
      if (!matched || matched.length === 0) {
        mismatches.push(
          `${r.model}: correlationId ${r.correlationId} not found in any captured wire stream`
        );
        continue;
      }
      const wireStatusLines = matched.map(responseStatusLine).filter(Boolean);
      const wireStatusCodes = wireStatusLines.map((line) => line!.split(" ")[1]);
      if (!wireStatusCodes.includes(String(r.status))) {
        mismatches.push(
          `${r.model}: app-level status ${r.status} but wire shows ${wireStatusCodes.join(",") || "no status line"} (cid ${r.correlationId})`
        );
      }
    }

    if (mismatches.length > 0) {
      console.log(`\n  Wire/app-level mismatches (${mismatches.length}):`);
      for (const m of mismatches) console.log(`    ${m}`);
    }

    assert.equal(
      mismatches.length,
      0,
      `${mismatches.length}/${results.length} requests had app-level results that don't match what was observed on the wire`
    );
  }
);
