import { createHash } from "node:crypto";

import sharp from "sharp";

import { JPEG_FRAME_DATA_URI_PREFIX } from "./videoBridgeFrameContract";
import { resolveVideoFocusWindow, type VideoFocusWindow } from "./videoBridgeRuntime";

export interface VideoDrilldownFrameInput {
  dataUri: string;
  timestampSeconds: number;
}

export interface VideoDrilldownFrame extends VideoDrilldownFrameInput {
  height: number;
  width: number;
}

export interface VideoDrilldownDerivationInput {
  parentContentHash: string;
  policy: string;
  version: string;
}

export interface VideoDrilldownDerivationMetadata {
  contentHash: string;
  createdAt: number;
  format: "image/jpeg";
  parent: {
    contentHash: string;
    referenceHash: string;
  };
  policy: string;
  resolution: {
    height: number;
    width: number;
  };
  version: string;
}

export interface VideoDrilldownPutValue {
  derivation: VideoDrilldownDerivationInput;
  durationSeconds: number;
  frames: readonly VideoDrilldownFrameInput[];
}

export interface VideoDrilldownResult {
  derivation: VideoDrilldownDerivationMetadata;
  durationSeconds: number;
  focusWindow?: VideoFocusWindow;
  frames: VideoDrilldownFrame[];
}

export interface VideoDrilldownCacheOptions {
  maxEntries: number;
  /** Per-principal entry quota, enforced before the global LRU ceiling. */
  maxEntriesPerPrincipal?: number;
  /** Per-principal retained-JPEG-byte quota, independent from the global budget. */
  maxBytesPerPrincipal?: number;
  /** Aggregate retained-JPEG-byte budget; oldest entries are evicted (LRU) to fit. */
  maxTotalBytes?: number;
  now?: () => number;
  ttlMs: number;
  normalizeJpeg?: VideoDrilldownJpegNormalizer;
}

export type VideoDrilldownJpegNormalizer = (
  data: Buffer
) => Promise<{ data: Buffer; height: number; width: number }>;

export class VideoDrilldownValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VideoDrilldownValidationError";
  }
}

export class VideoDrilldownAbortedError extends Error {
  constructor() {
    super("Video Bridge drill-down was aborted");
    this.name = "VideoDrilldownAbortedError";
  }
}

interface StoredDrilldown {
  bytes: number;
  derivation: VideoDrilldownDerivationMetadata;
  durationSeconds: number;
  expiresAt: number;
  frames: StoredDrilldownFrame[];
  principalKey: string;
  sessionKey: string;
}

interface StoredDrilldownFrame {
  data: Buffer;
  height: number;
  timestampSeconds: number;
  width: number;
}

export const VIDEO_DRILLDOWN_MAX_FRAME_BYTES = 4 * 1024 * 1024;
export const VIDEO_DRILLDOWN_MAX_ENTRY_BYTES = 32 * 1024 * 1024;
const MAX_DURATION_SECONDS = 600;
const MAX_FRAME_DIMENSION = 8192;
export const VIDEO_DRILLDOWN_MAX_FRAME_DATA_URI_CHARS =
  JPEG_FRAME_DATA_URI_PREFIX.length + Math.ceil(VIDEO_DRILLDOWN_MAX_FRAME_BYTES / 3) * 4;

function validationFailure(message: string): never {
  throw new VideoDrilldownValidationError(message);
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw new VideoDrilldownAbortedError();
}

function yieldToEventLoop(): Promise<void> {
  return new Promise((resolve) => setImmediate(resolve));
}

function isAsciiAlphaNumeric(code: number): boolean {
  return (
    (code >= 0x30 && code <= 0x39) ||
    (code >= 0x41 && code <= 0x5a) ||
    (code >= 0x61 && code <= 0x7a)
  );
}

function isDerivationToken(value: string): boolean {
  if (value.length < 1 || value.length > 64 || !isAsciiAlphaNumeric(value.charCodeAt(0))) {
    return false;
  }
  for (let index = 1; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (
      !isAsciiAlphaNumeric(code) &&
      code !== 0x2e &&
      code !== 0x5f &&
      code !== 0x2f &&
      code !== 0x2d
    ) {
      return false;
    }
  }
  return true;
}

function isSha256Id(value: string): boolean {
  if (value.length !== 71 || !value.startsWith("sha256:")) return false;
  for (let index = 7; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (!((code >= 0x30 && code <= 0x39) || (code >= 0x61 && code <= 0x66))) return false;
  }
  return true;
}

