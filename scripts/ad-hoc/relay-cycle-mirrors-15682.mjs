// One-shot mechanical propagation of the two reviewed #15682 cycle contracts.
// No translation backend, blanket adoption, gate changes, or source-file writes.
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import * as prettier from "prettier";
import { z } from "zod";
import { sectionHashes, splitSections, stripTopHeading } from "../i18n/run-translation.mjs";

const base = "b0d53251b30b0ad556c3e33bc8c9cc42d84372e9";
const root = process.cwd();
const statePath = path.join(root, ".i18n-state.json");
const state = JSON.parse(await fs.readFile(statePath, "utf8"));
const sha = (value) => createHash("sha256").update(value).digest("hex");
const now = new Date().toISOString();
const changes = [];
const localeCode = z.string().regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/);
const specs = [
  {
    rel: "docs/architecture/QUALITY_GATES.md",
    matches: (line) => /^\|\s*`check:cycles`\s*\|/.test(line),
    expected: "Bare exits 1 whenever any cycle exists (fail-closed since #15281)",
    rewrite(line) {
      const firstCellEnd = line.indexOf("|", 1);
      const lastCellStart = line.lastIndexOf("|", line.length - 2);
      const ratchet = line.indexOf("`check:cycles:ratchet`");
      assert(
        ratchet > firstCellEnd && ratchet < lastCellStart,
        "missing localized ratchet description"
      );
      // Technical notation is locale-neutral; preserve the entire localized
      // ratchet description, blocking column and the existing table width.
      const description = `\`src/\` + \`open-sse/\`; AST (\`import\` / \`export\`, tsconfig \`paths\`). \`check:cycles\`: \`cycles > 0 → exit 1\`; \`SCC → stderr\` (#15281). ${line.slice(ratchet, lastCellStart).trimEnd()}`;
      const width = prettier.util.getStringWidth(line.slice(firstCellEnd + 1, lastCellStart));
      const spaces = width - prettier.util.getStringWidth(description) - 1;
      assert(spaces >= 1, "new description would widen the translated table");
      return `${line.slice(0, firstCellEnd + 1)} ${description}${" ".repeat(spaces)}${line.slice(lastCellStart)}`;
    },
  },
  {
    rel: "docs/ops/RELEASE_CHECKLIST.md",
    matches: (line) => line.startsWith("- [ ] `npm run check:cycles"),
    expected: "within the frozen `metrics.cycles` ceiling",
    rewrite(line) {
      assert(line.startsWith("- [ ] `npm run check:cycles`"), "unexpected prior command");
      return "- [ ] `npm run check:cycles:ratchet` — `cycles ≤ metrics.cycles.value` (`quality-baseline.json`; `check:cycles`: `cycles > 0 → exit 1`, #15281)";
    },
  },
];

for (const spec of specs) {
  const previous = execFileSync("git", ["show", `${base}:${spec.rel}`], {
    encoding: "utf8",
    maxBuffer: 4 * 1024 * 1024,
  });
  const current = await fs.readFile(path.join(root, spec.rel), "utf8");
  const beforeLines = previous.split("\n");
  const afterLines = current.split("\n");
  assert.equal(beforeLines.length, afterLines.length, "unexpected source restructuring");
  const changed = afterLines.flatMap((line, i) => (line === beforeLines[i] ? [] : [i]));
  assert.equal(changed.length, 1, "refuse to adopt unrelated source changes");
  assert(spec.matches(beforeLines[changed[0]]) && spec.matches(afterLines[changed[0]]));
  assert(afterLines[changed[0]].includes(spec.expected));
  const entry = state.sources[spec.rel];
  assert.equal(entry.source_hash, sha(previous), "source provenance is not the reviewed base");
  assert.equal(Object.keys(entry.locales).length, 66, "unexpected locale coverage");
  const currentSourceHash = sha(current);
  const hashes = sectionHashes(splitSections(stripTopHeading(current)));
  for (const [locale, info] of Object.entries(entry.locales)) {
    localeCode.parse(locale); // Never allow a state key to escape docs/i18n/.
    assert.equal(info.source_hash, sha(previous), "locale already has different source provenance");
    const target = path.join(root, "docs", "i18n", locale, spec.rel);
    const oldText = await fs.readFile(target, "utf8");
    assert.equal(sha(oldText), info.target_hash, `unexpected concurrent target edit: ${locale}`);
    const lines = oldText.split("\n");
    const matches = lines.flatMap((line, i) => (spec.matches(line) ? [i] : []));
    assert.equal(matches.length, 1, `ambiguous mirror contract: ${locale}`);
    lines[matches[0]] = spec.rewrite(lines[matches[0]]);
    const content = lines.join("\n");
    // Avoid parsing two entire large tables per locale for a one-line edit.
    // Check representative scripts against the real formatter here; normal
    // lint-staged still formats EVERY changed mirror before the commit.
    if (["pt-BR", "ja", "ar"].includes(locale)) {
      const options = { ...(await prettier.resolveConfig(target)), filepath: target };
      assert.equal(
        await prettier.format(content, options),
        content,
        `formatting mismatch: ${locale}`
      );
    }
    assert.notEqual(content, oldText, "mirror contract was not updated");
    changes.push({ target, content });
    entry.locales[locale] = {
      ...info,
      source_hash: currentSourceHash,
      target_hash: sha(content),
      section_hashes: hashes,
      updated_at: now,
    };
  }
  entry.source_hash = currentSourceHash;
  console.error(`Prepared ${spec.rel}: ${Object.keys(entry.locales).length} verified mirrors`);
}

assert.equal(changes.length, 132);
const serialized = await prettier.format(JSON.stringify(state), {
  ...(await prettier.resolveConfig(statePath)),
  filepath: statePath,
});
if (process.argv.includes("--apply")) {
  // All preconditions for all mirrors were checked before the first write.
  for (const { target, content } of changes) await fs.writeFile(target, content);
  await fs.writeFile(statePath, serialized);
}
console.log(
  JSON.stringify({
    apply: process.argv.includes("--apply"),
    mirrors: changes.length,
    sourceRecords: specs.length,
    translationCalls: 0,
  })
);
