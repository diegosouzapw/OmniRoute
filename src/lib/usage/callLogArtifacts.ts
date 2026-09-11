import fs from "node:fs";
import path from "node:path";
import type { RequestPipelinePayloads } from "@omniroute/open-sse/utils/requestLogger.ts";
import { resolveDataDir } from "../dataPaths";
import { getCallLogPipelineMaxSizeBytes, isChatDebugFileEnabled } from "../logEnv";

const isCloud = typeof globalThis.caches === "object" && globalThis.caches !== null;
const isBuildPhase =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.OMNIROUTE_BUILDING === "1";
const DATA_DIR = resolveDataDir({ isCloud });

export const CALL_LOGS_DIR = isCloud ? null : path.join(DATA_DIR, "call_logs");
export const MAX_CALL_LOG_ARTIFACT_BYTES = 512 * 1024;

const SIZE_LIMIT_EXCEEDED_REASON = "call_log_artifact_size_limit_exceeded";
const OMITTED_FOR_SIZE_LIMIT = "[omitted: call log artifact size limit exceeded]";
const STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT =
  "[stream chunks omitted: call log artifact size limit exceeded]";

/**
 * True for a placeholder a size-limit fallback wrote in place of a real
 * payload. Consumers that fall back from one artifact field to another
 * (`maybeEnrichCompletedDetail`) must treat a marker as absent: it is a
 * non-empty string, so a bare truthiness check happily "recovers" it and
 * overwrites the real value it was meant to stand in for.
 */
export function isSizeLimitOmissionMarker(value: unknown): boolean {
  return value === OMITTED_FOR_SIZE_LIMIT || value === STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT;
}

// The error is the only field that says *why* a request failed, and it is
// typically ~90 bytes next to the multi-hundred-KB bodies that trip the cap.
// Dropping it made a size-limited row undiagnosable: a provider outage, a local
// timeout and an upstream 400 all rendered as the same omission marker. It is
// kept at every fallback stage instead, truncated rather than discarded.
const MAX_PRESERVED_ERROR_BYTES = 4 * 1024;
const ERROR_TRUNCATED_FOR_SIZE_LIMIT = "[truncated: call log artifact size limit exceeded]";

function truncateUtf8(text: string, maxBytes: number): string {
  const buffer = Buffer.from(text, "utf8");
  if (buffer.length <= maxBytes) return text;
  // Cut back off a partial multi-byte sequence so the tail is not a U+FFFD.
  let end = maxBytes;
  while (end > 0 && (buffer[end] & 0xc0) === 0x80) end--;
  return buffer.subarray(0, end).toString("utf8");
}

/**
 * Keep the error through a size-limit fallback, truncating it if it is itself
 * large. Returns the value unchanged when it already fits, so a normal-sized
 * error is byte-identical to what a non-truncated artifact would carry.
 */
function preserveErrorForSizeLimit(error: unknown): unknown {
  if (error === null || error === undefined) return null;
  let serialized: string;
  try {
    serialized = typeof error === "string" ? error : JSON.stringify(error) ?? String(error);
  } catch {
    // A circular or unserializable error must not take the whole artifact down.
    serialized = String(error);
  }
  if (Buffer.byteLength(serialized, "utf8") <= MAX_PRESERVED_ERROR_BYTES) return error;
  return `${truncateUtf8(serialized, MAX_PRESERVED_ERROR_BYTES)} ${ERROR_TRUNCATED_FOR_SIZE_LIMIT}`;
}

export type CallLogDetailState = "none" | "ready" | "missing" | "corrupt" | "legacy-inline";

