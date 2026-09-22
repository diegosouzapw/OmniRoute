/**
 * JON-562: bounded memory profile for the real Claude `/v1/messages` request boundary.
 *
 * The default driver runs each context size in a fresh child process. The worker uses a
 * synthetic request and a local fetch stub, so it exercises admission, parsing, translation,
 * request logging and SSE cleanup without credentials or provider calls. Raw payloads are never
 * written. Artifacts are private (umask 077) and contain only measurements plus V8 profiles of
 * the synthetic process.
 *
 * Usage:
 *   node --import tsx/esm scripts/perf/messages-route-memory-profile.ts \
 *     --output-dir /tmp/omniroute-JON-562
 *
 * Defaults: 100k, 300k and 600k token-equivalents; six sequential requests per fresh process;
 * concurrency=1; stream=true; cancellation=none. Context size is the only changing factor.
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import inspector from "node:inspector";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import v8 from "node:v8";

export const BYTES_PER_TOKEN_EQUIVALENT = 4;
export const DEFAULT_TOKEN_EQUIVALENTS = [100_000, 300_000, 600_000] as const;
const PROVENANCE_FILES = [
  "src/lib/usage/completedRequestDetails.ts",
  "src/lib/usage/usageHistory.ts",
  "tests/unit/active-request-stream-chunks-lifecycle.test.ts",
  "scripts/perf/messages-route-memory-profile.ts",
  "tests/unit/messages-route-memory-profile.test.ts",
] as const;

type ClaudePayload = {
  model: string;
  max_tokens: number;
  stream: boolean;
  messages: Array<{ role: "user"; content: string }>;
};

export type MemoryRow = {
  phase: "baseline" | "after_route" | "after_drain" | "settled" | "final";
  elapsedMs: number;
  requestIndex?: number;
  heapUsedBytes: number;
  heapTotalBytes: number;
  rssBytes: number;
  externalBytes: number;
  arrayBuffersBytes: number;
  admission: {
    activeHeavy: number;
    activeHealthyHeadroom: number;
    inflightBytes: number;
    queuedBytes: number;
    waiting: number;
  };
};

type GrowthSummary = {
  baselineHeapUsedBytes: number;
  finalSettledHeapUsedBytes: number;
  settledGrowthBytes: number;
  settledSlopeBytesPerRequest: number;
  growthToWireRatio: number;
};

function markerFor(tokenEquivalent: number): string {
  return ["JON", "562", tokenEquivalent, "CONTEXT"].join("-");
}

/**
 * Build the credential-free environment inherited by profiler children.
 * @param source - Environment to copy allowlisted runtime fields from.
 * @returns A new environment containing only allowlisted fields and fixed test settings.
 */
export function buildWorkerEnv(
  source: NodeJS.ProcessEnv | Record<string, string | undefined> = process.env
): NodeJS.ProcessEnv {
  const env: NodeJS.ProcessEnv = {};
  for (const key of ["PATH", "HOME", "TMPDIR", "TEMP", "TMP", "LANG", "LC_ALL", "TZ"] as const) {
    const value = source[key];
    if (value) env[key] = value;
  }
  env.NODE_ENV = "test";
  env.APP_LOG_LEVEL = "error";
  return env;
}

/**
 * Build an ASCII-only Claude body with an exact, repeatable serialized size.
 * @param tokenEquivalent - Context size expressed at four serialized bytes per token.
 * @returns The synthetic body, its marker and exact target wire size.
 * @throws {RangeError} If `tokenEquivalent` is invalid or too small for the fixed envelope.
 * @throws {Error} If serialization does not match the calculated target size.
 */
export function buildClaudeContextPayload(tokenEquivalent: number): {
  body: ClaudePayload;
  marker: string;
  targetWireBytes: number;
} {
  if (!Number.isSafeInteger(tokenEquivalent) || tokenEquivalent < 64) {
    throw new RangeError("tokenEquivalent must be an integer >= 64");
  }
  const targetWireBytes = tokenEquivalent * BYTES_PER_TOKEN_EQUIVALENT;
  const marker = markerFor(tokenEquivalent);
  const body: ClaudePayload = {
    model: "openai/gpt-4.1",
    max_tokens: 8,
    stream: true,
    messages: [{ role: "user", content: "" }],
  };
  const fixedBytes = Buffer.byteLength(JSON.stringify(body), "utf8");
  const contentBytes = targetWireBytes - fixedBytes;
  if (contentBytes < marker.length) {
    throw new RangeError("tokenEquivalent is too small for the fixed request envelope");
  }
  body.messages[0].content = marker + "x".repeat(contentBytes - marker.length);
  const actualBytes = Buffer.byteLength(JSON.stringify(body), "utf8");
  if (actualBytes !== targetWireBytes) {
    throw new Error(`payload calibration failed: wanted ${targetWireBytes}, got ${actualBytes}`);
  }
  return { body, marker, targetWireBytes };
}