function isCanonicalBase64Alphabet(value: string): boolean {
  if (value.length < 4 || value.length % 4 !== 0) return false;
  const padding = value.endsWith("==") ? 2 : value.endsWith("=") ? 1 : 0;
  const contentLength = value.length - padding;
  for (let index = 0; index < contentLength; index += 1) {
    const code = value.charCodeAt(index);
    if (!isAsciiAlphaNumeric(code) && code !== 0x2b && code !== 0x2f) return false;
  }
  for (let index = contentLength; index < value.length; index += 1) {
    if (value.charCodeAt(index) !== 0x3d) return false;
  }
  return true;
}

function digestKey(...parts: readonly string[]): string {
  const hash = createHash("sha256");
  for (const part of parts) {
    hash
      .update(String(Buffer.byteLength(part, "utf8")))
      .update(":")
      .update(part);
  }
  return hash.digest("hex");
}

function contentDigest(value: string | Buffer): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function updateHashPart(hash: ReturnType<typeof createHash>, value: string | Buffer): void {
  const bytes = typeof value === "string" ? Buffer.from(value, "utf8") : value;
  hash.update(String(bytes.byteLength)).update(":").update(bytes);
}

function validIdentity(principalId: string, sessionId: string, videoRef?: string): boolean {
  return (
    validPrincipal(principalId) &&
    validOpaqueId(sessionId, 128) &&
    (videoRef === undefined || validOpaqueId(videoRef, 4096))
  );
}

function validPrincipal(principalId: string): boolean {
  if (principalId.length < 1 || principalId.length > 256) return false;
  for (let index = 0; index < principalId.length; index += 1) {
    const code = principalId.charCodeAt(index);
    if (code < 0x21 || code > 0x7e) return false;
  }
  return true;
}

function validOpaqueId(value: string, maxLength: number): boolean {
  return value.length >= 1 && value.length <= maxLength && value === value.trim();
}

async function normalizeJpegWithSharp(
  data: Buffer
): Promise<{ data: Buffer; height: number; width: number }> {
  if (
    data.byteLength < 4 ||
    data[0] !== 0xff ||
    data[1] !== 0xd8 ||
    data[data.byteLength - 2] !== 0xff ||
    data[data.byteLength - 1] !== 0xd9
  ) {
    validationFailure("Invalid drill-down JPEG frame signature");
  }
  try {
    const image = sharp(data, {
      failOn: "warning",
      limitInputPixels: MAX_FRAME_DIMENSION * MAX_FRAME_DIMENSION,
      sequentialRead: true,
    });
    const metadata = await image.metadata();
    const height = metadata.height;
    const width = metadata.width;
    if (
      metadata.format !== "jpeg" ||
      !Number.isInteger(width) ||
      !Number.isInteger(height) ||
      !width ||
      !height ||
      width > MAX_FRAME_DIMENSION ||
      height > MAX_FRAME_DIMENSION
    ) {
      validationFailure("Invalid drill-down JPEG frame dimensions");
    }
    // A thumbnail decode can stop before the complete entropy scan. Re-encoding the
    // full image makes libvips surface scan warnings and strips any bytes trailing the
    // source JPEG. Only this canonical compressed output is retained and charged.
    const normalized = await image.clone().jpeg({ progressive: false }).toBuffer();
    if (
      normalized.byteLength < 4 ||
      normalized.byteLength > VIDEO_DRILLDOWN_MAX_FRAME_BYTES ||
      normalized[0] !== 0xff ||
      normalized[1] !== 0xd8 ||
      normalized[normalized.byteLength - 2] !== 0xff ||
      normalized[normalized.byteLength - 1] !== 0xd9
    ) {
      validationFailure("Invalid canonical drill-down JPEG frame");
    }
    return { data: normalized, height, width };
  } catch (error: unknown) {
    if (error instanceof VideoDrilldownValidationError) throw error;
    validationFailure("Invalid drill-down JPEG frame structure");
  }
}

