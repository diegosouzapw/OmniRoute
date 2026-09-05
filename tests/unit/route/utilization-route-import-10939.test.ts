import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// #9985 base-red (introduced by #10939): the utilization route imported
// `getConnection` from "@/lib/db/connections", a module that does not exist —
// typecheck:core does not cover app routes, so only `next build` (and any
// runtime import, like this test) catches it. Importing the route module is
// the repro: ERR_MODULE_NOT_FOUND before the fix, resolves after.
test("utilization route module resolves all its imports (#10939 broken-import regression)", async () => {
  process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-utilization-import-"));
  const mod = await import("../../../src/app/api/usage/utilization/route.ts");
  assert.equal(typeof mod.GET, "function", "route must export a GET handler");
});
