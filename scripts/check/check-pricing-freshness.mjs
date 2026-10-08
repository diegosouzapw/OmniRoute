#!/usr/bin/env node
// STRICT gate: KNOWN_MODEL_PRICING must have been touched within PRICING_STALE_AFTER_DAYS,
// or tiers silently drift from real prices. Exits 1 on stale, 0 on fresh.
// Run: node scripts/check/check-pricing-freshness.mjs
import { execFileSync } from "node:child_process";

const PRICING_STALE_AFTER_DAYS = 90;
const TARGET = "open-sse/services/providerCostData.ts";

function lastTouchDays() {
  const out = execFileSync("git", ["log", "--follow", "-1", "--format=%ct", "--", TARGET], {
    encoding: "utf8",
  }).trim();
  const touched = Number(out);
  if (!Number.isFinite(touched) || touched <= 0) return Infinity;
  return (Date.now() / 1000 - touched) / 86400;
}

const days = lastTouchDays();
if (days > PRICING_STALE_AFTER_DAYS) {
  console.error(
    `STALE: ${TARGET} untouched for ${Math.floor(days)}d (> ${PRICING_STALE_AFTER_DAYS}d) — refresh prices or bump the gate with justification`
  );
  process.exit(1);
}
console.log(`pricing fresh: ${TARGET} touched ${Math.floor(days)}d ago`);
