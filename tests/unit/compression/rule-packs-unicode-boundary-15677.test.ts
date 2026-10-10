import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  getAvailableLanguagePacks,
  loadAllRulesForLanguage,
  loadRulePack,
} from "../../../open-sse/services/compression/ruleLoader.ts";

// #15677 — `\b` is ASCII-only in JS: next to an accented/non-Latin letter it never matches.
/** Alternatives of the first top-level `(?:a|b)` group, or [] when it has nested groups. */
function topLevelAlternatives(source: string): string[] {
  const start = source.indexOf("(?:");
  if (start < 0) return [];
  // Keywords are only self-sufficient when nothing but an anchor/boundary precedes the group.
  if (!/^\^?(?:\(\?<!\[\\p\{L\}\\p\{N\}_\]\))?$/.test(source.slice(0, start))) return [];
  let depth = 0;
  for (let i = start; i < source.length; i++) {
    if (source[i] === "\\") i++;
    else if (source[i] === "(") depth++;
    else if (source[i] === ")" && --depth === 0) {
      const body = source.slice(start + 3, i);
      return /[(?*+]/.test(body) || /^[?*+]/.test(source.slice(i + 1)) || source.includes("(?:", i)
        ? []
        : body.split("|").map((alt) => alt.trim());
    }
  }
  return [];
}

const languages = getAvailableLanguagePacks().map((p) => p.language);

test("no bundled rule combines a non-ASCII pattern with ASCII-only \\b (#15677)", () => {
  for (const language of languages) {
    for (const rule of loadAllRulesForLanguage(language)) {
      if (!/[^\x00-\x7f]/.test(rule.pattern.source)) continue;
      assert.ok(!rule.pattern.source.includes("\\b"), `${language}/${rule.name} still uses \\b`);
    }
    for (const rule of loadAllRulesForLanguage(language)) {
      if (!rule.pattern.source.includes("\\p{")) continue;
      assert.ok(rule.pattern.flags.includes("u"), `${language}/${rule.name} lacks the u flag`);
    }
  }
});

test("every literal keyword of every rule pack is matchable (#15677)", () => {
  let checked = 0;
  for (const language of languages) {
    for (const rule of loadAllRulesForLanguage(language)) {
      if (!/[^\x00-\x7f]/.test(rule.pattern.source)) continue; // ASCII-only rules are out of scope
      const literals = topLevelAlternatives(rule.pattern.source).filter((alt) =>
        /^[\p{L}\p{N}][\p{L}\p{N}\s'-]*$/u.test(alt)
      );
      for (const literal of literals) {
        const re = new RegExp(rule.pattern.source, rule.pattern.flags);
        // Trailing lowercase word satisfies "(?=[a-z...])" lookaheads of emphasis/article rules.
        const sample = `${literal} abc`;
        assert.ok(
          re.test(sample),
          `${language}/${rule.name} never matches its keyword "${literal}"`
        );
        checked++;
      }
    }
  }
  assert.ok(checked > 500, `expected many keywords to be checked, got ${checked}`);
});

test("keywords ending in an accented letter match at word edges only (#15677)", () => {
  const rule = loadAllRulesForLanguage("es").find(
    (r) => r.name === "es_ultra_application_abbreviation"
  );
  assert.ok(rule);
  assert.ok(new RegExp(rule.pattern.source, rule.pattern.flags).test("la aplicación, hoy"));
  assert.ok(!new RegExp(rule.pattern.source, rule.pattern.flags).test("xaplicación"));
  assert.ok(!new RegExp(rule.pattern.source, rule.pattern.flags).test("aplicaciones"));
});

test("user overlay dir under DATA_DIR overrides and extends bundled packs (#15677)", () => {
  const previous = process.env.DATA_DIR;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rules-15677-"));
  try {
    const target = path.join(dir, "compression", "rules", "es");
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(
      path.join(target, "filler.json"),
      JSON.stringify({
        language: "es",
        category: "filler",
        rules: [
          { name: "es_pleasantries", pattern: "ZZZ", replacement: "" },
          {
            name: "es_custom_user_rule",
            pattern: "(?<![\\p{L}\\p{N}_])fulano(?![\\p{L}\\p{N}_])",
            replacement: "",
            flags: "giu",
          },
        ],
      })
    );
    process.env.DATA_DIR = dir;
    const rules = loadRulePack("es", "filler", { refresh: true });
    assert.equal(rules.find((r) => r.name === "es_pleasantries")?.pattern.source, "ZZZ");
    assert.ok(rules.some((r) => r.name === "es_custom_user_rule"));
    assert.ok(
      rules.some((r) => r.name === "es_hedging"),
      "bundled rules are kept"
    );
  } finally {
    if (previous === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("an invalid user overlay falls back to bundled rules (#15677)", () => {
  const previous = process.env.DATA_DIR;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rules-15677-bad-"));
  const warn = console.warn;
  try {
    const target = path.join(dir, "compression", "rules", "de");
    fs.mkdirSync(target, { recursive: true });
    fs.writeFileSync(path.join(target, "filler.json"), "{ not json");
    process.env.DATA_DIR = dir;
    console.warn = () => {};
    assert.ok(loadRulePack("de", "filler", { refresh: true }).length > 0);
  } finally {
    console.warn = warn;
    if (previous === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previous;
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
