/**
 * Regression guard for the RiskNoticeModal Button import bug (R4 fix #1).
 *
 * For 3 review rounds the agent-card.test.tsx failure ("Element type is invalid
 * — Check the render method of RiskNoticeModal") was misclassified as
 * "pre-existing / flaky". The actual root cause was a broken named import:
 *
 *     import { Button } from "@/shared/components/Button";   // ← undefined
 *
 * `Button.tsx` exposes only a default export, so the named import resolved to
 * `undefined`, causing every render of RiskNoticeModal to crash with React's
 * "Element type is invalid" error. The modal opens on first DNS activation of
 * every agent — so the bug effectively broke DNS interception for every agent
 * in production. The R4 reviewer caught it; this test prevents recurrence.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODAL = path.resolve(__dirname, "../../src/shared/components/RiskNoticeModal.tsx");
const BUTTON = path.resolve(__dirname, "../../src/shared/components/Button.tsx");

const modalSrc = readFileSync(MODAL, "utf-8");
const buttonSrc = readFileSync(BUTTON, "utf-8");

describe("RiskNoticeModal Button import (R4 fix #1, prod crash regression guard)", () => {
  it("Button.tsx exposes a default export", () => {
    assert.ok(
      /export\s+default\s+function\s+Button/.test(buttonSrc),
      "Button.tsx must keep its default export",
    );
  });

  it("Button.tsx does NOT have a named `export { Button }` or `export function Button`", () => {
    assert.ok(
      !/export\s+(\{[^}]*\bButton\b[^}]*\}|function\s+Button|const\s+Button)/.test(
        buttonSrc.replace(/export\s+default\s+function\s+Button/g, ""),
      ),
      "Button.tsx is default-only — if you add a named export, also fix any default consumers",
    );
  });

  it("RiskNoticeModal imports Button as default (not named)", () => {
    assert.ok(
      /import\s+Button\s+from\s+["']@\/shared\/components\/Button["']/.test(modalSrc),
      "RiskNoticeModal must use `import Button from ...` (default), not `import { Button }`",
    );
    assert.ok(
      !/import\s+\{\s*Button\s*\}\s+from\s+["']@\/shared\/components\/Button["']/.test(modalSrc),
      "Named import of Button from the .tsx file is broken (Button.tsx has no named export)",
    );
  });
});
