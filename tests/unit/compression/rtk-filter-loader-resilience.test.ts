import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { loadRtkFilters } from "../../../open-sse/services/compression/engines/rtk/filterLoader.ts";

// F5.3: collectFilterSources() enumerates the builtin filters dir with an unguarded
// fs.readdirSync. A read failure there (lost permission, TOCTOU between existsSync and
// readdirSync, NFS timeout, removed dir on a read-only container) must NOT propagate into
// the compression pipeline — compression is best-effort and may never fail the request.
describe("RTK filter loader resilience", () => {
  afterEach(() => {
    mock.restoreAll();
    // Drop any cache poisoned during the mocked run.
    loadRtkFilters({ refresh: true });
  });

  it("degrades gracefully (does not throw) when the builtin dir cannot be read", () => {
    // The only readdirSync on the loadRtkFilters path is the builtin enumeration, so an
    // unconditional throw exercises exactly that call site.
    mock.method(fs, "readdirSync", () => {
      throw Object.assign(new Error("EACCES (mock)"), { code: "EACCES" });
    });

    assert.doesNotThrow(() => loadRtkFilters({ refresh: true }));
  });
});
