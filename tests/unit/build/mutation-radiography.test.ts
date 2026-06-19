import { test } from "node:test";
import assert from "node:assert";
import {
  classifyTestFiles,
  aggregateRadiography,
  classifyFromCounts,
} from "../../../scripts/quality/mutation-radiography.mjs";

// ── classifyTestFiles: the plan's canonical fixture ──────────────────────────
// 2 testFiles that kill mutants + 1 that kills nothing.
//   m1 killed ONLY by A   -> A gets a unique kill
//   m2 killed by A AND B  -> both get a shared kill
//   m3 survived           -> nobody
// Universe = [A, B, C]; C never appears in any killedBy -> empty.
test("classifies unique / redundant / empty test files from killedBy (file-name killedBy)", () => {
  const report = {
    files: {
      "open-sse/utils/error.ts": {
        mutants: [
          { id: "m1", status: "Killed", killedBy: ["A.test.ts"] },
          { id: "m2", status: "Killed", killedBy: ["A.test.ts", "B.test.ts"] },
          { id: "m3", status: "Survived", killedBy: [] },
        ],
      },
    },
  };
  const allTestFiles = ["A.test.ts", "B.test.ts", "C.test.ts"];
  const r = classifyTestFiles(report, allTestFiles);
  assert.equal(r["A.test.ts"].class, "unique"); // mata m1 sozinho
  assert.equal(r["A.test.ts"].uniqueKills, 1);
  assert.equal(r["A.test.ts"].sharedKills, 1);
  assert.equal(r["B.test.ts"].class, "redundant"); // só m2 (compartilhado)
  assert.equal(r["B.test.ts"].uniqueKills, 0);
  assert.equal(r["C.test.ts"].class, "empty"); // não mata nada
});

// ── id resolution: real Stryker tap-runner reports use numeric test ids in
// killedBy and a testFiles{} section mapping id -> file name. ────────────────
test("resolves numeric killedBy ids to file names via the testFiles section", () => {
  const report = {
    testFiles: {
      "tests/unit/x.test.ts": { tests: [{ id: "0", name: "tests/unit/x.test.ts" }] },
      "tests/unit/y.test.ts": { tests: [{ id: "1", name: "tests/unit/y.test.ts" }] },
      "tests/unit/z.test.ts": { tests: [{ id: "2", name: "tests/unit/z.test.ts" }] },
    },
    files: {
      "src/m.ts": {
        mutants: [
          { id: "m1", status: "Killed", killedBy: ["0"] }, // x alone -> unique
          { id: "m2", status: "Killed", killedBy: ["0", "1"] }, // x + y shared
        ],
      },
    },
  };
  // allTestFiles defaults to the testFiles keys when omitted.
  const r = classifyTestFiles(report);
  assert.equal(r["tests/unit/x.test.ts"].class, "unique");
  assert.equal(r["tests/unit/y.test.ts"].class, "redundant");
  assert.equal(r["tests/unit/z.test.ts"].class, "empty");
});

// ── overlapping (🟡): kills ≥1 unique but the majority of its kills are shared.
test("classifies overlapping when shared kills outnumber unique kills", () => {
  const report = {
    files: {
      "src/m.ts": {
        mutants: [
          { id: "m1", status: "Killed", killedBy: ["D"] }, // D unique
          { id: "m2", status: "Killed", killedBy: ["D", "E"] }, // D shared
          { id: "m3", status: "Killed", killedBy: ["D", "E", "F"] }, // D shared
        ],
      },
    },
  };
  const r = classifyTestFiles(report, ["D", "E", "F"]);
  assert.equal(r["D"].uniqueKills, 1);
  assert.equal(r["D"].sharedKills, 2);
  assert.equal(r["D"].class, "overlapping"); // 2 shared > 1 unique
  assert.equal(r["E"].class, "redundant");
  assert.equal(r["F"].class, "redundant");
});

// ── classifyFromCounts: the pure threshold helper. ───────────────────────────
test("classifyFromCounts applies the threshold rules", () => {
  assert.equal(classifyFromCounts(0, 0), "empty");
  assert.equal(classifyFromCounts(0, 3), "redundant");
  assert.equal(classifyFromCounts(2, 1), "unique"); // shared not > unique
  assert.equal(classifyFromCounts(1, 1), "unique"); // tie -> unique
  assert.equal(classifyFromCounts(1, 5), "overlapping"); // shared > unique
});

// ── aggregateRadiography: merge per-batch reports at the FILE level (ids are
// per-run, so each report is classified independently then summed). A file can
// be empty in one batch but unique in another -> unique overall. ─────────────
test("aggregateRadiography sums per-file kills across batches and reclassifies", () => {
  const batchC = {
    files: {
      "src/routeGuard.ts": {
        mutants: [{ id: "c1", status: "Killed", killedBy: ["A"] }], // A unique here
      },
    },
  };
  const batchG = {
    files: {
      "src/chatCore/x.ts": {
        mutants: [
          { id: "g1", status: "Killed", killedBy: ["A", "B"] }, // A shared, B shared
        ],
      },
    },
  };
  // B only ever shares; A is unique in C and shared in G -> A unique overall.
  const agg = aggregateRadiography([batchC, batchG], ["A", "B", "C"]);
  assert.equal(agg["A"].uniqueKills, 1);
  assert.equal(agg["A"].sharedKills, 1);
  assert.equal(agg["A"].class, "unique");
  assert.equal(agg["B"].class, "redundant");
  assert.equal(agg["C"].class, "empty");
});
