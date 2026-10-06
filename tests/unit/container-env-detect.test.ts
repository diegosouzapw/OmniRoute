import test from "node:test";
import assert from "node:assert/strict";
import {
  describeContainerTarget,
  hasBindMountAt,
  isRunningInContainer,
} from "../../src/shared/utils/containerEnv.ts";

// Dependency injection everywhere — no module mocking, no real /proc reads.

const throwingFs = {
  existsSync: (_p: string) => {
    throw new Error("ENOENT");
  },
  readFileSync: (_p: string, _enc: string): string => {
    throw new Error("ENOENT");
  },
};

const hostDeps = {
  existsSync: (_p: string) => false,
  readFileSync: (_p: string, _enc: string) => "12:cpuset:/\n",
  env: {} as NodeJS.ProcessEnv,
};

// A realistic mountinfo from the compose `host` profile: /host-home itself is a
// plain directory created by Docker, only the per-tool dirs are bind mounts.
const HOST_PROFILE_MOUNTINFO = [
  "22 28 0:20 / /proc rw,nosuid,nodev,noexec,relatime - proc proc rw",
  "24 28 0:22 / /sys ro,nosuid,nodev,noexec,relatime - sysfs sysfs ro",
  "31 28 254:1 /var/lib/docker/volumes/omniroute-data/_data /app/data rw,relatime - ext4 /dev/vda1 rw",
  "44 28 254:1 /Users/me/.codex /host-home/.codex rw,relatime - ext4 /dev/vda1 rw",
  "45 28 254:1 /Users/me/.claude /host-home/.claude rw,relatime - ext4 /dev/vda1 rw",
  "",
].join("\n");

// ── isRunningInContainer ─────────────────────────────────────────────────────

test("isRunningInContainer detects /.dockerenv", () => {
  assert.equal(
    isRunningInContainer({
      ...throwingFs,
      existsSync: (p: string) => p === "/.dockerenv",
      env: {},
    }),
    true
  );
});

test("isRunningInContainer detects Podman via /run/.containerenv", () => {
  assert.equal(
    isRunningInContainer({
      ...throwingFs,
      existsSync: (p: string) => p === "/run/.containerenv",
      env: {},
    }),
    true
  );
});

test("isRunningInContainer detects Kubernetes via KUBERNETES_SERVICE_HOST", () => {
  assert.equal(
    isRunningInContainer({
      ...throwingFs,
      existsSync: (_p: string) => false,
      env: { KUBERNETES_SERVICE_HOST: "10.96.0.1" },
    }),
    true
  );
});

for (const marker of ["docker", "containerd", "kubepods", "podman", "lxc"]) {
  test(`isRunningInContainer detects '${marker}' in /proc/1/cgroup`, () => {
    assert.equal(
      isRunningInContainer({
        existsSync: (_p: string) => false,
        readFileSync: (_p: string, _enc: string) => `12:cpuset:/${marker}/abc123\n`,
        env: {},
      }),
      true
    );
  });
}

test("isRunningInContainer returns false on a plain host", () => {
  assert.equal(isRunningInContainer(hostDeps), false);
});

test("isRunningInContainer returns false when every probe throws", () => {
  assert.equal(isRunningInContainer({ ...throwingFs, env: {} }), false);
});

test("OMNIROUTE_CONTAINER=1 forces detection on even without container markers", () => {
  assert.equal(isRunningInContainer({ ...hostDeps, env: { OMNIROUTE_CONTAINER: "1" } }), true);
  assert.equal(isRunningInContainer({ ...hostDeps, env: { OMNIROUTE_CONTAINER: "true" } }), true);
});

test("OMNIROUTE_CONTAINER=0 forces detection off even inside a container", () => {
  const inContainer = {
    existsSync: (p: string) => p === "/.dockerenv",
    readFileSync: (_p: string, _enc: string) => "12:cpuset:/docker/abc\n",
    env: { OMNIROUTE_CONTAINER: "0" } as NodeJS.ProcessEnv,
  };
  assert.equal(isRunningInContainer(inContainer), false);
  assert.equal(
    isRunningInContainer({ ...inContainer, env: { OMNIROUTE_CONTAINER: "false" } }),
    false
  );
});

