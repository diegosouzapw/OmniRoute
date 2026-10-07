// tests/unit/build/check-api-typecheck.test.ts
// Hermetic tests for the API typecheck gate's parsing and baseline-diff logic.

import test from "node:test";
import assert from "node:assert/strict";
import {
  parseTscOutput,
  diffAgainstBaseline,
} from "../../../scripts/check/check-api-typecheck.mjs";
import { diffAgainstBaseline as diffOpenSseAgainstBaseline } from "../../../scripts/check/check-open-sse-typecheck.mjs";

test("parseTscOutput: parses an API-route TS2554 regression", () => {
  const raw =
    `src/app/api/v1/models/route.ts(42,7): error TS2554: Expected 2 arguments, but got 3.\n` +
    `src/app/api/v1/models/route.ts(52,7): error TS2554: Expected 2 arguments, but got 3.\n`;

  assert.deepEqual(parseTscOutput(raw), {
    "src/app/api/v1/models/route.ts": { TS2554: 2 },
  });
});

test("parseTscOutput: ignores non-error lines", () => {
  const raw =
    `src/app/api/foo/route.ts(1,1): error TS2339: Property 'bar' does not exist.\n` +
    `Found 1 error in 1 file.\n`;

  assert.deepEqual(parseTscOutput(raw), {
    "src/app/api/foo/route.ts": { TS2339: 1 },
  });
});

test("parseTscOutput: returns an empty map for clean output", () => {
  assert.deepEqual(parseTscOutput("Found 0 errors.\n"), {});
});

test("diffAgainstBaseline: flags a new API diagnostic", () => {
  const live = { "src/app/api/v1/models/route.ts": { TS2554: 1 } };
  const { regressions, improvements } = diffAgainstBaseline(live, {});

  assert.deepEqual(regressions, [
    {
      file: "src/app/api/v1/models/route.ts",
      code: "TS2554",
      liveCount: 1,
      baselineCount: 0,
    },
  ]);
  assert.equal(improvements.length, 0);
});

test("diffAgainstBaseline: accepts an unchanged frozen diagnostic count", () => {
  const baseline = { "src/app/api/foo/route.ts": { TS2339: 2 } };
  const live = { "src/app/api/foo/route.ts": { TS2339: 2 } };
  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 0);
});

test("diffAgainstBaseline: fails a count increase", () => {
  const baseline = { "src/app/api/foo/route.ts": { TS2339: 1 } };
  const live = { "src/app/api/foo/route.ts": { TS2339: 2 } };
  const { regressions } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 1);
  assert.equal(regressions[0].baselineCount, 1);
  assert.equal(regressions[0].liveCount, 2);
});

test("diffAgainstBaseline: reports a count decrease as an improvement", () => {
  const baseline = { "src/app/api/foo/route.ts": { TS2339: 2 } };
  const live = { "src/app/api/foo/route.ts": { TS2339: 1 } };
  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 1);
  assert.equal(improvements[0].liveCount, 1);
});

test("diffAgainstBaseline: reports a disappeared diagnostic as an improvement", () => {
  const baseline = { "src/app/api/foo/route.ts": { TS2339: 2 } };
  const { regressions, improvements } = diffAgainstBaseline({}, baseline);

  assert.equal(regressions.length, 0);
  assert.equal(improvements.length, 1);
  assert.equal(improvements[0].liveCount, 0);
  assert.equal(improvements[0].baselineCount, 2);
});

test("diffAgainstBaseline: ignores underscore-prefixed baseline metadata", () => {
  const baseline = {
    _relax_velocity_2026_08_30:
      "per-file TS diagnostic counts raised by 20% (289 -> 455); velocity phase",
    "src/app/api/foo/route.ts": { TS2339: 1 },
  };
  const live = { "src/app/api/foo/route.ts": { TS2339: 1 } };

  for (const compare of [diffAgainstBaseline, diffOpenSseAgainstBaseline]) {
    assert.deepEqual(compare(live, baseline), {
      regressions: [],
      improvements: [],
    });
  }
});

test("diffAgainstBaseline: rejects a string in place of a real file diagnostic map", () => {
  const malformedBaseline = {
    "src/app/api/foo/route.ts": "TS2339: 1",
  };

  assert.throws(
    () => diffAgainstBaseline({}, malformedBaseline),
    /src\/app\/api\/foo\/route\.ts.*plain object/
  );
  assert.throws(
    () => diffOpenSseAgainstBaseline({}, malformedBaseline),
    /src\/app\/api\/foo\/route\.ts.*plain object/
  );
});

test("diffAgainstBaseline: rejects non-plain roots and file maps", () => {
  const inheritedRoot = Object.create({
    "src/app/api/inherited/route.ts": { TS2339: 1 },
  });
  const inheritedFileMap = Object.create({ TS2339: 1 });

  for (const malformedBaseline of [[], "not an object", null, inheritedRoot]) {
    assert.throws(
      () => diffAgainstBaseline({}, malformedBaseline),
      /typecheck baseline must be a plain object/
    );
  }
  for (const malformedFileMap of [[], null, inheritedFileMap]) {
    assert.throws(
      () =>
        diffAgainstBaseline(
          {},
          {
            "src/app/api/foo/route.ts": malformedFileMap,
          }
        ),
      /src\/app\/api\/foo\/route\.ts.*plain object/
    );
  }
});

test("diffAgainstBaseline: rejects prototype property keys", () => {
  const malformedBaseline = JSON.parse('{"__proto__":{"TS2339":1}}');

  assert.throws(
    () => diffAgainstBaseline({}, malformedBaseline),
    /unsupported property key "__proto__"/
  );
});

test("diffAgainstBaseline: rejects non-TypeScript diagnostic keys", () => {
  for (const code of ["2339", "TSX2339", "TS23x", "constructor"]) {
    assert.throws(
      () =>
        diffAgainstBaseline(
          {},
          {
            "src/app/api/foo/route.ts": { [code]: 1 },
          }
        ),
      /invalid TypeScript code/
    );
  }
});

test("diffAgainstBaseline: rejects invalid diagnostic counts", () => {
  for (const count of [Number.NaN, Number.POSITIVE_INFINITY, -1, 1.5, "1"]) {
    assert.throws(
      () =>
        diffAgainstBaseline(
          {},
          {
            "src/app/api/foo/route.ts": { TS2339: count },
          }
        ),
      /finite nonnegative integer/
    );
  }
});

test("diffAgainstBaseline: validates live diagnostics with the same schema", () => {
  assert.throws(
    () =>
      diffAgainstBaseline(
        { "src/app/api/foo/route.ts": { TS2339: -1 } },
        { "src/app/api/foo/route.ts": { TS2339: 1 } }
      ),
    /live diagnostics.*finite nonnegative integer/
  );
});

test("diffAgainstBaseline: accepts zero counts without fabricating a second improvement", () => {
  assert.deepEqual(
    diffAgainstBaseline(
      { "src/app/api/foo/route.ts": { TS2339: 0 } },
      { "src/app/api/foo/route.ts": { TS2339: 1 } }
    ),
    {
      regressions: [],
      improvements: [
        {
          file: "src/app/api/foo/route.ts",
          code: "TS2339",
          liveCount: 0,
          baselineCount: 1,
        },
      ],
    }
  );
});