/**
 * Calculate post-GC growth from baseline and settled samples only.
 * @param rows - Ordered memory samples from one isolated workload.
 * @param wireBytes - Exact serialized request size used to calculate the growth ratio.
 * @returns Baseline, final, slope and wire-ratio measurements.
 * @throws {Error} If the samples contain no baseline or settled row.
 */
export function summarizeSettledGrowth(
  rows: Array<Pick<MemoryRow, "phase" | "heapUsedBytes" | "requestIndex">>,
  wireBytes: number
): GrowthSummary {
  const baseline = rows.find((row) => row.phase === "baseline");
  const settled = rows.filter((row) => row.phase === "settled");
  if (!baseline || settled.length === 0) {
    throw new Error("baseline and settled samples are required");
  }
  const final = settled[settled.length - 1];
  const settledGrowthBytes = final.heapUsedBytes - baseline.heapUsedBytes;
  const settledSlopeBytesPerRequest =
    settled.length < 2
      ? settledGrowthBytes
      : (final.heapUsedBytes - settled[0].heapUsedBytes) / (settled.length - 1);
  return {
    baselineHeapUsedBytes: baseline.heapUsedBytes,
    finalSettledHeapUsedBytes: final.heapUsedBytes,
    settledGrowthBytes,
    settledSlopeBytesPerRequest,
    growthToWireRatio: settledGrowthBytes / wireBytes,
  };
}

function argValue(flag: string): string | undefined {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function positiveIntArg(flag: string, fallback: number): number {
  const raw = argValue(flag);
  if (raw === undefined) return fallback;
  const value = Number(raw);
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`${flag} must be a positive integer`);
  }
  return value;
}

function privateDirectory(directory: string): void {
  fs.mkdirSync(directory, { recursive: true, mode: 0o700 });
  fs.chmodSync(directory, 0o700);
}

function writePrivateJson(file: string, value: unknown): void {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", { mode: 0o600 });
  fs.chmodSync(file, 0o600);
}

function appendPrivateJsonLine(file: string, value: unknown): void {
  fs.appendFileSync(file, JSON.stringify(value) + "\n", { mode: 0o600 });
}

/**
 * Run work while guaranteeing removal of its raw heap-snapshot path.
 * @param snapshotFile - Raw snapshot path owned by the operation.
 * @param work - Worker/analyzer operation to run before cleanup.
 * @returns The fulfilled result from `work`.
 * @throws The original work or cleanup error.
 */
export async function withRawSnapshotCleanup<T>(
  snapshotFile: string,
  work: () => Promise<T>
): Promise<T> {
  try {
    return await work();
  } finally {
    fs.rmSync(snapshotFile, { force: true });
  }
}

/**
 * Remove a worker snapshot unless a successful driver handoff owns it.
 * @param snapshotFile - Raw worker snapshot path.
 * @param state - Whether the worker completed and the driver accepted ownership.
 * @returns Nothing.
 */
export function cleanupWorkerSnapshot(
  snapshotFile: string,
  state: { workerComplete: boolean; snapshotHandoff: boolean }
): void {
  if (!state.workerComplete || !state.snapshotHandoff) {
    fs.rmSync(snapshotFile, { force: true });
  }
}