async function decodeCanonicalJpeg(
  dataUri: string,
  normalizeJpeg: VideoDrilldownJpegNormalizer,
  signal?: AbortSignal
): Promise<{
  data: Buffer;
  resolution: { height: number; width: number };
}> {
  throwIfAborted(signal);
  if (!dataUri.startsWith(JPEG_FRAME_DATA_URI_PREFIX)) {
    validationFailure("Invalid drill-down JPEG frame");
  }
  const encoded = dataUri.slice(JPEG_FRAME_DATA_URI_PREFIX.length);
  if (dataUri.length > VIDEO_DRILLDOWN_MAX_FRAME_DATA_URI_CHARS) {
    validationFailure("Drill-down frame byte limit exceeded");
  }
  if (!isCanonicalBase64Alphabet(encoded)) {
    validationFailure("Drill-down JPEG must use canonical Base64");
  }
  const data = Buffer.from(encoded, "base64");
  if (data.toString("base64") !== encoded) {
    validationFailure("Drill-down JPEG must use canonical Base64");
  }
  if (data.byteLength < 1 || data.byteLength > VIDEO_DRILLDOWN_MAX_FRAME_BYTES) {
    validationFailure("Drill-down frame byte limit exceeded");
  }
  throwIfAborted(signal);
  const normalized = await normalizeJpeg(data);
  throwIfAborted(signal);
  if (
    !Buffer.isBuffer(normalized.data) ||
    normalized.data.byteLength < 1 ||
    normalized.data.byteLength > VIDEO_DRILLDOWN_MAX_FRAME_BYTES ||
    !Number.isInteger(normalized.width) ||
    !Number.isInteger(normalized.height) ||
    normalized.width < 1 ||
    normalized.height < 1 ||
    normalized.width > MAX_FRAME_DIMENSION ||
    normalized.height > MAX_FRAME_DIMENSION
  ) {
    validationFailure("Invalid canonical drill-down JPEG frame");
  }
  return {
    data: normalized.data,
    resolution: { height: normalized.height, width: normalized.width },
  };
}

async function validateFrames(
  value: VideoDrilldownPutValue,
  normalizeJpeg: VideoDrilldownJpegNormalizer,
  signal?: AbortSignal
): Promise<{
  frames: StoredDrilldownFrame[];
  resolution: { height: number; width: number };
  totalBytes: number;
}> {
  if (
    !Number.isFinite(value.durationSeconds) ||
    value.durationSeconds <= 0 ||
    value.durationSeconds > MAX_DURATION_SECONDS ||
    !Array.isArray(value.frames) ||
    value.frames.length < 1 ||
    value.frames.length > 16
  ) {
    validationFailure("Invalid drill-down duration or frame count");
  }
  let totalBytes = 0;
  let resolution: { height: number; width: number } | undefined;
  const frames: StoredDrilldownFrame[] = [];
  for (const frame of value.frames) {
    throwIfAborted(signal);
    if (
      !frame ||
      !Number.isFinite(frame.timestampSeconds) ||
      frame.timestampSeconds < 0 ||
      frame.timestampSeconds > value.durationSeconds ||
      typeof frame.dataUri !== "string"
    ) {
      validationFailure("Invalid drill-down JPEG frame");
    }
    const decoded = await decodeCanonicalJpeg(frame.dataUri, normalizeJpeg, signal);
    if (
      resolution &&
      (resolution.height !== decoded.resolution.height ||
        resolution.width !== decoded.resolution.width)
    ) {
      validationFailure("Drill-down frames must use one auditable resolution");
    }
    resolution ??= decoded.resolution;
    const bytes = decoded.data.byteLength;
    totalBytes += bytes;
    if (totalBytes > VIDEO_DRILLDOWN_MAX_ENTRY_BYTES) {
      validationFailure("Drill-down response byte limit exceeded");
    }
    frames.push({
      data: decoded.data,
      height: decoded.resolution.height,
      timestampSeconds: frame.timestampSeconds,
      width: decoded.resolution.width,
    });
  }
  const sortedFrames = frames.sort((left, right) => left.timestampSeconds - right.timestampSeconds);
  if (!resolution) validationFailure("Invalid drill-down frame resolution");
  return {
    frames: sortedFrames,
    resolution,
    totalBytes,
  };
}

async function buildDerivationMetadata(
  videoRef: string,
  value: VideoDrilldownPutValue,
  frames: readonly StoredDrilldownFrame[],
  resolution: { height: number; width: number },
  createdAt: number,
  signal?: AbortSignal
): Promise<VideoDrilldownDerivationMetadata> {
  const derivation = value.derivation;
  const parentContentHash = derivation?.parentContentHash;
  const policy = derivation?.policy;
  const version = derivation?.version;
  if (
    typeof parentContentHash !== "string" ||
    !isSha256Id(parentContentHash) ||
    typeof policy !== "string" ||
    !isDerivationToken(policy) ||
    typeof version !== "string" ||
    !isDerivationToken(version)
  ) {
    validationFailure("Invalid drill-down derivation metadata");
  }
  throwIfAborted(signal);
  const hash = createHash("sha256");
  for (const part of [
    "video-drilldown/v1",
    parentContentHash,
    policy,
    version,
    String(value.durationSeconds),
  ]) {
    updateHashPart(hash, part);
  }
  for (const frame of frames) {
    throwIfAborted(signal);
    updateHashPart(hash, String(frame.timestampSeconds));
    updateHashPart(hash, `${frame.width}x${frame.height}`);
    updateHashPart(hash, frame.data);
    await yieldToEventLoop();
  }
  throwIfAborted(signal);
  return {
    contentHash: `sha256:${hash.digest("hex")}`,
    createdAt,
    format: "image/jpeg",
    parent: {
      contentHash: parentContentHash,
      referenceHash: contentDigest(videoRef),
    },
    policy,
    resolution: { ...resolution },
    version,
  };
}

