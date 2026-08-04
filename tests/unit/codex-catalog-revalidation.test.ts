import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import type { SyncedAvailableModel } from "../../src/lib/db/models.ts";
import {
  createCodexCatalogRevalidationCoordinator,
  executeCodexCatalogRevalidation,
  resolveBootRevalidationReason,
  resolveCodexCatalogAppVersion,
  scrubSyncedModelsWithCodexDenylist,
} from "../../src/shared/services/codexCatalogRevalidation.ts";

test("Codex revalidation avoids top-level createRequire in packaged Next modules", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/shared/services/codexCatalogRevalidation.ts"),
    "utf8"
  );
  assert.doesNotMatch(source, /^const\s+\w+\s*=\s*createRequire\s*\(/m);
});

test("scrubSyncedModelsWithCodexDenylist drops the GPT-5.4 family and keeps others", () => {
  const input = [
    { id: "gpt-5.6-sol", name: "Sol", source: "imported" },
    { id: "gpt-5.4", name: "Retired", source: "imported" },
    { id: "gpt-5.4-mini", name: "Retired Mini", source: "imported" },
    { id: "future-codex-experimental", name: "Future", source: "imported" },
  ] satisfies SyncedAvailableModel[];
  const { kept, removedIds } = scrubSyncedModelsWithCodexDenylist(input);

  assert.deepEqual(
    kept.map((m) => m.id),
    ["gpt-5.6-sol", "future-codex-experimental"]
  );
  assert.deepEqual(removedIds.sort(), ["gpt-5.4", "gpt-5.4-mini"]);
});

test("scrubSyncedModelsWithCodexDenylist is a no-op when nothing is denylisted", () => {
  const input = [
    { id: "gpt-5.6-sol", name: "Sol", source: "imported" },
    { id: "gpt-5.5-low", name: "5.5 Low", source: "imported" },
  ] satisfies SyncedAvailableModel[];
  const { kept, removedIds } = scrubSyncedModelsWithCodexDenylist(input);
  assert.equal(removedIds.length, 0);
  assert.equal(kept.length, 2);
});

test("resolveCodexCatalogAppVersion uses stable, source-qualified identities", () => {
  const runtimeRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-version-identity-"));
  assert.equal(
    resolveCodexCatalogAppVersion(
      {
        OMNIROUTE_BUILD_SHA: "abc123",
        npm_package_version: "9.9.9",
      },
      { runtimeRoot }
    ),
    "build:abc123"
  );
  assert.equal(
    resolveCodexCatalogAppVersion(
      {
        npm_package_version: "3.8.47",
      },
      { runtimeRoot }
    ),
    "pkg:3.8.47"
  );

  try {
    fs.writeFileSync(path.join(runtimeRoot, "BUILD_SHA"), "sentinel-sha\n");
    assert.equal(
      resolveCodexCatalogAppVersion({}, { runtimeRoot, packageVersion: "3.8.47" }),
      "build:sentinel-sha"
    );
    fs.rmSync(path.join(runtimeRoot, "BUILD_SHA"));
    fs.writeFileSync(path.join(runtimeRoot, "package.json"), '{"version":"9.8.7"}\n');
    assert.equal(resolveCodexCatalogAppVersion({}, { runtimeRoot }), "pkg:9.8.7");
    assert.equal(
      resolveCodexCatalogAppVersion({}, { runtimeRoot, packageVersion: "3.8.47" }),
      "pkg:3.8.47"
    );
    assert.equal(resolveCodexCatalogAppVersion({}, { runtimeRoot, packageVersion: null }), null);
  } finally {
    fs.rmSync(runtimeRoot, { recursive: true, force: true });
  }
});

test("resolveBootRevalidationReason only fires on first-start or upgrade", () => {
  assert.equal(resolveBootRevalidationReason(null, "v2"), "first-start");
  assert.equal(resolveBootRevalidationReason("", "v2"), "first-start");
  assert.equal(resolveBootRevalidationReason("v1", "v2"), "upgrade");
  assert.equal(resolveBootRevalidationReason("v2", "v2"), null);
});