function forceGc(): void {
  if (typeof globalThis.gc !== "function") {
    throw new Error("JON-562 worker requires node --expose-gc");
  }
  for (let index = 0; index < 4; index += 1) globalThis.gc();
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function inspectorPost<T>(
  session: inspector.Session,
  method: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return new Promise((resolve, reject) => {
    session.post(method, params, (error, result) => {
      if (error) reject(error);
      else resolve(result as T);
    });
  });
}

async function startAllocationSampling(): Promise<{
  stop: () => Promise<Record<string, unknown>>;
  disconnect: () => void;
}> {
  const session = new inspector.Session();
  session.connect();
  await inspectorPost(session, "HeapProfiler.enable");
  await inspectorPost(session, "HeapProfiler.startSampling", {
    samplingInterval: 32 * 1024,
    includeObjectsCollectedByMajorGC: true,
    includeObjectsCollectedByMinorGC: true,
  });
  return {
    stop: async () => {
      const result = await inspectorPost<{ profile: Record<string, unknown> }>(
        session,
        "HeapProfiler.stopSampling"
      );
      return result.profile;
    },
    disconnect: () => session.disconnect(),
  };
}

function openAiSseResponse(): Response {
  const encoder = new TextEncoder();
  const frames = [
    `data: ${JSON.stringify({
      id: "chatcmpl_JON562",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4.1",
      choices: [{ index: 0, delta: { role: "assistant", content: "ok" } }],
    })}\n\n`,
    `data: ${JSON.stringify({
      id: "chatcmpl_JON562",
      object: "chat.completion.chunk",
      created: 1,
      model: "gpt-4.1",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
    })}\n\n`,
    "data: [DONE]\n\n",
  ];
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const frame of frames) controller.enqueue(encoder.encode(frame));
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

async function runWorker(): Promise<void> {
  process.umask(0o077);
  const tokenEquivalent = positiveIntArg("--tokens", 100_000);
  const iterations = positiveIntArg("--iterations", 6);
  const outputDir = path.resolve(argValue("--output-dir") ?? "");
  if (!argValue("--output-dir")) throw new Error("--output-dir is required in worker mode");
  privateDirectory(outputDir);

  const memoryFile = path.join(outputDir, "memory.jsonl");
  fs.writeFileSync(memoryFile, "", { mode: 0o600 });
  const startedAt = performance.now();
  const rows: MemoryRow[] = [];
  let providerCalls = 0;
  let harness: Awaited<
    ReturnType<
      typeof import("../../tests/integration/_chatPipelineHarness.ts").createChatPipelineHarness
    >
  > | null = null;
  let sampler: Awaited<ReturnType<typeof startAllocationSampling>> | null = null;
  let heapSnapshotFile: string | null = null;
  let workerComplete = false;
  const snapshotHandoff = process.argv.includes("--snapshot-handoff");

  try {
    const { createChatPipelineHarness } =
      await import("../../tests/integration/_chatPipelineHarness.ts");
    harness = await createChatPipelineHarness(`JON-562-${tokenEquivalent}`);
    const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
    const { perConnectionAdmissionController } =
      await import("../../src/shared/middleware/chatBodyAdmission.ts");
    const { reloadResourcePressureRuntime } =
      await import("../../open-sse/utils/resourcePressure.ts");

    reloadResourcePressureRuntime({
      heapThresholdMb: null,
      immediateHeapUsedMb: () => 1,
      sample: async () => ({
        observedAtMs: Date.now(),
        v8: { heapUsedBytes: 1, heapLimitBytes: Number.MAX_SAFE_INTEGER },
        process: {
          rssBytes: 1,
          externalBytes: 0,
          arrayBuffersBytes: 0,
          availableBytes: null,
          constrainedBytes: null,
        },
        cgroup: {
          currentBytes: null,
          maxBytes: null,
          highBytes: null,
          fileBytes: null,
          events: null,
        },
        psi: null,
      }),
    });
    harness.BaseExecutor.RETRY_CONFIG.delayMs = 0;
    await harness.resetStorage();
    await harness.seedConnection("openai", {
      name: "JON-562-local-stub",
      apiKey: "synthetic-not-a-credential",
    });
    globalThis.fetch = async () => {
      providerCalls += 1;
      return openAiSseResponse();
    };

    const sample = (phase: MemoryRow["phase"], requestIndex?: number): void => {
      const usage = process.memoryUsage();
      const admission = perConnectionAdmissionController.snapshot();
      const row: MemoryRow = {
        phase,
        elapsedMs: Math.round((performance.now() - startedAt) * 100) / 100,
        requestIndex,
        heapUsedBytes: usage.heapUsed,
        heapTotalBytes: usage.heapTotal,
        rssBytes: usage.rss,
        externalBytes: usage.external,
        arrayBuffersBytes: usage.arrayBuffers,
        admission: {
          activeHeavy: admission.activeHeavy,
          activeHealthyHeadroom: admission.activeHealthyHeadroom,
          inflightBytes: admission.inflightBytes,
          queuedBytes: admission.queuedBytes,
          waiting: admission.waiting,
        },
      };
      rows.push(row);
      appendPrivateJsonLine(memoryFile, row);
    };

    const runRequest = async (
      tokens: number,
      requestIndex: number,
      measured: boolean
    ): Promise<number> => {
      const { body, targetWireBytes } = buildClaudeContextPayload(tokens);
      const serialized = JSON.stringify(body);
      const request = new Request("http://omniroute.invalid/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "content-length": String(targetWireBytes),
          accept: "text/event-stream",
        },
        body: serialized,
      });
      const response = await messagesRoute.POST(request, {});
      if (measured) sample("after_route", requestIndex);
      const responseBody = await response.arrayBuffer();
      if (measured) sample("after_drain", requestIndex);
      if (response.status !== 200) {
        throw new Error(
          `route returned ${response.status} (${responseBody.byteLength} response bytes)`
        );
      }
      return responseBody.byteLength;
    };

    await runRequest(Math.min(tokenEquivalent, 2_048), 0, false);
    await delay(50);
    forceGc();

    // Allocation sampling is deliberately completed before the retention time series. The
    // inspector profiler retains its own sampled stack records; leaving it enabled would make
    // post-GC heap growth look linear even when the request payload itself was collectible.
    sampler = await startAllocationSampling();
    await runRequest(tokenEquivalent, 0, false);
    const allocationProfile = await sampler.stop();
    const allocationFile = path.join(outputDir, "allocation.heapprofile");
    writePrivateJson(allocationFile, allocationProfile);
    sampler.disconnect();
    sampler = null;

    await delay(100);
    forceGc();
    sample("baseline");

    const responseBytes: number[] = [];
    for (let requestIndex = 1; requestIndex <= iterations; requestIndex += 1) {
      responseBytes.push(await runRequest(tokenEquivalent, requestIndex, true));
      await delay(50);
      forceGc();
      sample("settled", requestIndex);
    }

    await delay(250);
    forceGc();
    sample("final");

    if (!process.argv.includes("--no-snapshot")) {
      forceGc();
      heapSnapshotFile = path.join(outputDir, "post-gc.heapsnapshot");
      v8.writeHeapSnapshot(heapSnapshotFile);
      fs.chmodSync(heapSnapshotFile, 0o600);
    }

    const { targetWireBytes } = buildClaudeContextPayload(tokenEquivalent);
    const growth = summarizeSettledGrowth(rows, targetWireBytes);
    const settledRows = rows.filter((row) => row.phase === "settled");
    const released = settledRows.every(
      (row) =>
        row.admission.activeHeavy === 0 &&
        row.admission.activeHealthyHeadroom === 0 &&
        row.admission.inflightBytes === 0 &&
        row.admission.waiting === 0
    );
    if (!released) throw new Error("admission state remained live after an SSE response drained");

    const manifest = {
      ticket: "JON-562",
      status: "complete",
      route: "/v1/messages",
      tokenEquivalent,
      bytesPerTokenEquivalent: BYTES_PER_TOKEN_EQUIVALENT,
      exactWireBytes: targetWireBytes,
      iterations,
      providerCalls,
      conditions: {
        concurrency: 1,
        cancellation: "none",
        stream: true,
        messageCount: 1,
        toolCount: 0,
        provider: "local-fetch-stub",
        networkCalls: 0,
      },
      runtime: {
        node: process.version,
        platform: process.platform,
        arch: process.arch,
        heapSizeLimitBytes: v8.getHeapStatistics().heap_size_limit,
      },
      responseBytes,
      allocationSampling: {
        intervalBytes: 32 * 1024,
        file: path.basename(allocationFile),
        requestCount: 1,
        measuredWindow: "one post-warmup request before the retention time series",
      },
      retentionSeries: { allocationSamplingEnabled: false },
      heapSnapshot: heapSnapshotFile ? path.basename(heapSnapshotFile) : null,
      admissionReleasedAfterEveryRequest: released,
      growth,
    };
    writePrivateJson(path.join(outputDir, "manifest.json"), manifest);
    workerComplete = true;
    process.stdout.write(JSON.stringify({ outputDir, status: "complete", growth }) + "\n");
  } finally {
    try {
      if (sampler) {
        await sampler.stop().catch(() => undefined);
        sampler.disconnect();
      }
      await harness?.cleanup();
    } finally {
      if (heapSnapshotFile) {
        cleanupWorkerSnapshot(heapSnapshotFile, { workerComplete, snapshotHandoff });
      }
    }
  }
}

