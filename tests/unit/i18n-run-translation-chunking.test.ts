import test from "node:test";
import assert from "node:assert/strict";
import { chunkMarkdown, joinTranslatedChunks } from "../../scripts/i18n/run-translation.mjs";

// The docs translator splits a page into chunks so one upstream call stays
// short. It used to break only on `## ` headings, so a single long section
// (README.md carries a 16 KB one, USER_GUIDE.md a 20 KB one) became one
// oversized request that the slow fallback model could not answer inside the
// backend's 10-minute fetch timeout — the three biggest docs of every locale
// then failed with "fetch failed" on every retry.

const para = (label: string, n = 12) =>
  Array.from({ length: n }, (_, i) => `${label} sentence ${i + 1} with some filler text.`).join(
    " "
  );

test("a section longer than maxChars is split on sub-headings and paragraphs", () => {
  const body = [
    "## Big",
    para("a"),
    "",
    "### Part one",
    para("b"),
    "",
    para("c"),
    "",
    "### Part two",
    para("d"),
  ].join("\n");
  const chunks = chunkMarkdown(body, 700);
  assert.ok(chunks.length > 1, "must split an oversized section");
  for (const chunk of chunks) assert.ok(chunk.length <= 700, `chunk too big: ${chunk.length}`);
  // Nothing lost: re-joining with blank lines reproduces every line of the source.
  const lines = (s: string) => s.split("\n").filter((l) => l.trim() !== "");
  assert.deepEqual(lines(chunks.join("\n\n")), lines(body));
});

test("never splits inside a fenced code block", () => {
  const code = [
    "```ts",
    ...Array.from({ length: 30 }, (_, i) => `const v${i} = ${i};`),
    "```",
  ].join("\n");
  const body = ["## Code", para("x"), "", code, "", para("y")].join("\n");
  const chunks = chunkMarkdown(body, 500);
  const withFence = chunks.filter((c) => c.includes("```"));
  for (const chunk of withFence) {
    assert.equal(
      (chunk.match(/```/g) ?? []).length % 2,
      0,
      "fence must open and close in the same chunk"
    );
  }
});

test("keeps the old behaviour for short pages and for normal ## sections", () => {
  assert.deepEqual(chunkMarkdown("# Title\n\nshort", 6000), ["# Title\n\nshort"]);
  const body = ["## A", para("a", 4), "", "## B", para("b", 4), "", "## C", para("c", 4)].join(
    "\n"
  );
  const chunks = chunkMarkdown(body, 400);
  assert.ok(chunks.every((c) => c.length <= 400));
  assert.ok(chunks.length > 1);
  for (const chunk of chunks.slice(1)) assert.match(chunk, /^## /, "cuts land on ## boundaries");
});

// PROVIDER_REFERENCE.md carries a 244-row table (40 KB) with no blank line in
// it, so the paragraph splitter kept it as one block and the request for a
// verbose script (Greek: 40 KB in, ~48 KB out) outlived the upstream socket —
// "fetch failed" on every attempt while every other file of the locale passed.
const row = (i: number) =>
  `| p${i} | alias${i} | Provider ${i} | tag | https://p${i}.example | notes |`;

test("an oversized table block is split at row boundaries, never inside a row", () => {
  const table = [
    "| ID | Alias | Name | Tags | Website | Notes |",
    "| --- | --- | --- | --- | --- | --- |",
  ]
    .concat(Array.from({ length: 40 }, (_, i) => row(i)))
    .join("\n");
  const body = `## Providers\n\n${table}\n`;
  const chunks = chunkMarkdown(body, 900);
  assert.ok(chunks.length > 3, `expected several chunks, got ${chunks.length}`);
  for (const chunk of chunks) {
    assert.ok(chunk.length <= 900, `chunk of ${chunk.length} chars exceeds maxChars`);
    for (const line of chunk.split("\n").filter((l) => l.startsWith("|"))) {
      assert.ok(line.endsWith("|"), `row cut in half: ${line}`);
    }
  }
  assert.equal(joinTranslatedChunks(chunks).trim(), body.trim());
});

test("joinTranslatedChunks keeps a blank line between non-table chunks", () => {
  assert.equal(joinTranslatedChunks(["## A\ntext", "## B\nmore"]), "## A\ntext\n\n## B\nmore");
  assert.equal(joinTranslatedChunks(["| a | b |", "| c | d |"]), "| a | b |\n| c | d |");
});

test("an oversized tight bullet list is split between items, continuation lines stay attached", () => {
  const items = Array.from(
    { length: 30 },
    (_, i) =>
      `- **\`p${i}\`** — shipped note says one thing, reality shows another for provider ${i}.\n  continued detail line ${i}`
  );
  const body = `## Notes\n\n${items.join("\n")}\n`;
  const chunks = chunkMarkdown(body, 900);
  assert.ok(chunks.length > 3, `expected several chunks, got ${chunks.length}`);
  for (const chunk of chunks) {
    assert.ok(chunk.length <= 900, `chunk of ${chunk.length} chars exceeds maxChars`);
    assert.ok(!/^\s+continued/.test(chunk), "a chunk must not start with a continuation line");
  }
  assert.equal(joinTranslatedChunks(chunks).trim(), body.trim());
});
