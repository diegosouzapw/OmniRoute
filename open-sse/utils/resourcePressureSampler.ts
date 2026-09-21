import fs from "node:fs/promises";
import path from "node:path";
import v8 from "node:v8";
import type { ResourceSignals } from "./resourcePressurePolicy.ts";

const DEFAULT_CGROUP_ROOT = "/sys/fs/cgroup";

export type ResourcePressureFs = {
  readText: (filePath: string) => Promise<string | null>;
};

export type SampleResourceSignalsDeps = {
  nowMs?: () => number;
  memoryUsage?: () => NodeJS.MemoryUsage;
  heapStatistics?: () => { heap_size_limit: number; used_heap_size?: number };
  availableMemory?: () => number | undefined;
  constrainedMemory?: () => number | undefined;
  fs?: ResourcePressureFs;
};

type Cgroup2Mount = { root: string; mountpoint: string };

async function defaultReadText(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
}

export function sanitizeMemoryBytes(value: unknown): number | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "max" || !/^\d+$/.test(trimmed) || trimmed.length > 15) {
      return null;
    }
    value = Number(trimmed);
  }
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) return null;
  if (value >= Number.MAX_SAFE_INTEGER) return null;
  return Math.floor(value);
}

function safeNumber(call: (() => number | undefined) | undefined): number | null {
  try {
    return call ? sanitizeMemoryBytes(call()) : null;
  } catch {
    return null;
  }
}

export function decodeMountInfoPath(value: string): string | null {
  if (value.includes("\0")) return null;
  try {
    return value.replace(/\\([0-7]{3})/g, (_match, octal: string) =>
      String.fromCharCode(Number.parseInt(octal, 8))
    );
  } catch {
    return null;
  }
}

export function parseCgroupV2Path(contents: string | null): string | null {
  if (!contents) return null;
  for (const rawLine of contents.split("\n")) {
    const line = rawLine.trim();
    if (!line.startsWith("0::")) continue;
    const relativePath = line.slice(3);
    if (!relativePath.startsWith("/") || relativePath.includes("\0")) return null;
    return relativePath;
  }
  return null;
}

export function parseCgroup2Mount(contents: string | null): Cgroup2Mount | null {
  if (!contents) return null;
  for (const rawLine of contents.split("\n")) {
    const separator = rawLine.indexOf(" - ");
    if (separator < 0) continue;
    const left = rawLine.slice(0, separator).trim().split(/\s+/);
    const right = rawLine
      .slice(separator + 3)
      .trim()
      .split(/\s+/);
    if (right[0] !== "cgroup2" || left.length < 5) continue;
    const root = decodeMountInfoPath(left[3]);
    const mountpoint = decodeMountInfoPath(left[4]);
    if (!root?.startsWith("/") || !mountpoint?.startsWith("/")) return null;
    return { root, mountpoint };
  }
  return null;
}