export type HeapSnapshot = {
  snapshot: {
    meta: {
      node_fields: string[];
      node_types: Array<string[] | string>;
      edge_fields: string[];
      edge_types: Array<string[] | string>;
    };
  };
  nodes: number[];
  edges: number[];
  strings: string[];
};

function safeLabel(value: string, marker: string): string {
  if (value.includes(marker) || value.length > 120) return "<SYNTHETIC_CONTEXT_REDACTED>";
  if (path.isAbsolute(value)) return `<ABSOLUTE_PATH_REDACTED>/${path.basename(value)}`;
  return value;
}

/**
 * Classify marker-bearing V8 string graphs by their physical backing size.
 * @param parsed - Parsed V8 heap snapshot.
 * @param marker - Synthetic context marker to locate.
 * @param minimumSelfSizeBytes - Minimum backing-graph size treated as retained context.
 * @returns Candidate counts, physical sizes, verdict and large component roots.
 */
export function classifyContextBackingCandidates(
  parsed: HeapSnapshot,
  marker: string,
  minimumSelfSizeBytes: number
): {
  matchingPreviewNodes: number;
  maxSelfSizeBytes: number;
  maxBackingRetainedSizeBytes: number;
  retainedContextSelfSizeBytes: number;
  largeBackingRetained: boolean;
  largeNodeIndexes: number[];
} {
  const nodeFields = parsed.snapshot.meta.node_fields;
  const nodeWidth = nodeFields.length;
  const nodeTypeIndex = nodeFields.indexOf("type");
  const nodeNameIndex = nodeFields.indexOf("name");
  const nodeSelfSizeIndex = nodeFields.indexOf("self_size");
  const edgeCountIndex = nodeFields.indexOf("edge_count");
  const edgeFields = parsed.snapshot.meta.edge_fields;
  const edgeWidth = edgeFields.length;
  const edgeTypeIndex = edgeFields.indexOf("type");
  const edgeTargetIndex = edgeFields.indexOf("to_node");
  const nodeTypes = parsed.snapshot.meta.node_types[nodeTypeIndex] as string[];
  const edgeTypes = parsed.snapshot.meta.edge_types[edgeTypeIndex] as string[];
  const nodeCount = parsed.nodes.length / nodeWidth;
  const matching: Array<{ nodeIndex: number; selfSizeBytes: number }> = [];
  const stringParents: Array<number[] | undefined> = new Array(nodeCount);
  const stringChildren: Array<number[] | undefined> = new Array(nodeCount);
  const isStringNode = (nodeIndex: number): boolean => {
    const type = nodeTypes[parsed.nodes[nodeIndex * nodeWidth + nodeTypeIndex]];
    return type === "string" || type === "concatenated string" || type === "sliced string";
  };

  let edgeOffset = 0;
  for (let from = 0; from < nodeCount; from += 1) {
    const edgeCount = parsed.nodes[from * nodeWidth + edgeCountIndex];
    for (let local = 0; local < edgeCount; local += 1) {
      const type = edgeTypes[parsed.edges[edgeOffset + edgeTypeIndex]];
      const to = parsed.edges[edgeOffset + edgeTargetIndex] / nodeWidth;
      if (type === "internal" && isStringNode(from) && isStringNode(to)) {
        (stringChildren[from] ??= []).push(to);
        (stringParents[to] ??= []).push(from);
      }
      edgeOffset += edgeWidth;
    }
  }

  for (let nodeIndex = 0; nodeIndex < nodeCount; nodeIndex += 1) {
    const offset = nodeIndex * nodeWidth;
    const type = nodeTypes[parsed.nodes[offset + nodeTypeIndex]];
    if (type !== "string" && type !== "concatenated string" && type !== "sliced string") continue;
    const name = parsed.strings[parsed.nodes[offset + nodeNameIndex]] ?? "";
    if (name.includes(marker)) {
      matching.push({ nodeIndex, selfSizeBytes: parsed.nodes[offset + nodeSelfSizeIndex] });
    }
  }

  const componentRoots = new Set<number>();
  for (const entry of matching) {
    const queue = [entry.nodeIndex];
    const seen = new Set<number>();
    while (queue.length > 0) {
      const node = queue.pop() as number;
      if (seen.has(node)) continue;
      seen.add(node);
      const parents = stringParents[node] ?? [];
      if (parents.length === 0) componentRoots.add(node);
      else queue.push(...parents);
    }
  }

  const components = [...componentRoots].map((root) => {
    const nodes = new Set<number>();
    const queue = [root];
    let retainedSizeBytes = 0;
    while (queue.length > 0) {
      const node = queue.pop() as number;
      if (nodes.has(node)) continue;
      nodes.add(node);
      retainedSizeBytes += parsed.nodes[node * nodeWidth + nodeSelfSizeIndex];
      queue.push(...(stringChildren[node] ?? []));
    }
    return { root, nodes, retainedSizeBytes };
  });
  const large = components.filter(
    (component) => component.retainedSizeBytes >= minimumSelfSizeBytes
  );
  const retainedNodes = new Set<number>();
  for (const component of large) {
    for (const node of component.nodes) retainedNodes.add(node);
  }
  return {
    matchingPreviewNodes: matching.length,
    maxSelfSizeBytes: matching.reduce(
      (maximum, entry) => Math.max(maximum, entry.selfSizeBytes),
      0
    ),
    maxBackingRetainedSizeBytes: components.reduce(
      (maximum, component) => Math.max(maximum, component.retainedSizeBytes),
      0
    ),
    retainedContextSelfSizeBytes: [...retainedNodes].reduce(
      (total, node) => total + parsed.nodes[node * nodeWidth + nodeSelfSizeIndex],
      0
    ),
    largeBackingRetained: large.length > 0,
    largeNodeIndexes: large.map((component) => component.root),
  };
}

