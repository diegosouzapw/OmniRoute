import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const DEFAULT_ALLOWED_EXTENSIONS = new Set([
  ".cfg",
  ".csv",
  ".geojson",
  ".htm",
  ".html",
  ".ini",
  ".js",
  ".json",
  ".jsonl",
  ".jsx",
  ".log",
  ".md",
  ".mjs",
  ".ps1",
  ".py",
  ".sh",
  ".sql",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

const DENIED_PATH_SEGMENTS = new Set([
  ".build",
  ".codex",
  ".env",
  ".git",
  ".next",
  ".omniroute",
  ".ssh",
  "coverage",
  "dist",
  "node_modules",
  "secrets",
]);

const DEFAULT_MAX_FILES = 5_000;
const DEFAULT_MAX_FILE_BYTES = 1_048_576;
const DEFAULT_MAX_TOTAL_BYTES = 67_108_864;
const DEFAULT_MAX_READ_LINES = 400;
const DEFAULT_CHUNK_CHARS = 4_000;
const DEFAULT_STALE_MS = 30_000;
const MAX_SEARCH_RESULTS = 20;
const MAX_SNIPPET_CHARS = 1_200;

export interface LocalCorpusLimits {
  maxFiles?: number;
  maxFileBytes?: number;
  maxTotalBytes?: number;
  maxReadLines?: number;
  chunkChars?: number;
  staleMs?: number;
  allowedExtensions?: ReadonlySet<string>;
}

interface ResolvedLimits {
  maxFiles: number;
  maxFileBytes: number;
  maxTotalBytes: number;
  maxReadLines: number;
  chunkChars: number;
  staleMs: number;
  allowedExtensions: ReadonlySet<string>;
}

interface CorpusChunk {
  content: string;
  normalizedContent: string;
  startLine: number;
  endLine: number;
}

interface IndexedCorpusFile {
  relativePath: string;
  bytes: number;
  mtimeMs: number;
  sha256: string;
  chunks: CorpusChunk[];
}

interface CorpusCandidate {
  absolutePath: string;
  relativePath: string;
  bytes: number;
  mtimeMs: number;
}

export interface LocalCorpusRefreshResult {
  configured: true;
  source: string;
  indexedFiles: number;
  indexedBytes: number;
  chunks: number;
  changedFiles: number;
  unchangedFiles: number;
  deletedFiles: number;
  skippedFiles: number;
  readErrors: number;
  truncated: boolean;
  lastIndexedAt: string;
}

export interface LocalCorpusStatus {
  configured: boolean;
  source: string | null;
  indexedFiles: number;
  indexedBytes: number;
  chunks: number;
  truncated: boolean;
  lastIndexedAt: string | null;
  limits: {
    maxFiles: number;
    maxFileBytes: number;
    maxTotalBytes: number;
    maxReadLines: number;
  };
}

export interface LocalCorpusSearchResult {
  relativePath: string;
  startLine: number;
  endLine: number;
  score: number;
  snippet: string;
}

export interface LocalCorpusReadResult {
  relativePath: string;
  content: string;
  startLine: number;
  endLine: number;
  totalLines: number;
  truncated: boolean;
}

function positiveInteger(value: number | undefined, fallback: number): number {
  return Number.isInteger(value) && Number(value) > 0 ? Number(value) : fallback;
}

function resolveLimits(input: LocalCorpusLimits): ResolvedLimits {
  return {
    maxFiles: positiveInteger(input.maxFiles, DEFAULT_MAX_FILES),
    maxFileBytes: positiveInteger(input.maxFileBytes, DEFAULT_MAX_FILE_BYTES),
    maxTotalBytes: positiveInteger(input.maxTotalBytes, DEFAULT_MAX_TOTAL_BYTES),
    maxReadLines: positiveInteger(input.maxReadLines, DEFAULT_MAX_READ_LINES),
    chunkChars: positiveInteger(input.chunkChars, DEFAULT_CHUNK_CHARS),
    staleMs: positiveInteger(input.staleMs, DEFAULT_STALE_MS),
    allowedExtensions: input.allowedExtensions ?? DEFAULT_ALLOWED_EXTENSIONS,
  };
}

function normalizeRelativePath(relativePath: string): string {
  return relativePath.split(path.sep).join("/");
}

function hasDeniedSegment(relativePath: string): boolean {
  return relativePath
    .split(/[\\/]+/)
    .filter(Boolean)
    .some((segment) => DENIED_PATH_SEGMENTS.has(segment.toLowerCase()));
}

function isContained(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function isAllowedExtension(filePath: string, allowedExtensions: ReadonlySet<string>): boolean {
  return allowedExtensions.has(path.extname(filePath).toLowerCase());
}

function buildChunks(content: string, maxChars: number): CorpusChunk[] {
  const lines = content.split(/\r?\n/);
  const chunks: CorpusChunk[] = [];
  let current: string[] = [];
  let currentChars = 0;
  let startLine = 1;

  const flush = (endLine: number) => {
    if (current.length === 0) return;
    const chunkContent = current.join("\n");
    chunks.push({
      content: chunkContent,
      normalizedContent: chunkContent.toLowerCase(),
      startLine,
      endLine,
    });
    current = [];
    currentChars = 0;
  };

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    const lineNumber = index + 1;

    if (line.length > maxChars) {
      flush(lineNumber - 1);
      for (let offset = 0; offset < line.length; offset += maxChars) {
        const part = line.slice(offset, offset + maxChars);
        chunks.push({
          content: part,
          normalizedContent: part.toLowerCase(),
          startLine: lineNumber,
          endLine: lineNumber,
        });
      }
      startLine = lineNumber + 1;
      continue;
    }

    const nextChars = currentChars + line.length + (current.length > 0 ? 1 : 0);
    if (current.length > 0 && nextChars > maxChars) {
      flush(lineNumber - 1);
      startLine = lineNumber;
    }
    current.push(line);
    currentChars += line.length + (current.length > 1 ? 1 : 0);
  }

  flush(lines.length);
  return chunks;
}

function scoreChunk(chunk: CorpusChunk, query: string, tokens: string[]): number {
  let score = 0;
  const exactIndex = chunk.normalizedContent.indexOf(query);
  if (exactIndex >= 0) score += 100;

  for (const token of tokens) {
    let tokenMatches = 0;
    let cursor = 0;
    while (tokenMatches < 10) {
      const index = chunk.normalizedContent.indexOf(token, cursor);
      if (index < 0) break;
      tokenMatches++;
      cursor = index + token.length;
    }
    if (tokenMatches === 0) return 0;
    score += tokenMatches;
  }

  return score;
}

function createSnippet(content: string, query: string, tokens: string[]): string {
  const normalized = content.toLowerCase();
  let matchIndex = normalized.indexOf(query);
  if (matchIndex < 0) matchIndex = normalized.indexOf(tokens[0]);
  if (matchIndex < 0) matchIndex = 0;

  const half = Math.floor(MAX_SNIPPET_CHARS / 2);
  const start = Math.max(0, matchIndex - half);
  const end = Math.min(content.length, start + MAX_SNIPPET_CHARS);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < content.length ? "…" : "";
  return `${prefix}${content.slice(start, end).trim()}${suffix}`;
}

export async function canonicalizeLocalCorpusRoot(inputPath: string): Promise<string> {
  if (!path.isAbsolute(inputPath)) {
    throw new Error("Local corpus root must be an absolute directory path");
  }

  let canonical: string;
  let stat;
  try {
    canonical = await fs.realpath(path.resolve(inputPath));
    stat = await fs.stat(canonical);
  } catch {
    throw new Error("Local corpus root is not accessible");
  }
  if (!stat.isDirectory()) {
    throw new Error("Local corpus root must point to a directory");
  }
  return canonical;
}

export class LocalCorpusIndex {
  private readonly configuredRoot: string;
  private readonly limits: ResolvedLimits;
  private canonicalRoot: string | null = null;
  private files = new Map<string, IndexedCorpusFile>();
  private lastIndexedAt: number | null = null;
  private truncated = false;
  private refreshPromise: Promise<LocalCorpusRefreshResult> | null = null;

  constructor(rootPath: string, limits: LocalCorpusLimits = {}) {
    this.configuredRoot = rootPath;
    this.limits = resolveLimits(limits);
  }

  private async getRoot(): Promise<string> {
    const canonical = await canonicalizeLocalCorpusRoot(this.configuredRoot);
    if (this.canonicalRoot && this.canonicalRoot !== canonical) {
      this.files.clear();
      this.lastIndexedAt = null;
    }
    this.canonicalRoot = canonical;
    return canonical;
  }

  private async collectCandidates(root: string): Promise<{
    candidates: CorpusCandidate[];
    skippedFiles: number;
    truncated: boolean;
  }> {
    const candidates: CorpusCandidate[] = [];
    const directories = [root];
    let indexedBytes = 0;
    let skippedFiles = 0;
    let truncated = false;

    while (directories.length > 0) {
      const directory = directories.pop();
      if (!directory) break;

      let entries;
      try {
        entries = await fs.readdir(directory, { withFileTypes: true });
      } catch {
        skippedFiles++;
        continue;
      }
      entries.sort((left, right) => left.name.localeCompare(right.name));

      for (const entry of entries) {
        if (entry.isSymbolicLink()) {
          skippedFiles++;
          continue;
        }

        const absolutePath = path.join(directory, entry.name);
        const relativePath = path.relative(root, absolutePath);
        if (!relativePath || hasDeniedSegment(relativePath)) {
          skippedFiles++;
          continue;
        }

        if (entry.isDirectory()) {
          directories.push(absolutePath);
          continue;
        }
        if (!entry.isFile() || !isAllowedExtension(entry.name, this.limits.allowedExtensions)) {
          skippedFiles++;
          continue;
        }

        if (candidates.length >= this.limits.maxFiles) {
          truncated = true;
          skippedFiles++;
          continue;
        }

        let stat;
        try {
          stat = await fs.stat(absolutePath);
        } catch {
          skippedFiles++;
          continue;
        }
        if (stat.size > this.limits.maxFileBytes) {
          skippedFiles++;
          continue;
        }
        if (indexedBytes + stat.size > this.limits.maxTotalBytes) {
          truncated = true;
          skippedFiles++;
          continue;
        }

        indexedBytes += stat.size;
        candidates.push({
          absolutePath,
          relativePath: normalizeRelativePath(relativePath),
          bytes: stat.size,
          mtimeMs: stat.mtimeMs,
        });
      }
    }

    candidates.sort((left, right) => left.relativePath.localeCompare(right.relativePath));
    return { candidates, skippedFiles, truncated };
  }

  private async performRefresh(): Promise<LocalCorpusRefreshResult> {
    const root = await this.getRoot();
    const { candidates, skippedFiles, truncated } = await this.collectCandidates(root);
    const nextFiles = new Map<string, IndexedCorpusFile>();
    let changedFiles = 0;
    let unchangedFiles = 0;
    let readErrors = 0;

    for (const candidate of candidates) {
      const existing = this.files.get(candidate.relativePath);
      if (
        existing &&
        existing.bytes === candidate.bytes &&
        existing.mtimeMs === candidate.mtimeMs
      ) {
        nextFiles.set(candidate.relativePath, existing);
        unchangedFiles++;
        continue;
      }

      try {
        const content = await fs.readFile(candidate.absolutePath, "utf8");
        if (content.includes("\0")) {
          readErrors++;
          continue;
        }
        nextFiles.set(candidate.relativePath, {
          relativePath: candidate.relativePath,
          bytes: candidate.bytes,
          mtimeMs: candidate.mtimeMs,
          sha256: createHash("sha256").update(content).digest("hex"),
          chunks: buildChunks(content, this.limits.chunkChars),
        });
        changedFiles++;
      } catch {
        readErrors++;
      }
    }

    const deletedFiles = Array.from(this.files.keys()).filter((key) => !nextFiles.has(key)).length;
    this.files = nextFiles;
    this.lastIndexedAt = Date.now();
    this.truncated = truncated;

    const status = this.getStatus();
    return {
      configured: true,
      source: status.source ?? path.basename(root),
      indexedFiles: status.indexedFiles,
      indexedBytes: status.indexedBytes,
      chunks: status.chunks,
      changedFiles,
      unchangedFiles,
      deletedFiles,
      skippedFiles,
      readErrors,
      truncated,
      lastIndexedAt: status.lastIndexedAt ?? new Date(this.lastIndexedAt).toISOString(),
    };
  }

  async refresh(): Promise<LocalCorpusRefreshResult> {
    if (!this.refreshPromise) {
      this.refreshPromise = this.performRefresh().finally(() => {
        this.refreshPromise = null;
      });
    }
    return this.refreshPromise;
  }

  getStatus(): LocalCorpusStatus {
    const indexedFiles = this.files.size;
    const indexedBytes = Array.from(this.files.values()).reduce(
      (total, file) => total + file.bytes,
      0
    );
    const chunks = Array.from(this.files.values()).reduce(
      (total, file) => total + file.chunks.length,
      0
    );

    return {
      configured: true,
      source: this.canonicalRoot ? path.basename(this.canonicalRoot) : null,
      indexedFiles,
      indexedBytes,
      chunks,
      truncated: this.truncated,
      lastIndexedAt:
        this.lastIndexedAt === null ? null : new Date(this.lastIndexedAt).toISOString(),
      limits: {
        maxFiles: this.limits.maxFiles,
        maxFileBytes: this.limits.maxFileBytes,
        maxTotalBytes: this.limits.maxTotalBytes,
        maxReadLines: this.limits.maxReadLines,
      },
    };
  }

  async search(
    query: string,
    options: { limit?: number; refresh?: boolean } = {}
  ): Promise<{ query: string; results: LocalCorpusSearchResult[]; status: LocalCorpusStatus }> {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) throw new Error("Local corpus search query is required");

    const stale =
      this.lastIndexedAt === null || Date.now() - this.lastIndexedAt >= this.limits.staleMs;
    if (options.refresh === true || stale) await this.refresh();

    const tokens = Array.from(new Set(normalizedQuery.split(/\s+/).filter(Boolean)));
    const limit = Math.min(positiveInteger(options.limit, 10), MAX_SEARCH_RESULTS);
    const results: LocalCorpusSearchResult[] = [];

    for (const file of this.files.values()) {
      for (const chunk of file.chunks) {
        const score = scoreChunk(chunk, normalizedQuery, tokens);
        if (score === 0) continue;
        results.push({
          relativePath: file.relativePath,
          startLine: chunk.startLine,
          endLine: chunk.endLine,
          score,
          snippet: createSnippet(chunk.content, normalizedQuery, tokens),
        });
      }
    }

    results.sort(
      (left, right) =>
        right.score - left.score ||
        left.relativePath.localeCompare(right.relativePath) ||
        left.startLine - right.startLine
    );

    return { query: query.trim(), results: results.slice(0, limit), status: this.getStatus() };
  }

  async read(
    inputPath: string,
    options: { startLine?: number; endLine?: number } = {}
  ): Promise<LocalCorpusReadResult> {
    if (!inputPath || path.isAbsolute(inputPath) || hasDeniedSegment(inputPath)) {
      throw new Error("Local corpus file path must be a permitted relative path");
    }
    if (!isAllowedExtension(inputPath, this.limits.allowedExtensions)) {
      throw new Error("Local corpus file type is not permitted");
    }

    const root = await this.getRoot();
    const resolved = path.resolve(root, inputPath);
    if (!isContained(root, resolved)) {
      throw new Error("Local corpus file path escapes the configured root");
    }

    let linkStat;
    try {
      linkStat = await fs.lstat(resolved);
    } catch {
      throw new Error("Local corpus file is not accessible");
    }
    if (linkStat.isSymbolicLink() || !linkStat.isFile()) {
      throw new Error("Local corpus path must point to a regular file");
    }
    if (linkStat.size > this.limits.maxFileBytes) {
      throw new Error("Local corpus file exceeds the configured read limit");
    }

    let canonicalFile: string;
    try {
      canonicalFile = await fs.realpath(resolved);
    } catch {
      throw new Error("Local corpus file is not accessible");
    }
    if (!isContained(root, canonicalFile)) {
      throw new Error("Local corpus file path escapes the configured root");
    }

    let content: string;
    try {
      content = await fs.readFile(canonicalFile, "utf8");
    } catch {
      throw new Error("Local corpus file is not accessible");
    }
    if (content.includes("\0")) throw new Error("Local corpus file is not valid text");

    const lines = content.split(/\r?\n/);
    const requestedStart = positiveInteger(options.startLine, 1);
    const requestedEnd = positiveInteger(
      options.endLine,
      requestedStart + this.limits.maxReadLines - 1
    );
    if (requestedEnd < requestedStart) {
      throw new Error("Local corpus endLine must be greater than or equal to startLine");
    }

    const startLine = Math.min(requestedStart, Math.max(lines.length, 1));
    const endLine = Math.min(lines.length, requestedEnd, startLine + this.limits.maxReadLines - 1);
    return {
      relativePath: normalizeRelativePath(path.relative(root, canonicalFile)),
      content: lines.slice(startLine - 1, endLine).join("\n"),
      startLine,
      endLine,
      totalLines: lines.length,
      truncated: startLine > 1 || endLine < lines.length,
    };
  }
}

export function getDefaultLocalCorpusStatus(): LocalCorpusStatus {
  const limits = resolveLimits({});
  return {
    configured: false,
    source: null,
    indexedFiles: 0,
    indexedBytes: 0,
    chunks: 0,
    truncated: false,
    lastIndexedAt: null,
    limits: {
      maxFiles: limits.maxFiles,
      maxFileBytes: limits.maxFileBytes,
      maxTotalBytes: limits.maxTotalBytes,
      maxReadLines: limits.maxReadLines,
    },
  };
}