export class VideoDrilldownCache {
  private readonly entries = new Map<string, StoredDrilldown>();
  private readonly now: () => number;
  private readonly principalUsage = new Map<string, { bytes: number; entries: number }>();
  private readonly normalizeJpeg: VideoDrilldownJpegNormalizer;
  private totalBytes = 0;

  constructor(private readonly options: VideoDrilldownCacheOptions) {
    if (!Number.isFinite(options.ttlMs) || options.ttlMs <= 0) {
      throw new Error("Drill-down cache TTL must be positive");
    }
    if (!Number.isInteger(options.maxEntries) || options.maxEntries < 1) {
      throw new Error("Drill-down cache entry limit is invalid");
    }
    if (
      options.maxEntriesPerPrincipal !== undefined &&
      (!Number.isInteger(options.maxEntriesPerPrincipal) || options.maxEntriesPerPrincipal < 1)
    ) {
      throw new Error("Drill-down cache principal entry quota is invalid");
    }
    if (
      options.maxBytesPerPrincipal !== undefined &&
      (!Number.isInteger(options.maxBytesPerPrincipal) || options.maxBytesPerPrincipal < 1)
    ) {
      throw new Error("Drill-down cache principal byte quota is invalid");
    }
    if (
      options.maxTotalBytes !== undefined &&
      (!Number.isInteger(options.maxTotalBytes) || options.maxTotalBytes < 1)
    ) {
      throw new Error("Drill-down cache byte budget is invalid");
    }
    this.now = options.now ?? Date.now;
    this.normalizeJpeg = options.normalizeJpeg ?? normalizeJpegWithSharp;
  }

  private drop(key: string): void {
    const stored = this.entries.get(key);
    if (!stored) return;
    this.entries.delete(key);
    this.totalBytes -= stored.bytes;
    const usage = this.principalUsage.get(stored.principalKey);
    if (!usage) return;
    usage.bytes -= stored.bytes;
    usage.entries -= 1;
    if (usage.entries === 0) this.principalUsage.delete(stored.principalKey);
  }

  private addUsage(principalKey: string, bytes: number): void {
    const usage = this.principalUsage.get(principalKey) ?? { bytes: 0, entries: 0 };
    usage.bytes += bytes;
    usage.entries += 1;
    this.principalUsage.set(principalKey, usage);
  }

  private sweepExpired(): void {
    const now = this.now();
    for (const [key, stored] of this.entries) {
      if (stored.expiresAt <= now) this.drop(key);
    }
  }

  private principalExceedsQuota(principalKey: string): boolean {
    const usage = this.principalUsage.get(principalKey);
    return Boolean(
      usage &&
      ((this.options.maxEntriesPerPrincipal !== undefined &&
        usage.entries > this.options.maxEntriesPerPrincipal) ||
        (this.options.maxBytesPerPrincipal !== undefined &&
          usage.bytes > this.options.maxBytesPerPrincipal))
    );
  }

  private evictOldestForPrincipal(principalKey: string, protectedKey: string): void {
    for (const [key, stored] of this.entries) {
      if (stored.principalKey === principalKey && key !== protectedKey) {
        this.drop(key);
        return;
      }
    }
  }

