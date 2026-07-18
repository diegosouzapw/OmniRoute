// ABOUTME: Guard test — the 4 dashboard files translated in #6761/#6768 must stay free of
// ABOUTME: hardcoded Portuguese UI strings (regression guard for the i18n cleanup).
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

// Files cleaned of hardcoded Portuguese in #6769 (issues #6761, #6768).
const FILES = [
  "src/app/(dashboard)/dashboard/compression/studio/CompareView.tsx",
  "src/app/(dashboard)/dashboard/compression/studio/PlaygroundInput.tsx",
  "src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx",
  "src/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion.tsx",
];

// Portuguese-only words that appeared as hardcoded UI copy before the fix.
// Distinct from English + from shared tech terms, so a hit means real PT regression.
const PT_MARKERS = [
  "Retenção",
  "Fidelidade",
  "Compressão",
  "Proteger conteúdo",
  "delegada ao provedor",
  "Deixa o próprio provedor",
  "Hoje disponível apenas",
  "Técnicas:",
  "Não afeta",
  "reescrevemos",
];

for (const rel of FILES) {
  test(`no hardcoded Portuguese in ${rel}`, () => {
    const src = readFileSync(join(repoRoot, rel), "utf8");
    const hits = PT_MARKERS.filter((m) => src.includes(m));
    assert.deepEqual(
      hits,
      [],
      `Hardcoded Portuguese found in ${rel}: ${hits.join(", ")} — translate to English or route through t().`
    );
  });
}
