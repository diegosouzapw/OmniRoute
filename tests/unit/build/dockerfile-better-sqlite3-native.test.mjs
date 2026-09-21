import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const dockerfile = readFileSync(new URL("../../../Dockerfile", import.meta.url), "utf8");

test("Node runner copies better-sqlite3 and refuses to ship without the native addon", () => {
  assert.match(dockerfile, /COPY --from=builder \/app\/node_modules\/better-sqlite3/);
  assert.match(
    dockerfile,
    /node-gyp\.js rebuild --force_build=1/
  );
  assert.match(
    dockerfile,
    /&& test -f node_modules\/better-sqlite3\/build\/Release\/better_sqlite3\.node/
  );
  assert.match(
    dockerfile,
    /^RUN test -f \/app\/node_modules\/better-sqlite3\/build\/Release\/better_sqlite3\.node$/m
  );
});
