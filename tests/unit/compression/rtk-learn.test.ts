/**
 * TDD tests for RTK filter learning (R6/R7/N7).
 *
 * Scope: pure functions operating on in-memory CommandSample arrays.
 * No DB reads, no I/O.  DB wiring (reading from call_logs) is a follow-up task.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { discoverRepeatedNoise } from "../../../open-sse/services/compression/engines/rtk/discover.ts";
import { suggestFilter } from "../../../open-sse/services/compression/engines/rtk/learn.ts";

// ---------------------------------------------------------------------------
// Synthetic test fixture
// ---------------------------------------------------------------------------

/**
 * Build 10 `npm install` output samples.
 *
 * Each sample has:
 *   - A noisy deprecated-warning line whose package name and version vary.
 *   - A unique summary line indicating how many packages were added.
 *   - An error line with ERR!/E404.
 *   - A line that appears only in one sample (truly unique — should NOT be suggested).
 */
function makeSamples() {
  const packages = [
    ["left-pad", "1.3.0"],
    ["moment", "2.29.4"],
    ["lodash", "4.17.21"],
    ["underscore", "1.13.6"],
    ["request", "2.88.2"],
    ["express", "4.18.2"],
    ["debug", "4.3.4"],
    ["chalk", "5.2.0"],
    ["semver", "7.5.1"],
    ["bluebird", "3.7.2"],
  ];

  return packages.map(([pkg, ver], i) => ({
    command: "npm install",
    output: [
      `npm WARN deprecated ${pkg}@${ver}: Use a newer version`,
      `added ${100 + i * 3} packages in ${i + 1}s`,
      `npm ERR! code E404`,
      `npm ERR! 404 Not Found - GET https://registry.npmjs.org/${pkg}`,
      // One truly unique line appears only in sample index 3
      ...(i === 3 ? ["unique line only in sample 3"] : []),
    ].join("\n"),
  }));
}

const samples = makeSamples();

// ---------------------------------------------------------------------------
// discoverRepeatedNoise
// ---------------------------------------------------------------------------

describe("discoverRepeatedNoise", () => {
  it("surfaces the deprecated-warning template as a high-hit candidate", () => {
    const hits = discoverRepeatedNoise(samples);
    // The normalised form of 'npm WARN deprecated <pkg>@<ver>: Use a newer version'
    // should appear with hits === samples.length (10).
    const deprecatedCandidate = hits.find((h) => h.pattern.includes("WARN deprecated"));
    assert.ok(
      deprecatedCandidate !== undefined,
      "should surface a deprecated-warning drop candidate"
    );
    assert.ok(
      deprecatedCandidate.hits >= samples.length,
      `expected hits >= ${samples.length}, got ${deprecatedCandidate.hits}`
    );
  });

  it("does NOT surface a line that appears only once as a drop candidate", () => {
    const hits = discoverRepeatedNoise(samples);
    const uniqueCandidate = hits.find((h) => h.pattern.includes("unique line only in sample"));
    assert.equal(uniqueCandidate, undefined, "unique lines must not appear as drop candidates");
  });

  it("returns candidates sorted descending by hits", () => {
    const hits = discoverRepeatedNoise(samples);
    for (let i = 1; i < hits.length; i++) {
      assert.ok(hits[i].hits <= hits[i - 1].hits, "results should be sorted descending by hits");
    }
  });

  it("returns an empty array for an empty sample set", () => {
    const hits = discoverRepeatedNoise([]);
    assert.deepEqual(hits, []);
  });
});

// ---------------------------------------------------------------------------
// suggestFilter
// ---------------------------------------------------------------------------

