import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { resolve } from "node:path";

const workflowPath = resolve(".github/workflows/docker-publish.yml");

function ghaCacheExports(): string[] {
  return readFileSync(workflowPath, "utf8")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("cache-to:"))
    .map((line) => line.slice("cache-to:".length).trim())
    .filter((config) => config.split(",").some((option) => option.trim() === "type=gha"));
}

test("Docker publish treats every GitHub Actions cache export as best effort", () => {
  const exports = ghaCacheExports();
  const scopes = exports
    .map((config) => {
      const scope = config
        .split(",")
        .map((option) => option.trim())
        .find((option) => option.startsWith("scope="));
      return scope?.slice("scope=".length);
    })
    .sort();

  assert.deepEqual(scopes, [
    "docker-${{ matrix.arch }}",
    "docker-bun-base-${{ matrix.arch }}",
    "docker-bun-web-${{ matrix.arch }}",
    "docker-web-${{ matrix.arch }}",
  ]);

  for (const config of exports) {
    assert.ok(
      config.split(",").some((option) => option.trim() === "ignore-error=true"),
      `GitHub Actions cache export must be best effort: ${config}`
    );
  }
});