export type CallLogArtifact = {
  schemaVersion: 5;
  summary: {
    id: string;
    timestamp: string;
    method: string;
    path: string;
    status: number;
    model: string;
    requestedModel: string | null;
    provider: string;
    account: string;
    connectionId: string | null;
    duration: number;
    tokens: {
      in: number;
      out: number;
      cacheRead: number | null;
      cacheWrite: number | null;
      reasoning: number | null;
      compressed: number | null;
    };
    requestType: string | null;
    sourceFormat: string | null;
    targetFormat: string | null;
    apiKeyId: string | null;
    apiKeyName: string | null;
    comboName: string | null;
    comboStepId: string | null;
    comboExecutionKey: string | null;
  };
  requestBody: unknown;
  responseBody: unknown;
  error: unknown;
  pipeline?: RequestPipelinePayloads;
};

export type CallLogArtifactWriteResult = {
  relPath: string;
  sizeBytes: number;
  sha256: string;
};

export type PurgeCallLogArtifactDirectoryResult = {
  deletedArtifacts: number;
  errors: number;
};

export function buildArtifactRelativePath(timestamp: string, id: string) {
  const parsed = new Date(timestamp);
  const safeTimestamp = (
    Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
  ).replace(/[:]/g, "-");
  const dateFolder = safeTimestamp.slice(0, 10);
  return path.posix.join(dateFolder, `${safeTimestamp}_${id}.json`);
}

