/**
 * Regression test for #14487 — the opencode pool-strain marker (read from the
 * fixed /tmp path the #13924 watcher writes, overridable via
 * OPENCODE_POOL_STRAIN_MARKER_PATH) was trusted with no ownership/mode check,
 * so ANY local user could plant a world-writable marker (or a symlink) and
 * force a park decision. The default path itself must NOT move: the external
 * watcher keeps writing /tmp/opencode-pool-strain.json.
 */
import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";

const MARKER_ENV = "OPENCODE_POOL_STRAIN_MARKER_PATH";

describe("opencode pool-strain marker trust (#14487)", () => {
  let priorMarker: string | undefined;
  let dir: string;

  beforeEach(() => {
    priorMarker = process.env[MARKER_ENV];
    delete process.env[MARKER_ENV];
    dir = fs.mkdtempSync(path.join(os.tmpdir(), "strain-marker-"));
  });

  afterEach(() => {
    if (priorMarker === undefined) delete process.env[MARKER_ENV];
    else process.env[MARKER_ENV] = priorMarker;
    fs.rmSync(dir, { recursive: true, force: true });
  });

  function writeFreshMarker(markerPath: string, mode: number): void {
    fs.writeFileSync(markerPath, JSON.stringify({ since: Date.now(), ttl_s: 300 }));
    fs.chmodSync(markerPath, mode);
  }

  it("keeps the default marker path where the #13924 watcher writes it", async () => {
    const { poolStrainMarkerPath } = await import("../../open-sse/executors/opencodeParkResume.ts");
    assert.equal(poolStrainMarkerPath(), "/tmp/opencode-pool-strain.json");
  });

  it("honors an explicit OPENCODE_POOL_STRAIN_MARKER_PATH override", async () => {
    process.env[MARKER_ENV] = "/custom/path/marker.json";
    const { poolStrainMarkerPath } = await import("../../open-sse/executors/opencodeParkResume.ts");
    assert.equal(poolStrainMarkerPath(), "/custom/path/marker.json");
  });

  it("rejects a world-writable marker even though it is fresh and well-formed", async () => {
    const { readPoolStrainMarker } = await import("../../open-sse/executors/opencodeParkResume.ts");
    const markerPath = path.join(dir, "opencode-pool-strain.json");
    writeFreshMarker(markerPath, 0o666); // group+other writable: any local user could have planted this

    const result = await readPoolStrainMarker(markerPath);

    assert.equal(
      result.fresh,
      false,
      "a world/group-writable pool-strain marker must never be trusted as fresh"
    );
  });

  it("rejects a marker reached through a symlink instead of following it", async () => {
    const { readPoolStrainMarker } = await import("../../open-sse/executors/opencodeParkResume.ts");
    const target = path.join(dir, "real-marker.json");
    writeFreshMarker(target, 0o600);
    const link = path.join(dir, "opencode-pool-strain.json");
    fs.symlinkSync(target, link);

    const result = await readPoolStrainMarker(link);

    assert.equal(result.fresh, false, "a symlinked pool-strain marker must never be followed");
  });

  it("still trusts an otherwise-fresh marker that is owner-only writable", async () => {
    const { readPoolStrainMarker } = await import("../../open-sse/executors/opencodeParkResume.ts");
    const markerPath = path.join(dir, "opencode-pool-strain.json");
    writeFreshMarker(markerPath, 0o600); // owner read/write only — legitimate marker

    const result = await readPoolStrainMarker(markerPath);

    assert.equal(result.fresh, true, "an owner-locked-down fresh marker must still be trusted");
  });
});
