import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  buildChecks,
  makePackageDescriptionValidator,
  makeNumberClaimValidator,
  makeModePackNamesValidator,
} from "../../scripts/check/check-docs-counts-sync.mjs";

test("inventory checks allow count-free prose but reject explicit stale claims", () => {
  const checks = buildChecks();
  for (const [label, prose, stale] of [
    ["Provider count", "Multi-provider routing.", "1 AI providers"],
    ["i18n locales count", "Available languages are listed in config/i18n.json.", "1 locales"],
    ["Executors count", "Provider-specific executors.", "1 executors"],
    ["Routing strategies count", "See the routing strategy registry.", "1 strategies"],
    ["OAuth providers count", "Provider-specific OAuth implementations.", "1 OAuth providers"],
    ["A2A skills count", "See the skill registry.", "1 skills"],
    ["Cloud agents count", "See the cloud-agent registry.", "1 agents"],
  ]) {
    const check = checks.find((entry) => entry.label === label);
    assert.equal(typeof check?.validate, "function", `${label} needs a claim-aware validator`);
    assert.equal(check.validate(prose).ok, true, label);
    assert.equal(check.validate(stale).ok, false, label);
    assert.equal(check.validate(`${stale}; unrelated port ${check.actual}`).ok, false, label);
  }
  assert.equal(
    checks.some(
      (entry) => entry.label === "Auto-Combo mode packs (reference doc must state the count)"
    ),
    false
  );
  assert.ok(
    checks.some((entry) => entry.label === "Auto-Combo mode packs (named in the reference doc)")
  );
});

test("package description may omit an inventory total without hiding a stale claim", () => {
  const validate = makePackageDescriptionValidator(358);
  assert.equal(
    validate(JSON.stringify({ description: "Unified multi-provider AI gateway" })).ok,
    true
  );
  assert.equal(validate(JSON.stringify({ description: "358 AI providers" })).ok, true);
  assert.equal(validate(JSON.stringify({ description: "194 AI providers; port 358" })).ok, false);
  assert.equal(validate("invalid JSON").ok, false);
});

test("adding migrations does not require editing count-free database documentation", () => {
  for (const count of [193, 194, 195]) {
    const validate = makeNumberClaimValidator(count, {
      what: "migrations",
      pattern: /(\d+)\+? (?:versioned )?(?:SQL )?migrations?\b/gi,
    });
    assert.equal(validate("SQLite with versioned SQL migrations.").ok, true);
    assert.equal(validate(`${count - 1} versioned SQL migrations`).ok, false);
  }
});

test("count-free mode-pack documentation must still name every shipped pack", () => {
  const validate = makeModePackNamesValidator(["ship-fast", "cost-saver"]);
  assert.equal(validate("Available profiles: ship-fast and cost-saver.").ok, true);
  assert.equal(validate("Available profiles: ship-fast.").ok, false);
});

test("primary guides do not duplicate volatile inventory totals", () => {
  const pattern =
    /\b\d+\+?\s+(?:(?:AI|LLM|SQL|versioned|domain-specific|domain|public|routing|MCP|service|utility|executor)\s+)*(?:providers|migrations|migration files|modules|tools|scopes|strategies)\b/i;
  for (const file of ["AGENTS.md", "llm.txt"]) {
    const text = readFileSync(new URL(`../../${file}`, import.meta.url), "utf8");
    assert.doesNotMatch(text, pattern, file);
  }
});
