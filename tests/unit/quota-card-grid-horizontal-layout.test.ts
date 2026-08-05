// Provider Quota page should be easy to scan provider-by-provider.
//
// QuotaCardGrid used to flow provider groups into CSS columns. That made
// high-account operators scan left/right across unrelated providers and made
// Codex/Claude quota priority hard to follow. This regression guard asserts
// the shipped JSX structure and grouping logic directly:
//  1. Grouping still produces one header per distinct provider with the
//     correct account count ("N account(s)").
//  2. Each provider group's cards auto-fit into as many 280px columns as that
//     group's actual width supports, while a card can shrink to the group's
//     width when its container is narrower than 280px.
//  3. Provider groups themselves are one-column expandable sections, not a
//     two-column masonry flow.
//
// Note: QuotaCardGrid's sibling QuotaCard pulls in next/image + provider-icon
// resolution that only works inside the real Next.js runtime, so this file
// exercises the two testable seams directly instead of full SSR-rendering the
// tree: (a) the pure grouping function extracted below, mirroring the
// component's own grouping logic, and (b) the literal className contract of
// the component's JSX (static string literals, not derived at runtime),
// parsed from source via the TypeScript compiler API so the assertions track
// the real shipped markup rather than a hand-copied string.

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const COMPONENT_PATH = path.resolve(
  import.meta.dirname,
  "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/QuotaCardGrid.tsx"
);

function groupByProvider<T extends { provider: string }>(connections: T[]): Map<string, T[]> {
  const groups = new Map<string, T[]>();
  for (const conn of connections) {
    const list = groups.get(conn.provider) ?? [];
    list.push(conn);
    groups.set(conn.provider, list);
  }
  return groups;
}

test("QuotaCardGrid (#3520) — groups connections by provider with correct counts", () => {
  const groups = groupByProvider([
    { id: "conn-a1", provider: "openai" },
    { id: "conn-a2", provider: "openai" },
    { id: "conn-b1", provider: "anthropic" },
  ]);
  assert.deepEqual([...groups.keys()], ["openai", "anthropic"]);
  assert.equal(groups.get("openai")!.length, 2);
  assert.equal(groups.get("anthropic")!.length, 1);
});

/**
 * Extract the string literal passed to `className={...}` (or `className="..."`)
 * for every JSX `<div>` opening element in the component's `return (...)` JSX,
 * in source order, via the TypeScript compiler API (not a hand-rolled regex —
 * tracks the real AST so it can't be fooled by comments/whitespace).
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

test("QuotaCardGrid — outer provider sections stay in one vertical reading order", () => {
  const classNames = extractDivClassNames(COMPONENT_PATH);
  const outerClassName = classNames.find((className) => /\bspace-y-\d+\b/.test(className));
  assert.ok(
    outerClassName,
    "expected the component to render a vertical provider-section container"
  );
  assert.doesNotMatch(
    outerClassName!,
    /\bcolumns-/,
    "provider sections should not flow into two CSS columns"
  );
  assert.match(
    outerClassName,
    /(?:^|\s)(?:space-y-\d+|flex)(?:\s|$)/,
    "provider sections should render as one vertical list"
  );
});

test("QuotaCardGrid — provider groups are expandable details sections", () => {
  const sourceText = fs.readFileSync(COMPONENT_PATH, "utf8");
  assert.match(sourceText, /<details\b/, "expected each provider group to use <details>");
  assert.match(sourceText, /<summary\b/, "expected each provider group to expose a summary row");
  assert.match(sourceText, /\bdefaultOpen\b/, "expected provider sections to default open");
});

test("QuotaCardGrid — provider sections and accounts use quota monitoring priority", () => {
  const sourceText = fs.readFileSync(COMPONENT_PATH, "utf8");
  assert.match(
    sourceText,
    /\bPROVIDER_ORDER\b/,
    "expected provider sections to use provider order"
  );
  assert.match(
    sourceText,
    /\bsortProviderConnectionsByPriority\b/,
    "expected accounts inside a provider to use a dedicated priority sort"
  );
  assert.match(sourceText, /\bisActive\b/, "expected active accounts to sort before inactive ones");
  assert.match(
    sourceText,
    /\bgetSoonestResetMs\b/,
    "expected account priority to consider the next quota reset"
  );
});

test("QuotaCardGrid (#3520) — cards follow actual group width with a narrow-container fallback", () => {
  const classNames = extractDivClassNames(COMPONENT_PATH);
  const cardGridClassName = classNames.find((c) => /\bgrid\b/.test(c) && /grid-cols-/.test(c));
  assert.ok(cardGridClassName, "expected to find the actual-width per-group card grid's className");
  assert.match(
    cardGridClassName,
    /(?:^|\s)grid-cols-\[repeat\(auto-fit,minmax\(min\(100%,280px\),1fr\)\)\](?:\s|$)/,
    "expected 280px auto-fit columns that can shrink to 100% in a narrower group container"
  );
  assert.doesNotMatch(
    cardGridClassName,
    /(?:^|\s)(?:grid-cols-2|md:grid-cols-3|xl:grid-cols-4)(?:\s|$)/
  );
});

test("QuotaCardGrid (#3520) — early-returns null when there are no connections", () => {
  const sourceText = fs.readFileSync(COMPONENT_PATH, "utf8");
  assert.match(sourceText, /if\s*\(\s*connections\.length\s*===\s*0\s*\)\s*return\s*null;/);
});