function analyzeSnapshot(snapshotFile: string, marker: string, minimumSelfSizeBytes: number) {
  const parsed = JSON.parse(fs.readFileSync(snapshotFile, "utf8")) as HeapSnapshot;
  const meta = parsed.snapshot.meta;
  const nodeFields = meta.node_fields;
  const edgeFields = meta.edge_fields;
  const nodeWidth = nodeFields.length;
  const edgeWidth = edgeFields.length;
  const nodeTypeIndex = nodeFields.indexOf("type");
  const nodeNameIndex = nodeFields.indexOf("name");
  const edgeCountIndex = nodeFields.indexOf("edge_count");
  const edgeTypeIndex = edgeFields.indexOf("type");
  const edgeNameIndex = edgeFields.indexOf("name_or_index");
  const edgeTargetIndex = edgeFields.indexOf("to_node");
  const nodeTypes = meta.node_types[nodeTypeIndex] as string[];
  const edgeTypes = meta.edge_types[edgeTypeIndex] as string[];
  const nodeCount = parsed.nodes.length / nodeWidth;
  const classification = classifyContextBackingCandidates(parsed, marker, minimumSelfSizeBytes);
  const candidateNodes = new Set(classification.largeNodeIndexes);

  const parents: Array<Array<{ from: number; edgeType: string; edgeName: string }> | undefined> =
    new Array(nodeCount);
  let edgeOffset = 0;
  for (let from = 0; from < nodeCount; from += 1) {
    const nodeOffset = from * nodeWidth;
    const edgeCount = parsed.nodes[nodeOffset + edgeCountIndex];
    for (let local = 0; local < edgeCount; local += 1) {
      const type = edgeTypes[parsed.edges[edgeOffset + edgeTypeIndex]];
      const rawName = parsed.edges[edgeOffset + edgeNameIndex];
      const to = parsed.edges[edgeOffset + edgeTargetIndex] / nodeWidth;
      if (type !== "weak") {
        const edgeName =
          type === "element" || type === "hidden" ? String(rawName) : parsed.strings[rawName];
        (parents[to] ??= []).push({ from, edgeType: type, edgeName: edgeName ?? "" });
      }
      edgeOffset += edgeWidth;
    }
  }

  const describeNode = (index: number) => {
    const offset = index * nodeWidth;
    return {
      type: nodeTypes[parsed.nodes[offset + nodeTypeIndex]],
      name: safeLabel(parsed.strings[parsed.nodes[offset + nodeNameIndex]] ?? "", marker),
    };
  };

  const paths: unknown[] = [];
  for (const target of [...candidateNodes].slice(0, 5)) {
    const queue: Array<{ node: number; path: Array<Record<string, unknown>> }> = [
      { node: target, path: [{ node: describeNode(target) }] },
    ];
    const seen = new Set([target]);
    let found: Array<Record<string, unknown>> | null = null;
    while (queue.length > 0 && !found) {
      const current = queue.shift() as { node: number; path: Array<Record<string, unknown>> };
      if (current.node === 0 || current.path.length >= 32) {
        found = current.path;
        break;
      }
      for (const parent of parents[current.node] ?? []) {
        if (seen.has(parent.from)) continue;
        seen.add(parent.from);
        const nextPath = [
          ...current.path,
          {
            retainedBy: describeNode(parent.from),
            edgeType: parent.edgeType,
            edgeName: safeLabel(parent.edgeName, marker),
          },
        ];
        if (parent.from === 0) {
          found = nextPath;
          break;
        }
        queue.push({ node: parent.from, path: nextPath });
      }
    }
    paths.push(found ?? [{ node: describeNode(target) }, { finding: "no root within 32 edges" }]);
  }

  return {
    matchingContextPreviewNodes: classification.matchingPreviewNodes,
    maxContextNodeSelfSizeBytes: classification.maxSelfSizeBytes,
    maxContextBackingRetainedSizeBytes: classification.maxBackingRetainedSizeBytes,
    retainedContextSelfSizeBytes: classification.retainedContextSelfSizeBytes,
    minimumLargeBackingSelfSizeBytes: minimumSelfSizeBytes,
    largeBackingRetained: classification.largeBackingRetained,
    finding:
      candidateNodes.size === 0
        ? "Only detached context previews remained; no context-sized backing string crossed the V8 self_size threshold."
        : "A context-sized backing string remained after forced GC; redacted root paths follow.",
    paths,
  };
}

