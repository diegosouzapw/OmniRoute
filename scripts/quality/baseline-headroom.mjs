// scripts/quality/baseline-headroom.mjs
// Baseline headroom monitor (velocity phase, 2026-08-30 → v4.0).
//
// The ratchet gates only speak when a baseline is CROSSED. During the velocity phase the
// baselines were loosened by 20% on purpose, so the interesting question is no longer
// "did we regress?" but "how much of the loosened budget is already consumed, and how
// fast?". This script measures every numeric ratchet the same way its gate does, compares
// it with the frozen baseline and prints the remaining headroom per gate.
//
//   headroom = (baseline − live) / baseline   for lower-is-better counts
//   headroom = (live − baseline) / baseline   for higher-is-better percentages
//
//   status: ok        headroom ≥ --warn (default 10%)
//           warn      0 ≤ headroom < --warn     → the next few PRs will trip the gate
//           critical  headroom < 0              → the gate is already red on this tip
//
// Runs nightly (nightly-release-green.yml → baseline-headroom job) and posts the table to
// the issue "📈 Baseline headroom". Locally:
//   node scripts/quality/baseline-headroom.mjs                 # table on stdout
//   node scripts/quality/baseline-headroom.mjs --json out.json --md out.md
//   node scripts/quality/baseline-headroom.mjs --only deadExports,fileSize
//   node scripts/quality/baseline-headroom.mjs --strict        # exit 1 on any critical
// Heavy measurements (knip, tsc, eslint) take a few minutes each; --only keeps it cheap.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const Q = (f) => path.join(ROOT, "config", "quality", f);
const readJson = (f) => JSON.parse(fs.readFileSync(Q(f), "utf8"));

// ── pure helpers (unit-tested) ───────────────────────────────────────────────

/**
 * Headroom of one gate as a fraction of its baseline (can be negative = over budget).
 * @param {number} live
 * @param {number} baseline
 * @param {"down"|"up"} direction  "down" = lower is better (counts), "up" = higher is better (%)
 */
export function headroomOf(live, baseline, direction) {
  if (!Number.isFinite(live) || !Number.isFinite(baseline)) return null;
  if (baseline === 0) return direction === "down" ? (live === 0 ? 1 : -1) : live >= 0 ? 0 : -1;
  return direction === "down" ? (baseline - live) / baseline : (live - baseline) / baseline;
}

/** @returns {"ok"|"warn"|"critical"|"unknown"} */
export function statusOf(headroom, warnFraction = 0.1) {
  if (headroom === null || headroom === undefined) return "unknown";
  if (headroom < 0) return "critical";
  if (headroom < warnFraction) return "warn";
  return "ok";
}

/** Sum of every per-file / per-TS-code count in a typecheck baseline (notes ignored). */
export function sumTypecheckBaseline(json) {
  let n = 0;
  for (const [file, codes] of Object.entries(json)) {
    if (file.startsWith("_") || !codes || typeof codes !== "object") continue;
    for (const c of Object.values(codes)) if (typeof c === "number") n += c;
  }
  return n;
}

// Files whose size is not an editable-code signal: generated modules are frozen at
// their emitter's exact output size (≈0% headroom by construction — growth is policed
// by re-freezing, e.g. openapi.generated.ts in #12212), and vendored code is upstream's.
// The GATE (check:file-size) still enforces both; only the monitor skips them so the
// nightly headroom-alert reflects files a human can actually slim.
export function isMonitorExemptFile(file) {
  return file.includes(".generated.") || /(^|\/)vendor\//.test(file);
}

/**
 * Frozen-file headroom: the worst (most consumed) frozen file and how many sit within
 * `warnFraction` of their cap. `locOf(file)` returns the live line count or null.
 * Generated/vendored files are excluded (see isMonitorExemptFile).
 */
export function fileSizeHeadroom(frozen, locOf, warnFraction = 0.1) {
  let worst = null;
  let nearCap = 0;
  let over = 0;
  let measured = 0;
  for (const [file, capRaw] of Object.entries(frozen)) {
    if (file.startsWith("_") || isMonitorExemptFile(file)) continue;
    const cap = Number(capRaw);
    const loc = locOf(file);
    if (!Number.isFinite(cap) || loc === null || loc === undefined) continue;
    measured++;
    const h = headroomOf(loc, cap, "down");
    if (h < 0) over++;
    else if (h < warnFraction) nearCap++;
    if (!worst || h < worst.headroom) worst = { file, loc, cap, headroom: h };
  }
  return { measured, nearCap, over, worst };
}