// ── hasBindMountAt ───────────────────────────────────────────────────────────

const mountDeps = (mountinfo: string) => ({
  existsSync: (_p: string) => true,
  readFileSync: (p: string, _enc: string) => {
    if (p === "/proc/self/mountinfo") return mountinfo;
    throw new Error("ENOENT");
  },
  env: {} as NodeJS.ProcessEnv,
});

test("hasBindMountAt is true for a directory whose children are bind mounts", () => {
  // The compose `host` profile case: CLI_CONFIG_HOME=/host-home is not itself a
  // mount point, but ~/.codex and ~/.claude are mounted beneath it.
  assert.equal(hasBindMountAt("/host-home", mountDeps(HOST_PROFILE_MOUNTINFO)), true);
});

test("hasBindMountAt is true for an exact mount point", () => {
  assert.equal(hasBindMountAt("/host-home/.codex", mountDeps(HOST_PROFILE_MOUNTINFO)), true);
  assert.equal(hasBindMountAt("/app/data", mountDeps(HOST_PROFILE_MOUNTINFO)), true);
});

test("hasBindMountAt is true for a path nested inside a mount point", () => {
  assert.equal(
    hasBindMountAt("/host-home/.codex/profiles", mountDeps(HOST_PROFILE_MOUNTINFO)),
    true
  );
});

test("hasBindMountAt ignores trailing slashes", () => {
  assert.equal(hasBindMountAt("/host-home/", mountDeps(HOST_PROFILE_MOUNTINFO)), true);
});

test("hasBindMountAt is false for an unmounted container path", () => {
  assert.equal(hasBindMountAt("/home/node", mountDeps(HOST_PROFILE_MOUNTINFO)), false);
  assert.equal(hasBindMountAt("/opt/whatever", mountDeps(HOST_PROFILE_MOUNTINFO)), false);
});

test("hasBindMountAt ignores tmpfs and other in-memory mounts", () => {
  // A `--tmpfs /tmp` (or a container whose /tmp is tmpfs) is throwaway storage,
  // not a route to the host: counting it would clear the ephemeral flag for a
  // path that loses the file even before the container is recreated.
  const mountinfo = [
    "99 30 0:36 / /tmp rw,relatime shared:25 - tmpfs tmpfs rw,size=12582912k,inode64",
    "32 27 0:27 / /dev/shm rw,nosuid,nodev shared:4 - tmpfs tmpfs rw,inode64",
    "26 30 0:24 / /proc rw,nosuid,nodev,noexec,relatime - proc proc rw",
    "",
  ].join("\n");
  assert.equal(hasBindMountAt("/tmp", mountDeps(mountinfo)), false);
  assert.equal(hasBindMountAt("/tmp/omniroute-fake-home/.codex", mountDeps(mountinfo)), false);
  assert.equal(hasBindMountAt("/dev/shm/whatever", mountDeps(mountinfo)), false);
  assert.equal(hasBindMountAt("/proc/1", mountDeps(mountinfo)), false);
});

test("hasBindMountAt still honours a real bind mount nested under a tmpfs path", () => {
  const mountinfo = [
    "99 30 0:36 / /tmp rw,relatime - tmpfs tmpfs rw,inode64",
    "44 99 254:1 /Users/me/.codex /tmp/host-home/.codex rw,relatime - ext4 /dev/vda1 rw",
    "",
  ].join("\n");
  assert.equal(hasBindMountAt("/tmp/host-home/.codex", mountDeps(mountinfo)), true);
  assert.equal(hasBindMountAt("/tmp/host-home", mountDeps(mountinfo)), true);
  assert.equal(hasBindMountAt("/tmp/other", mountDeps(mountinfo)), false);
});