/**
 * Enforce the physical large-backing retention gate.
 * @param result - Analyzer verdict to enforce.
 * @returns Nothing.
 * @throws {Error} If a context-sized backing string survived forced garbage collection.
 */
export function assertNoLargeBacking(result: { largeBackingRetained: boolean }): void {
  if (result.largeBackingRetained) {
    throw new Error("context-sized backing string remained after forced GC");
  }
}

async function runAnalyzer(): Promise<void> {
  process.umask(0o077);
  const snapshotArg = argValue("--snapshot");
  if (!snapshotArg) throw new Error("analyzer requires --snapshot");
  const snapshotFile = path.resolve(snapshotArg);
  const outputArg = argValue("--output-dir");
  const marker = argValue("--marker") ?? "";
  try {
    if (!outputArg || !marker) {
      throw new Error("analyzer requires --output-dir and --marker");
    }
    const minimumSelfSizeBytes = positiveIntArg("--minimum-self-size-bytes", 1_024);
    const outputDir = path.resolve(outputArg);
    const result = analyzeSnapshot(snapshotFile, marker, minimumSelfSizeBytes);
    const snapshotStat = fs.statSync(snapshotFile);
    const snapshotSha256 = await sha256File(snapshotFile);
    const redactedResult = {
      ...result,
      snapshot: {
        state: "deleted-after-local-analysis",
        byteSize: snapshotStat.size,
        sha256: snapshotSha256,
      },
    };
    writePrivateJson(path.join(outputDir, "retainers.redacted.json"), redactedResult);
    assertNoLargeBacking(result);
    process.stdout.write(JSON.stringify(redactedResult) + "\n");
  } finally {
    fs.rmSync(snapshotFile, { force: true });
  }
}