describe("suggestFilter", () => {
  it("returns a filter whose match.commands pattern anchors the command", () => {
    const filter = suggestFilter("npm install", samples);
    assert.ok(filter.match.commands.length > 0, "should have at least one command pattern");
    const pattern = filter.match.commands[0];
    assert.ok(
      new RegExp(pattern).test("npm install"),
      `command pattern '${pattern}' should match 'npm install'`
    );
  });

  it("includes a dropPattern that matches the deprecated warnings", () => {
    const filter = suggestFilter("npm install", samples);
    const hasDeprecatedDrop = filter.rules.dropPatterns.some((p) => {
      try {
        return new RegExp(p, "i").test("npm WARN deprecated left-pad@1.3.0: Use a newer version");
      } catch {
        return false;
      }
    });
    assert.ok(hasDeprecatedDrop, "dropPatterns should cover deprecated warnings");
  });

  it("includes an errorPattern that covers the ERR!/E404 line", () => {
    const filter = suggestFilter("npm install", samples);
    const errLine = "npm ERR! code E404";
    const hasErrorPattern = filter.preserve.errorPatterns.some((p) => {
      try {
        return new RegExp(p, "i").test(errLine);
      } catch {
        return false;
      }
    });
    assert.ok(hasErrorPattern, `errorPatterns should cover '${errLine}'`);
  });

  it("includes a summaryPattern that covers the 'added N packages' line", () => {
    const filter = suggestFilter("npm install", samples);
    const summaryLine = "added 120 packages in 5s";
    const hasSummaryPattern = filter.preserve.summaryPatterns.some((p) => {
      try {
        return new RegExp(p, "i").test(summaryLine);
      } catch {
        return false;
      }
    });
    assert.ok(hasSummaryPattern, `summaryPatterns should cover '${summaryLine}'`);
  });

  it("no dropPattern matches a preserved error line (no preserve-vs-drop conflict)", () => {
    const filter = suggestFilter("npm install", samples);
    const preservedLines = [
      "npm ERR! code E404",
      "npm ERR! 404 Not Found - GET https://registry.npmjs.org/left-pad",
      "added 120 packages in 5s",
    ];
    const allPreservePatterns = [
      ...filter.preserve.errorPatterns,
      ...filter.preserve.summaryPatterns,
    ];

    for (const line of preservedLines) {
      const matchedByPreserve = allPreservePatterns.some((p) => {
        try {
          return new RegExp(p, "i").test(line);
        } catch {
          return false;
        }
      });
      if (!matchedByPreserve) continue; // line not in preserve scope — skip conflict check

      const droppedByDrop = filter.rules.dropPatterns.some((p) => {
        try {
          return new RegExp(p, "i").test(line);
        } catch {
          return false;
        }
      });
      assert.equal(
        droppedByDrop,
        false,
        `preserved line '${line}' must NOT be matched by a dropPattern`
      );
    }
  });

  it("unique line is NOT in dropPatterns", () => {
    const filter = suggestFilter("npm install", samples);
    const uniqueLine = "unique line only in sample 3";
    const droppedByDrop = filter.rules.dropPatterns.some((p) => {
      try {
        return new RegExp(p, "i").test(uniqueLine);
      } catch {
        return false;
      }
    });
    assert.equal(droppedByDrop, false, "unique lines must not appear in dropPatterns");
  });

  it("returns a filter with the expected RtkFilterPack shape", () => {
    const filter = suggestFilter("npm install", samples);
    // Check required top-level shape fields
    assert.equal(typeof filter.id, "string");
    assert.equal(typeof filter.label, "string");
    assert.ok(filter.id.length > 0);
    assert.ok(Array.isArray(filter.match.commands));
    assert.ok(Array.isArray(filter.match.patterns));
    assert.ok(Array.isArray(filter.match.outputTypes));
    assert.ok(Array.isArray(filter.rules.dropPatterns));
    assert.ok(Array.isArray(filter.preserve.errorPatterns));
    assert.ok(Array.isArray(filter.preserve.summaryPatterns));
    assert.equal(typeof filter.rules.stripAnsi, "boolean");
  });

  it("returns an empty-patterns filter for an empty sample set without throwing", () => {
    const filter = suggestFilter("unknown-command", []);
    assert.equal(filter.rules.dropPatterns.length, 0);
    assert.ok(Array.isArray(filter.preserve.errorPatterns));
    assert.ok(Array.isArray(filter.preserve.summaryPatterns));
  });
});
