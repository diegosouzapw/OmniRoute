// #6815 — Provider Quota page horizontal density.
//
// #6815 changed QuotaCardGrid.tsx's per-group card grid from a
// single-column-only layout (`flex flex-col`) to one that packs multiple
// QuotaCards side by side on wide screens, instead of stacking every card
// vertically no matter how much horizontal space is available.
//
// That guarantee was only ever asserted *incidentally*, by two other guards
// that pinned the literal Tailwind token the #6815 implementation happened
// to use at the time (`sm:grid-cols-2` in
// tests/unit/quota-card-grid-mobile-7072.test.ts and
// tests/unit/quota-card-grid-horizontal-layout.test.ts). When PR #7027
// migrated the component from a fixed breakpoint ladder
// (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4`) to a
// container-driven auto-fit template
// (`grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]`), that literal
// token disappeared from the source and both guards were edited to stop
// asserting it — silently deleting the only coverage #6815 had.
//
// This guard re-establishes dedicated coverage for the #6815 density
// guarantee itself, decoupled from *how* the component achieves it. Instead
// of matching a specific class-name token, it simulates, from the shipped
// className(s), how many columns the per-group card grid would actually
// render at a wide container width — supporting both mechanisms seen in this
// component's history (a Tailwind breakpoint ladder, and a CSS auto-fit
// `minmax()` template) — and asserts that count is >1. Reverting to a single
// unconditional column (`grid-cols-1` with no responsive/auto-fit variants,
// or dropping the grid entirely for `flex flex-col`) must fail this guard,
// regardless of which mechanism produced the regression.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const COMPONENT_PATH = path.resolve(
  import.meta.dirname,
  "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid.tsx"
);

/**
 * Extract the string literal passed to `className={...}` (or `className="..."`)
 * for every JSX `<div>` opening element in the component's source, in source
 * order, via the TypeScript compiler API (not a hand-rolled regex — tracks
 * the real AST so it can't be fooled by comments/whitespace).
 */
function extractDivClassNames(sourcePath: string): string[] {
  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const sourceFile = ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
  const classNames: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tagName = node.tagName.getText(sourceFile);
      if (tagName === "div") {
        for (const attr of node.attributes.properties) {
          if (ts.isJsxAttribute(attr) && attr.name.getText(sourceFile) === "className") {
            const init = attr.initializer;
            if (init && ts.isStringLiteral(init)) {
              classNames.push(init.text);
            } else if (
              init &&
              ts.isJsxExpression(init) &&
              init.expression &&
              ts.isStringLiteral(init.expression)
            ) {
              classNames.push(init.expression.text);
            }
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return classNames;
}

// Tailwind's default min-width breakpoints (px). Unprefixed utilities apply
// at every width (breakpoint 0) and later/larger breakpoints win the cascade
// once their min-width is met, mirroring Tailwind's mobile-first source order.
const TAILWIND_BREAKPOINTS: Record<string, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

type ColumnRule =
  | { breakpoint: number; kind: "fixed"; columns: number }
  | { breakpoint: number; kind: "autofit"; trackPx: number };

/**
 * Parse every `grid-cols-*` utility (optionally breakpoint-prefixed) found in
 * a className string into a column rule, supporting both mechanisms this
 * component has shipped with:
 *  - a fixed count, e.g. `grid-cols-2`, `md:grid-cols-3`
 *  - a CSS auto-fit template, e.g.
 *    `grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))]`, from which
 *    the minimum track width (in px) is extracted.
 */
function parseColumnRules(className: string): ColumnRule[] {
  const rules: ColumnRule[] = [];
  for (const token of className.split(/\s+/).filter(Boolean)) {
    const prefixMatch = token.match(/^(?:([a-zA-Z0-9]+):)?grid-cols-(.+)$/);
    if (!prefixMatch) continue;
    const [, prefix, rest] = prefixMatch;
    const breakpoint = prefix ? (TAILWIND_BREAKPOINTS[prefix] ?? 0) : 0;

    if (/^\d+$/.test(rest)) {
      rules.push({ breakpoint, kind: "fixed", columns: parseInt(rest, 10) });
      continue;
    }

    const autoFitMatch = rest.match(/^\[repeat\(auto-fit,\s*minmax\((.+),\s*1fr\)\)\]$/);
    if (autoFitMatch) {
      const trackPxMatches = [...autoFitMatch[1].matchAll(/(\d+)px/g)];
      if (trackPxMatches.length > 0) {
        const trackPx = parseInt(trackPxMatches[trackPxMatches.length - 1][1], 10);
        rules.push({ breakpoint, kind: "autofit", trackPx });
      }
    }
  }
  return rules;
}

/**
 * Given a className string, estimate how many columns the grid renders at a
 * given container/viewport width, by picking the widest matching breakpoint
 * rule (Tailwind cascade) and resolving fixed vs. auto-fit tracks. Returns 1
 * (single column) when no `grid-cols-*` rule is present at all — e.g. a
 * `flex flex-col` layout.
 */
function estimateColumnsAtWidth(className: string, widthPx: number): number {
  const rules = parseColumnRules(className).filter((r) => r.breakpoint <= widthPx);
  if (rules.length === 0) return 1;
  const active = rules.reduce((best, r) => (r.breakpoint >= best.breakpoint ? r : best));
  if (active.kind === "fixed") return active.columns;
  return Math.max(1, Math.floor(widthPx / active.trackPx));
}

// --- Self-test of the estimator against known-good and known-bad shapes ---
// (independent of the real component, so the simulation logic itself is
// pinned before it's trusted to judge the shipped source below).

test("#6815 density estimator — breakpoint ladder resolves to multiple columns on a wide viewport", () => {
  const className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3";
  assert.equal(estimateColumnsAtWidth(className, 1200), 3);
  assert.equal(estimateColumnsAtWidth(className, 375), 1);
});

test("#6815 density estimator — auto-fit template resolves to multiple columns on a wide container", () => {
  const className = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3";
  assert.ok(estimateColumnsAtWidth(className, 1200) >= 2);
  assert.equal(estimateColumnsAtWidth(className, 200), 1);
});

test("#6815 density estimator — single unconditional column stays at 1 column regardless of width", () => {
  assert.equal(estimateColumnsAtWidth("grid grid-cols-1 gap-3", 1920), 1);
});

test("#6815 density estimator — flex column stack (no grid-cols) resolves to 1 column", () => {
  assert.equal(estimateColumnsAtWidth("flex flex-col gap-3", 1920), 1);
});

// --- The actual regression guard, reading the shipped component source ---

test("QuotaCardGrid (#6815) — per-group card grid renders multiple columns on a wide container", () => {
  const classNames = extractDivClassNames(COMPONENT_PATH);
  const cardGridClassName = classNames.find((c) => /\bgrid\b/.test(c) && /grid-cols-/.test(c));
  assert.ok(
    cardGridClassName,
    "expected to find a grid-based per-group card grid className (not a single-column flex stack)"
  );

  const columnsOnWideContainer = estimateColumnsAtWidth(cardGridClassName!, 1200);
  assert.ok(
    columnsOnWideContainer > 1,
    `expected the per-group card grid to render more than 1 column at 1200px, got ${columnsOnWideContainer} ` +
      `from className="${cardGridClassName}" — this is the #6815 density regression`
  );
});
