import assert from "node:assert/strict";
import test from "node:test";

import {
  fileSizeHeadroom,
  headroomOf,
  isMonitorExemptFile,
  renderMarkdown,
  statusOf,
  sumTypecheckBaseline,
} from "../../../scripts/quality/baseline-headroom.mjs";

test("headroomOf: lower-is-better counts", () => {
  assert.equal(headroomOf(400, 500, "down"), 0.2);
  assert.equal(headroomOf(500, 500, "down"), 0);
  assert.equal(headroomOf(550, 500, "down"), -0.1);
  assert.equal(headroomOf(0, 0, "down"), 1);
  assert.equal(headroomOf(3, 0, "down"), -1);
  assert.equal(headroomOf(null as unknown as number, 5, "down"), null);
});

test("headroomOf: higher-is-better percentages", () => {
  assert.ok(Math.abs(headroomOf(92.17, 76.81, "up")! - 0.2) < 0.001);
  assert.equal(headroomOf(76.81, 76.81, "up"), 0);
  assert.ok(headroomOf(70, 76.81, "up")! < 0);
});

test("statusOf: ok / warn / critical / unknown against the warn fraction", () => {
  assert.equal(statusOf(0.2), "ok");
  assert.equal(statusOf(0.1), "ok");
  assert.equal(statusOf(0.05), "warn");
  assert.equal(statusOf(0), "warn");
  assert.equal(statusOf(-0.01), "critical");
  assert.equal(statusOf(null), "unknown");
  assert.equal(statusOf(0.15, 0.2), "warn");
});

test("sumTypecheckBaseline ignores notes and non-numeric entries", () => {
  const sum = sumTypecheckBaseline({
    "src/a.ts": { TS2345: 2, TS2339: 1 },
    "src/b.ts": { TS2300: 4, note: "x" as unknown as number },
    _relax_velocity: "note" as unknown as Record<string, number>,
  });
  assert.equal(sum, 7);
});

test("fileSizeHeadroom reports the worst frozen file and the near-cap / over counts", () => {
  const frozen = { "a.ts": "1200", "b.ts": 1000, "c.ts": "500", _note: "ignored" };
  const loc = (f: string) => ({ "a.ts": 1150, "b.ts": 1001, "c.ts": 100 })[f] ?? null;
  const r = fileSizeHeadroom(frozen, loc, 0.1);
  assert.equal(r.measured, 3);
  assert.equal(r.over, 1); // b.ts 1001 > 1000
  assert.equal(r.nearCap, 1); // a.ts within 10%
  assert.equal(r.worst?.file, "b.ts");
  assert.ok(r.worst!.headroom < 0);
});

test("fileSizeHeadroom skips generated and vendored files (monitor-only exemption)", () => {
  assert.equal(isMonitorExemptFile("src/app/docs/lib/openapi.generated.ts"), true);
  assert.equal(
    isMonitorExemptFile("open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts"),
    true
  );
  assert.equal(isMonitorExemptFile("vendor/thing.ts"), true);
  assert.equal(isMonitorExemptFile("src/lib/generatedReport.ts"), false);
  assert.equal(isMonitorExemptFile("src/lib/vendorAdapter.ts"), false);

  const frozen = {
    "x.generated.ts": 100, // 0% headroom by construction — must not be the worst
    "open-sse/vendor/lib/big.ts": 1000,
    "real.ts": "1200",
  };
  const loc = (f: string) =>
    ({ "x.generated.ts": 100, "open-sse/vendor/lib/big.ts": 999, "real.ts": 900 })[f] ?? null;
  const r = fileSizeHeadroom(frozen, loc, 0.1);
  assert.equal(r.measured, 1); // only real.ts counted
  assert.equal(r.nearCap, 0);
  assert.equal(r.over, 0);
  assert.equal(r.worst?.file, "real.ts");
});

test("renderMarkdown lists every row with its status icon and flags the bad ones", () => {
  const md = renderMarkdown(
    [
      {
        id: "deadExports",
        direction: "down",
        live: 416,
        baseline: 500,
        headroom: 0.168,
        status: "ok",
        note: "",
      },
      {
        id: "fileSize",
        direction: "down",
        live: 1348,
        baseline: 1347,
        headroom: -0.001,
        status: "critical",
        note: "worst: g.ts",
      },
      {
        id: "complexity",
        direction: "down",
        live: null,
        baseline: 3218,
        headroom: null,
        status: "unknown",
        note: "measurement unavailable",
      },
    ],
    {
      policy: { since: "2026-08-30", relaxPct: 20, until: "4.0.0" },
      generatedAt: "2026-08-30T12:00:00.000Z",
    }
  );
  assert.match(md, /Velocity phase since 2026-08-30 \(relax 20%, until v4\.0\.0\)/);
  assert.match(md, /`deadExports` \| 416 \| 500 \| 16\.8% \| 🟢 ok/);
  assert.match(md, /`fileSize` \| 1348 \| 1347 \| -0\.1% \| 🔴 critical — worst: g\.ts/);
  assert.match(md, /`complexity` \| — \| 3218 \| — \| ⚪ unknown/);
  assert.match(md, /\*\*1 gate\(s\) need attention:\*\* `fileSize` \(critical\)/);
});
