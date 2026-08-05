import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  decodeMountInfoPath,
  parseCgroup2Mount,
  parseCgroupV2Path,
  resolveCgroupDirectory,
  sampleResourceSignals,
  sanitizeMemoryBytes,
  type ResourcePressureFs,
} from "../../open-sse/utils/resourcePressureSampler.ts";

const MiB = 1024 ** 2;
const GiB = 1024 ** 3;

function memoryUsage(heapUsed = 1): NodeJS.MemoryUsage {
  return {
    rss: 500 * MiB,
    heapTotal: 300 * MiB,
    heapUsed,
    external: 12 * MiB,
    arrayBuffers: 3 * MiB,
  };
}

function mapFs(entries: ReadonlyArray<readonly [string, string]>): ResourcePressureFs {
  const files = new Map(entries);
  return { readText: async (filePath) => files.get(filePath) ?? null };
}

describe("resource pressure cgroup parsers", () => {
  it("accepts only the exact unified cgroup entry", () => {
    assert.equal(parseCgroupV2Path("2:cpu:/wrong\n0::/delegated/service\n"), "/delegated/service");
    assert.equal(parseCgroupV2Path("0:cpu:/wrong\n1::/also-wrong\n"), null);
  });

  it("decodes mountinfo octal escapes in root and mountpoint", () => {
    assert.equal(
      decodeMountInfoPath("/sys/fs/cgroup\\040space\\134unit"),
      "/sys/fs/cgroup space\\unit"
    );
    assert.deepEqual(
      parseCgroup2Mount(
        "43 34 0:35 /delegated\\040root /sys/fs/cgroup\\040space rw - cgroup2 cgroup2 rw\n"
      ),
      { root: "/delegated root", mountpoint: "/sys/fs/cgroup space" }
    );
  });

  it("resolves delegated mount roots within the decoded mountpoint", async () => {
    const fs = mapFs([
      ["/proc/self/cgroup", "0::/delegated root/team/service\n"],
      [
        "/proc/self/mountinfo",
        "43 34 0:35 /delegated\\040root /sys/fs/cgroup\\040space rw - cgroup2 cgroup2 rw\n",
      ],
      ["/sys/fs/cgroup space/team/service/memory.current", "1\n"],
    ]);

    assert.equal(await resolveCgroupDirectory(fs.readText), "/sys/fs/cgroup space/team/service");
  });

  it("rejects NUL, traversal, malformed, and out-of-root cgroup paths", async () => {
    for (const cgroupPath of [
      "/delegated/../escape",
      "/delegated/%2e%2e/escape",
      "/delegated/service\0escape",
      "delegated/service",
      "/other/service",
    ]) {
      const fs = mapFs([
        ["/proc/self/cgroup", `0::${cgroupPath}\n`],
        ["/proc/self/mountinfo", "43 34 0:35 /delegated /safe/cgroup rw - cgroup2 cgroup2 rw\n"],
        ["/safe/cgroup/memory.current", "1\n"],
      ]);
      assert.equal(
        await resolveCgroupDirectory(fs.readText, { allowDefaultFallback: false }),
        null,
        cgroupPath
      );
    }
  });

  it("falls back to the validated default cgroup root when proc metadata is malformed", async () => {
    const fs = mapFs([
      ["/proc/self/cgroup", "malformed\n"],
      ["/proc/self/mountinfo", "malformed\n"],
      ["/sys/fs/cgroup/memory.current", "123\n"],
    ]);
    assert.equal(await resolveCgroupDirectory(fs.readText), "/sys/fs/cgroup");
  });
});

describe("sampleResourceSignals", () => {
  it("captures process, V8, cgroup, event, and PSI snapshot fields", async () => {
    const fs = mapFs([
      ["/proc/self/cgroup", "0::/slice/service\n"],
      ["/proc/self/mountinfo", "43 34 0:35 / /sys/fs/cgroup rw - cgroup2 cgroup2 rw\n"],
      ["/sys/fs/cgroup/slice/service/memory.current", `${800 * MiB}\n`],
      ["/sys/fs/cgroup/slice/service/memory.max", `${GiB}\n`],
      ["/sys/fs/cgroup/slice/service/memory.high", "966367641\n"],
      ["/sys/fs/cgroup/slice/service/memory.events", "low 1\nhigh 2\nmax 3\noom 4\noom_kill 5\n"],
      [
        "/proc/pressure/memory",
        "some avg10=1.50 avg60=2.00 avg300=3.25 total=9\nfull avg10=0.25 avg60=0.50 avg300=0.75 total=1\n",
      ],
    ]);

    const signals = await sampleResourceSignals({
      nowMs: () => 42,
      memoryUsage: () => memoryUsage(250 * MiB),
      heapStatistics: () => ({ heap_size_limit: GiB, used_heap_size: 250 * MiB }),
      availableMemory: () => 4 * GiB,
      constrainedMemory: () => undefined,
      fs,
    });

    assert.equal(signals.observedAtMs, 42);
    assert.deepEqual(signals.v8, { heapUsedBytes: 250 * MiB, heapLimitBytes: GiB });
    assert.deepEqual(signals.process, {
      rssBytes: 500 * MiB,
      externalBytes: 12 * MiB,
      arrayBuffersBytes: 3 * MiB,
      availableBytes: 4 * GiB,
      constrainedBytes: null,
    });
    assert.deepEqual(signals.cgroup, {
      currentBytes: 800 * MiB,
      maxBytes: GiB,
      highBytes: 966367641,
      events: { low: 1, high: 2, max: 3, oom: 4, oom_kill: 5 },
    });
    assert.equal(signals.psi?.someAvg10, 1.5);
    assert.equal(signals.psi?.fullAvg10, 0.25);
  });

  it("fails open when platform reads fail or return malformed values", async () => {
    const signals = await sampleResourceSignals({
      memoryUsage: () => memoryUsage(),
      heapStatistics: () => ({ heap_size_limit: GiB, used_heap_size: 1 }),
      availableMemory: () => {
        throw new Error("unavailable");
      },
      constrainedMemory: () => Number.POSITIVE_INFINITY,
      fs: {
        readText: async (filePath) => {
          if (filePath === "/proc/self/cgroup") throw new Error("unavailable");
          return "malformed";
        },
      },
    });
    assert.equal(signals.process.availableBytes, null);
    assert.equal(signals.process.constrainedBytes, null);
    assert.deepEqual(signals.cgroup, {
      currentBytes: null,
      maxBytes: null,
      highBytes: null,
      events: null,
    });
    assert.equal(signals.psi, null);
  });

  it("treats missing, zero, max, and unsafe memory quantities as unavailable", () => {
    for (const value of [
      undefined,
      "",
      "max",
      0,
      -1,
      Number.NaN,
      Number.MAX_SAFE_INTEGER,
      2 ** 63,
    ]) {
      assert.equal(sanitizeMemoryBytes(value), null, String(value));
    }
    assert.equal(sanitizeMemoryBytes("123"), 123);
  });
});
