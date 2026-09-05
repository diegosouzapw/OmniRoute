#!/usr/bin/env node
// Checks the canonical provider order stays single-sourced.
//
// STRICT (blocking, exit 1): the order derivation exists exactly once
//   (canonicalProviderOrder.ts); catalogOrder.ts and comboSort.ts re-export it
//   (grep-negative for a local Object.keys(OAUTH derivation); re-export present);
//   the xao alias stays declared under xai-oauth; the unknown-provider contract
//   (?? Infinity + codeUnitCompare) stays live.
// INFORMATIVE (warn only, always exit 0): dashboard quota ranks in
//   ProviderLimits/constants.ts are a separate display order — a registry id
//   missing there is fine when the provider has no quota surface.
// Run: node scripts/check/check-provider-order-sync.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.error(`[provider-order-sync] FAIL ${msg}`);
};

// 1+2. Leaf uniqueness.
for (const f of [
  "src/app/api/v1/models/catalogOrder.ts",
  "src/lib/combos/comboSort.ts",
]) {
  if (read(f).includes("Object.keys(OAUTH")) {
    fail(`${f} defines its own order derivation (import the leaf instead)`);
  }
}
// 3. xao alias form.
const oauth = read("src/shared/constants/providers/oauth.ts");
if (!/"xai-oauth":\s*\{[^}]*alias:\s*"xao"/s.test(oauth)) {
  fail(`oauth.ts: "xai-oauth" entry lost its alias:"xao"`);
}
// 4. Unknown contract alive.
if (!read("src/shared/constants/canonicalProviderOrder.ts").includes("?? Infinity")) {
  fail(`canonicalProviderOrder.ts lost the ?? Infinity unknown contract`);
}
if (!read("src/app/api/v1/models/catalogOrder.ts").includes("codeUnitCompare")) {
  fail(`catalogOrder.ts lost the codeUnitCompare unknown-branch`);
}
// 5. Re-export intact.
if (!read("src/lib/combos/comboSort.ts").includes("CANONICAL_PROVIDER_ORDER as PROVIDER_ORDER")) {
  fail(`comboSort.ts lost the PROVIDER_ORDER re-export`);
}

// Informative dashboard check (never fails).
try {
  const dash = read(
    "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts"
  );
  const ids = new Set();
  // NOTE: apikey/index.ts is a barrel (imports + spreads, zero literal entries),
  // so glob the family files instead.
  const apikeyFiles = fs
    .readdirSync(path.join(ROOT, "src/shared/constants/providers/apikey"))
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts"))
    .map((f) => `src/shared/constants/providers/apikey/${f}`);
  for (const f of [
    "src/shared/constants/providers/oauth.ts",
    "src/shared/constants/providers/noauth.ts",
    ...apikeyFiles,
  ]) {
    let src;
    try {
      src = read(f);
    } catch {
      continue;
    }
    for (const m of src.matchAll(/^  "([^"]+)": \{$/gm)) ids.add(m[1]);
  }
  for (const id of [...ids].sort()) {
    if (!dash.includes(`"${id}"`) && !dash.includes(`${id}:`)) {
      console.log(`[provider-order-sync] warn: ${id} has no dashboard quota rank (ok if no quota surface)`);
    }
  }
} catch (e) {
  console.log(`[provider-order-sync] warn: dashboard check skipped (${String(e).slice(0, 120)})`);
}

if (failures > 0) {
  process.exit(1);
}
console.log("[provider-order-sync] OK — single source + alias form + unknown contract");
