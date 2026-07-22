import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";

/**
 * #8132: shell-quote transitive override documentation/verification
 *
 * shell-quote is a transitive dependency of concurrently (dev-time script runner),
 * not a direct OmniRoute dependency. The npm override pins it to ^1.10.0 to
 * remediate GHSA-395f-4hp3-45gv (quadratic-complexity DoS in parse()).
 *
 * This test guards against:
 *   1. The override being silently removed
 *   2. The installed version regressing below the fix range
 */
test("#8132: package.json overrides shell-quote for concurrently", () => {
  const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));
  const overrides = pkg.overrides ?? {};
  const concurrentOverride = overrides["concurrently"];

  assert.ok(
    concurrentOverride && typeof concurrentOverride === "object",
    "overrides.concurrently must exist as a scoped object"
  );
  assert.ok(concurrentOverride["shell-quote"], "overrides.concurrently.shell-quote must be pinned");
});

test("#8132: installed shell-quote version satisfies ^1.10.0 (advisory fix)", () => {
  const output = execSync("npm ls shell-quote --json", { encoding: "utf8" });

  function findShellQuote(node: Record<string, unknown> | null): string | null {
    if (!node) return null;
    const deps = (node.dependencies ?? {}) as Record<string, Record<string, unknown>>;
    for (const [name, info] of Object.entries(deps)) {
      if (name === "shell-quote") return info.version as string;
      const nested = findShellQuote(info);
      if (nested) return nested;
    }
    return null;
  }

  const tree = JSON.parse(output);
  const version = findShellQuote(tree);
  assert.ok(version, "shell-quote must be installed in the dependency tree");
  const major = parseInt(version.split(".")[0]!, 10);
  const minor = parseInt(version.split(".")[1]!, 10);
  assert.ok(
    major > 1 || (major === 1 && minor >= 10),
    `shell-quote@${version} must be >= 1.10.0 (GHSA-395f-4hp3-45gv fix)`
  );
});