function harnessHash(): string {
  return createHash("sha256")
    .update(fs.readFileSync(new URL(import.meta.url)))
    .digest("hex");
}

function gitOutput(args: string[]): string {
  const result = spawnSync("git", args, {
    encoding: "utf8",
    env: buildWorkerEnv(process.env),
  });
  if (result.status !== 0) {
    throw new Error(`git ${args.join(" ")} failed: ${result.stderr.trim()}`);
  }
  return result.stdout.trim();
}

function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function sourceProvenance() {
  const testedCommit = gitOutput(["rev-parse", "HEAD"]);
  if (!/^[0-9a-f]{40}$/.test(testedCommit)) {
    throw new Error(`invalid git HEAD: ${testedCommit || "empty"}`);
  }
  // `git branch --show-current` is empty on a detached HEAD, which is the normal checkout
  // state for a CI PR run and for this fix worktree's own detached `git worktree add` — fall
  // back to a descriptive marker instead of treating that as an error.
  const branch = gitOutput(["branch", "--show-current"]) || `detached@${testedCommit.slice(0, 12)}`;
  const sourceFiles = Object.fromEntries(
    PROVENANCE_FILES.map((file) => {
      if (!fs.existsSync(file)) throw new Error(`provenance file missing: ${file}`);
      return [file, sha256(fs.readFileSync(file))];
    })
  );
  const trackedDiff = gitOutput(["diff", "--binary", "HEAD", "--", ...PROVENANCE_FILES]);
  return {
    testedCommit,
    branch,
    statusPorcelain: gitOutput(["status", "--porcelain=v1", "--untracked-files=all"])
      .split("\n")
      .filter(Boolean),
    trackedDiffSha256: sha256(trackedDiff),
    sourceSetSha256: sha256(JSON.stringify(sourceFiles)),
    sourceFiles,
  };
}

function sha256File(file: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const input = fs.createReadStream(file);
    input.on("error", reject);
    input.on("data", (chunk) => hash.update(chunk));
    input.on("end", () => resolve(hash.digest("hex")));
  });
}

