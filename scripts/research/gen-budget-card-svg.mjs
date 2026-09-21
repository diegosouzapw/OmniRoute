#!/usr/bin/env node
// Generates the free-tier budget card from the per-model catalog, through the
// same function the docs gate and the dashboard use — never by parsing the data
// file with a regex (that silently skipped every row carrying an extra field).
// Run from the repo root:
//   node --import tsx/esm scripts/research/gen-budget-card-svg.mjs [--out path.svg]
import fs from "node:fs";
import { computeFreeModelTotals } from "../../open-sse/config/freeModelCatalog.ts";

const outIdx = process.argv.indexOf("--out");
if (outIdx >= 0 && !process.argv[outIdx + 1]) throw new Error("--out requires a path");
const OUT = outIdx >= 0 ? process.argv[outIdx + 1] : "docs/screenshots/free-tier-budget-card.svg";

const t = computeFreeModelTotals();
const STEADY_TYPES = new Set(["recurring-daily", "recurring-monthly", "keyless"]);
const fmt = (n) =>
  n >= 1e9
    ? (n / 1e9).toFixed(2) + "B"
    : n >= 1e6
      ? Math.round(n / 1e6) + "M"
      : Math.round(n / 1e3) + "K";

// One bar segment per steady pool (largest member), gated rows excluded like the headline.
const poolMap = new Map();
for (const r of t.perModel) {
  if (!STEADY_TYPES.has(r.freeType) || r.eligibilityGate) continue;
  const k = r.poolKey || `${r.provider}:${r.modelId}`;
  const cur = poolMap.get(k);
  if (!cur || r.monthlyTokens > cur.monthlyTokens) poolMap.set(k, r);
}
const pools = [...poolMap.values()]
  .filter((r) => r.monthlyTokens > 0)
  .sort((a, b) => b.monthlyTokens - a.monthlyTokens);
const steady = t.steadyRecurringTokens;
const firstMonth = t.firstMonthRealisticTokens;
const gated = t.gatedRecurringTokens;

const otMap = new Map();
for (const r of t.perModel) {
  // Gated rows are excluded here too — they are absent from firstMonthRealisticTokens.
  if (r.freeType !== "one-time-initial" || r.creditTokens <= 0 || r.eligibilityGate) continue;
  const k = r.poolKey || r.provider;
  otMap.set(k, { provider: r.provider, v: Math.max(otMap.get(k)?.v || 0, r.creditTokens) });
}
const oneTime = [...otMap.values()].sort((a, b) => b.v - a.v);
const oneTimeSum = oneTime.reduce((s, r) => s + r.v, 0);
const avoidProviders = new Set(t.perModel.filter((r) => r.tos === "avoid").map((r) => r.provider))
  .size;
const uncappedProviders = t.uncappedProviders;

