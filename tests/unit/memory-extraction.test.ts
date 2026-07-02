import test from "node:test";
import assert from "node:assert/strict";

const { extractFactsFromText, extractFacts } = await import("../../src/lib/memory/extraction.ts");

// ─── extractFactsFromText: Preferences ─────────────────────────────────────

test("extractFactsFromText: detects 'I prefer' preference", () => {
  const facts = extractFactsFromText("I prefer dark mode in my editor.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref, "Should extract a preference fact");
  assert.ok(pref.content.toLowerCase().includes("dark mode"));
  assert.equal(pref.type, "factual");
});

test("extractFactsFromText: detects 'I like' preference", () => {
  const facts = extractFactsFromText("I like TypeScript over JavaScript.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(pref.content.toLowerCase().includes("typescript"));
});

test("extractFactsFromText: detects 'my favorite is' preference", () => {
  const facts = extractFactsFromText("My favorite is VS Code for editing.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(pref.content.toLowerCase().includes("vs code"));
});

test("extractFactsFromText: detects negative preference (I don't like)", () => {
  const facts = extractFactsFromText("I don't like JavaScript callbacks.");
  const pref = facts.find((f) => f.category === "preference");
  assert.ok(pref);
  assert.ok(pref.content.toLowerCase().includes("javascript callbacks"));
});

// ─── extractFactsFromText: Decisions ─────────────────────────────────────────

test("extractFactsFromText: detects 'I'll use' decision", () => {
  const facts = extractFactsFromText("I'll use PostgreSQL for this project.");
  const dec = facts.find((f) => f.category === "decision");
  assert.ok(dec, "Should extract a decision fact");
  assert.ok(dec.content.toLowerCase().includes("postgresql"));
  assert.equal(dec.type, "episodic");
});

test("extractFactsFromText: detects 'I chose' decision", () => {
  const facts = extractFactsFromText("I chose React for the frontend.");
  const dec = facts.find((f) => f.category === "decision");
  assert.ok(dec);
  assert.ok(dec.content.toLowerCase().includes("react"));
});

test("extractFactsFromText: detects 'I decided to' decision", () => {
  const facts = extractFactsFromText("I decided to migrate to Docker.");
  const dec = facts.find((f) => f.category === "decision");
  assert.ok(dec);
  assert.ok(dec.content.toLowerCase().includes("migrate to docker"));
});

test("extractFactsFromText: detects 'I went with' decision", () => {
  const facts = extractFactsFromText("I went with Tailwind for styling.");
  const dec = facts.find((f) => f.category === "decision");
  assert.ok(dec);
  assert.ok(dec.content.toLowerCase().includes("tailwind"));
});

// ─── extractFactsFromText: Patterns ─────────────────────────────────────────

test("extractFactsFromText: detects 'I usually' pattern", () => {
  const facts = extractFactsFromText("I usually start with tests first.");
  const pat = facts.find((f) => f.category === "pattern");
  assert.ok(pat, "Should extract a pattern fact");
  assert.ok(pat.content.toLowerCase().includes("start with tests"));
  assert.equal(pat.type, "factual");
});

test("extractFactsFromText: detects 'I always' pattern", () => {
  const facts = extractFactsFromText("I always use ESLint in my projects.");
  const pat = facts.find((f) => f.category === "pattern");
  assert.ok(pat);
  assert.ok(pat.content.toLowerCase().includes("eslint"));
});

test("extractFactsFromText: detects 'I never' pattern", () => {
  const facts = extractFactsFromText("I never commit directly to main.");
  const pat = facts.find((f) => f.category === "pattern");
  assert.ok(pat);
  assert.ok(pat.content.toLowerCase().includes("commit directly to main"));
});

test("extractFactsFromText: detects 'I tend to' pattern", () => {
  const facts = extractFactsFromText("I tend to use functional components.");
  const pat = facts.find((f) => f.category === "pattern");
  assert.ok(pat);
  assert.ok(pat.content.toLowerCase().includes("functional components"));
});

// ─── extractFactsFromText: Multiple facts ───────────────────────────────────

test("extractFactsFromText: extracts multiple facts from one response", () => {
  const text =
    "I prefer TypeScript. I'll use Next.js for this project. I usually write tests first.";
  const facts = extractFactsFromText(text);
  assert.ok(facts.length >= 3, `Expected at least 3 facts, got ${facts.length}`);

  const categories = facts.map((f) => f.category);
  assert.ok(categories.includes("preference"));
  assert.ok(categories.includes("decision"));
  assert.ok(categories.includes("pattern"));
});

test("extractFactsFromText: deduplicates identical patterns", () => {
  const text = "I prefer vim. I prefer vim.";
  const facts = extractFactsFromText(text);
  const prefs = facts.filter((f) => f.category === "preference" && f.content.includes("vim"));
  assert.equal(prefs.length, 1, "Duplicate facts should be deduplicated");
});

// ─── extractFactsFromText: Edge cases ───────────────────────────────────────

test("extractFactsFromText: returns empty array for empty string", () => {
  assert.deepEqual(extractFactsFromText(""), []);
});

test("extractFactsFromText: returns empty array for null", () => {
  assert.deepEqual(extractFactsFromText(null), []);
});

test("extractFactsFromText: returns empty array for unrelated text", () => {
  const facts = extractFactsFromText("The sky is blue. Water is wet. 2 + 2 = 4.");
  assert.deepEqual(facts, []);
});

test("extractFactsFromText: produces stable keys", () => {
  const facts = extractFactsFromText("I prefer dark mode.");
  assert.ok(facts.length > 0);
  assert.ok(
    facts[0].key.startsWith("preference:"),
    `Key should start with category: ${facts[0].key}`
  );
});

test("extractFactsFromText: truncates very long matches", () => {
  const longContent = "a".repeat(600);
  const facts = extractFactsFromText(`I prefer ${longContent}.`);
  if (facts.length > 0) {
    assert.ok(facts[0].content.length <= 500, "Content should be capped at 500 chars");
  }
});

// ─── extractFacts: non-blocking behavior ───────────────────────────────────

test("extractFacts: returns immediately (non-blocking)", () => {
  let called = false;
  const start = Date.now();

  extractFacts("I prefer dark mode.", "key-123", "session-456");

  const elapsed = Date.now() - start;
  assert.ok(elapsed < 50, `extractFacts should return in <50ms, took ${elapsed}ms`);
});

test("extractFacts: does not throw on empty inputs", () => {
  assert.doesNotThrow(() => extractFacts("", "key-123", "session-456"));
  assert.doesNotThrow(() => extractFacts("I prefer vim.", "", "session-456"));
  assert.doesNotThrow(() => extractFacts("I prefer vim.", "key-123", ""));
  assert.doesNotThrow(() => extractFacts(null, "key-123", "session-456"));
});

test("extractFactsFromText scans only the bounded tail of very large text", () => {
  const text =
    "I prefer prefix-only-editor. " + "x".repeat(70 * 1024) + " I prefer tail-only-editor.";
  const facts = extractFactsFromText(text);
  const contents = facts.map((fact) => fact.content.toLowerCase());

  assert.equal(
    contents.some((content) => content.includes("prefix-only-editor")),
    false
  );
  assert.equal(
    contents.some((content) => content.includes("tail-only-editor")),
    true
  );
});