/** Render the markdown table the nightly job posts. */
export function renderMarkdown(rows, { policy, generatedAt = new Date().toISOString() } = {}) {
  const icon = { ok: "🟢", warn: "🟡", critical: "🔴", unknown: "⚪" };
  const lines = [
    `## 📈 Baseline headroom — ${generatedAt.slice(0, 16).replace("T", " ")}Z`,
    "",
    policy
      ? `Velocity phase since ${policy.since} (relax ${policy.relaxPct}%, until v${policy.until}). ` +
        `Headroom = budget still free before the gate turns red.`
      : "No velocity policy in quality-baseline.json (normal ratchet mode).",
    "",
    "| gate | live | baseline | headroom | status |",
    "|---|---:|---:|---:|:--:|",
    ...rows.map(
      (r) =>
        `| \`${r.id}\` | ${fmt(r.live)} | ${fmt(r.baseline)} | ${
          r.headroom === null ? "—" : `${(r.headroom * 100).toFixed(1)}%`
        } | ${icon[r.status]} ${r.status}${r.note ? ` — ${r.note}` : ""} |`
    ),
    "",
  ];
  const bad = rows.filter((r) => r.status === "critical" || r.status === "warn");
  lines.push(
    bad.length
      ? `**${bad.length} gate(s) need attention:** ${bad.map((r) => `\`${r.id}\` (${r.status})`).join(", ")}.`
      : "**All measured gates have ≥ warn headroom.**"
  );
  return lines.join("\n") + "\n";
}

function fmt(v) {
  if (v === null || v === undefined) return "—";
  return Number.isInteger(v) ? String(v) : Number(v).toFixed(2);
}

// ── measurements ─────────────────────────────────────────────────────────────

function runAndMatch(script, regex, { timeoutMs = 20 * 60 * 1000, args = [] } = {}) {
  let out = "";
  try {
    out = execFileSync(process.execPath, [path.join(ROOT, script), ...args], {
      cwd: ROOT,
      encoding: "utf8",
      timeout: timeoutMs,
      maxBuffer: 64 * 1024 * 1024,
      env: { ...process.env, FORCE_COLOR: "0" },
      stdio: ["ignore", "pipe", "pipe"],
    });
  } catch (err) {
    // A red gate exits 1 but still prints its measurement — keep reading.
    out = `${err.stdout || ""}\n${err.stderr || ""}`;
  }
  const m = out.match(regex);
  return m ? Number(m[1]) : null;
}

function countLines(file) {
  try {
    const text = fs.readFileSync(path.join(ROOT, file), "utf8");
    return text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  } catch {
    return null;
  }
}

/** Gate manifest — one entry per numeric ratchet the CI enforces. */
export function buildManifest() {
  const qb = readJson("quality-baseline.json");
  const m = qb.metrics || {};
  const val = (k) => (m[k] && typeof m[k].value === "number" ? m[k].value : null);
  return [
    {
      id: "deadExports",
      direction: "down",
      baseline: () => val("deadExports"),
      measure: () => runAndMatch("scripts/check/check-dead-code.mjs", /DEAD_TOTAL=(\d+)/),
    },
    {
      id: "apiTypecheck",
      direction: "down",
      baseline: () => sumTypecheckBaseline(readJson("api-typecheck-baseline.json")),
      measure: () =>
        runAndMatch("scripts/check/check-api-typecheck.mjs", /apiTypecheckErrors=(\d+)/),
    },
    {
      id: "dashboardTypecheck",
      direction: "down",
      baseline: () => sumTypecheckBaseline(readJson("dashboard-typecheck-baseline.json")),
      measure: () =>
        runAndMatch(
          "scripts/check/check-dashboard-typecheck.mjs",
          /dashboardTypecheckErrors=(\d+)/
        ),
    },
    {
      id: "openSseTypecheck",
      direction: "down",
      baseline: () => sumTypecheckBaseline(readJson("open-sse-typecheck-baseline.json")),
      measure: () =>
        runAndMatch("scripts/check/check-open-sse-typecheck.mjs", /openSseTypecheckErrors=(\d+)/),
    },
    {
      id: "cognitiveComplexity",
      direction: "down",
      baseline: () => val("cognitiveComplexity"),
      measure: () =>
        runAndMatch("scripts/check/check-cognitive-complexity.mjs", /cognitiveComplexity=(\d+)/),
    },
    {
      id: "complexity",
      direction: "down",
      baseline: () => readJson("complexity-baseline.json").count,
      measure: () => runAndMatch("scripts/check/check-complexity.mjs", /(\d+) violaç/),
    },
    {
      id: "duplicationPct",
      direction: "down",
      baseline: () => readJson("duplication-baseline.json").percentage,
      measure: () => runAndMatch("scripts/check/check-duplication.mjs", /(\d+(?:\.\d+)?)%/),
    },
    {
      id: "rtlPhysicalClasses",
      direction: "down",
      baseline: () => val("rtlPhysicalClasses"),
      measure: () => runAndMatch("scripts/check/check-rtl-ratchet.mjs", /rtlPhysicalClasses=(\d+)/),
    },
    {
      id: "typeCoveragePct",
      direction: "up",
      baseline: () => val("typeCoveragePct"),
      measure: () =>
        runAndMatch("scripts/check/check-type-coverage.mjs", /typeCoveragePct=(\d+(?:\.\d+)?)/),
    },
    {
      id: "fileSize",
      direction: "down",
      // Reported as the WORST frozen file: live = its lines, baseline = its cap.
      baseline: () => null,
      measure: () => null,
      custom: (warnFraction) => {
        const fsz = readJson("file-size-baseline.json");
        const r = fileSizeHeadroom(fsz.frozen || {}, countLines, warnFraction);
        const t = fileSizeHeadroom(fsz.testFrozen || {}, countLines, warnFraction);
        const worst = [r.worst, t.worst].filter(Boolean).sort((a, b) => a.headroom - b.headroom)[0];
        return {
          live: worst ? worst.loc : null,
          baseline: worst ? worst.cap : null,
          headroom: worst ? worst.headroom : null,
          note: worst
            ? `worst: ${worst.file}; ${r.nearCap + t.nearCap} file(s) within warn, ${r.over + t.over} over (${r.measured + t.measured} frozen)`
            : "no frozen files measured",
        };
      },
    },
  ];
}

export function collect({ only = null, warnFraction = 0.1, manifest = buildManifest() } = {}) {
  const rows = [];
  for (const gate of manifest) {
    if (only && !only.includes(gate.id)) continue;
    let live = null;
    let baseline = null;
    let headroom = null;
    let note = "";
    try {
      if (gate.custom) {
        ({ live, baseline, headroom, note } = gate.custom(warnFraction));
      } else {
        baseline = gate.baseline();
        live = gate.measure();
        headroom = headroomOf(live, baseline, gate.direction);
        if (live === null) note = "measurement unavailable";
      }
    } catch (err) {
      note = `error: ${err && err.message ? err.message.split("\n")[0] : err}`;
    }
    rows.push({
      id: gate.id,
      direction: gate.direction,
      live,
      baseline,
      headroom,
      status: statusOf(headroom, warnFraction),
      note,
    });
  }
  return rows;
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function main() {
  const argv = process.argv.slice(2);
  const getArg = (n, d) => {
    const i = argv.indexOf(n);
    return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : d;
  };
  const warnFraction = Number(getArg("--warn", "10")) / 100;
  const only =
    getArg("--only", null)
      ?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? null;
  const jsonOut = getArg("--json", null);
  const mdOut = getArg("--md", null);
  const strict = argv.includes("--strict");

  const qb = readJson("quality-baseline.json");
  const rows = collect({ only, warnFraction });
  const md = renderMarkdown(rows, { policy: qb._policy || null });
  process.stdout.write(md);
  if (jsonOut) {
    fs.mkdirSync(path.dirname(jsonOut), { recursive: true });
    fs.writeFileSync(
      jsonOut,
      JSON.stringify(
        { generatedAt: new Date().toISOString(), policy: qb._policy || null, warnFraction, rows },
        null,
        2
      ) + "\n"
    );
  }
  if (mdOut) {
    fs.mkdirSync(path.dirname(mdOut), { recursive: true });
    fs.writeFileSync(mdOut, md);
  }
  const critical = rows.filter((r) => r.status === "critical").length;
  if (strict && critical) process.exit(1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main();
}