const GRID = pools.slice(0, 28);
const STRIP = oneTime.slice(0, 9);
const PAL = [
  "#6c5ce7",
  "#00b894",
  "#0984e3",
  "#e17055",
  "#fdcb6e",
  "#e84393",
  "#00cec9",
  "#d63031",
  "#a29bfe",
  "#55efc4",
  "#74b9ff",
  "#ffeaa7",
  "#fab1a0",
  "#81ecec",
];
const color = (i) => PAL[i % PAL.length];
const cleanName = (r) =>
  (r.displayName || r.provider)
    .replace(/\s*\(.*$/, "")
    .replace(/ —.*$/, "")
    .slice(0, 24);

const BAR_X = 32,
  BAR_W = 836,
  MIN = 7;
const extra = BAR_W - MIN * GRID.length;
let bx = BAR_X;
const segs = GRID.map((r, i) => {
  const w = MIN + (r.monthlyTokens / steady) * extra;
  const s = { x: bx, w, c: color(i) };
  bx += w;
  return s;
});

const B = [];
B.push(
  `<text x="32" y="50" fill="#e6edf3" font-size="18" font-weight="700">Monthly free-token budget</text>`
);
B.push(
  `<text x="868" y="50" fill="#7d8590" font-size="13" text-anchor="end">${pools.length} free pools · ${t.modelCount} models · one endpoint</text>`
);
const stat = (sx, label, val, vc) => {
  B.push(`<text x="${sx}" y="84" fill="#7d8590" font-size="11.5">${label}</text>`);
  B.push(`<text x="${sx}" y="114" fill="${vc}" font-size="27" font-weight="800">${val}</text>`);
};
stat(32, "Steady / month", `~${fmt(steady)}`, "#e6edf3");
stat(330, "First month (+ signup credits)", `~${fmt(firstMonth)}`, "#3fb950");
stat(700, "ToS-flagged (you decide)", `${avoidProviders} providers`, "#d29922");
B.push(
  `<clipPath id="bar"><rect x="${BAR_X}" y="132" width="${BAR_W}" height="16" rx="8"/></clipPath>`
);
B.push(
  `<g clip-path="url(#bar)"><rect x="${BAR_X}" y="132" width="${BAR_W}" height="16" fill="#21262d"/>`
);
for (const s of segs)
  B.push(
    `<rect x="${s.x.toFixed(1)}" y="132" width="${(s.w + 0.6).toFixed(1)}" height="16" fill="${s.c}"/>`
  );
B.push(`</g>`);
B.push(
  `<text x="32" y="172" fill="#7d8590" font-size="12">Each segment = one free pool · widths floored so every provider shows · honest numbers in the grid.</text>`
);
const COLS = 4,
  COLW = 213,
  GX = 32,
  GY = 200,
  RH = 30;
GRID.forEach((r, i) => {
  const col = i % COLS,
    row = (i / COLS) | 0;
  const cx = GX + col * COLW,
    cy = GY + row * RH;
  B.push(`<circle cx="${cx + 5}" cy="${cy - 4}" r="5" fill="${color(i)}"/>`);
  B.push(
    `<text x="${cx + 16}" y="${cy}" fill="#c9d1d9" font-size="12.5">${cleanName(r)} <tspan fill="#7d8590">${fmt(r.monthlyTokens)}</tspan></text>`
  );
});
let y = GY + Math.ceil(GRID.length / COLS) * RH + 6;
B.push(`<line x1="32" y1="${y}" x2="868" y2="${y}" stroke="#30363d"/>`);
y += 26;
B.push(
  `<text x="32" y="${y}" fill="#3fb950" font-size="13" font-weight="700">+ First month: one-time signup credits (~${fmt(oneTimeSum)})</text>`
);
y += 24;
let sxp = 32;
for (const r of STRIP) {
  const label = `${r.provider} ${fmt(r.v)}`;
  const w = 16 + label.length * 6.7;
  if (sxp + w > 862) {
    sxp = 32;
    y += 30;
  }
  B.push(
    `<rect x="${sxp.toFixed(0)}" y="${(y - 15).toFixed(0)}" width="${w.toFixed(0)}" height="22" rx="11" fill="#13311f" stroke="#238636"/>`
  );
  B.push(
    `<text x="${(sxp + w / 2).toFixed(0)}" y="${y.toFixed(0)}" fill="#7ee787" font-size="11.5" text-anchor="middle">${label}</text>`
  );
  sxp += w + 8;
}
y += 26;
const noteH = gated > 0 ? 48 : 34;
B.push(
  `<rect x="32" y="${y}" width="836" height="${noteH}" rx="8" fill="#1c2230" stroke="#30363d"/>`
);
B.push(
  `<text x="46" y="${(y + 14).toFixed(0)}" fill="#7d8590" font-size="12">Pool-deduped, honest counting — no inflated rate-limit ceilings. Some terms suggest personal-use only; we flag them so you decide.</text>`
);
B.push(
  `<text x="46" y="${(y + 28).toFixed(0)}" fill="#7d8590" font-size="11.5">+ ${uncappedProviders.length} permanently-free, no-cap providers (e.g. ${uncappedProviders.slice(0, 3).join(", ")}) · OpenRouter $10 → +${fmt(t.boostMonthlyTokens)}/mo.</text>`
);
if (gated > 0) {
  B.push(
    `<text x="46" y="${(y + 42).toFixed(0)}" fill="#d29922" font-size="11.5">+ ~${fmt(gated)} behind regional identity verification (${t.gatedProviders.join(", ")}) — real quota, never in the headline.</text>`
  );
}
y += noteH;
const H = y + 24;
const CANVAS = H + 16;

const out = [];
out.push(
  `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="${CANVAS}" viewBox="0 0 900 ${CANVAS}" font-family="-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">`
);
out.push(`<rect width="900" height="${CANVAS}" rx="16" fill="#0d1117"/>`);
out.push(`<rect x="16" y="16" width="868" height="${H}" rx="13" fill="#161b22" stroke="#30363d"/>`);
out.push(
  `<text x="868" y="${(H + 8).toFixed(0)}" fill="#484f58" font-size="10.5" text-anchor="end">OmniRoute · /dashboard/free-tiers · preview mockup</text>`
);
out.push(...B);
out.push(`</svg>`);
fs.writeFileSync(OUT, out.join("\n") + "\n");
console.log(
  `SVG → ${OUT}: ${GRID.length} pools, ${STRIP.length} first-month chips, canvas ${CANVAS}px. steady=${fmt(steady)} firstMonth=${fmt(firstMonth)} gated=${fmt(gated)} oneTime=${fmt(oneTimeSum)}`
);
