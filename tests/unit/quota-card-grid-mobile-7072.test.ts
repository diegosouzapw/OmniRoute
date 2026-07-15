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
// compiler API and asserts the per-group card grid's className restores an
// unprefixed `grid-cols-1` mobile fallback, while keeping the #6815 density
// gains (grid-cols-2 at `sm:` and up).

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

test("QuotaCardGrid (#7072) — per-group card grid keeps a single-column mobile fallback", () => {
  const classNames = extractDivClassNames(COMPONENT_PATH);
  const cardGridClassName = classNames.find((c) => /\bgrid\b/.test(c) && /grid-cols-/.test(c));
  assert.ok(cardGridClassName, "expected to find the per-group card grid's className");

  const tokens = cardGridClassName!.split(/\s+/);
  const unprefixedGridCols = tokens.find((t) => /^grid-cols-\d+$/.test(t));
  assert.equal(
    unprefixedGridCols,
    "grid-cols-1",
    `expected unprefixed grid-cols-1 (mobile fallback), got className="${cardGridClassName}"`
  );
  assert.match(cardGridClassName!, /\bsm:grid-cols-2\b/, "expected sm:grid-cols-2 to be preserved");
});