test("executeCodexCatalogRevalidation records completion only after a full live sync", async () => {
  const events: string[] = [];
  const failed = await executeCodexCatalogRevalidation({
    appVersion: "build:audit",
    scrub: async () => {
      events.push("scrub");
    },
    waitForReady: async () => {
      events.push("ready");
    },
    liveResync: async () => {
      events.push("sync");
      return { attempted: 2, succeeded: 1 };
    },
    writeMarker: async () => {
      events.push("marker");
      return true;
    },
    logSuccess: () => {
      events.push("log");
    },
  });

  assert.equal(failed.complete, false);
  assert.deepEqual(events, ["scrub", "ready", "sync"]);

  events.length = 0;
  const complete = await executeCodexCatalogRevalidation({
    appVersion: "build:audit",
    scrub: async () => {
      events.push("scrub");
    },
    waitForReady: async () => {
      events.push("ready");
    },
    liveResync: async () => {
      events.push("sync");
      return { attempted: 2, succeeded: 2 };
    },
    writeMarker: async () => {
      events.push("marker");
      return true;
    },
    logSuccess: () => {
      events.push("log");
    },
  });

  assert.equal(complete.complete, true);
  assert.deepEqual(events, ["scrub", "ready", "sync", "marker", "log"]);
});

test("executeCodexCatalogRevalidation leaves an unknown-version run incomplete and unlogged", async () => {
  const events: string[] = [];
  const result = await executeCodexCatalogRevalidation({
    appVersion: null,
    scrub: async () => undefined,
    waitForReady: async () => undefined,
    liveResync: async () => ({ attempted: 0, succeeded: 0 }),
    writeMarker: async () => {
      events.push("marker");
      return true;
    },
    logSuccess: () => {
      events.push("log");
    },
  });

  assert.equal(result.complete, false);
  assert.deepEqual(events, []);
});

test("executeCodexCatalogRevalidation does not complete after readiness or marker failure", async () => {
  let liveCalls = 0;
  let markerCalls = 0;
  let successLogs = 0;
  const notReady = await executeCodexCatalogRevalidation({
    appVersion: "build:audit",
    scrub: async () => undefined,
    waitForReady: async () => {
      throw new Error("not ready");
    },
    liveResync: async () => {
      liveCalls += 1;
      return { attempted: 1, succeeded: 1 };
    },
    writeMarker: async () => {
      markerCalls += 1;
      return true;
    },
    logSuccess: () => {
      successLogs += 1;
    },
  });
  assert.equal(notReady.complete, false);
  assert.equal(liveCalls, 0);
  assert.equal(markerCalls, 0);
  assert.equal(successLogs, 0);

  const markerFailed = await executeCodexCatalogRevalidation({
    appVersion: "build:audit",
    scrub: async () => undefined,
    waitForReady: async () => undefined,
    liveResync: async () => ({ attempted: 1, succeeded: 1 }),
    writeMarker: async () => false,
    logSuccess: () => {
      successLogs += 1;
    },
  });
  assert.equal(markerFailed.complete, false);
  assert.equal(successLogs, 0);
});

test("Codex revalidation coordinator coalesces startup and queues one init rerun", async () => {
  let releaseFirst: (() => void) | undefined;
  const firstGate = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const reasons: string[] = [];
  let active = 0;
  let maxActive = 0;
  const request = createCodexCatalogRevalidationCoordinator(async (options) => {
    reasons.push(options.reason);
    active += 1;
    maxActive = Math.max(maxActive, active);
    if (reasons.length === 1) await firstGate;
    active -= 1;
  });

  const startupA = request({ reason: "upgrade" });
  const startupB = request({ reason: "upgrade" });
  const initA = request({ reason: "init" });
  const initB = request({ reason: "init" });
  releaseFirst?.();
  await Promise.all([startupA, startupB, initA, initB]);

  assert.deepEqual(reasons, ["upgrade", "init"]);
  assert.equal(maxActive, 1);
});

test("Codex revalidation coordinator does not lose init during active-run settlement", async () => {
  let releaseFirst: (() => void) | undefined;
  const firstGate = new Promise<void>((resolve) => {
    releaseFirst = resolve;
  });
  const reasons: string[] = [];
  const request = createCodexCatalogRevalidationCoordinator(async ({ reason }) => {
    reasons.push(reason);
    if (reasons.length === 1) await firstGate;
  });

  const activeRun = request({ reason: "upgrade" });
  const settlementInit = firstGate.then(() =>
    Promise.resolve().then(() => request({ reason: "init" }))
  );
  releaseFirst?.();
  await Promise.all([activeRun, settlementInit]);

  assert.deepEqual(reasons, ["upgrade", "init"]);
});
