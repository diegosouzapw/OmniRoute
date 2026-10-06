// Regression test for #11343 — an unconditional Turbopack `resolveAlias` for
// better-sqlite3 shipped the build-time stub into the runtime bundle, so every
// artifact built from the release tip answered HTTP 500 on every route (the
// stub export is not a constructor, the sync driver chain fell through to
// node:sqlite and sql.js, and the instrumentation hook aborted at boot).
//
// The alias defeats `serverExternalPackages` because resolveAlias rewrites the
// request BEFORE the externals check runs. It must therefore be opt-in, and a
// default production build must externalize the REAL native package.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const { shouldStubBetterSqlite3, betterSqlite3AliasFor } =
  await import("../../scripts/build/better-sqlite3-stub-flag.mjs");

describe("better-sqlite3 stub alias (#11343)", () => {
  it("default env does NOT stub better-sqlite3 (shipped artifacts get the real addon)", () => {
    assert.equal(shouldStubBetterSqlite3({}), false);
    assert.deepEqual(betterSqlite3AliasFor({}), {});
  });

  it("only the exact opt-in value enables the stub", () => {
    for (const value of ["", "0", "true", "yes"]) {
      assert.equal(
        shouldStubBetterSqlite3({ OMNIROUTE_BETTER_SQLITE3_STUB: value }),
        false,
        `OMNIROUTE_BETTER_SQLITE3_STUB=${JSON.stringify(value)} must not enable the stub`
      );
    }
  });

  it("OMNIROUTE_BETTER_SQLITE3_STUB=1 opts into the stub (SIGABRT-prone build hosts, #10060)", () => {
    assert.equal(shouldStubBetterSqlite3({ OMNIROUTE_BETTER_SQLITE3_STUB: "1" }), true);
    assert.deepEqual(betterSqlite3AliasFor({ OMNIROUTE_BETTER_SQLITE3_STUB: "1" }), {
      "better-sqlite3": "./src/lib/db/better-sqlite3.stub.js",
    });
  });

  it("next.config.mjs derives the turbopack alias from the flag (no unconditional stub)", () => {
    const config = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
    assert.match(
      config,
      /betterSqlite3AliasFor/,
      "next.config.mjs must use betterSqlite3AliasFor()"
    );
    assert.doesNotMatch(
      config,
      /^\s*"better-sqlite3":\s*"\.\/src\/lib\/db\/better-sqlite3\.stub\.js",?\s*$/m,
      "next.config.mjs must not hardcode the better-sqlite3 stub alias"
    );
  });

  it("better-sqlite3 stays in serverExternalPackages so the default build externalizes it", () => {
    const config = readFileSync(new URL("../../next.config.mjs", import.meta.url), "utf8");
    const externals = config.slice(config.indexOf("serverExternalPackages:"));
    assert.match(externals.slice(0, externals.indexOf("]")), /"better-sqlite3"/);
  });
});
