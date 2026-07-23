/**
 * Regression test - bifrost resolveSpawnArgs() must pass a v-prefixed (or
 * "latest") BIFROST_TRANSPORT_VERSION, never the bare semver string that
 * getInstalledVersion() reads out of node_modules/@maximhq/bifrost/package.json.
 *
 * Bifrost's own bin.js validates the env var against
 * /^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/ or the literal "latest" and exits
 * immediately with "Invalid transport version format" on anything else.
 * package.json's "version" field is always bare semver per npm convention
 * (e.g. "1.6.3"), so every embedded Bifrost instance failed to start until
 * this fix - unlike cliproxy's #6877 regression, this was silent at the
 * resolveSpawnArgs() call site itself; the failure only surfaced once the
 * spawned process actually ran.
 *
 * Covers both the pure formatTransportVersion() helper directly, and the
 * real resolveSpawnArgs() integration path against a filesystem-backed
 * fake npm, matching the pattern used by
 * tests/unit/services/installers/cliproxy-resolve-spawn-args-6877.test.ts.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

describe("formatTransportVersion (pure)", () => {
  it("prepends v to bare semver", async () => {
    const { formatTransportVersion } = await import(
      "../../../../src/lib/services/installers/bifrost.ts"
    );
    assert.equal(formatTransportVersion("1.6.3"), "v1.6.3");
    assert.equal(formatTransportVersion("2.0.0-beta.1"), "v2.0.0-beta.1");
  });

  it("leaves an already-v-prefixed version untouched", async () => {
    const { formatTransportVersion } = await import(
      "../../../../src/lib/services/installers/bifrost.ts"
    );
    assert.equal(formatTransportVersion("v1.6.3"), "v1.6.3");
  });

  it('passes through "latest" untouched', async () => {
    const { formatTransportVersion } = await import(
      "../../../../src/lib/services/installers/bifrost.ts"
    );
    assert.equal(formatTransportVersion("latest"), "latest");
  });

  it('defaults null to "latest"', async () => {
    const { formatTransportVersion } = await import(
      "../../../../src/lib/services/installers/bifrost.ts"
    );
    assert.equal(formatTransportVersion(null), "latest");
  });
});

describe("resolveSpawnArgs BIFROST_TRANSPORT_VERSION (real filesystem)", () => {
  const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
  const ORIGINAL_PATH = process.env.PATH ?? "";
  let dataDir: string;
  let fakeBinDir: string;

  before(() => {
    dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bifrost-vfix-"));
    fakeBinDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-bifrost-vfix-bin-"));
    process.env.DATA_DIR = dataDir;
    process.env.PATH = `${fakeBinDir}:${ORIGINAL_PATH}`;

    // Same package.json shape a real `npm install @maximhq/bifrost@1.6.3` would
    // leave behind - bare semver "version" field, no "v" prefix.
    const pkgDir = path.join(dataDir, "services", "bifrost", "node_modules", "@maximhq", "bifrost");
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(
      path.join(pkgDir, "package.json"),
      JSON.stringify({ name: "@maximhq/bifrost", version: "1.6.3" }),
      "utf8"
    );
    fs.writeFileSync(path.join(pkgDir, "bin.js"), "", "utf8");
  });

  after(() => {
    if (ORIGINAL_DATA_DIR === undefined) {
      delete process.env.DATA_DIR;
    } else {
      process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    }
    process.env.PATH = ORIGINAL_PATH;
    fs.rmSync(dataDir, { recursive: true, force: true });
    fs.rmSync(fakeBinDir, { recursive: true, force: true });
  });

  it("BIFROST_TRANSPORT_VERSION is v-prefixed, matching what bin.js requires", async () => {
    const { resolveSpawnArgs } = await import(
      "../../../../src/lib/services/installers/bifrost.ts"
    );

    const args = resolveSpawnArgs(8080);

    assert.equal(
      args.env.BIFROST_TRANSPORT_VERSION,
      "v1.6.3",
      "must be v-prefixed - a bare '1.6.3' is rejected by bifrost's bin.js with " +
        "'Invalid transport version format'"
    );
    assert.match(
      args.env.BIFROST_TRANSPORT_VERSION as string,
      /^(latest|v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?)$/,
      "must satisfy bifrost bin.js's own validateTransportVersion() regex"
    );
  });
});