  async put(
    principalId: string,
    sessionId: string,
    videoRef: string,
    value: VideoDrilldownPutValue,
    requestOptions: { signal?: AbortSignal } = {}
  ): Promise<void> {
    if (!validIdentity(principalId, sessionId, videoRef)) {
      validationFailure("Drill-down cache key is invalid");
    }
    this.sweepExpired();
    const signal = requestOptions.signal;
    const { frames, resolution, totalBytes } = await validateFrames(
      value,
      this.normalizeJpeg,
      signal
    );
    if (this.options.maxTotalBytes !== undefined && totalBytes > this.options.maxTotalBytes) {
      validationFailure("Drill-down entry exceeds the cache byte budget");
    }
    if (
      this.options.maxBytesPerPrincipal !== undefined &&
      totalBytes > this.options.maxBytesPerPrincipal
    ) {
      validationFailure("Drill-down entry exceeds the principal byte quota");
    }
    const principalKey = digestKey(principalId);
    const sessionKey = digestKey(principalId, sessionId);
    const key = digestKey(principalId, sessionId, videoRef);
    const createdAt = this.now();
    const derivation = await buildDerivationMetadata(
      videoRef,
      value,
      frames,
      resolution,
      createdAt,
      signal
    );
    throwIfAborted(signal);
    this.drop(key);
    this.entries.set(key, {
      bytes: totalBytes,
      derivation,
      durationSeconds: value.durationSeconds,
      expiresAt: createdAt + this.options.ttlMs,
      frames,
      principalKey,
      sessionKey,
    });
    this.totalBytes += totalBytes;
    this.addUsage(principalKey, totalBytes);
    while (this.principalExceedsQuota(principalKey)) {
      const previousSize = this.entries.size;
      this.evictOldestForPrincipal(principalKey, key);
      if (this.entries.size === previousSize) break;
    }
    while (
      this.entries.size > this.options.maxEntries ||
      (this.options.maxTotalBytes !== undefined && this.totalBytes > this.options.maxTotalBytes)
    ) {
      const oldest = this.entries.keys().next().value;
      if (!oldest || oldest === key) break;
      this.drop(oldest);
    }
  }

  get(
    principalId: string,
    sessionId: string,
    videoRef: string,
    options: { endSeconds?: number; frameCount?: number; startSeconds?: number } = {}
  ): VideoDrilldownResult | null {
    if (!validIdentity(principalId, sessionId, videoRef)) return null;
    this.sweepExpired();
    const key = digestKey(principalId, sessionId, videoRef);
    const stored = this.entries.get(key);
    if (!stored) return null;
    if (stored.expiresAt <= this.now()) {
      this.drop(key);
      return null;
    }
    this.entries.delete(key);
    this.entries.set(key, stored);
    const hasFocus = options.startSeconds !== undefined || options.endSeconds !== undefined;
    let focusWindow: VideoFocusWindow | null = null;
    try {
      focusWindow = hasFocus
        ? resolveVideoFocusWindow(stored.durationSeconds, {
            endSeconds: options.endSeconds,
            startSeconds: options.startSeconds,
          })
        : null;
    } catch {
      return null;
    }
    const frameCount =
      options.frameCount === undefined
        ? 16
        : Number.isInteger(options.frameCount) &&
            options.frameCount >= 1 &&
            options.frameCount <= 16
          ? options.frameCount
          : null;
    if (frameCount === null) return null;
    const frames = stored.frames
      .filter(
        (frame) =>
          !focusWindow ||
          (frame.timestampSeconds >= focusWindow.startSeconds &&
            frame.timestampSeconds <= focusWindow.endSeconds)
      )
      .slice(0, frameCount)
      .map((frame) => ({
        dataUri: `${JPEG_FRAME_DATA_URI_PREFIX}${frame.data.toString("base64")}`,
        height: frame.height,
        timestampSeconds: frame.timestampSeconds,
        width: frame.width,
      }));
    if (frames.length === 0) return null;
    return {
      derivation: {
        ...stored.derivation,
        parent: { ...stored.derivation.parent },
        resolution: { ...stored.derivation.resolution },
      },
      durationSeconds: stored.durationSeconds,
      ...(focusWindow ? { focusWindow } : {}),
      frames,
    };
  }

  clearSession(principalId: string, sessionId: string): number {
    if (!validIdentity(principalId, sessionId)) return 0;
    this.sweepExpired();
    const principalKey = digestKey(principalId);
    const sessionKey = digestKey(principalId, sessionId);
    let removed = 0;
    for (const [key, entry] of this.entries.entries()) {
      if (entry.principalKey === principalKey && entry.sessionKey === sessionKey) {
        this.drop(key);
        removed += 1;
      }
    }
    return removed;
  }

  getUsage(principalId: string): {
    bytes: number;
    entries: number;
    totalBytes: number;
    totalEntries: number;
  } {
    this.sweepExpired();
    const usage = validPrincipal(principalId)
      ? this.principalUsage.get(digestKey(principalId))
      : undefined;
    return {
      bytes: usage?.bytes ?? 0,
      entries: usage?.entries ?? 0,
      totalBytes: this.totalBytes,
      totalEntries: this.entries.size,
    };
  }

  clearAll(): void {
    this.entries.clear();
    this.principalUsage.clear();
    this.totalBytes = 0;
  }
}
