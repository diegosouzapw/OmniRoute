import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const qualityDoc = "docs/architecture/QUALITY_GATES.md";
const checklistDoc = "docs/ops/RELEASE_CHECKLIST.md";
const read = (relative: string) => fs.readFileSync(path.join(root, relative), "utf8");
const hash = (text: string) => createHash("sha256").update(text).digest("hex");
const cycleRow = (text: string) =>
  text.split("\n").find((line) => /^\|\s*`check:cycles`\s*\|/.test(line));
const cycleCheckbox = (text: string) =>
  text.split("\n").find((line) => line.startsWith("- [ ] `npm run check:cycles"));

interface TranslationRecord {
  source_hash: string;
  target_hash: string;
}
interface TranslationState {
  sources: Record<string, { source_hash: string; locales: Record<string, TranslationRecord> }>;
}
const state: TranslationState = JSON.parse(read(".i18n-state.json"));
const config: { locales: { code: string }[]; docsExcluded?: string[] } = JSON.parse(
  read("config/i18n.json")
);
const locales = config.locales
  .map((locale) => locale.code)
  .filter((locale) => !(config.docsExcluded ?? ["en"]).includes(locale));

test("English cycle documentation distinguishes bare fail-closed from the CI ratchet", () => {
  assert(cycleRow(read(qualityDoc))?.includes("#15281"));
  assert(cycleCheckbox(read(checklistDoc))?.startsWith("- [ ] `npm run check:cycles:ratchet`"));
});

test("every published locale carries the reviewed bare-cycle contract and ratchet checklist", () => {
  const stale: string[] = [];
  for (const locale of locales) {
    if (!cycleRow(read(`docs/i18n/${locale}/${qualityDoc}`))?.includes("#15281")) {
      stale.push(`${locale}: bare-cycle contract`);
    }
    if (
      !cycleCheckbox(read(`docs/i18n/${locale}/${checklistDoc}`))?.startsWith(
        "- [ ] `npm run check:cycles:ratchet`"
      )
    ) {
      stale.push(`${locale}: ratchet checklist`);
    }
  }
  assert.equal(stale.length, 0, `Stale cycle mirrors: ${stale.slice(0, 8).join(", ")}`);
});

test("cycle mirror provenance covers the current sources and the actual translated bytes", () => {
  for (const relative of [qualityDoc, checklistDoc]) {
    const sourceHash = hash(read(relative));
    const entry = state.sources[relative];
    assert.equal(entry.source_hash, sourceHash, `stale source record: ${relative}`);
    for (const locale of locales) {
      const record = entry.locales[locale];
      assert(record, `missing translation record: ${relative} [${locale}]`);
      assert.equal(
        record.source_hash,
        sourceHash,
        `stale translated source: ${relative} [${locale}]`
      );
      assert.equal(record.target_hash, hash(read(`docs/i18n/${locale}/${relative}`)));
    }
  }
});