function isContained(root: string, candidate: string): boolean {
  const relative = path.relative(root, candidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

function hasTraversalSegment(value: string): boolean {
  let decoded = value;
  try {
    decoded = decodeURIComponent(value);
  } catch {
    return true;
  }
  return decoded.split("/").some((segment) => segment === ".." || segment === ".");
}

function resolveFromMount(cgroupPath: string, mount: Cgroup2Mount): string | null {
  if (
    cgroupPath.includes("\0") ||
    mount.root.includes("\0") ||
    mount.mountpoint.includes("\0") ||
    hasTraversalSegment(cgroupPath)
  ) {
    return null;
  }
  const resolvedRoot = path.resolve(mount.root);
  const resolvedCgroup = path.resolve(cgroupPath);
  if (!isContained(resolvedRoot, resolvedCgroup)) return null;
  const suffix = path.relative(resolvedRoot, resolvedCgroup);
  const resolvedMountpoint = path.resolve(mount.mountpoint);
  const candidate = path.resolve(resolvedMountpoint, suffix);
  return isContained(resolvedMountpoint, candidate) ? candidate : null;
}

export async function resolveCgroupDirectory(
  readText: ResourcePressureFs["readText"],
  options: { allowDefaultFallback?: boolean } = {}
): Promise<string | null> {
  try {
    const [cgroupContents, mountInfo] = await Promise.all([
      readText("/proc/self/cgroup"),
      readText("/proc/self/mountinfo"),
    ]);
    const cgroupPath = parseCgroupV2Path(cgroupContents);
    const mount = parseCgroup2Mount(mountInfo);
    if (cgroupPath && mount) {
      const candidate = resolveFromMount(cgroupPath, mount);
      if (candidate && (await readText(path.join(candidate, "memory.current"))) != null) {
        return candidate;
      }
      if (!candidate) return null;
    }
    if (options.allowDefaultFallback === false) return null;
    return (await readText(path.join(DEFAULT_CGROUP_ROOT, "memory.current"))) != null
      ? DEFAULT_CGROUP_ROOT
      : null;
  } catch {
    return null;
  }
}

function parseEventCounter(value: string): number | null {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) && parsed >= 0 && parsed < Number.MAX_SAFE_INTEGER
    ? Math.floor(parsed)
    : null;
}

function parseMemoryEvents(text: string | null): ResourceSignals["cgroup"]["events"] {
  if (!text) return null;
  const values = { low: null, high: null, max: null, oom: null, oom_kill: null } as Record<
    "low" | "high" | "max" | "oom" | "oom_kill",
    number | null
  >;
  let matched = false;
  for (const line of text.split("\n")) {
    const [key, rawValue] = line.trim().split(/\s+/, 2);
    if (!(key in values) || rawValue == null) continue;
    values[key as keyof typeof values] = parseEventCounter(rawValue);
    matched = true;
  }
  return matched ? values : null;
}

function parsePsiNumber(line: string, name: string): number | null {
  const match = new RegExp(`(?:^|\\s)${name}=([0-9.]+)`).exec(line);
  const parsed = match ? Number(match[1]) : Number.NaN;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function parseMemoryStatFileBytes(text: string | null): number | null {
  if (!text) return null;
  for (const line of text.split("\n")) {
    const [key, rawValue] = line.trim().split(/\s+/, 2);
    if (key !== "file" || rawValue == null) continue;
    // sanitizeMemoryBytes rejects every falsy magnitude INCLUDING zero, but a
    // zero file cache is a valid reading (workingSetBytes falls back to the
    // raw ratio for it). The zero short-circuit below is coupled to that
    // contract on purpose; if sanitizeMemoryBytes ever accepts zero, this
    // branch becomes dead but harmless.
    if (rawValue === "0") return 0;
    return sanitizeMemoryBytes(rawValue);
  }
  return null;
}

function parsePsi(text: string | null): ResourceSignals["psi"] {
  if (!text) return null;
  const result: NonNullable<ResourceSignals["psi"]> = {
    someAvg10: null,
    someAvg60: null,
    someAvg300: null,
    fullAvg10: null,
    fullAvg60: null,
    fullAvg300: null,
  };
  let matched = false;
  for (const line of text.split("\n")) {
    const kind = line.startsWith("some ") ? "some" : line.startsWith("full ") ? "full" : null;
    if (!kind) continue;
    result[`${kind}Avg10`] = parsePsiNumber(line, "avg10");
    result[`${kind}Avg60`] = parsePsiNumber(line, "avg60");
    result[`${kind}Avg300`] = parsePsiNumber(line, "avg300");
    matched = true;
  }
  return matched ? result : null;
}

function firstParseablePsi(...samples: Array<string | null>): string | null {
  for (const sample of samples) {
    if (parsePsi(sample)) return sample;
  }
  return null;
}

export async function sampleResourceSignals(
  deps: SampleResourceSignalsDeps = {}
): Promise<ResourceSignals> {
  const readText = deps.fs?.readText ?? defaultReadText;
  let memory: NodeJS.MemoryUsage;
  try {
    memory = (deps.memoryUsage ?? process.memoryUsage)();
  } catch {
    memory = { rss: 0, heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 };
  }

  let heapUsed = Math.max(0, Math.floor(memory.heapUsed || 0));
  let heapLimit = 0;
  try {
    const heap = (deps.heapStatistics ?? v8.getHeapStatistics)();
    heapLimit = sanitizeMemoryBytes(heap.heap_size_limit) ?? 0;
    if (Number.isFinite(heap.used_heap_size)) {
      heapUsed = Math.max(0, Math.floor(heap.used_heap_size ?? heapUsed));
    }
  } catch {
    /* retain process heap sample */
  }

  const cgroupDirectory = await resolveCgroupDirectory(readText);
  const cgroupReads = cgroupDirectory
    ? await Promise.all([
        readText(path.join(cgroupDirectory, "memory.current")),
        readText(path.join(cgroupDirectory, "memory.max")),
        readText(path.join(cgroupDirectory, "memory.high")),
        readText(path.join(cgroupDirectory, "memory.events")),
        readText(path.join(cgroupDirectory, "memory.stat")),
        readText(path.join(cgroupDirectory, "memory.pressure")),
      ])
    : null;
  // Named bindings instead of positional indices: the read order above is
  // easy to shuffle on edit, and a silent index shift would corrupt the
  // current/max/high/stat mapping.
  const cgroupFiles = {
    current: cgroupReads?.[0] ?? null,
    max: cgroupReads?.[1] ?? null,
    high: cgroupReads?.[2] ?? null,
    events: cgroupReads?.[3] ?? null,
    stat: cgroupReads?.[4] ?? null,
    pressure: cgroupReads?.[5] ?? null,
  };
  // /proc/pressure/memory is host-wide. Inside Docker/cgroup that stalls the
  // chat admission gate (503 resource_pressure) when the *machine* is swapping
  // even if this container is idle. Prefer this unit's cgroup PSI; fall back
  // to the host file only when the cgroup sample is missing or unparseable
  // (bare metal, cgroup v1, or a stub filesystem).
  const hostPsi = await readText("/proc/pressure/memory").catch(() => null);
  const psi = firstParseablePsi(cgroupFiles.pressure, hostPsi);

  return {
    observedAtMs: (deps.nowMs ?? Date.now)(),
    v8: { heapUsedBytes: heapUsed, heapLimitBytes: heapLimit },
    process: {
      rssBytes: Math.max(0, Math.floor(memory.rss || 0)),
      externalBytes: Math.max(0, Math.floor(memory.external || 0)),
      arrayBuffersBytes: Math.max(0, Math.floor(memory.arrayBuffers || 0)),
      availableBytes: safeNumber(deps.availableMemory ?? (() => process.availableMemory?.())),
      constrainedBytes: safeNumber(deps.constrainedMemory ?? (() => process.constrainedMemory?.())),
    },
    cgroup: {
      currentBytes: sanitizeMemoryBytes(cgroupFiles.current),
      maxBytes: sanitizeMemoryBytes(cgroupFiles.max),
      highBytes: sanitizeMemoryBytes(cgroupFiles.high),
      fileBytes: parseMemoryStatFileBytes(cgroupFiles.stat),
      events: parseMemoryEvents(cgroupFiles.events),
    },
    psi: parsePsi(psi),
  };
}
