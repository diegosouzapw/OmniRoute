import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const dockerfile = readFileSync(new URL("../../../Dockerfile.bun", import.meta.url), "utf8");

test("Bun runner excludes every better-sqlite3 native addon", () => {
  assert.doesNotMatch(
    dockerfile,
    /COPY --from=builder \/app\/node_modules\/better-sqlite3/
  );
  assert.match(
    dockerfile,
    /find \/app[\s\S]*-path '\*\/node_modules\/better-sqlite3'[\s\S]*-prune[\s\S]*-exec rm -rf '\{\}' \+/
  );
  assert.match(
    dockerfile,
    /test -z "\$\(find \/app -type f -name 'better_sqlite3\.node' -print -quit\)"/
  );
});
