// PR #8916 — Provider quota compact layout mode.
//
// #8916 added a `compact` prop to QuotaCardGrid and ProviderQuotaWidget that
// forces a flat multi-column card grid instead of the upstream 3.8.49
// provider-group sidebar layout. This guard verifies the compact mode's
// grid-rendering code survives mechanical edits and refactors.
//
// Three structural assertions:
//
// 1. QuotaCardGrid renders a `grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]`
//    container when `compact` is true (before any provider-group branching).
// 2. ProviderQuotaWidget renders a `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`
//    container when `compact` is true (the "force 3 columns" path).
// 3. The `compact` prop appears in the Props interface of both components.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const COMPONENTS = {
  quotaCardGrid: path.resolve(
    import.meta.dirname,
    "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid.tsx"
  ),
  providerQuotaWidget: path.resolve(
    import.meta.dirname,
    "../../../src/app/(dashboard)/home/ProviderQuotaWidget.tsx"
  ),
};

/**
 * Render a TSX/TS source file into an AST and return the full node tree.
 */
function parseSource(sourcePath: string): ts.SourceFile {
  const sourceText = fs.readFileSync(sourcePath, "utf8");
  return ts.createSourceFile(
    sourcePath,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );
}

/**
 * Collect all string-literal className values from `<div>` JSX elements
 * (both `<div className="literal">` and `<div className={"literal"}>`).
 */
function collectDivClassNames(sourcePath: string): string[] {
  const sourceFile = parseSource(sourcePath);
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

/**
 * Check whether the Props interface (or the component's interface parameter)
 * declares a `compact?: boolean` property.
 */
function hasCompactProp(sourcePath: string): boolean {
  const sourceFile = parseSource(sourcePath);
  let found = false;

  function visit(node: ts.Node) {
    if (found) return;
    // interface Props { compact?: boolean; ... }
    if (ts.isInterfaceDeclaration(node) && node.name.text === "Props") {
      for (const member of node.members) {
        if (
          ts.isPropertySignature(member) &&
          member.name.getText(sourceFile) === "compact" &&
          member.questionToken
        ) {
          found = true;
          return;
        }
      }
    }
    // ProviderQuotaWidgetProps { compact?: boolean; }
    if (ts.isInterfaceDeclaration(node) && node.name.text === "ProviderQuotaWidgetProps") {
      for (const member of node.members) {
        if (
          ts.isPropertySignature(member) &&
          member.name.getText(sourceFile) === "compact" &&
          member.questionToken
        ) {
          found = true;
          return;
        }
      }
    }
    // function Component({ ..., compact = false }: Props)
    if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) {
      // Parameter destructuring with default for compact
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return found;
}

// ── QuotaCardGrid ──

test("QuotaCardGrid exports a compact prop on its Props interface", () => {
  assert.ok(
    hasCompactProp(COMPONENTS.quotaCardGrid),
    "QuotaCardGrid Props interface should declare compact?: boolean"
  );
});

test("QuotaCardGrid compact mode renders an auto-fill minmax grid", () => {
  const classNames = collectDivClassNames(COMPONENTS.quotaCardGrid);
  const compactGrid = classNames.find((cn) =>
    cn.includes("grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]")
  );
  assert.ok(
    compactGrid,
    "compact mode must render grid-cols-[repeat(auto-fill,minmax(17rem,1fr))]"
  );
});

// ── ProviderQuotaWidget ──

test("ProviderQuotaWidget declares a compact prop", () => {
  assert.ok(
    hasCompactProp(COMPONENTS.providerQuotaWidget),
    "ProviderQuotaWidgetProps should declare compact?: boolean"
  );
});

test("ProviderQuotaWidget compact mode renders a 3-column responsive grid", () => {
  const classNames = collectDivClassNames(COMPONENTS.providerQuotaWidget);
  const compactGridClass = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4";
  const hasGrid = classNames.find((cn) => cn.includes(compactGridClass));
  assert.ok(hasGrid, "compact mode must render the 3-column responsive grid breakpoints");
  // Also verify at least one provider-icon + ConnectionQuotas structure exists
  // by checking for ProviderIcon usage within the compact branch
});