test("hasBindMountAt skips a mountinfo line with no filesystem-type separator", () => {
  // Without the trailing "- <fstype> ..." section the line proves nothing, so
  // it must not be read as a host mount.
  const mountinfo = "44 28 254:1 / /host-home rw,relatime shared:1\n";
  assert.equal(hasBindMountAt("/host-home", mountDeps(mountinfo)), false);
});

test("hasBindMountAt never treats / as a bind mount", () => {
  assert.equal(hasBindMountAt("/", mountDeps(HOST_PROFILE_MOUNTINFO)), false);
});

test("hasBindMountAt decodes octal escapes in mount points", () => {
  const mountinfo = "44 28 254:1 / /host-home/my\\040dir rw,relatime - ext4 /dev/vda1 rw\n";
  assert.equal(hasBindMountAt("/host-home/my dir", mountDeps(mountinfo)), true);
});

test("hasBindMountAt returns false when /proc/self/mountinfo is unreadable", () => {
  assert.equal(hasBindMountAt("/host-home", { ...throwingFs, env: {} }), false);
});

test("hasBindMountAt tolerates malformed mountinfo lines", () => {
  const mountinfo = [
    "garbage",
    "1 2 3",
    "",
    "44 28 254:1 / /host-home rw - ext4 /dev/vda1 rw",
  ].join("\n");
  assert.equal(hasBindMountAt("/host-home", mountDeps(mountinfo)), true);
  assert.equal(hasBindMountAt("/nope", mountDeps(mountinfo)), false);
});

test("hasBindMountAt returns false for empty or relative paths", () => {
  assert.equal(hasBindMountAt("", mountDeps(HOST_PROFILE_MOUNTINFO)), false);
  assert.equal(hasBindMountAt("relative/path", mountDeps(HOST_PROFILE_MOUNTINFO)), false);
});

// ── describeContainerTarget ──────────────────────────────────────────────────

test("describeContainerTarget flags an ephemeral container home", () => {
  const deps = {
    existsSync: (p: string) => p === "/.dockerenv",
    readFileSync: (p: string, _enc: string) => {
      if (p === "/proc/self/mountinfo") return HOST_PROFILE_MOUNTINFO;
      throw new Error("ENOENT");
    },
    env: {} as NodeJS.ProcessEnv,
  };
  assert.deepEqual(describeContainerTarget("/home/node/.codex", deps), {
    inContainer: true,
    bindMounted: false,
    ephemeral: true,
  });
});

test("describeContainerTarget clears ephemeral for a bind-mounted target", () => {
  const deps = {
    existsSync: (p: string) => p === "/.dockerenv",
    readFileSync: (p: string, _enc: string) => {
      if (p === "/proc/self/mountinfo") return HOST_PROFILE_MOUNTINFO;
      throw new Error("ENOENT");
    },
    env: {} as NodeJS.ProcessEnv,
  };
  assert.deepEqual(describeContainerTarget("/host-home/.codex/foo.toml", deps), {
    inContainer: true,
    bindMounted: true,
    ephemeral: false,
  });
});

test("describeContainerTarget is inert on a host", () => {
  assert.deepEqual(describeContainerTarget("/Users/me/.codex", hostDeps), {
    inContainer: false,
    bindMounted: false,
    ephemeral: false,
  });
});

test("describeContainerTarget does not probe mounts when not in a container", () => {
  let mountReads = 0;
  const deps = {
    existsSync: (_p: string) => false,
    readFileSync: (p: string, _enc: string) => {
      if (p === "/proc/self/mountinfo") {
        mountReads += 1;
        return HOST_PROFILE_MOUNTINFO;
      }
      return "12:cpuset:/\n";
    },
    env: {} as NodeJS.ProcessEnv,
  };
  describeContainerTarget("/Users/me/.codex", deps);
  assert.equal(mountReads, 0);
});
