// #7072 — Provider Quota page card grid clipped on mobile.
//
// PR #6815 changed QuotaCardGrid.tsx's per-group card grid from
// `grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4` to
// `grid-cols-2 md:grid-cols-3 xl:grid-cols-4`, dropping the mobile (<768px)
// single-column fallback that every other card-grid in the dashboard still
// has (ProviderQuotaWidget.tsx, EvalsTab.tsx, MediaPageClient.tsx,
// SystemStorageTab.tsx). Forcing 2 columns even on phone widths squeezes
// each QuotaCard, and since QuotaCard's outer Card uses `overflow-hidden`,
// the overflowing button/label text is clipped instead of wrapping.
//
// This regression guard parses QuotaCardGrid.tsx's JSX via the TypeScript
// compiler API and asserts the per-group card grid's className guarantees a
// single column on mobile-width viewports — the BEHAVIOR that fixes #7072 —
// rather than one specific token. Two implementations satisfy this:
//   1. Breakpoint-driven (#7194): an unprefixed `grid-cols-1` token forces a
//      single column below `sm:`, widening at larger breakpoints.
//   2. Container-driven (#7027): an arbitrary-value
//      `grid-cols-[repeat(auto-fit,minmax(min(100%,Npx),1fr))]` template
//      where the minimum track width is wide enough that a second track
//      cannot fit on any realistic phone viewport.
// Either way, reverting to the pre-#7072 forced `grid-cols-2` (no
// unprefixed 1-column fallback, no auto-fit) must fail this guard.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const COMPONENT_PATH = path.resolve(
  import.meta.dirname,
  "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid.tsx"
);

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

// Minimum track width (px) below which two auto-fit columns could plausibly
// fit side by side on a real phone viewport (narrowest common width ~320px).
// Requiring the min track to clear this bar keeps auto-fit implementations
// honest about the same guarantee the breakpoint model gives explicitly.
const MIN_MOBILE_SAFE_TRACK_PX = 200;

function assertSingleColumnMobileFallback(cardGridClassName: string): void {
  const tokens = cardGridClassName.split(/\s+/);

  // Breakpoint-driven layout (#7194 style): an unprefixed `grid-cols-N`
  // token controls the base (mobile-first, <640px) column count directly.
  const unprefixedGridCols = tokens.find((t) => /^grid-cols-\d+$/.test(t));
  if (unprefixedGridCols) {
    assert.equal(
      unprefixedGridCols,
      "grid-cols-1",
      `breakpoint-driven grid must keep an unprefixed grid-cols-1 mobile fallback, got className="${cardGridClassName}"`
    );
    return;
  }

  // Container-driven layout (#7027 style): an arbitrary-value auto-fit grid
  // template computes column count from available width, not a breakpoint.
  const autoFitToken = tokens.find(
    (t) => t.startsWith("grid-cols-[") && t.includes("auto-fit") && t.includes("minmax(")
  );
  assert.ok(
    autoFitToken,
    `expected either an unprefixed grid-cols-1 mobile fallback or a repeat(auto-fit, minmax(...)) ` +
      `container grid, got className="${cardGridClassName}"`
  );

  const minTrackMatch =
    autoFitToken!.match(/minmax\(min\(100%,(\d+)px\)/) ?? autoFitToken!.match(/minmax\((\d+)px/);
  assert.ok(
    minTrackMatch,
    `expected the auto-fit grid's minmax() to specify a numeric minimum track width, got "${autoFitToken}"`
  );
  const minTrackPx = Number(minTrackMatch![1]);

  // A second card-wide column can only appear once the container is at
  // least 2x the minimum track width. Requiring the track minimum to clear
  // MIN_MOBILE_SAFE_TRACK_PX guards against reintroducing #7072's forced
  // 2-column-on-mobile clipping via an undersized auto-fit track.
  assert.ok(
    minTrackPx >= MIN_MOBILE_SAFE_TRACK_PX,
    `auto-fit min track width too small (${minTrackPx}px) — two columns could fit on a mobile ` +
      `viewport, reintroducing the #7072 clipping regression`
  );
}

test("QuotaCardGrid (#7072) — per-group card grid keeps a single-column mobile fallback", () => {
  const classNames = extractDivClassNames(COMPONENT_PATH);
  const cardGridClassName = classNames.find((c) => /\bgrid\b/.test(c) && /grid-cols-/.test(c));
  assert.ok(cardGridClassName, "expected to find the per-group card grid's className");

  assertSingleColumnMobileFallback(cardGridClassName!);
});
