import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const dockerfile = readFileSync(new URL("../../../Dockerfile", import.meta.url), "utf8");

test("Node runner copies better-sqlite3 and refuses to ship without the native addon", () => {
  // #13990 (875a84e3) copies with `--chown=node:node` so the runner does not need a
  // second full copy via `RUN chown -R` (the ~2 GB doubled image). Any flag order is
  // fine; what must hold is that better-sqlite3 comes FROM the builder stage.
  assert.match(
    dockerfile,
    /COPY(?: --[\w-]+(?:=\S+)?)*? --from=builder(?: --[\w-]+(?:=\S+)?)* \/app\/node_modules\/better-sqlite3/
  );
  assert.match(dockerfile, /node-gyp\.js rebuild --force_build=1/);
  assert.match(
    dockerfile,
    /&& test -f node_modules\/better-sqlite3\/build\/Release\/better_sqlite3\.node/
  );
  assert.match(
    dockerfile,
    /^RUN test -f \/app\/node_modules\/better-sqlite3\/build\/Release\/better_sqlite3\.node$/m
  );
});
