import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseArgs } from "../../../scripts/features/lib/args.mjs";

describe("parseArgs", () => {
  it("requires --owner and --repo", () => {
    assert.throws(() => parseArgs([]), /--owner is required/);
    assert.throws(() => parseArgs(["--owner", "x"]), /--repo is required/);
  });

  it("applies defaults when args/env missing", () => {
    const args = parseArgs(["--owner", "diegosouzapw", "--repo", "OmniRoute"], {});
    assert.equal(args.quarantineDays, 14);
    assert.equal(args.overrideThumbs, 5);
    assert.equal(args.overrideCommenters, 3);
    assert.equal(args.staleNeedsDays, 30);
    assert.equal(args.staleDeferDays, 90);
    assert.equal(args.ideiaDir, "_ideia");
    assert.equal(args.changelog, "CHANGELOG.md");
    assert.equal(args.output, null);
    assert.equal(args.dryRun, false);
    assert.equal(args.verbose, false);
    assert.deepEqual(args.onlyIssues, []);
  });

  it("CLI arg takes precedence over env var", () => {
    const args = parseArgs(["--owner", "x", "--repo", "y", "--quarantine-days", "7"], {
      FEATURE_QUARANTINE_DAYS: "21",
    });
    assert.equal(args.quarantineDays, 7);
  });

  it("env var used when CLI arg missing", () => {
    const args = parseArgs(["--owner", "x", "--repo", "y"], { FEATURE_QUARANTINE_DAYS: "21" });
    assert.equal(args.quarantineDays, 21);
  });

  it("parses --only-issues as comma-separated numbers", () => {
    const args = parseArgs(["--owner", "x", "--repo", "y", "--only-issues", "1046,1041,980"], {});
    assert.deepEqual(args.onlyIssues, [1046, 1041, 980]);
  });

  it("parses --dry-run and --verbose as booleans", () => {
    const args = parseArgs(["--owner", "x", "--repo", "y", "--dry-run", "--verbose"], {});
    assert.equal(args.dryRun, true);
    assert.equal(args.verbose, true);
  });
});