function computeArtifactChecksum(serialized: string): string {
  const bytes = Buffer.from(serialized);
  let hash = 0x811c9dc5;
  for (const byte of bytes) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

function truncateArtifactForStorage(artifact: CallLogArtifact): CallLogArtifact {
  const pipeline = artifact.pipeline;
  if (!pipeline?.streamChunks) return artifact;

  return {
    ...artifact,
    pipeline: {
      ...pipeline,
      streamChunks: {
        provider: pipeline.streamChunks.provider?.length
          ? [STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT]
          : undefined,
        openai: pipeline.streamChunks.openai?.length
          ? [STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT]
          : undefined,
        client: pipeline.streamChunks.client?.length
          ? [STREAM_CHUNKS_OMITTED_FOR_SIZE_LIMIT]
          : undefined,
      },
    },
  };
}

function omitOversizedPipeline(artifact: CallLogArtifact): CallLogArtifact {
  if (!artifact.pipeline) return artifact;

  return {
    ...artifact,
    pipeline: {
      error: {
        _omniroute_truncated: true,
        reason: SIZE_LIMIT_EXCEEDED_REASON,
      },
    },
  };
}

function getArtifactMaxBytes(artifact: CallLogArtifact): number {
  return artifact.pipeline ? getCallLogPipelineMaxSizeBytes() : MAX_CALL_LOG_ARTIFACT_BYTES;
}

function buildMinimalArtifactForSizeLimit(artifact: CallLogArtifact) {
  return {
    schemaVersion: artifact.schemaVersion,
    summary: artifact.summary,
    requestBody: OMITTED_FOR_SIZE_LIMIT,
    responseBody: OMITTED_FOR_SIZE_LIMIT,
    // Never drop the error: it is the only field that says WHY the request
    // failed (e.g. "Fetch timeout after 110000ms on https://..."). Diagnosing
    // provider outages from a log row that shows only an omission marker is
    // impossible; the error string is tiny next to the request/response bodies.
    error: preserveErrorForSizeLimit(artifact.error),
    pipeline: {
      error: {
        _omniroute_truncated: true,
        reason: SIZE_LIMIT_EXCEEDED_REASON,
      },
    },
  };
}

/**
 * Fallback ladder for an artifact that does not fit its byte budget, ordered
 * from "keeps the most" to "keeps the least": the first stage that fits wins.
 *
 * Ordering rule: drop the payload that most plausibly tripped the cap, and
 * drop a payload that is *duplicated elsewhere in the artifact* before one
 * that is unique. `pipeline` carries both sides of the exchange already
 * translated (`clientRawRequest`/`providerRequest`/`providerResponse`/
 * `clientResponse`), so evicting it to keep `requestBody` traded the whole
 * upstream exchange -- including the only record of what the provider
 * actually answered -- for a raw client prompt the pipeline already holds a
 * translated copy of. Bodies go first now, and `pipeline` survives one stage
 * longer; the previous order is still reached when dropping the bodies alone
 * is not enough.
 *
 * Two consumers depend on that ordering, not just human diagnosis:
 * `resolvePreviousResponseState` (db/responsesContinuationStore.ts) rebuilds
 * `previous_response_id` history from `pipeline.clientRawRequest` /
 * `pipeline.clientResponse` and returns null -- forcing the client to resend
 * full history -- for any artifact whose pipeline was omitted; and
 * `maybeEnrichCompletedDetail` (usage/completedRequestDetails.ts) reads
 * `pipeline.providerResponse` in preference to `responseBody`.
 */
function buildSizeLimitStages(artifact: CallLogArtifact): Array<() => unknown> {
  const omitBodies = <T extends object>(value: T) => ({
    ...value,
    requestBody: OMITTED_FOR_SIZE_LIMIT,
    responseBody: OMITTED_FOR_SIZE_LIMIT,
    error: preserveErrorForSizeLimit(artifact.error),
  });

  return [
    () => truncateArtifactForStorage(artifact),
    // Bodies alone: worth a stage only when there is a pipeline to keep in
    // exchange. Without one it produces the same bytes as the stage two lines
    // below, so it is left out rather than costing a redundant stringify.
    ...(artifact.pipeline ? [() => omitBodies(artifact)] : []),
    () => omitOversizedPipeline(artifact),
    () => omitBodies(omitOversizedPipeline(artifact)),
    // The summary alone exceeded the cap (pathological). Keep the error so the
    // row stays diagnosable, drop everything else including the summary body.
    () => buildMinimalArtifactForSizeLimit(artifact),
  ];
}

function serializeArtifactForStorage(artifact: CallLogArtifact): string {
  // Debug mode: write full untruncated payload
  if (isChatDebugFileEnabled()) {
    return JSON.stringify(artifact, null, 2);
  }

  const maxBytes = getArtifactMaxBytes(artifact);
  // Single-pass, non-pretty serialization on the hot path. Artifacts are machine-read via
  // JSON.parse (readCallArtifact), so pretty-printing only doubled the bytes and CPU of
  // serializing large request/response bodies on every request — a contributor to the
  // CPU-runaway. The debug path above keeps pretty output for human inspection.
  const serialized = JSON.stringify(artifact);
  if (Buffer.byteLength(serialized) <= maxBytes) {
    return serialized;
  }

  for (const buildStage of buildSizeLimitStages(artifact)) {
    const candidate = JSON.stringify(buildStage());
    if (Buffer.byteLength(candidate) <= maxBytes) {
      return candidate;
    }
  }

  // Last resort: not even the summary fit. The error still rides along --
  // without it this row says only "something was too big", which is the state
  // the size-limit fallbacks exist to remove.
  return JSON.stringify({
    schemaVersion: artifact.schemaVersion,
    _omniroute_truncated: true,
    reason: SIZE_LIMIT_EXCEEDED_REASON,
    error: preserveErrorForSizeLimit(artifact.error),
  });
}

export function writeCallArtifact(
  artifact: CallLogArtifact,
  relativePath = buildArtifactRelativePath(artifact.summary.timestamp, artifact.summary.id)
): CallLogArtifactWriteResult | null {
  if (!CALL_LOGS_DIR || isBuildPhase) return null;

  const absPath = path.join(CALL_LOGS_DIR, relativePath);
  const tmpPath = `${absPath}.${process.pid}.${Date.now()}.tmp`;

  try {
    const serialized = serializeArtifactForStorage(artifact);
    const sizeBytes = Buffer.byteLength(serialized);
    // Keep the legacy field name for storage compatibility, but use a non-cryptographic checksum
    // so artifact bookkeeping is not treated as password hashing by static analysis.
    const fileChecksum = computeArtifactChecksum(serialized);

    fs.mkdirSync(path.dirname(absPath), { recursive: true });
    fs.writeFileSync(tmpPath, serialized);
    fs.renameSync(tmpPath, absPath);

    return {
      relPath: relativePath,
      sizeBytes,
      sha256: fileChecksum,
    };
  } catch (error) {
    try {
      fs.rmSync(tmpPath, { force: true });
    } catch {
      // Best effort cleanup only.
    }
    console.error("[callLogs] Failed to write request artifact:", (error as Error).message);
    return null;
  }
}

export function readCallArtifact(relativePath: string | null): {
  artifact: CallLogArtifact | null;
  state: "ready" | "missing" | "corrupt";
} {
  if (!CALL_LOGS_DIR || !relativePath) {
    return { artifact: null, state: "missing" };
  }

  try {
    const absPath = path.join(CALL_LOGS_DIR, relativePath);
    if (!fs.existsSync(absPath)) {
      return { artifact: null, state: "missing" };
    }
    return {
      artifact: JSON.parse(fs.readFileSync(absPath, "utf8")) as CallLogArtifact,
      state: "ready",
    };
  } catch (error) {
    console.error("[callLogs] Failed to read request artifact:", (error as Error).message);
    return { artifact: null, state: "corrupt" };
  }
}

export function deleteCallArtifact(relativePath: string | null, baseDir = CALL_LOGS_DIR): boolean {
  if (!baseDir || !relativePath) return false;

  try {
    const resolvedBaseDir = path.resolve(baseDir);
    const absPath = path.join(resolvedBaseDir, relativePath);
    if (!fs.existsSync(absPath)) return false;
    fs.rmSync(absPath, { force: true });
    const parentDir = path.dirname(absPath);
    if (parentDir !== resolvedBaseDir) {
      try {
        fs.rmdirSync(parentDir);
      } catch {
        // Directory is non-empty or already gone.
      }
    }
    return true;
  } catch {
    return false;
  }
}

export function cleanupEmptyCallLogDirs(baseDir = CALL_LOGS_DIR) {
  if (!baseDir || !fs.existsSync(baseDir)) return;

  try {
    for (const entry of fs.readdirSync(baseDir)) {
      const entryPath = path.join(baseDir, entry);
      const stat = fs.statSync(entryPath);
      if (!stat.isDirectory()) continue;
      if (fs.readdirSync(entryPath).length === 0) {
        fs.rmSync(entryPath, { recursive: true, force: true });
      }
    }
  } catch {
    // Best effort only.
  }
}

export function listCallLogArtifactFiles(baseDir = CALL_LOGS_DIR) {
  if (!baseDir || !fs.existsSync(baseDir)) return [];

  return fs
    .readdirSync(baseDir)
    .flatMap((entry) => {
      const entryPath = path.join(baseDir, entry);
      try {
        const stat = fs.statSync(entryPath);
        if (!stat.isDirectory()) return [];

        return fs
          .readdirSync(entryPath)
          .filter((file) => file.endsWith(".json"))
          .map((file) => {
            const absPath = path.join(entryPath, file);
            const fileStat = fs.statSync(absPath);
            return {
              relativePath: path.posix.join(entry, file),
              absPath,
              mtimeMs: fileStat.mtimeMs,
            };
          });
      } catch {
        return [];
      }
    })
    .sort((a, b) => b.mtimeMs - a.mtimeMs);
}

export function purgeCallLogArtifactDirectory(
  baseDir = CALL_LOGS_DIR
): PurgeCallLogArtifactDirectoryResult {
  const result = { deletedArtifacts: 0, errors: 0 };
  if (!baseDir || !fs.existsSync(baseDir)) return result;

  try {
    result.deletedArtifacts = listCallLogArtifactFiles(baseDir).length;
  } catch {
    result.deletedArtifacts = 0;
  }

  try {
    fs.rmSync(baseDir, { recursive: true, force: true });
  } catch (error) {
    console.error("[callLogArtifacts] Failed to purge call log artifacts:", error);
    result.deletedArtifacts = 0;
    result.errors++;
  }

  return result;
}
