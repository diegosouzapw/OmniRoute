import test from "node:test";
import assert from "node:assert/strict";
import { isRunningInDocker } from "../../src/lib/zed-oauth/dockerDetect.ts";

// Tests use dependency injection (dockerDetect accepts optional `deps`)
// so no module mocking is required.

test("isRunningInDocker returns true when /.dockerenv exists", () => {
  const result = isRunningInDocker({
    existsSync: (p: string) => p === "/.dockerenv",
    readFileSync: (_p: string, _enc: string) => {
      throw new Error("skip");
    },
  });
  assert.equal(result, true);
});

test("isRunningInDocker returns true when /proc/1/cgroup contains 'docker'", () => {
  const result = isRunningInDocker({
    existsSync: (_p: string) => false,
    readFileSync: (_p: string, _enc: string) => "12:cpuset:/docker/abc123\n",
  });
  assert.equal(result, true);
});

test("isRunningInDocker returns false on a plain host environment", () => {
  const result = isRunningInDocker({
    existsSync: (_p: string) => false,
    readFileSync: (_p: string, _enc: string) => "12:cpuset:/\n",
  });
  assert.equal(result, false);
});

test("isRunningInDocker returns false when fs throws for all checks", () => {
  const result = isRunningInDocker({
    existsSync: (_p: string) => {
      throw new Error("EPERM");
    },
    readFileSync: (_p: string, _enc: string) => {
      throw new Error("ENOENT");
    },
  });
  assert.equal(result, false);
});