async function runDriver(): Promise<void> {
  process.umask(0o077);
  const outputDir = path.resolve(
    argValue("--output-dir") ??
      path.join(os.tmpdir(), `omniroute-JON-562-${new Date().toISOString().replace(/[:.]/g, "-")}`)
  );
  const iterations = positiveIntArg("--iterations", 6);
  const tokenCases = (argValue("--tokens") ?? DEFAULT_TOKEN_EQUIVALENTS.join(","))
    .split(",")
    .map((raw) => Number(raw));
  if (tokenCases.some((value) => !Number.isSafeInteger(value) || value < 64)) {
    throw new RangeError("--tokens must be a comma-separated list of integers >= 64");
  }
  privateDirectory(outputDir);

  const cases: unknown[] = [];
  const scriptFile = fileURLToPath(import.meta.url);
  for (const tokenEquivalent of tokenCases) {
    const caseDir = path.join(outputDir, `context-${tokenEquivalent}`);
    privateDirectory(caseDir);
    const snapshotFile = path.join(caseDir, "post-gc.heapsnapshot");
    await withRawSnapshotCleanup(snapshotFile, async () => {
      const worker = spawnSync(
        process.execPath,
        [
          "--expose-gc",
          "--import",
          "tsx/esm",
          scriptFile,
          "--worker",
          "--snapshot-handoff",
          "--tokens",
          String(tokenEquivalent),
          "--iterations",
          String(iterations),
          "--output-dir",
          caseDir,
        ],
        {
          cwd: process.cwd(),
          encoding: "utf8",
          env: buildWorkerEnv(process.env),
          // Measured ~230s wall for the 100k-token case alone (tsx/esm boot of the full
          // route/handler module graph + real request lifecycle) on an idle box — 180s left
          // no margin and made SIGKILL-on-timeout indistinguishable from a real worker crash
          // (`worker.status` is `null`, which already fails the `!== 0` check below).
          timeout: 300_000,
          killSignal: "SIGKILL",
        }
      );
      if (worker.status !== 0) {
        throw new Error(`worker ${tokenEquivalent} failed:\n${worker.stdout}\n${worker.stderr}`);
      }

      const analyzer = spawnSync(
        process.execPath,
        [
          "--max-old-space-size=4096",
          "--import",
          "tsx/esm",
          scriptFile,
          "--analyze-snapshot",
          "--snapshot",
          snapshotFile,
          "--output-dir",
          caseDir,
          "--marker",
          markerFor(tokenEquivalent),
          "--minimum-self-size-bytes",
          String(Math.floor((tokenEquivalent * BYTES_PER_TOKEN_EQUIVALENT) / 2)),
        ],
        {
          cwd: process.cwd(),
          encoding: "utf8",
          env: buildWorkerEnv(process.env),
          timeout: 180_000,
          killSignal: "SIGKILL",
        }
      );
      if (analyzer.status !== 0) {
        throw new Error(
          `snapshot analyzer ${tokenEquivalent} failed:\n${analyzer.stdout}\n${analyzer.stderr}`
        );
      }
      const retaining = JSON.parse(
        fs.readFileSync(path.join(caseDir, "retainers.redacted.json"), "utf8")
      );
      assertNoLargeBacking(retaining);
      const caseManifestFile = path.join(caseDir, "manifest.json");
      const caseManifest = JSON.parse(fs.readFileSync(caseManifestFile, "utf8"));
      caseManifest.heapSnapshot = retaining.snapshot;
      writePrivateJson(caseManifestFile, caseManifest);
      cases.push(caseManifest);
    });
  }

  const provenance = sourceProvenance();
  const workloadManifest = {
    ticket: "JON-562",
    status: "complete",
    testedCommit: provenance.testedCommit,
    provenance,
    harnessSha256: harnessHash(),
    baseBranch: "release/v3.8.51",
    inheritedBaseRed: "diegosouzapw/OmniRoute#12732",
    variedFactor: "serialized context bytes only",
    fixedConditions: {
      concurrency: 1,
      cancellation: "none",
      stream: true,
      iterations,
      messageCount: 1,
      toolCount: 0,
      provider: "local-fetch-stub",
      externalProviderCalls: 0,
    },
    tokenEquivalentCases: tokenCases,
    bytesPerTokenEquivalent: BYTES_PER_TOKEN_EQUIVALENT,
    byteBudgetEvidence:
      "Unit-level only: real-route responses in this checkpoint are small, so the 256-entry cap binds before the 16 MiB byte cap. The route matrix proves sliced backing detachment, not a 16 MiB runtime plateau.",
    cases,
  };
  writePrivateJson(path.join(outputDir, "workload-manifest.json"), workloadManifest);
  process.stdout.write(JSON.stringify({ outputDir, status: "complete" }) + "\n");
}

async function main(): Promise<void> {
  if (process.argv.includes("--worker")) return runWorker();
  if (process.argv.includes("--analyze-snapshot")) return runAnalyzer();
  return runDriver();
}

const invokedPath = process.argv[1] ? pathToFileURL(path.resolve(process.argv[1])).href : "";
if (invokedPath === import.meta.url) {
  main().catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    process.stderr.write(`[JON-562] ${message}\n`);
    process.exitCode = 1;
  });
}
